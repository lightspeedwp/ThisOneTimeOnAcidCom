/**
 * @fileoverview Deployment Readiness mock data — pre-deploy validation checks
 * @module data/mock/ui/deployment-readiness
 * @version 1.0.0
 */

import type { BreadcrumbItem } from '../../../components/ui/Breadcrumbs';

export interface DeployCheck {
  id: string;
  name: string;
  status: 'pass' | 'warn' | 'fail';
  recommendation: string;
}

export interface DeployCategory {
  id: string;
  title: string;
  icon: string;
  checks: DeployCheck[];
}

export const deploymentReadinessUI = {
  seo: { title: 'Deployment Readiness | Developer Tools | Ash Shaw' },
  breadcrumbs: [
    { label: 'Home', href: '/' },
    { label: 'Developer tools', href: '/dev-tools' },
    { label: 'Deployment readiness' },
  ] as BreadcrumbItem[],
  hero: {
    badge: 'Deployment',
    title: 'Deployment readiness',
    description:
      'Pre-deployment validation checklist covering performance, accessibility, SEO, security, and code quality.',
  },
  categories: [
    {
      id: 'performance',
      title: 'Performance',
      icon: 'Gauge',
      checks: [
        { id: 'perf-1', name: 'Image optimisation', status: 'pass', recommendation: 'All images use OptimizedImage with lazy loading.' },
        { id: 'perf-2', name: 'Font loading strategy', status: 'pass', recommendation: 'Variable fonts loaded with font-display: swap.' },
        { id: 'perf-3', name: 'CSS bundle (no unused)', status: 'pass', recommendation: 'Block CSS per page, no Tailwind utilities.' },
        { id: 'perf-4', name: 'Animation reduced-motion', status: 'pass', recommendation: 'All 26 animations respect prefers-reduced-motion.' },
        { id: 'perf-5', name: 'Core Web Vitals (LCP)', status: 'warn', recommendation: 'Hero images should use fetchpriority="high".' },
      ],
    },
    {
      id: 'accessibility',
      title: 'Accessibility',
      icon: 'Shield',
      checks: [
        { id: 'a11y-1', name: 'ARIA landmarks', status: 'pass', recommendation: 'All pages have main, nav, header, footer landmarks.' },
        { id: 'a11y-2', name: 'Heading hierarchy', status: 'pass', recommendation: 'H1 → H2 → H3 hierarchy maintained across all pages.' },
        { id: 'a11y-3', name: 'Alt text coverage', status: 'pass', recommendation: 'All images have descriptive alt attributes.' },
        { id: 'a11y-4', name: 'Focus indicators', status: 'pass', recommendation: '3px neon pink focus ring on all interactive elements.' },
        { id: 'a11y-5', name: 'Colour contrast (AA)', status: 'pass', recommendation: 'All text meets 4.5:1 minimum contrast ratio.' },
        { id: 'a11y-6', name: 'Keyboard navigation', status: 'pass', recommendation: 'Tab, Enter, Space, Arrow keys, Escape all functional.' },
      ],
    },
    {
      id: 'seo',
      title: 'SEO',
      icon: 'Search',
      checks: [
        { id: 'seo-1', name: 'Page titles (document.title)', status: 'pass', recommendation: 'Centralised setSEO() utility manages titles on all 46 page components.' },
        { id: 'seo-2', name: 'JSON-LD structured data', status: 'pass', recommendation: 'WebSite, Person, BlogPosting, VideoObject, PodcastEpisode, VisualArtwork, ImageGallery, CollectionPage, BreadcrumbList, and FAQPage schemas implemented across all pages.' },
        { id: 'seo-3', name: 'Sitemap page', status: 'pass', recommendation: '/sitemap page lists all routes with descriptions.' },
        { id: 'seo-4', name: 'Canonical URLs', status: 'warn', recommendation: 'Add <link rel="canonical"> to each route for production.' },
        { id: 'seo-5', name: 'Meta description', status: 'pass', recommendation: 'Centralised setSEO() sets unique meta descriptions, OG, and Twitter Card tags on all 46 pages.' },
      ],
    },
    {
      id: 'security',
      title: 'Security',
      icon: 'Lock',
      checks: [
        { id: 'sec-1', name: 'No inline scripts', status: 'pass', recommendation: 'All JavaScript in bundled modules.' },
        { id: 'sec-2', name: 'External dependencies (4)', status: 'pass', recommendation: 'Only react, react-dom, react-router, @phosphor-icons/react.' },
        { id: 'sec-3', name: 'No exposed API keys', status: 'pass', recommendation: 'No API keys in source code.' },
        { id: 'sec-4', name: 'CSP headers', status: 'warn', recommendation: 'Configure Content-Security-Policy headers on Netlify.' },
      ],
    },
    {
      id: 'code-quality',
      title: 'Code quality',
      icon: 'Code',
      checks: [
        { id: 'cq-1', name: 'TypeScript strict mode', status: 'pass', recommendation: 'All files type-safe with no any types.' },
        { id: 'cq-2', name: 'No console.log in production', status: 'pass', recommendation: 'All console calls wrapped in DEV guard.' },
        { id: 'cq-3', name: 'BEM compliance', status: 'pass', recommendation: '100% BEM naming convention across all CSS.' },
        { id: 'cq-4', name: 'Mock data coverage', status: 'pass', recommendation: 'All content imported from /data/mock/.' },
        { id: 'cq-5', name: 'Error boundary', status: 'pass', recommendation: 'ErrorBoundary wraps the entire application.' },
        { id: 'cq-6', name: 'Named exports', status: 'pass', recommendation: 'All components use named exports (tree-shaking).' },
      ],
    },
  ] as DeployCategory[],
};