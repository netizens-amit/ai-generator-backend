import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GenerationModule } from './generation/generation.module';
import { EventsModule } from './websocket/events.module';
import { BullModule } from '@nestjs/bullmq';
import { PrismaService } from './prisma/prisma.service';
import { StorageService } from './storage/storage.service';
import { AuthModule } from './auth/auth.module';
import { WebsocketModule } from './websocket/websocket.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        connection: {
          host: config.get<string>('REDIS_HOST', 'localhost'),
          port: parseInt(config.get<string>('REDIS_PORT', '6379'), 10),
        },
      }),
    }),
    GenerationModule,
    WebsocketModule,
    AuthModule,
  ],
  providers: [AuthModule, AppService, PrismaService, StorageService],
  controllers: [AppController], 
})
export class AppModule {}
