/**
 * @fileoverview Animated counter hook
 * Smoothly ticks a displayed number up or down when the target value changes.
 *
 * @module hooks/useAnimatedCount
 * @version 1.0.0
 */

import { useState, useEffect, useRef } from 'react';

/**
 * Returns an animated integer that smoothly transitions to `target`.
 *
 * @param target  - The final value to reach
 * @param duration - Transition length in ms (default 320)
 * @returns The current animated integer value
 */
export function useAnimatedCount(target: number, duration = 320): number {
  const [display, setDisplay] = useState(target);
  const rafRefInit: number | null = null;
  const rafRef = useRef(rafRefInit);
  const startRefInit: number | null = null;
  const startRef = useRef(startRefInit);
  const fromRef = useRef(target);

  useEffect(() => {
    /* Check reduced-motion preference */
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced || fromRef.current === target) {
      setDisplay(target);
      fromRef.current = target;
      return;
    }

    const from = fromRef.current;
    const delta = target - from;
    startRef.current = null;

    const step = (ts: number) => {
      if (startRef.current === null) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const progress = Math.min(elapsed / duration, 1);

      /* Ease-out cubic */
      const eased = 1 - Math.pow(1 - progress, 3);

      setDisplay(Math.round(from + delta * eased));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        fromRef.current = target;
      }
    };

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [target, duration]);

  return display;
}