# HeroSection Component

**Version:** 4.0.0  
**Last Updated:** January 2025

---

## Purpose

The HeroSection is the **primary landing area** that establishes brand identity and sets the visual tone for the entire site. It combines:
- Brand messaging and tagline
- Artistic image mosaic showcasing makeup work
- Interactive elements with lightbox functionality
- Floating decorative elements (gradient orbs)

---

## Section Structure

```tsx
<section className="[container-styles]">
  {/* Background Layer - Decorative gradient orbs */}
  <div className="[decorative-orbs]" />
  
  {/* Content Container */}
  <div className="[max-width-container]">
    <div className="[two-column-layout]">
      {/* Left Column - Text Content */}
      <div className="[text-content]">
        <p>{/* Greeting */}</p>
        <h1>{/* Main tagline */}</h1>
        <p>{/* Description */}</p>
        <p>{/* Journey statement */}</p>
      </div>
      
      {/* Right Column - Image Mosaic */}
      <div className="[image-mosaic]">
        <div>{/* Image 1 */}</div>
        <div>{/* Image 2 */}</div>
        <div>{/* Image 3 */}</div>
        <div>{/* Decorative dots */}</div>
      </div>
    </div>
  </div>
</section>
```

---

## Container Styles

### Section Container
```tsx
className="
  relative                                    // Position context for decorations
  bg-gradient-to-br from-pink-50 
    via-purple-50 to-blue-50                 // Brand gradient background
  py-fluid-3xl                               // clamp(4rem, 2rem + 10vw, 8rem)
  px-fluid-md                                // clamp(1rem, 0.6rem + 2vw, 2rem)
  overflow-hidden                            // Contain decorative elements
"
```

### Inner Container
```tsx
className="
  max-w-7xl                                  // 1280px max-width
  mx-auto                                    // Center horizontally
  relative                                   // Above decorations
  z-10                                       // Stack above background
"
```

### Two-Column Layout
```tsx
className="
  flex                                       // Flexbox layout
  flex-col lg:flex-row                       // Column on mobile, row on desktop
  items-center                               // Vertical centering
  gap-fluid-2xl lg:gap-20                    // Responsive gap
"
```

---

## Visual Elements

### 1. Decorative Gradient Orbs

Three floating orbs with different colors, sizes, and animation delays:

```tsx
{/* Pink/Purple orb - top left */}
<div className="
  absolute top-10 left-4 sm:left-10 
  w-16 h-16 sm:w-32 sm:h-32                  // Responsive sizing
  bg-gradient-to-br from-pink-300 to-purple-400
  rounded-full 
  opacity-20 
  animate-pulse
" />

{/* Blue/Teal orb - top right */}
<div className="
  absolute top-20 right-8 sm:right-20 
  w-12 h-12 sm:w-24 sm:h-24
  bg-gradient-to-br from-blue-300 to-teal-400
  rounded-full 
  opacity-25 
  animate-pulse delay-1000                   // 1s delay
" />

{/* Yellow/Pink orb - bottom left */}
<div className="
  absolute bottom-16 left-1/4 
  w-20 h-20 sm:w-40 sm:h-40
  bg-gradient-to-br from-yellow-300 to-pink-400
  rounded-full 
  opacity-15 
  animate-pulse delay-2000                   // 2s delay
" />
```

**Purpose:** Create depth and visual interest without overwhelming content

---

### 2. Text Content Column

#### Greeting Text
```tsx
<p className="
  text-fluid-xl                              // clamp(1.25rem, 2vw, 1.75rem)
  font-body 
  font-medium 
  text-gradient-pink-purple-blue             // Brand gradient text
  mb-fluid-xl
">
  Hi, I'm Ash Shaw.
</p>
```

#### Main Tagline (H1)
```tsx
<h1 className="
  text-hero-h1                               // clamp(2.25rem, 6vw, 7.5rem)
  font-heading                               // Playfair Display
  font-bold 
  text-gray-800 
  leading-tight 
  mb-fluid-xl
">
  Makeup that shines with{" "}
  <em className="italic text-gradient-pink-purple-blue">colour</em>,{" "}
  <em className="italic text-gradient-pink-purple-blue">energy</em>, and{" "}
  <em className="italic text-gradient-blue-teal-green">connection</em>.
</h1>
```

**Key Features:**
- Different gradient colors for different words
- Italic emphasis on key brand values
- Fluid typography scaling from 36px → 120px

#### Description Paragraph
```tsx
<p className="
  text-body-guideline                        // clamp(1rem, 1.5vw, 1.25rem)
  font-body 
  font-normal 
  text-gray-600 
  leading-relaxed 
  mb-fluid-xl
">
  Makeup is my art, my joy, and my way of bringing people together...
</p>
```

#### Journey Statement
```tsx
<p className="
  text-fluid-lg 
  font-body 
  font-medium 
  text-gradient-pink-purple-blue
">
  ✨ This portfolio is a growing collection of that journey.
</p>
```

---

### 3. Image Mosaic Column

Three overlapping images with rotation, shadows, and hover effects:

#### Container
```tsx
<div className="
  flex-1 
  max-w-2xl 
  relative 
  w-full
">
  <div className="
    relative 
    w-full 
    h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px]  // Responsive height
  ">
    {/* Images positioned absolutely */}
  </div>
</div>
```

#### Image 1 (Center - Main)
```tsx
<div
  className="
    absolute 
    top-6 left-4 sm:top-12 sm:left-8           // Responsive positioning
    w-48 h-56 sm:w-72 sm:h-80 md:w-80 md:h-96  // Responsive sizing
    rounded-2xl 
    bg-cover bg-center 
    shadow-2xl 
    transform rotate-3                         // Slight rotation
    z-20                                       // Top layer
    border-4 border-white 
    ring-4 ring-gradient-to-r ring-pink-200/50
    cursor-pointer 
    transition-transform hover:scale-105       // Hover effect
  "
  style={{ backgroundImage: `url('${imgHeroImage2}')` }}
  onClick={() => openLightbox(...)}
/>
```

#### Image 2 (Top Right)
```tsx
<div
  className="
    absolute 
    top-0 right-0 
    w-40 h-48 sm:w-64 sm:h-72 md:w-72 md:h-80
    rounded-2xl 
    bg-cover bg-center 
    shadow-xl 
    transform -rotate-6                        // Opposite rotation
    z-10                                       // Middle layer
    border-4 border-white 
    ring-4 ring-purple-200/50
    cursor-pointer 
    transition-transform hover:scale-105
  "
  style={{ backgroundImage: `url('${imgHeroImage1}')` }}
  onClick={() => openLightbox(...)}
/>
```

#### Image 3 (Bottom Left)
```tsx
<div
  className="
    absolute 
    bottom-0 left-0 
    w-36 h-44 sm:w-56 sm:h-64 md:w-64 md:h-72
    rounded-2xl 
    bg-cover bg-center 
    shadow-lg 
    transform rotate-2 
    z-0                                        // Bottom layer
    border-4 border-white 
    ring-4 ring-blue-200/50
    cursor-pointer 
    transition-transform hover:scale-105
  "
  style={{ backgroundImage: `url('${imgHeroImage3}')` }}
  onClick={() => openLightbox(...)}
/>
```

#### Decorative Dots
```tsx
{/* Four small gradient dots positioned around images */}
<div className="
  absolute top-1/4 left-1/2 
  w-3 h-3 sm:w-4 sm:h-4 
  bg-gradient-to-br from-pink-400 to-purple-500 
  rounded-full 
  animate-ping
" />

{/* Additional dots with different positions and colors */}
```

---

## Responsive Breakpoints

### Mobile (< 640px)
- Single column layout
- Images: 160×192px (small), 200×240px (medium)
- Orbs: 64×64px (16rem)
- Vertical spacing: py-8 to py-12

### Tablet (640px - 1024px)
- Single column layout (still stacked)
- Images: 256×288px (medium), 288×320px (larger)
- Orbs: 128×128px (32rem)
- Vertical spacing: py-12 to py-16

### Desktop (1024px+)
- Two column layout (side by side)
- Images: 320×384px (full size)
- Orbs: 160×160px (40rem)
- Vertical spacing: py-16 to py-20
- Gap between columns: 5rem (80px)

---

## Interactive Features

### Lightbox Integration

Each image is clickable and opens in an EnhancedLightbox:

```tsx
const [lightbox, setLightbox] = useState({
  isOpen: false,
  images: [],
  currentIndex: 0,
  title: "",
});

const openLightbox = (imageSrc: string, imageAlt: string, title?: string) => {
  setLightbox({ 
    isOpen: true, 
    images: [{ src: imageSrc, alt: imageAlt }], 
    currentIndex: 0, 
    title 
  });
};

// Usage
onClick={() => openLightbox(
  imgHeroImage2, 
  "Thailand Festival Makeup",
  "Eden Paradise"
)}
```

### Hover Effects

All images have scale transform on hover:
```css
transition-transform hover:scale-105  /* 5% scale increase */
```

---

## Accessibility

### Semantic HTML
```tsx
<section>                    // Semantic section element
  <h1>                      // Proper heading hierarchy
  <p>                       // Paragraph content
  <div onClick={...}>       // Interactive image containers
```

### ARIA Labels
```tsx
// Images should have descriptive alt text
alt="Festival makeup with vibrant colors at Thailand event"

// Lightbox should have proper aria-labels
aria-label="View Thailand Festival Makeup in lightbox"
```

### Keyboard Navigation
- Images are keyboard accessible (implicit through onClick)
- Lightbox supports Escape key to close
- All interactive elements have focus states

---

## Typography Scale

| Element | Class | Size (Mobile → Desktop) |
|---------|-------|------------------------|
| Greeting | `text-fluid-xl` | 20px → 28px |
| H1 Tagline | `text-hero-h1` | 36px → 120px |
| Description | `text-body-guideline` | 16px → 20px |
| Journey | `text-fluid-lg` | 18px → 24px |

---

## Color Palette

### Background
```css
bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50
```

### Text Gradients
```css
text-gradient-pink-purple-blue     /* Main brand gradient */
text-gradient-blue-teal-green      /* Accent gradient */
```

### Orb Gradients
```css
from-pink-300 to-purple-400        /* Pink/Purple orb */
from-blue-300 to-teal-400          /* Blue/Teal orb */
from-yellow-300 to-pink-400        /* Yellow/Pink orb */
```

### Image Rings
```css
ring-pink-200/50                   /* Image 1 */
ring-purple-200/50                 /* Image 2 */
ring-blue-200/50                   /* Image 3 */
```

---

## Best Practices

### 1. Image Loading
```tsx
// Use Figma asset imports for optimized images
import imgHeroImage1 from "figma:asset/[hash].png";

// Set background images via inline styles
style={{ backgroundImage: `url('${imgHeroImage1}')` }}
```

### 2. Spacing Consistency
```tsx
// Use fluid spacing tokens throughout
mb-fluid-xl                        // Between sections
gap-fluid-2xl                      // Between columns
py-fluid-3xl                       // Section padding
```

### 3. Responsive Design
```tsx
// Mobile-first approach
className="w-48 sm:w-72 md:w-80"  // Progressively larger

// Breakpoint-based layouts
className="flex-col lg:flex-row"  // Stack on mobile, side-by-side on desktop
```

### 4. Performance
```tsx
// Lazy load lightbox component
const [lightbox, setLightbox] = useState({ isOpen: false, ... });

// Only render EnhancedLightbox when needed
{lightbox.isOpen && <EnhancedLightbox {...} />}
```

---

## WordPress Comparison

### WordPress `core/cover` Block
```html
<!-- wp:cover -->
<div class="wp-block-cover">
  <div class="wp-block-cover__inner-container">
    <h1>Heading</h1>
    <p>Description</p>
  </div>
</div>
<!-- /wp:cover -->
```

### Ash Shaw HeroSection
```tsx
<section className="relative bg-gradient-to-br from-pink-50...">
  <div className="max-w-7xl mx-auto">
    <div className="flex flex-col lg:flex-row">
      <div>{/* Text content */}</div>
      <div>{/* Image mosaic */}</div>
    </div>
  </div>
</section>
```

---

## Related Documentation

- **[overview-sections.md](../overview-sections.md)** - Section system overview
- **[Guidelines.md](../Guidelines.md)** - Main guidelines
- **[design-tokens/typography.md](../design-tokens/typography.md)** - Typography scale
- **[design-tokens/colors.md](../design-tokens/colors.md)** - Color system
- **[design-tokens/spacing.md](../design-tokens/spacing.md)** - Spacing tokens

---

**Last Updated:** January 2025  
**Version:** 4.0.0