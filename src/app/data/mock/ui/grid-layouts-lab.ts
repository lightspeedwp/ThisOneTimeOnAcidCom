/**
 * @fileoverview Grid Layouts Lab — 6 grid layout specimen definitions
 * Used by GridLayoutsLabPage dev tool
 *
 * @module data/mock/ui/grid-layouts-lab
 * @version 2.0.0 — Added Unsplash image URLs for UV makeup art
 */

export interface GridLayoutDefinition {
  id: string;
  name: string;
  description: string;
  bemModifier: string;
  defaultPagination: 'numbered' | 'load-more' | 'infinite' | 'arrows' | 'filter-chips';
  columnPattern: string;
}

export interface GridSampleCard {
  id: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  imageAlt: string;
  image: string;
  aspect: 'portrait' | 'landscape' | 'square';
  contentType: 'blog' | 'portfolio' | 'video' | 'podcast' | 'event' | 'ebook';
}

export var gridLayoutDefinitions: GridLayoutDefinition[] = [
  {
    id: 'uniform',
    name: 'Uniform grid',
    description: 'Standard equal-size cards in responsive columns. All cards share the same height and width for a clean, orderly layout.',
    bemModifier: 'uniform',
    defaultPagination: 'numbered',
    columnPattern: '1 \u2192 2 \u2192 3 \u2192 4 columns',
  },
  {
    id: 'masonry',
    name: 'Masonry grid',
    description: 'Pinterest-style layout with mixed card heights based on content and image aspect ratio. Cards flow naturally into available space.',
    bemModifier: 'masonry',
    defaultPagination: 'infinite',
    columnPattern: '1 \u2192 2 \u2192 3 \u2192 4 columns (variable heights)',
  },
  {
    id: 'featured',
    name: 'Featured hero + grid',
    description: 'First card is a full-width hero with large image and text overlay. Remaining cards in a standard grid below.',
    bemModifier: 'featured',
    defaultPagination: 'load-more',
    columnPattern: '1 hero + 3 column grid',
  },
  {
    id: 'bento',
    name: 'Bento grid',
    description: 'CSS Grid with predefined template areas \u2014 some cards span 2 rows, some span 2 columns. Irregular, magazine-like layout.',
    bemModifier: 'bento',
    defaultPagination: 'numbered',
    columnPattern: 'Mixed spans: 2\u00d72, 2\u00d71, 1\u00d71',
  },
  {
    id: 'carousel',
    name: 'Carousel / horizontal scroll',
    description: 'Horizontal scrolling strip with snap points. Fixed-width cards with arrow navigation and dot indicators.',
    bemModifier: 'carousel',
    defaultPagination: 'arrows',
    columnPattern: 'Horizontal scroll (snap)',
  },
  {
    id: 'category-columns',
    name: 'Category-sorted columns',
    description: 'Cards sorted into vertical columns by category. Each column header shows category name with neon colour accent and card count.',
    bemModifier: 'category-columns',
    defaultPagination: 'filter-chips',
    columnPattern: '1 column per category',
  },
];

export var gridSampleCards: GridSampleCard[] = [
  {
    id: 'grid-1',
    title: 'UV bodywork at Origin Festival',
    category: 'Festival',
    date: 'Feb 2026',
    excerpt: 'A look behind the scenes at this year\u2019s UV makeup station at Origin Festival in Cape Town.',
    imageAlt: 'UV reactive face paint at Origin Festival',
    image: 'https://images.unsplash.com/photo-1579483885340-a35d54dfc318?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxVViUyMGZhY2UlMjBwYWludCUyMG5lb24lMjBnbG93fGVufDF8fHx8MTc3MjgxNDE0N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    aspect: 'landscape',
    contentType: 'portfolio',
  },
  {
    id: 'grid-2',
    title: 'Neon colour theory for beginners',
    category: 'Tutorial',
    date: 'Jan 2026',
    excerpt: 'Understanding complementary neon palettes and how to make them pop under blacklight.',
    imageAlt: 'Neon paint swatches in complementary colour pairs',
    image: 'https://images.unsplash.com/photo-1669479412055-103edfb64cc4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZW9uJTIwcGFpbnQlMjBwb3J0cmFpdCUyMGRhcmslMjBiYWNrZ3JvdW5kfGVufDF8fHx8MTc3MjgxNDE0OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    aspect: 'portrait',
    contentType: 'blog',
  },
  {
    id: 'grid-3',
    title: 'Berlin club season: my setup',
    category: 'Behind the scenes',
    date: 'May 2025',
    excerpt: 'The complete kit I bring to every Berlin club night.',
    imageAlt: 'Compact UV makeup kit on a dark surface',
    image: 'https://images.unsplash.com/photo-1761977317722-ccfc3dbbfb40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZW9uJTIwbWFrZXVwJTIwYXJ0aXN0aWMlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzI4MTQxNTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    aspect: 'square',
    contentType: 'blog',
  },
  {
    id: 'grid-4',
    title: 'Sacred geometry face designs',
    category: 'Portfolio',
    date: 'Dec 2025',
    excerpt: 'Exploring sacred geometry and UV face painting \u2014 mandalas, fractals, and the flower of life.',
    imageAlt: 'Sacred geometry face painting under UV light',
    image: 'https://images.unsplash.com/photo-1765334666980-ccaf4b0a047a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFja2xpZ2h0JTIwZmFjZSUyMGFydCUyMGNvbG9yc3xlbnwxfHx8fDE3NzI4MTQxNTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    aspect: 'portrait',
    contentType: 'portfolio',
  },
  {
    id: 'grid-5',
    title: 'How I paint live at festivals',
    category: 'Video',
    date: 'Nov 2025',
    excerpt: 'Full-length video tutorial on my live festival painting process from start to finish.',
    imageAlt: 'Video thumbnail of live festival painting session',
    image: 'https://images.unsplash.com/photo-1542331180-256bcd8edad7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZW9uJTIwbGlnaHRzJTIwcG9ydHJhaXQlMjBjb2xvcmZ1bHxlbnwxfHx8fDE3NzI4MTQxNTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    aspect: 'landscape',
    contentType: 'video',
  },
  {
    id: 'grid-6',
    title: 'The dancefloor gave me everything',
    category: 'Podcast',
    date: 'Oct 2025',
    excerpt: 'Reflecting on how psytrance culture and festival communities shaped my creative identity.',
    imageAlt: 'Podcast cover art with neon waveform graphic',
    image: 'https://images.unsplash.com/photo-1713735962775-2c1e22bed453?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxVViUyMGJsYWNrbGlnaHQlMjBwYXJ0eSUyMGNyb3dkfGVufDF8fHx8MTc3MjgxNDE1M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    aspect: 'square',
    contentType: 'podcast',
  },
  {
    id: 'grid-7',
    title: 'Koh Phangan full moon crew',
    category: 'Event',
    date: 'Oct 2025',
    excerpt: 'Full moon party on the beach \u2014 painting the crew with reactive tribal patterns.',
    imageAlt: 'Group photo of UV-painted faces at beach party',
    image: 'https://images.unsplash.com/photo-1718058537428-a37acf22c1b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnZW9tZXRyaWMlMjBmYWNlJTIwcGFpbnQlMjB0cmliYWx8ZW58MXx8fHwxNzcyODE0MTUzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    aspect: 'landscape',
    contentType: 'event',
  },
  {
    id: 'grid-8',
    title: 'Woodstock studio session',
    category: 'Behind the scenes',
    date: 'Sep 2025',
    excerpt: 'A rainy Cape Town afternoon in the studio, experimenting with new pigment combinations.',
    imageAlt: 'Artist workspace with UV paints in a sunlit studio',
    image: 'https://images.unsplash.com/photo-1768278929581-7f38d1ce1fb2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWNyZWQlMjBnZW9tZXRyeSUyMGFydCUyMG1hbmRhbGF8ZW58MXx8fHwxNzcyODE0MTU0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    aspect: 'portrait',
    contentType: 'blog',
  },
  {
    id: 'grid-9',
    title: 'Vortex open-air body art',
    category: 'Festival',
    date: 'Mar 2025',
    excerpt: 'Three days of non-stop body painting at Vortex open-air psytrance gathering.',
    imageAlt: 'Outdoor festival with UV art installations',
    image: 'https://images.unsplash.com/photo-1742163512400-7af30b2d17cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZW9uJTIwcG9ydHJhaXQlMjBwaG90b2dyYXBoeSUyMGFydGlzdGljfGVufDF8fHx8MTc3MjgxNDE1NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    aspect: 'landscape',
    contentType: 'event',
  },
  {
    id: 'grid-10',
    title: 'Reactive pigments deep dive',
    category: 'Tutorial',
    date: 'Aug 2025',
    excerpt: 'Comparing 15 different UV pigment brands for coverage, glow intensity, and skin safety.',
    imageAlt: 'UV pigment comparison swatches under blacklight',
    image: 'https://images.unsplash.com/photo-1576135711730-51049b41de78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMHBhaW50JTIwZmFjZSUyMGNsb3NldXB8ZW58MXx8fHwxNzcyODE0MTU0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    aspect: 'square',
    contentType: 'blog',
  },
  {
    id: 'grid-11',
    title: 'Solipse eclipse face collection',
    category: 'Portfolio',
    date: 'Jul 2025',
    excerpt: 'Eclipse-themed face paintings created for the Solipse gathering \u2014 celestial bodies meet neon.',
    imageAlt: 'Eclipse-themed face painting with crescent moon motifs',
    image: 'https://images.unsplash.com/photo-1759831403998-59e0ecd64552?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZXN0aXZhbCUyMGZhY2UlMjBwYWludGluZyUyMGNvbG9yc3xlbnwxfHx8fDE3NzI4MTQxNTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    aspect: 'portrait',
    contentType: 'portfolio',
  },
  {
    id: 'grid-12',
    title: 'ADHD and the creative flow state',
    category: 'Lifestyle',
    date: 'Jun 2025',
    excerpt: 'How ADHD shapes my hyperfocus sessions and why painting at festivals is the ultimate flow state.',
    imageAlt: 'Abstract neon art representing creative flow',
    image: 'https://images.unsplash.com/photo-1763449448643-36ab13ff7d88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbHVvcmVzY2VudCUyMG5lb24lMjBhYnN0cmFjdCUyMHBhaW50aW5nfGVufDF8fHx8MTc3MjgxNDE1Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    aspect: 'landscape',
    contentType: 'blog',
  },
];

export var paginationOptions = [
  { id: 'numbered', label: 'Numbered pages' },
  { id: 'load-more', label: 'Load more' },
  { id: 'infinite', label: 'Infinite scroll' },
];

export var gridLayoutsPageUI = {
  hero: {
    badge: 'Lab',
    title: 'Grid layouts',
    description: 'Six grid layout specimens with switchable pagination strategies. Each layout demonstrates a unique card arrangement \u2014 from uniform grids to bento boxes and horizontal carousels.',
  },
};