import { ReactComponent } from '../schemas/react-code.schema';
export declare class CodeValidatorService {
    private readonly logger;
    validateAndFormat(code: string, parser: 'typescript' | 'css' | 'babel' | 'html'): Promise<string>;
    validateReactComponent(code: string): Promise<string>;
    validateReactComponents(components: ReactComponent[]): Promise<ReactComponent[]>;
    private fixArrayRendering;
    private fixStarRatings;
    private ensureDefaultExport;
    validateHTMLStructure(html: string): {
        valid: boolean;
        errors: string[];
    };
    validateCSSStructure(css: string): {
        valid: boolean;
        errors: string[];
    };
    validateTypeScriptSyntax(code: string): {
        valid: boolean;
        errors: string[];
    };
    removeDebuggingCode(code: string): string;
    validatePackageJson(packageJsonString: string): {
        valid: boolean;
        errors: string[];
    };
    getCodeMetrics(code: string): any;
}
