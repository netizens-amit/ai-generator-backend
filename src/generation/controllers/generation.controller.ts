// src/generation/controllers/generation.controller.ts

import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  UseGuards,
  Request,
  NotFoundException,
  ForbiddenException,
  Res,
  Sse,
  MessageEvent,
} from '@nestjs/common';
import type { Response } from 'express';
import { Observable, interval } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GenerateWebsiteDto, GenerationProgress } from '../dto/generate-website.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { StreamingGenerationService } from '../services/streaming-generation.service';
import { SandpackFormatterService } from '../services/sandpack-formatter.service';
import { Prisma } from '@prisma/client';

@Controller('generation')
export class GenerationController {
  constructor(
    private db: PrismaService,
    private streamingGeneration: StreamingGenerationService,
    private sandpackFormatter: SandpackFormatterService,
  ) {}

  /**
   * Streaming generation endpoint using Server-Sent Events
   */
  @Post('generate-stream')
  @UseGuards(JwtAuthGuard)
  async generateStream(
    @Body() dto: GenerateWebsiteDto,
    @Request() req,
    @Res() res: Response,
  ) {
    // Create project
    const project = await this.db.project.create({
      data: {
        userId: req.user.id,
        companyName: dto.companyName,
        industry: dto.industry,
        websiteType: dto.websiteType,
        designStyle: dto.designStyle,
        colorScheme: dto.colorScheme as any,
        codeType: dto.codeType || 'REACT',
        aiModel: dto.aiModel || 'GEMINI',
        status: 'PROCESSING',
        progress: 0,
      },
    });

    // Set up SSE
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('X-Accel-Buffering', 'no');

    // Send initial event
    res.write(`data: ${JSON.stringify({
      projectId: project.id,
      status: 'processing',
      progress: 0,
      message: 'Starting generation...',
    })}\n\n`);

    try {
      // Stream generation
      await this.streamingGeneration.generateWithStream(
        project.id,
        dto,
        (progress: GenerationProgress) => {
          res.write(`data: ${JSON.stringify(progress)}\n\n`);
        },
      );

      // Send completion
      const files = await this.sandpackFormatter.formatForSandpack(project.id);
      
      res.write(`data: ${JSON.stringify({
        projectId: project.id,
        status: 'completed',
        progress: 100,
        message: 'Generation completed!',
        files,
      })}\n\n`);

      res.end();
    } catch (error) {
      // Send error
      await this.db.project.update({
        where: { id: project.id },
        data: { 
          status: 'FAILED', 
          errorMessage: error.message 
        },
      });

      res.write(`data: ${JSON.stringify({
        projectId: project.id,
        status: 'failed',
        progress: 0,
        message: error.message,
        error: error.stack,
      })}\n\n`);

      res.end();
    }
  }

  /**
   * Get project with Sandpack-formatted files
   */
  @Get('project/:id')
  @UseGuards(JwtAuthGuard)
  async getProject(@Param('id') id: string, @Request() req) {
    const project = await this.db.project.findUnique({
      where: { id },
      include: { files: true },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    if (project.userId !== req.user.id) {
      throw new ForbiddenException('Access denied');
    }

    return { success: true, data: project };
  }

  /**
   * Get project files in Sandpack format
   */
  @Get('project/:id/sandpack-files')
  @UseGuards(JwtAuthGuard)
  async getSandpackFiles(@Param('id') id: string, @Request() req) {
    const project = await this.db.project.findFirst({
      where: {
        id,
        userId: req.user.id,
        status: 'COMPLETED',
      },
    });

    if (!project) {
      throw new NotFoundException('Project not found or not completed');
    }

    const files = await this.sandpackFormatter.formatForSandpack(id);

    return {
      success: true,
      data: {
        projectId: id,
        codeType: project.codeType,
        files,
      },
    };
  }

  /**
   * Get all user projects
   */
  @Get('projects')
  @UseGuards(JwtAuthGuard)
  async getProjects(@Request() req) {
    const projects = await this.db.project.findMany({
      where: { userId: req.user.id },
      include: { 
        files: {
          select: {
            id: true,
            fileName: true,
            fileType: true,
            fileSize: true,
            createdAt: true,
          }
        } 
      },
      orderBy: { createdAt: 'desc' },
    });

    return { success: true, data: projects };
  }

  /**
   * Regenerate project with same preferences
   */
  @Post('project/:id/regenerate')
  @UseGuards(JwtAuthGuard)
  async regenerate(
    @Param('id') id: string,
    @Request() req,
    @Res() res: Response,
  ) {
    const project = await this.db.project.findUnique({ where: { id } });
    
    if (!project) throw new NotFoundException('Project not found');
    if (project.userId !== req.user.id) throw new ForbiddenException('Access denied');

    // Reset project
    await this.db.project.update({
      where: { id },
      data: {
        status: 'PROCESSING',
        errorMessage: null,
        progress: 0,
        completedAt: null,
      },
    });

    // Delete old files
    await this.db.file.deleteMany({ where: { projectId: id } });

    const preferences: GenerateWebsiteDto = {
      companyName: project.companyName,
      industry: project.industry,
      websiteType: project.websiteType,
      designStyle: project.designStyle,
      colorScheme: project.colorScheme as any,
      codeType: project.codeType as any,
      aiModel: project.aiModel as any,
    };

    // Set up SSE
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    try {
      await this.streamingGeneration.generateWithStream(
        id,
        preferences,
        (progress: GenerationProgress) => {
          res.write(`data: ${JSON.stringify(progress)}\n\n`);
        },
      );

      const files = await this.sandpackFormatter.formatForSandpack(id);
      
      res.write(`data: ${JSON.stringify({
        projectId: id,
        status: 'completed',
        progress: 100,
        message: 'Regeneration completed!',
        files,
      })}\n\n`);

      res.end();
    } catch (error) {
      await this.db.project.update({
        where: { id },
        data: { status: 'FAILED', errorMessage: error.message },
      });

      res.write(`data: ${JSON.stringify({
        projectId: id,
        status: 'failed',
        error: error.message,
      })}\n\n`);

      res.end();
    }
  }

  /**
   * Delete project
   */
  @Post('project/:id/delete')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string, @Request() req) {
    const project = await this.db.project.findUnique({ where: { id } });

    if (!project) throw new NotFoundException('Project not found');
    if (project.userId !== req.user.id) throw new ForbiddenException('Access denied');

    await this.db.project.delete({ where: { id } });

    return { success: true, message: 'Project deleted' };
  }

  /**
   * Get available AI models
   */
  @Get('models')
  async getModels() {
    return {
      success: true,
      data: [
        {
          id: 'GEMINI',
          name: 'Gemini 2.0 Flash',
          description: 'Google AI - Fast and powerful',
          provider: 'Google',
        },
        {
          id: 'QWEN',
          name: 'Qwen 2.5 Coder',
          description: 'Alibaba AI - Free via OpenRouter',
          provider: 'OpenRouter',
        },
      ],
    };
  }
}