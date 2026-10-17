/**
 * @fileoverview SEO metadata re-export (for backward compatibility)
 * 
 * All SEO data has been split into modular files:
 * - /data/mock/seo/pages.ts — Main site pages + about sub-pages
 * - /data/mock/seo/dev-tools.ts — Developer tools hub + 24 sub-tools
 * - /data/mock/seo/dynamic.ts — Dynamic content generators (blog/portfolio/video/podcast/event)
 * 
 * This file re-exports everything from the barrel for backward compatibility.
 * Future imports can use either:
 * - `from './seo'` (current imports, no changes needed)
 * - `from './seo/pages'` (direct module imports for better tree-shaking)
 * 
 * @module data/mock/seo
 * @version 2.0.0 (modular split)
 */

export {
  siteDefault,
  pageSEO,
  devToolsSEO,
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
} from './seo/index';
