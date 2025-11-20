"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BullConfigModule = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const config_1 = require("@nestjs/config");
exports.BullConfigModule = bullmq_1.BullModule.forRootAsync({
    imports: [config_1.ConfigModule],
    useFactory: (configService) => ({
        connection: {
            host: configService.get('REDIS_HOST', 'localhost'),
            port: configService.get('REDIS_PORT', 6379),
        },
    }),
    inject: [config_1.ConfigService],
});
//# sourceMappingURL=bull.config.js.map