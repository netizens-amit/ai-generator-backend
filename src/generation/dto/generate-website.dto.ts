// src/generation/dto/generate-website.dto.ts

import { IsString, IsEnum, IsObject, IsOptional } from 'class-validator';

export enum CodeType {
  HTML = 'HTML',
  REACT = 'REACT',
}

export enum AIModelProvider {
  GEMINI = 'GEMINI',
  QWEN = 'QWEN',
}

export class ColorSchemeDto {
  @IsString()
  name: string;

  @IsString()
  primary: string;

  @IsString()
  secondary: string;

  @IsString()
  accent: string;
}

export class GenerateWebsiteDto {
  @IsString()
  companyName: string;

  @IsString()
  industry: string;

  @IsString()
  websiteType: string;

  @IsString()
  designStyle: string;

  @IsObject()
  colorScheme: ColorSchemeDto;

  @IsEnum(CodeType)
  @IsOptional()
  codeType?: CodeType;

  @IsEnum(AIModelProvider)
  @IsOptional()
  aiModel?: AIModelProvider;
}

// New DTO for streaming response
export interface GenerationProgress {
  projectId: string;
  status: 'processing' | 'validating' | 'completed' | 'failed';
  progress: number;
  currentStep: string;
  message: string;
  files?: Record<string, string>; // Sandpack format
  error?: string;
}

// New DTO for edit intent
export class EditIntentDto {
  @IsString()
  projectId: string;

  @IsString()
  instruction: string;

  @IsOptional()
  @IsString()
  targetFile?: string; // Specific file to edit
}