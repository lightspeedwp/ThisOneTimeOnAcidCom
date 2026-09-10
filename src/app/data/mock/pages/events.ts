/**
 * @fileoverview Events listing page content
 *
 * Hero text, descriptions, and UI content for the main Events page.
 *
 * @module data/mock/pages/events
 * @version 1.0.0
 */

import type { BreadcrumbItem } from '../../../components/ui/Breadcrumbs';

export const eventsPageData = {
  hero: {
    badge: 'Events',
    title: 'Where I\'ve been',
    description:
      'Festivals, club nights, and creative gatherings where neon art comes alive \u2014 from the Western Cape mountains to Berlin\u2019s underground dancefloors.',
  },

  breadcrumbs: [
    { label: 'Home', href: '/' },
    { label: 'Events' },
  ] as BreadcrumbItem[],

  stats: {
    heading: 'By the Numbers',
    items: [
      { label: 'Events', labelSingular: 'Event', key: 'events' },
      { label: 'Editions', key: 'editions' },
      { label: 'Km cycled', key: 'kmCycled' },
      { label: 'Countries', labelSingular: 'Country', key: 'countries' },
    ],
  },

  emptyState: {
    title: 'No events found',
    description: 'Try adjusting your filters or check back soon for new entries.',
  },

  filterLabels: {
    all: 'All Events',
    type: 'Event Type',
    tag: 'Tag',
  },
};

export const eventDetailBreadcrumbs = (
  eventName: string,
  eventSlug: string,
): BreadcrumbItem[] => [
  { label: 'Home', href: '/' },
  { label: 'Events', href: '/events' },
  { label: eventName },
];

export const eventCategoryBreadcrumbs = (
  categoryName: string,
): BreadcrumbItem[] => [
  { label: 'Home', href: '/' },
  { label: 'Events', href: '/events' },
  { label: categoryName },
];

export const eventTagBreadcrumbs = (tagName: string): BreadcrumbItem[] => [
  { label: 'Home', href: '/' },
  { label: 'Events', href: '/events' },
  { label: `Tag: ${tagName}` },
];