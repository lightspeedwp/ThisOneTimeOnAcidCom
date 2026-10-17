/**
 * @fileoverview Client-side analytics service using localStorage
 *
 * Tracks page views, likes, and reading time across all content types.
 * Data is stored in localStorage with namespaced keys per content type.
 *
 * Key patterns:
 * - Views:   `analytics-views-{type}-{slug}`
 * - Likes:   `analytics-likes-{type}-{slug}`
 * - Liked:   `analytics-liked-{type}-{slug}` (boolean)
 * - Read:    `analytics-read-{type}-{slug}` (seconds spent)
 * - History: `analytics-history` (JSON array of recent slugs)
 *
 * @module utils/analyticsService
 * @version 1.0.0
 */

/** Content types supported by analytics */
export type AnalyticsContentType = 'blog' | 'portfolio' | 'video' | 'podcast';

/** Analytics snapshot for a single content item */
export interface ContentAnalytics {
  views: number;
  likes: number;
  isLiked: boolean;
  readTimeSeconds: number;
}

/** History entry for recently viewed content */
export interface HistoryEntry {
  type: AnalyticsContentType;
  slug: string;
  title: string;
  timestamp: number;
}

/* ── Key Builders ── */

function viewsKey(type: AnalyticsContentType, slug: string): string {
  return `analytics-views-${type}-${slug}`;
}

function likesKey(type: AnalyticsContentType, slug: string): string {
  return `analytics-likes-${type}-${slug}`;
}

function likedKey(type: AnalyticsContentType, slug: string): string {
  return `analytics-liked-${type}-${slug}`;
}

function readKey(type: AnalyticsContentType, slug: string): string {
  return `analytics-read-${type}-${slug}`;
}

const HISTORY_KEY = 'analytics-history';
const MAX_HISTORY = 20;

/* ── Safe localStorage Access ── */

function safeGet(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSet(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    // localStorage full or unavailable — silently fail
  }
}

/* ── Views ── */

/**
 * Record a page view for a content item
 * @returns The updated view count
 */
export function recordView(type: AnalyticsContentType, slug: string): number {
  const key = viewsKey(type, slug);
  const current = parseInt(safeGet(key) || '0', 10);
  const updated = current + 1;
  safeSet(key, updated.toString());
  return updated;
}

/**
 * Get current view count for a content item
 */
export function getViews(type: AnalyticsContentType, slug: string): number {
  return parseInt(safeGet(viewsKey(type, slug)) || '0', 10);
}

/* ── Likes ── */

/**
 * Toggle like on a content item
 * @returns Updated { likes, isLiked }
 */
export function toggleLike(
  type: AnalyticsContentType,
  slug: string,
  baseLikes: number = 0,
): { likes: number; isLiked: boolean } {
  const currentLikes = parseInt(safeGet(likesKey(type, slug)) || baseLikes.toString(), 10);
  const currentlyLiked = safeGet(likedKey(type, slug)) === 'true';

  const newIsLiked = !currentlyLiked;
  const newLikes = newIsLiked ? currentLikes + 1 : Math.max(0, currentLikes - 1);

  safeSet(likesKey(type, slug), newLikes.toString());
  safeSet(likedKey(type, slug), newIsLiked.toString());

  return { likes: newLikes, isLiked: newIsLiked };
}

/**
 * Get current like state for a content item
 */
export function getLikeState(
  type: AnalyticsContentType,
  slug: string,
  baseLikes: number = 0,
): { likes: number; isLiked: boolean } {
  const likes = parseInt(safeGet(likesKey(type, slug)) || baseLikes.toString(), 10);
  const isLiked = safeGet(likedKey(type, slug)) === 'true';
  return { likes, isLiked };
}

/* ── Reading Time ── */

/**
 * Estimate reading time from word count
 * Average adult reading speed: ~225 words per minute
 * @returns Minutes (rounded up)
 */
export function estimateReadingTime(text: string): number {
  if (!text) return 0;
  const wordCount = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / 225));
}

/**
 * Record cumulative reading time
 */
export function recordReadTime(
  type: AnalyticsContentType,
  slug: string,
  seconds: number,
): void {
  const key = readKey(type, slug);
  const current = parseInt(safeGet(key) || '0', 10);
  safeSet(key, (current + seconds).toString());
}

/**
 * Get cumulative reading time in seconds
 */
export function getReadTime(type: AnalyticsContentType, slug: string): number {
  return parseInt(safeGet(readKey(type, slug)) || '0', 10);
}

/* ── History ── */

/**
 * Add a content item to the viewing history
 */
export function addToHistory(
  type: AnalyticsContentType,
  slug: string,
  title: string,
): void {
  const history = getHistory();

  // Remove existing entry for this item (dedup)
  const filtered = history.filter(
    (entry) => !(entry.type === type && entry.slug === slug),
  );

  // Prepend new entry
  filtered.unshift({ type, slug, title, timestamp: Date.now() });

  // Trim to max
  const trimmed = filtered.slice(0, MAX_HISTORY);

  safeSet(HISTORY_KEY, JSON.stringify(trimmed));
}

/**
 * Get viewing history (most recent first)
 */
export function getHistory(): HistoryEntry[] {
  try {
    const raw = safeGet(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/* ── Aggregates ── */

/**
 * Get full analytics snapshot for a content item
 */
export function getContentAnalytics(
  type: AnalyticsContentType,
  slug: string,
  baseLikes: number = 0,
): ContentAnalytics {
  return {
    views: getViews(type, slug),
    ...getLikeState(type, slug, baseLikes),
    readTimeSeconds: getReadTime(type, slug),
  };
}

/**
 * Get total view counts across all items of a content type
 * (Scans localStorage keys — use sparingly)
 */
export function getTotalViews(type: AnalyticsContentType): number {
  let total = 0;
  try {
    const prefix = `analytics-views-${type}-`;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(prefix)) {
        total += parseInt(localStorage.getItem(key) || '0', 10);
      }
    }
  } catch {
    // localStorage unavailable
  }
  return total;
}
