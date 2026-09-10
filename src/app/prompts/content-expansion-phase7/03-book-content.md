# Sub-Audit 3: Book page & ebook enrichment

**Parent:** [orchestrator.md](./orchestrator.md)
**Created:** March 3, 2026
**Version:** 1.0.0
**Output:** `/reports/content-expansion-phase7/03-book-content.md`

---

## Objective

Use the "This one time on acid..." book content from `/docs/website-content.md` to enrich the ebook data and any existing book-related pages. The source document contains a full concept, blurb, chapter list, core threads, and a second alternative book concept — all of which are richer than what's likely in the current ebook data.

---

## Source Material

**Primary source:** `/docs/website-content.md` — section: "Book / 'This one time on acid...'"

Available content:
- **Title:** "This one time on acid..."
- **Design:** Neon pink cover, neon yellow text
- **Concept:** Weaving wildest stories from the dancefloor into deepest life lessons
- **Key theme:** It is never one thing — the cumulative effect of many experiences
- **Core threads:** Aquarius + ADHD + Lucy
- **Story structure:** Wild stories (campfire 4am style) → life lessons
- **Timeline:** Writing over next few years, not to be rushed
- **6 chapter previews** (working titles)
- **Draft blurb**
- **Alternative concept:** "Dance like no one's watching" — 5 chapters
- **Origin reel beats** (Fatboy Slim, Bob Moses, Depeche Mode)
- **Legacy stories** — what people will remember Ash for

---

## Audit Steps

### Step 1: Review current ebook data
**File:** `/data/mock/pages/ebook-pages.ts`

Document:
- Total page count
- Chapter structure (how many chapters, appendices)
- Whether the chapter titles match those in `website-content.md`
- Whether the blurb matches the draft blurb in `website-content.md`
- Whether core threads (Aquarius + ADHD + Lucy) are reflected

### Step 2: Review any book-specific pages
**Files to check:**
- Any page component or data file related to the book/ebook
- Check `/data/mock/pages/` for book-specific exports
- Check `/components/pages/` for an EbookPage or BookPage component

Document:
- How the book is currently presented on the site
- Whether there is a dedicated "about the book" section
- What metadata is stored (title, blurb, cover design)

### Step 3: Gap analysis — ebook chapters

Compare the 6 working chapter titles from `website-content.md` against the current ebook data:

| Chapter | Title from website-content.md | In ebook-pages.ts? | Match? |
|---|---|---|---|
| 1 | "The first drop" — rooftop in Cape Town | ? | ? |
| 2 | "Wired different" — ADHD, Aquarius, different OS | ? | ? |
| 3 | "Berlin calling" — one-way ticket, bicycle | ? | ? |
| 4 | "The dancefloor classroom" — 140 BPM | ? | ? |
| 5 | "Neon revelations" — UV paint and finding his voice | ? | ? |
| 6 | "The cumulative effect" — it's never one moment | ? | ? |

Note: Titles in `website-content.md` use **Title Case** — in the data they must be corrected to **sentence case** per project rules.

**Correct sentence case versions:**
1. "The first drop"
2. "Wired different"
3. "Berlin calling"
4. "The dancefloor classroom"
5. "Neon revelations"
6. "The cumulative effect"

### Step 4: Gap analysis — blurb and concept

Compare the draft blurb from `website-content.md`:
> "A raw, honest memoir weaving the wildest stories from the psytrance dancefloor into the deepest lessons they taught. How an Aquarian soul, an ADHD brain, and Lucy in the Sky combined to create an artist, a nomad, and a life lived in full colour."

Against whatever blurb is currently in the ebook data. If different or missing, the `website-content.md` version should be used (adjusted to sentence case: lowercase "in" after first word is fine — the blurb is a paragraph, not a heading).

### Step 5: Alternative book concept

The "Dance like no one's watching" concept from `website-content.md` is a separate book idea. Options:
1. Add it as an appendix or "alternative concept" note in the ebook data
2. Reference it in an "About the book" meta section
3. Add a future-projects note to the About or Bio page

Recommend the most appropriate placement given the site structure.

### Step 6: Core threads enrichment

The ebook data should clearly reflect the three core threads:
1. **Aquarius** — The soul archetype: wild, visionary, unconventional
2. **ADHD** — The neurodivergent brain: bug that turned into a feature
3. **Lucy** — Expanded awareness, transformative experiences

If these are not prominent in the current ebook intro/preface content, they should be added or enhanced.

### Step 7: Origin reel content

The "origin reel beats" (Fatboy Slim, Bob Moses, Depeche Mode) could be:
- A fun aside in the book's About section
- A playlist reference in the ebook data
- An Easter egg in the Press/Bio page

Determine the best placement that feels authentic and non-commercial.

### Step 8: Update data files

**Files to update (as needed):**
1. `/data/mock/pages/ebook-pages.ts` — Chapter titles, blurb, core threads
2. Any book metadata export — title, cover concept, timeline description

---

## Output Format

### Section 1: Current ebook state
- Chapter count and titles
- Current blurb text
- Core threads representation
- Overall alignment with `website-content.md`

### Section 2: Gap analysis
- Chapter title mismatches (sentence case corrections)
- Missing/different blurb
- Missing core threads content
- Missing alternative book concept

### Section 3: Recommended updates
- Specific field-by-field changes to ebook-pages.ts
- Sentence-case corrections for chapter titles
- Blurb update
- Core threads integration
- Alternative concept placement recommendation

### Section 4: Implementation
- Updated content ready to paste into data files
- All sentence case applied
- All content non-commercial (personal art project framing)

---

## Success Criteria

- [ ] All 6 chapter titles use sentence case in the data
- [ ] Chapter titles match "working titles" from `website-content.md`
- [ ] Draft blurb updated to match `website-content.md` version
- [ ] Core threads (Aquarius, ADHD, Lucy) present in ebook intro
- [ ] Alternative concept ("Dance like no one's watching") referenced appropriately
- [ ] Book timeline described as "writing over next few years, not to be rushed"
- [ ] No commercial framing (no pricing, no pre-order language)
- [ ] He/Him pronouns throughout

---

## Key Facts from `website-content.md`

**Title:** "This one time on acid..."
**Cover:** Neon pink, neon yellow text
**Status:** Being written over next few years — not to be rushed
**Chapter titles (sentence case):**
1. "The first drop"
2. "Wired different"
3. "Berlin calling"
4. "The dancefloor classroom"
5. "Neon revelations"
6. "The cumulative effect"

**Alternative book:** "Dance like no one's watching" — traces costume/identity evolution: early dancing → cow suit → chicken suit → rave suit → makeup

**Legacy quotes (from website-content.md):**
- In makeup: "People thanked him years later. An experience where he saw someone after not seeing them for two years — he'd done their makeup two years ago. That day they felt extremely special; everyone kept complimenting them and it made their day."
- In WordPress: "He'll be remembered as the crazy South African in the WordPress community — but definitely as a passionate WordPress contributor."

---

## References

- [website-content.md](../../docs/website-content.md) — Section: Book
- [ebook-pages.ts](../../data/mock/pages/ebook-pages.ts)
- [Guidelines.md](../../guidelines/Guidelines.md) — Sentence case rule, personal art project scope

---

**Status:** Ready to execute
**Next:** Run audit, write report, then run [04-about-enrichment.md](./04-about-enrichment.md)
