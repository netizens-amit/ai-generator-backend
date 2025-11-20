"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var GenerationProcessor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerationProcessor = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const generation_service_1 = require("./services/generation.service");
const storage_service_1 = require("../storage/storage.service");
const events_gateway_1 = require("../websocket/events.gateway");
const client_1 = require("@prisma/client");
let GenerationProcessor = GenerationProcessor_1 = class GenerationProcessor extends bullmq_1.WorkerHost {
    db;
    generationService;
    storage;
    events;
    logger = new common_1.Logger(GenerationProcessor_1.name);
    constructor(db, generationService, storage, events) {
        super();
        this.db = db;
        this.generationService = generationService;
        this.storage = storage;
        this.events = events;
    }
    async process(job) {
        const { projectId, preferences } = job.data;
        try {
            const project = await this.db.project.findUnique({
                where: { id: projectId },
                select: { userId: true },
            });
            if (!project) {
                throw new Error('Project not found');
            }
            const userId = project.userId;
            await this.updateProgress(projectId, userId, 10, 'Generating code...');
            const code = await this.generationService.generate(preferences);
            await this.updateProgress(projectId, userId, 60, 'Saving files...');
            let paths;
            if (preferences.codeType === 'REACT') {
                paths = await this.storage.saveReactFiles(projectId, code);
                await this.saveReactMetadata(projectId, code, paths);
            }
            else {
                paths = await this.storage.saveProjectFiles(projectId, code);
                await this.saveHTMLMetadata(projectId, code, paths);
            }
            await this.updateProgress(projectId, userId, 90, 'Finalizing...');
            await this.db.project.update({
                where: { id: projectId },
                data: {
                    status: 'COMPLETED',
                    progress: 100,
                    completedAt: new Date(),
                },
            });
            this.events.emitComplete(projectId, userId, 'Website generated successfully!');
            return { success: true, projectId };
        }
        catch (error) {
            this.logger.error(`Job failed: ${error.message}`);
            const project = await this.db.project.findUnique({
                where: { id: projectId },
                select: { userId: true },
            });
            await this.db.project.update({
                where: { id: projectId },
                data: { status: 'FAILED', errorMessage: error.message },
            });
            if (project) {
                this.events.emitError(projectId, project.userId, error.message);
            }
            throw error;
        }
    }
    async updateProgress(id, userId, progress, message) {
        await this.db.project.update({
            where: { id },
            data: { progress },
        });
        this.events.emitProgress(id, userId, {
            progress,
            status: 'processing',
            message,
        });
    }
    async saveReactMetadata(projectId, code, paths) {
        const filesToSave = [
            {
                projectId,
                fileName: 'App.tsx',
                fileType: client_1.FileType.JAVASCRIPT,
                filePath: paths.appTsxPath,
                fileSize: Buffer.byteLength(code.appTsx, 'utf8'),
                content: code.appTsx,
            },
            {
                projectId,
                fileName: 'App.css',
                fileType: client_1.FileType.CSS,
                filePath: paths.appCssPath,
                fileSize: Buffer.byteLength(code.appCss, 'utf8'),
                content: code.appCss,
            },
            {
                projectId,
                fileName: 'index.tsx',
                fileType: client_1.FileType.JAVASCRIPT,
                filePath: paths.indexTsxPath,
                fileSize: Buffer.byteLength(code.indexTsx, 'utf8'),
                content: code.indexTsx,
            },
            {
                projectId,
                fileName: 'package.json',
                fileType: client_1.FileType.JAVASCRIPT,
                filePath: paths.packageJsonPath,
                fileSize: Buffer.byteLength(code.packageJson, 'utf8'),
                content: code.packageJson,
            },
        ];
        for (const component of code.components || []) {
            filesToSave.push({
                projectId,
                fileName: `components/${component.fileName}`,
                fileType: client_1.FileType.JAVASCRIPT,
                filePath: paths.componentPaths[component.fileName],
                fileSize: Buffer.byteLength(component.code, 'utf8'),
                content: component.code,
            });
        }
        await this.db.file.createMany({
            data: filesToSave,
        });
        this.logger.log(`✅ Saved ${filesToSave.length} files to database`);
    }
    async saveHTMLMetadata(projectId, code, paths) {
        await this.db.file.createMany({
            data: [
                {
                    projectId,
                    fileName: 'index.html',
                    fileType: client_1.FileType.HTML,
                    filePath: paths.htmlPath,
                    fileSize: Buffer.byteLength(code.html, 'utf8'),
                    content: code.html,
                },
                {
                    projectId,
                    fileName: 'styles.css',
                    fileType: client_1.FileType.CSS,
                    filePath: paths.cssPath,
                    fileSize: Buffer.byteLength(code.css, 'utf8'),
                    content: code.css,
                },
                {
                    projectId,
                    fileName: 'script.js',
                    fileType: client_1.FileType.JAVASCRIPT,
                    filePath: paths.jsPath,
                    fileSize: Buffer.byteLength(code.js, 'utf8'),
                    content: code.js,
                },
            ],
        });
    }
};
exports.GenerationProcessor = GenerationProcessor;
exports.GenerationProcessor = GenerationProcessor = GenerationProcessor_1 = __decorate([
    (0, bullmq_1.Processor)('generation-queue'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        generation_service_1.GenerationService,
        storage_service_1.StorageService,
        events_gateway_1.EventsGateway])
], GenerationProcessor);
//# sourceMappingURL=generation.processor.js.map