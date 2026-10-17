/**
 * @fileoverview Detects the user's `prefers-reduced-motion` OS setting.
 *
 * Returns `true` when the user has enabled "Reduce Motion" (or equivalent)
 * in their operating system accessibility settings.
 *
 * Unlike a one-shot `window.matchMedia` check, this hook **listens for live
 * changes** — if the user toggles the setting while the app is open, the
 * returned value updates immediately and re-renders the consuming component.
 *
 * @module hooks/useReducedMotion
 * @version 1.0.0
 *
 * @example
 * ```tsx
 * import { useReducedMotion } from './useReducedMotion';
 *
 * function AnimatedCard({ children }) {
 *   const prefersReduced = useReducedMotion();
 *
 *   return (
 *     <div className={prefersReduced ? 'card' : 'card card--animate'}>
 *       {children}
 *     </div>
 *   );
 * }
 * ```
 *
 * @see /guidelines/prefers-reduced-motion.md — Full coding standards
 * @see /hooks/useAnimatedCount.ts — Uses one-shot matchMedia check (non-reactive)
 */

import { useState, useEffect } from 'react';

var QUERY = '(prefers-reduced-motion: reduce)';

export function useReducedMotion(): boolean {
  var state = useState(function() {
    if (typeof window === 'undefined') return false; // SSR-safe
    return window.matchMedia(QUERY).matches;
  });
  var prefersReduced = state[0];
  var setPrefersReduced = state[1];

  useEffect(function() {
    var mql = window.matchMedia(QUERY);

    var handler = function(event: MediaQueryListEvent) {
      setPrefersReduced(event.matches);
    };

    if (mql.addEventListener) {
      mql.addEventListener('change', handler);
      return function() { mql.removeEventListener('change', handler); };
    } else {
      // Fallback for older browsers
      mql.addListener(handler);
      return function() { mql.removeListener(handler); };
    }
  }, []);

  return prefersReduced;
}
