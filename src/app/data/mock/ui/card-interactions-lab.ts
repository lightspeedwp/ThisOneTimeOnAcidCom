/**
 * @fileoverview Card Interactions Lab — 10 card interaction specimen definitions
 * Used by CardInteractionsLabPage dev tool
 *
 * @module data/mock/ui/card-interactions-lab
 * @version 2.0.0 — Added Unsplash image URLs for UV makeup art
 */

export interface CardInteractionDefinition {
  id: string;
  name: string;
  description: string;
  bemModifier: string;
  animationType: 'css-only' | 'js-required' | 'hybrid';
  triggerType: 'hover' | 'click' | 'proximity' | 'hover+click';
}

export interface CardInteractionSample {
  id: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  imageAlt: string;
  image: string;
  tags: string[];
}

export var cardInteractionDefinitions: CardInteractionDefinition[] = [
  {
    id: 'reveal',
    name: 'Reveal on hover',
    description: 'Card shows only the image at rest. On hover, title, category, and excerpt slide up from the bottom with a dark gradient overlay.',
    bemModifier: 'reveal',
    animationType: 'css-only',
    triggerType: 'hover',
  },
  {
    id: 'flip',
    name: 'Flip card',
    description: 'Front face shows image with category badge. Back face reveals description, tags, and a view link. 3D flip on hover with backface visibility hidden.',
    bemModifier: 'flip',
    animationType: 'css-only',
    triggerType: 'hover+click',
  },
  {
    id: 'neon-pulse',
    name: 'Neon border pulse',
    description: 'Card border glows in the content-type neon colour with a pulsing opacity animation. On hover, pulse speeds up and glow intensity increases.',
    bemModifier: 'neon-pulse',
    animationType: 'css-only',
    triggerType: 'hover',
  },
  {
    id: 'tilt',
    name: 'Tilt parallax',
    description: 'Card tilts toward the mouse cursor using CSS perspective and transform. Image layer shifts opposite direction for depth parallax effect.',
    bemModifier: 'tilt',
    animationType: 'js-required',
    triggerType: 'hover',
  },
  {
    id: 'blacklight',
    name: 'Blacklight reveal',
    description: 'Card appears desaturated and dim at rest. On hover, the UV blacklight turns on \u2014 full saturation and neon glow with purple-blue overlay fading out.',
    bemModifier: 'blacklight',
    animationType: 'css-only',
    triggerType: 'hover',
  },
  {
    id: 'magnetic',
    name: 'Magnetic pull',
    description: 'Card subtly shifts position toward the cursor when the mouse enters a proximity zone. Smooth elastic return to origin on mouse leave.',
    bemModifier: 'magnetic',
    animationType: 'js-required',
    triggerType: 'proximity',
  },
  {
    id: 'glitch',
    name: 'Glitch effect',
    description: 'On hover, RGB colour channels split horizontally with scan-line flicker overlay. Text shifts in alternating directions for a cyberpunk aesthetic.',
    bemModifier: 'glitch',
    animationType: 'css-only',
    triggerType: 'hover',
  },
  {
    id: 'morph',
    name: 'Morph expand',
    description: 'Card starts at standard size. On click, it smoothly expands inline to reveal full content. Other cards shift to accommodate. Click again to collapse.',
    bemModifier: 'morph',
    animationType: 'hybrid',
    triggerType: 'click',
  },
  {
    id: 'smoke',
    name: 'Smoke reveal',
    description: 'Fog overlay at rest using radial gradients. On hover, fog dissipates from centre outward to progressively reveal the image beneath.',
    bemModifier: 'smoke',
    animationType: 'css-only',
    triggerType: 'hover',
  },
  {
    id: 'trace',
    name: 'Neon trace',
    description: 'Card border starts invisible. On hover, an animated border line traces around the entire perimeter leaving a neon glow trail in the content-type colour.',
    bemModifier: 'trace',
    animationType: 'css-only',
    triggerType: 'hover',
  },
];

export var cardInteractionsLabSamples: CardInteractionSample[] = [
  {
    id: 'ix-1',
    title: 'Reactive pigments under UV',
    category: 'Tutorial',
    date: 'Feb 2026',
    excerpt: 'How different pigment bases react under various UV wavelengths \u2014 a practical guide for festival artists.',
    imageAlt: 'UV reactive pigments glowing in different colours',
    image: 'https://images.unsplash.com/photo-1763449448643-36ab13ff7d88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbHVvcmVzY2VudCUyMG5lb24lMjBhYnN0cmFjdCUyMHBhaW50aW5nfGVufDF8fHx8MTc3MjgxNDE1Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['UV', 'pigments', 'tutorial'],
  },
  {
    id: 'ix-2',
    title: 'Cape Town studio days',
    category: 'Behind the scenes',
    date: 'Jan 2026',
    excerpt: 'A typical day in the Woodstock studio \u2014 mixing paints, testing new techniques, and feeding the cats.',
    imageAlt: 'Artist studio with paints and brushes on a worktable',
    image: 'https://images.unsplash.com/photo-1713735962775-2c1e22bed453?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxVViUyMGJsYWNrbGlnaHQlMjBwYXJ0eSUyMGNyb3dkfGVufDF8fHx8MTc3MjgxNDE1M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['studio', 'Cape Town', 'process'],
  },
  {
    id: 'ix-3',
    title: 'Tribal UV patterns',
    category: 'Portfolio',
    date: 'Dec 2025',
    excerpt: 'Modern interpretations of tribal face painting using UV reactive paints \u2014 connecting ancient art with rave culture.',
    imageAlt: 'Tribal UV face paint pattern glowing on dark skin',
    image: 'https://images.unsplash.com/photo-1764563896063-6c299849034a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZW9uJTIwcGFpbnQlMjBzcGxhdHRlciUyMGFydHxlbnwxfHx8fDE3NzI4MTQxNTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['tribal', 'UV', 'culture'],
  },
  {
    id: 'ix-4',
    title: 'Festival essentials: the go-bag',
    category: 'Lifestyle',
    date: 'Nov 2025',
    excerpt: 'Everything in the festival go-bag \u2014 from brushes and paints to sunscreen and electrolytes.',
    imageAlt: 'Festival kit bag contents laid out flat',
    image: 'https://images.unsplash.com/photo-1718058537428-a37acf22c1b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnZW9tZXRyaWMlMjBmYWNlJTIwcGFpbnQlMjB0cmliYWx8ZW58MXx8fHwxNzcyODE0MTUzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['festival', 'gear', 'essentials'],
  },
  {
    id: 'ix-5',
    title: 'Berlin techno meets body art',
    category: 'Event',
    date: 'May 2025',
    excerpt: 'Painting faces at three Berlin clubs in one weekend \u2014 dark rooms, strobe lights, and neon that never stops.',
    imageAlt: 'Neon face paint glowing in a dark club environment',
    image: 'https://images.unsplash.com/photo-1768278929581-7f38d1ce1fb2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWNyZWQlMjBnZW9tZXRyeSUyMGFydCUyMG1hbmRhbGF8ZW58MXx8fHwxNzcyODE0MTU0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['Berlin', 'techno', 'club'],
  },
  {
    id: 'ix-6',
    title: 'The full moon paint crew',
    category: 'Event',
    date: 'Oct 2025',
    excerpt: 'Organising a crew of UV artists for the full moon party on Koh Phangan \u2014 the logistics of neon on sand.',
    imageAlt: 'Group of artists painting at a beach party at night',
    image: 'https://images.unsplash.com/photo-1742163512400-7af30b2d17cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZW9uJTIwcG9ydHJhaXQlMjBwaG90b2dyYXBoeSUyMGFydGlzdGljfGVufDF8fHx8MTc3MjgxNDE1NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['Koh Phangan', 'full moon', 'crew'],
  },
];

export var cardInteractionsPageUI = {
  hero: {
    badge: 'Lab',
    title: 'Card interactions',
    description: 'Ten unique hover, click, and proximity interactions \u2014 from subtle reveals and parallax tilts to glitch effects and neon traces. Each interaction demonstrated with live cards.',
  },
  filterLabels: [
    { id: 'all', label: 'All interactions' },
    { id: 'css-only', label: 'CSS only' },
    { id: 'js-required', label: 'JS required' },
    { id: 'hybrid', label: 'Hybrid' },
  ],
};