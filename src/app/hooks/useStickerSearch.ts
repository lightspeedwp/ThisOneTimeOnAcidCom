/**
 * @fileoverview Custom hook for sticker search and filtering logic
 * 
 * Manages search query, theme filtering, and computed filtered results
 * with theme counts for the stickers gallery page.
 * 
 * @version 1.0.0
 */

import { useState, useCallback, useMemo } from 'react';
import type { StickerGraphic } from '../data/mock/images/sticker-graphics';
import { stickerThemes, stickerThemeMap } from '../data/mock/ui/stickers';

/**
 * Hook options
 */
interface UseStickerSearchOptions {
  /** Array of all sticker graphics */
  stickers: StickerGraphic[];
}

/**
 * Hook return value
 */
interface UseStickerSearchReturn {
  /** Current search query */
  searchQuery: string;
  /** Currently active theme filter */
  activeTheme: string;
  /** Filtered stickers based on search + theme */
  filtered: StickerGraphic[];
  /** Count of stickers per theme (respects search query) */
  themeCounts: Record<string, number>;
  /** Search input change handler */
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Theme chip click handler */
  handleThemeClick: (themeId: string) => void;
  /** Clear search query */
  clearSearch: () => void;
  /** Reset all filters */
  resetFilters: () => void;
}

/**
 * Custom hook for sticker search and filtering
 * 
 * @param options - Configuration object with stickers array
 * @returns Search state and handlers
 * 
 * @example
 * ```tsx
 * const {
 *   searchQuery,
 *   activeTheme,
 *   filtered,
 *   themeCounts,
 *   handleSearchChange,
 *   handleThemeClick,
 * } = useStickerSearch({ stickers: stickerGraphics });
 * 
 * <input
 *   type="search"
 *   value={searchQuery}
 *   onChange={handleSearchChange}
 * />
 * 
 * <div>
 *   {filtered.map(sticker => (
 *     <StickerCard key={sticker.id} sticker={sticker} />
 *   ))}
 * </div>
 * ```
 */
export function useStickerSearch(options: UseStickerSearchOptions): UseStickerSearchReturn {
  var stickers = options.stickers;

  var [searchQuery, setSearchQuery] = useState('');
  var [activeTheme, setActiveTheme] = useState('all');

  /* ── Filtered stickers ── */
  var filtered = useMemo(function () {
    var result = [];
    for (var i = 0; i < stickers.length; i++) {
      result.push(stickers[i]);
    }

    // Theme filter
    if (activeTheme !== 'all') {
      var themeFiltered = [];
      for (var j = 0; j < result.length; j++) {
        if (stickerThemeMap[result[j].id] === activeTheme) {
          themeFiltered.push(result[j]);
        }
      }
      result = themeFiltered;
    }

    // Search filter
    if (searchQuery.trim()) {
      var q = searchQuery.toLowerCase();
      var searchFiltered = [];
      for (var k = 0; k < result.length; k++) {
        var s = result[k];
        if (
          s.label.toLowerCase().indexOf(q) >= 0 ||
          s.alt.toLowerCase().indexOf(q) >= 0
        ) {
          searchFiltered.push(s);
        }
      }
      result = searchFiltered;
    }

    return result;
  }, [activeTheme, searchQuery, stickers]);

  /* ── Theme counts ── */
  var themeCounts = useMemo(function () {
    // If searching, counts reflect search-filtered results
    var searchFiltered = [];
    if (searchQuery.trim()) {
      var q = searchQuery.toLowerCase();
      for (var i = 0; i < stickers.length; i++) {
        var s = stickers[i];
        if (
          s.label.toLowerCase().indexOf(q) >= 0 ||
          s.alt.toLowerCase().indexOf(q) >= 0
        ) {
          searchFiltered.push(s);
        }
      }
    } else {
      for (var j = 0; j < stickers.length; j++) {
        searchFiltered.push(stickers[j]);
      }
    }

    var counts: Record<string, number> = { all: searchFiltered.length };
    
    for (var ti = 0; ti < stickerThemes.length; ti++) {
      var theme = stickerThemes[ti];
      if (theme.id === 'all') {
        // Skip 'all' theme
        continue;
      }
      
      var themeCount = 0;
      for (var si = 0; si < searchFiltered.length; si++) {
        if (stickerThemeMap[searchFiltered[si].id] === theme.id) {
          themeCount = themeCount + 1;
        }
      }
      counts[theme.id] = themeCount;
    }
    
    return counts;
  }, [searchQuery, stickers]);

  /* ── Handlers ── */
  var handleSearchChange = useCallback(function (e: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(e.target.value);
  }, []);

  var handleThemeClick = useCallback(function (themeId: string) {
    setActiveTheme(themeId);
  }, []);

  var clearSearch = useCallback(function () {
    setSearchQuery('');
  }, []);

  var resetFilters = useCallback(function () {
    setSearchQuery('');
    setActiveTheme('all');
  }, []);

  return {
    searchQuery: searchQuery,
    activeTheme: activeTheme,
    filtered: filtered,
    themeCounts: themeCounts,
    handleSearchChange: handleSearchChange,
    handleThemeClick: handleThemeClick,
    clearSearch: clearSearch,
    resetFilters: resetFilters,
  };
}
