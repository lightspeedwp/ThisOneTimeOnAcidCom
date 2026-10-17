/**
 * Testimonials Section Component
 * 
 * Displays client testimonials in a Hybrid Grid/Slider Layout
 * - Desktop: 3-column grid (showing limited count)
 * - Tablet/Mobile: Responsive slider
 * 
 * @component
 * @returns {JSX.Element} Testimonials section
 */

import React, { useMemo } from 'react';
import { testimonials } from '../../data/mock/testimonials';
import { homeUI } from '../../data/mock/ui/home';
import { ResponsiveGridSlider } from '../ui/ResponsiveGridSlider';
import "../../../styles/blocks/column-layouts.css";
import "../../../styles/blocks/testimonials.css";

export function TestimonialsSection() {
  // Use the first 6 testimonials for display
  const displayData = useMemo(() => {
    return testimonials.slice(0, 6);
  }, []);
  
  return (
    <section id="testimonials" className="testimonials-section section-spacing px-horizontal-section">
      <div className="testimonials-section__container section-container">
        {/* Section Header */}
        <div className="testimonials-section__header">
          <h2 className="testimonials-section__title text-section-h2">
            {homeUI.sections.testimonials.title}
          </h2>
          <p className="testimonials-section__description text-body-guideline">
            {homeUI.sections.testimonials.description}
          </p>
        </div>
        
        {/* Unified Responsive Layout: Grid on Desktop, Slider on Mobile/Tablet */}
        <ResponsiveGridSlider
          items={displayData}
          keyExtractor={(testimonial) => testimonial.id}
          layoutMode="slider"
          desktopColumns={3}
          renderItem={(testimonial) => (
            <div className="testimonial-card-wrapper">
              <div className="testimonial-card">
                {/* Text */}
                <p className="testimonial-card__text">
                  "{testimonial.text}"
                </p>
                
                {/* Client */}
                <div className="testimonial-card__footer">
                  <p className="testimonial-card__author">
                    {testimonial.name}
                  </p>
                  {testimonial.event && (
                    <p className="testimonial-card__event">
                      {testimonial.event}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
          className="mb-fluid-xl"
        />
      </div>
    </section>
  );
}