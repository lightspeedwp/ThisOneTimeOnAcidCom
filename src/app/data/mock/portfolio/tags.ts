/**
 * @fileoverview Structured portfolio tag data
 * Tags derived from PortfolioEntry.tags arrays across all entries
 *
 * @module data/mock/portfolio/tags
 * @version 2.0.0 - PortfolioTagData interface moved to /data/types/portfolio.ts
 */

import { PortfolioTagData } from '../../types/portfolio';

export const portfolioTagData: PortfolioTagData[] = [
  { id: 'uv', name: 'UV', slug: 'uv', description: 'UV-reactive and blacklight makeup' },
  { id: 'neon', name: 'Neon', slug: 'neon', description: 'Neon colour palettes and vibrant accents' },
  { id: 'geometric', name: 'Geometric', slug: 'geometric', description: 'Geometric lines and sharp symmetry' },
  { id: 'festival', name: 'Festival', slug: 'festival', description: 'Festival-ready face and body art' },
  { id: 'psytrance', name: 'Psytrance', slug: 'psytrance', description: 'Psytrance culture-inspired looks' },
  { id: 'thailand', name: 'Thailand', slug: 'thailand', description: 'Art created during Thailand seasons' },
  { id: 'swiss', name: 'Swiss', slug: 'swiss', description: 'Work from Swiss festival circuit' },
  { id: 'shankra', name: 'Shankra', slug: 'shankra', description: 'Shankra Festival Switzerland' },
  { id: 'reiserfieber', name: 'Reiserfieber', slug: 'reiserfieber', description: 'Reiserfieber Festival Switzerland' },
  { id: 'jungle', name: 'Jungle', slug: 'jungle', description: 'Jungle and nature-inspired designs' },
  { id: 'nail-art', name: 'Nail Art', slug: 'nail-art', description: 'Psychedelic nail artistry' },
  { id: 'body-art', name: 'Body Art', slug: 'body-art', description: 'Full body painting and art' },
];

/**
 * Convert tag name to slug
 */
export function portfolioTagNameToSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

/**
 * Find portfolio tag by slug
 */
export function findPortfolioTagBySlug(slug: string): PortfolioTagData | undefined {
  return portfolioTagData.find(t => t.slug === slug);
}