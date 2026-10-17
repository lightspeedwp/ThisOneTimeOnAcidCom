/**
 * @fileoverview Dynamic SEO metadata generators
 * Helper functions for generating SEO data for dynamic content pages
 * (blog posts, portfolio entries, videos, podcasts, events, and their archives)
 * 
 * @module data/mock/seo/dynamic
 * @version 1.0.0
 */

import type { SEOData } from '../../../utils/seo';

/**
 * Blog Post SEO Generators
 */

/** Generate SEO for a single blog post */
export function blogPostSEO(title: string, excerpt: string): SEOData {
  return {
    title: title.length > 47 ? title.slice(0, 44) + '\u2026 | Ash Shaw' : title + ' | Insights \u2014 Ash Shaw',
    description: excerpt.length > 155 ? excerpt.slice(0, 152).trimEnd() + '\u2026' : excerpt,
    ogType: 'article',
  };
}

/** Generate SEO for a blog category archive */
export function blogCategorySEO(categoryName: string): SEOData {
  return {
    title: categoryName + ' | Insights \u2014 Ash Shaw',
    description: 'Read Ash Shaw\u2019s ' + categoryName.toLowerCase() + ' articles \u2014 tips, guides, and stories from the world of neon and UV makeup artistry.',
  };
}

/** Generate SEO for a blog tag archive */
export function blogTagSEO(tagName: string): SEOData {
  return {
    title: tagName + ' | Insights \u2014 Ash Shaw',
    description: 'Browse all Ash Shaw blog posts tagged with ' + tagName + ' \u2014 festival makeup insights, tutorials, and creative stories.',
  };
}

/**
 * Portfolio Entry SEO Generators
 */

/** Generate SEO for a single portfolio entry */
export function portfolioEntrySEO(title: string, description: string): SEOData {
  var desc = description;
  if (!desc) {
    desc = 'Explore ' + title + ' from Ash Shaw\u2019s neon and UV makeup art portfolio.';
  }
  return {
    title: title.length > 42 ? title.slice(0, 39) + '\u2026 | Portfolio' : title + ' | Portfolio \u2014 Ash Shaw',
    description: desc.length > 155 ? desc.slice(0, 152).trimEnd() + '\u2026' : desc,
  };
}

/** Generate SEO for a portfolio category archive */
export function portfolioCategorySEO(categoryName: string): SEOData {
  return {
    title: categoryName + ' | Portfolio \u2014 Ash Shaw',
    description: 'Browse Ash Shaw\u2019s ' + categoryName.toLowerCase() + ' makeup art \u2014 neon face paint, UV-reactive designs, and festival looks.',
  };
}

/** Generate SEO for a portfolio tag archive */
export function portfolioTagSEO(tagName: string): SEOData {
  return {
    title: tagName + ' | Portfolio \u2014 Ash Shaw',
    description: 'View all portfolio entries tagged with ' + tagName + ' in Ash Shaw\u2019s neon and UV makeup art collection.',
  };
}

/**
 * Video SEO Generators
 */

/** Generate SEO for a single video */
export function videoSEO(title: string, description: string): SEOData {
  return {
    title: title.length > 44 ? title.slice(0, 41) + '\u2026 | Videos' : title + ' | Videos \u2014 Ash Shaw',
    description: description.length > 155 ? description.slice(0, 152).trimEnd() + '\u2026' : description,
    ogType: 'video.other',
  };
}

/** Generate SEO for a video category archive */
export function videoCategorySEO(categoryName: string): SEOData {
  return {
    title: categoryName + ' | Videos \u2014 Ash Shaw',
    description: 'Watch Ash Shaw\u2019s ' + categoryName.toLowerCase() + ' videos \u2014 tutorials, behind-the-scenes content, and creative process from the neon makeup studio.',
  };
}

/** Generate SEO for a video tag archive */
export function videoTagSEO(tagName: string): SEOData {
  return {
    title: tagName + ' | Videos \u2014 Ash Shaw',
    description: 'Browse all Ash Shaw videos tagged with ' + tagName + ' \u2014 makeup tutorials, festival content, and UV art process.',
  };
}

/**
 * Podcast SEO Generators
 */

/** Generate SEO for a single podcast episode */
export function podcastSEO(title: string, description: string): SEOData {
  return {
    title: title.length > 42 ? title.slice(0, 39) + '\u2026 | Podcasts' : title + ' | Podcasts \u2014 Ash Shaw',
    description: description.length > 155 ? description.slice(0, 152).trimEnd() + '\u2026' : description,
  };
}

/** Generate SEO for a podcast category archive */
export function podcastCategorySEO(categoryName: string): SEOData {
  return {
    title: categoryName + ' | Podcasts \u2014 Ash Shaw',
    description: 'Listen to Ash Shaw\u2019s ' + categoryName.toLowerCase() + ' podcast episodes \u2014 stories, interviews, and insights from the psytrance art community.',
  };
}

/** Generate SEO for a podcast tag archive */
export function podcastTagSEO(tagName: string): SEOData {
  return {
    title: tagName + ' | Podcasts \u2014 Ash Shaw',
    description: 'Browse all podcast episodes tagged with ' + tagName + ' from Ash Shaw\u2019s Neon vs Atomic Black series.',
  };
}

/**
 * Event SEO Generators
 */

/** Generate SEO for a single event detail page */
export function eventDetailSEO(name: string, description: string): SEOData {
  var desc = description;
  if (!desc) {
    desc = 'Explore ' + name + ' \u2014 a creative event where Ash Shaw showcases neon and UV makeup art.';
  }
  return {
    title: name.length > 42 ? name.slice(0, 39) + '\u2026 | Events' : name + ' | Events \u2014 Ash Shaw',
    description: desc.length > 155 ? desc.slice(0, 152).trimEnd() + '\u2026' : desc,
  };
}

/** Generate SEO for an event category archive */
export function eventCategorySEO(categoryName: string): SEOData {
  return {
    title: categoryName + ' | Events \u2014 Ash Shaw',
    description: 'Browse Ash Shaw\u2019s ' + categoryName.toLowerCase() + ' appearances \u2014 festivals, club nights, and creative gatherings featuring neon and UV art.',
  };
}

/** Generate SEO for an event tag archive */
export function eventTagSEO(tagName: string): SEOData {
  return {
    title: tagName + ' | Events \u2014 Ash Shaw',
    description: 'View all events tagged with ' + tagName + ' from Ash Shaw\u2019s neon and UV makeup art journey.',
  };
}
