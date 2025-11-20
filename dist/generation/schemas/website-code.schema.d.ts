import { z } from 'zod';
export declare const WebsiteCodeSchema: z.ZodObject<{
    html: z.ZodString;
    css: z.ZodString;
    js: z.ZodString;
    metadata: z.ZodObject<{
        title: z.ZodString;
        description: z.ZodString;
        colorScheme: z.ZodObject<{
            primary: z.ZodString;
            secondary: z.ZodString;
            accent: z.ZodString;
        }, z.core.$strip>;
        sections: z.ZodOptional<z.ZodArray<z.ZodString>>;
        estimatedLines: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>;
}, z.core.$strip>;
export type WebsiteCode = z.infer<typeof WebsiteCodeSchema>;
