# Sub-audit 6: Content-Type Style Guide Expansion

**Parent:** [orchestrator.md](./orchestrator.md)
**Status:** READY

---

## Objective

Create a new Dev Tools section for "Content-Type Specimens" that showcases how rich text and layout elements look within the context of specific content types (videos, portfolio, posts, events, podcasts). Each content type has unique neon rainbow styling, and all specimens must be toggleable between light and dark modes.

---

## Requirements

1. **Rich Text Specimens with Tabs:**
   - Display a robust rich text block (blockquotes, code blocks, image layouts, pull quotes, lists, tables).
   - Use a Tab navigation to switch between different content-type specimens.
   - Remember to implement explicit light and dark mode styling testing for each.

2. **Tailored FAQ Sections:**
   - Every content type (blog, portfolio, video, etc.) should have an FAQ section specimen with styling tailored to its assigned neon rainbow colour.

3. **Template Browser:**
   - Present full-page layout specimens using a "template browser" approach.
   - Should provide thumbnail/miniature previews of the detail page layout in both light and dark modes.

4. **Dev-Tools Placement:**
   - Live inside `/dev-tools/` under a special "Style Guide Expansion" or "Content Specimens" category so these tools grow together.

---

## Deliverables

- New route: `/dev-tools/content-specimens/`
- Tabbed interface component for Rich Text specimens.
- Specialized FAQ blocks per content type.
- Template browser interface for full-page layout thumbnails.
- Add tasks to `/tasks/feature-work-tasks.md`.
