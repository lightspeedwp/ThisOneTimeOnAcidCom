/**
 * @fileoverview Phosphor Icons migration data — mapping and dev tools reference
 *
 * Maps every Lucide icon in the project to its Phosphor equivalent.
 * Used by PhosphorIconsPage dev tool and migration tracking.
 *
 * @module data/mock/ui/phosphor-icons
 * @version 1.0.0
 */

import type { BreadcrumbItem } from '../../../components/ui/Breadcrumbs';

/** Single icon mapping entry */
export interface PhosphorIconEntry {
  phosphorName: string;
  lucideName: string | null;
  category: 'navigation' | 'media' | 'social' | 'status' | 'content' | 'action' | 'misc';
  status: 'same' | 'renamed' | 'missing';
  usedInFiles: string[];
  migrated: boolean;
  notes: string;
}

/** Weight option for the weight switcher */
export interface PhosphorWeightOption {
  value: 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone';
  label: string;
  description: string;
  minSafeSize: number;
  a11yRating: 'safe' | 'caution' | 'decorative-only';
}

/** Page UI data */
export var phosphorIconsPageUI = {
  hero: {
    badge: 'Migration tool',
    title: 'Phosphor icons',
    description:
      'Side-by-side comparison of every Lucide icon and its Phosphor equivalent. Preview all 6 weight variants, check accessibility, and track migration progress.',
  },
  breadcrumbs: [
    { label: 'Home', href: '/' },
    { label: 'Developer tools', href: '/dev-tools' },
    { label: 'Phosphor icons' },
  ] as BreadcrumbItem[],
};

/** Phosphor weight options */
export var phosphorWeights: PhosphorWeightOption[] = [
  {
    value: 'thin',
    label: 'Thin',
    description: 'Lightest weight, ~1px stroke',
    minSafeSize: 32,
    a11yRating: 'decorative-only',
  },
  {
    value: 'light',
    label: 'Light',
    description: 'Subtle weight, ~1.5px stroke',
    minSafeSize: 24,
    a11yRating: 'caution',
  },
  {
    value: 'regular',
    label: 'Regular',
    description: 'Default weight, ~2px stroke',
    minSafeSize: 16,
    a11yRating: 'safe',
  },
  {
    value: 'bold',
    label: 'Bold',
    description: 'Emphasis weight, ~3px stroke',
    minSafeSize: 16,
    a11yRating: 'safe',
  },
  {
    value: 'fill',
    label: 'Fill',
    description: 'Solid filled icon',
    minSafeSize: 12,
    a11yRating: 'safe',
  },
  {
    value: 'duotone',
    label: 'Duotone',
    description: 'Two-tone with 20% opacity secondary layer',
    minSafeSize: 24,
    a11yRating: 'caution',
  },
];

/** Size options for the size selector */
export var phosphorSizeOptions: { label: string; value: number }[] = [
  { label: 'XS', value: 16 },
  { label: 'S', value: 20 },
  { label: 'M', value: 24 },
  { label: 'L', value: 32 },
  { label: 'XL', value: 48 },
];

/** Category options for filtering */
export var phosphorCategories: { id: string; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'navigation', label: 'Navigation' },
  { id: 'media', label: 'Media' },
  { id: 'content', label: 'Content' },
  { id: 'action', label: 'Action' },
  { id: 'status', label: 'Status' },
  { id: 'social', label: 'Social' },
  { id: 'misc', label: 'Misc' },
];

/**
 * Complete icon mapping — every icon in the project documented with Phosphor names.
 * Sorted alphabetically by Phosphor name. Migration complete — all entries migrated: true.
 */
export var phosphorIconData: PhosphorIconEntry[] = [
  { phosphorName: 'Activity', lucideName: 'Activity', category: 'status', status: 'same', usedInFiles: ['DevToolsPage', 'PerformanceTesterPage'], migrated: true, notes: '' },
  { phosphorName: 'Airplane', lucideName: 'Plane', category: 'misc', status: 'renamed', usedInFiles: ['TravelBadge', 'SixCatsPage'], migrated: true, notes: 'Plane → Airplane' },
  { phosphorName: 'ArrowLeft', lucideName: 'ArrowLeft', category: 'navigation', status: 'same', usedInFiles: ['NotFoundPage', 'BlogPostPage', 'PortfolioDetailPage'], migrated: true, notes: '' },
  { phosphorName: 'ArrowRight', lucideName: 'ArrowRight', category: 'navigation', status: 'same', usedInFiles: ['AboutPage', 'ReadMoreButton', 'BlogMegaMenu', 'VideosPage', 'DevToolsPage'], migrated: true, notes: '' },
  { phosphorName: 'ArrowSquareOut', lucideName: 'ExternalLink', category: 'action', status: 'renamed', usedInFiles: ['BlogPostPage', 'ShareComponent'], migrated: true, notes: 'ExternalLink → ArrowSquareOut' },
  { phosphorName: 'ArrowUp', lucideName: 'ArrowUp', category: 'navigation', status: 'same', usedInFiles: ['ScrollToTop'], migrated: true, notes: '' },
  { phosphorName: 'ArrowsClockwise', lucideName: 'RefreshCw', category: 'action', status: 'renamed', usedInFiles: ['ErrorBoundary'], migrated: true, notes: 'RefreshCw → ArrowsClockwise' },
  { phosphorName: 'ArrowsIn', lucideName: 'Minimize', category: 'action', status: 'renamed', usedInFiles: ['EbookReaderNav', 'EbookSettingsModal'], migrated: true, notes: 'Minimize → ArrowsIn' },
  { phosphorName: 'ArrowsOut', lucideName: 'Maximize', category: 'action', status: 'renamed', usedInFiles: ['VideoPlayer', 'EbookReaderNav'], migrated: true, notes: 'Maximize → ArrowsOut' },
  { phosphorName: 'Book', lucideName: 'Book', category: 'content', status: 'same', usedInFiles: ['SixCatsPage'], migrated: true, notes: '' },
  { phosphorName: 'BookOpen', lucideName: 'BookOpen', category: 'content', status: 'same', usedInFiles: ['BookPage', 'BlogPage', 'BlogPostPage', 'BlogCategoryPage', 'BlogTagPage'], migrated: true, notes: '' },
  { phosphorName: 'BookmarkSimple', lucideName: 'Bookmark', category: 'action', status: 'renamed', usedInFiles: ['DevToolsPage'], migrated: true, notes: 'Bookmark → BookmarkSimple' },
  { phosphorName: 'Brain', lucideName: 'Brain', category: 'misc', status: 'same', usedInFiles: ['HiddenAboutPage', 'SixCatsPage'], migrated: true, notes: '' },
  { phosphorName: 'Bus', lucideName: 'BusFront', category: 'misc', status: 'renamed', usedInFiles: ['TravelBadge'], migrated: true, notes: 'BusFront → Bus' },
  { phosphorName: 'Calendar', lucideName: 'Calendar', category: 'content', status: 'same', usedInFiles: ['BlogPage', 'BlogPostPage', 'PortfolioDetailPage', 'EventsPage', 'PodcastsPage', 'PortfolioCard', 'SliderCard'], migrated: true, notes: '' },
  { phosphorName: 'Camera', lucideName: 'Camera', category: 'media', status: 'same', usedInFiles: ['BlogPostPage', 'IconLibraryPage'], migrated: true, notes: '' },
  { phosphorName: 'Car', lucideName: 'CarFront', category: 'misc', status: 'renamed', usedInFiles: ['TravelBadge'], migrated: true, notes: 'CarFront → Car' },
  { phosphorName: 'CaretDown', lucideName: 'ChevronDown', category: 'navigation', status: 'renamed', usedInFiles: ['Accordion', 'AboutDropdown', 'ScrollDownArrow', 'EbookDrawer'], migrated: true, notes: 'ChevronDown → CaretDown' },
  { phosphorName: 'CaretLeft', lucideName: 'ChevronLeft', category: 'navigation', status: 'renamed', usedInFiles: ['EnhancedLightbox', 'PortfolioCard', 'ResponsiveGridSlider', 'SliderCard', 'StickersPage', 'pagination'], migrated: true, notes: 'ChevronLeft → CaretLeft' },
  { phosphorName: 'CaretRight', lucideName: 'ChevronRight', category: 'navigation', status: 'renamed', usedInFiles: ['Breadcrumbs', 'EnhancedLightbox', 'PortfolioCard', 'ResponsiveGridSlider', 'SliderCard', 'StickersPage', 'pagination', 'DesignTokensRefPage', 'GearPage', 'EbookReaderNav'], migrated: true, notes: 'ChevronRight → CaretRight' },
  { phosphorName: 'CaretUp', lucideName: 'ChevronUp', category: 'navigation', status: 'renamed', usedInFiles: ['AboutDropdown'], migrated: true, notes: 'ChevronUp → CaretUp' },
  { phosphorName: 'Chat', lucideName: 'MessageSquare', category: 'social', status: 'renamed', usedInFiles: ['FeedbackPage', 'PortfolioDetailPage', 'IconLibraryPage'], migrated: true, notes: 'MessageSquare → Chat' },
  { phosphorName: 'ChatCircle', lucideName: 'MessageCircle', category: 'social', status: 'renamed', usedInFiles: ['ShareComponent', 'IconLibraryPage'], migrated: true, notes: 'MessageCircle → ChatCircle' },
  { phosphorName: 'Check', lucideName: 'Check', category: 'status', status: 'same', usedInFiles: ['Footer', 'ShareComponent'], migrated: true, notes: '' },
  { phosphorName: 'CheckCircle', lucideName: 'CircleCheck', category: 'status', status: 'renamed', usedInFiles: ['DeploymentReadinessPage', 'IntegrationTesterPage'], migrated: true, notes: 'CircleCheck → CheckCircle' },
  { phosphorName: 'Circle', lucideName: 'Circle', category: 'misc', status: 'same', usedInFiles: ['RadiusSpecimenPage', 'DevToolsPage'], migrated: true, notes: '' },
  { phosphorName: 'Clock', lucideName: 'Clock', category: 'content', status: 'same', usedInFiles: ['BlogPage', 'BlogPostPage', 'BlogMegaMenu', 'PodcastsPage', 'IntegrationTesterPage'], migrated: true, notes: '' },
  { phosphorName: 'Cloud', lucideName: 'Cloud', category: 'misc', status: 'same', usedInFiles: ['ShadowSpecimenPage'], migrated: true, notes: '' },
  { phosphorName: 'Code', lucideName: 'Code', category: 'content', status: 'same', usedInFiles: ['DeploymentReadinessPage'], migrated: true, notes: '' },
  { phosphorName: 'Copy', lucideName: 'Copy', category: 'action', status: 'same', usedInFiles: ['IconLibraryPage'], migrated: true, notes: '' },
  { phosphorName: 'Cursor', lucideName: 'Pointer', category: 'misc', status: 'renamed', usedInFiles: ['ButtonSpecimenPage', 'IconLibraryPage'], migrated: true, notes: 'Pointer → Cursor' },
  { phosphorName: 'DownloadSimple', lucideName: 'Download', category: 'action', status: 'renamed', usedInFiles: ['PWAInstallPrompt', 'ButtonSpecimenPage'], migrated: true, notes: 'Download → DownloadSimple' },
  { phosphorName: 'DotsThree', lucideName: 'Ellipsis', category: 'navigation', status: 'renamed', usedInFiles: ['pagination'], migrated: true, notes: 'Ellipsis → DotsThree' },
  { phosphorName: 'Envelope', lucideName: 'Mail', category: 'social', status: 'renamed', usedInFiles: ['MobileMenu', 'ContactMiniMenu', 'ShareComponent', 'IconLibraryPage'], migrated: true, notes: 'Mail → Envelope' },
  { phosphorName: 'Eye', lucideName: 'Eye', category: 'action', status: 'same', usedInFiles: ['BlogPostPage', 'PortfolioDetailPage', 'CardSpecimenPage', 'EbookSettingsModal', 'DevToolsPage'], migrated: true, notes: '' },
  { phosphorName: 'FileCode', lucideName: 'FileCode', category: 'content', status: 'same', usedInFiles: ['DevToolsPage'], migrated: true, notes: '' },
  { phosphorName: 'FileText', lucideName: 'FileText', category: 'content', status: 'same', usedInFiles: ['DevToolsPage', 'IconLibraryPage'], migrated: true, notes: '' },
  { phosphorName: 'FolderOpen', lucideName: 'FolderOpen', category: 'content', status: 'same', usedInFiles: ['IconLibraryPage'], migrated: true, notes: '' },
  { phosphorName: 'GraduationCap', lucideName: 'GraduationCap', category: 'misc', status: 'same', usedInFiles: ['SixCatsPage'], migrated: true, notes: '' },
  { phosphorName: 'Headphones', lucideName: 'Headphones', category: 'media', status: 'same', usedInFiles: ['PodcastPage'], migrated: true, notes: '' },
  { phosphorName: 'Heart', lucideName: 'Heart', category: 'social', status: 'same', usedInFiles: ['BlogPostPage', 'ButtonSpecimenPage', 'CardSpecimenPage', 'IconLibraryPage'], migrated: true, notes: '' },
  { phosphorName: 'House', lucideName: 'Home', category: 'navigation', status: 'renamed', usedInFiles: ['Breadcrumbs', 'NotFoundPage', 'IconLibraryPage'], migrated: true, notes: 'Home → House' },
  { phosphorName: 'Image', lucideName: 'Image', category: 'media', status: 'same', usedInFiles: ['PortfolioCategoryPage', 'PortfolioTagPage', 'GearPage', 'IconLibraryPage'], migrated: true, notes: '' },
  { phosphorName: 'Info', lucideName: 'Info', category: 'status', status: 'same', usedInFiles: ['IconLibraryPage'], migrated: true, notes: '' },
  { phosphorName: 'Leaf', lucideName: 'Leaf', category: 'misc', status: 'same', usedInFiles: ['SixCatsPage'], migrated: true, notes: '' },
  { phosphorName: 'Lightbulb', lucideName: 'Lightbulb', category: 'misc', status: 'same', usedInFiles: ['AboutPage', 'DesignTokensRefPage', 'IconLibraryPage'], migrated: true, notes: '' },
  { phosphorName: 'Lightning', lucideName: 'Zap', category: 'action', status: 'renamed', usedInFiles: ['AnimationSpecimenPage', 'GearPage', 'DevToolsPage'], migrated: true, notes: 'Zap → Lightning' },
  { phosphorName: 'Link', lucideName: 'Link2', category: 'action', status: 'renamed', usedInFiles: ['Footer', 'ShareComponent', 'IconLibraryPage'], migrated: true, notes: 'Link2 → Link' },
  { phosphorName: 'List', lucideName: 'List', category: 'navigation', status: 'same', usedInFiles: ['EbookReaderNav'], migrated: true, notes: '' },
  { phosphorName: 'ListBullets', lucideName: null, category: 'navigation', status: 'renamed', usedInFiles: [], migrated: true, notes: 'Alternative for List when Menu collision applies' },
  { phosphorName: 'Lock', lucideName: 'Lock', category: 'status', status: 'same', usedInFiles: ['DeploymentReadinessPage'], migrated: true, notes: '' },
  { phosphorName: 'MagnifyingGlass', lucideName: 'Search', category: 'action', status: 'renamed', usedInFiles: ['SearchInput', 'StickersPage', 'FaqAggregatePage', 'FeedbackPage', 'DeploymentReadinessPage'], migrated: true, notes: 'Search → MagnifyingGlass' },
  { phosphorName: 'MagnifyingGlassMinus', lucideName: 'ZoomOut', category: 'action', status: 'renamed', usedInFiles: ['EnhancedLightbox'], migrated: true, notes: 'ZoomOut → MagnifyingGlassMinus' },
  { phosphorName: 'MagnifyingGlassPlus', lucideName: 'ZoomIn', category: 'action', status: 'renamed', usedInFiles: ['EnhancedLightbox', 'ImageGallery'], migrated: true, notes: 'ZoomIn → MagnifyingGlassPlus' },
  { phosphorName: 'MapPin', lucideName: 'MapPin', category: 'content', status: 'same', usedInFiles: ['TravelsPage', 'EventsPage', 'EventDetailPage', 'PortfolioDetailPage', 'FeedbackPage'], migrated: true, notes: '' },
  { phosphorName: 'Microphone', lucideName: 'Mic', category: 'media', status: 'renamed', usedInFiles: ['PodcastPage', 'PodcastsPage', 'PodcastDetailPage', 'PodcastCategoryPage', 'PodcastTagPage', 'CardSpecimenPage'], migrated: true, notes: 'Mic → Microphone' },
  { phosphorName: 'Minus', lucideName: 'Minus', category: 'action', status: 'same', usedInFiles: ['FaqAggregatePage'], migrated: true, notes: '' },
  { phosphorName: 'Moon', lucideName: 'Moon', category: 'misc', status: 'same', usedInFiles: ['ThemeToggle'], migrated: true, notes: '' },
  { phosphorName: 'MusicNotes', lucideName: 'Music', category: 'media', status: 'renamed', usedInFiles: ['EventsPage', 'EventCategoryPage', 'EventTagPage', 'IconLibraryPage'], migrated: true, notes: 'Music → MusicNotes' },
  { phosphorName: 'Newspaper', lucideName: 'Newspaper', category: 'content', status: 'same', usedInFiles: ['IconLibraryPage'], migrated: true, notes: '' },
  { phosphorName: 'PaintBrush', lucideName: 'Paintbrush', category: 'misc', status: 'renamed', usedInFiles: ['GearPage', 'IconLibraryPage'], migrated: true, notes: 'Paintbrush → PaintBrush (case change)' },
  { phosphorName: 'Palette', lucideName: 'Palette', category: 'misc', status: 'same', usedInFiles: ['AboutPage', 'DevToolsPage', 'IconLibraryPage'], migrated: true, notes: '' },
  { phosphorName: 'Pause', lucideName: 'Pause', category: 'media', status: 'same', usedInFiles: ['VideoPlayer', 'AnimationSpecimenPage'], migrated: true, notes: '' },
  { phosphorName: 'Play', lucideName: 'Play', category: 'media', status: 'same', usedInFiles: ['PortfolioCard', 'SliderCard', 'EnhancedLightbox', 'VideoPlayer', 'VideosPage', 'VideoDetailPage', 'VideoCategoryPage', 'VideoTagPage', 'AnimationSpecimenPage', 'ButtonSpecimenPage', 'CardSpecimenPage', 'IntegrationTesterPage'], migrated: true, notes: '' },
  { phosphorName: 'PlayCircle', lucideName: 'CirclePlay', category: 'media', status: 'renamed', usedInFiles: ['PodcastsPage', 'PodcastCategoryPage', 'PodcastTagPage'], migrated: true, notes: 'CirclePlay → PlayCircle' },
  { phosphorName: 'Plus', lucideName: 'Plus', category: 'action', status: 'same', usedInFiles: ['FaqAggregatePage', 'ButtonSpecimenPage'], migrated: true, notes: '' },
  { phosphorName: 'Question', lucideName: 'CircleHelp', category: 'status', status: 'renamed', usedInFiles: ['FaqAggregatePage', 'IconLibraryPage'], migrated: true, notes: 'CircleHelp → Question' },
  { phosphorName: 'Rocket', lucideName: 'Rocket', category: 'misc', status: 'same', usedInFiles: ['DevToolsPage', 'IconLibraryPage'], migrated: true, notes: '' },
  { phosphorName: 'Ruler', lucideName: 'Ruler', category: 'misc', status: 'same', usedInFiles: ['SpacingSpecimenPage', 'IconLibraryPage'], migrated: true, notes: '' },
  { phosphorName: 'Scissors', lucideName: 'Scissors', category: 'misc', status: 'same', usedInFiles: ['DevToolsPage'], migrated: true, notes: '' },
  { phosphorName: 'ShareNetwork', lucideName: 'Share2', category: 'social', status: 'renamed', usedInFiles: ['ShareComponent', 'BlogPostPage', 'PortfolioDetailPage', 'ButtonSpecimenPage'], migrated: true, notes: 'Share2 → ShareNetwork' },
  { phosphorName: 'Shield', lucideName: 'Shield', category: 'status', status: 'same', usedInFiles: ['GearPage', 'DeploymentReadinessPage', 'DevToolsPage'], migrated: true, notes: '' },
  { phosphorName: 'Shuffle', lucideName: 'Shuffle', category: 'action', status: 'same', usedInFiles: ['StickersPage'], migrated: true, notes: '' },
  { phosphorName: 'SlidersHorizontal', lucideName: 'SlidersHorizontal', category: 'action', status: 'same', usedInFiles: ['ArchiveFilters', 'EbookPage', 'EbookReaderNav', 'EbookSettingsModal'], migrated: true, notes: 'Also available as Faders in Phosphor' },
  { phosphorName: 'Sparkle', lucideName: 'Sparkles', category: 'misc', status: 'renamed', usedInFiles: ['AboutPage', 'DevToolsPage', 'IconLibraryPage'], migrated: true, notes: 'Sparkles → Sparkle (singular)' },
  { phosphorName: 'SpeakerHigh', lucideName: 'Volume2', category: 'media', status: 'renamed', usedInFiles: ['VideoPlayer'], migrated: true, notes: 'Volume2 → SpeakerHigh' },
  { phosphorName: 'SpeakerSlash', lucideName: 'VolumeX', category: 'media', status: 'renamed', usedInFiles: ['VideoPlayer'], migrated: true, notes: 'VolumeX → SpeakerSlash' },
  { phosphorName: 'SquaresFour', lucideName: 'LayoutGrid', category: 'navigation', status: 'renamed', usedInFiles: ['EnhancedLightbox', 'CardSpecimenPage', 'DevToolsPage'], migrated: true, notes: 'LayoutGrid → SquaresFour' },
  { phosphorName: 'Stack', lucideName: 'Layers', category: 'content', status: 'renamed', usedInFiles: ['AboutPage', 'PortfolioCategoryPage', 'PortfolioTagPage', 'DevToolsPage'], migrated: true, notes: 'Layers → Stack' },
  { phosphorName: 'Star', lucideName: 'Star', category: 'social', status: 'same', usedInFiles: ['PortfolioDetailPage', 'FeedbackPage', 'IconLibraryPage'], migrated: true, notes: '' },
  { phosphorName: 'Sun', lucideName: 'Sun', category: 'misc', status: 'same', usedInFiles: ['ThemeToggle'], migrated: true, notes: '' },
  { phosphorName: 'Tag', lucideName: 'Tag', category: 'content', status: 'same', usedInFiles: ['BlogPostPage', 'PortfolioDetailPage', 'VideoTagPage', 'PodcastTagPage', 'IconLibraryPage'], migrated: true, notes: '' },
  { phosphorName: 'TextAa', lucideName: 'Type', category: 'misc', status: 'renamed', usedInFiles: ['TypographySpecimenPage', 'EbookSettingsModal', 'IconLibraryPage'], migrated: true, notes: 'Type → TextAa' },
  { phosphorName: 'ThumbsUp', lucideName: 'ThumbsUp', category: 'social', status: 'same', usedInFiles: ['HiddenAboutPage'], migrated: true, notes: '' },
  { phosphorName: 'Train', lucideName: 'TrainFront', category: 'misc', status: 'renamed', usedInFiles: ['TravelBadge'], migrated: true, notes: 'TrainFront → Train' },
  { phosphorName: 'Trash', lucideName: 'Trash2', category: 'action', status: 'renamed', usedInFiles: ['ButtonSpecimenPage'], migrated: true, notes: 'Trash2 → Trash' },
  { phosphorName: 'User', lucideName: 'User', category: 'social', status: 'same', usedInFiles: ['BlogPostPage', 'IconLibraryPage'], migrated: true, notes: '' },
  { phosphorName: 'Warning', lucideName: 'TriangleAlert', category: 'status', status: 'renamed', usedInFiles: ['ErrorBoundary', 'DeploymentReadinessPage', 'IconLibraryPage'], migrated: true, notes: 'TriangleAlert → Warning' },
  { phosphorName: 'WifiHigh', lucideName: 'Wifi', category: 'status', status: 'renamed', usedInFiles: ['OfflineIndicator'], migrated: true, notes: 'Wifi → WifiHigh' },
  { phosphorName: 'WifiSlash', lucideName: 'WifiOff', category: 'status', status: 'renamed', usedInFiles: ['OfflineIndicator'], migrated: true, notes: 'WifiOff → WifiSlash' },
  { phosphorName: 'X', lucideName: 'X', category: 'action', status: 'same', usedInFiles: ['Header', 'PWAInstallPrompt', 'SearchInput', 'ArchiveFilters', 'ShareComponent', 'EnhancedLightbox', 'EbookPage', 'EbookDrawer', 'VideoModal', 'StickersPage', 'EbookSettingsModal'], migrated: true, notes: '' },
  { phosphorName: 'XCircle', lucideName: 'CircleX', category: 'status', status: 'renamed', usedInFiles: ['DeploymentReadinessPage', 'IntegrationTesterPage'], migrated: true, notes: 'CircleX → XCircle' },
];