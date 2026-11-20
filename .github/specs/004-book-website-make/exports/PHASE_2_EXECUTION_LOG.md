# Phase 2 Execution Log: Prompts 1, 2A, 2B (SC-004)

**Date**: 2026-11-20
**Execution model**: SC-004 — Claude direct execution (no Figma Make)
**Base**: `main` at `85df8a5` (after Gate 2 approval)
**Status**: ✅ All three prompts delivered and validated as specifications. ⏳ No repository code, `public/` files or deployment changed.

---

## Inputs

The requested handoff file `continuations/PHASE_2_HANDOFF.md` does not exist in the repository. Execution used these sources instead:

- `exports/SC-004_EXECUTION_MODEL_PIVOT.md` (execution model)
- `contracts/prompt-1-navigation-exposure.md`, `prompt-2a-design-baseline.md`, `prompt-2b-navigation-design.md`
- `references/02-companion-session-plan.md` (WP-02), `references/03-author-decisions-launch-scope.md` v1.3.0
- Repository evidence: `src/app/routes.ts`, `src/app/data/mock/book-site.ts`, `src/app/components/common/Header.tsx`, `ThemeToggleES5.tsx`, `SitemapPage.tsx`, `src/app/utils/seo.ts`, `public/sitemap.xml`, `public/robots.txt`, `netlify.toml`

---

## Results

| Prompt                  | Deliverables                                                                                                                                                                      | Criteria        | Validation                                                                                                      |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- | --------------------------------------------------------------------------------------------------------------- |
| 1 — Navigation exposure | [`prompt-1-navigation-exposure-output.md`](./prompt-1-navigation-exposure-output.md), [`navigation-exposure-rules.json`](./navigation-exposure-rules.json)                        | CR-1.1–1.6 ✅   | Before/after built from live source files; JSON parses                                                          |
| 2A — Design baseline    | [`design-tokens.css`](./design-tokens.css), [`design-tokens.json`](./design-tokens.json) (v2.0.0), [`prompt-2a-design-baseline-output.md`](./prompt-2a-design-baseline-output.md) | CR-2A.1–2A.6 ✅ | PostCSS parse; 116 CSS↔JSON value checks, 0 mismatches; 0 off-palette hex; contrast computed for all used pairs |
| 2B — Navigation design  | [`prompt-2b-navigation-design-output.md`](./prompt-2b-navigation-design-output.md), [`navigation-component.types.ts`](./navigation-component.types.ts)                            | CR-2B.1–2B.6 ✅ | `tsc --strict` clean; 26 behaviour assertions pass                                                              |

Also changed: [`navigation-specification.md`](./navigation-specification.md) now carries a superseded notice.

---

## Material findings

1. **Route names in the contracts are wrong.** `/about` and `/book` do not exist; the app uses `/about-ash` and `/the-book`.
2. **Menu size.** The contract's 4-item menu conflicts with WP-02 and CR-1.5. The output removes only Speaking, Events and Media, leaving 8 items in their existing order. **Ash to confirm** if a 4-item menu is wanted instead.
3. **robots.txt `Disallow` would defeat noindex.** It is deliberately not used.
4. **Single-page-app noindex leak.** `setSEO` must reset the robots tag on pages that do not set one, or `noindex` follows the visitor to the next page. An `X-Robots-Tag` header in `netlify.toml` is specified as the primary delivery.
5. **AAA contrast target (`AGENTS.md` D3).** After CodeRabbit review, nav hover/active text and both placeholders were moved to AAA-passing palette colours; the remaining AAA gaps are listed as owner decisions.
6. **Earlier 2A export defects corrected:** `prefers-color-scheme` theme switching (ignores saved preferences), two off-palette colours, inaccurate "AAA 7:1" claims, a 1.11:1 input border, missing type scale.
7. **No desktop navigation today.** The header shows one overlay menu at every width. Prompt 2B recovers an inline row at ≥768px and keeps a stateful drawer only on mobile.

---

## Open decisions for Ash

| ID           | Decision                                                                                                              | Where        |
| ------------ | --------------------------------------------------------------------------------------------------------------------- | ------------ |
| C1-2 / C2B-1 | 8-item menu (recommended) or a cut to 4 items                                                                         | Prompt 1 §2  |
| C1-4         | Canonical origin (`ashshaw.com` in sitemap and robots.txt)                                                            | Prompt 1 §2  |
| C1-5         | `/ebook` exposure and XML-sitemap inclusion                                                                           | Prompt 1 §2  |
| D-1 to D-4   | Dark-theme pairs below the AAA 7:1 target: tertiary brown, pink error text, primary button label on pink, purple text | Prompt 2A §4 |
| L-2, L-3     | Light-theme error and tertiary text: stay on-palette or approve `#C4005E` / `#5C5248`                                 | Prompt 2A §4 |
| —            | Light-theme role mapping as a whole                                                                                   | Prompt 2A §4 |

---

## Next steps (each needs separate authorisation)

1. Ash reviews the open decisions above.
2. Implement Prompt 1 changes using the checklist in Prompt 1 §6.
3. Import the tokens into `src/styles/` and reconcile with the existing theme files; confirm the build.
4. Implement the Prompt 2B header, with Vitest and Playwright coverage as listed in Prompt 2B §7.
