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
var StreamingGenerationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StreamingGenerationService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const generate_website_dto_1 = require("../dto/generate-website.dto");
const enhanced_prompt_builder_service_1 = require("./enhanced-prompt-builder.service");
const ai_provider_service_1 = require("./ai-provider.service");
const code_validator_service_1 = require("./code-validator.service");
const file_manager_service_1 = require("./file-manager.service");
const react_code_schema_1 = require("../schemas/react-code.schema");
const website_code_schema_1 = require("../schemas/website-code.schema");
let StreamingGenerationService = StreamingGenerationService_1 = class StreamingGenerationService {
    db;
    promptBuilder;
    aiProvider;
    validator;
    fileManager;
    logger = new common_1.Logger(StreamingGenerationService_1.name);
    constructor(db, promptBuilder, aiProvider, validator, fileManager) {
        this.db = db;
        this.promptBuilder = promptBuilder;
        this.aiProvider = aiProvider;
        this.validator = validator;
        this.fileManager = fileManager;
    }
    async generateWithStream(projectId, preferences, onProgress) {
        const startTime = Date.now();
        try {
            await this.emitProgress(projectId, onProgress, 5, 'analyzing_preferences', 'Analyzing your preferences...');
            await this.delay(500);
            await this.emitProgress(projectId, onProgress, 10, 'building_prompt', 'Building AI prompt...');
            const prompt = await this.promptBuilder.buildEnhancedPrompt(preferences);
            this.logger.log(`Prompt built: ${prompt.length} characters`);
            await this.emitProgress(projectId, onProgress, 20, 'generating_structure', 'Generating code structure...');
            const codeType = preferences.codeType || generate_website_dto_1.CodeType.REACT;
            let generatedCode;
            if (codeType === generate_website_dto_1.CodeType.REACT) {
                generatedCode = await this.generateReactWithRetry(preferences, prompt, projectId, onProgress);
            }
            else {
                generatedCode = await this.generateHTMLWithRetry(preferences, prompt, projectId, onProgress);
            }
            await this.emitProgress(projectId, onProgress, 70, 'validating_code', 'Validating generated code...');
            const validatedCode = await this.validateCode(generatedCode, codeType);
            await this.emitProgress(projectId, onProgress, 80, 'formatting_code', 'Formatting and optimizing...');
            const formattedCode = await this.formatCode(validatedCode, codeType);
            await this.emitProgress(projectId, onProgress, 90, 'saving_files', 'Saving files...');
            await this.fileManager.saveProjectFiles(projectId, formattedCode, codeType);
            const duration = Date.now() - startTime;
            await this.db.project.update({
                where: { id: projectId },
                data: {
                    status: 'COMPLETED',
                    progress: 100,
                    completedAt: new Date(),
                    generationLog: {
                        duration,
                        steps: 7,
                        aiModel: preferences.aiModel,
                    },
                },
            });
            await this.emitProgress(projectId, onProgress, 100, 'completed', `Generated successfully in ${(duration / 1000).toFixed(1)}s!`);
        }
        catch (error) {
            this.logger.error(`Generation failed: ${error.message}`, error.stack);
            await this.db.project.update({
                where: { id: projectId },
                data: {
                    status: 'FAILED',
                    errorMessage: error.message,
                },
            });
            onProgress({
                projectId,
                status: 'failed',
                progress: 0,
                currentStep: 'error',
                message: error.message,
                error: error.stack,
            });
            throw error;
        }
    }
    async generateReactWithRetry(preferences, prompt, projectId, onProgress) {
        const maxRetries = 3;
        let lastError;
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                await this.emitProgress(projectId, onProgress, 20 + (attempt * 15), 'generating_components', `Generating React components (attempt ${attempt}/${maxRetries})...`);
                const code = await this.aiProvider.generateWithModel(preferences.aiModel || generate_website_dto_1.AIModelProvider.GEMINI, react_code_schema_1.ReactCodeSchema, 'ReactWebsite', 'Complete React application with TypeScript and components', prompt, 2);
                if (!code.components || code.components.length < 6) {
                    throw new Error('Insufficient components generated');
                }
                this.logger.log(`✅ React code generated successfully on attempt ${attempt}`);
                await this.db.iteration.create({
                    data: {
                        projectId,
                        version: attempt,
                        status: 'success',
                        prompt: prompt.substring(0, 5000),
                        aiModel: preferences.aiModel || generate_website_dto_1.AIModelProvider.GEMINI,
                        duration: 0,
                    },
                });
                return code;
            }
            catch (error) {
                lastError = error;
                this.logger.warn(`Attempt ${attempt} failed: ${error.message}`);
                await this.db.iteration.create({
                    data: {
                        projectId,
                        version: attempt,
                        status: 'failed',
                        prompt: prompt.substring(0, 5000),
                        aiModel: preferences.aiModel || generate_website_dto_1.AIModelProvider.GEMINI,
                        errorLog: error.message,
                    },
                });
                if (attempt < maxRetries) {
                    await this.delay(2000 * attempt);
                }
            }
        }
        throw new Error(`Failed to generate React code after ${maxRetries} attempts: ${lastError.message}`);
    }
    async generateHTMLWithRetry(preferences, prompt, projectId, onProgress) {
        const maxRetries = 3;
        let lastError;
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                await this.emitProgress(projectId, onProgress, 20 + (attempt * 15), 'generating_structure', `Generating HTML structure (attempt ${attempt}/${maxRetries})...`);
                const code = await this.aiProvider.generateWithModel(preferences.aiModel || generate_website_dto_1.AIModelProvider.GEMINI, website_code_schema_1.WebsiteCodeSchema, 'WebsiteCode', 'Production-ready HTML website', prompt, 2);
                this.logger.log(`✅ HTML code generated successfully on attempt ${attempt}`);
                await this.db.iteration.create({
                    data: {
                        projectId,
                        version: attempt,
                        status: 'success',
                        prompt: prompt.substring(0, 5000),
                        aiModel: preferences.aiModel || generate_website_dto_1.AIModelProvider.GEMINI,
                        duration: 0,
                    },
                });
                return code;
            }
            catch (error) {
                lastError = error;
                this.logger.warn(`Attempt ${attempt} failed: ${error.message}`);
                await this.db.iteration.create({
                    data: {
                        projectId,
                        version: attempt,
                        status: 'failed',
                        prompt: prompt.substring(0, 5000),
                        aiModel: preferences.aiModel || generate_website_dto_1.AIModelProvider.GEMINI,
                        errorLog: error.message,
                    },
                });
                if (attempt < maxRetries) {
                    await this.delay(2000 * attempt);
                }
            }
        }
        throw new Error(`Failed to generate HTML code after ${maxRetries} attempts: ${lastError.message}`);
    }
    async validateCode(code, codeType) {
        if (codeType === generate_website_dto_1.CodeType.REACT) {
            const reactCode = code;
            return {
                appTsx: await this.validator.validateReactComponent(reactCode.appTsx),
                appCss: await this.validator.validateAndFormat(reactCode.appCss, 'css'),
                indexTsx: await this.validator.validateAndFormat(reactCode.indexTsx, 'typescript'),
                packageJson: reactCode.packageJson,
                components: await this.validator.validateReactComponents(reactCode.components),
            };
        }
        else {
            const htmlCode = code;
            return {
                html: await this.validator.validateAndFormat(htmlCode.html, 'html'),
                css: await this.validator.validateAndFormat(htmlCode.css, 'css'),
                js: await this.validator.validateAndFormat(htmlCode.js, 'babel'),
                metadata: htmlCode.metadata,
            };
        }
    }
    async formatCode(code, codeType) {
        if (codeType === generate_website_dto_1.CodeType.REACT) {
            code.components = code.components.map((comp) => ({
                ...comp,
                code: this.ensureReactImport(comp.code),
            }));
        }
        return code;
    }
    ensureReactImport(code) {
        if (!code.includes("import React from 'react'") && !code.includes('import React')) {
            return `import React from 'react';\n${code}`;
        }
        return code;
    }
    async emitProgress(projectId, onProgress, progress, step, message) {
        await this.db.project.update({
            where: { id: projectId },
            data: {
                progress,
                currentStep: step,
            },
        });
        onProgress({
            projectId,
            status: 'processing',
            progress,
            currentStep: step,
            message,
        });
    }
    delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
};
exports.StreamingGenerationService = StreamingGenerationService;
exports.StreamingGenerationService = StreamingGenerationService = StreamingGenerationService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        enhanced_prompt_builder_service_1.EnhancedPromptBuilderService,
        ai_provider_service_1.AIProviderService,
        code_validator_service_1.CodeValidatorService,
        file_manager_service_1.FileManagerService])
], StreamingGenerationService);
//# sourceMappingURL=streaming-generation.service.js.map