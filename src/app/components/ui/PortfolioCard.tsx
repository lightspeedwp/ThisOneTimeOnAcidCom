/**
 * @fileoverview Portfolio Card component with featured image, gallery slider, and category tags
 * Portfolio card component featuring featured image, multi-image carousel, category tags,
 * navigation arrows, pagination dots, hover effects, and comprehensive accessibility
 * 
 * @author Ash Shaw Portfolio Team
 * @version 3.5.0 - Clickable category tags linking to /portfolio/category/:slug
 */

import React, { useState, useMemo, useCallback } from 'react';
import { CaretLeft, CaretRight, Play, Calendar } from '@phosphor-icons/react';
import { useNavigate } from '../../lib/router';
import { usePortfolioImageUrl } from './PortfolioImage';
import { useOptimizedImage } from '../../hooks/useOptimizedImage';
import { formatDate } from '../../utils/formatDate';
import { PORTFOLIO_CATEGORIES } from '../../utils/portfolioService';
import "../../../styles/blocks/portfolio-card.css";

/**
 * Portfolio image interface
 */
interface PortfolioImage {
  src: string;
  alt: string;
  caption?: string;
  description?: string;
  type?: 'image' | 'video';
  poster?: string;
}

/**
 * Portfolio entry interface matching Contentful data structure
 */
interface PortfolioEntry {
  id: string;
  title: string;
  subtitle?: string;
  date?: string;
  featuredImage: PortfolioImage;
  images: PortfolioImage[];
  category: string;
}

/**
 * Props interface for PortfolioCard
 */
interface PortfolioCardProps {
  entry: PortfolioEntry;
  onImageClick: (imageIndex: number) => void;
  onNavigateToDetail?: (portfolioId: string) => void;
}

/**
 * Portfolio Card component with featured image, gallery slider, and category tags
 */
export function PortfolioCard({ 
  entry, 
  onImageClick,
  onNavigateToDetail
}: PortfolioCardProps) {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const touchStartInit: number | null = null;
  const [touchStart, setTouchStart] = useState(touchStartInit);
  const touchEndInit: number | null = null;
  const [touchEnd, setTouchEnd] = useState(touchEndInit);

  const allImages = useMemo(() => {
    const combined = [entry.featuredImage];
    if (entry.images && entry.images.length > 0) {
      combined.push(...entry.images.slice(0, 5));
    }
    return combined;
  }, [entry.featuredImage, entry.images]);

  const hasMultipleImages = allImages.length > 1;

  const getCategorySlug = useCallback((category: string): string | null => {
    const cat = PORTFOLIO_CATEGORIES.find(c => c.id === category);
    return cat && cat.slug && cat.slug !== 'all' ? cat.slug : null;
  }, []);

  const handleCategoryClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const slug = getCategorySlug(entry.category);
    if (slug) {
      navigate(`/portfolio/category/${slug}`);
    }
  }, [entry.category, getCategorySlug, navigate]);

  const getCategoryTagClass = (category: string): string => {
    const categoryLower = category.toLowerCase();
    const baseClass = "portfolio-card__category-tag";
    
    if (categoryLower.includes('festival')) return `${baseClass} portfolio-card__category-tag--festival`;
    
    const isUvOrBlacklight = categoryLower.includes('uv') || categoryLower.includes('blacklight');
    if (isUvOrBlacklight) return `${baseClass} portfolio-card__category-tag--uv`;
    
    const isSwissOrMountain = categoryLower.includes('swiss') || categoryLower.includes('mountain');
    if (isSwissOrMountain) return `${baseClass} portfolio-card__category-tag--swiss`;
    
    const isNailOrFusion = categoryLower.includes('nail') || categoryLower.includes('fusion');
    if (isNailOrFusion) return `${baseClass} portfolio-card__category-tag--nail`;
    
    const isThailandOrAdventure = categoryLower.includes('thailand') || categoryLower.includes('adventure');
    if (isThailandOrAdventure) return `${baseClass} portfolio-card__category-tag--gold`;
    
    return `${baseClass} portfolio-card__category-tag--default`;
  };

  const minSwipeDistance = 30;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    e.currentTarget.style.touchAction = 'pan-y';
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!touchStart) return;
    const currentTouch = e.targetTouches[0].clientX;
    setTouchEnd(currentTouch);
    const distance = Math.abs(touchStart - currentTouch);
    if (distance > 10) e.preventDefault();
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    e.currentTarget.style.touchAction = 'auto';
    const hasValidTouch = touchStart !== null && touchEnd !== null;
    if (!hasValidTouch) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && hasMultipleImages) {
      goToNext();
      if ('vibrate' in navigator) navigator.vibrate(50);
    }
    if (isRightSwipe && hasMultipleImages) {
      goToPrevious();
      if ('vibrate' in navigator) navigator.vibrate(50);
    }
  };

  const goToPrevious = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentImageIndex((prev) => prev === 0 ? allImages.length - 1 : prev - 1);
  };

  const goToNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentImageIndex((prev) => prev === allImages.length - 1 ? 0 : prev + 1);
  };

  const goToImage = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex(index);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const isActivationKey = e.key === 'Enter' || e.key === ' ';
    if (isActivationKey) {
      e.preventDefault();
      onImageClick(currentImageIndex);
    } else if (e.key === 'ArrowLeft' && hasMultipleImages) {
      e.preventDefault();
      setCurrentImageIndex((prev) => prev === 0 ? allImages.length - 1 : prev - 1);
    } else if (e.key === 'ArrowRight' && hasMultipleImages) {
      e.preventDefault();
      setCurrentImageIndex((prev) => prev === allImages.length - 1 ? 0 : prev + 1);
    }
  };

  const rawCurrentImage = allImages[currentImageIndex];
  const currentImage = rawCurrentImage ? rawCurrentImage : { src: '', alt: '', caption: '', description: '' };
  const isVideo = currentImage.type === 'video';
  const displayImageSrc = isVideo && currentImage.poster ? currentImage.poster : currentImage.src;
  const resolvedImageUrl = usePortfolioImageUrl(displayImageSrc);
  const { src: optimizedImageUrl } = useOptimizedImage(resolvedImageUrl, { preset: 'thumbnail' });

  return (
    <article
      className="portfolio-card"
      onClick={() => onImageClick(currentImageIndex)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View ${entry.title} portfolio entry in lightbox`}
    >
      <div 
        className="portfolio-card__image-container"
        style={{ backgroundImage: `url('${optimizedImageUrl}')` }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {isVideo && (
          <div className="portfolio-card__video-overlay">
            <div className="portfolio-card__play-button">
              <Play className="portfolio-card__play-icon" fill="currentColor" />
            </div>
          </div>
        )}

        <a
          href={(() => {
            const slug = getCategorySlug(entry.category);
            return slug ? `/portfolio/category/${slug}` : '/portfolio';
          })()}
          className={`${getCategoryTagClass(entry.category)} clickable`}
          onClick={handleCategoryClick}
          aria-label={`View all ${entry.category} portfolio entries`}
        >
          {entry.category}
        </a>
          
          {hasMultipleImages && (
            <div className="portfolio-card__controls-wrapper">
              {/* Navigation buttons: visibility controlled by CSS */}
              <button
                type="button"
                onClick={goToPrevious}
                className="portfolio-card__nav-button portfolio-card__nav-button--prev"
                aria-label="Previous image"
                tabIndex={-1}
              >
                <CaretLeft className="portfolio-card__nav-icon" />
              </button>
              
              <button
                type="button"
                onClick={goToNext}
                className="portfolio-card__nav-button portfolio-card__nav-button--next"
                aria-label="Next image"
                tabIndex={-1}
              >
                <CaretRight className="portfolio-card__nav-icon" />
              </button>

              {/* Swipe indicator: visibility controlled by CSS (mobile only) */}
              <div className="portfolio-card__swipe-indicator">
                <span className="portfolio-card__swipe-content">
                  <svg className="portfolio-card__swipe-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                  </svg>
                  Swipe
                  <svg className="portfolio-card__swipe-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </div>

              {/* Dots: visibility controlled by CSS */}
              <div className="portfolio-card__dots">
                {allImages.map((_, index) => (
                  <button
                    type="button"
                    key={index}
                    onClick={(e) => goToImage(index, e)}
                    className={`portfolio-card__dot ${index === currentImageIndex ? 'portfolio-card__dot--active' : ''}`}
                    aria-label={`Go to image ${index + 1} of ${allImages.length}`}
                    tabIndex={-1}
                  />
                ))}
              </div>

              <div className="portfolio-card__counter">
                {currentImageIndex + 1}/{allImages.length}
              </div>
            </div>
          )}
      </div>

      <div className="portfolio-card__content">
        <h3 className="portfolio-card__title">
          {entry.title}
        </h3>
        {entry.subtitle && (
          <p className="portfolio-card__subtitle">
            {entry.subtitle}
          </p>
        )}
        
        <div className="portfolio-card__footer">
          <div className="portfolio-card__footer-content">
            {entry.date && (
              <div className="portfolio-card__date">
                <Calendar className="portfolio-card__date-icon" aria-hidden="true" />
                <time dateTime={entry.date}>{formatDate(entry.date)}</time>
              </div>
            )}
            
            {onNavigateToDetail && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigateToDetail(entry.id);
                }}
                className="portfolio-card__action-btn"
                aria-label={`Read the full story about ${entry.title}`}
              >
                Read More
                <svg className="portfolio-card__action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}