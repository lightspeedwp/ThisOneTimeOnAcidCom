# Prompt 2A Output: Design Baseline Export

**Date**: 2026-11-20
**Execution model**: SC-004 (Claude direct execution)
**Contract**: [`contracts/prompt-2a-design-baseline.md`](../contracts/prompt-2a-design-baseline.md)
**Deliverables**: [`design-tokens.css`](./design-tokens.css), [`design-tokens.json`](./design-tokens.json) (both v2.0.0, replacing the earlier v1.0.0 export)
**Status**: ✅ Delivered and validated. ⏳ Light-theme mapping still pending approval.

---

## 1. What changed from the earlier export (v1.0.0 → v2.0.0)

The earlier export was reviewed against the contract, the repository and computed contrast ratios. Six defects were corrected:

| #   | Defect in v1.0.0                                                                                                                                                                                                                                                      | Correction in v2.0.0                                                                                                                          |
| --- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| D1  | Theme switching used `@media (prefers-color-scheme)`. The site uses a saved preference (`localStorage.theme`) applied as `<html data-theme>` by `ThemeToggleES5`, and defaults to dark. A visitor with a light OS and a saved dark preference would get light tokens. | Dark is the `:root` default; light applies only under `:root[data-theme='light']`. `prefers-color-scheme` is not used.                        |
| D2  | Two off-palette hex values (`#5C5248`, `#C4005E`) were introduced into the light theme, breaching CR-2A.1 ("no drift").                                                                                                                                               | Removed. Every colour now resolves to one of the nine primitives. The two values are listed in §4 as candidates for Ash to approve or reject. |
| D3  | Comments claimed "WCAG AAA 7:1" for pairs that measure 6.05:1, 6.83:1 and 5.36:1.                                                                                                                                                                                     | Claims removed. Measured ratios are in §3.                                                                                                    |
| D4  | Dark input border `#171722` on the input fill measured 1.11:1, failing WCAG 1.4.11 (3:1 for component boundaries).                                                                                                                                                    | Dark border is now warm-brown `#9C9488` on a `#171722` fill (5.93:1).                                                                         |
| D5  | Typography weights and sizes were missing (CR-2A.2).                                                                                                                                                                                                                  | Heading, body and UI scales added.                                                                                                            |
| D6  | Component variables existed only with `-dark`/`-light` suffixes; the contract names are unsuffixed (`--button-bg-primary`, `--nav-link-color`, …).                                                                                                                    | Unsuffixed **active aliases** added; they switch with the theme. Components consume these.                                                    |

---

## 2. Token inventory

| Group                                                                            | Count | Status           |
| -------------------------------------------------------------------------------- | ----- | ---------------- |
| Font families (`--font-heading`, `--font-body`, `--font-ui`)                     | 3     | Approved         |
| Typography weights and sizes                                                     | 16    | Approved         |
| Palette primitives                                                               | 9     | Approved         |
| Dark-theme roles                                                                 | 9     | Approved         |
| Light-theme roles                                                                | 9     | ⚠️ Pending       |
| Component tokens (Button, Card, Navigation, Form input): 52 per-theme + 5 shared | 57    | Proposed mapping |
| Active aliases (theme-switching)                                                 | 32    | Proposed mapping |

**Typography**

| Role     | Family        | Weights  | Sizes             |
| -------- | ------------- | -------- | ----------------- |
| Headings | Space Grotesk | 600, 700 | 24, 32, 40, 48 px |
| Body     | Inter         | 400, 500 | 14, 16, 18 px     |
| UI       | Inter         | 500, 600 | 12, 14, 16 px     |

Sizes are fixed pixel values. Fluid sizing would be candidate R3, which is unapproved.

---

## 3. Contrast validation (WCAG 2.2)

Ratios computed with the WCAG relative-luminance formula. Text needs 4.5:1 (AA); UI boundaries and focus indicators need 3:1.

### Dark theme (approved)

| Pair                                   | Ratio | Use                          | Result                      |
| -------------------------------------- | ----- | ---------------------------- | --------------------------- |
| Cream `#F6F2EB` on deepest `#0B0B10`   | 17.59 | Body text                    | ✅ AAA                      |
| Tan `#CFC7BB` on dark-purple `#12121A` | 11.13 | Secondary text               | ✅ AAA                      |
| Brown `#9C9488` on deepest             | 6.55  | Tertiary text                | ✅ AA                       |
| Pink `#FF3AAE` on deepest              | 6.05  | Nav hover/active, error text | ✅ AA                       |
| Deepest on pink                        | 6.05  | Primary button label         | ✅ AA                       |
| Purple `#8A63FF` on deepest            | 4.96  | Accent text                  | ✅ AA                       |
| Brown border on `#171722` input fill   | 5.93  | Input boundary               | ✅ ≥3:1                     |
| Pink focus ring on deepest             | 6.05  | Focus indicator              | ✅ ≥3:1                     |
| `#171722` card border on dark-purple   | 1.05  | Card edge                    | ℹ️ Decorative; not required |

### Light theme (⚠️ pending) — failures that shaped the mapping

| Pair                       | Ratio | Consequence                                                                                                                       |
| -------------------------- | ----- | --------------------------------------------------------------------------------------------------------------------------------- |
| Pink on cream              | 2.91  | Pink cannot be used for text or the focus ring in light. Nav hover/active keep dark text; state is shown by underline and weight. |
| Brown on cream             | 2.69  | Brown cannot be tertiary text. `#171722` used instead (loses some hierarchy).                                                     |
| Tan border on cream        | 1.50  | Input border moved to `#171722`.                                                                                                  |
| Purple on cream            | 3.54  | Usable for the focused input border (≥3:1), not for text.                                                                         |
| Brown placeholder on cream | 2.69  | ⚠️ **Still fails.** No on-palette colour gives a readable but subdued placeholder. See §4.                                        |

---

## 4. Decisions needed from Ash (light theme)

These cannot be solved inside the nine-colour palette:

| ID     | Issue                                        | Option A (stay on-palette)                                  | Option B (approve a derived value) |
| ------ | -------------------------------------------- | ----------------------------------------------------------- | ---------------------------------- |
| ⚠️ L-1 | Light placeholder text fails AA (2.69:1)     | Keep, and never use a placeholder as the only label         | Approve `#5C5248` (6.83:1, AA)     |
| ⚠️ L-2 | Light error text cannot be pink (2.91:1)     | Dark text plus error icon and pink border (current mapping) | Approve `#C4005E` (5.36:1, AA)     |
| ⚠️ L-3 | Light tertiary text collapses into secondary | Accept reduced hierarchy (current mapping)                  | Approve `#5C5248` as tertiary text |

The full light-theme role mapping still needs approval as recorded in `references/05-design-reader-decision-register.md` (Theme scope).

---

## 5. Component state notes

- **Button**: primary, secondary (with a visible border so it does not rely on the fill alone) and disabled. Disabled text is exempt from contrast rules but must also be `disabled`/`aria-disabled`.
- **Card**: default and hover. Hover changes border colour _and_ shadow.
- **Navigation**: default, hover, active, focus. Consumed by Prompt 2B.
- **Form input**: default, focused, error, placeholder. In dark, error and focus share the pink accent, so the error state **must** also carry `aria-invalid="true"`, an error icon and a text message (colour is not the only cue).

---

## 6. Acceptance criteria

| ID      | Criterion                                                              | Result  | Evidence                                                                                |
| ------- | ---------------------------------------------------------------------- | ------- | --------------------------------------------------------------------------------------- |
| CR-2A.1 | Tokens match the approved baseline exactly (no drift)                  | ✅ Pass | Automated check: 0 off-palette hex values; all colours resolve to the 9 primitives (D2) |
| CR-2A.2 | Space Grotesk headings, Inter body/UI with weights and sizes           | ✅ Pass | §2 typography table (D5)                                                                |
| CR-2A.3 | 9 primitives + 9 dark + 9 light theme variables; light flagged pending | ✅ Pass | §2 inventory; CSS and JSON both mark light as pending                                   |
| CR-2A.4 | R3, T1, RT2, C1 absent                                                 | ✅ Pass | No fluid sizing, reader controls or progress tokens; candidates listed as absent        |
| CR-2A.5 | Button, Card, Navigation, Form input with all states                   | ✅ Pass | §5; per-theme tokens plus active aliases (D6)                                           |
| CR-2A.6 | CSS and JSON both valid and matching                                   | ✅ Pass | PostCSS parse OK; `JSON.parse` OK; 116 value checks, 0 mismatches                       |

### Validation method

A one-off Node check (run in-session, not committed) parsed `design-tokens.css` with PostCSS, resolved every `var()` chain, and compared:

- 9 primitives, 18 theme roles, 52 per-theme component tokens and 5 shared navigation tokens (84) against `design-tokens.json`;
- each of the 32 light aliases against its dark twin (same name, `-light` instead of `-dark`).

Result: `checks=116 mismatches=0 off-palette-hex=[]`.

### Not yet done (out of scope for 2A)

- The tokens are **not imported** into `src/styles/`. The site's existing theme files (`src/styles/theme.css`, `src/styles/tokens/`) are unchanged. Reconciling them is a separate, authorised implementation step.
- "Build succeeds with imported tokens" (contract validation checklist) can only be checked once the import is authorised.
