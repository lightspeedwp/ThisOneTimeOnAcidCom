# Sub-audit A — Button System Consistency

**Date:** 2026-06-19
**Severity breakdown:** 🔴 Critical: 1 | 🟠 High: 2 | 🟡 Medium: 2

---

## Summary

There are **three competing button systems** in the codebase. Only one uses fluid `clamp()` padding. The other two use hardcoded pixel values, creating visual inconsistency across the site. Additionally, `button.css` references multiple undefined CSS tokens (covered in full by Sub-audit E).

---

## A-01 — Three competing button systems 🔴 Critical

| System | File | Padding | Token usage |
|---|---|---|---|
| `.btn` | `button.css` | `clamp(0.75rem, 1.5vw, 1rem) clamp(1.5rem, 4vw, 2.5rem)` ✅ | Partial (refs undefined tokens) |
| `.button` | `globals.css:312` | `padding: 16px 32px` ❌ | Legacy `--color-*` only |
| `.wp-block-button__link` | `button-variations.css:13` | `padding: 12px 24px` ❌ | Mixed legacy/wp-preset |

The `.button` class in `globals.css` is a completely separate button component that does not inherit from `.btn`. It has hardcoded `padding: 16px 32px`, `font-size: 16px`, and uses `animation: neonPulseCTA` which may not be defined.

**Fix:** Either:
- **(Preferred)** Deprecate `.button` and migrate all usages to `.btn.btn--neon-primary`
- Or: Replace `padding: 16px 32px` with `padding: clamp(0.75rem, 1.5vw, 1rem) clamp(1.5rem, 4vw, 2.5rem)` to match the canonical `.btn` base

---

## A-02 — `.wp-block-button__link` hardcoded padding 🟠 High

`button-variations.css:13`:
```css
.wp-block-button__link {
  padding: 12px 24px;   /* ❌ hardcoded */
}
```

`button-variations.css:94`:
```css
.wp-block-button__link.is-style-ghost {
  padding: 8px 16px;   /* ❌ hardcoded */
}
```

These bypass the `.btn` fluid system entirely. On large viewports the buttons look undersized compared to `.btn` elements; on small viewports they don't shrink.

**Fix:**
```css
.wp-block-button__link {
  padding: clamp(0.75rem, 1.5vw, 1rem) clamp(1.5rem, 4vw, 2.5rem);
}
.wp-block-button__link.is-style-ghost {
  padding: clamp(0.25rem, 1vw, 0.5rem) clamp(0.75rem, 2vw, 1rem);
}
```

---

## A-03 — `read-more-btn.css` uses fixed rem padding 🟠 High

```css
.read-more-btn {
  padding: 0.75rem 1.25rem;   /* ❌ fixed rem, not fluid */
}
.read-more-btn--compact {
  padding: 0.25rem 0.75rem;   /* ❌ fixed rem, not fluid */
}
```

The read-more button is used on every blog card and portfolio card. Fixed rem padding means it doesn't scale with viewport like `.btn` does.

**Fix:**
```css
.read-more-btn {
  padding: clamp(0.5rem, 1.25vw, 0.75rem) clamp(0.875rem, 2.5vw, 1.25rem);
}
.read-more-btn--compact {
  padding: clamp(0.2rem, 0.75vw, 0.375rem) clamp(0.5rem, 1.5vw, 0.875rem);
}
```

---

## A-04 — `.btn--default` renders with no background 🟡 Medium

Depends on E-03 finding. `button.css:49`:
```css
.btn--default {
  background-color: var(--wp--preset--color--primary);  /* ❌ undefined token */
  color: #fff;   /* ❌ hardcoded */
}
```

Until `--wp--preset--color--primary` is defined, `.btn--default` buttons have a transparent background. `color: #fff` should use `var(--wp--preset--color--white)`.

---

## A-05 — `.button--primary` uses hardcoded `#ff52b9` hover 🟡 Medium

`globals.css:326`:
```css
.button--primary:hover {
  background-color: #ff52b9;  /* ❌ hardcoded — not a brand token */
}
```

`#ff52b9` is not a defined brand colour. The intended neon pink is `#FF10F0` (dark) or `#E0007A` (light). This should reference `var(--color-neon-pink)` to respect the theme.

---

## Accepted Exceptions

None — all findings require action.
