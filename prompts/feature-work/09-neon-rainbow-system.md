# Sub-audit 9: Neon Rainbow System & Legend

**Parent:** [orchestrator.md](./orchestrator.md)
**Status:** READY

---

## Objective

Formalize the 1:1 mapping of neon colours across the entire site architecture, explicitly explain the implementation to developers, and push the neon tinting deep into interaction elements.

---

## Requirements

1. **Neon Rainbow Dev Tools Page:**
   - Create `/dev-tools/neon-rainbow/`.
   - Explicitly display the 1:1 formal mapping (e.g. which major page section/content type gets which signature neon colour).
   - Write in-page documentation (explaining to developers how the neon rainbow CSS variables/BEM classes are implemented and consumed).

2. **Expanded Component Tints:**
   - Instead of just gradient subtitles, enforce the page's assigned neon color deeply across elements:
     - Section divider glow
     - Card hover border colour
     - Icon accent colour
     - Scroll-to-top button tint
   - Brainstorm and implement 5-10 additional ideas for colour tinting (e.g., selection text color, custom scrollbar thumb, form input focus ring, inline code background, horizontal rule glows).

---

## Deliverables

- `NeonRainbowPage.tsx` under `/dev-tools/`.
- Deepened CSS architecture that passes a CSS variable (e.g., `--page-neon`) down the DOM tree, allowing child components to inherit the page's signature colour natively.
- Report listing the additional 5-10 elements modified.
