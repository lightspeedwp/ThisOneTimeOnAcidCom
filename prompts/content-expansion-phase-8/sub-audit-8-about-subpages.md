# Sub-audit 8: About Sub-pages Polish

**Parent:** Content Expansion Phase 8
**Phase:** Content Expansion Phase 8 (8–12 hours)
**Sub-audit:** 8 of 8 (FINAL)
**Estimated Time:** 2 hours

## Context

The Ash Shaw Portfolio has 21 hidden About sub-pages accessible from the
`/about` landing page. These pages provide deep dives into different facets of
Ash's life, work, and philosophy:

1. **/about/journey** — The journey (from corporate creative to neon artist)

1. **/about/bio** — Bio (South African soul, Berlin address, festival heart)

1. **/about/berlin** — Berlin (where the underground became his studio)

1. **/about/process** — Creative process (from blank canvas to blacklight masterpiece)

1. **/about/book** — The book (memoir in progress)

1. **/about/lucy-in-the-sky-with-diamonds** — Lucy in the sky (psychedelic lens)

1. **/about/history** — History (every glow-up has an origin story)

1. **/about/travels** — Travels (chasing sunsets and psytrance across continents)

1. **/about/podcast** — Podcast (raw conversations from the neon underground)

1. **/about/ebook** — eBook preview (read the first chapters)

1. **/about/adhd** — ADHD — Wired different (not a deficit, a surplus of attention)

1. **/about/cycling** — Cycling (two wheels, UV paint, and the open road)

1. **/about/aquarius** — Aquarius — The Aquarian blueprint (cosmic wiring)

1. **/about/music** — Music — 140 BPM heartbeat (when the bass drops, the brushes rise)

1. **/about/lightspeed** — LightSpeed — The day job (WordPress by day, neon by night)

1. **/about/education** — Education — The unconventional classroom (life taught more)

1. **/about/partners** — Partners — The people along the way (no artist creates alone)

1. **/about/fitness** — Fitness — The moving body (movement is the first act of creation)

1. **/about/manifesto** — Manifesto (Neon vs Atomic Black — the philosophy)

1. **/about/six-cats** — Six Cats club (craft cannabis, consciously cultivated)

1. **/about/tribes** — The tribes (communities that shaped a neon soul)

These pages are currently at **GOOD QUALITY** but need final production polish
to match the depth achieved in the ebook (Sub-audit 7).

## Objective

Polish all 21 About sub-pages to production-ready status by:

1. Ensuring consistency with ebook content (cross-referencing Part 4 "Re-emergence" chapters)

1. Adding personal anecdotes and specific examples where generic

1. Deepening narrative voice (raw, honest, conversational)

1. Verifying sentence case compliance across all page content

1. Ensuring 2026 currency (dates, team counts, achievements)

1. Enhancing storytelling arcs within each page

1. Removing any corporate polish or generic phrasing

## Scope

### Files to Audit

```text
/data/mock/pages/about/
├── types.ts              # Shared AboutSubpageData interface
├── bio.ts                # Bio page with quick facts
├── berlin.ts             # Berlin discovery + club culture
├── process.ts            # Creative process philosophy
├── book.ts               # Book/memoir in progress
├── lucy.ts               # Psychedelic experiences philosophy
├── travels.ts            # Nomadic circuit + seasonal migration
├── podcast.ts            # Podcast concept + episodes
├── ebook.ts              # eBook preview page
├── adhd.ts               # ADHD brain wiring + creative advantages
├── cycling.ts            # Cycling history + touring adventures
├── aquarius.ts           # Aquarian traits + cosmic wiring
├── music.ts              # Music taste evolution + dancefloor as church
├── lightspeed.ts         # LightSpeed agency history + team
├── education.ts          # Unconventional education journey
├── partners.ts           # Key relationships + collaboration
├── fitness.ts            # Endurance sports + training philosophy
└── (17 files total, plus types.ts)

```text

**Note:** The following pages are NOT in the `/data/mock/pages/about/` directory
and likely use different data sources:

- `/about/journey` — check `/data/mock/pages/about.ts` or component-level data
- `/about/history` — check `/components/pages/about/HistoryPage.tsx` (uses timeline data)
- `/about/manifesto` — check `/data/mock/pages/manifesto.ts`
- `/about/six-cats` — check `/data/mock/pages/six-cats.ts`
- `/about/tribes` — may use ebook appendix B data or separate file

**Total files to audit:** ~21 data sources across multiple locations

### Cross-Reference Sources

1. **Ebook Part 4:** `/data/mock/pages/ebook/part-4.ts` (Ch15-20: The artist's lifestyle, Dance like no one's watching, One million steps, Freedom as operating principle, Twenty-three years, The cumulative effect)

1. **Ebook Part 3:** `/data/mock/pages/ebook/part-3.ts` (Ch10: Six Cats, Ch11: Berlin calling, Ch13: Neon revelations)

1. **Ebook Part 2:** `/data/mock/pages/ebook/part-2.ts` (Ch8: LSD/LightSpeed, Ch9: Island time/Thailand)

1. **Ebook Appendix B:** `/data/mock/pages/ebook/back-matter.ts` (The tribes — 7 tribes documented)

### What to Preserve

- ✅ All existing structure (hero badges, breadcrumbs, sections)
- ✅ Quick facts data format (bio.ts, lightspeed.ts stats)
- ✅ TypeScript types (AboutSubpageData interface)
- ✅ Authentic voice (raw, honest, conversational)
- ✅ Sentence case throughout

### What to Enhance

1. **Consistency with Ebook:** Ensure About sub-pages don't contradict ebook content

1. **Specificity:** Replace generic statements with specific examples, dates, locations

1. **Personal Anecdotes:** Add more "I" voice and first-person storytelling

1. **2026 Currency:** Update team counts, recent achievements, current status

1. **Narrative Depth:** Expand thin sections with sensory detail and emotional resonance

1. **Philosophical Synthesis:** Deepen insights, especially in ADHD, Aquarius, Music, Process pages

## Quality Standards

### Voice & Tone Requirements

- **Raw & Honest:** No corporate polish, no self-help clichés
- **Conversational:** Reads like Ash talking over coffee
- **Introspective:** Reflective without being preachy
- **Specific:** Concrete details ground abstract insights

### Sentence Case Rule

ALL headings, titles, section titles, and page content MUST use sentence case:

- ✅ "The journey"
- ❌ "The Journey"
- ✅ "Wired different"
- ❌ "Wired Different"

Proper nouns remain capitalized: Berlin, Cape Town, Lucy, LightSpeed, ADHD,
Aquarius.

### Content Depth Targets

- **Hero descriptions:** 60-100 words (vivid, specific, emotionally resonant)
- **Section paragraphs:** 80-120 words each (sensory detail, personal anecdotes)
- **Total page word count:** 600-1,200 words (varies by page complexity)

### Technical Constraints

- **Bundler Safety:** No optional chaining (`?.`), no nullish coalescing (`??`)
- **Unicode Escapes:** Use `\u2019` for apostrophes, `\u2014` for em-dash, `\u202F` for narrow space
- **TypeScript:** All data must match `AboutSubpageData` interface structure

## Audit Steps

### Step 1: Inventory & Locate All Data Sources (15 min)

**Task:** Identify the exact data file for each of the 21 about sub-pages.

**Known locations:**

- `/data/mock/pages/about/*.ts` (17 files verified)
- `/data/mock/pages/about.ts` (journey page?)
- `/data/mock/pages/manifesto.ts` (manifesto page)
- `/data/mock/pages/six-cats.ts` (six-cats page)
- `/data/mock/pages/history.ts` (history page?)
- Check components for inline data (HistoryPage.tsx, TribesPage.tsx?)

**Output:** Complete file mapping for all 21 pages

---

### Step 2: Cross-Reference with Ebook Content (20 min)

**Task:** For each About sub-page, identify related ebook chapters and verify
consistency.

## Key cross-references

| About Page | Ebook Chapter(s) | Consistency Check |
|---|---|---|
| `/about/bio` | Part 4 Ch15 (Artist's lifestyle), Back matter (About the author) | Annual migration pattern, pronouns, locations |
| `/about/berlin` | Part 3 Ch11 (Berlin calling) | 2019 discovery date, club culture, freedom theme |
| `/about/cycling` | Part 1 Ch3 (Half colours), Part 2 Ch9 (Island time), Part 3 Ch12 (Loaded bike) | Provincial championship, Thailand 7000km, touring kit |
| `/about/lightspeed` | Part 2 Ch8 (LSD), Part 4 Ch19 (Twenty-three years) | Founding 2003, BarCamp 2006, team count 13 |
| `/about/fitness` | Part 2 Ch9 (Island time), Part 4 Ch17 (One million steps) | Muay Thai 2019, triathlon, Berlin 1M steps |
| `/about/music` | Part 2 Ch7 (The dancefloor gave me everything) | Psytrance roots, house/techno evolution |
| `/about/adhd` | Part 1 Ch2 (Wired different), Part 2 Ch7 (ADHD brain on dancefloor) | Diagnosis at 40, sensory richness, dancefloor as medicine |
| `/about/process` | Part 3 Ch13 (Neon revelations) | July 2019 first paint, ambidextrous discovery, no pre-planning |
| `/about/lucy` | Part 1 Ch4 (The first drop), Part 2 Ch5 (Solipse) | First Vortex 1999, solar eclipse 2001, integration philosophy |
| `/about/travels` | Part 2 Ch5 (Eighty-six hours), Part 4 Ch15 (Artist's lifestyle) | 4-leg seasonal cycle (Cape Town → Berlin → Koh Phangan → Cape Town) |
| `/about/six-cats` | Part 3 Ch10 (Six Cats: the green garden) | Founded May 2019, 6 living cats, 8 values, organic cultivation |
| `/about/partners` | Part 2 Ch7 (Dancefloor gave me everything), Part 4 Ch19 (Twenty-three years) | Barbara relationship, LightSpeed team |
| `/about/tribes` | Ebook Appendix B (The tribes) | 7 tribes: psytrance, Berlin, cycling, WordPress, Muay Thai, LightSpeed, Cape Town creative |
| `/about/manifesto` | Part 4 Ch20 (The cumulative effect) | Core beliefs, neon vs atomic black philosophy |

**Output:** List of consistency issues to fix

---

### Step 3: Polish High-Priority Pages (30 min)

**High-priority pages** (these are most critical to the portfolio's narrative):

1. **bio.ts** — The central identity page

1. **process.ts** — The creative process philosophy (core to understanding the art)

1. **berlin.ts** — The city that changed everything

1. **lightspeed.ts** — The business that funds the art

1. **adhd.ts** — The neurodivergent lens that explains the whole journey

**Focus areas:**

- Ensure 2026 currency (dates, team counts, recent achievements)
- Add specific anecdotes from ebook where generic
- Deepen philosophical synthesis (especially ADHD, process)
- Verify sentence case compliance

---

### Step 4: Polish Medium-Priority Pages (30 min)

**Medium-priority pages** (important context but less central):

1. **cycling.ts** — The physical discipline thread

1. **music.ts** — The sonic landscape

1. **fitness.ts** — Endurance sports philosophy

1. **travels.ts** — The nomadic circuit

1. **lucy.ts** — The psychedelic lens

1. **aquarius.ts** — The cosmic wiring

1. **partners.ts** — Key relationships

**Focus areas:**

- Cross-reference with ebook for specific achievements/dates
- Add sensory detail to thin sections
- Ensure narrative voice is first-person authentic

---

### Step 5: Polish Remaining Pages (20 min)

**Remaining pages** (specialized topics, likely already complete):

1. **book.ts** — Memoir in progress

1. **podcast.ts** — Podcast concept

1. **ebook.ts** — eBook preview page

1. **education.ts** — Unconventional learning

1. **six-cats.ts** — Cannabis club (if separate from ebook Ch10)

1. **manifesto.ts** — Neon vs Atomic Black philosophy

1. **history.ts** — Timeline/origin story (if separate page)

1. **journey.ts** — The transformation arc (if separate from about.ts)

1. **tribes.ts** — Communities (if separate from ebook Appendix B)

**Focus areas:**

- Quick review for consistency
- Update any stale dates or achievements
- Verify sentence case

---

### Step 6: Final Consistency Pass (15 min)

## Cross-file verification

1. **Pronouns:** He/him throughout (never they/them or she/her)

1. **Locations:** Cape Town (Woodstock), Berlin, Koh Phangan

1. **Dates:** Painting since July 2019, LightSpeed since 2003, BarCamp 2006

1. **Team count:** LightSpeed = 13 people (2026)

1. **Annual cycle:** Cape Town (Nov-Mar) → Berlin (May-Aug) → Koh Phangan (Sep-Nov) → Cape Town

1. **Sentence case:** All page titles, section titles, hero badges

1. **Unicode:** Apostrophes `\u2019`, em-dash `\u2014`, narrow space `\u202F`

---

## Deliverables

1. **Polished data files:**

   - All files in `/data/mock/pages/about/*.ts` reviewed and polished
   - Any files in `/data/mock/pages/` (about.ts, manifesto.ts, six-cats.ts, history.ts) reviewed
   - Component-level data (if any) reviewed

1. **Audit report:**

   - `/reports/content-expansion-phase-8/sub-audit-8-about-subpages.md`
   - Summary of changes per page
   - Consistency verification results
   - Production readiness assessment

1. **Task list update:**

   - Mark Sub-audit 8 complete in `/tasks/task-list.md`
   - Mark Content Expansion Phase 8 complete (8/8 sub-audits done)

---

## Success Criteria

- [ ] All 21 About sub-pages located and reviewed
- [ ] All pages cross-referenced with ebook content for consistency
- [ ] 2026 currency verified (dates, team counts, achievements)
- [ ] Sentence case verified across all page content
- [ ] Personal anecdotes added where generic
- [ ] Narrative voice deepened (raw, honest, conversational)
- [ ] Philosophical synthesis enhanced (ADHD, Aquarius, Process, Music)
- [ ] All unicode escapes correct (`\u2019`, `\u2014`, `\u202F`)
- [ ] No bundler violations introduced (no `?.`, no `??`)
- [ ] Production readiness: READY FOR PUBLICATION

---

## Output Format

Save all findings to:

```text
/reports/content-expansion-phase-8/sub-audit-8-about-subpages.md

```text

Report structure:

```markdown

# Sub-audit 8: About Sub-pages Polish — Report

## Executive Summary

- Total pages reviewed: 21
- Files modified: [X]
- Consistency issues found: [Y]
- Production readiness: [READY/NEEDS REVIEW]

## Page-by-Page Summary

### High-Priority Pages

#### bio.ts

- [Changes made]
- [Ebook cross-references verified]
- [Quality assessment]

[... continue for all 21 pages ...]

## Consistency Verification

- [✅/❌] Pronouns: He/him throughout
- [✅/❌] Locations accurate
- [✅/❌] Dates consistent with ebook
- [✅/❌] Team counts current (2026)
- [✅/❌] Sentence case compliance
- [✅/❌] Unicode escapes correct

## Production Readiness Assessment

- [READY/NEEDS REVIEW] with justification

## Recommendations

- [Any follow-up suggestions]

```text

---

## Next Steps After Completion

1. Review report findings

1. Update task list (mark Sub-audit 8 complete)

1. Mark Content Expansion Phase 8 COMPLETE (8/8 sub-audits done)

1. Celebrate 🎉 — This is the final sub-audit!

---

**Estimated Completion Time:** 2 hours
**Report Location:**
`/reports/content-expansion-phase-8/sub-audit-8-about-subpages.md`
