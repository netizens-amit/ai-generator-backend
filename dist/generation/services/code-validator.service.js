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
var CodeValidatorService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeValidatorService = void 0;
const common_1 = require("@nestjs/common");
const prettier = __importStar(require("prettier"));
let CodeValidatorService = CodeValidatorService_1 = class CodeValidatorService {
    logger = new common_1.Logger(CodeValidatorService_1.name);
    async validateAndFormat(code, parser) {
        try {
            let cleaned = code.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F]/g, '');
            cleaned = cleaned.replace(/\\u[0-9A-Fa-f]{4}/g, ' ');
            const formatted = await prettier.format(cleaned, {
                parser,
                printWidth: 100,
                tabWidth: 2,
                semi: true,
                singleQuote: true,
                trailingComma: 'es5',
                bracketSpacing: true,
                arrowParens: 'always',
            });
            return formatted;
        }
        catch (error) {
            this.logger.warn(`Formatting failed for ${parser}: ${error.message}`);
            return code;
        }
    }
    async validateReactComponent(code) {
        let validated = code;
        if (!validated.includes("import React from 'react'")) {
            if (!validated.includes('import React')) {
                validated = `import React from 'react';\n${validated}`;
            }
        }
        validated = this.fixArrayRendering(validated);
        validated = this.fixStarRatings(validated);
        validated = this.ensureDefaultExport(validated);
        return await this.validateAndFormat(validated, 'typescript');
    }
    async validateReactComponents(components) {
        const validated = [];
        for (const component of components) {
            try {
                const validatedCode = await this.validateReactComponent(component.code);
                validated.push({
                    ...component,
                    code: validatedCode,
                });
                this.logger.log(`✅ Validated: ${component.fileName}`);
            }
            catch (error) {
                this.logger.error(`Component validation failed for ${component.fileName}: ${error.message}`);
                throw new Error(`Failed to validate ${component.fileName}: ${error.message}`);
            }
        }
        return validated;
    }
    fixArrayRendering(code) {
        code = code.replace(/\[\.\.\.(Array|arr)\(([^)]+)\)\]\.map\(/g, 'Array.from({ length: $2 }, (_, index) => index).map(');
        code = code.replace(/\[\.\.\.(Array|arr)\(([^)]+)\)\]\.map\(\(\s*_\s*,?\s*\w*\s*\)\s*=>\s*['"]★['"]\)/g, "{'★'.repeat($2)}");
        return code;
    }
    fixStarRatings(code) {
        code = code.replace(/\{?\[\.\.\.(Array|arr)\((\w+)\)\]\.map\([^)]*\)\s*\.join\(['"]?['"]\)\}?/g, "{'★'.repeat($2)}");
        code = code.replace(/Array\((\w+)\)\.fill\(['"]★['"]\)\.join\(['"]?['"]\)/g, "{'★'.repeat($1)}");
        return code;
    }
    ensureDefaultExport(code) {
        if (!code.includes('export default')) {
            const functionMatch = code.match(/function\s+([A-Z][a-zA-Z0-9]*)/);
            const constMatch = code.match(/const\s+([A-Z][a-zA-Z0-9]*)\s*=/);
            const componentName = functionMatch?.[1] || constMatch?.[1];
            if (componentName) {
                code = `${code}\n\nexport default ${componentName};`;
            }
        }
        return code;
    }
    validateHTMLStructure(html) {
        const errors = [];
        if (!html.includes('<!DOCTYPE html>')) {
            errors.push('Missing DOCTYPE declaration');
        }
        if (!html.includes('<html')) {
            errors.push('Missing <html> tag');
        }
        if (!html.includes('<head>')) {
            errors.push('Missing <head> section');
        }
        if (!html.includes('<body>')) {
            errors.push('Missing <body> section');
        }
        const requiredMeta = ['charset', 'viewport'];
        for (const meta of requiredMeta) {
            if (!html.includes(meta)) {
                errors.push(`Missing ${meta} meta tag`);
            }
        }
        return {
            valid: errors.length === 0,
            errors,
        };
    }
    validateCSSStructure(css) {
        const errors = [];
        if (!css.includes(':root')) {
            errors.push('Missing :root CSS variables');
        }
        if (!css.includes('@media')) {
            errors.push('Missing responsive media queries');
        }
        const requiredVariables = ['--color-primary', '--color-secondary', '--color-accent'];
        for (const variable of requiredVariables) {
            if (!css.includes(variable)) {
                errors.push(`Missing CSS variable: ${variable}`);
            }
        }
        return {
            valid: errors.length === 0,
            errors,
        };
    }
    validateTypeScriptSyntax(code) {
        const errors = [];
        const openBraces = (code.match(/\{/g) || []).length;
        const closeBraces = (code.match(/\}/g) || []).length;
        if (openBraces !== closeBraces) {
            errors.push('Mismatched braces');
        }
        const openParens = (code.match(/\(/g) || []).length;
        const closeParens = (code.match(/\)/g) || []).length;
        if (openParens !== closeParens) {
            errors.push('Mismatched parentheses');
        }
        const jsxOpening = (code.match(/<[A-Z][a-zA-Z0-9]*[^/>]*>/g) || []).length;
        const jsxClosing = (code.match(/<\/[A-Z][a-zA-Z0-9]*>/g) || []).length;
        const jsxSelfClosing = (code.match(/<[A-Z][a-zA-Z0-9]*[^>]*\/>/g) || []).length;
        if (jsxOpening !== jsxClosing + jsxSelfClosing) {
            errors.push('Potentially unclosed JSX tags');
        }
        return {
            valid: errors.length === 0,
            errors,
        };
    }
    removeDebuggingCode(code) {
        code = code.replace(/console\.(log|debug|info|warn|error)\([^)]*\);?\n?/g, '');
        code = code.replace(/debugger;?\n?/g, '');
        return code;
    }
    validatePackageJson(packageJsonString) {
        const errors = [];
        try {
            const pkg = JSON.parse(packageJsonString);
            if (!pkg.name) {
                errors.push('Missing package name');
            }
            if (!pkg.version) {
                errors.push('Missing package version');
            }
            if (!pkg.dependencies) {
                errors.push('Missing dependencies');
            }
            else {
                if (!pkg.dependencies.react) {
                    errors.push('Missing react dependency');
                }
                if (!pkg.dependencies['react-dom']) {
                    errors.push('Missing react-dom dependency');
                }
            }
        }
        catch (error) {
            errors.push('Invalid JSON format');
        }
        return {
            valid: errors.length === 0,
            errors,
        };
    }
    getCodeMetrics(code) {
        const lines = code.split('\n').length;
        const characters = code.length;
        const functions = (code.match(/function\s+\w+|const\s+\w+\s*=\s*\([^)]*\)\s*=>/g) || []).length;
        const imports = (code.match(/import\s+.*from/g) || []).length;
        const exports = (code.match(/export\s+(default\s+)?/g) || []).length;
        return {
            lines,
            characters,
            functions,
            imports,
            exports,
            averageLineLength: Math.round(characters / lines),
        };
    }
};
exports.CodeValidatorService = CodeValidatorService;
exports.CodeValidatorService = CodeValidatorService = CodeValidatorService_1 = __decorate([
    (0, common_1.Injectable)()
], CodeValidatorService);
//# sourceMappingURL=code-validator.service.js.map