---
title: "WordPress CSS Alignment Audit"
filename: "/prompts/modern-react-migration/04-wordpress-css-alignment.md"
created: "2026-03-11"
modified: "2026-03-11"
version: "1.0.0"
prompt_type: "sub-prompt"
parent_orchestrator: "/prompts/modern-react-migration/00-ORCHESTRATOR.md"
estimated_duration: "45 minutes"
output_report: "/reports/2026-03-11-modern-react-migration/04-wordpress-css-alignment.md"
---

# Sub-Prompt 04: WordPress CSS Alignment Audit

## Purpose

Audit the BEM CSS architecture for alignment with WordPress Full Site Editing (FSE) and Block Editor patterns. This ensures the React codebase uses CSS class names and custom properties that match WordPress conventions, making future WordPress migration easier.

---

## Scope

Scan ALL CSS and TypeScript files:

```
/styles/globals.css
/styles/blocks/*.css
/styles/patterns/*.css
/styles/sections/*.css
/components/**/*.tsx
```

---

## WordPress FSE Reference Patterns

### 1. WordPress Block Class Naming

**Standard WordPress Block Classes:**
```css
.wp-block-{block-name}                  /* Main block wrapper */
.wp-block-{block-name}__inner           /* Inner content wrapper */
.wp-block-{block-name}__item            /* Repeating items */
.wp-block-{block-name}--{modifier}      /* Block variations */
```

**Examples:**
```css
.wp-block-group                         /* Group block */
.wp-block-columns                       /* Columns block */
.wp-block-column                        /* Single column */
.wp-block-heading                       /* Heading block */
.wp-block-paragraph                     /* Paragraph block */
.wp-block-image                         /* Image block */
.wp-block-button                        /* Button block */
.wp-block-buttons                       /* Button group */
```

---

### 2. WordPress Custom Properties (CSS Variables)

**Color Presets:**
```css
--wp--preset--color--primary
--wp--preset--color--secondary
--wp--preset--color--tertiary
--wp--preset--color--foreground
--wp--preset--color--background
--wp--preset--color--accent
```

**Typography Presets:**
```css
--wp--preset--font-size--small
--wp--preset--font-size--medium
--wp--preset--font-size--large
--wp--preset--font-size--x-large
--wp--preset--font-family--primary
--wp--preset--font-family--heading
```

**Spacing Presets:**
```css
--wp--preset--spacing--20
--wp--preset--spacing--30
--wp--preset--spacing--40
--wp--preset--spacing--50
--wp--preset--spacing--60
```

**Custom Presets:**
```css
--wp--custom--spacing--small
--wp--custom--spacing--medium
--wp--custom--spacing--large
--wp--custom--typography--line-height--heading
--wp--custom--typography--line-height--body
```

---

### 3. WordPress Utility Classes

**Layout Classes:**
```css
.has-text-align-left
.has-text-align-center
.has-text-align-right
.alignwide
.alignfull
.alignleft
.alignright
.aligncenter
```

**Color Classes:**
```css
.has-{color-slug}-color                 /* Text color */
.has-{color-slug}-background-color      /* Background color */
.has-{color-slug}-border-color          /* Border color */
```

**Typography Classes:**
```css
.has-{size-slug}-font-size
.has-{family-slug}-font-family
```

---

## Audit Checklist

### 1. Block Class Alignment

**Check for:**
- ✅ BEM classes that align with WordPress block patterns
- ✅ Semantic block naming (e.g., `.hero`, `.portfolio`, `.blog-card`)
- ❌ BEM classes that conflict with WordPress naming
- ❌ Missing WordPress-aligned variations

**Document:**
- Current BEM classes that match WordPress patterns
- BEM classes that should be renamed for WordPress alignment
- Opportunities to adopt WordPress block naming

**Example Findings:**
```
✅ ALIGNED:
.hero                           → .wp-block-hero
.portfolio-card                 → .wp-block-portfolio-card
.blog-post                      → .wp-block-blog-post

❌ MISALIGNED:
.card-wrapper                   → Should be .wp-block-card
.image-container                → Should be .wp-block-image__container
.text-content                   → Should be .wp-block-content
```

---

### 2. Custom Property Naming

**Check for:**
- ✅ Custom properties using `--wp--preset--*` format
- ✅ Color variables aligned with WordPress color presets
- ✅ Typography variables aligned with WordPress font presets
- ❌ Custom properties with non-WordPress naming
- ❌ Hardcoded color values (should use custom properties)

**Document:**
- Current custom properties and their WordPress equivalents
- Custom properties that should be renamed
- Missing WordPress preset mappings

**Example Findings:**
```
✅ ALIGNED:
--wp--preset--color--neon-pink
--wp--preset--color--atomic-black
--wp--preset--font-size--hero-h1

❌ MISALIGNED:
--color-primary                 → Should be --wp--preset--color--primary
--font-size-large               → Should be --wp--preset--font-size--large
--spacing-4                     → Should be --wp--preset--spacing--40
```

---

### 3. Utility Class Alignment

**Check for:**
- ✅ Alignment utilities matching WordPress patterns
- ✅ Color utilities using `has-*` format
- ✅ Typography utilities using `has-*` format
- ❌ Custom alignment classes (should use WordPress format)
- ❌ Non-standard utility naming

**Document:**
- Current utility classes and their WordPress equivalents
- Custom utilities that should be renamed
- Missing WordPress utilities

**Example Findings:**
```
✅ ALIGNED:
.has-text-align-center
.has-primary-background-color
.alignfull

❌ MISALIGNED:
.text-center                    → Should be .has-text-align-center
.bg-primary                     → Should be .has-primary-background-color
.full-width                     → Should be .alignfull
```

---

### 4. Block Editor Compatibility

**Check for:**
- ✅ CSS that would work in WordPress block editor
- ✅ Semantic HTML structure matching WordPress blocks
- ✅ Proper use of `.wp-block-*__inner` containers
- ❌ Complex CSS selectors that won't work in block editor
- ❌ JavaScript-dependent styling (should be CSS-only)

**Document:**
- Components that are block-editor-compatible
- Components that need restructuring for WordPress
- CSS patterns that conflict with block editor

---

### 5. Theme.json Alignment

**Check for:**
- ✅ Settings that could be defined in `theme.json`
- ✅ Color palettes matching WordPress format
- ✅ Typography scales matching WordPress format
- ❌ Settings hardcoded in CSS (should be in `theme.json`)
- ❌ Missing preset declarations

**Document:**
- Settings that should move to `theme.json`
- Color/typography presets to define
- Custom settings to add

**Example `theme.json` structure:**
```json
{
  "version": 2,
  "settings": {
    "color": {
      "palette": [
        {
          "slug": "neon-pink",
          "color": "#FF10F0",
          "name": "Neon Pink"
        },
        {
          "slug": "atomic-black",
          "color": "#0F0F0F",
          "name": "Atomic Black"
        }
      ]
    },
    "typography": {
      "fontSizes": [
        {
          "slug": "small",
          "size": "16px",
          "name": "Small"
        },
        {
          "slug": "medium",
          "size": "20px",
          "name": "Medium"
        }
      ]
    }
  }
}
```

---

### 6. Block Pattern Alignment

**Check for:**
- ✅ Section patterns that match WordPress block patterns
- ✅ Reusable compositions (hero, CTA, testimonials)
- ✅ Proper nesting structure
- ❌ Patterns that don't translate to WordPress
- ❌ Missing WordPress-standard patterns

**Document:**
- Current patterns and their WordPress equivalents
- Patterns that need restructuring
- New patterns to create

---

## Report Structure

Save findings to: `/reports/2026-03-11-modern-react-migration/04-wordpress-css-alignment.md`

Use this template:

```markdown
---
title: "WordPress CSS Alignment Audit Report"
filename: "/reports/2026-03-11-modern-react-migration/04-wordpress-css-alignment.md"
created: "2026-03-11"
completed: "[DATE]"
version: "1.0.0"
status: "complete"
auditor: "AI Assistant"
related_prompt: "/prompts/modern-react-migration/04-wordpress-css-alignment.md"
---

# WordPress CSS Alignment Audit Report

**Audit Date:** [DATE]  
**Files Scanned:** [NUMBER] CSS + `.tsx` files  
**Alignment Score:** [PERCENTAGE]%

---

## Executive Summary

[2-3 paragraphs summarizing alignment with WordPress patterns]

**Fully Aligned:** [NUMBER] classes  
**Partially Aligned:** [NUMBER] classes  
**Misaligned:** [NUMBER] classes  
**Missing WordPress Patterns:** [NUMBER] patterns

---

## 1. Block Class Alignment

### ✅ WordPress-Aligned Classes ([NUMBER])

| Current BEM Class | WordPress Equivalent | Status |
|-------------------|---------------------|--------|
| `.hero` | `.wp-block-hero` | ✅ Direct match |
| `.portfolio-card` | `.wp-block-portfolio-card` | ✅ Direct match |

### ❌ Misaligned Classes ([NUMBER])

| Current BEM Class | Should Be | Priority | Notes |
|-------------------|-----------|----------|-------|
| `.card-wrapper` | `.wp-block-card` | P1 | Rename for WordPress |
| `.image-container` | `.wp-block-image__container` | P2 | Add `__inner` element |

---

## 2. Custom Property Naming

### ✅ WordPress-Aligned Properties ([NUMBER])

```css
/* Color Presets */
--wp--preset--color--neon-pink: #FF10F0;
--wp--preset--color--atomic-black: #0F0F0F;

/* Typography Presets */
--wp--preset--font-size--hero-h1: clamp(36px, 5vw, 120px);
--wp--preset--font-family--heading: 'Playfair Display', serif;

/* Spacing Presets */
--wp--preset--spacing--40: clamp(1rem, 2vw, 1.5rem);
```

### ❌ Misaligned Properties ([NUMBER])

| Current Property | Should Be | Priority |
|------------------|-----------|----------|
| `--color-primary` | `--wp--preset--color--primary` | P1 |
| `--font-size-large` | `--wp--preset--font-size--large` | P1 |
| `--spacing-4` | `--wp--preset--spacing--40` | P2 |

---

## 3. Utility Class Alignment

### ✅ WordPress-Aligned Utilities ([NUMBER])

```css
.has-text-align-center
.has-primary-background-color
.alignfull
.alignwide
```

### ❌ Misaligned Utilities ([NUMBER])

| Current Class | Should Be | Priority |
|---------------|-----------|----------|
| `.text-center` | `.has-text-align-center` | P1 |
| `.bg-primary` | `.has-primary-background-color` | P1 |
| `.full-width` | `.alignfull` | P2 |

---

## 4. Block Editor Compatibility

### ✅ Compatible Components ([NUMBER])

- `Hero` - Fully compatible with WordPress Group block
- `PortfolioCard` - Compatible with custom block pattern
- `BlogPost` - Compatible with Post Content block

### ❌ Incompatible Components ([NUMBER])

**Component:** `ComplexGallery`  
**Issue:** Uses JavaScript-dependent grid layout  
**Fix:** Restructure to use CSS Grid with WordPress block editor support  
**Priority:** P1

---

## 5. Theme.json Recommendations

### Suggested `theme.json` Structure

```json
{
  "version": 2,
  "settings": {
    "color": {
      "palette": [
        {
          "slug": "neon-pink",
          "color": "#FF10F0",
          "name": "Neon Pink"
        },
        {
          "slug": "atomic-black",
          "color": "#0F0F0F",
          "name": "Atomic Black"
        },
        {
          "slug": "neon-green",
          "color": "#39FF14",
          "name": "Neon Green"
        }
      ]
    },
    "typography": {
      "fontFamilies": [
        {
          "slug": "heading",
          "fontFamily": "'Playfair Display', serif",
          "name": "Playfair Display"
        },
        {
          "slug": "body",
          "fontFamily": "'Inter', sans-serif",
          "name": "Inter"
        }
      ],
      "fontSizes": [
        {
          "slug": "small",
          "size": "16px",
          "name": "Small"
        },
        {
          "slug": "medium",
          "size": "20px",
          "name": "Medium"
        },
        {
          "slug": "large",
          "size": "24px",
          "name": "Large"
        },
        {
          "slug": "hero-h1",
          "size": "clamp(36px, 5vw, 120px)",
          "name": "Hero H1"
        }
      ]
    },
    "spacing": {
      "units": ["px", "em", "rem", "vh", "vw", "%"],
      "spacingScale": {
        "steps": 0
      },
      "spacingSizes": [
        {
          "slug": "20",
          "size": "0.5rem",
          "name": "1"
        },
        {
          "slug": "30",
          "size": "1rem",
          "name": "2"
        },
        {
          "slug": "40",
          "size": "1.5rem",
          "name": "3"
        },
        {
          "slug": "50",
          "size": "2rem",
          "name": "4"
        }
      ]
    }
  }
}
```

---

## 6. Block Pattern Recommendations

### Existing Patterns → WordPress Blocks

| Current Pattern | WordPress Block Equivalent | Compatibility |
|-----------------|---------------------------|---------------|
| Hero Section | Group + Cover blocks | ✅ High |
| Portfolio Grid | Query Loop + Custom block | ⚠️ Medium |
| Blog Card | Post Template pattern | ✅ High |
| CTA Section | Group + Buttons blocks | ✅ High |

---

## Recommendations

### Immediate Actions (P0)
1. Create `/docs/wordpress-migration-plan.md` with migration strategy
2. Document all WordPress-aligned patterns

### High Priority (P1)
1. Rename top 10 most-used BEM classes to WordPress format
2. Convert custom properties to `--wp--preset--*` format
3. Update utility classes to use `has-*` format
4. Create `theme.json` structure

### Improvements (P2)
1. Restructure components for block editor compatibility
2. Create WordPress block pattern library
3. Document block pattern → WordPress mapping

### Documentation (P3)
1. Create WordPress CSS alignment guide
2. Document theme.json configuration
3. Create block pattern documentation

---

## Alignment Statistics

| Category | Total Items | Aligned | Misaligned | % Aligned |
|----------|-------------|---------|------------|-----------|
| Block Classes | [N] | [N] | [N] | [N]% |
| Custom Properties | [N] | [N] | [N] | [N]% |
| Utility Classes | [N] | [N] | [N] | [N]% |
| Components | [N] | [N] | [N] | [N]% |
| Patterns | [N] | [N] | [N] | [N]% |
| **OVERALL** | [N] | [N] | [N] | [N]% |

---

## Migration Complexity Assessment

**Low Complexity (0-10 hours):**
- Rename BEM classes to WordPress format
- Convert custom properties to `--wp--preset--*`
- Update utility classes

**Medium Complexity (10-30 hours):**
- Create `theme.json` structure
- Restructure components for block editor
- Create block pattern library

**High Complexity (30+ hours):**
- Implement full WordPress block theme
- Custom block development
- Advanced Custom Fields integration

---

## Next Steps

1. Extract actionable items into task list
2. Prioritize WordPress alignment tasks
3. Create WordPress migration roadmap
4. Update component guidelines with WordPress patterns

---

**Audit Completed:** [DATE]  
**Report Status:** Complete
```

---

## Success Criteria

This audit is COMPLETE when:

- [x] All CSS files scanned
- [x] All BEM classes analyzed
- [x] Custom properties documented
- [x] WordPress alignment scored
- [x] `theme.json` structure proposed
- [x] Report saved with status "complete"

---

## Related Documentation

**Parent Orchestrator:** [00-ORCHESTRATOR.md](./00-ORCHESTRATOR.md)

**WordPress Resources:**
- [WordPress Block Editor Handbook](https://developer.wordpress.org/block-editor/)
- [Theme.json Reference](https://developer.wordpress.org/block-editor/how-to-guides/themes/theme-json/)
- [WordPress Block Patterns](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-patterns/)

**Related Guidelines:**
- [BEM CSS Architecture](../../guidelines/css-architecture.md)
- [Component Guidelines](../../guidelines/overview-components.md)

---

**Last Updated:** March 11, 2026  
**Maintained By:** Development Team
