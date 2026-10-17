# Content Expansion Phase 7 — Orchestrator Prompt

**Created:** March 3, 2026
**Version:** 2.0.0
**Workflow:** Multi-audit orchestrator (3 remaining phases)
**Output:** `/reports/content-expansion-phase7/` + `/tasks/content-expansion-phase7-tasks.md`

---

## Context & Background

Phase 7 sub-audits 01–03 are complete:
- **01 — Voice & tone audit:** Identified critical voice failures in Ch 10 (Six Cats) and Ch 19 (Twenty-three years) where website-content.md was transplanted without voice adaptation. P0 issues in cat bios, values, cultivation, grading, timeline, products, AI workflow sections.
- **02 — Content gap analysis:** Mapped all remaining website-content.md material not yet in the ebook. Identified P1/P2 gaps and accuracy issues (intern count, Berlin arrival date).
- **03 — Ebook enrichment (first pass):** Implemented P0/P1 additions (childhood heroes, Barbara proposal, Nation of Gondwana, Stormsvlei, intern fixes, afterword vulnerability). Deferred voice rewrites for cultivation/grading/timeline/products/AI.

**Current ebook structure (already split — keep manageable):**
```
/data/mock/pages/ebook/
├── types.ts         (shared BookPage type)
├── front-matter.ts  (cover, dedication, epigraph, TOC)
├── part-1.ts        (ch 1-4: Early life)
├── part-2.ts        (ch 5-9: Festival years)
├── part-3.ts        (ch 10-14: Nomadic life)
├── part-4.ts        (ch 15-20: Re-emergence)
└── back-matter.ts   (afterword, appendices, about author)
```

**Portfolio state:** UV Makeup reduced to 2 entries (Rainbow lightning, Electric blue). 8 placeholder entries removed. Atomic sunset removed.

**Primary source:** `/docs/website-content.md` — rich biographical content, much still not integrated.

---

## Objective

Complete the remaining Phase 7 work in three focused phases:

1. **Voice rewrites** — Fix the P0/P1 voice failures where content was copy-pasted without Ash's voice
2. **New content integration** — Weave remaining website-content.md material into the ebook using authentic voice
3. **Accuracy & consistency pass** — Fix dates, pronouns, sentence case, stock phrases

---

## Phase A: Voice Rewrites (P0 — Do First)

Fix sections identified in report 01 where website-content.md was transplanted without voice adaptation. The voice standard is set by the excellent passages (Ch 1 snails/Lego, Ch 2 ADHD surplus, Ch 4 Chicken Man, Ch 8 LSD acronym, Ch 17 million steps).

### A1. Ch 10 — Cultivation methods (part-3.ts, ch10-content-7, ch10-content-8)
**Problem:** Reads like a product brochure / how-to guide.
**Target voice:** An obsessed grower explaining his passion to a friend, not writing a manual. First-person, personal pride, specific memories of failures and discoveries. "I lost an entire crop to powdery mildew in 2017 because I didn't understand airflow" energy.
**Source material:** `/docs/website-content.md` → Six Cats Club → Cultivation section

### A2. Ch 10 — Grading system (part-3.ts, ch10-content-9)
**Problem:** Pure catalogue language ("Quads (AAAA): Top-shelf. Dense, trichome-covered...").
**Target voice:** Pride and craft, not a product listing. How it feels to open a jar of quads vs budget blend. The personal satisfaction of the grading process.
**Source material:** `/docs/website-content.md` → Six Cats Club → Grading System

### A3. Ch 10 — Cat bios (part-3.ts, ch10-content-2, ch10-content-3)
**Problem:** Formal third-person adoption-profile tone ("He arrived as a stray, malnourished and cautious").
**Target voice:** A guy introducing his weird family. Humour, love, specific anecdotes. "Timmy has this thing where he headbutts your shin at exactly 6am" energy. Use the raw, personality-rich bios from website-content.md (Timmy = therapy cat, Wendy = soccer with paper balls, Jimmy = FIV fighter, Bean = rescued from under a Wendy house, Jeff = wanderer who disappears for days, Frank = blue-eyed Sinatra).
**Source material:** `/docs/website-content.md` → The Cats — Rulers of the Humans

### A4. Ch 19 — Timeline sections (part-4.ts, ch19-content-2, ch19-content-3, ch19-content-4)
**Problem:** HR document / chronological info dump. Hire dates listed without human stories.
**Target voice:** Keep the key facts but weave them into memoir storytelling. The *feeling* of hiring the first employee, the impact of Warwick joining, why José's return matters emotionally. Trim the list-of-dates format.

### A5. Ch 19 — Products section (part-4.ts, ch19-content-7)
**Problem:** Reads like a README / product marketing copy.
**Target voice:** The pride and frustration of building open-source products. What the LSX Design System means personally, not what it does technically. Why Tour Operator exists (South African client base, travel industry love).

### A6. Ch 19 — AI workflow section (part-4.ts, ch19-content-8)
**Problem:** Stock phrase "fusion of AI, creativity, and open source" appears verbatim in multiple places. Overly polished, marketing tone.
**Target voice:** The genuine excitement and disorientation of the AI shift. Specific moments of "holy shit this changes everything." Retire the stock phrase entirely — find a fresh way to express the same idea.

### A7. Ch 19 — "What twenty-three years teaches you" (part-4.ts, ch19-content-9)
**Problem:** Self-help listicle format ("Freedom requires structure. The right people change everything.").
**Target voice:** Reflective memoir. Each lesson should be grounded in a specific memory or person, not stated as an aphorism. "I learned that freedom requires structure the hard way — the year I gave the team total flexibility and we missed every deadline" energy.

---

## Phase B: New Content Integration (P1/P2)

Weave these gaps from website-content.md into existing chapters using authentic voice. Keep additions concise — 1-2 paragraphs each, not full sections.

### B1. Ch 20 — Core beliefs list (part-4.ts, ch20-content-2)
**Source:** `/docs/website-content.md` → Philosophy → Core Beliefs (8 items)
**Integration:** Add as the chapter's closing thought — the thesis crystallised into 8 lines. NOT as a numbered list — weave naturally into the cumulative effect narrative.

### B2. Ch 12 or Ch 13 — Festival vs Berlin kit differences (part-3.ts)
**Source:** `/docs/website-content.md` → UV Art → Festival vs Berlin Kit
**Integration:** Brief paragraph in Ch 12 (loaded bike) about how the kit changes: Thailand = UV-only travel kit (mousse dries out), Berlin = full Make-Up Studio Amsterdam palette. Practical detail that grounds the touring story.

### B3. Ch 16 — Fusion nails concept (part-4.ts, ch16-content-2)
**Source:** `/docs/website-content.md` → UV Art → Fusion Nails
**Integration:** Brief mention as a new creative direction. "I've started doing nail art too — layered stickers over colour blends, sealed with topcoat. I'm not great at it yet, but when it works, it's beautiful."

### B4. Ch 9 — Swimming with Lourens Visser (part-2.ts)
**Source:** `/docs/website-content.md` → Fitness → Swimming
**Integration:** Add to island time chapter — Lourens taught him to swim properly, later joined LightSpeed. Nice personal connection that bridges sport and business.

### B5. Ch 15 or Ch 17 — Running achievements (part-4.ts)
**Source:** `/docs/website-content.md` → Fitness → Running
**Integration:** Brief mention of Table Mountain Challenge top 10 three times and Hout Bay Trail Challenge top 10 once. Adds to the endurance picture.

### B6. Ch 8 — Media24 Scrum Master role (part-2.ts)
**Source:** `/docs/website-content.md` → LightSpeed → Prior Roles
**Integration:** Brief mention that he wasn't always solo — spent 3 years at Media24 as Scrum Master/BA (2008-2011), which taught him process and team management skills he brought back to LightSpeed.

---

## Phase C: Accuracy & Consistency Pass

### C1. Berlin arrival date
Ch 11 says "2019" but website-content.md says "Berlin (2016 — Present)". **Resolution:** Website-content.md says he "discovered" Berlin in 2019 in the UV Art section but lists "2016 — Present" in identity. The ch11 content specifically says "just before the world stopped" (2019). Verify which is correct — likely first VISITED in 2016, made it a seasonal base from 2019. Update ch11 if needed.

### C2. "Twenty-two years" → "twenty-three years"
Scan all ebook files for any remaining "twenty-two" references. Should be "twenty-three" throughout (2026).

### C3. Stock phrase retirement
Remove or rewrite every instance of "The fusion of AI, creativity, and open source has been a radical, life-changing shift" across the ebook.

### C4. Ch 15 content 3 — Month-by-month format
The month-by-month calendar (ch15-content-3) breaks memoir voice. Convert to flowing narrative that captures the seasonal rhythm without reading like a lifestyle blog schedule.

### C5. Sentence case check
Verify all chapter titles, TOC entries, section headers within content use sentence case per Guidelines.md.

### C6. Pronoun check
Verify consistent He/Him throughout. No "they/them" for Ash, no "she" references.

---

## Execution Workflow

1. **Read all ebook part files** before making changes
2. **Execute Phase A** (voice rewrites) — one file at a time, part-3.ts then part-4.ts
3. **Execute Phase B** (new content) — integrate into existing files
4. **Execute Phase C** (accuracy) — scan and fix across all files
5. **Update task list** at `/tasks/content-expansion-phase7-tasks.md`

---

## File Size Awareness

The ebook is already split into 7 files. Keep each file manageable:
- Don't add massive new sections — integrate concisely
- If a part file grows too large, consider splitting further (e.g., part-3a.ts, part-3b.ts)
- New content additions should be 1-2 paragraphs, not full pages

---

## Content Rules (Non-Negotiable)

- **NO Tailwind utilities** — strict BEM architecture only
- **NO hardcoded strings in components** — all content via `/data/mock/`
- **NO commercial intent** — no pricing, booking, shop features
- **NO weddings, corporate events, bridal** — excluded content
- **Sentence case** — all headings, titles, labels
- **He/Him pronouns** — Ash is male
- **Cape Town = home base** — Berlin is seasonal (May), Thailand is Sep–Nov
- **LightSpeed = 23 years** in 2026
- **Bundler safety** — `var` not `let`/`const`, no optional chaining, no `for...of`, no template literals

---

## Voice Reference (What Good Sounds Like)

These passages set the standard — all rewrites should match this energy:

> "I was born in Paarl, a small town in the Western Cape of South Africa, surrounded by vineyards and mountains and the kind of quiet that drives certain types of children slightly mad."

> "It's not a deficit of attention. It's a surplus of it, all going in directions that school wasn't designed to handle."

> "By morning they were calling me the Chicken Man."

> "LightSpeedDevelopment — LSD. The acronym was intentional."

> "You don't count those steps on purpose. You count them afterwards."

---

## References

- [Guidelines.md](../../guidelines/Guidelines.md) — Master guidelines
- [website-content.md](../../docs/website-content.md) — Primary content source
- [01-voice-tone-audit.md](../../reports/content-expansion-phase7/01-voice-tone-audit.md)
- [02-content-gap-analysis.md](../../reports/content-expansion-phase7/02-content-gap-analysis.md)
- [03-ebook-enrichment.md](../../reports/content-expansion-phase7/03-ebook-enrichment.md)
- [Data System Documentation](../../data/README.md)

---

**Status:** Ready to execute
**Next step:** Phase A — Voice rewrites, starting with part-3.ts (Ch 10)
