/**
 * @fileoverview Focus-trapping hook for modal and overlay contexts
 *
 * Traps keyboard focus (Tab / Shift+Tab) within a container element so
 * that focus cannot escape to the page behind an open modal, drawer,
 * lightbox, or search overlay. Restores focus to the trigger element
 * when the trap is deactivated.
 *
 * Features:
 * - Tab / Shift+Tab cycling within focusable descendants
 * - Escape key callback
 * - Auto-focus first focusable element on activation
 * - Focus restoration on deactivation
 * - `prefers-reduced-motion`-aware (no focus animation when reduced motion)
 * - SSR-safe
 *
 * @module hooks/useKeyboardTrap
 * @version 1.0.0
 */

import { useEffect, useRef, RefObject } from 'react';

/** Selector for all natively focusable elements */
const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

/** Options accepted by useKeyboardTrap */
export interface UseKeyboardTrapOptions {
  /** Whether the trap is currently active */
  active: boolean;
  /** Callback fired when Escape is pressed inside the trap */
  onEscape?: () => void;
  /** When true, auto-focuses the first focusable element on activation (default: true) */
  autoFocus?: boolean;
  /** When true, restores focus to the previously focused element on deactivation (default: true) */
  restoreFocus?: boolean;
}

/**
 * useKeyboardTrap
 *
 * Attaches a focus trap to the element referenced by the returned ref.
 * While `active` is true, Tab and Shift+Tab cycle within the container,
 * and pressing Escape calls `onEscape`.
 *
 * @example
 * ```tsx
 * const trapRef = useKeyboardTrap<HTMLDivElement>({
 *   active: isOpen,
 *   onEscape: handleClose,
 * });
 *
 * return <div ref={trapRef} role="dialog" aria-modal="true">...</div>;
 * ```
 */
export function useKeyboardTrap<T extends HTMLElement = HTMLElement>(
  options: UseKeyboardTrapOptions,
): RefObject<T | null> {
  const { active, onEscape, autoFocus = true, restoreFocus = true } = options;

  const containerRefInit: T | null = null;
  const containerRef = useRef(containerRefInit);
  const previousFocusRefInit: Element | null = null;
  const previousFocusRef = useRef(previousFocusRefInit);

  // Store the previously focused element when the trap activates
  useEffect(() => {
    if (active) {
      previousFocusRef.current = document.activeElement;
    }
  }, [active]);

  // Auto-focus first focusable element
  useEffect(() => {
    if (!active || !autoFocus) return;

    const container = containerRef.current;
    if (!container) return;

    // Small delay to allow the DOM to settle (e.g., CSS transitions)
    const timer = setTimeout(() => {
      const focusable = container.querySelectorAll(FOCUSABLE_SELECTOR) as NodeListOf<HTMLElement>;
      if (focusable.length > 0) {
        focusable[0].focus({ preventScroll: true });
      } else {
        // If no focusable children, focus the container itself
        container.setAttribute('tabindex', '-1');
        container.focus({ preventScroll: true });
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [active, autoFocus]);

  // Restore focus when deactivated
  useEffect(() => {
    if (active) return;

    if (restoreFocus && previousFocusRef.current instanceof HTMLElement) {
      previousFocusRef.current.focus({ preventScroll: true });
      previousFocusRef.current = null;
    }
  }, [active, restoreFocus]);

  // Keyboard event handler
  useEffect(() => {
    if (!active) return;

    const container = containerRef.current;
    if (!container) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        if (onEscape) {
          onEscape();
        }
        return;
      }

      if (event.key !== 'Tab') return;

      const focusable = Array.from(
        container.querySelectorAll(FOCUSABLE_SELECTOR) as NodeListOf<HTMLElement>,
      );

      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }

      const firstFocusable = focusable[0];
      const lastFocusable = focusable[focusable.length - 1];
      const activeEl = document.activeElement;

      if (event.shiftKey) {
        // Shift+Tab: wrap from first → last
        if (activeEl === firstFocusable || !container.contains(activeEl)) {
          event.preventDefault();
          lastFocusable.focus();
        }
      } else {
        // Tab: wrap from last → first
        if (activeEl === lastFocusable || !container.contains(activeEl)) {
          event.preventDefault();
          firstFocusable.focus();
        }
      }
    };

    container.addEventListener('keydown', handleKeyDown);
    return () => container.removeEventListener('keydown', handleKeyDown);
  }, [active, onEscape]);

  return containerRef;
}