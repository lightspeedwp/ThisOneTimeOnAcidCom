# Image Display & Loading Troubleshooting Guide

**Version:** 1.0.0  
**Last Updated:** January 2025

Comprehensive troubleshooting guide for image display and loading issues.

---

## 🎯 Quick Problem Identifier

```
┌─────────────────────────────────────┐
│   Images Not Displaying?            │
└──────────────┬──────────────────────┘
               │
               ▼
        ┌──────────────┐
        │ Which images? │
        └──────┬───────┘
               │
       ────────┴────────────────
       │                       │
       ▼                       ▼
  Figma Assets           Unsplash/External
  (Portfolio)                Images
       │                       │
       ▼                       ▼
    Issue 1-3              Issue 4-5
```

---

## 🔍 Diagnostic Flowchart (Mermaid)

### Image Loading Problem Identification

```mermaid
flowchart TD
    A[Image Not Displaying] --> B{Which type?}
    
    B -->|Figma Asset| C{Import error?}
    B -->|Unsplash| D{API error?}
    B -->|External URL| E{Network error?}
    
    C -->|"not exported by"| F[Issue 1: Wrong Import Path]
    C -->|404 Not Found| G[Issue 2: Asset Missing]
    C -->|Loads but wrong| H[Issue 3: Wrong Asset Used]
    
    D -->|401 Unauthorized| I[Issue 4: Unsplash API Key]
    D -->|Rate Limited| J[Issue 5: API Quota]
    
    E -->|CORS Error| K[Issue 6: CORS Blocked]
    E -->|404| L[Issue 7: Broken URL]
    
    F --> M[See Section 1]
    G --> N[See Section 2]
    H --> O[See Section 3]
    I --> P[See Section 4]
    J --> Q[See Section 5]
    K --> R[See Section 6]
    L --> S[See Section 7]
    
    style F fill:#fecaca,stroke:#ef4444,stroke-width:2px
    style G fill:#fecaca,stroke:#ef4444,stroke-width:2px
    style H fill:#fef3c7,stroke:#f59e0b,stroke-width:2px
    style I fill:#fed7aa,stroke:#f97316,stroke-width:2px
    style J fill:#fef3c7,stroke:#f59e0b,stroke-width:2px
```

---

## 🚨 Issue 1: Figma Asset Import Error

### Symptoms
- Console error: "is not exported by 'figma:asset/...'"
- Image shows broken icon
- Build fails with import error

### Error Sequence

```mermaid
sequenceDiagram
    participant C as Component
    participant I as Import System
    participant F as Figma Assets
    
    C->>I: import img from "figma:asset/abc123.png"
    
    I->>F: Look for asset abc123.png
    
    alt Asset Exists
        F-->>I: ✅ Return asset
        I-->>C: Image loaded
        Note over C: Image displays ✅
    else Asset Not Found
        F--xI: ❌ Asset not exported
        I--xC: Build error
        Note over C: "is not exported by<br/>figma:asset/abc123.png"
    else Wrong Path Format
        Note over I: Invalid import syntax
        I--xC: ❌ Syntax error
        Note over C: "../figma:asset/..."<br/>wrong format
    end
```

### Solutions

**Check 1: Import Syntax**

```tsx
// ✅ CORRECT - figma:asset is a virtual module
import heroImg from "figma:asset/abc123.png";

// ❌ WRONG - Don't add path prefixes
import heroImg from "./figma:asset/abc123.png";
import heroImg from "../imports/figma:asset/abc123.png";
import heroImg from "/public/figma:asset/abc123.png";

// figma:asset is NOT a file path - it's a special import scheme!
```

**Check 2: Asset ID**

```tsx
// Asset ID comes from Figma export
// Format: {hash}.{extension}

// ✅ CORRECT examples
import img1 from "figma:asset/76faf8f617b56e6f079c5a7ead8f927f5a5fee32.png";
import img2 from "figma:asset/f2dddff10fce8c5cc0468d3c13d16d6eeadcbdb7.jpg";

// ❌ WRONG - Made up IDs won't work
import img from "figma:asset/hero-image.png";
import img from "figma:asset/portfolio-1.jpg";
```

**Check 3: Check Mock Data**

All Figma assets should be defined in `/data/mock/`:

```tsx
// In /data/mock/portfolio/festivalGallery.ts

export const festivalGallery = [
  {
    id: 'festival-1',
    url: 'figma:asset/76faf8f617b56e6f079c5a7ead8f927f5a5fee32.png',  // ✅
    alt: 'Festival makeup with UV accents'
  },
  // ...
];

// Then import and use:
import { festivalGallery } from '@/data/mock/portfolio/festivalGallery';

function Portfolio() {
  return (
    <ImageGallery images={festivalGallery} />
  );
}
```

**Check 4: Available Assets**

Check which Figma assets exist:

```bash
# Search for all figma:asset imports in codebase
grep -r "figma:asset" data/mock/

# Should show all available assets like:
# figma:asset/76faf8f617b56e6f079c5a7ead8f927f5a5fee32.png
# figma:asset/f2dddff10fce8c5cc0468d3c13d16d6eeadcbdb7.png
# etc.
```

### Quick Fix Checklist

- [ ] Import uses `"figma:asset/..."` (no path prefix)
- [ ] Asset ID is exact hash from Figma export
- [ ] Asset exists in `/data/mock/` files
- [ ] No `./` or `../` before `figma:asset`
- [ ] Check console for exact error message

---

## 🚨 Issue 2: Figma Asset File Missing

### Symptoms
- Import works (no build error)
- But image shows 404 or broken icon
- Works in dev but fails in production

### State Diagram

```mermaid
stateDiagram-v2
    [*] --> ImportStatement: Component imports asset
    
    ImportStatement --> BuildTime: Vite processes import
    
    BuildTime --> AssetExists: Check if asset in bundle
    BuildTime --> AssetMissing: Asset not found
    
    AssetExists --> DevServer: Dev mode
    AssetExists --> ProductionBuild: Build mode
    
    DevServer --> ImageDisplays: ✅ Shows in dev
    
    ProductionBuild --> BundleCheck: Check dist/
    
    BundleCheck --> InBundle: Asset copied
    BundleCheck --> NotInBundle: Asset missing
    
    InBundle --> ImageDisplays: ✅ Shows in prod
    NotInBundle --> BrokenImage: ❌ 404 in prod
    
    AssetMissing --> BrokenImage: ❌ Always fails
    
    note right of AssetMissing
        Asset was deleted
        or never exported
        from Figma
    end note
    
    note right of NotInBundle
        Build process failed
        to include asset
    end note
```

### Solutions

**Check 1: Asset Actually Exists**

The `figma:asset` scheme should be backed by real assets. Check if:

1. Asset was properly exported from Figma
2. Asset is referenced in `/data/mock/` files
3. Build process includes it

**Check 2: Production Build**

```bash
# Build for production
npm run build

# Check if assets are in dist/
ls -la dist/assets/

# Should see image files like:
# abc123.png
# def456.jpg
```

**Check 3: Fallback Images**

Always use `ImageWithFallback` component:

```tsx
// ✅ CORRECT - Fallback for missing images
import { ImageWithFallback } from './components/figma/ImageWithFallback';

<ImageWithFallback
  src="figma:asset/abc123.png"
  alt="Portfolio image"
  fallbackSrc="/placeholder.jpg"  // Shows if figma asset fails
/>

// ❌ WRONG - No fallback
<img src="figma:asset/abc123.png" alt="Portfolio" />
```

**Check 4: Use Mock Data**

```tsx
// ✅ CORRECT - Images from centralized data
import { festivalGallery } from '@/data/mock/portfolio/festivalGallery';

function Gallery() {
  return (
    <div>
      {festivalGallery.map((img) => (
        <img key={img.id} src={img.url} alt={img.alt} />
      ))}
    </div>
  );
}

// ❌ WRONG - Hardcoded, brittle
function Gallery() {
  return (
    <img src="figma:asset/abc123.png" alt="Image" />
  );
}
```

### Quick Fix Checklist

- [ ] Asset exists in Figma export
- [ ] Check `dist/assets/` after build
- [ ] Use `ImageWithFallback` component
- [ ] Import images from `/data/mock/`
- [ ] Test in production build, not just dev

---

## 🚨 Issue 3: Using Wrong Figma Asset

### Symptoms
- Image loads, but shows wrong content
- Portfolio image shows hero photo instead
- Assets mixed up between pages

### Solutions

**Check 1: Mock Data Organization**

```tsx
// ✅ CORRECT - Organized by category
/data/mock/
  images/
    homepageHero.ts      // Homepage images
    aboutHero.ts         // About page images
    portfolioHero.ts     // Portfolio page images
  portfolio/
    festivalGallery.ts   // Festival portfolio
    editorialGallery.ts  // Editorial portfolio
```

**Check 2: Import Correct Data**

```tsx
// ✅ CORRECT - Import right data for right page
import { homepageHero } from '@/data/mock/images/homepageHero';
import { aboutHero } from '@/data/mock/images/aboutHero';

function HomePage() {
  return <Hero images={homepageHero} />;  // ✅ Homepage images
}

function AboutPage() {
  return <Hero images={aboutHero} />;  // ✅ About images
}

// ❌ WRONG - Mixed up imports
function AboutPage() {
  return <Hero images={homepageHero} />;  // ❌ Wrong images!
}
```

**Check 3: Asset Naming**

Assets should have descriptive names in mock data:

```tsx
// ✅ CORRECT - Clear naming
export const festivalGallery = [
  {
    id: 'festival-uv-accents',
    url: 'figma:asset/76faf8f617b56e6f079c5a7ead8f927f5a5fee32.png',
    alt: 'Festival makeup with UV accents and glitter',
    category: 'festival'
  },
  {
    id: 'festival-rainbow-eyeshadow',
    url: 'figma:asset/f2dddff10fce8c5cc0468d3c13d16d6eeadcbdb7.png',
    alt: 'Rainbow eyeshadow with gems',
    category: 'festival'
  }
];

// ❌ WRONG - Generic naming
export const images = [
  { url: 'figma:asset/abc.png', alt: 'Image 1' },  // ❌ Unclear!
  { url: 'figma:asset/def.png', alt: 'Image 2' },
];
```

### Quick Fix Checklist

- [ ] Import data from correct mock file
- [ ] Check `id` and `alt` match expected content
- [ ] Organize assets by page/category
- [ ] Use descriptive names in mock data
- [ ] Verify in browser which asset is loading

---

## 🚨 Issue 4: Unsplash API Issues

### Symptoms
- Unsplash images don't load
- Console error: "Unsplash API error"
- Placeholder images show instead

### Diagnostic Flow

```mermaid
flowchart TD
    A[Request Unsplash Image] --> B{unsplash_tool available?}
    
    B -->|No| C[❌ Tool not configured]
    B -->|Yes| D[Call unsplash_tool]
    
    D --> E{API Response?}
    
    E -->|200 OK| F[✅ Image URL returned]
    E -->|401| G[❌ Invalid API key]
    E -->|403| H[❌ Rate limited]
    E -->|404| I[❌ Query too specific]
    
    F --> J[Display Image]
    
    G --> K[Fix API Key]
    H --> L[Use Cached Results]
    I --> M[Broaden Search Query]
    
    C --> N[Use Figma Assets Instead]
    
    style F fill:#dcfce7,stroke:#22c55e,stroke-width:2px
    style G fill:#fecaca,stroke:#ef4444,stroke-width:2px
    style H fill:#fef3c7,stroke:#f59e0b,stroke-width:2px
    style I fill:#fed7aa,stroke:#f97316,stroke-width:2px
```

### Solutions

**Check 1: Use Figma Assets Instead**

Per guidelines, you should use `unsplash_tool` when creating new images:

```tsx
// ✅ CORRECT - Use existing Figma assets from mock data
import { festivalGallery } from '@/data/mock/portfolio/festivalGallery';

function Portfolio() {
  return <ImageGallery images={festivalGallery} />;
}

// ⚠️ ONLY use unsplash_tool when creating NEW content
// Not for existing portfolio images!
```

**Check 2: Search Query**

If you must use Unsplash, use simple queries:

```tsx
// ✅ CORRECT - Broad, simple queries
const img1 = await unsplash_tool({ query: "makeup artist" });
const img2 = await unsplash_tool({ query: "festival makeup" });
const img3 = await unsplash_tool({ query: "colorful eyeshadow" });

// ❌ WRONG - Too specific
const img = await unsplash_tool({ 
  query: "ash shaw professional festival makeup UV rainbow glitter" 
});
// Unsplash library isn't large enough for this!
```

**Check 3: Fallback**

Always have fallback images:

```tsx
// ✅ CORRECT - Fallback to Figma assets
const getHeroImage = async () => {
  try {
    const url = await unsplash_tool({ query: "makeup" });
    return url;
  } catch (error) {
    console.warn('Unsplash failed, using Figma asset');
    return homepageHero[0].url;  // Fallback to mock data
  }
};
```

### Quick Fix Checklist

- [ ] Prefer Figma assets from `/data/mock/`
- [ ] Only use Unsplash for NEW content
- [ ] Keep search queries simple (2-3 words)
- [ ] Always have fallback to Figma assets
- [ ] Cache Unsplash results to avoid rate limits

---

## 🚨 Issue 5: Image Loading Performance

### Symptoms
- Images load slowly
- Layout shifts as images load
- Poor Lighthouse score

### State Diagram

```mermaid
stateDiagram-v2
    [*] --> PageLoads: User navigates
    
    PageLoads --> ImagesRequested: Request all images
    
    ImagesRequested --> LazyLoad: Check loading strategy
    
    LazyLoad --> EagerLoading: loading="eager"
    LazyLoad --> LazyLoading: loading="lazy"
    
    EagerLoading --> AllAtOnce: Load all immediately
    AllAtOnce --> SlowPageLoad: ⚠️ Poor performance
    
    LazyLoading --> ViewportCheck: Check if in viewport
    
    ViewportCheck --> InViewport: Visible
    ViewportCheck --> OutViewport: Not visible
    
    InViewport --> LoadImage: Load image
    OutViewport --> SkipLoad: Don't load yet
    
    LoadImage --> OptimizedLoad: ✅ Fast page load
    SkipLoad --> OptimizedLoad
    
    note right of AllAtOnce
        All images load
        Even below fold
        Slow initial load
    end note
    
    note right of OptimizedLoad
        Only visible images
        Load on scroll
        Fast initial load
    end note
```

### Solutions

**Check 1: Lazy Loading**

```tsx
// ✅ CORRECT - Lazy load images below fold
<img 
  src={image.url}
  alt={image.alt}
  loading="lazy"  // Only loads when near viewport
/>

// ❌ WRONG - Loads all images immediately
<img src={image.url} alt={image.alt} />
```

**Check 2: Explicit Dimensions**

Prevent layout shift:

```tsx
// ✅ CORRECT - Reserve space
<img
  src={image.url}
  alt={image.alt}
  width={800}
  height={600}
  loading="lazy"
  className="w-full h-auto"  // Responsive but maintains aspect
/>

// ❌ WRONG - No dimensions = layout shift
<img src={image.url} alt={image.alt} />
```

**Check 3: Responsive Images**

```tsx
// ✅ CORRECT - Serve appropriate size
<picture>
  <source 
    srcSet={`${image.url}?w=400 400w, ${image.url}?w=800 800w`}
    sizes="(max-width: 640px) 400px, 800px"
  />
  <img src={image.url} alt={image.alt} loading="lazy" />
</picture>

// Or use ImageWithFallback which handles this
<ImageWithFallback
  src={image.url}
  alt={image.alt}
  className="w-full"
/>
```

**Check 4: Preload Critical Images**

```tsx
// In <head> for hero images
<link
  rel="preload"
  as="image"
  href="figma:asset/hero-image.png"
/>

// Only for above-fold, critical images!
```

### Quick Fix Checklist

- [ ] Use `loading="lazy"` for below-fold images
- [ ] Set explicit `width` and `height` attributes
- [ ] Use responsive `srcSet` for different sizes
- [ ] Preload only critical hero images
- [ ] Test Lighthouse performance score

---

## 🚨 Issue 6: External Image CORS Error

### Symptoms
- External images blocked
- Console: "CORS policy: No 'Access-Control-Allow-Origin'"
- Images work in new tab, fail in app

### Solutions

**Check 1: Use Proxy or Download**

```tsx
// ❌ WRONG - Direct external URL may have CORS issues
<img src="https://somesite.com/image.jpg" alt="Image" />

// ✅ OPTION 1 - Download and add to /public/
<img src="/images/downloaded-image.jpg" alt="Image" />

// ✅ OPTION 2 - Use Unsplash API (has CORS headers)
const img = await unsplash_tool({ query: "makeup" });
<img src={img} alt="Image" />

// ✅ OPTION 3 - Use Figma assets
<img src="figma:asset/abc123.png" alt="Image" />
```

**Check 2: Contentful Assets**

Contentful assets have proper CORS headers:

```tsx
// ✅ CORRECT - Contentful images work
<img src="https://images.ctfassets.net/..." alt="Image" />
```

### Quick Fix Checklist

- [ ] Prefer Figma assets or Contentful images
- [ ] Download external images to `/public/`
- [ ] Use Unsplash API instead of direct URLs
- [ ] Check browser console for specific CORS error

---

## 🚨 Issue 7: Broken Image URLs

### Symptoms
- 404 error for images
- Broken link icon
- Image worked before, now fails

### Diagnostic Flow

```mermaid
flowchart TD
    A[Image 404 Error] --> B{URL type?}
    
    B -->|Relative path| C[Check /public/ folder]
    B -->|Figma asset| D[Check asset exists]
    B -->|External URL| E[URL still valid?]
    
    C --> F{File exists?}
    F -->|No| G[Add file to /public/images/]
    F -->|Yes| H[Check path is correct]
    
    D --> I{In mock data?}
    I -->|No| J[Add to /data/mock/]
    I -->|Yes| K[Check import syntax]
    
    E --> L{URL accessible?}
    L -->|No| M[URL changed/deleted]
    L -->|Yes| N[May be CORS issue]
    
    G --> O[✅ Fixed]
    H --> O
    J --> O
    K --> O
    
    M --> P[Update to new URL or use fallback]
    N --> Q[Use proxy or download]
    
    P --> O
    Q --> O
    
    style O fill:#dcfce7,stroke:#22c55e,stroke-width:2px
```

### Solutions

**Check 1: Public Folder Structure**

```bash
/public/
  images/
    placeholder.jpg     # Fallback image
    logo.png           # Logo
  # Other static assets

# Reference in code:
<img src="/images/placeholder.jpg" alt="Fallback" />

# Note: /public/ files accessible from root /
```

**Check 2: Fix Broken Paths**

```tsx
// ❌ WRONG - Common path mistakes
<img src="./images/photo.jpg" />        // Wrong in React
<img src="../public/images/photo.jpg" />  // Wrong path
<img src="images/photo.jpg" />           // Missing /

// ✅ CORRECT - Absolute from public/
<img src="/images/photo.jpg" alt="Photo" />
```

**Check 3: Update Mock Data**

If external URL is dead:

```tsx
// Before (broken):
export const galleryImages = [
  {
    url: 'https://oldsite.com/deleted-image.jpg',  // ❌ 404
    alt: 'Makeup photo'
  }
];

// After (fixed):
export const galleryImages = [
  {
    url: 'figma:asset/replacement-image.png',  // ✅ Local asset
    alt: 'Makeup photo'
  }
];
```

### Quick Fix Checklist

- [ ] Files in `/public/` use absolute paths (`/images/...`)
- [ ] Figma assets in `/data/mock/` with correct IDs
- [ ] External URLs still accessible
- [ ] Use fallback image for broken links
- [ ] Check Network tab for actual 404 URL

---

## 🎯 Complete Diagnostic Workflow

### Full Image Troubleshooting Sequence

```mermaid
flowchart TD
    START[Image Issue] --> A[Open Browser DevTools]
    
    A --> B[Check Console]
    
    B --> C{Error type?}
    
    C -->|Import error| D[Fix: Issue 1 - Import Syntax]
    C -->|404 Not Found| E[Fix: Issue 2 or 7 - Missing File]
    C -->|CORS error| F[Fix: Issue 6 - CORS]
    C -->|No error| G{Image displays?}
    
    G -->|Wrong image| H[Fix: Issue 3 - Wrong Asset]
    G -->|Slow loading| I[Fix: Issue 5 - Performance]
    G -->|Not loading| J[Check Network Tab]
    
    J --> K{Status code?}
    K -->|404| E
    K -->|403| F
    K -->|200 but no display| L[Check CSS/visibility]
    
    D --> M[Re-test]
    E --> M
    F --> M
    H --> M
    I --> M
    L --> M
    
    M --> N{Fixed?}
    
    N -->|Yes| O[✅ SUCCESS]
    N -->|No| P[Check mock data structure]
    
    P --> START
    
    style O fill:#dcfce7,stroke:#22c55e,stroke-width:3px
```

---

## 📋 Quick Reference: Image Best Practices

| Scenario | Solution | Example |
|----------|----------|---------|
| **Portfolio images** | Use Figma assets from `/data/mock/` | `import { festivalGallery }` |
| **Hero images** | Use Figma assets from `/data/mock/images/` | `import { homepageHero }` |
| **New placeholder** | Add to `/public/images/` | `src="/images/placeholder.jpg"` |
| **Dynamic content** | Use Contentful CMS images | From API response |
| **Creating new images** | Use `unsplash_tool` | `unsplash_tool({ query: "makeup" })` |
| **Fallback needed** | Use `ImageWithFallback` component | `<ImageWithFallback />` |
| **Performance** | Add `loading="lazy"` | Below fold images |

---

## 🔗 Related Documentation

- **[Data System Documentation](../../data/README.md)** - Image organization
- **[ImageGallery Component](../components/ImageGallery.md)** - Gallery implementation
- **[ImageWithFallback Component](../components/figma/ImageWithFallback.tsx)** - Fallback handling

---

**Pro Tip:** Always import images from `/data/mock/` - never hardcode Figma asset IDs directly in components!