/**
 * @fileoverview Reusable scroll position hook for Ash Shaw Makeup Portfolio
 *
 * Extracts scroll-tracking logic previously duplicated in ScrollToTop,
 * BlogPostPage (reading progress), and available for future Header
 * sticky/transparent state management.
 *
 * Features:
 * - Throttled scroll listener (configurable interval)
 * - `scrollY` — raw pixel position
 * - `scrollProgress` — 0–100 percentage of total scrollable height
 * - `isScrolledPast(threshold)` — boolean helper for show/hide patterns
 * - Passive event listener for performance
 * - SSR-safe (guards `window` access)
 *
 * @module hooks/useScrollPosition
 * @version 1.0.0
 */

import { useState, useEffect, useCallback, useRef } from 'react';

export function useScrollPosition(options?: any) {
  var opts = options || {};
  var throttleMs = opts.throttleMs !== undefined ? opts.throttleMs : 100;
  var enabled = opts.enabled !== undefined ? opts.enabled : true;

  var scrollYState = useState(0);
  var scrollY = scrollYState[0];
  var setScrollY = scrollYState[1];

  var scrollProgressState = useState(0);
  var scrollProgress = scrollProgressState[0];
  var setScrollProgress = scrollProgressState[1];

  var lastCallRef = useRef(0);
  var timerRef = useRef(null);

  var measure = useCallback(function() {
    var currentY = window.pageYOffset || document.documentElement.scrollTop;
    var totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var progress = totalHeight > 0 ? (currentY / totalHeight) * 100 : 0;

    setScrollY(currentY);
    setScrollProgress(progress);
  }, []);

  useEffect(function() {
    if (!enabled) return;

    var onScroll = function() {
      var now = Date.now();
      var elapsed = now - lastCallRef.current;

      if (elapsed >= throttleMs) {
        lastCallRef.current = now;
        measure();
      } else {
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(function() {
          lastCallRef.current = Date.now();
          measure();
        }, throttleMs - elapsed);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    measure();

    return function() {
      window.removeEventListener('scroll', onScroll);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [enabled, throttleMs, measure]);

  var isScrolledPast = useCallback(
    function(threshold: number) { return scrollY > threshold; },
    [scrollY]
  );

  return { 
    scrollY: scrollY, 
    scrollProgress: scrollProgress, 
    isScrolledPast: isScrolledPast 
  };
}