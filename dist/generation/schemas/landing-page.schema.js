"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LandingPageSchema = void 0;
const zod_1 = require("zod");
exports.LandingPageSchema = zod_1.z.object({
    html: zod_1.z.string().describe('Complete HTML code for the landing page. Must be valid, semantic HTML5 with proper structure, including navbar, hero, features, about, contact form, and footer sections.'),
    css: zod_1.z.string().describe('Complete CSS code with modern styling. Must use the exact color scheme provided by user (primary, secondary, accent). Include responsive design, animations, hover effects, and mobile breakpoints.'),
    js: zod_1.z.string().describe('Complete vanilla JavaScript code for interactions. Include smooth scrolling, mobile menu toggle, form validation, scroll animations, and any other interactivity.'),
    metadata: zod_1.z.object({
        title: zod_1.z.string().describe('Page title for browser tab'),
        description: zod_1.z.string().describe('Meta description for SEO'),
    }),
});
//# sourceMappingURL=landing-page.schema.js.map