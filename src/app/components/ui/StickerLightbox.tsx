/**
 * @fileoverview Sticker Lightbox Component
 * 
 * Full-screen modal for viewing sticker graphics with keyboard navigation,
 * prev/next controls, and click-outside-to-close functionality.
 * 
 * Features:
 * - Keyboard navigation (Escape, Arrow Left/Right)
 * - Body scroll locking while open
 * - Desktop absolute-positioned nav buttons
 * - Mobile nav row at bottom
 * - Click backdrop to close
 * 
 * @component StickerLightbox
 * @version 1.0.0
 */

import React, { useEffect, useCallback, useRef } from 'react';
import { X, CaretLeft, CaretRight } from '@phosphor-icons/react';
import type { StickerGraphic } from '../../data/mock/images/sticker-graphics';
import { stickersPageUI } from '../../data/mock/ui/stickers';
import { OptimizedImage } from './OptimizedImage';
import '../../../styles/blocks/sticker-lightbox.css';

/**
 * Props for StickerLightbox component
 */
export interface StickerLightboxProps {
  /** Array of sticker graphics to display */
  stickers: StickerGraphic[];
  /** Index of currently active sticker */
  activeIndex: number;
  /** Close lightbox callback */
  onClose: () => void;
  /** Navigate to previous sticker */
  onPrev: () => void;
  /** Navigate to next sticker */
  onNext: () => void;
}

/**
 * Sticker Lightbox Component
 * 
 * @example
 * ```tsx
 * <StickerLightbox
 *   stickers={filteredStickers}
 *   activeIndex={selectedIndex}
 *   onClose={() => setLightboxOpen(false)}
 *   onPrev={handlePrev}
 *   onNext={handleNext}
 * />
 * ```
 */
export function StickerLightbox({
  stickers,
  activeIndex,
  onClose,
  onPrev,
  onNext,
}: StickerLightboxProps) {
  var backdropRefInit: HTMLDivElement | null = null;
  var backdropRef = useRef(backdropRefInit);
  var current = stickers[activeIndex];

  /* ── Keyboard navigation ── */
  useEffect(function () {
    var handler = function (e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handler);
    return function () {
      window.removeEventListener('keydown', handler);
    };
  }, [onClose, onPrev, onNext]);

  /* ── Lock body scroll ── */
  useEffect(function () {
    document.body.style.overflow = 'hidden';
    return function () {
      document.body.style.overflow = '';
    };
  }, []);

  /* ── Click-outside to close ── */
  var handleBackdropClick = useCallback(
    function (e: React.MouseEvent) {
      if (e.target === backdropRef.current) onClose();
    },
    [onClose],
  );

  return (
    <div
      className="sticker-lightbox"
      ref={backdropRef}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label={current.label}
    >
      <div className="sticker-lightbox__inner">
        {/* Close */}
        <button
          type="button"
          className="sticker-lightbox__close"
          onClick={onClose}
          aria-label={stickersPageUI.lightbox.closeLabel}
        >
          <X size={20} />
        </button>

        {/* Prev (desktop — absolute positioned) */}
        <button
          type="button"
          className="sticker-lightbox__nav sticker-lightbox__nav--prev sticker-lightbox__nav--desktop"
          onClick={onPrev}
          aria-label={stickersPageUI.lightbox.prevLabel}
        >
          <CaretLeft size={22} />
        </button>

        {/* Polaroid */}
        <div className="sticker-lightbox__polaroid" key={current.id}>
          <div className="sticker-lightbox__image-frame">
            <OptimizedImage
              src={current.src}
              alt={current.alt}
              preset="gallery"
              className="sticker-lightbox__image"
            />
          </div>
          <span className="sticker-lightbox__label">{current.label}</span>
        </div>

        {/* Next (desktop — absolute positioned) */}
        <button
          type="button"
          className="sticker-lightbox__nav sticker-lightbox__nav--next sticker-lightbox__nav--desktop"
          onClick={onNext}
          aria-label={stickersPageUI.lightbox.nextLabel}
        >
          <CaretRight size={22} />
        </button>

        {/* Mobile nav row */}
        <div className="sticker-lightbox__nav-row">
          <button
            type="button"
            className="sticker-lightbox__nav"
            onClick={onPrev}
            aria-label={stickersPageUI.lightbox.prevLabel}
          >
            <CaretLeft size={22} />
          </button>
          <span className="sticker-lightbox__counter" aria-live="polite">
            {activeIndex + 1} / {stickers.length}
          </span>
          <button
            type="button"
            className="sticker-lightbox__nav"
            onClick={onNext}
            aria-label={stickersPageUI.lightbox.nextLabel}
          >
            <CaretRight size={22} />
          </button>
        </div>
      </div>
    </div>
  );
}
