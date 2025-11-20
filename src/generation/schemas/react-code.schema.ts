import { z } from 'zod';

// Component schema with validation rules
export const ComponentSchema = z.object({
  fileName: z.string()
    .regex(/^[A-Z][a-zA-Z0-9]*\.tsx$/, 'Component filename must be PascalCase with .tsx extension')
    .describe('Component filename (e.g., Header.tsx, Hero.tsx)'),
  
  code: z.string()
    .min(100, 'Component code too short')
    .describe('Complete TypeScript React component code. MUST include proper interfaces and export default.'),
  
  dependencies: z.array(z.string()).optional()
    .describe('External dependencies used in component'),
});

// Enhanced React code schema
export const ReactCodeSchema = z.object({
  appTsx: z.string()
    .min(50, 'App.tsx too short')
    .describe('Main App.tsx - imports and renders all components wrapped in a <main> tag.'),
  
  appCss: z.string()
    .min(500, 'App.css too short')
    .describe('Complete global CSS. MUST include :root variables, reset, typography, and responsive @media queries for all components.'),
  
  indexTsx: z.string()
    .min(20)
    .describe('React entry point with root rendering (createRoot)'),
  
  packageJson: z.string()
    .describe('Valid package.json with required dependencies (react, react-dom, framer-motion, lucide-react)'),
  
  components: z.array(ComponentSchema)
    .min(6, 'Must include at least 6 components (Header, Hero, Features, About, Testimonials, Contact, Footer)')
    .describe('Array of reusable component files'),
  
  metadata: z.object({
    componentCount: z.number().optional(),
    hasResponsiveDesign: z.boolean().optional(),
    usesTypeScript: z.boolean().optional(),
    estimatedLines: z.number().optional(),
  }).optional(),
});

export type ReactCode = z.infer<typeof ReactCodeSchema>;
export type ReactComponent = z.infer<typeof ComponentSchema>;
