/**
 * @fileoverview Centralised search service
 * Searches across all content types: blog, portfolio, videos, podcasts, pages
 *
 * BUNDLER SAFETY: No optional chaining (?.) or nullish coalescing (??)
 *
 * @module utils/searchService
 * @version 1.1.0 - Bundler-safe: removed all ?. and ??
 */

import { SearchResult, SearchFilters } from '../data/types/search';
import { blogPosts } from '../data/mock/blog/posts';
import { allPortfolioWork } from '../data/mock/portfolio/index';

/**
 * Scores how well a query matches a string (0-100)
 */
function scoreMatch(text: string, query: string): number {
  if (!text || !query) return 0;
  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();

  if (lowerText === lowerQuery) return 100;
  if (lowerText.startsWith(lowerQuery)) return 80;
  if (lowerText.includes(lowerQuery)) return 60;

  /* check individual words */
  const words = lowerQuery.split(/\s+/);
  const matched = words.filter(w => lowerText.includes(w));
  if (matched.length > 0) return (matched.length / words.length) * 40;

  return 0;
}

/** Safe helper to get a string or fallback */
function safeStr(val: string | undefined | null, fallback: string): string {
  if (val !== undefined && val !== null) return val;
  return fallback;
}

/** Safe helper to get an array or empty array */
function safeArr(val: string[] | undefined | null): string[] {
  if (val !== undefined && val !== null) return val;
  return [];
}

/**
 * Search all content types and return unified results
 */
export function searchAllContent(
  query: string,
  filters?: SearchFilters,
): SearchResult[] {
  if (!query || query.trim().length < 2) return [];

  const q = query.trim();
  let results: SearchResult[] = [];

  const filterType = filters ? filters.type : undefined;
  const filterSortBy = filters ? filters.sortBy : undefined;
  const filterCategory = filters ? filters.category : undefined;

  /* ── Blog ── */
  if (!filterType || filterType === 'blog') {
    blogPosts.forEach(post => {
      const titleScore = scoreMatch(post.title, q);
      const excerptScore = scoreMatch(post.excerpt, q) * 0.7;
      const postTags = safeArr(post.tags);
      const tagScore = Math.max(
        0,
        ...postTags.map(t => scoreMatch(t, q) * 0.5),
      );
      const catScore = scoreMatch(safeStr(post.category, ''), q) * 0.4;
      const best = Math.max(titleScore, excerptScore, tagScore, catScore);

      if (best > 0) {
        const featuredImage = post.featuredImage;
        const imageSrc = featuredImage ? featuredImage.src : undefined;
        results.push({
          id: post.id,
          type: 'blog',
          title: post.title,
          excerpt: post.excerpt,
          url: `/blog/${post.slug}`,
          image: imageSrc,
          category: post.category,
          tags: post.tags,
          date: post.publishedAt,
          relevanceScore: best + (post.featured ? 5 : 0),
        });
      }
    });
  }

  /* ── Portfolio ── */
  if (!filterType || filterType === 'portfolio') {
    allPortfolioWork.forEach(entry => {
      const titleScore = scoreMatch(entry.title, q);
      const descScore = scoreMatch(entry.description, q) * 0.7;
      const entryContent = safeStr(entry.content, '');
      const contentScore = scoreMatch(entryContent, q) * 0.5;
      const tagScore = Math.max(
        0,
        ...entry.tags.map(t => scoreMatch(t, q) * 0.5),
      );
      const catScore = scoreMatch(entry.category, q) * 0.4;
      const best = Math.max(titleScore, descScore, contentScore, tagScore, catScore);

      if (best > 0) {
        const images = entry.images;
        const firstImage = images && images.length > 0 ? images[0] : undefined;
        const imageSrc = firstImage ? firstImage.src : undefined;
        results.push({
          id: entry.id,
          type: 'portfolio',
          title: entry.title,
          excerpt: '',
          url: `/portfolio/${entry.slug}`,
          image: imageSrc,
          category: entry.category,
          tags: entry.tags,
          date: entry.date,
          relevanceScore: best + (entry.featured ? 5 : 0),
        });
      }
    });
  }

  /* ── Sort ── */
  const sortBy = filterSortBy ? filterSortBy : 'relevance';
  results.sort((a, b) => {
    switch (sortBy) {
      case 'recent': {
        const dateA = a.date ? a.date : '';
        const dateB = b.date ? b.date : '';
        return dateB.localeCompare(dateA);
      }
      case 'alphabetical':
        return a.title.localeCompare(b.title);
      case 'featured':
        return b.relevanceScore - a.relevanceScore;
      case 'relevance':
      default:
        return b.relevanceScore - a.relevanceScore;
    }
  });

  /* ── Category filter ── */
  if (filterCategory) {
    const lowerFilterCat = filterCategory.toLowerCase();
    results = results.filter(r => {
      const rCat = r.category ? r.category.toLowerCase() : '';
      return rCat === lowerFilterCat;
    });
  }

  return results;
}