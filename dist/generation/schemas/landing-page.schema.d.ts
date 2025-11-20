import { z } from 'zod';
export declare const LandingPageSchema: z.ZodObject<{
    html: z.ZodString;
    css: z.ZodString;
    js: z.ZodString;
    metadata: z.ZodObject<{
        title: z.ZodString;
        description: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export type LandingPageData = z.infer<typeof LandingPageSchema>;
