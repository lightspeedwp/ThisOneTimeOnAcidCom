/**
 * @fileoverview Event type definitions
 *
 * Comprehensive data model for events Ash has attended as a makeup artist.
 * Supports recurring events (festivals) with per-year edition records,
 * first-class travel data (cycling!), location details, cross-references
 * to portfolio/blog/video content, and Schema.org-compatible FAQ entries.
 *
 * @module data/types/events
 * @version 1.0.0
 */

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ENUMS / UNION TYPES
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

/** Event category classification */
export type EventType =
  | 'festival'
  | 'club-night'
  | 'workshop'
  | 'pop-up'
  | 'exhibition'
  | 'collaboration'
  | 'community';

/** Edition attendance status */
export type EventEditionStatus =
  | 'attended'
  | 'upcoming'
  | 'cancelled'
  | 'missed';

/** Travel method — bicycle is Ash's signature */
export type TravelMethod =
  | 'bicycle'
  | 'train'
  | 'bus'
  | 'car'
  | 'carpool'
  | 'flight'
  | 'hitchhike'
  | 'walk'
  | 'mixed';

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   SUB-TYPES
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

/** Image with optional photographer credit */
export interface EventImage {
  /** Image URL or figma:asset path */
  src: string;
  /** Accessible alt text */
  alt: string;
  /** Image caption */
  caption?: string;
  /** Photographer credit */
  credit?: string;
  /** Year the photo was taken */
  year?: number;
  /** Whether this image is a vector logo (renders centred on dark bg, not cover-cropped) */
  isLogo?: boolean;
}

/** Social media link for an event */
export interface EventSocialLink {
  /** Platform name (e.g., "instagram", "facebook") */
  platform: string;
  /** Full URL */
  url: string;
  /** Display label */
  label?: string;
}

/** Where the event takes place */
export interface EventLocation {
  /** Venue or site name */
  venue?: string;
  /** City or nearest town */
  city: string;
  /** State / province / region */
  region?: string;
  /** Country name */
  country: string;
  /** ISO 3166-1 alpha-2 country code */
  countryCode?: string;
  /** GPS coordinates for potential future map feature */
  coordinates?: { lat: number; lng: number };
  /** Whether the event is indoors */
  indoor?: boolean;
  /** Location flavour text */
  description?: string;
}

/** How Ash got to / from the event — first-class type */
export interface EventTravel {
  /** Primary transport mode */
  method: TravelMethod;
  /** One-way distance in km */
  distanceKm?: number;
  /** Total round-trip distance in km (if different from 2x one-way) */
  totalDistanceKm?: number;
  /** Travel time (e.g., "6 hours", "2 days") */
  duration?: string;
  /** Travel story / narrative */
  description?: string;
  /** Notable gear transported */
  gearCarried?: string[];
  /** Bike pack weight in kg */
  bikePackWeightKg?: number;
  /** Total elevation gain in metres */
  elevationGainM?: number;
  /** Top speed in km/h */
  topSpeedKmh?: number;
  /** Key route waypoints or passes */
  routeHighlights?: string[];
  /** Whether the same method was used for the return */
  roundTrip?: boolean;
  /** If different return method */
  returnMethod?: TravelMethod;
  /** Return journey description */
  returnDescription?: string;
  /** Who Ash travelled with */
  companions?: string;
}

/** Cross-references to other content */
export interface EventRelatedContent {
  /** Related portfolio entry IDs */
  portfolioIds?: string[];
  /** Related blog post slugs */
  blogSlugs?: string[];
  /** Related video IDs */
  videoIds?: string[];
  /** Related podcast episode IDs */
  podcastIds?: string[];
}

/** FAQ entry (Schema.org FAQPage compatible) */
export interface EventFAQ {
  /** Unique FAQ ID */
  id: string;
  /** Question text */
  question: string;
  /** Answer text */
  answer: string;
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   EDITION (per-year / per-occurrence attendance)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

/** A specific year's attendance at an event */
export interface EventEdition {
  /** Unique identifier (e.g., "origin-2024") */
  id: string;
  /** Year attended */
  year: number;
  /** Official edition name if applicable */
  editionName?: string;
  /** ISO 8601 start date */
  startDate: string;
  /** ISO 8601 end date */
  endDate: string;
  /** Attendance status */
  status: EventEditionStatus;
  /** Ash's role at this edition */
  role: string;
  /** Specific activities performed */
  activities?: string[];
  /** Personal narrative / highlights */
  highlights?: string;
  /** Short personal memory or anecdote */
  personalNote?: string;
  /** How Ash got there */
  travel?: EventTravel;
  /** Notable weather conditions */
  weather?: string;
  /** Rough crowd size */
  attendeeEstimate?: string;
  /** Edition-specific images */
  images?: EventImage[];
  /** Related portfolio entry IDs for this specific edition */
  relatedPortfolioIds?: string[];
  /** Related blog post slugs for this specific edition */
  relatedBlogSlugs?: string[];
  /** Related video IDs for this specific edition */
  relatedVideoIds?: string[];
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   EVENT (the recurring entity)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

/** Complete event entity with all editions */
export interface Event {
  /** Unique identifier */
  id: string;
  /** URL-friendly slug */
  slug: string;
  /** Display name */
  name: string;
  /** Compact name for badges/pills */
  shortName?: string;
  /** One-liner tagline */
  tagline?: string;
  /** Full description */
  description: string;
  /** Event category */
  type: EventType;
  /** Music/art genres */
  genre?: string[];
  /** Official website URL */
  website?: string;
  /** Social media links */
  socialLinks?: EventSocialLink[];
  /** Venue/location details */
  location: EventLocation;
  /** Whether this event recurs */
  recurring: boolean;
  /** Recurrence pattern */
  recurrencePattern?: string;
  /** Primary hero/card image */
  featuredImage: EventImage;
  /** Additional event-level images */
  galleryImages?: EventImage[];
  /** Searchable tags */
  tags: string[];
  /** Show on homepage or events hero */
  featured: boolean;
  /** Display sort priority (lower = higher) */
  order: number;
  /** Why this event is personally significant */
  personalSignificance?: string;
  /** Per-year attendance records */
  editions: EventEdition[];
  /** Cross-references to other content types */
  relatedContent?: EventRelatedContent;
  /** Per-event FAQ entries */
  faqs?: EventFAQ[];
  /** SEO title override */
  seoTitle?: string;
  /** SEO description override */
  seoDescription?: string;
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   TAXONOMY TYPES
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

/** Event category metadata for archive pages */
export interface EventCategoryData {
  /** Unique identifier */
  id: string;
  /** Display name */
  name: string;
  /** URL slug */
  slug: string;
  /** Category description */
  description: string;
  /** Number of events in this category */
  count: number;
  /** Neon accent colour token */
  neonColor: string;
  /** Lucide icon name */
  icon: string;
}

/** Event tag metadata for archive pages */
export interface EventTagData {
  /** Unique identifier */
  id: string;
  /** Display name */
  name: string;
  /** URL slug */
  slug: string;
  /** Tag description */
  description?: string;
}