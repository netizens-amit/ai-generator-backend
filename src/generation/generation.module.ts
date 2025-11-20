// src/generation/generation.module.ts

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// Controllers
import { GenerationController } from './controllers/generation.controller';

// Services
import { StreamingGenerationService } from './services/streaming-generation.service';
import { EnhancedPromptBuilderService } from './services/enhanced-prompt-builder.service';
import { AIProviderService } from './services/ai-provider.service';
import { CodeValidatorService } from './services/code-validator.service';
import { FileManagerService } from './services/file-manager.service';
import { SandpackFormatterService } from './services/sandpack-formatter.service';

// Modules
import { PrismaModule } from '../prisma/prisma.module';
import { CacheModule } from '../cache/cache.module';

@Module({
  imports: [
    ConfigModule,
    PrismaModule,
    CacheModule, // For caching generated code
  ],
  controllers: [GenerationController],
  providers: [
    // Core services
    StreamingGenerationService,
    EnhancedPromptBuilderService,
    AIProviderService,
    CodeValidatorService,
    FileManagerService,
    SandpackFormatterService,
  ],
  exports: [
    StreamingGenerationService,
    SandpackFormatterService,
    FileManagerService,
  ],
})
export class GenerationModule {}