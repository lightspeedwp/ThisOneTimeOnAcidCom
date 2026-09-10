/**
 * @fileoverview Organik — event data
 *
 * Organik is a South African psytrance festival that has been running
 * for over a decade. Known for its intimate vibes, quality production,
 * and strong connection to the local psytrance community. For Ash, it
 * represents the Cape Town festival season and the opportunity to paint
 * faces for the home crowd.
 *
 * @module data/mock/events/organik
 * @version 1.0.0
 */

import type { Event } from '../../types/events';

export var organik: Event = {
  id: 'organik',
  slug: 'organik',
  name: 'Organik',
  shortName: 'Organik',
  tagline: 'South African psytrance at its finest',
  description:
    'Organik is a premier psytrance festival in South Africa, known for its intimate atmosphere, world-class lineup, and deep connection to the local psychedelic trance community. The festival brings together local and international artists for a weekend of high-energy music, visual art, and transformational experiences. For Ash, Organik represents the Cape Town festival season and the opportunity to paint faces for the home crowd — people who have watched his UV art evolve over the years.',
  type: 'festival',
  genre: ['psytrance', 'progressive', 'full-on', 'dark psytrance'],
  website: 'https://organik.co.za/',
  socialLinks: [
    {
      platform: 'instagram',
      url: 'https://instagram.com/organikpsy',
      label: '@organikpsy',
    },
    {
      platform: 'facebook',
      url: 'https://facebook.com/organikpsy',
      label: 'Organik',
    },
    {
      platform: 'youtube',
      url: 'https://youtube.com/organikpsy',
      label: 'Organik',
    },
    {
      platform: 'soundcloud',
      url: 'https://soundcloud.com/organikpsy',
      label: 'Organik',
    },
  ],
  location: {
    venue: 'TBC',
    city: 'Western Cape',
    region: 'Western Cape',
    country: 'South Africa',
    countryCode: 'ZA',
    coordinates: { lat: -33.9, lng: 18.4 },
    indoor: false,
    description:
      'Organik takes place in carefully selected outdoor venues across the Western Cape, chosen for their natural beauty, acoustic properties, and accessibility for the Cape Town psytrance community.',
  },
  recurring: true,
  recurrencePattern: 'annual',
  featuredImage: {
    src: 'https://images.unsplash.com/photo-1730234344109-f10c88b864f0?w=1080',
    alt: 'Outdoor psytrance festival with crowd and stage lights',
    caption: 'Organik — South African psytrance at its finest',
    isLogo: false,
  },
  tags: [
    'psytrance',
    'festival',
    'south-africa',
    'western-cape',
    'uv-painting',
    'face-painting',
    'neon',
    'outdoor',
    'local-community',
  ],
  featured: true,
  order: 2,
  personalSignificance:
    'Organik is the home crowd. Cape Town psytrance heads who know my work, who have been painted before, who understand the art. It is less about discovery and more about refinement — pushing the UV designs further, trying new techniques, serving the community that has supported me from the beginning. Every Organik is a reminder that the local scene is as vibrant as any international festival.',

  editions: [
    {
      id: 'organik-2026',
      year: 2026,
      startDate: '2026-04-11',
      endDate: '2026-04-12',
      status: 'upcoming',
      role: 'UV face painter & attendee',
      activities: [
        'UV face painting',
        'Neon body art',
        'Supporting local psytrance artists',
      ],
      highlights:
        'Upcoming April 2026 edition. Ash is planning to bring the full UV paint kit and debut some new geometric patterns refined during the Berlin summer season. First major Cape Town event after returning from Thailand training.',
      personalNote:
        'Excited to paint for the home crowd again. Organik always feels like a reunion — familiar faces, familiar energy, but the art keeps evolving. This year I am bringing techniques refined in Berlin and Thailand back to where it all started.',
    },
    {
      id: 'organik-2025',
      year: 2025,
      startDate: '2025-04-12',
      endDate: '2025-04-13',
      status: 'attended',
      role: 'UV face painter & attendee',
      activities: ['UV face painting', 'Neon body art'],
      highlights:
        'Strong turnout from the Cape Town psytrance community. Ash painted over 50 faces across both nights, many of them repeat customers who requested specific designs they remembered from previous years. The UV cannons were perfectly positioned, and the dancefloor glowed all night.',
      personalNote:
        'Painting for people who remember your work from years ago hits different. One person asked for the exact same design I did at Vortex 2023. That continuity, that trust — that is the point.',
    },
    {
      id: 'organik-2024',
      year: 2024,
      startDate: '2024-04-13',
      endDate: '2024-04-14',
      status: 'attended',
      role: 'UV face painter & attendee',
      activities: ['UV face painting', 'Neon body art'],
      highlights:
        'First Organik after fully committing to ambidextrous painting technique. The speed increase was noticeable — Ash painted 60+ faces in one night, a personal record for a single event. The home crowd energy was electric.',
    },
  ],

  relatedContent: {
    portfolioIds: [],
    blogSlugs: [],
    videoIds: [],
  },

  faqs: [
    {
      id: 'organik-faq-1',
      question: 'What is Organik?',
      answer:
        'Organik is an annual psytrance festival in South Africa, known for its intimate atmosphere, world-class lineup, and deep connection to the local psychedelic trance community. It features multiple stages, psychedelic decor, and a vibrant mix of local and international artists.',
    },
    {
      id: 'organik-faq-2',
      question: 'Why is Organik significant to Ash?',
      answer:
        'Organik is the home crowd. It is where Cape Town psytrance heads who know Ash's work gather. Unlike international festivals where he is introducing the UV art, at Organik he is serving a community that has supported him from the beginning. It is about refinement, evolution, and continuity.',
    },
    {
      id: 'organik-faq-3',
      question: 'Does Ash cycle to Organik like he does to Origin?',
      answer:
        'Not typically. Organik venues vary year to year, and some locations are not practical for loaded bike pilgrimages. The focus at Organik is on the UV painting itself, not the journey. Origin is the cycling pilgrimage festival. Organik is the home crowd event.',
    },
  ],
};
