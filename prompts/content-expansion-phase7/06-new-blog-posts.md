# Sub-Audit 6: New blog posts from website-content.md

**Parent:** [orchestrator.md](./orchestrator.md)
**Created:** March 3, 2026
**Version:** 1.0.0
**Output:** `/reports/content-expansion-phase7/06-new-blog-posts.md`

---

## Objective

Identify and generate 4–6 new blog posts based on the story material in `/docs/website-content.md` that does NOT overlap with the 18 existing posts. These posts should be personal, storytelling-driven, and aligned with the content pillars.

---

## Current Blog Post Inventory (18 posts — DO NOT duplicate)

| Post | Topic pillar | Category |
|---|---|---|
| Origin festival 2026: a psytrance cycle odyssey | UV makeup + cycling | Festival |
| Twenty-three years of LightSpeed | WordPress/tech | Insights |
| The tribes that made me | Community | Insights |
| Six Cats: the green garden begins | Six Cats | Insights |
| Berlin called, I answered | Berlin/travel | Travel |
| Festival makeup survival guide | UV makeup | Tutorial |
| The ultimate UV makeup guide | UV makeup | Tutorial |
| Essential festival makeup packing list | UV makeup | Tutorial |
| Makeup artistry in Thailand festivals | Thailand | Travel |
| Colour theory for makeup artists | UV makeup | Education |
| Eco-friendly glitter guide | UV makeup | Tutorial |
| The dancefloor gave me everything | Festivals | Insights |
| Costume evolution: from chicken man to UV artist | Identity/costumes | Insights |
| Eighty-six hours: solar eclipse festival Zambia | Festivals | Travel |
| Half colours: 2 o'clock club provincial champion | Cycling | Insights |
| Seven thousand kilometres of Thailand bicycle adventures | Thailand/cycling | Travel |
| Wired different: ADHD as superpower | Identity/ADHD | Insights |
| Neon revelations: the birth of a UV art form | UV makeup | Insights |

---

## New Content Available in `website-content.md`

The following topics are NOT yet covered in the 18 existing posts:

1. **The internship programme story** — 450 applicants → 2 selected. The quality filter. The "no bad habits" philosophy.
2. **Six Cats cat biographies** — The cats as co-founders of the creative life. Individual personality stories.
3. **BarCamp 2006: the accidental WordPress pivot** — How a single event redirected 20+ years of a career.
4. **The founding philosophy** — "I didn't like working for an employer." Designing your own life.
5. **The book announcement / teaser** — "This one time on acid..." What the book is and why it's being written.
6. **Lucy the cat: a tribute** — Lucy passed 24 October 2023. Her role as welcoming committee, her personality, what she meant.
7. **The AI workflow transformation** — August 2025: GitHub Copilot, Claude, MCP and why everything changed.
8. **The yearly cycle: a creative life by design** — Cape Town → Berlin → Thailand → back. Why this pattern exists.

---

## Audit Steps

### Step 1: Assess feasibility of each candidate

For each of the 8 candidates above:
1. **Content depth:** Is there enough in `website-content.md` to write a 400–800 word post?
2. **Standalone value:** Does it read well without external context?
3. **Pillar alignment:** Which content pillar does it serve?
4. **Date:** What is a historically accurate backdate?
5. **Audience:** Who is this post for?
6. **Overlap risk:** Any overlap with existing 18 posts?

### Step 2: Select 4–6 posts

**Selection criteria:**
- Fills a genuine gap in the current content mix
- Has sufficient source material in `website-content.md`
- Adds personality and depth — not just information
- Chronologically spread (don't cluster all in 2025)
- Diverse pillars (don't add 4 WordPress/tech posts)

**Target pillar distribution for new posts:**
- Six Cats: 1 post (cat tribute or cultivation)
- WordPress/tech: 1–2 posts (BarCamp or AI workflow)
- Personal/identity: 1–2 posts (yearly cycle, founding philosophy, or book)
- Cycling/endurance: 0 (well covered already)
- UV makeup/festivals: 0–1 (already 10 posts in this area)

### Step 3: Generate post metadata

For each selected post, define:
- **id** (kebab-case, unique)
- **slug** (URL-friendly, descriptive)
- **title** (sentence case)
- **excerpt** (2–3 sentences, hooks the reader)
- **category** (Education / Tutorial / Festival / Travel / Insights)
- **tags** (3–5 relevant tags)
- **date** (backdated, historically accurate)
- **readingTime** (calculated from estimated word count)
- **featured** (yes/no)
- **author** (Ash Shaw)

### Step 4: Write full post content

For each selected post, write the complete `content` field (markdown):
- 400–800 words
- Personal, first-person voice
- Sentence case headings (## subheadings)
- He/Him perspective (written as Ash)
- Specific details from `website-content.md`
- No commercial language
- No hardcoded links that would break (use descriptive references)

### Step 5: Recommended images

For each post, suggest an Unsplash search query for the featured image. The image should:
- Be relevant to the post topic
- Not be identical to existing post images
- Match the neon/dark aesthetic of the site where possible

---

## Candidate Analysis Quick Reference

### Candidate A: BarCamp 2006
- **Proposed title:** "The event that changed everything: BarCamp Cape Town 2006"
- **Pillar:** WordPress/tech
- **Estimated date:** 2006-11-01 (backdate to the year of the event)
- **Source:** website-content.md — LightSpeed Company History, BarCamp section
- **Why this post:** Foundational brand narrative; personalises the tech career origin
- **Word count estimate:** 500–700 words

### Candidate B: Founding philosophy
- **Proposed title:** "Designing your own life: why I started a business at 22"
- **Pillar:** Personal/identity
- **Estimated date:** 2004-06-01 (backdate — reflects early years post-founding)
- **Source:** website-content.md — Founding Motivation section
- **Why this post:** Authentic entrepreneurship story that complements the LightSpeed history post
- **Word count estimate:** 400–600 words

### Candidate C: Lucy the cat tribute
- **Proposed title:** "Lucy: our welcoming committee (2003–2023)"
- **Pillar:** Six Cats
- **Estimated date:** 2023-11-01 (shortly after she passed, 24 Oct 2023)
- **Source:** website-content.md — Six Cats section, In Memoriam: Lucy
- **Why this post:** Emotional, human, different tone from other posts; personal and specific
- **Word count estimate:** 400–500 words

### Candidate D: AI workflow transformation
- **Proposed title:** "How AI changed everything at LightSpeed (August 2025)"
- **Pillar:** WordPress/tech
- **Estimated date:** 2025-09-01 (shortly after the ~6 weeks described)
- **Source:** website-content.md — Team & Workflow, AI Workflow sections
- **Why this post:** Timely, relevant, authentic first-person account of embracing AI
- **Word count estimate:** 600–800 words

### Candidate E: Book teaser
- **Proposed title:** "This one time on acid… — announcing the book"
- **Pillar:** Personal/identity
- **Estimated date:** 2025-12-01 (end of year reflection)
- **Source:** website-content.md — Book section
- **Why this post:** Intriguing hook; different from any existing post; generates curiosity
- **Word count estimate:** 400–500 words

### Candidate F: Yearly cycle
- **Proposed title:** "Cape Town, Berlin, Koh Phangan — a life designed on purpose"
- **Pillar:** Personal/identity / Travel
- **Estimated date:** 2024-03-01
- **Source:** website-content.md + Guidelines.md yearly cycle description
- **Why this post:** Explains the lifestyle that underpins everything; answers the "where does he live?" question
- **Word count estimate:** 500–700 words

---

## Output Format

### Section 1: Current blog analysis
- 18 existing posts by pillar
- Gap areas identified

### Section 2: Candidate assessment
- All 8 candidates evaluated
- Selected 4–6 with rationale for each choice (and why others were excluded)

### Section 3: Post metadata (for `/data/mock/blog/posts.ts` additions)
Full BlogPost object for each selected post, ready to add to posts.ts

### Section 4: Pillar balance after additions
- Table showing pillar distribution: before (18 posts) → after (22–24 posts)

---

## Writing Voice Guidelines

These posts are written as Ash, in first person:
- Direct, personal, specific
- Not marketing copy — storytelling
- Vulnerable where appropriate (ADHD struggles, life design choices)
- Enthusiastic about community, tech, creativity
- Cape Town-rooted; Berlin adventurer; Thai trainee
- Swears occasionally (authentic voice), but tastefully
- Sentence case headings always
- He/Him perspective

---

## Success Criteria

- [ ] 4–6 new posts selected with clear rationale
- [ ] No topic overlap with existing 18 posts
- [ ] All titles in sentence case
- [ ] All dates historically accurate and backdated appropriately
- [ ] Content pillars balanced (no over-indexing on any one pillar)
- [ ] Full post content written (400–800 words each)
- [ ] Each post has: id, slug, title, excerpt, content, author, date, tags, category, readingTime, featured
- [ ] All He/Him pronouns
- [ ] No commercial language
- [ ] Image suggestions included

---

## References

- [website-content.md](../../docs/website-content.md) — Source material
- [blog/posts.ts](../../data/mock/blog/posts.ts) — Existing posts (reference for format)
- [Guidelines.md](../../guidelines/Guidelines.md) — Sentence case, pronouns, personal art project scope
- [social-media-guidelines.md](../../docs/social-media-guidelines.md) — Content pillars and voice

---

**Status:** Ready to execute
**This is the final sub-audit for Phase 7. After completing, create the consolidated task list at `/tasks/content-expansion-phase7-tasks.md`.**
