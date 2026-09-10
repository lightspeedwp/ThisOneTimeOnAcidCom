/**
 * @fileoverview Centralized dynamic content count utility
 *
 * Computes blog category counts, blog tag counts, and portfolio category
 * counts from actual mock data at import time. Every consumer reads from
 * a single source of truth so counts stay consistent site-wide.
 *
 * BUNDLER SAFETY: No optional chaining (?.) or nullish coalescing (??)
 *
 * @module utils/contentCounts
 * @author Ash Shaw Portfolio Team
 * @version 1.1.0
 */

import { blogPosts } from '../data/mock/blog/posts';
import { blogCategories } from '../data/mock/blog/categories';
import {
  PORTFOLIO_CATEGORIES,
  UNIFIED_PORTFOLIO_DATA,
} from './portfolioService';
import { podcastEpisodes } from '../data/mock/podcasts/episodes';
import { podcastCategories } from '../data/mock/podcasts/categories';
import { videos, videoCategories } from '../data/mock/videos';

/** Safe fallback for undefined counts */
function safeCount(counts: Record<string, number>, key: string): number {
  const val = counts[key];
  return val !== undefined ? val : 0;
}

/** Safe tag/category string trimming */
function safeTrim(val: string | undefined | null): string {
  if (!val) return '';
  return val.trim();
}

/** Safe tags array access */
function safeTags(tags: string[] | undefined | null): string[] {
  if (!tags) return [];
  return tags;
}

/* ────────────────────────────────────────────
   Blog Category Counts
   ──────────────────────────────────────────── */

export const blogCategoryCounts: Record<string, number> = (() => {
  const counts: Record<string, number> = {};

  blogCategories.forEach((cat) => {
    counts[cat.name] = 0;
  });

  blogPosts.forEach((post) => {
    const postCat = safeTrim(post.category);
    if (!postCat) return;

    if (counts[postCat] !== undefined) {
      counts[postCat] += 1;
      return;
    }

    const key = Object.keys(counts).find(
      (k) => k.toLowerCase() === postCat.toLowerCase(),
    );
    if (key) {
      counts[key] += 1;
    }
  });

  return counts;
})();

export function getBlogCategoryCount(categoryName: string): number {
  return safeCount(blogCategoryCounts, categoryName);
}

/* ────────────────────────────────────────────
   Blog Tag Counts
   ──────────────────────────────────────────── */

export const blogTagCounts: Record<string, number> = (() => {
  const counts: Record<string, number> = {};

  blogPosts.forEach((post) => {
    const tags = safeTags(post.tags);
    tags.forEach((tag) => {
      const normalised = tag.trim();
      if (!normalised) return;

      const existing = Object.keys(counts).find(
        (k) => k.toLowerCase() === normalised.toLowerCase(),
      );
      if (existing) {
        counts[existing] += 1;
      } else {
        counts[normalised] = 1;
      }
    });
  });

  return counts;
})();

export function getBlogTagCount(tagName: string): number {
  const key = Object.keys(blogTagCounts).find(
    (k) => k.toLowerCase() === tagName.toLowerCase(),
  );
  return key ? blogTagCounts[key] : 0;
}

/* ────────────────────────────────────────────
   Portfolio Category Counts
   ──────────────────────────────────────────── */

export const portfolioCategoryCounts: Record<string, number> = (() => {
  const counts: Record<string, number> = {};

  PORTFOLIO_CATEGORIES.forEach((cat) => {
    if (cat.id === 'all') {
      counts[cat.id] = UNIFIED_PORTFOLIO_DATA.length;
    } else {
      counts[cat.id] = UNIFIED_PORTFOLIO_DATA.filter(
        (entry) => entry.category === cat.id,
      ).length;
    }
  });

  return counts;
})();

export function getPortfolioCategoryCount(categoryId: string): number {
  return safeCount(portfolioCategoryCounts, categoryId);
}

/* ────────────────────────────────────────────
   Portfolio Tag Counts
   ──────────────────────────────────────────── */

export const portfolioTagCounts: Record<string, number> = (() => {
  const counts: Record<string, number> = {};

  UNIFIED_PORTFOLIO_DATA.forEach((entry) => {
    const tags = safeTags(entry.tags);
    tags.forEach((tag) => {
      const normalised = tag.trim();
      if (!normalised) return;

      const existing = Object.keys(counts).find(
        (k) => k.toLowerCase() === normalised.toLowerCase(),
      );
      if (existing) {
        counts[existing] += 1;
      } else {
        counts[normalised] = 1;
      }
    });
  });

  return counts;
})();

export function getPortfolioTagCount(tagName: string): number {
  const key = Object.keys(portfolioTagCounts).find(
    (k) => k.toLowerCase() === tagName.toLowerCase(),
  );
  return key ? portfolioTagCounts[key] : 0;
}

/* ────────────────────────────────────────────
   Podcast Category Counts
   ──────────────────────────────────────────── */

export const podcastCategoryCounts: Record<string, number> = (() => {
  const counts: Record<string, number> = {};

  podcastCategories.forEach((cat) => {
    counts[cat.name] = 0;
  });

  podcastEpisodes.forEach((ep) => {
    const cat = safeTrim(ep.category);
    if (!cat) return;

    if (counts[cat] !== undefined) {
      counts[cat] += 1;
      return;
    }

    const key = Object.keys(counts).find(
      (k) => k.toLowerCase() === cat.toLowerCase(),
    );
    if (key) {
      counts[key] += 1;
    }
  });

  return counts;
})();

export function getPodcastCategoryCount(categoryName: string): number {
  return safeCount(podcastCategoryCounts, categoryName);
}

/* ────────────────────────────────────────────
   Video Category Counts
   ──────────────────────────────────────────── */

export const videoCategoryCounts: Record<string, number> = (() => {
  const counts: Record<string, number> = {};

  videoCategories.forEach((cat) => {
    counts[cat.name] = 0;
  });

  videos.forEach((v) => {
    const cat = safeTrim(v.category);
    if (!cat) return;

    if (counts[cat] !== undefined) {
      counts[cat] += 1;
      return;
    }

    const key = Object.keys(counts).find(
      (k) => k.toLowerCase() === cat.toLowerCase(),
    );
    if (key) {
      counts[key] += 1;
    }
  });

  return counts;
})();

export function getVideoCategoryCount(categoryName: string): number {
  return safeCount(videoCategoryCounts, categoryName);
}

/* ────────────────────────────────────────────
   Video Tag Counts
   ──────────────────────────────────────────── */

export const videoTagCounts: Record<string, number> = (() => {
  const counts: Record<string, number> = {};

  videos.forEach((v) => {
    const tags = safeTags(v.tags);
    tags.forEach((tag) => {
      const normalised = tag.trim();
      if (!normalised) return;

      const existing = Object.keys(counts).find(
        (k) => k.toLowerCase() === normalised.toLowerCase(),
      );
      if (existing) {
        counts[existing] += 1;
      } else {
        counts[normalised] = 1;
      }
    });
  });

  return counts;
})();

export function getVideoTagCount(tagName: string): number {
  const key = Object.keys(videoTagCounts).find(
    (k) => k.toLowerCase() === tagName.toLowerCase(),
  );
  return key ? videoTagCounts[key] : 0;
}

/* ────────────────────────────────────────────
   Podcast Tag Counts
   ──────────────────────────────────────────── */

export const podcastTagCounts: Record<string, number> = (() => {
  const counts: Record<string, number> = {};

  podcastEpisodes.forEach((ep) => {
    const tags = safeTags(ep.tags);
    tags.forEach((tag) => {
      const normalised = tag.trim();
      if (!normalised) return;

      const existing = Object.keys(counts).find(
        (k) => k.toLowerCase() === normalised.toLowerCase(),
      );
      if (existing) {
        counts[existing] += 1;
      } else {
        counts[normalised] = 1;
      }
    });
  });

  return counts;
})();

export function getPodcastTagCount(tagName: string): number {
  const key = Object.keys(podcastTagCounts).find(
    (k) => k.toLowerCase() === tagName.toLowerCase(),
  );
  return key ? podcastTagCounts[key] : 0;
}

/* ────────────────────────────────────────────
   Event Category Counts
   ──────────────────────────────────────────── */

import { allEvents } from '../data/mock/events';
import { eventCategories as eventCats } from '../data/mock/events/categories';

export const eventCategoryCounts: Record<string, number> = (() => {
  const counts: Record<string, number> = {};
  eventCats.forEach((cat) => {
    counts[cat.slug] = allEvents.filter((e) => e.type === cat.slug).length;
  });
  return counts;
})();

export function getEventCategoryCount(categorySlug: string): number {
  return safeCount(eventCategoryCounts, categorySlug);
}

/* ────────────────────────────────────────────
   Event Tag Counts
   ──────────────────────────────────────────── */

export const eventTagCounts: Record<string, number> = (() => {
  const counts: Record<string, number> = {};

  allEvents.forEach((event) => {
    const tags = safeTags(event.tags);
    tags.forEach((tag) => {
      const normalised = tag.trim();
      if (!normalised) return;

      const existing = Object.keys(counts).find(
        (k) => k.toLowerCase() === normalised.toLowerCase(),
      );
      if (existing) {
        counts[existing] += 1;
      } else {
        counts[normalised] = 1;
      }
    });
  });

  return counts;
})();

export function getEventTagCount(tagName: string): number {
  const key = Object.keys(eventTagCounts).find(
    (k) => k.toLowerCase() === tagName.toLowerCase(),
  );
  return key ? eventTagCounts[key] : 0;
}