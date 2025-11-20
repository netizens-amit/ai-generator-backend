// src/events/events.gateway.ts

import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@WebSocketGateway({
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  },
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(EventsGateway.name);

  constructor(private jwtService: JwtService) {}

  async handleConnection(client: Socket) {
    try {
      const token = client.handshake.auth.token;
      
      if (!token) {
        this.logger.warn(`Client ${client.id} connecting without token`);
        return;
      }

      const payload = await this.jwtService.verifyAsync(token);
      const userId = payload.sub;

      client.data.userId = userId;
      client.join(`user:${userId}`);

      this.logger.log(`✅ User ${userId} connected (Socket: ${client.id})`);
    } catch (error) {
      this.logger.error(`Connection failed: ${error.message}`);
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    const userId = client.data.userId;
    this.logger.log(`❌ User ${userId} disconnected (Socket: ${client.id})`);
  }

  emitToUser(userId: string, event: string, data: any) {
    this.server.to(`user:${userId}`).emit(event, data);
  }

  emitProgress(projectId: string, userId: string, data: any) {
    this.logger.log(`📡 Progress for project ${projectId}: ${data.progress}%`);
    
    this.emitToUser(userId, 'generation:progress', {
      projectId,
      progress: data.progress,
      status: data.status,
      message: data.message,
    });
  }

  emitComplete(projectId: string, userId: string, message: string) {
    this.logger.log(`✅ Complete for project ${projectId}`);
    
    this.emitToUser(userId, 'generation:complete', {
      projectId,
      message,
    });
  }

  emitError(projectId: string, userId: string, error: string) {
    this.logger.error(`❌ Error for project ${projectId}: ${error}`);
  
    this.emitToUser(userId, 'generation:error', {
      projectId,
      error,
    });
  }
}
