# Codebase Consistency Audit — Consolidated Report

**Date:** 2026-06-19
**Prompt:** `/prompts/codebase-consistency-audit/orchestrator.md`
**Task List:** `/tasks/codebase-consistency-audit-tasks.md`

---

## Executive Summary

The audit covered five domains: button padding, design tokens, inline styles, console logging, and undefined CSS token references. The most significant finding is a **systemic undefined token problem** — dozens of `--wp--preset--*` tokens referenced across `button.css`, `read-more-btn.css`, `not-found-page.css`, and the `src/styles/tokens/` layer are never defined in any CSS file. These silently fall back to empty values, producing invisible button states, broken border radii, and missing shadow glows. This is more impactful than it might appear because it affects all button focus/hover states site-wide.

---

## Severity Matrix

| ID | Domain | Finding | Severity | File(s) |
|---|---|---|---|---|
| E-01 | Tokens | Shadow tokens undefined (`focus-ring`, `neon-sm`, `card-hover`, `neon-pink/blue/purple`) | 🔴 Critical | `button.css`, `tokens/content-interactive.css` |
| E-02 | Tokens | Border-radius tokens undefined (`full`, `md`, `circle`, `lg`) | 🔴 Critical | `button.css`, `read-more-btn.css`, `tokens/` |
| E-03 | Tokens | Colour tokens undefined (`primary`, `neon-purple`, `neon-purple-text`, `neon-pink-text`) | 🔴 Critical | `button.css`, `read-more-btn.css` |
| E-04 | Tokens | Semantic tokens undefined (`base`, `contrast`) | 🔴 Critical | `not-found-page.css`, `tokens/` |
| E-05 | Tokens | Font-family brand tokens undefined (`brand-heading`, `brand-body`, `brand-title`) | 🟠 High | `button-variations.css`, `tokens/` |
| E-06 | Tokens | Fluid spacing tokens undefined (all `fluid-*` and `section-*`) | 🟠 High | `utility-helpers.css`, `tokens/` |
| E-07 | Tokens | Z-index tokens undefined (`z-index--0`, `z-index--n1`) | 🟠 High | `button.css` |
| A-01 | Buttons | Three competing button systems (`.btn`, `.button`, `.wp-block-button__link`) | 🔴 Critical | `button.css`, `globals.css`, `button-variations.css` |
| A-02 | Buttons | `.wp-block-button__link` hardcoded padding (`12px 24px`, `8px 16px`) | 🟠 High | `button-variations.css` |
| A-03 | Buttons | `read-more-btn` fixed rem padding (not fluid) | 🟠 High | `read-more-btn.css` |
| A-04 | Buttons | `.btn--default` has no background (depends on undefined `--primary` token) | 🟡 Medium | `button.css` |
| A-05 | Buttons | `.button--primary:hover` hardcoded `#ff52b9` | 🟡 Medium | `globals.css` |
| B-01 | Tokens | Hardcoded hex in `globals.css` selectors (6 instances) | 🟠 High | `globals.css` |
| B-02 | Tokens | Hardcoded hex throughout `dark.css` and `dark-extended.css` | 🟠 High | `dark.css`, `dark-extended.css` |
| B-03 | Tokens | Hardcoded pixel `font-size` in 5 typography classes | 🟠 High | `globals.css` |
| B-04 | Tokens | Dual token system (legacy `--color-*` vs `--wp--preset--*`) mixed inconsistently | 🟡 Medium | Multiple CSS files |
| B-05 | Tokens | Legacy `.button` block in `globals.css` conflicts with `.btn` in `button.css` | 🟡 Medium | `globals.css` |
| C-01 | Inline | `PaletteDemoModal.tsx` — 40+ inline styles for layout/spacing/typography | 🟠 High | `PaletteDemoModal.tsx` |
| C-02 | Inline | `TimelinePage.tsx` — dynamic colour via inline `style` instead of CSS var injection | 🟡 Medium | `TimelinePage.tsx` |
| C-03 | Inline | `HistoryPage.tsx` — dynamic colour via inline `style` instead of CSS var injection | 🟡 Medium | `HistoryPage.tsx` |
| C-04 | Inline | `PressKitPage.tsx` — inline style at line 38, needs classification | 🟡 Medium | `PressKitPage.tsx` |
| C-05 | Inline | `WhySection.tsx` — inline style at line 152, needs classification | 🟡 Medium | `WhySection.tsx` |
| D-01 | Console | `ThemeToggleES5.tsx` — unguarded `console.log` in production | 🟠 High | `ThemeToggleES5.tsx` |
| E-08 | Tokens | Token naming inconsistency (legacy vs wp-preset) throughout CSS | 🟡 Medium | Multiple |
| E-09 | Tokens | Hardcoded hex in `dark.css` & `dark-extended.css` selectors | 🟡 Medium | `dark.css`, `dark-extended.css` |

---

## Priority Order for Fixes

### 🔴 Do first — Critical (breaks visible output silently)

1. **Define all undefined `--wp--preset--*` tokens** in `globals.css` `:root {}` — shadow, border-radius, z-index, base, contrast, primary, neon-purple, neon-purple-text, neon-pink-text (E-01 through E-04). This is one focused edit to `globals.css`.

2. **Consolidate button padding** — choose `.btn` as the single system and align `.wp-block-button__link` and `read-more-btn` to use `clamp()` (A-01, A-02, A-03).

### 🟠 Do next — High (standard violations)

3. **Add font-family brand aliases** to `globals.css` (E-05)
4. **Add fluid spacing scale** to `globals.css` (E-06)
5. **Add z-index scale** to `globals.css` (E-07)
6. **Replace hardcoded hex in `globals.css` selectors** with token refs (B-01)
7. **Replace hardcoded pixel font-sizes** with `clamp()` (B-03)
8. **Fix `ThemeToggleES5.tsx` console.log** (D-01)
9. **Refactor `PaletteDemoModal.tsx`** layout/typography inline styles into BEM classes (C-01)
10. **Replace hardcoded hex in `dark.css`** with `--color-*` token refs (B-02 — systemic pass)

### 🟡 Nice to have — Medium

11. Replace `TimelinePage.tsx` and `HistoryPage.tsx` inline colour with CSS var injection (C-02, C-03)
12. Inspect and classify `PressKitPage.tsx:38` and `WhySection.tsx:152` (C-04, C-05)
13. Deprecate legacy `.button` block from `globals.css` (B-05)
14. Adopt single token convention: `--wp--preset--color--*` only going forward (B-04, E-08)

---

## Accepted Exceptions (no action required)

- `PortfolioMegaMenu.tsx`, `BlogMegaMenu.tsx`, `AboutDropdown.tsx` — CSS custom property animation stagger injection (`--col-index`, `--item-index`, `--node-index`)
- `BlogPostPage.tsx:243`, `PodcastDetailPage.tsx:177` — dynamic progress bar `width` (no CSS alternative)
- `PortfolioCard.tsx:194` — dynamic `backgroundImage` URL
- `ResponsiveGridSlider.tsx:183,191` — computed `flex` basis percentage
- `PaletteDemoModal.tsx` — colour swatch `color: hex` for live demo values (dev-tool context)
- `ErrorBoundary.tsx:196–199` — `console.error` in `componentDidCatch`
- `StyleGuidePage.tsx:661` — `console.log` string in demo code literal (not a call)
- `extensionErrorSuppressor.ts` — suppressor utility
