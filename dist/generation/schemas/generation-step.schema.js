"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerationStepSchema = void 0;
const zod_1 = require("zod");
exports.GenerationStepSchema = zod_1.z.object({
    step: zod_1.z.enum([
        'analyzing_preferences',
        'building_prompt',
        'generating_structure',
        'generating_components',
        'validating_code',
        'formatting_code',
        'saving_files',
        'completed'
    ]),
    progress: zod_1.z.number().min(0).max(100),
    message: zod_1.z.string(),
    timestamp: zod_1.z.date(),
    data: zod_1.z.any().optional(),
});
//# sourceMappingURL=generation-step.schema.js.map