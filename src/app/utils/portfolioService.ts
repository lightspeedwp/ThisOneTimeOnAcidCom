/**
 * @fileoverview Unified Portfolio Service for Ash Shaw Makeup Portfolio
 * 
 * Provides centralized portfolio data management shared between homepage FeaturedSection
 * and PortfolioMainPage to ensure consistent content display and category filtering.
 * 
 * Features:
 * - Unified data structure for all portfolio content
 * - Category-based filtering with proper type safety
 * - Contentful CMS integration with static fallbacks
 * - Consistent image handling and optimization
 * - Featured item selection and ordering
 * 
 * Architecture:
 * - Single source of truth for portfolio data (sourcing from @/data/mock/portfolio)
 * - Seamless integration between homepage and portfolio page
 * - Proper TypeScript interfaces for data consistency
 * - Performance optimized with caching and lazy loading
 * 
 * @author Ash Shaw Portfolio Team
 * @version 2.0.0 - Refactor to use centralized mock data
 */

import { allPortfolioWork } from '../data/mock/portfolio/index';
import { PortfolioEntry } from '../data/types/portfolio';

// Re-export types for consumers
export type { PortfolioEntry };

/**
 * Portfolio category configuration matching PortfolioMainPage structure
 * Defines the 6 main categories with visual styling and metadata
 */
export const PORTFOLIO_CATEGORIES: PortfolioCategory[] = [
  {
    id: 'all',
    name: 'All Work',
    slug: 'all',
    description: 'Complete portfolio showcasing diverse makeup artistry',
    gradient: 'bg-gradient-pink-purple-blue',
  },
  {
    id: 'Festival Makeup',
    name: 'Festival',
    slug: 'festival',
    description: 'Vibrant festival artistry and celebration makeup',
    gradient: 'bg-gradient-blue-teal-green',
  },
  {
    id: 'UV Makeup',
    name: 'UV & Blacklight',
    slug: 'uv-blacklight',
    description: 'Electric nightlife artistry with UV-reactive paints',
    gradient: 'bg-gradient-gold-peach-coral',
  },
  {
    id: 'Swiss Festivals',
    name: 'Swiss Festivals',
    slug: 'swiss-festivals',
    description: 'Alpine festival experiences and mountain celebrations',
    gradient: 'bg-gradient-blue-teal-green',
  },
  {
    id: 'Fusion Nails',
    name: 'Fusion Nails',
    slug: 'fusion-nails',
    description: 'Creative nail artistry with vibrant designs',
    gradient: 'bg-gradient-pink-purple-blue',
  },
  {
    id: 'Thailand Adventures',
    name: 'Thailand',
    slug: 'thailand',
    description: 'Tropical festival experiences and cultural immersion',
    gradient: 'bg-gradient-gold-peach-coral',
  },
];

/**
 * Image interface for consistent image handling
 */
export interface PortfolioImage {
  src: string;
  alt: string;
  caption: string;
  description: string;
}

/**
 * Portfolio category configuration
 */
export interface PortfolioCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  gradient?: string; // Optional gradient class for UI
}

/**
 * Unified portfolio entry interface
 * Used by both homepage FeaturedSection and PortfolioMainPage
 */
export interface UnifiedPortfolioEntry {
  id: string;
  slug: string; // URL-friendly slug
  title: string;
  subtitle: string;
  description: string;
  content?: string;
  images: PortfolioImage[];
  category: string; // Must match PORTFOLIO_CATEGORIES id
  date?: string;
  featured?: boolean; // For homepage featured section
  displayOrder?: number; // For consistent ordering
  tags?: string[]; // For additional filtering
  faqs?: { id: string; question: string; answer: string }[];
}

/**
 * Helper function to validate image URLs for browser compatibility
 * Updated to allow all valid image sources including figma:asset/ URLs
 */
function hasValidImageURLs(entry: any): boolean {
  if (!entry.images || entry.images.length === 0) return false;
  
  return entry.images.some((img: any) => {
    if (!img.src) return false;
    // Relaxed validation: Allow any non-empty string
    // This ensures imports processed by build tools (which might not start with specific prefixes)
    // are still accepted.
    return typeof img.src === 'string' && img.src.length > 0;
  });
}

/**
 * Maps the mock data category to the UI category
 *
 * Priority order: nail art (very specific) → geographic tags (Thailand, Swiss)
 * → primary UV category → fallback. Geographic/event context takes precedence
 * over technique-based tags (e.g. a Thailand entry that uses UV paint is still
 * a Thailand entry, not a UV entry).
 */
export function mapCategory(category: string, tags: string[] = []): string {
  const lowerTags = tags.map(function(t) { return t.toLowerCase(); });
  const lowerCategory = category.toLowerCase();

  // 1. Nail art — very specific category
  if (lowerCategory.indexOf('nail') !== -1) return 'Fusion Nails';

  // 2. Geographic / event tags — checked before technique-based matching
  if (lowerTags.indexOf('thailand') !== -1 || lowerTags.indexOf('jungle') !== -1) return 'Thailand Adventures';
  if (lowerTags.indexOf('swiss') !== -1 || lowerTags.indexOf('switzerland') !== -1 || lowerTags.indexOf('shankra') !== -1 || lowerTags.indexOf('reiserfieber') !== -1) return 'Swiss Festivals';

  // 3. UV Makeup — only when the *primary* category is UV, not just a tag
  if (lowerCategory.indexOf('uv') !== -1 || lowerCategory.indexOf('blacklight') !== -1) return 'UV Makeup';

  // 4. Fallback mappings
  if (category === 'Body Art') return 'Festival Makeup';
  if (category === 'Nail Art') return 'Fusion Nails';

  return 'Festival Makeup';
}

/**
 * Transforms a Mock PortfolioEntry to a UnifiedPortfolioEntry
 */
function transformEntry(entry: PortfolioEntry): UnifiedPortfolioEntry {
  // Determine the correct category
  const uiCategory = mapCategory(entry.category, entry.tags);

  return {
    id: entry.id,
    slug: entry.slug || entry.id,
    title: entry.title,
    subtitle: entry.excerpt || entry.location || entry.event || entry.date || uiCategory,
    description: entry.description,
    content: entry.content,
    images: entry.images.map(img => ({
      src: img.src,
      alt: img.alt,
      caption: img.title || img.caption || entry.title,
      description: img.description || img.caption || entry.title,
    })),
    category: uiCategory,
    date: entry.date,
    featured: entry.featured,
    displayOrder: entry.order,
    tags: entry.tags,
    faqs: entry.faqs,
  };
}

/**
 * Comprehensive portfolio data sourced from centralized mock data
 * Filters out entries with invalid figma:asset/ URLs for browser compatibility
 */
export const UNIFIED_PORTFOLIO_DATA: UnifiedPortfolioEntry[] = allPortfolioWork
  .filter(hasValidImageURLs)
  .map(transformEntry);

// Development analytics removed — bundler cannot safely access import.meta.env at top-level

/**
 * Get portfolio entries filtered by category
 * 
 * @param categoryId - Category ID to filter by ('all' returns all entries)
 * @param featuredOnly - Whether to return only featured entries
 * @param limit - Maximum number of entries to return
 * @returns Filtered and sorted portfolio entries
 */
export function getPortfolioByCategory(
  categoryId: string = 'all',
  featuredOnly: boolean = false,
  limit?: number
): UnifiedPortfolioEntry[] {
  let filteredEntries = UNIFIED_PORTFOLIO_DATA;

  // Filter by category
  if (categoryId !== 'all') {
    filteredEntries = filteredEntries.filter(entry => entry.category === categoryId);
  }

  // Filter by featured status
  if (featuredOnly) {
    filteredEntries = filteredEntries.filter(entry => entry.featured === true);
  }

  // Sort by display order
  filteredEntries = filteredEntries.sort((a, b) => {
    const orderA = a.displayOrder || 999;
    const orderB = b.displayOrder || 999;
    return orderA - orderB;
  });

  // Apply limit if specified
  if (limit && limit > 0) {
    filteredEntries = filteredEntries.slice(0, limit);
  }

  return filteredEntries;
}

/**
 * Get featured portfolio entries for homepage display
 * Returns the top 6 featured entries across all categories
 */
export function getFeaturedPortfolioEntries(limit: number = 6): UnifiedPortfolioEntry[] {
  const featuredEntries = getPortfolioByCategory('all', true, limit);
  return featuredEntries;
}

/**
 * Get portfolio entry by ID
 * 
 * @param id - Portfolio entry ID
 * @returns Portfolio entry or undefined if not found
 */
export function getPortfolioEntryById(id: string): UnifiedPortfolioEntry | undefined {
  return UNIFIED_PORTFOLIO_DATA.find(entry => entry.id === id || entry.slug === id);
}

/**
 * Get portfolio categories for filtering UI
 * 
 * @returns Array of portfolio categories with metadata
 */
export function getPortfolioCategories() {
  return PORTFOLIO_CATEGORIES;
}

/**
 * Get portfolio statistics for analytics
 * 
 * @returns Portfolio statistics object
 */
export function getPortfolioStats() {
  const totalEntries = UNIFIED_PORTFOLIO_DATA.length;
  const featuredEntries = UNIFIED_PORTFOLIO_DATA.filter(entry => entry.featured).length;
  const categoryCounts = PORTFOLIO_CATEGORIES.reduce((acc, category) => {
    if (category.id === 'all') return acc;
    acc[category.id] = getPortfolioByCategory(category.id).length;
    return acc;
  }, {} as Record<string, number>);

  return {
    totalEntries,
    featuredEntries,
    categoryCounts,
    categories: PORTFOLIO_CATEGORIES.length - 1, // Exclude 'all' category
  };
}