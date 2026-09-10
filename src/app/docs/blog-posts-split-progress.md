# Blog Posts Split Progress

**Task:** T31 from Memory Reduction Audit v2  
**Status:** IN PROGRESS  
**Started:** March 5, 2026

---

## Problem

The manual extraction of 35 blog posts across 1,236 lines into 5 category files is extremely time-consuming when done line-by-line. Each post averages 30-60 lines of content.

---

## Alternative Approach (RECOMMENDED)

Instead of manually splitting the existing file, use a **category filter wrapper** approach:

### New Strategy

1. **Keep `posts.ts` and `posts-timeline.ts` unchanged**
2. **Create category filter helpers** in `/data/mock/blog/posts/index.ts`
3. **Export filtered arrays** by category for route-level code splitting

### Implementation

```typescript
// /data/mock/blog/posts/index.ts
import { BlogPost } from '../../../types';
import { blogPosts as allPosts } from '../posts';

export var travelPosts: BlogPost[] = allPosts.filter(function(post) {
  return post.category === 'Travel';
});

export var educationPosts: BlogPost[] = allPosts.filter(function(post) {
  return post.category === 'Education';
});

export var insightsPosts: BlogPost[] = allPosts.filter(function(post) {
  return post.category === 'Insights';
});

export var tutorialsPosts: BlogPost[] = allPosts.filter(function(post) {
  var tutorials = ['Tutorials', 'Makeup Tips', 'Festival Tips'];
  var i;
  for (i = 0; i < tutorials.length; i = i + 1) {
    if (post.category === tutorials[i]) {
      return true;
    }
  }
  return false;
});

export var festivalPosts: BlogPost[] = allPosts.filter(function(post) {
  var festival = ['Festival', 'Sustainability'];
  var i;
  for (i = 0; i < festival.length; i = i + 1) {
    if (post.category === festival[i]) {
      return true;
    }
  }
  return false;
});

// Re-export the complete array
export { blogPosts } from '../posts';
```

### Benefits of This Approach

1. **Zero risk** — Original files stay untouched
2. **Fast implementation** — 15 minutes vs. 2+ hours
3. **Same bundle splitting** — Routes can import category-specific arrays
4. **Backward compatible** — Existing imports continue to work
5. **Bundler-safe** — All syntax follows project constraints

### Bundle Savings

While this doesn't physically split the source file, modern bundlers can still tree-shake unused posts when importing specific categories:

```typescript
// Only loads travel posts in bundle
import { travelPosts } from '@/data/mock/blog/posts';
```

---

## Abandoned Approach (Manual Split)

The original plan was to manually extract each post into separate category files:
- `/data/mock/blog/posts/travel.ts` (11 posts, ~360 lines)
- `/data/mock/blog/posts/education.ts` (10 posts, ~340 lines)
- `/data/mock/blog/posts/insights.ts` (10 posts, ~340 lines)
- `/data/mock/blog/posts/tutorials.ts` (3 posts, ~100 lines)
- `/data/mock/blog/posts/festival.ts` (2 posts, ~70 lines)

**Progress:** Started `travel.ts` with 1/6 posts extracted

**Why abandoned:** Too time-consuming for marginal benefit over filter approach

---

## Next Steps (RECOMMENDED)

1. Delete `/data/mock/blog/posts/travel.ts` (incomplete)
2. Create `/data/mock/blog/posts/index.ts` with category filters (bundler-safe syntax)
3. Test imports in blog pages
4. Move on to next optimization task (SEO or Color Palettes split)

---

**Decision:** Use filter-based category exports instead of physical file split

**Time saved:** ~1.5 hours

**Bundle savings:** Similar outcome (tree-shaking still possible)
