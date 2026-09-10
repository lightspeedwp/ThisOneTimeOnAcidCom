/**
 * @fileoverview Podcast categories mock data
 * @module data/mock/podcasts/categories
 */

import { PodcastCategory } from '../../types/podcast';

export const podcastCategories: PodcastCategory[] = [
  {
    id: 'introduction',
    name: 'Introduction',
    slug: 'introduction',
    description: 'Meet Ash Shaw and learn about the podcast',
    count: 1,
    color: 'var(--wp--preset--color--neon-pink)'
  },
];