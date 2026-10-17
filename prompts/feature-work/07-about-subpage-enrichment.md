# Sub-audit 7: About Sub-Pages Enrichment (WebGL & Layouts)

**Parent:** [orchestrator.md](./orchestrator.md)
**Status:** READY

---

## Objective

Enhance all 21 About Sub-Pages with animated WebGL 3D graphics, diverse structural layouts, and deep integration of the neon rainbow system. This will be implemented systematically across phases.

---

## Requirements

1. **Reusable WebGL 3D Component:**
   - Extract the existing WebGL 3D graphics from `/about/music` and dev-tools.
   - Rebuild them as a highly reusable, parametrizable React component (e.g., `<AnimatedWebGL3D ... />`) with variables for speed, color, shape, and intensity.
   - Example use-case: "A spinning wheel for the cycling page".

2. **WebGL Dev Tools Hub:**
   - Create a single Dev Tools page (`/dev-tools/webgl-graphics/`) that embeds and configures all variations of these graphics.

3. **Structural Layout Variety:**
   - Break out from the standard "Hero → Content" layout.
   - Implement **Parallax scroll sections** with layered depth.
   - Implement **Card grid layouts** directly within sub-pages (e.g., individual cat cards for `/about/six-cats`).
   - Implement **Split-screen layouts** (alternating text/image) using unsplash placeholders.
   - Implement **Full-bleed image breaks** between text sections.

4. **Neon Hovers & Glows:**
   - Assign each sub-page its own signature neon colour.
   - Apply specific colour glows/hovers to:
     - Links
     - Images
     - Section borders
     - Pull quotes
     - Timeline nodes

5. **Phased Rollout:**
   - Develop a phased plan to roll out these structural and graphic updates to all 21 sub-pages.

---

## Deliverables

- `AnimatedWebGL3D.tsx` component with variable support.
- New Dev Tools page: `/dev-tools/webgl-graphics/`.
- Updated CSS/layout guidelines for Parallax, Split-screen, and Card Grids inside content pages.
- Actionable task list breaking down the 21 pages into logical deployment phases.
