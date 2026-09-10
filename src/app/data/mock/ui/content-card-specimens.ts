/**
 * Content Card Specimens Data
 *
 * Sample card data for 5 content types (blog, portfolio, video, podcast, event)
 * across 5 card variants (standard, featured, compact, minimal, editorial).
 * Used by the Content Card Gallery dev tool page.
 *
 * @module data/mock/ui/content-card-specimens
 * @version 1.0.0
 */

export interface CardSpecimenItem {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime?: number;
  duration?: string;
  imageAlt: string;
  tags: string[];
  author?: string;
  episodeNumber?: number;
  season?: number;
  location?: string;
  views?: number;
}

export interface CardVariant {
  id: string;
  label: string;
  description: string;
  useCase: string;
}

export var cardVariants: CardVariant[] = [
  {
    id: 'standard',
    label: 'Standard',
    description: 'Default grid card with image, title, meta, and excerpt',
    useCase: 'Archive and listing pages',
  },
  {
    id: 'featured',
    label: 'Featured',
    description: 'Large hero card with full-width image and overlay text',
    useCase: 'Homepage features, top of archives',
  },
  {
    id: 'compact',
    label: 'Compact',
    description: 'Small horizontal card with thumbnail left, text right',
    useCase: 'Sidebar, related content sections',
  },
  {
    id: 'minimal',
    label: 'Minimal',
    description: 'Text-only with subtle border, no image',
    useCase: 'Dense lists, search results',
  },
  {
    id: 'editorial',
    label: 'Editorial',
    description: 'Magazine-style with large typography and artistic crop',
    useCase: 'Special features, highlighted content',
  },
];

export var contentCardSpecimens: Record<string, CardSpecimenItem[]> = {
  blog: [
    {
      id: 'blog-1',
      title: 'UV makeup at Origin Festival 2026',
      excerpt: 'Three nights of neon artistry on the dancefloor, creating glowing portraits that became part of the music itself.',
      category: 'Festival',
      date: '2026-02-15',
      readTime: 8,
      imageAlt: 'UV makeup glowing under blacklight at Origin Festival',
      tags: ['uv-makeup', 'origin', 'festival'],
      author: 'Ash Shaw',
    },
    {
      id: 'blog-2',
      title: 'The loaded bike: 40kg of everything',
      excerpt: 'How I pack forty kilograms onto a bicycle and ride across countries — the gear list, the lessons, the liberation.',
      category: 'Travel',
      date: '2022-03-01',
      readTime: 6,
      imageAlt: 'Loaded touring bicycle against mountain backdrop',
      tags: ['cycling', 'bikepacking', 'travel'],
      author: 'Ash Shaw',
    },
    {
      id: 'blog-3',
      title: 'ADHD brain on the dancefloor',
      excerpt: 'The neurodivergent experience of finding perfect focus through movement, bass, and creative flow states.',
      category: 'Insights',
      date: '2025-08-12',
      readTime: 5,
      imageAlt: 'Abstract neon brain pattern on dark background',
      tags: ['adhd', 'neurodivergent', 'creativity'],
      author: 'Ash Shaw',
    },
  ],
  portfolio: [
    {
      id: 'portfolio-1',
      title: 'Neon circuit at Berghain',
      excerpt: 'Geometric circuit board patterns in electric green and hot pink, applied in the legendary Berlin club.',
      category: 'UV makeup',
      date: '2023-06-14',
      imageAlt: 'Neon circuit pattern UV makeup under blacklight',
      tags: ['uv-makeup', 'berghain', 'geometric'],
      location: 'Berlin',
    },
    {
      id: 'portfolio-2',
      title: 'Sacred geometry face at Vortex',
      excerpt: 'Flower of life and metatron cube patterns blending ancient symbolism with modern UV pigments.',
      category: 'Festival',
      date: '2024-01-20',
      imageAlt: 'Sacred geometry UV face paint at Vortex festival',
      tags: ['sacred-geometry', 'vortex', 'uv-makeup'],
      location: 'Riviersonderend',
    },
    {
      id: 'portfolio-3',
      title: 'Cyborg renaissance series',
      excerpt: 'Exploring the boundary between organic and digital through editorial makeup — skin meets circuitry.',
      category: 'Editorial',
      date: '2024-08-05',
      imageAlt: 'Cyborg renaissance editorial makeup close-up',
      tags: ['editorial', 'experimental', 'cyborg'],
      location: 'Cape Town',
    },
  ],
  video: [
    {
      id: 'video-1',
      title: 'UV makeup tutorial: beginner to bold',
      excerpt: 'Step-by-step guide to creating your first UV reactive face design — from base preparation to final seal.',
      category: 'Tutorial',
      date: '2024-05-10',
      duration: '14:32',
      imageAlt: 'UV makeup application tutorial screenshot',
      tags: ['tutorial', 'uv-makeup', 'beginner'],
      views: 12400,
    },
    {
      id: 'video-2',
      title: 'Cape Town dancefloor: weekend in the UV booth',
      excerpt: 'A documentary-style look at a typical weekend painting faces at Cape Town underground events.',
      category: 'Documentary',
      date: '2025-11-20',
      duration: '13:20',
      imageAlt: 'UV booth at Cape Town dancefloor event',
      tags: ['documentary', 'cape-town', 'dancefloor'],
      views: 8200,
    },
    {
      id: 'video-3',
      title: 'Berlin to Prague by bike: festival pilgrimage',
      excerpt: 'Bikepacking 400km from Berlin through the Czech countryside to reach a psytrance gathering in the forest.',
      category: 'Cycling',
      date: '2024-09-15',
      duration: '16:55',
      imageAlt: 'Cycling through Czech countryside with loaded bicycle',
      tags: ['cycling', 'bikepacking', 'berlin-prague'],
      views: 5600,
    },
  ],
  podcast: [
    {
      id: 'podcast-1',
      title: 'The dancefloor as canvas',
      excerpt: 'Ash explores how the festival dancefloor became his primary art studio and creative laboratory.',
      category: 'Introduction',
      date: '2024-01-15',
      duration: '42:15',
      imageAlt: 'Podcast cover art with neon microphone',
      tags: ['creativity', 'festivals', 'art'],
      episodeNumber: 1,
      season: 1,
    },
    {
      id: 'podcast-2',
      title: 'Six Cats: growing something real',
      excerpt: 'An honest conversation about cultivating patience, cannabis culture in Cape Town, and the cats who run the garden.',
      category: 'Lifestyle',
      date: '2024-03-01',
      duration: '38:40',
      imageAlt: 'Six Cats garden setting with plants',
      tags: ['six-cats', 'cape-town', 'cultivation'],
      episodeNumber: 3,
      season: 1,
    },
    {
      id: 'podcast-3',
      title: 'ADHD and the creative advantage',
      excerpt: 'Raw conversation about neurodivergent creativity, hyperfocus, and why ADHD brains thrive in chaos.',
      category: 'Personal',
      date: '2024-06-15',
      duration: '45:30',
      imageAlt: 'Abstract brain pattern podcast artwork',
      tags: ['adhd', 'neurodivergent', 'creativity'],
      episodeNumber: 5,
      season: 1,
    },
  ],
  event: [
    {
      id: 'event-1',
      title: 'Origin Festival 2026',
      excerpt: 'South Africa\'s premier psytrance gathering in the Cederberg mountains. Three days of UV art under the stars.',
      category: 'Psytrance',
      date: '2026-02-13',
      imageAlt: 'Origin Festival stage with laser lights',
      tags: ['origin', 'psytrance', 'south-africa'],
      location: 'Cederberg, Western Cape',
    },
    {
      id: 'event-2',
      title: 'Nation of Gondwana',
      excerpt: 'The friendliest festival in Brandenburg — three days of techno, trance, and community in the German countryside.',
      category: 'Techno',
      date: '2025-07-18',
      imageAlt: 'Nation of Gondwana festival lake view',
      tags: ['gondwana', 'techno', 'germany'],
      location: 'Gruenefeld, Brandenburg',
    },
    {
      id: 'event-3',
      title: 'Organik Cape Town',
      excerpt: 'Cape Town\'s underground outdoor dance gathering — small, intimate, and deeply connected to the local scene.',
      category: 'Underground',
      date: '2025-12-06',
      imageAlt: 'Organik outdoor dance event in Cape Town',
      tags: ['organik', 'cape-town', 'underground'],
      location: 'Cape Town, Western Cape',
    },
  ],
};

export var contextLayouts = [
  { id: 'grid-3', label: '3-column grid', description: 'Standard archive view', columns: 3 },
  { id: 'grid-2', label: '2-column grid', description: 'Tablet layout', columns: 2 },
  { id: 'list-1', label: '1-column list', description: 'Mobile or list view', columns: 1 },
  { id: 'featured-row', label: 'Featured row', description: '1 large + 2 small', columns: 0 },
];

export var pageIntro = {
  badge: 'Content',
  title: 'Content card gallery',
  subtitle: '5 card variants for each content type — standard, featured, compact, minimal, and editorial — with hover effects, neon accents, and theme previews.',
};
