# Sitemap & route reference

**Version:** 2.0.0
**Last Updated:** March 4, 2026
**Source of truth:** `/routes.ts` (82 routes)
**Router:** Custom lightweight router at `/lib/router.tsx` (API-compatible with react-router)

---

## 1. Complete route inventory (82 routes)

All routes are flat children of the `RootLayout` component, which provides the persistent Header and Footer shell. Routes are defined in `/routes.ts` and consumed by `RouterProvider` in `/App.tsx`.

### Home

| Path | Component | Dynamic | Nav |
|---|---|---|---|
| `/` | `HomePage` | — | Main nav |

### About (22 routes — gateway + 21 sub-pages)

| Path | Component | Dynamic | Nav |
|---|---|---|---|
| `/about` | `HiddenAboutPage` | — | Main nav (gateway) |
| `/about/journey` | `AboutPage` | — | About dropdown |
| `/about/history` | `HistoryPage` | — | About dropdown |
| `/about/berlin` | `BerlinPage` | — | About dropdown |
| `/about/book` | `BookPage` | — | About dropdown |
| `/about/bio` | `BioPage` | — | About dropdown |
| `/about/process` | `ProcessPage` | — | About dropdown |
| `/about/lucy-in-the-sky-with-diamonds` | `LucyPage` | — | About dropdown |
| `/about/travels` | `TravelsPage` | — | About dropdown |
| `/about/podcast` | `PodcastPage` | — | About dropdown |
| `/about/adhd` | `AdhdPage` | — | About dropdown |
| `/about/cycling` | `CyclingPage` | — | About dropdown |
| `/about/aquarius` | `AquariusPage` | — | About dropdown |
| `/about/music` | `MusicPage` | — | About dropdown |
| `/about/lightspeed` | `LightSpeedPage` | — | About dropdown |
| `/about/education` | `EducationPage` | — | About dropdown |
| `/about/partners` | `PartnersPage` | — | About dropdown |
| `/about/fitness` | `FitnessPage` | — | About dropdown |
| `/about/six-cats` | `SixCatsPage` | — | About dropdown |
| `/about/manifesto` | `ManifestoPage` | — | About dropdown |
| `/about/tribes` | `TribesPage` | — | About dropdown |
| `/about/accessibility` | `AccessibilityStatementPage` | — | Footer |

### Ebook

| Path | Component | Dynamic | Nav |
|---|---|---|---|
| `/ebook` | `EbookPage` | — | About dropdown |

### Portfolio (4 routes)

| Path | Component | Dynamic | Nav |
|---|---|---|---|
| `/portfolio` | `PortfolioMainPage` | — | Main nav |
| `/portfolio/category/:slug` | `PortfolioCategoryPage` | `:slug` | Via portfolio filters |
| `/portfolio/tag/:slug` | `PortfolioTagPage` | `:slug` | Via portfolio tags |
| `/portfolio/:slug` | `PortfolioResolver` | `:slug` | Via gallery card |

### Blog (4 routes)

| Path | Component | Dynamic | Nav |
|---|---|---|---|
| `/blog` | `BlogPage` | — | Main nav |
| `/blog/category/:slug` | `BlogCategoryPage` | `:slug` | Via blog filters |
| `/blog/tag/:slug` | `BlogTagPage` | `:slug` | Via blog tags |
| `/blog/:slug` | `BlogPostPageRoute` | `:slug` | Via blog listing |

### Videos (4 routes)

| Path | Component | Dynamic | Nav |
|---|---|---|---|
| `/videos` | `VideosPage` | — | Main nav |
| `/videos/category/:slug` | `VideoCategoryPage` | `:slug` | Via video filters |
| `/videos/tag/:slug` | `VideoTagPage` | `:slug` | Via video tags |
| `/video/:slug` | `VideoDetailPage` | `:slug` | Via video card |

**Note:** The listing path is `/videos` (plural) but the detail path is `/video/:slug` (singular). This is intentional.

### Podcasts (4 routes)

| Path | Component | Dynamic | Nav |
|---|---|---|---|
| `/podcasts` | `PodcastsPage` | — | Main nav |
| `/podcasts/category/:slug` | `PodcastCategoryPage` | `:slug` | Via podcast filters |
| `/podcasts/tag/:slug` | `PodcastTagPage` | `:slug` | Via podcast tags |
| `/podcast/:slug` | `PodcastDetailPage` | `:slug` | Via podcast card |

**Note:** Same singular/plural pattern as Videos.

### Events (4 routes)

| Path | Component | Dynamic | Nav |
|---|---|---|---|
| `/events` | `EventsPage` | — | Main nav |
| `/events/category/:slug` | `EventCategoryPage` | `:slug` | Via event filters |
| `/events/tag/:slug` | `EventTagPage` | `:slug` | Via event tags |
| `/events/:slug` | `EventDetailPage` | `:slug` | Via event card |

### Standalone pages (11 routes)

| Path | Component | Dynamic | Nav |
|---|---|---|---|
| `/contact` | `ContactPage` | — | Main nav |
| `/press` | `PressKitPage` | — | Footer |
| `/toolkit` | `GearPage` | — | Footer |
| `/next-festival` | `FestivalLandingPage` | — | Main nav |
| `/search` | `SearchResultsPage` | — | Header search |
| `/faq` | `FaqAggregatePage` | — | Footer |
| `/feedback` | `FeedbackPage` | — | Footer |
| `/stickers` | `StickersPage` | — | Main nav |
| `/terms` | `TermsAndConditions` | — | Footer |
| `/privacy` | `PrivacyPolicy` | — | Footer |
| `/sitemap` | `SitemapPage` | — | Footer |

### Style guide

| Path | Component | Dynamic | Nav |
|---|---|---|---|
| `/style-guide` | `StyleGuidePage` | — | Footer |

### Dev tools (25 routes — hub + 24 sub-pages)

| Path | Component | Dynamic | Nav |
|---|---|---|---|
| `/dev-tools` | `DevToolsPage` | — | Footer |
| `/dev-tools/style-guide` | `StyleGuidePage` | — | Dev tools hub |
| `/dev-tools/typography` | `TypographySpecimenPage` | — | Dev tools hub |
| `/dev-tools/spacing` | `SpacingSpecimenPage` | — | Dev tools hub |
| `/dev-tools/shadows` | `ShadowSpecimenPage` | — | Dev tools hub |
| `/dev-tools/radius` | `RadiusSpecimenPage` | — | Dev tools hub |
| `/dev-tools/buttons` | `ButtonSpecimenPage` | — | Dev tools hub |
| `/dev-tools/cards` | `CardSpecimenPage` | — | Dev tools hub |
| `/dev-tools/neon` | `AnimationSpecimenPage` | — | Dev tools hub |
| `/dev-tools/tokens` | `DesignTokensRefPage` | — | Dev tools hub |
| `/dev-tools/icons` | `IconLibraryPage` | — | Dev tools hub |
| `/dev-tools/api` | `ComponentApiPage` | — | Dev tools hub |
| `/dev-tools/playground` | `PlaygroundPage` | — | Dev tools hub |
| `/dev-tools/code-quality` | `CodeQualityPage` | — | Dev tools hub |
| `/dev-tools/deployment` | `DeploymentReadinessPage` | — | Dev tools hub |
| `/dev-tools/analytics` | `AnalyticsDashboardPage` | — | Dev tools hub |
| `/dev-tools/components` | `ComponentShowcasePage` | — | Dev tools hub |
| `/dev-tools/snippets` | `SnippetGeneratorPage` | — | Dev tools hub |
| `/dev-tools/docs` | `DocumentationGeneratorPage` | — | Dev tools hub |
| `/dev-tools/visual-regression` | `VisualRegressionTesterPage` | — | Dev tools hub |
| `/dev-tools/integration` | `IntegrationTesterPage` | — | Dev tools hub |
| `/dev-tools/stickers` | `StickersPage` | — | Dev tools hub |
| `/dev-tools/accessibility` | `AccessibilityTesterPage` | — | Dev tools hub |
| `/dev-tools/performance` | `PerformanceTesterPage` | — | Dev tools hub |
| `/dev-tools/phosphor-icons` | `PhosphorIconsPage` | — | Dev tools hub |

### 404 catch-all

| Path | Component | Dynamic | Nav |
|---|---|---|---|
| `*` | `NotFoundPage` | `*` | N/A |

---

## 2. URL conventions

### Slug format
- All slugs are **kebab-case** (lowercase, hyphens between words)
- Generated from the `slug` field in mock data files
- Example: `"UV blacklight magic"` → `uv-blacklight-magic`

### URL depth
- Maximum 3 segments: `/{section}/{type}/{slug}`
- Example: `/portfolio/category/festival`
- About sub-pages use 2 segments: `/about/{slug}`
- Dev tools use 2 segments: `/dev-tools/{slug}`

### Singular vs plural
- **Listing pages** use plural: `/videos`, `/podcasts`, `/events`
- **Detail pages** use singular for Videos/Podcasts: `/video/:slug`, `/podcast/:slug`
- **Detail pages** use plural for Blog/Portfolio/Events: `/blog/:slug`, `/portfolio/:slug`, `/events/:slug`

### Query parameters

| Route | Parameter | Purpose |
|---|---|---|
| `/blog` | `?category=tutorials` | Pre-filter by category |
| `/search` | `?q=neon` | Search query |
| `/search` | `?type=blog` | Content type filter |
| `/search` | `?sort=recent` | Sort order |
| `/search` | `?category=tutorials` | Sub-filter |

---

## 3. Dynamic URL generation

Dynamic routes resolve their `:slug` parameter from mock data:

| Content type | Slug source | Data file |
|---|---|---|
| Portfolio | `portfolioEntries[i].slug` | `/data/mock/portfolio/*.ts` |
| Blog posts | `blogPosts[i].slug` | `/data/mock/blog/posts.ts`, `posts-timeline.ts` |
| Videos | `videoEntries[i].slug` | `/data/mock/videos/entries.ts` |
| Podcasts | `podcastEpisodes[i].slug` | `/data/mock/podcasts/episodes.ts` |
| Events | `eventEntries[i].slug` | `/data/mock/events/*.ts` |
| Categories | `categories[i].slug` | Per-domain `categories.ts` |
| Tags | `tags[i].slug` | Per-domain `tags.ts` |

Components receiving a `:slug` param use `useParams()` from `/lib/router.tsx` to read it, then look up the matching data entry. If no match is found, the component should redirect to the listing page or show a 404 state.

---

## 4. Breadcrumb patterns

All sub-pages use the `<Breadcrumbs>` component from `/components/ui/Breadcrumbs.tsx`.

| Route | Breadcrumb trail |
|---|---|
| `/about/berlin` | Home > About > Berlin |
| `/portfolio/category/uv-makeup` | Home > Portfolio > UV makeup |
| `/portfolio/tag/neon` | Home > Portfolio > Tag: Neon |
| `/blog/category/tutorials` | Home > Blog > Tutorials |
| `/blog/tag/festival-makeup` | Home > Blog > Tag: Festival makeup |
| `/blog/my-post-slug` | Home > Blog > Post title |
| `/video/my-video` | Home > Videos > Video title |
| `/podcast/intro-episode` | Home > Podcasts > Episode title |
| `/events/origin-festival` | Home > Events > Origin festival |
| `/search?q=neon` | Home > Search > "neon" |
| `/dev-tools/typography` | Home > Developer tools > Typography specimens |

The last breadcrumb item has no `href` (renders as plain text with `aria-current="page"`). Schema.org `BreadcrumbList` JSON-LD is injected automatically.

---

## 5. Navigation hierarchy

```
Header (Main Nav)
├── Home /
├── About /about (dropdown with 21 sub-pages)
├── Portfolio /portfolio (mega menu with categories)
├── Blog /blog (mega menu with categories)
├── Videos /videos
├── Events /events
├── Stickers /stickers
├── Next Festival /next-festival
└── Contact /contact

Footer
├── Home /
├── About /about
├── Portfolio /portfolio
├── Blog /blog
├── Videos /videos
├── Podcasts /podcasts
├── Events /events
├── Contact /contact
├── Press /press
├── Toolkit /toolkit
├── FAQ /faq
├── Feedback /feedback
├── Terms /terms
├── Privacy /privacy
├── Accessibility /about/accessibility
├── Sitemap /sitemap
├── Style Guide /style-guide
└── Dev Tools /dev-tools
```

---

## 6. Router architecture

### Custom router

The project uses a **custom lightweight router** at `/lib/router.tsx` instead of the `react-router` npm package. This was built to eliminate the `async_hooks` runtime error caused by react-router v7 server-side code being loaded via esm.sh in the Figma Make environment.

The custom router exposes the same API surface:
- `createBrowserRouter` — route tree definition
- `RouterProvider` — renders the matched route
- `useNavigate` — programmatic navigation
- `useLocation` — current location object
- `useParams` — dynamic route parameters
- `useSearchParams` — URL query parameters
- `Link` — declarative navigation
- `Outlet` — child route rendering

### Route definition pattern

```tsx
// /routes.ts
import { createBrowserRouter } from './lib/router';
import { RootLayout } from './components/common/RootLayout';
import { HomePage } from './components/pages/home/HomePage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      { index: true, Component: HomePage },
      { path: 'about', Component: HiddenAboutPage },
      // ... all 80+ child routes
      { path: '*', Component: NotFoundPage },
    ],
  },
]);
```

### No lazy loading

All 82 route components are **eagerly imported** at the top of `/routes.ts`. The Figma Make bundler does not reliably support `React.lazy()` or dynamic `import()` for code splitting. This means all page code loads on initial visit, which is acceptable for this project's size.

---

## 7. How to add a new route

### Static page

1. **Create the component** in `/components/pages/{section}/NewPage.tsx`
   - Use named export: `export function NewPage() { ... }`
   - Import and use BEM CSS from `/styles/blocks/new-page.css`
   - Import content from `/data/mock/`
2. **Create the CSS file** at `/styles/blocks/new-page.css`
   - Follow BEM naming: `.new-page`, `.new-page__title`, `.new-page--modifier`
3. **Add SEO data** to `/data/mock/seo.ts`
   - Add entry to `pageSEO` object: `newPage: { title: '...', description: '...' }`
4. **Add the route** to `/routes.ts`
   - Import the component at the top of the file
   - Add `{ path: 'new-page', Component: NewPage }` to the `children` array
5. **Add breadcrumbs** in the component
   - Import `Breadcrumbs` from `/components/ui/Breadcrumbs`
   - Add appropriate breadcrumb items
6. **Add to navigation** if needed
   - Update header nav data in `/data/mock/ui/navigation.ts`
   - Update footer links in `/data/mock/ui/footer.ts`
   - Update sitemap data in `/data/mock/ui/sitemap.ts`
7. **Update this file** with the new route entry
8. **Verify** the route loads correctly in the prototype

### Dynamic page (with `:slug`)

Follow all steps above, plus:
1. Define the `:slug` parameter in the route path
2. In the component, use `useParams()` to read the slug
3. Look up the matching data entry from mock data
4. Handle missing slugs gracefully (redirect to listing page or show error state)
5. Add dynamic SEO using helper functions (e.g., `blogPostSEO()`, `videoSEO()`)

### Category/tag archive page

Follow the same pattern as existing archives:
- Path format: `/{section}/category/:slug` or `/{section}/tag/:slug`
- Component reads `:slug` and filters the data array
- Breadcrumbs show: `Home > Section > Category name`
- Use `ArchiveFilters` component for filter UI

---

**Last Updated:** March 4, 2026