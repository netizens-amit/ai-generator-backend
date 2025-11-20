"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var StorageService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const fs = __importStar(require("fs/promises"));
const path = __importStar(require("path"));
let StorageService = StorageService_1 = class StorageService {
    configService;
    logger = new common_1.Logger(StorageService_1.name);
    storagePath;
    constructor(configService) {
        this.configService = configService;
        this.storagePath =
            this.configService.get('STORAGE_PATH') ||
                './storage/generated-files';
        this.ensureStorageDirectory();
    }
    async ensureStorageDirectory() {
        try {
            await fs.mkdir(this.storagePath, { recursive: true });
            this.logger.log(`📁 Storage directory ready: ${this.storagePath}`);
        }
        catch (error) {
            this.logger.error('❌ Failed to create storage directory:', error);
            throw error;
        }
    }
    async saveProjectFiles(projectId, files) {
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
    async saveReactFiles(projectId, code) {
        const projectDir = path.join(this.storagePath, projectId);
        const srcDir = path.join(projectDir, 'src');
        const componentsDir = path.join(srcDir, 'components');
        const publicDir = path.join(projectDir, 'public');
        await fs.mkdir(componentsDir, { recursive: true });
        await fs.mkdir(publicDir, { recursive: true });
        const appTsxPath = path.join(srcDir, 'App.tsx');
        const appCssPath = path.join(srcDir, 'App.css');
        const indexTsxPath = path.join(srcDir, 'index.tsx');
        const packageJsonPath = path.join(projectDir, 'package.json');
        await fs.writeFile(appTsxPath, code.appTsx, 'utf-8');
        await fs.writeFile(appCssPath, code.appCss, 'utf-8');
        await fs.writeFile(indexTsxPath, code.indexTsx, 'utf-8');
        await fs.writeFile(packageJsonPath, code.packageJson, 'utf-8');
        const componentPaths = {};
        for (const component of code.components || []) {
            const componentPath = path.join(componentsDir, component.fileName);
            await fs.writeFile(componentPath, component.code, 'utf-8');
            componentPaths[component.fileName] = componentPath;
            this.logger.log(`✅ Saved component: ${component.fileName}`);
        }
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
    generateIndexHtml(title) {
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
    async readProjectFiles(projectId) {
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
                const [appTsx, appCss, indexTsx, packageJson] = await Promise.all([
                    fs.readFile(appTsxPath, 'utf8'),
                    fs.readFile(path.join(srcDir, 'App.css'), 'utf8'),
                    fs.readFile(path.join(srcDir, 'index.tsx'), 'utf8'),
                    fs.readFile(path.join(projectDir, 'package.json'), 'utf8'),
                ]);
                const componentsDir = path.join(srcDir, 'components');
                const componentFiles = {};
                try {
                    const files = await fs.readdir(componentsDir);
                    for (const file of files) {
                        if (file.endsWith('.tsx')) {
                            const content = await fs.readFile(path.join(componentsDir, file), 'utf8');
                            componentFiles[`/components/${file}`] = content;
                        }
                    }
                }
                catch (error) {
                    this.logger.warn('No components directory found');
                }
                return {
                    '/App.tsx': appTsx,
                    '/App.css': appCss,
                    '/index.tsx': indexTsx,
                    '/package.json': packageJson,
                    ...componentFiles,
                };
            }
            else if (isHtmlProject) {
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
        }
        catch (error) {
            this.logger.error(`❌ Failed to read files for project ${projectId}:`, error);
            throw error;
        }
    }
    async deleteProjectFiles(projectId) {
        const projectDir = path.join(this.storagePath, projectId);
        try {
            await fs.rm(projectDir, { recursive: true, force: true });
            this.logger.log(`🗑️ Deleted files for project ${projectId}`);
        }
        catch (error) {
            this.logger.error(`❌ Failed to delete files for project ${projectId}:`, error);
            throw error;
        }
    }
};
exports.StorageService = StorageService;
exports.StorageService = StorageService = StorageService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], StorageService);
//# sourceMappingURL=storage.service.js.map