import { PrismaService } from '../../prisma/prisma.service';
export declare class SandpackFormatterService {
    private db;
    private logger;
    constructor(db: PrismaService);
    formatForSandpack(projectId: string): Promise<Record<string, string>>;
    private formatReactForSandpack;
    private formatHTMLForSandpack;
    private getDefaultReactHTML;
    validateSandpackStructure(files: Record<string, string>, codeType: 'REACT' | 'HTML'): boolean;
    getFileTree(files: Record<string, string>): any;
}
