# Sub-audit 3: Podcast expansion (8 → 15 episodes with transcripts)

**Parent:** [orchestrator.md](./orchestrator.md)
**Report:** `/reports/content-expansion-phase8/03-podcast-expansion.md`

---

## Objective

Polish all 8 existing podcast episodes. Create 7 new episodes to reach 15 total. Write full transcripts for ALL 15 episodes so Ash can record them. Each episode gets 2–3 per-item FAQs.

---

## Step 1: Audit existing episodes

**File:** `/data/mock/podcasts/episodes.ts`

**Check each of the 8 existing episodes for:**
1. **Voice** — Natural spoken-word tone, conversational, as if Ash is talking to a friend
2. **Content depth** — The `content` field should have substantial markdown content (500+ words)
3. **Description quality** — Short, punchy, podcast-listing-style descriptions
4. **Duration accuracy** — Durations should match content length (rough estimate: 150 words/minute of speech)
5. **Category/tag consistency** — Check against `/data/mock/podcasts/categories.ts` and `/data/mock/podcasts/tags.ts`
6. **Per-item FAQs** — Verify existing FAQs, add if missing (2–3 per episode)
7. **Sentence case** — All titles

---

## Step 2: Write full transcripts for existing episodes

**Add the `transcript` field** to each existing episode. The Podcast type already supports it:
```typescript
transcript?: string;
```

### Transcript format

```typescript
transcript: `## Episode [N]: [Title]

**Host:** Ash Shaw
**Recorded:** [Date]
**Duration:** [Duration]

---

**[Ash]:** [Opening greeting and episode intro — warm, personal, like talking to a friend at a festival afterparty]

[Main content following the episode's content field but expanded into natural spoken-word format]

**[Ash]:** [Section transitions should feel organic, not scripted]

[Include natural speech patterns: "So here's the thing...", "Look, I'm not gonna lie...", "And that's when it hit me...", "Right?"]

[For guest episodes, format as dialogue:]
**[Ash]:** Question or comment
**[Guest Name]:** Response

**[Ash]:** [Closing — thanks, preview of next episode, sign-off]

---

*Neon vs Atomic Black — a podcast by Ash Shaw*
*Follow on Instagram: @ashshaw.makeup*`
```

### Transcript guidelines

- **Length:** 2,000–4,000 words per episode (roughly 12–25 minutes of speech)
- **Voice:** Conversational, unscripted feel. Ash talks like he writes — honest, energetic, tangential in the best way
- **Structure:** Natural flow with clear topic transitions, not bullet-point reading
- **Anecdotes:** Weave in specific stories from `/docs/website-content.md` and ebook content
- **Callbacks:** Reference previous episodes where relevant ("Remember in episode 3 when I talked about...")
- **Sign-off:** Each episode ends with a consistent closing (develop a signature sign-off)

---

## Step 3: Create 7 new episodes (total: 15)

### Suggested episode topics

**Season 1 continuation (episodes 9–15):**

| Ep | Title | Topic | Guests |
|---|---|---|---|
| 9 | "The loaded bike" | Cycling to festivals with a 40kg pack — Origin, Stormsvlei, Thailand | None |
| 10 | "Six Cats and the green garden" | Cannabis cultivation as creative practice, the cats, the community | None |
| 11 | "LightSpeed: 22 years of building" | The company story: BarCamp, WordPress, the team, AI workflow | None (or Warwick Booth as guest) |
| 12 | "Wired different" | ADHD, Aquarius, and how the brain that didn't fit school built a career | None |
| 13 | "The cumulative effect" | The central thesis: it's never one thing. Stories that illustrate this. | None |
| 14 | "Festival kit masterclass" | What's in the bag: paints, brushes, mirror stand, camping gear, bike setup | None |
| 15 | "Season finale: where to next" | Reflection on Season 1, upcoming plans, Organik preview, the book | None |

### Episode structure template

```typescript
{
  id: 'pod-N',
  slug: 'descriptive-slug',
  title: 'Sentence case title',
  description: 'One punchy sentence for podcast listings.',
  content: `# Sentence case title

[Substantial markdown content — 500+ words summarising the episode topics, key points, and takeaways. This is the "show notes" version.]

## Topics covered

- Topic one
- Topic two

## Key quotes

> "Pull quote from the episode"

## Resources mentioned

- [Link text](url) — description
  `,
  audioUrl: 'https://example.com/podcasts/episode-N.mp3',
  duration: 'MM:SS',
  episodeNumber: N,
  seasonNumber: 1,
  category: 'Category',
  tags: ['Tag One', 'Tag Two'],
  publishedAt: 'YYYY-MM-DD',
  featured: false,
  coverImage: {
    src: 'UNSPLASH_URL_FROM_TOOL',
    alt: 'Descriptive alt text'
  },
  guests: [],
  transcript: `## Episode N: Title

**Host:** Ash Shaw
**Recorded:** [Month Year]
**Duration:** [Duration]

---

[Full transcript — 2,000–4,000 words]

---

*Neon vs Atomic Black — a podcast by Ash Shaw*`,
  faqs: [
    { id: 'pod-N-q1', question: 'Question?', answer: 'Answer.' },
    { id: 'pod-N-q2', question: 'Question?', answer: 'Answer.' },
  ]
}
```

### Date distribution

- Episodes 1–8 are already dated Feb–March 2026
- New episodes 9–15 should be dated March–June 2026 (biweekly cadence)
- Alternatively, backdate some episodes to create a more natural timeline

---

## Step 4: Update barrel exports

1. Add new episodes to `/data/mock/podcasts/episodes.ts` (or create `episodes-season1b.ts` and import)
2. Update category counts in `/data/mock/podcasts/categories.ts`
3. Add any new tags to `/data/mock/podcasts/tags.ts`
4. Verify total count = 15

---

## Output

- **Report:** `/reports/content-expansion-phase8/03-podcast-expansion.md` with:
  - Polish changes for existing 8 episodes
  - 7 new episodes listed (title, date, duration, topic)
  - Transcript word counts per episode
  - Total FAQ count
  - Category/tag changes
