"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var FileManagerService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileManagerService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const config_1 = require("@nestjs/config");
const fs = __importStar(require("fs/promises"));
const path = __importStar(require("path"));
const client_1 = require("@prisma/client");
let FileManagerService = FileManagerService_1 = class FileManagerService {
    db;
    config;
    logger = new common_1.Logger(FileManagerService_1.name);
    storagePath;
    constructor(db, config) {
        this.db = db;
        this.config = config;
        this.storagePath = this.config.get('STORAGE_PATH') || './storage/generated-files';
        this.ensureStorageDirectory();
    }
    async ensureStorageDirectory() {
        try {
            await fs.mkdir(this.storagePath, { recursive: true });
            this.logger.log(`📁 Storage directory ready: ${this.storagePath}`);
        }
        catch (error) {
            this.logger.error('Failed to create storage directory:', error);
            throw error;
        }
    }
    async saveProjectFiles(projectId, code, codeType) {
        if (codeType === 'REACT') {
            await this.saveReactProject(projectId, code);
        }
        else {
            await this.saveHTMLProject(projectId, code);
        }
    }
    async saveReactProject(projectId, code) {
        const projectDir = path.join(this.storagePath, projectId);
        const srcDir = path.join(projectDir, 'src');
        const componentsDir = path.join(srcDir, 'components');
        const publicDir = path.join(projectDir, 'public');
        await fs.mkdir(componentsDir, { recursive: true });
        await fs.mkdir(publicDir, { recursive: true });
        const filesToCreate = [];
        const mainFiles = [
            {
                fileName: 'App.tsx',
                filePath: path.join(srcDir, 'App.tsx'),
                content: code.appTsx,
                fileType: client_1.FileType.TYPESCRIPT,
            },
            {
                fileName: 'App.css',
                filePath: path.join(srcDir, 'App.css'),
                content: code.appCss,
                fileType: client_1.FileType.CSS,
            },
            {
                fileName: 'index.tsx',
                filePath: path.join(srcDir, 'index.tsx'),
                content: code.indexTsx,
                fileType: client_1.FileType.TYPESCRIPT,
            },
            {
                fileName: 'package.json',
                filePath: path.join(projectDir, 'package.json'),
                content: code.packageJson,
                fileType: client_1.FileType.JSON,
            },
        ];
        filesToCreate.push(...mainFiles);
        for (const component of code.components || []) {
            filesToCreate.push({
                fileName: `components/${component.fileName}`,
                filePath: path.join(componentsDir, component.fileName),
                content: component.code,
                fileType: client_1.FileType.TYPESCRIPT,
            });
        }
        const publicHtml = this.generateReactIndexHtml(projectId);
        filesToCreate.push({
            fileName: 'public/index.html',
            filePath: path.join(publicDir, 'index.html'),
            content: publicHtml,
            fileType: client_1.FileType.HTML,
        });
        await Promise.all(filesToCreate.map(file => fs.writeFile(file.filePath, file.content, 'utf-8')));
        const dbFiles = filesToCreate.map(file => ({
            projectId,
            fileName: file.fileName,
            filePath: file.filePath,
            fileType: file.fileType,
            fileSize: Buffer.byteLength(file.content, 'utf-8'),
            content: file.content,
        }));
        await this.db.file.createMany({ data: dbFiles });
        this.logger.log(`✅ Saved ${filesToCreate.length} React files for project ${projectId}`);
    }
    async saveHTMLProject(projectId, code) {
        const projectDir = path.join(this.storagePath, projectId);
        await fs.mkdir(projectDir, { recursive: true });
        const filesToCreate = [
            {
                fileName: 'index.html',
                filePath: path.join(projectDir, 'index.html'),
                content: code.html,
                fileType: client_1.FileType.HTML,
            },
            {
                fileName: 'styles.css',
                filePath: path.join(projectDir, 'styles.css'),
                content: code.css,
                fileType: client_1.FileType.CSS,
            },
            {
                fileName: 'script.js',
                filePath: path.join(projectDir, 'script.js'),
                content: code.js,
                fileType: client_1.FileType.JAVASCRIPT,
            },
        ];
        await Promise.all(filesToCreate.map(file => fs.writeFile(file.filePath, file.content, 'utf-8')));
        const dbFiles = filesToCreate.map(file => ({
            projectId,
            fileName: file.fileName,
            filePath: file.filePath,
            fileType: file.fileType,
            fileSize: Buffer.byteLength(file.content, 'utf-8'),
            content: file.content,
        }));
        await this.db.file.createMany({ data: dbFiles });
        this.logger.log(`✅ Saved ${filesToCreate.length} HTML files for project ${projectId}`);
    }
    async readProjectFiles(projectId) {
        const files = await this.db.file.findMany({
            where: { projectId },
        });
        const fileMap = {};
        for (const file of files) {
            const key = `/${file.fileName}`;
            fileMap[key] = file.content;
        }
        return fileMap;
    }
    async deleteProjectFiles(projectId) {
        const projectDir = path.join(this.storagePath, projectId);
        try {
            await fs.rm(projectDir, { recursive: true, force: true });
            this.logger.log(`🗑️ Deleted files for project ${projectId}`);
        }
        catch (error) {
            this.logger.error(`Failed to delete files for project ${projectId}:`, error);
            throw error;
        }
    }
    generateReactIndexHtml(title) {
        return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta name="description" content="AI Generated Website - ${title}" />
    <title>${title}</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>`;
    }
    async updateFile(projectId, fileName, content) {
        const file = await this.db.file.findFirst({
            where: { projectId, fileName },
        });
        if (!file) {
            throw new Error(`File ${fileName} not found in project ${projectId}`);
        }
        await fs.writeFile(file.filePath, content, 'utf-8');
        await this.db.file.update({
            where: { id: file.id },
            data: {
                content,
                fileSize: Buffer.byteLength(content, 'utf-8'),
                version: file.version + 1,
                updatedAt: new Date(),
            },
        });
        this.logger.log(`✅ Updated file ${fileName} in project ${projectId}`);
    }
    async getProjectStats(projectId) {
        const files = await this.db.file.findMany({
            where: { projectId },
            select: {
                fileName: true,
                fileType: true,
                fileSize: true,
            },
        });
        const totalSize = files.reduce((sum, file) => sum + file.fileSize, 0);
        const filesByType = files.reduce((acc, file) => {
            acc[file.fileType] = (acc[file.fileType] || 0) + 1;
            return acc;
        }, {});
        return {
            totalFiles: files.length,
            totalSize,
            filesByType,
            files: files.map(f => ({
                name: f.fileName,
                type: f.fileType,
                size: f.fileSize,
            })),
        };
    }
};
exports.FileManagerService = FileManagerService;
exports.FileManagerService = FileManagerService = FileManagerService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        config_1.ConfigService])
], FileManagerService);
//# sourceMappingURL=file-manager.service.js.map