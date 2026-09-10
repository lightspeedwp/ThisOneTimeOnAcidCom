/**
 * @fileoverview React hook for content analytics
 *
 * Provides view tracking, like toggling, reading time estimation,
 * and history recording via the analyticsService utility.
 *
 * Usage:
 * ```tsx
 * const { views, likes, isLiked, readingTime, handleLike } = useAnalytics('blog', 'my-post-slug', {
 *   title: post.title,
 *   content: post.content,
 *   baseLikes: post.likes ?? 0,
 * });
 * ```
 *
 * @module hooks/useAnalytics
 * @version 1.0.0
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  AnalyticsContentType,
  recordView,
  getViews,
  toggleLike,
  getLikeState,
  estimateReadingTime,
  recordReadTime,
  addToHistory,
} from '../utils/analyticsService';

interface UseAnalyticsOptions {
  /** Content title (for history recording) */
  title?: string;
  /** Full text content (for reading time estimation) */
  content?: string;
  /** Base like count from mock data */
  baseLikes?: number;
  /** Skip analytics tracking (e.g., for 404 pages) */
  skip?: boolean;
}

interface UseAnalyticsReturn {
  /** Current view count */
  views: number;
  /** Current like count */
  likes: number;
  /** Whether the current user has liked this item */
  isLiked: boolean;
  /** Estimated reading time in minutes */
  readingTime: number;
  /** Toggle like state */
  handleLike: () => void;
}

/**
 * Hook for tracking content engagement analytics
 *
 * Automatically:
 * - Records a page view on mount
 * - Adds the item to viewing history
 * - Estimates reading time from content
 * - Tracks time spent on page (recorded on unmount)
 */
export function useAnalytics(
  type: AnalyticsContentType,
  slug: string,
  options: UseAnalyticsOptions = {},
): UseAnalyticsReturn {
  const { title = '', content = '', baseLikes = 0, skip = false } = options;

  const [views, setViews] = useState(0);
  const [likes, setLikes] = useState(baseLikes);
  const [isLiked, setIsLiked] = useState(false);

  const readingTime = content ? estimateReadingTime(content) : 0;
  const mountTimeRef = useRef(Date.now());

  /* ── Record view + load state on mount ── */
  useEffect(() => {
    if (skip || !slug) return;

    // Record view
    const updatedViews = recordView(type, slug);
    setViews(updatedViews);

    // Load like state
    const likeState = getLikeState(type, slug, baseLikes);
    setLikes(likeState.likes);
    setIsLiked(likeState.isLiked);

    // Add to history
    if (title) {
      addToHistory(type, slug, title);
    }

    // Record read time on unmount
    mountTimeRef.current = Date.now();
    return () => {
      const secondsSpent = Math.round((Date.now() - mountTimeRef.current) / 1000);
      if (secondsSpent > 2) {
        recordReadTime(type, slug, secondsSpent);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, slug, skip]);

  /* ── Toggle like ── */
  const handleLike = useCallback(() => {
    if (skip || !slug) return;
    const result = toggleLike(type, slug, baseLikes);
    setLikes(result.likes);
    setIsLiked(result.isLiked);
  }, [type, slug, baseLikes, skip]);

  return { views, likes, isLiked, readingTime, handleLike };
}
