/**
 * @fileoverview Responsive Grid Slider
 * 
 * A unified layout engine that displays content as:
 * - A Grid on Desktop (>= 1024px)
 * - A Slider/Carousel on Tablet/Mobile (< 1024px)
 * 
 * @version 1.0.0
 */

import React, { useState, useEffect } from "react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import "../../../styles/blocks/responsive-grid-slider.css";
import "../../../styles/blocks/column-layouts.css";

interface ResponsiveGridSliderProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  /**
   * Number of columns on desktop (default: 3)
   */
  desktopColumns?: 2 | 3 | 4;
  /**
   * Key extractor for items (default: item.id)
   */
  keyExtractor?: (item: T) => string;
  className?: string;
  /**
   * Layout mode for desktop
   * - 'grid': Displays as a grid on desktop (default)
   * - 'slider': Displays as a slider on desktop (swipable)
   */
  layoutMode?: 'grid' | 'slider';
}

export function ResponsiveGridSlider<T extends { id?: string }>({
  items,
  renderItem,
  desktopColumns = 3,
  keyExtractor = (item) => {
    const itemId = (item as any).id;
    return itemId ? itemId : Math.random().toString();
  },
  className = "",
  layoutMode = 'grid',
}: ResponsiveGridSliderProps<T>) {
  // Responsive State
  const [isDesktop, setIsDesktop] = useState(true);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(desktopColumns);

  // Handle Resize Logic with unified breakpoints (600px, 1024px, 1440px, 1800px)
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 600) {
        setSlidesPerView(1);
        setIsDesktop(false);
      } else if (width < 1024) {
        setSlidesPerView(2);
        setIsDesktop(false);
      } else if (width < 1440) {
        // Desktop small: Use 3 columns by default, or respect desktopColumns if it's 2 or 4
        setSlidesPerView(desktopColumns === 2 ? 2 : 3);
        setIsDesktop(true);
      } else if (width < 1800) {
        // Desktop wide: Use 4 columns or respect desktopColumns
        setSlidesPerView(desktopColumns === 2 ? 3 : 4);
        setIsDesktop(true);
      } else {
        // Ultra-wide: Use 5 columns or cap at desktopColumns if smaller
        setSlidesPerView(Math.min(5, desktopColumns === 2 ? 4 : 5));
        setIsDesktop(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [desktopColumns]);

  // Slider Navigation Logic
  const maxIndex = Math.max(0, items.length - slidesPerView);

  // Correct index if it goes out of bounds after resize
  useEffect(() => {
    if (currentSlideIndex > maxIndex) {
      setCurrentSlideIndex(maxIndex);
    }
  }, [maxIndex, currentSlideIndex]);

  const nextSlide = () => {
    setCurrentSlideIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentSlideIndex((prev) => Math.max(prev - 1, 0));
  };

  // Swipe Logic
  const touchStartInit: number | null = null;
  const [touchStart, setTouchStart] = useState(touchStartInit);
  const touchEndInit: number | null = null;
  const [touchEnd, setTouchEnd] = useState(touchEndInit);
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    const hasValidTouch = touchStart !== null && touchEnd !== null;
    if (!hasValidTouch) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }
  };

  const getGridClass = () => {
    switch (desktopColumns) {
      case 2: return "layout-grid--desktop-2";
      case 4: return "layout-grid--desktop-4";
      default: return "layout-grid--desktop-3";
    }
  };

  if (isDesktop && layoutMode === 'grid') {
    return (
      <div className={`layout-grid ${getGridClass()} rgs-grid ${className}`}>
        {items.map((item, index) => (
          <div key={keyExtractor(item)} className="rgs-grid-item">
            {renderItem(item, index)}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`rgs-wrapper ${className}`}>
      {/* Navigation Buttons (Hidden on mobile via CSS) */}
      <button
        type="button"
        onClick={prevSlide}
        disabled={currentSlideIndex === 0}
        aria-label="Previous items"
        className="rgs-nav-button rgs-nav-button--prev"
      >
        <CaretLeft className="rgs-nav-icon" />
      </button>

      <button
        type="button"
        onClick={nextSlide}
        disabled={currentSlideIndex >= maxIndex}
        aria-label="Next items"
        className="rgs-nav-button rgs-nav-button--next"
      >
        <CaretRight className="rgs-nav-icon" />
      </button>

      {/* Slider Viewport */}
      <div
        className="rgs-viewport"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="rgs-track"
          style={{
            transform: `translateX(calc(${currentSlideIndex} * -${100 / slidesPerView}%))`
          }}
        >
          {items.map((item, index) => (
            <div 
              key={keyExtractor(item)} 
              className="rgs-slide"
              style={{ flex: `0 0 ${100 / slidesPerView}%` }}
            >
              {renderItem(item, index)}
            </div>
          ))}
        </div>
      </div>

      {/* Dots Navigation */}
      <div className="rgs-dots">
        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
          <button
            type="button"
            key={index}
            onClick={() => setCurrentSlideIndex(index)}
            aria-label={`Go to slide group ${index + 1}`}
            className={`rgs-dot ${
              index === currentSlideIndex
                ? "rgs-dot--active"
                : "rgs-dot--inactive"
            }`}
          />
        ))}
      </div>
    </div>
  );
}