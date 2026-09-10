/**
 * @fileoverview Card Shapes Lab — 11 card shape specimen definitions
 * Used by CardShapesLabPage dev tool
 *
 * @module data/mock/ui/card-shapes-lab
 * @version 2.0.0 — Added Unsplash image URLs for UV makeup art
 */

export interface CardShapeDefinition {
  id: string;
  name: string;
  description: string;
  bemModifier: string;
  category: 'analog' | 'geometric' | 'digital' | 'artistic';
}

export interface CardShapeSample {
  id: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  imageAlt: string;
  image: string;
  frameNumber?: number;
}

export var cardShapeDefinitions: CardShapeDefinition[] = [
  {
    id: 'polaroid',
    name: 'Polaroid',
    description: 'White border with thick bottom caption area, slight random rotation per card. Drop shadow simulates a physical photo on a surface.',
    bemModifier: 'polaroid',
    category: 'analog',
  },
  {
    id: 'masonry',
    name: 'Masonry / Pinterest',
    description: 'Mixed aspect ratios \u2014 portrait, landscape, and square \u2014 flowing naturally in columns with no uniform height.',
    bemModifier: 'masonry',
    category: 'geometric',
  },
  {
    id: 'hexagonal',
    name: 'Hexagonal',
    description: 'Hexagon clip-path on the image with honeycomb grid alignment. Neon border glow follows the hexagonal outline.',
    bemModifier: 'hexagonal',
    category: 'geometric',
  },
  {
    id: 'glass',
    name: 'Glassmorphism',
    description: 'Frosted glass overlay on the image with backdrop blur. Title and metadata float above the blurred background.',
    bemModifier: 'glass',
    category: 'digital',
  },
  {
    id: 'editorial',
    name: 'Magazine editorial',
    description: 'Oversized featured cards mixed with standard cards. Text overlaid with gradient mask and large display typography.',
    bemModifier: 'editorial',
    category: 'artistic',
  },
  {
    id: 'filmstrip',
    name: 'Film strip',
    description: 'Card styled as a 35mm film frame with sprocket holes. Warm colour cast lifts on hover to reveal full colour.',
    bemModifier: 'filmstrip',
    category: 'analog',
  },
  {
    id: 'vinyl',
    name: 'Vinyl record',
    description: 'Circular card clipped to a disc with a centre label. On hover, a rectangular sleeve slides out revealing description text.',
    bemModifier: 'vinyl',
    category: 'analog',
  },
  {
    id: 'torn',
    name: 'Torn paper',
    description: 'Ragged torn edges using irregular clip-path polygon. Layered appearance with cards slightly overlapping.',
    bemModifier: 'torn',
    category: 'artistic',
  },
  {
    id: 'neon-sign',
    name: 'Neon sign',
    description: 'Card outline rendered as glowing neon tube segments. Title text has neon glow and the sign flickers on hover.',
    bemModifier: 'neon-sign',
    category: 'digital',
  },
  {
    id: 'fan',
    name: 'Stacked fan',
    description: 'Three image layers stacked with slight rotation offsets. On hover, the stack fans out to reveal all images.',
    bemModifier: 'fan',
    category: 'artistic',
  },
  {
    id: 'holographic',
    name: 'Holographic',
    description: 'Iridescent gradient overlay that shifts with mouse position. Rainbow shimmer effect with foil-stamp texture.',
    bemModifier: 'holographic',
    category: 'digital',
  },
];

export var cardShapesLabSamples: CardShapeSample[] = [
  {
    id: 'sample-1',
    title: 'UV bodywork at Origin Festival',
    category: 'Festival',
    date: 'Feb 2026',
    excerpt: 'A look behind the scenes at this year\u2019s UV makeup station at Origin Festival in Cape Town.',
    imageAlt: 'UV reactive face paint glowing under blacklight at Origin Festival',
    image: 'https://images.unsplash.com/photo-1579483885340-a35d54dfc318?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxVViUyMGZhY2UlMjBwYWludCUyMG5lb24lMjBnbG93fGVufDF8fHx8MTc3MjgxNDE0N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 'sample-2',
    title: 'Neon colour theory for beginners',
    category: 'Tutorial',
    date: 'Jan 2026',
    excerpt: 'Understanding complementary neon palettes and how to make them pop under blacklight.',
    imageAlt: 'Neon paint swatches arranged in complementary colour pairs',
    image: 'https://images.unsplash.com/photo-1579483885149-47cd52fcc7ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZW9uJTIwYm9keSUyMHBhaW50JTIwYmxhY2tsaWdodHxlbnwxfHx8fDE3NzI4MTQxNDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 'sample-3',
    title: 'Berlin club season: my setup',
    category: 'Behind the scenes',
    date: 'May 2025',
    excerpt: 'The complete kit I bring to every Berlin club night \u2014 compact, durable, and ready to glow.',
    imageAlt: 'Compact UV makeup kit laid out on a dark surface',
    image: 'https://images.unsplash.com/photo-1747121445324-8ed1aec4b451?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxVViUyMHJlYWN0aXZlJTIwbWFrZXVwJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzcyODE0MTQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 'sample-4',
    title: 'Sacred geometry face designs',
    category: 'Portfolio',
    date: 'Dec 2025',
    excerpt: 'Exploring the intersection of sacred geometry and UV face painting \u2014 mandalas, fractals, and flower of life.',
    imageAlt: 'Sacred geometry mandala painted on a face glowing under UV light',
    image: 'https://images.unsplash.com/photo-1587411598179-224f52407507?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbHVvcmVzY2VudCUyMGZhY2UlMjBwYWludCUyMGZlc3RpdmFsfGVufDF8fHx8MTc3MjgxNDE0OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 'sample-5',
    title: 'Koh Phangan full moon crew',
    category: 'Event',
    date: 'Oct 2025',
    excerpt: 'Full moon party on the beach \u2014 painting the crew with reactive tribal patterns before the bass drops.',
    imageAlt: 'Group photo of UV-painted faces at a beach party',
    image: 'https://images.unsplash.com/photo-1669479412055-103edfb64cc4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZW9uJTIwcGFpbnQlMjBwb3J0cmFpdCUyMGRhcmslMjBiYWNrZ3JvdW5kfGVufDF8fHx8MTc3MjgxNDE0OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 'sample-6',
    title: 'Woodstock studio session',
    category: 'Studio',
    date: 'Nov 2025',
    excerpt: 'A rainy Cape Town afternoon in the Woodstock studio, experimenting with new pigment combinations.',
    imageAlt: 'Artist workspace with UV paints and brushes in a sunlit studio',
    image: 'https://images.unsplash.com/photo-1558613502-3d41e521aa08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxVViUyMGJvZHklMjBwYWludCUyMHJhdmUlMjBwYXJ0eXxlbnwxfHx8fDE3NzI4MTQxNTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 'sample-7',
    title: 'The art of the blacklight reveal',
    category: 'Tutorial',
    date: 'Sep 2025',
    excerpt: 'How to layer invisible UV pigments that only appear when the blacklight hits \u2014 the ultimate reveal technique.',
    imageAlt: 'Split image showing face paint in daylight versus blacklight',
    image: 'https://images.unsplash.com/photo-1761977317722-ccfc3dbbfb40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZW9uJTIwbWFrZXVwJTIwYXJ0aXN0aWMlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzI4MTQxNTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 'sample-8',
    title: 'Vortex open-air body art',
    category: 'Festival',
    date: 'Mar 2025',
    excerpt: 'Three days of non-stop body painting at Vortex open-air psytrance gathering in South Africa.',
    imageAlt: 'Panoramic view of an outdoor festival with UV art installations',
    image: 'https://images.unsplash.com/photo-1765334666980-ccaf4b0a047a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFja2xpZ2h0JTIwZmFjZSUyMGFydCUyMGNvbG9yc3xlbnwxfHx8fDE3NzI4MTQxNTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 'sample-9',
    title: 'Solipse eclipse face collection',
    category: 'Portfolio',
    date: 'Aug 2025',
    excerpt: 'Eclipse-themed face paintings created for the Solipse gathering \u2014 celestial bodies meet neon.',
    imageAlt: 'Eclipse-themed face painting with crescent moon and sun motifs',
    image: 'https://images.unsplash.com/photo-1759831403998-59e0ecd64552?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZXN0aXZhbCUyMGZhY2UlMjBwYWludGluZyUyMGNvbG9yc3xlbnwxfHx8fDE3NzI4MTQxNTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 'sample-10',
    title: 'Cycling the garden route with paint',
    category: 'Lifestyle',
    date: 'Jul 2025',
    excerpt: 'Taking the paints on a Garden Route cycling trip \u2014 pop-up UV sessions at every stop along the way.',
    imageAlt: 'Bicycle loaded with art supplies on a coastal road',
    image: 'https://images.unsplash.com/photo-1759236674261-54ee335a96b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxVViUyMGdsb3clMjBwYWludCUyMGhhbmRzJTIwYXJ0fGVufDF8fHx8MTc3MjgxNDE1MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 'sample-11',
    title: 'Six Cats garden party glow-up',
    category: 'Event',
    date: 'Jun 2025',
    excerpt: 'UV painting session in the Six Cats garden \u2014 cats, cannabis, and creative energy under the stars.',
    imageAlt: 'Garden party scene with UV art and ambient lighting',
    image: 'https://images.unsplash.com/photo-1542331180-256bcd8edad7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZW9uJTIwbGlnaHRzJTIwcG9ydHJhaXQlMjBjb2xvcmZ1bHxlbnwxfHx8fDE3NzI4MTQxNTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 'sample-12',
    title: 'Muay Thai meets body art',
    category: 'Lifestyle',
    date: 'Oct 2025',
    excerpt: 'Blending martial arts and body art in Thailand \u2014 traditional Sak Yant inspired UV designs.',
    imageAlt: 'UV reactive Sak Yant inspired tattoo design on skin',
    image: 'https://images.unsplash.com/photo-1763280763684-9f4a02e5a18e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib2R5JTIwcGFpbnQlMjBhcnQlMjBkYXJrJTIwc3R1ZGlvfGVufDF8fHx8MTc3MjgxNDE1Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
];

export var cardShapesPageUI = {
  hero: {
    badge: 'Lab',
    title: 'Card shapes',
    description: 'Eleven unique card shapes \u2014 from analog polaroids and film strips to digital glassmorphism and holographic shimmer. Each shape rendered with sample content from the portfolio.',
  },
  categories: [
    { id: 'all', label: 'All shapes' },
    { id: 'analog', label: 'Analog' },
    { id: 'geometric', label: 'Geometric' },
    { id: 'digital', label: 'Digital' },
    { id: 'artistic', label: 'Artistic' },
  ],
};