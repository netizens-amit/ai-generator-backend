import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { PrismaService } from '../prisma/prisma.service';
import { GenerationService } from './services/generation.service';
import { StorageService } from '../storage/storage.service';
import { EventsGateway } from '../websocket/events.gateway';
import { ReactCode } from './schemas/react-code.schema';
import { FileType } from '@prisma/client';

@Processor('generation-queue')
export class GenerationProcessor extends WorkerHost {
  private logger = new Logger(GenerationProcessor.name);

  constructor(
    private db: PrismaService,
    private generationService: GenerationService,
    private storage: StorageService,
    private events: EventsGateway,
  ) {
    super();
  }

  async process(job: Job): Promise<any> {
    const { projectId, preferences } = job.data;

    try {
      // Get project with user info
      const project = await this.db.project.findUnique({
        where: { id: projectId },
        select: { userId: true },
      });

      if (!project) {
        throw new Error('Project not found');
      }

      const userId = project.userId;

      // Step 1: Update status
      await this.updateProgress(projectId, userId, 10, 'Generating code...');

      // Step 2: Generate code
      const code = await this.generationService.generate(preferences);

      await this.updateProgress(projectId, userId, 60, 'Saving files...');

      // Step 3: Save files
      let paths;
      if (preferences.codeType === 'REACT') {
        paths = await this.storage.saveReactFiles(projectId, code);
        await this.saveReactMetadata(projectId, code, paths);
      } else {
        paths = await this.storage.saveProjectFiles(projectId, code);
        await this.saveHTMLMetadata(projectId, code, paths);
      }

      await this.updateProgress(projectId, userId, 90, 'Finalizing...');

      // Step 4: Mark complete
      await this.db.project.update({
        where: { id: projectId },
        data: {
          status: 'COMPLETED',
          progress: 100,
          completedAt: new Date(),
        },
      });

      this.events.emitComplete(
        projectId,
        userId,
        'Website generated successfully!',
      );

      return { success: true, projectId };
    } catch (error) {
      this.logger.error(`Job failed: ${error.message}`);

      // Get userId for error emission
      const project = await this.db.project.findUnique({
        where: { id: projectId },
        select: { userId: true },
      });

      await this.db.project.update({
        where: { id: projectId },
        data: { status: 'FAILED', errorMessage: error.message },
      });

      if (project) {
        this.events.emitError(projectId, project.userId, error.message);
      }

      throw error;
    }
  }

  private async updateProgress(
    id: string,
    userId: string,
    progress: number,
    message: string,
  ) {
    await this.db.project.update({
      where: { id },
      data: { progress },
    });

    this.events.emitProgress(id, userId, {
      progress,
      status: 'processing',
      message,
    });
  }

  private async saveReactMetadata(
    projectId: string,
    code: ReactCode,
    paths: any,
  ) {
    const filesToSave = [
      {
        projectId,
        fileName: 'App.tsx',
        fileType: FileType.JAVASCRIPT,
        filePath: paths.appTsxPath,
        fileSize: Buffer.byteLength(code.appTsx, 'utf8'),
        content: code.appTsx,               // Add this
      },
      {
        projectId,
        fileName: 'App.css',
        fileType: FileType.CSS,
        filePath: paths.appCssPath,
        fileSize: Buffer.byteLength(code.appCss, 'utf8'),
        content: code.appCss,               // Add this
      },
      {
        projectId,
        fileName: 'index.tsx',
        fileType: FileType.JAVASCRIPT,
        filePath: paths.indexTsxPath,
        fileSize: Buffer.byteLength(code.indexTsx, 'utf8'),
        content: code.indexTsx,             // Add this
      },
      {
        projectId,
        fileName: 'package.json',
        fileType: FileType.JAVASCRIPT,
        filePath: paths.packageJsonPath,
        fileSize: Buffer.byteLength(code.packageJson, 'utf8'),
        content: code.packageJson,          // Add this
      },
    ];

    // Also for dynamic components:
    for (const component of code.components || []) {
      filesToSave.push({
        projectId,
        fileName: `components/${component.fileName}`,
        fileType: FileType.JAVASCRIPT,
        filePath: paths.componentPaths[component.fileName],
        fileSize: Buffer.byteLength(component.code, 'utf8'),
        content: component.code,           // Add this
      });
    }

    await this.db.file.createMany({
      data: filesToSave,
    });

    this.logger.log(`✅ Saved ${filesToSave.length} files to database`);
  }

  private async saveHTMLMetadata(projectId: string, code: any, paths: any) {
    await this.db.file.createMany({
      data: [
        {
          projectId,
          fileName: 'index.html',
          fileType: FileType.HTML,
          filePath: paths.htmlPath,
          fileSize: Buffer.byteLength(code.html, 'utf8'),
          content: code.html,            // Add this
        },
        {
          projectId,
          fileName: 'styles.css',
          fileType: FileType.CSS,
          filePath: paths.cssPath,
          fileSize: Buffer.byteLength(code.css, 'utf8'),
          content: code.css,             // Add this
        },
        {
          projectId,
          fileName: 'script.js',
          fileType: FileType.JAVASCRIPT,
          filePath: paths.jsPath,
          fileSize: Buffer.byteLength(code.js, 'utf8'),
          content: code.js,             // Add this
        },
      ],
    });

  }
}
