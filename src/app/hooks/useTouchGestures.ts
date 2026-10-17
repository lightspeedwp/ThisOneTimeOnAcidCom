/**
 * @fileoverview Custom hook for touch gesture handling (swipe detection)
 * 
 * Handles horizontal swipe gestures with visual feedback for ebook navigation.
 * Ignores vertical scrolling and requires horizontal dominance to trigger swipes.
 * 
 * @version 1.0.0
 */

import { useState, useCallback, useRef } from 'react';

/**
 * Touch gesture configuration
 */
const SWIPE_THRESHOLD = 50; // Minimum swipe distance in pixels
const SWIPE_ANGLE_MAX = Math.PI / 6; // 30 degrees max vertical deviation

interface UseTouchGesturesOptions {
  /** Callback when swiping forward (right to left) */
  onSwipeForward: () => void;
  /** Callback when swiping backward (left to right) */
  onSwipeBackward: () => void;
  /** Whether spread mode is active (disables swipe offset) */
  isSpreadMode: boolean;
  /** Whether page animation is in progress */
  isAnimating: boolean;
}

interface TouchGestureHandlers {
  handleTouchStart: (e: React.TouchEvent) => void;
  handleTouchMove: (e: React.TouchEvent) => void;
  handleTouchEnd: (e: React.TouchEvent) => void;
  swipeOffset: number;
  leftSwipeActive: boolean;
  rightSwipeActive: boolean;
}

/**
 * Custom hook for touch gesture handling
 * 
 * @param options - Configuration object with callbacks and state
 * @returns Touch event handlers and swipe state
 * 
 * @example
 * ```tsx
 * const {
 *   handleTouchStart,
 *   handleTouchMove,
 *   handleTouchEnd,
 *   swipeOffset,
 *   leftSwipeActive,
 *   rightSwipeActive,
 * } = useTouchGestures({
 *   onSwipeForward: goForward,
 *   onSwipeBackward: goBackward,
 *   isSpreadMode: false,
 *   isAnimating: false,
 * });
 * 
 * <div
 *   onTouchStart={handleTouchStart}
 *   onTouchMove={handleTouchMove}
 *   onTouchEnd={handleTouchEnd}
 * >
 *   ...content
 * </div>
 * ```
 */
export function useTouchGestures(options: UseTouchGesturesOptions): TouchGestureHandlers {
  var onSwipeForward = options.onSwipeForward;
  var onSwipeBackward = options.onSwipeBackward;
  var isSpreadMode = options.isSpreadMode;
  var isAnimating = options.isAnimating;

  /* ── Swipe state ── */
  var [swipeOffset, setSwipeOffset] = useState(0);
  var [leftSwipeActive, setLeftSwipeActive] = useState(false);
  var [rightSwipeActive, setRightSwipeActive] = useState(false);

  /* ── Touch tracking refs ── */
  var touchStartXInit: number | null = null;
  var touchStartX = useRef(touchStartXInit);
  var touchStartYInit: number | null = null;
  var touchStartY = useRef(touchStartYInit);
  var isSwiping = useRef(false);

  /* ── Touch handlers ── */
  var handleTouchStart = useCallback(function (e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    isSwiping.current = false;
  }, []);

  var handleTouchMove = useCallback(function (e: React.TouchEvent) {
    if (touchStartX.current === null || touchStartY.current === null) return;
    var dx = e.touches[0].clientX - touchStartX.current;
    var dy = e.touches[0].clientY - touchStartY.current;

    // Detect horizontal swipe intent
    if (!isSwiping.current) {
      if (Math.abs(dx) > 10 && Math.abs(dx) > Math.abs(dy)) {
        isSwiping.current = true;
      } else if (Math.abs(dy) > 10) {
        // Vertical scroll detected, cancel swipe
        touchStartX.current = null;
        return;
      }
    }

    // Only apply offset in single-page mode while not animating
    if (isSwiping.current && !isSpreadMode && !isAnimating) {
      var percent = (dx / window.innerWidth) * 100;
      setSwipeOffset(Math.max(-50, Math.min(50, percent)));

      // Visual feedback zones
      if (percent < -10) {
        setLeftSwipeActive(true);
        setRightSwipeActive(false);
      } else if (percent > 10) {
        setLeftSwipeActive(false);
        setRightSwipeActive(true);
      } else {
        setLeftSwipeActive(false);
        setRightSwipeActive(false);
      }
    }
  }, [isSpreadMode, isAnimating]);

  var handleTouchEnd = useCallback(function (e: React.TouchEvent) {
    if (touchStartX.current === null || touchStartY.current === null) return;
    var dx = e.changedTouches[0].clientX - touchStartX.current;
    var dy = e.changedTouches[0].clientY - touchStartY.current;

    // Check if swipe meets threshold and angle requirements
    if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dy) < Math.abs(dx) * Math.tan(SWIPE_ANGLE_MAX)) {
      if (dx < 0) {
        onSwipeForward();
      } else {
        onSwipeBackward();
      }
    } else {
      // Reset offset if swipe cancelled
      setSwipeOffset(0);
    }

    // Reset touch tracking
    touchStartX.current = null;
    touchStartY.current = null;
    isSwiping.current = false;
    setLeftSwipeActive(false);
    setRightSwipeActive(false);
  }, [onSwipeForward, onSwipeBackward]);

  return {
    handleTouchStart: handleTouchStart,
    handleTouchMove: handleTouchMove,
    handleTouchEnd: handleTouchEnd,
    swipeOffset: swipeOffset,
    leftSwipeActive: leftSwipeActive,
    rightSwipeActive: rightSwipeActive,
  };
}
