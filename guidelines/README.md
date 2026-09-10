# Ash Shaw Makeup Portfolio - Guidelines Directory

**Welcome to the comprehensive design system guidelines for the Ash Shaw Makeup Portfolio project.**

This directory contains all the documentation needed to build and maintain the portfolio using Figma Make's AI-powered development environment.

**Version:** 7.0.0
**Last Updated:** February 2026

---

## Quick Start

### For AI Agents (Figma Make)

Follow this **exact reading order** to understand the design system:

#### Step 1: Start Here (REQUIRED)
1. **[Guidelines.md](./Guidelines.md)** - Read this FIRST for project overview and critical rules
2. **[voice-and-tone.md](./voice-and-tone.md)** - Brand voice and writing guidelines

#### Step 2: Read Overviews (REQUIRED)
3. **[overview-components.md](./overview-components.md)** - Complete component system overview
4. **[overview-icons.md](./overview-icons.md)** - Icon system and verification process
5. **[overview-sections.md](./overview-sections.md)** - Section patterns
6. **[overview-blocks.md](./overview-blocks.md)** - Block patterns
7. **[overview-patterns.md](./overview-patterns.md)** - Design patterns
8. **[overview-parts.md](./overview-parts.md)** - Template parts
9. **[overview-templates.md](./overview-templates.md)** - Page templates

#### Step 3: Read Design Tokens (REQUIRED)
10. **[design-tokens/neon-colors.md](./design-tokens/neon-colors.md)** - Neon vs Atomic Black color system (PRIMARY) — 33 curated palettes with interface inspiration
11. **[design-tokens/animations.md](./design-tokens/animations.md)** - Complete animation system (26 keyframes)
12. **[design-tokens/colors.md](./design-tokens/colors.md)** - Legacy color reference
13. **[design-tokens/typography.md](./design-tokens/typography.md)** - Typography hierarchy
14. **[design-tokens/spacing.md](./design-tokens/spacing.md)** - Spacing system

#### Step 4: Understand Data System (REQUIRED)
15. **[Data System Documentation](../data/README.md)** - Mock data system and centralized content management

#### Step 5: Read Theme Documentation (REQUIRED)
16. **[dark-mode-implementation.md](./dark-mode-implementation.md)** - Complete dark mode implementation
17. **[component-dark-mode.md](./component-dark-mode.md)** - Component-specific theme patterns

#### Step 6: Read Component Guidelines BEFORE Using
18. Before using ANY component, read its specific file in **[components/](./components/)**

#### Step 7: Mobile Guidelines (If Building Mobile Features)
19. **[mobile/typography.md](./mobile/typography.md)** - Mobile typography rules
20. **[mobile/images.md](./mobile/images.md)** - Mobile image optimization
21. **[mobile/performance.md](./mobile/performance.md)** - Mobile performance
22. **[mobile/forms.md](./mobile/forms.md)** - Mobile form patterns

---

## Complete Directory Structure

```
guidelines/
├── Guidelines.md                  - START HERE - Main entry point
├── README.md                      - This file - Navigation guide
├── voice-and-tone.md              - Brand voice and writing guidelines
├── ARCHITECTURE.md                - Component architecture and taxonomy
├── SITEMAP.md                     - Site structure, navigation, and routing
│
├── overview-components.md         - Component system overview
├── overview-icons.md              - Icon system guide
├── overview-sections.md           - Section patterns
├── overview-blocks.md             - Block patterns
├── overview-patterns.md           - Design patterns
├── overview-parts.md              - Template parts
├── overview-templates.md          - Page templates
├── overview-blog-filtering.md     - Blog filtering system
│
├── search-system.md               - Global search system
├── pwa-implementation.md          - Progressive Web App features
├── dark-mode-implementation.md    - Dark mode implementation
├── component-dark-mode.md         - Component theme patterns
├── css-architecture.md            - CSS system documentation
├── data-models.md                 - Data model definitions
├── accessibility-report-feb-2025.md - WCAG AA compliance report
│
├── components/                    - Component-specific guides (24 files)
│   ├── Logo.md
│   ├── Header.md
│   ├── Footer.md
│   ├── ScrollDownArrow.md
│   ├── ScrollBackToTop.md
│   ├── SocialLinks.md
│   ├── LayoutSwitcher.md
│   ├── PortfolioCard.md
│   ├── BlogCard.md
│   ├── Breadcrumbs.md
│   ├── ShareComponent.md
│   ├── ReadMoreButton.md
│   ├── SearchBar.md
│   ├── CategoryFilter.md
│   ├── Pagination.md
│   ├── SectionCard.md
│   ├── SliderCard.md
│   ├── ColorfulIcons.md
│   ├── TypeformEmbed.md
│   └── ... (more components)
│
├── design-tokens/                 - Design system specifications
│   ├── neon-colors.md             - Neon vs Atomic Black color system
│   ├── animations.md              - 26 keyframe animations
│   ├── colors.md                  - Legacy color palette
│   ├── typography.md              - Font system and hierarchy
│   ├── spacing.md                 - Spacing scale
│   └── light-dark-mode.md         - Theme token documentation
│
├── icons/                         - Icon category documentation
│   ├── travel.md                  - Travel and location icons
│   └── interface.md               - UI controls and navigation icons
│
├── mobile/                        - Mobile-specific guidelines
│   ├── typography.md
│   ├── spacing.md
│   ├── buttons.md
│   ├── animations.md
│   ├── images.md
│   ├── performance.md
│   └── forms.md
│
├── sections/                      - Section pattern guides
├── blocks/                        - Block pattern guides
├── patterns/                      - Design pattern guides
├── parts/                         - Template parts guides
├── templates/                     - Page template guides
├── responsive/                    - Responsive design guidelines
├── troubleshooting/               - Common issue resolutions
└── reports/                       - Historical implementation reports
```

---

## Core Documentation Files

### Main Guidelines

| File | Purpose | Version | Status |
|------|---------|---------|--------|
| **[Guidelines.md](./Guidelines.md)** | Main entry point, project overview | v7.0.0 | Current |
| **[README.md](./README.md)** | This file - navigation guide | v7.0.0 | Current |
| **[voice-and-tone.md](./voice-and-tone.md)** | Brand voice and writing guidelines | v1.0.0 | Current |
| **[ARCHITECTURE.md](./ARCHITECTURE.md)** | Component architecture and taxonomy | v3.2.0 | Current |
| **[SITEMAP.md](./SITEMAP.md)** | Site structure and routing | v5.0.0 | Current |

### Data & Integration Guides

| File | Purpose | Version | Status |
|------|---------|---------|--------|
| **[Data System](../data/README.md)** | Data system architecture | v2.0.0 | Current |
| **[search-system.md](./search-system.md)** | Global search system | v1.0.0 | Current |
| **[pwa-implementation.md](./pwa-implementation.md)** | PWA features | v1.0.0 | Current |
| **[wordpress-migration-guide.md](./wordpress-migration-guide.md)** | Headless WordPress Setup | v1.0.0 | **New** |

### Design Tokens

| File | Purpose | Coverage |
|------|---------|----------|
| **[neon-colors.md](./design-tokens/neon-colors.md)** | Neon color system | 8 neon colors, atomic black, gradients |
| **[animations.md](./design-tokens/animations.md)** | Animation system | 26 keyframes, reduced motion |
| **[colors.md](./design-tokens/colors.md)** | Legacy colors | Semantic tokens reference |
| **[typography.md](./design-tokens/typography.md)** | Typography | Fluid scale, font families |
| **[spacing.md](./design-tokens/spacing.md)** | Spacing | Fluid scale, component utilities |

---

## Finding What You Need

### By Feature

**Building a Page Component?**
- Start with [overview-components.md](./overview-components.md)
- Check [Data System Documentation](../data/README.md) for content
- Review [Guidelines.md](./Guidelines.md) Section 1 for architecture

**Using a Specific Component?**
- Find component in [components/](./components/) directory
- Read full component guide before implementing
- Check [overview-components.md](./overview-components.md) for architecture

**Styling an Element?**
- Read [design-tokens/](./design-tokens/) for token system
- Check [Guidelines.md](./Guidelines.md) Section 7 for BEM requirements
- Review [css-architecture.md](./css-architecture.md) for structure

**Adding Icons?**
- Check [overview-icons.md](./overview-icons.md) for verification process
- Never assume an icon exists — verify first

**Testing Accessibility?**
- Review [accessibility-report-feb-2025.md](./accessibility-report-feb-2025.md)
- Check component guides for ARIA requirements
- Use the built-in Accessibility Tester at `/dev-tools/accessibility`

---

**Last Updated:** February 2026