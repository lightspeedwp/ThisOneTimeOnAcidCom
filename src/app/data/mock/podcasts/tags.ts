/**
 * @fileoverview Podcast tags as structured data with slugs
 * @module data/mock/podcasts/tags
 * @version 2.0.0 - PodcastTag interface moved to /data/types/podcast.ts
 */

import { PodcastTag } from '../../types/podcast';

/**
 * Structured podcast tags with slugs for routing
 */
export const podcastTags: PodcastTag[] = [
  { id: 'introduction', name: 'Introduction', slug: 'introduction', description: 'Introductory episodes and welcome content' },
  { id: 'psytrance', name: 'Psytrance', slug: 'psytrance', description: 'Psytrance culture and music' },
  { id: 'uv-makeup', name: 'UV Makeup', slug: 'uv-makeup', description: 'UV-reactive and blacklight makeup artistry' },
  { id: 'berlin', name: 'Berlin', slug: 'berlin', description: 'Berlin club culture and seasonal adventures' },
];

/**
 * Convert tag name to slug
 */
export function podcastTagNameToSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

/**
 * Find podcast tag by slug
 */
export function findPodcastTagBySlug(slug: string): PodcastTag | undefined {
  return podcastTags.find(t => t.slug === slug);
}