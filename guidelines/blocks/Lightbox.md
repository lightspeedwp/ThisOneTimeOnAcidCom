# Lightbox (EnhancedLightbox) Component

**Version:** 4.0.0  
**Last Updated:** January 2025

---

## Purpose

The Lightbox is a **modal block** that provides full-screen image viewing with:
- Clean white card layout centered on screen
- Image navigation for galleries
- Touch swipe support for mobile
- Keyboard navigation (Arrow keys, Escape)
- Click outside to close
- Bottom overlay with image title
- Responsive design for all devices

---

## Lightbox Structure

```tsx
{isOpen && (
  <div className="[overlay-wrapper]">
    {/* Backdrop */}
    <div className="[backdrop]" onClick={onClose} />
    
    {/* Content Card */}
    <div className="[card-container]">
      {/* Close Button (Above Card) */}
      <button className="[close-button]">
        <X />
      </button>
      
      {/* Image Container */}
      <div className="[image-wrapper]">
        {/* Previous Button */}
        <button className="[nav-button-prev]">
          <ChevronLeft />
        </button>
        
        {/* Main Image */}
        <img src={images[currentIndex].src} />
        
        {/* Next Button */}
        <button className="[nav-button-next]">
          <ChevronRight />
        </button>
        
        {/* Bottom Overlay with Title */}
        <div className="[title-overlay]">
          <h3>{title}</h3>
        </div>
      </div>
      
      {/* Instruction Text */}
      <p className="[instructions]">
        Swipe or use arrow keys to navigate
      </p>
      
      {/* Thumbnail Navigation (Optional) */}
      <div className="[thumbnail-row]">
        {images.map((img, index) => (
          <button onClick={() => goToImage(index)}>
            <img src={img.src} />
          </button>
        ))}
      </div>
    </div>
  </div>
)}
```

---

## Container Styles

### Overlay Wrapper
```tsx
className="
  fixed inset-0                              // Full viewport coverage
  z-50                                       // Above all content
  flex items-center justify-center           // Center card
  p-4                                        // Padding from edges
  bg-black/90                                // Dark backdrop
  backdrop-blur-sm                           // Blur page content
"
```

### Backdrop (for click-to-close)
```tsx
<div 
  className="
    absolute inset-0                         // Cover entire overlay
    -z-10                                    // Behind card
  "
  onClick={onClose}                          // Click to close
  aria-hidden="true"                         // Decorative
/>
```

### Card Container
```tsx
className="
  relative                                   // Position context
  bg-white                                   // White card
  rounded-2xl                                // Rounded corners
  max-w-7xl                                  // Max width 1280px
  w-full                                     // Full width up to max
  max-h-[90vh]                               // Max 90% viewport height
  overflow-hidden                            // Contain content
  shadow-2xl                                 // Large shadow
"
```

---

## Visual Elements

### 1. Close Button (Above Card)

```tsx
<button
  onClick={onClose}
  className="
    absolute 
    -top-12 right-0                          // Positioned above card
    w-12 h-12                                // Square button
    bg-white/10                              // Semi-transparent white
    hover:bg-white/20                        // Hover effect
    rounded-full                             // Circular button
    flex items-center justify-center 
    transition-colors duration-200 
    focus:outline-none 
    focus:ring-2 focus:ring-white 
    focus:ring-offset-2 
    focus:ring-offset-black/90
  "
  aria-label="Close lightbox"
>
  <X className="w-6 h-6 text-white" />
</button>
```

**Features:**
- Positioned above card for clear visual separation
- Semi-transparent background
- White X icon from @phosphor-icons/react
- Hover state increases opacity
- Circular design

---

### 2. Image Container

```tsx
<div className="
  relative                                   // Position context for overlays
  w-full 
  h-[60vh] sm:h-[70vh]                       // Responsive height
  bg-gray-100                                // Background while loading
"
  onTouchStart={onTouchStart}                // Touch swipe support
  onTouchMove={onTouchMove}
  onTouchEnd={onTouchEnd}
>
```

#### Main Image
```tsx
<img
  src={images[localCurrentIndex].src}
  alt={images[localCurrentIndex].alt}
  className="
    w-full h-full 
    object-contain                           // Maintain aspect ratio
    select-none                              // Prevent selection
  "
  draggable={false}                          // Prevent drag
/>
```

**Why `object-contain`?**
- Maintains original aspect ratio
- Shows entire image without cropping
- Centers image within container
- Better than `object-cover` for portfolio images

---

### 3. Navigation Buttons

#### Previous Button (Left)
```tsx
{hasMultipleImages && (
  <button
    onClick={goToPrevious}
    className="
      absolute left-4 top-1/2 -translate-y-1/2  // Centered vertically
      w-12 h-12 
      bg-white/80 hover:bg-white 
      rounded-full 
      flex items-center justify-center 
      transition-all duration-200 
      shadow-lg 
      focus:outline-none 
      focus:ring-2 focus:ring-pink-500 
      focus:ring-offset-2
    "
    aria-label="Previous image"
  >
    <ChevronLeft className="w-6 h-6 text-gray-800" />
  </button>
)}
```

#### Next Button (Right)
```tsx
{hasMultipleImages && (
  <button
    onClick={goToNext}
    className="
      absolute right-4 top-1/2 -translate-y-1/2
      w-12 h-12 
      bg-white/80 hover:bg-white 
      rounded-full 
      flex items-center justify-center 
      transition-all duration-200 
      shadow-lg 
      focus:outline-none 
      focus:ring-2 focus:ring-pink-500 
      focus:ring-offset-2
    "
    aria-label="Next image"
  >
    <ChevronRight className="w-6 h-6 text-gray-800" />
  </button>
)}
```

**Features:**
- Only shown if multiple images
- Positioned at vertical center
- Semi-transparent white background
- Hover effect increases opacity
- Circular design with shadows

---

### 4. Bottom Title Overlay

```tsx
<div className="
  absolute bottom-0 left-0 right-0           // Bottom of image
  bg-gradient-to-t from-black/80 to-transparent  // Gradient overlay
  p-6                                        // Padding
  pointer-events-none                        // Don't block clicks
">
  <h3 className="
    text-2xl 
    font-heading 
    font-bold 
    text-white 
    drop-shadow-lg                           // Text shadow
  ">
    {title || images[localCurrentIndex].caption}
  </h3>
  {description && (
    <p className="
      text-base 
      font-body 
      text-white/90 
      mt-2
    ">
      {description}
    </p>
  )}
</div>
```

**Purpose:** Display image title/caption without obscuring image

---

### 5. Instruction Text

```tsx
<p className="
  text-center 
  text-sm 
  text-gray-600 
  mt-4 
  mb-2
">
  {isMobile 
    ? "Swipe to navigate" 
    : "Use arrow keys or click buttons to navigate"
  }
</p>
```

**Features:**
- Different text for mobile vs desktop
- Subtle gray color
- Centered below image

---

### 6. Thumbnail Navigation (Optional)

```tsx
{hasMultipleImages && (
  <div className="
    flex 
    gap-2 
    justify-center 
    p-4 
    overflow-x-auto                          // Horizontal scroll on mobile
    scrollbar-thin                           // Thin scrollbar
  ">
    {images.map((image, index) => (
      <button
        key={index}
        onClick={() => goToImage(index)}
        className={`
          flex-shrink-0 
          w-16 h-16                          // Square thumbnails
          rounded-lg 
          overflow-hidden 
          border-2 
          transition-all duration-200 
          focus:outline-none 
          focus:ring-2 focus:ring-pink-500 
          ${index === localCurrentIndex
            ? "border-pink-500 scale-110"    // Active state
            : "border-transparent opacity-50 hover:opacity-100"
          }
        `}
        aria-label={`View image ${index + 1}`}
        aria-current={index === localCurrentIndex ? "true" : undefined}
      >
        <img
          src={image.src}
          alt={image.alt}
          className="w-full h-full object-cover"
        />
      </button>
    ))}
  </div>
)}
```

**Features:**
- Show all images as thumbnails
- Active thumbnail highlighted with border
- Horizontal scroll on mobile
- Click to jump to specific image

---

## Interactive Features

### Keyboard Navigation

```tsx
useEffect(() => {
  if (!isOpen) return;

  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'Escape':
        onClose();
        break;
      case 'ArrowLeft':
        goToPrevious();
        break;
      case 'ArrowRight':
        goToNext();
        break;
    }
  };

  document.addEventListener('keydown', handleKeyDown);
  return () => document.removeEventListener('keydown', handleKeyDown);
}, [isOpen]);
```

**Supported Keys:**
- **Escape** - Close lightbox
- **ArrowLeft** - Previous image
- **ArrowRight** - Next image

### Touch Swipe Support

```tsx
const minSwipeDistance = 50;  // Minimum 50px swipe

const onTouchStart = (e: React.TouchEvent) => {
  setTouchEnd(null);
  setTouchStart(e.targetTouches[0].clientX);
  setIsSwiping(false);
};

const onTouchMove = (e: React.TouchEvent) => {
  if (!touchStart) return;
  
  const currentTouch = e.targetTouches[0].clientX;
  setTouchEnd(currentTouch);
  
  const distance = Math.abs(touchStart - currentTouch);
  if (distance > 10) {
    setIsSwiping(true);
  }
};

const onTouchEnd = () => {
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
- Minimum 50px distance to trigger
- Prevents accidental swipes

### Body Scroll Lock

```tsx
useEffect(() => {
  if (isOpen) {
    document.body.style.overflow = 'hidden';  // Prevent scroll
  } else {
    document.body.style.overflow = 'unset';   // Restore scroll
  }
  
  return () => {
    document.body.style.overflow = 'unset';   // Cleanup
  };
}, [isOpen]);
```

---

## Responsive Breakpoints

### Mobile (< 640px)
- Image height: 60vh
- Thumbnails: Horizontal scroll
- Navigation: Swipe gestures
- Instruction text: "Swipe to navigate"

### Tablet (640px - 1024px)
- Image height: 70vh
- Thumbnails: Horizontal scroll
- Navigation: Buttons + swipe
- Both navigation methods available

### Desktop (1024px+)
- Image height: 70vh
- Thumbnails: All visible (if few images)
- Navigation: Buttons + arrow keys
- Instruction text: "Use arrow keys or click buttons"

---

## Accessibility

### ARIA Labels
```tsx
// Lightbox container
<div 
  role="dialog" 
  aria-modal="true"
  aria-labelledby="lightbox-title"
  aria-describedby="lightbox-description"
>

// Title
<h3 id="lightbox-title">{title}</h3>

// Description (if present)
<p id="lightbox-description">{description}</p>

// Navigation buttons
<button aria-label="Close lightbox">
<button aria-label="Previous image">
<button aria-label="Next image">

// Thumbnails
<button aria-label={`View image ${index + 1}`}>
```

### Keyboard Support
- **Full keyboard navigation**
- **Escape to close**
- **Arrow keys for navigation**
- **Tab to focus buttons**
- **Enter/Space to activate buttons**

### Screen Reader Support
- Dialog role announces modal
- Image alt text read when changed
- Navigation button labels descriptive
- Current image indicator on thumbnails

### Focus Management
```tsx
useEffect(() => {
  if (isOpen) {
    // Focus close button when opened
    closeButtonRef.current?.focus();
  }
}, [isOpen]);
```

---

## Usage Examples

### Single Image
```tsx
const [lightbox, setLightbox] = useState({
  isOpen: false,
  images: [],
  currentIndex: 0
});

const openLightbox = (imageSrc: string, imageAlt: string, title: string) => {
  setLightbox({
    isOpen: true,
    images: [{ src: imageSrc, alt: imageAlt }],
    currentIndex: 0,
    title
  });
};

<img 
  src={image.src} 
  onClick={() => openLightbox(image.src, image.alt, "Portfolio Image")}
/>

<EnhancedLightbox
  isOpen={lightbox.isOpen}
  onClose={() => setLightbox({ ...lightbox, isOpen: false })}
  images={lightbox.images}
  currentIndex={lightbox.currentIndex}
  title={lightbox.title}
/>
```

### Image Gallery
```tsx
const galleryImages = [
  { src: '/img1.jpg', alt: 'Image 1', caption: 'Festival Look' },
  { src: '/img2.jpg', alt: 'Image 2', caption: 'UV Makeup' },
  { src: '/img3.jpg', alt: 'Image 3', caption: 'Fusion Nails' }
];

const [lightbox, setLightbox] = useState({
  isOpen: false,
  images: galleryImages,
  currentIndex: 0
});

const openGallery = (startIndex: number) => {
  setLightbox({
    isOpen: true,
    images: galleryImages,
    currentIndex: startIndex
  });
};

<EnhancedLightbox
  isOpen={lightbox.isOpen}
  onClose={() => setLightbox({ ...lightbox, isOpen: false })}
  images={lightbox.images}
  currentIndex={lightbox.currentIndex}
  onNavigate={(index) => setLightbox({ ...lightbox, currentIndex: index })}
/>
```

---

## Best Practices

### 1. Performance
```tsx
// ✅ Conditional rendering
{isOpen && <EnhancedLightbox ... />}

// ✅ Preload adjacent images
useEffect(() => {
  if (isOpen && hasMultipleImages) {
    const preloadImage = (index: number) => {
      const img = new Image();
      img.src = images[index].src;
    };
    
    const prevIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    const nextIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    
    preloadImage(prevIndex);
    preloadImage(nextIndex);
  }
}, [isOpen, currentIndex, images]);
```

### 2. Accessibility
```tsx
// ✅ Always provide alt text
images: [
  { src: '/img.jpg', alt: 'Descriptive alt text' }
]

// ✅ Add captions for context
images: [
  { src: '/img.jpg', alt: 'Alt text', caption: 'Image title' }
]
```

### 3. Mobile Experience
```tsx
// ✅ Responsive image heights
className="h-[60vh] sm:h-[70vh]"

// ✅ Touch-friendly buttons
className="w-12 h-12"  // Minimum 44px

// ✅ Swipe gesture support
onTouchStart={onTouchStart}
onTouchMove={onTouchMove}
onTouchEnd={onTouchEnd}
```

---

## Related Documentation

- **[overview-blocks.md](../overview-blocks.md)** - Block patterns overview
- **[PortfolioCard.md](./PortfolioCard.md)** - Portfolio card block
- **[ImageGallery.md](../components/ImageGallery.md)** - Image gallery component
- **[patterns/ModalLightbox.md](../patterns/ModalLightbox.md)** - Modal pattern (future)
- **[sections/HeroSection.md](../sections/HeroSection.md)** - Hero section usage

---

**Last Updated:** January 2025  
**Version:** 4.0.0