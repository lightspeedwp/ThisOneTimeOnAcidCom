/**
 * @fileoverview Type definitions for video content
 * @module data/types/videos
 * @version 2.0.0 - Expanded with slug, tags, content, views, likes
 */

export interface Video {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  thumbnailUrl: string;
  videoUrl: string;
  platform: 'youtube' | 'vimeo';
  duration: string;
  category: string;
  tags: string[];
  featured: boolean;
  publishedAt: string;
  views?: number;
  likes?: number;
  episodeNumber?: number;
  seriesName?: string;

  /** Optional per-item FAQ entries displayed on the single video page */
  faqs?: { id: string; question: string; answer: string }[];
}

export interface VideoCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  count: number;
}

export interface VideoTag {
  id: string;
  name: string;
  slug: string;
  description?: string;
}