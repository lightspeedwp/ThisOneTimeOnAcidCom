/**
 * @fileoverview Featured Work section showcasing latest festival makeup artistry
 * Displays carefully selected portfolio pieces using centralized mock data with lightbox functionality
 * Uses a Responsive Hybrid Layout: Grid on Desktop, Slider on Tablet/Mobile
 *
 * @author Ash Shaw Portfolio Team
 * @version 5.3.0 - Bundler-safe refactor + useContent hook integration
 */

import React, { useState, useMemo, useCallback } from "react";
import { EnhancedLightbox } from "../ui/EnhancedLightbox";
import { SliderCard } from "../ui/SliderCard";
import { ResponsiveGridSlider } from "../ui/ResponsiveGridSlider";
import { useFeaturedPortfolioEntries } from "../../hooks/useContent";
import { homeUI } from "../../data/mock/ui/home";
import { useAppNavigate } from "../../hooks/useAppNavigate";
import { grab, arrayGet, setProp } from "../../lib/router";
import "../../../styles/blocks/column-layouts.css";
import "../../../styles/blocks/featured-section.css";

/** Bundler-safe type alias — avoids Array<T> nested generic in hook calls */
type FeaturedLightboxImage = { src: string; alt: string; caption?: string; description?: string };
type FeaturedLightboxState = {
  isOpen: boolean;
  images: FeaturedLightboxImage[];
  currentIndex: number;
  title: string;
  description: string;
};
const INITIAL_FEATURED_LIGHTBOX: FeaturedLightboxState = {
  isOpen: false, images: [], currentIndex: 0, title: '', description: '',
};

/**
 * Featured Work section component displaying latest festival makeup artistry
 */
export function FeaturedSection(props: { limit?: number }) {
  var limit = props.limit !== undefined ? props.limit : 6;
  const setCurrentPage = useAppNavigate();
  const [lightbox, setLightbox] = useState(INITIAL_FEATURED_LIGHTBOX);

  // Get featured portfolio entries via hook (WordPress-ready)
  const featuredHook = useFeaturedPortfolioEntries(limit);
  const loading = grab(featuredHook, 'loading');
  const error = grab(featuredHook, 'error');
  const hookData = grab(featuredHook, 'data');
  const displayData = hookData ? grab(hookData, 'entries') : [];

  const openLightbox = useCallback(function(
    images: FeaturedLightboxImage[],
    currentIndex: number,
    title?: string,
    description?: string,
  ) {
    var newState = {} as FeaturedLightboxState;
    setProp(newState, 'isOpen', true);
    setProp(newState, 'images', images);
    setProp(newState, 'currentIndex', currentIndex);
    setProp(newState, 'title', title || '');
    setProp(newState, 'description', description || '');
    setLightbox(newState);
  }, []);

  const closeLightbox = useCallback(function() {
    setLightbox(function(prev) {
      var next = {} as FeaturedLightboxState;
      var entries = Object.entries(prev);
      for (var i = 0; i < entries.length; i++) {
        var pair = arrayGet(entries, i);
        setProp(next, arrayGet(pair, 0), arrayGet(pair, 1));
      }
      setProp(next, 'isOpen', false);
      return next;
    });
  }, []);

  const navigateLightbox = useCallback(function(newIndex: number) {
    setLightbox(function(prev) {
      var next = {} as FeaturedLightboxState;
      var entries = Object.entries(prev);
      for (var i = 0; i < entries.length; i++) {
        var pair = arrayGet(entries, i);
        setProp(next, arrayGet(pair, 0), arrayGet(pair, 1));
      }
      setProp(next, 'currentIndex', newIndex);
      return next;
    });
  }, []);

  /**
   * Named function expression for keyExtractor.
   */
  const getWorkId = function(work: any) {
    var wId = grab(work, 'id');
    return wId ? wId : Math.random().toString();
  };

  /**
   * Named function expression for renderItem to avoid arrow functions in JSX.
   */
  const renderFeaturedItem = function(work: any) {
    var handleImageClick = function(imageIndex: number) {
      var workImages = grab(work, 'images') || [];
      var workTitle = grab(work, 'title');
      var workSubtitle = grab(work, 'subtitle');
      var workDescription = grab(work, 'description');
      
      var lightboxDesc = workDescription;
      if (workSubtitle) {
        lightboxDesc = workSubtitle + ' - ' + workDescription;
      }

      openLightbox(
        workImages,
        imageIndex,
        workTitle,
        lightboxDesc
      );
    };

    var handleReadMore = function() {
      setCurrentPage("portfolio-detail", grab(work, 'id'));
    };

    return (
      <div className="featured-section__card-wrapper">
        <SliderCard
          data={work}
          onImageClick={handleImageClick}
          onReadMore={handleReadMore}
          className="featured-section__card"
        />
      </div>
    );
  };

  return (
    <div className="featured-section-wrapper">
      <section id="work" className="featured-section section-spacing px-horizontal-section">
        <div className="container-wide section-container">
          {/* Section Header */}
          <div className="featured-section__header">
            <h2 className="text-section-h2 featured-section__title">
              {grab(grab(grab(homeUI, 'sections'), 'featured'), 'title')}
            </h2>
            <p className="text-body-guideline featured-section__description">
              {grab(grab(grab(homeUI, 'sections'), 'featured'), 'description')}
            </p>
          </div>

          {/* Unified Responsive Layout: Grid on Desktop, Slider on Mobile/Tablet */}
          {loading ? (
            <div className="featured-section__loading">
              <div className="skeleton-box skeleton-box--grid"></div>
            </div>
          ) : (displayData && displayData.length > 0 ? (
            <ResponsiveGridSlider
              items={displayData}
              keyExtractor={getWorkId}
              renderItem={renderFeaturedItem}
              className=""
            />
          ) : (
            <div className="featured-section__empty">
              <p>{grab(grab(grab(homeUI, 'sections'), 'featured'), 'empty')}</p>
            </div>
          ))}

          {/* CTA Button */}
          <div className="featured-section__cta-container">
            <button
              type="button"
              onClick={function() { setCurrentPage("portfolio"); }}
              className="btn btn--neon-primary"
              aria-label={grab(grab(grab(homeUI, 'sections'), 'featured'), 'ctaAriaLabel')}
            >
              {grab(grab(grab(homeUI, 'sections'), 'featured'), 'cta')}
            </button>
          </div>
        </div>
      </section>

      {/* Enhanced Lightbox Modal */}
      <EnhancedLightbox
        isOpen={grab(lightbox, 'isOpen')}
        onClose={closeLightbox}
        onNavigate={navigateLightbox}
        images={grab(lightbox, 'images')}
        currentIndex={grab(lightbox, 'currentIndex')}
        title={grab(lightbox, 'title')}
        description={grab(lightbox, 'description')}
      />
    </div>
  );
}