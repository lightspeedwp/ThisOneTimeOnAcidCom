/**
 * @fileoverview UV Makeup Art section showcasing neon and blacklight artistry
 * Displays UV reactive makeup portfolio with lightbox functionality
 * Uses a Responsive Hybrid Layout: Grid on Desktop, Slider on Tablet/Mobile
 *
 * @author Ash Shaw Portfolio Team
 * @version 3.1.0 - Responsive Grid/Slider Hybrid
 */

import React, { useState, useEffect } from "react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { uvMakeupWork } from "../../data/mock/portfolio/uv-makeup";
import { EnhancedLightbox } from "../ui/EnhancedLightbox";
import { SliderCard } from "../ui/SliderCard";
import { homeUI } from "../../data/mock/ui/home";
import { useAppNavigate } from "../../hooks/useAppNavigate";
import "../../../styles/blocks/column-layouts.css";
import "../../../styles/blocks/uv-makeup.css";

/** Bundler-safe type alias — avoids Array<T> nested generic in hook calls */
type UVLightboxImage = { src: string; alt: string; caption?: string; description?: string };
type UVLightboxState = {
  isOpen: boolean;
  images: UVLightboxImage[];
  currentIndex: number;
  title: string;
  description: string;
};
const INITIAL_UV_LIGHTBOX: UVLightboxState = {
  isOpen: false, images: [], currentIndex: 0, title: '', description: '',
};

/**
 * UV Makeup Art section component displaying neon and blacklight artistry portfolio
 */
export function UVMakeupSection() {
  const setCurrentPage = useAppNavigate();
  const [lightbox, setLightbox] = useState(INITIAL_UV_LIGHTBOX);

  // Responsive State
  const [isDesktop, setIsDesktop] = useState(true);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(5);

  // Handle Resize Logic for Hybrid Layout
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
        setSlidesPerView(3);
        setIsDesktop(true);
      } else if (width < 1800) {
        setSlidesPerView(4);
        setIsDesktop(true);
      } else {
        setSlidesPerView(5);
        setIsDesktop(true);
      }
    };

    // Initial check
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const openLightbox = (
    images: Array<{
      src: string;
      alt: string;
      caption?: string;
      description?: string;
    }>,
    currentIndex: number,
    title?: string,
    description?: string,
  ) => {
    setLightbox({
      isOpen: true,
      images,
      currentIndex,
      title,
      description,
    });
  };

  const closeLightbox = () => {
    setLightbox((prev) => ({ ...prev, isOpen: false }));
  };

  const navigateLightbox = (newIndex: number) => {
    setLightbox((prev) => ({ ...prev, currentIndex: newIndex }));
  };

  // Convert UV makeup data to SliderCard format
  const uvMakeupCards = uvMakeupWork.map((entry) => ({
    id: entry.id,
    title: entry.title,
    description: entry.description,
    images: entry.images,
    category: entry.category,
  }));

  const maxIndex = Math.max(0, uvMakeupCards.length - slidesPerView);

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

  return (
    <div className="uv-makeup-section-wrapper">
      <section id="uv-makeup" className="uv-makeup-section section-spacing px-horizontal-section">
        <div className="container-wide uv-makeup-section__content section-container">
          {/* Section Header */}
          <div className="uv-makeup-section__header">
            <h2
              id="uv-makeup"
              className="text-section-h2 text-gradient-pink-purple-blue"
            >
              {homeUI.sections.uvMakeup.title}
            </h2>
            <p className="text-body-guideline uv-makeup-section__description">
              {homeUI.sections.uvMakeup.description}
            </p>
          </div>

          {/* Hybrid Content Layout: Grid on Desktop, Slider on Mobile/Tablet */}
          {isDesktop ? (
            /* Desktop Grid View */
            <div className="layout-grid layout-grid--desktop-3 uv-makeup-section__grid">
              {uvMakeupCards.map((makeup, index) => {
                const makeupKey = makeup.id ? makeup.id : String(index);
                return (
                <div key={makeupKey} className="uv-makeup-card-wrapper">
                  <SliderCard
                    data={makeup}
                    onImageClick={(imageIndex) => {
                      const images = makeup.images ? makeup.images : [];
                      openLightbox(
                        images,
                        imageIndex,
                        makeup.title,
                        makeup.description,
                      );
                    }}
                    variant="uv"
                    className="uv-makeup-card"
                  />
                </div>
                );
              })}
            </div>
          ) : (
            /* Mobile/Tablet Slider View */
            <div className="uv-makeup-section__slider-wrapper">
               {/* Navigation Buttons (Hidden on mobile via CSS) */}
               <button
                type="button"
                onClick={prevSlide}
                disabled={currentSlideIndex === 0}
                aria-label="Previous slide"
                className="uv-makeup-section__nav-button uv-makeup-section__nav-button--prev"
              >
                <CaretLeft className="uv-makeup-section__nav-icon" />
              </button>

              <button
                type="button"
                onClick={nextSlide}
                disabled={currentSlideIndex >= maxIndex}
                aria-label="Next slide"
                className="uv-makeup-section__nav-button uv-makeup-section__nav-button--next"
              >
                <CaretRight className="uv-makeup-section__nav-icon" />
              </button>

              {/* Viewport & Track */}
              <div 
                className="uv-makeup-section__slider-viewport"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
                <div
                  className="uv-makeup-section__track"
                  style={{ '--slide-index': currentSlideIndex, '--slides-per-view': slidesPerView } as React.CSSProperties}
                >
                  {uvMakeupCards.map((makeup, index) => {
                    const makeupKey = makeup.id ? makeup.id : String(index);
                    return (
                    <div
                      key={makeupKey}
                      className="uv-makeup-section__slide"
                    >
                      <SliderCard
                        data={makeup}
                        onImageClick={(imageIndex) => {
                          const images = makeup.images ? makeup.images : [];
                          openLightbox(
                            images,
                            imageIndex,
                            makeup.title,
                            makeup.description,
                          );
                        }}
                        variant="uv"
                        className="uv-makeup-card-wrapper"
                      />
                    </div>
                    );
                  })}
                </div>
              </div>

              {/* Dots Navigation */}
              <div className="uv-makeup-section__dots">
                {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                  <button
                    type="button"
                    key={index}
                    onClick={() => setCurrentSlideIndex(index)}
                    aria-label={`Go to slide group ${index + 1}`}
                    className={`uv-makeup-section__dot ${
                      index === currentSlideIndex
                        ? "uv-makeup-section__dot--active"
                        : "uv-makeup-section__dot--inactive"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Call to Action */}
          <div className="uv-makeup-section__cta">
            <button
              type="button"
              onClick={() => setCurrentPage("portfolio")}
              className="btn btn--neon-secondary uv-makeup-cta-btn"
              aria-label={homeUI.sections.uvMakeup.ctaAriaLabel}
            >
              {homeUI.sections.uvMakeup.cta}
            </button>
          </div>
        </div>
      </section>

      <EnhancedLightbox
        isOpen={lightbox.isOpen}
        onClose={closeLightbox}
        onNavigate={navigateLightbox}
        images={lightbox.images}
        currentIndex={lightbox.currentIndex}
        title={lightbox.title}
        description={lightbox.description}
      />
    </div>
  );
}