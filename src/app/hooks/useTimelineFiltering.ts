/**
 * @fileoverview useTimelineFiltering hook
 * 
 * Manages timeline filtering state and data transformations.
 * 
 * Features:
 * - Filter timeline entries by category
 * - Transform entries to Timeline component format
 * - Calculate filter counts
 * - Determine accent color based on active filter
 * 
 * Extracted from: HistoryPage.tsx
 * 
 * @hook useTimelineFiltering
 * @version 1.0.0
 */

import { useState, useMemo } from 'react';
import {
  getAllTimeline,
  getTimelineByCategory,
  timelineCategories,
  toTimelineEvents,
  type TimelineEntry,
} from '../data/mock/timeline';
import { grab, arrayGet } from '../lib/router';

interface UseTimelineFilteringReturn {
  /** Active filter category ID ('all' or category ID) */
  activeFilter: string;
  
  /** Function to set active filter */
  setActiveFilter: (filter: string) => void;
  
  /** Filtered timeline entries (raw data) */
  filteredEntries: TimelineEntry[];
  
  /** Timeline events formatted for Timeline component */
  timelineEvents: Array<{
    date: string;
    title: string;
    description: string;
    link?: string;
    colorAccent: string;
    significance: number;
  }>;
  
  /** Accent color for timeline line (based on active filter) */
  lineAccent: string;
  
  /** All available timeline categories */
  categories: typeof timelineCategories;
  
  /** Get count for a specific category */
  getCategoryCount: (categoryId: string) => number;
  
  /** Get total count (all entries) */
  getTotalCount: () => number;
}

/**
 * useTimelineFiltering Hook
 * 
 * Manages timeline filtering state and data transformations.
 * 
 * @example
 * ```tsx
 * function HistoryPage() {
 *   const {
 *     activeFilter,
 *     setActiveFilter,
 *     timelineEvents,
 *     lineAccent,
 *     categories,
 *     getCategoryCount,
 *     getTotalCount,
 *   } = useTimelineFiltering();
 * 
 *   return (
 *     <>
 *       {categories.map(cat => (
 *         <button
 *           key={cat.id}
 *           onClick={() => setActiveFilter(cat.id)}
 *           aria-pressed={activeFilter === cat.id}
 *         >
 *           {cat.label} ({getCategoryCount(cat.id)})
 *         </button>
 *       ))}
 *       
 *       <Timeline
 *         events={timelineEvents}
 *         colorAccent={lineAccent}
 *       />
 *     </>
 *   );
 * }
 * ```
 */
export function useTimelineFiltering(): UseTimelineFilteringReturn {
  var filterState = useState('all');
  var activeFilter = filterState[0];
  var setActiveFilter = filterState[1];

  /* Get filtered timeline entries */
  var filteredEntries = useMemo(function () {
    if (activeFilter === 'all') {
      return getAllTimeline();
    }
    return getTimelineByCategory(activeFilter);
  }, [activeFilter]);

  /* Convert to Timeline component format */
  var timelineEvents = useMemo(function () {
    return toTimelineEvents(filteredEntries);
  }, [filteredEntries]);

  /* Determine the accent colour for the timeline line */
  var lineAccent = useMemo(function () {
    if (activeFilter === 'all') {
      return 'cyan';
    }
    
    for (var ca = 0; ca < timelineCategories.length; ca++) {
      var cat = arrayGet(timelineCategories, ca);
      if (cat && grab(cat, 'id') === activeFilter) {
        return grab(cat, 'colorAccent') || 'cyan';
      }
    }
    
    return 'cyan';
  }, [activeFilter]);

  /* Get count for a specific category */
  function getCategoryCount(categoryId: string): number {
    if (categoryId === 'all') {
      return getAllTimeline().length;
    }
    return getTimelineByCategory(categoryId).length;
  }

  /* Get total count */
  function getTotalCount(): number {
    return getAllTimeline().length;
  }

  return {
    activeFilter,
    setActiveFilter,
    filteredEntries,
    timelineEvents,
    lineAccent,
    categories: timelineCategories,
    getCategoryCount,
    getTotalCount,
  };
}
