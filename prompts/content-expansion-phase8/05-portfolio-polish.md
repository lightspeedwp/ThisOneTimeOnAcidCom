# Sub-audit 5: Portfolio text polish

**Parent:** [orchestrator.md](./orchestrator.md)
**Report:** `/reports/content-expansion-phase8/05-portfolio-polish.md`

---

## Objective

Polish the text content (descriptions, titles, content fields, tags) of all 42 existing portfolio entries. Add per-item FAQs to every entry. **Do NOT add new portfolio entries. Do NOT change any images.**

---

## Scope

**Files to edit:**
- `/data/mock/portfolio/uv-makeup.ts`
- `/data/mock/portfolio/festivals.ts`
- `/data/mock/portfolio/nail-art.ts`
- `/data/mock/portfolio/editorial.ts`
- `/data/mock/portfolio/featured.ts`
- `/data/mock/portfolio/switzerland.ts` (if exists, or `swiss-festivals.ts`)
- `/data/mock/portfolio/thailand.ts`

**DO NOT touch:**
- Image `src` fields — all existing images are protected
- Image `alt` fields — only fix if factually incorrect
- The `images` array structure

---

## Step 1: Polish text fields

For each of the 42 portfolio entries:

### Title
- Verify sentence case
- Should be evocative and descriptive, not generic (e.g., "Neon tribal geometric at Origin 2026" not "UV Makeup 1")

### Description
- Minimum 2–3 sentences
- Describe the specific look, the context (festival, event, location), the technique
- Use Ash's authentic voice — energetic, specific, personal
- Reference real details: festival name, city, UV paint type, lighting conditions, weather
- Never generic ("Beautiful UV makeup at a festival") — always specific ("Third eye mandala under the Groenland mountains at Origin 2026, painted ambidextrously while the sunrise set lit up the valley")

### Content (optional long-form field)
- If the `content` field exists, polish it for voice and depth
- If it's empty/missing on entries that would benefit from a story, consider adding a short paragraph (3–5 sentences)
- Content should tell the story behind the look: what inspired it, how the person reacted, what the conditions were

### Tags
- Ensure consistent naming across all entries
- Check against `/data/mock/portfolio/tags.ts`
- Add relevant tags that may be missing (location tags, technique tags, event tags)

### Excerpt
- If empty, auto-generate from first sentence of description
- Should work as a card preview (max ~120 characters)

---

## Step 2: Add per-item FAQs

Add 2–3 contextual FAQs to every portfolio entry's `faqs` array.

### FAQ types for portfolio entries:

**Technique questions:**
- "What paints were used?" → Professional-grade UV reactive paints, skin-safe, water-based
- "How long did this take?" → 5–15 minutes depending on complexity
- "Is this design pre-planned?" → No — Ash works spontaneously, reading the person's features and the energy

**Context questions:**
- "Where was this created?" → Specific festival/event/location
- "Can I request this design?" → Ash works spontaneously; he doesn't take commissions but you can find him at festivals
- "What does this design represent?" → Explanation of the symbolic/artistic elements

**Practical questions:**
- "How long does it last?" → Through sweat and dancing, designed for multi-hour festival wear
- "Is it safe for sensitive skin?" → Yes, all products are professional-grade and skin-safe

**Rules:**
- FAQ IDs: `portfolio-[slug]-q1`, `portfolio-[slug]-q2`, etc.
- Never include pricing/booking language
- Answers should be substantive (2–3 sentences)

---

## Step 3: Verify data integrity

After polishing:
1. All 42 entries still exist (no accidental deletions)
2. All image arrays are unchanged
3. Category distribution is unchanged
4. All `id` and `slug` fields are unique
5. Tags are consistent with `/data/mock/portfolio/tags.ts`
6. Total count still = 42

---

## Output

- **Report:** `/reports/content-expansion-phase8/05-portfolio-polish.md` with:
  - Per-entry changes summary (which fields were modified)
  - FAQs added count
  - Tag normalisation changes
  - Any issues found (factual errors, missing data)
