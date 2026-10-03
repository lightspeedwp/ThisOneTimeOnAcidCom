# Sub-audit B — Design Token Consistency (Hardcoded Values)

**Date:** 2026-09-10
**Prompt:** `src/app/prompts/codebase-consistency-audit/orchestrator.md`

---

## Findings

| ID | File:Line | Severity | Description |
|---|---|---|---|
| B-01 | `globals.css:202,339,506,522,627,749,760` | 🟠 High | 7 `font-size: NNpx` values not inside `clamp()` — these bypass fluid scaling |
| B-02 | `globals.css:299,789,917,946,968,976,994,1011,1021,1026,1070,1089,1096,1103,1104,1118` | 🟠 High | 15+ hardcoded hex values in selectors after the `:root {}` block — new regressions since last audit |
| B-03 | `mobile-menu.css:278,281,314,320,327` | 🟠 High | 5 hardcoded neon brand hex values (`#FF10F0`, `#F4FF3C`) — should use `var(--color-neon-pink)` / `var(--color-neon-yellow)` |
| B-04 | `style-guide-page.css:8,19,31,125,177,255,277,297,305,333,363,381,423` | 🟠 High | 13+ hardcoded hex in style guide page — should use design tokens even in the demo page |
| B-05 | `animation-showcase.css:132,136,141,168` | 🟡 Medium | 4 hardcoded neon hex in gradient and colour values |
| B-06 | `ebook-enhanced-contrast.css:101,279,283,292,334,352` | 🟡 Medium | 6 hardcoded `#1A1A1A` and `#F4FF3C` values — should use `var(--color-surface-elevated)` / `var(--color-neon-yellow)` |
| B-07 | `portfolio-card.css:132` | 🟡 Medium | `color: #0F0F0F` — should use `var(--wp--preset--color--atomic-black)` |
| B-08 | `light.css:365,390,396,470,495` | 🟡 Medium | 5 instances of `color: #1A1A1A` — should use a light theme token, not hardcoded dark value |
| B-09 | `dark.css:189,190` | 🟡 Medium | 2 remaining hardcoded hex in component overrides — `#1A1A1A` / `#F6F2EB` not yet tokenised |
| B-10 | `globals.css` (systemic) | 🟡 Medium | 493 total hardcoded hex in all block CSS files (count from audit grep). While many may be in `:root` definitions, this count indicates widespread non-token colour usage across block files not yet reviewed. |

---

## Hardcoded Hex Count Summary

| Location | Count | Notes |
|---|---|---|
| `src/styles/blocks/` — all files | ~493 occurrences | Includes :root definitions; net violations estimate ~150 |
| `src/styles/themes/` — all files | ~489 occurrences | Majority are `:root {}` token definitions (acceptable) |
| `src/styles/globals.css` — selectors | ~16 confirmed | Direct violations in component-level selectors |

---

## Pixel Font-Size Violations

| File | Line | Value | Recommendation |
|---|---|---|---|
| `globals.css` | 202 | `font-size: 20px` | `clamp(1.125rem, 2vw, 1.25rem)` |
| `globals.css` | 339 | `font-size: 16px` | `clamp(0.875rem, 1.5vw, 1rem)` |
| `globals.css` | 506 | `font-size: 12px` | `clamp(0.625rem, 1vw, 0.75rem)` |
| `globals.css` | 522 | `font-size: 14px` | `clamp(0.75rem, 1.25vw, 0.875rem)` |
| `globals.css` | 627 | `font-size: 14px` | `clamp(0.75rem, 1.25vw, 0.875rem)` |
| `globals.css` | 749 | `font-size: 16px` | `clamp(0.875rem, 1.5vw, 1rem)` |
| `globals.css` | 760 | `font-size: 18px` | `clamp(1rem, 1.75vw, 1.125rem)` |
| `theme-toggle.css` | 73, 148 | `font-size: 20px / 18px` | Convert to `clamp()` |
| `wordpress-utilities.css` | 68, 74, 84 | `24px, 16px, 12px` | Convert to `clamp()` |
| `book-dark-mode.css` | 267, 275, 567 | `48px, 20px, 12px` | Convert to `clamp()` |
| `style-guide-page.css` | 75, 203, 211 | `14px, 18px, 16px` | Convert to `clamp()` |

---

## Accepted Exceptions

| Location | Pattern | Reason |
|---|---|---|
| `src/styles/themes/dark.css` `:root {}` | `--color-*: #hex` | Token definition blocks — defining values here is correct |
| `src/styles/themes/light.css` `:root {}` | `--wp--preset--color--*: #hex` | Token definition blocks — correct |
| `src/styles/globals.css` `:root {}` | `--wp--preset--*: #hex` or `#hex` | Token definition blocks — correct |
| `theme-switcher.css:32` | `var(--color-neon-pink, #FF10F0)` | Hardcoded as a fallback inside `var()` — acceptable |

---

## Recommended Actions

- **B-01:** Convert 7 pixel `font-size` values in `globals.css` to `clamp()` (see table above)
- **B-02:** Replace ~15 hardcoded hex in `globals.css` selectors with token refs from the brand colour system
- **B-03:** In `mobile-menu.css`, replace `#FF10F0` → `var(--color-neon-pink)`, `#F4FF3C` → `var(--color-neon-yellow)`
- **B-04:** In `style-guide-page.css`, replace hardcoded `#0F0F0F` → `var(--color-atomic-black)`, `#FF10F0` → `var(--color-neon-pink)`, `#F4FF3C` → `var(--color-neon-yellow)`
- **B-08:** In `light.css`, replace `#1A1A1A` with an appropriate light-mode token (create `--color-dark-ink: #1A1A1A` in the light theme `:root {}` if needed)
