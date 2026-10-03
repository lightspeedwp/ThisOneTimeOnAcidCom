# **CSS Cleanup & Optimisation Guidelines**

## **Purpose**

These guidelines provide a unified approach for cleaning up and optimising CSS across all LightSpeed GitHub repositories. They ensure every project uses a consistent, token‑driven architecture that supports light/dark mode, meets WCAG 2.1 AA/AAA accessibility requirements and aligns with WordPress’s theme.json philosophy. They also replace Tailwind utility classes with semantically named BEM styles and minimise direct margin usage.

### **Key Principles**

1. **Token‑first architecture** – Define a small set of raw design tokens (colour palette, spacing scale, typography scale, radii, shadows, borders and z‑index) in a dedicated tokens/ directory. WordPress’s theme.json demonstrates how presets for colours and font sizes are converted into CSS custom properties[\[1\]](https://developer.wordpress.org/block-editor/how-to-guides/themes/global-settings-and-styles/#:~:text=Instead%20of%20the%20proliferation%20of,These%20settings%20includes%20things%20like), so follow a similar pattern: publish all tokens as CSS variables (e.g. \--space-sm, \--radius-md, \--colour-surface-1). Build semantic tokens on top of these raw tokens (e.g. \--colour-text-primary, \--surface-card).  
     
2. **Accessibility by design** – Every colour combination used for text and interface elements must satisfy WCAG 2.1 contrast ratios: at least **4.5 : 1** for normal text and **3 : 1** for large text to reach Level AA, and **7 : 1** and **4.5 : 1** respectively for Level AAA[\[2\]](https://www.w3.org/TR/WCAG21/#:~:text=The%20visual%20presentation%20of%20text,5%3A1%2C%20except%20for%20the%20following). Provide focus indicators via visible outlines and honour the user’s reduced‑motion preference.  
     
3. **Light/dark mode support** – Define theme variables for both light and dark modes. Use a single theming mechanism (e.g. \[data-theme="dark"\] on \<html\> or the system prefers-color-scheme media query) and define overrides for the semantic tokens. Avoid hard‑coded colours; instead reference semantic tokens which resolve to different values under different themes.  
     
4. **No Tailwind utility classes in markup** – Tailwind may remain as a build tool or a wrapper for importing other files, but all utility classes such as bg-gray-100, p-4 or grid-cols-2 must be removed from markup. Replace them with BEM‑styled class names and token‑driven CSS declarations. If Tailwind is retained, use its @layer directive to inject custom base and component styles into the correct layers[\[3\]](https://css-tricks.com/using-css-cascade-layers-to-manage-custom-styles-in-a-tailwind-project/#:~:text=For%20example%2C%20to%20append%20your,you%20would%20do%20the%20following).  
     
5. **Adopt BEM naming** – Use the Block‑Element‑Modifier (BEM) methodology for all component and section styles. Blocks represent self‑contained components (e.g. .c-card), elements describe parts of the block (e.g. .c-card\_\_header), and modifiers represent variations (e.g. .c-card--featured). Use prefixes such as c- for components, l- for layout utilities and u- for simple one‑off utility classes. Avoid deeply nested selectors; prefer single class selectors for predictability.  
     
6. **Minimal margin usage** – Use spacing tokens via gap, padding and layout utilities (flex or grid) instead of margins. Only apply margins to separate large sections or when absolutely necessary. Provide a consistent spacing scale, for example multiples of 4 px or 8 px, exposed as tokens like \--space-xs, \--space-sm, \--space-md, \--space-lg, etc.  
     
7. **Per‑block CSS files** – Break large CSS files into logical pieces. Store each block or section’s styles in its own file under components/ or sections/ and import them via a single index.css. This approach mirrors WordPress’s pattern of per‑block styles and simplifies reuse across projects.  
     
8. **Remove hard‑coded values** – Do not hard‑code colours, font sizes, line heights, radii, shadows or z‑index values. All such values must come from tokens. When existing code uses hard‑coded hex values or font names, map them to the closest token or create a new token in the design system.  
     
9. **Design tokens documentation** – Each repository must maintain a /src/guidelines/design-tokens/ folder documenting the available tokens and their intended usage. The audit process should ensure that every token used in code is documented and that the documentation accurately reflects the implementation.  
     
10. **Import order & cascade layers** – When retaining Tailwind or custom resets, use the @layer directive to inject custom styles into the base, components and utilities layers[\[3\]](https://css-tricks.com/using-css-cascade-layers-to-manage-custom-styles-in-a-tailwind-project/#:~:text=For%20example%2C%20to%20append%20your,you%20would%20do%20the%20following). Create an index.css manifest that imports base styles (tokens, resets, typography), then components, utilities and section styles in a stable order. Avoid duplicate imports and cyclic dependencies.

## **Recommended File Structure**

src/styles/  
index.css              \# Manifest importing all other CSS modules in order  
tokens/  
core.css             \# Raw palette, spacing, typography, radii, shadow, border, z‑index values  
semantic.css         \# Semantic tokens like \--colour-text-primary, \--surface-card, \--border-default  
themes.css           \# Light mode values under :root, dark mode overrides under \[data-theme="dark"\]  
motion.css           \# Motion durations, easing and reduced‑motion hooks  
base/  
reset.css            \# Reset or preflight styles (avoid duplicates with Tailwind preflight)  
typography.css       \# Default typography styles (body, headings, links)  
forms.css            \# Styles for form elements and controls  
accessibility.css    \# Focus outlines, skip links, visually hidden helpers  
utilities/  
layout.css           \# Flex and grid helpers using gap tokens  
spacing.css          \# Helper classes that apply padding or gap based on spacing tokens  
typography.css       \# Font weight and text alignment helpers  
colour.css           \# Colour helpers mapping semantic tokens to classes  
states.css           \# is-/has- state helpers for common interactive states  
components/  
c‑component-name.css \# BEM blocks for reusable components  
sections/  
s‑section-name.css   \# Styles scoped to specific templates or page sections  
wordpress/  
globals.css          \# WordPress‑aligned global classes (e.g. .alignwide, .has-text-color)

This structure enforces separation of concerns, ensures low selector specificity and encourages reuse.

## **Light/Dark Mode Implementation**

Use CSS custom properties to implement theming. Define the default values in the :root selector for light mode. Provide overrides in a \[data-theme="dark"\] selector (or an equivalent mechanism) for dark mode. All semantic tokens (e.g. \--colour-text-primary, \--surface-card) should have definitions in both light and dark blocks. When used in components or utilities, the variables will automatically switch values based on the theme.

## **Accessibility Checklist**

* **Contrast** – Verify that all combinations of text and background colours meet the WCAG 2.1 requirements: at least 4.5 : 1 for normal text (3 : 1 for large text) for Level AA and at least 7 : 1 (4.5 : 1 for large text) for Level AAA[\[2\]](https://www.w3.org/TR/WCAG21/#:~:text=The%20visual%20presentation%20of%20text,5%3A1%2C%20except%20for%20the%20following). Adjust tokens if necessary.  
    
* **Focus visibility** – Every interactive element (links, buttons, form controls) must have a visible focus style. Use a token for focus outline colour and thickness. The outline should meet contrast requirements.  
    
* **Reduced motion** – Provide a \[data-reduce-motion\] or prefers-reduced-motion: reduce mechanism. Use the motion token scale and reduce durations or disable non‑essential animations when reduction is enabled. See the memory reduction guidelines for examples of reduced motion patterns.  
    
* **Colour independence** – Do not rely solely on colour to convey state (e.g. error vs. success). Use icons, text or patterns in addition to colour.

## **Best Practices**

* **Plan token updates centrally** – Introduce new tokens (e.g. spacing sizes, radii sizes, shadows, z‑indices) through the design token documentation, not ad‑hoc in code. This ensures all projects share the same semantic values and maintain consistency.  
    
* **Flatten complex selectors** – Avoid deep descendant chains. Use a single class name for components and scope nested elements within the block. This improves maintainability and keeps specificity low.  
    
* **Avoid \!important** – Instead of raising specificity with \!important, organise imports using layers and keep selectors simple. In Tailwind, the @layer directive can be used to append styles to the base and component layers, ensuring your custom CSS sits in the correct place[\[3\]](https://css-tricks.com/using-css-cascade-layers-to-manage-custom-styles-in-a-tailwind-project/#:~:text=For%20example%2C%20to%20append%20your,you%20would%20do%20the%20following).  
    
* **Audit and remove unused CSS** – Use static analysis or the provided audits to identify unused selectors and orphaned CSS files. Remove them to reduce bundle size.  
    
* **Per‑repository documentation** – Each repository must keep its own documentation up to date in /src/guidelines/design-tokens/. The audit process will flag mismatches so they can be corrected.

---

[\[1\]](https://developer.wordpress.org/block-editor/how-to-guides/themes/global-settings-and-styles/#:~:text=Instead%20of%20the%20proliferation%20of,These%20settings%20includes%20things%20like) Global Settings & Styles (theme.json) – Block Editor Handbook | Developer.WordPress.org

[https://developer.wordpress.org/block-editor/how-to-guides/themes/global-settings-and-styles/](https://developer.wordpress.org/block-editor/how-to-guides/themes/global-settings-and-styles/)

[\[2\]](https://www.w3.org/TR/WCAG21/#:~:text=The%20visual%20presentation%20of%20text,5%3A1%2C%20except%20for%20the%20following) Web Content Accessibility Guidelines (WCAG) 2.1

[https://www.w3.org/TR/WCAG21/](https://www.w3.org/TR/WCAG21/)

[\[3\]](https://css-tricks.com/using-css-cascade-layers-to-manage-custom-styles-in-a-tailwind-project/#:~:text=For%20example%2C%20to%20append%20your,you%20would%20do%20the%20following) Using CSS Cascade Layers to Manage Custom Styles in a Tailwind Project | CSS-Tricks

[https://css-tricks.com/using-css-cascade-layers-to-manage-custom-styles-in-a-tailwind-project/](https://css-tricks.com/using-css-cascade-layers-to-manage-custom-styles-in-a-tailwind-project/)  