/**
 * @fileoverview Portfolio route resolver for /portfolio/:slug
 * 
 * Disambiguates between portfolio category slugs and portfolio entry IDs.
 * If the slug matches a known category, renders PortfolioMainPage with that category.
 * Otherwise, renders PortfolioDetailPage for the individual entry.
 * 
 * @author Ash Shaw Portfolio Team
 * @version 1.0.0 - React Router Migration
 */

import React from 'react';
import { useParams } from '../../../lib/router';
import { PORTFOLIO_CATEGORIES } from '../../../utils/portfolioService';
import { PortfolioMainPage } from './PortfolioMainPage';
import { PortfolioDetailPage } from './PortfolioDetailPage';

/**
 * PortfolioResolver - Determines whether a /portfolio/:slug URL
 * refers to a category filter or an individual portfolio entry.
 */
export function PortfolioResolver() {
  const { slug } = useParams();
  
  if (!slug) {
    return <PortfolioMainPage />;
  }

  // Check if slug matches a known portfolio category
  const categoryMatch = PORTFOLIO_CATEGORIES.find(c => c.slug === slug);

  if (categoryMatch) {
    // Render the main portfolio page filtered by this category
    return <PortfolioMainPage key={`cat-${categoryMatch.id}`} initialCategory={categoryMatch.id} />;
  }

  // Otherwise, treat slug as a portfolio entry ID
  return <PortfolioDetailPage key={`detail-${slug}`} portfolioId={slug} />;
}