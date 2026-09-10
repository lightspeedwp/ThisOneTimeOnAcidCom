# Header & Menu Expected Styles - Dark vs Light Mode

**Created:** March 20, 2026  
**Purpose:** Document correct header/menu styling after selector fixes

---

## Dark Mode Header (CORRECT STATE)

### Header Background
```css
.dark .header {
  background-color: rgba(15, 15, 15, 0.95); /* Atomic black with 95% opacity */
  border-bottom: 1px solid rgba(255, 16, 240, 0.2); /* Neon pink glow border */
  backdrop-filter: blur(12px);
}
```

**Visual:**
- Background: Nearly opaque atomic black (#0F0F0F)
- Border: Subtle neon pink glow at bottom
- Blur effect on scroll content behind header

### Logo
```css
.dark .header__logo {
  color: #F4FF3C; /* Neon yellow */
  animation: neon-yellow-green-pulse 3s ease-in-out infinite;
  text-shadow: 
    0 0 10px rgba(244, 255, 60, 0.8),
    0 0 20px rgba(244, 255, 60, 0.6),
    0 0 30px rgba(244, 255, 60, 0.4);
}
```

**Visual:**
- Text: Bright neon yellow (#F4FF3C)
- Animation: Pulses between yellow and green every 3 seconds
- Glow: Triple-layer shadow creating neon tube effect

### Navigation Links
```css
.dark .header__nav-link {
  color: #F6F2EB; /* Warm white */
}

.dark .header__nav-link:hover {
  color: #FF10F0; /* Neon pink */
}
```

**Visual:**
- Default: Warm white text
- Hover: Neon pink (#FF10F0)

### Mobile Menu Button
```css
.dark .header__burger-button {
  color: #F6F2EB; /* Warm white */
}
```

---

## Dark Mode Mobile Menu (CORRECT STATE)

### Background
```css
.dark .mobile-menu {
  background-color: #0F0F0F; /* Atomic black */
  background-image: radial-gradient(
    circle at center,
    rgba(255, 16, 240, 0.1) 0%,
    transparent 70%
  );
}
```

**Visual:**
- Solid atomic black background
- Subtle radial pink glow from center

### Navigation Links
```css
.dark .mobile-menu__nav-link {
  color: #F6F2EB; /* Warm white */
  border-bottom: 1px solid rgba(255, 16, 240, 0.2);
}

.dark .mobile-menu__nav-link:hover {
  color: #FF3AAE; /* Neon pink */
  background: linear-gradient(90deg, rgba(255, 16, 240, 0.1) 0%, transparent 100%);
}
```

**Visual:**
- Text: Warm white with pink glow borders
- Hover: Neon pink text with gradient background

---

## Light Mode Header (CORRECT STATE)

### Header Background
```css
:root:not(.dark) .header {
  background: linear-gradient(
    135deg,
    rgba(255, 251, 254, 0.98) 0%,
    rgba(255, 245, 252, 0.98) 100%
  );
  border-bottom: 2px solid #FFD0EE;
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 8px rgba(224, 0, 122, 0.1);
}
```

**Visual:**
- Background: Soft pink gradient (nearly white to soft pink)
- Border: 2px solid pink (#FFD0EE)
- Shadow: Subtle pink-tinted shadow

### Logo
```css
:root:not(.dark) .header__logo {
  color: #E0007A; /* Vibrant magenta */
  text-shadow: 0 1px 2px rgba(224, 0, 122, 0.2);
}
```

**Visual:**
- Text: Vibrant magenta/pink (#E0007A)
- NO animation in light mode
- Subtle shadow for depth

### Navigation Links
```css
:root:not(.dark) .header__nav-link {
  color: #5A4A5A; /* Warm grey */
}

:root:not(.dark) .header__nav-link:hover {
  color: #E0007A; /* Vibrant magenta */
  text-shadow: 0 0 8px rgba(224, 0, 122, 0.4);
}
```

**Visual:**
- Default: Warm grey text
- Hover: Magenta with subtle glow

---

## Light Mode Mobile Menu (CORRECT STATE)

### Background
```css
:root:not(.dark) .mobile-menu {
  background: linear-gradient(
    135deg,
    rgba(255, 251, 254, 0.98) 0%,
    rgba(255, 245, 252, 0.98) 100%
  );
  backdrop-filter: blur(20px);
  box-shadow: 0 4px 16px rgba(224, 0, 122, 0.15);
}
```

**Visual:**
- Soft pink gradient background
- Stronger blur effect
- Pink-tinted shadow

### Navigation Links
```css
:root:not(.dark) .mobile-menu__link {
  color: #2A1A2A; /* Deep charcoal */
  border-bottom: 1px solid #FFD0EE;
}

:root:not(.dark) .mobile-menu__link:hover {
  color: #E0007A; /* Vibrant magenta */
  background: linear-gradient(90deg, #FFE8F7 0%, transparent 100%);
}
```

**Visual:**
- Text: Deep charcoal for readability
- Hover: Magenta text with pink gradient background

---

## Key Differences Summary

| Element | Dark Mode | Light Mode |
|---|---|---|
| **Header BG** | Atomic black (95% opacity) | Pink gradient (nearly white) |
| **Header Border** | Neon pink glow | Solid pink |
| **Logo Color** | Neon yellow (animated) | Vibrant magenta (static) |
| **Nav Links** | Warm white | Warm grey |
| **Nav Hover** | Neon pink (#FF10F0) | Vibrant magenta (#E0007A) |
| **Mobile Menu BG** | Atomic black + radial glow | Pink gradient |
| **Mobile Links** | Warm white | Deep charcoal |

---

## Common Issues to Check

### Issue 1: Light mode styles showing in dark mode
**Symptom:** Pink gradients visible when in dark mode  
**Cause:** `body:not(.dark)` selectors matching when they shouldn't  
**Fix:** ✅ FIXED - All `body:not(.dark)` selectors removed

### Issue 2: Dark mode neon colors not bright enough
**Symptom:** Colors look muted or desaturated  
**Cause:** Light mode color variables bleeding through  
**Fix:** ✅ FIXED - Variable block properly scoped to `:root:not(.dark)`

### Issue 3: Logo animation not working
**Symptom:** Logo is static yellow instead of pulsing  
**Cause:** `prefers-reduced-motion` enabled or animation disabled  
**Fix:** Check user's OS/browser motion settings

### Issue 4: Border color wrong
**Symptom:** Grey border instead of neon pink glow  
**Cause:** Light mode border overriding dark mode  
**Fix:** ✅ FIXED - Selectors properly scoped

---

## Testing Checklist

### Dark Mode Header
- [ ] Background is atomic black (not pink gradient)
- [ ] Border has neon pink glow
- [ ] Logo is neon yellow and animating (if motion not reduced)
- [ ] Nav links are warm white
- [ ] Nav links turn neon pink on hover

### Dark Mode Mobile Menu
- [ ] Background is solid black with subtle radial glow
- [ ] Links are warm white
- [ ] Links turn neon pink on hover
- [ ] Border dividers have pink glow

### Light Mode Header
- [ ] Background is soft pink gradient
- [ ] Border is solid pink
- [ ] Logo is vibrant magenta (not animated)
- [ ] Nav links are warm grey
- [ ] Nav links turn magenta on hover

### Light Mode Mobile Menu
- [ ] Background is pink gradient
- [ ] Links are deep charcoal
- [ ] Links turn magenta on hover
- [ ] No dark mode colors visible

---

**Files Controlling These Styles:**
1. `/styles/themes/dark.css` - Base dark mode styles
2. `/styles/blocks/book-dark-mode.css` - Dark mode overrides with `!important`
3. `/styles/themes/light.css` - Light mode styles (`:root:not(.dark)` scoped)
4. `/styles/blocks/header.css` - Base header layout
5. `/styles/blocks/mobile-menu.css` - Base mobile menu layout
