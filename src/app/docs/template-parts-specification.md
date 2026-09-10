# Template Parts Specification

**Date:** March 8, 2026
**Status:** APPROVED

## 1. Concept
Follows the Headless WordPress block theme architecture. We decouple layout structure from the specific pages. Template Parts include:
- `Header`
- `Footer`
- `MobileMenu`
- `Breadcrumbs`

## 2. Pattern Variants

### Header
- `variant="default"`: Standard navigation, socials, theme toggle.
- `variant="devtools"`: Includes search bar, layout switcher, distinct background rules.
- `variant="minimal"`: Logo and theme toggle only (e.g., for checkout or 404).

### Footer
- `variant="default"`: Full fat footer with sitemap.
- `variant="devtools"`: Slim footer, back to site CTA.

### MobileMenu
- `variant="default"`: Standard accordion lists.
- `variant="devtools"`: Categorized tool lists with badge support.

## 3. Data Integration
Components will consume `TemplatePartsConfig` from `/data/mock/ui/template-parts-config.ts` so no hardcoded arrays exist in the JSX.
