/**
 * @fileoverview Podcast type definitions
 * @module data/types/podcast
 */

export interface Podcast {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  audioUrl: string;
  duration: string;
  episodeNumber: number;
  seasonNumber?: number;
  category: string;
  tags: string[];
  publishedAt: string;
  featured: boolean;
  coverImage: { src: string; alt: string };
  transcript?: string;
  guests?: { name: string; role: string }[];
  faqs?: { id: string; question: string; answer: string }[];
}

export interface PodcastCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  count: number;
  color?: string;
}

export interface PodcastTag {
  id: string;
  name: string;
  slug: string;
  description?: string;
}