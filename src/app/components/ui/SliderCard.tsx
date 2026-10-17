/**
 * @fileoverview Enhanced Portfolio Card with Multi-Image Slider
 * Universal card component for all portfolio sections with advanced slider functionality
 *
 * @author Ash Shaw Portfolio Team
 * @version 3.6.0 - React.memo for render optimisation
 */

import React, { useState, useCallback, memo } from "react";
import { CaretLeft, CaretRight, Play, Calendar } from "@phosphor-icons/react";
import { useNavigate } from "../../lib/router";
import { usePortfolioImageUrl } from "./PortfolioImage";
import { useOptimizedImage } from "../../hooks/useOptimizedImage";
import { formatDate } from "../../utils/formatDate";
import { PORTFOLIO_CATEGORIES } from "../../utils/portfolioService";
import "../../../styles/blocks/slider-card.css";

/**
 * Image interface for slider functionality
 */
interface SliderImage {
  src: string;
  alt: string;
  caption?: string;
  description?: string;
  type?: 'image' | 'video';
  poster?: string;
}

/**
 * Enhanced card data interface supporting single or multiple images
 */
interface CardData {
  id?: string;
  title: string;
  subtitle?: string;
  location?: string;
  description?: string;
  image?: string; // Legacy single image support
  images?: SliderImage[]; // New multi-image support
  category?: string;
  date?: string;
}

/**
 * Props interface for SliderCard
 */
interface SliderCardProps {
  data: CardData;
  onImageClick: (imageIndex: number) => void;
  onReadMore?: () => void;
  className?: string;
  /** Optional variant for themed subtitle styling */
  variant?: 'default' | 'uv';
}

/**
 * Enhanced SliderCard component with multi-image carousel functionality
 */
function SliderCardInner({
  data,
  onImageClick,
  onReadMore,
  className = "",
  variant = 'default',
}: SliderCardProps) {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const touchStartInit: number | null = null;
  const [touchStart, setTouchStart] = useState(touchStartInit);
  const touchEndInit: number | null = null;
  const [touchEnd, setTouchEnd] = useState(touchEndInit);
  const [isSwiping, setIsSwiping] = useState(false);

  // Handle legacy single image format
  const dataImages = data.images;
  let images: SliderImage[];
  if (dataImages) {
    images = dataImages;
  } else if (data.image) {
    images = [
      {
        src: data.image,
        alt: data.title,
        caption: data.title,
        description: data.description,
      },
    ];
  } else {
    images = [];
  }

  const hasMultipleImages = images.length > 1;
  const rawCurrentImage = images[currentImageIndex];
  const currentImage = rawCurrentImage ? rawCurrentImage : {
    src: "",
    alt: data.title,
    caption: data.title,
    description: data.description,
    type: 'image' as const,
    poster: ''
  };

  const isVideo = currentImage.type === 'video';
  const displayImageSrc = isVideo && currentImage.poster ? currentImage.poster : currentImage.src;

  // Resolve image URL for CSS background usage
  const resolvedImageUrl = usePortfolioImageUrl(displayImageSrc);
  const { src: optimizedImageUrl } = useOptimizedImage(resolvedImageUrl, { preset: 'thumbnail' });

  // Minimum swipe distance for touch navigation - reduced for better mobile responsiveness
  const minSwipeDistance = 30;

  /**
   * Handle touch start for swipe gesture
   */
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setIsSwiping(false);
    // Prevent scrolling while swiping horizontally
    e.currentTarget.style.touchAction = 'pan-y';
  };

  /**
   * Handle touch move for swipe gesture
   */
  const onTouchMove = (e: React.TouchEvent) => {
    if (!touchStart) return;
    
    const currentTouch = e.targetTouches[0].clientX;
    setTouchEnd(currentTouch);
    
    // Calculate current swipe distance
    const distance = Math.abs(touchStart - currentTouch);
    
    // If we're starting to swipe horizontally, prevent vertical scrolling and set swiping state
    if (distance > 10) {
      e.preventDefault();
      setIsSwiping(true);
    }
  };

  /**
   * Handle touch end and execute swipe navigation
   */
  const onTouchEnd = (e: React.TouchEvent) => {
    // Reset touch action and swiping state
    e.currentTarget.style.touchAction = 'auto';
    
    // Delay hiding the swiping state to allow for smooth transition
    setTimeout(() => {
      setIsSwiping(false);
    }, 300);
    
    const hasValidTouch = touchStart !== null && touchEnd !== null;
    if (!hasValidTouch) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && hasMultipleImages) {
      goToNext();
      // Haptic feedback on supported devices
      if ('vibrate' in navigator) {
        navigator.vibrate(50);
      }
    }
    if (isRightSwipe && hasMultipleImages) {
      goToPrevious();
      // Haptic feedback on supported devices
      if ('vibrate' in navigator) {
        navigator.vibrate(50);
      }
    }
  };

  /**
   * Navigate to previous image
   */
  const goToPrevious = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentImageIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1,
    );
  };

  /**
   * Navigate to next image
   */
  const goToNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentImageIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1,
    );
  };

  /**
   * Navigate to specific image by index
   */
  const goToImage = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex(index);
  };

  /**
   * Keyboard navigation handler
   */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    const isActivationKey = e.key === "Enter" || e.key === " ";
    if (isActivationKey) {
      e.preventDefault();
      onImageClick(currentImageIndex);
    } else if (e.key === "ArrowLeft" && hasMultipleImages) {
      e.preventDefault();
      goToPrevious();
    } else if (e.key === "ArrowRight" && hasMultipleImages) {
      e.preventDefault();
      goToNext();
    }
  };

  const subtitleText = data.subtitle ? data.subtitle : data.location;

  const getCategorySlug = useCallback((): string | null => {
    if (!data.category) return null;
    const cat = PORTFOLIO_CATEGORIES.find(c => {
      const matchesId = c.id === data.category;
      const matchesName = c.name === data.category;
      return matchesId || matchesName;
    });
    return cat && cat.slug && cat.slug !== 'all' ? cat.slug : null;
  }, [data.category]);

  const handleCategoryClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const slug = getCategorySlug();
    if (slug) {
      navigate(`/portfolio/category/${slug}`);
    }
  }, [getCategorySlug, navigate]);

  return (
    <div
      className={`slider-card group ${className}`}
      onClick={() => onImageClick(currentImageIndex)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View ${data.title} in lightbox. ${hasMultipleImages ? `${images.length} images available. Use arrow keys to navigate.` : ""}`}
    >
      {/* Image Container with Slider */}
      <div
        className="slider-card__image-container"
        style={{
          backgroundImage: `url('${optimizedImageUrl}')`,
        }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {isVideo && (
          <div className="slider-card__video-overlay">
            <div className="slider-card__play-button">
              <Play className="slider-card__play-icon" fill="currentColor" />
            </div>
          </div>
        )}

        {/* Category Chip - Top right corner (always visible when category exists) */}
        {data.category && (() => {
          const slug = getCategorySlug();
          return (
            <a
              href={slug ? `/portfolio/category/${slug}` : '/portfolio'}
              className="slider-card__category clickable"
              onClick={handleCategoryClick}
              aria-label={`View all ${data.category} portfolio entries`}
            >
              {data.category}
            </a>
          );
        })()}

        {/* Multi-image Navigation Controls */}
        {hasMultipleImages && (
          <div className="slider-card__nav-controls">
            {/* Desktop Navigation Arrows - Hover only with reduced opacity */}
            <div className="slider-card__nav-btn-container">
              <button
                type="button"
                onClick={goToPrevious}
                className="slider-card__nav-btn slider-card__nav-btn--prev"
                aria-label="Previous image"
                tabIndex={-1}
              >
                <CaretLeft className="slider-card__nav-icon" />
              </button>

              <button
                type="button"
                onClick={goToNext}
                className="slider-card__nav-btn slider-card__nav-btn--next"
                aria-label="Next image"
                tabIndex={-1}
              >
                <CaretRight className="slider-card__nav-icon" />
              </button>
            </div>

            {/* Mobile Indicator - Swipe text or Counter based on swiping state */}
            <div className="slider-card__swipe-indicator">
              {isSwiping ? (
                // Show counter when swiping
                <span>{currentImageIndex + 1}/{images.length}</span>
              ) : (
                // Show swipe indicator when not swiping
                <span className="slider-card__swipe-text">
                  <svg className="slider-card__swipe-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                  </svg>
                  Swipe
                  <svg className="slider-card__swipe-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              )}
            </div>

            {/* Simple Pagination Dots - Smaller with reduced opacity */}
            <div className="slider-card__pagination">
              {images.map((_, index) => (
                <button
                  type="button"
                  key={index}
                  onClick={(e) => goToImage(index, e)}
                  className={`slider-card__dot ${
                    index === currentImageIndex
                      ? "slider-card__dot--active"
                      : "slider-card__dot--inactive"
                  }`}
                  aria-label={`Go to image ${index + 1} of ${images.length}`}
                  tabIndex={-1}
                />
              ))}
            </div>

            {/* Desktop Image Counter - Hover only with reduced opacity */}
            <div className="slider-card__counter">
              {currentImageIndex + 1}/{images.length}
            </div>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="slider-card__content">
        <h3 className="slider-card__title">
          {data.title}
        </h3>

        {subtitleText && (
          <p className={`slider-card__subtitle ${variant === 'uv' ? 'slider-card__subtitle--uv' : ''}`}>
            {subtitleText}
          </p>
        )}

        <div className="slider-card__footer">
          <div className="slider-card__footer-content">
            {data.date && (
              <div className="slider-card__date">
                <Calendar className="slider-card__date-icon" aria-hidden="true" />
                <time dateTime={data.date}>{formatDate(data.date)}</time>
              </div>
            )}

            {onReadMore && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onReadMore();
                }}
                className="slider-card__action-btn"
                aria-label={`Read more about ${data.title}`}
              >
                Read More
                <svg className="slider-card__action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export const SliderCard = memo(SliderCardInner);