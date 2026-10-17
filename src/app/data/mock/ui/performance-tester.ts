/**
 * @fileoverview Performance Tester page mock data
 * @module data/mock/ui/performance-tester
 * @version 1.0.0
 */

import type { BreadcrumbItem } from '../../../components/ui/Breadcrumbs';

export interface PerfMetric {
  id: string;
  label: string;
  description: string;
  unit: string;
  thresholds: { good: number; moderate: number };
}

export const performanceTesterUI = {
  seo: {
    title: 'Performance Tester | Developer Tools | Ash Shaw',
  },
  hero: {
    badge: 'Web Vitals',
    title: 'Performance tester',
    description:
      'Measure real-time performance metrics using the browser Performance API. View navigation timing, resource breakdowns, DOM complexity, image audit results, and Core Web Vitals estimates.',
  },
  breadcrumbs: [
    { label: 'Home', href: '/' },
    { label: 'Developer tools', href: '/dev-tools' },
    { label: 'Performance tester' },
  ] as BreadcrumbItem[],
  actions: {
    runTest: 'Run Test',
    retest: 'Re-test',
    running: 'Measuring…',
    clear: 'Clear Results',
  },
  sections: {
    vitals: 'Core Web Vitals',
    timing: 'Navigation Timing',
    resources: 'Resource Breakdown',
    dom: 'DOM Complexity',
    images: 'Image Audit',
    tips: 'Performance Tips',
  },
  metrics: {
    domContentLoaded: {
      id: 'dcl',
      label: 'DOM Content Loaded',
      description: 'Time until the HTML document has been fully parsed and all deferred scripts have executed.',
      unit: 'ms',
      thresholds: { good: 1000, moderate: 2500 },
    },
    loadComplete: {
      id: 'load',
      label: 'Page Load',
      description: 'Total time for the page and all sub-resources to finish loading.',
      unit: 'ms',
      thresholds: { good: 2000, moderate: 4000 },
    },
    firstPaint: {
      id: 'fp',
      label: 'First Paint',
      description: 'Time when the browser first renders anything to the screen.',
      unit: 'ms',
      thresholds: { good: 1000, moderate: 2000 },
    },
    firstContentfulPaint: {
      id: 'fcp',
      label: 'First Contentful Paint',
      description: 'Time when the first text or image is painted to the screen.',
      unit: 'ms',
      thresholds: { good: 1800, moderate: 3000 },
    },
    largestContentfulPaint: {
      id: 'lcp',
      label: 'Largest Contentful Paint',
      description: 'Time when the largest visible content element is rendered.',
      unit: 'ms',
      thresholds: { good: 2500, moderate: 4000 },
    },
    cumulativeLayoutShift: {
      id: 'cls',
      label: 'Cumulative Layout Shift',
      description: 'Measures visual stability — how much the page layout shifts during loading.',
      unit: '',
      thresholds: { good: 0.1, moderate: 0.25 },
    },
  } as Record<string, PerfMetric>,
  resourceTypes: {
    script: 'JavaScript',
    stylesheet: 'CSS',
    img: 'Images',
    font: 'Fonts',
    fetch: 'API Calls',
    other: 'Other',
  },
  domStats: {
    totalNodes: 'Total DOM Nodes',
    maxDepth: 'Max Nesting Depth',
    elements: 'Element Nodes',
    textNodes: 'Text Nodes',
    commentNodes: 'Comment Nodes',
  },
  imageAudit: {
    title: 'Image audit',
    total: 'Total Images',
    missingLazy: 'Missing lazy loading',
    missingAlt: 'Missing alt text',
    oversized: 'Potentially oversized',
    withDimensions: 'Has explicit dimensions',
  },
  gaugeLabels: {
    good: 'Good',
    moderate: 'Needs Work',
    poor: 'Poor',
  },
  tips: [
    {
      id: 'tip-lazy',
      title: 'Lazy load offscreen images',
      description:
        'Add loading="lazy" to images below the fold to defer their loading until they are near the viewport.',
    },
    {
      id: 'tip-fonts',
      title: 'Use font-display: swap',
      description:
        'Ensure custom fonts use font-display: swap so text remains visible during font loading.',
    },
    {
      id: 'tip-dom',
      title: 'Keep DOM size small',
      description:
        'Aim for fewer than 1,500 DOM nodes. Large DOMs increase memory usage and slow style calculations.',
    },
    {
      id: 'tip-cls',
      title: 'Set explicit dimensions on media',
      description:
        'Always set width and height attributes on images and videos to prevent layout shifts.',
    },
    {
      id: 'tip-cache',
      title: 'Leverage browser caching',
      description:
        'Set appropriate Cache-Control headers for static assets to avoid unnecessary network requests.',
    },
    {
      id: 'tip-css',
      title: 'Minimise render-blocking CSS',
      description:
        'Inline critical CSS and defer non-critical stylesheets to speed up first paint.',
    },
  ],
};