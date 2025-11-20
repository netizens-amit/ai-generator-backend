"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var SandpackFormatterService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SandpackFormatterService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let SandpackFormatterService = SandpackFormatterService_1 = class SandpackFormatterService {
    db;
    logger = new common_1.Logger(SandpackFormatterService_1.name);
    constructor(db) {
        this.db = db;
    }
    async formatForSandpack(projectId) {
        const project = await this.db.project.findUnique({
            where: { id: projectId },
            include: { files: true },
        });
        if (!project) {
            throw new Error('Project not found');
        }
        const sandpackFiles = {};
        if (project.codeType === 'REACT') {
            return this.formatReactForSandpack(project.files);
        }
        else {
            return this.formatHTMLForSandpack(project.files);
        }
    }
    formatReactForSandpack(files) {
        const sandpackFiles = {};
        for (const file of files) {
            let sandpackPath;
            if (file.fileName === 'App.tsx') {
                sandpackPath = '/App.tsx';
            }
            else if (file.fileName === 'App.css') {
                sandpackPath = '/App.css';
            }
            else if (file.fileName === 'index.tsx') {
                sandpackPath = '/index.tsx';
            }
            else if (file.fileName === 'package.json') {
                sandpackPath = '/package.json';
            }
            else if (file.fileName.startsWith('components/')) {
                sandpackPath = `/${file.fileName}`;
            }
            else {
                sandpackPath = `/${file.fileName}`;
            }
            sandpackFiles[sandpackPath] = file.content;
        }
        if (!sandpackFiles['/public/index.html']) {
            sandpackFiles['/public/index.html'] = this.getDefaultReactHTML();
        }
        this.logger.log(`✅ Formatted ${Object.keys(sandpackFiles).length} files for Sandpack (React)`);
        return sandpackFiles;
    }
    formatHTMLForSandpack(files) {
        const sandpackFiles = {};
        for (const file of files) {
            let sandpackPath;
            if (file.fileName === 'index.html') {
                sandpackPath = '/index.html';
            }
            else if (file.fileName === 'styles.css') {
                sandpackPath = '/styles.css';
            }
            else if (file.fileName === 'script.js') {
                sandpackPath = '/script.js';
            }
            else {
                sandpackPath = `/${file.fileName}`;
            }
            sandpackFiles[sandpackPath] = file.content;
        }
        this.logger.log(`✅ Formatted ${Object.keys(sandpackFiles).length} files for Sandpack (HTML)`);
        return sandpackFiles;
    }
    getDefaultReactHTML() {
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
    validateSandpackStructure(files, codeType) {
        if (codeType === 'REACT') {
            const requiredFiles = ['/App.tsx', '/index.tsx', '/package.json'];
            return requiredFiles.every(file => file in files);
        }
        else {
            const requiredFiles = ['/index.html', '/styles.css', '/script.js'];
            return requiredFiles.every(file => file in files);
        }
    }
    getFileTree(files) {
        const tree = {
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
                }
                else {
                    let dir = current.children.find((c) => c.name === part && c.type === 'directory');
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
};
exports.SandpackFormatterService = SandpackFormatterService;
exports.SandpackFormatterService = SandpackFormatterService = SandpackFormatterService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SandpackFormatterService);
//# sourceMappingURL=sandpack-formatter.service.js.map