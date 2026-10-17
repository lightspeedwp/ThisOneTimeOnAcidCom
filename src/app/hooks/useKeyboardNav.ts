/**
 * @fileoverview Custom hook for keyboard navigation in ebook reader
 * 
 * Handles keyboard shortcuts for page navigation, settings, fullscreen,
 * and chapter navigation. Respects modal/drawer states to prevent
 * conflicting actions.
 * 
 * @version 1.0.0
 */

import { useEffect } from 'react';

interface UseKeyboardNavOptions {
  /** Navigate to next page */
  goForward: () => void;
  /** Navigate to previous page */
  goBackward: () => void;
  /** Jump to specific page index */
  jumpToPage: (pageIndex: number) => void;
  /** Toggle fullscreen mode */
  toggleFullScreen: () => void;
  /** Whether chapter drawer is open */
  drawerOpen: boolean;
  /** Set drawer open state */
  setDrawerOpen: (open: boolean) => void;
  /** Whether settings modal is open */
  settingsOpen: boolean;
  /** Set settings modal state */
  setSettingsOpen: (open: boolean) => void;
  /** Whether fullscreen mode is active */
  isFullScreen: boolean;
  /** Whether minimal mode is active */
  minimalMode: boolean;
  /** Toggle minimal mode */
  setMinimalMode: (mode: boolean) => void;
  /** Total number of pages */
  totalPages: number;
}

/**
 * Custom hook for keyboard navigation
 * 
 * Keyboard shortcuts:
 * - Arrow Right/Down/PageDown: Next page
 * - Arrow Left/Up/PageUp: Previous page
 * - Home: First page
 * - End: Last page
 * - Escape: Close drawer/settings/fullscreen (priority order)
 * - S: Open settings
 * - M: Toggle minimal mode
 * - F: Toggle fullscreen
 * - C: Open chapter drawer
 * 
 * @param options - Configuration object with callbacks and state
 * 
 * @example
 * ```tsx
 * useKeyboardNav({
 *   goForward,
 *   goBackward,
 *   jumpToPage,
 *   toggleFullScreen,
 *   drawerOpen,
 *   setDrawerOpen,
 *   settingsOpen,
 *   setSettingsOpen,
 *   isFullScreen,
 *   minimalMode,
 *   setMinimalMode,
 *   totalPages,
 * });
 * ```
 */
export function useKeyboardNav(options: UseKeyboardNavOptions): void {
  var goForward = options.goForward;
  var goBackward = options.goBackward;
  var jumpToPage = options.jumpToPage;
  var toggleFullScreen = options.toggleFullScreen;
  var drawerOpen = options.drawerOpen;
  var setDrawerOpen = options.setDrawerOpen;
  var settingsOpen = options.settingsOpen;
  var setSettingsOpen = options.setSettingsOpen;
  var isFullScreen = options.isFullScreen;
  var minimalMode = options.minimalMode;
  var setMinimalMode = options.setMinimalMode;
  var totalPages = options.totalPages;

  useEffect(function () {
    function handleKeyDown(e: KeyboardEvent) {
      /* ── Escape key: Close modals in priority order ── */
      if (e.key === 'Escape') {
        if (drawerOpen) {
          e.preventDefault();
          setDrawerOpen(false);
          return;
        }
        if (settingsOpen) {
          e.preventDefault();
          setSettingsOpen(false);
          return;
        }
        if (isFullScreen) {
          e.preventDefault();
          toggleFullScreen();
          return;
        }
        return;
      }

      /* ── Don't handle navigation when modals are open ── */
      if (drawerOpen || settingsOpen) return;

      /* ── Navigation keys ── */
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        goForward();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        goBackward();
      } else if (e.key === 'Home') {
        e.preventDefault();
        jumpToPage(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        jumpToPage(totalPages - 1);
      }
      /* ── Shortcut keys ── */
      else if (e.key === 's' || e.key === 'S') {
        e.preventDefault();
        setSettingsOpen(true);
      } else if (e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        setMinimalMode(!minimalMode);
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFullScreen();
      } else if (e.key === 'c' || e.key === 'C') {
        e.preventDefault();
        setDrawerOpen(true);
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return function () {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [
    goForward,
    goBackward,
    jumpToPage,
    toggleFullScreen,
    drawerOpen,
    setDrawerOpen,
    settingsOpen,
    setSettingsOpen,
    isFullScreen,
    minimalMode,
    setMinimalMode,
    totalPages,
  ]);
}
