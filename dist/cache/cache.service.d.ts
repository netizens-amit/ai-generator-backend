import { ConfigService } from '@nestjs/config';
export declare class CacheService {
    private configService;
    private readonly logger;
    private readonly redis;
    private readonly TTL;
    constructor(configService: ConfigService);
    generateCacheKey(preferences: any): string;
    get<T>(key: string): Promise<T | null>;
    set(key: string, value: any, ttl?: number): Promise<void>;
    delete(key: string): Promise<void>;
    getStats(): Promise<{
        keys: number;
        memory: string;
        hitRate: number;
    }>;
}
