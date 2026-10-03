# Sub-audit E — Undefined & Mismatched CSS Token References

**Date:** 2026-06-19
**Severity breakdown:** 🔴 Critical: 4 groups | 🟠 High: 3 groups | 🟡 Medium: 2 groups

---

## Summary

A large number of `--wp--preset--*` tokens are referenced across `button.css`, `read-more-btn.css`, `not-found-page.css`, `utility-helpers.css`, and the `src/styles/tokens/` files, but are **never defined** in `globals.css`, `themes/dark.css`, `themes/light.css`, or `themes/dark-extended.css`. These tokens silently fall back to empty strings, producing invisible or broken styles.

---

## E-01 — Undefined shadow tokens 🔴 Critical

Tokens referenced but **not defined anywhere**:

| Token | Used in |
|---|---|
| `--wp--preset--shadow--focus-ring` | `button.css:39,44` |
| `--wp--preset--shadow--neon-sm` | `button.css:55` |
| `--wp--preset--shadow--card-hover` | `tokens/content-interactive.css:355` |
| `--wp--preset--shadow--neon-pink` | `tokens/content-interactive.css:360` |
| `--wp--preset--shadow--neon-blue` | `tokens/content-interactive.css:370` |
| `--wp--preset--shadow--neon-purple` | `tokens/content-interactive.css:375` |

**Impact:** All button focus states, hover neon glows, and card shadows are invisible. Every `.btn:focus-visible` and `.btn:hover` renders without a shadow.

**Fix:** Define all shadow tokens in `globals.css` `:root {}`:

```css
--wp--preset--shadow--focus-ring: 0 0 0 3px rgba(255, 16, 240, 0.4);
--wp--preset--shadow--neon-sm: 0 0 8px rgba(255, 16, 240, 0.35);
--wp--preset--shadow--card-hover: 0 8px 24px rgba(0, 0, 0, 0.4);
--wp--preset--shadow--neon-pink: 0 0 12px rgba(255, 16, 240, 0.5), 0 0 24px rgba(255, 16, 240, 0.25);
--wp--preset--shadow--neon-blue: 0 0 12px rgba(31, 81, 255, 0.5), 0 0 24px rgba(31, 81, 255, 0.25);
--wp--preset--shadow--neon-purple: 0 0 12px rgba(190, 0, 254, 0.5), 0 0 24px rgba(190, 0, 254, 0.25);
```

---

## E-02 — Undefined border-radius tokens 🔴 Critical

| Token | Used in |
|---|---|
| `--wp--preset--border-radius--full` | `button.css:9`, `read-more-btn.css:17` |
| `--wp--preset--border-radius--md` | `button.css:245`, `tokens/content-layouts.css:57`, `tokens/content-interactive.css:341` |
| `--wp--preset--border-radius--circle` | `button.css:261` |
| `--wp--preset--border-radius--lg` | `tokens/content-layouts.css:57`, `tokens/content-interactive.css:341` |

**Impact:** All `.btn` elements and read-more buttons render with no `border-radius` (sharp corners). `.btn--icon` circles are square.

**Fix:**

```css
--wp--preset--border-radius--full: 9999px;
--wp--preset--border-radius--circle: 50%;
--wp--preset--border-radius--lg: 1rem;
--wp--preset--border-radius--md: 0.5rem;
--wp--preset--border-radius--sm: 0.25rem;
```

---

## E-03 — Undefined colour tokens used in button.css 🔴 Critical

| Token | Used in |
|---|---|
| `--wp--preset--color--primary` | `button.css:49` (`.btn--default` background) |
| `--wp--preset--color--neon-purple` | `button.css:38,43` (focus/hover border), `read-more-btn.css:15,22,24` |
| `--wp--preset--color--neon-purple-text` | `read-more-btn.css:10` |
| `--wp--preset--color--neon-pink-text` | `button.css:168` |

`globals.css` defines `--wp--preset--color--neon-pink` (#FF10F0) and `--wp--preset--color--uv-violet` (#8A63FF) but not the aliases above.

**Impact:** `.btn--default` renders with no background colour (transparent). Focus/hover ring on all buttons has no colour. Read-more button text is invisible.

**Fix:** Add aliases in `globals.css` `:root {}`:

```css
--wp--preset--color--primary: var(--wp--preset--color--neon-pink);
--wp--preset--color--neon-purple: var(--wp--preset--color--uv-violet);
--wp--preset--color--neon-purple-text: #6B3FCC; /* accessible dark mode text */
--wp--preset--color--neon-pink-text: #CC007A;   /* accessible light mode text */
```

---

## E-04 — Undefined semantic colour tokens 🔴 Critical

| Token | Used in |
|---|---|
| `--wp--preset--color--base` | `not-found-page.css:12`, `tokens/content-interactive.css:340` |
| `--wp--preset--color--contrast` | `not-found-page.css:36,51` |

These are standard WordPress theme.json semantic tokens but are not defined in any CSS file. `not-found-page.css` background falls back to `transparent`, title falls back to `inherit`.

**Fix:**

```css
--wp--preset--color--base: var(--color-atomic-black);
--wp--preset--color--contrast: var(--color-text-light);
```

With `.dark` override:
```css
.dark {
  --wp--preset--color--base: #0F0F0F;
  --wp--preset--color--contrast: #F6F2EB;
}
```

---

## E-05 — Undefined font-family brand tokens 🟠 High

| Token | Used in |
|---|---|
| `--wp--preset--font-family--brand-heading` | `button-variations.css:8`, `tokens/content-layouts.css:124`, `tokens/content-interactive.css:26,225` |
| `--wp--preset--font-family--brand-body` | `button.css:13`, `tokens/content-layouts.css:135`, `tokens/content-interactive.css:239` |
| `--wp--preset--font-family--brand-title` | `tokens/content-interactive.css:211` |

`globals.css` defines `--wp--preset--font-family--heading` and `--wp--preset--font-family--body` (without the `brand-` prefix). All `brand-` prefixed aliases are undefined.

**Fix:** Add aliases in `globals.css` `:root {}`:

```css
--wp--preset--font-family--brand-heading: var(--wp--preset--font-family--heading);
--wp--preset--font-family--brand-body: var(--wp--preset--font-family--body);
--wp--preset--font-family--brand-title: 'Righteous', var(--wp--preset--font-family--heading);
```

---

## E-06 — Undefined spacing tokens 🟠 High

| Token | Used in |
|---|---|
| `--wp--preset--spacing--fluid-sm` | `tokens/content-interactive.css:46` |
| `--wp--preset--spacing--fluid-md` | `utility-helpers.css:10,16`, `tokens/content-layouts.css:131` |
| `--wp--preset--spacing--fluid-lg` | `utility-helpers.css:11,15`, `tokens/content-layouts.css:11` |
| `--wp--preset--spacing--fluid-xl` | `utility-helpers.css:12,13`, `tokens/content-layouts.css:118` |
| `--wp--preset--spacing--fluid-2xl` | `utility-helpers.css:13`, `tokens/content-layouts.css:155` |
| `--wp--preset--spacing--section-horizontal` | `utility-helpers.css:8`, `tokens/content-layouts.css:118` |
| `--wp--preset--spacing--section-vertical` | `utility-helpers.css:9` |
| `--wp--preset--spacing--80` | `tokens/content-layouts.css:105,107` |
| `--wp--preset--spacing--50`, `60` | `utility-helpers.css:124,125` |

Only `--wp--preset--spacing--10`, `20`, `30`, `40` are defined (in `brutalist.css`). All fluid and section spacing tokens are undefined.

**Fix:** Add fluid spacing scale in `globals.css` `:root {}`:

```css
--wp--preset--spacing--10: 0.5rem;
--wp--preset--spacing--20: 1rem;
--wp--preset--spacing--30: 1.5rem;
--wp--preset--spacing--40: 2rem;
--wp--preset--spacing--50: 2.5rem;
--wp--preset--spacing--60: 3rem;
--wp--preset--spacing--80: 5rem;

--wp--preset--spacing--fluid-xs: clamp(0.25rem, 1vw, 0.5rem);
--wp--preset--spacing--fluid-sm: clamp(0.5rem, 1.5vw, 1rem);
--wp--preset--spacing--fluid-md: clamp(1rem, 3vw, 2rem);
--wp--preset--spacing--fluid-lg: clamp(2rem, 5vw, 4rem);
--wp--preset--spacing--fluid-xl: clamp(3rem, 7vw, 6rem);
--wp--preset--spacing--fluid-2xl: clamp(4rem, 10vw, 8rem);

--wp--preset--spacing--section-horizontal: clamp(1.5rem, 6vw, 4rem);
--wp--preset--spacing--section-vertical: clamp(3rem, 8vw, 6rem);
```

---

## E-07 — Undefined z-index tokens 🟠 High

| Token | Used in |
|---|---|
| `--wp--preset--z-index--0` | `button.css:137` |
| `--wp--preset--z-index--n1` | `button.css:148` |

**Impact:** `.btn--neon-primary` `z-index` stacking is undefined — gradient overlay pseudo-element may render above button content.

**Fix:**

```css
--wp--preset--z-index--n1: -1;
--wp--preset--z-index--0: 0;
--wp--preset--z-index--1: 1;
--wp--preset--z-index--10: 10;
--wp--preset--z-index--100: 100;
--wp--preset--z-index--overlay: 1000;
--wp--preset--z-index--modal: 9000;
--wp--preset--z-index--toast: 9999;
```

---

## E-08 — Token naming inconsistency: legacy vs wp-preset 🟡 Medium

Two parallel token systems coexist in the same files:

| Legacy token | WP preset equivalent |
|---|---|
| `--color-neon-pink` | `--wp--preset--color--neon-pink` |
| `--color-atomic-black` | `--wp--preset--color--atomic-black` |
| `--font-body` | `--wp--preset--font-family--body` |
| `--font-heading` | `--wp--preset--font-family--heading` |

`globals.css` defines both and aliases them. But `button-variations.css` uses `--color-neon-pink` and `--color-neon-blue` (legacy), while `button.css` uses `--wp--preset--color--*` (WP preset). This split makes it hard to retheme consistently.

**Recommendation:** All new CSS should use `--wp--preset--color--*` only. Existing legacy token usages in `globals.css` body and header rules should be migrated in a dedicated pass.

---

## E-09 — Hardcoded hex in dark.css & dark-extended.css 🟡 Medium

`dark.css` and `dark-extended.css` contain many hardcoded hex values in selectors, bypassing the token system entirely:

- `dark.css:127` — `background-color: #0F0F0F` → should be `var(--color-atomic-black)`
- `dark.css:127` — `color: #F6F2EB` → should be `var(--color-text-light)`
- `dark.css:143` — `background-color: rgba(15, 15, 15, 0.95)` → should reference `--color-atomic-black`
- `dark.css:159` — `color: #FF3AAE` → should be `var(--color-neon-pink)`
- `dark-extended.css:11` — `border-color: #333333` → should be `var(--color-border)`
- `dark-extended.css:60` — `color: #FF3AAE` → should be `var(--color-neon-pink)`

This is a systemic issue throughout both files.
