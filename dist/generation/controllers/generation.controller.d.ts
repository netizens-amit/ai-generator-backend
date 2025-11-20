import type { Response } from 'express';
import { GenerateWebsiteDto } from '../dto/generate-website.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { StreamingGenerationService } from '../services/streaming-generation.service';
import { SandpackFormatterService } from '../services/sandpack-formatter.service';
import { Prisma } from '@prisma/client';
export declare class GenerationController {
    private db;
    private streamingGeneration;
    private sandpackFormatter;
    constructor(db: PrismaService, streamingGeneration: StreamingGenerationService, sandpackFormatter: SandpackFormatterService);
    generateStream(dto: GenerateWebsiteDto, req: any, res: Response): Promise<void>;
    getProject(id: string, req: any): Promise<{
        success: boolean;
        data: {
            files: {
                fileName: string;
                id: string;
                projectId: string;
                filePath: string;
                fileType: import("@prisma/client").$Enums.FileType;
                fileSize: number;
                content: string;
                version: number;
                createdAt: Date;
                updatedAt: Date;
            }[];
        } & {
            colorScheme: Prisma.JsonValue;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            companyName: string;
            industry: string;
            websiteType: string;
            designStyle: string;
            codeType: import("@prisma/client").$Enums.CodeType;
            aiModel: import("@prisma/client").$Enums.AIModel;
            status: import("@prisma/client").$Enums.ProjectStatus;
            progress: number;
            currentStep: string | null;
            errorMessage: string | null;
            completedAt: Date | null;
            generationLog: Prisma.JsonValue | null;
        };
    }>;
    getSandpackFiles(id: string, req: any): Promise<{
        success: boolean;
        data: {
            projectId: string;
            codeType: import("@prisma/client").$Enums.CodeType;
            files: Record<string, string>;
        };
    }>;
    getProjects(req: any): Promise<{
        success: boolean;
        data: ({
            files: {
                fileName: string;
                id: string;
                fileType: import("@prisma/client").$Enums.FileType;
                fileSize: number;
                createdAt: Date;
            }[];
        } & {
            colorScheme: Prisma.JsonValue;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            companyName: string;
            industry: string;
            websiteType: string;
            designStyle: string;
            codeType: import("@prisma/client").$Enums.CodeType;
            aiModel: import("@prisma/client").$Enums.AIModel;
            status: import("@prisma/client").$Enums.ProjectStatus;
            progress: number;
            currentStep: string | null;
            errorMessage: string | null;
            completedAt: Date | null;
            generationLog: Prisma.JsonValue | null;
        })[];
    }>;
    regenerate(id: string, req: any, res: Response): Promise<void>;
    delete(id: string, req: any): Promise<{
        success: boolean;
        message: string;
    }>;
    getModels(): Promise<{
        success: boolean;
        data: {
            id: string;
            name: string;
            description: string;
            provider: string;
        }[];
    }>;
}
