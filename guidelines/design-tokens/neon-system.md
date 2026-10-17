# Neon vs Atomic Black System

**Version:** 1.0.0
**Last Updated:** February 2026
**Purpose:** Formal definition of the "Neon vs Atomic Black" design language and interaction model.

---

## 1. Core Philosophy

The design system is built on high contrast. **Atomic Black** (`#0F0F0F`) provides a deep, infinite canvas where **Neon Colors** vibrate and glow.

*   **Atomic Black:** Not pure black (`#000000`), but a rich, deep charcoal (`#0F0F0F`). This allows for subtle shadows and depth perception that pure black flattens.
*   **Neon:** High-saturation colors used sparingly for emphasis, interaction, and brand identity.

## 2. Interaction Model

Interactive elements follow a 3-stage lifecycle: **Rest**, **Hover/Focus**, and **Active**.

### 2.1. Rest State
*   **Borders:** Subtle or transparent.
*   **Backgrounds:** Translucent (`rgba`) or solid atomic black.
*   **Shadows:** Minimal (`--wp--preset--shadow--sm`).

### 2.2. Hover & Focus State (The Glow)
*   **Hover:** Elements "power up". Borders glow with neon color. Shadows expand to simulate emitted light.
    *   *Token:* `--wp--preset--shadow--neon-purple-hover` or `--wp--preset--shadow--card-hover`.
    *   *Transition:* `0.3s ease` (smooth power-up).
*   **Focus:** Keyboard focus is critical. We use a **double-ring** effect.
    *   *Ring 1:* 3px solid neon pink (`--wp--preset--color--neon-pink`).
    *   *Ring 2 (Offset):* 2px spacing.
    *   *Glow:* A soft outer glow (`rgba(255, 16, 240, 0.3)`).

### 2.3. Active State (Pulse)
*   **Click/Tap:** Immediate feedback.
*   **Loading/Processing:** Elements use the "Neon Pulse" animation.
    *   *Class:* `.animate-neon-pulse-pink`.
    *   *Effect:* The shadow breathes, expanding and contracting.

## 3. Shadow Token System

We do not use hardcoded `box-shadow`. Use these semantic tokens:

| Token | Use Case | Light Mode | Dark Mode (Glow) |
|-------|----------|------------|------------------|
| `--wp--preset--shadow--sm` | Subtle depth | 1px border-like | Faint glow |
| `--wp--preset--shadow--card` | Content cards | Soft diffuse | Purple/Blue glow |
| `--wp--preset--shadow--card-hover` | Hover state | Lifted | **Intense** Neon glow |
| `--wp--preset--shadow--neon-pink` | Brand accents | Pink glow | Pink light source |
| `--wp--preset--shadow--focus-ring` | A11y Focus | Pink Ring | Pink Ring + Glow |

**Example Usage:**

```css
.card {
  box-shadow: var(--wp--preset--shadow--card);
  transition: box-shadow 0.3s ease;
}

.card:hover {
  box-shadow: var(--wp--preset--shadow--card-hover);
  border-color: var(--wp--preset--color--neon-purple);
}
```

## 4. Atomic Black Strategy

Standard "Dark Mode" often just inverts colors. **Atomic Black** is different:

1.  **Transparency:** Surfaces are rarely 100% opaque. We use `rgba(15, 15, 15, 0.7)` with `backdrop-filter: blur(12px)`. This lets the "Neon Noise" background texture bleed through.
2.  **Noise Texture:** A global SVG noise overlay (`.app-noise-overlay`) adds film-grain texture, preventing color banding and adding tactile feel.
3.  **No Pure White Text:** We use `--foreground` (`#ffffff`) for headings but slightly dimmed (`#f5f3ff`) for body text to reduce eye strain against the black.

## 5. CSS Implementation Rules

*   **Never** use `box-shadow: 0 0 10px #f0f`. Use `var(--wp--preset--shadow--neon-pink)`.
*   **Never** use `background: #000`. Use `var(--wp--preset--color--atomic-black)`.
*   **Always** define `.dark` overrides for neon elements to ensure they "turn off" (become darker/readable) in Light Mode and "turn on" (glow) in Dark Mode.
