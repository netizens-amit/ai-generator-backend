"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var EventsGateway_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
let EventsGateway = EventsGateway_1 = class EventsGateway {
    jwtService;
    server;
    logger = new common_1.Logger(EventsGateway_1.name);
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    async handleConnection(client) {
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
        }
        catch (error) {
            this.logger.error(`Connection failed: ${error.message}`);
            client.disconnect();
        }
    }
    handleDisconnect(client) {
        const userId = client.data.userId;
        this.logger.log(`❌ User ${userId} disconnected (Socket: ${client.id})`);
    }
    emitToUser(userId, event, data) {
        this.server.to(`user:${userId}`).emit(event, data);
    }
    emitProgress(projectId, userId, data) {
        this.logger.log(`📡 Progress for project ${projectId}: ${data.progress}%`);
        this.emitToUser(userId, 'generation:progress', {
            projectId,
            progress: data.progress,
            status: data.status,
            message: data.message,
        });
    }
    emitComplete(projectId, userId, message) {
        this.logger.log(`✅ Complete for project ${projectId}`);
        this.emitToUser(userId, 'generation:complete', {
            projectId,
            message,
        });
    }
    emitError(projectId, userId, error) {
        this.logger.error(`❌ Error for project ${projectId}: ${error}`);
        this.emitToUser(userId, 'generation:error', {
            projectId,
            error,
        });
    }
};
exports.EventsGateway = EventsGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], EventsGateway.prototype, "server", void 0);
exports.EventsGateway = EventsGateway = EventsGateway_1 = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: process.env.FRONTEND_URL || 'http://localhost:5173',
            credentials: true,
        },
    }),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], EventsGateway);
//# sourceMappingURL=events.gateway.js.map