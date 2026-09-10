/**
 * @fileoverview Custom hook for fullscreen API management
 * 
 * Provides fullscreen state and toggle functionality with fallback
 * to visual-only fullscreen mode if API is denied/unavailable.
 * 
 * @version 1.0.0
 */

import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Custom hook for managing fullscreen state
 * 
 * @param elementRef - Ref to the element to make fullscreen
 * @returns Object with fullscreen state and toggle function
 * 
 * @example
 * ```tsx
 * const mainRef = useRef<HTMLElement>(null);
 * const { isFullScreen, toggleFullScreen } = useFullscreen(mainRef);
 * 
 * <main ref={mainRef}>
 *   <button onClick={toggleFullScreen}>
 *     {isFullScreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
 *   </button>
 * </main>
 * ```
 */
export function useFullscreen(elementRef: React.RefObject<HTMLElement>) {
  var [isFullScreen, setIsFullScreen] = useState(false);

  /* ── Apply fullscreen body class ── */
  useEffect(function () {
    if (isFullScreen) {
      document.body.classList.add('ebook-fullscreen');
    } else {
      document.body.classList.remove('ebook-fullscreen');
    }
    return function () {
      document.body.classList.remove('ebook-fullscreen');
    };
  }, [isFullScreen]);

  /* ── Listen for fullscreen changes and Escape key ── */
  useEffect(function () {
    var handleFullScreenChange = function () {
      if (document.fullscreenElement !== null) {
        setIsFullScreen(true);
      } else {
        setIsFullScreen(false);
      }
    };

    var handleEscKey = function (e: KeyboardEvent) {
      if (e.key === 'Escape' && isFullScreen) {
        if (!document.fullscreenElement) {
          setIsFullScreen(false);
        }
      }
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);
    window.addEventListener('keydown', handleEscKey);

    return function () {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
      window.removeEventListener('keydown', handleEscKey);
    };
  }, [isFullScreen]);

  /* ── Toggle fullscreen ── */
  var toggleFullScreen = useCallback(function () {
    if (!isFullScreen) {
      setIsFullScreen(true);
      if (elementRef.current && elementRef.current.requestFullscreen) {
        elementRef.current.requestFullscreen().catch(function () {
          // Silently stay in "visual" fullscreen mode if API denied
        });
      }
    } else {
      setIsFullScreen(false);
      if (document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen().catch(function () {
          // Ignore exit errors
        });
      }
    }
  }, [isFullScreen, elementRef]);

  return {
    isFullScreen: isFullScreen,
    toggleFullScreen: toggleFullScreen,
  };
}
