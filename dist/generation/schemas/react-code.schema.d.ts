import { z } from 'zod';
export declare const ComponentSchema: z.ZodObject<{
    fileName: z.ZodString;
    code: z.ZodString;
    dependencies: z.ZodOptional<z.ZodArray<z.ZodString>>;
}, z.core.$strip>;
export declare const ReactCodeSchema: z.ZodObject<{
    appTsx: z.ZodString;
    appCss: z.ZodString;
    indexTsx: z.ZodString;
    packageJson: z.ZodString;
    components: z.ZodArray<z.ZodObject<{
        fileName: z.ZodString;
        code: z.ZodString;
        dependencies: z.ZodOptional<z.ZodArray<z.ZodString>>;
    }, z.core.$strip>>;
    metadata: z.ZodOptional<z.ZodObject<{
        componentCount: z.ZodOptional<z.ZodNumber>;
        hasResponsiveDesign: z.ZodOptional<z.ZodBoolean>;
        usesTypeScript: z.ZodOptional<z.ZodBoolean>;
        estimatedLines: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type ReactCode = z.infer<typeof ReactCodeSchema>;
export type ReactComponent = z.infer<typeof ComponentSchema>;
