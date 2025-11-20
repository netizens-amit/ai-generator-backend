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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerationController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const generate_website_dto_1 = require("../dto/generate-website.dto");
const prisma_service_1 = require("../../prisma/prisma.service");
const streaming_generation_service_1 = require("../services/streaming-generation.service");
const sandpack_formatter_service_1 = require("../services/sandpack-formatter.service");
let GenerationController = class GenerationController {
    db;
    streamingGeneration;
    sandpackFormatter;
    constructor(db, streamingGeneration, sandpackFormatter) {
        this.db = db;
        this.streamingGeneration = streamingGeneration;
        this.sandpackFormatter = sandpackFormatter;
    }
    async generateStream(dto, req, res) {
        const project = await this.db.project.create({
            data: {
                userId: req.user.id,
                companyName: dto.companyName,
                industry: dto.industry,
                websiteType: dto.websiteType,
                designStyle: dto.designStyle,
                colorScheme: dto.colorScheme,
                codeType: dto.codeType || 'REACT',
                aiModel: dto.aiModel || 'GEMINI',
                status: 'PROCESSING',
                progress: 0,
            },
        });
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        res.setHeader('X-Accel-Buffering', 'no');
        res.write(`data: ${JSON.stringify({
            projectId: project.id,
            status: 'processing',
            progress: 0,
            message: 'Starting generation...',
        })}\n\n`);
        try {
            await this.streamingGeneration.generateWithStream(project.id, dto, (progress) => {
                res.write(`data: ${JSON.stringify(progress)}\n\n`);
            });
            const files = await this.sandpackFormatter.formatForSandpack(project.id);
            res.write(`data: ${JSON.stringify({
                projectId: project.id,
                status: 'completed',
                progress: 100,
                message: 'Generation completed!',
                files,
            })}\n\n`);
            res.end();
        }
        catch (error) {
            await this.db.project.update({
                where: { id: project.id },
                data: {
                    status: 'FAILED',
                    errorMessage: error.message
                },
            });
            res.write(`data: ${JSON.stringify({
                projectId: project.id,
                status: 'failed',
                progress: 0,
                message: error.message,
                error: error.stack,
            })}\n\n`);
            res.end();
        }
    }
    async getProject(id, req) {
        const project = await this.db.project.findUnique({
            where: { id },
            include: { files: true },
        });
        if (!project) {
            throw new common_1.NotFoundException('Project not found');
        }
        if (project.userId !== req.user.id) {
            throw new common_1.ForbiddenException('Access denied');
        }
        return { success: true, data: project };
    }
    async getSandpackFiles(id, req) {
        const project = await this.db.project.findFirst({
            where: {
                id,
                userId: req.user.id,
                status: 'COMPLETED',
            },
        });
        if (!project) {
            throw new common_1.NotFoundException('Project not found or not completed');
        }
        const files = await this.sandpackFormatter.formatForSandpack(id);
        return {
            success: true,
            data: {
                projectId: id,
                codeType: project.codeType,
                files,
            },
        };
    }
    async getProjects(req) {
        const projects = await this.db.project.findMany({
            where: { userId: req.user.id },
            include: {
                files: {
                    select: {
                        id: true,
                        fileName: true,
                        fileType: true,
                        fileSize: true,
                        createdAt: true,
                    }
                }
            },
            orderBy: { createdAt: 'desc' },
        });
        return { success: true, data: projects };
    }
    async regenerate(id, req, res) {
        const project = await this.db.project.findUnique({ where: { id } });
        if (!project)
            throw new common_1.NotFoundException('Project not found');
        if (project.userId !== req.user.id)
            throw new common_1.ForbiddenException('Access denied');
        await this.db.project.update({
            where: { id },
            data: {
                status: 'PROCESSING',
                errorMessage: null,
                progress: 0,
                completedAt: null,
            },
        });
        await this.db.file.deleteMany({ where: { projectId: id } });
        const preferences = {
            companyName: project.companyName,
            industry: project.industry,
            websiteType: project.websiteType,
            designStyle: project.designStyle,
            colorScheme: project.colorScheme,
            codeType: project.codeType,
            aiModel: project.aiModel,
        };
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        try {
            await this.streamingGeneration.generateWithStream(id, preferences, (progress) => {
                res.write(`data: ${JSON.stringify(progress)}\n\n`);
            });
            const files = await this.sandpackFormatter.formatForSandpack(id);
            res.write(`data: ${JSON.stringify({
                projectId: id,
                status: 'completed',
                progress: 100,
                message: 'Regeneration completed!',
                files,
            })}\n\n`);
            res.end();
        }
        catch (error) {
            await this.db.project.update({
                where: { id },
                data: { status: 'FAILED', errorMessage: error.message },
            });
            res.write(`data: ${JSON.stringify({
                projectId: id,
                status: 'failed',
                error: error.message,
            })}\n\n`);
            res.end();
        }
    }
    async delete(id, req) {
        const project = await this.db.project.findUnique({ where: { id } });
        if (!project)
            throw new common_1.NotFoundException('Project not found');
        if (project.userId !== req.user.id)
            throw new common_1.ForbiddenException('Access denied');
        await this.db.project.delete({ where: { id } });
        return { success: true, message: 'Project deleted' };
    }
    async getModels() {
        return {
            success: true,
            data: [
                {
                    id: 'GEMINI',
                    name: 'Gemini 2.0 Flash',
                    description: 'Google AI - Fast and powerful',
                    provider: 'Google',
                },
                {
                    id: 'QWEN',
                    name: 'Qwen 2.5 Coder',
                    description: 'Alibaba AI - Free via OpenRouter',
                    provider: 'OpenRouter',
                },
            ],
        };
    }
};
exports.GenerationController = GenerationController;
__decorate([
    (0, common_1.Post)('generate-stream'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [generate_website_dto_1.GenerateWebsiteDto, Object, Object]),
    __metadata("design:returntype", Promise)
], GenerationController.prototype, "generateStream", null);
__decorate([
    (0, common_1.Get)('project/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], GenerationController.prototype, "getProject", null);
__decorate([
    (0, common_1.Get)('project/:id/sandpack-files'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], GenerationController.prototype, "getSandpackFiles", null);
__decorate([
    (0, common_1.Get)('projects'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GenerationController.prototype, "getProjects", null);
__decorate([
    (0, common_1.Post)('project/:id/regenerate'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], GenerationController.prototype, "regenerate", null);
__decorate([
    (0, common_1.Post)('project/:id/delete'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], GenerationController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)('models'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GenerationController.prototype, "getModels", null);
exports.GenerationController = GenerationController = __decorate([
    (0, common_1.Controller)('generation'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        streaming_generation_service_1.StreamingGenerationService,
        sandpack_formatter_service_1.SandpackFormatterService])
], GenerationController);
//# sourceMappingURL=generation.controller.js.map