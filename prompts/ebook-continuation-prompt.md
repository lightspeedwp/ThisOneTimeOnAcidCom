# Continuation Prompt — E-Book Development
**Paste this into a new session to resume work on `thisonetimeonacid.com`**

---

You are continuing development on an e-book reader web application for `thisonetimeonacid.com` — a memoir by Ash Shaw about psytrance, UV makeup art, cycling, nomadic life, and building a creative business. The project is a React/Vite/TypeScript SPA.

Read the full development plan before doing anything else:

```
/workspaces/default/code/plan/ebook-development-plan.md
```

Then read these four core files to understand the current system:

```
/workspaces/default/code/src/app/utils/bookContentLoader.ts
/workspaces/default/code/src/app/components/pages/about/ebook/ebookHelpers.ts
/workspaces/default/code/src/app/components/pages/about/ebook/EbookPageContent.tsx
/workspaces/default/code/src/app/data/mock/pages/ebook-pages.ts
```

Then survey the content files:

```
/workspaces/default/code/src/content/book/
```

---

## Your mission

Work through the plan in this exact order. Complete each step fully and verify it before moving to the next. Do not skip ahead.

### Step 1 — Fix page number drift (Option A from the plan)

In `bookContentLoader.ts`, remove reliance on hardcoded `pageNumber` and `startPage` frontmatter values. Add a post-assembly pass that assigns sequential page numbers dynamically from array position. Pages that already have a frontmatter `pageNumber` keep their value; all others get their index + 1.

After implementing: run `pnpm exec tsc --noEmit` and confirm zero errors. Check that the TOC page numbers still match actual chapter positions in the reader.

### Step 2 — Fix spread mode mouse-wheel page turning

In `EbookPage.tsx`, find the `handleBookWheel` function. Replace its current logic (which tried to scroll within the page-inner div — broken since overflow was changed to hidden) with a simple page turner: `deltaY > 0` calls `goForward()`, `deltaY < 0` calls `goBackward()`. Remove the spread-midpoint cursor-position logic.

After implementing: confirm TypeScript still compiles clean.

### Step 3 — Fix orientation change re-pagination

In `EbookPage.tsx`, add a `resize` event listener that reloads the page when the viewport crosses the 768px mobile/desktop breakpoint in either direction. This ensures `maxParasForViewport()` re-runs with the correct width after a phone rotation. The reload should only fire when the breakpoint is actually crossed, not on every resize.

### Step 4 — Add chapter deep-link support

In `EbookPage.tsx`, read a `?chapter=N` query parameter on mount. If present, call `jumpToPage()` to the first `chapter-start` page whose `chapter` field matches N. This allows the marketing page at `/book` to link directly into a chapter in the reader at `/ebook?chapter=1`.

### Step 5 — Write the foreword

Open `src/content/book/00-front-matter/06-foreword.md`. The body is currently empty. Write a foreword for the book that:
- Explains this is a memoir structured around stories from the psytrance dancefloor
- Sets the tone: honest, funny, a little chaotic, deeply personal
- Tells the reader how to read it — these are not chronological lessons, they are lived experiences that accumulated into understanding
- Is written in Ash's voice: direct, irreverent, self-aware
- Runs 3–5 paragraphs, split with `---` after paragraph 2 or 3 for a natural page break

### Step 6 — Write the afterword

Open `src/content/book/05-back-matter/01-afterword.md`. Body is currently empty. Write an afterword that:
- Reflects on what writing the book revealed
- Acknowledges the people, places, and experiences that shaped the story
- Closes with something about the ongoing nature of the life — this book ends but the story doesn't
- Same voice and length guidelines as the foreword

### Step 7 — Write chapter 1 content

Open `src/content/book/01-part-1-early-life/01-snails.md`. This chapter is titled "Snails in the garden" with subtitle "An only child in a small Afrikaans town, building worlds nobody asked for."

Write 3–4 pages of memoir content. Each page: 3–5 paragraphs separated by blank lines, pages separated by `---`. The content should:
- Open in Paarl, Western Cape, late 1980s — small Afrikaans town, suburban garden
- Establish Ash as a hyperactive, imaginative only child who invented his own entertainment
- Snails are a specific recurring memory — collecting them, naming them, building worlds for them
- Plant the seeds of the traits that define him: obsessive focus, sensory richness, doing things nobody else does
- End with the first hint that Ash is wired differently from the other kids

After writing: open the reader in the browser and verify chapter 1 renders correctly across multiple pages with no overflow.

### Step 8 — Report back

Once all seven steps are complete, provide:
1. A list of every file changed and what changed in each
2. Confirmation that `pnpm exec tsc --noEmit` returns zero errors
3. Any issues encountered and how they were resolved
4. What the logical next step is (which chapter to write next, or which technical improvement to tackle)

---

## Key constraints

- All TypeScript in this project uses `var` (not `const`/`let`) and function expressions (not arrow functions) — match this style in any new code you write
- Do not use literal em-dash characters (`—`) in TypeScript/JavaScript source files — use the `—` escape in strings, or a plain hyphen `-` in comments
- Markdown content files can use any Unicode characters freely
- The `bookPages` array is assembled once at module load from `import.meta.glob` — it is not reactive; changes to content files require a page reload or dev server hot-module replacement to take effect
- Run `pnpm exec tsc --noEmit` after every code change to catch errors early
