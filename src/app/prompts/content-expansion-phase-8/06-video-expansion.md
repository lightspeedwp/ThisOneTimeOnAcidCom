# Sub-audit 6: Video Expansion

**Parent Orchestrator:** [Content Expansion Phase 8 Orchestrator](./orchestrator.md)  
**Audit Scope:** Expand video collection from 11 to 15+ entries  
**Target Files:** `/data/mock/videos/entries.ts`, `/data/mock/videos/categories.ts`, `/data/mock/videos/tags.ts`  
**Status:** In Progress

---

## Objective

Expand the video collection from **11 entries to 15+ entries** (minimum 4 new videos), ensuring diverse content types, comprehensive storytelling, and alignment with Ash Shaw's artistic identity across UV makeup, cycling, festival culture, web development, cannabis cultivation, and physical training.

---

## Current State Analysis

### Existing Videos (11 total)

1. **vid-1** — Psytrance sticker animation (Creative, 0:15, Featured)
2. **vid-2** — Origin Festival 2026: UV painting highlight reel (Festival, 8:45, Featured)
3. **vid-3** — Ambidextrous painting technique: tutorial (Tutorial, 12:30)
4. **vid-4** — 300km cycle to Origin Festival: time-lapse (Cycling, 5:20, Featured)
5. **vid-5** — UV colour theory: what you see vs what glows (Tutorial, 10:15)
6. **vid-6** — Behind the scenes at Reiser Festival, Czech Republic (Behind-the-Scenes, 15:40)
7. **vid-7** — Berlin summer 2023: cycling between festivals (Cycling, 7:50)
8. **vid-8** — Six Cats garden tour: harvest season 2024 (Documentary, 18:25)
9. **vid-9** — WordPress design system build: time-lapse (Web Dev, 6:30)
10. **vid-10** — Thailand Muay Thai training montage (Documentary, 9:10)
11. **vid-11** — The Cow Man era: throwback festival footage (Documentary, 11:35)

### Category Distribution

Current categories in use (from entries):
- **Creative:** 1 video
- **Festival:** 1 video
- **Tutorial:** 2 videos
- **Cycling:** 2 videos
- **Behind-the-Scenes:** 1 video
- **Documentary:** 3 videos
- **Web Dev:** 1 video

**Note:** Only "Creative" is defined in `categories.ts` — this needs expansion.

### Tag Analysis

Current tags in `tags.ts` (5 total):
- uv, stickers, animation, psytrance, neon

Tags used in entries but not defined in `tags.ts`:
- origin, festival, cape-town, painting, tutorial, technique, ambidextrous, how-to, blacklight, education, cycling, endurance, adventure, birthday, colour-theory, behind-the-scenes, reiser, czech-republic, process, documentary, berlin, nomadic, summer, urban, six-cats, cannabis, organic, cultivation, garden, sustainability, wordpress, design-system, bem, web-development, code, muay-thai, thailand, training, discipline, koh-phangan, fitness, throwback, cow-man, costumes, history

**This represents a significant data integrity issue** — tags are used but not defined.

---

## Content Gaps Identified

### Missing Video Topics (High Priority)

1. **No triathlon content** — Ash is a triathlete but there's no swim/bike/run video
2. **No explicit ADHD neurodivergent content** — Core identity missing
3. **Limited Berlin festival culture** — Only one cycling video, no club painting footage
4. **No Koh Phangan lifestyle documentation** — Training base not represented
5. **No sacred geometry tutorial** — Major design principle missing
6. **No festival setup/teardown logistics** — Behind-the-scenes gap
7. **No collaboration videos** — Always solo content
8. **No "Day in the Life" vlog format** — All content is highly produced
9. **No client transformation before/after compilations** — No testimonial video content
10. **No Q&A or community engagement video** — One-way content only

### Category Gaps

Missing categories that should exist:
- Festival
- Tutorial
- Cycling
- Behind-the-Scenes
- Documentary
- Web Dev
- **Lifestyle** (new)
- **Vlog** (new)
- **Collaboration** (new)
- **Education** (new)

### Geographic/Cultural Gaps

- **Cape Town base** — Only festival footage, no city lifestyle
- **Berlin techno scene** — Underrepresented
- **Koh Phangan training base** — Only one Muay Thai video
- **International festivals** — Only Czech Republic represented outside South Africa

---

## Expansion Strategy

### Phase 1: Add 4 New Videos (Minimum Target)

**New Video 1: "Cape Town dancefloor: weekend in the UV booth"**
- **Category:** Festival / Documentary
- **Duration:** 10-14 minutes
- **Focus:** Weekend painting at local Cape Town clubs (Assembly, Modular, Truth)
- **Themes:** Urban nightlife, local scene, weekend ritual
- **Tags:** cape-town, nightlife, uv, painting, dancefloor, techno

**New Video 2: "Sacred geometry in UV design: tutorial"**
- **Category:** Tutorial / Education
- **Duration:** 15-20 minutes
- **Focus:** Step-by-step sacred geometry tutorial (Flower of Life, Metatron's Cube, Sri Yantra)
- **Themes:** Design principles, geometry, symmetry, spirituality
- **Tags:** sacred-geometry, tutorial, design, mandala, symmetry, education

**New Video 3: "ADHD brain on the dancefloor: neurodivergent creativity"**
- **Category:** Documentary / Educational
- **Duration:** 12-16 minutes
- **Focus:** How ADHD neurology shapes artistic practice, hyperfocus, sensory processing
- **Themes:** Neurodiversity, ADHD, creativity, mental health, self-awareness
- **Tags:** adhd, neurodivergent, creativity, mental-health, dancefloor, self-discovery

**New Video 4: "Koh Phangan remote work routine: balancing art and code"**
- **Category:** Lifestyle / Vlog
- **Duration:** 8-12 minutes
- **Focus:** Day-in-the-life vlog showing morning Muay Thai, WordPress work, beach run, sunset painting
- **Themes:** Digital nomad, remote work, balance, discipline, Thailand
- **Tags:** koh-phangan, thailand, remote-work, digital-nomad, lifestyle, work-life-balance

### Phase 2: Add 1-2 Stretch Videos (Optional — for 16-17 total)

**Stretch Video 1: "Triathlon training for artists: why endurance sports matter"**
- **Category:** Documentary / Fitness
- **Duration:** 10-14 minutes
- **Focus:** Swim/bike/run training philosophy, body-as-tool mindset, discipline + freedom
- **Themes:** Triathlon, endurance, discipline, fitness, body maintenance
- **Tags:** triathlon, swimming, cycling, running, endurance, discipline, fitness

**Stretch Video 2: "Berlin to Prague by bike: festival pilgrimage 2024"**
- **Category:** Cycling / Documentary
- **Duration:** 12-18 minutes
- **Focus:** Multi-day cycle touring from Berlin to Czech psytrance festivals
- **Themes:** Bikepacking, adventure, pilgrimage, endurance, Europe
- **Tags:** cycling, bikepacking, berlin, prague, adventure, europe, festival-pilgrimage

---

## Execution Requirements

### Data File Updates

1. **`/data/mock/videos/entries.ts`** — Add 4-6 new video entries
2. **`/data/mock/videos/categories.ts`** — Expand from 1 to 10 categories
3. **`/data/mock/videos/tags.ts`** — Expand from 5 to 40+ tags (include ALL tags currently used in entries)

### Content Standards (Per Guidelines)

**Mandatory for each video:**
- ✅ Sentence case for all titles and headings
- ✅ Comprehensive `content` field with Markdown (150-300 words minimum)
- ✅ Personal, authentic voice (first-person narrative)
- ✅ Cultural context and storytelling
- ✅ Embedded values (authenticity, discipline, creativity, community)
- ✅ Proper nouns capitalized correctly (Ash, Berlin, Cape Town, Koh Phangan, etc.)
- ✅ He/him pronouns enforced
- ✅ No commercial language (personal art project only)

**Technical requirements:**
- YouTube platform (primary)
- Unsplash thumbnail URLs with relevant search queries
- Realistic duration ranges (tutorials 10-20min, vlogs 8-12min, documentaries 12-18min)
- Realistic view/like counts based on publish date and content type
- `featured: true` on 1-2 new videos maximum

**Storytelling quality:**
- Rich narrative structure (context → process → insight)
- Personal anecdotes and specific memories
- Reflective insights and "lessons learned"
- Connection to broader themes (ADHD, discipline, community, identity)

---

## Success Criteria

### Quantitative Targets

- ✅ **15+ total video entries** (minimum 4 new videos added)
- ✅ **10 categories** defined in `categories.ts` with accurate counts
- ✅ **40+ tags** defined in `tags.ts` (covering all tags used in entries)
- ✅ **3-4 featured videos** total across collection
- ✅ **100% tag coverage** — all tags used in entries are defined in `tags.ts`

### Qualitative Targets

- ✅ **Diverse content types** — Tutorials, documentaries, vlogs, festival footage, cycling adventures
- ✅ **Geographic diversity** — Cape Town, Berlin, Koh Phangan, international festivals
- ✅ **Thematic balance** — UV art, web dev, cycling, training, cannabis, ADHD, lifestyle
- ✅ **Authentic storytelling** — Personal voice, cultural context, emotional resonance
- ✅ **Educational value** — Tutorials and how-tos provide actionable learning
- ✅ **Production-ready content** — All entries could be published as-is

### Data Integrity

- ✅ **No orphaned tags** — All tags in entries are defined in `tags.ts`
- ✅ **Accurate category counts** — `categories.ts` counts match actual entry distribution
- ✅ **Consistent naming** — All slugs follow kebab-case convention
- ✅ **No duplicate IDs** — All video IDs are unique
- ✅ **Valid timestamps** — All `publishedAt` dates are in YYYY-MM-DD format

---

## Implementation Notes

### Writing Style Guidelines

**Voice:** First-person, reflective, authentic. Ash speaks directly to the viewer.

**Tone:** Confident but not arrogant. Knowledgeable but approachable. Passionate but grounded.

**Sentence case enforcement examples:**
```
✅ CORRECT: "Sacred geometry in UV design: tutorial"
❌ WRONG: "Sacred Geometry in UV Design: Tutorial"

✅ CORRECT: "The dancefloor gave me everything"
❌ WRONG: "The Dancefloor Gave Me Everything"

✅ CORRECT: "Berlin to Prague by bike: festival pilgrimage 2024"
❌ WRONG: "Berlin To Prague By Bike: Festival Pilgrimage 2024"
```

### Content Structure Pattern

Each video `content` field should follow this structure:

```markdown
## [Opening Hook — What This Video Is About]

[1-2 sentence overview establishing context and promise]

### [Section 1: Context/Background]

[3-4 sentences providing cultural, personal, or technical context]

### [Section 2: Process/Technique/Story]

[Detailed walkthrough, narrative arc, or instructional content]

### [Section 3: Insight/Reflection]

[Personal insights, lessons learned, broader implications]

> [Blockquote: Core truth or memorable insight]

[Closing paragraph: Call-back to opening theme, future direction, gratitude]
```

### Tag Strategy

**Primary tags** (core identity): uv, psytrance, neon, cycling, web-development, cannabis, muay-thai, adhd

**Location tags**: cape-town, berlin, koh-phangan, thailand, czech-republic, south-africa, europe

**Activity tags**: painting, tutorial, festival, documentary, vlog, behind-the-scenes, training, bikepacking

**Technique tags**: ambidextrous, sacred-geometry, colour-theory, design-system, organic, cultivation

**Culture tags**: techno, dancefloor, digital-nomad, remote-work, neurodivergent, community

---

## Related Documentation

- **Parent Orchestrator:** [Content Expansion Phase 8 Orchestrator](./orchestrator.md)
- **Video Types:** `/data/types/videos.ts`
- **Current Entries:** `/data/mock/videos/entries.ts`
- **Guidelines Reference:** [Sentence Case Rule](../../Guidelines.md#-sentence-case-for-all-headings---critical-rule)
- **Content Philosophy:** [Personal Art Project](../../Guidelines.md#-major-update-v530---personal-art-project)

---

**Next Steps:**
1. Run this audit against current video data
2. Write 4-6 new video entries following all content standards
3. Expand `categories.ts` to include all categories
4. Expand `tags.ts` to include ALL 40+ tags used in entries
5. Save findings to `/reports/content-expansion-phase-8/06-video-expansion-findings.md`
6. Update task list in `/tasks/content-expansion-phase-8-tasks.md`
