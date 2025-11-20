// src/generation/services/generation.service.ts

import { Injectable, Logger } from '@nestjs/common';
import { GenerateWebsiteDto, CodeType, AIModelProvider } from '../dto/generate-website.dto';
import { CacheService } from '../../cache/cache.service';
import { PromptBuilderService } from '../prompts/prompt-builder.service';
import { AIProviderService } from './ai-provider.service';
import { CodeValidatorService } from './code-validator.service';
import { ReactCodeSchema, ReactCode } from '../schemas/react-code.schema';
import { WebsiteCodeSchema, WebsiteCode } from '../schemas/website-code.schema';

@Injectable()
export class GenerationService {
  private logger = new Logger(GenerationService.name);

  constructor(
    private cache: CacheService,
    private promptBuilder: PromptBuilderService,
    private aiProvider: AIProviderService,
    private validator: CodeValidatorService,
  ) {}

  /**
   * Main method: Generate website code
   */
  async generate(preferences: GenerateWebsiteDto): Promise<any> {
    const aiModel = preferences.aiModel || AIModelProvider.GEMINI;
    
    // Check cache first
    const cacheKey = this.cache.generateCacheKey({ ...preferences, aiModel });
    const cached = await this.cache.get(cacheKey);
    
    if (cached) {
      this.logger.log('Cache hit - returning instantly');
      return cached;
    }

    // Generate fresh code
    let code;
    if (preferences.codeType === CodeType.REACT) {
      code = await this.generateReact(preferences, aiModel);
    } else {
      code = await this.generateHTML(preferences, aiModel);
    }

    // Save to cache
    await this.cache.set(cacheKey, code);

    return code;
  }

  /**
   * Generate React code
   */
  private async generateReact(prefs: GenerateWebsiteDto, model: AIModelProvider): Promise<ReactCode> {
    const prompt = this.promptBuilder.buildReactPrompt(prefs);

    const generated = await this.aiProvider.generateWithModel<ReactCode>(
      model,
      ReactCodeSchema,
      'ReactWebsite',
      'Complete React application with separate component files',
      prompt,
    );

    // Validate components
    const validatedComponents = await this.validator.validateReactComponents(generated.components);

    return {
      appTsx: await this.validator.validateReactComponent(generated.appTsx),
      appCss: await this.validator.validateAndFormat(generated.appCss, 'css'),
      indexTsx: await this.validator.validateAndFormat(generated.indexTsx, 'typescript'),
      packageJson: generated.packageJson || this.getDefaultPackageJson(prefs.companyName),
      components: validatedComponents,
    };
  }

  /**
   * Generate HTML code
   */
  private async generateHTML(prefs: GenerateWebsiteDto, model: AIModelProvider): Promise<WebsiteCode> {
    const prompt = this.promptBuilder.buildHTMLPrompt(prefs);

    const generated = await this.aiProvider.generateWithModel<WebsiteCode>(
      model,
      WebsiteCodeSchema,
      'WebsiteCode',
      'Production-ready HTML website',
      prompt,
    );

    // Validate and clean
    const html = await this.validator.validateAndFormat(generated.html, 'html');
    const css = await this.validator.validateAndFormat(generated.css, 'css');
    const js = await this.validator.validateAndFormat(generated.js, 'babel');

    return {
      html,
      css,
      js,
      metadata: generated.metadata || {
        title: `${prefs.companyName} - ${prefs.industry}`,
        description: `Welcome to ${prefs.companyName}`,
        colorScheme: prefs.colorScheme,
      },
    };
  }

  private getDefaultPackageJson(name: string): string {
    return JSON.stringify({
      name: name.toLowerCase().replace(/\s+/g, '-'),
      version: '1.0.0',
      private: true,
      dependencies: {
        react: '^18.2.0',
        'react-dom': '^18.2.0',
      },
      devDependencies: {
        '@types/react': '^18.2.0',
        '@types/react-dom': '^18.2.0',
        typescript: '^5.0.0',
      },
    }, null, 2);
  }
}
