import { GenerateWebsiteDto } from '../dto/generate-website.dto';
export declare class PromptBuilderService {
    private logger;
    buildReactPrompt(preferences: GenerateWebsiteDto): string;
    private buildReactPromptInternal;
    buildHTMLPrompt(prefs: GenerateWebsiteDto): string;
}
