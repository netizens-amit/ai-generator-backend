import { PrismaService } from '../../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { ReactCode } from '../schemas/react-code.schema';
import { WebsiteCode } from '../schemas/website-code.schema';
export declare class FileManagerService {
    private db;
    private config;
    private logger;
    private storagePath;
    constructor(db: PrismaService, config: ConfigService);
    private ensureStorageDirectory;
    saveProjectFiles(projectId: string, code: ReactCode | WebsiteCode, codeType: 'REACT' | 'HTML'): Promise<void>;
    private saveReactProject;
    private saveHTMLProject;
    readProjectFiles(projectId: string): Promise<Record<string, string>>;
    deleteProjectFiles(projectId: string): Promise<void>;
    private generateReactIndexHtml;
    updateFile(projectId: string, fileName: string, content: string): Promise<void>;
    getProjectStats(projectId: string): Promise<any>;
}
