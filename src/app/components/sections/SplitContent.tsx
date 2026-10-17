/**
 * @fileoverview SplitContent component for image-text split layouts
 *
 * Renders a responsive two-column layout with an image on one side
 * and text content on the other. Supports even (50/50) and image-emphasis
 * (60/40) splits, with configurable image side (left or right).
 *
 * @component SplitContent
 * @version 1.0.0
 *
 * @example
 * <SplitContent
 *   imageUrl={heroImg}
 *   imageAlt="Ash painting at a festival"
 *   imageSide="left"
 *   variant="even"
 * >
 *   <h3>ADHD — Wired Different</h3>
 *   <p>It's not a deficit of attention...</p>
 * </SplitContent>
 *
 * @accessibility
 * - Image requires alt text for screen readers
 * - Stacks vertically on mobile (image first)
 * - Content maintains reading order in DOM
 */

import React from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

/**
 * Props for the SplitContent component
 */
interface SplitContentProps {
  /** Image source URL */
  imageUrl: string;
  /** Image alt text (required for accessibility) */
  imageAlt: string;
  /** Which side the image appears on (desktop). Default: 'left' */
  imageSide?: 'left' | 'right';
  /** Split ratio variant. Default: 'even' */
  variant?: 'even' | 'image-emphasis';
  /** Text content (rendered on the opposite side of the image) */
  children: React.ReactNode;
}

/**
 * SplitContent component — responsive image-text split layout
 */
export function SplitContent(props: SplitContentProps) {
  var imageUrl = props.imageUrl;
  var imageAlt = props.imageAlt;
  var imageSide = props.imageSide ? props.imageSide : 'left';
  var variant = props.variant ? props.variant : 'even';
  var children = props.children;

  var variantClass = variant === 'image-emphasis' ? 'split-layout--image-emphasis' : '';
  var sideClass = imageSide === 'right' ? 'split-layout--right' : '';
  var rootClass = ['split-layout', 'section-container', variantClass, sideClass].filter(Boolean).join(' ');

  return (
    <div className={rootClass}>
      <div className="split-layout__image">
        <ImageWithFallback
          src={imageUrl}
          alt={imageAlt}
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="split-layout__content section-container">
        {children}
      </div>
    </div>
  );
}
