import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
export declare class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private jwtService;
    server: Server;
    private readonly logger;
    constructor(jwtService: JwtService);
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(client: Socket): void;
    emitToUser(userId: string, event: string, data: any): void;
    emitProgress(projectId: string, userId: string, data: any): void;
    emitComplete(projectId: string, userId: string, message: string): void;
    emitError(projectId: string, userId: string, error: string): void;
}
