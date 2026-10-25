# Interactions & Animations (N015)

**Version:** 1.0.0  
**Status:** Canonical Reference  
**Last Updated:** 2026-10-25

---

## Animation Timing

| Name | Duration | Easing |
|------|----------|--------|
| Fast | 150ms | ease-out |
| Normal | 300ms | ease-in-out |
| Slow | 500ms | ease-out |

---

## Interaction Patterns

- Hover states: Color/opacity change
- Focus states: Visible outline (3px minimum)
- Disabled states: Reduced opacity + pointer-none

---

## Reduced Motion Support

All animations must respect `prefers-reduced-motion` setting.

See `guidelines/prefers-reduced-motion.md` for implementation.

---

**Last Updated:** 2026-10-25
