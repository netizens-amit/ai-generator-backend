// src/generation/services/sandpack-formatter.service.ts

import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

/**
 * Formats project files for Sandpack preview
 * Sandpack expects: { "/App.tsx": "code...", "/components/Header.tsx": "code..." }
 */
@Injectable()
export class SandpackFormatterService {
  private logger = new Logger(SandpackFormatterService.name);

  constructor(private db: PrismaService) {}

  /**
   * Format project files for Sandpack
   */
  async formatForSandpack(projectId: string): Promise<Record<string, string>> {
    const project = await this.db.project.findUnique({
      where: { id: projectId },
      include: { files: true },
    });

    if (!project) {
      throw new Error('Project not found');
    }

    const sandpackFiles: Record<string, string> = {};

    if (project.codeType === 'REACT') {
      return this.formatReactForSandpack(project.files);
    } else {
      return this.formatHTMLForSandpack(project.files);
    }
  }

  /**
   * Format React project for Sandpack
   */
  private formatReactForSandpack(files: any[]): Record<string, string> {
    const sandpackFiles: Record<string, string> = {};

    for (const file of files) {
      let sandpackPath: string;

      // Determine the correct Sandpack path
      if (file.fileName === 'App.tsx') {
        sandpackPath = '/App.tsx';
      } else if (file.fileName === 'App.css') {
        sandpackPath = '/App.css';
      } else if (file.fileName === 'index.tsx') {
        sandpackPath = '/index.tsx';
      } else if (file.fileName === 'package.json') {
        sandpackPath = '/package.json';
      } else if (file.fileName.startsWith('components/')) {
        // Component files: components/Header.tsx -> /components/Header.tsx
        sandpackPath = `/${file.fileName}`;
      } else {
        // Default: prefix with /
        sandpackPath = `/${file.fileName}`;
      }

      sandpackFiles[sandpackPath] = file.content;
    }

    // Add public/index.html if not exists
    if (!sandpackFiles['/public/index.html']) {
      sandpackFiles['/public/index.html'] = this.getDefaultReactHTML();
    }

    this.logger.log(`✅ Formatted ${Object.keys(sandpackFiles).length} files for Sandpack (React)`);
    
    return sandpackFiles;
  }

  /**
   * Format HTML project for Sandpack
   */
  private formatHTMLForSandpack(files: any[]): Record<string, string> {
    const sandpackFiles: Record<string, string> = {};

    for (const file of files) {
      let sandpackPath: string;

      if (file.fileName === 'index.html') {
        sandpackPath = '/index.html';
      } else if (file.fileName === 'styles.css') {
        sandpackPath = '/styles.css';
      } else if (file.fileName === 'script.js') {
        sandpackPath = '/script.js';
      } else {
        sandpackPath = `/${file.fileName}`;
      }

      sandpackFiles[sandpackPath] = file.content;
    }

    this.logger.log(`✅ Formatted ${Object.keys(sandpackFiles).length} files for Sandpack (HTML)`);
    
    return sandpackFiles;
  }

  /**
   * Get default React HTML template
   */
  private getDefaultReactHTML(): string {
    return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React App</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`;
  }

  /**
   * Validate Sandpack file structure
   */
  validateSandpackStructure(files: Record<string, string>, codeType: 'REACT' | 'HTML'): boolean {
    if (codeType === 'REACT') {
      const requiredFiles = ['/App.tsx', '/index.tsx', '/package.json'];
      return requiredFiles.every(file => file in files);
    } else {
      const requiredFiles = ['/index.html', '/styles.css', '/script.js'];
      return requiredFiles.every(file => file in files);
    }
  }

  /**
   * Get file tree structure for display
   */
  getFileTree(files: Record<string, string>): any {
    const tree: any = {
      name: 'root',
      type: 'directory',
      children: [],
    };

    for (const filePath of Object.keys(files)) {
      const parts = filePath.split('/').filter(p => p);
      let current = tree;

      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        const isFile = i === parts.length - 1;

        if (isFile) {
          current.children.push({
            name: part,
            type: 'file',
            path: filePath,
          });
        } else {
          let dir = current.children.find((c: any) => c.name === part && c.type === 'directory');
          
          if (!dir) {
            dir = {
              name: part,
              type: 'directory',
              children: [],
            };
            current.children.push(dir);
          }
          
          current = dir;
        }
      }
    }

    return tree;
  }
}