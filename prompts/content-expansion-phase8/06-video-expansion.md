# Sub-audit 6: Video expansion

**Parent:** [orchestrator.md](./orchestrator.md)
**Report:** `/reports/content-expansion-phase8/06-video-expansion.md`

---

## Objective

Polish all 11 existing video entries and expand with new entries. Add per-item FAQs to every entry. Target: 15+ total videos.

---

## Step 1: Audit and polish existing videos

**File:** `/data/mock/videos/entries.ts`

**For each of the 11 existing entries:**

1. **Title** — Sentence case, evocative, specific
2. **Description** — 2–3 sentences minimum, specific to content
3. **Content** — Substantial markdown (300+ words) describing what the video shows, behind-the-scenes context, technique insights
4. **Thumbnail URLs** — Verify all URLs are valid (don't replace working ones)
5. **Video URLs** — Verify format (YouTube/Vimeo embed URLs)
6. **Duration** — Should be realistic
7. **Category/tags** — Consistent naming, check against `/data/mock/videos/categories.ts` and `/data/mock/videos/tags.ts`
8. **Per-item FAQs** — Add `faqs` array (2–3 per video) if missing
9. **Sentence case** — All titles and headings in content

---

## Step 2: Create new video entries

### Known real videos

From `/docs/website-content.md`:
- **Nation of Gondwana 2025** — "a visual experience" (YouTube: https://www.youtube.com/watch?v=9o_GGvEZEio)
- **WordCamp Europe 2025 Basel talk** — "Bridging Design and Development: Figma Design Systems for WordPress Success" (VideoPress: https://videopress.com/v/fSkgvkk0)

### Suggested new video topics (mock/planned)

| # | Title | Category | Description |
|---|---|---|---|
| 1 | "Nation of Gondwana 2025: a visual experience" | Festival | The sights, sounds, and neon of NOG 2025 near Berlin |
| 2 | "UV face painting speed session" | Tutorial | Real-time footage of Ash painting a full face design in under 10 minutes |
| 3 | "The loaded bike: packing for Origin" | Behind the scenes | How Ash fits 40kg of gear onto a gravel bike for a 150km festival ride |
| 4 | "Blacklight reveal compilation" | Showcase | Before/after UV light reveals from multiple festivals |
| 5 | "Neon nail art: the fusion technique" | Tutorial | Step-by-step neon nail art under blacklight |
| 6 | "Berlin open-air painting sessions" | Behind the scenes | Painting faces at Hasenheide Park and Tempelhof open-airs |

### Video entry template

```typescript
{
  id: 'vid-XX',
  slug: 'descriptive-slug',
  title: 'Sentence case title',
  description: 'Two to three sentence description for listings.',
  content: `# Sentence case title

[300+ word content field with behind-the-scenes context, technique discussion, and personal reflections]

## What you'll see

- Key moment 1
- Key moment 2

## Behind the scenes

[Story context]
  `,
  thumbnailUrl: 'UNSPLASH_URL_FROM_TOOL',
  videoUrl: 'https://www.youtube.com/embed/VIDEO_ID',
  platform: 'youtube',
  duration: 'MM:SS',
  category: 'Category',
  tags: ['Tag One', 'Tag Two'],
  featured: false,
  publishedAt: 'YYYY-MM-DD',
  views: NNNN,
  likes: NNN,
  faqs: [
    { id: 'vid-slug-q1', question: 'Question?', answer: 'Answer.' },
    { id: 'vid-slug-q2', question: 'Question?', answer: 'Answer.' },
  ]
}
```

---

## Step 3: Update barrel exports

1. Add new entries to `/data/mock/videos/entries.ts` (or create `entries-phase8.ts`)
2. Update category counts in `/data/mock/videos/categories.ts`
3. Add new tags to `/data/mock/videos/tags.ts`
4. Verify total count ≥ 15

---

## Output

- **Report:** `/reports/content-expansion-phase8/06-video-expansion.md` with:
  - Polish changes for existing 11 videos
  - New videos created (title, slug, date)
  - FAQ count per entry
  - Category/tag updates
  - Real video URLs used vs. mock placeholder URLs
