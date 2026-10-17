/**
 * @fileoverview Vortex Festival — event data
 *
 * Vortex is where it all began. Ash's first psytrance festival experience
 * in 1999, and the foundation for twenty years of dancefloor visibility
 * practice. From Chicken Man to Cow Man to UV face painter, Vortex has been
 * the constant through every iteration of his creative evolution. December
 * Vortex remains one of the most personally significant events on his calendar.
 *
 * @module data/mock/events/vortex
 * @version 1.0.0
 */

import type { Event } from '../../types/events';

export var vortex: Event = {
  id: 'vortex',
  slug: 'vortex',
  name: 'Vortex Festival',
  shortName: 'Vortex',
  tagline: 'Where it all began — twenty years of dancefloor evolution',
  description:
    "Vortex Festival is a legendary South African psytrance gathering that has been running since the late 1990s. Known for its multiple editions per year (December, Easter, and occasional special events), Vortex represents the foundation of South Africa's outdoor psytrance culture. For Ash, Vortex is where everything started. His first festival experience in 1999 at age 21. The birthplace of Chicken Man, Cow Man, and every costumed character that led to UV face painting. December Vortex is a pilgrimage, a reunion, and a reminder that the dancefloor has been teaching him for over twenty years.",
  type: 'festival',
  genre: ['psytrance', 'progressive', 'full-on', 'forest', 'darkpsy'],
  website: 'https://www.vortexfestival.co.za/',
  socialLinks: [
    {
      platform: 'instagram',
      url: 'https://www.instagram.com/vortexfestival/',
      label: '@vortexfestival',
    },
    {
      platform: 'facebook',
      url: 'https://www.facebook.com/vortexfestival',
      label: 'Vortex Festival',
    },
  ],
  location: {
    venue: 'Various (Elandskloof, Cederberg, Eastern Cape)',
    city: 'Western Cape and Eastern Cape',
    region: 'Western Cape / Eastern Cape',
    country: 'South Africa',
    countryCode: 'ZA',
    coordinates: { lat: -33.5, lng: 19.5 },
    indoor: false,
    description:
      'Vortex takes place at various outdoor venues across South Africa, primarily in the Western Cape (Elandskloof, Cederberg mountains) and Eastern Cape. The festival is known for choosing remote, scenic locations with natural amphitheatres and minimal light pollution.',
  },
  recurring: true,
  recurrencePattern: 'multiple times per year',
  featuredImage: {
    src: 'https://images.unsplash.com/photo-1765706729088-a08e7817c5a8?w=1080',
    alt: 'South African mountains at sunset with camping tents',
    caption: 'Vortex Festival — where it all began',
    isLogo: false,
  },
  tags: [
    'psytrance',
    'festival',
    'south-africa',
    'western-cape',
    'eastern-cape',
    'costumed-characters',
    'uv-painting',
    'face-painting',
    'neon',
    'outdoor',
    'foundational',
  ],
  featured: true,
  order: 4,
  personalSignificance:
    'Vortex is the foundation. Everything traces back to December 1999, standing on a dancefloor in a bright yellow suit, deciding that visibility was the strategy. Twenty years of Chicken Man, Cow Man, and themed costumes — all of it was practice for UV face painting. Vortex taught me how to read dancefloor energy, how to make people feel seen, how to be visible without demanding attention. When I picked up a UV paintbrush in Berlin 2019, I was applying lessons learned at Vortex over two decades. December Vortex is still sacred. It is the annual reunion with the people who watched me evolve from Chicken Man to this.',

  editions: [
    {
      id: 'vortex-dec-2025',
      year: 2025,
      startDate: '2025-12-26',
      endDate: '2025-12-29',
      status: 'attended',
      role: 'UV face painter & attendee',
      activities: ['UV face painting', 'Neon body art', 'Reunion with trance family'],
      highlights:
        'December Vortex 2025 was the reunion. Ash painted faces for people who remembered him as Chicken Man fifteen years ago. The continuity, the evolution visible in real-time — that is what makes Vortex sacred. Some people have been attending for as long as he has. They remember every iteration.',
      personalNote:
        'Someone asked me to paint them the same design I did at Vortex 2023. They had a photo on their phone. That level of continuity, that trust — that is Vortex. The community that has watched me evolve for twenty years.',
    },
    {
      id: 'vortex-dec-2024',
      year: 2024,
      startDate: '2024-12-27',
      endDate: '2024-12-30',
      status: 'attended',
      role: 'UV face painter & attendee',
      activities: ['UV face painting', 'Neon body art'],
      highlights:
        'December Vortex remains one of the most important festivals on the calendar. Painted 80+ faces across four days. Many of them were people Ash has known for over a decade from the Vortex community.',
    },
    {
      id: 'vortex-dec-2023',
      year: 2023,
      startDate: '2023-12-28',
      endDate: '2023-12-31',
      status: 'attended',
      role: 'UV face painter & attendee',
      activities: ['UV face painting', 'Neon body art'],
      highlights:
        'First Vortex with fully refined ambidextrous painting technique. The speed and symmetry improvements were immediately visible. Ash painted more faces in one night than he had at any previous Vortex.',
    },
    {
      id: 'vortex-dec-2022',
      year: 2022,
      startDate: '2022-12-29',
      endDate: '2023-01-01',
      status: 'attended',
      role: 'UV face painter & attendee',
      activities: ['UV face painting', 'Neon body art'],
      highlights:
        'Post-COVID return to Vortex. The energy was electric. People who had not seen each other in two years, reuniting. Ash brought his UV paints and the dancefloor welcomed the art like it had always been there.',
    },
    {
      id: 'vortex-dec-2020-21',
      year: 2020,
      startDate: '2020-12-31',
      endDate: '2021-01-03',
      status: 'cancelled',
      role: '',
      highlights:
        'Vortex was not held due to COVID-19 restrictions in South Africa. The first December in over twenty years without the festival. The silence was deafening.',
    },
    {
      id: 'vortex-dec-2019',
      year: 2019,
      startDate: '2019-12-26',
      endDate: '2019-12-29',
      status: 'attended',
      role: 'Costumed character & early UV painting experiments',
      activities: ['Themed costumes', 'Early UV face painting attempts'],
      highlights:
        'The transition year. Ash brought UV paints to Vortex for the first time, experimenting with face painting alongside his traditional costumed characters. The paintbrush was new, but the visibility strategy was twenty years refined.',
      personalNote:
        'This was the year I started bringing UV paints to Vortex. Still doing costumes, but testing the new medium. The Berlin warehouse moment had happened six months earlier. Vortex was where I brought it home.',
    },
    {
      id: 'vortex-dec-1999',
      year: 1999,
      startDate: '1999-12-30',
      endDate: '2000-01-02',
      status: 'attended',
      role: 'First-time attendee',
      activities: ['Costumed character (yellow suit)'],
      highlights:
        "The beginning. Ash's first psytrance festival. Age 21, wearing a bright yellow suit, standing on a dancefloor in the middle of nowhere South Africa. The moment that started everything. The strategy was simple: be the most visible person in the space. It worked.",
      personalNote:
        'December 1999. My first Vortex. My first psytrance festival. I wore a bright yellow suit because I wanted to be impossible to ignore. Twenty-five years later, I am still doing the same thing. Just with a paintbrush instead of a costume.',
    },
  ],

  relatedContent: {
    portfolioIds: [],
    blogSlugs: [],
    videoIds: [],
  },

  faqs: [
    {
      id: 'vortex-faq-1',
      question: 'What is Vortex Festival?',
      answer:
        "Vortex Festival is a legendary South African psytrance gathering that has been running since the late 1990s. Known for multiple editions per year (December, Easter, and occasional special events), Vortex represents the foundation of South Africa's outdoor psytrance culture.",
    },
    {
      id: 'vortex-faq-2',
      question: 'Why is Vortex so significant to Ash?',
      answer:
        "Vortex is where it all began. Ash's first festival experience in December 1999 at age 21. The birthplace of Chicken Man, Cow Man, and twenty years of costumed visibility practice that eventually led to UV face painting. December Vortex is a pilgrimage, a reunion, and a reminder that the dancefloor has been teaching him for over two decades.",
    },
    {
      id: 'vortex-faq-3',
      question: 'Does Ash still attend Vortex regularly?',
      answer:
        'Yes. December Vortex remains one of the most important festivals on his calendar. It is the annual reunion with the South African trance family who have watched him evolve from Chicken Man to UV face painter. The continuity matters. The community matters. Vortex is sacred.',
    },
  ],
};
