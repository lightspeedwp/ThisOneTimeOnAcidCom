
1) Orchestrator prompt (run once per repository)

Value: Below is a ready-to-paste orchestrator prompt + a set of smaller targeted audit prompts + a per‑project refactor prompt template to restructure CSS (BEM + WordPress-aligned utilities + token-driven light/dark), with accessibility (WCAG 2.1 AA/AAA) treated as a hard requirement.
Risks: True AAA compliance often forces palette + typography changes (contrast ratios, focus indicators, motion) and can’t be guaranteed without adjusting token values and sometimes layouts; also class renames (BEM) can break prototypes unless updates are applied consistently across markup.
Next step: Run the Orchestrator Prompt once per repo (or per Figma Make project). It will generate /reports/<date>_<repo>_css-audit.md first, then (and only then) create /reports/<date>_<repo>_task-list.md.


Paste this into the Figma Make “orchestrator” (or your top-level agent prompt). It is written to enforce: audit → write report to /reports/ → only then write task list.

You are the CSS Architecture & Accessibility Auditor for THIS repository.

NON-NEGOTIABLES
1) Accessibility is highest priority: target WCAG 2.1 AA AND AAA. If any AAA criteria cannot be met without design/token changes, flag them explicitly and propose the smallest token-level fixes to reach AAA (especially colour contrast and focus visibility).
2) Do NOT produce a task list until AFTER you have successfully written an audit report into /reports/.
3) Tailwind must remain. Keep tailwind.css, but it should act primarily as the import entrypoint for other CSS files (and Tailwind directives if present). Ensure there are no conflicting / duplicate CSS imports and no cyclic imports.
4) Implement BEM “as extensively as possible” in the strategy, but do not rename anything yet during the audit—only propose mappings and a phased plan.
5) Primary objective: evaluate /src/guidelines/design-tokens/ versus actual implementation in CSS and usage in the codebase, and document discrepancies.
6) Major objective: add missing light & dark mode CSS variables to extend utility and preset classes, using token-driven semantics.

SCOPE
- Audit all CSS files (and any CSS-in-JS or inline styles if present).
- Locate the CSS entrypoint(s): especially tailwind.css and any index.css.
- Inspect /src/guidelines/design-tokens/ for documented token names, intent, and usage guidance.
- Identify unused classes and orphaned CSS files (CSS files not imported anywhere or selectors never referenced in the codebase).

DELIVERABLES (STRICT ORDER)
A) Run the audits listed below (Audit Prompts A–J). Capture findings for each.
B) Write a single consolidated Markdown report file:
   /reports/<YYYY-MM-DD>_<repo-or-project-slug>_css-audit.md
   The report MUST include:
   - Repository CSS inventory + import graph + entrypoint analysis
   - Token documentation vs implementation discrepancy matrix
   - Light/Dark mode variable coverage, missing variables, and proposed additions
   - Tailwind integration strategy (layers, import order, conflict avoidance)
   - BEM adoption strategy (naming conventions, mapping plan, phases)
   - WordPress-aligned global classes + utilities aligned to theme.json concepts
   - Section-style approach (WordPress-like “per block/per section” styling)
   - DRY opportunities (reusable sections/components akin to WP patterns)
   - Unused selectors and orphaned CSS files
   - Accessibility status and fixes (focus, contrast, motion, states)
   - Proposed target folder structure + index.css strategy
C) ONLY AFTER (B) has been written successfully, write:
   /reports/<YYYY-MM-DD>_<repo-or-project-slug>_task-list.md
   This must be a prioritised, implementation-ready task list with acceptance criteria.

STOP CONDITIONS
- If you cannot write to /reports/ for any reason, STOP after printing the report content and clearly state you could not write the file. Do not create the task list.

WORKING METHOD
- Be precise: never invent file names; only reference what exists.
- Prefer token-level fixes to meet accessibility rather than scattered overrides.
- Prefer low-specificity selectors and consistent layering over specificity battles.
- Where you estimate (e.g., “likely unused”), label it as “needs confirmation” and explain how to confirm.

AUDIT PROMPTS TO RUN (A–J)
Run each audit and store its findings:
A) CSS Inventory & Entrypoints
B) Import Graph & Conflict Detection (tailwind.css + index.css strategy)
C) Design Tokens Documentation vs Implementation (/src/guidelines/design-tokens/)
D) Light/Dark Mode Token Coverage & Missing Variables
E) Tailwind + Custom CSS Layering Plan (@layer base/components/utilities)
F) BEM Adoption Audit (naming, specificity, components vs utilities)
G) WordPress Alignment (global classes, theme.json concepts, block/section styles)
H) DRY & Pattern Opportunities (reusable sections → components/patterns)
I) Unused Selectors & Orphaned CSS Files
J) Accessibility CSS Audit (WCAG 2.1 AA/AAA: focus, contrast, motion, states)

OUTPUT FORMAT DURING AUDIT
- During audits, output concise findings per prompt (bullets + evidence pointers like file paths + selector names).
- Do not output the task list until the report is written to /reports/.

Now begin with Audit Prompt A.


2) Smaller audit prompts (A–J)
These are the “smaller prompts” you asked for. You can run them manually (one by one) if you prefer, or let the orchestrator run them in sequence.
Audit Prompt A — CSS inventory & entrypoints
Audit A: CSS Inventory & Entrypoints

1) List every CSS file in the repo (path + purpose if inferable).
2) Identify all CSS entrypoints (files imported by the app build or referenced by HTML/JS).
3) Confirm whether tailwind.css is an entrypoint. If yes, record where it is imported.
4) Identify any index.css files and their current roles.
5) Output:
   - Inventory table: File | Imported By | Category (tokens/base/components/utilities/blocks/misc) | Notes
   - Entrypoint summary: “single entrypoint” vs “multiple competing entrypoints” with risks.
Evidence: include file paths and the import statements you found.
No refactors yet.
Audit Prompt B — import graph & conflict detection
Audit B: Import Graph & Conflict Detection (tailwind.css + index.css)

1) Build the import graph for CSS (@import chains, JS imports, HTML links).
2) Identify:
   - Duplicate imports (same file imported more than once)
   - Cyclic imports
   - Conflicting ordering (e.g., utilities loaded before tokens/base)
   - Multiple resets/preflights causing clashes
3) Propose a target import strategy:
   - tailwind.css remains the only app entrypoint
   - tailwind.css imports index.css (and contains Tailwind directives if used)
   - index.css imports the rest in a stable order
4) Output:
   - Current import graph
   - Issues list
   - Proposed import order (exact order, with rationale)
Audit Prompt C — design tokens docs vs implementation
Audit C: Design Tokens Documentation vs Implementation

Focus folder: /src/guidelines/design-tokens/

1) Extract documented tokens:
   - Naming conventions
   - Token categories (colour, typography, spacing, radius, shadow, motion, z-index etc.)
   - Any “semantic tokens” guidance (e.g., surface/text/border)
2) Extract implemented tokens:
   - CSS custom properties in :root and any theme selectors
   - Any token JSON/TS sources if present
3) Produce a discrepancy matrix:
   - Documented token missing in code
   - Token exists in code but not documented
   - Name mismatch (docs vs code)
   - Meaning mismatch (docs intent vs actual usage)
4) Output:
   - A table: Token | Documented? | Implemented? | Light value | Dark value | Used by (files/classes) | Notes/Fix
   - A short “single source of truth” recommendation tailored to what exists in this repo
Audit Prompt D — light/dark mode token coverage & missing vars
Audit D: Light/Dark Mode Token Coverage & Missing Variables

1) Determine how theming currently works:
   - data-theme attribute? class on html/body? prefers-color-scheme?
2) Identify all variables that should be themeable but aren’t (especially semantic tokens):
   - surface/background layers
   - text (primary/secondary/inverse)
   - borders/dividers
   - interactive states (hover/active/focus)
   - links (default/visited/hover)
   - focus ring and outline tokens
   - shadows (often differ in dark mode)
3) Ensure tokens support utilities + preset/component classes without hardcoded colours.
4) Output:
   - “Missing token list” with recommended names and where they will be used
   - Proposed light/dark variable blocks (exact selectors to use)
   - Any contrast risks (flag for Accessibility audit)
Audit Prompt E — Tailwind + custom CSS layering plan
Audit E: Tailwind + Custom CSS Layering Plan

1) Check whether Tailwind directives are used:
   @tailwind base; @tailwind components; @tailwind utilities;
2) Propose how custom CSS should integrate using @layer:
   - tokens/base → @layer base
   - BEM components → @layer components
   - utilities → @layer utilities
3) Identify any existing selectors that fight Tailwind (high specificity, !important).
4) Output:
   - Recommended layering rules
   - Examples of converting existing rules into correct layers
   - Conflict avoidance guidance (what must never be duplicated, e.g., resets)
Audit Prompt F — BEM adoption audit
Audit F: BEM Adoption Audit

1) Identify current naming patterns:
   - Any BEM-like blocks/elements/modifiers?
   - Any “utility” prefixes (u-, is-, has- etc.)?
2) Identify problem areas:
   - Deep descendant selectors (.a .b .c)
   - IDs, tag selectors, overly broad selectors
   - Naming collisions and ambiguous class intent
3) Propose a BEM naming system for this repo:
   - Block naming and boundaries
   - Element naming
   - Modifier naming
   - Recommended prefixes (optional): c- (components), l- (layout), u- (utilities), is-/has- (state)
4) Output:
   - Naming conventions (rules)
   - A mapping plan: “existing selector → proposed BEM selector” for the worst offenders
   - A phased migration plan that avoids breaking the prototype
Audit Prompt G — WordPress alignment (theme.json, globals, section styles)
Audit G: WordPress Alignment

1) Identify existing “global” classes and whether they align with WordPress patterns:
   - .alignwide/.alignfull, spacing helpers, typography helpers
   - state classes like .is-* / .has-*
2) Identify (or propose) a bridge between design tokens and theme.json concepts:
   - preset colours, font sizes, spacing scale, gradients
3) Propose a “section styles” approach similar to WordPress:
   - per-section or per-block style files
   - minimal selectors scoped to a block root class
4) Output:
   - Recommended global class set (small + intentional)
   - Utility class set aligned with preset tokens
   - Per-block/per-section file strategy and naming
Audit Prompt H — DRY & pattern opportunities
Audit H: DRY & Pattern Opportunities

1) Identify repeated UI sections/layouts across pages/components:
   - repeated markup patterns
   - repeated class groupings
2) Propose candidates for reusable components/patterns:
   - “synced” vs “unsynced” (WordPress pattern analogy)
3) Identify CSS that should move to a shared component stylesheet vs page-specific stylesheet.
4) Output:
   - List of repeat patterns + file/component locations
   - Suggested component boundaries
   - Expected CSS reduction impact (qualitative)
Audit Prompt I — unused selectors & orphaned CSS files
Audit I: Unused Selectors & Orphaned CSS Files

1) Find CSS files that are not imported anywhere (or only imported in dead code).
2) Find selectors/classes that appear in CSS but are never referenced in:
   - JSX/TSX/HTML/templates
   - markdown or config if relevant
3) Clearly separate:
   - “confirmed unused” (no references anywhere)
   - “likely unused” (dynamic usage possible; needs manual confirmation)
4) Output:
   - Orphan file list + how to confirm
   - Unused selector list (top 30 worst offenders) + source file
   - Safe removal strategy (guardrails)
Audit Prompt J — Accessibility CSS audit (WCAG 2.1 AA/AAA)
Audit J: Accessibility CSS Audit (WCAG 2.1 AA/AAA)

Focus on CSS-driven accessibility:

1) Focus visibility:
   - :focus-visible styles present for interactive elements?
   - Focus indicator has sufficient contrast and not removed?
2) Colour contrast (AA/AAA):
   - Identify token pairs used for text on surfaces
   - Flag any likely failures (especially greys on dark surfaces)
3) Motion:
   - prefers-reduced-motion handling for transitions/animations
4) States & affordances:
   - hover/active/focus/disabled states for buttons/links/forms
   - don’t rely on colour alone; underline links or other cues
5) Form controls:
   - visible labels, error states, required indicators (CSS support)
6) Output:
   - “Pass/Fail/Risk” list with file references
   - Token-level fixes (preferred) and minimal CSS patch plan
   - AAA blockers list (if any) + the smallest token changes to unblock


3) Report template (what gets written to /reports/…_css-audit.md)
Your orchestrator should write a single report that looks like this:

# CSS & Design Tokens Audit — <Repo/Project Name> — <YYYY-MM-DD>

## 0) Executive summary
- Top 5 risks (accessibility, conflicts, structure)
- Top 5 opportunities (DRY, token coverage, import simplification)
- Recommended target architecture (1 paragraph)

## 1) Current CSS inventory & entrypoints
- Inventory table
- Entrypoint(s) and why

## 2) Import graph & conflict analysis
- Current import graph (bulleted)
- Duplicate/cyclic imports
- Proposed entrypoint strategy:
  - tailwind.css (entrypoint) → imports index.css
  - index.css imports modules in order

## 3) Design tokens: documentation vs implementation
### 3.1 Token discrepancy matrix
(table)

### 3.2 Documentation fixes required
- Missing docs
- Renames and intent mismatches

## 4) Light/Dark mode coverage
- Current theming mechanism
- Missing semantic tokens (list)
- Proposed light/dark variable sets (code blocks)

## 5) Tailwind integration plan
- Whether Tailwind directives are used
- Proposed @layer strategy
- Conflict avoidance rules

## 6) BEM & CSS architecture strategy
- Proposed naming conventions
- Mapping plan (high-impact selectors)
- Migration phases

## 7) WordPress alignment
- Global class plan
- Utilities aligned with theme.json concepts
- “Section styles” / per-block CSS file approach

## 8) DRY opportunities and reusable patterns
- Candidate patterns/components
- Expected reduction areas

## 9) Unused selectors & orphaned files
- Orphan file list
- Unused selector list
- Safe removal approach

## 10) Accessibility (WCAG 2.1 AA/AAA)
- Focus visibility findings
- Contrast findings (AA/AAA)
- Reduced motion findings
- Required fixes (token-first)
- AAA blockers & resolution path

## 11) Proposed target folder structure
(tree)

## 12) Proposed index.css and tailwind.css contents (manifest only)
(code blocks)

## Appendix: Evidence
- Key file paths
- Key selectors
- Notes on dynamic class generation (if any)


4) Per‑project “CSS structure refactor” prompt (run after the audit)
This is the prompt you asked for to improve CSS structure. Duplicate it per repo and replace placeholders.

Project Refactor Prompt — <PROJECT_NAME> (<REPO_SLUG>)

Context:
- This repo has an audit report at: /reports/<YYYY-MM-DD>_<REPO_SLUG>_css-audit.md
- Your job is to implement the CSS architecture improvements described in that report.

Hard requirements:
1) Accessibility first: implement changes required to reach WCAG 2.1 AA and AAA. Prefer token-level fixes; avoid scattered overrides.
2) Tailwind stays. Keep tailwind.css, and ensure it is the single CSS entrypoint imported by the app. tailwind.css may contain Tailwind directives, but should primarily import index.css (the manifest for all other CSS).
3) Avoid conflicting imports: no duplicate imports, no cyclic imports, and no competing entrypoints.
4) Adopt BEM extensively for components/sections. Minimise breaking changes by using a phased migration:
   - Phase 1: introduce new BEM classes alongside old classes (dual-classing) where needed
   - Phase 2: migrate markup references
   - Phase 3: remove old classes only when unused is confirmed
5) Align utilities and globals with WordPress concepts (theme.json-style presets), while keeping the prototype maintainable.

Implementation steps (follow in order):
A) Read and follow the audit report recommendations. Do not invent new architecture that contradicts the report unless necessary for accessibility.
B) Create (or standardise) this target folder structure (adapt if the repo already has an equivalent):
   /src/styles/
     index.css                 (imports everything below in a strict order)
     tokens/
       core.css                (raw palette/scale tokens, no semantics)
       semantic.css            (semantic tokens like --color-text, --surface-1)
       themes.css              (:root light + [data-theme="dark"] overrides)
       motion.css              (durations/easing + reduced-motion hooks)
     base/
       reset.css               (only if needed; avoid fighting Tailwind preflight)
       typography.css
       forms.css
       a11y.css                (focus-visible, skip-link, visually-hidden, etc.)
     utilities/
       layout.css
       spacing.css
       typography.css
       colour.css
       states.css              (is-/has- helpers if used)
     components/
       <component>.css         (BEM blocks)
     sections/
       <section>.css           (WordPress-like per-section/per-block styling)
     wordpress/
       globals.css             (WP-aligned global classes if required)

C) Update /src/.../tailwind.css so it is the single entrypoint and only imports index.css once.
   - Ensure Tailwind layering is respected using @layer base/components/utilities where appropriate.
D) Implement token-driven light/dark mode:
   - Use semantic variables everywhere (e.g., --color-text, --surface-1, --border-1).
   - Define light in :root and dark overrides in [data-theme="dark"] (or the repo’s existing mechanism).
   - Add any missing variables identified in the audit so utilities and preset classes work in both themes.
   - Ensure focus ring tokens exist and are AAA-friendly.
E) Implement BEM:
   - For each major UI block/section, create a BEM root class and move styling under it.
   - Keep specificity low: prefer single-class selectors; avoid deep nesting.
   - Use modifiers for variants instead of extra bespoke selectors.
F) WordPress-aligned utilities and globals:
   - Provide a small, intentional set of global classes that mirror WP expectations where helpful.
   - Utilities should map to tokens (do not hardcode colours).
G) Break up large CSS files:
   - Move rules into logical modules per the structure above.
   - index.css becomes the only “manifest”, not a dumping ground for rules.
H) Remove unused CSS and orphaned files safely:
   - Confirm with repository-wide search (and any build tooling) before deletion.
   - Remove files only when confirmed unreferenced.
I) Update documentation in /src/guidelines/design-tokens/ so docs match implementation:
   - Token names, categories, usage examples
   - Theming approach (light/dark)
   - Accessibility constraints (contrast targets, focus)
J) Validation checklist (must pass):
   - Single CSS entrypoint import
   - No duplicate/cyclic CSS imports
   - Light/dark mode visually correct and complete
   - Focus-visible styles present and clearly visible
   - Contrast targets documented and enforced by tokens (AA/AAA)
   - Reduced-motion supported
   - No orphan CSS files
   - No confirmed-unused selectors remain

Deliverables:
1) Implement the refactor in code (CSS + necessary markup class updates).
2) Write a brief implementation summary into:
   /reports/<YYYY-MM-DD>_<REPO_SLUG>_css-refactor-summary.md
   Include what changed, what to review, and any remaining risks.
3) Do not change visual design beyond what is required for accessibility compliance.

Begin by reading the audit report file and then applying step A onwards.


5) Best-practice architecture recommendations (beyond your list)
These are the practical “rules of thumb” I’d bake into the audit + refactor decisions:

Token-first, semantic-second

Keep a small set of raw scale tokens (palette/greys/spacing/typography scales).
Build semantic tokens on top (--surface-1, --text-1, --border-1, --focus-ring).
Utilities/components should only use semantic tokens, not raw hex values.

Use cascade layers to prevent specificity wars

Put tokens/base in @layer base, BEM components in @layer components, utilities in @layer utilities.
This plays nicely with Tailwind’s own layering model.

Keep selectors low-specificity

Prefer .c-card {} over .page .container .card {}.
Avoid styling by tag name except in very controlled base styles.
Avoid !important except for a tiny set of utilities (and even then, be cautious).

BEM + small utility set beats “everything utility”

Tailwind can remain, but you’ll get maintainability by expressing durable UI pieces as BEM components and reserving utilities for layout/spacing tweaks.

Theme switching: one mechanism

Pick one: [data-theme="dark"], .theme-dark, or prefers-color-scheme.
If you support both system + manual, implement manual override via attribute/class and fall back to prefers-color-scheme.

“Per block” CSS like WordPress

Put each block/section’s styling in a single file, scoped to its root BEM block.
This makes it easy to delete/replace blocks without leaving CSS behind.


6) Source references (for your docs/governance)
World Wide Web Consortium (W3C). “Web Content Accessibility Guidelines (WCAG) 2.1.” https://www.w3.org/TR/WCAG21/ (accessed 5 March 2026).

WordPress.org Developer Resources. “theme.json.” https://developer.wordpress.org/themes/features/theme-json/ (accessed 5 March 2026).

Tailwind Labs. “Adding Custom Styles (Using CSS Layers).” https://tailwindcss.com/docs/adding-custom-styles (accessed 5 March 2026).



If you want, paste one repo’s current CSS entrypoint files (usually tailwind.css + any index.css) and the /src/guidelines/design-tokens/ docs structure here, and I’ll tailor the prompts even tighter to your exact file names and theming mechanism—without changing the overall audit→report→tasks gating you need.

