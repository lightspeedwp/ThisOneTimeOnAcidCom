---
title: "Custom Hooks Guide"
filename: "/docs/custom-hooks-guide.md"
created: "2026-03-11"
modified: "2026-03-11"
version: "1.0.0"
related: "/guidelines/overview-components.md"
---

# Custom Hooks Guide

**Project:** Ash Shaw Makeup Portfolio  
**Purpose:** Best practices for creating and using custom React hooks  
**Created:** March 11, 2026  
**Status:** Active

---

## Overview

Custom hooks are reusable functions that encapsulate stateful logic and side effects. This guide documents patterns, best practices, and examples from the Ash Shaw portfolio codebase.

**When to Create a Custom Hook:**
- Logic is reused across multiple components
- Component exceeds 300 lines
- Complex state management (3+ related useState calls)
- Side effects that need cleanup
- External API integrations

---

## Table of Contents

1. [Naming Conventions](#naming-conventions)
2. [Hook Patterns](#hook-patterns)
3. [Examples from Codebase](#examples-from-codebase)
4. [ES5 Constraints](#es5-constraints)
5. [Testing Hooks](#testing-hooks)
6. [Common Pitfalls](#common-pitfalls)

---

## Naming Conventions

### Standard Pattern

**All custom hooks MUST:**
- Start with `use` prefix (e.g., `useEbookState`, `useVideoFiltering`)
- Use camelCase (e.g., `useTouchGestures`, not `use-touch-gestures`)
- Have descriptive names indicating purpose
- Be placed in `/hooks/` directory

**Examples:**
```typescript
✅ CORRECT
useEbookState()
useTouchGestures()
useVideoFiltering()
useStickerSearch()

❌ WRONG
ebookState()          // Missing "use" prefix
use_touch_gestures()  // Snake case
useHook()            // Not descriptive
```

### File Naming

**Pattern:** Hook name matches filename

```
/hooks/
├── useEbookState.ts          ← Hook: useEbookState()
├── useTouchGestures.ts       ← Hook: useTouchGestures()
├── useVideoFiltering.ts      ← Hook: useVideoFiltering()
└── index.ts                  ← Barrel export
```

---

## Hook Patterns

### Pattern 1: State Management Hook

**When to use:** Replace multiple related `useState` calls

**Example:** `/hooks/useEbookState.ts`

```typescript
/**
 * Manages ebook reader state with useReducer
 * Consolidates 12+ related state variables
 */
export function useEbookState(initialPage = 0) {
  const reducer = function (state: EbookState, action: EbookAction) {
    switch (action.type) {
      case 'SET_PAGE':
        return { ...state, currentPage: action.payload };
      case 'TOGGLE_TOC':
        return { ...state, showToc: !state.showToc };
      // ... more actions
    }
  };

  const [state, dispatch] = useReducer(reducer, {
    currentPage: initialPage,
    showToc: false,
    isFullscreen: false,
  });

  // Return state and action creators
  return {
    ...state,
    setPage: (page: number) => dispatch({ type: 'SET_PAGE', payload: page }),
    toggleToc: () => dispatch({ type: 'TOGGLE_TOC' }),
  };
}
```

**Benefits:**
- Single source of truth for related state
- Predictable state updates
- Easy to test
- Better performance (single reducer vs multiple setters)

---

### Pattern 2: Side Effect Hook

**When to use:** Encapsulate useEffect logic with cleanup

**Example:** `/hooks/useKeyboardNav.ts`

```typescript
/**
 * Handles keyboard navigation with automatic cleanup
 */
export function useKeyboardNav(handlers: KeyboardHandlers) {
  useEffect(function () {
    function handleKeyDown(e: KeyboardEvent) {
      switch (e.key) {
        case 'ArrowLeft':
          if (handlers.onPrev) handlers.onPrev();
          break;
        case 'ArrowRight':
          if (handlers.onNext) handlers.onNext();
          break;
        case 'Escape':
          if (handlers.onClose) handlers.onClose();
          break;
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    // Cleanup
    return function () {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handlers]);
}
```

**Benefits:**
- Automatic event listener cleanup
- Reusable across components
- Centralized keyboard logic

---

### Pattern 3: Data Transformation Hook

**When to use:** Complex filtering, sorting, or data manipulation

**Example:** `/hooks/useVideoFiltering.ts`

```typescript
/**
 * Filters and sorts videos based on active categories and sort mode
 */
export function useVideoFiltering({
  videos,
  activeCategories,
  sortBy,
  videoCategories,
}: UseVideoFilteringParams): Video[] {
  return useMemo(
    function () {
      var vids = [...videos];

      // Filter by categories
      if (activeCategories.length > 0) {
        vids = vids.filter(/* filter logic */);
      }

      // Sort
      switch (sortBy) {
        case 'recent':
          vids.sort(/* sort logic */);
          break;
        // ... more cases
      }

      return vids;
    },
    [videos, activeCategories, sortBy, videoCategories]
  );
}
```

**Benefits:**
- Memoized for performance
- Testable in isolation
- Reusable across archive pages

---

### Pattern 4: Search Hook

**When to use:** Search/filter logic with debouncing

**Example:** `/hooks/useStickerSearch.ts`

```typescript
/**
 * Searches and filters stickers by query and theme
 */
export function useStickerSearch({
  stickers,
  searchQuery,
  activeTheme,
  themeMap,
}: UseStickerSearchParams) {
  return useMemo(function () {
    var result = [...stickers];

    // Filter by theme
    if (activeTheme !== 'all') {
      result = result.filter(function (s) {
        return themeMap[s.id] === activeTheme;
      });
    }

    // Filter by search query
    if (searchQuery.trim()) {
      var q = searchQuery.toLowerCase();
      result = result.filter(function (s) {
        return (
          s.label.toLowerCase().includes(q) ||
          s.alt.toLowerCase().includes(q)
        );
      });
    }

    return result;
  }, [stickers, searchQuery, activeTheme, themeMap]);
}
```

**Benefits:**
- Memoized search results
- Centralized search logic
- Easy to add debouncing later

---

### Pattern 5: Touch Gesture Hook

**When to use:** Complex touch interactions

**Example:** `/hooks/useTouchGestures.ts`

```typescript
/**
 * Handles swipe gestures for mobile navigation
 */
export function useTouchGestures({
  onSwipeLeft,
  onSwipeRight,
  threshold = 50,
}: UseTouchGesturesParams) {
  const touchStartRef = useRef({ x: 0, y: 0 });

  const handleTouchStart = useCallback(function (e: TouchEvent) {
    var touch = e.touches[0];
    if (touch) {
      touchStartRef.current = {
        x: touch.clientX,
        y: touch.clientY,
      };
    }
  }, []);

  const handleTouchEnd = useCallback(
    function (e: TouchEvent) {
      var touch = e.changedTouches[0];
      if (!touch) return;

      var deltaX = touch.clientX - touchStartRef.current.x;

      if (Math.abs(deltaX) > threshold) {
        if (deltaX > 0 && onSwipeRight) {
          onSwipeRight();
        } else if (deltaX < 0 && onSwipeLeft) {
          onSwipeLeft();
        }
      }
    },
    [onSwipeLeft, onSwipeRight, threshold]
  );

  useEffect(function () {
    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchend', handleTouchEnd);

    return function () {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchEnd]);
}
```

**Benefits:**
- Encapsulates complex gesture detection
- Automatic cleanup
- Configurable threshold

---

## Examples from Codebase

### Hook Inventory

**Current Custom Hooks (19+):**

| Hook | Category | Purpose | File |
|------|----------|---------|------|
| `useAppNavigate` | Navigation | Router navigation wrapper | `/hooks/useAppNavigate.ts` |
| `useEbookState` | State | Ebook reader state management | `/hooks/useEbookState.ts` |
| `useTouchGestures` | Interaction | Touch swipe detection | `/hooks/useTouchGestures.ts` |
| `useKeyboardNav` | Interaction | Keyboard navigation | `/hooks/useKeyboardNav.ts` |
| `useFullscreen` | Browser API | Fullscreen API wrapper | `/hooks/useFullscreen.ts` |
| `useVideoFiltering` | Data | Video filtering/sorting | `/hooks/useVideoFiltering.ts` |
| `useStickerSearch` | Data | Sticker search/filter | `/hooks/useStickerSearch.ts` |
| `useScrollSpy` | Interaction | Active section detection | `/hooks/useScrollSpy.ts` |
| `useReducedMotion` | Accessibility | Detect motion preference | `/hooks/useReducedMotion.ts` |
| `useTheme` | Theme | Dark/light mode | `/hooks/useTheme.ts` |
| `useMediaQuery` | Responsive | Media query detection | `/hooks/useMediaQuery.ts` |
| `useDebounce` | Utility | Debounced values | `/hooks/useDebounce.ts` |
| `useLocalStorage` | Storage | LocalStorage wrapper | `/hooks/useLocalStorage.ts` |
| `useIntersectionObserver` | Performance | Lazy loading trigger | `/hooks/useIntersectionObserver.ts` |
| `useKeyboardTrap` | Accessibility | Focus trap for modals | `/hooks/useKeyboardTrap.ts` |
| `useImagePreload` | Performance | Image preloading | `/hooks/useImagePreload.ts` |
| `useScrollPosition` | Interaction | Scroll position tracking | `/hooks/useScrollPosition.ts` |
| `useClickOutside` | Interaction | Detect outside clicks | `/hooks/useClickOutside.ts` |
| `useWindowSize` | Responsive | Window dimensions | `/hooks/useWindowSize.ts` |

---

## ES5 Constraints

**Important:** This project uses ES5 TypeScript due to Figma Make bundler constraints.

### Required Syntax

**Use named functions instead of arrow functions:**

```typescript
// ✅ CORRECT - Named function
const handleClick = useCallback(function handleClick(e) {
  console.log(e);
}, []);

// ❌ WRONG - Arrow function
const handleClick = useCallback((e) => {
  console.log(e);
}, []);
```

**Use `var` instead of `const`/`let` in certain contexts:**

```typescript
// ✅ CORRECT - var declarations
function useCustomHook() {
  var state = useState(0);
  var value = state[0];
  var setValue = state[1];
  return { value, setValue };
}

// ⚠️ RISKY - const/let may fail in bundler
function useCustomHook() {
  const [value, setValue] = useState(0);
  return { value, setValue };
}
```

**Avoid optional chaining and nullish coalescing:**

```typescript
// ✅ CORRECT - Explicit null checks
function useData(data) {
  if (data != null && data.items != null) {
    return data.items;
  }
  return [];
}

// ❌ WRONG - Optional chaining
function useData(data) {
  return data?.items ?? [];
}
```

---

## Testing Hooks

### Test Structure

**File:** `/hooks/__tests__/useVideoFiltering.test.ts`

```typescript
import { renderHook } from '@testing-library/react';
import { useVideoFiltering } from '../useVideoFiltering';

describe('useVideoFiltering', () => {
  const mockVideos = [
    { id: '1', title: 'Video A', category: 'Tutorial', publishedAt: '2026-01-01' },
    { id: '2', title: 'Video B', category: 'Festival', publishedAt: '2026-02-01' },
  ];

  it('should filter videos by category', () => {
    const { result } = renderHook(() =>
      useVideoFiltering({
        videos: mockVideos,
        activeCategories: ['tutorial'],
        sortBy: 'recent',
        videoCategories: [{ id: '1', name: 'Tutorial', slug: 'tutorial' }],
      })
    );

    expect(result.current).toHaveLength(1);
    expect(result.current[0].category).toBe('Tutorial');
  });

  it('should sort videos by date', () => {
    const { result } = renderHook(() =>
      useVideoFiltering({
        videos: mockVideos,
        activeCategories: [],
        sortBy: 'recent',
        videoCategories: [],
      })
    );

    expect(result.current[0].publishedAt).toBe('2026-02-01');
  });
});
```

---

## Common Pitfalls

### 1. Missing Dependencies

**Problem:** Missing values in dependency arrays

```typescript
// ❌ WRONG - Missing 'count' dependency
useEffect(function () {
  console.log(count);
}, []); // ESLint warning!

// ✅ CORRECT
useEffect(function () {
  console.log(count);
}, [count]);
```

### 2. Infinite Loops

**Problem:** Creating new objects/arrays in dependency arrays

```typescript
// ❌ WRONG - Creates new array every render
useEffect(function () {
  // ...
}, [videos.map((v) => v.id)]); // Infinite loop!

// ✅ CORRECT - Use useMemo
const videoIds = useMemo(() => videos.map((v) => v.id), [videos]);
useEffect(function () {
  // ...
}, [videoIds]);
```

### 3. Stale Closures

**Problem:** Using outdated values in callbacks

```typescript
// ❌ WRONG - Count is always 0
function useCounter() {
  const [count, setCount] = useState(0);
  
  const increment = useCallback(function () {
    setCount(count + 1); // Uses stale count!
  }, []);
  
  return { count, increment };
}

// ✅ CORRECT - Use functional update
function useCounter() {
  const [count, setCount] = useState(0);
  
  const increment = useCallback(function () {
    setCount(function (prev) { return prev + 1; });
  }, []);
  
  return { count, increment };
}
```

### 4. Not Cleaning Up

**Problem:** Memory leaks from missing cleanup

```typescript
// ❌ WRONG - No cleanup
useEffect(function () {
  window.addEventListener('resize', handleResize);
}, []); // Memory leak!

// ✅ CORRECT - With cleanup
useEffect(function () {
  window.addEventListener('resize', handleResize);
  
  return function () {
    window.removeEventListener('resize', handleResize);
  };
}, [handleResize]);
```

---

## Best Practices Checklist

When creating a custom hook, ensure:

- [ ] Name starts with `use` prefix
- [ ] File is in `/hooks/` directory
- [ ] Exported from `/hooks/index.ts` barrel export
- [ ] Has comprehensive JSDoc documentation
- [ ] Uses ES5 syntax (named functions, no optional chaining)
- [ ] Has proper TypeScript types
- [ ] Includes dependency arrays for all hooks
- [ ] Has cleanup functions for side effects
- [ ] Uses `useCallback` for event handlers
- [ ] Uses `useMemo` for computed values
- [ ] Has unit tests (when applicable)
- [ ] Returns consistent interface

---

## Hook Template

**File:** `/hooks/useTemplateHook.ts`

```typescript
/**
 * @fileoverview Template for creating custom hooks
 * 
 * [Description of what the hook does]
 * 
 * @example
 * ```tsx
 * const { value, setValue } = useTemplateHook({
 *   initialValue: 0,
 *   onChange: handleChange
 * });
 * ```
 * 
 * @version 1.0.0
 * @created 2026-03-11
 */

import { useState, useEffect, useCallback, useMemo } from 'react';

/**
 * Hook parameters interface
 */
interface UseTemplateHookParams {
  initialValue: number;
  onChange?: (value: number) => void;
}

/**
 * Hook return value interface
 */
interface UseTemplateHookReturn {
  value: number;
  setValue: (value: number) => void;
  reset: () => void;
}

/**
 * Template hook description
 * 
 * @param params - Hook configuration
 * @returns Hook state and methods
 */
export function useTemplateHook({
  initialValue,
  onChange,
}: UseTemplateHookParams): UseTemplateHookReturn {
  // State
  var state = useState(initialValue);
  var value = state[0];
  var setValueInternal = state[1];

  // Memoized values
  const computedValue = useMemo(
    function () {
      return value * 2;
    },
    [value]
  );

  // Callbacks
  const setValue = useCallback(
    function (newValue: number) {
      setValueInternal(newValue);
      if (onChange) {
        onChange(newValue);
      }
    },
    [onChange]
  );

  const reset = useCallback(
    function () {
      setValueInternal(initialValue);
    },
    [initialValue]
  );

  // Effects
  useEffect(
    function () {
      // Side effect logic
      
      // Cleanup
      return function () {
        // Cleanup logic
      };
    },
    [value]
  );

  // Return interface
  return {
    value,
    setValue,
    reset,
  };
}
```

---

## Migration Guide

### Converting Component Logic to Hook

**Before:** Component with inline logic

```typescript
export function MyComponent() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const filteredItems = useMemo(() => {
    return items
      .filter(item => item.name.includes(filter))
      .sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
  }, [items, filter, sortBy]);

  return (
    <div>
      {/* UI using filteredItems */}
    </div>
  );
}
```

**After:** Extracted to custom hook

```typescript
// /hooks/useItemFiltering.ts
export function useItemFiltering(items: Item[]) {
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const filteredItems = useMemo(() => {
    return items
      .filter(item => item.name.includes(filter))
      .sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
  }, [items, filter, sortBy]);

  return {
    filteredItems,
    filter,
    setFilter,
    sortBy,
    setSortBy,
  };
}

// Component
export function MyComponent() {
  const [items, setItems] = useState([]);
  const { filteredItems, filter, setFilter, sortBy, setSortBy } = useItemFiltering(items);

  return (
    <div>
      {/* UI using filteredItems */}
    </div>
  );
}
```

---

## References

- [React Hooks Documentation](https://react.dev/reference/react)
- [Custom Hooks Best Practices](https://react.dev/learn/reusing-logic-with-custom-hooks)
- [Testing React Hooks](https://react-hooks-testing-library.com/)
- [ES5 Constraints Guide](/guidelines/Guidelines.md#bundler-compatibility-rules)

---

**Document Status:** Active  
**Last Updated:** March 11, 2026  
**Maintained By:** Development Team
