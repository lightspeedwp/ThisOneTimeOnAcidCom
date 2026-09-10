/**
 * @fileoverview Developer Tools landing page mock data
 * @module data/mock/ui/dev-tools
 * @version 10.0.0 — 33 sub-tools grouped into 5 categories (7 new content specimens added)
 */

import type { BreadcrumbItem } from '../../../components/ui/Breadcrumbs';

/** Single tool entry */
export interface DevTool {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: string;
  badge: string;
}

/** A named group of tools (tools stored as ID references) */
export interface DevToolCategory {
  id: string;
  title: string;
  description: string;
  accent: 'green' | 'blue' | 'orange' | 'pink' | 'cyan';
  tools: string[];
}

export var devToolsPageUI = {
  seo: {
    title: 'Developer tools | Ash Shaw',
  },
  hero: {
    badge: 'Internal Tools',
    title: 'Developer tools',
    subtitle: 'Design system inspection suite',
    description:
      'A collection of internal tools and references for developing and maintaining the Ash Shaw Makeup Portfolio. Browse design tokens, audit accessibility, measure performance, and explore every component in the design system.',
    primaryCTA: 'Browse tools',
    secondaryCTA: 'Design tokens',
  },
  breadcrumbs: [
    { label: 'Home', href: '/' },
    { label: 'Developer tools' },
  ] as BreadcrumbItem[],

  /** Flat list kept for backward-compat (routes, etc.) */
  tools: [
    {
      id: 'block-library',
      title: 'Global Block Library',
      description:
        'Comprehensive catalog of all foundational WordPress blocks and their variations across the design system.',
      href: '/dev-tools/block-library',
      icon: 'Blocks',
      badge: 'Design System',
    },
    {
      id: 'patterns',
      title: 'Patterns Library',
      description:
        'Pre-built WordPress block patterns combining multiple core blocks into reusable sections.',
      href: '/dev-tools/patterns',
      icon: 'SquaresFour',
      badge: 'Design System',
    },
    {
      id: 'google-fonts',
      title: 'Google Fonts',
      description:
        'Performance-optimized variable font loading strategies and fallback stacks.',
      href: '/dev-tools/google-fonts',
      icon: 'TextAa',
      badge: 'Typography',
    },
    {
      id: 'audio-concepts',
      title: 'Audio Concepts',
      description:
        'Explorations for podcast and audio player interfaces within the design system.',
      href: '/dev-tools/audio-concepts',
      icon: 'Headphones',
      badge: 'Media',
    },
    {
      id: 'style-guide',
      title: 'Style guide',
      description:
        'Comprehensive design-system reference — colours, typography, spacing tokens, gradients, and component previews all in one place.',
      href: '/dev-tools/style-guide',
      icon: 'Palette',
      badge: 'Design System',
    },
    {
      id: 'typography',
      title: 'Typography specimens',
      description:
        'Every font family, fluid font-size token, heading class, and weight variant rendered live with CSS variable names.',
      href: '/dev-tools/typography',
      icon: 'Type',
      badge: 'Typography',
    },
    {
      id: 'spacing',
      title: 'Spacing scale',
      description:
        'Visual bars for every spacing token — fluid, section, and block gap values with CSS clamp() definitions.',
      href: '/dev-tools/spacing',
      icon: 'Ruler',
      badge: 'Spacing',
    },
    {
      id: 'shadows',
      title: 'Shadow & Glow Scale',
      description:
        'Interactive preview of all shadow tokens — elevation shadows, neon glows, focus rings, and action button effects.',
      href: '/dev-tools/shadows',
      icon: 'Cloudy',
      badge: 'Shadows',
    },
    {
      id: 'radius',
      title: 'Border radius specimens',
      description:
        'Every border-radius token from subtle rounding to full pill shapes, with side-by-side comparison and legacy aliases.',
      href: '/dev-tools/radius',
      icon: 'Circle',
      badge: 'Radius',
    },
    {
      id: 'buttons',
      title: 'Button variants',
      description:
        'Primary gradients, ghost outlines, icon buttons, pill chips, and disabled states — hover and focus each to see interactions.',
      href: '/dev-tools/buttons',
      icon: 'MousePointerClick',
      badge: 'Buttons',
    },
    {
      id: 'cards',
      title: 'Card interactions',
      description:
        'Every card pattern — blog, video, podcast, tool, and tip cards with hover lift, neon border glow, and focus ring effects.',
      href: '/dev-tools/cards',
      icon: 'LayoutGrid',
      badge: 'Cards',
    },
    {
      id: 'neon',
      title: 'Neon animations',
      description:
        'All CSS keyframe animations — spin, pulse, bounce, float, neon glow, gradient shift, and more with interactive play/pause controls.',
      href: '/dev-tools/animations',
      icon: 'Zap',
      badge: 'Animations',
    },
    {
      id: 'color-palettes',
      title: 'Color palettes',
      description:
        'Neon color palette collection with light and dark mode contrast testing — view all palettes with text samples and button examples.',
      href: '/dev-tools/color-palettes',
      icon: 'Palette',
      badge: 'Colors',
    },
    {
      id: 'tokens',
      title: 'Design tokens reference',
      description:
        'Complete reference of every CSS custom property — colours, typography, spacing, shadows, radii, z-index, opacity, and more.',
      href: '/dev-tools/tokens',
      icon: 'Lightbulb',
      badge: 'Reference',
    },
    {
      id: 'icons',
      title: 'Icon library',
      description:
        'Searchable grid of every Phosphor icon used across the site, grouped by category with size toggle and copy-to-clipboard import statements.',
      href: '/dev-tools/icons',
      icon: 'Bookmark',
      badge: 'Reference',
    },
    {
      id: 'phosphor-icons',
      title: 'Phosphor icons',
      description:
        'Browse all 92 Phosphor icons with 6 weight variants and live WCAG accessibility badges. Complete icon reference for the design system.',
      href: '/dev-tools/phosphor-icons',
      icon: 'Sparkles',
      badge: 'Reference',
    },
    {
      id: 'api',
      title: 'Component API',
      description:
        'Props, interfaces, and import statements for every public React component — searchable with sidebar navigation.',
      href: '/dev-tools/api',
      icon: 'FileCode',
      badge: 'Reference',
    },
    {
      id: 'playground',
      title: 'Design system playground',
      description:
        'Interactive experimentation with design tokens — adjust colours, typography, radius, shadows, and gradients with live preview.',
      href: '/dev-tools/playground',
      icon: 'FlaskConical',
      badge: 'Interactive',
    },
    {
      id: 'code-quality',
      title: 'Code quality dashboard',
      description:
        'Code health metrics — live DOM complexity, CSS stats, component dependency tree, file sizes, and lint summary.',
      href: '/dev-tools/code-quality',
      icon: 'Activity',
      badge: 'Testing',
    },
    {
      id: 'deployment',
      title: 'Deployment readiness',
      description:
        'Pre-deployment validation — performance, accessibility, SEO, security, and code quality checks with overall score gauge.',
      href: '/dev-tools/deployment',
      icon: 'Rocket',
      badge: 'Deployment',
    },
    {
      id: 'analytics',
      title: 'Analytics dashboard',
      description:
        'Track page views, content engagement, popular posts, search queries, and visitor behaviour with live session data and trend charts.',
      href: '/dev-tools/analytics',
      icon: 'BarChart3',
      badge: 'Analytics',
    },
    {
      id: 'components',
      title: 'Component showcase',
      description:
        'Live visual previews of every reusable UI component — Logo, SocialLinks, Breadcrumbs, ReadMore, Share, and more rendered in isolation.',
      href: '/dev-tools/components',
      icon: 'Component',
      badge: 'Visual Preview',
    },
    {
      id: 'snippets',
      title: 'Snippet generator',
      description:
        'Generate BEM-compliant CSS and JSX scaffolding for new components. Pick a template, name it, and copy the output.',
      href: '/dev-tools/snippets',
      icon: 'Scissors',
      badge: 'Builder',
    },
    {
      id: 'docs',
      title: 'Documentation generator',
      description:
        'Auto-generated markdown documentation for every public component — props, imports, and descriptions ready to copy.',
      href: '/dev-tools/docs',
      icon: 'FileText',
      badge: 'Reference',
    },
    {
      id: 'visual-regression',
      title: 'Visual regression tester',
      description:
        'Side-by-side and overlay comparison of component rendering across themes, states, and viewport sizes.',
      href: '/dev-tools/visual-regression',
      icon: 'Eye',
      badge: 'Testing',
    },
    {
      id: 'integration',
      title: 'Integration tester',
      description:
        'Simulated user flow tests — navigation, theming, accessibility, analytics, performance, and PWA checks with live pass/fail results.',
      href: '/dev-tools/integration',
      icon: 'TestTube',
      badge: 'Testing',
    },
    {
      id: 'stickers',
      title: 'Sticker designs',
      description:
        'Browse the full library of hand-crafted neon sticker graphics used as decorative flourishes throughout the site.',
      href: '/stickers',
      icon: 'Sparkles',
      badge: 'Asset Library',
    },
    {
      id: 'accessibility',
      title: 'Accessibility tester',
      description:
        'Run a live WCAG 2.1 AA audit against the current page. Checks for missing alt text, heading hierarchy, ARIA labels, and more.',
      href: '/dev-tools/accessibility',
      icon: 'Shield',
      badge: 'WCAG Audit',
    },
    {
      id: 'performance',
      title: 'Performance tester',
      description:
        'Measure real-time performance metrics using the browser Performance API. View Core Web Vitals, resource breakdowns, and image audit.',
      href: '/dev-tools/performance',
      icon: 'Gauge',
      badge: 'Testing',
    },
    {
      id: 'rich-text-specimens',
      title: 'Rich text specimens',
      description:
        'Every typography and layout element available inside post content bodies — blockquotes, pull quotes, galleries, tables, and more — for each content type.',
      href: '/dev-tools/content-specimens/rich-text',
      icon: 'FileText',
      badge: 'Content',
    },
    {
      id: 'content-cards',
      title: 'Content card gallery',
      description:
        '7 card variants for each content type — standard, featured, compact, minimal, editorial, overlay, and minimal-icon — with hover effects, neon accents, and theme previews.',
      href: '/dev-tools/content-specimens/card-gallery',
      icon: 'LayoutGrid',
      badge: 'Content',
    },
    {
      id: 'page-layouts',
      title: 'Page layout browser',
      description:
        'Miniature wireframe previews of every page template — click to inspect components, CSS files, and structural anatomy.',
      href: '/dev-tools/content-specimens/page-layouts',
      icon: 'Browser',
      badge: 'Content',
    },
    {
      id: 'content-specimens',
      title: 'Content specimens overview',
      description:
        'Comprehensive overview of all content types and their styling patterns — headings, cards, layouts, and neon accent colors.',
      href: '/dev-tools/content-specimens/overview',
      icon: 'Article',
      badge: 'Content',
    },
    {
      id: 'blog-specimens',
      title: 'Blog specimens',
      description:
        'Blog-specific rich text elements, card variants, and layout patterns — all styled with neon pink accents.',
      href: '/dev-tools/blog-specimens',
      icon: 'Article',
      badge: 'Content',
    },
    {
      id: 'portfolio-specimens',
      title: 'Portfolio specimens',
      description:
        'Portfolio entry cards, gallery grids, and detail layouts — featuring neon green accent colors.',
      href: '/dev-tools/portfolio-specimens',
      icon: 'Images',
      badge: 'Content',
    },
    {
      id: 'video-specimens',
      title: 'Video specimens',
      description:
        'Video card layouts, thumbnail styles, and player controls — accented with neon blue.',
      href: '/dev-tools/video-specimens',
      icon: 'Video',
      badge: 'Content',
    },
    {
      id: 'podcast-specimens',
      title: 'Podcast specimens',
      description:
        'Podcast episode cards, series grids, and audio player patterns — styled with neon purple.',
      href: '/dev-tools/podcast-specimens',
      icon: 'Microphone',
      badge: 'Content',
    },
    {
      id: 'event-specimens',
      title: 'Event specimens',
      description:
        'Festival cards, event calendars, and countdown timers — featuring neon orange accents.',
      href: '/dev-tools/event-specimens',
      icon: 'CalendarDots',
      badge: 'Content',
    },
    {
      id: 'faq-specimens',
      title: 'FAQ specimens',
      description:
        'FAQ accordion patterns, question cards, and structured data previews — with neon cyan highlights.',
      href: '/dev-tools/faq-specimens',
      icon: 'Question',
      badge: 'Content',
    },
    {
      id: 'card-shapes',
      title: 'Card shapes',
      description:
        '11 card shape specimens \u2014 polaroid, hexagonal, glassmorphism, film strip, vinyl, neon sign, holographic, and more.',
      href: '/dev-tools/card-shapes-lab',
      icon: 'Cards',
      badge: 'Lab',
    },
    {
      id: 'card-interactions',
      title: 'Card interactions lab',
      description:
        '10 hover and click interaction specimens \u2014 flip, tilt parallax, blacklight reveal, glitch, magnetic pull, neon trace.',
      href: '/dev-tools/card-interactions-lab',
      icon: 'CursorClick',
      badge: 'Lab',
    },
    {
      id: 'grid-layouts',
      title: 'Grid layouts',
      description:
        '6 grid layout specimens with switchable pagination \u2014 uniform, masonry, bento, carousel, featured hero, category columns.',
      href: '/dev-tools/grid-layouts-lab',
      icon: 'GridFour',
      badge: 'Lab',
    },
    {
      id: 'detail-templates',
      title: 'Detail page templates',
      description:
        '3 detail page concepts for 6 content types \u2014 current layout, full-screen lightbox, and art exhibition.',
      href: '/dev-tools/detail-templates',
      icon: 'Browsers',
      badge: 'Lab',
    },
  ] as DevTool[],

  /* ─────────────────────────────────────
     Grouped categories for the hub layout
     ───────────────────────────────────── */
  categories: [
    {
      id: 'design-system',
      title: 'Design System',
      description:
        '7 visual specimens showcasing the complete design system — typography, spacing, shadows, radius, buttons, cards, and neon colors.',
      accent: 'green',
      tools: [
        'block-library',
        'patterns',
        'google-fonts',
        'audio-concepts',
        'typography',
        'spacing',
        'shadows',
        'radius',
        'buttons',
        'cards',
        'neon',
      ],
    },
    {
      id: 'specimens',
      title: 'Design specimens',
      description:
        'Visual references for every design token — typography, colour, spacing, shadows, radii, and interactive component specimens.',
      accent: 'green',
      tools: [
        'style-guide',
        'typography',
        'spacing',
        'shadows',
        'radius',
        'buttons',
        'cards',
        'neon',
      ],
    },
    {
      id: 'reference',
      title: 'Reference & Documentation',
      description:
        'Lookup tables, API docs, and asset catalogues for the complete design system.',
      accent: 'blue',
      tools: [
        'tokens',
        'icons',
        'phosphor-icons',
        'api',
        'components',
        'docs',
        'stickers',
      ],
    },
    {
      id: 'builders',
      title: 'Builders & Playground',
      description:
        'Interactive tools for prototyping, generating scaffolding, and monitoring content performance.',
      accent: 'orange',
      tools: [
        'playground',
        'snippets',
        'analytics',
      ],
    },
    {
      id: 'testing',
      title: 'Testing & Deployment',
      description:
        'Quality assurance, accessibility audits, performance measurement, and deployment readiness checks.',
      accent: 'pink',
      tools: [
        'code-quality',
        'visual-regression',
        'integration',
        'accessibility',
        'performance',
        'deployment',
      ],
    },
    {
      id: 'content-specimens',
      title: 'Content specimens',
      description:
        'Visual reference for content-type styling — rich text elements, card variants, and page layout wireframes across all content types.',
      accent: 'cyan',
      tools: [
        'content-specimens',
        'blog-specimens',
        'portfolio-specimens',
        'video-specimens',
        'podcast-specimens',
        'event-specimens',
        'faq-specimens',
        'rich-text-specimens',
        'content-cards',
        'page-layouts',
      ],
    },
    {
      id: 'card-layout-lab',
      title: 'Card & Layout Lab',
      description:
        'Visual playground for card shapes, hover interactions, grid layouts, and detail page templates \u2014 compare every option before committing to production.',
      accent: 'orange',
      tools: [
        'card-shapes',
        'card-interactions',
        'grid-layouts',
        'detail-templates',
      ],
    },
  ],
};