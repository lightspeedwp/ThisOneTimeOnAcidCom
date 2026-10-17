/**
 * @fileoverview Mock data for the Stickers gallery page
 * All page content lives here — no hardcoded strings in components.
 *
 * @module data/mock/ui/stickers
 * @version 3.0.0 — Added 7 new sticker theme categories (geometry, typography, neurodivergent, cycling, branding, berlin, spirals)
 */

/** Theme definition for sticker categorisation */
export interface StickerTheme {
  id: string;
  label: string;
}

/**
 * Sticker themes — order determines chip display order.
 * "all" is always first.
 */
export const stickerThemes: StickerTheme[] = [
  { id: 'all', label: 'All' },
  { id: 'spirals', label: 'Spirals' },
  { id: 'galaxy', label: 'Galaxy' },
  { id: 'psychedelic', label: 'Psychedelic' },
  { id: 'rainbow', label: 'Rainbow' },
  { id: 'geometry', label: 'Sacred geometry' },
  { id: 'typography', label: 'Festival phrases' },
  { id: 'neurodivergent', label: 'Neurodivergent pride' },
  { id: 'cycling', label: 'Cycling & endurance' },
  { id: 'branding', label: 'Six Cats & branding' },
  { id: 'berlin', label: 'Berlin scene' },
];

/**
 * Maps each sticker ID → theme ID.
 * Kept separate from the sticker-graphics module so existing
 * consumers (FaqSection, etc.) don't need changes.
 */
export const stickerThemeMap: Record<string, string> = {
  'neon-spiral': 'spirals',
  'neon-vortex': 'spirals',
  'cosmic-eye': 'psychedelic',
  'rainbow-paintbrush-eye': 'rainbow',
  'galaxy-eye-dark': 'galaxy',
  'galaxy-eye-wave': 'galaxy',
  'galaxy-eye-neon': 'galaxy',
  'psychedelic-eye': 'psychedelic',
  'ufo-breakfast-eye': 'rainbow',
  'mushroom-landscape-eye': 'psychedelic',
  'starburst-eye': 'rainbow',
  'neon-swirl-eye': 'psychedelic',
  'fractal-eye': 'spirals',
  'prism-burst-eye': 'rainbow',
  'starfield-eye': 'galaxy',
  'neon-wave-eye': 'rainbow',
  'alien-trio': 'psychedelic',
  'halftone-eye': 'rainbow',
  'mosaic-eye': 'rainbow',
  'aurora-vortex-eye': 'psychedelic',
  'imagine-eye': 'rainbow',
  'paint-dreams-eye': 'rainbow',
  'geo-pattern-eye': 'psychedelic',
  'rainbow-flow-eye': 'rainbow',
  'create-universe-eye': 'rainbow',
  'abstract-blocks-eye': 'galaxy',
  'makeup-artist': 'psychedelic',
  'flower-of-life': 'geometry',
  'metatrons-cube': 'geometry',
  'sri-yantra': 'geometry',
  'dance-until-sunrise': 'typography',
  '138-bpm': 'typography',
  'good-vibes-only': 'typography',
  'adhd-brain': 'neurodivergent',
  'wired-different': 'neurodivergent',
  'gravel-bike': 'cycling',
  'two-wheels-dancefloor': 'cycling',
  'six-cats': 'branding',
  'berlin-calling': 'berlin',
  'hypnotic-spiral': 'spirals',
};

/** All UI strings for the stickers page */
export const stickersPageUI = {
  seo: {
    title: 'Sticker Designs — Ash Shaw',
  },
  hero: {
    badge: 'Art Prints',
    title: 'Sticker designs',
    description:
      'A growing collection of hand-crafted neon sticker graphics — psychedelic eyes, cosmic spirals, and everything in between. Each design started as a digital painting and lives across the site as decorative flourishes.',
  },
  controls: {
    searchPlaceholder: 'Search stickers\u2026',
    searchAriaLabel: 'Search sticker designs by name',
    themesLabel: 'Themes',
    randomButton: 'Surprise Me',
    randomAriaLabel: 'Scroll to a random sticker',
  },
  gallery: {
    countSuffix: 'designs',
    noResults: 'No stickers match your search.',
  },
  lightbox: {
    closeLabel: 'Close preview',
    prevLabel: 'Previous sticker',
    nextLabel: 'Next sticker',
  },
  breadcrumbs: [
    { label: 'Home', href: '/' },
    { label: 'Developer tools', href: '/dev-tools' },
    { label: 'Sticker designs' },
  ],
};