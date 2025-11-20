// src/generation/services/file-manager.service.ts

import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs/promises';
import * as path from 'path';
import { FileType } from '@prisma/client';
import { ReactCode } from '../schemas/react-code.schema';
import { WebsiteCode } from '../schemas/website-code.schema';

@Injectable()
export class FileManagerService {
  private logger = new Logger(FileManagerService.name);
  private storagePath: string;

  constructor(
    private db: PrismaService,
    private config: ConfigService,
  ) {
    this.storagePath = this.config.get<string>('STORAGE_PATH') || './storage/generated-files';
    this.ensureStorageDirectory();
  }

  private async ensureStorageDirectory() {
    try {
      await fs.mkdir(this.storagePath, { recursive: true });
      this.logger.log(`📁 Storage directory ready: ${this.storagePath}`);
    } catch (error) {
      this.logger.error('Failed to create storage directory:', error);
      throw error;
    }
  }

  /**
   * Save project files and create database records
   */
  async saveProjectFiles(
    projectId: string,
    code: ReactCode | WebsiteCode,
    codeType: 'REACT' | 'HTML',
  ): Promise<void> {
    if (codeType === 'REACT') {
      await this.saveReactProject(projectId, code as ReactCode);
    } else {
      await this.saveHTMLProject(projectId, code as WebsiteCode);
    }
  }

  /**
   * Save React project files
   */
  private async saveReactProject(projectId: string, code: ReactCode): Promise<void> {
    const projectDir = path.join(this.storagePath, projectId);
    const srcDir = path.join(projectDir, 'src');
    const componentsDir = path.join(srcDir, 'components');
    const publicDir = path.join(projectDir, 'public');

    // Create directories
    await fs.mkdir(componentsDir, { recursive: true });
    await fs.mkdir(publicDir, { recursive: true });

    const filesToCreate: Array<{
      fileName: string;
      filePath: string;
      content: string;
      fileType: FileType;
    }> = [];

    // Main files
    const mainFiles = [
      {
        fileName: 'App.tsx',
        filePath: path.join(srcDir, 'App.tsx'),
        content: code.appTsx,
        fileType: FileType.TYPESCRIPT,
      },
      {
        fileName: 'App.css',
        filePath: path.join(srcDir, 'App.css'),
        content: code.appCss,
        fileType: FileType.CSS,
      },
      {
        fileName: 'index.tsx',
        filePath: path.join(srcDir, 'index.tsx'),
        content: code.indexTsx,
        fileType: FileType.TYPESCRIPT,
      },
      {
        fileName: 'package.json',
        filePath: path.join(projectDir, 'package.json'),
        content: code.packageJson,
        fileType: FileType.JSON,
      },
    ];

    filesToCreate.push(...mainFiles);

    // Component files
    for (const component of code.components || []) {
      filesToCreate.push({
        fileName: `components/${component.fileName}`,
        filePath: path.join(componentsDir, component.fileName),
        content: component.code,
        fileType: FileType.TYPESCRIPT,
      });
    }

    // Public index.html
    const publicHtml = this.generateReactIndexHtml(projectId);
    filesToCreate.push({
      fileName: 'public/index.html',
      filePath: path.join(publicDir, 'index.html'),
      content: publicHtml,
      fileType: FileType.HTML,
    });

    // Write all files
    await Promise.all(
      filesToCreate.map(file => fs.writeFile(file.filePath, file.content, 'utf-8'))
    );

    // Save to database
    const dbFiles = filesToCreate.map(file => ({
      projectId,
      fileName: file.fileName,
      filePath: file.filePath,
      fileType: file.fileType,
      fileSize: Buffer.byteLength(file.content, 'utf-8'),
      content: file.content,
    }));

    await this.db.file.createMany({ data: dbFiles });

    this.logger.log(`✅ Saved ${filesToCreate.length} React files for project ${projectId}`);
  }

  /**
   * Save HTML project files
   */
  private async saveHTMLProject(projectId: string, code: WebsiteCode): Promise<void> {
    const projectDir = path.join(this.storagePath, projectId);
    await fs.mkdir(projectDir, { recursive: true });

    const filesToCreate = [
      {
        fileName: 'index.html',
        filePath: path.join(projectDir, 'index.html'),
        content: code.html,
        fileType: FileType.HTML,
      },
      {
        fileName: 'styles.css',
        filePath: path.join(projectDir, 'styles.css'),
        content: code.css,
        fileType: FileType.CSS,
      },
      {
        fileName: 'script.js',
        filePath: path.join(projectDir, 'script.js'),
        content: code.js,
        fileType: FileType.JAVASCRIPT,
      },
    ];

    // Write all files
    await Promise.all(
      filesToCreate.map(file => fs.writeFile(file.filePath, file.content, 'utf-8'))
    );

    // Save to database
    const dbFiles = filesToCreate.map(file => ({
      projectId,
      fileName: file.fileName,
      filePath: file.filePath,
      fileType: file.fileType,
      fileSize: Buffer.byteLength(file.content, 'utf-8'),
      content: file.content,
    }));

    await this.db.file.createMany({ data: dbFiles });

    this.logger.log(`✅ Saved ${filesToCreate.length} HTML files for project ${projectId}`);
  }

  /**
   * Read project files
   */
  async readProjectFiles(projectId: string): Promise<Record<string, string>> {
    const files = await this.db.file.findMany({
      where: { projectId },
    });

    const fileMap: Record<string, string> = {};

    for (const file of files) {
      const key = `/${file.fileName}`;
      fileMap[key] = file.content;
    }

    return fileMap;
  }

  /**
   * Delete project files
   */
  async deleteProjectFiles(projectId: string): Promise<void> {
    const projectDir = path.join(this.storagePath, projectId);

    try {
      await fs.rm(projectDir, { recursive: true, force: true });
      this.logger.log(`🗑️ Deleted files for project ${projectId}`);
    } catch (error) {
      this.logger.error(`Failed to delete files for project ${projectId}:`, error);
      throw error;
    }
  }

  /**
   * Generate React index.html
   */
  private generateReactIndexHtml(title: string): string {
    return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta name="description" content="AI Generated Website - ${title}" />
    <title>${title}</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>`;
  }

  /**
   * Update single file (for Fast Apply feature)
   */
  async updateFile(
    projectId: string,
    fileName: string,
    content: string,
  ): Promise<void> {
    const file = await this.db.file.findFirst({
      where: { projectId, fileName },
    });

    if (!file) {
      throw new Error(`File ${fileName} not found in project ${projectId}`);
    }

    // Update file on disk
    await fs.writeFile(file.filePath, content, 'utf-8');

    // Update in database
    await this.db.file.update({
      where: { id: file.id },
      data: {
        content,
        fileSize: Buffer.byteLength(content, 'utf-8'),
        version: file.version + 1,
        updatedAt: new Date(),
      },
    });

    this.logger.log(`✅ Updated file ${fileName} in project ${projectId}`);
  }

  /**
   * Get file statistics
   */
  async getProjectStats(projectId: string): Promise<any> {
    const files = await this.db.file.findMany({
      where: { projectId },
      select: {
        fileName: true,
        fileType: true,
        fileSize: true,
      },
    });

    const totalSize = files.reduce((sum, file) => sum + file.fileSize, 0);
    const filesByType = files.reduce((acc, file) => {
      acc[file.fileType] = (acc[file.fileType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalFiles: files.length,
      totalSize,
      filesByType,
      files: files.map(f => ({
        name: f.fileName,
        type: f.fileType,
        size: f.fileSize,
      })),
    };
  }
}