// src/storage/storage.service.ts

import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs/promises';
import * as path from 'path';
import { ReactCode } from 'src/generation/schemas/react-code.schema';

@Injectable()
export class StorageService {
  private readonly logger = new Logger(StorageService.name);
  private readonly storagePath: string;

  constructor(private configService: ConfigService) {
    this.storagePath =
      this.configService.get<string>('STORAGE_PATH') ||
      './storage/generated-files';
    this.ensureStorageDirectory();
  }

  private async ensureStorageDirectory() {
    try {
      await fs.mkdir(this.storagePath, { recursive: true });
      this.logger.log(`📁 Storage directory ready: ${this.storagePath}`);
    } catch (error) {
      this.logger.error('❌ Failed to create storage directory:', error);
      throw error;
    }
  }

  async saveProjectFiles(
    projectId: string,
    files: { html: string; css: string; js: string },
  ) {
    const projectDir = path.join(this.storagePath, projectId);
    await fs.mkdir(projectDir, { recursive: true });

    const htmlPath = path.join(projectDir, 'index.html');
    const cssPath = path.join(projectDir, 'styles.css');
    const jsPath = path.join(projectDir, 'script.js');

    await Promise.all([
      fs.writeFile(htmlPath, files.html, 'utf8'),
      fs.writeFile(cssPath, files.css, 'utf8'),
      fs.writeFile(jsPath, files.js, 'utf8'),
    ]);

    this.logger.log(`✅ HTML files saved for project ${projectId}`);

    return { htmlPath, cssPath, jsPath };
  }

  async saveReactFiles(projectId: string, code: ReactCode): Promise<any> {
    const projectDir = path.join(this.storagePath, projectId); // ← Changed from uploadsDir
    const srcDir = path.join(projectDir, 'src');
    const componentsDir = path.join(srcDir, 'components');
    const publicDir = path.join(projectDir, 'public');

    // Create directory structure
    await fs.mkdir(componentsDir, { recursive: true });
    await fs.mkdir(publicDir, { recursive: true });

    // Save main files
    const appTsxPath = path.join(srcDir, 'App.tsx');
    const appCssPath = path.join(srcDir, 'App.css');
    const indexTsxPath = path.join(srcDir, 'index.tsx');
    const packageJsonPath = path.join(projectDir, 'package.json');

    await fs.writeFile(appTsxPath, code.appTsx, 'utf-8');
    await fs.writeFile(appCssPath, code.appCss, 'utf-8');
    await fs.writeFile(indexTsxPath, code.indexTsx, 'utf-8');
    await fs.writeFile(packageJsonPath, code.packageJson, 'utf-8');

    // Save ALL dynamic components
    const componentPaths: Record<string, string> = {};

    for (const component of code.components || []) {
      const componentPath = path.join(componentsDir, component.fileName);
      await fs.writeFile(componentPath, component.code, 'utf-8');
      componentPaths[component.fileName] = componentPath;
      this.logger.log(`✅ Saved component: ${component.fileName}`);
    }

    // Create index.html
    const indexHtml = this.generateIndexHtml(projectId);
    await fs.writeFile(path.join(publicDir, 'index.html'), indexHtml);

    this.logger.log(`✅ Saved ${code.components?.length || 0} components`);

    return {
      appTsxPath,
      appCssPath,
      indexTsxPath,
      packageJsonPath,
      componentPaths,
      publicDir,
    };
  }

  private generateIndexHtml(title: string): string {
    return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="${title} - AI Generated Website" />
    <title>${title}</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>`;
  }

  async readProjectFiles(projectId: string): Promise<any> {
    const projectDir = path.join(this.storagePath, projectId);

    try {
      const htmlPath = path.join(projectDir, 'index.html');
      const srcDir = path.join(projectDir, 'src');
      const appTsxPath = path.join(srcDir, 'App.tsx');

      const isHtmlProject = await fs
        .access(htmlPath)
        .then(() => true)
        .catch(() => false);
      const isReactProject = await fs
        .access(appTsxPath)
        .then(() => true)
        .catch(() => false);

      if (isReactProject) {
        // React project - read main files
        const [appTsx, appCss, indexTsx, packageJson] = await Promise.all([
          fs.readFile(appTsxPath, 'utf8'),
          fs.readFile(path.join(srcDir, 'App.css'), 'utf8'),
          fs.readFile(path.join(srcDir, 'index.tsx'), 'utf8'),
          fs.readFile(path.join(projectDir, 'package.json'), 'utf8'),
        ]);

        // Read all component files
        const componentsDir = path.join(srcDir, 'components');
        const componentFiles: Record<string, string> = {};

        try {
          const files = await fs.readdir(componentsDir);
          for (const file of files) {
            if (file.endsWith('.tsx')) {
              const content = await fs.readFile(
                path.join(componentsDir, file),
                'utf8',
              );
              componentFiles[`/components/${file}`] = content;
            }
          }
        } catch (error) {
          this.logger.warn('No components directory found');
        }

        return {
          '/App.tsx': appTsx,
          '/App.css': appCss,
          '/index.tsx': indexTsx,
          '/package.json': packageJson,
          ...componentFiles, // ← Add all components
        };
      } else if (isHtmlProject) {
        // HTML project
        const [html, css, js] = await Promise.all([
          fs.readFile(htmlPath, 'utf8'),
          fs.readFile(path.join(projectDir, 'styles.css'), 'utf8'),
          fs.readFile(path.join(projectDir, 'script.js'), 'utf8'),
        ]);

        return {
          '/index.html': html,
          '/styles.css': css,
          '/script.js': js,
        };
      }

      throw new Error('Project files not found');
    } catch (error) {
      this.logger.error(
        `❌ Failed to read files for project ${projectId}:`,
        error,
      );
      throw error;
    }
  }

  async deleteProjectFiles(projectId: string) {
    const projectDir = path.join(this.storagePath, projectId);

    try {
      await fs.rm(projectDir, { recursive: true, force: true });
      this.logger.log(`🗑️ Deleted files for project ${projectId}`);
    } catch (error) {
      this.logger.error(
        `❌ Failed to delete files for project ${projectId}:`,
        error,
      );
      throw error;
    }
  }
}
