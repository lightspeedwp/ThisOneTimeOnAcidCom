/**
 * @fileoverview Centralised Schema.org structured data service
 *
 * Provides builder functions for JSON-LD schemas and inject/cleanup utilities
 * for SEO optimisation. Covers WebSite, Person, Article, VideoObject,
 * PodcastEpisode, VisualArtwork, ImageGallery, and CollectionPage schemas.
 *
 * BUNDLER SAFETY: No optional chaining (?.) or nullish coalescing (??)
 *
 * @module utils/schemaService
 * @version 1.1.0
 */

import type { BlogPost } from '../data/types/blog';
import type { Video } from '../data/types/videos';
import type { Podcast } from '../data/types/podcast';
import type { PortfolioEntry } from '../data/types/portfolio';

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   CONSTANTS
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

const SITE_URL = 'https://ashshaw.com';
const SITE_NAME = 'Ash Shaw | Neon & UV Makeup Art';

const ASH_SHAW_PERSON = {
  '@type': 'Person',
  name: 'Ash Shaw',
  url: SITE_URL,
  jobTitle: 'Makeup Artist',
  knowsAbout: ['Neon Makeup', 'UV Face Paint', 'Festival Art', 'Body Art', 'Blacklight Design'],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Cape Town',
    addressCountry: 'ZA',
  },
  sameAs: [
    'https://www.instagram.com/ashshaw',
    'https://www.youtube.com/@ashshaw',
  ],
  gender: 'Male',
  pronouns: 'he/him',
};

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   INJECT / REMOVE HELPERS
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

/**
 * Inject a JSON-LD schema into the document head.
 * Removes any existing script with the same ID first.
 * @returns Cleanup function that removes the script tag.
 */
export function injectSchema(id: string, schema: object): () => void {
  removeSchema(id);

  const script = document.createElement('script');
  script.id = id;
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);

  return () => removeSchema(id);
}

/**
 * Remove a JSON-LD schema from the document head by ID.
 */
export function removeSchema(id: string): void {
  const existing = document.getElementById(id);
  if (existing) existing.remove();
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   SCHEMA IDs (used for inject/remove pairing)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export const SCHEMA_IDS = {
  website: 'schema-website',
  person: 'schema-person',
  article: 'schema-article',
  video: 'schema-video',
  podcast: 'schema-podcast',
  portfolio: 'schema-portfolio',
  gallery: 'schema-gallery',
  collection: 'schema-collection',
} as const;

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   BUILDER FUNCTIONS
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

/**
 * WebSite schema with SearchAction for Google sitelinks search box.
 * Should be injected on the homepage.
 */
export function buildWebSiteSchema(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description:
      'Explore the bold neon and UV makeup artistry of Ash Shaw. Festival face painting, blacklight designs, editorial looks, and creative tutorials.',
    inLanguage: 'en',
    creator: ASH_SHAW_PERSON,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Person schema for Ash Shaw — the site author.
 * Can be injected on the About page or homepage.
 */
export function buildPersonSchema(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    ...ASH_SHAW_PERSON,
    description:
      'Cape Town-based makeup artist creating bold neon and UV face art at psytrance festivals across Europe, Thailand, and South Africa since 2019.',
    alumniOf: 'Self-taught artist',
    nationality: {
      '@type': 'Country',
      name: 'United Kingdom',
    },
    workLocation: {
      '@type': 'Place',
      name: 'Cape Town',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Cape Town',
        addressCountry: 'ZA',
      },
    },
  };
}

/**
 * Article / BlogPosting schema for individual blog posts.
 */
export function buildArticleSchema(post: BlogPost): object {
  const featImg = post.featuredImage;
  const featImgUrl = featImg ? (featImg.url || featImg.src || '') : '';
  const imageUrl = featImgUrl;

  const postAuthor = post.author;
  const authorName = postAuthor ? (postAuthor.name || 'Ash Shaw') : 'Ash Shaw';

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    url: `${SITE_URL}/blog/${post.slug}`,
    datePublished: post.publishedAt,
    ...(post.updatedAt
      ? { dateModified: post.updatedAt }
      : {}),
    author: {
      '@type': 'Person',
      name: authorName,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Person',
      name: 'Ash Shaw',
      url: SITE_URL,
    },
    ...(imageUrl
      ? {
          image: {
            '@type': 'ImageObject',
            url: imageUrl,
          },
        }
      : {}),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${post.slug}`,
    },
    ...(post.category ? { articleSection: post.category } : {}),
    ...(post.tags && post.tags.length > 0 ? { keywords: post.tags.join(', ') } : {}),
    inLanguage: 'en',
    ...(post.readTime
      ? { timeRequired: `PT${post.readTime}M` }
      : {}),
  };
}

/**
 * VideoObject schema for individual video pages.
 */
export function buildVideoSchema(video: Video): object {
  const durationISO = parseDurationToISO(video.duration);

  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: video.title,
    description: video.description,
    url: `${SITE_URL}/video/${video.slug}`,
    thumbnailUrl: video.thumbnailUrl,
    uploadDate: video.publishedAt,
    ...(durationISO ? { duration: durationISO } : {}),
    ...(video.videoUrl
      ? {
          embedUrl: video.videoUrl,
          contentUrl: video.videoUrl,
        }
      : {}),
    author: ASH_SHAW_PERSON,
    publisher: {
      '@type': 'Person',
      name: 'Ash Shaw',
      url: SITE_URL,
    },
    ...(video.views ? { interactionStatistic: {
      '@type': 'InteractionCounter',
      interactionType: { '@type': 'WatchAction' },
      userInteractionCount: video.views,
    }} : {}),
    inLanguage: 'en',
  };
}

/**
 * PodcastEpisode schema for individual podcast episodes.
 */
export function buildPodcastEpisodeSchema(episode: Podcast): object {
  const durationISO = parseDurationToISO(episode.duration);

  return {
    '@context': 'https://schema.org',
    '@type': 'PodcastEpisode',
    name: episode.title,
    description: episode.description,
    url: `${SITE_URL}/podcast/${episode.slug}`,
    datePublished: episode.publishedAt,
    episodeNumber: episode.episodeNumber,
    ...(episode.seasonNumber ? { partOfSeason: {
      '@type': 'PodcastSeason',
      seasonNumber: episode.seasonNumber,
    }} : {}),
    partOfSeries: {
      '@type': 'PodcastSeries',
      name: 'Neon vs Atomic Black',
      url: `${SITE_URL}/podcasts`,
    },
    ...(episode.audioUrl
      ? {
          associatedMedia: {
            '@type': 'MediaObject',
            contentUrl: episode.audioUrl,
          },
        }
      : {}),
    ...(durationISO ? { timeRequired: durationISO } : {}),
    ...(episode.coverImage
      ? {
          image: {
            '@type': 'ImageObject',
            url: episode.coverImage.src,
          },
        }
      : {}),
    author: ASH_SHAW_PERSON,
    inLanguage: 'en',
  };
}

/**
 * VisualArtwork schema for individual portfolio entries.
 */
export function buildPortfolioItemSchema(entry: PortfolioEntry): object {
  const entryImages = entry.images;
  const primaryImage = entryImages && entryImages.length > 0 ? entryImages[0] : undefined;

  return {
    '@context': 'https://schema.org',
    '@type': 'VisualArtwork',
    name: entry.title,
    description: entry.description,
    url: `${SITE_URL}/portfolio/${entry.slug || entry.id}`,
    creator: ASH_SHAW_PERSON,
    artMedium: 'Makeup / Face Paint',
    artform: entry.category,
    ...(entry.date ? { dateCreated: entry.date } : {}),
    ...(entry.location
      ? {
          locationCreated: {
            '@type': 'Place',
            name: entry.location,
          },
        }
      : {}),
    ...(entry.event ? { about: entry.event } : {}),
    ...(primaryImage
      ? {
          image: {
            '@type': 'ImageObject',
            url: primaryImage.src || primaryImage.url || '',
            name: primaryImage.alt || primaryImage.title || entry.title,
          },
        }
      : {}),
    ...(entry.tags && entry.tags.length > 0 ? { keywords: entry.tags.join(', ') } : {}),
    inLanguage: 'en',
  };
}

/**
 * ImageGallery schema for the portfolio main page.
 */
export function buildImageGallerySchema(
  entries: PortfolioEntry[],
): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: 'Ash Shaw Neon & UV Makeup Art Portfolio',
    description:
      'A gallery of bold neon face paint, UV-reactive designs, and festival makeup art by Ash Shaw.',
    url: `${SITE_URL}/portfolio`,
    creator: ASH_SHAW_PERSON,
    numberOfItems: entries.length,
    image: entries
      .filter((e) => {
        const imgs = e.images;
        return imgs && imgs.length > 0 && imgs[0];
      })
      .slice(0, 20)
      .map((e) => ({
        '@type': 'ImageObject',
        url: e.images[0].src || e.images[0].url || '',
        name: e.title,
        description: e.description,
      })),
    inLanguage: 'en',
  };
}

/**
 * CollectionPage schema for archive/listing pages.
 */
export function buildCollectionSchema(
  name: string,
  description: string,
  path: string,
  itemCount: number,
): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description,
    url: `${SITE_URL}${path}`,
    numberOfItems: itemCount,
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL,
    },
    inLanguage: 'en',
  };
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   INTERNAL HELPERS
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

/**
 * Parse a human-readable duration string (e.g. "12:34" or "1:02:34")
 * into an ISO 8601 duration (e.g. "PT12M34S" or "PT1H2M34S").
 */
function parseDurationToISO(duration: string): string | null {
  if (!duration) return null;

  const parts = duration.split(':').map(Number);
  if (parts.some(isNaN)) return null;

  if (parts.length === 3) {
    return `PT${parts[0]}H${parts[1]}M${parts[2]}S`;
  }
  if (parts.length === 2) {
    return `PT${parts[0]}M${parts[1]}S`;
  }
  return null;
}