/**
 * @fileoverview Barrel export file for custom React hooks
 * 
 * Centralizes exports for all custom hooks to enable cleaner imports
 * across the application.
 * 
 * Usage:
 * ```tsx
 * // Before
 * import { useReducedMotion } from './useReducedMotion';
 * import { useScrollSpy } from './useScrollSpy';
 * 
 * // After
 * import { useReducedMotion, useScrollSpy } from './';
 * ```
 * 
 * @version 1.0.0
 * @created 2026-03-11
 */

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   DATA & CONTENT HOOKS
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export { useContent } from './useContent';
export { useMockData } from './useMockData';
export { useWordPress } from './useWordPress';

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   NAVIGATION & ROUTING HOOKS
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export { useAppNavigate } from './useAppNavigate';
export { useScrollSpy } from './useScrollSpy';

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   EBOOK READER HOOKS
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export { useEbookState } from './useEbookState';
export { useFullscreen } from './useFullscreen';
export { useKeyboardNav } from './useKeyboardNav';
export { useTouchGestures } from './useTouchGestures';

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   SEARCH & FILTERING HOOKS
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export { useStickerSearch } from './useStickerSearch';
export { useTimelineFiltering } from './useTimelineFiltering';
export { useVideoFiltering } from './useVideoFiltering';

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   UI & INTERACTION HOOKS
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export { useClickOutside } from './useClickOutside';
export { useDebounce } from './useDebounce';
export { useKeyboardTrap } from './useKeyboardTrap';
export { useScrollPosition } from './useScrollPosition';

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ANIMATION & ACCESSIBILITY HOOKS
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export { useAnimatedCount } from './useAnimatedCount';
export { useReducedMotion } from './useReducedMotion';

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   PERFORMANCE & OPTIMIZATION HOOKS
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export { useOptimizedImage } from './useOptimizedImage';
export { usePerformanceGuard } from './usePerformanceGuard';

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ANALYTICS HOOKS
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export { useAnalytics } from './useAnalytics';