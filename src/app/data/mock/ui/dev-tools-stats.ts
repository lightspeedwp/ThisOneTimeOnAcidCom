/**
 * @fileoverview Dev Tools Stats System
 * 
 * Centralized stats and metrics for all dev tools pages.
 * Powers the universal stats bars that appear below hero sections.
 * 
 * @version 1.0.0
 */

export interface DevToolStat {
  id: string;
  label: string;
  value: string | number;
  unit?: string;
  icon?: string;
  trend?: 'up' | 'down' | 'neutral';
  changePercent?: number;
  description?: string;
}

export interface DevToolStatsConfig {
  pageId: string;
  stats: DevToolStat[];
  lastUpdated?: string;
}

/**
 * Stats for Design Specimens Category
 */

export const typographyStats: DevToolStatsConfig = {
  pageId: 'typography-specimens',
  stats: [
    {
      id: 'font-families',
      label: 'Font families',
      value: 4,
      icon: 'TextAa',
      description: 'Total typefaces in design system'
    },
    {
      id: 'font-weights',
      label: 'Font weights',
      value: 12,
      icon: 'TextT',
      description: 'Available weight variants'
    },
    {
      id: 'type-scale',
      label: 'Type scale levels',
      value: 8,
      icon: 'Ladder',
      description: 'Fluid typography scale steps'
    },
    {
      id: 'line-heights',
      label: 'Line heights',
      value: 5,
      icon: 'ArrowsOutLineVertical',
      description: 'Defined leading values'
    }
  ]
};

export const spacingStats: DevToolStatsConfig = {
  pageId: 'spacing-specimens',
  stats: [
    {
      id: 'spacing-tokens',
      label: 'Spacing tokens',
      value: 24,
      icon: 'Grid',
      description: 'Base spacing scale values'
    },
    {
      id: 'layout-patterns',
      label: 'Layout patterns',
      value: 12,
      icon: 'SquaresFour',
      description: 'Common spacing compositions'
    },
    {
      id: 'responsive-breaks',
      label: 'Breakpoints',
      value: 10,
      icon: 'DeviceMobile',
      description: 'Responsive design breakpoints'
    },
    {
      id: 'container-widths',
      label: 'Container widths',
      value: 7,
      icon: 'Rectangle',
      description: 'Max-width constraints'
    }
  ]
};

export const shadowsStats: DevToolStatsConfig = {
  pageId: 'shadows-specimens',
  stats: [
    {
      id: 'shadow-levels',
      label: 'Shadow levels',
      value: 6,
      icon: 'Drop',
      description: 'Elevation depth variants'
    },
    {
      id: 'glow-effects',
      label: 'Glow effects',
      value: 8,
      icon: 'Sparkle',
      description: 'Neon glow variations'
    },
    {
      id: 'text-shadows',
      label: 'Text shadows',
      value: 4,
      icon: 'TextT',
      description: 'Typography shadow styles'
    },
    {
      id: 'inner-shadows',
      label: 'Inner shadows',
      value: 3,
      icon: 'Circle',
      description: 'Inset shadow effects'
    }
  ]
};

export const radiusStats: DevToolStatsConfig = {
  pageId: 'radius-specimens',
  stats: [
    {
      id: 'radius-tokens',
      label: 'Radius tokens',
      value: 8,
      icon: 'CornersOut',
      description: 'Border radius values'
    },
    {
      id: 'corner-styles',
      label: 'Corner styles',
      value: 5,
      icon: 'Square',
      description: 'Unique corner treatments'
    },
    {
      id: 'pill-shapes',
      label: 'Pill shapes',
      value: 3,
      icon: 'Pill',
      description: 'Full-rounded variations'
    },
    {
      id: 'custom-paths',
      label: 'Custom paths',
      value: 4,
      icon: 'Path',
      description: 'Unique border shapes'
    }
  ]
};

export const buttonsStats: DevToolStatsConfig = {
  pageId: 'buttons-specimens',
  stats: [
    {
      id: 'button-variants',
      label: 'Button variants',
      value: 8,
      icon: 'CursorClick',
      description: 'Primary, secondary, ghost, etc.'
    },
    {
      id: 'button-sizes',
      label: 'Button sizes',
      value: 4,
      icon: 'Resize',
      description: 'Small, medium, large, XL'
    },
    {
      id: 'icon-buttons',
      label: 'Icon buttons',
      value: 6,
      icon: 'IconButton',
      description: 'Icon-only variations'
    },
    {
      id: 'button-states',
      label: 'Button states',
      value: 5,
      icon: 'CheckCircle',
      description: 'Hover, active, disabled, loading'
    }
  ]
};

export const cardsStats: DevToolStatsConfig = {
  pageId: 'cards-specimens',
  stats: [
    {
      id: 'card-types',
      label: 'Card types',
      value: 12,
      icon: 'Cards',
      description: 'Portfolio, blog, video, etc.'
    },
    {
      id: 'card-layouts',
      label: 'Card layouts',
      value: 6,
      icon: 'Layout',
      description: 'Horizontal, vertical, grid'
    },
    {
      id: 'card-styles',
      label: 'Card styles',
      value: 5,
      icon: 'PaintBrush',
      description: 'Elevated, flat, bordered'
    },
    {
      id: 'interactive-states',
      label: 'Interactive states',
      value: 4,
      icon: 'Hand',
      description: 'Hover, active, selected'
    }
  ]
};

export const neonStats: DevToolStatsConfig = {
  pageId: 'neon-specimens',
  stats: [
    {
      id: 'neon-colors',
      label: 'Neon colors',
      value: 8,
      icon: 'Palette',
      description: 'Primary neon palette'
    },
    {
      id: 'gradients',
      label: 'Gradients',
      value: 4,
      icon: 'CircleHalf',
      description: 'Signature gradient combos'
    },
    {
      id: 'animations',
      label: 'Animations',
      value: 26,
      icon: 'Lightning',
      description: 'Neon pulse, glow, shift'
    },
    {
      id: 'color-palettes',
      label: 'Color palettes',
      value: 33,
      icon: 'Swatches',
      description: 'Curated neon combinations'
    }
  ]
};

/**
 * Stats for Tools Category
 */

export const tokensStats: DevToolStatsConfig = {
  pageId: 'design-tokens-ref',
  stats: [
    {
      id: 'total-tokens',
      label: 'Design tokens',
      value: 247,
      icon: 'Cube',
      description: 'Total design system tokens'
    },
    {
      id: 'color-tokens',
      label: 'Color tokens',
      value: 89,
      icon: 'Palette',
      description: 'Color system variables'
    },
    {
      id: 'spacing-tokens',
      label: 'Spacing tokens',
      value: 24,
      icon: 'Grid',
      description: 'Layout spacing scale'
    },
    {
      id: 'typography-tokens',
      label: 'Typography tokens',
      value: 42,
      icon: 'TextAa',
      description: 'Font and text styles'
    }
  ]
};

export const iconsStats: DevToolStatsConfig = {
  pageId: 'icon-library',
  stats: [
    {
      id: 'total-icons',
      label: 'Icons used',
      value: 156,
      icon: 'Cube',
      description: 'Phosphor icons in project'
    },
    {
      id: 'icon-weights',
      label: 'Weight variants',
      value: 6,
      icon: 'Weight',
      description: 'Thin to bold variations'
    },
    {
      id: 'icon-categories',
      label: 'Categories',
      value: 12,
      icon: 'FolderOpen',
      description: 'Organized icon groups'
    },
    {
      id: 'custom-icons',
      label: 'Custom icons',
      value: 8,
      icon: 'Star',
      description: 'Brand-specific icons'
    }
  ]
};

export const phosphorStats: DevToolStatsConfig = {
  pageId: 'phosphor-icons',
  stats: [
    {
      id: 'phosphor-total',
      label: 'Phosphor library',
      value: '7,000+',
      icon: 'Cube',
      description: 'Total available icons'
    },
    {
      id: 'phosphor-weights',
      label: 'Weight styles',
      value: 6,
      icon: 'TextT',
      description: 'Thin, light, regular, bold, fill, duotone'
    },
    {
      id: 'searchable',
      label: 'Searchable',
      value: 'Yes',
      icon: 'MagnifyingGlass',
      description: 'Real-time icon search'
    },
    {
      id: 'copy-code',
      label: 'Copy code',
      value: 'One-click',
      icon: 'Copy',
      description: 'Instant React import'
    }
  ]
};

// Alias for backward compatibility
export const phosphorIconsStats = phosphorStats;

export const colorPalettesStats: DevToolStatsConfig = {
  pageId: 'color-palettes',
  stats: [
    {
      id: 'total-palettes',
      label: 'Color palettes',
      value: 33,
      icon: 'Palette',
      description: 'Curated neon combinations'
    },
    {
      id: 'neon-colors',
      label: 'Neon colors',
      value: 8,
      icon: 'Sparkle',
      description: 'Primary neon palette'
    },
    {
      id: 'interface-demos',
      label: 'Interface demos',
      value: 12,
      icon: 'Layout',
      description: 'UI component examples'
    },
    {
      id: 'theme-modes',
      label: 'Theme modes',
      value: 2,
      icon: 'Moon',
      description: 'Light and dark previews'
    }
  ]
};

export const apiStats: DevToolStatsConfig = {
  pageId: 'component-api',
  stats: [
    {
      id: 'components',
      label: 'Components',
      value: 87,
      icon: 'Stack',
      description: 'Total React components'
    },
    {
      id: 'props',
      label: 'Props documented',
      value: 342,
      icon: 'ListChecks',
      description: 'Component API properties'
    },
    {
      id: 'type-safe',
      label: 'Type safety',
      value: '100%',
      icon: 'ShieldCheck',
      description: 'TypeScript coverage'
    },
    {
      id: 'examples',
      label: 'Code examples',
      value: 156,
      icon: 'Code',
      description: 'Usage demonstrations'
    }
  ]
};

// Alias for backward compatibility
export const componentApiStats = apiStats;

export const playgroundStats: DevToolStatsConfig = {
  pageId: 'playground',
  stats: [
    {
      id: 'interactive-demos',
      label: 'Interactive demos',
      value: 35,
      icon: 'Play',
      description: 'Live component previews'
    },
    {
      id: 'code-snippets',
      label: 'Code snippets',
      value: 89,
      icon: 'Code',
      description: 'Copy-paste examples'
    },
    {
      id: 'customizable',
      label: 'Customizable',
      value: 'Yes',
      icon: 'Sliders',
      description: 'Adjust props in real-time'
    },
    {
      id: 'responsive-preview',
      label: 'Responsive',
      value: 'Yes',
      icon: 'DeviceMobile',
      description: 'Mobile, tablet, desktop'
    }
  ]
};

export const codeQualityStats: DevToolStatsConfig = {
  pageId: 'code-quality',
  stats: [
    {
      id: 'quality-score',
      label: 'Quality score',
      value: 98,
      unit: '/100',
      icon: 'Trophy',
      trend: 'up',
      changePercent: 3,
      description: 'Overall code quality rating'
    },
    {
      id: 'type-coverage',
      label: 'TypeScript',
      value: 100,
      unit: '%',
      icon: 'ShieldCheck',
      description: 'Type safety coverage'
    },
    {
      id: 'accessibility',
      label: 'Accessibility',
      value: 100,
      unit: '%',
      icon: 'User',
      description: 'WCAG 2.1 AA compliance'
    },
    {
      id: 'bundle-size',
      label: 'Bundle size',
      value: '247kb',
      icon: 'Package',
      trend: 'down',
      changePercent: 12,
      description: 'Optimized production build'
    }
  ]
};

export const deploymentStats: DevToolStatsConfig = {
  pageId: 'deployment-readiness',
  stats: [
    {
      id: 'build-status',
      label: 'Build status',
      value: 'Ready',
      icon: 'CheckCircle',
      description: 'Production build passing'
    },
    {
      id: 'lighthouse',
      label: 'Lighthouse',
      value: 97,
      unit: '/100',
      icon: 'Lightbulb',
      description: 'Performance score'
    },
    {
      id: 'seo-score',
      label: 'SEO',
      value: 100,
      unit: '/100',
      icon: 'MagnifyingGlass',
      description: 'Search optimization'
    },
    {
      id: 'security',
      label: 'Security',
      value: 'A+',
      icon: 'Lock',
      description: 'Security headers configured'
    }
  ]
};

export const analyticsStats: DevToolStatsConfig = {
  pageId: 'analytics-dashboard',
  stats: [
    {
      id: 'page-views',
      label: 'Page views',
      value: '12,847',
      icon: 'Eye',
      trend: 'up',
      changePercent: 23,
      description: 'Total views (localStorage)'
    },
    {
      id: 'unique-visits',
      label: 'Unique visits',
      value: '4,231',
      icon: 'Users',
      trend: 'up',
      changePercent: 18,
      description: 'Unique visitors tracked'
    },
    {
      id: 'avg-session',
      label: 'Avg session',
      value: '4m 32s',
      icon: 'Clock',
      description: 'Average time on site'
    },
    {
      id: 'bounce-rate',
      label: 'Bounce rate',
      value: 18,
      unit: '%',
      icon: 'ArrowBendUpLeft',
      trend: 'down',
      changePercent: 5,
      description: 'Single-page sessions'
    }
  ]
};

export const componentsStats: DevToolStatsConfig = {
  pageId: 'component-showcase',
  stats: [
    {
      id: 'total-components',
      label: 'Components',
      value: 87,
      icon: 'Stack',
      description: 'Total React components'
    },
    {
      id: 'page-components',
      label: 'Pages',
      value: 79,
      icon: 'File',
      description: 'Page-level components'
    },
    {
      id: 'ui-components',
      label: 'UI elements',
      value: 45,
      icon: 'Grid',
      description: 'Reusable UI components'
    },
    {
      id: 'layout-components',
      label: 'Layout',
      value: 12,
      icon: 'Layout',
      description: 'Layout and structure'
    }
  ]
};

// Alias for backward compatibility
export const componentShowcaseStats = componentsStats;

export const snippetsStats: DevToolStatsConfig = {
  pageId: 'snippet-generator',
  stats: [
    {
      id: 'snippet-types',
      label: 'Snippet types',
      value: 24,
      icon: 'Code',
      description: 'Categories of code snippets'
    },
    {
      id: 'total-snippets',
      label: 'Total snippets',
      value: 156,
      icon: 'FileDashed',
      description: 'Ready-to-use code blocks'
    },
    {
      id: 'copy-count',
      label: 'Copied today',
      value: 47,
      icon: 'Copy',
      description: 'Snippets copied (session)'
    },
    {
      id: 'languages',
      label: 'Languages',
      value: 5,
      icon: 'Translate',
      description: 'TSX, CSS, JSON, MD, YAML'
    }
  ]
};

export const docsStats: DevToolStatsConfig = {
  pageId: 'documentation-generator',
  stats: [
    {
      id: 'doc-pages',
      label: 'Doc pages',
      value: 142,
      icon: 'FileText',
      description: 'Documentation files'
    },
    {
      id: 'auto-generated',
      label: 'Auto-generated',
      value: 89,
      icon: 'Lightning',
      description: 'Generated from code'
    },
    {
      id: 'search-indexed',
      label: 'Searchable',
      value: '100%',
      icon: 'MagnifyingGlass',
      description: 'Full-text search indexed'
    },
    {
      id: 'last-build',
      label: 'Last build',
      value: '2m ago',
      icon: 'Clock',
      description: 'Documentation freshness'
    }
  ]
};

export const visualRegressionStats: DevToolStatsConfig = {
  pageId: 'visual-regression-tester',
  stats: [
    {
      id: 'snapshots',
      label: 'Snapshots',
      value: 247,
      icon: 'Camera',
      description: 'Visual test snapshots'
    },
    {
      id: 'test-coverage',
      label: 'Coverage',
      value: 94,
      unit: '%',
      icon: 'ShieldCheck',
      description: 'Component coverage'
    },
    {
      id: 'pass-rate',
      label: 'Pass rate',
      value: 100,
      unit: '%',
      icon: 'CheckCircle',
      trend: 'neutral',
      description: 'Tests passing'
    },
    {
      id: 'diff-tolerance',
      label: 'Tolerance',
      value: '0.1%',
      icon: 'Target',
      description: 'Pixel difference threshold'
    }
  ]
};

export const integrationStats: DevToolStatsConfig = {
  pageId: 'integration-tester',
  stats: [
    {
      id: 'integration-tests',
      label: 'Integration tests',
      value: 89,
      icon: 'TestTube',
      description: 'End-to-end tests'
    },
    {
      id: 'api-tests',
      label: 'API tests',
      value: 34,
      icon: 'CloudArrowUp',
      description: 'API endpoint tests'
    },
    {
      id: 'user-flows',
      label: 'User flows',
      value: 12,
      icon: 'Path',
      description: 'Critical user journeys'
    },
    {
      id: 'test-runtime',
      label: 'Runtime',
      value: '4m 23s',
      icon: 'Clock',
      description: 'Total test execution time'
    }
  ]
};

export const accessibilityStats: DevToolStatsConfig = {
  pageId: 'accessibility-tester',
  stats: [
    {
      id: 'wcag-compliance',
      label: 'WCAG 2.1 AA',
      value: '100%',
      icon: 'ShieldCheck',
      description: 'Accessibility compliance'
    },
    {
      id: 'aria-labels',
      label: 'ARIA labels',
      value: 234,
      icon: 'Tag',
      description: 'Semantic labels applied'
    },
    {
      id: 'keyboard-nav',
      label: 'Keyboard nav',
      value: 'Full',
      icon: 'Keyboard',
      description: 'Complete keyboard support'
    },
    {
      id: 'screen-reader',
      label: 'Screen reader',
      value: 'Tested',
      icon: 'SpeakerHigh',
      description: 'NVDA & JAWS compatible'
    }
  ]
};

export const performanceStats: DevToolStatsConfig = {
  pageId: 'performance-tester',
  stats: [
    {
      id: 'lighthouse-perf',
      label: 'Lighthouse',
      value: 97,
      unit: '/100',
      icon: 'Lightning',
      description: 'Performance score'
    },
    {
      id: 'fcp',
      label: 'FCP',
      value: '1.2s',
      icon: 'Timer',
      description: 'First Contentful Paint'
    },
    {
      id: 'lcp',
      label: 'LCP',
      value: '1.8s',
      icon: 'Image',
      description: 'Largest Contentful Paint'
    },
    {
      id: 'cls',
      label: 'CLS',
      value: 0.02,
      icon: 'Layout',
      description: 'Cumulative Layout Shift'
    }
  ]
};

export const contentSpecimensHubStats: DevToolStatsConfig = {
  pageId: 'content-specimens',
  stats: [
    { id: 'content-types', label: 'Content types', value: 7, icon: 'Stack', description: 'Core data types' },
    { id: 'templates', label: 'Templates', value: 22, icon: 'Layout', description: 'Page layouts' },
    { id: 'cards', label: 'Cards', value: 42, icon: 'Cards', description: 'Card variants' },
    { id: 'blocks', label: 'Blocks', value: 18, icon: 'Cube', description: 'Content blocks' }
  ]
};

export const contentSpecimensOverviewStats: DevToolStatsConfig = {
  pageId: 'content-specimens-overview',
  stats: [
    { id: 'total-entries', label: 'Mock entries', value: 156, icon: 'Database', description: 'Total mock data items' },
    { id: 'taxonomies', label: 'Taxonomies', value: 12, icon: 'FolderOpen', description: 'Categories & tags' },
    { id: 'relations', label: 'Relations', value: 34, icon: 'Globe', description: 'Cross-linked content' },
    { id: 'assets', label: 'Assets', value: 89, icon: 'Image', description: 'Media references' }
  ]
};

export const richTextSpecimensStats: DevToolStatsConfig = {
  pageId: 'rich-text-specimens',
  stats: [
    { id: 'typography', label: 'Typography', value: 14, icon: 'TextAa', description: 'Text elements' },
    { id: 'lists', label: 'Lists', value: 3, icon: 'ListChecks', description: 'List variants' },
    { id: 'media', label: 'Media', value: 5, icon: 'Image', description: 'Embeds & galleries' },
    { id: 'tables', label: 'Tables', value: 2, icon: 'GridFour', description: 'Data tables' }
  ]
};

export const contentCardSpecimensStats: DevToolStatsConfig = {
  pageId: 'content-card-specimens',
  stats: [
    { id: 'card-styles', label: 'Styles', value: 7, icon: 'Cards', description: 'Standard, featured, etc' },
    { id: 'hover-states', label: 'Hover states', value: 4, icon: 'CursorClick', description: 'Interactive effects' },
    { id: 'image-ratios', label: 'Aspect ratios', value: 5, icon: 'Crop', description: 'Media proportions' },
    { id: 'meta-patterns', label: 'Meta patterns', value: 8, icon: 'Tag', description: 'Date & tag layouts' }
  ]
};

export const pageLayoutBrowserStats: DevToolStatsConfig = {
  pageId: 'page-layout-browser',
  stats: [
    { id: 'archives', label: 'Archives', value: 12, icon: 'Stack', description: 'Listing templates' },
    { id: 'singles', label: 'Singles', value: 7, icon: 'FileText', description: 'Detail templates' },
    { id: 'custom', label: 'Custom', value: 3, icon: 'Star', description: 'Special layouts' },
    { id: 'components', label: 'Sections', value: 24, icon: 'Layout', description: 'Page sections' }
  ]
};

export const blogSpecimensStats: DevToolStatsConfig = {
  pageId: 'blog-specimens',
  stats: [
    { id: 'posts', label: 'Posts', value: 35, icon: 'Article', description: 'Mock blog posts' },
    { id: 'categories', label: 'Categories', value: 6, icon: 'FolderOpen', description: 'Topics' },
    { id: 'tags', label: 'Tags', value: 24, icon: 'Tag', description: 'Keywords' },
    { id: 'reading-time', label: 'Avg read', value: '4m', icon: 'Clock', description: 'Average reading time' }
  ]
};

export const portfolioSpecimensStats: DevToolStatsConfig = {
  pageId: 'portfolio-specimens',
  stats: [
    { id: 'projects', label: 'Projects', value: 28, icon: 'PaintBrush', description: 'Mock portfolio items' },
    { id: 'disciplines', label: 'Disciplines', value: 4, icon: 'Swatches', description: 'Creative fields' },
    { id: 'gallery-imgs', label: 'Gallery imgs', value: 142, icon: 'Image', description: 'Total project photos' },
    { id: 'clients', label: 'Clients', value: 18, icon: 'Users', description: 'Collaborators' }
  ]
};

export const videoSpecimensStats: DevToolStatsConfig = {
  pageId: 'video-specimens',
  stats: [
    { id: 'videos', label: 'Videos', value: 16, icon: 'Video', description: 'Mock video entries' },
    { id: 'duration', label: 'Total time', value: '4h 20m', icon: 'Timer', description: 'Combined duration' },
    { id: 'platforms', label: 'Platforms', value: 2, icon: 'Globe', description: 'YouTube, Vimeo' },
    { id: 'resolutions', label: 'Formats', value: 3, icon: 'Desktop', description: 'HD, 4K, Vertical' }
  ]
};

export const podcastSpecimensStats: DevToolStatsConfig = {
  pageId: 'podcast-specimens',
  stats: [
    { id: 'episodes', label: 'Episodes', value: 12, icon: 'Microphone', description: 'Mock podcast entries' },
    { id: 'guests', label: 'Guests', value: 8, icon: 'User', description: 'Featured speakers' },
    { id: 'audio-hrs', label: 'Audio', value: '18h', icon: 'SpeakerHigh', description: 'Total listening time' },
    { id: 'networks', label: 'Networks', value: 4, icon: 'Globe', description: 'Spotify, Apple, etc' }
  ]
};

export const eventSpecimensStats: DevToolStatsConfig = {
  pageId: 'event-specimens',
  stats: [
    { id: 'events', label: 'Events', value: 45, icon: 'Calendar', description: 'Mock festival entries' },
    { id: 'locations', label: 'Locations', value: 14, icon: 'MapPin', description: 'Countries visited' },
    { id: 'travel-kms', label: 'Distance', value: '12k', icon: 'Airplane', description: 'Kilometers travelled' },
    { id: 'status', label: 'Status', value: 3, icon: 'CheckCircle', description: 'Upcoming, Past, Cancelled' }
  ]
};

export const faqSpecimensStats: DevToolStatsConfig = {
  pageId: 'faq-specimens',
  stats: [
    { id: 'questions', label: 'Questions', value: 24, icon: 'Question', description: 'Total FAQs' },
    { id: 'topics', label: 'Topics', value: 5, icon: 'FolderOpen', description: 'FAQ categories' },
    { id: 'schema', label: 'Schema', value: 'Valid', icon: 'ShieldCheck', description: 'JSON-LD structured data' },
    { id: 'accordions', label: 'Accordions', value: 2, icon: 'Stack', description: 'UI variants' }
  ]
};

export const cardShapesLabStats: DevToolStatsConfig = {
  pageId: 'card-shapes-lab',
  stats: [
    { id: 'shapes', label: 'Shapes', value: 8, icon: 'Square', description: 'CSS clip-path variants' },
    { id: 'borders', label: 'Borders', value: 4, icon: 'Path', description: 'Custom border treatments' },
    { id: 'aspects', label: 'Ratios', value: 6, icon: 'Crop', description: 'Image aspect ratios' },
    { id: 'responsive', label: 'Adaptive', value: 'Yes', icon: 'DeviceMobile', description: 'Fluid shape morphing' }
  ]
};

export const cardInteractionsLabStats: DevToolStatsConfig = {
  pageId: 'card-interactions-lab',
  stats: [
    { id: 'hover', label: 'Hover', value: 12, icon: 'Cursor', description: 'Hover state animations' },
    { id: 'focus', label: 'Focus', value: 8, icon: 'Eye', description: 'Keyboard focus states' },
    { id: 'active', label: 'Active', value: 4, icon: 'HandTap', description: 'Click/press states' },
    { id: 'motion', label: 'Motion', value: 'Safe', icon: 'ShieldCheck', description: 'Reduced motion support' }
  ]
};

export const detailTemplatesHubStats: DevToolStatsConfig = {
  pageId: 'detail-templates',
  stats: [
    { id: 'templates', label: 'Templates', value: 6, icon: 'Layout', description: 'Detail page layouts' },
    { id: 'types', label: 'Types', value: 6, icon: 'Files', description: 'Content post types' },
    { id: 'components', label: 'Blocks', value: 18, icon: 'Cube', description: 'Reusable layout blocks' },
    { id: 'responsive', label: 'Adaptive', value: 'Yes', icon: 'DeviceMobile', description: 'Mobile optimized' }
  ]
};

/**
 * Stats map for easy lookup
 */
export const devToolsStatsMap: Record<string, DevToolStatsConfig> = {
  'typography-specimens': typographyStats,
  'spacing-specimens': spacingStats,
  'shadows-specimens': shadowsStats,
  'radius-specimens': radiusStats,
  'buttons-specimens': buttonsStats,
  'cards-specimens': cardsStats,
  'neon-specimens': neonStats,
  'design-tokens-ref': tokensStats,
  'icon-library': iconsStats,
  'phosphor-icons': phosphorStats,
  'color-palettes': colorPalettesStats,
  'component-api': apiStats,
  'playground': playgroundStats,
  'code-quality': codeQualityStats,
  'deployment-readiness': deploymentStats,
  'analytics-dashboard': analyticsStats,
  'component-showcase': componentsStats,
  'snippet-generator': snippetsStats,
  'documentation-generator': docsStats,
  'visual-regression-tester': visualRegressionStats,
  'integration-tester': integrationStats,
  'accessibility-tester': accessibilityStats,
  'performance-tester': performanceStats,
  'content-specimens': contentSpecimensHubStats,
  'content-specimens-overview': contentSpecimensOverviewStats,
  'rich-text-specimens': richTextSpecimensStats,
  'content-card-specimens': contentCardSpecimensStats,
  'page-layout-browser': pageLayoutBrowserStats,
  'blog-specimens': blogSpecimensStats,
  'portfolio-specimens': portfolioSpecimensStats,
  'video-specimens': videoSpecimensStats,
  'podcast-specimens': podcastSpecimensStats,
  'event-specimens': eventSpecimensStats,
  'faq-specimens': faqSpecimensStats,
  'card-shapes-lab': cardShapesLabStats,
  'card-interactions-lab': cardInteractionsLabStats,
  'detail-templates': detailTemplatesHubStats,
};

/**
 * Get stats for a specific dev tool page
 */
export function getDevToolStats(pageId: string): DevToolStatsConfig | null {
  var entries = Object.entries(devToolsStatsMap);
  for (var i = 0; i < entries.length; i++) {
    if (entries[i][0] === pageId) return entries[i][1];
  }
  return null;
}