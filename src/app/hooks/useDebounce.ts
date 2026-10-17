/**
 * @fileoverview Debounce and throttle hooks for performance optimisation
 *
 * - `useDebounce(value, delay)` — delays updating a value until input settles
 * - `useThrottledCallback(fn, delay)` — limits how often a callback fires
 *
 * @module hooks/useDebounce
 * @version 1.0.0
 */

import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Debounces a value — returns the latest value only after `delay` ms of inactivity.
 *
 * Useful for search inputs, filter text, and other rapid-fire state changes.
 *
 * @param value  The value to debounce
 * @param delay  Debounce delay in milliseconds (default 300)
 * @returns The debounced value
 */
export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Returns a throttled version of a callback — fires at most once per `delay` ms.
 *
 * Useful for scroll handlers, resize handlers, and other high-frequency events.
 *
 * @param callback  The function to throttle
 * @param delay     Throttle interval in milliseconds (default 100)
 * @returns A throttled callback (stable reference)
 */
export function useThrottledCallback<T extends (...args: any[]) => void>(
  callback: T,
  delay: number = 100,
): T {
  const lastCallRef = useRef(0);
  const timerRefInit: ReturnType<typeof setTimeout> | null = null;
  const timerRef = useRef(timerRefInit);
  const callbackRef = useRef(callback);

  // Keep callback ref fresh without causing re-renders
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const throttled = useCallback(
    (...args: any[]) => {
      const now = Date.now();
      const elapsed = now - lastCallRef.current;

      if (elapsed >= delay) {
        lastCallRef.current = now;
        callbackRef.current(...args);
      } else {
        // Schedule a trailing call
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
          lastCallRef.current = Date.now();
          callbackRef.current(...args);
        }, delay - elapsed);
      }
    },
    [delay],
  ) as T;

  return throttled;
}