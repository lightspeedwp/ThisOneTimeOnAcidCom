# Timeline expansion — report

**Date:** March 6, 2026
**Sub-audit:** Feature Work Sub-audit 1
**Prompt:** [/prompts/feature-work/01-timeline-expansion.md](../../prompts/feature-work/01-timeline-expansion.md)

---

## Summary

Successfully implemented the comprehensive timeline expansion across the entire About section. Created a centralised timeline dataset with 55+ categorised milestones spanning 1981–2026, enhanced the Timeline component with per-event colours, clickable links, and significance levels, and distributed contextual timelines across 10 about sub-pages.

---

## Deliverables

### 1. Centralised timeline data (`/data/mock/timeline/index.ts`)
- **55 milestones** spanning 1981–2026
- **12 categories:** makeup, cycling, fitness, music, travel, lightspeed, education, sixcats, berlin, adhd, personal, book
- **3 significance levels:** major (life-defining), standard (notable), minor (supporting)
- **Helper functions:** `getTimelineByCategory()`, `getAllTimeline()`, `getTimelineByDateRange()`, `getTimelineCategory()`, `toTimelineEvents()`
- **Bundler-safe:** All classic `for` loops, `var` declarations, no arrow functions

### 2. Enhanced Timeline component (`/components/ui/Timeline.tsx`)
- **v2.0.0** — Per-event colour overrides via `colorAccent` prop on events
- Clickable titles via `href` prop (renders `<a>` with hover colour matching timeline accent)
- Significance-based visual weight: major (larger dots, bolder title), minor (smaller dots, lighter text)
- Full backward compatibility — existing Timeline usage unchanged

### 3. Interactive History page (`/components/pages/about/HistoryPage.tsx`)
- **v3.0.0** — Complete rewrite as interactive timeline hub
- **Category filter chips** — Click to filter by any of 12 categories (with count badges)
- **"All" view** — Default shows all 55 milestones chronologically, colour-coded
- **Dynamic line accent** — Timeline line colour changes to match selected category
- **Milestone count** — Shows "Showing N milestones" with active filter name
- **Category legend** — Visual colour legend at the bottom showing all 12 categories
- **Sentence case** throughout

### 4. Contextual timelines on 10 about sub-pages

| Page | Category | Accent | Milestones |
|---|---|---|---|
| CyclingPage | `cycling` | Green | ~15 |
| FitnessPage | `fitness` | Cyan | ~6 |
| LightSpeedPage | `lightspeed` | Blue | ~13 |
| BerlinPage | `berlin` | Pink | ~4 |
| SixCatsPage | `sixcats` | Green | ~7 |
| MusicPage | `music` | Purple | ~10 |
| TravelsPage | `travel` | Orange | ~8 |
| EducationPage | `education` | Yellow | ~7 |
| AdhdPage | `adhd` | Cyan | ~2 |
| ProcessPage | `makeup` | Pink | ~6 |

### 5. CSS enhancements

**`/styles/tokens/content-interactive.css`:**
- Per-event dot colour override classes (`.timeline__dot--pink` through `--cyan`)
- Significance styling (major/minor dot sizes + typography weight)
- Clickable title link styles with per-accent hover colours
- `prefers-reduced-motion` support for link transitions

**`/styles/blocks/history-page.css`:**
- Category filter chip styles with per-category active colours via `data-category` attribute
- Category legend layout (flex-wrap, dot + label pairs)
- Milestone count display
- Reduced motion safety for filter chip transitions

### 6. Content-type colour legend documentation
- Created `/guidelines/content-type-colours.md` — comprehensive guide to the 8-colour content type mapping system

---

## Content accuracy

All milestones cross-referenced against `/docs/website-content.md` and existing ebook/blog content. Key facts verified:
- WP MTB champion 1998 (matric year, 17 years old)
- BarCamp Cape Town 2006 (WordPress pivot)
- First UV paint July 2019 (Berlin)
- Solipse 2001 (86-hour bus to Zambia)
- LightSpeed founded 2003
- Six Cats founded May 2019

---

## Issues

None. All files compile and render correctly.
