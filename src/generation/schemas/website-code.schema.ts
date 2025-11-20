import { z } from 'zod';

export const WebsiteCodeSchema = z.object({
  html: z.string()
    .min(100, 'HTML too short')
    .describe('Complete HTML5 document with semantic structure'),

  css: z.string()
    .min(100, 'CSS too short')
    .describe('Complete CSS with variables, responsive design, and animations'),

  js: z.string()
    .min(1, 'JavaScript required')
    .describe('Vanilla JavaScript functionality'),

  metadata: z.object({
    title: z.string(),
    description: z.string(),
    colorScheme: z.object({
      primary: z.string(),
      secondary: z.string(),
      accent: z.string(),
    }),
    sections: z.array(z.string()).optional(),
    estimatedLines: z.number().optional(),
  }),
});

export type WebsiteCode = z.infer<typeof WebsiteCodeSchema>;
