/**
 * @fileoverview Why I Do Makeup section using unified slider pattern
 * Displays the philosophical reasons for pursuing makeup artistry with interactive cards
 * Supports light and dark mode themes with responsive slider
 * Uses a Responsive Hybrid Layout: Grid on Desktop, Slider on Tablet/Mobile
 *
 * @author Ash Shaw Portfolio Team
 * @version 5.1.0 - Responsive Grid/Slider Hybrid
 */

import React, { useState, useEffect } from "react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import {
  ShineIcon,
  JoyIcon,
  GrowthIcon,
} from "../common/ColorfulIcons";
import { whySectionContent } from "../../data/mock/pages/home";
import { useAppNavigate } from "../../hooks/useAppNavigate";
import "../../../styles/blocks/column-layouts.css";
import "../../../styles/blocks/why-section.css";

// Map icon string IDs to icon components
const iconMap = {
  shine: ShineIcon,
  joy: JoyIcon,
  growth: GrowthIcon,
} as const;

/**
 * Why I Do Makeup section featuring three core messaging pillars with custom icons
 */
export function WhySection() {
  const setCurrentPage = useAppNavigate();
  // Responsive State
  const [isDesktop, setIsDesktop] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(1);

  // Handle Resize Logic for Hybrid Layout (max 3 columns per design guidelines)
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 600) {
        setSlidesPerView(1);
        setIsDesktop(false);
      } else if (width < 1024) {
        setSlidesPerView(2);
        setIsDesktop(false);
      } else {
        // Desktop: always 3 columns (max per guidelines)
        setSlidesPerView(3);
        setIsDesktop(true);
      }
    };

    // Initial check
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const items = whySectionContent.items;
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

  return (
    <section id="why-section" className="why-section section-spacing px-horizontal-section">
      <div className="container-wide section-container">
        {/* Header */}
        <div className="why-section__header">
          <h2 className="why-section__title">
            {whySectionContent.title}
          </h2>
          <p className="why-section__subtitle">
            {whySectionContent.subtitle}
          </p>
        </div>

        {/* Hybrid Content Layout: Grid on Desktop, Slider on Mobile/Tablet */}
        {isDesktop ? (
          /* Desktop Grid View — 3 columns */
          <div className="why-section__grid">
            {items.map((reason, index) => {
              const IconComponent = iconMap[reason.icon];
              return (
                <div key={index} className="why-section__card-wrapper">
                  <div
                    className="feature-card"
                    onClick={() => setCurrentPage("about")}
                  >
                    <div className="feature-card__icon-wrapper">
                      <IconComponent
                        size="lg"
                        className="feature-card__icon"
                      />
                    </div>
                    <h3 className="feature-card__title">
                      {reason.title}
                    </h3>
                    <p className="feature-card__description">
                      {reason.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Mobile/Tablet Slider View */
          <div className="why-section__slider-wrapper">
            {/* Navigation Buttons (Hidden on mobile via CSS) */}
            <button
              type="button"
              onClick={prevSlide}
              disabled={currentSlideIndex === 0}
              aria-label="Previous slide"
              className="why-section__nav-button why-section__nav-button--prev"
            >
              <CaretLeft className="why-section__nav-icon" />
            </button>

            <button
              type="button"
              onClick={nextSlide}
              disabled={currentSlideIndex >= maxIndex}
              aria-label="Next slide"
              className="why-section__nav-button why-section__nav-button--next"
            >
              <CaretRight className="why-section__nav-icon" />
            </button>

            {/* Viewport & Track */}
            <div className="why-section__slider-viewport">
              <div
                className="why-section__track"
                style={{
                  "--slide-index": currentSlideIndex,
                  "--slides-per-view": slidesPerView,
                } as React.CSSProperties}
              >
                {items.map((reason, index) => {
                  const IconComponent = iconMap[reason.icon];
                  return (
                    <div key={index} className="why-section__slide">
                      <div
                        className="feature-card"
                        onClick={() => setCurrentPage("about")}
                      >
                        <div className="feature-card__icon-wrapper">
                          <IconComponent
                            size="lg"
                            className="feature-card__icon"
                          />
                        </div>
                        <h3 className="feature-card__title">
                          {reason.title}
                        </h3>
                        <p className="feature-card__description">
                          {reason.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Dots Navigation */}
            {/* Only show dots if there is more than 1 slide group position (i.e. maxIndex > 0) */}
            {maxIndex > 0 && (
              <div className="why-section__dots">
                {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                  <button
                    type="button"
                    key={index}
                    onClick={() => setCurrentSlideIndex(index)}
                    aria-label={`Go to slide group ${index + 1}`}
                    className={`why-section__dot ${
                      index === currentSlideIndex
                        ? "why-section__dot--active"
                        : "why-section__dot--inactive"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Footer CTA */}
        <div className="why-section__footer">
          <div className="why-section__footer-left">
            <p className="why-section__follow-text">
              Follow my latest work on{" "}
              <a
                href="https://instagram.com/feedmymedia"
                target="_blank"
                rel="noopener noreferrer"
                className="why-section__follow-link"
                aria-label="Visit Ash Shaw's Instagram profile"
              >
                Instagram @feedmymedia
              </a>
            </p>
          </div>
          <button
            type="button"
            onClick={() => setCurrentPage("about")}
            className="btn btn--neon-secondary"
            aria-label={whySectionContent.ctaAriaLabel}
          >
            {whySectionContent.ctaText}
          </button>
        </div>
      </div>
    </section>
  );
}