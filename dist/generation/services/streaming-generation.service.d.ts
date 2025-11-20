import { PrismaService } from '../../prisma/prisma.service';
import { GenerateWebsiteDto, GenerationProgress } from '../dto/generate-website.dto';
import { EnhancedPromptBuilderService } from './enhanced-prompt-builder.service';
import { AIProviderService } from './ai-provider.service';
import { CodeValidatorService } from './code-validator.service';
import { FileManagerService } from './file-manager.service';
type ProgressCallback = (progress: GenerationProgress) => void;
export declare class StreamingGenerationService {
    private db;
    private promptBuilder;
    private aiProvider;
    private validator;
    private fileManager;
    private logger;
    constructor(db: PrismaService, promptBuilder: EnhancedPromptBuilderService, aiProvider: AIProviderService, validator: CodeValidatorService, fileManager: FileManagerService);
    generateWithStream(projectId: string, preferences: GenerateWebsiteDto, onProgress: ProgressCallback): Promise<void>;
    private generateReactWithRetry;
    private generateHTMLWithRetry;
    private validateCode;
    private formatCode;
    private ensureReactImport;
    private emitProgress;
    private delay;
}
export {};
