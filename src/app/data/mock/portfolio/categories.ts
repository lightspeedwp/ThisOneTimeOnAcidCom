/**
 * @fileoverview Structured portfolio category data
 * Derived from PORTFOLIO_CATEGORIES in portfolioService but as standalone data
 *
 * @module data/mock/portfolio/categories
 * @version 3.0.0 - Removed stale hardcoded counts; dynamic counts from contentCounts.ts
 */

import { PortfolioCategoryData } from '../../types/portfolio';

export const portfolioCategoryData: PortfolioCategoryData[] = [
  {
    id: 'Festival Makeup',
    name: 'Festival',
    slug: 'festival',
    description: 'Vibrant festival artistry and celebration makeup from global psytrance events.',
    count: 0,
    neonColor: 'var(--wp--preset--color--neon-green)',
  },
  {
    id: 'UV Makeup',
    name: 'UV & Blacklight',
    slug: 'uv-blacklight',
    description: 'Electric nightlife artistry with UV-reactive paints designed for the trance floor.',
    count: 0,
    neonColor: 'var(--wp--preset--color--neon-blue)',
  },
  {
    id: 'Swiss Festivals',
    name: 'Swiss Festivals',
    slug: 'swiss-festivals',
    description: 'Alpine festival experiences and mountain celebrations at Shankra and Reiserfieber.',
    count: 0,
    neonColor: 'var(--wp--preset--color--neon-cyan)',
  },
  {
    id: 'Fusion Nails',
    name: 'Fusion Nails',
    slug: 'fusion-nails',
    description: 'Creative nail artistry with vibrant psychedelic designs and colour explosions.',
    count: 0,
    neonColor: 'var(--wp--preset--color--neon-pink)',
  },
  {
    id: 'Thailand Adventures',
    name: 'Thailand',
    slug: 'thailand',
    description: 'Tropical festival experiences and cultural immersion across Southeast Asia.',
    count: 0,
    neonColor: 'var(--wp--preset--color--neon-orange)',
  },
];