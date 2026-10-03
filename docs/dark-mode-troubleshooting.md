---
title: "Dark Mode Troubleshooting Guide"
filename: "/docs/dark-mode-troubleshooting.md"
created: "2026-03-12"
---

# Dark Mode Troubleshooting Guide

**Quick Reference:** How to verify and force dark mode if it's not showing

---

## ✅ **QUICK CHECK**

### 1. Open Browser DevTools Console

Press `F12` or `Cmd+Option+I` (Mac) / `Ctrl+Shift+I` (Windows)

### 2. Run This Command

```javascript
console.log('Dark mode status:', {
  hasClass: document.documentElement.classList.contains('dark'),
  theme: document.documentElement.getAttribute('data-theme'),
  localStorage: localStorage.getItem('theme')
});
```

**Expected Result:**
```
Dark mode status: {
  hasClass: true,
  theme: "dark",
  localStorage: "dark"
}
```

---

## 🔧 **FORCE DARK MODE**

If dark mode isn't showing, run this in the console:

```javascript
// Clear any stored preferences
localStorage.removeItem('theme');

// Set dark mode
localStorage.setItem('theme', 'dark');

// Apply immediately
document.documentElement.classList.add('dark');
document.documentElement.setAttribute('data-theme', 'dark');

// Reload page
location.reload();
```

---

## 🐛 **COMMON ISSUES**

### Issue 1: "Light mode keeps coming back"

**Cause:** localStorage was set to 'light'

**Fix:**
```javascript
localStorage.setItem('theme', 'dark');
location.reload();
```

---

### Issue 2: "I see the .dark class but no neon colors"

**Cause:** CSS file not imported

**Fix:** Check `/styles/globals.css` line 5:
```css
@import "./blocks/book-dark-mode.css";
```

If missing, add it after the theme imports.

---

### Issue 3: "System preference is overriding dark mode"

**Cause:** Old FOUC script checked system preference

**Fix:** Already fixed in `/index.html` — now defaults to dark mode always.

---

## 📊 **VERIFICATION CHECKLIST**

Run these checks in DevTools console:

### 1. Check HTML Class
```javascript
document.documentElement.classList.contains('dark')
// Expected: true
```

### 2. Check Theme Attribute
```javascript
document.documentElement.getAttribute('data-theme')
// Expected: "dark"
```

### 3. Check localStorage
```javascript
localStorage.getItem('theme')
// Expected: "dark"
```

### 4. Check CSS Import
```javascript
// Look for the CSS file in Network tab
// Should see: blocks/book-dark-mode.css
```

### 5. Check CSS Variables
```javascript
getComputedStyle(document.documentElement).getPropertyValue('--wp--preset--color--neon-pink')
// Expected: "#FF3AAE" or similar
```

---

## 🎨 **VISUAL VERIFICATION**

When dark mode is working, you should see:

✅ **Background:** Pure black (#0F0F0F)  
✅ **Text:** White or light gray  
✅ **Accents:** Neon pink (#FF3AAE)  
✅ **Links:** Pink that turns yellow on hover  
✅ **Buttons:** Pink→Yellow gradient  
✅ **Cards:** Dark with pink borders  

If you don't see these, run the "Force Dark Mode" script above.

---

## 🚀 **PERMANENT FIX APPLIED**

The following files have been updated to **always default to dark mode**:

1. ✅ `/index.html` — FOUC script now defaults to dark (line 66-90)
2. ✅ `/components/common/ThemeProvider.tsx` — Defaults to dark (line 37)
3. ✅ `/styles/globals.css` — Dark mode CSS imported (line 5)
4. ✅ `/styles/blocks/book-dark-mode.css` — 600+ lines of neon styling

---

## 📝 **BROWSER CACHE**

If changes aren't showing:

### Clear Cache (Hard Reload)

- **Chrome/Edge:** `Ctrl+Shift+R` (Windows) / `Cmd+Shift+R` (Mac)
- **Firefox:** `Ctrl+F5` (Windows) / `Cmd+Shift+R` (Mac)
- **Safari:** `Cmd+Option+R`

### Clear localStorage

```javascript
localStorage.clear();
location.reload();
```

---

## 🆘 **EMERGENCY RESET**

If nothing works, run this full reset:

```javascript
// Nuclear option - reset everything
localStorage.clear();
sessionStorage.clear();
document.documentElement.className = '';
document.documentElement.classList.add('dark');
document.documentElement.setAttribute('data-theme', 'dark');
localStorage.setItem('theme', 'dark');
window.location.reload(true);
```

---

## 📞 **STILL NOT WORKING?**

Check these files in this order:

1. `/index.html` line 66-90 — FOUC script should default to 'dark'
2. `/styles/globals.css` line 5 — Should import book-dark-mode.css
3. `/components/common/ThemeProvider.tsx` line 37 — Should useState('dark')
4. Browser console for any CSS errors

---

**Last Updated:** March 12, 2026  
**Status:** Dark mode now defaults to ON  
**No user action required** — Dark mode applies automatically
