/**
 * @fileoverview Origin Festival — event data
 *
 * Ash's first and most personally significant recurring event entry.
 * Origin Festival is a psytrance gathering on Elandskloof Guest Farm
 * in the Western Cape, South Africa. Ash has attended every year since
 * 2022 (plus 2020 pre-COVID) and has cycled to and from the festival
 * four times with a full gear rack. It falls on his birthday weekend
 * every year, making it a deeply personal tradition.
 *
 * @module data/mock/events/origin-festival
 * @version 1.0.0
 */

import type { Event } from '../../types/events';

export const originFestival: Event = {
  id: 'origin-festival',
  slug: 'origin-festival',
  name: 'Origin Festival',
  shortName: 'Origin',
  tagline: 'A psytrance pilgrimage in the Western Cape mountains',
  description:
    'Origin Festival is a premier psytrance gathering nestled between mountains and ocean on Elandskloof Guest Farm in Helderstroom, Western Cape, South Africa. For Ash, it\u2019s more than a festival \u2014 it falls on his birthday weekend every year, making the annual pilgrimage a deeply personal tradition. He has cycled to and from the festival four times, carrying a full UV paint kit on a loaded touring bike across mountain passes.',
  type: 'festival',
  genre: ['psytrance', 'progressive', 'full-on', 'forest'],
  website: 'https://originfestival.com',
  socialLinks: [
    {
      platform: 'instagram',
      url: 'https://www.instagram.com/originfestival/',
      label: '@originfestival',
    },
    {
      platform: 'facebook',
      url: 'https://www.facebook.com/OriginFestival/',
      label: 'Origin Festival',
    },
  ],
  location: {
    venue: 'Elandskloof Guest Farm',
    city: 'Helderstroom',
    region: 'Western Cape',
    country: 'South Africa',
    countryCode: 'ZA',
    coordinates: { lat: -34.1, lng: 19.1 },
    indoor: false,
    description:
      'Nestled between the Groenland mountains and the coastal fynbos, Elandskloof is a working farm turned festival ground with natural amphitheatres, shaded groves, and star-filled skies.',
  },
  recurring: true,
  recurrencePattern: 'annual',
  featuredImage: {
    src: 'https://originfestival.com/wp-content/uploads/2024/08/origin-festival-logo.svg',
    alt: 'Origin Festival logo — a psytrance gathering in the Western Cape, South Africa',
    caption: 'Origin Festival, Elandskloof Guest Farm, Helderstroom',
    isLogo: true,
  },
  tags: [
    'psytrance',
    'festival',
    'south-africa',
    'western-cape',
    'cycling',
    'uv-painting',
    'birthday',
    'face-painting',
    'neon',
    'outdoor',
  ],
  featured: true,
  order: 1,
  personalSignificance:
    'Origin falls on my birthday weekend every year. The pilgrimage to a psytrance festival is as important as the event itself \u2014 cycling through mountain passes with a loaded bike is a meditation, a way to cleanse the mind before entering the psychedelic playground. This festival is where my trance family gathers, and arriving on two wheels makes the experience complete.',

  /* ── EDITIONS (most recent first) ── */
  editions: [
    /* ════════════════════════════════════════════════
       2026 — The 300km Birthday Ride (most detail)
       ════════════════════════════════════════════════ */
    {
      id: 'origin-2026',
      year: 2026,
      startDate: '2026-01-30',
      endDate: '2026-02-01',
      status: 'attended',
      role: 'UV face painter & attendee',
      activities: [
        'UV face painting',
        'Neon body art',
        'Birthday celebrations on the dancefloor',
      ],
      highlights:
        'Cycled 300km from Woodstock, Cape Town, to Origin Festival and back. Day one was 80km of pure adrenaline via Sir Lowry\u2019s Pass \u2014 he crushed that climb and felt on top of the world. On day two, his birthday, he rode the final 75km to Helderstroom and arrived at the party around 11:30 AM buzzing with endorphins. He skipped the queue, shouted that it was his birthday, and the welcome was overwhelming. He spent the weekend painting faces in the shade during the day and watching them glow under the UV cannons at night. The return journey took him back to Elgin on Monday to decompress, then all the way to Cape Town on Tuesday.',
      personalNote:
        'Just conquered the road back to Cape Town after an unforgettable birthday ride. Completed just short of 300km with a 40kg bike pack, 3,200m climbing, 14 hours of pure adrenaline, and a top speed of over 75km/h. Time to dive back into work focus and training for the next adventure. The beat goes on!',
      travel: {
        method: 'bicycle',
        distanceKm: 150,
        totalDistanceKm: 300,
        duration: '2 days outbound, 2 days return',
        description:
          'A birthday pilgrimage: 300km round trip from Woodstock, Cape Town, through Sir Lowry\u2019s Pass and Houwhoek Pass to Elandskloof Guest Farm. Day one covered 80km to Grabouw via Sir Lowry\u2019s Pass. Day two \u2014 his birthday \u2014 was the final 75km to Origin Festival.',
        gearCarried: [
          'UV paints',
          'Brush kit',
          'Mirror stand',
          'Camping gear',
          'Touring panniers',
        ],
        bikePackWeightKg: 40,
        elevationGainM: 3200,
        topSpeedKmh: 75,
        routeHighlights: [
          'Sir Lowry\u2019s Pass',
          'Grabouw',
          'Elgin Valley',
          'Houwhoek Pass',
          'Helderstroom',
        ],
        roundTrip: true,
        returnDescription:
          'Cycled back to a farm in Elgin on Monday to decompress, then the full return to Cape Town on Tuesday. Beautiful sunset over Elgin on the way back.',
        companions: 'Solo',
      },
      relatedBlogSlugs: [],
    },

    /* ════════════════════════════════════════════════
       2025
       ════════════════════════════════════════════════ */
    {
      id: 'origin-2025',
      year: 2025,
      startDate: '2025-01-31',
      endDate: '2025-02-02',
      status: 'attended',
      role: 'UV face painter & attendee',
      activities: ['UV face painting', 'Neon body art'],
      highlights:
        'Another birthday weekend on the dancefloor with the trance family. Painted faces by day, watched the UV cannons light them up by night.',
    },

    /* ════════════════════════════════════════════════
       2024
       ════════════════════════════════════════════════ */
    {
      id: 'origin-2024',
      year: 2024,
      startDate: '2024-01-26',
      endDate: '2024-01-28',
      status: 'attended',
      role: 'UV face painter & attendee',
      activities: ['UV face painting', 'Neon body art'],
      highlights:
        'Celebrated his birthday at Origin for the third consecutive year. The psychedelic decor and thumping basslines were perfection as always.',
    },

    /* ════════════════════════════════════════════════
       2023 — Birthday sash ride to Grabouw
       ════════════════════════════════════════════════ */
    {
      id: 'origin-2023',
      year: 2023,
      startDate: '2023-01-27',
      endDate: '2023-01-29',
      status: 'attended',
      role: 'UV face painter & attendee',
      activities: ['UV face painting', 'Neon body art'],
      highlights:
        'Left the festival on his birthday and someone gave him a happy birthday sash to wear. He cycled the whole way to Peregrine Farmstall in Grabouw wearing it \u2014 leaving on his birthday, it felt perfectly fitting to carry the celebration all the way down the road.',
      personalNote:
        'Cycling away from Origin on my birthday wearing a happy birthday sash felt like the most "me" thing imaginable. The ride to Peregrine Farmstall in Grabouw was pure joy.',
      travel: {
        method: 'bicycle',
        description:
          'Cycled to and from Origin Festival. On the return, he wore a birthday sash gifted by a fellow festival-goer all the way to Peregrine Farmstall in Grabouw, Western Cape.',
        routeHighlights: [
          'Helderstroom',
          'Houwhoek Pass',
          'Peregrine Farmstall, Grabouw',
        ],
        roundTrip: true,
        companions: 'Solo',
      },
    },

    /* ════════════════════════════════════════════════
       2022 — First year of the annual tradition
       ════════════════════════════════════════════════ */
    {
      id: 'origin-2022',
      year: 2022,
      startDate: '2022-01-28',
      endDate: '2022-01-30',
      status: 'attended',
      role: 'UV face painter & attendee',
      activities: ['UV face painting', 'Neon body art'],
      highlights:
        'The year the annual Origin tradition truly began. After the COVID gap, returning to the festival grounds on two wheels felt like coming home. The start of an unbroken streak.',
      travel: {
        method: 'bicycle',
        description:
          'Cycled to and from Origin Festival, re-establishing the pilgrimage tradition after the COVID gap year.',
        roundTrip: true,
        companions: 'Solo',
      },
    },

    /* ════════════════════════════════════════════════
       2021 — COVID gap year
       ════════════════════════════════════════════════ */
    {
      id: 'origin-2021',
      year: 2021,
      startDate: '2021-01-29',
      endDate: '2021-01-31',
      status: 'cancelled',
      role: '',
      highlights:
        'Origin Festival was not held due to COVID-19 restrictions in South Africa.',
    },

    /* ════════════════════════════════════════════════
       2020 — Pre-COVID, the first ride
       ════════════════════════════════════════════════ */
    {
      id: 'origin-2020',
      year: 2020,
      startDate: '2020-01-31',
      endDate: '2020-02-02',
      status: 'attended',
      role: 'Attendee & face painter',
      activities: ['Face painting', 'Festival camping'],
      highlights:
        'The very first cycling pilgrimage to Origin Festival, just before the world locked down. A formative experience that planted the seed for every ride that followed.',
      personalNote:
        'Little did anyone know this would be the last big gathering before everything changed. Grateful to have made the ride when he did.',
      travel: {
        method: 'bicycle',
        description:
          'First ever cycling pilgrimage to Origin Festival. The ride that started the tradition, completed just weeks before COVID-19 lockdowns began in South Africa.',
        roundTrip: true,
        companions: 'Solo',
      },
    },
  ],

  relatedContent: {
    portfolioIds: [],
    blogSlugs: [],
    videoIds: [],
  },

  faqs: [
    {
      id: 'origin-faq-1',
      question: 'What is Origin Festival?',
      answer:
        'Origin Festival is an annual psytrance music gathering held on Elandskloof Guest Farm in Helderstroom, Western Cape, South Africa. It features multiple stages, psychedelic decor, and a vibrant community of artists and music lovers.',
    },
    {
      id: 'origin-faq-2',
      question: 'Why does Ash cycle to Origin Festival?',
      answer:
        'For Ash, the pilgrimage is as important as the event itself. Cycling to a psytrance festival is a meditation \u2014 a way to cleanse the mind before entering the psychedelic playground. He carries all his UV paint gear on a loaded touring bike across mountain passes.',
    },
    {
      id: 'origin-faq-3',
      question: 'How far is the cycling route to Origin Festival?',
      answer:
        'The round trip from Cape Town (Woodstock) to Elandskloof Guest Farm in Helderstroom is approximately 300km, crossing Sir Lowry\u2019s Pass and Houwhoek Pass with around 3,200m of total elevation gain.',
    },
  ],
};