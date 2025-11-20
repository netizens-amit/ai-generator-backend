import { z } from 'zod';

export const GenerationStepSchema = z.object({
  step: z.enum([
    'analyzing_preferences',
    'building_prompt',
    'generating_structure',
    'generating_components',
    'validating_code',
    'formatting_code',
    'saving_files',
    'completed'
  ]),
  progress: z.number().min(0).max(100),
  message: z.string(),
  timestamp: z.date(),
  data: z.any().optional(),
});

export type GenerationStep = z.infer<typeof GenerationStepSchema>;