# ⚡ Dark Mode v2.0.0 — 10-Minute Quick Start

**Get dark mode working in 10 minutes or less.**

**Version:** 2.0.0  
**Difficulty:** Beginner  
**Time Required:** 10 minutes

---

## 🎯 What You'll Accomplish

By the end of this guide, you'll have:
- ✅ Dark mode activated on your site
- ✅ All 54 components styled with neon glow effects
- ✅ 100% WCAG AA accessibility compliance
- ✅ Working theme toggle button

**Let's get started!**

---

## ✅ Step 1: Verify Files Exist (1 minute)

**Check that these files are in your project:**

```
/styles/themes/
├── dark.css                 ← Core theme (1,047 lines)
└── dark-extended.css        ← Extended components (1,000 lines)
```

**Quick test:**
```bash
# In your project root, run:
ls -la styles/themes/dark.css
ls -la styles/themes/dark-extended.css
```

**Expected output:**
```
-rw-r--r--  1 user  staff  28672 Mar 11 dark.css
-rw-r--r--  1 user  staff  23552 Mar 11 dark-extended.css
```

✅ **Files exist?** Continue to Step 2.  
❌ **Files missing?** See troubleshooting at bottom.

---

## ✅ Step 2: Import CSS Files (2 minutes)

**Open `/styles/globals.css` and verify these imports:**

```css
/* Should already be present: */
@import "tailwindcss";
@import "./themes/light.css";
@import "./themes/dark.css";              /* ← Core dark mode */
@import "./themes/dark-extended.css";     /* ← Extended components */
```

**✨ Good news:** These imports are already in place! No action needed.

**Verify in browser:**
1. Start your dev server: `npm run dev`
2. Open browser DevTools → Network tab
3. Reload page
4. Search for "dark.css" and "dark-extended.css"
5. Both files should load with status 200

✅ **Files loading?** Continue to Step 3.  
❌ **404 errors?** Check file paths match exactly.

---

## ✅ Step 3: Activate Dark Mode (30 seconds)

**Open browser DevTools Console and paste:**

```javascript
// Activate dark mode
document.documentElement.classList.add('dark');
```

**Press Enter.**

**What you should see immediately:**
- 🌑 Background changes to atomic black (#0F0F0F)
- ✨ Text changes to cream (#F6F2EB)
- 💖 Interactive elements get pink glow effects
- 🎨 All neon colors activate

**Test it:**
```javascript
// Toggle dark mode on/off
document.documentElement.classList.toggle('dark');
```

✅ **Dark mode working?** Continue to Step 4.  
❌ **No change?** See troubleshooting at bottom.

---

## ✅ Step 4: Test Component Rendering (3 minutes)

**Open your app and check these components:**

**Navigation:**
- [ ] Header has dark charcoal background (#1A1A1A)
- [ ] Logo is visible
- [ ] Nav links are cream color
- [ ] Hover over link → pink glow appears

**Cards:**
- [ ] Card background is dark charcoal
- [ ] Card border is #333333
- [ ] Hover over card → pink border glow

**Buttons:**
- [ ] Primary button has pink→violet→cyan gradient
- [ ] Hover over button → glow intensifies
- [ ] Button text is white

**Forms:**
- [ ] Input fields have dark background
- [ ] Focus on input → pink border glow
- [ ] Placeholder text is muted gray

✅ **All working?** Continue to Step 5.  
❌ **Some not styled?** Component might not be using BEM classes (see docs).

---

## ✅ Step 5: Add Theme Toggle Button (2 minutes)

**Quick version — Add to your header:**

```typescript
// In your Header component
import React from 'react';

function ThemeToggle() {
  var [isDark, setIsDark] = React.useState(
    document.documentElement.classList.contains('dark')
  );

  function toggleTheme() {
    document.documentElement.classList.toggle('dark');
    setIsDark(!isDark);
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
  }

  return React.createElement(
    'button',
    {
      onClick: toggleTheme,
      className: 'button button--secondary',
      'aria-label': 'Toggle dark mode',
    },
    isDark ? '☀️ Light' : '🌙 Dark'
  );
}
```

**Or use the provided ES5-compliant component:**

```typescript
// Import the pre-built component
import { ThemeToggleES5 } from './components/common/ThemeToggleES5';

// Add to your Header
<ThemeToggleES5 />
```

✅ **Toggle working?** Continue to Step 6.

---

## ✅ Step 6: Verify Accessibility (1 minute)

**Quick accessibility check:**

**Contrast:**
- [ ] Body text is readable (should be 14.8:1 contrast)
- [ ] Headings are bright white
- [ ] Links are visible pink

**Keyboard:**
- [ ] Press Tab → focus indicator visible (3px pink outline)
- [ ] All interactive elements reachable via Tab
- [ ] Press Enter on focused button → activates

**Screen Reader:**
- [ ] All buttons have text or aria-label
- [ ] All images have alt text
- [ ] Headings follow h1 → h2 → h3 order

✅ **Accessibility good?** You're done!

---

## 🎉 Success! Dark Mode is Live

```
╔══════════════════════════════════════════════════╗
║                                                  ║
║   ✅ DARK MODE ACTIVATED                         ║
║                                                  ║
║   • 54 components styled                        ║
║   • 100% WCAG AA compliant                      ║
║   • Theme toggle working                        ║
║   • Ready for production                        ║
║                                                  ║
╚══════════════════════════════════════════════════╝
```

---

## 📚 What's Next?

### Explore Components (10 minutes)

**See all 54 components in action:**
→ `/docs/dark-mode-component-showcase.md`

**Categories:**
- Navigation (5): Header, Breadcrumbs, Pagination, Tabs, Sidebar
- Content (18): Cards, Timeline, Gallery, Lightbox, etc.
- Forms (12): Inputs, Checkboxes, Dropdowns, etc.
- Feedback (10): Toasts, Alerts, Status, etc.
- Layout (9): Modals, Menus, Tables, etc.

### Customize Colors (15 minutes)

**Want to change the neon pink to another color?**
→ `/docs/dark-mode-customization-guide.md`

**Examples:**
- Corporate blue theme
- Eco green theme
- Sunset orange theme

### Build Full Pages (30 minutes)

**Need complete page layouts?**
→ `/docs/dark-mode-composition-patterns.md`

**10 full examples:**
- Dashboard layout
- Blog post page
- Portfolio gallery
- Landing page
- Settings page
- Authentication flow
- E-commerce product page
- User profile
- Content management
- Event detail page

### React Components (45 minutes)

**Using React/TypeScript?**
→ `/docs/dark-mode-react-examples.md`

**25+ production-ready components:**
- Button, Card, Modal, Form, Toast
- Complete with TypeScript types
- ES5-compliant (Figma Make safe)
- Custom hooks included

---

## 🔧 Troubleshooting

### Issue: Dark mode not activating

**Symptom:** Page doesn't change when adding `.dark` class

**Solution 1:** Check CSS imports
```css
/* Verify these are in /styles/globals.css */
@import "./themes/dark.css";
@import "./themes/dark-extended.css";
```

**Solution 2:** Check CSS specificity
```javascript
// Check if variables are accessible
var styles = window.getComputedStyle(document.documentElement);
console.log(styles.getPropertyValue('--color-neon-pink'));
// Should output: #FF3AAE or rgb(255, 58, 174)
```

**Solution 3:** Clear cache and reload
```bash
# Hard reload in browser
# Mac: Cmd + Shift + R
# Windows: Ctrl + Shift + R
```

---

### Issue: Components not styled

**Symptom:** Some components don't have dark mode styling

**Cause:** Component not using BEM class names

**Solution:** Update component to use BEM classes

**Example:**
```typescript
// ❌ WRONG — Using Tailwind utilities
<button className="flex items-center gap-2 px-4 py-2">
  Click me
</button>

// ✅ CORRECT — Using BEM classes
<button className="button button--primary">
  Click me
</button>
```

**Reference:** See `/docs/dark-mode-component-showcase.md` for all BEM class names.

---

### Issue: CSS files not loading

**Symptom:** 404 errors in Network tab for dark.css

**Solution 1:** Check file paths
```bash
# Verify files exist
ls -la styles/themes/dark.css
ls -la styles/themes/dark-extended.css
```

**Solution 2:** Check import paths
```css
/* In /styles/globals.css */
/* Should be relative to globals.css location */
@import "./themes/dark.css";              /* ✅ Correct */
@import "/styles/themes/dark.css";        /* ❌ Wrong */
@import "../themes/dark.css";             /* ❌ Wrong (unless globals.css is in different folder) */
```

**Solution 3:** Restart dev server
```bash
# Stop server (Ctrl+C)
# Start again
npm run dev
```

---

### Issue: Colors look wrong

**Symptom:** Neon colors appear washed out or incorrect

**Solution 1:** Check HTML has `.dark` class
```javascript
console.log(document.documentElement.classList.contains('dark'));
// Should be: true
```

**Solution 2:** Verify CSS variable values
```javascript
var root = document.documentElement;
var styles = window.getComputedStyle(root);

console.log('Pink:', styles.getPropertyValue('--color-neon-pink').trim());
console.log('Black:', styles.getPropertyValue('--color-atomic-black').trim());
console.log('Text:', styles.getPropertyValue('--color-text-light').trim());

// Expected:
// Pink: #FF3AAE or rgb(255, 58, 174)
// Black: #0F0F0F or rgb(15, 15, 15)
// Text: #F6F2EB or rgb(246, 242, 235)
```

**Solution 3:** Check for CSS conflicts
```javascript
// Look for inline styles overriding theme
var element = document.querySelector('.button--primary');
console.log(element.style);
// Should be empty or minimal
```

---

### Issue: Performance is slow

**Symptom:** Page load is slower after adding dark mode

**Solution 1:** Enable gzip compression
```nginx
# Nginx config
gzip on;
gzip_types text/css;
gzip_comp_level 6;
```

**Solution 2:** Minify CSS files
```bash
# Using cssnano (or similar)
npx cssnano styles/themes/dark.css styles/themes/dark.min.css
npx cssnano styles/themes/dark-extended.css styles/themes/dark-extended.min.css

# Update imports to use .min.css
```

**Solution 3:** Load extended components asynchronously
```javascript
// Only load dark-extended.css when needed
function loadExtendedTheme() {
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = '/styles/themes/dark-extended.css';
  document.head.appendChild(link);
}

// Load on scroll or user interaction
window.addEventListener('scroll', loadExtendedTheme, { once: true });
```

---

## 📊 Quick Reference

### Essential BEM Classes

**Buttons:**
```html
<button class="button button--primary">Primary</button>
<button class="button button--secondary">Secondary</button>
<button class="button button--outline">Outline</button>
```

**Cards:**
```html
<div class="card">
  <h3 class="card__title">Title</h3>
  <p class="card__content">Content</p>
</div>
```

**Forms:**
```html
<div class="form__group">
  <label class="form__label">Email</label>
  <input type="email" class="form__input" />
</div>
```

**Alerts:**
```html
<div class="alert alert--success">Success message</div>
<div class="alert alert--warning">Warning message</div>
<div class="alert alert--error">Error message</div>
<div class="alert alert--info">Info message</div>
```

**Complete list:** `/docs/dark-mode-quick-reference.md`

---

### Color Palette Quick Reference

**Neon Accents:**
- Pink: `#FF3AAE` (primary CTA)
- Yellow: `#F4FF3C` (hover/warning)
- Violet: `#8A63FF` (secondary)
- Green: `#00FF85` (success)
- Cyan: `#00D4FF` (info)
- Orange: `#FF7A00` (warning)
- Red: `#FF0055` (error)
- Blue: `#4A90FF` (info alt)

**Surfaces:**
- Atomic Black: `#0F0F0F` (page background)
- Dark Charcoal: `#1A1A1A` (cards/panels)
- Dark Panel: `#171722` (alt panels)
- Hover Gray: `#242424` (hover states)

**Text:**
- Body: `#F6F2EB` (14.8:1 contrast)
- Headings: `#FFFFFF` (21:1 contrast)
- Muted: `#CFC7BB` (10.2:1 contrast)
- Fine Print: `#9C9488` (6.5:1 contrast)

---

### Keyboard Shortcuts

**Navigation:**
- `Tab` — Move focus forward
- `Shift + Tab` — Move focus backward
- `Enter` — Activate button/link
- `Space` — Toggle checkbox/radio
- `Escape` — Close modal/dropdown
- `Arrow Keys` — Navigate lists/tabs

**Focus Indicator:**
- All interactive elements: 3px pink outline with glow
- Visible on keyboard navigation
- Meets WCAG 2.1 Level AA requirements

---

## 🎓 Learning Path

**Beginner (You are here! ✅)**
→ 10-Minute Quick Start (this guide)

**Intermediate (30 minutes)**
→ Complete Usage Guide (`/docs/dark-mode-usage-guide.md`)

**Advanced (2 hours)**
→ Component Showcase + Customization Guide

**Expert (4+ hours)**
→ React Examples + Composition Patterns + Maintenance Guide

---

## 📞 Need Help?

**Common questions:**
→ `/docs/dark-mode-usage-guide.md#troubleshooting`

**All components reference:**
→ `/docs/dark-mode-component-showcase.md`

**React/TypeScript examples:**
→ `/docs/dark-mode-react-examples.md`

**Customization:**
→ `/docs/dark-mode-customization-guide.md`

**Master index:**
→ `/docs/README-dark-mode.md`

---

## ✅ Checklist: You're Ready If...

- [ ] Dark mode activates when you add `.dark` class
- [ ] Background is atomic black (#0F0F0F)
- [ ] Text is cream color (#F6F2EB)
- [ ] Buttons have neon gradient backgrounds
- [ ] Interactive elements have pink glow on hover
- [ ] Theme toggle button works
- [ ] Keyboard navigation shows pink focus indicators
- [ ] All text is readable (high contrast)

**All checked?** 🎉 **You're production ready!**

---

```
╔════════════════════════════════════════════════════════╗
║                                                        ║
║   🎉 CONGRATULATIONS! DARK MODE IS LIVE! 🎉            ║
║                                                        ║
║   You now have:                                        ║
║   ✅ 54 styled components                              ║
║   ✅ 100% WCAG AA accessibility                        ║
║   ✅ Neon glow effects                                 ║
║   ✅ Working theme toggle                              ║
║   ✅ Production-ready system                           ║
║                                                        ║
║   Time to build something amazing! 🚀                  ║
║                                                        ║
╚════════════════════════════════════════════════════════╝
```

---

**Guide Version:** 1.0  
**Last Updated:** March 11, 2026  
**Dark Mode Version:** 2.0.0  
**Estimated Time:** 10 minutes ⚡

**Next Steps:**
- Explore `/docs/dark-mode-component-showcase.md`
- Build pages with `/docs/dark-mode-composition-patterns.md`
- Deploy with `/tasks/dark-mode-implementation-checklist.md`

**🚀 Happy building!**
