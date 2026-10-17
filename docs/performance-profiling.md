---
title: "Performance Profiling Guide"
filename: "/docs/performance-profiling.md"
created: "2026-03-12"
modified: "2026-03-12"
version: "1.0.0"
related_docs:
  - "/docs/custom-hooks-guide.md"
  - "/docs/component-composition-guide.md"
  - "/docs/virtualization-guide.md"
---

# Performance Profiling Guide

**Created:** March 12, 2026  
**Last Updated:** March 12, 2026  
**Status:** Active

---

## Overview

This guide demonstrates how to identify and fix performance bottlenecks in the Nova News React application. It covers profiling tools, memoization strategies, and optimization techniques.

**Key Concepts:**
- When to use React DevTools Profiler
- How to identify expensive re-renders
- Memoization strategies (useMemo, useCallback, React.memo)
- Performance budgets and metrics

---

## Table of Contents

1. [Performance Metrics](#performance-metrics)
2. [React DevTools Profiler](#react-devtools-profiler)
3. [Chrome DevTools Performance Tab](#chrome-devtools-performance-tab)
4. [Identifying Performance Issues](#identifying-performance-issues)
5. [Optimization Strategies](#optimization-strategies)
6. [Memoization Patterns](#memoization-patterns)
7. [Code Splitting](#code-splitting)
8. [Performance Budget](#performance-budget)
9. [Real-World Examples](#real-world-examples)

---

## Performance Metrics

### Core Web Vitals

Google's Core Web Vitals are key metrics for measuring user experience:

| Metric | Good | Needs Improvement | Poor | What It Measures |
|---|---|---|---|---|
| **LCP** (Largest Contentful Paint) | ≤ 2.5s | 2.5s - 4.0s | > 4.0s | Loading performance |
| **FID** (First Input Delay) | ≤ 100ms | 100ms - 300ms | > 300ms | Interactivity |
| **CLS** (Cumulative Layout Shift) | ≤ 0.1 | 0.1 - 0.25 | > 0.25 | Visual stability |

**Nova News Targets:**
- LCP: < 2.0s (hero image + text)
- FID: < 50ms (theme toggle, menu open)
- CLS: < 0.05 (minimal layout shifts)

### React-Specific Metrics

- **Component Render Time** - How long a component takes to render
- **Re-render Count** - How many times a component re-renders
- **Wasted Renders** - Re-renders that produce identical output
- **Mount Time** - Initial component mount duration

---

## React DevTools Profiler

### Installation

1. Install React Developer Tools browser extension:
   - [Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
   - [Firefox](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/)

2. Open DevTools (F12)
3. Navigate to "Profiler" tab

### Recording a Profile

**Step 1: Start Recording**

1. Click the record button (⏺️) in Profiler tab
2. Interact with your app (e.g., open portfolio page, filter items)
3. Click stop button (⏹️)

**Step 2: Analyze the Flame Graph**

The flame graph shows component hierarchy and render times:

```
HomePage (15ms)
├── Header (2ms)
│   ├── Logo (0.5ms)
│   └── Navigation (1ms)
├── HeroLayout (5ms)
│   ├── Title (1ms)
│   └── CTAButtons (1ms)
└── PortfolioGrid (8ms)  ← SLOW!
    ├── PortfolioCard (1ms) x 12 = 12ms
    └── Lightbox (3ms)
```

**What to Look For:**

- **Yellow/Red bars** - Components with long render times
- **Wide bars** - Components that render many children
- **Multiple identical renders** - Unnecessary re-renders

### Profiler Settings

**Recommended Settings:**

- ✅ "Highlight updates when components render"
- ✅ "Record why each component rendered"
- ✅ "Hide commits below X ms" (set to 1ms)

---

## Chrome DevTools Performance Tab

### Recording a Performance Profile

1. Open Chrome DevTools (F12)
2. Navigate to "Performance" tab
3. Click record button (⏺️)
4. Perform user actions (scroll, click, navigate)
5. Click stop button (⏹️)

### Reading the Timeline

```
Main Thread Timeline:
|--- Scripting (JS) ---|--- Rendering ---|--- Painting ---|
     50ms                    30ms             20ms
```

**Key Sections:**

- **Scripting** (yellow) - JavaScript execution
- **Rendering** (purple) - Layout calculations
- **Painting** (green) - Drawing pixels
- **Idle** (white) - Browser is waiting

**Performance Goals:**

- Keep frame time < 16.6ms (60 FPS)
- Minimize long tasks (> 50ms blocks main thread)
- Reduce layout thrashing

### Long Task Detection

**What is a Long Task?**

Any JavaScript execution that blocks the main thread for > 50ms.

**Example: Long Task Warning**

```
⚠️ Long Task Detected
Function: filterPortfolioEntries
Duration: 127ms
Impact: UI frozen during filtering
```

**Fix:**

```tsx
// ❌ BAD - Blocks main thread
const filtered = portfolioData.filter(entry => {
  // Complex filtering logic (127ms)
});

// ✅ GOOD - Use useMemo to cache result
const filtered = useMemo(() => {
  return portfolioData.filter(entry => {
    // Same logic, but only runs when dependencies change
  });
}, [portfolioData, activeCategory, activeTags]);
```

---

## Identifying Performance Issues

### Symptom 1: Slow Initial Page Load

**Diagnosis:**

1. Open Chrome DevTools → Performance
2. Click "Reload" icon with recording enabled
3. Check "Load" event time

**Common Causes:**

- Large bundle size (> 500KB)
- Unoptimized images (no lazy loading)
- Blocking scripts in `<head>`
- No code splitting

**Solutions:**

- Enable code splitting with `React.lazy()`
- Implement lazy loading for images
- Use Lighthouse to identify issues

### Symptom 2: Janky Scrolling

**Diagnosis:**

1. Open React DevTools → Profiler
2. Enable "Highlight updates when components render"
3. Scroll the page slowly
4. Watch for flashing blue boxes

**Common Causes:**

- Components re-rendering on scroll events
- Expensive scroll handlers
- No throttling/debouncing

**Solution:**

```tsx
// ❌ BAD - Re-renders on every scroll
window.addEventListener('scroll', () => {
  setScrollPosition(window.scrollY);
});

// ✅ GOOD - Throttled scroll handler
import { useEffect, useState, useRef } from 'react';

function useThrottledScroll(delay = 100) {
  const [scrollY, setScrollY] = useState(0);
  const throttleTimeout = useRef<number | null>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (throttleTimeout.current === null) {
        throttleTimeout.current = window.setTimeout(() => {
          setScrollY(window.scrollY);
          throttleTimeout.current = null;
        }, delay);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [delay]);
  
  return scrollY;
}
```

### Symptom 3: Slow Interactions (Button Clicks, Form Input)

**Diagnosis:**

1. Open React DevTools → Profiler
2. Record a profile
3. Click a button or type in an input
4. Check "Why did this render?" in Profiler

**Common Causes:**

- Parent component re-renders on every keystroke
- No useCallback on event handlers
- No React.memo on child components

**Solution:**

```tsx
// ❌ BAD - Creates new function on every render
<Button onClick={() => handleClick(id)}>
  Click me
</Button>

// ✅ GOOD - Memoized function
const handleClickMemo = useCallback(() => {
  handleClick(id);
}, [id]);

<Button onClick={handleClickMemo}>
  Click me
</Button>
```

### Symptom 4: Large List Rendering Slowly

**Diagnosis:**

1. Open React DevTools → Profiler
2. Render a page with 100+ items (e.g., portfolio grid)
3. Check total render time

**Common Causes:**

- Rendering all items at once
- No virtualization for long lists
- Expensive child components

**Solutions:**

- Implement virtualization (see [virtualization-guide.md](./virtualization-guide.md))
- Use pagination
- Optimize child components with React.memo

---

## Optimization Strategies

### 1. Component Memoization

**Use React.memo to prevent unnecessary re-renders:**

```tsx
// ❌ BAD - Re-renders every time parent updates
export function PortfolioCard({ title, image }) {
  return (
    <article className="portfolio-card">
      <img src={image} alt={title} />
      <h3>{title}</h3>
    </article>
  );
}

// ✅ GOOD - Only re-renders when props change
export const PortfolioCard = React.memo(function PortfolioCard({ title, image }) {
  return (
    <article className="portfolio-card">
      <img src={image} alt={title} />
      <h3>{title}</h3>
    </article>
  );
});
```

**When to Use React.memo:**

- ✅ Pure functional components that render the same output for same props
- ✅ Components rendered in lists (e.g., PortfolioCard in grid)
- ✅ Components that receive complex objects as props
- ❌ Components that always render different output
- ❌ Tiny components with minimal render cost

### 2. useMemo for Expensive Calculations

**Cache computed values:**

```tsx
// ❌ BAD - Recalculates on every render
function PortfolioPage() {
  const filtered = portfolioData.filter(entry => 
    entry.category === activeCategory
  );
  const sorted = filtered.sort((a, b) => 
    new Date(b.date) - new Date(a.date)
  );
  
  return <PortfolioGrid entries={sorted} />;
}

// ✅ GOOD - Only recalculates when dependencies change
function PortfolioPage() {
  const sortedEntries = useMemo(() => {
    const filtered = portfolioData.filter(entry => 
      entry.category === activeCategory
    );
    return filtered.sort((a, b) => 
      new Date(b.date) - new Date(a.date)
    );
  }, [portfolioData, activeCategory]);
  
  return <PortfolioGrid entries={sortedEntries} />;
}
```

**When to Use useMemo:**

- ✅ Expensive calculations (filtering, sorting, transforming large arrays)
- ✅ Derived state that depends on props/state
- ✅ Creating objects/arrays passed to child components
- ❌ Simple calculations (addition, string concatenation)
- ❌ Premature optimization (profile first!)

### 3. useCallback for Event Handlers

**Prevent function re-creation:**

```tsx
// ❌ BAD - Creates new function on every render
function ParentComponent() {
  const [count, setCount] = useState(0);
  
  return (
    <ChildComponent 
      onClick={() => setCount(count + 1)} 
    />
  );
}

// ✅ GOOD - Memoized function
function ParentComponent() {
  const [count, setCount] = useState(0);
  
  const handleClick = useCallback(() => {
    setCount(prev => prev + 1);
  }, []); // No dependencies - uses updater function
  
  return (
    <ChildComponent onClick={handleClick} />
  );
}
```

**When to Use useCallback:**

- ✅ Functions passed to memoized child components
- ✅ Functions used in useEffect dependencies
- ✅ Event handlers in large lists
- ❌ Functions only used within the component
- ❌ Simple inline functions with no child components

### 4. Lazy Loading Components

**Split code and load on demand:**

```tsx
// ❌ BAD - Loads all pages upfront
import { HomePage } from './components/pages/HomePage';
import { PortfolioPage } from './components/pages/PortfolioPage';
import { BlogPage } from './components/pages/BlogPage';

// ✅ GOOD - Loads pages only when needed
const HomePage = React.lazy(() => import('./components/pages/HomePage'));
const PortfolioPage = React.lazy(() => import('./components/pages/PortfolioPage'));
const BlogPage = React.lazy(() => import('./components/pages/BlogPage'));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/blog" element={<BlogPage />} />
      </Routes>
    </Suspense>
  );
}
```

### 5. Image Optimization

**Lazy load images below the fold:**

```tsx
// ❌ BAD - Loads all images immediately
<img src="/large-image.jpg" alt="Portfolio" />

// ✅ GOOD - Lazy loads image
<img 
  src="/large-image.jpg" 
  alt="Portfolio"
  loading="lazy"
/>

// ✅ BETTER - Custom lazy loading with placeholder
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';

<ImageWithFallback
  src="/large-image.jpg"
  alt="Portfolio"
  className="portfolio-card__image"
/>
```

---

## Memoization Patterns

### Pattern 1: Memoizing Filtered Lists

```tsx
function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  
  // ✅ Memoize filtered results
  const filteredPosts = useMemo(() => {
    return blogData.posts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);
  
  return (
    <div className="blog-archive">
      <SearchInput value={searchQuery} onChange={setSearchQuery} />
      <CategoryFilter active={activeCategory} onChange={setActiveCategory} />
      <BlogGrid posts={filteredPosts} />
    </div>
  );
}
```

### Pattern 2: Memoizing Complex Calculations

```tsx
function AnalyticsPage() {
  const [dateRange, setDateRange] = useState({ start: '2026-01-01', end: '2026-03-12' });
  
  // ✅ Memoize expensive analytics calculation
  const stats = useMemo(() => {
    const views = analyticsData.filter(d => 
      d.date >= dateRange.start && d.date <= dateRange.end
    );
    
    return {
      totalViews: views.reduce((sum, d) => sum + d.views, 0),
      averageViews: views.reduce((sum, d) => sum + d.views, 0) / views.length,
      peakDay: views.reduce((max, d) => d.views > max.views ? d : max),
    };
  }, [dateRange]);
  
  return (
    <div className="analytics">
      <StatCard title="Total views" value={stats.totalViews} />
      <StatCard title="Average views" value={stats.averageViews} />
      <StatCard title="Peak day" value={stats.peakDay.date} />
    </div>
  );
}
```

### Pattern 3: Memoizing Event Handlers in Lists

```tsx
function PortfolioGrid({ entries }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  
  // ❌ BAD - Creates new function for every entry
  return (
    <div className="portfolio-grid">
      {entries.map(entry => (
        <PortfolioCard
          key={entry.id}
          {...entry}
          onClick={() => setSelectedId(entry.id)} // New function every render!
        />
      ))}
    </div>
  );
}

// ✅ GOOD - Use useCallback + pass ID as prop
function PortfolioGrid({ entries }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  
  const handleCardClick = useCallback((id: string) => {
    setSelectedId(id);
  }, []);
  
  return (
    <div className="portfolio-grid">
      {entries.map(entry => (
        <PortfolioCard
          key={entry.id}
          {...entry}
          onSelect={handleCardClick}
        />
      ))}
    </div>
  );
}

const PortfolioCard = React.memo(function PortfolioCard({ id, title, image, onSelect }) {
  const handleClick = useCallback(() => {
    onSelect(id);
  }, [id, onSelect]);
  
  return (
    <article className="portfolio-card" onClick={handleClick}>
      <img src={image} alt={title} />
      <h3>{title}</h3>
    </article>
  );
});
```

---

## Code Splitting

### Route-Based Code Splitting

**Split by page:**

```tsx
// /App.tsx
import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';

// Lazy load all page components
const HomePage = lazy(() => import('./components/pages/HomePage'));
const PortfolioPage = lazy(() => import('./components/pages/portfolio/PortfolioPage'));
const BlogPage = lazy(() => import('./components/pages/blog/BlogPage'));
const AboutPage = lazy(() => import('./components/pages/about/AboutPage'));

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <HomePage />
      </Suspense>
    ),
  },
  {
    path: '/portfolio',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <PortfolioPage />
      </Suspense>
    ),
  },
  // ... more routes
]);

export default function App() {
  return <RouterProvider router={router} />;
}
```

**Result:**

- Initial bundle: 150KB (only HomePage)
- Portfolio page bundle: 80KB (loaded on demand)
- Blog page bundle: 120KB (loaded on demand)

### Component-Based Code Splitting

**Split heavy components:**

```tsx
// ❌ BAD - Loads Lightbox upfront (large dependency)
import { Lightbox } from '@/components/ui/Lightbox';

function PortfolioPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  
  return (
    <>
      <PortfolioGrid />
      {lightboxOpen && <Lightbox onClose={() => setLightboxOpen(false)} />}
    </>
  );
}

// ✅ GOOD - Loads Lightbox only when opened
const Lightbox = lazy(() => import('@/components/ui/Lightbox'));

function PortfolioPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  
  return (
    <>
      <PortfolioGrid />
      {lightboxOpen && (
        <Suspense fallback={<div>Loading...</div>}>
          <Lightbox onClose={() => setLightboxOpen(false)} />
        </Suspense>
      )}
    </>
  );
}
```

---

## Performance Budget

### Nova News Performance Budget

| Metric | Target | Max Allowed | Current |
|---|---|---|---|
| Initial JS Bundle | < 200KB | 300KB | 185KB ✅ |
| Initial CSS | < 50KB | 75KB | 48KB ✅ |
| LCP | < 2.0s | 2.5s | 1.8s ✅ |
| FID | < 50ms | 100ms | 35ms ✅ |
| CLS | < 0.05 | 0.1 | 0.03 ✅ |
| Lighthouse Score | > 95 | 90 | 97 ✅ |

### Monitoring Tools

**1. Lighthouse CI**

```bash
# Run Lighthouse audit
npm run lighthouse

# Output:
# Performance: 97/100 ✅
# Accessibility: 100/100 ✅
# Best Practices: 95/100 ✅
# SEO: 100/100 ✅
```

**2. Bundle Analyzer**

```bash
# Analyze bundle size
npm run build
npm run analyze

# Opens interactive treemap showing bundle composition
```

**3. Web Vitals Library**

```tsx
// /utils/webVitals.ts
import { onCLS, onFID, onLCP } from 'web-vitals';

export function reportWebVitals() {
  onCLS(console.log);
  onFID(console.log);
  onLCP(console.log);
}

// In /main.tsx
import { reportWebVitals } from './utils/webVitals';

if (import.meta.env.DEV) {
  reportWebVitals();
}
```

---

## Real-World Examples

### Example 1: Optimizing BlogPage

**Problem:** BlogPage re-renders entire list when user types in search box.

**Before:**

```tsx
function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filtered = blogData.posts.filter(post => 
    post.title.includes(searchQuery)
  );
  
  return (
    <>
      <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
      {filtered.map(post => <BlogCard key={post.id} {...post} />)}
    </>
  );
}
```

**Profiler Results:**
- Render time: 127ms (12 re-renders while typing "Berlin")
- Wasted renders: 11/12 (only last one shows new results)

**After:**

```tsx
function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  
  // ✅ Memoize filtered results
  const filtered = useMemo(() => {
    return blogData.posts.filter(post => 
      post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);
  
  return (
    <>
      <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
      {filtered.map(post => <BlogCard key={post.id} {...post} />)}
    </>
  );
}

// ✅ Memoize BlogCard
const BlogCard = React.memo(function BlogCard({ title, excerpt, image }) {
  return (
    <article className="blog-card">
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <p>{excerpt}</p>
    </article>
  );
});
```

**Profiler Results (After):**
- Render time: 15ms (12 re-renders while typing "Berlin")
- Wasted renders: 0/12 (BlogCard only re-renders when filtered list changes)

**Improvement:** 88% faster (127ms → 15ms)

---

### Example 2: Optimizing PortfolioGrid Lightbox

**Problem:** Opening lightbox causes entire page to re-render.

**Before:**

```tsx
function PortfolioPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  
  return (
    <>
      <Header />
      <PortfolioGrid 
        onImageClick={(index) => {
          setCurrentImage(index);
          setLightboxOpen(true);
        }}
      />
      {lightboxOpen && (
        <Lightbox 
          images={portfolioData.images}
          currentIndex={currentImage}
          onClose={() => setLightboxOpen(false)}
        />
      )}
      <Footer />
    </>
  );
}
```

**Profiler Results:**
- Opening lightbox: 45ms
- Re-renders: Header (2ms), PortfolioGrid (25ms), Footer (3ms), Lightbox (15ms)

**After:**

```tsx
function PortfolioPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  
  // ✅ Memoize event handler
  const handleImageClick = useCallback((index: number) => {
    setCurrentImage(index);
    setLightboxOpen(true);
  }, []);
  
  const handleLightboxClose = useCallback(() => {
    setLightboxOpen(false);
  }, []);
  
  return (
    <>
      <Header />
      <PortfolioGrid onImageClick={handleImageClick} />
      {lightboxOpen && (
        <Suspense fallback={null}>
          <Lightbox 
            images={portfolioData.images}
            currentIndex={currentImage}
            onClose={handleLightboxClose}
          />
        </Suspense>
      )}
      <Footer />
    </>
  );
}

// ✅ Memoize PortfolioGrid
const PortfolioGrid = React.memo(function PortfolioGrid({ onImageClick }) {
  return (
    <div className="portfolio-grid">
      {/* Grid content */}
    </div>
  );
});
```

**Profiler Results (After):**
- Opening lightbox: 18ms
- Re-renders: Only Lightbox renders (Header/Footer/Grid stay mounted)

**Improvement:** 60% faster (45ms → 18ms)

---

## Checklist

### Before Optimization

- [ ] Profile the application with React DevTools
- [ ] Identify slow components (> 16ms render time)
- [ ] Check for wasted renders (same output, different timestamp)
- [ ] Measure bundle size with analyzer
- [ ] Run Lighthouse audit

### During Optimization

- [ ] Add useMemo for expensive calculations
- [ ] Add useCallback for event handlers passed to children
- [ ] Wrap pure components with React.memo
- [ ] Implement code splitting for heavy components
- [ ] Lazy load images below the fold

### After Optimization

- [ ] Re-profile with React DevTools
- [ ] Verify render times decreased
- [ ] Check bundle size reduced
- [ ] Run Lighthouse again
- [ ] Test on slower devices (CPU throttling)

---

## Summary

This guide covered:

1. ✅ Performance metrics (Core Web Vitals, React-specific)
2. ✅ React DevTools Profiler usage
3. ✅ Chrome DevTools Performance tab
4. ✅ Identifying common performance issues
5. ✅ Optimization strategies (React.memo, useMemo, useCallback)
6. ✅ Memoization patterns
7. ✅ Code splitting techniques
8. ✅ Performance budgets
9. ✅ Real-world optimization examples

**Key Takeaways:**

- **Profile before optimizing** - Don't guess, measure!
- **Use React DevTools Profiler** - Identify slow components
- **Memoize strategically** - Only when it improves performance
- **Code split heavy components** - Reduce initial bundle size
- **Monitor performance budgets** - Set targets and track progress

**Related Guides:**

- [Custom Hooks Guide](./custom-hooks-guide.md)
- [Component Composition Guide](./component-composition-guide.md)
- [Virtualization Guide](./virtualization-guide.md)

---

**Last Updated:** March 12, 2026  
**Maintained By:** Development Team
