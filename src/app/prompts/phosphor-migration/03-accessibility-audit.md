# Sub-audit 3 — WCAG AA icon accessibility audit

**Parent:** [orchestrator.md](./orchestrator.md)

## Instructions

1. **Contrast audit:**
   - Scan `/styles/globals.css` and all `/styles/blocks/*.css` for icon color declarations
   - Check icon colors against backgrounds in both `.dark` and light mode
   - Verify minimum 3:1 contrast ratio for UI icons (WCAG 1.4.11 Non-text Contrast)
   - Check hover/focus state contrast deltas (minimum visible change)
2. **ARIA audit:**
   - Search all icon usage in `.tsx` files for `aria-hidden`, `aria-label`, `role` attributes
   - Decorative icons MUST have `aria-hidden="true"`
   - Interactive icons (clickable) MUST have `aria-label` or adjacent visible text
   - Icons inside buttons/links with visible text should be `aria-hidden="true"`
3. **Size audit:**
   - Check interactive icon touch targets meet 44×44px minimum (WCAG 2.5.5)
   - Check icon sizes are not below 16px (readability minimum)
   - Verify icons scale with user font-size preferences
4. **Animation audit:**
   - Cross-reference with `/guidelines/prefers-reduced-motion.md`
   - Ensure all icon animations respect `prefers-reduced-motion: reduce`
   - Check icon hover transitions for duration limits
5. **Phosphor weight accessibility:**
   - Assess each of the 6 Phosphor weights for minimum stroke visibility:
     - `thin` — CAUTION: may fail contrast at sizes < 20px on dark backgrounds
     - `light` — acceptable at 20px+, caution at 16px
     - `regular` — safe for all sizes
     - `bold` — safe, recommended for emphasis
     - `fill` — highest contrast, safe everywhere
     - `duotone` — secondary layer at 20% opacity: audit against both light and dark backgrounds
   - Define per-weight minimum safe size
   - Define per-weight permitted contexts (decorative, informational, interactive)
6. **Design token requirements:**
   - List all CSS custom properties needed for icon theming
   - Define light/dark mode icon color pairs
   - Define interactive state colours (default, hover, active, focus, disabled)

## Cross-references

- [Accessibility report](../../guidelines/accessibility-report-feb-2025.md)
- [Reduced motion guide](../../guidelines/prefers-reduced-motion.md)
- [Neon color system](../../guidelines/design-tokens/neon-colors.md)
- [Dark mode implementation](../../guidelines/dark-mode-implementation.md)

## Output format

Write results to the "Sub-audit 3" section of `/reports/phosphor-migration/full-audit-report.md`.
