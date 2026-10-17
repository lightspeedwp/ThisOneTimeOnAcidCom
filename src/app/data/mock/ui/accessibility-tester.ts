/**
 * @fileoverview Accessibility Tester page mock data
 * @module data/mock/ui/accessibility-tester
 * @version 1.0.0
 */

import type { BreadcrumbItem } from '../../../components/ui/Breadcrumbs';

export interface A11yRule {
  id: string;
  name: string;
  description: string;
  severity: 'critical' | 'warning' | 'info';
  wcag: string;
}

export interface A11yIssue {
  ruleId: string;
  element: string;
  selector: string;
  message: string;
  severity: 'critical' | 'warning' | 'info';
}

export const accessibilityTesterUI = {
  seo: {
    title: 'Accessibility Tester | Developer Tools | Ash Shaw',
  },
  hero: {
    badge: 'WCAG 2.1 AA',
    title: 'Accessibility tester',
    description:
      'Run a live audit against the current page to check for common accessibility issues. Scans for missing alt text, ARIA labels, heading hierarchy, form labels, landmark roles, focus indicators, and more.',
  },
  breadcrumbs: [
    { label: 'Home', href: '/' },
    { label: 'Developer tools', href: '/dev-tools' },
    { label: 'Accessibility tester' },
  ] as BreadcrumbItem[],
  actions: {
    runAudit: 'Run Audit',
    rerun: 'Re-run Audit',
    running: 'Scanning…',
    clear: 'Clear Results',
  },
  summary: {
    title: 'Audit summary',
    passed: 'Checks Passed',
    issues: 'Issues Found',
    score: 'Score',
    critical: 'Critical',
    warning: 'Warning',
    info: 'Info',
    noIssues: 'No accessibility issues detected — great work!',
  },
  sections: {
    results: 'Audit Results',
    rules: 'Rules Checked',
    tips: 'Accessibility Tips',
  },
  tips: [
    {
      id: 'tip-alt',
      title: 'Always provide alt text',
      description:
        'Every <img> element should have a descriptive alt attribute. Use alt="" for purely decorative images.',
    },
    {
      id: 'tip-headings',
      title: 'Maintain heading hierarchy',
      description:
        'Headings should follow a logical order (h1 → h2 → h3). Never skip heading levels.',
    },
    {
      id: 'tip-focus',
      title: 'Visible focus indicators',
      description:
        'All interactive elements must have a visible focus ring. Never use outline: none without a replacement.',
    },
    {
      id: 'tip-labels',
      title: 'Label all form controls',
      description:
        'Every input, select, and textarea needs an associated <label> or aria-label for screen readers.',
    },
    {
      id: 'tip-color',
      title: 'Don\'t rely on colour alone',
      description:
        'Ensure information conveyed by colour is also available through text, icons, or patterns.',
    },
    {
      id: 'tip-motion',
      title: 'Respect reduced motion',
      description:
        'Wrap animations in @media (prefers-reduced-motion: reduce) to disable them for users who prefer less motion.',
    },
  ],
  rules: [
    {
      id: 'img-alt',
      name: 'Images must have alt text',
      description: 'All <img> elements must have an alt attribute.',
      severity: 'critical' as const,
      wcag: '1.1.1',
    },
    {
      id: 'button-label',
      name: 'Buttons must have accessible names',
      description:
        'All <button> elements must have visible text content, aria-label, or aria-labelledby.',
      severity: 'critical' as const,
      wcag: '4.1.2',
    },
    {
      id: 'link-text',
      name: 'Links must have discernible text',
      description:
        'All <a> elements must have text content, aria-label, or contain an element with text.',
      severity: 'critical' as const,
      wcag: '2.4.4',
    },
    {
      id: 'form-label',
      name: 'Form inputs must have labels',
      description:
        'All <input>, <select>, and <textarea> elements must have an associated label.',
      severity: 'critical' as const,
      wcag: '1.3.1',
    },
    {
      id: 'heading-order',
      name: 'Heading levels should not be skipped',
      description:
        'Heading elements should follow a sequential order without skipping levels.',
      severity: 'warning' as const,
      wcag: '1.3.1',
    },
    {
      id: 'landmark-main',
      name: 'Page should have a main landmark',
      description:
        'The page should contain a <main> element or element with role="main".',
      severity: 'warning' as const,
      wcag: '1.3.1',
    },
    {
      id: 'landmark-nav',
      name: 'Navigation should use <nav>',
      description:
        'Primary navigation should be wrapped in a <nav> element with an aria-label.',
      severity: 'info' as const,
      wcag: '1.3.1',
    },
    {
      id: 'aria-valid',
      name: 'ARIA attributes must be valid',
      description:
        'Elements with ARIA roles must have all required ARIA attributes.',
      severity: 'warning' as const,
      wcag: '4.1.2',
    },
    {
      id: 'tabindex',
      name: 'Avoid positive tabindex',
      description:
        'Elements should not use tabindex values greater than 0 as it disrupts natural tab order.',
      severity: 'warning' as const,
      wcag: '2.4.3',
    },
    {
      id: 'html-lang',
      name: 'HTML element must have a lang attribute',
      description:
        'The <html> element must have a valid lang attribute to identify the page language.',
      severity: 'critical' as const,
      wcag: '3.1.1',
    },
    {
      id: 'meta-viewport',
      name: 'Viewport must not disable zoom',
      description:
        'The viewport meta tag should not disable user scaling (maximum-scale=1 or user-scalable=no).',
      severity: 'critical' as const,
      wcag: '1.4.4',
    },
    {
      id: 'skip-link',
      name: 'Page should have a skip navigation link',
      description:
        'A "Skip to content" link should be the first focusable element for keyboard users.',
      severity: 'info' as const,
      wcag: '2.4.1',
    },
  ] as A11yRule[],
  severityLabels: {
    critical: 'Critical',
    warning: 'Warning',
    info: 'Info',
  },
};