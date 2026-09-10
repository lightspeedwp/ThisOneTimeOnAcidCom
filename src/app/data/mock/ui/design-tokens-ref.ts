/**
 * @fileoverview Design Tokens Reference mock data
 * @module data/mock/ui/design-tokens-ref
 * @version 1.0.0
 */

import type { BreadcrumbItem } from '../../../components/ui/Breadcrumbs';

export interface TokenEntry {
  token: string;
  value: string;
  label: string;
}

export interface TokenSection {
  id: string;
  title: string;
  description: string;
  tokens: TokenEntry[];
}

export const designTokensRefUI = {
  seo: { title: 'Design tokens reference | Developer tools | Ash Shaw' },
  breadcrumbs: [
    { label: 'Home', href: '/' },
    { label: 'Developer tools', href: '/dev-tools' },
    { label: 'Design tokens reference' },
  ] as BreadcrumbItem[],
  hero: {
    badge: 'Design System',
    title: 'Design tokens reference',
    description:
      'Complete reference of every CSS custom property in the Ash Shaw design system. Click any section to expand. Use the sidebar to jump between categories.',
  },
  sections: [
    {
      id: 'neon-colors',
      title: 'Neon colors',
      description: '8 high-saturation neon colours for dark mode and decorative use.',
      tokens: [
        { token: '--wp--preset--color--neon-green', value: '#39FF14', label: 'Neon Green' },
        { token: '--wp--preset--color--neon-pink', value: '#FF10F0', label: 'Neon Pink' },
        { token: '--wp--preset--color--neon-blue', value: '#1F51FF', label: 'Neon Blue' },
        { token: '--wp--preset--color--neon-yellow', value: '#FFFF00', label: 'Neon Yellow' },
        { token: '--wp--preset--color--neon-orange', value: '#FF5F1F', label: 'Neon Orange' },
        { token: '--wp--preset--color--neon-purple', value: '#BE00FE', label: 'Neon Purple' },
        { token: '--wp--preset--color--neon-cyan', value: '#00F7FF', label: 'Neon Cyan' },
        { token: '--wp--preset--color--neon-red', value: '#FF3131', label: 'Neon Red' },
      ],
    },
    {
      id: 'accessible-text',
      title: 'Accessible text colors',
      description: 'WCAG AA compliant darker variants for readability on white backgrounds.',
      tokens: [
        { token: '--wp--preset--color--neon-green-text', value: '#008f00', label: 'Green Text (5.2:1)' },
        { token: '--wp--preset--color--neon-pink-text', value: '#b300a4', label: 'Pink Text (5.8:1)' },
        { token: '--wp--preset--color--neon-blue-text', value: '#002db3', label: 'Blue Text (8.9:1)' },
        { token: '--wp--preset--color--neon-yellow-text', value: '#8a8a00', label: 'Yellow Text (4.6:1)' },
        { token: '--wp--preset--color--neon-orange-text', value: '#cc4100', label: 'Orange Text (5.1:1)' },
        { token: '--wp--preset--color--neon-purple-text', value: '#7800a1', label: 'Purple Text (6.4:1)' },
        { token: '--wp--preset--color--neon-cyan-text', value: '#00F7FF', label: 'Cyan Text (10.6:1 AAA)' },
        { token: '--wp--preset--color--neon-red-text', value: '#FF3131', label: 'Red Text (8.5:1 AAA)' },
      ],
    },
    {
      id: 'neutral-ramp',
      title: 'Neutral ramp',
      description: 'Grey scale from 50 (lightest) to Atomic Black.',
      tokens: [
        { token: '--wp--preset--color--neutral-50', value: '#f9fafb', label: 'Neutral 50' },
        { token: '--wp--preset--color--neutral-100', value: '#f3f4f6', label: 'Neutral 100' },
        { token: '--wp--preset--color--neutral-200', value: '#e5e7eb', label: 'Neutral 200' },
        { token: '--wp--preset--color--neutral-300', value: '#d1d5db', label: 'Neutral 300' },
        { token: '--wp--preset--color--neutral-400', value: '#9ca3af', label: 'Neutral 400' },
        { token: '--wp--preset--color--neutral-500', value: '#6b7280', label: 'Neutral 500' },
        { token: '--wp--preset--color--neutral-600', value: '#4b5563', label: 'Neutral 600' },
        { token: '--wp--preset--color--neutral-700', value: '#374151', label: 'Neutral 700' },
        { token: '--wp--preset--color--neutral-800', value: '#1f2937', label: 'Neutral 800' },
        { token: '--wp--preset--color--neutral-900', value: '#111827', label: 'Neutral 900' },
        { token: '--wp--preset--color--atomic-black', value: '#0F0F0F', label: 'Atomic Black' },
        { token: '--wp--preset--color--pure-black', value: '#000000', label: 'Pure Black' },
      ],
    },
    {
      id: 'semantic-roles',
      title: 'Semantic roles',
      description: 'Named semantic colour aliases for site-wide usage.',
      tokens: [
        { token: '--wp--preset--color--base', value: '#ffffff', label: 'Base (Background)' },
        { token: '--wp--preset--color--contrast', value: '#0F0F0F', label: 'Contrast (Text)' },
        { token: '--wp--preset--color--primary', value: 'neon-purple', label: 'Primary' },
        { token: '--wp--preset--color--brand', value: 'neon-pink', label: 'Brand' },
        { token: '--wp--preset--color--cta', value: 'neon-blue', label: 'CTA' },
      ],
    },
    {
      id: 'gradients',
      title: 'Gradient presets',
      description: '4 signature gradient presets used across the site.',
      tokens: [
        { token: '--wp--preset--gradient--cyberpunk', value: 'linear-gradient(135deg, #FF10F0, #1F51FF)', label: 'Cyberpunk' },
        { token: '--wp--preset--gradient--toxic-lime', value: 'linear-gradient(to right, #39FF14, #12FFF7)', label: 'Toxic Lime' },
        { token: '--wp--preset--gradient--solar-flare', value: 'linear-gradient(45deg, #FF5F1F, #FFFF00)', label: 'Solar Flare' },
        { token: '--wp--preset--gradient--hyperpop', value: 'linear-gradient(-45deg, #FF10F0, #1F51FF, #00F7FF, #39FF14)', label: 'Hyperpop' },
      ],
    },
    {
      id: 'typography',
      title: 'Typography',
      description: '3 font families and 11 fluid font-size tokens.',
      tokens: [
        { token: '--wp--preset--font-family--brand-title', value: 'Righteous, Arial Black, sans-serif', label: 'Title Font' },
        { token: '--wp--preset--font-family--brand-heading', value: 'Playfair Display, Times New Roman, serif', label: 'Heading Font' },
        { token: '--wp--preset--font-family--brand-body', value: 'Inter, -apple-system, sans-serif', label: 'Body Font' },
        { token: '--wp--preset--font-size--100', value: 'clamp(0.75rem, 0.65rem + 0.5vw, 0.875rem)', label: 'Size 100 (Caption)' },
        { token: '--wp--preset--font-size--200', value: 'clamp(1rem, 0.85rem + 0.75vw, 1.125rem)', label: 'Size 200 (Small)' },
        { token: '--wp--preset--font-size--300', value: 'clamp(1.125rem, 0.95rem + 0.875vw, 1.25rem)', label: 'Size 300 (Body)' },
        { token: '--wp--preset--font-size--400', value: 'clamp(1.25rem, 1rem + 1.25vw, 1.5rem)', label: 'Size 400 (Large)' },
        { token: '--wp--preset--font-size--500', value: 'clamp(1.5rem, 1.2rem + 1.5vw, 2rem)', label: 'Size 500 (H4)' },
        { token: '--wp--preset--font-size--600', value: 'clamp(1.875rem, 1.4rem + 2.375vw, 2.5rem)', label: 'Size 600 (H3)' },
        { token: '--wp--preset--font-size--700', value: 'clamp(2.25rem, 1.75rem + 2.5vw, 3rem)', label: 'Size 700 (H2)' },
        { token: '--wp--preset--font-size--800', value: 'clamp(2.5rem, 1.9rem + 3vw, 3.5rem)', label: 'Size 800 (H1)' },
        { token: '--wp--preset--font-size--900', value: 'clamp(3rem, 2.2rem + 4vw, 4.5rem)', label: 'Size 900 (Display)' },
        { token: '--wp--preset--font-size--hero', value: 'clamp(3.5rem, 6vw + 1rem, 6.5rem)', label: 'Hero' },
        { token: '--wp--preset--font-size--section', value: 'clamp(2rem, 3vw + 1rem, 3.5rem)', label: 'Section' },
      ],
    },
    {
      id: 'spacing',
      title: 'Spacing',
      description: 'Fluid spacing, section padding, block gap, and layout width tokens.',
      tokens: [
        { token: '--wp--preset--spacing--fluid-xs', value: 'clamp(0.5rem, 0.4rem + 0.5vw, 0.75rem)', label: 'Fluid XS' },
        { token: '--wp--preset--spacing--fluid-sm', value: 'clamp(0.75rem, 0.5rem + 1vw, 1.25rem)', label: 'Fluid SM' },
        { token: '--wp--preset--spacing--fluid-md', value: 'clamp(1rem, 0.6rem + 2vw, 2rem)', label: 'Fluid MD' },
        { token: '--wp--preset--spacing--fluid-lg', value: 'clamp(1.5rem, 1rem + 2.5vw, 3rem)', label: 'Fluid LG' },
        { token: '--wp--preset--spacing--fluid-xl', value: 'clamp(2rem, 1.2rem + 4vw, 4rem)', label: 'Fluid XL' },
        { token: '--wp--preset--spacing--fluid-2xl', value: 'clamp(3rem, 1.5rem + 7.5vw, 6rem)', label: 'Fluid 2XL' },
        { token: '--wp--preset--spacing--section-horizontal', value: 'clamp(1.5rem, 1.35rem + 0.714vw, 2rem)', label: 'Section Horizontal' },
        { token: '--wp--preset--spacing--section-vertical', value: 'clamp(2rem, 0.5rem + 4vw, 5rem)', label: 'Section Vertical' },
        { token: '--wp--preset--spacing--block-gap', value: 'Alias: fluid-md', label: 'Block Gap' },
      ],
    },
    {
      id: 'layout',
      title: 'Layout',
      description: 'Content width constraints.',
      tokens: [
        { token: '--wp--preset--layout--content', value: '800px', label: 'Content Width' },
        { token: '--wp--preset--layout--wide', value: '1440px', label: 'Wide Width' },
        { token: '--wp--preset--layout--full', value: '100%', label: 'Full Width' },
      ],
    },
    {
      id: 'border-radius',
      title: 'Border radius',
      description: '6 radius tokens from subtle to full pill.',
      tokens: [
        { token: '--wp--preset--border-radius--sm', value: '0.25rem', label: 'Small' },
        { token: '--wp--preset--border-radius--md', value: '0.5rem', label: 'Medium' },
        { token: '--wp--preset--border-radius--lg', value: '1rem', label: 'Large' },
        { token: '--wp--preset--border-radius--xl', value: '1.5rem', label: 'Extra Large' },
        { token: '--wp--preset--border-radius--2xl', value: '2rem', label: '2X Large' },
        { token: '--wp--preset--border-radius--full', value: '9999px', label: 'Full (Pill)' },
      ],
    },
    {
      id: 'shadows',
      title: 'Shadows',
      description: '21 shadow tokens covering elevation, neon glows, focus rings, and action buttons.',
      tokens: [
        { token: '--wp--preset--shadow--sm', value: '0 1px 2px rgba(0,0,0,0.05)', label: 'Small' },
        { token: '--wp--preset--shadow--md', value: '0 4px 6px rgba(0,0,0,0.07)', label: 'Medium' },
        { token: '--wp--preset--shadow--lg', value: '0 10px 15px rgba(0,0,0,0.1)', label: 'Large' },
        { token: '--wp--preset--shadow--xl', value: '0 20px 25px rgba(0,0,0,0.1)', label: 'Extra Large' },
        { token: '--wp--preset--shadow--2xl', value: '0 25px 50px rgba(0,0,0,0.25)', label: '2X Large' },
        { token: '--wp--preset--shadow--neon-sm', value: '0 0 5px neon-green 30%', label: 'Neon SM' },
        { token: '--wp--preset--shadow--neon-md', value: '0 0 10px+20px neon-green', label: 'Neon MD' },
        { token: '--wp--preset--shadow--neon-lg', value: '0 0 15px+30px neon-green', label: 'Neon LG' },
        { token: '--wp--preset--shadow--neon-pink', value: '0 0 20px neon-pink 40%', label: 'Neon Pink' },
        { token: '--wp--preset--shadow--neon-purple', value: '0 0 20px neon-purple 40%', label: 'Neon Purple' },
        { token: '--wp--preset--shadow--neon-blue', value: '0 0 20px neon-cyan 40%', label: 'Neon Blue' },
        { token: '--wp--preset--shadow--card', value: '0 4px 6px -1px rgba(0,0,0,0.1)', label: 'Card' },
        { token: '--wp--preset--shadow--card-hover', value: '0 10px 30px -5px rgba(0,0,0,0.2)', label: 'Card Hover' },
        { token: '--wp--preset--shadow--focus-ring', value: '0 0 0 3px purple 30%', label: 'Focus Ring' },
        { token: '--wp--preset--shadow--focus-ring-strong', value: '0 0 0 3px purple 50%', label: 'Focus Ring Strong' },
        { token: '--wp--preset--shadow--focus-ring-pink', value: '0 0 0 2px neon-pink', label: 'Focus Ring Pink' },
        { token: '--wp--preset--shadow--action-btn', value: '0 0 10px purple 20%', label: 'Action Button' },
        { token: '--wp--preset--shadow--action-btn-hover', value: '0 4px 16px purple 35%', label: 'Action Btn Hover' },
        { token: '--wp--preset--shadow--action-btn-glow', value: '0 0 24px purple 50%', label: 'Action Btn Glow' },
      ],
    },
    {
      id: 'z-index',
      title: 'Z-Index',
      description: 'Layering scale for stacking contexts.',
      tokens: [
        { token: '--wp--preset--z-index--n1', value: '-1', label: 'Behind' },
        { token: '--wp--preset--z-index--10', value: '10', label: 'Raised' },
        { token: '--wp--preset--z-index--header', value: '1000', label: 'Header' },
        { token: '--wp--preset--z-index--overlay', value: '2000', label: 'Overlay' },
        { token: '--wp--preset--z-index--modal', value: '3000', label: 'Modal' },
        { token: '--wp--preset--z-index--toast', value: '9999', label: 'Toast' },
      ],
    },
    {
      id: 'opacity',
      title: 'Opacity',
      description: 'Opacity utility tokens.',
      tokens: [
        { token: '--wp--preset--opacity--0', value: '0', label: 'Transparent' },
        { token: '--wp--preset--opacity--25', value: '0.25', label: '25%' },
        { token: '--wp--preset--opacity--50', value: '0.5', label: '50%' },
        { token: '--wp--preset--opacity--75', value: '0.75', label: '75%' },
        { token: '--wp--preset--opacity--100', value: '1', label: 'Opaque' },
      ],
    },
    {
      id: 'aspect-ratio',
      title: 'Aspect ratio',
      description: 'Preset aspect ratio tokens for media containers.',
      tokens: [
        { token: '--wp--preset--aspect-ratio--square', value: '1 / 1', label: 'Square' },
        { token: '--wp--preset--aspect-ratio--video', value: '16 / 9', label: 'Video' },
        { token: '--wp--preset--aspect-ratio--portrait', value: '3 / 4', label: 'Portrait' },
      ],
    },
    {
      id: 'animation',
      title: 'Animation timing',
      description: 'Duration and easing tokens for transitions.',
      tokens: [
        { token: '--wp--custom--animation--slow', value: '500ms', label: 'Slow' },
        { token: '--wp--custom--animation--fast', value: '200ms', label: 'Fast' },
        { token: '--wp--custom--ease--bounce', value: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)', label: 'Bounce Easing' },
      ],
    },
  ] as TokenSection[],
};