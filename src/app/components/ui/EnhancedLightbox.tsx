/**
 * @fileoverview Enhanced Mobile-Optimized Lightbox with Video Support
 * Advanced lightbox modal featuring video support, prominent slider arrows, pagination dots, and mobile-first design
 * 
 * @author Ash Shaw Portfolio Team
 * @version 4.0.0 - Video Support & Semantic BEM
 */

import React, { useEffect, useState, useCallback } from 'react';
import { X, CaretLeft, CaretRight, MagnifyingGlassPlus, MagnifyingGlassMinus, SquaresFour, Play } from '@phosphor-icons/react';
import { PortfolioImage } from './PortfolioImage';
import { OptimizedImage } from './OptimizedImage';
import { VideoPlayer } from './VideoPlayer';
import { useModal } from '../common/ModalContext';
import { useKeyboardTrap } from '../../hooks/useKeyboardTrap';
import { portfolioUI } from '../../data/mock/ui/portfolio';
import "../../../styles/blocks/enhanced-lightbox.css";

/**
 * Lightbox media item interface
 */
export interface LightboxItem {
  src: string;
  alt: string;
  caption?: string;
  description?: string;
  type?: 'image' | 'video';
  poster?: string; // For videos
}

/**
 * Props interface for EnhancedLightbox
 */
interface EnhancedLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: LightboxItem[];
  currentIndex: number;
  title: string;
  onNavigate?: (index: number) => void;
}

/**
 * Enhanced Lightbox component with professional gallery and video features
 */
export function EnhancedLightbox({
  isOpen,
  onClose,
  images,
  currentIndex: initialIndex,
  title,
  onNavigate
}: EnhancedLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isZoomed, setIsZoomed] = useState(false);
  const [showThumbnails, setShowThumbnails] = useState(false);
  
  const { registerModal, updateModal, unregisterModal } = useModal();

  const trapRef = useKeyboardTrap({
    active: isOpen && images.length > 0,
    onEscape: onClose,
    autoFocus: true,
    restoreFocus: true,
  });

  const hasMultipleItems = images.length > 1;
  const safeCurrentIndex = Math.max(0, Math.min(currentIndex, images.length - 1));
  const currentItem = images[safeCurrentIndex];

  useEffect(() => {
    const shouldSkip = !isOpen || images.length === 0;
    if (shouldSkip) return;
    registerModal('enhanced-lightbox', 'lightbox', { title, images });
    return () => unregisterModal('enhanced-lightbox');
  }, [registerModal, unregisterModal, title, images, isOpen]);

  useEffect(() => {
    const shouldSkip = !isOpen || images.length === 0;
    if (shouldSkip) return;
    updateModal('enhanced-lightbox', isOpen, { title, images, currentIndex: safeCurrentIndex });
  }, [updateModal, isOpen, title, images, safeCurrentIndex]);

  useEffect(() => {
    if (images.length === 0) return;
    const validIndex = Math.max(0, Math.min(initialIndex, images.length - 1));
    setCurrentIndex(validIndex);
  }, [initialIndex, images.length]);

  useEffect(() => {
    if (!isOpen) {
      setIsZoomed(false);
      setShowThumbnails(false);
    }
  }, [isOpen]);

  const updateIndex = useCallback((newIndex: number) => {
    setCurrentIndex(newIndex);
    if (onNavigate) {
      onNavigate(newIndex);
    }
    setIsZoomed(false);
  }, [onNavigate]);

  const goToPrevious = useCallback(() => {
    const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    updateIndex(newIndex);
  }, [currentIndex, images.length, updateIndex]);

  const goToNext = useCallback(() => {
    const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    updateIndex(newIndex);
  }, [currentIndex, images.length, updateIndex]);

  const goToItem = useCallback((index: number) => {
    updateIndex(index);
  }, [updateIndex]);

  const toggleZoom = useCallback(() => {
    // Only allow zooming on images
    if (currentItem && currentItem.type !== 'video') {
      setIsZoomed(!isZoomed);
    }
  }, [isZoomed, currentItem]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'ArrowLeft': e.preventDefault(); goToPrevious(); break;
        case 'ArrowRight': e.preventDefault(); goToNext(); break;
        case 'z': case 'Z': e.preventDefault(); toggleZoom(); break;
        case 't': case 'T': e.preventDefault(); setShowThumbnails(!showThumbnails); break;
      }
    };

    if (isOpen) document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, goToPrevious, goToNext, toggleZoom, showThumbnails]);

  // Touch handlers for swipe
  useEffect(() => {
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartY = 0;
    let touchEndY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const currentX = e.changedTouches[0].screenX;
      const currentY = e.changedTouches[0].screenY;
      const deltaX = Math.abs(currentX - touchStartX);
      const deltaY = Math.abs(currentY - touchStartY);
      
      if (deltaX > deltaY && deltaX > 20 && !isZoomed) {
        e.preventDefault();
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isZoomed) return; // Disable swipe when zoomed
      
      touchEndX = e.changedTouches[0].screenX;
      touchEndY = e.changedTouches[0].screenY;
      
      const deltaX = touchStartX - touchEndX;
      const deltaY = Math.abs(touchStartY - touchEndY);
      const swipeThreshold = 30;
      
      if (Math.abs(deltaX) > swipeThreshold && Math.abs(deltaX) > deltaY) {
        if (deltaX > 0) {
          goToNext();
          if ('vibrate' in navigator) navigator.vibrate(50);
        } else {
          goToPrevious();
          if ('vibrate' in navigator) navigator.vibrate(50);
        }
      }
    };

    if (isOpen && hasMultipleItems) {
      document.addEventListener('touchstart', handleTouchStart, { passive: true });
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd, { passive: true });
    }

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isOpen, hasMultipleItems, goToPrevious, goToNext, isZoomed]);

  const shouldNotRender = !isOpen || images.length === 0 || !currentItem;
  if (shouldNotRender) {
    return null;
  }

  const isTypeVideo = currentItem.type === 'video';
  const hasYoutube = currentItem.src.includes('youtube');
  const hasVimeo = currentItem.src.includes('vimeo');
  const isMp4 = currentItem.src.endsWith('.mp4');
  const isVideo = isTypeVideo || hasYoutube || hasVimeo || isMp4;

  return (
    <div 
      className="lightbox-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-title"
      ref={trapRef}
    >
      <div 
        className="lightbox-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="lightbox-header">
          <div className="lightbox-controls">
            {/* Zoom Toggle - Only for images */}
            {!isVideo && (
              <button
                type="button"
                onClick={toggleZoom}
                className="lightbox-btn"
                aria-label={isZoomed ? portfolioUI.lightbox.zoomOut : portfolioUI.lightbox.zoomIn}
              >
                {isZoomed ? <MagnifyingGlassMinus className="icon-md" /> : <MagnifyingGlassPlus className="icon-md" />}
              </button>
            )}

            {/* Thumbnails Toggle */}
            {hasMultipleItems && (
              <button
                type="button"
                onClick={() => setShowThumbnails(!showThumbnails)}
                className="lightbox-btn-text"
                aria-label={showThumbnails ? portfolioUI.lightbox.thumbnails.hide : portfolioUI.lightbox.thumbnails.show}
              >
                <SquaresFour className="icon-sm" />
                {showThumbnails ? portfolioUI.lightbox.hide : portfolioUI.lightbox.gallery}
              </button>
            )}

            {/* Mobile Gallery Toggle */}
            {hasMultipleItems && (
              <button
                type="button"
                onClick={() => setShowThumbnails(!showThumbnails)}
                className="lightbox-btn lightbox-btn--mobile-toggle"
                aria-label={showThumbnails ? portfolioUI.lightbox.thumbnails.hide : portfolioUI.lightbox.thumbnails.show}
              >
                <SquaresFour className="icon-md" />
              </button>
            )}

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="lightbox-btn"
              aria-label={portfolioUI.lightbox.close}
            >
              <X className="icon-lg" />
            </button>
          </div>
        </div>

        {/* Main Content Container */}
        <div className="lightbox-content">
          {/* Navigation Arrows */}
          {hasMultipleItems && (
            <div className="lightbox-nav-wrapper">
              <button
                type="button"
                onClick={goToPrevious}
                className="lightbox-nav-arrow lightbox-nav-arrow--prev"
                aria-label={portfolioUI.lightbox.navigation.previous}
              >
                <CaretLeft className="icon-2xl" strokeWidth={2.5} />
              </button>
              
              <button
                type="button"
                onClick={goToNext}
                className="lightbox-nav-arrow lightbox-nav-arrow--next"
                aria-label={portfolioUI.lightbox.navigation.next}
              >
                <CaretRight className="icon-2xl" strokeWidth={2.5} />
              </button>
            </div>
          )}

          {/* Media Content (Image or Video) */}
          <div className={`lightbox-image-wrapper ${isZoomed ? 'lightbox-image-wrapper--zoomed' : ''}`}>
            {isVideo ? (
              <div className="lightbox-video-wrapper">
                <VideoPlayer
                  src={currentItem.src}
                  poster={currentItem.poster}
                  title={currentItem.caption ? currentItem.caption : currentItem.alt}
                  autoPlay={false}
                  className="lightbox-video"
                />
              </div>
            ) : (
              <PortfolioImage
                src={currentItem.src}
                alt={currentItem.alt}
                className={`lightbox-image ${isZoomed ? 'lightbox-image--zoomed' : ''}`}
                onClick={toggleZoom}
                preset="lightbox"
              />
            )}
            
            {/* Mobile Pagination Dots */}
            {hasMultipleItems && (
              <div className="lightbox-dots-mobile">
                {images.map((_, index) => (
                  <button
                    type="button"
                    key={index}
                    onClick={() => goToItem(index)}
                    className={`lightbox-dot ${index === currentIndex ? 'lightbox-dot--active' : 'lightbox-dot--inactive'}`}
                    aria-label={`Go to item ${index + 1} of ${images.length}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Desktop Pagination Dots */}
          {hasMultipleItems && (
            <div className="lightbox-dots-desktop">
              {images.map((_, index) => (
                <button
                  type="button"
                  key={index}
                  onClick={() => goToItem(index)}
                  className={`lightbox-dot ${index === currentIndex ? 'lightbox-dot--active' : 'lightbox-dot--inactive'}`}
                  aria-label={`Go to item ${index + 1} of ${images.length}`}
                />
              ))}
            </div>
          )}

          {/* Caption */}
          {(currentItem.caption !== undefined || currentItem.description !== undefined) && (
            <div className="lightbox-caption">
              {currentItem.caption && (
                <h3 className="lightbox-text-title">
                  {currentItem.caption}
                </h3>
              )}
              {currentItem.description && (
                <p className="lightbox-text-description">
                  {currentItem.description}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Thumbnail Strip */}
        {hasMultipleItems && showThumbnails && (
          <div className="lightbox-thumbnails-container">
            <div className="lightbox-thumbnails-strip">
              {images.map((item, index) => {
                const isItemTypeVideo = item.type === 'video';
                const hasItemYoutube = item.src.includes('youtube');
                const hasItemVimeo = item.src.includes('vimeo');
                const isItemMp4 = item.src.endsWith('.mp4');
                const isItemVideo = isItemTypeVideo || hasItemYoutube || hasItemVimeo || isItemMp4;
                return (
                  <button
                    type="button"
                    key={index}
                    onClick={() => goToItem(index)}
                    className={`lightbox-thumbnail-btn ${index === currentIndex ? 'lightbox-thumbnail-btn--active' : 'lightbox-thumbnail-btn--inactive'}`}
                    aria-label={`Go to item ${index + 1}: ${item.caption ? item.caption : item.alt}`}
                  >
                    {isItemVideo ? (
                      <div className="lightbox-thumbnail-video">
                        <Play className="lightbox-thumbnail-play-icon" />
                        {item.poster && (
                          <OptimizedImage 
                            src={item.poster} 
                            alt={item.alt} 
                            className="lightbox-thumbnail-img"
                            preset="thumbnail"
                          />
                        )}
                      </div>
                    ) : (
                      <PortfolioImage
                        src={item.src}
                        alt={item.alt}
                        className="lightbox-thumbnail-img"
                        preset="thumbnail"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="lightbox-footer">
          <p className="lightbox-footer-content">
            {hasMultipleItems && (
              <span className="lightbox-nav-hint-block">
                <span className="lightbox-nav-hint-wrapper">
                  <svg className="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                  </svg>
                  <span className="lightbox-hint-desktop">{portfolioUI.lightbox.navigation.hintDesktop}</span>
                  <span className="lightbox-hint-mobile">{portfolioUI.lightbox.navigation.hintMobile}</span>
                  <svg className="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
                <span className="lightbox-separator">•</span>
              </span>
            )}
            {!isVideo && (
              <span className="lightbox-zoom-hint-block">
                <span>{portfolioUI.lightbox.navigation.hintZoom}</span>
                <span className="lightbox-separator">•</span>
              </span>
            )}
            <span className="lightbox-hint-desktop">{portfolioUI.lightbox.navigation.hintKeyboard}</span>
            <span>{portfolioUI.lightbox.navigation.hintClose}</span>
          </p>
        </div>
      </div>
    </div>
  );
}