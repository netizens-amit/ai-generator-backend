"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromptBuilderService = void 0;
const common_1 = require("@nestjs/common");
const industry_templates_1 = require("../templates/industry-templates");
const design_systems_1 = require("./design-systems");
let PromptBuilderService = class PromptBuilderService {
    buildReactPrompt(prefs) {
        const industry = industry_templates_1.INDUSTRY_TEMPLATES[prefs.industry] || industry_templates_1.INDUSTRY_TEMPLATES['business'];
        const design = design_systems_1.DESIGN_SYSTEMS[prefs.designStyle] || design_systems_1.DESIGN_SYSTEMS['modern'];
        const header = `You are an ELITE React TypeScript developer creating a PRODUCTION-READY, PIXEL-PERFECT ${industry.name} website.

PROJECT REQUIREMENTS:
- Company: ${prefs.companyName}
- Industry: ${industry.name}
- Design Style: ${design.name}
- Type: ${prefs.websiteType}

COLOR SCHEME (USE EXACTLY):
- Primary: ${prefs.colorScheme.primary}
- Secondary: ${prefs.colorScheme.secondary}
- Accent: ${prefs.colorScheme.accent}`;
        const criticalRules = `

CRITICAL RULES - VIOLATION = FAILURE:

1. NO TRUNCATION - COMPLETE FILES ONLY
   - NEVER use "..." or ellipsis ANYWHERE in code
   - NEVER cut off strings mid-sentence
   - NEVER leave incomplete className attributes
   - ALWAYS complete EVERY file you start
   - Better to generate 3 COMPLETE files than 10 INCOMPLETE files

2. USE STANDARD TAILWIND CLASSES ONLY
   ✅ CORRECT: bg-white, text-gray-900, bg-blue-500, border-gray-200, hover:bg-blue-700
   ❌ WRONG: bg-background, text-foreground, bg-primary, border-border, bg-muted

3. CRITICAL SYNTAX RULES
   - ALWAYS escape apostrophes: use "you're" NOT 'you're'
   - NEVER use smart quotes - only straight quotes
   - ALWAYS complete every string literal
   - NEVER write: className="px-4 py-2 bg-blue-...
   - ALWAYS write: className="px-4 py-2 bg-blue-600"

4. REQUIRED FILES (Generate in this order):
   1. src/index.css - Tailwind directives only
   2. src/App.tsx - Main app component
   3. src/components/Header.tsx - Navigation with mobile menu
   4. src/components/Hero.tsx - Landing section
   5. src/components/Features.tsx - Feature cards grid
   6. src/components/About.tsx - Company info
   7. src/components/Services.tsx - Service offerings
   8. src/components/Testimonials.tsx - Customer reviews
   9. src/components/Contact.tsx - Contact form
   10. src/components/Footer.tsx - Footer with links

5. STYLING REQUIREMENTS
   - ONLY create src/index.css with Tailwind directives
   - NEVER create App.css or component-specific CSS files
   - NEVER use inline styles or <style jsx> tags
   - ALWAYS use Tailwind classes for ALL styling`;
        const sections = `

REQUIRED SECTIONS:
${industry.sections.map((s, i) => `${i + 1}. ${s}`).join('\n')}

INTERACTIVE FEATURES:
${industry.features.map((f, i) => `${i + 1}. ${f}`).join('\n')}

DESIGN SYSTEM: ${design.name}
${design.description}
Typography: ${design.typography.headings} / ${design.typography.body}
Spacing: ${design.spacing.sections}`;
        const examples = `

TAILWIND CLASS EXAMPLES:
- Buttons: className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
- Cards: className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300"
- Sections: className="w-full py-20 px-4 sm:px-6 lg:px-8"
- Headers: className="sticky top-0 z-50 bg-white shadow-md"

COMPONENT STRUCTURE EXAMPLE (Header):
- Use sticky positioning: position: sticky, top: 0
- Desktop nav: hidden md:flex space-x-8
- Mobile menu: hamburger button + conditional rendering
- Responsive breakpoints: sm:, md:, lg:, xl:

COMPONENT STRUCTURE EXAMPLE (Hero):
- Gradient background: bg-gradient-to-r from-blue-600 to-blue-800
- Centered content: max-w-7xl mx-auto text-center
- Responsive text: text-4xl sm:text-5xl lg:text-6xl
- CTA button with hover effects

COMPONENT STRUCTURE EXAMPLE (Features):
- Grid layout: grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8
- Card hover effects: hover:shadow-xl transform hover:scale-105
- Icons: Use Unicode emojis (🚀, 💼, 🛠️, 🔒)`;
        const outputFormat = `

OUTPUT FORMAT:
Generate files in this EXACT XML format:

<file path="src/index.css">
@tailwind base;
@tailwind components;
@tailwind utilities;
</file>

<file path="src/App.tsx">
[COMPLETE App.tsx code here - import all components]
</file>

<file path="src/components/Header.tsx">
[COMPLETE Header.tsx code here]
</file>

[... Continue for ALL components ...]`;
        const finalChecklist = `

FINAL CHECKLIST:
- All files are COMPLETE (no truncation, no ellipsis)
- All className attributes use STANDARD Tailwind classes
- All strings use straight quotes and proper escaping
- All components have default export
- Mobile responsive (sm:, md:, lg: breakpoints)
- All imports match created files
- NO syntax errors
- NO smart quotes
- NO custom Tailwind classes

GENERATION INSTRUCTIONS:
1. Generate src/index.css FIRST
2. Generate src/App.tsx SECOND
3. Generate ALL 8 component files
4. Ensure EVERY file is COMPLETE
5. Use ONLY standard Tailwind classes
6. Make it FULLY responsive
7. Add smooth transitions and hover effects
8. Use realistic ${industry.name} content

This is going LIVE - make it PERFECT!`;
        return header + criticalRules + sections + examples + outputFormat + finalChecklist;
    }
    buildHTMLPrompt(prefs) {
        const industry = industry_templates_1.INDUSTRY_TEMPLATES[prefs.industry] || industry_templates_1.INDUSTRY_TEMPLATES['business'];
        const design = design_systems_1.DESIGN_SYSTEMS[prefs.designStyle] || design_systems_1.DESIGN_SYSTEMS['modern'];
        return `You are an expert HTML/CSS/JavaScript developer creating a PRODUCTION-READY ${industry.name} website.

PROJECT REQUIREMENTS:
Company: ${prefs.companyName}
Industry: ${industry.name}
Design: ${design.name}
Type: ${prefs.websiteType}

COLOR SCHEME:
Primary: ${prefs.colorScheme.primary}
Secondary: ${prefs.colorScheme.secondary}
Accent: ${prefs.colorScheme.accent}

REQUIRED SECTIONS:
${industry.sections.map((s, i) => `${i + 1}. ${s}`).join('\n')}

CRITICAL RULES:
1. Generate complete, valid HTML5 structure
2. Include responsive CSS with media queries
3. Add interactive JavaScript features
4. Use semantic HTML elements
5. Ensure mobile-first responsive design
6. Include proper meta tags and SEO elements

OUTPUT FORMAT:
Return a JSON object with:
{
  "html": "complete HTML code",
  "css": "complete CSS code",
  "js": "complete JavaScript code",
  "metadata": {
    "title": "${prefs.companyName} - ${industry.name}",
    "description": "Professional ${industry.name} website",
    "colorScheme": {
      "primary": "${prefs.colorScheme.primary}",
      "secondary": "${prefs.colorScheme.secondary}",
      "accent": "${prefs.colorScheme.accent}"
    }
  }
}

Make it production-ready and fully responsive!`;
    }
    getPromptStats(prompt) {
        const lines = prompt.split('\n').length;
        const chars = prompt.length;
        const words = prompt.split(/\s+/).length;
        return {
            lines,
            chars,
            words,
            estimatedTokens: Math.ceil(words * 1.3)
        };
    }
};
exports.PromptBuilderService = PromptBuilderService;
exports.PromptBuilderService = PromptBuilderService = __decorate([
    (0, common_1.Injectable)()
], PromptBuilderService);
//# sourceMappingURL=prompt-builder-new.service.js.map