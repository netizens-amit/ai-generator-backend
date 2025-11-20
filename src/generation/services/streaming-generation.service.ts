// src/generation/services/streaming-generation.service.ts

import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { GenerateWebsiteDto, GenerationProgress, CodeType, AIModelProvider } from '../dto/generate-website.dto';
import { EnhancedPromptBuilderService } from './enhanced-prompt-builder.service';
import { AIProviderService } from './ai-provider.service';
import { CodeValidatorService } from './code-validator.service';
import { FileManagerService } from './file-manager.service';
import { ReactCodeSchema, ReactCode } from '../schemas/react-code.schema';
import { WebsiteCodeSchema, WebsiteCode } from '../schemas/website-code.schema';

type ProgressCallback = (progress: GenerationProgress) => void;

@Injectable()
export class StreamingGenerationService {
    private logger = new Logger(StreamingGenerationService.name);

    constructor(
        private db: PrismaService,
        private promptBuilder: EnhancedPromptBuilderService,
        private aiProvider: AIProviderService,
        private validator: CodeValidatorService,
        private fileManager: FileManagerService,
    ) { }

    /**
     * Main streaming generation method
     */
    async generateWithStream(
        projectId: string,
        preferences: GenerateWebsiteDto,
        onProgress: ProgressCallback,
    ): Promise<void> {
        const startTime = Date.now();

        try {
            // Step 1: Analyze preferences
            await this.emitProgress(projectId, onProgress, 5, 'analyzing_preferences', 'Analyzing your preferences...');
            await this.delay(500);

            // Step 2: Build enhanced prompt
            await this.emitProgress(projectId, onProgress, 10, 'building_prompt', 'Building AI prompt...');
            const prompt = await this.promptBuilder.buildEnhancedPrompt(preferences);
            this.logger.log(`Prompt built: ${prompt.length} characters`);

            // Step 3: Generate code structure
            await this.emitProgress(projectId, onProgress, 20, 'generating_structure', 'Generating code structure...');

            // Default to REACT if codeType is undefined
            const codeType = preferences.codeType || CodeType.REACT;

            let generatedCode: ReactCode | WebsiteCode;

            if (codeType === CodeType.REACT) {
                generatedCode = await this.generateReactWithRetry(
                    preferences,
                    prompt,
                    projectId,
                    onProgress,
                );
            } else {
                generatedCode = await this.generateHTMLWithRetry(
                    preferences,
                    prompt,
                    projectId,
                    onProgress,
                );
            }

            // Step 4: Validate code
            await this.emitProgress(projectId, onProgress, 70, 'validating_code', 'Validating generated code...');
            const validatedCode = await this.validateCode(generatedCode, codeType);

            // Step 5: Format and optimize
            await this.emitProgress(projectId, onProgress, 80, 'formatting_code', 'Formatting and optimizing...');
            const formattedCode = await this.formatCode(validatedCode, codeType);

            // Step 6: Save files
            await this.emitProgress(projectId, onProgress, 90, 'saving_files', 'Saving files...');
            await this.fileManager.saveProjectFiles(projectId, formattedCode, codeType);

            // Step 7: Complete
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

        } catch (error) {
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

    /**
     * Generate React code with retry mechanism
     */
    private async generateReactWithRetry(
        preferences: GenerateWebsiteDto,
        prompt: string,
        projectId: string,
        onProgress: ProgressCallback,
    ): Promise<ReactCode> {
        const maxRetries = 3;
        let lastError: any;

        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                await this.emitProgress(
                    projectId,
                    onProgress,
                    20 + (attempt * 15),
                    'generating_components',
                    `Generating React components (attempt ${attempt}/${maxRetries})...`,
                );

                const code = await this.aiProvider.generateWithModel<ReactCode>(
                    preferences.aiModel || AIModelProvider.GEMINI,
                    ReactCodeSchema,
                    'ReactWebsite',
                    'Complete React application with TypeScript and components',
                    prompt,
                    2, // AI provider internal retries
                );

                // Quick validation
                if (!code.components || code.components.length < 6) {
                    throw new Error('Insufficient components generated');
                }

                this.logger.log(`✅ React code generated successfully on attempt ${attempt}`);

                // Log iteration
                await this.db.iteration.create({
                    data: {
                        projectId,
                        version: attempt,
                        status: 'success',
                        prompt: prompt.substring(0, 5000),
                        aiModel: preferences.aiModel || AIModelProvider.GEMINI,
                        duration: 0,
                    },
                });

                return code;

            } catch (error) {
                lastError = error;
                this.logger.warn(`Attempt ${attempt} failed: ${error.message}`);

                await this.db.iteration.create({
                    data: {
                        projectId,
                        version: attempt,
                        status: 'failed',
                        prompt: prompt.substring(0, 5000),
                        aiModel: preferences.aiModel || AIModelProvider.GEMINI,
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

    /**
     * Generate HTML code with retry mechanism
     */
    private async generateHTMLWithRetry(
        preferences: GenerateWebsiteDto,
        prompt: string,
        projectId: string,
        onProgress: ProgressCallback,
    ): Promise<WebsiteCode> {
        const maxRetries = 3;
        let lastError: any;

        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                await this.emitProgress(
                    projectId,
                    onProgress,
                    20 + (attempt * 15),
                    'generating_structure',
                    `Generating HTML structure (attempt ${attempt}/${maxRetries})...`,
                );

                const code = await this.aiProvider.generateWithModel<WebsiteCode>(
                    preferences.aiModel || AIModelProvider.GEMINI,
                    WebsiteCodeSchema,
                    'WebsiteCode',
                    'Production-ready HTML website',
                    prompt,
                    2,
                );

                this.logger.log(`✅ HTML code generated successfully on attempt ${attempt}`);

                await this.db.iteration.create({
                    data: {
                        projectId,
                        version: attempt,
                        status: 'success',
                        prompt: prompt.substring(0, 5000),
                        aiModel: preferences.aiModel || AIModelProvider.GEMINI,
                        duration: 0,
                    },
                });

                return code;

            } catch (error) {
                lastError = error;
                this.logger.warn(`Attempt ${attempt} failed: ${error.message}`);

                await this.db.iteration.create({
                    data: {
                        projectId,
                        version: attempt,
                        status: 'failed',
                        prompt: prompt.substring(0, 5000),
                        aiModel: preferences.aiModel || AIModelProvider.GEMINI,
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

    /**
     * Validate generated code
     */
    private async validateCode(code: ReactCode | WebsiteCode, codeType: CodeType): Promise<any> {
        if (codeType === CodeType.REACT) {
            const reactCode = code as ReactCode;
            return {
                appTsx: await this.validator.validateReactComponent(reactCode.appTsx),
                appCss: await this.validator.validateAndFormat(reactCode.appCss, 'css'),
                indexTsx: await this.validator.validateAndFormat(reactCode.indexTsx, 'typescript'),
                packageJson: reactCode.packageJson,
                components: await this.validator.validateReactComponents(reactCode.components),
            };
        } else {
            const htmlCode = code as WebsiteCode;
            return {
                html: await this.validator.validateAndFormat(htmlCode.html, 'html'),
                css: await this.validator.validateAndFormat(htmlCode.css, 'css'),
                js: await this.validator.validateAndFormat(htmlCode.js, 'babel'),
                metadata: htmlCode.metadata,
            };
        }
    }

    /**
     * Format and optimize code
     */
    private async formatCode(code: any, codeType: CodeType): Promise<any> {
        // Additional formatting and optimization
        if (codeType === CodeType.REACT) {
            // Ensure all imports are correct
            code.components = code.components.map((comp: any) => ({
                ...comp,
                code: this.ensureReactImport(comp.code),
            }));
        }

        return code;
    }

    /**
     * Ensure React import exists
     */
    private ensureReactImport(code: string): string {
        if (!code.includes("import React from 'react'") && !code.includes('import React')) {
            return `import React from 'react';\n${code}`;
        }
        return code;
    }

    /**
     * Emit progress update
     */
    private async emitProgress(
        projectId: string,
        onProgress: ProgressCallback,
        progress: number,
        step: string,
        message: string,
    ): Promise<void> {
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

    /**
     * Delay helper
     */
    private delay(ms: number): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
}
