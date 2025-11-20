import { ConfigService } from '@nestjs/config';
import { AIModelProvider } from '../dto/generate-website.dto';
interface AvailableModel {
    id: AIModelProvider;
    name: string;
    description: string;
    free: boolean;
}
export declare class AIProviderService {
    private config;
    private logger;
    private geminiKey?;
    private openrouterKey?;
    private openrouter?;
    constructor(config: ConfigService);
    generateWithModel<T>(model: AIModelProvider, schema: any, schemaName: string, description: string, prompt: string, maxRetries?: number): Promise<T>;
    private useGemini;
    private useQwen;
    private sanitizePrompt;
    private delay;
    getAvailableModels(): AvailableModel[];
}
export {};
