/**
 * @fileoverview Code Quality Dashboard mock data
 * @module data/mock/ui/code-quality
 * @version 1.0.0
 */

import type { BreadcrumbItem } from '../../../components/ui/Breadcrumbs';

export interface MetricCard {
  id: string;
  label: string;
  value: string;
  trend: 'up' | 'down' | 'stable';
  detail: string;
}

export interface DependencyNode {
  name: string;
  path: string;
  children?: DependencyNode[];
}

export interface LintResult {
  tool: string;
  errors: number;
  warnings: number;
  status: 'pass' | 'warn' | 'fail';
}

export const codeQualityUI = {
  seo: { title: 'Code quality dashboard | Developer tools | Ash Shaw' },
  breadcrumbs: [
    { label: 'Home', href: '/' },
    { label: 'Developer tools', href: '/dev-tools' },
    { label: 'Code quality dashboard' },
  ] as BreadcrumbItem[],
  hero: {
    badge: 'Testing',
    title: 'Code quality dashboard',
    description:
      'Code health metrics, DOM complexity, CSS stats, component dependency map, and lint summaries for the Ash Shaw portfolio.',
  },
  overallScore: 94,
  domComplexity: {
    title: 'DOM complexity',
    description: 'Live metrics measured from the current page DOM.',
    metrics: [
      { id: 'total-elements', label: 'Total elements', value: '—', trend: 'stable' as const, detail: 'Measured at runtime' },
      { id: 'max-depth', label: 'Max nesting depth', value: '—', trend: 'stable' as const, detail: 'Measured at runtime' },
    ],
  },
  cssStats: {
    title: 'CSS stats',
    description: 'Static analysis of the stylesheet architecture.',
    metrics: [
      { id: 'custom-props', label: 'Custom properties', value: '85+', trend: 'up' as const, detail: 'Colours, spacing, shadows, radii, typography' },
      { id: 'bem-compliance', label: 'BEM compliance', value: '100%', trend: 'stable' as const, detail: 'All classes follow Block__Element--Modifier' },
      { id: 'block-stylesheets', label: 'Block CSS files', value: '18', trend: 'up' as const, detail: '/styles/blocks/*.css' },
      { id: 'tailwind-usage', label: 'Tailwind utilities', value: '0', trend: 'stable' as const, detail: 'Fully migrated to BEM' },
    ] as MetricCard[],
  },
  componentTree: {
    title: 'Component dependency tree',
    description: 'Top-level component import graph.',
    tree: [
      {
        name: 'App.tsx',
        path: '/App.tsx',
        children: [
          {
            name: 'RootLayout',
            path: '/components/common/RootLayout.tsx',
            children: [
              { name: 'Header', path: '/components/common/Header.tsx', children: [
                { name: 'Logo', path: '/components/common/Logo.tsx' },
                { name: 'ThemeToggle', path: '/components/common/ThemeToggle.tsx' },
                { name: 'MobileMenu', path: '/components/common/MobileMenu.tsx' },
              ]},
              { name: 'Footer', path: '/components/common/Footer.tsx', children: [
                { name: 'SocialLinks', path: '/components/common/SocialLinks.tsx' },
              ]},
              { name: 'ScrollToTop', path: '/components/ui/ScrollToTop.tsx' },
              { name: 'ErrorBoundary', path: '/components/common/ErrorBoundary.tsx' },
            ],
          },
        ],
      },
    ] as DependencyNode[],
  },
  fileSizes: {
    title: 'File size estimates',
    description: 'Approximate uncompressed sizes for key source files.',
    files: [
      { name: 'globals.css', size: '28 KB', category: 'styles' },
      { name: 'Header.tsx', size: '6.2 KB', category: 'component' },
      { name: 'Footer.tsx', size: '4.8 KB', category: 'component' },
      { name: 'BlogPage.tsx', size: '8.1 KB', category: 'page' },
      { name: 'PortfolioPage.tsx', size: '7.4 KB', category: 'page' },
      { name: 'SearchResultsPage.tsx', size: '9.6 KB', category: 'page' },
      { name: 'routes.ts', size: '5.2 KB', category: 'config' },
      { name: 'portfolioService.ts', size: '3.1 KB', category: 'utility' },
    ],
  },
  lintSummary: {
    title: 'Lint summary',
    description: 'Static analysis results (mock data).',
    results: [
      { tool: 'TypeScript', errors: 0, warnings: 0, status: 'pass' as const },
      { tool: 'ESLint', errors: 0, warnings: 2, status: 'warn' as const },
      { tool: 'Stylelint (BEM)', errors: 0, warnings: 0, status: 'pass' as const },
      { tool: 'a11y (axe-core)', errors: 0, warnings: 1, status: 'warn' as const },
    ] as LintResult[],
  },
  externalDeps: {
    title: 'External dependencies',
    description: 'Only 4 external packages in the entire codebase.',
    deps: ['react', 'react-dom', 'react-router', '@phosphor-icons/react'],
  },
};