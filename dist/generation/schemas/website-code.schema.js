"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebsiteCodeSchema = void 0;
const zod_1 = require("zod");
exports.WebsiteCodeSchema = zod_1.z.object({
    html: zod_1.z.string()
        .min(100, 'HTML too short')
        .describe('Complete HTML5 document with semantic structure'),
    css: zod_1.z.string()
        .min(100, 'CSS too short')
        .describe('Complete CSS with variables, responsive design, and animations'),
    js: zod_1.z.string()
        .min(1, 'JavaScript required')
        .describe('Vanilla JavaScript functionality'),
    metadata: zod_1.z.object({
        title: zod_1.z.string(),
        description: zod_1.z.string(),
        colorScheme: zod_1.z.object({
            primary: zod_1.z.string(),
            secondary: zod_1.z.string(),
            accent: zod_1.z.string(),
        }),
        sections: zod_1.z.array(zod_1.z.string()).optional(),
        estimatedLines: zod_1.z.number().optional(),
    }),
});
//# sourceMappingURL=website-code.schema.js.map