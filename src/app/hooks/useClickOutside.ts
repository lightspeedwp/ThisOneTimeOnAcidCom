/**
 * @fileoverview Hook for detecting clicks outside an element
 * Useful for closing dropdowns, modals, and menus when the user interacts elsewhere.
 * 
 * @module hooks/useClickOutside
 */

import { useEffect, RefObject } from 'react';

/**
 * useClickOutside
 * 
 * @param handler Function to call when an outside click is detected
 * @param refs Array of refs to "inside" elements (clicking these will NOT trigger handler)
 * @param active Boolean to enable/disable the listener
 * @param ignoreSelectors Array of CSS selectors to ignore (e.g., portals, fixed overlays)
 */
export function useClickOutside(
  handler: (event: MouseEvent | TouchEvent) => void,
  refs: Array<RefObject<HTMLElement | null>>,
  active: boolean = true,
  ignoreSelectors: string[] = []
) {
  useEffect(() => {
    if (!active) return;

    const listener = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;

      // Check if click is inside any of the provided refs
      const isInsideRef = refs.some(ref => {
        const el = ref.current;
        return el ? el.contains(target) : false;
      });
      if (isInsideRef) return;

      // Check if click matches any ignore selectors (e.g., specific overlay classes)
      const hasIgnoreSelectors = ignoreSelectors.length > 0;
      const isElement = target instanceof Element;
      if (hasIgnoreSelectors && isElement) {
        const isIgnored = ignoreSelectors.some(selector => target.closest(selector));
        if (isIgnored) return;
      }

      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [handler, refs, active, ignoreSelectors]); // Dependencies
}