// src/generation/schemas/landing-page.schema.ts
import { z } from 'zod';

export const LandingPageSchema = z.object({
  html: z.string().describe('Complete HTML code for the landing page. Must be valid, semantic HTML5 with proper structure, including navbar, hero, features, about, contact form, and footer sections.'),
  
  css: z.string().describe('Complete CSS code with modern styling. Must use the exact color scheme provided by user (primary, secondary, accent). Include responsive design, animations, hover effects, and mobile breakpoints.'),
  
  js: z.string().describe('Complete vanilla JavaScript code for interactions. Include smooth scrolling, mobile menu toggle, form validation, scroll animations, and any other interactivity.'),
  
  metadata: z.object({
    title: z.string().describe('Page title for browser tab'),
    description: z.string().describe('Meta description for SEO'),
  }),
});

export type LandingPageData = z.infer<typeof LandingPageSchema>;
