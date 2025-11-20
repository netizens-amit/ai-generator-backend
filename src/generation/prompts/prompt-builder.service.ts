// src/generation/prompts/prompt-builder.service.ts

import { Injectable, Logger } from '@nestjs/common';
import { GenerateWebsiteDto, CodeType } from '../dto/generate-website.dto';
import { INDUSTRY_TEMPLATES } from '../templates/industry-templates';
import { DESIGN_SYSTEMS } from './design-systems';

@Injectable()
export class PromptBuilderService {
  private logger = new Logger(PromptBuilderService.name);

  /**
   * Build enhanced prompt inspired by Open Lovable
   */
  buildReactPrompt(preferences: GenerateWebsiteDto): string {
    if (preferences.codeType === CodeType.REACT) {
      return this.buildReactPromptInternal(preferences);
    } else {
      return this.buildHTMLPrompt(preferences);
    }
  }

  /**
   * Build React prompt with Open Lovable's quality standards
   */
  private buildReactPromptInternal(prefs: GenerateWebsiteDto): string {
    const industry = INDUSTRY_TEMPLATES[prefs.industry] || INDUSTRY_TEMPLATES['business'];
    const design = DESIGN_SYSTEMS[prefs.designStyle] || DESIGN_SYSTEMS['modern'];

    return `You are an ELITE React/TypeScript developer building a PRODUCTION-GRADE ${industry.name} website for ${prefs.companyName}.

# 🎯 PROJECT SPECIFICATIONS

**Company**: ${prefs.companyName}
**Industry**: ${industry.name}
**Website Type**: ${prefs.websiteType}
**Design Style**: ${design.name}

## 🎨 MANDATORY COLOR PALETTE
- **Primary**: ${prefs.colorScheme.primary}
- **Secondary**: ${prefs.colorScheme.secondary}
- **Accent**: ${prefs.colorScheme.accent}

These MUST be defined as CSS variables in App.css:
\`\`\`css
:root {
  --color-primary: ${prefs.colorScheme.primary};
  --color-secondary: ${prefs.colorScheme.secondary};
  --color-accent: ${prefs.colorScheme.accent};
  --color-text: #1a1a1a;
  --color-background: #ffffff;
  --color-gray-50: #f9fafb;
  --color-gray-100: #f3f4f6;
  --color-gray-200: #e5e7eb;
  --color-gray-300: #d1d5db;
}
\`\`\`

# 📐 ARCHITECTURE REQUIREMENTS

## Component Structure (MANDATORY - Create ALL 8 components):

1. **Header.tsx** - Sticky navigation with mobile menu
2. **Hero.tsx** - Landing section with compelling CTA
3. **Features.tsx** - ${industry.name}-specific features grid
4. **About.tsx** - Company story and values
5. **Services.tsx** - Service offerings with details
6. **Testimonials.tsx** - Social proof section
7. **Contact.tsx** - Contact form with validation
8. **Footer.tsx** - Footer with links and social

## Required Sections for ${industry.name}:
${industry.sections.map((s, i) => `${i + 1}. ${s}`).join('\n')}

## Interactive Features:
${industry.features.map((f, i) => `${i + 1}. ${f}`).join('\n')}

# 🎨 DESIGN SYSTEM: ${design.name}

**Style**: ${design.description}

**Typography**:
- Headings: ${design.typography.headings}
- Body: ${design.typography.body}
- Sizes: ${design.typography.sizes}

**Spacing**:
- Sections: ${design.spacing.sections}
- Elements: ${design.spacing.elements}

**Components**:
- Buttons: ${design.components.buttons}
- Cards: ${design.components.cards}

**Layout**: ${design.layout}
**Effects**: ${design.effects}

# 💻 CODE QUALITY STANDARDS (CRITICAL)

## App.tsx Structure (EXACT FORMAT):
\`\`\`typescript
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import About from './components/About';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <Hero />
        <Features />
        <About />
        <Services />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
\`\`\`

## Component Template (USE THIS PATTERN):
\`\`\`typescript
import React, { useState } from 'react';

interface ComponentProps {
  // Define props if needed
}

function ComponentName({ }: ComponentProps) {
  const [state, setState] = useState<any>(initialValue);

  const handleAction = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Event handler logic
  };

  return (
    <section className="component-name" id="component-name">
      <div className="container">
        {/* Component JSX */}
      </div>
    </section>
  );
}

export default ComponentName;
\`\`\`

## CSS Standards (App.css MUST include):

1. **CSS Variables** at :root
2. **Reset styles** (*, body, etc.)
3. **Container** class with max-width: 1200px
4. **Section** spacing padding: 80px 0
5. **Responsive breakpoints**:
   - Mobile: default (< 768px)
   - Tablet: @media (min-width: 768px)
   - Desktop: @media (min-width: 1024px)
6. **All component styles** with proper class names
7. **Hover effects** with transitions
8. **Smooth scrolling**: html { scroll-behavior: smooth; }

## TypeScript Requirements:
- Proper interfaces for all props
- Type all state: useState<Type>(initial)
- Type all event handlers
- No 'any' types unless absolutely necessary

# ⚠️ CRITICAL RULES - MUST FOLLOW

## ❌ FORBIDDEN PATTERNS:
1. NO \`[...Array(n)].map()\` for rendering
2. NO external dependencies (react-icons, etc.)
3. NO console.log statements
4. NO Lorem Ipsum - use realistic ${industry.name} content
5. NO syntax errors - code must compile perfectly
6. NO missing exports - every component needs \`export default\`
7. NO mismatched CSS classes - className must exist in CSS

## ✅ REQUIRED PATTERNS:

### For Star Ratings (CORRECT WAY):
\`\`\`typescript
const rating = 5;
return (
  <div className="rating">
    {'★'.repeat(rating)}
  </div>
);
\`\`\`

### For Lists with Data:
\`\`\`typescript
const items = [
  { id: 1, name: 'Item 1', description: 'Details...' },
  { id: 2, name: 'Item 2', description: 'Details...' }
];

return (
  <div className="items-grid">
    {items.map((item, index) => (
      <div key={index} className="item-card">
        <h3>{item.name}</h3>
        <p>{item.description}</p>
      </div>
    ))}
  </div>
);
\`\`\`

### For Form Validation:
\`\`\`typescript
const [formData, setFormData] = useState({ name: '', email: '', message: '' });
const [errors, setErrors] = useState<Record<string, string>>({});

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  
  const newErrors: Record<string, string> = {};
  
  if (!formData.name.trim()) {
    newErrors.name = 'Name is required';
  }
  
  if (!formData.email.match(/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/)) {
    newErrors.email = 'Valid email is required';
  }
  
  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }
  
  // Submit logic
  alert('Form submitted successfully!');
  setFormData({ name: '', email: '', message: '' });
};
\`\`\`

# 📦 OUTPUT FORMAT (JSON)

Return EXACTLY this structure:

\`\`\`json
{
  "appTsx": "Complete App.tsx with all imports and structure",
  "appCss": "Complete App.css with ALL styles for ALL components - minimum 800 lines",
  "indexTsx": "React 18 entry point with createRoot",
  "packageJson": "Valid package.json with React 18.2.0",
  "components": [
    {
      "fileName": "Header.tsx",
      "code": "Complete Header component with mobile menu",
      "dependencies": []
    },
    {
      "fileName": "Hero.tsx",
      "code": "Complete Hero component with CTA",
      "dependencies": []
    },
    {
      "fileName": "Features.tsx",
      "code": "Complete Features component with grid",
      "dependencies": []
    },
    {
      "fileName": "About.tsx",
      "code": "Complete About component",
      "dependencies": []
    },
    {
      "fileName": "Services.tsx",
      "code": "Complete Services component",
      "dependencies": []
    },
    {
      "fileName": "Testimonials.tsx",
      "code": "Complete Testimonials component with ratings",
      "dependencies": []
    },
    {
      "fileName": "Contact.tsx",
      "code": "Complete Contact component with form validation",
      "dependencies": []
    },
    {
      "fileName": "Footer.tsx",
      "code": "Complete Footer component with links",
      "dependencies": []
    }
  ],
  "metadata": {
    "componentCount": 8,
    "hasResponsiveDesign": true,
    "usesTypeScript": true,
    "estimatedLines": 2000
  }
}
\`\`\`

# 🎯 CONTENT GUIDELINES FOR ${industry.name}

${industry.contentGuidelines}

**CTAs to use**: ${industry.ctas.join(', ')}

# ✅ FINAL CHECKLIST

Before generating, verify:
- [ ] All 8 components created with proper names
- [ ] Each component has \`export default ComponentName\`
- [ ] All imports in App.tsx match component names
- [ ] CSS variables defined and used throughout
- [ ] Responsive design with mobile-first approach
- [ ] All className attributes have corresponding CSS
- [ ] No syntax errors, no TypeScript errors
- [ ] No external dependencies used
- [ ] Form validation implemented
- [ ] Mobile menu toggle works
- [ ] Content is realistic for ${industry.name}
- [ ] Colors match EXACTLY: ${prefs.colorScheme.primary}, ${prefs.colorScheme.secondary}, ${prefs.colorScheme.accent}
- [ ] Design matches ${design.name} style
- [ ] All interactive features functional
- [ ] No console.log or debugging code
- [ ] Star ratings use {'★'.repeat(n)} pattern
- [ ] Arrays use .map() with proper keys

# 🚀 PRODUCTION REQUIREMENTS

This code will be deployed to PRODUCTION. It MUST be:
- ✅ Completely functional in Sandpack/CodeSandbox
- ✅ Zero compilation errors
- ✅ Professional ${industry.name} content
- ✅ Fully responsive (mobile/tablet/desktop)
- ✅ Accessible (semantic HTML, ARIA labels)
- ✅ Performant (optimized rendering)
- ✅ Beautiful design matching ${design.name}

Generate a PERFECT, PRODUCTION-READY ${industry.name} website for ${prefs.companyName} NOW!`;
  }

  /**
   * Build HTML prompt
   */
  buildHTMLPrompt(prefs: GenerateWebsiteDto): string {
    const industry = INDUSTRY_TEMPLATES[prefs.industry] || INDUSTRY_TEMPLATES['business'];
    const design = DESIGN_SYSTEMS[prefs.designStyle] || DESIGN_SYSTEMS['modern'];

    return `You are an EXPERT web developer creating a PROFESSIONAL ${industry.name} website with HTML5, CSS3, and JavaScript.

# 🎯 PROJECT DETAILS

**Company**: ${prefs.companyName}
**Industry**: ${industry.name}
**Website Type**: ${prefs.websiteType}
**Design**: ${design.name}

## 🎨 COLOR PALETTE (MANDATORY):
- Primary: ${prefs.colorScheme.primary}
- Secondary: ${prefs.colorScheme.secondary}
- Accent: ${prefs.colorScheme.accent}

Define as CSS variables:
\`\`\`css
:root {
  --primary: ${prefs.colorScheme.primary};
  --secondary: ${prefs.colorScheme.secondary};
  --accent: ${prefs.colorScheme.accent};
}
\`\`\`

# 📋 REQUIRED SECTIONS
${industry.sections.map((s, i) => `${i + 1}. ${s}`).join('\n')}

# ⚡ INTERACTIVE FEATURES
${industry.features.map((f, i) => `${i + 1}. ${f}`).join('\n')}

# 🎨 DESIGN STYLE: ${design.name}
${design.description}

**Typography**: ${design.typography.headings} / ${design.typography.body}
**Spacing**: ${design.spacing.sections}
**Components**: ${design.components.buttons}
**Layout**: ${design.layout}
**Effects**: ${design.effects}

# 💻 TECHNICAL REQUIREMENTS

## HTML Structure:
- Semantic HTML5 (header, nav, main, section, footer)
- Proper heading hierarchy (one h1, then h2, h3)
- Meta tags: viewport, description, charset UTF-8
- Accessible forms with labels
- Image alt attributes

## CSS Requirements:
- Mobile-first responsive design
- CSS custom properties for colors
- Flexbox and Grid layouts
- Smooth transitions (0.3s ease)
- Hover effects on interactive elements
- Media queries: 768px, 1024px

## JavaScript Features:
- Smooth scrolling navigation
- Mobile menu toggle
- Form validation with feedback
- Scroll animations (Intersection Observer)
- No console.logs

# 📦 OUTPUT JSON

{
  "html": "Complete HTML document with <!DOCTYPE html>",
  "css": "Complete CSS with variables and responsive design",
  "js": "Complete JavaScript with all functionality",
  "metadata": {
    "title": "${prefs.companyName} - ${industry.name}",
    "description": "Professional ${industry.name} services",
    "colorScheme": {
      "primary": "${prefs.colorScheme.primary}",
      "secondary": "${prefs.colorScheme.secondary}",
      "accent": "${prefs.colorScheme.accent}"
    }
  }
}

Generate PRODUCTION-READY code for ${prefs.companyName} matching ${design.name} style!`;
  }
}