# Sub-audit 3 — Routes and URLs

**Parent:** [orchestrator.md](./orchestrator.md)
**Report:** `/reports/project-stability-audit/03-routes-urls.md`

---

## Context

Every page component must be wired to a route in `/routes.ts` and loaded via `RouterProvider` in `/App.tsx`. Missing or misconfigured routes cause blank screens, 404 errors, or unreachable pages. This audit produces a complete route inventory and identifies broken links.

---

## Step 1 — Route inventory

Read `/routes.ts` in full. For every route definition, record:

| Path | Component | Layout parent | Dynamic segments | Lazy loaded? | Index route? |
|---|---|---|---|---|---|
| `/` | `HomePage` | `RootLayout` | None | No | Yes |
| `/about` | `AboutPage` | `RootLayout` | None | No | No |
| `/portfolio/:slug` | `PortfolioDetailPage` | `RootLayout` | `:slug` | No | No |
| `*` | `NotFoundPage` | `RootLayout` | N/A | No | No |

**Checks:**
- [ ] Every route has a valid `Component` that exists as a file
- [ ] Every route's import path resolves without errors
- [ ] Nested routes have correct parent-child relationships
- [ ] There is exactly one catch-all `*` route
- [ ] There is exactly one index route (`index: true`)
- [ ] No duplicate paths

---

## Step 2 — Orphaned page detection

Cross-reference the route inventory against all page components:

- [ ] List every `.tsx` file in `/components/pages/` (recursively)
- [ ] For each page component, check if it appears in `/routes.ts`
- [ ] Flag any page component with NO route (orphaned page)
- [ ] Flag any route pointing to a non-existent component (broken route)

---

## Step 3 — Internal link audit

Search all `.tsx` files for link targets and navigation calls:

### `<Link to="...">` patterns
- [ ] Extract every `to` prop value
- [ ] Verify each matches a defined route path
- [ ] Check dynamic segments are properly interpolated (e.g., `/blog/${slug}`)
- [ ] Flag hardcoded URLs that don't match any route

### `useNavigate()` / `navigate()` calls
- [ ] Extract every navigation target
- [ ] Verify each matches a defined route path

### Breadcrumb `href` values
- [ ] Extract every breadcrumb item's `href`
- [ ] Verify each matches a defined route path
- [ ] Verify the last breadcrumb item has NO `href` (current page)

### Data file link references
- [ ] Check mock data files for any `url`, `href`, `link`, or `slug` fields
- [ ] Verify they produce valid route paths when used in components

---

## Step 4 — Dynamic URL generation

Document how dynamic URLs are created:

1. **Portfolio:** How does `/portfolio/:slug` get its slug? (from `portfolioEntries[i].slug`)
2. **Blog:** How does `/blog/:slug` get its slug? (from `blogPosts[i].slug`)
3. **Categories/tags:** How are `/blog/category/:slug` and `/blog/tag/:slug` generated?
4. **Videos/podcasts:** Same pattern analysis
5. **About sub-pages:** How are the 21 hidden about page routes defined?

---

## Step 5 — Route guidelines

Create `/guidelines/site-structure/routes.md` (or update `/guidelines/sitemap-routes.md`) with:

1. **Complete route table** — Every route path, component, parent, segments
2. **URL conventions** — Slug format, kebab-case rules, max URL depth
3. **How to add a new route:**
   - [ ] Create page component in `/components/pages/{section}/`
   - [ ] Add route to `/routes.ts` under the correct parent
   - [ ] Add SEO data to `/data/mock/seo.ts`
   - [ ] Add breadcrumb configuration
   - [ ] Add to navigation data (header, footer, sitemap)
   - [ ] Verify with `npm run build`
4. **How to add a dynamic route:**
   - [ ] Define `:param` in route path
   - [ ] Handle missing params in component (redirect to 404 or show error)
   - [ ] Add to sitemap data for static generation
5. **Route naming conventions:**
   - Pages: `{ContentType}Page.tsx` (e.g., `BlogPage.tsx`)
   - Detail pages: `{ContentType}DetailPage.tsx`
   - Category pages: `{ContentType}CategoryPage.tsx`
   - Tag pages: `{ContentType}TagPage.tsx`

---

## Output format

```markdown
## Route inventory

[Complete table from Step 1]

## Orphaned pages (no route)

| File | Recommendation |
|---|---|
| ... | Wire to route / Delete |

## Broken links

| Source file | Line | Target URL | Issue |
|---|---|---|---|
| ... | ... | `/broken/path` | No matching route |

## Route guidelines

[Draft of routes documentation]
```
