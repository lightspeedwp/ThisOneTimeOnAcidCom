# Dark Mode Verification Steps

**Test URL:** `/book-home` (or wherever BookHomePage is routed)

---

## ✅ Visual Verification Checklist

### **1. Toggle to Dark Mode**
- [ ] Click the theme toggle (moon icon in header)
- [ ] Page should switch to dark mode

### **2. Check Hero Section**
- [ ] Background: **Black (#0F0F0F)**
- [ ] "First book by Ash Shaw" eyebrow: **Neon yellow**
- [ ] Main heading "This one time on acid...": **Neon pink**
- [ ] Body text: **Light cream (#F6F2EB)**
- [ ] Book cover visual: **Pink/magenta gradient**

### **3. Check First Dark Section ("What it is")**
- [ ] Background: **Dark gray (#171722)**
- [ ] Eyebrow "What it is": **Neon pink/yellow**
- [ ] Heading: **White (#FFFFFF)**
- [ ] Body text: **Light cream (#CFC7BB)**

### **4. Check First Light Section ("Why care")**
- [ ] Background: **Light gray (#F0F0F0)** ← CRITICAL!
- [ ] Eyebrow "Why care": **Neon pink (#FF10F0)**
- [ ] Heading: **Dark (#1a1a1a)**
- [ ] Body text: **Medium gray (#4a4a4a)**

### **5. Check Second Dark Section (4-Card Grid)**
- [ ] Background: **Dark gray (#171722)**
- [ ] 4 cards visible: Stories, Lessons, Energy, Permission
- [ ] Card background: **Semi-transparent black (rgba(15,15,15,0.8))**
- [ ] Card borders: **Pink (rgba(255,16,240,0.3))**
- [ ] Card headings: **White**
- [ ] Card text: **Light semi-transparent white**
- [ ] **Hover a card:**
  - [ ] Border turns bright pink (#FF10F0)
  - [ ] Pink + yellow glow appears
  - [ ] Card lifts up (translateY)

### **6. Check Second Light Section ("Why Ash")**
- [ ] Background: **Light gray (#F0F0F0)** ← CRITICAL!
- [ ] Tags: **White background, light gray border**
- [ ] Tag text: **Dark (#1a1a1a)**

### **7. Check Third Dark Section (Locked Content)**
- [ ] Background: **Dark gray (#171722)**
- [ ] Locked content box: **Gradient with pink border**
- [ ] Nested card: **Dark with pink border**

### **8. Check Third Light Section ("Beyond the page")**
- [ ] Background: **Light gray (#F0F0F0)** ← CRITICAL!
- [ ] Buttons: **Neon pink gradient** (should work on both light and dark)

### **9. Check Fourth Dark Section (Journal)**
- [ ] Background: **Dark gray (#171722)**
- [ ] 3 cards: Essay (yellow tag), Video (green tag), Podcast (pink tag)
- [ ] All cards have dark backgrounds with pink borders

### **10. Check Final Light Section (CTA)**
- [ ] Background: **Light gray (#F0F0F0)** ← CRITICAL!
- [ ] Heading with `.text-neon-pink` class: **Neon pink (#FF10F0)**
- [ ] Buttons visible and working

---

## 🐛 Common Issues & Fixes

### **Issue: Light sections still look transparent or inherit dark background**

**Cause:** Browser cache  
**Fix:** Hard refresh (`Ctrl+Shift+R` or `Cmd+Shift+R`)

### **Issue: Light sections are white instead of light gray**

**Cause:** Wrong color variable  
**Fix:** Check `/styles/blocks/book-dark-mode.css` line for `background-color: #F0F0F0`

### **Issue: Text is wrong color on light sections**

**Cause:** Missing text color overrides  
**Fix:** Check `.dark .section:not(.section--dark) h1, h2, h3...` rules

### **Issue: Cards on dark sections have no pink borders**

**Cause:** Missing card rules  
**Fix:** Check `.dark .section--dark .card` rules

---

## 🔍 DevTools Verification

### **Check Computed Styles (Light Section)**

1. Open DevTools (F12)
2. Inspect any `.section` element (NOT `.section--dark`)
3. Go to "Computed" tab
4. Find `background-color`
5. Should show: **`rgb(240, 240, 240)`** (#F0F0F0)

### **Check Computed Styles (Dark Section)**

1. Inspect any `.section.section--dark` element
2. Go to "Computed" tab
3. Find `background-color`
4. Should show: **`rgb(23, 23, 34)`** (#171722)

### **Check CSS Source**

1. Go to "Sources" tab in DevTools
2. Find `/styles/blocks/book-dark-mode.css`
3. Verify rules exist:
   ```css
   .dark .section:not(.section--dark) {
     background-color: #F0F0F0 !important;
   }
   ```

---

## ✅ Success Criteria

**Dark mode is working correctly if:**

1. ✅ Light sections have **visible light gray** (#F0F0F0) backgrounds
2. ✅ Dark sections have **dark gray** (#171722) backgrounds
3. ✅ Text is **dark** on light sections, **light** on dark sections
4. ✅ Cards on dark sections have **pink borders** and **glow on hover**
5. ✅ Alternating pattern is visually clear
6. ✅ No "all black" or "all white" appearance
7. ✅ Matches Figma design screenshot

---

## 📸 Screenshot Comparison

**Before Fix:**
```
All sections black or transparent
No visual separation
Text hard to read
Broken appearance
```

**After Fix:**
```
┌─────────────────┐
│ Black (hero)    │
├─────────────────┤
│ Dark gray       │
├─────────────────┤
│ Light gray ✨   │ ← Now visible!
├─────────────────┤
│ Dark gray       │
├─────────────────┤
│ Light gray ✨   │ ← Now visible!
├─────────────────┤
│ Dark gray       │
├─────────────────┤
│ Light gray ✨   │ ← Now visible!
└─────────────────┘
```

---

## 🚀 Final Test

**Complete walkthrough:**

1. Load book homepage in light mode → Everything looks normal
2. Toggle to dark mode → See alternating light gray (#F0F0F0) and dark gray (#171722) sections
3. Hover over cards in dark sections → See pink glow effects
4. Check text readability on both section types → All text clearly visible
5. Toggle back to light mode → Everything returns to normal

**If all checks pass:** ✅ **DEPLOYMENT APPROVED**

---

**Last Updated:** March 12, 2026  
**File:** `/reports/book-dark-mode-final-fix/verification-steps.md`
