// src/generation/prompts/design-systems.ts

export interface DesignSystem {
  name: string;
  description: string;
  colors: {
    usage: string;
    contrast: string;
  };
  typography: {
    headings: string;
    body: string;
    sizes: string;
  };
  spacing: {
    sections: string;
    elements: string;
  };
  components: {
    buttons: string;
    cards: string;
    inputs: string;
  };
  layout: string;
  effects: string;
}

export const DESIGN_SYSTEMS: Record<string, DesignSystem> = {
  modern: {
    name: 'Modern',
    description: 'Clean, professional design with subtle depth and whitespace',
    colors: {
      usage: 'Use primary for CTAs and headings, secondary for accents, neutral grays for text',
      contrast: 'Ensure WCAG AA compliance (4.5:1 contrast ratio minimum)',
    },
    typography: {
      headings: 'Inter, -apple-system, system-ui - weights: 600-700',
      body: 'Inter, -apple-system, system-ui - weight: 400',
      sizes: 'H1: 3rem, H2: 2.25rem, H3: 1.75rem, Body: 1rem (16px), Small: 0.875rem',
    },
    spacing: {
      sections: '4rem (64px) vertical padding between major sections',
      elements: '1rem (16px) base, 1.5rem (24px) for cards, 2rem (32px) for containers',
    },
    components: {
      buttons: 'Rounded corners (8px), padding 0.75rem 1.5rem, box-shadow on hover, transitions 0.3s',
      cards: 'White background, border-radius 12px, box-shadow subtle (0 2px 8px rgba(0,0,0,0.1)), padding 1.5rem',
      inputs: 'Border 1px solid #e0e0e0, rounded 8px, padding 0.75rem 1rem, focus: primary color border',
    },
    layout: 'Max-width 1200px centered, grid-based layouts, responsive breakpoints: mobile 768px, desktop 1024px',
    effects: 'Subtle shadows, smooth 0.3s transitions, transform scale(1.05) on hover for interactive elements',
  },

  minimalist: {
    name: 'Minimalist',
    description: 'Ultra-clean with maximum white space and monochromatic palette',
    colors: {
      usage: 'Primarily black/white with one accent color for CTAs only',
      contrast: 'High contrast - black text on white, or vice versa',
    },
    typography: {
      headings: 'Helvetica Neue, Arial, sans-serif - weight: 300-400 (light)',
      body: 'Helvetica Neue, Arial, sans-serif - weight: 300',
      sizes: 'H1: 3.5rem, H2: 2.5rem, H3: 1.875rem, Body: 1.125rem (18px)',
    },
    spacing: {
      sections: '6rem (96px) vertical padding - generous whitespace',
      elements: '2rem (32px) minimum between elements',
    },
    components: {
      buttons: 'Sharp corners (0px) or subtle (2px), thin border 1px, no shadows, uppercase text',
      cards: 'No shadows, thin border 1px, minimal padding 1rem, sharp corners',
      inputs: 'Bottom border only (2px), no rounded corners, minimal padding',
    },
    layout: 'Asymmetric layouts encouraged, single-column mobile, large margins (10% of viewport)',
    effects: 'No shadows, simple opacity transitions, underline animations for links',
  },

  creative: {
    name: 'Creative',
    description: 'Bold, experimental with unique layouts and vibrant colors',
    colors: {
      usage: 'Bold primary and accent colors, gradients encouraged, complementary color schemes',
      contrast: 'Vibrant but accessible - test with contrast checkers',
    },
    typography: {
      headings: 'Display/decorative fonts - bold, expressive (Poppins, Montserrat)',
      body: 'Clean sans-serif (Lato, Open Sans) - weight: 400-500',
      sizes: 'H1: 4rem+, H2: 3rem, H3: 2rem, Body: 1rem, vary sizes for emphasis',
    },
    spacing: {
      sections: 'Variable - 3rem to 5rem, use negative margins for overlaps',
      elements: '1.5rem base, overlapping elements allowed for depth',
    },
    components: {
      buttons: 'Heavy rounding (24px+), gradients, bold shadows (0 8px 16px), animated on hover',
      cards: 'Colorful backgrounds, heavy shadows (0 12px 24px), rounded 20px, overlapping images',
      inputs: 'Rounded (12px), colored borders, floating labels, creative focus states',
    },
    layout: 'Asymmetric grids, diagonal sections, overlapping elements, full-bleed images, varied column widths',
    effects: 'Heavy shadows, gradient overlays, transform rotations, parallax scrolling, animated SVG',
  },

  corporate: {
    name: 'Corporate',
    description: 'Professional, trustworthy, structured and traditional',
    colors: {
      usage: 'Conservative palette - blues, grays, whites, minimal bright colors',
      contrast: 'High readability priority - dark text on light backgrounds',
    },
    typography: {
      headings: 'Serif fonts (Georgia, Times New Roman) or professional sans (Arial)',
      body: 'Arial, Helvetica, sans-serif - weight: 400',
      sizes: 'H1: 2.5rem, H2: 2rem, H3: 1.5rem, Body: 1rem (16px), professional hierarchy',
    },
    spacing: {
      sections: '3rem (48px) consistent padding',
      elements: '1rem (16px) grid-based spacing',
    },
    components: {
      buttons: 'Minimal rounding (4px), solid colors, subtle shadows, professional hover states',
      cards: 'Light gray backgrounds, subtle borders, rounded 8px, organized layout',
      inputs: 'Standard form styling, rounded 4px, gray borders, clear labels',
    },
    layout: 'Symmetric grid system, traditional 3-column layouts, contained max-width 1140px, centered',
    effects: 'Subtle shadows only, professional transitions, no excessive animations',
  },

  elegant: {
    name: 'Elegant',
    description: 'Sophisticated with refined typography and muted tones',
    colors: {
      usage: 'Muted palette - soft grays, beiges, golds/rose gold for accents',
      contrast: 'Soft contrast - readable but refined',
    },
    typography: {
      headings: 'Elegant serif (Playfair Display, Cormorant, Crimson Text)',
      body: 'Clean sans-serif (Lato, Raleway) - weight: 300-400',
      sizes: 'H1: 3rem, H2: 2.25rem, H3: 1.75rem, Body: 1.0625rem (17px), generous line-height 1.8',
    },
    spacing: {
      sections: '5rem (80px) vertical padding for breathing room',
      elements: '1.5rem (24px) between elements, ample whitespace',
    },
    components: {
      buttons: 'Minimal rounding (6px), thin borders, subtle hover effects, elegant transitions',
      cards: 'Soft shadows (0 4px 12px rgba(0,0,0,0.05)), rounded 12px, refined borders',
      inputs: 'Thin borders (1px), rounded 6px, refined focus states with gold/rose accents',
    },
    layout: 'Centered, balanced layouts, generous line-height, classic proportions (golden ratio)',
    effects: 'Soft shadows, fade transitions, elegant hover states, subtle scale transforms',
  },

  playful: {
    name: 'Playful',
    description: 'Fun, energetic with rounded shapes and bright colors',
    colors: {
      usage: 'Bright primary colors, multiple accent colors, gradients, colorful backgrounds',
      contrast: 'High energy - ensure readability with proper contrast',
    },
    typography: {
      headings: 'Rounded fonts (Quicksand, Varela Round, Nunito) - weight: 700',
      body: 'Rounded sans-serif (Nunito, Poppins) - weight: 400-500',
      sizes: 'H1: 3.5rem, H2: 2.5rem, H3: 1.875rem, Body: 1rem, playful sizing variations',
    },
    spacing: {
      sections: '4rem (64px) with varied, dynamic spacing',
      elements: '1.25rem (20px) base, varied for visual interest',
    },
    components: {
      buttons: 'Heavy rounding (20px+), bright gradients, playful shadows, bounce animations',
      cards: 'Colorful backgrounds, heavy rounding (16px+), playful shadows, tilted variations',
      inputs: 'Fully rounded (24px), colorful borders, fun focus states with animations',
    },
    layout: 'Dynamic, varied layouts, colorful section backgrounds, asymmetric grids, fun shapes',
    effects: 'Bounce animations, color transitions, playful hovers, animated icons, gradient shifts',
  },
};
