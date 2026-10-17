# Ash Shaw Makeup – Full Design‑System Audit Prompt

**Version:** 1.0.0
**Created:** March 2, 2026
**Source:** `/imports/ash-shaw-makeup-audit-1.md`
**Reusable:** Yes — re-run this prompt at any time for an up-to-date audit.

---

## Purpose

This prompt initiates a **comprehensive, file‑wide audit** of the **Ash Shaw Makeup Portfolio** codebase in **Figma Make**. The objective is to ensure that **every page component, CSS block, data file, and shared component** adheres to the project's **Neon vs Atomic Black** design system, strict BEM architecture, naming conventions and accessibility guidelines.

The audit goes beyond design tokens to evaluate structural patterns, animations, motion preferences, and the integration of guidelines related to dark/light modes, neon identity, spacing, documentation, tasks and reporting. The audit surfaces deviations and creates a remediation roadmap — without directly editing production code during the audit phase.

### Value

- **Visual fidelity** — verifies that neon colours, gradients, animations and typography reflect the bold, cyber‑punk aesthetic defined in the design tokens and that dark/light modes are implemented correctly across all pages. See [neon-colors.md](../guidelines/design-tokens/neon-colors.md) and [dark-mode-implementation.md](../guidelines/dark-mode-implementation.md).
- **System consistency** — ensures strict adherence to semantic BEM classes, absence of Tailwind utilities and no inline styles (except accepted CSS custom property injection pattern). See [Guidelines.md — BEM Architecture](../guidelines/Guidelines.md#critical-styling-rule---strict-bem-architecture) and [css-architecture.md](../guidelines/css-architecture.md).
- **Accessibility & performance** — checks that the implementation meets WCAG 2.1 AA criteria, honours `prefers-reduced-motion`, uses variable fonts to reduce payload and includes proper alt text and ARIA labels. See [accessibility-report-feb-2025.md](../guidelines/accessibility-report-feb-2025.md) and [prefers-reduced-motion.md](../guidelines/prefers-reduced-motion.md).
- **Holistic guideline adherence** — ensures that the broader guidelines (neon system, light/dark mode, spacing, colours, animations, documentation) are correctly integrated and that any missing cross‑references are identified.

### Risks

- The codebase contains extensive animations and neon effects; misinterpreting custom semantic utility classes (e.g., `.bg-atomic-noise`, `.text-center`, `.gap-fluid-sm`) as Tailwind violations will produce false positives. **Always verify against `/styles/globals.css` and `/styles/blocks/*.css` before flagging a class.**
- CSS custom property injection via `style={{ '--node-index': index } as React.CSSProperties}` is an **accepted, documented pattern** (confirmed in `/tasks/task-list.md`). Do NOT flag these as inline style violations.
- Do not modify any component or CSS file during the audit; all issues should be documented in the report and task list only.

### Next step

Follow the audit steps below. When complete, export a report to `/reports/design-system-audit/report.md` and add tasks to `/tasks/task-list.md`.

---

## Audit Steps

### 1. Inventory & classification

1. **List all pages, components, sections and UI primitives** — cross-reference against the component tree in [overview-components.md](../guidelines/overview-components.md). Note any components missing from the diagram.

2. **Inventory every CSS block file** in `/styles/blocks/` and cross-reference against [css-architecture.md](../guidelines/css-architecture.md). Flag orphaned CSS files (no importing component) or components that import no CSS.

3. **Capture style attributes** for each component: BEM class names, font classes, colour references, spacing tokens, animation names, shadow/glow tokens. Note any inline styles or Tailwind classes — **both are banned** unless explicitly listed as accepted exceptions.

   **Accepted exceptions (do NOT flag):**
   - `style={{ '--prop': value } as React.CSSProperties}` — CSS custom property injection for stagger animations
   - `style={{ width: \`${pct}%\` }}` — dynamic percentage widths on progress bars and chart bars
   - `style={{ transform: \`translateX(${n}%)\` }}` — dynamic transforms on swipe/slider elements
   - Classes defined in `/styles/globals.css` or any `/styles/blocks/*.css` file — these are semantic BEM classes, not Tailwind utilities. Always verify before flagging.

4. **Classify each page component** according to the design system hierarchy: Hero section, Card, Grid, Section, Template Part. Map against the guidelines' pattern documentation.

### 2. Typography compliance

1. Verify only authorised font classes are used:
   - `.font-heading` → Playfair Display (elegant headings)
   - `.font-body` → Inter (readable body text)
   - `.font-title` → Righteous (hero titles only)
   - See [design-tokens/typography.md](../guidelines/design-tokens/typography.md) for the full scale.

2. Check that fluid type scale classes are used (`text-hero-h1`, `text-section-h2`, `text-body-p`, `text-card-h3`, etc.). Flag any hard‑coded `px` font sizes.

3. Verify heading hierarchy — each page must have exactly one H1. Confirm H2–H6 are semantically ordered.

4. Verify **sentence case** on all headings, labels, captions, breadcrumbs and button text — only the first word and proper nouns (Ash, Berlin, LightSpeed, etc.) are capitalised. See [voice-and-tone.md](../guidelines/voice-and-tone.md).

5. Confirm no Tailwind typography classes (`text-xl`, `font-bold`, `leading-none`) remain in component JSX. Check `/styles/globals.css` first — if the class is defined there it is an approved semantic alias, not Tailwind.

### 3. Colour and gradient system

1. Identify all colour references. Ensure they use neon colour CSS variables defined in [neon-colors.md](../guidelines/design-tokens/neon-colors.md):
   - `var(--wp--preset--color--neon-green)` / `--neon-pink` / `--neon-blue` / `--neon-yellow` / `--neon-orange` / `--neon-purple` / `--neon-cyan` / `--neon-red`
   - Accessible text variants: `--neon-*-text` (darker, WCAG AA compliant in light mode)
   - Atomic Black: `var(--wp--preset--color--atomic-black)` = `#0F0F0F`

2. Check that backgrounds use `var(--wp--preset--color--atomic-black)` or a defined gradient variable. Hard‑coded hex values outside SVG/asset definitions should be flagged.

3. Verify dark and light mode variants exist for all BEM blocks. Check `.dark .block { }` rules in each CSS file. See [component-dark-mode.md](../guidelines/component-dark-mode.md).

4. Verify contrast ratios ≥ 4.5:1 for body text in both light and dark modes. Check neon text variants (accessible darker variants) are used in light mode.

5. Review animated gradients to ensure they reference the four signature gradients defined in [animations.md](../guidelines/design-tokens/animations.md): Cyberpunk, Toxic Lime, Solar Flare, Hyperpop.

### 4. Spacing & layout

1. Verify spacing uses fluid token variables (`var(--wp--preset--spacing--fluid-xs/sm/md/lg/xl/2xl)`) or fixed numeric tokens (`--wp--preset--spacing--10` through `--wp--preset--spacing--100`). Flag hard‑coded pixel values in CSS. See [design-tokens/spacing.md](../guidelines/design-tokens/spacing.md).

2. Verify layout classes use BEM blocks (e.g., `.hero__content`, `.card__body`) — no Tailwind spacing utilities (`p-4`, `gap-8`, `m-2`).

3. Confirm container widths use defined container classes (`container-wide`, `container-7xl`, `container-3xl`, etc.) and that breakpoints match the fluid width system in the guidelines.

4. Flag any Tailwind arbitrary value syntax (`p-[0px]`, `w-[300px]`, `h-[50px]`) which is strictly forbidden.

### 5. Borders, radii, shadows & glows

1. Confirm corner radii use defined tokens: `var(--wp--preset--border-radius--sm/md/lg/xl/2xl/full/circle)`. Flag custom or hard‑coded `border-radius` values in CSS.

2. Inspect shadows and glows. Ensure they use shadow tokens (`var(--wp--preset--shadow--sm/md/lg/xl/neon-sm/neon-md/neon-lg/neon-pink/neon-purple/neon-blue/card/focus-ring)`). Flag undefined shadow or glow values.

3. Verify transitions use duration variables (`var(--wp--custom--animation--slow/fast)`) and easing variables (`var(--wp--custom--ease--bounce)`).

### 6. Accessibility & usability

1. Evaluate contrast ratios — WCAG 2.1 AA minimum (≥ 4.5:1 body text, ≥ 3:1 large text and UI components). Reference [accessibility-report-feb-2025.md](../guidelines/accessibility-report-feb-2025.md).

2. Verify all interactive elements (buttons, links, inputs, accordion toggles, lightbox controls) have `:focus-visible` styles using neon-pink focus rings: `box-shadow: 0 0 0 3px var(--wp--preset--color--neon-pink)`.

3. Ensure all `<img>` elements have meaningful `alt` text. Icons rendered via Lucide must have `aria-hidden="true"` if decorative, or `aria-label` if standalone interactive.

4. Confirm animations respect `prefers-reduced-motion`:
   - Global catch-all in `/styles/animations.css` disables all keyframe animations when reduced motion is preferred.
   - Individual block CSS files must suppress CSS `transition` properties too (not covered by the global keyframe rule).
   - See [prefers-reduced-motion.md](../guidelines/prefers-reduced-motion.md) for the full coding standard.

5. Verify `<main id="main-content" tabIndex={-1}>` exists on every page (for skip-link focus target).

6. Verify `role="main"` or semantic `<main>` is used — not `<div>` as the primary content container.

### 7. BEM architecture & content

1. **BEM naming** — verify class names follow `.block`, `.block__element`, `.block--modifier`, `.block__element--modifier`. Flag generic class names that don't reflect component purpose.

2. **No Tailwind utilities** — identify any Tailwind utility classes not defined in `/styles/globals.css` or `/styles/blocks/*.css`. Check especially: `flex`, `grid`, `p-N`, `m-N`, `gap-N`, `text-[size]`, `font-[weight]`, `leading-`, `rounded`, `shadow-`, `bg-`, `items-`, `justify-`, `overflow-`, `inset-`, `z-N`, and arbitrary value syntax `[value]`.

3. **No inline styles** — flag any `style={{ ... }}` that is NOT:
   - A CSS custom property injection (`'--prop': value`)
   - A dynamic percentage/transform required for a live calculation
   - In a dev-tool demonstration page (StyleGuidePage, PlaygroundPage)

4. **No hardcoded content** — all visible text, images and UI labels must be imported from `/data/mock/`. Flag any JSX string literals that should be in data files.

5. **Sentence case** — all headings, labels, breadcrumbs, button text and captions must follow sentence case. Check data files too (`/data/mock/pages/`, `/data/mock/ui/`).

6. **Image protection** — verify no `figma:asset/` imports have been replaced with Unsplash or placeholder URLs. All `OptimizedImage` usages must reference data-driven or `figma:asset` sources.

### 8. Report compilation

Write a Markdown report to `/reports/design-system-audit/report.md` containing:

1. **Summary** — count of files audited, total violations by category and severity.
2. **Violations** — table listing each violation: element/file, line number, guideline broken, description, recommended fix with token/class reference.
3. **Observations** — patterns or systemic issues (e.g., multiple pages using a Tailwind override hack, missing reduced-motion transitions in specific CSS blocks).
4. **Accepted exceptions** — list of flagged items reviewed and confirmed as intentional, documented exceptions.
5. **Recommendations** — suggestions for updating guidelines or tokens if gaps are discovered.

### 9. Task list generation

Append tasks to `/tasks/task-list.md` for each actionable finding. Each task must include:
- **Title** (imperative verb phrase in sentence case)
- **File(s)** affected
- **Priority** (P0 Critical / P1 High / P2 Medium / P3 Low)
- **Status** (default: To Do)
- **Fix description** with token/class reference

Group similar issues where possible (e.g., "Remove all `p-[0px]` Tailwind arbitrary values from production components").

---

## Notes

- Always cross-reference `/styles/globals.css` and the relevant `/styles/blocks/*.css` file **before** flagging a class as a Tailwind violation. Many utility-style class names (`.text-center`, `.gap-fluid-sm`, `.inline-flex-center`) are **approved semantic aliases** defined in the project's own CSS.
- The `/components/figma/ImageWithFallback.tsx` is a **protected file** — it contains Tailwind classes that cannot be modified. Flag it as a passive monitor item only.
- Use [design-tokens/neon-colors.md](../guidelines/design-tokens/neon-colors.md), [design-tokens/typography.md](../guidelines/design-tokens/typography.md), [design-tokens/spacing.md](../guidelines/design-tokens/spacing.md) and [design-tokens/animations.md](../guidelines/design-tokens/animations.md) as the authoritative reference for all token values.
- For typographic best practices on kerning, tracking, and leading, reference the [TypeType article on typographic spacing](https://typetype.org/blog/kerning-tracking-leading-and-spacing-in-typography/).
- **Never modify any file during the audit.** All findings go to the report and task list only.

---

**Related files:**
- [Guidelines.md](../guidelines/Guidelines.md) — master project guidelines
- [overview-components.md](../guidelines/overview-components.md) — component system overview
- [design-system-audit.md](./design-system-audit.md) — earlier design system audit prompt (general)
- [/reports/design-system-audit/report.md](../reports/design-system-audit/report.md) — latest audit report
