# Sub-audit 7: Ebook enrichment & chapter connections

**Parent:** [orchestrator.md](./orchestrator.md)
**Report:** `/reports/content-expansion-phase8/07-ebook-enrichment.md`

---

## Objective

Extend the ebook with new chapters based on topics that don't have dedicated coverage yet. Polish existing unfinished/rough chapters to match the quality of the best chapters. Strengthen cross-chapter narrative connections so the book reads as a cohesive story, not disconnected essays.

---

## Current state

**File:** `/data/mock/pages/ebook-pages.ts`
- 82 pages across 20 chapters + 2 appendices
- Part 1: The foundations (chapters 1–5)
- Part 2: The art (chapters 6–10)
- Part 3: The life (chapters 11–15)
- Part 4: The future (chapters 16–20)
- Appendix A: The stock phrases
- Appendix B: The tribes

---

## Step 1: Identify and polish rough chapters

Scan every chapter for:

1. **Incomplete sections** — Chapters that end abruptly or have placeholder-quality content
2. **Disconnected anecdotes** — Stories added in Phase 7 that aren't woven into the narrative flow
3. **Voice inconsistencies** — Sections that read like reference material instead of memoir prose
4. **Missing transitions** — Chapters that don't flow naturally from the previous one
5. **Repetition** — Stories or phrases duplicated across chapters (some was fixed in Phase 7 P2 polish, but check for remaining issues)

### Polish priorities:
- Each chapter should have a strong opening line (hook the reader)
- Each chapter should have a reflective closing paragraph (land the lesson)
- Anecdotes should serve the chapter's theme, not just fill space
- Cross-references to other chapters should feel organic ("This connects to what happened at Solipse — but that's Chapter 5's story")

---

## Step 2: Add new chapters

Based on ebook content gaps and the brief's suggestions, create new chapters for these topics:

### Proposed new chapters

| Chapter | Title (sentence case) | Part | Topic |
|---|---|---|---|
| 21 | "The ambidextrous artist" | Part 2 (The art) | How and why Ash learned to paint with both hands. The ADHD connection. The festival necessity. The technique development. |
| 22 | "The festival kit" | Part 3 (The life) | Everything that goes on the bike. The evolution of the kit over years. The checklist system. The philosophy of travelling light. |
| 23 | "The AI workflow" | Part 4 (The future) | How AI transformed LightSpeed and Ash's creative process. GitHub Copilot, ChatGPT, Claude, MCP. The mentoring of the team. |
| 24 | "The grading system" | Appendix C | Six Cats grading: Quads, Topshelf, Standard, Preground, Budget. The craft of cultivation. |

### Content sourcing for new chapters

- **Ambidextrous painting:** `/docs/website-content.md` (ADHD section — "Adapting to chaos isn't a learned skill for ADHD brains; it's native"), ebook Part 2 existing content
- **Festival kit:** `/docs/website-content.md` (cycling section — touring kit, packing checklist system, 40kg bike), ebook Chapter 9 (cycling)
- **AI workflow:** `/docs/website-content.md` (LightSpeed AI & Modern Workflow section, internship program, team mentoring)
- **Grading system:** `/docs/website-content.md` (Six Cats grading system — Quads through Budget blend)

### Chapter structure template

Each new chapter should have:
- 3–5 pages (consistent with existing chapter lengths)
- Strong opening hook (first line grabs attention)
- 2–3 anecdotes woven into the theme
- Cross-references to related chapters
- Reflective closing that connects to the book's central thesis ("The cumulative effect")

---

## Step 3: Strengthen cross-chapter connections

Build a narrative thread map showing how chapters connect. Then add organic cross-references.

### Connection examples:

- Ch 1 (The first drop) → Ch 21 (Ambidextrous artist): "The hands that first picked up paint in Chapter 1 would learn to work together in ways I never expected"
- Ch 3 (Berlin calling) → Ch 22 (Festival kit): "Berlin taught me to travel light — the kit evolved from there"
- Ch 9 (Two wheels) → Ch 22 (Festival kit): "The bike dictates the kit. Everything must fit in the panniers"
- Ch 16 (The WordPress journey) → Ch 23 (AI workflow): "The tools changed, but the philosophy didn't — build it right, build it once"
- Ch 15 (Six Cats) → Ch 24 (Grading system): "The craft isn't just in the growing — it's in knowing what you've grown"

### Implementation:
- Add 1–2 subtle cross-reference lines per chapter where natural
- Never force connections — if it doesn't flow, don't add it
- Use callbacks: "Remember the loaded bike from Chapter 9? That's where this story starts..."

---

## Step 4: Update metadata

After adding new chapters:
1. Update page numbers across ALL chapters
2. Update the table of contents / chapter index
3. Update any chapter count references in the ebook UI data
4. Verify total page count

---

## Output

- **Report:** `/reports/content-expansion-phase8/07-ebook-enrichment.md` with:
  - Rough chapters identified and polish changes made
  - New chapters created (title, page count, part assignment)
  - Cross-chapter connections added (source → target, line added)
  - Updated total: chapters, pages, parts
  - Any content gaps remaining for future phases
