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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var CacheService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const ioredis_1 = __importDefault(require("ioredis"));
const crypto = __importStar(require("crypto"));
let CacheService = CacheService_1 = class CacheService {
    configService;
    logger = new common_1.Logger(CacheService_1.name);
    redis;
    TTL = 604800;
    constructor(configService) {
        this.configService = configService;
        this.redis = new ioredis_1.default({
            host: this.configService.get('REDIS_HOST', 'localhost'),
            port: this.configService.get('REDIS_PORT', 6379),
            password: this.configService.get('REDIS_PASSWORD'),
            retryStrategy: (times) => {
                const delay = Math.min(times * 50, 2000);
                return delay;
            },
        });
        this.redis.on('connect', () => {
            this.logger.log('✅ Redis connected');
        });
        this.redis.on('error', (error) => {
            this.logger.error('❌ Redis error:', error);
        });
    }
    generateCacheKey(preferences) {
        const keyData = {
            codeType: preferences.codeType,
            industry: preferences.industry,
            designStyle: preferences.designStyle,
            colors: preferences.colorScheme,
        };
        const hash = crypto
            .createHash('md5')
            .update(JSON.stringify(keyData))
            .digest('hex');
        return `code:${preferences.codeType}:${hash}`;
    }
    async get(key) {
        try {
            const cached = await this.redis.get(key);
            if (cached) {
                this.logger.log(`✅ Cache HIT for key: ${key}`);
                return JSON.parse(cached);
            }
            this.logger.log(`❌ Cache MISS for key: ${key}`);
            return null;
        }
        catch (error) {
            this.logger.error('Cache get error:', error);
            return null;
        }
    }
    async set(key, value, ttl = this.TTL) {
        try {
            await this.redis.setex(key, ttl, JSON.stringify(value));
            this.logger.log(`✅ Cached key: ${key} (TTL: ${ttl}s)`);
        }
        catch (error) {
            this.logger.error('Cache set error:', error);
        }
    }
    async delete(key) {
        try {
            await this.redis.del(key);
            this.logger.log(`🗑️ Deleted cache key: ${key}`);
        }
        catch (error) {
            this.logger.error('Cache delete error:', error);
        }
    }
    async getStats() {
        const info = await this.redis.info('stats');
        const dbsize = await this.redis.dbsize();
        const hits = parseInt(info.match(/keyspace_hits:(\d+)/)?.[1] || '0');
        const misses = parseInt(info.match(/keyspace_misses:(\d+)/)?.[1] || '0');
        const hitRate = hits + misses > 0 ? (hits / (hits + misses)) * 100 : 0;
        return {
            keys: dbsize,
            memory: info.match(/used_memory_human:(.+)/)?.[1] || 'N/A',
            hitRate: Math.round(hitRate * 100) / 100,
        };
    }
};
exports.CacheService = CacheService;
exports.CacheService = CacheService = CacheService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], CacheService);
//# sourceMappingURL=cache.service.js.map