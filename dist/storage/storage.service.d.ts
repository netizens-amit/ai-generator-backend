import { ConfigService } from '@nestjs/config';
import { ReactCode } from 'src/generation/schemas/react-code.schema';
export declare class StorageService {
    private configService;
    private readonly logger;
    private readonly storagePath;
    constructor(configService: ConfigService);
    private ensureStorageDirectory;
    saveProjectFiles(projectId: string, files: {
        html: string;
        css: string;
        js: string;
    }): Promise<{
        htmlPath: string;
        cssPath: string;
        jsPath: string;
    }>;
    saveReactFiles(projectId: string, code: ReactCode): Promise<any>;
    private generateIndexHtml;
    readProjectFiles(projectId: string): Promise<any>;
    deleteProjectFiles(projectId: string): Promise<void>;
}
