/**
 * @fileoverview Dev Tools Navigation Data Structure
 * 
 * Centralized navigation management for the entire dev tools section:
 * - Category sections with neon rainbow color assignments
 * - Individual page navigation with subsection anchors
 * - Breadcrumb trails
 * - Full-screen burger menu structure
 * - Anchored menu visibility per page
 * 
 * @version 1.0.0
 * @date March 7, 2026
 */

/** Neon rainbow color assignments for categories */
export type DevToolsAccent = 'green' | 'blue' | 'orange' | 'pink' | 'cyan' | 'purple';

/** Category section definition */
export interface DevToolsCategory {
  id: string;
  title: string;
  description: string;
  accent: DevToolsAccent;
  href: string; // Landing page for this category
  tools: string[]; // Array of tool IDs in this category
}

/** Subsection anchor for pages with multiple sections */
export interface PageSubsection {
  id: string;
  title: string;
  href: string; // Anchor link (e.g., "#overview")
}

/** Individual dev tool page configuration */
export interface DevToolPage {
  id: string;
  title: string;
  href: string;
  category: string; // Parent category ID
  accent: DevToolsAccent;
  hasSubsections: boolean; // Show anchored menu?
  subsections?: PageSubsection[]; // Anchored menu items
  breadcrumbs: BreadcrumbItem[];
}

/** Breadcrumb item */
export interface BreadcrumbItem {
  label: string;
  href?: string; // Undefined for current page
}

/** Neon color mapping */
export var NEON_COLORS: Record<DevToolsAccent, {
  hex: string;
  rgb: string;
  textLight: string; // Accessible for light mode
  textDark: string; // Full brightness for dark mode
}> = {
  green: {
    hex: '#39FF14',
    rgb: '57, 255, 20',
    textLight: '#2D8C10', // Darker green for light mode
    textDark: '#39FF14', // Neon green for dark mode
  },
  blue: {
    hex: '#1F51FF',
    rgb: '31, 81, 255',
    textLight: '#0D2CB5', // Darker blue for light mode
    textDark: '#1F51FF', // Royal blue for dark mode
  },
  orange: {
    hex: '#FF5F1F',
    rgb: '255, 95, 31',
    textLight: '#CC4000', // Darker orange for light mode
    textDark: '#FF5F1F', // Blazing orange for dark mode
  },
  pink: {
    hex: '#FF10F0',
    rgb: '255, 16, 240',
    textLight: '#B0009E', // Darker pink for light mode
    textDark: '#FF10F0', // Hot pink for dark mode
  },
  cyan: {
    hex: '#12FFF7',
    rgb: '18, 255, 247',
    textLight: '#008C87', // Darker cyan for light mode
    textDark: '#12FFF7', // Aqua cyan for dark mode
  },
  purple: {
    hex: '#BE00FE',
    rgb: '190, 0, 254',
    textLight: '#7A00A3', // Darker purple for light mode
    textDark: '#BE00FE', // Electric purple for dark mode
  },
};

/** Category sections (6 groups) */
export var DEV_TOOLS_CATEGORIES: DevToolsCategory[] = [
  {
    id: 'design-specimens',
    title: 'Design Specimens',
    description: 'Visual design system showcases',
    accent: 'green',
    href: '/dev-tools/design-system',
    tools: [
      'typography-specimens',
      'spacing-specimens',
      'shadow-specimens',
      'radius-specimens',
      'button-specimens',
      'card-specimens',
      'neon-specimens',
    ],
  },
  {
    id: 'reference-docs',
    title: 'Reference & Documentation',
    description: 'Design tokens, icons, and API references',
    accent: 'blue',
    href: '/dev-tools#category-reference-docs',
    tools: [
      'design-tokens',
      'icon-library',
      'phosphor-icons',
      'component-api',
      'color-palettes',
    ],
  },
  {
    id: 'builders-playground',
    title: 'Builders & Playground',
    description: 'Interactive tools and generators',
    accent: 'orange',
    href: '/dev-tools#category-builders-playground',
    tools: [
      'playground',
      'snippet-generator',
      'documentation-generator',
    ],
  },
  {
    id: 'testing-deployment',
    title: 'Testing & Deployment',
    description: 'Quality assurance and launch readiness',
    accent: 'pink',
    href: '/dev-tools#category-testing-deployment',
    tools: [
      'code-quality',
      'deployment-readiness',
      'visual-regression',
      'integration-tester',
      'accessibility-tester',
      'performance-tester',
    ],
  },
  {
    id: 'content-specimens',
    title: 'Content Specimens',
    description: 'Content type showcases',
    accent: 'cyan',
    href: '/dev-tools#category-content-specimens',
    tools: [
      'blog-specimens',
      'portfolio-specimens',
      'video-specimens',
      'podcast-specimens',
    ],
  },
  {
    id: 'card-layout-lab',
    title: 'Card & Layout Lab',
    description: 'Layout patterns and component showcases',
    accent: 'purple',
    href: '/dev-tools#category-card-layout-lab',
    tools: [
      'component-showcase',
      'analytics-dashboard',
    ],
  },
];

/** All dev tools pages with navigation configuration */
export var DEV_TOOLS_PAGES: Record<string, DevToolPage> = {
  // ═══════════════════════════════════════════════════════════════════
  // DESIGN SPECIMENS (Green)
  // ═══════════════════════════════════════════════════════════════════
  
  'typography-specimens': {
    id: 'typography-specimens',
    title: 'Typography Specimens',
    href: '/dev-tools/typography',
    category: 'design-specimens',
    accent: 'green',
    hasSubsections: true,
    subsections: [
      { id: 'overview', title: 'Overview', href: '#overview' },
      { id: 'font-families', title: 'Font Families', href: '#font-families' },
      { id: 'type-scale', title: 'Type Scale', href: '#type-scale' },
      { id: 'headings', title: 'Headings', href: '#headings' },
      { id: 'body-text', title: 'Body Text', href: '#body-text' },
    ],
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Dev Tools', href: '/dev-tools' },
      { label: 'Design System', href: '/dev-tools/design-system' },
      { label: 'Typography Specimens' },
    ],
  },

  'spacing-specimens': {
    id: 'spacing-specimens',
    title: 'Spacing Specimens',
    href: '/dev-tools/spacing',
    category: 'design-specimens',
    accent: 'green',
    hasSubsections: true,
    subsections: [
      { id: 'overview', title: 'Overview', href: '#overview' },
      { id: 'spacing-scale', title: 'Spacing Scale', href: '#spacing-scale' },
      { id: 'fluid-spacing', title: 'Fluid Spacing', href: '#fluid-spacing' },
      { id: 'section-spacing', title: 'Section Spacing', href: '#section-spacing' },
    ],
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Dev Tools', href: '/dev-tools' },
      { label: 'Design System', href: '/dev-tools/design-system' },
      { label: 'Spacing Specimens' },
    ],
  },

  'shadow-specimens': {
    id: 'shadow-specimens',
    title: 'Shadow Specimens',
    href: '/dev-tools/shadows',
    category: 'design-specimens',
    accent: 'green',
    hasSubsections: true,
    subsections: [
      { id: 'overview', title: 'Overview', href: '#overview' },
      { id: 'elevation-scale', title: 'Elevation Scale', href: '#elevation-scale' },
      { id: 'neon-glows', title: 'Neon Glows', href: '#neon-glows' },
    ],
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Dev Tools', href: '/dev-tools' },
      { label: 'Design System', href: '/dev-tools/design-system' },
      { label: 'Shadow Specimens' },
    ],
  },

  'radius-specimens': {
    id: 'radius-specimens',
    title: 'Border Radius Specimens',
    href: '/dev-tools/radius',
    category: 'design-specimens',
    accent: 'green',
    hasSubsections: true,
    subsections: [
      { id: 'overview', title: 'Overview', href: '#overview' },
      { id: 'radius-scale', title: 'Radius Scale', href: '#radius-scale' },
      { id: 'examples', title: 'Examples', href: '#examples' },
    ],
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Dev Tools', href: '/dev-tools' },
      { label: 'Design System', href: '/dev-tools/design-system' },
      { label: 'Border Radius Specimens' },
    ],
  },

  'button-specimens': {
    id: 'button-specimens',
    title: 'Button Specimens',
    href: '/dev-tools/buttons',
    category: 'design-specimens',
    accent: 'green',
    hasSubsections: true,
    subsections: [
      { id: 'overview', title: 'Overview', href: '#overview' },
      { id: 'variants', title: 'Variants', href: '#variants' },
      { id: 'states', title: 'States', href: '#states' },
      { id: 'sizes', title: 'Sizes', href: '#sizes' },
    ],
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Dev Tools', href: '/dev-tools' },
      { label: 'Design System', href: '/dev-tools/design-system' },
      { label: 'Button Specimens' },
    ],
  },

  'card-specimens': {
    id: 'card-specimens',
    title: 'Card Specimens',
    href: '/dev-tools/cards',
    category: 'design-specimens',
    accent: 'green',
    hasSubsections: true,
    subsections: [
      { id: 'overview', title: 'Overview', href: '#overview' },
      { id: 'variants', title: 'Variants', href: '#variants' },
      { id: 'layouts', title: 'Layouts', href: '#layouts' },
    ],
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Dev Tools', href: '/dev-tools' },
      { label: 'Design System', href: '/dev-tools/design-system' },
      { label: 'Card Specimens' },
    ],
  },

  'neon-specimens': {
    id: 'neon-specimens',
    title: 'Neon Color Specimens',
    href: '/dev-tools/animations',
    category: 'design-specimens',
    accent: 'green',
    hasSubsections: true,
    subsections: [
      { id: 'overview', title: 'Overview', href: '#overview' },
      { id: 'neon-colors', title: 'Neon Colors', href: '#neon-colors' },
      { id: 'gradients', title: 'Gradients', href: '#gradients' },
      { id: 'animations', title: 'Animations', href: '#animations' },
    ],
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Dev Tools', href: '/dev-tools' },
      { label: 'Design System', href: '/dev-tools/design-system' },
      { label: 'Neon Color Specimens' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════
  // REFERENCE & DOCUMENTATION (Blue)
  // ═══════════════════════════════════════════════════════════════════

  'design-tokens': {
    id: 'design-tokens',
    title: 'Design Tokens Reference',
    href: '/dev-tools/tokens',
    category: 'reference-docs',
    accent: 'blue',
    hasSubsections: true,
    subsections: [
      { id: 'overview', title: 'Overview', href: '#overview' },
      { id: 'colors', title: 'Colors', href: '#colors' },
      { id: 'typography', title: 'Typography', href: '#typography' },
      { id: 'spacing', title: 'Spacing', href: '#spacing' },
      { id: 'animations', title: 'Animations', href: '#animations' },
    ],
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Dev Tools', href: '/dev-tools' },
      { label: 'Design Tokens' },
    ],
  },

  'icon-library': {
    id: 'icon-library',
    title: 'Icon Library',
    href: '/dev-tools/icons',
    category: 'reference-docs',
    accent: 'blue',
    hasSubsections: true,
    subsections: [
      { id: 'overview', title: 'Overview', href: '#overview' },
      { id: 'categories', title: 'Categories', href: '#categories' },
      { id: 'usage', title: 'Usage', href: '#usage' },
    ],
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Dev Tools', href: '/dev-tools' },
      { label: 'Icon Library' },
    ],
  },

  'phosphor-icons': {
    id: 'phosphor-icons',
    title: 'Phosphor Icons Browser',
    href: '/dev-tools/phosphor-icons',
    category: 'reference-docs',
    accent: 'blue',
    hasSubsections: true,
    subsections: [
      { id: 'overview', title: 'Overview', href: '#overview' },
      { id: 'weights', title: 'Weights', href: '#weights' },
      { id: 'search', title: 'Search', href: '#search' },
    ],
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Dev Tools', href: '/dev-tools' },
      { label: 'Phosphor Icons' },
    ],
  },

  'component-api': {
    id: 'component-api',
    title: 'Component API Reference',
    href: '/dev-tools/api',
    category: 'reference-docs',
    accent: 'blue',
    hasSubsections: true,
    subsections: [
      { id: 'overview', title: 'Overview', href: '#overview' },
      { id: 'components', title: 'Components', href: '#components' },
      { id: 'props', title: 'Props', href: '#props' },
    ],
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Dev Tools', href: '/dev-tools' },
      { label: 'Component API' },
    ],
  },

  'color-palettes': {
    id: 'color-palettes',
    title: 'Color Palettes',
    href: '/dev-tools/color-palettes',
    category: 'reference-docs',
    accent: 'blue',
    hasSubsections: true,
    subsections: [
      { id: 'overview', title: 'Overview', href: '#overview' },
      { id: 'neon-colors', title: 'Neon Colors', href: '#neon-colors' },
      { id: 'gradients', title: 'Gradients', href: '#gradients' },
      { id: 'palettes', title: 'Palettes', href: '#palettes' },
    ],
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Dev Tools', href: '/dev-tools' },
      { label: 'Color Palettes' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════
  // BUILDERS & PLAYGROUND (Orange)
  // ═══════════════════════════════════════════════════════════════════

  'playground': {
    id: 'playground',
    title: 'Component Playground',
    href: '/dev-tools/playground',
    category: 'builders-playground',
    accent: 'orange',
    hasSubsections: false,
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Dev Tools', href: '/dev-tools' },
      { label: 'Playground' },
    ],
  },

  'snippet-generator': {
    id: 'snippet-generator',
    title: 'Code Snippet Generator',
    href: '/dev-tools/snippets',
    category: 'builders-playground',
    accent: 'orange',
    hasSubsections: false,
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Dev Tools', href: '/dev-tools' },
      { label: 'Snippet Generator' },
    ],
  },

  'documentation-generator': {
    id: 'documentation-generator',
    title: 'Documentation Generator',
    href: '/dev-tools/docs',
    category: 'builders-playground',
    accent: 'orange',
    hasSubsections: false,
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Dev Tools', href: '/dev-tools' },
      { label: 'Documentation Generator' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════
  // TESTING & DEPLOYMENT (Pink)
  // ═══════════════════════════════════════════════════════════════════

  'code-quality': {
    id: 'code-quality',
    title: 'Code Quality Monitor',
    href: '/dev-tools/code-quality',
    category: 'testing-deployment',
    accent: 'pink',
    hasSubsections: true,
    subsections: [
      { id: 'overview', title: 'Overview', href: '#overview' },
      { id: 'typescript', title: 'TypeScript', href: '#typescript' },
      { id: 'accessibility', title: 'Accessibility', href: '#accessibility' },
      { id: 'performance', title: 'Performance', href: '#performance' },
    ],
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Dev Tools', href: '/dev-tools' },
      { label: 'Code Quality' },
    ],
  },

  'deployment-readiness': {
    id: 'deployment-readiness',
    title: 'Deployment Readiness',
    href: '/dev-tools/deployment',
    category: 'testing-deployment',
    accent: 'pink',
    hasSubsections: true,
    subsections: [
      { id: 'overview', title: 'Overview', href: '#overview' },
      { id: 'build-check', title: 'Build Check', href: '#build-check' },
      { id: 'seo-audit', title: 'SEO Audit', href: '#seo-audit' },
      { id: 'lighthouse', title: 'Lighthouse', href: '#lighthouse' },
    ],
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Dev Tools', href: '/dev-tools' },
      { label: 'Deployment Readiness' },
    ],
  },

  'visual-regression': {
    id: 'visual-regression',
    title: 'Visual Regression Tester',
    href: '/dev-tools/visual-regression',
    category: 'testing-deployment',
    accent: 'pink',
    hasSubsections: false,
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Dev Tools', href: '/dev-tools' },
      { label: 'Visual Regression' },
    ],
  },

  'integration-tester': {
    id: 'integration-tester',
    title: 'Integration Tester',
    href: '/dev-tools/integration',
    category: 'testing-deployment',
    accent: 'pink',
    hasSubsections: false,
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Dev Tools', href: '/dev-tools' },
      { label: 'Integration Tester' },
    ],
  },

  'accessibility-tester': {
    id: 'accessibility-tester',
    title: 'Accessibility Tester',
    href: '/dev-tools/accessibility',
    category: 'testing-deployment',
    accent: 'pink',
    hasSubsections: true,
    subsections: [
      { id: 'overview', title: 'Overview', href: '#overview' },
      { id: 'color-contrast', title: 'Color Contrast', href: '#color-contrast' },
      { id: 'keyboard-nav', title: 'Keyboard Nav', href: '#keyboard-nav' },
      { id: 'screen-readers', title: 'Screen Readers', href: '#screen-readers' },
    ],
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Dev Tools', href: '/dev-tools' },
      { label: 'Accessibility Tester' },
    ],
  },

  'performance-tester': {
    id: 'performance-tester',
    title: 'Performance Tester',
    href: '/dev-tools/performance',
    category: 'testing-deployment',
    accent: 'pink',
    hasSubsections: true,
    subsections: [
      { id: 'overview', title: 'Overview', href: '#overview' },
      { id: 'core-vitals', title: 'Core Web Vitals', href: '#core-vitals' },
      { id: 'bundle-size', title: 'Bundle Size', href: '#bundle-size' },
    ],
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Dev Tools', href: '/dev-tools' },
      { label: 'Performance Tester' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════
  // CONTENT SPECIMENS (Cyan)
  // ═══════════════════════════════════════════════════════════════════

  'blog-specimens': {
    id: 'blog-specimens',
    title: 'Blog Post Specimens',
    href: '/dev-tools/blog-specimens',
    category: 'content-specimens',
    accent: 'cyan',
    hasSubsections: false,
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Dev Tools', href: '/dev-tools' },
      { label: 'Blog Specimens' },
    ],
  },

  'portfolio-specimens': {
    id: 'portfolio-specimens',
    title: 'Portfolio Entry Specimens',
    href: '/dev-tools/portfolio-specimens',
    category: 'content-specimens',
    accent: 'cyan',
    hasSubsections: false,
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Dev Tools', href: '/dev-tools' },
      { label: 'Portfolio Specimens' },
    ],
  },

  'video-specimens': {
    id: 'video-specimens',
    title: 'Video Specimens',
    href: '/dev-tools/video-specimens',
    category: 'content-specimens',
    accent: 'cyan',
    hasSubsections: false,
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Dev Tools', href: '/dev-tools' },
      { label: 'Video Specimens' },
    ],
  },

  'podcast-specimens': {
    id: 'podcast-specimens',
    title: 'Podcast Episode Specimens',
    href: '/dev-tools/podcast-specimens',
    category: 'content-specimens',
    accent: 'cyan',
    hasSubsections: false,
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Dev Tools', href: '/dev-tools' },
      { label: 'Podcast Specimens' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════
  // CARD & LAYOUT LAB (Purple)
  // ═══════════════════════════════════════════════════════════════════

  'component-showcase': {
    id: 'component-showcase',
    title: 'Component Showcase',
    href: '/dev-tools/components',
    category: 'card-layout-lab',
    accent: 'purple',
    hasSubsections: true,
    subsections: [
      { id: 'overview', title: 'Overview', href: '#overview' },
      { id: 'cards', title: 'Cards', href: '#cards' },
      { id: 'buttons', title: 'Buttons', href: '#buttons' },
      { id: 'forms', title: 'Forms', href: '#forms' },
    ],
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Dev Tools', href: '/dev-tools' },
      { label: 'Component Showcase' },
    ],
  },

  'analytics-dashboard': {
    id: 'analytics-dashboard',
    title: 'Analytics Dashboard',
    href: '/dev-tools/analytics',
    category: 'card-layout-lab',
    accent: 'purple',
    hasSubsections: true,
    subsections: [
      { id: 'overview', title: 'Overview', href: '#overview' },
      { id: 'page-views', title: 'Page Views', href: '#page-views' },
      { id: 'engagement', title: 'Engagement', href: '#engagement' },
    ],
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Dev Tools', href: '/dev-tools' },
      { label: 'Analytics Dashboard' },
    ],
  },
};

/** Full-screen burger menu structure */
export interface BurgerMenuItem {
  id: string;
  title: string;
  description?: string;
  href: string;
  accent: DevToolsAccent;
  children?: BurgerMenuItem[]; // Sub-items for categories
}

/** Burger menu data (organized by categories) */
export var BURGER_MENU_ITEMS: BurgerMenuItem[] = [
  {
    id: 'home',
    title: 'Back to Main Site',
    href: '/',
    accent: 'green',
  },
  {
    id: 'dev-tools-hub',
    title: 'Dev Tools Hub',
    href: '/dev-tools',
    accent: 'green',
  },
  {
    id: 'design-specimens',
    title: 'Design Specimens',
    description: 'Visual design system showcases',
    href: '/dev-tools/design-system',
    accent: 'green',
    children: [
      { id: 'typography-specimens', title: 'Typography Specimens', href: '/dev-tools/typography', accent: 'green' },
      { id: 'spacing-specimens', title: 'Spacing Specimens', href: '/dev-tools/spacing', accent: 'green' },
      { id: 'shadow-specimens', title: 'Shadow Specimens', href: '/dev-tools/shadows', accent: 'green' },
      { id: 'radius-specimens', title: 'Border Radius Specimens', href: '/dev-tools/radius', accent: 'green' },
      { id: 'button-specimens', title: 'Button Specimens', href: '/dev-tools/buttons', accent: 'green' },
      { id: 'card-specimens', title: 'Card Specimens', href: '/dev-tools/cards', accent: 'green' },
      { id: 'neon-specimens', title: 'Neon Color Specimens', href: '/dev-tools/animations', accent: 'green' },
    ],
  },
  {
    id: 'reference-docs',
    title: 'Reference & Documentation',
    description: 'Design tokens, icons, and API references',
    href: '/dev-tools#category-reference-docs',
    accent: 'blue',
    children: [
      { id: 'design-tokens', title: 'Design Tokens Reference', href: '/dev-tools/tokens', accent: 'blue' },
      { id: 'icon-library', title: 'Icon Library', href: '/dev-tools/icons', accent: 'blue' },
      { id: 'phosphor-icons', title: 'Phosphor Icons Browser', href: '/dev-tools/phosphor-icons', accent: 'blue' },
      { id: 'component-api', title: 'Component API Reference', href: '/dev-tools/api', accent: 'blue' },
      { id: 'color-palettes', title: 'Color Palettes', href: '/dev-tools/color-palettes', accent: 'blue' },
    ],
  },
  {
    id: 'builders-playground',
    title: 'Builders & Playground',
    description: 'Interactive tools and generators',
    href: '/dev-tools#category-builders-playground',
    accent: 'orange',
    children: [
      { id: 'playground', title: 'Component Playground', href: '/dev-tools/playground', accent: 'orange' },
      { id: 'snippet-generator', title: 'Code Snippet Generator', href: '/dev-tools/snippets', accent: 'orange' },
      { id: 'documentation-generator', title: 'Documentation Generator', href: '/dev-tools/docs', accent: 'orange' },
    ],
  },
  {
    id: 'testing-deployment',
    title: 'Testing & Deployment',
    description: 'Quality assurance and launch readiness',
    href: '/dev-tools#category-testing-deployment',
    accent: 'pink',
    children: [
      { id: 'code-quality', title: 'Code Quality Monitor', href: '/dev-tools/code-quality', accent: 'pink' },
      { id: 'deployment-readiness', title: 'Deployment Readiness', href: '/dev-tools/deployment', accent: 'pink' },
      { id: 'visual-regression', title: 'Visual Regression Tester', href: '/dev-tools/visual-regression', accent: 'pink' },
      { id: 'integration-tester', title: 'Integration Tester', href: '/dev-tools/integration', accent: 'pink' },
      { id: 'accessibility-tester', title: 'Accessibility Tester', href: '/dev-tools/accessibility', accent: 'pink' },
      { id: 'performance-tester', title: 'Performance Tester', href: '/dev-tools/performance', accent: 'pink' },
    ],
  },
  {
    id: 'content-specimens',
    title: 'Content Specimens',
    description: 'Content type showcases',
    href: '/dev-tools#category-content-specimens',
    accent: 'cyan',
    children: [
      { id: 'blog-specimens', title: 'Blog Post Specimens', href: '/dev-tools/blog-specimens', accent: 'cyan' },
      { id: 'portfolio-specimens', title: 'Portfolio Entry Specimens', href: '/dev-tools/portfolio-specimens', accent: 'cyan' },
      { id: 'video-specimens', title: 'Video Specimens', href: '/dev-tools/video-specimens', accent: 'cyan' },
      { id: 'podcast-specimens', title: 'Podcast Episode Specimens', href: '/dev-tools/podcast-specimens', accent: 'cyan' },
    ],
  },
  {
    id: 'card-layout-lab',
    title: 'Card & Layout Lab',
    description: 'Layout patterns and component showcases',
    href: '/dev-tools#category-card-layout-lab',
    accent: 'purple',
    children: [
      { id: 'component-showcase', title: 'Component Showcase', href: '/dev-tools/components', accent: 'purple' },
      { id: 'analytics-dashboard', title: 'Analytics Dashboard', href: '/dev-tools/analytics', accent: 'purple' },
    ],
  },
];

/** Helper: Safe property read from DEV_TOOLS_PAGES */
function getPage(toolId: string): DevToolPage | undefined {
  var entries = Object.entries(DEV_TOOLS_PAGES);
  for (var k = 0; k < entries.length; k++) {
    if (entries[k][0] === toolId) return entries[k][1];
  }
  return undefined;
}

/** Helper: Get page navigation config by route */
export function getPageNavigation(pageId: string): DevToolPage | undefined {
  return getPage(pageId);
}

/** Helper: Get category by ID */
export function getCategoryById(categoryId: string): DevToolsCategory | undefined {
  for (var i = 0; i < DEV_TOOLS_CATEGORIES.length; i++) {
    if (DEV_TOOLS_CATEGORIES[i].id === categoryId) {
      return DEV_TOOLS_CATEGORIES[i];
    }
  }
  return undefined;
}

/** Helper: Get neon color by accent */
export function getNeonColor(accent: DevToolsAccent): typeof NEON_COLORS[DevToolsAccent] {
  var entries = Object.entries(NEON_COLORS);
  for (var k = 0; k < entries.length; k++) {
    if (entries[k][0] === accent) return entries[k][1] as typeof NEON_COLORS[DevToolsAccent];
  }
  return NEON_COLORS.green;
}

/** Helper: Get total count of dev tools */
export function getDevToolsCount(): number {
  return Object.keys(DEV_TOOLS_PAGES).length;
}

/** Legacy export for backward compatibility with existing components */
export var devToolsNavigation: any[] = [];
for (var i = 0; i < DEV_TOOLS_CATEGORIES.length; i++) {
  var category = DEV_TOOLS_CATEGORIES[i];
  var categoryItems = [];
  for (var j = 0; j < category.tools.length; j++) {
    var toolId = category.tools[j];
    var page = getPage(toolId);
    if (page) {
      categoryItems.push({
        id: page.id,
        title: page.title,
        href: page.href,
      });
    }
  }
  
  devToolsNavigation.push({
    id: category.id,
    title: category.title,
    accent: category.accent,
    items: categoryItems
  });
}