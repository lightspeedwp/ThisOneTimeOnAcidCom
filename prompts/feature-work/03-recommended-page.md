# Sub-audit 3: Resources page (getting started guide)

**Parent:** [orchestrator.md](./orchestrator.md)
**Status:** COMPLETE — March 8, 2026
**Report:** [/reports/feature-work/03-resources-page.md](../../reports/feature-work/03-resources-page.md)

---

## Resolved questions

| Question | Answer |
|---|---|
| What is this page? | Option B: Getting started resources for aspiring face painters |
| Route? | `/about/resources` |
| Navigation? | Discoverable via `/about` landing and sitemap |
| Cross-reference gear? | Yes |
| Brands to mention? | L'Oreal, Revlon, Essence, Make-Up Studio, Maybelline |

## Implementation

- **Data:** `/data/mock/pages/about/resources.ts`
- **Component:** `/components/pages/about/ResourcesPage.tsx`
- **CSS:** `/styles/blocks/resources-page.css`
- **Route:** `/about/resources` in `routes.ts`
- **SEO:** `pageSEO.resources` in `/data/mock/seo/pages.ts`
- **Sitemap:** Updated `pageTaglines` in `/data/mock/ui/sitemap.ts`
- **About landing:** Added card in `/data/mock/pages/hidden-about.ts`

## Note on concept split

The original prompt offered options A (recommended artists), B (resources), C (inspiration gallery), and D (hybrid). Ash clarified:
- Option A (recommended artists) = existing `/about/music` page
- Option B (getting started) = this new `/about/resources` page
- Option C (inspiration gallery) = will contain AI-prompted concept images for events — future work, not part of this sub-audit
