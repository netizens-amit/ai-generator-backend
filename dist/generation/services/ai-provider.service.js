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
var AIProviderService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIProviderService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const ai_1 = require("ai");
const google_1 = require("@ai-sdk/google");
const ai_sdk_provider_1 = require("@openrouter/ai-sdk-provider");
const generate_website_dto_1 = require("../dto/generate-website.dto");
let AIProviderService = AIProviderService_1 = class AIProviderService {
    config;
    logger = new common_1.Logger(AIProviderService_1.name);
    geminiKey;
    openrouterKey;
    openrouter;
    constructor(config) {
        this.config = config;
        this.geminiKey = this.config.get('GOOGLE_GENERATIVE_AI_API_KEY');
        this.openrouterKey = this.config.get('OPENROUTER_API_KEY');
        if (this.openrouterKey) {
            this.openrouter = (0, ai_sdk_provider_1.createOpenRouter)({
                apiKey: this.openrouterKey,
                headers: {
                    'HTTP-Referer': this.config.get('APP_URL') || 'http://localhost:5173',
                    'X-Title': this.config.get('APP_NAME') || 'AI WebGen',
                },
            });
        }
        this.logger.log(`Gemini: ${this.geminiKey ? 'Ready' : 'Not configured'}`);
        this.logger.log(`OpenRouter: ${this.openrouterKey ? 'Ready' : 'Not configured'}`);
    }
    async generateWithModel(model, schema, schemaName, description, prompt, maxRetries = 3) {
        let lastError;
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                this.logger.log(`Attempt ${attempt}/${maxRetries} with ${model}`);
                if (model === generate_website_dto_1.AIModelProvider.QWEN) {
                    return await this.useQwen(schema, schemaName, description, prompt);
                }
                else {
                    return await this.useGemini(schema, schemaName, description, prompt);
                }
            }
            catch (error) {
                lastError = error;
                this.logger.error(`${model} attempt ${attempt} failed: ${error.message}`);
                if (attempt < maxRetries) {
                    await this.delay(2000 * attempt);
                }
            }
        }
        if (model === generate_website_dto_1.AIModelProvider.GEMINI && this.openrouter) {
            this.logger.warn('Gemini failed all attempts, falling back to QWEN');
            try {
                return await this.useQwen(schema, schemaName, description, prompt);
            }
            catch (fallbackError) {
                this.logger.error(`QWEN fallback also failed: ${fallbackError.message}`);
            }
        }
        throw new Error(`Failed after ${maxRetries} attempts. Last error: ${lastError.message}`);
    }
    async useGemini(schema, name, desc, prompt) {
        if (!this.geminiKey) {
            throw new Error('Gemini API key not configured');
        }
        process.env.GOOGLE_GENERATIVE_AI_API_KEY = this.geminiKey;
        const { object } = await (0, ai_1.generateObject)({
            model: (0, google_1.google)('gemini-2.0-flash'),
            schema,
            schemaName: name,
            schemaDescription: desc,
            prompt: this.sanitizePrompt(prompt),
            mode: 'json',
            temperature: 0.7,
            maxRetries: 2,
        });
        if (!object) {
            throw new Error('Gemini returned empty response');
        }
        return object;
    }
    async useQwen(schema, name, desc, prompt) {
        if (!this.openrouter) {
            throw new Error('OpenRouter not configured');
        }
        const freeModels = [
            'qwen/qwen-2.5-coder-32b-instruct:free',
            'qwen/qwen3-30b-a3b:free',
            'qwen/qwen3-235b-a22b:free',
        ];
        for (const modelName of freeModels) {
            try {
                this.logger.log(`Trying OpenRouter model: ${modelName}`);
                const { object } = await (0, ai_1.generateObject)({
                    model: this.openrouter(modelName),
                    schema,
                    schemaName: name,
                    schemaDescription: desc,
                    prompt: this.sanitizePrompt(prompt),
                    mode: 'json',
                    temperature: 0.7,
                    maxRetries: 2,
                });
                if (!object) {
                    throw new Error('Empty response from model');
                }
                return object;
            }
            catch (error) {
                this.logger.warn(`${modelName} failed: ${error.message}`);
                continue;
            }
        }
        throw new Error('All OpenRouter models failed');
    }
    sanitizePrompt(prompt) {
        return prompt
            .replace(/\s+/g, ' ')
            .trim()
            .substring(0, 200000);
    }
    delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
    getAvailableModels() {
        const models = [];
        if (this.geminiKey) {
            models.push({
                id: generate_website_dto_1.AIModelProvider.GEMINI,
                name: 'Gemini 2.0 Flash',
                description: 'Google AI - Fast and powerful',
                free: false,
            });
        }
        if (this.openrouterKey) {
            models.push({
                id: generate_website_dto_1.AIModelProvider.QWEN,
                name: 'Qwen 2.5 Coder',
                description: 'Alibaba AI - Free via OpenRouter',
                free: false,
            });
        }
        if (models.length === 0) {
            throw new Error('No AI models configured');
        }
        return models;
    }
};
exports.AIProviderService = AIProviderService;
exports.AIProviderService = AIProviderService = AIProviderService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], AIProviderService);
//# sourceMappingURL=ai-provider.service.js.map