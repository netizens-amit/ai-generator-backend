"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerationModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const generation_controller_1 = require("./controllers/generation.controller");
const streaming_generation_service_1 = require("./services/streaming-generation.service");
const enhanced_prompt_builder_service_1 = require("./services/enhanced-prompt-builder.service");
const ai_provider_service_1 = require("./services/ai-provider.service");
const code_validator_service_1 = require("./services/code-validator.service");
const file_manager_service_1 = require("./services/file-manager.service");
const sandpack_formatter_service_1 = require("./services/sandpack-formatter.service");
const prisma_module_1 = require("../prisma/prisma.module");
const cache_module_1 = require("../cache/cache.module");
let GenerationModule = class GenerationModule {
};
exports.GenerationModule = GenerationModule;
exports.GenerationModule = GenerationModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule,
            prisma_module_1.PrismaModule,
            cache_module_1.CacheModule,
        ],
        controllers: [generation_controller_1.GenerationController],
        providers: [
            streaming_generation_service_1.StreamingGenerationService,
            enhanced_prompt_builder_service_1.EnhancedPromptBuilderService,
            ai_provider_service_1.AIProviderService,
            code_validator_service_1.CodeValidatorService,
            file_manager_service_1.FileManagerService,
            sandpack_formatter_service_1.SandpackFormatterService,
        ],
        exports: [
            streaming_generation_service_1.StreamingGenerationService,
            sandpack_formatter_service_1.SandpackFormatterService,
            file_manager_service_1.FileManagerService,
        ],
    })
], GenerationModule);
//# sourceMappingURL=generation.module.js.map