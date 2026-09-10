/**
 * @fileoverview SEO metadata barrel export
 * Aggregates all SEO data modules for centralized access
 * 
 * @module data/mock/seo
 * @version 1.0.0
 */

// Re-export all static page SEO
export { siteDefault, pageSEO } from './pages';

// Re-export all dev tools SEO
export { devToolsSEO } from './dev-tools';

// Re-export all dynamic content helpers
export {
  blogPostSEO,
  blogCategorySEO,
  blogTagSEO,
  portfolioEntrySEO,
  portfolioCategorySEO,
  portfolioTagSEO,
  videoSEO,
  videoCategorySEO,
  videoTagSEO,
  podcastSEO,
  podcastCategorySEO,
  podcastTagSEO,
  eventDetailSEO,
  eventCategorySEO,
  eventTagSEO,
} from './dynamic';
