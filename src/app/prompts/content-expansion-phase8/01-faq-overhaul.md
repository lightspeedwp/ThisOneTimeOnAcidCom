# Sub-audit 1: FAQ overhaul

**Parent:** [orchestrator.md](./orchestrator.md)
**Report:** `/reports/content-expansion-phase8/01-faq-overhaul.md`

---

## Objective

Complete overhaul of the FAQ system: audit existing FAQs for accuracy and guideline violations, add per-item FAQs to every content item across all content types, create new page-level FAQ groups for pages that don't have them yet, and ensure the FAQ aggregate page includes all groups.

---

## Step 1: Audit existing FAQs

**Files to audit:**
- `/data/mock/sections/faq.ts` — Global FAQs (6) + page groups (7: home, about, portfolio, blog, videos, podcasts, contact)

**Check each FAQ for:**
1. **Factual accuracy** — Cross-reference against `/docs/website-content.md` and ebook content
2. **Sentence case** — All questions and answers must use sentence case for headings/titles
3. **He/him pronouns** — Ash is male, no "they" or "she"
4. **Location accuracy** — Cape Town (Woodstock), Berlin (May seasonal), Koh Phangan (Sep–Nov), international festivals
5. **Non-commercial language** — No "Book Now", "pricing", "services". This is a personal art project.
6. **Voice consistency** — Warm, personal, authentic. Not corporate or marketing-speak.
7. **Stale content** — Any references to outdated information (e.g., wrong team count, wrong dates)
8. **Content depth** — Answers should be substantive (2–4 sentences minimum), not one-liners

**Report format:**
```
| FAQ ID | Issue | Severity | Fix |
|---|---|---|---|
| collaborations | Outdated team reference | Medium | Update to reflect 2026 data |
```

---

## Step 2: Add per-item FAQs to ALL existing content

All content types already have the `faqs` field in their TypeScript interfaces:
- `BlogPost.faqs` — `/data/types/blog.ts:122`
- `Video.faqs` — `/data/types/videos.ts:27`
- `Podcast.faqs` — `/data/types/podcast.ts:23`
- `PortfolioEntry.faqs` — `/data/types/portfolio.ts:97`
- `Event` — via `editions[].faqs` or top-level FAQ section (check `/data/types/events.ts`)

**For each content item, add 2–3 contextual FAQs:**

### Blog post FAQ examples:
```typescript
faqs: [
  {
    id: 'uv-safety-berlin',
    question: "Are UV paints safe for skin?",
    answer: "Yes — Ash uses only professional-grade, skin-safe UV reactive paints designed for body art. They're water-based, non-toxic, and wash off easily."
  },
  {
    id: 'uv-where-buy',
    question: "Where can I get UV paints?",
    answer: "Ash doesn't sell products — this is a personal art project. However, he recommends researching professional-grade UV body paints from reputable art supply stores."
  }
]
```

### Portfolio entry FAQ examples:
```typescript
faqs: [
  {
    id: 'origin-2026-how-long',
    question: "How long did this makeup take?",
    answer: "Most festival face paintings take 5–15 minutes depending on complexity. Ash works fast and ambidextrously, so even detailed designs happen in the flow of the party."
  }
]
```

**Rules for per-item FAQs:**
- Each FAQ `id` must be globally unique (prefix with content type and slug, e.g., `blog-uv-berlin-q1`)
- Questions should be things a reader would naturally ask about THAT specific piece of content
- Answers must be factually accurate and cross-referenced against source materials
- Never include commercial/booking/pricing language
- Sentence case for all text
- 2–3 FAQs per item minimum

---

## Step 3: Create new page-level FAQ groups

Currently missing FAQ groups for these pages:

| Page | pageId | Suggested FAQ topics |
|---|---|---|
| Stickers | `stickers` | What are the stickers? How are they made? Can I get one? |
| Ebook | `ebook` | What's the ebook about? How many chapters? Is it free? When is the book coming? |
| Events | `events` | How are events listed? Does Ash attend every year? How does he get there? |
| Dev tools | `dev-tools` | What are the dev tools? Who are they for? Can I use them? |
| Gear | `gear` | What's in Ash's kit? What camera does he use? What brushes? |
| Press / Media | `press` | How to credit Ash's work? Media kit availability? Interview requests? |
| Feedback | `feedback` | Are these real testimonials? How can I leave feedback? |
| History | `history` | How long has Ash been painting? When did he start? What's the timeline? |

**Add each group to the `pageFaqGroups` array in `/data/mock/sections/faq.ts`.**

**Update `CATEGORY_LABELS` in `FaqAggregatePage.tsx`** to include the new page IDs.

---

## Step 4: Verify sticker images in FAQ sections

Per the brief: "all pages should have FAQ sections with square images I uploaded to assets and defined in the stickers data file."

**Action:**
1. Check `/data/mock/images/sticker-graphics.ts` for available sticker images
2. Verify that each page's FAQ section component (`FaqSection`) supports sticker image display
3. If sticker images need to be passed to FAQ sections, check how `FaqSection` currently works and whether it accepts an image prop
4. Document which sticker graphic is assigned to which page's FAQ section

---

## Step 5: Update FAQ aggregate page

After adding all new FAQ groups:

1. Verify all new `pageId` values are included in `CATEGORY_LABELS` in `FaqAggregatePage.tsx`
2. Test that the category filter shows all groups
3. Verify search works across new FAQs
4. Count total FAQs and update any UI that displays counts

---

## Output

- **Report:** `/reports/content-expansion-phase8/01-faq-overhaul.md` with:
  - Audit findings table (existing FAQ issues)
  - List of all per-item FAQs added (by content type and count)
  - New page-level FAQ groups created
  - Sticker image assignments
  - Total FAQ count (before and after)
