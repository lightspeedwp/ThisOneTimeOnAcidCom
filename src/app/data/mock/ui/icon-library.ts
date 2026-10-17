/**
 * @fileoverview Icon Library mock data — all Phosphor icons used across the site
 * @module data/mock/ui/icon-library
 * @version 2.0.0 — migrated from Lucide to Phosphor Icons
 */

import type { BreadcrumbItem } from '../../../components/ui/Breadcrumbs';

export interface IconEntry {
  name: string;
  usage: string[];
}

export interface IconCategory {
  id: string;
  title: string;
  icons: IconEntry[];
}

export const iconLibraryUI = {
  seo: { title: 'Icon Library | Developer Tools | Ash Shaw' },
  breadcrumbs: [
    { label: 'Home', href: '/' },
    { label: 'Developer tools', href: '/dev-tools' },
    { label: 'Icon library' },
  ] as BreadcrumbItem[],
  hero: {
    badge: 'Reference',
    title: 'Icon library',
    description:
      'Every Phosphor icon used across the Ash Shaw portfolio — searchable, grouped by category, with size toggle and copy-to-clipboard import statements.',
  },
  categories: [
    {
      id: 'navigation',
      title: 'Navigation',
      icons: [
        { name: 'House', usage: ['SitemapPage', 'Breadcrumbs'] },
        { name: 'ArrowLeft', usage: ['Breadcrumbs', 'NotFoundPage'] },
        { name: 'ArrowRight', usage: ['DevToolsPage', 'ReadMoreButton'] },
        { name: 'ArrowUp', usage: ['ScrollToTop'] },
        { name: 'CaretLeft', usage: ['Pagination', 'Lightbox'] },
        { name: 'CaretRight', usage: ['Pagination', 'DesignTokensRefPage'] },
        { name: 'CaretDown', usage: ['Header', 'FAQ', 'Accordion'] },
        { name: 'ArrowSquareOut', usage: ['Footer', 'SocialLinks'] },
        { name: 'List', usage: ['Header (mobile)', 'EbookReaderNav'] },
        { name: 'X', usage: ['MobileMenu', 'Lightbox', 'Modals'] },
      ],
    },
    {
      id: 'content',
      title: 'Content',
      icons: [
        { name: 'BookOpen', usage: ['BlogPage', 'SitemapPage'] },
        { name: 'FileText', usage: ['SitemapPage', 'SearchResults'] },
        { name: 'Newspaper', usage: ['SitemapPage'] },
        { name: 'FolderOpen', usage: ['SitemapPage', 'ArchiveFilters'] },
        { name: 'Tag', usage: ['BlogPostPage', 'PortfolioCard'] },
        { name: 'Calendar', usage: ['BlogCard', 'PodcastCard'] },
        { name: 'Clock', usage: ['BlogPostPage', 'ReadingTime'] },
        { name: 'Stack', usage: ['SitemapPage', 'PortfolioCategoryPage'] },
      ],
    },
    {
      id: 'media',
      title: 'Media',
      icons: [
        { name: 'Play', usage: ['VideosPage', 'VideoPlayer'] },
        { name: 'Pause', usage: ['VideoPlayer'] },
        { name: 'Image', usage: ['PortfolioPage', 'SitemapPage'] },
        { name: 'Microphone', usage: ['PodcastsPage', 'SitemapPage'] },
        { name: 'MusicNotes', usage: ['StyleGuidePage', 'EventsPage'] },
        { name: 'MagnifyingGlassPlus', usage: ['Lightbox', 'ImageGallery'] },
        { name: 'MagnifyingGlassMinus', usage: ['Lightbox'] },
        { name: 'SquaresFour', usage: ['LayoutSwitcher', 'CardSpecimenPage'] },
      ],
    },
    {
      id: 'actions',
      title: 'Actions',
      icons: [
        { name: 'ShareNetwork', usage: ['ShareComponent'] },
        { name: 'DownloadSimple', usage: ['ShareComponent', 'PressKitPage'] },
        { name: 'Copy', usage: ['ShareComponent', 'SnippetGenerator'] },
        { name: 'Heart', usage: ['BlogPostPage'] },
        { name: 'Eye', usage: ['BlogCard', 'PortfolioCard'] },
        { name: 'Plus', usage: ['ButtonSpecimenPage', 'FaqAggregatePage'] },
        { name: 'Minus', usage: ['FAQ', 'FaqAggregatePage'] },
        { name: 'Check', usage: ['FormValidation'] },
        { name: 'LinkSimple', usage: ['ShareComponent'] },
        { name: 'MagnifyingGlass', usage: ['Header', 'SearchInput'] },
      ],
    },
    {
      id: 'status',
      title: 'Status & System',
      icons: [
        { name: 'Shield', usage: ['AccessibilityTesterPage'] },
        { name: 'Heartbeat', usage: ['PerformanceTesterPage', 'DevToolsPage'] },
        { name: 'Lightning', usage: ['AnimationSpecimenPage', 'DevToolsPage'] },
        { name: 'Sun', usage: ['ThemeToggle'] },
        { name: 'Moon', usage: ['ThemeToggle'] },
        { name: 'WifiHigh', usage: ['OfflineIndicator'] },
        { name: 'WifiSlash', usage: ['OfflineIndicator'] },
        { name: 'Question', usage: ['FaqAggregatePage', 'SitemapPage'] },
        { name: 'Chat', usage: ['FeedbackPage', 'SitemapPage'] },
        { name: 'Warning', usage: ['ErrorBoundary'] },
      ],
    },
    {
      id: 'social',
      title: 'Social',
      icons: [
        { name: 'Camera', usage: ['SocialLinks', 'Footer'] },
        { name: 'ChatCircle', usage: ['SocialLinks', 'ShareComponent'] },
        { name: 'Envelope', usage: ['ContactPage', 'SitemapPage'] },
      ],
    },
    {
      id: 'design',
      title: 'Design & Tools',
      icons: [
        { name: 'Palette', usage: ['DevToolsPage', 'StyleGuidePage'] },
        { name: 'PaintBrush', usage: ['StyleGuidePage', 'GearPage'] },
        { name: 'Sparkle', usage: ['DevToolsPage', 'FestivalCountdown'] },
        { name: 'Wrench', usage: ['SitemapPage'] },
        { name: 'TextAa', usage: ['TypographySpecimenPage'] },
        { name: 'Ruler', usage: ['SpacingSpecimenPage'] },
        { name: 'Circle', usage: ['RadiusSpecimenPage'] },
        { name: 'Cloud', usage: ['ShadowSpecimenPage'] },
        { name: 'Cursor', usage: ['ButtonSpecimenPage'] },
        { name: 'Lightbulb', usage: ['DesignTokensRefPage'] },
      ],
    },
    {
      id: 'places',
      title: 'Places & Objects',
      icons: [
        { name: 'MapPin', usage: ['AboutPage', 'FeedbackPage'] },
        { name: 'Compass', usage: ['AboutPage'] },
        { name: 'Buildings', usage: ['HiddenAboutPage'] },
        { name: 'Rocket', usage: ['StyleGuidePage'] },
        { name: 'Brain', usage: ['StyleGuidePage'] },
        { name: 'User', usage: ['SitemapPage', 'AboutPage'] },
        { name: 'Airplane', usage: ['TravelsPage', 'HiddenAboutPage'] },
      ],
    },
  ] as IconCategory[],
};
