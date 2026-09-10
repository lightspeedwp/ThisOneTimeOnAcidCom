/**
 * @fileoverview SEO metadata for developer tools pages
 * SEO data for the 24 dev tools sub-pages under /dev-tools/
 * 
 * @module data/mock/seo/dev-tools
 * @version 1.0.0
 */

import type { SEOData } from '../../../utils/seo';

/**
 * Developer Tools SEO
 * SEO metadata for the dev tools hub and all 24 sub-tools
 */
export var devToolsSEO: Record<string, SEOData> = {
  hub: {
    title: 'Developer tools | Design system hub \u2014 Ash Shaw',
    description:
      '24 developer tools for inspecting the Ash Shaw portfolio design system \u2014 tokens, icons, components, accessibility, performance, and code quality.',
  },

  tokens: {
    title: 'Design tokens reference | Dev tools \u2014 Ash Shaw',
    description:
      'Browse every CSS custom property in the Neon vs Atomic Black design system \u2014 colours, spacing, typography, shadows, and border radius tokens.',
  },

  icons: {
    title: 'Icon library | Dev tools \u2014 Ash Shaw',
    description:
      'Search and preview every Phosphor icon used in the Ash Shaw portfolio. Copy import statements and see usage context for each icon.',
  },

  phosphorIcons: {
    title: 'Phosphor icons | Dev tools \u2014 Ash Shaw',
    description:
      'Browse all 92 Phosphor icons with 6 weight variants, WCAG accessibility badges, and category filtering. Complete icon reference for the design system.',
  },

  api: {
    title: 'Component API reference | Dev tools \u2014 Ash Shaw',
    description:
      'Full props documentation for every React component in the portfolio \u2014 types, defaults, required fields, and import statements.',
  },

  playground: {
    title: 'Design system playground | Dev tools \u2014 Ash Shaw',
    description:
      'Experiment with design tokens in real time. Adjust colours, spacing, typography, and shadows and see live component previews.',
  },

  codeQuality: {
    title: 'Code quality dashboard | Dev tools \u2014 Ash Shaw',
    description:
      'Live code quality metrics \u2014 DOM element count, CSS stats, dependency tree, lint results, and overall health score.',
  },

  deployment: {
    title: 'Deployment readiness | Dev tools \u2014 Ash Shaw',
    description:
      'Pre-launch audit with 26 automated checks across performance, accessibility, SEO, security, and PWA readiness.',
  },

  analytics: {
    title: 'Analytics dashboard | Dev tools \u2014 Ash Shaw',
    description:
      'Track page views, content engagement, popular posts, search queries, and visitor behaviour with live session data and trend charts.',
  },

  components: {
    title: 'Component showcase | Dev tools \u2014 Ash Shaw',
    description:
      'Live visual previews of every reusable UI component \u2014 Logo, SocialLinks, Breadcrumbs, ReadMore, Share, and ThemeToggle rendered in isolation.',
  },

  snippets: {
    title: 'Snippet generator | Dev tools \u2014 Ash Shaw',
    description:
      'Generate BEM-compliant CSS and JSX scaffolding for new components. Pick a template, name it, and copy ready-to-use code.',
  },

  docs: {
    title: 'Documentation generator | Dev tools \u2014 Ash Shaw',
    description:
      'Auto-generated markdown documentation for every public component \u2014 props, imports, descriptions, and usage notes ready to copy.',
  },

  visualRegression: {
    title: 'Visual regression tester | Dev tools \u2014 Ash Shaw',
    description:
      'Compare component rendering across themes, states, and viewport sizes using side-by-side or overlay comparison modes.',
  },

  integration: {
    title: 'Integration tester | Dev tools \u2014 Ash Shaw',
    description:
      'Run 25 automated checks across 6 test suites \u2014 navigation, theming, accessibility, analytics, performance, and PWA compliance.',
  },

  typography: {
    title: 'Typography specimens | Dev tools \u2014 Ash Shaw',
    description:
      'Preview the full typographic scale \u2014 fluid headings, body text, captions, and font pairings from the Neon vs Atomic Black system.',
  },

  colorPalettes: {
    title: 'Color palettes | Dev tools — Ash Shaw',
    description:
      'Explore 33 neon color palettes with light and dark mode contrast testing. View text samples, button examples, and interface design inspiration for each palette.',
  },

  spacing: {
    title: 'Spacing scale | Dev tools \u2014 Ash Shaw',
    description:
      'Visualise every spacing token in the fluid spacing system \u2014 from compact mobile gaps to expansive desktop section padding.',
  },

  shadows: {
    title: 'Shadow & glow scale | Dev tools \u2014 Ash Shaw',
    description:
      'Preview all shadow and neon glow effects \u2014 card hover shadows, button glows, and focus ring styles from the design system.',
  },

  radius: {
    title: 'Border radius specimens | Dev tools \u2014 Ash Shaw',
    description:
      'Visual reference for every border-radius token \u2014 from subtle rounded corners to fully circular elements.',
  },

  buttons: {
    title: 'Button variants | Dev tools \u2014 Ash Shaw',
    description:
      'Interactive showcase of every button style \u2014 neon primary, outline, ghost, and destructive variants in all sizes and states.',
  },

  cards: {
    title: 'Card interactions | Dev tools \u2014 Ash Shaw',
    description:
      'Preview card hover effects, neon border glows, and interactive states across portfolio, blog, and section card variants.',
  },

  neon: {
    title: 'Neon animations | Dev tools \u2014 Ash Shaw',
    description:
      'All 26 CSS keyframe animations demonstrated live \u2014 neon pulse, gradient shift, float, bounce, and reduced-motion alternatives.',
  },

  accessibility: {
    title: 'Accessibility tester | Dev tools \u2014 Ash Shaw',
    description:
      'Run live WCAG 2.1 AA accessibility audits \u2014 colour contrast, ARIA labels, keyboard navigation, heading hierarchy, and focus management.',
  },

  performance: {
    title: 'Performance tester | Dev tools \u2014 Ash Shaw',
    description:
      'Measure DOM size, render time, resource loading, and layout performance metrics against target thresholds.',
  },

  stickersDevTool: {
    title: 'Sticker designs | Dev tools \u2014 Ash Shaw',
    description:
      'Browse all 26 UV-reactive sticker designs from the design system \u2014 holographic vinyl art inspired by sacred geometry.',
  },

  styleGuideDevTool: {
    title: 'Style guide reference | Dev tools \u2014 Ash Shaw',
    description:
      'Complete design system reference \u2014 neon colours, typography, spacing, components, and interactive specimens in one comprehensive guide.',
  },

  contentSpecimensHub: {
    title: 'Content Specimens | Dev tools \u2014 Ash Shaw',
    description:
      'Visual reference for content-type styling — rich text elements, card variants, page layout wireframes, and content-type specific patterns across all 7 content types.',
  },

  richTextSpecimens: {
    title: 'Rich text specimens | Dev tools \u2014 Ash Shaw',
    description:
      'Every typography and layout element available inside post content bodies — blockquotes, pull quotes, galleries, tables, and more — for each content type.',
  },

  contentCards: {
    title: 'Content card gallery | Dev tools \u2014 Ash Shaw',
    description:
      '7 card variants for each content type — standard, featured, compact, minimal, editorial, overlay, and minimal-icon — with hover effects, neon accents, and theme previews.',
  },

  pageLayouts: {
    title: 'Page layout browser | Dev tools \u2014 Ash Shaw',
    description:
      'Miniature wireframe previews of every page template \u2014 click to inspect components, CSS files, and structural anatomy.',
  },

  cardShapesLab: {
    title: 'Card shapes lab | Dev tools \u2014 Ash Shaw',
    description:
      '11 unique card shapes \u2014 polaroid, hexagonal, glassmorphism, film strip, vinyl, neon sign, holographic, and more. Visual playground for comparing card designs.',
  },

  cardInteractionsLab: {
    title: 'Card interactions lab | Dev tools \u2014 Ash Shaw',
    description:
      '10 hover and click interaction specimens \u2014 flip, tilt parallax, blacklight reveal, glitch, magnetic pull, neon trace, and more.',
  },

  gridLayoutsLab: {
    title: 'Grid layouts lab | Dev tools \u2014 Ash Shaw',
    description:
      '6 grid layout specimens with switchable pagination \u2014 uniform, masonry, bento, carousel, featured hero, and category columns.',
  },

  detailTemplatesHub: {
    title: 'Detail page templates | Dev tools \u2014 Ash Shaw',
    description:
      '3 detail page concepts for each of 6 content types \u2014 current layout, full-screen lightbox, and art exhibition.',
  },

  detailTemplatesBlog: {
    title: 'Blog detail templates | Dev tools \u2014 Ash Shaw',
    description:
      'Compare 3 blog post layout concepts \u2014 current reading layout, full-screen lightbox, and art exhibition style.',
  },

  detailTemplatesPortfolio: {
    title: 'Portfolio detail templates | Dev tools \u2014 Ash Shaw',
    description:
      'Compare 3 portfolio entry layout concepts \u2014 current gallery layout, full-screen lightbox, and art exhibition style.',
  },

  detailTemplatesVideo: {
    title: 'Video detail templates | Dev tools \u2014 Ash Shaw',
    description:
      'Compare 3 video detail layout concepts \u2014 current player layout, full-screen lightbox, and art exhibition style.',
  },

  detailTemplatesPodcast: {
    title: 'Podcast detail templates | Dev tools \u2014 Ash Shaw',
    description:
      'Compare 3 podcast episode layout concepts \u2014 current audio layout, full-screen lightbox, and art exhibition style.',
  },

  detailTemplatesEvent: {
    title: 'Event detail templates | Dev tools \u2014 Ash Shaw',
    description:
      'Compare 3 event detail layout concepts \u2014 current info layout, full-screen lightbox, and art exhibition style.',
  },

  detailTemplatesEbook: {
    title: 'Ebook detail templates | Dev tools \u2014 Ash Shaw',
    description:
      'Compare 3 ebook chapter layout concepts \u2014 current reading layout, full-screen lightbox, and art exhibition style.',
  },
};