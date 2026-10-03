# 🎨 Dark Mode Theme Customization Guide

Learn how to customize the dark mode theme while maintaining accessibility and visual consistency.

**Version:** 2.0.0 | **Last Updated:** March 11, 2026

---

## 📋 Table of Contents

1. [Color Customization](#color-customization)
2. [Typography Customization](#typography-customization)
3. [Spacing & Sizing](#spacing--sizing)
4. [Glow Effects](#glow-effects)
5. [Animation Speed](#animation-speed)
6. [Brand Adaptation](#brand-adaptation)
7. [Component Overrides](#component-overrides)
8. [Custom Themes](#custom-themes)

---

## 🎨 Color Customization

### Changing Primary Accent Color

**Default:** Neon Pink (`#FF3AAE`)

```css
/* In your custom CSS file (after theme imports) */
:root.dark {
  /* Override primary accent */
  --color-neon-pink: #00FF85; /* Now using green */
  
  /* Update gradient to match */
  --gradient-primary: linear-gradient(
    135deg,
    #00FF85 0%,    /* New primary */
    #8A63FF 50%,   /* Keep violet */
    #00D4FF 100%   /* Keep cyan */
  );
}

/* Update button primary */
.button--primary {
  background: linear-gradient(135deg, #00FF85 0%, #8A63FF 100%);
}

.button--primary:hover {
  box-shadow: 0 0 30px rgba(0, 255, 133, 0.6); /* Green glow */
}
```

**Accessibility Note:** Always verify your new color maintains **4.5:1 contrast minimum** against `#0F0F0F` background.

### Creating a Custom Color Palette

```css
:root.dark {
  /* Your Brand Colors */
  --brand-electric: #00FFFF;      /* Bright cyan */
  --brand-magenta: #FF00FF;       /* Bright magenta */
  --brand-lime: #CCFF00;          /* Electric lime */
  
  /* Apply to components */
  --color-neon-pink: var(--brand-electric);
  --color-neon-yellow: var(--brand-lime);
  --color-neon-violet: var(--brand-magenta);
}

/* Update interactive elements */
.button--primary {
  background: linear-gradient(
    135deg,
    var(--brand-electric) 0%,
    var(--brand-magenta) 100%
  );
}

.card:hover {
  border-color: var(--brand-electric);
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
}
```

### Surface Color Adjustments

**Make backgrounds lighter or darker:**

```css
:root.dark {
  /* Lighter variant (less intense) */
  --color-atomic-black: #1A1A1A;  /* Was #0F0F0F */
  --color-dark-charcoal: #242424;  /* Was #1A1A1A */
  
  /* OR darker variant (more intense) */
  --color-atomic-black: #080808;   /* Darker */
  --color-dark-charcoal: #121212;  /* Darker */
}
```

**Accessibility Warning:** Darker backgrounds require brighter text colors to maintain contrast ratios.

---

## ✍️ Typography Customization

### Changing Font Families

```css
:root.dark {
  /* Replace default fonts */
  --font-heading: 'Orbitron', 'Space Grotesk', sans-serif;
  --font-body: 'Roboto', 'Inter', sans-serif;
  --font-mono: 'Fira Code', 'Courier New', monospace;
}

/* Apply custom fonts */
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
}

body, p, li, td {
  font-family: var(--font-body);
}

code, pre {
  font-family: var(--font-mono);
}
```

### Adjusting Font Sizes

```css
:root.dark {
  /* Scale all sizes up by 1.2x */
  --font-size-xs: 0.84rem;    /* Was 0.7rem */
  --font-size-sm: 1.05rem;    /* Was 0.875rem */
  --font-size-base: 1.2rem;   /* Was 1rem */
  --font-size-lg: 1.44rem;    /* Was 1.2rem */
  --font-size-xl: 1.8rem;     /* Was 1.5rem */
  --font-size-2xl: 2.4rem;    /* Was 2rem */
  --font-size-3xl: 3rem;      /* Was 2.5rem */
}
```

### Line Height Adjustments

```css
:root.dark {
  /* Tighter line height for compact design */
  --line-height-tight: 1.2;   /* Was 1.25 */
  --line-height-normal: 1.4;  /* Was 1.5 */
  --line-height-relaxed: 1.6; /* Was 1.75 */
  
  /* OR looser for more breathing room */
  --line-height-tight: 1.4;
  --line-height-normal: 1.7;
  --line-height-relaxed: 2.0;
}
```

---

## 📐 Spacing & Sizing

### Custom Spacing Scale

```css
:root.dark {
  /* Compact spacing (mobile-friendly) */
  --space-1: 0.25rem;  /* 4px */
  --space-2: 0.5rem;   /* 8px */
  --space-3: 0.75rem;  /* 12px */
  --space-4: 1rem;     /* 16px */
  --space-6: 1.5rem;   /* 24px */
  --space-8: 2rem;     /* 32px */
  --space-12: 3rem;    /* 48px */
  --space-16: 4rem;    /* 64px */
  
  /* OR generous spacing (desktop-focused) */
  --space-1: 0.5rem;   /* 8px */
  --space-2: 1rem;     /* 16px */
  --space-3: 1.5rem;   /* 24px */
  --space-4: 2rem;     /* 32px */
  --space-6: 3rem;     /* 48px */
  --space-8: 4rem;     /* 64px */
  --space-12: 6rem;    /* 96px */
  --space-16: 8rem;    /* 128px */
}
```

### Border Radius Customization

```css
:root.dark {
  /* Sharp corners (no radius) */
  --radius-sm: 0;
  --radius-md: 0;
  --radius-lg: 0;
  --radius-full: 0;
  
  /* OR super rounded */
  --radius-sm: 8px;
  --radius-md: 16px;
  --radius-lg: 24px;
  --radius-full: 9999px;
}

/* Apply to components */
.card {
  border-radius: var(--radius-lg);
}

.button {
  border-radius: var(--radius-md);
}

.badge {
  border-radius: var(--radius-full);
}
```

---

## ✨ Glow Effects

### Adjusting Glow Intensity

```css
/* Subtle glow (professional) */
.button--primary:hover {
  box-shadow: 0 0 10px rgba(255, 58, 174, 0.3); /* Light glow */
}

/* Medium glow (default) */
.button--primary:hover {
  box-shadow: 0 0 20px rgba(255, 58, 174, 0.5); /* Standard */
}

/* Intense glow (cyberpunk) */
.button--primary:hover {
  box-shadow: 0 0 40px rgba(255, 58, 174, 0.8); /* Strong glow */
}

/* Multiple glow layers (ultra cyberpunk) */
.button--primary:hover {
  box-shadow: 
    0 0 10px rgba(255, 58, 174, 0.8),
    0 0 20px rgba(255, 58, 174, 0.6),
    0 0 40px rgba(255, 58, 174, 0.4),
    0 0 80px rgba(255, 58, 174, 0.2);
}
```

### Custom Glow Colors

```css
/* Create glow mixin for any color */
.glow-cyan {
  box-shadow: 0 0 20px rgba(0, 212, 255, 0.5);
}

.glow-green {
  box-shadow: 0 0 20px rgba(0, 255, 133, 0.5);
}

.glow-yellow {
  box-shadow: 0 0 20px rgba(244, 255, 60, 0.5);
}

/* Apply to elements */
.card--featured {
  border-color: #00D4FF;
  box-shadow: 0 0 20px rgba(0, 212, 255, 0.5);
}
```

### Animated Glow (Pulsing)

```css
@keyframes pulse-glow {
  0%, 100% {
    box-shadow: 0 0 20px rgba(255, 58, 174, 0.5);
  }
  50% {
    box-shadow: 0 0 40px rgba(255, 58, 174, 0.8);
  }
}

.button--primary {
  animation: pulse-glow 2s ease-in-out infinite;
}

/* Disable for users who prefer reduced motion */
@media (prefers-reduced-motion: reduce) {
  .button--primary {
    animation: none;
  }
}
```

---

## ⏱️ Animation Speed

### Global Animation Duration

```css
:root.dark {
  /* Fast animations (snappy) */
  --duration-fast: 100ms;
  --duration-normal: 200ms;
  --duration-slow: 300ms;
  
  /* OR slow animations (smooth) */
  --duration-fast: 200ms;
  --duration-normal: 400ms;
  --duration-slow: 600ms;
}

/* Apply to transitions */
.button {
  transition: all var(--duration-normal) ease;
}

.modal {
  transition: opacity var(--duration-slow) ease;
}
```

### Easing Functions

```css
:root.dark {
  /* Custom easing curves */
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.button:hover {
  transition: transform 300ms var(--ease-bounce);
}
```

---

## 🏢 Brand Adaptation

### Example: Corporate Blue Theme

```css
:root.dark {
  /* Corporate color palette */
  --brand-navy: #0A2463;
  --brand-blue: #3E92CC;
  --brand-cyan: #0AAEFF;
  --brand-white: #FFFFFF;
  
  /* Map to theme variables */
  --color-atomic-black: #0A1628;
  --color-dark-charcoal: #162542;
  --color-neon-pink: var(--brand-cyan);
  --color-neon-violet: var(--brand-blue);
  
  /* Update gradients */
  --gradient-primary: linear-gradient(
    135deg,
    var(--brand-blue) 0%,
    var(--brand-cyan) 100%
  );
}

/* Update component styles */
.button--primary {
  background: var(--gradient-primary);
}

.button--primary:hover {
  box-shadow: 0 0 20px rgba(14, 174, 255, 0.5);
}
```

### Example: Eco Green Theme

```css
:root.dark {
  /* Eco-friendly palette */
  --brand-forest: #0D3B2E;
  --brand-green: #2ECC71;
  --brand-lime: #A8E063;
  --brand-mint: #56F89A;
  
  /* Apply to theme */
  --color-atomic-black: #0A2818;
  --color-dark-charcoal: #153828;
  --color-neon-pink: var(--brand-green);
  --color-neon-yellow: var(--brand-lime);
  --color-neon-violet: var(--brand-mint);
}
```

### Example: Sunset Orange Theme

```css
:root.dark {
  /* Warm sunset palette */
  --brand-orange: #FF6B35;
  --brand-coral: #FF8C61;
  --brand-yellow: #FFB347;
  --brand-pink: #FF6FB5;
  
  /* Apply to theme */
  --color-neon-pink: var(--brand-pink);
  --color-neon-yellow: var(--brand-yellow);
  --color-neon-orange: var(--brand-orange);
  
  /* Warm gradient */
  --gradient-primary: linear-gradient(
    135deg,
    var(--brand-orange) 0%,
    var(--brand-pink) 100%
  );
}
```

---

## 🔧 Component Overrides

### Custom Button Styles

```css
/* Add new button variant */
.button--gradient-rainbow {
  background: linear-gradient(
    135deg,
    #FF3AAE 0%,
    #F4FF3C 25%,
    #00FF85 50%,
    #00D4FF 75%,
    #8A63FF 100%
  );
  background-size: 200% 200%;
  animation: gradient-shift 3s ease infinite;
}

@keyframes gradient-shift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* Larger button size */
.button--xl {
  padding: 1.5rem 3rem;
  font-size: 1.5rem;
}

/* Icon-only button */
.button--icon {
  width: 3rem;
  height: 3rem;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}
```

### Custom Card Styles

```css
/* Glassmorphism card */
.card--glass {
  background: rgba(26, 26, 26, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 58, 174, 0.3);
}

/* Holographic card */
.card--holo {
  background: linear-gradient(
    135deg,
    rgba(255, 58, 174, 0.1) 0%,
    rgba(138, 99, 255, 0.1) 50%,
    rgba(0, 212, 255, 0.1) 100%
  );
  border: 2px solid transparent;
  background-clip: padding-box;
  position: relative;
}

.card--holo::before {
  content: "";
  position: absolute;
  inset: -2px;
  background: linear-gradient(
    135deg,
    #FF3AAE 0%,
    #8A63FF 50%,
    #00D4FF 100%
  );
  border-radius: inherit;
  z-index: -1;
}
```

### Custom Form Elements

```css
/* Neon underline input */
.form__input--underline {
  background: transparent;
  border: none;
  border-bottom: 2px solid #333333;
  border-radius: 0;
  padding: 0.5rem 0;
}

.form__input--underline:focus {
  border-bottom-color: #FF3AAE;
  box-shadow: 0 2px 0 0 rgba(255, 58, 174, 0.5);
}

/* Pill-shaped input */
.form__input--pill {
  border-radius: 9999px;
  padding: 0.75rem 1.5rem;
}

/* Floating label input */
.form__group--floating {
  position: relative;
  padding-top: 1rem;
}

.form__group--floating .form__label {
  position: absolute;
  top: 1.5rem;
  left: 1rem;
  transition: all 200ms ease;
  pointer-events: none;
}

.form__group--floating .form__input:focus + .form__label,
.form__group--floating .form__input:not(:placeholder-shown) + .form__label {
  top: 0.25rem;
  font-size: 0.75rem;
  color: #FF3AAE;
}
```

---

## 🎨 Custom Themes

### Creating a Theme Switcher

```typescript
// Multi-theme support
type Theme = 'dark' | 'cyberpunk' | 'corporate' | 'eco';

function applyTheme(theme: Theme) {
  var html = document.documentElement;
  
  // Remove all theme classes
  html.classList.remove('dark', 'theme-cyberpunk', 'theme-corporate', 'theme-eco');
  
  // Apply selected theme
  if (theme === 'dark') {
    html.classList.add('dark');
  } else {
    html.classList.add('dark', 'theme-' + theme);
  }
  
  // Save preference
  localStorage.setItem('theme', theme);
}

// Usage
applyTheme('cyberpunk');
```

### Cyberpunk Theme Variant

```css
/* Cyberpunk: Ultra-bright neon, animated glows */
:root.dark.theme-cyberpunk {
  --color-neon-pink: #FF0080;
  --color-neon-yellow: #FFFF00;
  --color-neon-violet: #9D00FF;
  --color-neon-cyan: #00FFFF;
}

.theme-cyberpunk .button--primary {
  animation: pulse-glow 2s ease-in-out infinite;
}

.theme-cyberpunk .card {
  border: 2px solid #FF0080;
  box-shadow: 
    0 0 10px rgba(255, 0, 128, 0.5),
    0 0 20px rgba(255, 0, 128, 0.3);
}
```

### Corporate Theme Variant

```css
/* Corporate: Professional blue tones, subtle effects */
:root.dark.theme-corporate {
  --color-atomic-black: #0A1628;
  --color-dark-charcoal: #162542;
  --color-neon-pink: #0AAEFF;
  --color-neon-violet: #3E92CC;
}

.theme-corporate .button--primary {
  background: linear-gradient(135deg, #3E92CC 0%, #0AAEFF 100%);
  box-shadow: none; /* No glow in corporate theme */
}

.theme-corporate .card:hover {
  border-color: #0AAEFF;
  box-shadow: 0 4px 12px rgba(10, 174, 255, 0.2); /* Subtle shadow */
}
```

### Eco Theme Variant

```css
/* Eco: Green tones, natural feel */
:root.dark.theme-eco {
  --color-atomic-black: #0A2818;
  --color-dark-charcoal: #153828;
  --color-neon-pink: #2ECC71;
  --color-neon-yellow: #A8E063;
  --color-neon-violet: #56F89A;
}

.theme-eco .button--primary {
  background: linear-gradient(135deg, #2ECC71 0%, #56F89A 100%);
}

.theme-eco .card {
  border-color: #2ECC71;
}
```

---

## 🔬 Testing Your Customizations

### Contrast Ratio Verification

```javascript
// Check contrast ratio between two colors
function getContrastRatio(color1, color2) {
  var lum1 = getLuminance(color1);
  var lum2 = getLuminance(color2);
  
  var lighter = Math.max(lum1, lum2);
  var darker = Math.min(lum1, lum2);
  
  return (lighter + 0.05) / (darker + 0.05);
}

function getLuminance(hex) {
  var rgb = hexToRgb(hex);
  var r = rgb.r / 255;
  var g = rgb.g / 255;
  var b = rgb.b / 255;
  
  r = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
  g = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
  b = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);
  
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

// Usage
var ratio = getContrastRatio('#FF3AAE', '#0F0F0F');
console.log('Contrast ratio:', ratio.toFixed(2) + ':1');

// WCAG AA requires 4.5:1 for normal text
// WCAG AAA requires 7:1 for normal text
```

### Visual Regression Testing

```javascript
// Test all components with new theme
var components = [
  '.button--primary',
  '.card',
  '.form__input',
  '.alert--success',
  // ... all 54 components
];

components.forEach(function(selector) {
  var element = document.querySelector(selector);
  if (element != null) {
    var styles = window.getComputedStyle(element);
    console.log(selector + ':', {
      background: styles.backgroundColor,
      color: styles.color,
      border: styles.borderColor,
    });
  }
});
```

---

## 📝 Best Practices

### Do's ✅

- ✅ **Always test contrast ratios** — Use WebAIM Contrast Checker
- ✅ **Maintain consistency** — Use CSS variables for all colors
- ✅ **Test in multiple browsers** — Chrome, Firefox, Safari, Edge
- ✅ **Verify keyboard navigation** — All interactions must work
- ✅ **Support reduced motion** — Respect user preferences
- ✅ **Document your changes** — Keep a customization log

### Don'ts ❌

- ❌ **Don't hardcode colors** — Always use CSS variables
- ❌ **Don't skip contrast testing** — Accessibility is critical
- ❌ **Don't remove focus indicators** — Required for keyboard users
- ❌ **Don't override semantic HTML** — Maintain accessibility
- ❌ **Don't forget mobile testing** — Test all breakpoints
- ❌ **Don't add animations without fallbacks** — Support reduced motion

---

## 🛠️ Customization Workflow

### Step-by-Step Process

**1. Define Your Brand Colors**
```css
:root.dark {
  --brand-primary: #YOUR_COLOR;
  --brand-secondary: #YOUR_COLOR;
  --brand-accent: #YOUR_COLOR;
}
```

**2. Map to Theme Variables**
```css
:root.dark {
  --color-neon-pink: var(--brand-primary);
  --color-neon-violet: var(--brand-secondary);
}
```

**3. Test Contrast Ratios**
- Use WebAIM Contrast Checker
- Verify 4.5:1 minimum for all text
- Adjust if needed

**4. Update Components**
```css
.button--primary {
  background: linear-gradient(
    135deg,
    var(--brand-primary) 0%,
    var(--brand-secondary) 100%
  );
}
```

**5. Test Thoroughly**
- Visual inspection
- Keyboard navigation
- Screen reader
- Multiple browsers
- Mobile devices

**6. Document Changes**
```markdown
## Theme Customizations

- Changed primary color from #FF3AAE to #YOUR_COLOR
- Updated button gradient
- Modified card hover effects
- Tested contrast: 7.2:1 (WCAG AAA ✅)
```

---

## 📚 Additional Resources

- **Contrast Checker:** https://webaim.org/resources/contrastchecker/
- **Color Palette Generator:** https://coolors.co/
- **Gradient Generator:** https://cssgradient.io/
- **Accessibility Guidelines:** https://www.w3.org/WAI/WCAG22/quickref/

---

**Last Updated:** March 11, 2026  
**Version:** 2.0.0  
**Customization Level:** Advanced
