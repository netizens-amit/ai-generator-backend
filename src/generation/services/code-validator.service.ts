// src/generation/services/code-validator.service.ts

import { Injectable, Logger } from '@nestjs/common';
import * as prettier from 'prettier';
import { ReactComponent } from '../schemas/react-code.schema';

@Injectable()
export class CodeValidatorService {
  private readonly logger = new Logger(CodeValidatorService.name);

  /**
   * Validate and format code with Prettier
   */
  async validateAndFormat(
    code: string,
    parser: 'typescript' | 'css' | 'babel' | 'html',
  ): Promise<string> {
    try {
      // Remove problematic unicode characters
      // Remove problematic unicode characters, but preserve newlines and tabs
      // Exclude \t (9), \n (10), \r (13)
      let cleaned = code.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F]/g, '');

      // Remove escaped unicode
      cleaned = cleaned.replace(/\\u[0-9A-Fa-f]{4}/g, ' ');

      // Format with Prettier
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
    } catch (error) {
      this.logger.warn(`Formatting failed for ${parser}: ${error.message}`);
      return code; // Return original if formatting fails
    }
  }

  /**
   * Validate React component with enhanced checks
   */
  async validateReactComponent(code: string): Promise<string> {
    let validated = code;

    // Ensure React import
    if (!validated.includes("import React from 'react'")) {
      if (!validated.includes('import React')) {
        validated = `import React from 'react';\n${validated}`;
      }
    }

    // Fix common array rendering issues
    validated = this.fixArrayRendering(validated);

    // Fix star ratings
    validated = this.fixStarRatings(validated);

    // Ensure proper exports
    validated = this.ensureDefaultExport(validated);

    // Format
    return await this.validateAndFormat(validated, 'typescript');
  }

  /**
   * Validate React components array
   */
  async validateReactComponents(components: ReactComponent[]): Promise<ReactComponent[]> {
    const validated: ReactComponent[] = [];

    for (const component of components) {
      try {
        const validatedCode = await this.validateReactComponent(component.code);

        validated.push({
          ...component,
          code: validatedCode,
        });

        this.logger.log(`✅ Validated: ${component.fileName}`);
      } catch (error) {
        this.logger.error(`Component validation failed for ${component.fileName}: ${error.message}`);
        throw new Error(`Failed to validate ${component.fileName}: ${error.message}`);
      }
    }

    return validated;
  }

  /**
   * Fix common array rendering patterns
   */
  private fixArrayRendering(code: string): string {
    // Fix [...Array(n)] patterns
    code = code.replace(
      /\[\.\.\.(Array|arr)\(([^)]+)\)\]\.map\(/g,
      'Array.from({ length: $2 }, (_, index) => index).map('
    );

    // Fix star ratings with [...Array(n)]
    code = code.replace(
      /\[\.\.\.(Array|arr)\(([^)]+)\)\]\.map\(\(\s*_\s*,?\s*\w*\s*\)\s*=>\s*['"]★['"]\)/g,
      "{'★'.repeat($2)}"
    );

    return code;
  }

  /**
   * Fix star rating patterns
   */
  private fixStarRatings(code: string): string {
    // Pattern: [...Array(rating)].map(() => '★')
    code = code.replace(
      /\{?\[\.\.\.(Array|arr)\((\w+)\)\]\.map\([^)]*\)\s*\.join\(['"]?['"]\)\}?/g,
      "{'★'.repeat($2)}"
    );

    // Pattern: Array(rating).fill('★').join('')
    code = code.replace(
      /Array\((\w+)\)\.fill\(['"]★['"]\)\.join\(['"]?['"]\)/g,
      "{'★'.repeat($1)}"
    );

    return code;
  }

  /**
   * Ensure component has default export
   */
  private ensureDefaultExport(code: string): string {
    if (!code.includes('export default')) {
      // Try to extract component name
      const functionMatch = code.match(/function\s+([A-Z][a-zA-Z0-9]*)/);
      const constMatch = code.match(/const\s+([A-Z][a-zA-Z0-9]*)\s*=/);

      const componentName = functionMatch?.[1] || constMatch?.[1];

      if (componentName) {
        code = `${code}\n\nexport default ${componentName};`;
      }
    }

    return code;
  }

  /**
   * Validate HTML structure
   */
  validateHTMLStructure(html: string): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

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

  /**
   * Validate CSS has required properties
   */
  validateCSSStructure(css: string): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

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

  /**
   * Validate TypeScript syntax (basic check)
   */
  validateTypeScriptSyntax(code: string): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Check for common syntax errors
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

    // Check for unclosed JSX tags (basic)
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

  /**
   * Remove debugging code
   */
  removeDebuggingCode(code: string): string {
    // Remove console.log statements
    code = code.replace(/console\.(log|debug|info|warn|error)\([^)]*\);?\n?/g, '');

    // Remove debugger statements
    code = code.replace(/debugger;?\n?/g, '');

    return code;
  }

  /**
   * Validate package.json
   */
  validatePackageJson(packageJsonString: string): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

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
      } else {
        if (!pkg.dependencies.react) {
          errors.push('Missing react dependency');
        }
        if (!pkg.dependencies['react-dom']) {
          errors.push('Missing react-dom dependency');
        }
      }
    } catch (error) {
      errors.push('Invalid JSON format');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * Get code quality metrics
   */
  getCodeMetrics(code: string): any {
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
}