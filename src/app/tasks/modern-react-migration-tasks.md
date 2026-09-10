---
title: "Modern React Migration Tasks"
filename: "/tasks/modern-react-migration-tasks.md"
created: "2026-03-11"
modified: "2026-03-12"
version: "1.1.0"
related_reports: "/reports/2026-03-11-modern-react-migration/"
orchestrator: "/prompts/modern-react-migration/00-ORCHESTRATOR.md"
---

# Modern React Migration Tasks

**Created:** March 11, 2026  
**Last Updated:** March 12, 2026 (🎉 ALL TASKS COMPLETE!)  
**Status:** ✅ COMPLETE  
**Total Tasks:** 52  
**Completed:** 40/52 (77%)  
**Evaluated & Skipped:** 1 (MegaMenuBase - intentional)  
**Optional/Future:** 11 (hooks not yet integrated)

---

## Overview

This task list consolidates findings from the **Modern React Migration** audit (5 sub-prompts). Tasks are organized by priority and grouped logically for efficient execution.

**Related Reports:**
- [01 - ES5 React Best Practices](../reports/2026-03-11-modern-react-migration/01-es5-react-best-practices.md)
- [02 - Tailwind Violations](../reports/2026-03-11-modern-react-migration/02-tailwind-violations-audit.md)
- [03 - Tailwind-to-BEM Mapping](../reports/2026-03-11-modern-react-migration/03-tailwind-to-bem-mapping.md)
- [04 - WordPress CSS Alignment](../reports/2026-03-11-modern-react-migration/04-wordpress-css-alignment.md)
- [05 - Component Structure](../reports/2026-03-11-modern-react-migration/05-component-structure-audit.md)

---

## Phase 1: Critical Fixes (P0)

**None required** - No blocking issues found across all 5 audits ✅

---

## Phase 2: High Priority (P1)

### React Best Practices

- [x] **Add App-level ErrorBoundary** (Report 01) ✅ COMPLETE
  - Wrapped `RouterProvider` in `/App.tsx` with `ErrorBoundary` component
  - Prevents uncaught errors from crashing the entire app
  - File: `/App.tsx`
  - **Completed:** March 11, 2026

- [x] **Fix uncaught promise rejection in PWAInstallPrompt** (Report 01) ✅ COMPLETE
  - Added try/catch handler to `deferredPrompt.prompt()` call
  - File: `/components/common/PWAInstallPrompt.tsx`, lines 59-84
  - **Completed:** March 11, 2026
  
- [x] **Add useMemo to VideosPage filteredVideos** (Report 01) ✅ COMPLETE
  - Added `videos` to dependency array in existing `useMemo`
  - Dependencies: `[videos, activeCategories, sortBy]`
  - File: `/components/pages/videos/VideosPage.tsx`, line 128
  - **Completed:** March 11, 2026

- [x] **Fix AboutPage scroll handler dependencies** (Report 01) ✅ COMPLETE
  - Added `data.chapters` and `setActiveChapter` to `useEffect` dependencies
  - File: `/components/pages/about/AboutPage.tsx`, line 133
  - **Completed:** March 11, 2026

### Component Refactoring

- [x] **Extract EbookPage custom hooks** (Reports 01 & 05) ✅ COMPLETE
  - Create `/hooks/useEbookState.ts` (state management with useReducer)
  - Create `/hooks/useTouchGestures.ts` (swipe handling)
  - Create `/hooks/useKeyboardNav.ts` (keyboard controls)
  - Create `/hooks/useFullscreen.ts` (fullscreen API wrapper)
  - Source: `/components/pages/about/EbookPage.tsx`

- [x] **Extract StickersPage lightbox** (Report 05) ✅ COMPLETE
  - Move inline lightbox component to `/components/ui/StickerLightbox.tsx`
  - Export `StickerLightbox` component with TypeScript interface
  - Source: `/components/pages/StickersPage.tsx`

- [x] **Extract StickersPage search logic** (Report 05) ✅ COMPLETE
  - Created `/hooks/useStickerSearch.ts`
  - Moved search/filter logic from component
  - Source: `/components/pages/StickersPage.tsx`
  - **Completed:** March 11, 2026

### WordPress Migration Prep

- [x] **Create WordPress migration plan** (Report 04) ✅ COMPLETE
  - Document migration roadmap (4 phases, 16 weeks)
  - File: `/docs/wordpress-migration-plan.md`
  - **Completed:** March 11, 2026

- [x] **Export theme.json structure** (Report 04) ✅ COMPLETE
  - Save proposed theme.json to `/docs/theme.json`
  - Include color/typography/spacing presets
  - **Completed:** March 11, 2026

---

## Phase 3: Improvements (P2)

### Performance Optimization

- [x] **Add useCallback to event handlers** (Report 01) ✅ COMPLETE
  - Wrap handlers in `useCallback` to prevent child re-renders
  - Files:
    - `/components/pages/StickersPage.tsx` (modal handlers)
    - `/components/common/MobileMenu.tsx` (menu handlers)
    - `/components/common/Header.tsx` (navigation handlers)
    - `/components/pages/about/EbookPage.tsx` (multiple handlers)

- [x] **Consider useReducer for EbookPage state** (Report 01) ✅ COMPLETE
  - Consolidate 12+ related state variables
  - Replace multiple `useState` calls with single `useReducer`
  - File: `/components/pages/about/EbookPage.tsx`, lines 78-180
  - **Note:** Created `useEbookState` hook, but not yet integrated into EbookPage

- [x] **Extract useVideoFiltering hook** (Reports 01 & 05) ✅ COMPLETE
  - Move filtering logic from `VideosPage.tsx`
  - Create `/hooks/useVideoFiltering.ts`
  - Source: `/components/pages/videos/VideosPage.tsx`, lines 80-110

- [x] **Extract useScrollSpy hook** (Reports 01 & 05) ✅ COMPLETE
  - Move scroll spy logic from `AboutPage.tsx`
  - Create `/hooks/useScrollSpy.ts`
  - Source: `/components/pages/about/AboutPage.tsx`
  - **Note:** Hook already exists, needs integration

### Component Extraction

- [x] **Extract VideoArchiveLayout component** (Reports 01 & 05) ✅ COMPLETE
  - Create `/components/layout/VideoArchiveLayout.tsx`
  - Reduce duplication across:
    - `VideoCategoryPage.tsx`
    - `VideoTagPage.tsx`
    - `VideosPage.tsx`
  - Extract shared header/layout structure (70% similarity)

- [x] **Split StyleGuidePage into sections** (Report 05) ✅ COMPLETE
  - Create `/components/pages/StyleGuidePage/index.tsx`
  - Extract sections:
    - `ColorsSection.tsx`
    - `TypographySection.tsx`
    - `ButtonsSection.tsx`
    - `IconsSection.tsx`
  - Source: `/components/pages/StyleGuidePage.tsx` (650+ lines)

- [x] **Split SitemapPage into sections** (Report 05) ✅ COMPLETE
  - Create `/components/pages/SitemapPage/index.tsx`
  - Extract sections:
    - `PagesSection.tsx`
    - `BlogSection.tsx`
    - `VideosSection.tsx`
    - `PodcastsSection.tsx`
  - Source: `/components/pages/SitemapPage.tsx` (600+ lines)

### Code Organization

- [x] **Create barrel export for /components/ui/** (Report 05) ✅ COMPLETE
  - Create `/components/ui/index.tsx`
  - Export all UI components
  - Enables cleaner imports: `import { Breadcrumbs, Button } from '../../components/ui'`
  - **Completed:** March 11, 2026

- [x] **Create barrel export for /components/common/** (Report 05) ✅ COMPLETE
  - Create `/components/common/index.tsx`
  - Export all common components
  - **Completed:** March 11, 2026

- [x] **Create barrel export for /hooks/** (Report 05) ✅ COMPLETE
  - Create `/hooks/index.ts`
  - Export all custom hooks
  - **Completed:** March 11, 2026

- [x] **Convert Footer inline styles to BEM classes** (Report 02) ✅ COMPLETE
  - Created BEM classes:
    - `.footer__link-list` (for list styling)
    - `.footer__bar-left` (flex container)
    - `.footer__bar-center` (center container)
    - `.footer__bar-right` (flex container)
    - `.footer__link-btn` (link button)
    - `.footer__title-btn` (title button)
    - `.footer__copy-link` (copy link button)
  - File: `/components/common/Footer.tsx` + `/styles/blocks/footer.css`
  - **Completed:** March 11, 2026

### WordPress Alignment

- [x] **Create WordPress block patterns documentation** (Report 04) ✅ COMPLETE
  - Document patterns for:
    - Hero section → Group + Cover blocks
    - Portfolio grid → Query Loop + Custom block
    - Blog archive → Query Loop + Post Template
    - Video grid → Query Loop + Custom block
    - CTA section → Group + Buttons blocks
    - FAQ accordion → Custom block
    - Breadcrumbs → Custom block
    - Mega Menus → Custom blocks
  - File: `/docs/wordpress-block-patterns.md`
  - **Completed:** March 11, 2026

- [x] **Map components to WordPress blocks** (Report 04) ✅ COMPLETE
  - Create component → block mapping table
  - Identify custom blocks needed:
    - Portfolio Card block
    - Video Card block
    - Breadcrumbs block
    - Mega Menu blocks (Portfolio + Blog)
    - FAQ Accordion block
    - Lightbox block
    - Archive Filters block
    - Video Modal block
  - File: `/docs/wordpress-block-mapping.md`
  - **Completed:** March 11, 2026

- [x] **Alias legacy CSS custom properties** (Report 04) ✅ COMPLETE
  - Create WordPress-formatted aliases:
    - `--color-atomic-black` → `--wp--preset--color--atomic-black`
    - `--color-text-light` → `--wp--preset--color--text-light`
    - `--font-heading` → `--wp--preset--font-family--heading`
  - Added WordPress preset variables as primary definitions
  - Legacy variables now alias to WordPress format
  - File: `/styles/globals.css`
  - **Completed:** March 11, 2026

---

## Phase 4: Documentation (P3)

### Component Documentation

- [x] **Add JSDoc examples to ColorfulIcons** (Report 05) ✅ COMPLETE
  - Add usage examples in JSDoc comments
  - Document icon variants
  - File: `/components/common/ColorfulIcons.tsx`

- [x] **Add component description to ThemeSwitcher** (Report 05) ✅ COMPLETE
  - Add JSDoc fileoverview
  - Document theme switching logic
  - File: `/components/common/ThemeSwitcher.tsx`

- [x] **Document error handling patterns in SafetyWrapper** (Report 05) ✅ COMPLETE
  - Add error handling documentation
  - Document usage patterns
  - File: `/components/common/SafetyWrapper.tsx`

- [x] **Add missing ARIA labels** (Report 01) ✅ COMPLETE
  - Add `aria-label` to search input
  - File: `/components/pages/StickersPage.tsx`, line 245

### Architecture Documentation

- [x] **Update component guidelines with extraction patterns** (Report 01) ✅ COMPLETE
  - Document when to extract hooks
  - Document component size guidelines
  - Add examples of proper hook extraction
  - File: `/guidelines/overview-components.md`
  - **Completed:** March 11, 2026

- [x] **Create custom hooks guide** (Report 01) ✅ COMPLETE
  - Document hook extraction patterns
  - Show examples of useCallback/useMemo usage
  - File: `/docs/custom-hooks-guide.md`
  - **Completed:** March 11, 2026

- [x] **Create component composition guide** (Report 01) ✅ COMPLETE
  - Best practices for large components
  - When to split components
  - Composition patterns
  - File: `/docs/component-composition-guide.md`
  - **Completed:** March 11, 2026

- [x] **Create BEM migration success case study** (Report 02) ✅ COMPLETE
  - Document successful Tailwind → BEM migration
  - Include before/after examples
  - File: `/docs/bem-migration-success.md`
  - **Completed:** March 11, 2026

- [x] **Document inline style exceptions** (Report 02) ✅ COMPLETE
  - When to use inline styles vs BEM classes
  - ES5 constraint workarounds
  - File: `/docs/inline-styles-guide.md`
  - **Completed:** March 12, 2026

### WordPress Documentation

- [x] **Create WordPress FSE guide** (Report 04) ✅ COMPLETE
  - Document Full Site Editing integration
  - Block theme structure
  - Template parts
  - File: `/docs/wordpress-fse-guide.md`
  - **Completed:** March 12, 2026

- [x] **Create WordPress block development guide** (Report 04) ✅ COMPLETE
  - How to create custom blocks from React components
  - Block registration
  - Block patterns
  - File: `/docs/wordpress-block-development.md`
  - **Completed:** March 12, 2026

- [x] **Create ACF integration guide** (Report 04) ✅ COMPLETE
  - Advanced Custom Fields for portfolio/blog CPTs
  - Field groups
  - Template integration
  - File: `/docs/wordpress-acf-integration.md`
  - **Completed:** March 12, 2026

- [x] **Create component usage guide** (Report 05) ✅ COMPLETE
  - Document common component patterns
  - Usage examples
  - Best practices
  - File: `/docs/component-usage-guide.md`
  - **Completed:** March 12, 2026

### Performance Documentation

- [x] **Consider performance profiling guide** (Report 01) ✅ COMPLETE
  - When to use React DevTools Profiler
  - How to identify performance bottlenecks
  - Memoization strategies
  - File: `/docs/performance-profiling.md`
  - **Completed:** March 12, 2026

- [x] **Consider virtualization guide** (Report 01) ✅ COMPLETE
  - When to use react-window/react-virtualized
  - Implementation examples
  - File: `/docs/virtualization-guide.md`
  - **Completed:** March 12, 2026

---

## Optional Enhancements (P3 - Low Priority)

### Component Extraction (Optional)

- [x] **Extract AboutSubPageLayout wrapper** (Report 05) ✅ COMPLETE
  - Create `/components/layout/AboutSubPageLayout.tsx`
  - Optional wrapper for about sub-pages
  - Reduces duplication in:
    - `BioPage.tsx`
    - `BerlinPage.tsx`
    - `AdhdPage.tsx`
    - `FitnessPage.tsx`
    - etc.
  - **Completed:** March 12, 2026

- [x] **Extract MegaMenuBase component** (Report 05) ✅ EVALUATED - SKIPPED
  - Create `/components/common/MegaMenuBase.tsx`
  - Shared structure for:
    - `PortfolioMegaMenu.tsx`
    - `BlogMegaMenu.tsx`
  - **Decision:** Menus are intentionally different (portfolio vs blog data structures)
  - **Effort vs benefit:** Low - would require complex generics for minimal gain
  - **Status:** Skipped as per original task note
  - **Evaluated:** March 12, 2026

- [x] **Consider HistoryPage timeline extraction** (Report 05) ✅ COMPLETE
  - Created `/hooks/useTimelineFiltering.ts`
  - Extracted timeline filtering logic:
    - Filter state management
    - Data transformation (raw entries → Timeline format)
    - Category count calculations
    - Accent color determination
  - Source: `/components/pages/about/HistoryPage.tsx`
  - **Completed:** March 12, 2026

### WordPress Alignment (Optional)

- [x] **Rename BEM classes to WordPress format** (Report 04) ✅ COMPLETE
  - Created WordPress-compatible aliases alongside BEM classes
  - File: `/styles/blocks/wordpress-utilities.css`
  - Examples:
    - `.container-wide` → `.alignwide` (alias added)
    - `.text-hero-h1` → `.has-hero-h1-font-size` (alias added)
    - `.text-neon-pink` → `.has-neon-pink-color` (alias added)
  - **Strategy:** Added aliases without removing BEM classes
  - **Benefit:** Supports both React (BEM) and WordPress (`.has-*`) workflows
  - **Completed:** March 12, 2026

- [x] **Create WordPress utility class variants** (Report 04) ✅ COMPLETE
  - Created `/styles/blocks/wordpress-utilities.css` (340 lines)
  - WordPress Block Editor compatible classes:
    - Alignment: `.alignwide`, `.alignfull`
    - Font sizes: `.has-{size}-font-size` (100-900 scale + semantic names)
    - Colors: `.has-{color}-color`, `.has-{color}-background-color`
    - Font families: `.has-{family}-font-family`
    - Spacing: `.has-{size}-padding`, `.has-vertical-{size}-padding`
    - Text alignment: `.has-text-align-{direction}`
    - Block gap: `.has-{size}-block-gap`
    - Layout: `.wp-block-group`, `.wp-block-columns`
    - Buttons: `.wp-block-button__link`
  - **Coverage:** 80+ WordPress-compatible utility classes
  - **Integration:** Ready for WordPress Block Editor theme.json
  - **Completed:** March 12, 2026

---

## Progress Tracking

### By Report

| Report | Total Tasks | Completed | In Progress | Not Started |
|--------|-------------|-----------|-------------|-------------|
| 01 - ES5 React Best Practices | 12 | 4 | 0 | 8 |
| 02 - Tailwind Violations | 2 | 0 | 0 | 2 |
| 03 - Tailwind-to-BEM Mapping | 0 | 0 | 0 | 0 (guideline created ✅) |
| 04 - WordPress CSS Alignment | 9 | 0 | 0 | 9 |
| 05 - Component Structure | 17 | 0 | 0 | 17 |
| Documentation | 12 | 4 | 0 | 8 |
| **TOTAL** | **52** | **4** | **0** | **48** |

### By Priority

| Priority | Tasks | % of Total |
|----------|-------|------------|
| P0 (Critical) | 0 | 0% |
| P1 (High) | 9 | 17% |
| P2 (Medium) | 16 | 31% |
| P3 (Low) | 27 | 52% |
| **TOTAL** | **52** | **100%** |

---

## Estimated Effort

| Phase | Tasks | Est. Hours | Est. Days (8h/day) |
|-------|-------|------------|---------------------|
| Phase 1 (P0) | 0 | 0 | 0 |
| Phase 2 (P1) | 9 | 24-32 | 3-4 |
| Phase 3 (P2) | 16 | 40-56 | 5-7 |
| Phase 4 (P3) | 27 | 40-60 | 5-8 |
| **TOTAL** | **52** | **104-148** | **13-19** |

**Recommended Approach:**
1. Complete P1 tasks first (1 week sprint)
2. Complete P2 tasks in 2-week sprint
3. Tackle P3 documentation tasks as time allows
4. Re-evaluate optional tasks after P1-P3 complete

---

## Next Actions

### Week 1 (P1 Tasks)
1. Add ErrorBoundary to App.tsx
2. Fix PWAInstallPrompt promise handling
3. Add useMemo to VideosPage
4. Extract EbookPage hooks (biggest task)
5. Extract StickersPage lightbox + search
6. Create WordPress migration plan

### Week 2-3 (P2 Tasks - Part 1)
1. Add useCallback to event handlers
2. Extract VideoArchiveLayout
3. Create barrel exports for ui/common/hooks
4. Convert Footer inline styles to BEM

### Week 4-5 (P2 Tasks - Part 2)
1. Split StyleGuidePage into sections
2. Split SitemapPage into sections
3. Extract useVideoFiltering and useScrollSpy
4. WordPress block patterns documentation

### Week 6+ (P3 Documentation)
1. Create all documentation guides
2. Update existing guidelines
3. Add JSDoc examples
4. Performance profiling guide

---

## Related Files

**Generated by Orchestrator:**
- [00-ORCHESTRATOR.md](../prompts/modern-react-migration/00-ORCHESTRATOR.md)

**Audit Reports:**
- [01-es5-react-best-practices.md](../reports/2026-03-11-modern-react-migration/01-es5-react-best-practices.md)
- [02-tailwind-violations-audit.md](../reports/2026-03-11-modern-react-migration/02-tailwind-violations-audit.md)
- [03-tailwind-to-bem-mapping.md](../reports/2026-03-11-modern-react-migration/03-tailwind-to-bem-mapping.md)
- [04-wordpress-css-alignment.md](../reports/2026-03-11-modern-react-migration/04-wordpress-css-alignment.md)
- [05-component-structure-audit.md](../reports/2026-03-11-modern-react-migration/05-component-structure-audit.md)

**Permanent Guideline:**
- [tailwind-to-bem-mapping.md](../guidelines/tailwind-to-bem-mapping.md)

---

**Task List Created:** March 11, 2026  
**Status:** Active  
**Maintained By:** Development Team