/**
 * @fileoverview Mock data for video categories
 * @module data/mock/videos/categories
 * @version 4.0.0 - Expanded from 1 to 10 categories (Content Expansion Phase 8, Sub-audit 6)
 */

import { VideoCategory } from '../../types/videos';

export const videoCategories: VideoCategory[] = [
  {
    id: 'creative',
    name: 'Creative',
    slug: 'creative',
    description: 'Creative projects, animations, and experimental visual art.',
    count: 1,
  },
  {
    id: 'festival',
    name: 'Festival',
    slug: 'festival',
    description: 'Festival experiences, UV painting highlight reels, and dancefloor documentation.',
    count: 1,
  },
  {
    id: 'tutorial',
    name: 'Tutorial',
    slug: 'tutorial',
    description: 'Educational content, how-to guides, and technique breakdowns.',
    count: 3,
  },
  {
    id: 'cycling',
    name: 'Cycling',
    slug: 'cycling',
    description: 'Cycling adventures, bikepacking journeys, and endurance rides.',
    count: 3,
  },
  {
    id: 'behind-the-scenes',
    name: 'Behind-the-Scenes',
    slug: 'behind-the-scenes',
    description: 'The reality behind the art: setup, process, and festival logistics.',
    count: 1,
  },
  {
    id: 'documentary',
    name: 'Documentary',
    slug: 'documentary',
    description: 'Documentary-style explorations of culture, process, and identity.',
    count: 5,
  },
  {
    id: 'web-dev',
    name: 'Web Dev',
    slug: 'web-dev',
    description: 'WordPress development, design systems, and code time-lapses.',
    count: 1,
  },
  {
    id: 'lifestyle',
    name: 'Lifestyle',
    slug: 'lifestyle',
    description: 'Day-in-the-life vlogs, remote work routines, and personal rituals.',
    count: 1,
  },
  {
    id: 'fitness',
    name: 'Fitness',
    slug: 'fitness',
    description: 'Triathlon training, Muay Thai, and the body-as-tool philosophy.',
    count: 1,
  },
];
