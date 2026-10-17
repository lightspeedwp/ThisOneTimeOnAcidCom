/**
 * @fileoverview Layout-level auto-breadcrumbs generated from current route path.
 *
 * Renders breadcrumbs in a consistent position (between Header and page content)
 * on every route except the homepage. When a page renders its own Breadcrumbs
 * component, that component hides the layout-level breadcrumbs via DOM id.
 *
 * @component AutoBreadcrumbs
 * @version 1.0.0
 */

import React from 'react';
import { useLocation, grab } from '../../lib/router';
import { Breadcrumbs } from '../ui/Breadcrumbs';

/**
 * Human-readable labels for known route segments.
 * Segments not found here are capitalised from the slug.
 */
var segmentLabels: Record<string, string> = {
  'about': 'About',
  'journey': 'Journey',
  'berlin': 'Berlin',
  'bio': 'Biography',
  'book': 'The book',
  'cycling': 'Cycling',
  'fitness': 'Fitness',
  'history': 'History',
  'lightspeed': 'LightSpeed',
  'lucy-in-the-sky-with-diamonds': 'Lucy',
  'manifesto': 'Manifesto',
  'music': 'Music',
  'partners': 'Partners',
  'process': 'Process',
  'six-cats': 'Six Cats',
  'travels': 'Travels',
  'tribes': 'Tribes',
  'education': 'Education',
  'adhd': 'ADHD',
  'aquarius': 'Aquarius',
  'podcast': 'Podcast',
  'accessibility': 'Accessibility',
  'portfolio': 'Portfolio',
  'category': 'Category',
  'tag': 'Tag',
  'blog': 'Blog',
  'videos': 'Videos',
  'video': 'Video',
  'events': 'Events',
  'podcasts': 'Podcasts',
  'contact': 'Contact',
  'ebook': 'Ebook',
  'typography': 'Typography',
  'spacing': 'Spacing',
  'shadows': 'Shadows',
  'radius': 'Radius',
  'buttons': 'Buttons',
  'cards': 'Cards',
  'neon': 'Neon animations',
  'tokens': 'Design tokens',
  'icons': 'Icon library',
  'api': 'Component API',
  'playground': 'Playground',
  'code-quality': 'Code quality',
  'deployment': 'Deployment',
  'analytics': 'Analytics',
  'components': 'Components',
  'snippets': 'Snippets',
  'docs': 'Documentation',
};

/**
 * Convert a URL slug to a readable label.
 * Looks up the segment in segmentLabels; falls back to humanising the slug.
 */
function getSegmentLabel(segment: string): string {
  var mapped = grab(segmentLabels, segment);
  if (mapped) return mapped;

  // Humanise: replace hyphens, capitalise first letter only (sentence case)
  var humanised = segment.replace(/-/g, ' ');
  if (humanised.length === 0) return '';
  return humanised.charAt(0).toUpperCase() + humanised.slice(1);
}

/**
 * Build the href for a breadcrumb item from path segments up to a given depth.
 */
function buildHref(segments: string[], depth: number): string {
  var path = '';
  for (var i = 0; i <= depth; i++) {
    path = path + '/' + segments[i];
  }
  return path;
}

/**
 * AutoBreadcrumbs - layout-level breadcrumbs generated from the current URL path.
 * Hidden on homepage. Hidden automatically when a page renders its own Breadcrumbs.
 */
export function AutoBreadcrumbs() {
  var location = useLocation();
  var pathname = grab(location, 'pathname') as string;
  if (!pathname) pathname = '/';

  // Never render on homepage
  if (pathname === '/') return null;

  // Remove trailing slash
  var cleanPath = pathname;
  if (cleanPath.length > 1 && cleanPath.charAt(cleanPath.length - 1) === '/') {
    cleanPath = cleanPath.slice(0, -1);
  }

  // Split into segments
  var parts = cleanPath.split('/');
  // parts[0] is empty string before leading /
  var segments: string[] = [];
  for (var i = 1; i < parts.length; i++) {
    if (parts[i].length > 0) {
      segments.push(parts[i]);
    }
  }

  if (segments.length === 0) return null;

  // Build breadcrumb items: Home > segment1 > segment2 > ... > current
  var items = [{ label: 'Home', href: '/' }];

  for (var j = 0; j < segments.length; j++) {
    var isLast = j === segments.length - 1;
    var label = getSegmentLabel(segments[j]);
    if (isLast) {
      items.push({ label: label });
    } else {
      items.push({ label: label, href: buildHref(segments, j) });
    }
  }

  return (
    <div id="layout-breadcrumbs" className="layout-breadcrumbs">
      <div className="layout-breadcrumbs__inner px-[20px] py-[4px]">
        <Breadcrumbs items={items} layoutLevel={true} />
      </div>
    </div>
  );
}