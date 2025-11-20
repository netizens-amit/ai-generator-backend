import { GenerateWebsiteDto } from '../dto/generate-website.dto';
import { CacheService } from '../../cache/cache.service';
import { PromptBuilderService } from '../prompts/prompt-builder.service';
import { AIProviderService } from './ai-provider.service';
import { CodeValidatorService } from './code-validator.service';
export declare class GenerationService {
    private cache;
    private promptBuilder;
    private aiProvider;
    private validator;
    private logger;
    constructor(cache: CacheService, promptBuilder: PromptBuilderService, aiProvider: AIProviderService, validator: CodeValidatorService);
    generate(preferences: GenerateWebsiteDto): Promise<any>;
    private generateReact;
    private generateHTML;
    private getDefaultPackageJson;
}
