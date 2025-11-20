import { z } from 'zod';
export declare const GenerationStepSchema: z.ZodObject<{
    step: z.ZodEnum<{
        completed: "completed";
        analyzing_preferences: "analyzing_preferences";
        building_prompt: "building_prompt";
        generating_structure: "generating_structure";
        validating_code: "validating_code";
        formatting_code: "formatting_code";
        saving_files: "saving_files";
        generating_components: "generating_components";
    }>;
    progress: z.ZodNumber;
    message: z.ZodString;
    timestamp: z.ZodDate;
    data: z.ZodOptional<z.ZodAny>;
}, z.core.$strip>;
export type GenerationStep = z.infer<typeof GenerationStepSchema>;
