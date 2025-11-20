// src/cache/cache.service.ts (the one I provided earlier)

import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import * as crypto from 'crypto';

@Injectable()
export class CacheService {
  private readonly logger = new Logger(CacheService.name);
  private readonly redis: Redis;
  private readonly TTL = 604800; // 7 days in seconds

  constructor(private configService: ConfigService) {
    this.redis = new Redis({
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

  /**
   * Generate cache key from preferences
   */
  generateCacheKey(preferences: any): string {
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

  /**
   * Get cached code
   */
  async get<T>(key: string): Promise<T | null> {
    try {
      const cached = await this.redis.get(key);
      
      if (cached) {
        this.logger.log(`✅ Cache HIT for key: ${key}`);
        return JSON.parse(cached);
      }
      
      this.logger.log(`❌ Cache MISS for key: ${key}`);
      return null;
    } catch (error) {
      this.logger.error('Cache get error:', error);
      return null;
    }
  }

  /**
   * Set cache with TTL
   */
  async set(key: string, value: any, ttl: number = this.TTL): Promise<void> {
    try {
      await this.redis.setex(key, ttl, JSON.stringify(value));
      this.logger.log(`✅ Cached key: ${key} (TTL: ${ttl}s)`);
    } catch (error) {
      this.logger.error('Cache set error:', error);
    }
  }

  /**
   * Delete cache entry
   */
  async delete(key: string): Promise<void> {
    try {
      await this.redis.del(key);
      this.logger.log(`🗑️ Deleted cache key: ${key}`);
    } catch (error) {
      this.logger.error('Cache delete error:', error);
    }
  }

  /**
   * Get cache statistics
   */
  async getStats(): Promise<{
    keys: number;
    memory: string;
    hitRate: number;
  }> {
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
}
