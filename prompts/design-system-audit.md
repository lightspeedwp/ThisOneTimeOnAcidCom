# Full Design-System Audit Prompt

**Version:** 1.0.0
**Created:** March 1, 2026
**Source:** Imported from `/imports/ash-shaw-makeup-audit.md`
**Report output:** `/reports/design-system-audit/`
**Task output:** `/tasks/task-list.md` (append, do not overwrite)

---

## Purpose

This prompt initiates a **comprehensive, file-wide audit** of the Ash Shaw Makeup Portfolio prototype in Figma Make. The objective is to ensure that every page, component, and nested layer adheres to the project's **Neon vs Atomic Black** design system, strict BEM architecture, naming conventions, and accessibility guidelines.

The audit goes beyond design tokens to evaluate structural patterns, animations, motion preferences, and the integration of guidelines related to dark/light modes, neon identity, spacing, documentation, tasks and reporting. The audit surfaces deviations and creates a roadmap for remediation **without directly editing code**.

### Value

* **Visual fidelity** - verifies neon colours, gradients, animations, and typography reflect the bold cyber-punk aesthetic defined in design tokens, and that dark/light modes are implemented correctly across all pages.
* **System consistency** - ensures strict adherence to semantic BEM classes, absence of Tailwind utilities, and no inline styles. Confirms naming and folder structures match guidelines.
* **Accessibility & performance** - checks WCAG 2.1 AA criteria, `prefers-reduced-motion` support, variable fonts for reduced payload, proper alt text, and ARIA labels.
* **Holistic guideline adherence** - verifies neon system, light/dark mode, spacing, colours, animations, and documentation are correctly integrated.

### Risks

* The prototype contains extensive animations and neon effects; misinterpreting tokens may produce false positives. Compare each element to design-token documentation before flagging a violation.
* Do not modify any code during the audit; all issues must be documented in a report and tasks only.

---

## Prerequisites

Before running this audit, read the following guideline files:

| # | File | Purpose |
|---|---|---|
| 1 | `/guidelines/Guidelines.md` | Master guidelines (start here) |
| 2 | `/guidelines/design-tokens/neon-colors.md` | Neon colour palette & usage |
| 3 | `/guidelines/design-tokens/animations.md` | All 26 keyframe animations |
| 4 | `/guidelines/design-tokens/typography.md` | Typography scale & fluid sizing |
| 5 | `/guidelines/design-tokens/spacing.md` | Spacing system & responsive tokens |
| 6 | `/guidelines/design-tokens/colors.md` | Legacy colour reference |
| 7 | `/guidelines/dark-mode-implementation.md` | Dark mode implementation guide |
| 8 | `/guidelines/component-dark-mode.md` | Component-specific dark/light patterns |
| 9 | `/guidelines/prefers-reduced-motion.md` | Reduced motion coding standards |
| 10 | `/guidelines/accessibility-report-feb-2025.md` | WCAG AA compliance report |
| 11 | `/guidelines/overview-components.md` | Component system & React architecture |
| 12 | `/guidelines/overview-icons.md` | Icon system & verification |
| 13 | `/guidelines/overview-sections.md` | Section patterns |
| 14 | `/guidelines/overview-blocks.md` | Block patterns |
| 15 | `/guidelines/overview-patterns.md` | Design patterns & compositions |

---

## Audit Steps

### 1. Inventory & classification

1. **List all pages and components** in the codebase - every page route, component file, and layout element. Note each page's purpose (Home, About, Portfolio, Blog, Video, Podcast, DevTools, etc.) and any hidden or draft content.

2. For every page, **inventory every styled element**: text layers, shapes, gradient backgrounds, neon elements, icons, images, animations, components and variants. Record class names, making sure to capture nested elements within components.

3. **Capture style attributes** for each element: font family, size, weight, line height, letter spacing, fill/stroke colours, gradient definitions, border radius, shadows, glows, spacing, animations and motion preferences. Note any **inline styles** or **Tailwind classes** (both are strictly banned per [Guidelines.md](../guidelines/Guidelines.md)).

4. **Classify each element** according to the design system's content hierarchy: identify whether it belongs to a Hero section, Card, Grid, Section, or Template Part. Use naming conventions to map elements back to pattern guidelines. Record any elements that do not match a defined pattern.

### 2. Typography compliance

1. Verify that only authorised fonts are used:
   - **Playfair Display** (`.font-heading`) - elegant headings
   - **Inter** (`.font-body`) - readable body text
   - **Righteous** (`.font-title`) - main hero titles

2. Check that font sizes, weights, line heights, and letter spacing follow the scale defined in [typography.md](../guidelines/design-tokens/typography.md) (e.g., `.text-hero-h1`, `.text-section-h2`, `.text-body-p` with fluid values). Flag any hard-coded pixel sizes or unapproved classes.

3. Ensure headings are semantically structured (H1-H6), each page contains one H1, body text uses Inter, and Righteous is only used for hero titles.

4. Verify there are **no Tailwind typography classes** (e.g., `text-xl`, `font-bold`) - only semantic BEM classes.

5. Verify all headings, titles, labels, and captions use **sentence case** per [Guidelines.md](../guidelines/Guidelines.md) sentence case rule.

### 3. Colour and gradient system

1. Identify all colours and gradients used. Ensure they reference neon colour tokens from [neon-colors.md](../guidelines/design-tokens/neon-colors.md):
   - 8 neon colours: electric green, hot pink, royal blue, pure yellow, blazing orange, violet purple, aqua cyan, hot red
   - 4 signature gradients: Cyberpunk, Toxic Lime, Solar Flare, Hyperpop

2. Check backgrounds use **Atomic Black (#0F0F0F)** or appropriate neon gradients. Flag hard-coded hex values outside the palette.

3. Verify dark and light mode variants exist and maintain contrast ratios >= 4.5:1 for body text. Neon colours may require lighter equivalents in light mode.

4. Review animated gradients and ensure they match animations defined in [animations.md](../guidelines/design-tokens/animations.md).

### 4. Spacing & layout

1. Check that spacing tokens from [spacing.md](../guidelines/design-tokens/spacing.md) are used for padding, margin, and gaps. These should be fluid and responsive. Flag any hard-coded pixel values.

2. Verify BEM classes define layout (e.g., `.hero__content`, `.card__body`), with no Tailwind utility classes for spacing (e.g., `p-4`, `gap-8`).

3. Ensure container widths and breakpoints align with the fluid width system: mobile compact (>320px), mobile (>420px), tablet portrait (>768px), tablet landscape (>1024px), desktop (>1440px).

### 5. Borders, radii, shadows & glows

1. Confirm corner radii follow design token values. No custom radii.

2. Inspect shadows and glows. Shadows should use defined tokens (e.g., `--shadow-sm`, `--shadow-lg`); glows must use neon-coloured glows from the neon system. Flag undefined shadow or glow styles.

3. Check that transitions and animations use variables from [animations.md](../guidelines/design-tokens/animations.md) and support `prefers-reduced-motion` per [prefers-reduced-motion.md](../guidelines/prefers-reduced-motion.md). Each animation should degrade gracefully.

### 6. Accessibility & usability

1. Evaluate contrast ratios for text and key UI elements; must meet WCAG 2.1 AA (>= 4.5:1 body text, >= 3:1 large text/UI).

2. Verify all interactive components (buttons, links, inputs) have visible focus rings and states using neon colours with glows per accessibility guidelines.

3. Ensure all images include alt text, icons have ARIA labels, and decorative images use `aria-hidden="true"`.

4. Confirm animations respect `prefers-reduced-motion`: when reduced motion is preferred, animations should be disabled or replaced with static states.

5. Verify keyboard navigation works: Tab, Enter, Space, Arrows, Escape on all interactive elements.

### 7. BEM architecture & content

1. **BEM and semantic naming:** verify class names follow strict BEM convention (`.block`, `.block__element`, `.block--modifier`, `.block__element--modifier`) and are semantically meaningful.

2. **Folder and component organisation:** ensure components are organised by sections, templates, patterns, and blocks as described in guidelines. Each section should have clear naming.

3. **Documentation hooks:** where complex animations, gradients, or interactions are used, confirm comments reference appropriate guideline documents.

4. **No Tailwind or inline styles:** identify any Tailwind utility classes or inline styles; both are strictly prohibited. All styling must be encapsulated in BEM classes using design tokens.

5. **No hard-coded content:** ensure all text, images, and configuration data are imported from `/data/mock/` directory. No hard-coded strings in JSX.

### 8. Report compilation

Create a Markdown report at `/reports/design-system-audit/audit-report.md` including:

1. **Summary** - count of pages, elements audited, and total violations by category.
2. **Violations** - table listing each violation (element name, location/page, guideline broken, description, recommended fix with token/class reference).
3. **Observations** - systemic issues and patterns (e.g., multiple components using Tailwind spacing, inconsistent neon colours across pages).
4. **Recommendations** - suggestions for updating guidelines or tokens if gaps are discovered.

Do not edit any code during the audit; only report findings.

### 9. Task list generation

1. Write tasks to `/tasks/task-list.md` (append to existing tasks) for each issue found. Each task should include a title, description, priority, and status (default "NOT STARTED").

2. Group similar issues where possible (e.g., "Replace all hard-coded neon colours with design tokens").

3. Follow the priority legend: P0 = Critical, P1 = High, P2 = Medium, P3 = Low.

---

## Cross-references

| Guideline | Location |
|---|---|
| Master guidelines | `/guidelines/Guidelines.md` |
| Neon colour system | `/guidelines/design-tokens/neon-colors.md` |
| Animations (26 keyframes) | `/guidelines/design-tokens/animations.md` |
| Typography scale | `/guidelines/design-tokens/typography.md` |
| Spacing system | `/guidelines/design-tokens/spacing.md` |
| Dark mode implementation | `/guidelines/dark-mode-implementation.md` |
| Component dark/light mode | `/guidelines/component-dark-mode.md` |
| Reduced motion standards | `/guidelines/prefers-reduced-motion.md` |
| Accessibility report | `/guidelines/accessibility-report-feb-2025.md` |
| Component overview | `/guidelines/overview-components.md` |
| Icon system | `/guidelines/overview-icons.md` |
| Section patterns | `/guidelines/overview-sections.md` |
| Block patterns | `/guidelines/overview-blocks.md` |
| Design patterns | `/guidelines/overview-patterns.md` |
| Mock data system | `/data/README.md` |
| CMS field mapping | `/docs/cms-field-mapping.md` |

---

## Notes

* Always cross-reference design token files in `/guidelines/design-tokens/` for correct values.
* Remember: **No Tailwind utilities or inline styles** - all styles must be applied via semantic BEM classes and CSS custom properties.
* This prompt is reusable. Re-run periodically for ongoing maintenance.

---

**End of prompt**
