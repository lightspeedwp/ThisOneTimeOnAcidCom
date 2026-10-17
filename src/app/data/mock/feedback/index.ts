/**
 * @fileoverview Feedback (testimonials) data
 * Each piece of feedback is tagged with portfolio categories and tags
 * so testimonials can appear dynamically on relevant portfolio pages.
 *
 * @module data/mock/feedback
 * @version 1.1.0 — Type extracted to /data/types/feedback.ts
 */

import type { FeedbackItem } from '../../types/feedback';

export type { FeedbackItem };

export const feedbackItems: FeedbackItem[] = [
  {
    id: 'fb-1',
    name: 'Luna M.',
    location: 'Berlin, Germany',
    categorySlug: 'festival',
    tags: ['uv', 'neon', 'psytrance', 'berlin'],
    quote: 'Ash painted my face on the dancefloor at a club night in Berlin and I literally felt like a different person. The UV paint was still glowing at 6am. Absolute magic.',
    rating: 5,
    date: '2025-09-14',
    event: 'Kater Blau Open Air',
    featured: true,
  },
  {
    id: 'fb-2',
    name: 'Tomás R.',
    location: 'Zurich, Switzerland',
    categorySlug: 'swiss-festivals',
    tags: ['festival', 'tribal', 'shankra'],
    quote: 'I saw him painting at Shankra and knew I had to get one. He read my vibe perfectly — geometric tribal lines that matched the music. The guy just gets it.',
    rating: 5,
    date: '2025-07-22',
    event: 'Shankra Festival',
    featured: true,
  },
  {
    id: 'fb-3',
    name: 'Yuki S.',
    location: 'Tokyo, Japan',
    categorySlug: 'festival',
    tags: ['neon', 'geometric', 'festival', 'thailand'],
    quote: 'Met Ash at a full moon party in Thailand. He created this incredible third-eye design that glowed under the UV lights. Everyone was asking where I got it done!',
    rating: 5,
    date: '2025-12-30',
    event: 'Full Moon Party, Koh Phangan',
    featured: false,
  },
  {
    id: 'fb-4',
    name: 'Elara K.',
    location: 'Amsterdam, Netherlands',
    categorySlug: 'uv-blacklight',
    tags: ['uv', 'blacklight', 'neon', 'berlin'],
    quote: 'The way Ash works with UV pigments is next level. He did this layered glow effect that looked completely different under normal light vs blacklight. Genuinely impressive artistry.',
    rating: 5,
    date: '2025-11-05',
    event: 'about:blank Berlin',
    featured: true,
  },
  {
    id: 'fb-5',
    name: 'Marco P.',
    location: 'Milan, Italy',
    categorySlug: 'festival',
    tags: ['festival', 'neon', 'psytrance'],
    quote: 'Ash is the kind of artist who makes the festival experience complete. His energy is contagious — he was dancing AND painting at the same time. The result was this wild neon explosion on my face.',
    rating: 4,
    date: '2025-08-18',
    event: 'Ozora Festival',
    featured: false,
  },
  {
    id: 'fb-6',
    name: 'Sasha N.',
    location: 'Berlin, Germany',
    categorySlug: 'fusion-nails',
    tags: ['nail-art', 'neon', 'berlin'],
    quote: 'Got my nails done by Ash before a rave and they were the highlight of my outfit. Psychedelic swirls in UV green and pink — they glowed under every light in the club.',
    rating: 5,
    date: '2026-01-12',
    featured: false,
  },
  {
    id: 'fb-7',
    name: 'Kai W.',
    location: 'Bern, Switzerland',
    categorySlug: 'swiss-festivals',
    tags: ['festival', 'swiss', 'reiserfieber', 'tribal'],
    quote: 'Found Ash at Reiserfieber in the mountains. He painted this intricate pattern around my eyes — half tribal, half celestial. People kept stopping me to take photos. He does it purely for the art.',
    rating: 5,
    date: '2025-06-15',
    event: 'Reiserfieber Festival',
    featured: true,
  },
  {
    id: 'fb-8',
    name: 'Freya L.',
    location: 'Copenhagen, Denmark',
    categorySlug: 'festival',
    tags: ['neon', 'body-art', 'festival'],
    quote: 'Ash did a full arm piece for me at a festival — flowing neon vines and flowers. It lasted through two days of dancing. The man is an absolute legend.',
    rating: 5,
    date: '2025-07-30',
    featured: false,
  },
  {
    id: 'fb-9',
    name: 'Diego F.',
    location: 'Barcelona, Spain',
    categorySlug: 'uv-blacklight',
    tags: ['uv', 'third-eye', 'geometric'],
    quote: 'I asked for something simple and he gave me a whole cosmic experience. Third-eye design with geometric fractals radiating outward. Under UV it looked like I was from another dimension.',
    rating: 5,
    date: '2025-10-22',
    featured: false,
  },
  {
    id: 'fb-10',
    name: 'Anya V.',
    location: 'Chiang Mai, Thailand',
    categorySlug: 'thailand',
    tags: ['thailand', 'jungle', 'neon', 'festival'],
    quote: 'Watched Ash paint face after face in the jungle at a gathering near Chiang Mai. He works with such flow — ambidextrous, fast, and every design was unique. Pure talent and pure heart.',
    rating: 5,
    date: '2026-01-28',
    event: 'Jungle Gathering, Chiang Mai',
    featured: true,
  },
];

/**
 * Get feedback items filtered by portfolio category slug
 */
export function getFeedbackByCategory(categorySlug: string): FeedbackItem[] {
  if (!categorySlug || categorySlug === 'all') return feedbackItems;
  return feedbackItems.filter(fb => fb.categorySlug === categorySlug);
}

/**
 * Get feedback items filtered by portfolio tag slug
 */
export function getFeedbackByTag(tagSlug: string): FeedbackItem[] {
  return feedbackItems.filter(fb => fb.tags.includes(tagSlug));
}

/**
 * Get featured feedback items
 */
export function getFeaturedFeedback(): FeedbackItem[] {
  return feedbackItems.filter(fb => fb.featured);
}

/**
 * Get feedback for a specific portfolio entry by matching its category and tags
 */
export function getFeedbackForPortfolioEntry(
  categoryId: string,
  entryTags: string[] = []
): FeedbackItem[] {
  // Map portfolio category IDs to feedback category slugs
  const categorySlugMap: Record<string, string> = {
    'Festival Makeup': 'festival',
    'UV Makeup': 'uv-blacklight',
    'Swiss Festivals': 'swiss-festivals',
    'Fusion Nails': 'fusion-nails',
    'Thailand Adventures': 'thailand',
  };

  const feedbackSlug = categorySlugMap[categoryId] || categoryId;

  // Find feedback matching category OR overlapping tags
  return feedbackItems.filter(fb => {
    const categoryMatch = fb.categorySlug === feedbackSlug;
    const tagMatch = entryTags.some(t =>
      fb.tags.includes(t.toLowerCase().replace(/\s+/g, '-'))
    );
    return categoryMatch || tagMatch;
  });
}