# Production launch prep — task list

**Created:** March 6, 2026
**Completed:** March 6, 2026
**Source prompt:** [orchestrator.md](../prompts/production-launch-prep/orchestrator.md)
**Report:** [audit-report.md](../reports/production-launch-prep/audit-report.md)

---

## Critical priority

- [x] **T01 (S-01):** Fix `schemaService.ts` — Updated `ASH_SHAW_PERSON` addressLocality to Cape Town/ZA, updated `buildPersonSchema()` description and workLocation to Cape Town-based
- [x] **T02 (S-02):** Fix `index.html` — Updated static Schema.org `workLocation` from Berlin to Cape Town

## High priority

- [x] **T03 (S-03):** Added `og:image` and `twitter:image` placeholder meta tags to `index.html` (with width, height, and alt attributes)
- [x] **T04 (S-04):** Fixed `dev-tools.ts` SEO — Updated icons/phosphorIcons/hub descriptions to reflect Phosphor migration complete, count to 24
- [x] **T05 (C-01):** Fixed stale "Lucide" references in mock data files — `dev-tools.ts` (2 entries), `sitemap.ts` (2 entries), `style-guide.ts` (2 entries)

## Medium priority

- [x] **T06 (S-05):** Fixed `seo.ts` JSDoc example — Updated "Berlin-based" to "Cape Town-based" in code comment
- [x] **T07 (C-02):** Fixed stale "Lucide" in JSDoc comments — `about-dropdown.ts`, `sitemap.ts`, `social-links.ts`, `style-guide.ts`
- [x] **T08 (C-03):** Updated `phosphor-icons.ts` — Set all 92 `migrated` flags to `true`, updated file description
- [x] **T09 (C-05):** Updated `project-status-march-2026.md` — Corrected content counts for Phase 8 completion (50 blog posts, 17 videos, 4 podcasts, 4 events, 33 FAQs)

## Low priority

- [x] **T10 (C-04):** Updated `docs/website-content.md` — Fixed "Berlin-based" reference in core identity section to "Cape Town-based (home base)"

---

**All 10 tasks complete. Audit resolution rate: 100%.**