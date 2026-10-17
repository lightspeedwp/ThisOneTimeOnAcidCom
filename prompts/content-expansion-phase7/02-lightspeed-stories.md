# Sub-Audit 2: LightSpeed deeper stories

**Parent:** [orchestrator.md](./orchestrator.md)
**Created:** March 3, 2026
**Version:** 1.0.0
**Output:** `/reports/content-expansion-phase7/02-lightspeed-stories.md`

---

## Objective

Enrich the LightSpeed sub-page data with deeper, more personal brand stories now available in `/docs/website-content.md`. The current data captures basic history; this audit adds the pivotal BarCamp 2006 story, the internship programme narrative, the AI workflow transformation, the extended team profiles, and the WordPress community involvement details.

---

## Source Material

**Primary source:** `/docs/website-content.md` — sections:
- "LightSpeed / Team & Workflow Update"
- "LightSpeed / Company History"
- "LightSpeed / Existing LightSpeed Development Team"
- "LightSpeed / Internship Program - Block Theme Developer"
- "LightSpeed / Senior Block Developer - José Abreu"
- "LightSpeed / Ashley 'Ash' Ward Shaw - Professional Profile v1"
- "LightSpeed / Ashley 'Ash' Ward Shaw - Professional Profile v2"

---

## Audit Steps

### Step 1: Review current LightSpeed data
**Files:**
- `/data/mock/pages/about-subpages.ts` — check `lightspeedPageData` export
- `/data/mock/pages/history.ts` — check `historyPageData`
- `/data/mock/pages/press.ts` — check professional biography content

Document:
- What is currently in `lightspeedPageData`
- What is in `historyPageData`
- Whether BarCamp 2006 is referenced
- Whether the internship programme is referenced
- Whether team profiles include the full 13-member list
- Whether AI workflow content exists

### Step 2: Gap analysis

| Content from website-content.md | Currently in data? | File to update | Priority |
|---|---|---|---|
| BarCamp Cape Town 2006 pivot story | ? | lightspeedPageData | P0 |
| People who impacted Ash at BarCamp (26 names) | ? | lightspeedPageData | P1 |
| Founding motivation quotes | ? | lightspeedPageData | P0 |
| Full 13-member team list with join dates | ? | lightspeedPageData | P1 |
| Warwick, Chris, Barbara join dates | ? | historyPageData | P1 |
| Prior roles (Media24, SynthaSite, Qeo, City Varsity, DuxTel, Peddlars) | ? | lightspeedPageData | P2 |
| AI & Modern Workflow section (Copilot, ChatGPT, Claude, MCP) | ? | lightspeedPageData | P0 |
| 20+ WordCamps across 4 continents | ? | lightspeedPageData | P1 |
| WordCamp Europe 2025 Basel speaker | ? | lightspeedPageData | P0 |
| OpenChannels.FM podcast appearances (4 episodes) | ? | lightspeedPageData | P1 |
| BugHerd webinar | ? | lightspeedPageData | P2 |
| Products: LSX Design System, Tour Operator plugin | ? | lightspeedPageData | P1 |
| Wetu Partnership & Indaba 2025 | ? | lightspeedPageData | P2 |
| WooCommerce recognition quote | ? | lightspeedPageData | P2 |
| Internship programme: 450 applicants → 2 selected | ? | lightspeedPageData | P0 |
| Brandon Marshall & Seren van der Merve intern profiles | ? | lightspeedPageData | P1 |
| Hugo Gravito + Brandon + Seren + José Abreu joining Aug-Sep 2025 | ? | historyPageData | P1 |
| Team freedom / culture philosophy | ? | lightspeedPageData | P0 |
| GitHub Copilot Business for whole team | ? | lightspeedPageData | P2 |

### Step 3: Content writing — BarCamp pivot story

The BarCamp Cape Town 2006 story is one of the most important brand narratives. It should be written as a brief but compelling origin story for the LightSpeed section:

**Key facts:**
- Event: BarCamp Cape Town 2006
- What happened: Ash met Dave Duarte who introduced him to WordPress
- Outcome: Led to Warwick Booth joining in November/December 2006
- Impact: Redirected the entire company from IT support to WordPress web development
- The networking impact: Opened the door to an entire community and way of working for two decades

**26 people who impacted Ash at BarCamp** (list from `website-content.md`):
Jeremy Thurgood, Dave Duarte, Max Kaizen, Christine da Silva, Mark Forrester, Jo Duxbury, Jonathan Carter, Adrian Rossouw, Joe Botha, Brenton Furniss, Nicholas Spagnoletti, Glen Veran, Neil Blakey-Milner, Stefano Rivera, Jason Bagley, Rob Gilmour, Jonathan Hitchcock, Rafiq Phillips, Uno de Waal, Andy Rabagliati, Mark Slingsby, Ian Gilfillan, Bradley Whittington, Sam Finnemore, Joe da Silva, Jacques Marneweck, Miguel dos Santos

### Step 4: Content writing — Internship programme story

This is a compelling "founder quality filter" story:
- 450 LinkedIn applicants
- Required: GitHub skills courses + apply via website (not LinkedIn)
- AI used to scan profiles against requirements
- 416 applied directly on LinkedIn without reading requirements
- ~30 had some of what was needed
- Only 2 made it to interview: Brandon Marshall and Seren van der Merve
- Why selected: incredible drive, right attitude, no bad habits
- 3-month intensive unpaid internship with Ash mentoring daily
- Both levelling up faster than Ash has seen anyone level up

### Step 5: Content writing — AI workflow transformation

**Key quote to include:**
> "Technology fuels me. I embrace AI daily — GitHub Copilot, ChatGPT, Claude, and MCP — bringing them together with my love for Figma prototyping, design systems, and GitHub code management. The fusion of AI, creativity, and open source has been a radical, life-changing shift."

**Key stats:**
- New AI workflow only in use since August 2025 (~6 weeks at time of writing)
- Impact: more code, better quality, shorter timeframe, exceptional satisfaction
- Tools: GitHub Copilot, ChatGPT, Claude, MCP (Model Context Protocol), VS Code custom instructions

### Step 6: Update data files

**Files to update:**
1. `/data/mock/pages/about-subpages.ts` — `lightspeedPageData` export
2. `/data/mock/pages/history.ts` — Add new team members (2025 hires), BarCamp 2006 milestone
3. `/data/mock/seo.ts` — Verify LightSpeed page SEO description is accurate

**Content rules:**
- Sentence case for all titles
- He/Him pronouns
- LightSpeed age = "23 years" (not "22+" or "20 years")
- Team size = 13 members
- "Cape Town-based" (not Berlin-based)
- Non-commercial framing — this is Ash's personal portfolio, not a commercial agency site
- Include LightSpeed context as *part of Ash's identity*, not as a sales pitch

---

## Output Format

### Section 1: Current state assessment
- What exists in lightspeedPageData and historyPageData
- Gap list with priority ratings

### Section 2: New content objects
- BarCamp 2006 milestone entry
- Updated team member array (13 members with join dates/roles)
- AI workflow section
- Internship programme highlights
- WordCamp & speaking history
- Updated founding motivation quote

### Section 3: Implementation
- Updated `lightspeedPageData` export
- Updated `historyPageData` with 2025 team additions
- Timeline entries for: 2005 (first employee), 2006 (BarCamp + Warwick), 2009 (Chris), 2010 (Barbara), 2020 (Justin return), 2021 (Lourens + Adam), 2023 (Tibi + Zared), 2025 (Hugo + Brandon + Seren + José)

### Section 4: Accuracy check
- LightSpeed age verified as "23 years" in 2026
- Team count verified as 13
- All dates cross-checked against `website-content.md`

---

## Success Criteria

- [ ] BarCamp 2006 pivot story included in lightspeedPageData
- [ ] Founding motivation quote included
- [ ] All 13 team members listed with join dates and roles
- [ ] AI workflow transformation content included
- [ ] Internship programme story (450 → 2) captured
- [ ] WordCamp Europe 2025 Basel speaker mention present
- [ ] LightSpeed age reads "23 years" (2026)
- [ ] All dates accurate per `website-content.md`
- [ ] All headings in sentence case
- [ ] He/Him pronouns throughout

---

## Key Facts Quick Reference

- **LightSpeed founded:** 2003 (IT support company initially)
- **BarCamp Cape Town 2006:** Pivot to WordPress; Warwick joins Dec 2006
- **WordPress start:** 2006 (post-BarCamp)
- **LightSpeed age in 2026:** 23 years
- **Team size 2026:** 13 members
- **Internship:** Aug–Sep 2025, 450 applicants, 2 selected
- **AI workflow:** Active since August 2025

---

## References

- [website-content.md](../../docs/website-content.md) — Sections: Company History, Team, Internship, Profiles
- [Guidelines.md](../../guidelines/Guidelines.md) — Personal art project scope, sentence case
- [Data System Documentation](../../data/README.md)

---

**Status:** Ready to execute
**Next:** Run audit, write report, then run [03-book-content.md](./03-book-content.md)
