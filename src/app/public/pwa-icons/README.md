# PWA Icons Directory

This directory contains all Progressive Web App icons for the Ash Shaw Makeup Portfolio.

## 📋 Required Icons

The following icon sizes are required for full PWA support:

| Size | Filename | Purpose |
|------|----------|---------|
| 72x72 | `icon-72x72.png` | Android devices, small screens |
| 96x96 | `icon-96x96.png` | Android devices, medium screens |
| 128x128 | `icon-128x128.png` | Chrome Web Store, desktop |
| 144x144 | `icon-144x144.png` | Microsoft tiles, Windows |
| 152x152 | `icon-152x152.png` | iOS, iPad |
| 192x192 | `icon-192x192.png` | **Required** - Android home screen |
| 384x384 | `icon-384x384.png` | High-DPI displays |
| 512x512 | `icon-512x512.png` | **Required** - Splash screens |

## 🎨 Icon Design Guidelines

### Brand Colors
- Background: `#0F0F0F` (Atomic Black)
- Primary: `#BE00FE` (Neon Purple)
- Secondary: `#FF0055` (Neon Pink)
- Accent: `#0099FF` (Neon Blue)

### Design Requirements
- **Logo:** Ash Shaw logo/brand mark centered
- **Padding:** 10% safe zone around edges
- **Background:** Solid atomic black (#0F0F0F)
- **Format:** PNG with transparency support
- **Color Space:** sRGB

### Maskable Icons
Icons with sizes 192x192 and 512x512 should be "maskable" - meaning they have extra padding to account for device-specific icon shapes.

**Safe zone:** 40% of icon size  
**Example:** For 512x512, logo should be centered in 307x307 area

## 🛠️ How to Generate Icons

### Option 1: Automated Tool (Recommended)

Using [PWA Asset Generator](https://github.com/onderceylan/pwa-asset-generator):

```bash
# Install globally
npm install -g pwa-asset-generator

# Generate all icons from your logo
pwa-asset-generator logo.svg ./public/pwa-icons \
  --icon-only \
  --background "#0F0F0F" \
  --padding "10%" \
  --opaque false \
  --manifest ./public/manifest.json
```

### Option 2: Manual Creation

1. Create base icon at 512x512
2. Export at all required sizes
3. Ensure consistent padding
4. Save as optimized PNGs

**Tools:**
- Adobe Illustrator / Photoshop
- Figma / Sketch
- GIMP (free)
- Inkscape (free)

### Option 3: Online Generator

Use [RealFaviconGenerator](https://realfavicongenerator.net/):

1. Upload your logo
2. Customize colors and padding
3. Download generated icon pack
4. Move files to this directory

## 🖼️ Example Icon Structure

```
logo.svg (source file)
  ↓
icon-72x72.png    (72x72 px, 10% padding)
icon-96x96.png    (96x96 px, 10% padding)
icon-128x128.png  (128x128 px, 10% padding)
icon-144x144.png  (144x144 px, 10% padding)
icon-152x152.png  (152x152 px, 10% padding)
icon-192x192.png  (192x192 px, 40% safe zone - maskable)
icon-384x384.png  (384x384 px, 10% padding)
icon-512x512.png  (512x512 px, 40% safe zone - maskable)
```

## ✅ Icon Checklist

Before deployment, verify:

- [ ] All 8 icon sizes generated
- [ ] Icons use atomic black background
- [ ] Logo is centered and visible
- [ ] 10% padding on standard icons
- [ ] 40% safe zone on maskable icons
- [ ] PNGs are optimized (<50KB each)
- [ ] Icons display correctly in manifest
- [ ] Test on iOS (Add to Home Screen)
- [ ] Test on Android (Install prompt)
- [ ] Test on desktop (Install button)

## 🧪 Testing

### Test in DevTools
1. Open Chrome DevTools
2. Go to Application > Manifest
3. Check "Icons" section
4. Verify all icons load
5. Click "Add to home screen" to test

### Test on Devices

**iOS (Safari):**
1. Open site in Safari
2. Tap Share → Add to Home Screen
3. Verify icon appears correctly

**Android (Chrome):**
1. Open site in Chrome
2. Tap menu → Add to home screen
3. Verify icon appears correctly

**Desktop (Chrome/Edge):**
1. Look for install icon in address bar
2. Click "Install"
3. Verify app icon in taskbar/dock

## 🎯 Icon Purpose by Size

| Size | Primary Use |
|------|-------------|
| 72x72 | Low-res Android, legacy devices |
| 96x96 | Standard Android, Chrome OS |
| 128x128 | Desktop web app, Chrome Web Store |
| 144x144 | Microsoft Windows tiles |
| 152x152 | iOS devices, Apple ecosystem |
| 192x192 | **Main Android home screen icon** |
| 384x384 | High-DPI displays, 2x scaling |
| 512x512 | **Splash screens, app stores** |

## 📏 Dimensions Reference

### Standard Icons (10% padding)
```
72x72:   Logo area = 58x58 (center)
96x96:   Logo area = 77x77 (center)
128x128: Logo area = 102x102 (center)
144x144: Logo area = 115x115 (center)
152x152: Logo area = 122x122 (center)
384x384: Logo area = 307x307 (center)
```

### Maskable Icons (40% safe zone)
```
192x192: Safe area = 115x115 (center)
512x512: Safe area = 307x307 (center)
```

## 🔗 Related Files

- **Manifest:** `/public/manifest.json` - References these icons
- **HTML:** `/index.html` - Links to manifest and Apple icons
- **Service Worker:** `/public/service-worker.js` - Caches icons

## 📝 Notes

- Icons are NOT tracked in git (add to .gitignore)
- Generate fresh icons before each deployment
- Use consistent branding across all sizes
- Test on real devices before launch
- Keep source logo.svg for regeneration

---

**Need Help?**
- [PWA Icon Requirements](https://web.dev/add-manifest/)
- [Maskable Icons](https://web.dev/maskable-icon/)
- [Icon Generator Tools](https://www.pwabuilder.com/)

**Last Updated:** February 5, 2025
