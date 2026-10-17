# Sub-Audit 4: About page & biography enrichment

**Parent:** [orchestrator.md](./orchestrator.md)
**Created:** March 3, 2026
**Version:** 1.0.0
**Output:** `/reports/content-expansion-phase7/04-about-enrichment.md`

---

## Objective

Use the professional profiles (v1 & v2), yearly cycle narrative, legacy content, and identity material from `/docs/website-content.md` to enrich the About sub-pages and Press/Bio page. The goal is richer, more compelling personal storytelling — not a LinkedIn resume.

---

## Source Material

**Primary source:** `/docs/website-content.md` — sections:
- "LightSpeed / Ashley 'Ash' Ward Shaw - Professional Profile v1" (ChatGPT-generated)
- "LightSpeed / Ashley 'Ash' Ward Shaw - Professional Profile v2" (revised, content strategy emphasis)
- Legacy & What People Will Remember (from Book section)
- Yearly cycle description (from Guidelines.md / various sections)
- Ash's entrepreneurial philosophy (from Company History section)

**Note on professional profiles:** Both v1 and v2 are AI-generated starting points. They must be adapted to:
- Remove commercial tone ("LightSpeed agency" pitch → "Ash's work")
- Focus on personal identity, creativity, and community
- Keep the art project framing (no services, no booking)
- Adjust to He/Him pronouns (profiles use neutral language)
- Apply sentence case to all headings

---

## Audit Steps

### Step 1: Review all About sub-page data
**Files to check:**
- `/data/mock/pages/about.ts` — Main About landing page
- `/data/mock/pages/about-subpages.ts` — All sub-pages: bioPageData, berlinPageData, lightspeedPageData, etc.
- `/data/mock/pages/press.ts` — Press/bio page
- `/data/mock/pages/history.ts` — Journey/timeline page
- `/data/mock/sections/about.ts` — About section snippets

Document:
- What biographical content currently exists
- Whether the professional summary reflects the v2 profile level of depth
- Whether the yearly cycle (Cape Town → Berlin → Thailand → back) is described anywhere
- Whether the legacy quotes are present
- Whether the entrepreneurial philosophy ("I didn't like working for an employer") is captured
- Whether press-ready bio text exists

### Step 2: Gap analysis — professional biography

Compare against profile v2 content areas:

| Content area | Currently in data? | File | Priority |
|---|---|---|---|
| Professional headline / tagline | ? | bioPageData | P0 |
| Professional snapshot (200-300 words) | ? | bioPageData / pressPageData | P0 |
| WordPress & WooCommerce expertise summary | ? | lightspeedPageData | P1 |
| Design systems / Figma expertise | ? | bioPageData | P1 |
| Community & speaking highlights | ? | pressPageData | P1 |
| AI & automation expertise | ? | bioPageData | P1 |
| Personal interests (cycling, cannabis, festivals, dance) | ? | bioPageData | P1 |
| Self-taught entrepreneur background | ? | bioPageData | P2 |
| Cape Town Woodstock home | ? | bioPageData | P0 |
| Yearly cycle description | ? | bioPageData | P0 |

### Step 3: Gap analysis — legacy & storytelling content

| Content | Currently in data? | Source | Priority |
|---|---|---|---|
| Makeup legacy quote (thanked years later) | ? | website-content.md: Book/Legacy | P0 |
| WordPress legacy quote (crazy South African) | ? | website-content.md: Book/Legacy | P1 |
| Entrepreneurial philosophy quote | ? | website-content.md: Company History | P0 |
| Yearly cycle narrative (full description) | ? | website-content.md: Company History | P0 |
| Self-description: Aquarius + ADHD + Lucy | ? | website-content.md: Book/Core Threads | P1 |
| "Wired different" framing of ADHD | ? | website-content.md: Book | P1 |

### Step 4: Yearly cycle content

The yearly cycle is central to Ash's identity. It should be described richly in the About/Bio data:

**Correct pattern (from Guidelines + website-content.md):**
- **Base:** Cape Town, Woodstock (owns a house — permanent home)
- **May:** Travels to Berlin for techno season
- **Aug–Sep:** Returns briefly to South Africa to swap bicycles
- **Sep–Nov:** Koh Phangan, Thailand — Muay Thai training, triathlon, remote work, island life
- **Nov:** Returns to Cape Town for South African summer festival season (Origin, Vortex, etc.)

This cycle is what *fuels* his creative energy. The narrative should convey this as a lifestyle design choice, not just a travel itinerary.

### Step 5: Professional biography — adapting profiles v1 & v2

**From profile v2, extract and adapt (adjusted for personal art project framing):**

Key skills to represent:
- WordPress & WooCommerce (co-founder of LSX Design System, Tour Operator plugin)
- UI/UX & design systems (Figma, theme.json)
- Community (WordCamp organiser & speaker, 20+ events across 4 continents)
- AI & automation (daily user of Copilot, ChatGPT, Claude, MCP)
- Content strategy & editorial workflows
- Open-source contributor

**Entrepreneurial philosophy (from Company History):**
> "I've always been entrepreneurial, but I really didn't like working for an employer. I have my own ideas and things that drive me. I have my own way — when you work for somebody else they tell you what to do and I would prefer to decide what I do. Throughout my whole life, I've designed my life the way I want to live it."

> "You never know if you're ready to start a business, but I knew that I didn't want to work at City Varsity for another year."

These quotes should appear in biography or About sub-page data.

### Step 6: Press-ready bio

The Press page should contain:
1. **Short bio** (50–80 words): Suitable for event programmes, podcast introductions
2. **Medium bio** (150–200 words): Suitable for WordCamp speaker profiles, magazine features
3. **Long bio** (300–400 words): Full biographical overview for press kits

All three should be in the data layer at `/data/mock/pages/press.ts`.

**Writing guidelines:**
- Sentence case for headings, title case for proper nouns only
- He/Him pronouns
- Lead with creativity, community, and lifestyle — not just tech credentials
- Include: Cape Town home base, yearly cycle, makeup artistry started July 2019 in Berlin, UV festival work
- Include: LightSpeed founder 2003, WordCamp speaker/organiser, 23 years in web industry
- Include: Six Cats co-founder, cyclist, Muay Thai practitioner
- Do NOT include: pricing, services, booking, commercial language

### Step 7: Update data files

**Files to update:**
1. `/data/mock/pages/about-subpages.ts` — `bioPageData`: yearly cycle, profile summary, key skills
2. `/data/mock/pages/press.ts` — short/medium/long bios, quotes, speaking history
3. `/data/mock/sections/about.ts` — Update any About section snippets that are too sparse

---

## Output Format

### Section 1: Current state
- Existing biographical content (field by field)
- Current press page content
- What yearly cycle description (if any) exists

### Section 2: Gap analysis
- Missing content areas with priority ratings
- Quote/narrative content not yet captured

### Section 3: New content
- Short bio (50–80 words, press-ready)
- Medium bio (150–200 words)
- Long bio (300–400 words)
- Yearly cycle narrative paragraph
- Entrepreneurial philosophy quote block
- Legacy quote block (makeup + WordPress)
- Key skills/identity summary for bio page

### Section 4: Implementation
- Updated `bioPageData` fields
- Updated `pressPageData` fields
- All sentence case applied
- All He/Him pronouns verified

---

## Success Criteria

- [ ] Yearly cycle described accurately: Cape Town (base) → Berlin (May) → Thailand Sep–Nov → Cape Town Nov
- [ ] Entrepreneurial philosophy quotes added to bioPageData
- [ ] Legacy quotes added (makeup + WordPress)
- [ ] Press page has short, medium, and long bio variants
- [ ] Professional skills (WordPress, Figma, community, AI) represented in bio
- [ ] Six Cats, cycling, Muay Thai included in personal interests
- [ ] Aquarius + ADHD + Lucy identity threads referenced appropriately
- [ ] Makeup artistry start: "July 2019 in Berlin" (not earlier)
- [ ] LightSpeed: "23 years" in 2026
- [ ] He/Him pronouns throughout
- [ ] All headings in sentence case

---

## References

- [website-content.md](../../docs/website-content.md) — Professional profiles, book/legacy, company history
- [Guidelines.md](../../guidelines/Guidelines.md) — Personal identity, yearly cycle, pronouns
- [Data System Documentation](../../data/README.md)

---

**Status:** Ready to execute
**Next:** Run audit, write report, then run [05-content-accuracy.md](./05-content-accuracy.md)
