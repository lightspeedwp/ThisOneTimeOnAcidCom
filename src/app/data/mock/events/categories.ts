/**
 * @fileoverview Event taxonomy data — categories and tags
 *
 * @module data/mock/events/categories
 * @version 1.0.0
 */

import type { EventCategoryData, EventTagData } from '../../types/events';

/** Event categories with neon accent colours */
export const eventCategories: EventCategoryData[] = [
  {
    id: 'festival',
    name: 'Festivals',
    slug: 'festival',
    description:
      'Multi-day outdoor psytrance and electronic music festivals where Ash paints faces, creates UV art, and dances under the stars.',
    count: 1,
    neonColor: 'neon-green',
    icon: 'MusicNotes',
  },
  {
    id: 'club-night',
    name: 'Club Nights',
    slug: 'club-night',
    description:
      'Berlin underground club events featuring UV face painting and neon body art on the dancefloor.',
    count: 0,
    neonColor: 'neon-purple',
    icon: 'Disc',
  },
  {
    id: 'workshop',
    name: 'Workshops',
    slug: 'workshop',
    description:
      'Teaching sessions and live demonstrations of UV and neon makeup techniques.',
    count: 0,
    neonColor: 'neon-cyan',
    icon: 'GraduationCap',
  },
  {
    id: 'pop-up',
    name: 'Pop-Ups',
    slug: 'pop-up',
    description:
      'Temporary pop-up art events and installations featuring neon and UV makeup artistry.',
    count: 0,
    neonColor: 'neon-orange',
    icon: 'Sparkle',
  },
  {
    id: 'exhibition',
    name: 'Exhibitions',
    slug: 'exhibition',
    description:
      'Gallery shows and art exhibitions showcasing UV makeup photography and body art.',
    count: 0,
    neonColor: 'neon-pink',
    icon: 'FrameCorners',
  },
  {
    id: 'collaboration',
    name: 'Collaborations',
    slug: 'collaboration',
    description:
      'Joint creative projects with fellow artists, photographers, and performers.',
    count: 0,
    neonColor: 'neon-blue',
    icon: 'Users',
  },
  {
    id: 'community',
    name: 'Community',
    slug: 'community',
    description:
      'Community gatherings, meetups, and creative sessions with the local art scene.',
    count: 0,
    neonColor: 'neon-yellow',
    icon: 'Heart',
  },
];

/** Event tags */
export const eventTags: EventTagData[] = [
  { id: 'psytrance', name: 'Psytrance', slug: 'psytrance', description: 'Psychedelic trance music events' },
  { id: 'cycling', name: 'Cycling', slug: 'cycling', description: 'Events Ash cycled to or from' },
  { id: 'uv-painting', name: 'UV Painting', slug: 'uv-painting', description: 'UV-reactive face and body painting' },
  { id: 'face-painting', name: 'Face Painting', slug: 'face-painting', description: 'Festival face painting' },
  { id: 'neon', name: 'Neon', slug: 'neon', description: 'Neon art and blacklight designs' },
  { id: 'south-africa', name: 'South Africa', slug: 'south-africa', description: 'Events in South Africa' },
  { id: 'western-cape', name: 'Western Cape', slug: 'western-cape', description: 'Events in the Western Cape' },
  { id: 'berlin', name: 'Berlin', slug: 'berlin', description: 'Events in Berlin, Germany' },
  { id: 'birthday', name: 'Birthday', slug: 'birthday', description: 'Events on or near Ash\u2019s birthday' },
  { id: 'outdoor', name: 'Outdoor', slug: 'outdoor', description: 'Open-air events and festivals' },
  { id: 'festival', name: 'Festival', slug: 'festival', description: 'Music festivals' },
];