# Data File Split Plan — Blog Posts Optimization

**Created:** March 5, 2026  
**Task:** T31 from Memory Reduction Audit v2  
**Current file:** `/data/mock/blog/posts.ts` (1,236 lines)  
**Target:** 5 category-based modules (~900 lines deferred per route)

---

## Current Structure

**Main file:** `/data/mock/blog/posts.ts` (23 posts + imports)  
**Timeline file:** `/data/mock/blog/posts-timeline.ts` (12 posts)  
**Total posts:** 35  
**Export pattern:** `blogPosts` = main posts `.concat(timelineBlogPosts)`

---

## Proposed Split Strategy

### New Directory Structure

```
/data/mock/blog/
├── posts/
│   ├── travel.ts          # 11 posts (~360 lines)
│   ├── education.ts       # 10 posts (~340 lines)
│   ├── insights.ts        # 10 posts (~340 lines)
│   ├── tutorials.ts       # 3 posts (~100 lines)
│   ├── festival.ts        # 2 posts (~70 lines)
│   └── index.ts           # Barrel export (15 lines)
├── posts.ts (modified)    # Re-export from posts/index.ts (10 lines)
└── posts-timeline.ts      # Keep as-is (485 lines)
```

### Category Breakdown

**travel.ts (11 posts)**
- From posts.ts: origin-festival-2026-cycle-adventure, berlin-called-i-answered, thailand-festival-experience, eighty-six-hours-solar-eclipse-festival-zambia, seven-thousand-kilometers-thailand-bicycle-adventures, cape-town-berlin-koh-phangan-life-by-design
- From timeline: oregon-eclipse-chasing-totality-across-america, first-season-koh-phangan-muay-thai-coral-reefs, the-loaded-bike-40kg-of-everything, africaburn-three-burns-radical-self-expression, berlin-summer-2023-nine-hundred-thousand-steps

**education.ts (10 posts)**
- From posts.ts: twenty-three-years-lightspeed, six-cats-green-garden-begins, color-theory-for-makeup, half-colours-2-oclock-club-provincial-champion, how-ai-changed-lightspeed-august-2025, designing-your-own-life-business-at-twenty-two
- From timeline: ambidextrous-painting-with-both-hands, muay-thai-and-the-art-of-getting-hit, miss-scott-saw-it-first, wordcamp-europe-2025-crazy-south-african

**insights.ts (10 posts)**
- From posts.ts: tribes-that-made-me, dancefloor-gave-me-everything, costume-evolution-chicken-man-to-uv-artist, wired-different-adhd-as-superpower, neon-revelations-birth-of-uv-art-form, lucy-our-welcoming-committee, this-one-time-on-acid-announcing-the-book
- From timeline: snails-in-the-garden-where-it-all-began, day-zero-cape-town-water-crisis, when-the-dancefloors-went-dark

**tutorials.ts (3 posts)**
- From posts.ts: festival-makeup-survival-guide (Makeup Tips), uv-makeup-guide (Tutorials), festival-packing-list (Festival Tips)

**festival.ts (2 posts)**
- From posts.ts: eco-friendly-glitter-guide (Sustainability), dancefloor-gave-me-everything (Festival)

---

## Implementation Steps

### Step 1: Create Category Files

Each category file will have:
- JSDoc header with category description
- Shared figma:asset imports (moved from main posts.ts)
- BlogPost[] export with only posts for that category
- Bundler-safe syntax (no arrow functions, explicit `var` declarations)

### Step 2: Create Barrel Export

`/data/mock/blog/posts/index.ts`:
```typescript
/**
 * @fileoverview Blog posts barrel export
 * Aggregates all category-based post modules
 */

import { BlogPost } from '../../../types';
import { travelPosts } from './travel';
import { educationPosts } from './education';
import { insightsPosts } from './insights';
import { tutorialsPosts } from './tutorials';
import { festivalPosts } from './festival';
import { timelineBlogPosts } from '../posts-timeline';

export const blogPosts: BlogPost[] = ([] as BlogPost[])
  .concat(travelPosts)
  .concat(educationPosts)
  .concat(insightsPosts)
  .concat(tutorialsPosts)
  .concat(festivalPosts)
  .concat(timelineBlogPosts);
```

### Step 3: Update Main File

Modify `/data/mock/blog/posts.ts` to re-export from the barrel:
```typescript
/**
 * @fileoverview Blog posts - re-export from modular structure
 * @deprecated Use /data/mock/blog/posts/{category}.ts for direct imports
 */

export { blogPosts } from './posts/index';
```

### Step 4: Update Imports (if needed)

Check all files that import from `/data/mock/blog/posts` and verify they still work:
- Components that use `blogPosts` array will continue to work (no changes needed)
- Future optimizations can import specific categories for route-based code splitting

---

## Benefits

1. **Bundle Size Reduction** — Routes that only need specific categories can import them directly (~900 lines deferred)
2. **Maintainability** — Easier to find and edit posts by category
3. **Backward Compatibility** — Main `blogPosts` export continues to work for existing components
4. **Future-Proof** — Enables route-based code splitting when needed

---

## Risks & Mitigation

**Risk:** Breaking existing imports  
**Mitigation:** Keep main `/data/mock/blog/posts.ts` as re-export, test all blog-related pages

**Risk:** Figma:asset imports need to be duplicated across files  
**Mitigation:** Move shared images to category files that use them, only 2 images currently used

**Risk:** Timeline posts split logic becomes complex  
**Mitigation:** Keep `posts-timeline.ts` as-is, concat in barrel export

---

## Testing Checklist

After split:
- [ ] Blog list page loads without errors
- [ ] Blog post pages render correctly
- [ ] Blog category pages work
- [ ] Blog tag pages work
- [ ] Search results include all posts
- [ ] Sitemap includes all posts
- [ ] No TypeScript errors
- [ ] No bundler errors

---

**Status:** Awaiting approval to proceed  
**Estimated time:** 45-60 minutes  
**Estimated savings:** ~900 lines per lazy-loaded route
