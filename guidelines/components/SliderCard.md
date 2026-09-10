# SliderCard Component

**Version:** 4.0.0  
**Last Updated:** January 2025

---

## Purpose

The SliderCard is a **carousel component** that provides multi-image slideshow functionality within a card:
- Single or multiple image support
- Touch swipe gestures for mobile
- Keyboard arrow key navigation
- Navigation arrows on hover (desktop)
- Pagination dots indicator
- Click to open lightbox
- Smooth transitions

---

## SliderCard Structure

```tsx
<div className="[card-container]">
  {/* Image Slider Container */}
  <div className="[slider-wrapper]"
    onTouchStart={handleTouchStart}
    onTouchMove={handleTouchMove}
    onTouchEnd={handleTouchEnd}
  >
    {/* Current Image */}
    <img 
      src={images[currentIndex].src}
      onClick={() => onImageClick(currentIndex)}
    />
    
    {/* Navigation Arrows (Desktop - on hover) */}
    <button className="[prev-arrow]" onClick={goToPrevious}>
      <ChevronLeft />
    </button>
    <button className="[next-arrow]" onClick={goToNext}>
      <ChevronRight />
    </button>
    
    {/* Pagination Dots */}
    <div className="[dots-wrapper]">
      {images.map((_, index) => (
        <button 
          className="[dot]"
          onClick={() => goToImage(index)}
        />
      ))}
    </div>
  </div>
  
  {/* Card Content */}
  <div className="[card-content]">
    <span className="[category-badge]">{category}</span>
    <h3 className="[card-title]">{title}</h3>
    {subtitle && <p className="[subtitle]">{subtitle}</p>}
    <p className="[description]">{description}</p>
  </div>
</div>
```

---

## Container Styles

### Card Container
```tsx
className="
  group                                      // For group-hover effects
  bg-white                                   // White background
  rounded-xl                                 // Rounded corners
  overflow-hidden                            // Clip content
  border border-gray-200 
  shadow-lg hover:shadow-2xl                 // Elevation on hover
  transition-all duration-300                // Smooth transitions
"
```

### Slider Wrapper
```tsx
className="
  relative                                   // Position context for arrows
  w-full 
  aspect-square                              // Square image container
  overflow-hidden                            // Clip images
  bg-gray-100                                // Loading background
  cursor-pointer                             // Indicate clickable
"
onTouchStart={handleTouchStart}              // Touch swipe support
onTouchMove={handleTouchMove}
onTouchEnd={handleTouchEnd}
onClick={() => onImageClick(currentIndex)}   // Open lightbox
```

---

## Visual Elements

### 1. Image Display

```tsx
<img
  src={images[currentImageIndex].src}
  alt={images[currentImageIndex].alt}
  className="
    w-full h-full 
    object-cover                             // Fill container, crop edges
    transition-opacity duration-300          // Fade transition
  "
  draggable={false}                          // Prevent drag
/>
```

**Why `object-cover`?**
- Fills entire square container
- Maintains aspect ratio
- Centers and crops image

---

### 2. Navigation Arrows (Desktop Only)

#### Previous Arrow
```tsx
<button
  onClick={(e) => {
    e.stopPropagation();                     // Don't trigger image click
    goToPrevious();
  }}
  className="
    absolute left-2 top-1/2 -translate-y-1/2  // Centered vertically
    w-8 h-8 
    bg-white/80 hover:bg-white 
    rounded-full 
    flex items-center justify-center 
    opacity-0 group-hover:opacity-100        // Show on card hover
    md:flex hidden                           // Desktop only
    transition-all duration-200 
    shadow-md 
    focus:outline-none 
    focus:ring-2 focus:ring-pink-500
  "
  aria-label="Previous image"
>
  <ChevronLeft className="w-5 h-5 text-gray-800" />
</button>
```

#### Next Arrow
```tsx
<button
  onClick={(e) => {
    e.stopPropagation();
    goToNext();
  }}
  className="
    absolute right-2 top-1/2 -translate-y-1/2
    w-8 h-8 
    bg-white/80 hover:bg-white 
    rounded-full 
    flex items-center justify-center 
    opacity-0 group-hover:opacity-100        // Show on card hover
    md:flex hidden                           // Desktop only
    transition-all duration-200 
    shadow-md 
    focus:outline-none 
    focus:ring-2 focus:ring-pink-500
  "
  aria-label="Next image"
>
  <ChevronRight className="w-5 h-5 text-gray-800" />
</button>
```

**Features:**
- Only visible on hover (desktop)
- Hidden on mobile (use swipe instead)
- `stopPropagation()` prevents opening lightbox
- Semi-transparent white background

---

### 3. Pagination Dots

```tsx
<div className="
  absolute bottom-3 left-1/2 -translate-x-1/2  // Centered bottom
  flex gap-1.5 
  z-10
">
  {images.map((_, index) => (
    <button
      key={index}
      onClick={(e) => {
        e.stopPropagation();
        goToImage(index);
      }}
      className={`
        w-2 h-2                              // Small dots
        rounded-full 
        transition-all duration-200 
        focus:outline-none 
        focus:ring-2 focus:ring-white 
        focus:ring-offset-2
        ${index === currentImageIndex
          ? 'bg-white w-6'                   // Active: wider white
          : 'bg-white/50 hover:bg-white/80'  // Inactive: semi-transparent
        }
      `}
      aria-label={`Go to image ${index + 1}`}
      aria-current={index === currentImageIndex ? 'true' : undefined}
    />
  ))}
</div>
```

**Features:**
- Active dot is wider (w-6 vs w-2)
- Inactive dots semi-transparent
- Click to jump to specific image
- Always visible (mobile + desktop)

---

### 4. Card Content

#### Category Badge
```tsx
<span className="
  inline-block 
  px-3 py-1 
  text-xs font-medium 
  rounded-full 
  bg-gradient-to-r from-pink-100 to-purple-100 
  text-purple-700 
  mb-2
">
  {category}
</span>
```

#### Title
```tsx
<h3 className="
  text-xl 
  font-heading 
  font-bold 
  text-gray-800 
  mb-2 
  group-hover:text-gradient-pink-purple-blue  // Gradient on hover
  transition-colors duration-300
">
  {title}
</h3>
```

#### Subtitle (Optional)
```tsx
{subtitle && (
  <p className="
    text-sm 
    font-medium 
    text-gradient-blue-teal-green            // Brand gradient
    mb-2
  ">
    {subtitle}
  </p>
)}
```

#### Description
```tsx
<p className="
  text-sm 
  text-gray-600 
  line-clamp-3                               // Max 3 lines
  leading-relaxed
">
  {description}
</p>
```

---

## Interactive Features

### Image Navigation

```tsx
const goToPrevious = () => {
  setCurrentImageIndex((prev) => 
    prev === 0 ? images.length - 1 : prev - 1  // Loop to end
  );
};

const goToNext = () => {
  setCurrentImageIndex((prev) => 
    prev === images.length - 1 ? 0 : prev + 1  // Loop to start
  );
};

const goToImage = (index: number) => {
  setCurrentImageIndex(index);
};
```

### Touch Swipe Support

```tsx
const minSwipeDistance = 50;  // Minimum 50px swipe

const handleTouchStart = (e: React.TouchEvent) => {
  setTouchEnd(null);
  setTouchStart(e.targetTouches[0].clientX);
  setIsSwiping(false);
};

const handleTouchMove = (e: React.TouchEvent) => {
  setTouchEnd(e.targetTouches[0].clientX);
  
  if (touchStart && Math.abs(touchStart - e.targetTouches[0].clientX) > 10) {
    setIsSwiping(true);
  }
};

const handleTouchEnd = () => {
  if (!touchStart || !touchEnd) return;
  
  const distance = touchStart - touchEnd;
  const isLeftSwipe = distance > minSwipeDistance;
  const isRightSwipe = distance < -minSwipeDistance;
  
  if (isLeftSwipe) goToNext();
  if (isRightSwipe) goToPrevious();
  
  setIsSwiping(false);
};
```

**Features:**
- Left swipe → Next image
- Right swipe → Previous image
- Minimum 50px to trigger
- Prevents accidental swipes

### Keyboard Navigation

```tsx
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') goToPrevious();
    if (e.key === 'ArrowRight') goToNext();
  };
  
  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, []);
```

**Supported Keys:**
- **ArrowLeft** - Previous image
- **ArrowRight** - Next image

---

## Responsive Breakpoints

### Mobile (< 768px)
- Navigation arrows hidden
- Pagination dots visible
- Touch swipe enabled
- Full-width card
- Image click opens lightbox

### Desktop (768px+)
- Navigation arrows on hover
- Pagination dots visible
- Keyboard navigation enabled
- Grid layout (3 columns typically)
- Image click opens lightbox

---

## Accessibility

### ARIA Labels
```tsx
// Navigation buttons
<button aria-label="Previous image">
<button aria-label="Next image">
<button aria-label={`Go to image ${index + 1}`}>

// Pagination dots
<button aria-current={index === currentIndex ? 'true' : undefined}>
```

### Keyboard Support
- **Arrow keys** - Navigate images
- **Tab** - Focus navigation buttons
- **Enter/Space** - Activate button
- **Click** - Open lightbox

### Screen Reader Support
- Descriptive ARIA labels
- Current image indicator
- Image count announced

---

## Usage Examples

### Single Image Card
```tsx
<SliderCard
  data={{
    title: "Festival Makeup",
    description: "Vibrant festival look with UV reactive elements",
    category: "Festival",
    image: "/img/festival-1.jpg",  // Single image (legacy)
  }}
  onImageClick={(index) => openLightbox(index)}
/>
```

### Multi-Image Slider
```tsx
<SliderCard
  data={{
    title: "Festival Collection",
    subtitle: "Thailand 2024",
    description: "Series of festival looks from Thailand event",
    category: "Festival",
    images: [
      { src: "/img1.jpg", alt: "Look 1" },
      { src: "/img2.jpg", alt: "Look 2" },
      { src: "/img3.jpg", alt: "Look 3" }
    ]
  }}
  onImageClick={(index) => openLightbox(index)}
/>
```

### With Custom Gradient
```tsx
<SliderCard
  data={portfolioEntry}
  onImageClick={handleImageClick}
  gradientConfig={{
    background: "from-pink-50 to-purple-50",
    subtitleGradient: "from-blue-500 to-teal-500"
  }}
/>
```

---

## Best Practices

### 1. Image Optimization
```tsx
// ✅ Use optimized images
images: [
  { src: "optimized-image.webp", alt: "Descriptive alt text" }
]

// ✅ Provide alt text for all images
alt: "Festival makeup with blue and purple gradient"
```

### 2. Touch Interaction
```tsx
// ✅ Prevent click during swipe
if (isSwiping) return;  // Don't open lightbox if swiping

// ✅ Stop propagation on navigation
onClick={(e) => {
  e.stopPropagation();  // Don't trigger parent click
  goToNext();
}}
```

### 3. Performance
```tsx
// ✅ Preload adjacent images
useEffect(() => {
  const preloadImage = (src: string) => {
    const img = new Image();
    img.src = src;
  };
  
  if (currentIndex < images.length - 1) {
    preloadImage(images[currentIndex + 1].src);
  }
  if (currentIndex > 0) {
    preloadImage(images[currentIndex - 1].src);
  }
}, [currentIndex, images]);
```

---

## Related Documentation

- **[Guidelines.md](../Guidelines.md)** - Main guidelines
- **[overview-components.md](../overview-components.md)** - Component system
- **[overview-icons.md](../overview-icons.md)** - Icon system
- **[FILE_STRUCTURE.md](../FILE_STRUCTURE.md)** - File organization
- **[Lightbox.md](./Lightbox.md)** - Image lightbox component

---

**Last Updated:** January 2025  
**Version:** 4.0.0