import { GenerateWebsiteDto } from '../dto/generate-website.dto';
export declare class EnhancedPromptBuilderService {
    private logger;
    buildEnhancedPrompt(preferences: GenerateWebsiteDto): Promise<string>;
    private buildReactPrompt;
    private buildHTMLPrompt;
}
