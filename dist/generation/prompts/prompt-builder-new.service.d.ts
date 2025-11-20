import { GenerateWebsiteDto } from '../dto/generate-website.dto';
export declare class PromptBuilderService {
    buildReactPrompt(prefs: GenerateWebsiteDto): string;
    buildHTMLPrompt(prefs: GenerateWebsiteDto): string;
    getPromptStats(prompt: string): {
        lines: number;
        chars: number;
        words: number;
        estimatedTokens: number;
    };
}
