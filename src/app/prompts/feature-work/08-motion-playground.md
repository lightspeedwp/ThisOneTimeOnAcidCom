# Sub-audit 8: Motion Playground & Advanced Interactions

**Parent:** [orchestrator.md](./orchestrator.md)
**Status:** READY

---

## Objective

Significantly expand the animations dev tools to feature hover states, focus states, page transitions, advanced interaction patterns, and a full interactive motion playground builder.

---

## Requirements

1. **Transition Specimens:**
   - Document and test explicit specimens for:
     - Hover states
     - Focus states
     - Page transitions (in/out routing effects).

2. **Interaction Patterns:**
   - Create demonstrations of new interaction types:
     - Drag examples (e.g., using `re-resizable` or mouse event bounds).
     - Scroll-triggered animations.
     - Parallax demos.

3. **Motion Playground Builder (High Priority):**
   - Build a visual sandbox interface (`/dev-tools/motion-playground/`).
   - Must allow the user to tweak CSS animation variables in real-time:
     - Duration (ms)
     - Easing (bezier curves)
     - Delay (ms)
   - Must show a live side-by-side comparison of `prefers-reduced-motion: reduce` vs `full-motion`.

---

## Deliverables

- `MotionPlaygroundPage.tsx` interface with range sliders and input controls.
- Expand animation dev-tools to include transitions and complex scroll/drag behaviors.
- CSS updates to map variables (`--animation-duration`, `--animation-easing`) into the component preview window.
- Task list to integrate these components securely without breaking the Figma Make bundler.
