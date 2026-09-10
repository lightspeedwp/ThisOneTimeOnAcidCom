# Sub-Audit 1: Six Cats page enrichment

**Parent:** [orchestrator.md](./orchestrator.md)
**Created:** March 3, 2026
**Version:** 1.0.0
**Output:** `/reports/content-expansion-phase7/01-six-cats-expansion.md`

---

## Objective

Expand the Six Cats page data to reflect the rich, detailed story now documented in `/docs/website-content.md`. The current page likely contains minimal content. The source document contains a full brand story: individual cat profiles, cultivation processes, grading system, values, and packaging ethos.

---

## Source Material

**Primary source:** `/docs/website-content.md` — section: "Six Cats Club / the full story about Ash Shaw's cannabis club"

Key content sections available:
- Vision & Mission statement
- 8 brand values (Authenticity, Consciousness, Consistency, Experience, Meticulousness, Sustainability, Passion, Quality)
- The Humans section
- Individual cat bios: Timmy, Wendy, Jimmy, Bean, Jeff, Frank (6 living)
- In Memoriam: Lisa, Moe, Lucy (3 passed)
- Cultivation processes: Living Soil, Rainwater Harvesting, Companion Planting, Worm Tea
- Harvest phases: Flushing, Drying, Dry Trimming, Curing
- Grading system: Quads (AAAA), Topshelf (AAA), Standard (AA), Preground (A+), Budget Blend (A)
- Packaging: glass recycling, sustainable growth ethos

---

## Audit Steps

### Step 1: Review current Six Cats data
**File:** `/data/mock/pages/six-cats.ts`

Document:
- Current fields and structure
- What content is already present
- What is missing compared to `website-content.md`
- Data shape/TypeScript interface used

### Step 2: Review the TypeScript types
**File:** `/data/types/`

Identify:
- Existing interface for Six Cats page data
- Whether cat profile arrays exist
- Whether cultivation step arrays exist
- What new types may need to be defined

### Step 3: Gap analysis

Create a clear gap table:

| Content from website-content.md | Currently in data? | Action |
|---|---|---|
| Vision statement | ? | Add / Enrich |
| Brand values (8 values) | ? | Add / Enrich |
| Cat bio: Timmy | ? | Add |
| Cat bio: Wendy | ? | Add |
| Cat bio: Jimmy | ? | Add |
| Cat bio: Bean | ? | Add |
| Cat bio: Jeff | ? | Add |
| Cat bio: Frank | ? | Add |
| In Memoriam: Lisa | ? | Add |
| In Memoriam: Moe | ? | Add |
| In Memoriam: Lucy | ? | Add |
| Living Soil cultivation | ? | Add |
| Rainwater Harvesting | ? | Add |
| Companion Planting | ? | Add |
| Worm Tea | ? | Add |
| Flushing (harvest phase) | ? | Add |
| Drying (harvest phase) | ? | Add |
| Dry Trimming (harvest phase) | ? | Add |
| Curing (harvest phase) | ? | Add |
| Grading system (5 grades) | ? | Add |
| Glass packaging & recycling | ? | Add |

### Step 4: Propose data structure additions

Design the TypeScript structures needed to hold the new content:

```typescript
interface CatProfile {
  id: string;
  name: string;
  nickname: string;
  role: string;
  description: string;
  status: 'living' | 'memoriam';
  yearJoined?: string;
  yearPassed?: string;
}

interface CultivationStep {
  id: string;
  title: string;
  description: string;
  phase: 'growing' | 'harvest';
}

interface CannabiisGrade {
  id: string;
  label: string;
  grade: string;
  tagline: string;
  description: string;
}

interface BrandValue {
  id: string;
  title: string;
  description: string;
}
```

All structures must follow existing conventions in the project (see `/data/types/` for patterns).

### Step 5: Write the updated data

Update `/data/mock/pages/six-cats.ts` to include:

1. **Cat profiles array** — all 6 living cats with personality-rich descriptions drawn directly from `website-content.md`
2. **In memoriam array** — Lisa, Moe, Lucy with their tribute descriptions
3. **Cultivation steps** — growing (4 steps) + harvest phases (4 steps)
4. **Grading system** — all 5 grades with descriptions
5. **Brand values** — all 8 values
6. **Vision & Mission** strings
7. **Packaging section** — glass recycling narrative

**Writing guidelines:**
- All section titles in **sentence case**
- All cat names follow the nicknames from `website-content.md` (e.g. "Timmmaaaahh", "Wendells")
- He/Him pronouns throughout
- Descriptive, warm, personality-driven tone — not clinical
- Cape Town context: Woodstock, green garden, rescue cats

### Step 6: Verify no hardcoded strings in component

Check `/components/pages/SixCatsPage.tsx` (or equivalent):
- Confirm the component imports from `six-cats.ts` (not hardcoded)
- If component references fields that don't exist in new data, update imports only (never hardcode)

---

## Output Format

### Section 1: Current state assessment
- Fields present in current six-cats.ts
- Missing content identified
- TypeScript interface gaps

### Section 2: Data structure design
- Proposed TypeScript interfaces for new arrays
- Field names following existing conventions

### Section 3: Implementation
- Full updated content for `/data/mock/pages/six-cats.ts`
- All cat profiles (6 living + 3 in memoriam)
- All cultivation steps (8 total)
- All 5 grade definitions
- All 8 brand values
- Vision, mission, packaging content

### Section 4: Component checklist
- Components verified as importing from data layer
- No hardcoded strings

---

## Success Criteria

- [ ] All 6 living cat profiles added with personality-rich descriptions
- [ ] All 3 in memoriam entries added with tribute descriptions
- [ ] All 8 brand values present
- [ ] Vision and Mission strings added
- [ ] 4 cultivation growing steps added
- [ ] 4 harvest phases added
- [ ] 5 grading tiers added with full descriptions
- [ ] Packaging/recycling section added
- [ ] All headings in sentence case
- [ ] He/Him pronouns throughout
- [ ] Cape Town / Woodstock context maintained
- [ ] No commercial framing (personal art project scope)

---

## Key Facts from `website-content.md`

**Six Cats founding:** May 2019, co-founded with Barbara Kerr
**First cats:** Bart and Lisa, adopted 2003 (brother and sister)
**Total cats adopted:** 9 over the years, 3 passed
**Website:** sixcats.club

**Living cats (as of 2026):**
1. Timmy (Timmmaaaahh) — Sole remaining original six member. Therapy cat. Senses when someone needs a cuddle.
2. Wendy (Wendells) — Rescued in rainstorm at 5 weeks. Agile matriarch. Soccer with paper balls. Claws are real.
3. Jimmy (Super Slim Jim) — FIV-positive. Serious illness late 2023, remarkable recovery. Laid-back.
4. Bean (The Survivor) — Rescued Jan 2022 from under a Wendy house at a shopping centre. Was feral, blossomed with love.
5. Jeff (The Wanderer) — Found wandering alone May 2022. Nestled into Ash's arms immediately. Occasional adventurer.
6. Frank (Blue Eyes) — Named after Frank Sinatra. Stray visitor, not quite permanent. Peaceful demeanour, blue eyes.

**In memoriam:**
1. Lisa (Granny Cat) — Original matriarch from ~2003, lived to ~17. Passed July 2020.
2. Moe (Fat-Boy-Fat) — Couch Commissioner. Passed 4 January 2022. Snored, did silly things, left a massive gap.
3. Lucy (Dennis the Menace) — Cross-Burmese. Matriarch after Lisa. Talkative, welcoming. Passed 24 October 2023.

---

## References

- [website-content.md](../../docs/website-content.md) — Section: Six Cats Club
- [Guidelines.md](../../guidelines/Guidelines.md) — Sentence case, pronouns, BEM rules
- [Data System Documentation](../../data/README.md)

---

**Status:** Ready to execute
**Next:** Run audit, write report to `/reports/content-expansion-phase7/01-six-cats-expansion.md`, then run [02-lightspeed-stories.md](./02-lightspeed-stories.md)
