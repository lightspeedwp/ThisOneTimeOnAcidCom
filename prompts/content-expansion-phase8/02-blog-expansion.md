# Sub-audit 2: Blog expansion (35 → 50 posts)

**Parent:** [orchestrator.md](./orchestrator.md)
**Report:** `/reports/content-expansion-phase8/02-blog-expansion.md`

---

## Objective

Polish all 35 existing blog posts for voice, accuracy, and imagery. Then create
15 new posts to reach 50 total, backdated logically from 2019–2026. Every post
(existing and new) must have 2–3 per-item FAQs.

---

## Step 1: Polish existing blog posts

**Files:**

- `/data/mock/blog/posts.ts` — Primary post file
- `/data/mock/blog/posts-timeline.ts` — Timeline expansion posts (12 posts added in Phase 7)

## For each of the 35 existing posts, check and fix

1. **Voice** — First-person where appropriate, authentic Ash voice, not corporate/generic. Cross-reference `/docs/website-content.md` for tone.

1. **Factual accuracy** — Dates, locations, team counts, festival names. Berlin arrival = 2019 (NOT 2016). Origin cycling pilgrimages: 2020, 2022, 2023, 2026.

1. **Sentence case** — All titles and headings

1. **Content depth** — Expand thin posts slightly (aim for 300–600 word `content` fields minimum). Add a paragraph or two where content feels rushed.

1. **Images** — Use `unsplash_tool` to find NEW relevant Unsplash images where current images are generic or missing. NEVER replace existing images that work well.

1. **Excerpt quality** — Each excerpt should be compelling and give a taste of the post, 1–2 sentences.

1. **Tags and categories** — Ensure consistent tag naming across all posts. Check against `/data/mock/blog/tags.ts` and `/data/mock/blog/categories.ts`.

1. **Per-item FAQs** — Add `faqs` array (2–3 items) to every post that doesn't already have them.

---

## Step 2: Create 15 new blog posts (total: 50)

### Content sourcing

Mine these sources for post ideas:

- `/docs/website-content.md` — Rich material on Six Cats, LightSpeed, education, fitness, identity, philosophy, travel
- `/data/mock/pages/ebook-pages.ts` — Ebook chapters contain stories that can be extracted into standalone blog posts
- Existing content gaps identified in Phase 7

### Suggested new post topics (choose 15)

**2019 era:**

1. "First brush with neon" — The story of picking up UV paint for the first time (July 2019)

1. "Why Koh Phangan keeps calling" — First Muay Thai training season, the island's magic

**2020 era:**

1. "When the music stopped" — COVID lockdown reflections, creative pivot

1. "The loaded bike to Origin" — First cycling pilgrimage to Origin Festival (2020)

**2021 era:**

1. "Learning to paint with both hands" — The ambidextrous technique development

1. "Living soil, living art" — Six Cats cultivation as creative practice

**2022 era:**

1. "AfricaBurn on two wheels" — The loaded bike to AfricaBurn (if he attended)

1. "Woodstock studio life" — Setting up the creative base in Cape Town

**2023 era:**

1. "Berlin summer diaries" — Open-airs in Hasenheide, Tempelhof sunsets, cycling the Spree

1. "Saying goodbye to Lucy (the cat)" — Tribute to Lucy the cat (passed October 2023)

1. "Nation of Gondwana: paint and acid" — First NOG experience

**2024 era:**

1. "WordCamp Europe Torino: the volunteer year" — WCEU 2024 volunteering

1. "The nomad's checklist" — How Ash packs for festival cycling pilgrimages

**2025 era:**

1. "900 kilometres of dancing" — Berlin summer 2025 dancing record

1. "WordCamp Europe Basel: bridging design and development" — Speaking at WCEU 2025

1. "The fairy lights bike" — How the illuminated bike became a Berlin icon

1. "Nail art meets neon" — The fusion of nail art and UV face painting

1. "Miss Scott saw it first" — Tribute to the teacher who recognised his potential

1. "The 2 o'clock club" — School days, being different, finding your own path

1. "Wetu, Indaba, and the travel tech connection" — LightSpeed at Indaba 2025

**2026 era:**

1. "300 kilometres for a birthday" — The epic Origin 2026 cycling pilgrimage

1. "The artist's lifestyle" — Exploring what it means to live as an artist (from website-content.md)

1. "Mentoring the next generation" — LightSpeed internship program and the new interns

1. "The cumulative effect" — The central thesis: it's never one thing

### Post structure template

```typescript
{
  id: 'blog-XX',
  slug: 'descriptive-slug',
  title: 'Sentence case title',
  excerpt: 'One to two compelling sentences.',
  content: `# Sentence case title

Opening paragraph that hooks the reader...

## Section heading in sentence case

Body content with Ash's authentic voice. Reference real places, people, events.
Use markdown formatting: **bold**, *italic*, blockquotes, lists.

> Pull quote in Ash's voice

## Another section

More content...

---

*Originally written [month year]. Updated [month year].*
  `,
  featuredImage: {
    src: 'UNSPLASH*URL*FROM_TOOL',
    alt: 'Descriptive alt text',
  },
  publishedAt: '2024-06-15',
  category: 'Category Name',
  tags: ['Tag One', 'Tag Two'],
  readTime: 5,
  featured: false,
  faqs: [
{ id: 'blog-slug-q1', question: 'Contextual question?', answer: 'Substantive
answer.' },
{ id: 'blog-slug-q2', question: 'Another question?', answer: 'Another answer.'
},
  ]
}

```text

### Date distribution guidelines

- Spread posts logically across 2019–2026
- More posts in recent years (2024–2026) than early years
- No more than 3 posts in any single month
- Align festival/event posts with actual event dates (e.g., Origin = late January/February, NOG = July, WCEU = June)
- Timeline posts from Phase 7 already cover 2016–2025 — don't overlap topics

---

## Step 3: Update barrel exports

After adding new posts:

1. If using a new file (e.g., `posts-phase8.ts`), import and spread into the main `blogPosts` array in `/data/mock/blog/index.ts`

1. Update category counts in `/data/mock/blog/categories.ts`

1. Add any new tags to `/data/mock/blog/tags.ts`

1. Verify total count matches target (50)

---

## Output

- **Report:** `/reports/content-expansion-phase8/02-blog-expansion.md` with:
- List of all 35 polished posts (changes made per post)
- List of all 15 new posts (title, slug, date, category)
- FAQ count added
- New tags/categories created
- Image changes (new Unsplash URLs used)
