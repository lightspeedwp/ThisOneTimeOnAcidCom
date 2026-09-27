# `thisonetimeonacid.com` — E-Book Development Plan
**As of 27 September 2026**

---

## What Has Been Built

### Architecture
The e-reader is a fully custom React SPA built on a Vite/TypeScript stack. The key files are:

| File | Purpose |
|---|---|
| `src/app/utils/bookContentLoader.ts` (417 lines) | Vite glob loader — reads all `*.md` files at build time, parses YAML frontmatter, splits body on `---` page breaks, assembles the final `BookPage[]` array, and auto-splits overflowing pages at load time |
| `src/app/components/pages/about/EbookPage.tsx` (871 lines) | Unified reader — single-page swipe mode (mobile), two-page spread mode (desktop 1024px+), touch gestures, keyboard nav, 3D-flip/fade/slide paging effects, fullscreen mode, minimal mode |
| `src/app/components/pages/about/ebook/ebookHelpers.ts` | Constants, `buildChapterIndex()`, `buildDrawerGroups()`, `buildSpreads()`, `useSpreadMode()` hook |
| `src/app/components/pages/about/ebook/EbookPageContent.tsx` | Renders all 14 page types: cover, inside-front, title, dedication, epigraph, toc, foreword, part-title, chapter-start, chapter-content, appendix-title, afterword, about-author, back-cover |
| `src/app/data/mock/pages/ebook-pages.ts` | Barrel — re-exports `BookPage`, `BookPageType`, and `bookPages` |
| `src/styles/blocks/ebook-*.css` (7 files) | All reader styles — shell, navigation, page types, drawer, responsive breakpoints, dark mode contrast |

### Content Structure
36 Markdown files in `src/content/book/`, organised into 6 folders with numbered prefixes for sort order:

```
00-front-matter/        cover, inside-front, title-page, dedication, epigraph, foreword
01-part-1-early-life/   00-part.md + ch1–4
02-part-2-carefree-20s/ 00-part.md + ch5–9
03-part-3-nomadic-life/ 00-part.md + ch10–14
04-part-4-re-emergence/ 00-part.md + ch15–20
05-back-matter/         afterword, appendix-divider, appendix-a, appendix-b-tribes, about-author, back-cover
```

Each markdown file uses YAML frontmatter to declare its type, chapter/part numbers, and page numbers. Paragraphs within a chapter body are separated by blank lines. Page breaks use `---` on its own line between paragraphs. The loader auto-paginates any page with more paragraphs than the viewport-responsive limit (3 on compact mobile, 4 on standard mobile, 6 on tablet/desktop).

### Bugs Fixed
- Dark mode: `body:not(.dark)` → `:root:not(.dark)` in `ebook-enhanced-contrast.css` (39 instances)
- Breadcrumb gap: removed over-compensating `padding-top` from `.ebook-reader__hero`
- esbuild rejected em-dash characters (`—`) in TypeScript comments and string literals — replaced with `—` escapes or plain hyphens
- `about-author` title case mismatch (`About the author` vs `About the Author`) — fixed in frontmatter
- Appendices missing from auto-generated TOC — `buildTocPages()` now accepts back-matter entries
- Part TOC titles lost subtitle — now format as `Part one — Early life (Pre-Y2K)`
- `*/` inside JSDoc comment pattern `01-part-1-*/` prematurely closed block comment — changed to `[n]`
- Vertical overflow in reader — `overflow-y: auto` → `overflow: hidden` + `splitLargePages()` post-processor
- Legacy ThemeSwitcher (site footer) visible in reading mode — hidden via `body.ebook-reading .footer { display: none }`
- 24 unreferenced template CSS files deleted; orphaned `ThemeToggle` and `Switch` barrel exports removed

---

## Immediate Next Steps

### 1. Write the actual chapter content
**Priority: critical. Everything else is scaffolding.**

Each chapter file currently has either placeholder AI text or is empty. Open each file in `src/content/book/` and write the real prose. The workflow:

1. Edit the markdown file directly (locally or via GitHub web editor)
2. Commit to the repo
3. The Vite dev server hot-reloads and the reader updates instantly

**Rules for content authors:**
- Separate paragraphs with a single blank line
- Start a new reader page with `---` on its own line between paragraphs (aim for 3–5 paragraphs per page on mobile, 5–6 on desktop — the auto-splitter will catch anything longer)
- Do not add HTML, markdown headings (`#`), or any formatting beyond standard paragraphs — the CSS handles all typographic styling based on `page.type`
- The `subtitle` frontmatter field in chapter files renders as an italic epigraph under the chapter title — use it for a one-line teaser or thematic phrase, not a description

**Files with real content:**
- `05-back-matter/04-appendix-b-tribes.md` — fully written, 7 tribe sections

**Files that are empty or have placeholder content:**
- All 20 chapter files in `01-` through `04-`
- `00-front-matter/06-foreword.md` — body is empty
- `05-back-matter/01-afterword.md` — body is empty
- `05-back-matter/03-appendix-a.md` — single paragraph placeholder

### 2. Verify pagination on real devices

After writing content, open the reader on a phone and a tablet and check:

- Pages fit the screen with no clipping at the bottom
- Paragraph count per page feels right (not too sparse, not clipped)
- If pages are too short on desktop: increase the `6` in `maxParasForViewport()` in `bookContentLoader.ts` (~line 405)
- If pages are too long on mobile: decrease the `3` (compact mobile) or `4` (standard mobile)

```typescript
// src/app/utils/bookContentLoader.ts — tune these three numbers
function maxParasForViewport(): number {
  if (typeof window === 'undefined') return 5;
  var w = window.innerWidth;
  if (w < 480) return 3;   // compact mobile: ~390px phones
  if (w < 768) return 4;   // standard mobile: ~430px iPhones
  return 6;                 // tablet + desktop
}
```

### 3. Fix page number drift

The `startPage` and `pageNumber` values in frontmatter are currently hand-authored estimates. Once real content is written, actual page counts will shift. Two options:

**Option A (recommended): Remove hardcoded page numbers entirely.** Change `bookContentLoader.ts` to compute page numbers dynamically from array position. Delete `startPage` and `pageNumber` from all frontmatter files. Page numbers in the TOC and chapter index will always be accurate regardless of content length.

Implementation — add a post-assembly pass at the end of `loadBookPages()` in `bookContentLoader.ts`:

```typescript
var assembled = ([] as BookPage[])
  .concat(preForeword)
  .concat(tocPages)
  .concat(forewordPages)
  .concat(contentPages)
  .concat(backMatterPages);

// Assign sequential page numbers; keep any already set in frontmatter
for (var n = 0; n < assembled.length; n++) {
  if (assembled[n].pageNumber == null) {
    assembled[n] = { ...assembled[n], pageNumber: n + 1 };
  }
}
return assembled;
```

**Option B (keep manual):** After writing each chapter, update `startPage` in that chapter's frontmatter to match the actual reader page index. More work but keeps page numbers stable between edits.

---

## Short-Term Improvements

### 4. Orientation change re-pagination

`maxParasForViewport()` runs once at module load. If a user rotates their phone, the viewport changes but `bookPages` is not re-split. The current reading position could become invalid.

Fix — add a resize listener in `EbookPage.tsx` that reloads when the mobile/desktop breakpoint is crossed:

```typescript
useEffect(function() {
  var lastWidth = window.innerWidth;
  function onResize() {
    var crossed = (lastWidth < 768 && window.innerWidth >= 768) ||
                  (lastWidth >= 768 && window.innerWidth < 768);
    if (crossed) { window.location.reload(); }
    lastWidth = window.innerWidth;
  }
  window.addEventListener('resize', onResize);
  return function() { window.removeEventListener('resize', onResize); };
}, []);
```

### 5. Spread mode mouse-wheel page turning

`overflow: hidden` was applied to `.ebook-reader__page-inner` to remove vertical scrollbars. The existing `handleBookWheel` handler in `EbookPage.tsx` tried to scroll within the page-inner — it now does nothing.

Replace `handleBookWheel` with a simple page-turner:

```typescript
const handleBookWheel = useCallback(function(e: React.WheelEvent) {
  if (e.deltaY > 0) { goForward(); }
  else if (e.deltaY < 0) { goBackward(); }
}, [goForward, goBackward]);
```

Remove the complex spread-midpoint routing logic. Desktop users get mouse-wheel page turning instead of within-page scrolling.

### 6. Deep-link to chapter from marketing page

The book marketing page (`/book`) and reader (`/ebook`) are separate routes. Add a `Start Reading` link on the marketing page that deep-links to a specific chapter, e.g. `/ebook?chapter=1`. In `EbookPage.tsx`, read the query parameter on mount and call `jumpToPage()`:

```typescript
useEffect(function() {
  var params = new URLSearchParams(window.location.search);
  var chapterParam = params.get('chapter');
  if (chapterParam) {
    var chapterNum = parseInt(chapterParam, 10);
    var targetPage = bookPages.findIndex(function(p) {
      return p.type === 'chapter-start' && p.chapter === chapterNum;
    });
    if (targetPage >= 0) { jumpToPage(targetPage); }
  }
}, []); // eslint-disable-line react-hooks/exhaustive-deps
```

---

## Medium-Term (Pre-Launch)

### 7. Font choice review

The reader uses `var(--wp--preset--font-family--brand-body)` and `--brand-heading` CSS variables. Confirm these suit long-form reading — ideally a high-x-height serif for body text and a contrasting display face for chapter titles. The memoir's neon/underground aesthetic could support **Lora** or **Georgia** for body and **Space Grotesk** or **DM Sans** for headings.

### 8. Reading progress persistence across sessions

The reader already saves `currentPage` to `localStorage` via `ebookPreferences.ts`. Verify this survives browser sessions. Consider adding a URL-hash fallback (`/ebook#page-42`) for sharing reading position.

### 9. Foreword and afterword content

`06-foreword.md` and `01-afterword.md` currently have empty bodies. These are structurally important framing pieces. Write them early — the foreword sets tone and explains the book's unusual structure; the afterword closes the emotional arc.

---

## Content Editing GitHub Workflow

The intended workflow for ongoing content editing:

1. **Open** the repo on GitHub web, Cursor, or VS Code
2. **Navigate** to `src/content/book/` and open the relevant chapter file
3. **Edit** the markdown — paragraphs separated by blank lines, `---` for page breaks
4. **Commit** with a message like `content: ch3 first draft` or `fix: page break in ch7`
5. The Vite dev server picks up the change instantly (hot module reload via `import.meta.glob`)
6. For production: `pnpm run build` — the loader bakes all markdown at build time, no server-side rendering required

**Adding a new chapter** — create a file in the correct part folder with the next sequential prefix:

```
01-part-1-early-life/05-new-chapter.md
```

Use this frontmatter template:

```yaml
---
type: chapter
chapter: 21
part: 1
startPage: 0
title: "Chapter title"
subtitle: "One-line teaser displayed under the chapter number"
---

First paragraph of chapter body.

Second paragraph.

---

First paragraph of page two.
```

No code changes required — the loader picks it up automatically on next dev server start or build.

---

## File Reference

```
src/
  content/book/                    ← edit these to change the book
    00-front-matter/
    01-part-1-early-life/
    02-part-2-carefree-20s/
    03-part-3-nomadic-life/
    04-part-4-re-emergence/
    05-back-matter/
  app/utils/bookContentLoader.ts   ← tune maxParasForViewport() here
  app/components/pages/about/
    EbookPage.tsx                  ← reader shell, navigation, gestures
    ebook/
      EbookPageContent.tsx         ← page type renderers (14 types)
      ebookHelpers.ts              ← chapter index, spreads, hooks
      EbookReaderNav.tsx           ← bottom nav bar
      EbookDrawer.tsx              ← chapter jump drawer
  styles/blocks/ebook-*.css        ← all reader styles
```
