/**
 * @fileoverview ImageGallery — Reusable responsive image gallery component
 *
 * Supports grid, masonry, and justified layouts with lazy loading,
 * lightbox integration (via onImageClick callback), hover effects,
 * optional captions, and full accessibility compliance (WCAG AA).
 *
 * Uses BEM classes from `/styles/blocks/image-gallery.css`.
 * Column layout is driven by data-cols-* attributes — no inline styles.
 *
 * @component ImageGallery
 * @version 1.0.0
 * @see /guidelines/components/ImageGallery.md
 */

import React from 'react';
import { MagnifyingGlassPlus } from '@phosphor-icons/react';
import '../../../styles/blocks/image-gallery.css';

/* ─────────────────────────────────────────────────────────────
   Types
   ───────────────────────────────────────────────────────────── */

export interface GalleryImage {
  /** Image source URL */
  url: string;
  /** Accessible alt text */
  alt?: string;
  /** Optional caption shown below the image */
  caption?: string;
  /** Optional lower-resolution thumbnail (falls back to url) */
  thumbnail?: string;
}

export interface ImageGalleryColumns {
  /** Columns on small screens (< 768 px). Default: 1 */
  sm?: number;
  /** Columns on medium screens (>= 768 px). Default: 2 */
  md?: number;
  /** Columns on large screens (>= 1024 px). Default: 3 */
  lg?: number;
}

export interface ImageGalleryProps {
  /**
   * Array of image URL strings OR GalleryImage objects.
   * @required
   */
  images: string[] | GalleryImage[];

  /**
   * Gallery layout type.
   * - `grid`     — CSS Grid, equal-height rows, fixed aspect ratios
   * - `masonry`  — CSS Columns, variable-height Pinterest style
   * - `justified`— Flex rows, consistent row height, variable widths
   * @default "grid"
   */
  layout?: 'grid' | 'masonry' | 'justified';

  /**
   * Responsive column counts per breakpoint.
   * @default { sm: 1, md: 2, lg: 3 }
   */
  columns?: ImageGalleryColumns;

  /**
   * Gap between images.
   * @default "md"
   */
  gap?: 'sm' | 'md' | 'lg';

  /**
   * Callback fired when an image is clicked.
   * Receives the zero-based index of the clicked image.
   * Wire to an EnhancedLightbox for full-screen viewing.
   * @optional
   */
  onImageClick?: (index: number) => void;

  /**
   * Show captions beneath each image (requires caption field on GalleryImage).
   * @default false
   */
  showCaptions?: boolean;

  /**
   * Enable native lazy loading on all images.
   * @default true
   */
  lazyLoad?: boolean;

  /**
   * Aspect ratio enforced on each cell in grid layout.
   * Has no effect in masonry or justified layouts.
   * @default "square"
   */
  aspectRatio?: 'square' | '4/3' | '16/9' | 'auto';

  /**
   * Extra BEM modifier or utility class appended to the root element.
   * @default ""
   */
  className?: string;

  /**
   * Accessible label for the gallery landmark region.
   * @default "Image gallery"
   */
  ariaLabel?: string;
}

/* ─────────────────────────────────────────────────────────────
   Private helpers
   ───────────────────────────────────────────────────────────── */

/** Normalise a mixed string/GalleryImage array into GalleryImage[]. */
function normaliseImages(raw: string[] | GalleryImage[]): GalleryImage[] {
  var result: GalleryImage[] = [];
  for (var i = 0; i < raw.length; i++) {
    var item = raw[i];
    if (typeof item === 'string') {
      result.push({ url: item });
    } else {
      result.push(item as GalleryImage);
    }
  }
  return result;
}

/** Map an aspectRatio string to its BEM figure modifier class. */
function getAspectClass(ratio: string): string {
  if (ratio === 'square') { return 'image-gallery__figure--square'; }
  if (ratio === '4/3') { return 'image-gallery__figure--landscape'; }
  if (ratio === '16/9') { return 'image-gallery__figure--video'; }
  return '';
}

/** Return the alt text for a GalleryImage, with a human-readable fallback. */
function getAlt(image: GalleryImage, index: number): string {
  if (image.alt) { return image.alt; }
  return 'Gallery image ' + String(index + 1);
}

/** Return the aria-label for a clickable image button. */
function getButtonLabel(image: GalleryImage, index: number): string {
  if (image.alt) { return 'View ' + image.alt + ' in full size'; }
  return 'View image ' + String(index + 1) + ' in full size';
}

/* ─────────────────────────────────────────────────────────────
   Component
   ───────────────────────────────────────────────────────────── */

/**
 * Responsive image gallery with grid, masonry, and justified layouts.
 *
 * @example — Grid with lightbox
 * ```tsx
 * const [lightboxOpen, setLightboxOpen] = useState(false);
 * const [currentIndex, setCurrentIndex] = useState(0);
 *
 * <ImageGallery
 *   images={portfolioEntry.images}
 *   layout="grid"
 *   onImageClick={function(i) { setCurrentIndex(i); setLightboxOpen(true); }}
 * />
 * <EnhancedLightbox isOpen={lightboxOpen} ... />
 * ```
 *
 * @example — Masonry display-only
 * ```tsx
 * <ImageGallery
 *   images={galleryImages}
 *   layout="masonry"
 *   columns={{ sm: 1, md: 2, lg: 3 }}
 *   showCaptions={true}
 * />
 * ```
 */
export function ImageGallery(props: ImageGalleryProps) {
  var layout = props.layout ? props.layout : 'grid';
  var gap = props.gap ? props.gap : 'md';
  var lazyLoad = (props.lazyLoad !== undefined) ? props.lazyLoad : true;
  var showCaptions = props.showCaptions ? props.showCaptions : false;
  var aspectRatio = props.aspectRatio ? props.aspectRatio : 'square';
  var ariaLabel = props.ariaLabel ? props.ariaLabel : 'Image gallery';
  var extraClass = props.className ? props.className : '';
  var onImageClick = props.onImageClick ? props.onImageClick : null;

  var colsSm = (props.columns && props.columns.sm) ? props.columns.sm : 1;
  var colsMd = (props.columns && props.columns.md) ? props.columns.md : 2;
  var colsLg = (props.columns && props.columns.lg) ? props.columns.lg : 3;

  var images = normaliseImages(props.images);

  /* Container class string — built without template literals */
  var containerClass = 'image-gallery';
  containerClass += ' image-gallery--' + layout;
  containerClass += ' image-gallery--gap-' + gap;
  if (extraClass) {
    containerClass += ' ' + extraClass;
  }

  /* Aspect ratio modifier used on each grid figure */
  var aspectClass = getAspectClass(aspectRatio);

  return (
    <div
      className={containerClass}
      role="list"
      aria-label={ariaLabel}
      data-cols-sm={colsSm}
      data-cols-md={colsMd}
      data-cols-lg={colsLg}
    >
      {images.map(function (image, index) {
        var figureClass = 'image-gallery__figure';
        if (layout === 'grid' && aspectClass) {
          figureClass += ' ' + aspectClass;
        }

        var loadAttr: 'lazy' | undefined = lazyLoad ? 'lazy' : undefined;
        var altText = getAlt(image, index);
        var buttonLabel = getButtonLabel(image, index);

        return (
          <figure
            key={index}
            className="image-gallery__item"
            role="listitem"
          >
            {onImageClick ? (
              <button
                type="button"
                className="image-gallery__btn"
                onClick={function () { onImageClick(index); }}
                onKeyDown={function (e) {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onImageClick(index);
                  }
                }}
                aria-label={buttonLabel}
              >
                <div className={figureClass}>
                  <img
                    className="image-gallery__img"
                    src={image.url}
                    alt={altText}
                    loading={loadAttr}
                  />
                  <div className="image-gallery__overlay" aria-hidden="true">
                    <div className="image-gallery__overlay-icon">
                      <MagnifyingGlassPlus className="image-gallery__overlay-svg" aria-hidden="true" />
                    </div>
                  </div>
                </div>
              </button>
            ) : (
              <div className={figureClass}>
                <img
                  className="image-gallery__img"
                  src={image.url}
                  alt={altText}
                  loading={loadAttr}
                />
              </div>
            )}

            {showCaptions && image.caption ? (
              <figcaption className="image-gallery__caption">
                {image.caption}
              </figcaption>
            ) : null}
          </figure>
        );
      })}
    </div>
  );
}