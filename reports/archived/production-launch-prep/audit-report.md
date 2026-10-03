# Production launch prep — audit report

**Date:** March 6, 2026
**Prompt:** [orchestrator.md](../../prompts/production-launch-prep/orchestrator.md)
**Status:** COMPLETE — 11 findings (2 Critical, 3 High, 4 Medium, 2 Low)

---

## Sub-audit 1: SEO & structured data verification

### Finding S-01 (CRITICAL): Schema.org Person schema says "Berlin-based"

**File:** `/utils/schemaService.ts`
**Lines:** 28-43, 127-128

The `ASH_SHAW_PERSON` constant has `addressLocality: 'Berlin'` and `addressCountry: 'DE'`. The `buildPersonSchema()` description says "Berlin-based makeup artist". This contradicts Phase 3 content corrections (Bio page "Berlin-based" changed to "Cape Town-based"). Ash is Cape Town-based with seasonal Berlin visits.

**Fix:** Update `addressLocality` to `'Cape Town'`, `addressCountry` to `'ZA'`, `workLocation` to Cape Town, and description to "Cape Town-based".

### Finding S-02 (CRITICAL): index.html static Schema.org has workLocation Berlin

**File:** `/index.html`
**Lines:** 161-164

The static JSON-LD Person schema embedded in `index.html` has `workLocation: { name: "Berlin" }`. Same issue as S-01.

**Fix:** Update to `"Cape Town"`.

### Finding S-03 (HIGH): Missing og:image and twitter:image meta tags

**File:** `/index.html`

No `og:image` or `twitter:image` meta tags are present. Social sharing links (Facebook, Twitter/X, LinkedIn, WhatsApp) will display without a preview image, significantly reducing click-through rates.

**Fix:** Add `og:image` and `twitter:image` meta tags. Use the existing site OG description pattern. Since no external image URL is available in the Figma Make environment, add placeholder meta tags with a comment noting the production URL to use.

### Finding S-04 (HIGH): Dev tools SEO references stale "Lucide" terminology

**File:** `/data/mock/seo/dev-tools.ts`
**Lines:** 31, 37-38, 19

- `icons` entry (line 31): "every Lucide icon" — should say "every Phosphor icon"
- `phosphorIcons` entry (line 37-38): "comparison of Lucide and Phosphor" — migration is complete, this should reflect the current all-Phosphor state
- `hub` entry (line 19): "23 developer tools" — should be "24" (Phosphor Icons page added)

### Finding S-05 (MEDIUM): seo.ts JSDoc example says "Berlin-based"

**File:** `/utils/seo.ts`
**Line:** 53

The JSDoc code example in the `setSEO` function documentation contains `'Meet Ash Shaw — a Berlin-based makeup artist...'`. Should be updated for consistency.

### Sub-audit 1 summary

- `setSEO()` wiring: All 46 page components verified wired via `pageSEO`, `devToolsSEO`, or dynamic helpers. No gaps.
- Schema.org builders: 7 builder functions present, all inject/remove correctly with `useEffect` cleanup.
- SEO data split: Clean barrel export in `/data/mock/seo/index.ts` with 3 sub-modules.

---

## Sub-audit 2: Accessibility final check

**Status:** PASS — No new issues found.

All previous WCAG 2.1 AA compliance verified:
- 100% heading hierarchy compliance
- All 87 CSS files have `prefers-reduced-motion` where applicable
- Focus indicators: 3px neon pink glow
- Keyboard navigation: Tab, Enter, Space, Arrows, Escape
- ARIA labels on all interactive elements
- Color contrast: 4.5:1+ body text, 7:1+ dark mode
- Content Specimens accessibility audit: 0 issues (March 4, 2026)

---

## Sub-audit 3: Performance review

**Status:** PASS with advisory notes.

- **Google Fonts:** 21 content-type fonts + 3 base fonts loaded via 2 CDN requests with `display=swap`. This is the designed architecture for the 7 content-type specimen pages.
- **Netlify headers:** Proper immutable cache for `/assets/*`, security headers set (X-Frame-Options, XSS Protection, Content-Type-Options, Referrer-Policy).
- **CSS/JS bundling:** `netlify.toml` has CSS/JS bundling and minification enabled.
- **Image optimization:** `netlify.toml` image compression enabled.
- **Service worker:** Precaches homepage, offline.html, and critical CSS. Cache-first strategy for static assets.
- **Preload hints:** `globals.css` and `animations.css` preloaded in `index.html`.

No actionable performance issues found.

---

## Sub-audit 4: Cross-browser & PWA readiness

**Status:** PASS — No issues found.

- **manifest.json:** Complete with 8 icon sizes, screenshots, shortcuts, display override, edge side panel.
- **Service worker:** Registered, precache list defined, offline fallback present.
- **SPA routing:** `netlify.toml` has `/* → /index.html` with status 200.
- **Security headers:** X-Frame-Options DENY, X-XSS-Protection, X-Content-Type-Options nosniff.
- **Apple PWA:** Touch icons, web app capable, status bar style, title all set.
- **Microsoft tiles:** TileColor and TileImage configured.

---

## Sub-audit 5: Content accuracy & stale references

### Finding C-01 (HIGH): Stale "Lucide" references in 5 mock data files

Post-Phosphor migration, these data files still reference "Lucide":

| File | Line(s) | Stale reference |
|---|---|---|
| `/data/mock/ui/dev-tools.ts` | 139 | "every Lucide icon" |
| `/data/mock/ui/dev-tools.ts` | 148 | "every Lucide icon and its Phosphor equivalent" |
| `/data/mock/ui/sitemap.ts` | 97 | "full Lucide icon library" |
| `/data/mock/ui/sitemap.ts` | 111 | "Lucide to Phosphor migration tracker" |
| `/data/mock/ui/style-guide.ts` | 47 | "Every Lucide React icon" |

### Finding C-02 (MEDIUM): Stale "Lucide" in JSDoc comments (data types)

| File | Line(s) | Stale reference |
|---|---|---|
| `/data/mock/ui/about-dropdown.ts` | 17 | `/** Lucide icon name */` |
| `/data/mock/ui/sitemap.ts` | 38 | `icon name (Lucide component string)` |
| `/data/mock/ui/social-links.ts` | 20 | `/** Icon identifier (maps to Lucide icon) */` |
| `/data/mock/ui/style-guide.ts` | 320 | `/** Icon categories with their Lucide icon names */` |

### Finding C-03 (MEDIUM): phosphor-icons.ts data still shows migrated: false

**File:** `/data/mock/ui/phosphor-icons.ts`

All 90+ icon entries have `migrated: false` despite the Phosphor migration being 100% complete. This data powers the PhosphorIconsPage dev tool.

### Finding C-04 (LOW): docs/website-content.md still says "Berlin-based"

**File:** `/docs/website-content.md`
**Line:** 1285

Reference document still contains "Berlin-based (summers)" which was flagged in Phase 3 but not corrected in this file (it's a reference doc, not code-facing).

### Finding C-05 (LOW): Updated content counts not reflected in project-status doc

**File:** `/docs/project-status-march-2026.md`

Content counts at line 337-347 reflect March 4 state but Content Expansion Phase 8 has since completed:
- Blog posts: listed as 35 → now 50
- Videos: listed as 12 → now 17
- Podcasts: listed as 5 episodes → now 4 (confirmed in Phase 8)
- Events: listed as "Origin Festival archive (7 editions)" → now 4 events

---

## Summary

| Priority | Count | Description |
|---|---|---|
| Critical | 2 | Schema.org "Berlin-based" errors (schemaService + index.html) |
| High | 3 | Missing OG image, stale Lucide in SEO data, stale Lucide in mock data |
| Medium | 4 | JSDoc examples, type comments, phosphor migrated flags, seo.ts comment |
| Low | 2 | Reference doc, project status counts |
| **Total** | **11** | |

**Accessibility:** PASS (0 issues)
**Performance:** PASS (0 actionable issues)
**PWA:** PASS (0 issues)
**Cross-browser:** PASS (0 issues)