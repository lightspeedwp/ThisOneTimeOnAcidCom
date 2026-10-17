/**
 * @fileoverview Custom navigation hook for Ash Shaw Makeup Portfolio
 * 
 * Provides a unified navigation function that mirrors the legacy `setCurrentPage` signature
 * but internally uses React Router's `useNavigate`. This allows incremental migration
 * of components from prop-based navigation to hook-based navigation.
 * 
 * @author Ash Shaw Portfolio Team
 * @version 2.0.0 - Dedicated taxonomy archive routes
 */

import { useNavigate } from '../lib/router';
import { PORTFOLIO_CATEGORIES } from '../utils/portfolioService';

/**
 * Custom hook providing a navigation function compatible with the legacy
 * `setCurrentPage(page, slug?, category?)` signature.
 * 
 * Maps page IDs to React Router paths:
 * - "home" → "/"
 * - "about" → "/about"
 * - "portfolio" → "/portfolio" or "/portfolio/category/:slug"
 * - "portfolio-detail" → "/portfolio/:slug"
 * - "blog" → "/blog" or "/blog/category/:slug"
 * - "blog-post" or "blog/:slug" → "/blog/:slug"
 * - "contact" → "/contact"
 * - "videos" → "/videos"
 * - "podcasts" → "/podcasts"
 * - "search" → "/search"
 * - "terms" → "/terms"
 * - "privacy" → "/privacy"
 */
export function useAppNavigate() {
  const navigate = useNavigate();

  const appNavigate = (page: string, slug?: string, category?: string) => {
    let url = '/';

    if (page === 'home') {
      url = '/';
    } else if (page === 'about') {
      url = '/about';
    } else if (page === 'portfolio') {
      if (category) {
        const cat = PORTFOLIO_CATEGORIES.find(c => c.id === category);
        if (cat && cat.slug && cat.slug !== 'all') {
          url = `/portfolio/category/${cat.slug}`;
        } else {
          url = '/portfolio';
        }
      } else {
        url = '/portfolio';
      }
    } else if (page === 'portfolio-detail' && slug) {
      url = `/portfolio/${slug}`;
    } else if ((page === 'blog-post' || page.startsWith('blog/')) && slug) {
      url = `/blog/${slug}`;
    } else if (page === 'blog') {
      url = '/blog';
      if (category) {
        const catSlug = category.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
        url = `/blog/category/${catSlug}`;
      }
    } else if (page === 'contact') {
      url = '/contact';
    } else if (page === 'videos') {
      url = '/videos';
    } else if (page === 'podcasts') {
      url = '/podcasts';
    } else if (page === 'search') {
      url = '/search';
    } else if (page === 'terms') {
      url = '/terms';
    } else if (page === 'privacy') {
      url = '/privacy';
    } else {
      url = `/${page}`;
    }

    navigate(url);
  };

  return appNavigate;
}

/**
 * Maps a URL pathname to a page ID for active navigation highlighting.
 */
export function getPageIdFromPath(pathname: string): string {
  if (pathname === '/') return 'home';
  if (pathname === '/about' || pathname.startsWith('/about/')) return 'about';
  if (pathname.startsWith('/portfolio')) return 'portfolio';
  if (pathname.startsWith('/blog')) return 'blog';
  if (pathname === '/contact') return 'contact';
  if (pathname.startsWith('/videos') || pathname.startsWith('/video/')) return 'videos';
  if (pathname.startsWith('/podcasts') || pathname.startsWith('/podcast/')) return 'podcasts';
  if (pathname === '/search') return 'search';
  if (pathname === '/terms') return 'terms';
  if (pathname === '/privacy') return 'privacy';
  return '';
}