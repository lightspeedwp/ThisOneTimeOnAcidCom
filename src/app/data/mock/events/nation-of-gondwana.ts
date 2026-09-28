/**
 * @fileoverview Nation of Gondwana (NOG) — event data
 *
 * Nation of Gondwana is a four-day techno, house, and psytrance festival
 * held annually near Berlin, Germany. With 10,000+ attendees, three stages,
 * and 24-hour music, NOG represents the peak of the European transformational
 * festival scene. For Ash, it combines proximity to his Berlin summer base
 * with world-class production and a mature harm reduction culture.
 *
 * The 2023 edition was particularly significant — it was where Ash experienced
 * a profound moment of creative clarity while painting faces under the influence
 * of Lucy, which later inspired a key visual design motif.
 *
 * @module data/mock/events/nation-of-gondwana
 * @version 1.0.0
 */

import type { Event } from '../../types/events';

export var nationOfGondwana: Event = {
  id: 'nation-of-gondwana',
  slug: 'nation-of-gondwana',
  name: 'Nation of Gondwana',
  shortName: 'NOG',
  tagline: 'Seven days of transformation in the German countryside',
  description:
    "Nation of Gondwana (NOG) is one of Europe's premier transformational festivals, held annually near Berlin, Germany. With 10,000+ attendees, three stages running 24 hours, and a lineup spanning techno, house, progressive, and psytrance, NOG represents the peak of the European electronic music festival scene. The festival is known for its immaculate German infrastructure (clean toilets, abundant water, professional medical support) combined with a global psytrance community vibe. For Ash, NOG is the perfect synthesis of Berlin summer energy and international festival culture — close enough to his Berlin base to cycle there, large enough to paint hundreds of faces, and mature enough to support deep transformational experiences.",
  type: 'festival',
  genre: ['techno', 'house', 'psytrance', 'progressive', 'experimental'],
  website: 'https://www.pyonen.de/nog2026/en',
  socialLinks: [
    {
      platform: 'instagram',
      url: 'https://www.instagram.com/nation_of_gondwana_pyonen/',
      label: '@nation_of_gondwana_pyonen',
    },
    {
      platform: 'facebook',
      url: 'https://www.facebook.com/pyonen',
      label: 'Pyönen / Nation of Gondwana',
    },
    {
      platform: 'soundcloud',
      url: 'https://soundcloud.com/pyonen-nation-of-gondwana',
      label: 'Pyönen Nation of Gondwana',
    },
    {
      platform: 'youtube',
      url: 'https://www.youtube.com/@pyonennog',
      label: 'Pyönen / NOG',
    },
  ],
  location: {
    venue: 'Grünefeld',
    city: 'Near Berlin',
    region: 'Brandenburg',
    country: 'Germany',
    countryCode: 'DE',
    coordinates: { lat: 52.5, lng: 13.4 },
    indoor: false,
    description:
      'NOG takes place at Grünefeld, a sprawling outdoor venue in the Brandenburg countryside near Berlin. The site features natural amphitheatres, forested camping areas, and open fields perfect for massive festival infrastructure.',
  },
  recurring: true,
  recurrencePattern: 'annual',
  featuredImage: {
    src: 'https://images.unsplash.com/photo-1663028055136-2fe4bc60b1e4?w=1080',
    alt: 'Outdoor electronic music festival with stage and crowd at sunset',
    caption: 'Nation of Gondwana — transformation in the German countryside',
    isLogo: false,
  },
  tags: [
    'techno',
    'psytrance',
    'festival',
    'germany',
    'berlin',
    'transformational',
    'uv-painting',
    'face-painting',
    'neon',
    'outdoor',
    'international',
  ],
  featured: true,
  order: 3,
  personalSignificance:
    'NOG is the European festival I have been building towards. It combines everything I love — proximity to Berlin, world-class music production, a mature community that understands harm reduction, and a scale large enough to paint hundreds of faces without repeating designs. The 2023 edition was life-changing. I experienced a moment of profound clarity while painting faces under the influence of Lucy, which later became a core visual motif in my UV work. NOG proved that European festivals can match the intensity and transformation of South African psytrance gatherings while adding German precision and infrastructure.',

  editions: [
    {
      id: 'nog-2026',
      year: 2026,
      startDate: '2026-07-16',
      endDate: '2026-07-19',
      status: 'upcoming',
      role: 'UV face painter & attendee',
      activities: [
        'UV face painting',
        'Neon body art',
        'Multi-day immersion',
      ],
      highlights:
        'Upcoming July 2026 edition. Ash is planning to attend the full seven days and bring refined UV techniques developed over the past year. Goal is to paint 200+ faces and document the experience for a potential blog series or podcast episode.',
      personalNote:
        'NOG 2026 is the target. Seven days, full immersion, new UV techniques, and the opportunity to serve a truly international crowd. This is what I have been training for.',
    },
    {
      id: 'nog-2023',
      year: 2023,
      startDate: '2023-07-20',
      endDate: '2023-07-23',
      status: 'attended',
      role: 'UV face painter & attendee',
      activities: [
        'UV face painting',
        'Neon body art',
        'Psychedelic exploration',
      ],
      highlights:
        'First NOG experience. Seven days of full immersion. Ash painted over 100 faces across the week and experienced a profound moment of creative clarity under the influence of Lucy. That moment — surrounded by glowing faces on the main stage dancefloor at 3am — became a defining visual reference for his UV work. The experience proved that European festivals could match the transformational intensity of South African gatherings.',
      personalNote:
        'NOG 2023 broke me open. The scale, the production, the community, the music — everything aligned. The Lucy experience at 3am on the main stage, surrounded by faces I had painted, all of them glowing under UV cannons — that was the moment I understood what this art could become. Not just face painting. Transformation made visible.',
      relatedBlogSlugs: ['nation-of-gondwana-paint-and-acid'],
    },
  ],

  relatedContent: {
    portfolioIds: [],
    blogSlugs: ['nation-of-gondwana-paint-and-acid'],
    videoIds: [],
  },

  faqs: [
    {
      id: 'nog-faq-1',
      question: 'What is Nation of Gondwana?',
      answer:
        "Nation of Gondwana (NOG) is a seven-day transformational festival held annually near Berlin, Germany. With 10,000+ attendees, three stages running 24 hours, and a lineup spanning techno, house, progressive, and psytrance, it is one of Europe's premier electronic music gatherings.",
    },
    {
      id: 'nog-faq-2',
      question: 'What makes NOG different from other European festivals?',
      answer:
        'NOG combines German precision (immaculate infrastructure, professional medical support, harm reduction culture) with global psytrance community vibes. It is big enough to feel like a major event but small enough to feel like a village by day three. The seven-day format allows for deep immersion that weekend festivals cannot match.',
    },
    {
      id: 'nog-faq-3',
      question: 'What was the "Lucy experience" Ash mentions from NOG 2023?',
      answer:
        'At 3am on the main stage, under the influence of Lucy (psychedelic), Ash was surrounded by faces he had painted hours earlier, all of them glowing under UV cannons. The visual moment — seeing the art he created reflected back by dozens of people simultaneously — became a defining creative reference. It proved that UV face painting was not just decoration. It was transformation made visible.',
    },
  ],
};
