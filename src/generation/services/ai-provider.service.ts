// src/generation/services/ai-provider.service.ts

import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { generateObject } from 'ai';
import { google } from '@ai-sdk/google';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { AIModelProvider } from '../dto/generate-website.dto';

interface AvailableModel {
  id: AIModelProvider;
  name: string;
  description: string;
  free: boolean;
}

@Injectable()
export class AIProviderService {
  private logger = new Logger(AIProviderService.name);
  private geminiKey?: string;
  private openrouterKey?: string;
  private openrouter?: any;

  constructor(private config: ConfigService) {
    this.geminiKey = this.config.get('GOOGLE_GENERATIVE_AI_API_KEY');
    this.openrouterKey = this.config.get('OPENROUTER_API_KEY');

    if (this.openrouterKey) {
      this.openrouter = createOpenRouter({
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

  async generateWithModel<T>(
    model: AIModelProvider,
    schema: any,
    schemaName: string,
    description: string,
    prompt: string,
    maxRetries: number = 3,
  ): Promise<T> {
    let lastError: any;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        this.logger.log(`Attempt ${attempt}/${maxRetries} with ${model}`);

        if (model === AIModelProvider.QWEN) {
          return await this.useQwen<T>(schema, schemaName, description, prompt);
        } else {
          return await this.useGemini<T>(schema, schemaName, description, prompt);
        }
      } catch (error) {
        lastError = error;
        this.logger.error(`${model} attempt ${attempt} failed: ${error.message}`);

        if (attempt < maxRetries) {
          await this.delay(2000 * attempt);
        }
      }
    }

    if (model === AIModelProvider.GEMINI && this.openrouter) {
      this.logger.warn('Gemini failed all attempts, falling back to QWEN');
      try {
        return await this.useQwen<T>(schema, schemaName, description, prompt);
      } catch (fallbackError) {
        this.logger.error(`QWEN fallback also failed: ${fallbackError.message}`);
      }
    }

    throw new Error(`Failed after ${maxRetries} attempts. Last error: ${lastError.message}`);
  }

  private async useGemini<T>(schema: any, name: string, desc: string, prompt: string): Promise<T> {
    if (!this.geminiKey) {
      throw new Error('Gemini API key not configured');
    }

    process.env.GOOGLE_GENERATIVE_AI_API_KEY = this.geminiKey;

    const { object } = await generateObject({
      model: google('gemini-2.0-flash'),
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

    return object as T;
  }

  private async useQwen<T>(schema: any, name: string, desc: string, prompt: string): Promise<T> {
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

        const { object } = await generateObject({
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

        return object as T;
      } catch (error) {
        this.logger.warn(`${modelName} failed: ${error.message}`);
        continue;
      }
    }

    throw new Error('All OpenRouter models failed');
  }

  private sanitizePrompt(prompt: string): string {
    return prompt
      .replace(/\s+/g, ' ')
      .trim()
      .substring(0, 200000);
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  getAvailableModels(): AvailableModel[] {
    const models: AvailableModel[] = [];

    if (this.geminiKey) {
      models.push({
        id: AIModelProvider.GEMINI,
        name: 'Gemini 2.0 Flash',
        description: 'Google AI - Fast and powerful',
        free: false,
      });
    }

    if (this.openrouterKey) {
      models.push({
        id: AIModelProvider.QWEN,
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
}
