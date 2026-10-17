/**
 * @fileoverview Scroll-spy hook for tracking which section is currently in the viewport
 *
 * Monitors a list of section element IDs and reports which one is currently
 * "active" (most visible in the viewport). Designed for use by the Header
 * component to highlight the active nav item based on scroll position,
 * or for any table-of-contents style navigation.
 *
 * Features:
 * - Intersection Observer-based (no scroll event listeners)
 * - Configurable `rootMargin` and `threshold`
 * - Returns the ID of the currently active section
 * - SSR-safe (guards `IntersectionObserver` access)
 * - Lightweight — no throttling needed (IO is natively performant)
 *
 * @module hooks/useScrollSpy
 * @version 1.0.0
 */

import { useState, useEffect, useRef } from 'react';

/** Options accepted by useScrollSpy */
export interface UseScrollSpyOptions {
  /**
   * Root margin passed to IntersectionObserver.
   * Negative top value shifts the activation point downward.
   * @default "-20% 0px -60% 0px"
   */
  rootMargin?: string;

  /**
   * Intersection threshold(s) for triggering updates.
   * @default 0
   */
  threshold?: number | number[];

  /**
   * Whether the observer is active.
   * Set to false to disconnect and save resources.
   * @default true
   */
  enabled?: boolean;

  /**
   * Fallback ID to return when no section is intersecting.
   * @default undefined
   */
  fallbackId?: string;
}

/**
 * useScrollSpy
 *
 * Observes a list of DOM sections (by ID) and returns the ID of the
 * section currently most visible in the viewport.
 *
 * @param sectionIds - Array of element IDs to observe (e.g. `['hero', 'about', 'portfolio']`)
 * @param options - Configuration options
 * @returns The ID of the currently active section, or `undefined` if none is intersecting
 *
 * @example
 * ```tsx
 * const activeSection = useScrollSpy(
 *   ['hero', 'about', 'portfolio', 'blog', 'contact'],
 *   { rootMargin: '-20% 0px -60% 0px' }
 * );
 *
 * // Highlight the active nav item
 * <button className={activeSection === 'about' ? 'header__nav-link--active' : ''}>
 *   About
 * </button>
 * ```
 */
export function useScrollSpy(
  sectionIds: string[],
  options: UseScrollSpyOptions = {},
): string | undefined {
  const {
    rootMargin = '-20% 0px -60% 0px',
    threshold = 0,
    enabled = true,
    fallbackId,
  } = options;

  const activeIdInit: string | undefined = fallbackId;
  const [activeId, setActiveId] = useState(activeIdInit);

  /**
   * Track intersection ratios so we can pick the section with the
   * highest visibility when multiple sections are simultaneously in view.
   */
  const ratioMapInit: Map<string, number> = new Map();
  const ratioMap = useRef(ratioMapInit);

  useEffect(() => {
    if (!enabled) return;
    if (typeof IntersectionObserver === 'undefined') return;

    ratioMap.current.clear();

    const callback: IntersectionObserverCallback = (entries) => {
      for (var i = 0; i < entries.length; i++) {
        var entry = entries[i];
        ratioMap.current.set(entry.target.id, entry.intersectionRatio);
      }

      // Find the section with the highest intersection ratio
      let bestId: string | undefined;
      let bestRatio = 0;

      var mapEntries = Array.from(ratioMap.current.entries());
      for (var j = 0; j < mapEntries.length; j++) {
        var pair = mapEntries[j];
        var id = pair[0];
        var ratio = pair[1];
        if (ratio > bestRatio) {
          bestRatio = ratio;
          bestId = id;
        }
      }

      if (bestId) {
        setActiveId(bestId);
      } else if (fallbackId) {
        setActiveId(fallbackId);
      }
    };

    const observer = new IntersectionObserver(callback, {
      rootMargin,
      threshold,
    });

    // Observe each section element
    const elements: Element[] = [];
    for (var k = 0; k < sectionIds.length; k++) {
      var sId = sectionIds[k];
      const el = document.getElementById(sId);
      if (el) {
        observer.observe(el);
        elements.push(el);
      }
    }

    return () => {
      for (var m = 0; m < elements.length; m++) {
        observer.unobserve(elements[m]);
      }
      observer.disconnect();
    };
  }, [sectionIds.join(','), rootMargin, threshold, enabled, fallbackId]);

  return activeId;
}