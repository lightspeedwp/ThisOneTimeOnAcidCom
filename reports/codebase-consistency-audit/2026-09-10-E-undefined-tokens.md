# Sub-audit E — Undefined & Mismatched CSS Token References

**Date:** 2026-09-10
**Prompt:** `src/app/prompts/codebase-consistency-audit/orchestrator.md`

---

## Critical Discovery — `src/styles/tokens/` Is Never Imported

The directory `src/styles/tokens/` contains 5 CSS files that together define the font-size scale, extended colour palette, layout widths, and interactive component tokens used across the entire site. **None of these files are imported anywhere** — not in `globals.css`, not in any TSX component, not in `index.css`.

```
src/styles/tokens/
├── content-animations.css   ← NEVER IMPORTED
├── content-colors.css        ← NEVER IMPORTED  
├── content-interactive.css   ← NEVER IMPORTED
├── content-layouts.css       ← NEVER IMPORTED
└── content-typography.css    ← NEVER IMPORTED
```

**Result:** Every `--wp--preset--font-size--*`, `--wp--preset--layout--*`, and extended colour token referenced in block CSS files resolves to `undefined`, silently falling back to browser defaults (typically `0`, `inherit`, or `auto`). This means text size hierarchy, max-width containers, and content accent colours are all broken.

---

## Findings

| ID | Token(s) | Severity | Used In | Defined? |
|---|---|---|---|---|
| E-01 | `--wp--preset--font-size--100` through `--900`, `--hero`, `--section`, `--small`, `--x-large`, `--large`, `--medium`, `--normal` | 🔴 Critical | All block CSS files (typography for every component) | `content-typography.css` — **NEVER LOADED** |
| E-02 | `--wp--preset--layout--content`, `--layout--wide`, `--layout--desktop-wide`, `--layout--desktop-xl`, `--layout--full`, `--layout--full-hd`, `--layout--ultra-wide` | 🔴 Critical | Layout containers across all pages | `content-layouts.css` — **NEVER LOADED** |
| E-03 | `--wp--preset--color--neon-green`, `--neon-cyan`, `--neon-orange` and their `*-text` variants; `--neon-blue-text`, `--neon-red-text`, `--neon-yellow-text`, `--neon-pink-text` (extended) | 🔴 Critical | `content-colors.css`, `content-interactive.css` — **NEVER LOADED** — content category accent system broken |
| E-04 | `--wp--preset--color--gray-50` through `--gray-900`; `--color--pure-black` | 🟠 High | `content-layouts.css` — **NEVER LOADED** |
| E-05 | `--wp--preset--shadow--sm`, `--md`, `--lg`, `--xl`, `--2xl`, `--card`, `--action-btn`, `--action-btn-glow`, `--action-btn-hover`, `--focus-ring-pink`, `--focus-ring-strong`, `--neon-md`, `--neon-pink-dot`, `--neon-purple-hover` | 🔴 Critical | Button, card, interactive CSS — not defined in globals.css or any loaded file |
| E-06 | `--wp--preset--border-radius--pill` (same as `full`), `--xl`, `--2xl`, `--200`, `--300`, `--400` | 🟠 High | Border radius on buttons, cards, badges — not defined anywhere |
| E-07 | `--wp--preset--spacing--70`, `--90`, `--100`, `--block-gap`, `--fluid-3xl` | 🟠 High | Spacing gaps in layout blocks — not defined in globals.css |
| E-08 | `--wp--preset--z-index--20`, `--z-index--header` | 🟠 High | Header layering, dropdown positioning — not defined |
| E-09 | `--wp--preset--font-family--title`, `--monospace`, `--blog-*`, `--content-*`, `--event-*`, `--faq-*`, `--podcast-*`, `--portfolio-*`, `--video-*` | 🟠 High | Content-type font families — `content-typography.css` NEVER LOADED |
| E-10 | `--wp--preset--gradient--cyberpunk`, `--hyperpop`, `--solar-flare`, `--toxic-lime` | 🟡 Medium | Decorative gradients — not defined in any loaded file |
| E-11 | `--wp--preset--aspect-ratio--video` | 🟡 Medium | Video player aspect ratio — not defined |

---

## Token Status Summary

| Token Category | Defined in globals.css | Defined in themes | Defined in tokens/ | Loaded? |
|---|---|---|---|---|
| Color — core brand | ✅ | ✅ | — | ✅ |
| Color — neutral-* (50–900) | ❌ | ✅ (dark.css + light.css) | — | ✅ |
| Color — extended neon/gray/pure-black | ❌ | ❌ | ✅ content-colors.css | ❌ NEVER LOADED |
| Font-size scale (100–900, hero, section) | ❌ | ❌ | ✅ content-typography.css | ❌ NEVER LOADED |
| Layout widths | ❌ | ❌ | ✅ content-layouts.css | ❌ NEVER LOADED |
| Shadow — core (focus-ring, neon-sm, card-hover, neon-pink/blue/purple) | ✅ | — | — | ✅ |
| Shadow — extended variants | ❌ | ❌ | ❌ | ❌ UNDEFINED |
| Border-radius — core (full, circle, lg, md, sm) | ✅ | — | — | ✅ |
| Border-radius — extended (pill, xl, 2xl) | ❌ | ❌ | ❌ | ❌ UNDEFINED |
| Spacing — core + fluid scale | ✅ | — | — | ✅ |
| Spacing — extended (70, 90, 100, 3xl) | ❌ | ❌ | ❌ | ❌ UNDEFINED |
| Z-index — core | ✅ | — | — | ✅ |
| Z-index — extended (20, header) | ❌ | ❌ | ❌ | ❌ UNDEFINED |
| Font-family — brand (heading, body, title) | ✅ | — | — | ✅ |
| Font-family — content-type specific | ❌ | ❌ | ✅ content-typography.css | ❌ NEVER LOADED |
| Gradients | ❌ | ❌ | ❌ | ❌ UNDEFINED |

---

## Accepted Exceptions

None.

---

## Recommended Actions

**Priority 1 (Critical — do first):**
Add `@import` statements for all 5 token files to `globals.css` immediately after the existing `@import "tailwindcss"` line:

```css
/* At the top of src/styles/globals.css, after the tailwindcss import */
@import "./tokens/content-colors.css";
@import "./tokens/content-typography.css";
@import "./tokens/content-layouts.css";
@import "./tokens/content-interactive.css";
@import "./tokens/content-animations.css";
```

**Priority 2 (High — after imports are added):**
Define missing extended tokens in `globals.css` `:root {}`:
- Shadow variants: `--wp--preset--shadow--sm/md/lg/xl/2xl/card/action-btn/focus-ring-pink/focus-ring-strong/neon-md/neon-pink-dot/neon-purple-hover`
- Border-radius: `--wp--preset--border-radius--pill` (= 9999px), `--xl` (1.5rem), `--2xl` (2rem)
- Spacing: `--wp--preset--spacing--70` (4rem), `--90` (5.5rem), `--100` (6rem), `--block-gap` (2rem), `--fluid-3xl` (clamp(6rem, 14vw, 12rem))
- Z-index: `--wp--preset--z-index--20` (20), `--z-index--header` (200)
