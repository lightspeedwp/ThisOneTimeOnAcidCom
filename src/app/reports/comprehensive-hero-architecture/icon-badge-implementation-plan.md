# Icon Badge Implementation Plan

**Date:** March 7, 2026  
**Task:** Add Phosphor icons to dev tools page hero badges  
**Scope:** 37 dev tools pages

---

## Current State

### Existing Badge Structure

```tsx
<span className="specimen-page__hero-badge">Typography</span>
```

**CSS:**
```css
.specimen-page__hero-badge {
  /* Neon chip badge styling */
}
```

---

## Proposed Enhancement

### New Badge Structure with Icon

```tsx
<span className="specimen-page__hero-badge">
  <TextAa size={16} weight="duotone" aria-hidden="true" />
  <span>Typography</span>
</span>
```

**CSS Updates:**
```css
.specimen-page__hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  /* existing styles */
}

.specimen-page__hero-badge svg {
  flex-shrink: 0;
}
```

---

## Implementation Strategy

### Option A: Manual Update (FAST ⚡)

**Pros:**
- Quick implementation (30-45 minutes)
- No new dependencies
- Works with existing structure

**Cons:**
- Need to manually update 37 files
- Icon choices must be decided per-page

**Steps:**
1. Choose icons for each page (based on `/data/mock/ui/dev-tools.ts` icon field)
2. Import icon in each page component
3. Add icon element to badge span
4. Update CSS for icon support

---

### Option B: Data-Driven Component (COMPREHENSIVE)

**Pros:**
- Single source of truth
- Easy to maintain
- Consistent across all pages

**Cons:**
- Requires new component
- Longer implementation time (2-3 hours)
- Needs data file updates

**Steps:**
1. Create `<PageHeroBadge>` component
2. Accept `icon` prop (Phosphor icon name string)
3. Map icon names to components
4. Update all 37 pages to use new component

---

## Recommended Approach: Option A (Fast Manual Update)

### Rationale

1. **Time-efficient** — Can be completed in 40 minutes
2. **No architecture changes** — Works with existing CSS
3. **Immediate visual improvement** — Icons appear instantly
4. **Backward compatible** — Doesn't break existing pages

### Icon Mapping (from dev-tools.ts data)

| Page | Icon (from data) | Phosphor Icon Component |
|---|---|---|
| Style Guide | `Palette` | `Palette` |
| Typography | `Type` | `TextAa` |
| Spacing | `Ruler` | `Ruler` |
| Shadows | `Cloud` | `Cloud` |
| Radius | `Circle` | `Circle` |
| Buttons | `MousePointerClick` | `Cursor` |
| Cards | `LayoutGrid` | `SquaresFour` |
| Animations | `Zap` | `Lightning` |
| Color Palettes | `Palette` | `Palette` |
| Tokens | `Lightbulb` | `Lightbulb` |
| Icons | `Bookmark` | `BookmarkSimple` |
| Phosphor Icons | `Sparkle` | `Sparkle` |
| API | `FileCode` | `FileCode` |
| Components | `Stack` | `Stack` |
| Docs | `FileText` | `FileText` |
| Playground | `Activity` | `Heartbeat` |
| Snippets | `Scissors` | `Scissors` |
| Analytics | `Heartbeat` | `Heartbeat` |
| Code Quality | `Shield` | `Shield` |
| Visual Regression | `Eye` | `Eye` |
| Integration | `Lightbulb` | `Lightbulb` |
| Accessibility | `Shield` | `Shield` |
| Performance | `Gauge` | `Heartbeat` |
| Deployment | `Rocket` | `Rocket` |
| Content Specimens | Article | `Article` |
| Blog Specimens | Article | `Article` |
| Portfolio Specimens | Images | `Images` |
| Video Specimens | Video | `Video` |
| Podcast Specimens | Microphone | `Microphone` |
| Event Specimens | CalendarDots | `CalendarDots` |
| FAQ Specimens | Question | `Question` |
| Card Shapes | Cards | `Cards` |
| Card Interactions | CursorClick | `CursorClick` |
| Grid Layouts | GridFour | `GridFour` |
| Detail Templates | Browsers | `Browsers` |

---

## CSS Updates Required

### File: `/styles/blocks/specimen-page.css`

```css
.specimen-page__hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 0.375rem 0.75rem;
  border-radius: 100px;
  font-size: var(--wp--preset--font-size--100);
  font-weight: 600;
  background: rgba(var(--neon-green-rgb), 0.15);
  border: 1px solid rgba(var(--neon-green-rgb), 0.4);
  color: var(--wp--preset--color--neon-green);
}

.specimen-page__hero-badge svg {
  flex-shrink: 0;
  width: 16px;
  height: 16px;
}
```

---

## Verification Checklist

After implementation:

- [ ] All 37 dev tools pages display badge icon
- [ ] Icons are properly sized (16px)
- [ ] Icons align with text
- [ ] Icons have `aria-hidden="true"`
- [ ] Reduced motion: icons don't animate
- [ ] Light mode: icons visible
- [ ] Dark mode: icons visible
- [ ] Mobile: icons don't wrap awkwardly

---

## Sample Implementation

### Before:
```tsx
<span className="specimen-page__hero-badge">Typography</span>
```

### After:
```tsx
import { TextAa } from '@phosphor-icons/react';

// ...

<span className="specimen-page__hero-badge">
  <TextAa size={16} weight="duotone" aria-hidden="true" />
  <span>Typography</span>
</span>
```

---

## Estimated Time

- **CSS Updates:** 5 minutes
- **Icon Mapping:** 10 minutes
- **Component Updates:** 25-30 minutes (37 files)
- **Testing:** 10 minutes

**Total:** 45-50 minutes

---

## Next Steps

1. ✅ Update CSS for icon support
2. ⏸️ Add icons to each page (batch process)
3. ⏸️ Verify visual appearance
4. ⏸️ Test accessibility
5. ⏸️ Mark Fix 4 as complete

---

**Status:** Ready to implement  
**Complexity:** Low  
**Impact:** High visual improvement
