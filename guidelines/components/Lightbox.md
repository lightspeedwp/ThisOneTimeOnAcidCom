# Lightbox Component

**Version:** 4.0.0  
**Last Updated:** January 2025

Full-screen image viewer with navigation, zoom, and keyboard controls.

## Purpose

Provide immersive image viewing with:
- Full-screen modal overlay
- Image navigation (previous/next)
- Keyboard controls (Arrow keys, Escape, Space)
- Touch gesture support (swipe)
- Image zoom functionality
- Thumbnail navigation strip
- Caption and metadata display
- Close button and backdrop click
- Accessibility compliance

---

## 🖼️ Lightbox Interaction Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│                    LIGHTBOX INTERACTION FLOW                         │
└─────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────┐
│                      OPENING LIGHTBOX                               │
└────────────────────────────────────────────────────────────────────┘
                               │
                    ┌──────────▼──────────┐
                    │  User Clicks Image  │
                    │  Thumbnail          │
                    └──────────┬──────────┘
                               │
                    ┌──────────▼──────────┐
                    │  onClick Handler    │
                    │  Triggers           │
                    │                     │
                    │  • setIsOpen(true)  │
                    │  • setIndex(3)      │
                    └──────────┬──────────┘
                               │
                    ┌──────────▼──────────┐
                    │  Lightbox Component │
                    │  Mounts             │
                    │                     │
                    │  • Render backdrop  │
                    │  • Render image     │
                    │  • Render controls  │
                    │  • Attach listeners │
                    │  • Lock body scroll │
                    └──────────┬──────────┘
                               │
┌────────────────────────────────────────────────────────────────────┐
│                      LIGHTBOX LAYOUT                                │
└────────────────────────────────────────────────────────────────────┘
                               │
                    ┌──────────▼──────────┐
                    │                     │
                    │  ┌───────────────┐  │
                    │  │  Close Button │  │ ← Top Right
                    │  │  (X icon)     │  │
                    │  └───────────────┘  │
                    │                     │
                    │  ┌─────────────┐    │
     Prev Arrow →   │  │             │    │  ← Next Arrow
     (Left side)    │  │    IMAGE    │    │  (Right side)
                    │  │  (Centered) │    │
                    │  │             │    │
                    │  └─────────────┘    │
                    │                     │
                    │  Caption & Metadata │ ← Bottom
                    │                     │
                    │  Thumbnail Strip    │ ← Bottom (Optional)
                    │  [▪][▪][■][▪][▪]    │
                    │                     │
                    └─────────────────────┘

┌────────────────────────────────────────────────────────────────────┐
│                      NAVIGATION CONTROLS                            │
└────────────────────────────────────────────────────────────────────┘

Method 1: KEYBOARD
──────────────────
┌────────┬────────────────────────────┐
│  Key   │  Action                    │
├────────┼────────────────────────────┤
│ ESC    │ Close lightbox             │
│ ←      │ Previous image             │
│ →      │ Next image                 │
│ SPACE  │ Next image                 │
│ HOME   │ First image                │
│ END    │ Last image                 │
└────────┴────────────────────────────┘

Method 2: MOUSE
───────────────
┌────────────────┬───────────────────┐
│  Action        │  Result           │
├────────────────┼───────────────────┤
│ Click X button │ Close lightbox    │
│ Click backdrop │ Close lightbox    │
│ Click < arrow  │ Previous image    │
│ Click > arrow  │ Next image        │
│ Click thumbnail│ Go to that image  │
└────────────────┴───────────────────┘

Method 3: TOUCH (Mobile)
────────────────────────
┌────────────────┬───────────────────┐
│  Gesture       │  Result           │
├────────────────┼───────────────────┤
│ Swipe left     │ Next image        │
│ Swipe right    │ Previous image    │
│ Tap backdrop   │ Close lightbox    │
│ Pinch zoom     │ Zoom in/out       │
└────────────────┴───────────────────┘

┌────────────────────────────────────────────────────────────────────┐
│                      IMAGE NAVIGATION LOGIC                         │
└────────────────────────────────────────────────────────────────────┘

Current State:
─────────────
images = [img1, img2, img3, img4, img5]  (5 images)
currentIndex = 2                          (viewing img3)

┌──────────────────────────────────────────────┐
│  Navigation Actions:                         │
├──────────────────────────────────────────────┤
│                                              │
│  PREVIOUS:                                   │
│  newIndex = (currentIndex - 1 + length) % 5  │
│  newIndex = (2 - 1 + 5) % 5 = 6 % 5 = 1      │
│  → Show img2                                 │
│                                              │
│  NEXT:                                       │
│  newIndex = (currentIndex + 1) % 5           │
│  newIndex = (2 + 1) % 5 = 3 % 5 = 3          │
│  → Show img4                                 │
│                                              │
│  WRAP-AROUND:                                │
│  At last image (index 4):                    │
│    Next → (4 + 1) % 5 = 0 → img1 (first)     │
│                                              │
│  At first image (index 0):                   │
│    Prev → (0 - 1 + 5) % 5 = 4 → img5 (last)  │
│                                              │
└──────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────┐
│                      STATE MANAGEMENT                               │
└────────────────────────────────────────────────────────────────────┘

Component State:
┌──────────────────────────────────────────┐
│ isOpen: boolean                          │
│ currentIndex: number                     │
│ images: Image[]                          │
│ isZoomed: boolean                        │
│ zoomLevel: number (1.0, 1.5, 2.0)        │
└──────────────────────────────────────────┘

State Flow:
┌─────────────┐   Click Image   ┌──────────────┐
│   CLOSED    │ ──────────────→ │     OPEN     │
│             │                 │              │
│ isOpen=false│                 │ isOpen=true  │
│             │                 │ index=clicked│
└─────────────┘                 └──────┬───────┘
      ▲                                │
      │                                │
      │ ESC / Click X                  │ Navigate
      │                                │
      │                         ┌──────▼───────┐
      │                         │  NAVIGATING  │
      │                         │              │
      │                         │ index changes│
      │                         │ image updates│
      │                         └──────────────┘
      │
      └────────────────────────

┌────────────────────────────────────────────────────────────────────┐
│                      IMAGE LOADING SEQUENCE                         │
└────────────────────────────────────────────────────────────────────┘

Step 1: User clicks image
      │
      ▼
Step 2: Lightbox opens with loading state
      │
      ┌──────────────────────┐
      │  ┌────────────────┐  │
      │  │                │  │
      │  │   [SPINNER]    │  │ ← Loading indicator
      │  │                │  │
      │  └────────────────┘  │
      └──────────────────────┘
      │
      ▼
Step 3: Image loads in background
      │
      ┌──────────────────────┐
      │  ┌────────────────┐  │
      │  │                │  │
      │  │ [Loading... 50%]   │ ← Progress bar (optional)
      │  │                │  │
      │  └────────────────┘  │
      └──────────────────────┘
      │
      ▼
Step 4: Image loaded and displayed
      │
      ┌──────────────────────┐
      │  ┌────────────────┐  │
      │  │                │  │
      │  │  [FULL IMAGE]  │  │ ← Image rendered
      │  │                │  │
      │  └────────────────┘  │
      │  Caption & Info      │
      └──────────────────────┘

Error Handling:
───────────────
      ┌──────────────────────┐
      │  ┌────────────────┐  │
      │  │  ⚠ Failed to   │  │
      │  │  load image    │  │ ← Error state
      │  │                │  │
      │  │  [Retry]       │  │ ← Retry button
      │  └────────────────┘  │
      └──────────────────────┘

┌────────────────────────────────────────────────────────────────────┐
│                      ACCESSIBILITY FLOW                             │
└────────────────────────────────────────────────────────────────────┘

On Open:
────────
1. Trap focus within lightbox
2. Move focus to close button
3. Lock body scroll (prevent background scrolling)
4. Announce to screen readers: "Viewing image 3 of 5"

During Navigation:
──────────────────
1. Update aria-live region: "Image 4 of 5"
2. Maintain focus on navigation controls
3. Update document title (optional)

On Close:
─────────
1. Restore focus to trigger element (thumbnail clicked)
2. Unlock body scroll
3. Remove lightbox from DOM
4. Announce: "Lightbox closed"

Focus Trap:
───────────
┌─────────────────────────────────────────┐
│  Focusable Elements in Order:           │
│                                         │
│  1. Close button (X)                    │
│  2. Previous arrow (<)                  │
│  3. Next arrow (>)                      │
│  4. Zoom controls (if enabled)          │
│  5. Thumbnail 1                         │
│  6. Thumbnail 2                         │
│  7. ...                                 │
│                                         │
│  TAB from last → wraps to first         │
│  SHIFT+TAB from first → wraps to last   │
└─────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────┐
│                      PERFORMANCE OPTIMIZATION                       │
└────────────────────────────────────────────────────────────────────┘

Strategy: Preload Adjacent Images
──────────────────────────────────

Current: Image 3
─────────────────
      [img1]  [img2]  [IMG3]  [img4]  [img5]
                       ↑
                   Currently
                   displayed
                       
Preload Strategy:
─────────────────
┌──────────────────────────────────────┐
│  Preload Priority:                   │
│                                      │
│  1. Current image (3) → Load NOW     │
│  2. Next image (4) → Preload HIGH    │
│  3. Previous image (2) → Preload MED │
│  4. Other images → Load on demand    │
└──────────────────────────────────────┘

Implementation:
───────────────
useEffect(() => {
  // Preload next image
  const nextIndex = (currentIndex + 1) % images.length;
  const nextImg = new Image();
  nextImg.src = images[nextIndex].url;
  
  // Preload previous image
  const prevIndex = (currentIndex - 1 + images.length) % images.length;
  const prevImg = new Image();
  prevImg.src = images[prevIndex].url;
}, [currentIndex]);

Benefits:
─────────
✅ Instant navigation to adjacent images
✅ Smooth user experience
✅ Reduced perceived loading time
✅ Better engagement metrics
```

---

## 🎨 Interactive Mermaid Diagrams

### Mermaid State Diagram (Lightbox States)

```mermaid
stateDiagram-v2
    [*] --> Closed: Page loads
    
    Closed --> Opening: User clicks thumbnail
    
    Opening --> Loading: Lightbox renders
    
    Loading --> ImageLoading: Fetch image
    
    ImageLoading --> Displayed: Image loaded
    ImageLoading --> Error: Load failed
    
    Error --> Displayed: Retry succeeded
    Error --> Closed: User closes
    
    Displayed --> Navigating: Arrow key pressed
    Displayed --> Zooming: Pinch gesture
    Displayed --> Closing: ESC or click backdrop
    
    Navigating --> ImageLoading: Load new image
    
    Zooming --> Displayed: Zoom complete
    
    Closing --> Closed: Animation complete
    Closed --> [*]
    
    note right of Opening
        Trap focus
        Lock body scroll
        Mount lightbox
    end note
    
    note right of Displayed
        Main viewing state
        All controls active
        Preload adjacent
    end note
    
    note right of Closing
        Release focus
        Unlock scroll
        Unmount lightbox
    end note
```

### Mermaid Flowchart (Navigation Logic)

```mermaid
flowchart TD
    A[User Action] --> B{What Action?}
    
    B -->|Click Next Arrow| C[Next Image]
    B -->|Click Prev Arrow| D[Previous Image]
    B -->|Press → Key| C
    B -->|Press ← Key| D
    B -->|Press ESC| E[Close Lightbox]
    B -->|Click Backdrop| E
    B -->|Press SPACE| C
    B -->|Swipe Left| C
    B -->|Swipe Right| D
    
    C --> F{At Last Image?}
    F -->|Yes| G[Wrap to First]
    F -->|No| H[currentIndex + 1]
    
    D --> I{At First Image?}
    I -->|Yes| J[Wrap to Last]
    I -->|No| K[currentIndex - 1]
    
    G --> L[Update State]
    H --> L
    J --> L
    K --> L
    
    L --> M[Preload Adjacent]
    M --> N[Render New Image]
    
    E --> O[Release Focus]
    O --> P[Unlock Body Scroll]
    P --> Q[Return to Gallery]
    
    style C fill:#e1f5ff,stroke:#01c3cc
    style D fill:#e1f5ff,stroke:#01c3cc
    style E fill:#fecaca,stroke:#ef4444
    style L fill:#dcfce7,stroke:#22c55e
    style M fill:#fef3c7,stroke:#f59e0b
```

### Mermaid Sequence Diagram (User Interaction)

```mermaid
sequenceDiagram
    participant U as User
    participant G as Gallery
    participant L as Lightbox
    participant I as Image
    participant K as Keyboard
    
    U->>G: Click thumbnail #3
    G->>L: openLightbox(index: 3)
    
    Note over L: Mount component<br/>Trap focus<br/>Lock scroll
    
    L->>I: Load image #3
    I-->>L: Image loaded
    L->>U: Display image
    
    Note over L: Preload #2 and #4
    
    U->>K: Press → arrow
    K->>L: Navigate next
    L->>L: currentIndex = 4
    L->>I: Load image #4
    I-->>L: Image loaded (preloaded)
    L->>U: Display instantly ⚡
    
    Note over L: Preload #3 and #5
    
    U->>K: Press ESC
    K->>L: Close lightbox
    
    Note over L: Release focus<br/>Unlock scroll<br/>Unmount
    
    L->>G: Return focus to thumbnail
    L->>U: Back to gallery
```

---

## Usage

### Basic Usage

```tsx
import { Lightbox } from './components/ui/Lightbox';

<Lightbox 
  images={images}
  currentIndex={currentIndex}
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  onNavigate={setCurrentIndex}
/>
```

### With Portfolio Entry

```tsx
const [lightboxOpen, setLightboxOpen] = useState(false);
const [currentImageIndex, setCurrentImageIndex] = useState(0);

<PortfolioCard 
  entry={entry}
  onClick={() => {
    setCurrentImageIndex(0);
    setLightboxOpen(true);
  }}
/>

<Lightbox 
  images={entry.images}
  currentIndex={currentImageIndex}
  isOpen={lightboxOpen}
  onClose={() => setLightboxOpen(false)}
  onNavigate={setCurrentImageIndex}
  title={entry.title}
  description={entry.description}
/>
```

---

## Props

```typescript
interface LightboxProps {
  /**
   * Array of image URLs
   * @required
   */
  images: string[];
  
  /**
   * Current image index
   * @required
   */
  currentIndex: number;
  
  /**
   * Whether lightbox is open
   * @required
   */
  isOpen: boolean;
  
  /**
   * Close handler
   * @required
   */
  onClose: () => void;
  
  /**
   * Navigation handler
   * @required
   */
  onNavigate: (index: number) => void;
  
  /**
   * Image title/caption
   * @optional
   */
  title?: string;
  
  /**
   * Image description
   * @optional
   */
  description?: string;
  
  /**
   * Show thumbnail strip
   * @default true
   */
  showThumbnails?: boolean;
  
  /**
   * Enable zoom
   * @default true
   */
  enableZoom?: boolean;
  
  /**
   * Additional CSS classes
   * @default ""
   */
  className?: string;
}
```

---

## Features

### Keyboard Controls

```typescript
useEffect(() => {
  if (!isOpen) return;
  
  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'Escape':
        onClose();
        break;
      case 'ArrowLeft':
        navigatePrevious();
        break;
      case 'ArrowRight':
        navigateNext();
        break;
      case ' ':
        e.preventDefault();
        navigateNext();
        break;
    }
  };
  
  document.addEventListener('keydown', handleKeyDown);
  return () => document.removeEventListener('keydown', handleKeyDown);
}, [isOpen, currentIndex]);
```

### Touch Gesture Support

```typescript
const [touchStart, setTouchStart] = useState(0);
const [touchEnd, setTouchEnd] = useState(0);

const handleTouchStart = (e: React.TouchEvent) => {
  setTouchStart(e.touches[0].clientX);
};

const handleTouchMove = (e: React.TouchEvent) => {
  setTouchEnd(e.touches[0].clientX);
};

const handleTouchEnd = () => {
  if (touchStart - touchEnd > 50) {
    navigateNext();
  }
  if (touchStart - touchEnd < -50) {
    navigatePrevious();
  }
};
```

### Image Zoom

```typescript
const [isZoomed, setIsZoomed] = useState(false);

const handleImageClick = () => {
  setIsZoomed(!isZoomed);
};
```

### Prevent Body Scroll

```typescript
useEffect(() => {
  if (isOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
  
  return () => {
    document.body.style.overflow = '';
  };
}, [isOpen]);
```

---

## Implementation Example

Complete lightbox implementation:

```tsx
import React, { useState, useEffect } from 'react';
import { X, CaretLeft, CaretRight, MagnifyingGlassPlus, MagnifyingGlassMinus } from '@phosphor-icons/react';

interface LightboxProps {
  images: string[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
  title?: string;
  description?: string;
  showThumbnails?: boolean;
  enableZoom?: boolean;
}

export function Lightbox({ 
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
  title,
  description,
  showThumbnails = true,
  enableZoom = true
}: LightboxProps) {
  const [isZoomed, setIsZoomed] = useState(false);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setIsZoomed(false);
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Keyboard controls
  useEffect(() => {
    if (!isOpen) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          navigatePrevious();
          break;
        case 'ArrowRight':
          navigateNext();
          break;
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex]);

  const navigatePrevious = () => {
    onNavigate(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
    setIsZoomed(false);
  };

  const navigateNext = () => {
    onNavigate(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
    setIsZoomed(false);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="fixed top-4 right-4 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
        aria-label="Close lightbox"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Image counter */}
      <div className="fixed top-4 left-4 z-50 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full text-white font-body text-fluid-sm">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Zoom toggle */}
      {enableZoom && (
        <button
          onClick={() => setIsZoomed(!isZoomed)}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full text-white flex items-center gap-2 hover:bg-black/60 transition-colors"
          aria-label={isZoomed ? 'Zoom out' : 'Zoom in'}
        >
          {isZoomed ? <MagnifyingGlassMinus className="w-5 h-5" /> : <MagnifyingGlassPlus className="w-5 h-5" />}
        </button>
      )}

      {/* Main image */}
      <div className="absolute inset-0 flex items-center justify-center p-4 md:p-8">
        <img
          src={images[currentIndex]}
          alt={title || `Image ${currentIndex + 1}`}
          className={`
            max-w-full max-h-full object-contain
            transition-transform duration-300
            ${isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'}
          `}
          onClick={() => enableZoom && setIsZoomed(!isZoomed)}
        />
      </div>

      {/* Navigation arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={navigatePrevious}
            className="fixed left-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            aria-label="Previous image"
          >
            <CaretLeft className="w-6 h-6 md:w-8 md:h-8" />
          </button>
          
          <button
            onClick={navigateNext}
            className="fixed right-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            aria-label="Next image"
          >
            <CaretRight className="w-6 h-6 md:w-8 md:h-8" />
          </button>
        </>
      )}

      {/* Caption */}
      {(title || description) && (
        <div className="fixed bottom-24 md:bottom-32 left-0 right-0 z-50 px-4 md:px-8">
          <div className="max-w-4xl mx-auto bg-black/50 backdrop-blur-sm rounded-2xl p-6 text-white">
            {title && (
              <h3 className="text-fluid-lg font-heading font-semibold mb-2">
                {title}
              </h3>
            )}
            {description && (
              <p className="text-fluid-sm font-body text-gray-300">
                {description}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Thumbnail strip */}
      {showThumbnails && images.length > 1 && (
        <div className="fixed bottom-4 left-0 right-0 z-50 px-4">
          <div className="flex gap-2 overflow-x-auto max-w-4xl mx-auto py-2 px-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => onNavigate(index)}
                className={`
                  flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden
                  transition-all duration-300
                  ${index === currentIndex
                    ? 'ring-4 ring-pink-500 scale-110'
                    : 'ring-2 ring-white/30 hover:ring-white/60 opacity-60 hover:opacity-100'
                  }
                `}
                aria-label={`View image ${index + 1}`}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Backdrop click to close */}
      <div 
        className="absolute inset-0 -z-10"
        onClick={onClose}
        aria-hidden="true"
      />
    </div>
  );
}
```

---

## Usage Patterns

### Portfolio Gallery

```tsx
function PortfolioGallery({ entry }: Props) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {entry.images.map((image, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentIndex(index);
              setLightboxOpen(true);
            }}
            className="aspect-square overflow-hidden rounded-lg hover:scale-105 transition-transform"
          >
            <img 
              src={image}
              alt={`${entry.title} image ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
      
      <Lightbox 
        images={entry.images}
        currentIndex={currentIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={setCurrentIndex}
        title={entry.title}
        description={entry.description}
      />
    </>
  );
}
```

### Blog Post Images

```tsx
function BlogPost({ post }: Props) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  
  return (
    <article className="prose max-w-none">
      <div 
        className="cursor-pointer"
        onClick={() => {
          setCurrentImage(0);
          setLightboxOpen(true);
        }}
      >
        <img 
          src={post.featuredImage}
          alt={post.title}
          className="rounded-2xl"
        />
      </div>
      
      <Lightbox 
        images={[post.featuredImage, ...post.galleryImages]}
        currentIndex={currentImage}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={setCurrentImage}
        title={post.title}
      />
    </article>
  );
}
```

---

## Advanced Features

### With Download Button

```tsx
<button
  onClick={() => {
    const link = document.createElement('a');
    link.href = images[currentIndex];
    link.download = `image-${currentIndex + 1}.jpg`;
    link.click();
  }}
  className="fixed top-20 right-4 z-50 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full text-white"
>
  <Download className="w-5 h-5" />
</button>
```

### With Share Button

```tsx
import { ShareComponent } from './ShareComponent';

<div className="fixed top-20 right-4 z-50">
  <ShareComponent 
    variant="compact"
    title={title}
    url={images[currentIndex]}
  />
</div>
```

### With Image Info

```tsx
<div className="fixed bottom-4 left-4 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full text-white text-fluid-xs">
  {imageMetadata.width} × {imageMetadata.height}
</div>
```

---

## Accessibility

### Focus Trap

```tsx
useEffect(() => {
  if (!isOpen) return;
  
  const focusableElements = dialogRef.current?.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  const firstElement = focusableElements?.[0] as HTMLElement;
  const lastElement = focusableElements?.[focusableElements.length - 1] as HTMLElement;
  
  const handleTab = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return;
    
    if (e.shiftKey && document.activeElement === firstElement) {
      e.preventDefault();
      lastElement?.focus();
    } else if (!e.shiftKey && document.activeElement === lastElement) {
      e.preventDefault();
      firstElement?.focus();
    }
  };
  
  document.addEventListener('keydown', handleTab);
  return () => document.removeEventListener('keydown', handleTab);
}, [isOpen]);
```

### ARIA Attributes

```tsx
<div
  role="dialog"
  aria-modal="true"
  aria-label="Image lightbox"
  aria-describedby="lightbox-caption"
>
  <img 
    src={currentImage}
    alt={imageAlt}
    aria-describedby="image-counter"
  />
  
  <div id="image-counter">
    Image {currentIndex + 1} of {images.length}
  </div>
  
  <div id="lightbox-caption">
    {title}
  </div>
</div>
```

---

## Common Mistakes

### ❌ Mistake 1: Not Preventing Body Scroll

```tsx
// ❌ WRONG - Page scrolls behind lightbox
{isOpen && <Lightbox />}
```

**Solution:**
```tsx
// ✅ CORRECT - Prevent scroll
useEffect(() => {
  document.body.style.overflow = isOpen ? 'hidden' : '';
}, [isOpen]);
```

### ❌ Mistake 2: Missing Keyboard Controls

```tsx
// ❌ WRONG - Mouse-only navigation
<button onClick={navigateNext}>Next</button>
```

**Solution:**
```tsx
// ✅ CORRECT - Keyboard support
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') navigateNext();
    if (e.key === 'ArrowLeft') navigatePrevious();
    if (e.key === 'Escape') onClose();
  };
  
  document.addEventListener('keydown', handleKeyDown);
  return () => document.removeEventListener('keydown', handleKeyDown);
}, []);
```

---

## Related Components

- **[PortfolioCard](./PortfolioCard.md)** - Portfolio items
- **[ShareComponent](./ShareComponent.md)** - Social sharing

---

## Related Documentation

- **[Guidelines.md](../Guidelines.md)** - Main guidelines
- **[overview-components.md](../overview-components.md)** - Component system
- **[overview-icons.md](../overview-icons.md)** - Icon system
- **[FILE_STRUCTURE.md](../FILE_STRUCTURE.md)** - File organization
- **[design-tokens/spacing.md](../design-tokens/spacing.md)** - Spacing system

---

**Last Updated:** January 2025  
**Version:** 4.0.0