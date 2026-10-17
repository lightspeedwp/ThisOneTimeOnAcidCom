# Interface Icons

UI control, navigation, and system icons for the Ash Shaw Makeup Portfolio interface.

> **Note:** All icons now use `@phosphor-icons/react`. Lucide has been fully replaced. See [iconography.md](../design-tokens/iconography.md) for the complete Phosphor weight and size system.

## 📋 Available Icons

### Navigation & Menu

#### List (Menu)
**Usage:** Open mobile menu, hamburger menu

```tsx
import { List } from '@phosphor-icons/react';

<button 
  className="lg:hidden"
  aria-label="Open navigation menu"
  onClick={openMenu}
>
  <List size={24} weight="regular" />
</button>
```

#### X (Close)
**Usage:** Close menu, dismiss modal, remove item

```tsx
import { X } from '@phosphor-icons/react';

<button 
  aria-label="Close menu"
  onClick={closeMenu}
  className="absolute top-4 right-4"
>
  <X size={24} weight="regular" />
</button>
```

#### CaretDown
**Usage:** Dropdown indicators, expandable sections

```tsx
import { CaretDown } from '@phosphor-icons/react';

<button className="flex items-center gap-2">
  <span>Categories</span>
  <CaretDown size={16} weight="regular" />
</button>
```

#### CaretUp
**Usage:** Collapse sections, scroll up indicators

```tsx
import { CaretUp } from '@phosphor-icons/react';

<button className="flex items-center gap-2">
  <span>Show Less</span>
  <CaretUp size={16} weight="regular" />
</button>
```

#### CaretLeft / CaretRight
**Usage:** Carousel navigation, pagination

```tsx
import { CaretLeft, CaretRight } from '@phosphor-icons/react';

<div className="flex items-center gap-2">
  <button aria-label="Previous">
    <CaretLeft size={24} weight="regular" />
  </button>
  
  <button aria-label="Next">
    <CaretRight size={24} weight="regular" />
  </button>
</div>
```

#### ArrowUp / ArrowDown
**Usage:** Scroll indicators, sort directions

```tsx
import { ArrowUp, ArrowDown } from '@phosphor-icons/react';

// Scroll to top button
<button aria-label="Scroll to top">
  <ArrowUp size={20} weight="regular" />
</button>

// Scroll down arrow
<button aria-label="Scroll down">
  <ArrowDown size={20} weight="regular" />
</button>
```

#### ArrowLeft / ArrowRight
**Usage:** Back navigation, slide navigation

```tsx
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react';

<button className="flex items-center gap-2">
  <ArrowLeft size={16} weight="regular" />
  <span>Back to Portfolio</span>
</button>
```

### Content Actions

#### Heart
**Usage:** Favorites, likes, save items

```tsx
import { Heart } from '@phosphor-icons/react';

<button aria-label="Add to favorites">
  <Heart size={24} weight={isFavorite ? 'fill' : 'regular'} />
</button>
```

#### Star
**Usage:** Ratings, featured items, highlights

```tsx
import { Star } from '@phosphor-icons/react';

<div className="flex gap-1">
  {[1, 2, 3, 4, 5].map(function(star) {
    return (
      <Star 
        key={star}
        size={20}
        weight={star <= rating ? 'fill' : 'regular'}
      />
    );
  })}
</div>
```

#### BookmarkSimple
**Usage:** Save for later, bookmarks

```tsx
import { BookmarkSimple } from '@phosphor-icons/react';

<button aria-label="Bookmark this article">
  <BookmarkSimple size={20} weight="regular" />
</button>
```

#### ShareNetwork
**Usage:** Share content, social sharing

```tsx
import { ShareNetwork } from '@phosphor-icons/react';

<button className="flex items-center gap-2">
  <ShareNetwork size={20} weight="regular" />
  <span>Share</span>
</button>
```

#### Link
**Usage:** Copy link, external links

```tsx
import { Link } from '@phosphor-icons/react';

<button className="flex items-center gap-2" onClick={copyLink}>
  <Link size={16} weight="regular" />
  <span>Copy Link</span>
</button>
```

### Search & Filter

#### MagnifyingGlass
**Usage:** Search bars, search buttons

```tsx
import { MagnifyingGlass } from '@phosphor-icons/react';

<div className="relative">
  <input 
    type="text"
    placeholder="Search portfolio..."
    className="pl-10 pr-4 py-2 rounded-lg border"
  />
  <MagnifyingGlass size={20} weight="regular" className="absolute left-3 top-1/2 -translate-y-1/2" />
</div>
```

#### SlidersHorizontal
**Usage:** Filter controls, advanced search

```tsx
import { SlidersHorizontal } from '@phosphor-icons/react';

<button className="flex items-center gap-2">
  <SlidersHorizontal size={20} weight="regular" />
  <span>Filter</span>
</button>
```

#### X (Clear)
**Usage:** Clear search, reset filters

```tsx
import { X } from '@phosphor-icons/react';

<button aria-label="Clear search">
  <X size={16} weight="regular" />
</button>
```

### Layout & View

#### SquaresFour
**Usage:** Grid view toggle

```tsx
import { SquaresFour } from '@phosphor-icons/react';

<button aria-label="Grid view" aria-pressed={viewMode === 'grid'}>
  <SquaresFour size={20} weight="regular" />
</button>
```

#### List
**Usage:** List view toggle

```tsx
import { List } from '@phosphor-icons/react';

<button aria-label="List view" aria-pressed={viewMode === 'list'}>
  <List size={20} weight="regular" />
</button>
```

#### Eye
**Usage:** View count, preview, visibility

```tsx
import { Eye } from '@phosphor-icons/react';

<span className="flex items-center gap-1">
  <Eye size={16} weight="regular" />
  1,234 views
</span>
```

#### EyeSlash
**Usage:** Hide content, privacy settings

```tsx
import { EyeSlash } from '@phosphor-icons/react';

<button aria-label="Hide password">
  <EyeSlash size={20} weight="regular" />
</button>
```

### Status & Feedback

#### Check
**Usage:** Success states, completed items

```tsx
import { Check } from '@phosphor-icons/react';

<div className="flex items-center gap-2">
  <Check size={12} weight="bold" />
  <span>Email sent successfully</span>
</div>
```

#### CheckCircle
**Usage:** Success messages, confirmation

```tsx
import { CheckCircle } from '@phosphor-icons/react';

<div className="flex items-center gap-2">
  <CheckCircle size={24} weight="fill" />
  <span>Form submitted successfully!</span>
</div>
```

#### Warning
**Usage:** Warnings, errors, critical alerts

```tsx
import { Warning } from '@phosphor-icons/react';

<div className="flex items-center gap-2">
  <Warning size={20} weight="fill" />
  <span>Please review your information</span>
</div>
```

#### Info
**Usage:** Information tooltips, help text

```tsx
import { Info } from '@phosphor-icons/react';

<button aria-label="More information">
  <Info size={20} weight="regular" />
</button>
```

#### SpinnerGap
**Usage:** Loading states, processing

```tsx
import { SpinnerGap } from '@phosphor-icons/react';

<div className="flex items-center gap-2">
  <SpinnerGap size={20} weight="bold" className="animate-spin" />
  <span>Loading...</span>
</div>
```

### Form & Input

#### Envelope
**Usage:** Email fields, contact forms

```tsx
import { Envelope } from '@phosphor-icons/react';

<div className="relative">
  <Envelope size={20} weight="regular" className="absolute left-3 top-1/2 -translate-y-1/2" />
  <input type="email" placeholder="your@email.com" className="pl-10 pr-4 py-2 rounded-lg border" />
</div>
```

#### ChatCircle
**Usage:** Comments, messaging, WhatsApp

```tsx
import { ChatCircle } from '@phosphor-icons/react';

<a href="https://wa.me/1234567890" className="flex items-center gap-2">
  <ChatCircle size={20} weight="regular" />
  <span>WhatsApp</span>
</a>
```

#### PaperPlaneRight
**Usage:** Submit buttons, send messages

```tsx
import { PaperPlaneRight } from '@phosphor-icons/react';

<button className="flex items-center gap-2">
  <span>Send Message</span>
  <PaperPlaneRight size={16} weight="regular" />
</button>
```

### Media

#### Image
**Usage:** Gallery indicators, image content

```tsx
import { Image } from '@phosphor-icons/react';

<Image size={24} weight="regular" />
```

#### Play
**Usage:** Play video/audio, start action

```tsx
import { Play } from '@phosphor-icons/react';

<button aria-label="Play video">
  <Play size={24} weight="fill" />
</button>
```

### Content Organization

#### FolderOpen
**Usage:** Categories, collections

```tsx
import { FolderOpen } from '@phosphor-icons/react';

<button className="flex items-center gap-2">
  <FolderOpen size={20} weight="regular" />
  <span>Festival Makeup</span>
</button>
```

#### Tag
**Usage:** Tags, keywords, categories

```tsx
import { Tag } from '@phosphor-icons/react';

<div className="flex items-center gap-2">
  <Tag size={16} weight="regular" />
  <span>UV Makeup</span>
</div>
```

#### FileText
**Usage:** Blog posts, documents, articles

```tsx
import { FileText } from '@phosphor-icons/react';

<div className="flex items-center gap-2">
  <FileText size={20} weight="regular" />
  <span>Blog Post</span>
</div>
```

---

## Related Documentation

- **[overview-icons.md](../overview-icons.md)** - Icon system overview
- **[iconography.md](../design-tokens/iconography.md)** - Phosphor design tokens
- **[travel.md](./travel.md)** - Travel and location icons
- **[Guidelines.md](../Guidelines.md)** - Main guidelines

---

**Last Updated:** March 2026  
**Version:** 4.0.0 (Phosphor migration complete)