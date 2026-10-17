/**
 * @fileoverview Content-type neon colour mapping — single source of truth
 *
 * Each content type in the application has an assigned neon colour used
 * for card accents, badges, tab indicators, FAQ sections, specimen pages,
 * and other content-type-aware UI. Import this map wherever colour
 * differentiation by content type is needed.
 *
 * @module data/mock/ui/content-type-colours
 * @version 1.0.0
 */

export interface ContentTypeColour {
  /** Content type identifier */
  id: string;
  /** Human-readable label */
  label: string;
  /** Hex colour value */
  hex: string;
  /** CSS custom property name */
  cssVariable: string;
  /** BEM modifier segment (e.g., "blog" → "--blog") */
  modifier: string;
  /** Phosphor icon name for this content type */
  icon: string;
  /** Brief description of what this content type covers */
  description: string;
}

export var contentTypeColours: ContentTypeColour[] = [
  {
    id: 'blog',
    label: 'Blog',
    hex: '#FF10F0',
    cssVariable: '--wp--preset--color--neon-pink',
    modifier: 'blog',
    icon: 'Newspaper',
    description: 'Articles, posts, insights from the dancefloor and the desk',
  },
  {
    id: 'portfolio',
    label: 'Portfolio',
    hex: '#39FF14',
    cssVariable: '--wp--preset--color--neon-green',
    modifier: 'portfolio',
    icon: 'Image',
    description: 'UV makeup gallery, artwork, festival face painting',
  },
  {
    id: 'video',
    label: 'Video',
    hex: '#1F51FF',
    cssVariable: '--wp--preset--color--neon-blue',
    modifier: 'video',
    icon: 'Play',
    description: 'Tutorials, showcases, festival footage, reels',
  },
  {
    id: 'podcast',
    label: 'Podcast',
    hex: '#BE00FE',
    cssVariable: '--wp--preset--color--neon-purple',
    modifier: 'podcast',
    icon: 'Microphone',
    description: 'Episodes, transcripts, raw conversations',
  },
  {
    id: 'event',
    label: 'Event',
    hex: '#FF5F1F',
    cssVariable: '--wp--preset--color--neon-orange',
    modifier: 'event',
    icon: 'Calendar',
    description: 'Festivals, gatherings, creative events',
  },
  {
    id: 'ebook',
    label: 'Ebook',
    hex: '#FFFF00',
    cssVariable: '--wp--preset--color--neon-yellow',
    modifier: 'ebook',
    icon: 'BookOpen',
    description: 'Book chapters, reading, the memoir',
  },
  {
    id: 'stickers',
    label: 'Stickers',
    hex: '#00F7FF',
    cssVariable: '--wp--preset--color--neon-cyan',
    modifier: 'stickers',
    icon: 'Sticker',
    description: 'Sticker art, decorative graphics',
  },
  {
    id: 'dev-tools',
    label: 'Dev tools',
    hex: '#FF3131',
    cssVariable: '--wp--preset--color--neon-red',
    modifier: 'dev-tools',
    icon: 'Wrench',
    description: 'Internal tools, design system inspection, testing',
  },
];

/** Get colour data for a content type by ID */
export function getContentTypeColour(id: string): ContentTypeColour | undefined {
  for (var i = 0; i < contentTypeColours.length; i++) {
    if (contentTypeColours[i].id === id) {
      return contentTypeColours[i];
    }
  }
  return undefined;
}

/** Get all content type IDs */
export function getContentTypeIds(): string[] {
  var ids: string[] = [];
  for (var i = 0; i < contentTypeColours.length; i++) {
    ids.push(contentTypeColours[i].id);
  }
  return ids;
}
