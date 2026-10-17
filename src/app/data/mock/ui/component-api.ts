/**
 * @fileoverview Component API Reference mock data — prop definitions for all key components
 * @module data/mock/ui/component-api
 * @version 1.0.0
 */

import type { BreadcrumbItem } from '../../../components/ui/Breadcrumbs';

export interface PropDef {
  name: string;
  type: string;
  required: boolean;
  default: string;
  description: string;
}

export interface ComponentDoc {
  id: string;
  name: string;
  path: string;
  category: 'common' | 'ui' | 'page' | 'utility';
  description: string;
  props: PropDef[];
  importStatement: string;
}

export const componentApiUI = {
  seo: { title: 'Component API Reference | Developer Tools | Ash Shaw' },
  breadcrumbs: [
    { label: 'Home', href: '/' },
    { label: 'Developer tools', href: '/dev-tools' },
    { label: 'Component API reference' },
  ] as BreadcrumbItem[],
  hero: {
    badge: 'Reference',
    title: 'Component API Reference',
    description:
      'Props, interfaces, and import statements for every public React component in the Ash Shaw portfolio. Search, browse, and copy.',
  },
  components: [
    {
      id: 'logo',
      name: 'Logo',
      path: '/components/common/Logo.tsx',
      category: 'common',
      description: 'Brand logo with responsive sizing and link to homepage. Supports light/dark mode variants.',
      importStatement: "import { Logo } from './components/common/Logo';",
      props: [
        { name: 'size', type: "'sm' | 'md' | 'lg'", required: false, default: "'md'", description: 'Logo size variant' },
        { name: 'linkTo', type: 'string', required: false, default: "'/'", description: 'Navigation target' },
        { name: 'className', type: 'string', required: false, default: "''", description: 'Additional CSS class' },
      ],
    },
    {
      id: 'header',
      name: 'Header',
      path: '/components/common/Header.tsx',
      category: 'common',
      description: 'Site header with navigation, search input, theme toggle, and mobile menu trigger.',
      importStatement: "import { Header } from './components/common/Header';",
      props: [],
    },
    {
      id: 'footer',
      name: 'Footer',
      path: '/components/common/Footer.tsx',
      category: 'common',
      description: 'Site footer with navigation links, social icons, and copyright. Renders in all routes.',
      importStatement: "import { Footer } from './components/common/Footer';",
      props: [],
    },
    {
      id: 'mobile-menu',
      name: 'MobileMenu',
      path: '/components/common/MobileMenu.tsx',
      category: 'common',
      description: 'Full-screen mobile navigation overlay with animated open/close transitions.',
      importStatement: "import { MobileMenu } from './components/common/MobileMenu';",
      props: [
        { name: 'isOpen', type: 'boolean', required: true, default: '—', description: 'Controls visibility' },
        { name: 'onClose', type: '() => void', required: true, default: '—', description: 'Close handler' },
      ],
    },
    {
      id: 'theme-toggle',
      name: 'ThemeToggle',
      path: '/components/common/ThemeToggle.tsx',
      category: 'common',
      description: 'Dark/light mode toggle button with Sun/Moon icons and system preference detection.',
      importStatement: "import { ThemeToggle } from './components/common/ThemeToggle';",
      props: [],
    },
    {
      id: 'social-links',
      name: 'SocialLinks',
      path: '/components/common/SocialLinks.tsx',
      category: 'common',
      description: 'Social media icon links (Instagram, Facebook, etc.) with hover glow effects.',
      importStatement: "import { SocialLinks } from './components/common/SocialLinks';",
      props: [
        { name: 'variant', type: "'default' | 'compact'", required: false, default: "'default'", description: 'Display style' },
      ],
    },
    {
      id: 'error-boundary',
      name: 'ErrorBoundary',
      path: '/components/common/ErrorBoundary.tsx',
      category: 'common',
      description: 'React error boundary wrapping the application. Catches render errors and shows a fallback UI.',
      importStatement: "import { ErrorBoundary } from './components/common/ErrorBoundary';",
      props: [
        { name: 'children', type: 'React.ReactNode', required: true, default: '—', description: 'Wrapped content' },
        { name: 'fallback', type: 'React.ReactNode', required: false, default: 'Default error UI', description: 'Custom fallback' },
      ],
    },
    {
      id: 'breadcrumbs',
      name: 'Breadcrumbs',
      path: '/components/ui/Breadcrumbs.tsx',
      category: 'ui',
      description: 'Navigation breadcrumbs with JSON-LD structured data. Supports custom items and Schema.org markup.',
      importStatement: "import { Breadcrumbs } from './components/ui/Breadcrumbs';",
      props: [
        { name: 'items', type: 'BreadcrumbItem[]', required: true, default: '—', description: 'Array of {label, href?} items' },
        { name: 'className', type: 'string', required: false, default: "''", description: 'Additional CSS class' },
      ],
    },
    {
      id: 'archive-filters',
      name: 'ArchiveFilters',
      path: '/components/ui/ArchiveFilters.tsx',
      category: 'ui',
      description: 'Reusable filter component with category chips, sort options, active filter summary, and result count.',
      importStatement: "import { ArchiveFilters } from './components/ui/ArchiveFilters';",
      props: [
        { name: 'contentType', type: 'string', required: true, default: '—', description: 'Content type label' },
        { name: 'categories', type: 'FilterCategory[]', required: true, default: '—', description: 'Available filter categories' },
        { name: 'activeCategories', type: 'string[]', required: true, default: '—', description: 'Currently selected slugs' },
        { name: 'sortBy', type: 'string', required: true, default: '—', description: 'Active sort key' },
        { name: 'sortOptions', type: 'SortOption[]', required: true, default: '—', description: 'Available sort options' },
        { name: 'resultCount', type: 'number', required: true, default: '—', description: 'Filtered result count' },
        { name: 'onCategoryToggle', type: '(slug: string) => void', required: true, default: '—', description: 'Category toggle callback' },
        { name: 'onSortChange', type: '(sortBy: string) => void', required: true, default: '—', description: 'Sort change callback' },
        { name: 'onClearAll', type: '() => void', required: true, default: '—', description: 'Clear all filters' },
      ],
    },
    {
      id: 'scroll-down-arrow',
      name: 'ScrollDownArrow',
      path: '/components/ui/ScrollDownArrow.tsx',
      category: 'ui',
      description: 'Animated bouncing arrow that scrolls to the next section. Used in hero sections.',
      importStatement: "import { ScrollDownArrow } from './components/ui/ScrollDownArrow';",
      props: [
        { name: 'targetId', type: 'string', required: false, default: '—', description: 'Target element ID to scroll to' },
        { name: 'label', type: 'string', required: false, default: "'Scroll down'", description: 'Accessible label' },
      ],
    },
    {
      id: 'scroll-to-top',
      name: 'ScrollToTop',
      path: '/components/ui/ScrollToTop.tsx',
      category: 'ui',
      description: 'Floating button that appears after scrolling and smoothly scrolls back to top.',
      importStatement: "import { ScrollToTop } from './components/ui/ScrollToTop';",
      props: [
        { name: 'threshold', type: 'number', required: false, default: '300', description: 'Scroll distance before button appears (px)' },
      ],
    },
    {
      id: 'search-input',
      name: 'SearchInput',
      path: '/components/ui/SearchInput.tsx',
      category: 'ui',
      description: 'Expandable search input with neon focus glow, clear button, and keyboard shortcut support.',
      importStatement: "import { SearchInput } from './components/ui/SearchInput';",
      props: [
        { name: 'value', type: 'string', required: true, default: '—', description: 'Current search query' },
        { name: 'onChange', type: '(value: string) => void', required: true, default: '—', description: 'Input change handler' },
        { name: 'onSubmit', type: '() => void', required: false, default: '—', description: 'Submit handler' },
        { name: 'placeholder', type: 'string', required: false, default: "'Search...'", description: 'Placeholder text' },
      ],
    },
    {
      id: 'share-component',
      name: 'ShareComponent',
      path: '/components/ui/ShareComponent.tsx',
      category: 'ui',
      description: 'Share button group with copy link, social sharing, and native share API fallback.',
      importStatement: "import { ShareComponent } from './components/ui/ShareComponent';",
      props: [
        { name: 'url', type: 'string', required: true, default: '—', description: 'URL to share' },
        { name: 'title', type: 'string', required: true, default: '—', description: 'Share title' },
        { name: 'description', type: 'string', required: false, default: "''", description: 'Share description' },
      ],
    },
    {
      id: 'portfolio-card',
      name: 'PortfolioCard',
      path: '/components/ui/PortfolioCard.tsx',
      category: 'ui',
      description: 'Portfolio item card with image, title, category badge, tags, and hover lift animation.',
      importStatement: "import { PortfolioCard } from './components/ui/PortfolioCard';",
      props: [
        { name: 'item', type: 'PortfolioEntry', required: true, default: '—', description: 'Portfolio entry data object' },
        { name: 'onClick', type: '() => void', required: false, default: '—', description: 'Card click handler' },
        { name: 'layout', type: "'grid' | 'list'", required: false, default: "'grid'", description: 'Display layout' },
      ],
    },
    {
      id: 'optimized-image',
      name: 'OptimizedImage',
      path: '/components/ui/OptimizedImage.tsx',
      category: 'ui',
      description: 'Image component with Canvas API optimisation, lazy loading, and fallback placeholder.',
      importStatement: "import { OptimizedImage } from './components/ui/OptimizedImage';",
      props: [
        { name: 'src', type: 'string', required: true, default: '—', description: 'Image source URL' },
        { name: 'alt', type: 'string', required: true, default: '—', description: 'Alt text (required for a11y)' },
        { name: 'width', type: 'number', required: false, default: '—', description: 'Image width' },
        { name: 'height', type: 'number', required: false, default: '—', description: 'Image height' },
        { name: 'lazy', type: 'boolean', required: false, default: 'true', description: 'Enable lazy loading' },
        { name: 'className', type: 'string', required: false, default: "''", description: 'Additional CSS class' },
      ],
    },
    {
      id: 'video-player',
      name: 'VideoPlayer',
      path: '/components/ui/VideoPlayer.tsx',
      category: 'ui',
      description: 'Video embed component supporting YouTube and Vimeo with responsive aspect ratio container.',
      importStatement: "import { VideoPlayer } from './components/ui/VideoPlayer';",
      props: [
        { name: 'url', type: 'string', required: true, default: '—', description: 'Video embed URL' },
        { name: 'title', type: 'string', required: true, default: '—', description: 'Video title for accessibility' },
        { name: 'aspectRatio', type: "'16:9' | '4:3'", required: false, default: "'16:9'", description: 'Aspect ratio' },
      ],
    },
    {
      id: 'read-more-button',
      name: 'ReadMoreButton',
      path: '/components/ui/ReadMoreButton.tsx',
      category: 'ui',
      description: 'Animated CTA link with arrow icon and hover slide effect.',
      importStatement: "import { ReadMoreButton } from './components/ui/ReadMoreButton';",
      props: [
        { name: 'to', type: 'string', required: true, default: '—', description: 'Navigation target path' },
        { name: 'label', type: 'string', required: false, default: "'Read More'", description: 'Button text' },
      ],
    },
  ] as ComponentDoc[],
};
