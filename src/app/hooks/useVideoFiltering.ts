/**
 * @fileoverview Custom hook for filtering and sorting videos
 * 
 * Provides filtering and sorting functionality for video archives.
 * Supports category filtering and multiple sort modes.
 * 
 * @example
 * ```tsx
 * const filteredVideos = useVideoFiltering({
 *   videos: allVideos,
 *   activeCategories: ['tutorial', 'festival'],
 *   sortBy: 'recent',
 *   videoCategories
 * });
 * ```
 * 
 * @version 1.0.0
 * @created 2026-03-11
 */

import { useMemo } from 'react';

interface Video {
  id: string;
  title: string;
  category: string;
  publishedAt: string;
  featured?: boolean;
  [key: string]: any;
}

interface VideoCategory {
  id: string;
  name: string;
  slug: string;
}

interface UseVideoFilteringParams {
  videos: Video[];
  activeCategories: string[];
  sortBy: 'recent' | 'alphabetical' | 'featured';
  videoCategories: VideoCategory[];
}

/**
 * Filters and sorts videos based on active categories and sort mode
 * 
 * @param params - Filtering parameters
 * @returns Filtered and sorted video array
 */
export function useVideoFiltering({
  videos,
  activeCategories,
  sortBy,
  videoCategories,
}: UseVideoFilteringParams): Video[] {
  return useMemo(
    function () {
      var vids = [];
      for (var i = 0; i < videos.length; i++) {
        vids.push(videos[i]);
      }

      // Filter by categories
      if (activeCategories.length > 0) {
        vids = vids.filter(function (v) {
          return activeCategories.some(function (slug) {
            var found = videoCategories.find(function (c) {
              return c.slug === slug;
            });
            var catName = found ? found.name : slug;
            return v.category.toLowerCase() === catName.toLowerCase();
          });
        });
      }

      // Sort by selected mode
      switch (sortBy) {
        case 'recent':
          vids.sort(function (a, b) {
            return (
              new Date(b.publishedAt).getTime() -
              new Date(a.publishedAt).getTime()
            );
          });
          break;
        case 'alphabetical':
          vids.sort(function (a, b) {
            return a.title.localeCompare(b.title);
          });
          break;
        case 'featured':
          vids.sort(function (a, b) {
            return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
          });
          break;
      }

      return vids;
    },
    [videos, activeCategories, sortBy, videoCategories]
  );
}
