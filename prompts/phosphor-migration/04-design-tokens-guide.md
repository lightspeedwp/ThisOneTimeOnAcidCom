# Sub-audit 4 — Iconography design tokens guide

**Parent:** [orchestrator.md](./orchestrator.md)

## Instructions

1. **Size tokens:**
   - Define CSS custom properties: `--icon-xs` through `--icon-2xl`
   - Map to Phosphor `size` prop values
   - Define contextual sizing rules (inline text, buttons, cards, hero sections)
2. **Weight system:**
   - Map Phosphor weights to project use cases:
     - `thin` — large decorative icons only (48px+), never interactive
     - `light` — secondary/subtle icons (24px+), metadata labels
     - `regular` — default for all UI icons, navigation, actions
     - `bold` — emphasis, active states, primary CTAs
     - `fill` — selected/active toggles, rating stars, status indicators
     - `duotone` — feature highlights, card accents, hero decorations
   - Document the `weight` prop API and TypeScript type
3. **Color tokens:**
   - Light mode: `--icon-default`, `--icon-muted`, `--icon-accent`, `--icon-interactive`, `--icon-error`, `--icon-success`, `--icon-disabled`
   - Dark mode: corresponding `.dark` overrides
   - Neon mode: `--icon-neon-*` variants for neon section contexts
   - Define how `color` prop interacts with CSS `currentColor`
4. **Spacing tokens:**
   - Icon gap inside buttons: `--icon-btn-gap`
   - Icon margin in nav items: `--icon-nav-margin`
   - Icon padding in cards: `--icon-card-padding`
5. **Animation tokens:**
   - Hover scale: `--icon-hover-scale` (1.1)
   - Transition duration: `--icon-transition` (200ms)
   - Reduced motion: `--icon-transition-reduced` (0ms)
   - Spin animation for loaders
6. **BEM class system:**
   - `.icon` — base wrapper
   - `.icon--xs` through `.icon--2xl` — size modifiers
   - `.icon--interactive` — clickable with hover/focus states
   - `.icon--decorative` — `aria-hidden`, no interaction
   - `.icon--muted` — reduced opacity for secondary info
   - `.icon--neon` — neon glow effect for dark mode
7. **Duotone-specific tokens:**
   - `--icon-duotone-opacity` (0.2 default)
   - `--icon-duotone-color` (secondary tone colour)
   - When to use: feature cards, hero sections, empty states
   - When NOT to use: small sizes (< 24px), navigation, form controls

## Output format

1. Write specification to the "Sub-audit 4" section of `/reports/phosphor-migration/full-audit-report.md`
2. The spec will be used to create `/guidelines/design-tokens/iconography.md` during Phase 1 implementation
