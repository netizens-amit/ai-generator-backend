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
var GenerationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerationService = void 0;
const common_1 = require("@nestjs/common");
const generate_website_dto_1 = require("../dto/generate-website.dto");
const cache_service_1 = require("../../cache/cache.service");
const prompt_builder_service_1 = require("../prompts/prompt-builder.service");
const ai_provider_service_1 = require("./ai-provider.service");
const code_validator_service_1 = require("./code-validator.service");
const react_code_schema_1 = require("../schemas/react-code.schema");
const website_code_schema_1 = require("../schemas/website-code.schema");
let GenerationService = GenerationService_1 = class GenerationService {
    cache;
    promptBuilder;
    aiProvider;
    validator;
    logger = new common_1.Logger(GenerationService_1.name);
    constructor(cache, promptBuilder, aiProvider, validator) {
        this.cache = cache;
        this.promptBuilder = promptBuilder;
        this.aiProvider = aiProvider;
        this.validator = validator;
    }
    async generate(preferences) {
        const aiModel = preferences.aiModel || generate_website_dto_1.AIModelProvider.GEMINI;
        const cacheKey = this.cache.generateCacheKey({ ...preferences, aiModel });
        const cached = await this.cache.get(cacheKey);
        if (cached) {
            this.logger.log('Cache hit - returning instantly');
            return cached;
        }
        let code;
        if (preferences.codeType === generate_website_dto_1.CodeType.REACT) {
            code = await this.generateReact(preferences, aiModel);
        }
        else {
            code = await this.generateHTML(preferences, aiModel);
        }
        await this.cache.set(cacheKey, code);
        return code;
    }
    async generateReact(prefs, model) {
        const prompt = this.promptBuilder.buildReactPrompt(prefs);
        const generated = await this.aiProvider.generateWithModel(model, react_code_schema_1.ReactCodeSchema, 'ReactWebsite', 'Complete React application with separate component files', prompt);
        const validatedComponents = await this.validator.validateReactComponents(generated.components);
        return {
            appTsx: await this.validator.validateReactComponent(generated.appTsx),
            appCss: await this.validator.validateAndFormat(generated.appCss, 'css'),
            indexTsx: await this.validator.validateAndFormat(generated.indexTsx, 'typescript'),
            packageJson: generated.packageJson || this.getDefaultPackageJson(prefs.companyName),
            components: validatedComponents,
        };
    }
    async generateHTML(prefs, model) {
        const prompt = this.promptBuilder.buildHTMLPrompt(prefs);
        const generated = await this.aiProvider.generateWithModel(model, website_code_schema_1.WebsiteCodeSchema, 'WebsiteCode', 'Production-ready HTML website', prompt);
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
    getDefaultPackageJson(name) {
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
};
exports.GenerationService = GenerationService;
exports.GenerationService = GenerationService = GenerationService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [cache_service_1.CacheService,
        prompt_builder_service_1.PromptBuilderService,
        ai_provider_service_1.AIProviderService,
        code_validator_service_1.CodeValidatorService])
], GenerationService);
//# sourceMappingURL=generation.service.js.map