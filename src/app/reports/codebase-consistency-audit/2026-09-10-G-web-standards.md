# Sub-audit G — Web Standards, SEO, and AI Agent Discoverability

**Date:** 2026-09-10
**Prompt:** `src/app/prompts/codebase-consistency-audit/orchestrator.md`

---

## Findings

| ID | Area | Severity | Description |
|---|---|---|---|
| G-01 | AI discoverability | 🔴 Critical | `robots.txt` is **MISSING** — no file in `src/app/public/` or any public directory. Major crawlers (Google, GPTBot, ClaudeBot, PerplexityBot, CCBot, Google-Extended, Applebot-Extended) have no explicit policy. |
| G-02 | AI discoverability | 🔴 Critical | `llms.txt` is **MISSING** — no file found anywhere. AI agents (Perplexity, ChatGPT Search, Claude Search) have no structured summary for indexing the site's content. Standard: https://llmstxt.org |
| G-03 | Schema coverage | 🟠 High | `Person` schema in `index.html` has only 1 entry in `sameAs` (`instagram.com/ashshaw_makeup`). Missing: other social/professional profiles. Also missing: `Organization`, `WebSite` schema at global level (WebSite is injected per HomePage but not in static HTML). |
| G-04 | Schema coverage | 🟠 High | 53 page components have **no schema injection at all** — including `EventDetailPage.tsx`, `EventsPage.tsx`, `ContactPage.tsx`, all `book-site/` pages, all About sub-pages (BioPage, ManifestoPage, etc.), legal pages, `BookPage.tsx`, `EbookPage.tsx`, `GearPage.tsx`, `PressKitPage.tsx`. Key missing types: `Event`, `Book`, `ContactPage`, `WebPage`. |
| G-05 | OG/social meta | 🟠 High | `og-image.jpg` is **referenced** in `index.html` (`https://ashshaw.com/og-image.jpg`) but the file **does not exist** in `/public/`. Social shares will show a broken image. |
| G-06 | OG/social meta | 🟡 Medium | `og:site_name` and `og:locale` are missing from `index.html`. Should be `og:site_name="Ash Shaw"` and `og:locale="en_GB"` (or `en_ZA`). |
| G-07 | Performance | 🟠 High | **27 Google Font families loaded** across 2 stylesheet requests. The orchestrator flags > 8 families as excessive. This is 3× the threshold. Font requests block rendering and inflate LCP time. The second font URL alone loads 24 families including several that appear to be content-type fallbacks never actually used in the UI (Vampiro One, Rubik Glitch, Anonymous Pro, etc.). |
| G-08 | Performance | 🟠 High | `fetchpriority="high"` is **absent** from all page hero images. Only `Logo.tsx:54` uses `loading="eager"`. No above-the-fold image has `fetchpriority="high"` to signal priority to the browser's preload scanner. |
| G-09 | Performance | 🟠 High | **No route-level code splitting** — no `React.lazy()` or `Suspense` wrappers around page components. All routes are bundled synchronously. With 90+ page components, this significantly inflates initial JS bundle size. |
| G-10 | Accessibility | 🟡 Medium | **14 `<img>` tags without `alt` attributes** across `ImageGallery.tsx`, `PortfolioImage.tsx`, `BlogMegaMenu.tsx`, `PortfolioMegaMenu.tsx`, `EventsPage.tsx`. Missing alt breaks screen readers and is a WCAG 2.2 AA failure. |
| G-11 | Accessibility | 🟡 Medium | **No native skip-to-main-content link** — `RootLayout.tsx` suppresses extension-injected skip links (`extensionErrorSuppressor`) but provides no native one. WCAG 2.4.1 requires a skip navigation mechanism. |
| G-12 | Security headers | 🟡 Medium | `netlify.toml` is missing `Permissions-Policy` header and Content Security Policy (CSP). The existing headers are good (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`) but incomplete for September 2026 best practice. |
| G-13 | Schema | 🟡 Medium | `Person` schema `gender: "Male"` is set in `index.html`. Verify this is intentional and accurate. If the subject prefers not to expose gender, remove this field. |
| G-14 | Sitemap | 🟡 Medium | No static `sitemap.xml` or `robots.txt` exists — only a JavaScript `SitemapPage.tsx` that renders a human-readable page. Crawlers need a machine-readable `sitemap.xml` file at the site root, and `robots.txt` must reference it with a `Sitemap:` directive. |
| G-15 | AI discoverability | 🟡 Medium | `Person` schema has only 1 `sameAs` entry. For AI indexing quality, the `sameAs` array should list all major public profiles: Instagram, TikTok, YouTube, SoundCloud, LinkedIn (if public), Spotify, etc. |
| G-16 | OG / LCP | 🟢 Low | `twitter:card` is `summary_large_image` ✅. `og:type` is `website` ✅. `og:url` is canonical ✅. All pass. |

---

## G.1 — Core Web Vitals Assessment

| Metric | Target | Status |
|---|---|---|
| LCP | < 2.5s | **At risk** — no hero image has `fetchpriority="high"`. 27 font families inflate render-blocking time. |
| INP | < 200ms | **Unknown** — no heavy main-thread work detected in code review, but bundle size (no code splitting) is a risk factor. |
| CLS | < 0.1 | **At risk** — 14 `<img>` without dimensions; font families without `display=swap` could cause layout shift. All Google Font requests have `display=swap` ✅. |
| TTFB | < 800ms | Netlify edge + immutable asset caching configured ✅. |

---

## G.2 — Schema Coverage Summary

**Pages with schema:** 18 (all content archive/detail pages for blog, video, podcast, portfolio)

**Critical gaps:**
- `EventDetailPage.tsx` — no `Event` schema
- `BookPage.tsx` / `EbookPage.tsx` — no `Book` schema
- `PressKitPage.tsx` — no `Organization` or `ProfilePage` schema
- All 9 About sub-pages — no `WebPage` or `ProfilePage` schema
- `ContactPage.tsx` — no `ContactPage` schema
- All `book-site/` pages (11 pages) — no schema at all
- `FestivalLandingPage.tsx` — no `Event` schema
- `SearchResultsPage.tsx` — no `SearchResultsPage` schema

**WebSite schema:** Injected dynamically by `HomePage.tsx` via `buildWebSiteSchema()` — includes `SearchAction` ✅. But not present in static `index.html` — won't be indexed by crawlers that don't execute JS.

---

## G.3 — AI Discoverability

**`robots.txt`:** MISSING — no policy for GPTBot, ClaudeBot, PerplexityBot, CCBot, Google-Extended, Applebot-Extended.

**`llms.txt`:** MISSING — recommended content:
- One-paragraph site description (Ash Shaw — neon/UV makeup art, Berlin festival artist)
- Content inventory: portfolio, blog, podcasts, videos, book, events, about
- Author bio summary
- Preferred citation format
- Contact information (website URL, Instagram)

---

## G.4 — Open Graph

| Check | Status |
|---|---|
| `og:title` | ✅ Set |
| `og:description` | ✅ Set |
| `og:type` = `website` | ✅ |
| `og:url` | ✅ Set |
| `og:image` | ❌ References `/og-image.jpg` but file does not exist |
| `og:image:width` / `:height` | ✅ Set (1200×630) |
| `og:site_name` | ❌ Missing |
| `og:locale` | ❌ Missing |
| `twitter:card` = `summary_large_image` | ✅ |
| `twitter:image` | ❌ Same missing file |

---

## G.5 — Font Loading

27 families loaded across 2 Google Fonts requests. Families flagged as likely unused by the design system (not referenced in CSS token files or `index.html` font variables):
- Vampiro One, Rubik Glitch — novelty fonts, not in any CSS file scanned
- Anonymous Pro — not in CSS token system
- PT Serif, Source Serif Pro, Libre Baskerville — three competing serif choices; only Spectral and Crimson Pro appear in token files
- Montserrat, Raleway — not in CSS token system
- DM Sans — not in CSS token system

**Recommendation:** Audit which families are actually consumed by the CSS token system and remove the rest. Target: ≤ 8 families.

---

## Accepted Exceptions

| Item | Reason |
|---|---|
| `WebSite` schema only in `HomePage.tsx` (not `index.html`) | Acceptable for JS-rendered sites — Google does execute JS. Issue is for crawlers that do not. |
| `PaletteDemoModal.tsx` no schema | Dev tooling component, not a public page |
| `AnimationShowcasePage.tsx` no schema | Dev tooling, accessed via `/dev/animations` |
| `SitemapPage.tsx` no schema | Human-readable sitemap — machine-readable version is a separate TODO |

---

## Recommended Actions

**Critical (do first):**
- **G-01/G-14:** Create `src/app/public/robots.txt` — allow all major crawlers, reference sitemap
- **G-02:** Create `src/app/public/llms.txt` with site summary for AI agents
- **G-05:** Create `og-image.jpg` (1200×630px) in `public/` OR update `index.html` to point to an existing image

**High (do next):**
- **G-07:** Audit Google Font families — remove any not referenced in CSS token system. Target ≤ 8 families.
- **G-08:** Add `fetchpriority="high"` to hero images (at minimum the homepage hero)
- **G-09:** Implement route-level code splitting with `React.lazy()` + `Suspense` on all page components
- **G-04:** Add schema to `EventDetailPage.tsx` (Event), `BookPage.tsx` / `EbookPage.tsx` (Book), About sub-pages (WebPage)

**Medium:**
- **G-06:** Add `og:site_name` and `og:locale` to `index.html`
- **G-10:** Add missing `alt` attributes to 14 `<img>` elements
- **G-11:** Add native skip-to-main-content link to `RootLayout.tsx`
- **G-12:** Add `Permissions-Policy` and basic CSP to `netlify.toml`
- **G-14:** Generate a static `sitemap.xml` file (script or build step)
- **G-15:** Expand `sameAs` in `Person` schema to all public social profiles
