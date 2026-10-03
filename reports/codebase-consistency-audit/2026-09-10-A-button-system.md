# Sub-audit A — Button System Consistency

**Date:** 2026-09-10
**Prompt:** `src/app/prompts/codebase-consistency-audit/orchestrator.md`

---

## Findings

| ID | File | Severity | Description |
|---|---|---|---|
| A-01 | `button-variations.css:69` | 🟡 Medium | `.wp-block-button__link--rounded` uses `font-family: var(--wp--preset--font-family--title)` — this token is NOT in the loaded CSS chain (only in unimported `content-typography.css`). Falls back to default font. |
| A-02 | `button.css` (general) | ✅ Pass | Canonical `.btn` system uses `clamp()` padding throughout. Border-radius uses `var(--wp--preset--border-radius--full/md/circle)`. Font-family uses `var(--wp--preset--font-family--brand-heading)`. |
| A-03 | `button-variations.css` (general) | ✅ Pass | `.wp-block-button__link` uses `clamp()` padding and `var(--wp--preset--border-radius--full)`. Ghost variant also uses `clamp()`. |
| A-04 | `read-more-btn.css` (general) | ✅ Pass | Default and compact variants both use `clamp()` padding. Border-radius uses token ref. |
| A-05 | `globals.css` `.button` block | ✅ Pass | Legacy `.button` system uses `clamp()` padding, `var(--wp--preset--font-family--brand-heading)`, `var(--wp--preset--border-radius--full)`. Marked as legacy with comment. |

---

## Button System Status

| System | Padding | Border-radius | Font-family | Token refs |
|---|---|---|---|---|
| `.btn` (canonical) | ✅ `clamp()` | ✅ token | ✅ token | ✅ |
| `.wp-block-button__link` | ✅ `clamp()` | ✅ token | 🟡 `--title` (unloaded token) | Partial |
| `.read-more-btn` | ✅ `clamp()` | ✅ token | ✅ token | ✅ |
| `.button` (legacy) | ✅ `clamp()` | ✅ token | ✅ token | ✅ |

---

## Accepted Exceptions

None.

---

## Recommended Actions

- **A-01:** In `button-variations.css:69`, change `font-family: var(--wp--preset--font-family--title)` → `font-family: var(--wp--preset--font-family--brand-heading)` (this token IS defined). Once E-01 is fixed (tokens/ imported), the `--title` token will be available — but using `--brand-heading` is still the correct project convention.
