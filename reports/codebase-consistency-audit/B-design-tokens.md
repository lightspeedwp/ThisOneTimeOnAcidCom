# Sub-audit B — Design Token Consistency (Hardcoded Values)

**Date:** 2026-06-19
**Severity breakdown:** 🟠 High: 3 | 🟡 Medium: 2

---

## Summary

Hardcoded hex values and pixel sizes appear in selectors throughout `globals.css`, `dark.css`, and `dark-extended.css`. The core token contract in `:root {}` is solid, but the consuming selectors bypass it frequently.

---

## B-01 — Hardcoded hex colours in `globals.css` selectors 🟠 High

These appear in BEM selectors *after* the `:root {}` block, bypassing the token system:

| Line | Selector | Hardcoded value | Should be |
|---|---|---|---|
| 153 | `.header__nav-link` | `color: #F6F2EB` | `var(--color-text-light)` |
| 163 | `.header__nav-link:hover` | `color: #FF10F0` | `var(--color-neon-pink)` |
| 172 | `.header__nav-link--active` | `color: #F4FF3C` | `var(--color-neon-yellow)` |
| 301 | `.form--error .form__input` | `border-color: #FF3860` | `var(--wp--preset--color--neon-red)` or define `--color-error` |
| 314 | `.button--primary` | `color: #fff` | `var(--wp--preset--color--white)` |
| 326 | `.button--primary:hover` | `background-color: #ff52b9` | `var(--color-neon-pink)` |

The header nav link colours are particularly important — they won't respect light/dark mode toggling because they bypass the theme-aware `--color-*` token layer.

**Fix:** Replace all with their corresponding token references. For `.header__nav-link` the header is only rendered in dark mode context currently, but the token should still be used for consistency and future-proofing.

---

## B-02 — Hardcoded hex in `dark.css` and `dark-extended.css` selectors 🟠 High

`dark.css` has extensive hardcoded hex in its BEM selector overrides:

| Line | Value | Should be |
|---|---|---|
| 127 | `background-color: #0F0F0F` | `var(--color-atomic-black)` |
| 127 | `color: #F6F2EB` | `var(--color-text-light)` |
| 143 | `background-color: rgba(15, 15, 15, 0.95)` | `rgba(var(--color-atomic-black-rgb, 15, 15, 15), 0.95)` |
| 159 | `color: #FF3AAE` | `var(--color-neon-pink)` |
| 171 | `color: #CFC7BB` | `var(--color-text-muted)` |
| 176 | `color: #F6F2EB` | `var(--color-text-light)` |

`dark-extended.css` also has hardcoded values throughout (lines 11, 29, 38, 45, 60, 68).

These files were likely written before the token system was established. The `--color-*` token definitions at the top of `dark.css` are correct — the issue is that the component-level overrides in the same file don't reference them.

**Recommendation:** This is a large but mechanical fix. Create a dedicated `dark-mode-tokens-pass` task to sweep both files.

---

## B-03 — Hardcoded pixel `font-size` in `globals.css` typography classes 🟠 High

Several global typography classes use fixed `px` sizes that won't scale with viewport:

| Class | Current | Should be |
|---|---|---|
| `.eyebrow` | `font-size: 12px` | `font-size: clamp(0.625rem, 1vw, 0.75rem)` or token |
| `.heading-card` | `font-size: 24px` | `font-size: clamp(1.25rem, 2.5vw, 1.5rem)` |
| `.text-body` | `font-size: 16px` | `font-size: clamp(0.875rem, 1.5vw, 1rem)` |
| `.text-fine` | `font-size: 12px` | `font-size: clamp(0.625rem, 1vw, 0.75rem)` |
| `.form__label` | `font-size: 14px` | `font-size: clamp(0.75rem, 1.25vw, 0.875rem)` |

`globals.css` correctly uses `clamp()` for `.heading-hero`, `.heading-section`, and `.text-lead`, but inconsistently falls back to `px` for the smaller type styles.

---

## B-04 — Dual token system used inconsistently 🟡 Medium

Three usage patterns are mixed across CSS files:

1. **Legacy `--color-*`** — e.g., `var(--color-neon-pink)` in `button-variations.css:42`, `dark.css` component overrides
2. **WP preset `--wp--preset--color--*`** — e.g., `var(--wp--preset--color--neon-pink)` in `button.css`, `read-more-btn.css`
3. **Hardcoded hex** — e.g., `#FF10F0` in some components

`globals.css` correctly defines both systems with aliases (`--color-neon-pink: var(--wp--preset--color--neon-pink)`). The issue is that newer CSS files use `--wp--preset--*` but older files still use `--color-*`, making cross-file consistency impossible to verify visually.

**Recommendation:** Adopt `--wp--preset--color--*` as the single forward-going standard. All new block CSS files must use `--wp--preset--color--*` only.

---

## B-05 — `globals.css` contains legacy `.button` system alongside `.btn` 🟡 Medium

`globals.css` lines 308–339 define a `.button` / `.button--primary` / `.button--secondary` block. This is a relic from an earlier version of the site and conflicts with `button.css`'s `.btn` system.

Any component using `.button--primary` (not `.btn.btn--neon-primary`) gets:
- Hardcoded `padding: 16px 32px`
- Wrong `font-family: var(--font-heading)` instead of `--wp--preset--font-family--brand-body`
- `animation: neonPulseCTA` which may or may not be defined

**Fix:** Audit which components (if any) use `.button` vs `.btn`, then either migrate or deprecate the `.button` block from `globals.css`.
