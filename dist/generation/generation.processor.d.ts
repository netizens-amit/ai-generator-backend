import { WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { PrismaService } from '../prisma/prisma.service';
import { GenerationService } from './services/generation.service';
import { StorageService } from '../storage/storage.service';
import { EventsGateway } from '../websocket/events.gateway';
export declare class GenerationProcessor extends WorkerHost {
    private db;
    private generationService;
    private storage;
    private events;
    private logger;
    constructor(db: PrismaService, generationService: GenerationService, storage: StorageService, events: EventsGateway);
    process(job: Job): Promise<any>;
    private updateProgress;
    private saveReactMetadata;
    private saveHTMLMetadata;
}
