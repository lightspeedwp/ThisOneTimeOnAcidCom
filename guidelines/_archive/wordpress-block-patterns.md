<!-- Type 3 (Archival) Pointer with comment-based redirect -->
<!-- Original: Guidelines/wordpress-block-patterns.md -->
<!-- Reason: WordPress not in active stack (D8) -->
<!-- Archived into: guidelines/_archive/wordpress-block-patterns.md -->
<!-- Replacement: N030 (WordPress Block Patterns) - Phase 3 -->
<!-- Authority: D5.c (Status Notation), D8 (WordPress Scope) -->

> ⚠️ **ARCHIVED** · This guideline has been consolidated into the Phase 3 roadmap. WordPress is not part of the active tech stack. See [N030: WordPress Block Patterns](../N030-wordpress-block-patterns.md) for future reference.

This document is archived. For the current active stack (React/Next.js), see the main guidelines in the parent directory.

---
<<<<<<< HEAD:guidelines/_archive/wordpress-block-patterns.md

## 1. Core Layout Patterns

### Hero Section (`ash/hero-split`)

Maps to `HeroLayout.tsx`.

**Structure:**

- `core/group` (Container, Full Width)
    - `core/columns` (Two Columns)
        - `core/column` (Content, Vertical Align Middle)
            - `core/heading` (H1, Gradient Text)
            - `core/paragraph` (Lead Text)
            - `core/buttons`
                - `core/button` (Primary Neon)
                - `core/button` (Secondary Ghost)
        - `core/column` (Image/Visual)
            - `core/image` (Rounded, Shadow-2xl)

### Why Section (`ash/features-grid`)

Maps to `WhySection.tsx`.

**Structure:**

- `core/group` (Container)
    - `core/heading` (Section Title)
    - `core/columns` (3 Columns)
        - `core/column` (Card Style)
            - `core/image` (Icon)
            - `core/heading` (H3)
            - `core/paragraph`

---

## 2. Dynamic Content Patterns

### FAQ Accordion (`ash/faq-accordion`)

Maps to `FaqSection.tsx`.

**Structure:**

- `core/group` (Background: Atomic Black Noise)
    - `core/heading` (Title)
    - `core/details` (Repeater)
        - `core/summary` (Question + Chevron)
        - `core/group` (Answer Body)

### Blog Grid (`ash/query-grid`)

Maps to `BlogPreviewSection.tsx`.

**Structure:**

- `core/query` (Inherit query from URL)
    - `core/post-template` (Grid 3-col)
        - `core/group` (Card Wrapper)
            - `core/post-featured-image`
            - `core/post-title`
            - `core/post-excerpt`
            - `core/post-date`

---

## 3. Style Definitions (`theme.json` Mapping)

| React Component | WP Block Class | Notes |
|-----------------|----------------|-------|
| `btn--neon-primary` | `.is-style-neon-primary` | Custom button style |
| `btn--neon-secondary` | `.is-style-neon-secondary` | Ghost button with neon border |
| `text-hero-h1` | `h1` (default) | Set via theme.json typography |
| `card` | `.is-style-card` | Applied to Group blocks |

## 4. Migration Strategy

1.  **Register Patterns:** Create PHP files in `patterns/` folder of the WP theme containing the block markup.

1.  **Lock Templates:** Use full-site editing templates (`templates/index.html`) to enforce the layout.

1.  **ACF Blocks:** For complex interactive components (like the "Neon vs Atomic Black" toggle or 3D books), wrap the React code in a custom ACF Block or use a Headless approach where WP just serves the JSON data.
<!-- Archived: wordpress-block-patterns.md - Out of scope per D8 (WordPress not used in this site) -->
=======
<!-- Consolidated into: ../N030-wordpress-block-patterns.md -->
*Archived: 2026-11-11 | Type 3 Archival | D5 Authority | D8: WordPress deferred*
>>>>>>> 38f1962 (feat(003-T049-Phase2-3): Complete pointer operations (Type 2 & Type 3)):guidelines/wordpress-block-patterns.md
