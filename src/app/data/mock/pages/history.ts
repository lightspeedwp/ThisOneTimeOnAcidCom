/**
 * @fileoverview History page mock data
 *
 * Stub content for the About → History timeline page.
 *
 * @module data/mock/pages/history
 * @version 1.0.0
 */

import type { BreadcrumbItem } from '../../../components/ui/Breadcrumbs';

export interface HistoryMilestone {
  id: string;
  date: string;
  title: string;
  description: string;
}

export const historyPageData = {
  hero: {
    badge: 'Timeline',
    title: 'History',
    description:
      'A chronological look at the milestones that shaped Ash Shaw\u2019s makeup art journey \u2014 from a first brush stroke in Berlin to international festival stages.',
    image: 'https://images.unsplash.com/photo-1528922087877-3f44f53a8f7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZW9uJTIwbGlnaHQlMjB0cmFpbCUyMHRpbWVsaW5lJTIwYWJzdHJhY3QlMjBwYXRofGVufDF8fHx8MTc3MTY4NzEwNHww&ixlib=rb-4.1.0&q=80&w=1080'
  },

  breadcrumbs: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'History' },
  ] as BreadcrumbItem[],

  milestones: [
    {
      id: 'origin',
      date: 'July 2019',
      title: 'Started makeup',
      description:
        'Ash picked up his first UV-reactive face paint at a Berlin psytrance gathering and discovered a passion for neon artistry.',
    },
    {
      id: 'first-festival',
      date: 'August 2020',
      title: 'First festival gig',
      description:
        'Invited to a small local gathering, painting faces for 12 hours straight. The energy was electric.',
    },
    {
      id: 'ozora-2022',
      date: 'August 2022',
      title: 'Ozora festival',
      description:
        'A milestone performance at one of the world\'s largest psychedelic gatherings in Hungary. Painted over 50 unique designs.',
    },
    {
      id: 'modem-2023',
      date: 'August 2023',
      title: 'MoDem festival',
      description:
        'Showcased the "Atomic Black" style on the main stage dancers. Defined the signature high-contrast aesthetic.',
    },
    {
      id: 'book-concept',
      date: 'January 2024',
      title: 'Book concept born',
      description:
        'Started outlining "Neon vs Atomic Black", a visual guide to the philosophy and technique of UV makeup.',
    },
    {
      id: 'site-launch',
      date: 'February 2026',
      title: 'Portfolio v7 launch',
      description:
        'Launched the definitive digital home for the Ash Shaw brand, featuring a complete design system and accessibility focus.',
    },
  ] as HistoryMilestone[],

  comingSoon:
    'More milestones will be added as the timeline grows. Check back soon for the full journey.',
};