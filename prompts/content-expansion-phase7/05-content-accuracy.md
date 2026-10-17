# Sub-Audit 5: Content accuracy & location audit

**Parent:** [orchestrator.md](./orchestrator.md)
**Created:** March 3, 2026
**Version:** 1.0.0
**Merged from:** `content-accuracy-audit.md` (v1.0.0) + `content-audit-phase3.md` + `location-biography-audit.md` (v1.0.0)
**Output:** `/reports/content-expansion-phase7/05-content-accuracy.md`
**Re-run schedule:** Quarterly (March, June, September, December) and after any major content expansion

---

## Objective

Systematically audit all `/data/mock/` files for factual accuracy, timeline correctness, location framing, pronoun usage, sentence case, and stale statistics. Use `/docs/website-content.md` and `/guidelines/Guidelines.md` as the definitive ground truth.

This is a combined audit merging three previously separate prompts:
- **Content accuracy:** Dates, stats, timelines
- **Location framing:** Cape Town = home base, Berlin = seasonal
- **Phase 3 sync:** Reference files → mock data consistency

---

## Ground Truth Reference

### Personal timeline
- **Home base:** Cape Town, South Africa — Woodstock (owns a house, permanent)
- **Berlin:** First visit **2019** (NOT 2016). COVID pause. Returned **2022**. Seasonal only (**May** visits). Duration: late May through end of summer.
- **Thailand:** Koh Phangan. Season: **Sep–Nov**. Activities: Muay Thai, triathlon, remote work.
- **Yearly cycle:** Cape Town → Berlin (May) → Cape Town/SA (Aug–Sep, bicycle swap) → Koh Phangan (Sep–Nov) → Cape Town (Nov, summer festival season)
- **Makeup artistry started:** **July 2019** in Berlin (NOT earlier)
- **Six Cats co-founded:** **May 2019** with Barbara Kerr
- **Pronouns:** He/Him throughout

### LightSpeed stats (2026)
- **Founded:** 2003
- **Age in 2026:** **23 years** (NOT "22+", "22 years", or "20 years")
- **Team size:** **13 members**

### Six Cats
- **Founded:** May 2019
- **Co-founders:** Ash Shaw & Barbara Kerr
- **Location:** Woodstock, Cape Town

---

## Files to Audit

### Priority P0 — Public-facing content (audit fully)

| File | Key exports | What to check |
|---|---|---|
| `/data/mock/pages/about.ts` | `aboutPageData` | Hero dates, home base, years active |
| `/data/mock/pages/about-subpages.ts` | `berlinPageData`, `bioPageData`, `lightspeedPageData` | Berlin framing, LightSpeed age, yearly cycle |
| `/data/mock/pages/artistry.ts` | `artistryPageData` | Makeup start date (July 2019), hero content |
| `/data/mock/pages/press.ts` | `pressPageData` | Biography accuracy, location, pronouns |
| `/data/mock/pages/history.ts` | `historyPageData` | Timeline dates, team join dates |
| `/data/mock/sections/faq.ts` | All FAQ answers | Location refs, dates, stats |
| `/data/mock/seo.ts` | All 46 page SEO entries | Descriptions, location framing |

### Priority P1 — Supporting content

| File | Key exports | What to check |
|---|---|---|
| `/data/mock/ui/contact.ts` | Contact page content | Location text |
| `/data/mock/ui/hero.ts` | Homepage hero content | Tagline, location |
| `/data/mock/pages/six-cats.ts` | `sixCatsPageData` | Founding date (May 2019), co-founder |
| `/data/mock/sections/about.ts` | About section snippets | Location framing, stats |
| `/data/mock/pages/history.ts` | `historyPageData` | Company age, team size |

### Priority P2 — Portfolio & blog

| File | What to check |
|---|---|
| `/data/mock/blog/posts.ts` | Author bios, location refs, dates |
| `/data/mock/portfolio/*.ts` | Descriptions, location tags |

---

## Audit Steps

### Step 1: Timeline verification

For **every date reference** in P0 and P1 files:

1. Find all year mentions (2003, 2016, 2018, 2019, 2022, 2023, 2024, 2025, 2026)
2. Verify each against Ground Truth Reference above
3. Flag discrepancies

**Common errors to catch:**
- ❌ Berlin first visit dated 2016 (should be 2019)
- ❌ Makeup start before July 2019
- ❌ Six Cats before May 2019
- ❌ LightSpeed "20 years" or "22 years" (should be 23 in 2026)
- ❌ Warwick joining "2007" (should be December 2006)

### Step 2: Location framing verification

Search ALL files for these patterns:
- "Berlin" — context check: is it listed as home base or destination?
- "based in" — what location follows?
- "lives in" / "residing in" / "located in" / "home in"
- "Cape Town" — verify described as home base
- "Woodstock" — verify house ownership mentioned where relevant
- "Thailand" / "Koh Phangan" — verify as training/remote work location
- "Muay Thai" — verify Thailand connection
- "triathlon" — verify Thailand connection

**❌ Incorrect patterns to flag:**
- "based in Berlin"
- "Berlin-based artist"
- "relocated to Berlin in 2019"
- "lives in Berlin"
- Any framing that makes Berlin sound permanent

**✅ Correct patterns:**
- "based in Cape Town, South Africa"
- "based in Woodstock, Cape Town"
- "travels annually to Berlin each May"
- "Cape Town (home base) / Berlin (May seasonal)"
- "splitting time between Cape Town, Berlin, and Koh Phangan"

### Step 3: Yearly cycle verification

For every description of Ash's travel pattern:

1. Berlin = "May" only (not "May–August", not "summers")
2. Thailand = "Sep–Nov" (not "Aug–Nov", not "September to December")
3. Bicycle swap = mentioned when describing the Cape Town return (Aug–Sep)
4. Koh Phangan = specified (not just "Thailand")
5. Muay Thai + triathlon = mentioned in Thailand context
6. November return to Cape Town = for South African summer festival season

### Step 4: Pronoun audit

Search ALL files for:
- "they/them" pronouns referring to Ash (should be "he/him")
- "their" when referring to Ash's things (should be "his")
- "the artist" without pronoun where he/him should follow
- Author bios in blog posts and portfolio entries

### Step 5: Sentence case audit

Check ALL of the following field types across P0 and P1 files:

- Section `title` fields
- Hero `badge`, `title` fields
- Page `heading` fields
- Quick fact `label` fields
- FAQ `question` fields
- Timeline entry `title` fields
- Card `title` fields
- Navigation label strings

**Violations to flag:**
- ❌ Title Case ("The Dancefloor Gave Me Everything")
- ❌ ALL CAPS ("NEON REVELATIONS")
- ✅ Sentence case ("The dancefloor gave me everything")

**Proper nouns that stay capitalised:**
Ash, Berlin, Cape Town, Koh Phangan, LightSpeed, WordPress, BarCamp, Six Cats, Aquarius, ADHD, Lucy, Origin (festival), Solipse (festival), Vortex (festival), UV, Woodstock, Thailand, South Africa, Europe, Muay Thai, GitHub, Copilot, Claude, ChatGPT, MCP, WooCommerce, Figma, Netlify, React

### Step 6: Statistics verification

Verify these specific numbers across all files:

| Stat | Correct value | Where to check |
|---|---|---|
| LightSpeed age | 23 years (2026) | About, Press, Bio, History |
| Team size | 13 members | About, LightSpeed page |
| Years as makeup artist | ~6 years (July 2019 to 2026) | Artistry, About, SEO |
| WordCamps attended | 20+ across 4 continents | Press, About |
| Festival types | UV, psytrance, techno | Portfolio descriptions |

---

## Report Structure

**Output file:** `/reports/content-expansion-phase7/05-content-accuracy.md`

```markdown
# Content accuracy audit — Phase 7 findings

**Audit date:** March 3, 2026
**Files audited:** [count]
**Total issues found:** [count]

## Summary table
| Category | P0 issues | P1 issues | P2 issues |
|---|---|---|---|
| Timeline errors | | | |
| Location framing | | | |
| Yearly cycle | | | |
| Pronoun errors | | | |
| Sentence case | | | |
| Stale statistics | | | |

## Findings by category

### 1. Timeline errors
[File | field | current value | correct value]

### 2. Location framing errors
[File | field | current value | correct value]

### 3. Yearly cycle inconsistencies
[File | field | issue]

### 4. Pronoun errors
[File | field | issue]

### 5. Sentence case violations
[File | field | current value | correct value]

### 6. Stale statistics
[File | field | current value | correct value]

## Files with zero issues
[List]

## Recommended fixes (prioritised)
[P0 fixes first]
```

---

## Task List

After completing the report, create `/tasks/content-accuracy-tasks.md` with:
- Checkbox for each fix
- File path and field name
- Current value → correct value
- Priority level

---

## Acceptance Criteria

- [ ] All P0 files fully audited
- [ ] Every date reference verified
- [ ] Zero "Berlin-based" or equivalent errors in public-facing data
- [ ] Yearly cycle described correctly wherever it appears
- [ ] All pronouns He/Him
- [ ] All headings/titles in sentence case
- [ ] LightSpeed age = "23 years" (2026) throughout
- [ ] Report saved to `/reports/content-expansion-phase7/05-content-accuracy.md`
- [ ] Task list created at `/tasks/content-accuracy-tasks.md`

---

## References

- [website-content.md](../../docs/website-content.md) — Ground truth for all facts
- [Guidelines.md](../../guidelines/Guidelines.md) — Key facts, yearly cycle, pronouns, sentence case

---

**Status:** Ready to execute
**Next:** Run audit, write report, then run [06-new-blog-posts.md](./06-new-blog-posts.md)
