# Content expansion phase 8 — orchestrator

**Created:** March 4, 2026
**Version:** 1.0.0
**Scope:** Blog expansion, podcast transcripts, event creation, portfolio polish, video expansion, FAQ overhaul, ebook enrichment
**Source brief:** `/imports/content-expansion-prompt.md`

---

## Overview

Phase 8 is the largest content expansion to date, covering 8 sub-audits across all content types. The primary goals are:

1. **Blog** — Polish existing 35 posts and expand to 50 total, backdated logically from 2019–2026
2. **Podcasts** — Polish existing 8 episodes, expand to 15 with full transcripts
3. **Events** — Add 4+ real festivals (Organik, NOG, Moov, Little Forest) plus additional historical events
4. **Portfolio** — Polish text/descriptions only (NO new entries, NO new images)
5. **Videos** — Polish existing 11 and expand with new entries
6. **FAQs** — Complete overhaul: audit existing, add per-item FAQs to every post/video/podcast/portfolio/event entry, add new page-level FAQ groups, update aggregate page
7. **Ebook** — Extend with new chapters/topics and polish unfinished sections
8. **About sub-pages** — New pages based on ebook content that doesn't have dedicated pages yet

---

## Critical rules (MUST READ)

Before executing ANY sub-audit, read and internalise:

- **[Guidelines.md](../../guidelines/Guidelines.md)** — Bundler constraints, BEM-only styling, sentence case, image protection
- **[Data System README](../../data/README.md)** — Mock data conventions and barrel export patterns
- **Sentence case** — ALL titles, headings, and labels in sentence case
- **He/him pronouns** — Ash is male
- **No Tailwind** — All styling via BEM classes in `/styles/blocks/`
- **No arrow functions, no destructuring, no optional chaining, no template literals** in `.tsx` files
- **Image protection** — NEVER replace existing `figma:asset/` imports or Unsplash images. Use `unsplash_tool` for NEW images only.
- **No hardcoded content** — All text must live in `/data/mock/` files
- **Bundler safety** — Use `var` declarations, explicit null checks, `grab()`/`arrayGet()`/`setProp()` helpers from `/lib/router.tsx`
- **Locations** — Cape Town (Woodstock), Berlin (May), Koh Phangan (Sep–Nov), international festivals
- **NOT commercial** — Personal art project, no booking/pricing/services language
- **Proper nouns** — Ash, Berlin, Cape Town, Koh Phangan, LightSpeed, Six Cats, AfricaBurn, Vortex, Origin, Solipse, WordCamp, BarCamp stay capitalised

### Content source materials

Always cross-reference these for accuracy and voice:

- `/docs/website-content.md` — Comprehensive reference doc (book concept, Six Cats, LightSpeed, identity, education, fitness, philosophy, partners, travel)
- `/data/mock/pages/ebook-pages.ts` — Full 82-page ebook content
- `/data/mock/pages/about-subpages.ts` — 21 about sub-page data
- `/data/mock/blog/posts.ts` + `/data/mock/blog/posts-timeline.ts` — Existing 35 blog posts
- `/data/mock/podcasts/episodes.ts` — Existing 8 podcast episodes
- `/data/mock/events/origin-festival.ts` — Event data structure reference
- `/data/mock/sections/faq.ts` — Existing FAQ data

---

## Sub-audits

Execute in order. Each sub-audit gets its own report in `/reports/content-expansion-phase8/`.

### Sub-audit 1: FAQ overhaul
**Prompt:** [01-faq-overhaul.md](./01-faq-overhaul.md)
**Report:** `/reports/content-expansion-phase8/01-faq-overhaul.md`

### Sub-audit 2: Blog expansion (35 → 50 posts)
**Prompt:** [02-blog-expansion.md](./02-blog-expansion.md)
**Report:** `/reports/content-expansion-phase8/02-blog-expansion.md`

### Sub-audit 3: Podcast expansion (8 → 15 episodes with transcripts)
**Prompt:** [03-podcast-expansion.md](./03-podcast-expansion.md)
**Report:** `/reports/content-expansion-phase8/03-podcast-expansion.md`

### Sub-audit 4: Event creation (1 → 5+ events)
**Prompt:** [04-event-creation.md](./04-event-creation.md)
**Report:** `/reports/content-expansion-phase8/04-event-creation.md`

### Sub-audit 5: Portfolio text polish
**Prompt:** [05-portfolio-polish.md](./05-portfolio-polish.md)
**Report:** `/reports/content-expansion-phase8/05-portfolio-polish.md`

### Sub-audit 6: Video expansion
**Prompt:** [06-video-expansion.md](./06-video-expansion.md)
**Report:** `/reports/content-expansion-phase8/06-video-expansion.md`

### Sub-audit 7: Ebook enrichment & chapter connections
**Prompt:** [07-ebook-enrichment.md](./07-ebook-enrichment.md)
**Report:** `/reports/content-expansion-phase8/07-ebook-enrichment.md`

### Sub-audit 8: New about sub-pages
**Prompt:** [08-about-subpages.md](./08-about-subpages.md)
**Report:** `/reports/content-expansion-phase8/08-about-subpages.md`

---

## Execution sequence

```
Phase 8 Execution Order
━━━━━━━━━━━━━━━━━━━━━━

1. FAQ Overhaul (Sub-audit 1)
   ├── Audit existing FAQs for accuracy/guideline violations
   ├── Add per-item FAQs to ALL existing blog posts, videos, podcasts, portfolio entries
   ├── Create FAQ groups for missing pages (stickers, ebook, events, dev-tools, gear, press)
   └── Update FaqAggregatePage categories if needed

2. Blog Expansion (Sub-audit 2)
   ├── Polish all 35 existing posts (voice, accuracy, Unsplash images)
   ├── Create 15 new posts (total: 50), backdated 2019–2026
   ├── Add per-item FAQs to each new post (2–3 per post)
   └── Update barrel exports and category/tag counts

3. Podcast Expansion (Sub-audit 3)
   ├── Polish 8 existing episodes (voice, descriptions)
   ├── Create 7 new episodes (total: 15)
   ├── Write full transcripts for ALL 15 episodes
   ├── Add per-item FAQs to each episode (2–3 per episode)
   └── Update barrel exports and category/tag counts

4. Event Creation (Sub-audit 4)
   ├── Create event data for: Organik, NOG, Moov, Little Forest
   ├── Create additional historical events (Vortex, AfricaBurn, Alien Safari, Shankra, etc.)
   ├── Add per-item FAQs to each event
   ├── Register events in barrel export
   └── Create event page FAQ group in faq.ts

5. Portfolio Polish (Sub-audit 5)
   ├── Polish descriptions and content fields for all 42 entries
   ├── Add per-item FAQs to all entries (2–3 per entry)
   ├── Fix any sentence case or voice violations
   └── DO NOT add new entries or change images

6. Video Expansion (Sub-audit 6)
   ├── Polish 11 existing videos
   ├── Create new video entries
   ├── Add per-item FAQs to all entries
   └── Update barrel exports and category/tag counts

7. Ebook Enrichment (Sub-audit 7)
   ├── Polish unfinished/rough chapters
   ├── Add new chapters: Ambidextrous painting, Festival kit, AI workflow, Grading system
   ├── Strengthen cross-chapter narrative connections
   └── Update page numbers and TOC

8. About Sub-pages (Sub-audit 8)
   ├── Create new data files for: Ambidextrous Technique, Festival Kit, AI Workflow, Grading System
   ├── Assess ADHD page completeness
   ├── Consider individual cat profile pages
   └── Register routes and update navigation data
```

---

## Deliverables

After all 8 sub-audits are complete:

1. **Reports** — One report per sub-audit in `/reports/content-expansion-phase8/`
2. **Task list** — `/tasks/content-expansion-phase8-tasks.md`
3. **Master task list** — Update `/tasks/master-task-list.md` with new entry
4. **General task list** — Add Phase 8 summary to `/tasks/task-list.md`
5. **CHANGELOG** — Update `/CHANGELOG.md` with [8.3.0] release (or appropriate version)
6. **Data README** — Update `/data/README.md` with new counts if significant

---

## Content targets (summary)

| Content type | Current | Target | Action |
|---|---|---|---|
| Blog posts | 35 | 50 | Polish existing + 15 new |
| Podcasts | 8 | 15 | Polish existing + 7 new + ALL transcripts |
| Events | 1 | 5+ | 4 confirmed + historical events |
| Portfolio | 42 | 42 | Text polish only (no new entries) |
| Videos | 11 | 15+ | Polish existing + new entries |
| Stickers | 40 | 40 | No changes |
| FAQ page groups | 7 | 10+ | Add stickers, ebook, events, gear, press |
| Per-item FAQs | ~partial | ALL items | Every post/video/podcast/portfolio/event gets 2–3 FAQs |
| Ebook chapters | 20 | 24+ | 4+ new chapters |
| About sub-pages | 21 | 25+ | 4+ new pages |
