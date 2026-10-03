# Sub-audit 8: New about sub-pages

**Parent:** [orchestrator.md](./orchestrator.md)
**Report:** `/reports/content-expansion-phase8/08-about-subpages.md`

---

## Objective

Create new about sub-pages for topics that have rich ebook content but no dedicated page. Assess existing pages for completeness. Register new routes and update navigation data.

---

## Current state

**21 existing about sub-pages:**

| Page | File | Topic |
|---|---|---|
| AboutPage | `AboutPage.tsx` | Main journey page (ChapterNav + scroll spy) |
| HiddenAboutPage | `HiddenAboutPage.tsx` | Landing page linking to all sub-pages |
| AdhdPage | `AdhdPage.tsx` | ADHD & neurodivergence |
| AquariusPage | `AquariusPage.tsx` | Aquarian identity |
| BerlinPage | `BerlinPage.tsx` | Berlin life |
| BioPage | `BioPage.tsx` | Biography |
| BookPage | `BookPage.tsx` | The book project |
| CyclingPage | `CyclingPage.tsx` | Cycling & bikepacking |
| EbookPage | `EbookPage.tsx` | Full ebook reader |
| EducationPage | `EducationPage.tsx` | Education & school |
| FitnessPage | `FitnessPage.tsx` | Fitness & sport |
| HistoryPage | `HistoryPage.tsx` | Timeline history |
| LightSpeedPage | `LightSpeedPage.tsx` | LightSpeed agency |
| LucyPage | `LucyPage.tsx` | Lucy in the Sky |
| ManifestoPage | `ManifestoPage.tsx` | Personal manifesto |
| MusicPage | `MusicPage.tsx` | Music & dance |
| PartnersPage | `PartnersPage.tsx` | Partners & relationships |
| PodcastPage | `PodcastPage.tsx` | About the podcast |
| ProcessPage | `ProcessPage.tsx` | Creative process |
| SixCatsPage | `SixCatsPage.tsx` | Six Cats cannabis club |
| TravelsPage | `TravelsPage.tsx` | Travels & nomad life |
| TribesPage | `TribesPage.tsx` | The tribes |

---

## Step 1: Assess existing page completeness

For each existing page, check:
1. Does the data file have substantial content or is it thin?
2. Does the page component render all available data?
3. Is the content aligned with Phase 7 ebook updates?
4. Are there FAQs on each page (via FaqSection)?

**Priority assessment pages:**
- **AdhdPage** — Is it complete? Does it cover all ADHD content from the ebook and `/docs/website-content.md`?
- **SixCatsPage** — Does it include individual cat profiles? The source material has detailed bios for all 6 current cats + 3 in memoriam
- **FitnessPage** — Does it include the running achievements, Muay Thai details, swimming/Lourens updates from Phase 7?
- **TravelsPage** — Does it reflect the full nomad circuit rewrite from Phase 7?

---

## Step 2: Create new about sub-pages

### Proposed new pages

| Page | Slug | Topic | Content source |
|---|---|---|---|
| AmbidextrousPage | `/about/ambidextrous` | The ambidextrous painting technique | Ebook + website-content.md (ADHD section) |
| FestivalKitPage | `/about/festival-kit` | What's in the bag — the complete touring kit | Website-content.md (cycling/touring kit section) |
| AiWorkflowPage | `/about/ai-workflow` | AI tools, mentoring the team, the LightSpeed evolution | Website-content.md (AI & Modern Workflow section) |
| GradingSystemPage | `/about/grading-system` | Six Cats cannabis grading system | Website-content.md (Grading System section) |
| CatProfilesPage | `/about/the-cats` | Individual cat bios — Timmy, Wendy, Jimmy, Bean, Jeff, Frank + In Memoriam | Website-content.md (Six Cats — The Cats section) |

### For each new page, create:

1. **Data file** in `/data/mock/pages/about/` (e.g., `ambidextrous.ts`)
2. **Page component** in `/components/pages/about/` (e.g., `AmbidextrousPage.tsx`)
3. **Route** in the router (follow existing about sub-page route pattern)
4. **Navigation entry** in `/data/mock/pages/hidden-about.ts` (HiddenAboutPage links)
5. **SEO entry** in `/data/mock/seo.ts`
6. **Breadcrumbs** using the Breadcrumbs component
7. **CSS** in `/styles/blocks/about-subpage.css` (reuse existing about sub-page BEM classes)

### Data file template

```typescript
/**
 * @fileoverview [Topic] about sub-page data
 * @module data/mock/pages/about/[slug]
 * @version 1.0.0
 */

export const [pageName]Data = {
  hero: {
    title: 'Sentence case title',
    subtitle: 'One-line subtitle',
    description: 'Two to three sentence overview.',
  },
  sections: [
    {
      id: 'section-1',
      title: 'Section heading in sentence case',
      content: 'Paragraph content...',
      image: {
        src: 'UNSPLASH_URL',
        alt: 'Descriptive alt text',
      },
    },
    // ... more sections
  ],
  pullQuotes: [
    {
      text: 'A memorable quote from Ash about this topic.',
      attribution: 'Ash Shaw',
    },
  ],
  faqs: [
    {
      id: '[slug]-q1',
      question: 'Contextual question?',
      answer: 'Substantive answer.',
    },
  ],
};
```

### Page component template

Follow the pattern established by existing about sub-pages:
- Import `HeroLayout`, `ContentSection`, `SplitContent`, `FaqSection`, `PullQuote`, `Breadcrumbs`
- Import CSS: `about-subpage.css`
- Use `setSEO()` and `pageSEO` in `useEffect`
- Include Breadcrumbs: `Home > About > [Page Name]`
- BEM classes only (no Tailwind)
- Bundler-safe syntax (var declarations, no arrow functions in callbacks, no destructuring)

---

## Step 3: Update navigation and routing

1. **Router** — Add routes for new pages in `/App.tsx` or route config (follow existing pattern)
2. **HiddenAboutPage** — Add entries to `/data/mock/pages/hidden-about.ts` with icon, tagline, and link for each new page
3. **Sitemap** — Add pages to `/data/mock/ui/sitemap.ts` if applicable
4. **SEO** — Add `pageSEO.[slug]` entries to `/data/mock/seo.ts`
5. **Icon mapping** — Add Phosphor icon mapping in `HiddenAboutPage.tsx` `getIcon()` function

---

## Step 4: Update about sub-page count

After creating new pages:
1. Update any documentation referencing "21 sub-pages" to the new count
2. Update `Guidelines.md` component architecture if the count is referenced there
3. Update `/guidelines/sitemap-routes.md` with new routes

---

## Output

- **Report:** `/reports/content-expansion-phase8/08-about-subpages.md` with:
  - Existing page assessment (completeness scores)
  - New pages created (name, slug, route, data file, component file)
  - Routes registered
  - Navigation data updated
  - Total about sub-page count (before and after)
  - Any existing pages that need content updates (deferred items)
