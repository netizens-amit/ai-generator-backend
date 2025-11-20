"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactCodeSchema = exports.ComponentSchema = void 0;
const zod_1 = require("zod");
exports.ComponentSchema = zod_1.z.object({
    fileName: zod_1.z.string()
        .regex(/^[A-Z][a-zA-Z0-9]*\.tsx$/, 'Component filename must be PascalCase with .tsx extension')
        .describe('Component filename (e.g., Header.tsx, Hero.tsx)'),
    code: zod_1.z.string()
        .min(100, 'Component code too short')
        .describe('Complete TypeScript React component code. MUST include proper interfaces and export default.'),
    dependencies: zod_1.z.array(zod_1.z.string()).optional()
        .describe('External dependencies used in component'),
});
exports.ReactCodeSchema = zod_1.z.object({
    appTsx: zod_1.z.string()
        .min(50, 'App.tsx too short')
        .describe('Main App.tsx - imports and renders all components wrapped in a <main> tag.'),
    appCss: zod_1.z.string()
        .min(500, 'App.css too short')
        .describe('Complete global CSS. MUST include :root variables, reset, typography, and responsive @media queries for all components.'),
    indexTsx: zod_1.z.string()
        .min(20)
        .describe('React entry point with root rendering (createRoot)'),
    packageJson: zod_1.z.string()
        .describe('Valid package.json with required dependencies (react, react-dom, framer-motion, lucide-react)'),
    components: zod_1.z.array(exports.ComponentSchema)
        .min(6, 'Must include at least 6 components (Header, Hero, Features, About, Testimonials, Contact, Footer)')
        .describe('Array of reusable component files'),
    metadata: zod_1.z.object({
        componentCount: zod_1.z.number().optional(),
        hasResponsiveDesign: zod_1.z.boolean().optional(),
        usesTypeScript: zod_1.z.boolean().optional(),
        estimatedLines: zod_1.z.number().optional(),
    }).optional(),
});
//# sourceMappingURL=react-code.schema.js.map