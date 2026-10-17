/**
 * @fileoverview Blog categories and tags
 * Organization system for blog content
 * 
 * @module data/mock/blog/categories
 * @author Ash Shaw Portfolio Team
 * @version 2.0.0 - Removed empty categories and stale hardcoded counts
 */

import { BlogCategory } from '../../types';

/**
 * Blog Categories
 * Main categorization for blog posts
 * Only categories with actual posts are listed.
 * Dynamic counts are computed by /utils/contentCounts.ts
 * 
 * @constant {BlogCategory[]}
 */
export const blogCategories: BlogCategory[] = [
  {
    id: 'makeup-tips',
    name: 'Makeup Tips',
    slug: 'makeup-tips',
    description: 'Expert tips and tricks for creating stunning makeup looks',
    count: 0,
    color: 'var(--wp--preset--color--neon-pink)'
  },
  {
    id: 'tutorials',
    name: 'Tutorials',
    slug: 'tutorials',
    description: 'Step-by-step guides for mastering makeup techniques',
    count: 0,
    color: 'var(--wp--preset--color--neon-purple)'
  },
  {
    id: 'festival-tips',
    name: 'Festival Tips',
    slug: 'festival-tips',
    description: 'Everything you need for festival makeup success',
    count: 0,
    color: 'var(--wp--preset--color--neon-orange)'
  },
  {
    id: 'travel',
    name: 'Travel',
    slug: 'travel',
    description: 'Adventures and experiences from Cape Town, Berlin, Koh Phangan, and beyond',
    count: 0,
    color: 'var(--wp--preset--color--neon-cyan)'
  },
  {
    id: 'education',
    name: 'Education',
    slug: 'education',
    description: 'Learn the theory and science behind great makeup, WordPress, and AI workflows',
    count: 0,
    color: 'var(--wp--preset--color--neon-blue)'
  },
  {
    id: 'insights',
    name: 'Insights',
    slug: 'insights',
    description: 'Personal reflections, ADHD perspectives, and lessons from the dancefloor',
    count: 0,
    color: 'var(--wp--preset--color--neon-yellow)'
  },
  {
    id: 'festival',
    name: 'Festival',
    slug: 'festival',
    description: 'Festival culture, dancefloor stories, and scene reflections',
    count: 0,
    color: 'var(--wp--preset--color--neon-green)'
  },
  {
    id: 'sustainability',
    name: 'Sustainability',
    slug: 'sustainability',
    description: 'Eco-friendly practices, responsible art, and environmental awareness',
    count: 0,
    color: 'var(--wp--preset--color--neon-red)'
  },
];

/**
 * Popular Blog Tags
 * Tags that appear across multiple blog posts
 * 
 * @constant {string[]}
 */
export const popularTags = [
  'Psytrance',
  'Festival',
  'Thailand',
  'Travel',
  'UV Makeup',
  'Cycling',
  'Berlin',
  'ADHD',
  'Tips',
  'Makeup Tips',
  'LightSpeed',
  'Community',
  'Personal',
  'Neon',
  'Eco-Friendly',
];

/**
 * All Available Tags
 * Tags actually used in blog posts
 * 
 * @constant {string[]}
 */
export const allTags = [
  // Makeup Types
  'UV Makeup',
  'Blacklight',
  'Neon',

  // Techniques
  'Tutorial',
  'Technique',
  'Tips',
  'Makeup Tips',

  // Products & Tools
  'Long-Lasting',
  'Eco-Friendly',
  'Sustainability',
  'Green',

  // Events & Locations
  'Festival',
  'Festivals',
  'Psytrance',
  'Techno',
  'Rave',
  'Berlin',
  'Thailand',
  'Koh Phangan',
  'Cape Town',
  'Oregon',
  'Origin Festival',
  'AfricaBurn',
  'WordCamp',
  'Basel',
  'Travel',
  'Tropical',

  // Activities
  'Cycling',
  'Bike Packing',
  'Muay Thai',
  'Training',
  'Fitness',
  'Adventure',
  'Endurance',

  // Business & Tech
  'LightSpeed',
  'WordPress',
  'Entrepreneurship',
  'Business',
  'Open Source',
  'AI',
  'GitHub Copilot',
  'Workflow',
  'Technology',

  // Concepts
  'Color Theory',
  'Education',
  'Artistry',
  'Creativity',
  'Art',
  'Transformation',
  'Discovery',

  // Personal & Identity
  'ADHD',
  'Neurodivergence',
  'Identity',
  'Self-awareness',
  'Mental Health',
  'Personal',
  'Childhood',
  'Gratitude',
  'Resilience',
  'Autonomy',

  // Specific Elements
  'Glitter',
  'Costumes',
  'Visibility',

  // Life & Lifestyle
  'Community',
  'Tribes',
  'Relationships',
  'Dancefloor',
  'Island Life',
  'Lifestyle',
  'COVID',
  'Water',
  'Desert',

  // Cats & Garden
  'Six Cats',
  'Cats',
  'Cannabis',
  'Organic',
  'Cultivation',
  'Loss',

  // Content
  'Book',
  'Writing',
  'Storytelling',
  'Aquarius',

  // Essentials
  'Packing List',
  'Essentials',

  // Events
  'Birthday',
  'Survival',
  'Experience',
  'Solar Eclipse',
  'Solipse',
  'Zambia',
];