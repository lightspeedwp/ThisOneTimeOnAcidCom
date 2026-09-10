# Sub-audit 6 — Migration task plan

**Parent:** [orchestrator.md](./orchestrator.md)

## Instructions

Generate a prioritised, phased task list for the full Phosphor Icons migration.

### Phase 1 — Parallel operation (Phosphor alongside Lucide)

Tasks to enable Phosphor usage without touching existing components:

- P1-T01: Verify `@phosphor-icons/react` works in Figma Make bundler (import test)
- P1-T02: Create `/guidelines/design-tokens/iconography.md` (from Sub-audit 4 spec)
- P1-T03: Create `/data/mock/ui/phosphor-icons.ts` (icon comparison data)
- P1-T04: Create `PhosphorIconsPage.tsx` dev tools page (from Sub-audit 5 spec)
- P1-T05: Add route to DevToolsPage hub and router
- P1-T06: Create icon CSS design tokens in `/styles/globals.css` or `/styles/blocks/icons.css`
- P1-T07: Update `/guidelines/overview-icons.md` to document both Lucide and Phosphor
- P1-T08: Fix any WCAG violations found in Sub-audit 3

### Phase 2 — File-by-file migration (replace Lucide with Phosphor)

Group files by priority:

**Tier 1 — Common components (highest impact, shared across all pages):**
- Header.tsx, Footer.tsx, MobileMenu.tsx, ThemeToggle.tsx, ErrorBoundary.tsx, etc.

**Tier 2 — UI components (shared building blocks):**
- Breadcrumbs.tsx, SearchInput.tsx, Pagination.tsx, ShareComponent.tsx, EnhancedLightbox.tsx, etc.

**Tier 3 — Page components (individual pages):**
- Blog pages, portfolio pages, video pages, event pages, about pages, dev tools pages

**Tier 4 — Cleanup:**
- Remove `/lib/icons-set-a.tsx` through `icons-set-e.tsx`
- Remove `/lib/icon-base.tsx`
- Remove `/lib/icons.ts`
- Update `vite.config.ts` optimizeDeps
- Update mock data string icon references
- Update all guideline `.md` files
- Update `IconLibraryPage.tsx` (merge with or replace by PhosphorIconsPage)
- Update `StyleGuidePage.tsx` type references

### Verification per batch

After each tier:
- `npm run type-check`
- `npm run build`
- Visual spot-check of affected pages (light + dark mode)
- Lighthouse accessibility audit

### Effort estimates

For each task, estimate:
- Lines of code changed
- Number of files touched
- Risk level (low/medium/high)
- Dependencies (which tasks must complete first)

## Output format

Write the complete task list to `/tasks/phosphor-migration-tasks.md`.
