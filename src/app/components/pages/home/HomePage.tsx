/**
 * @fileoverview HomePage component for Ash Shaw Makeup Portfolio
 * Combines all homepage sections with Contentful CMS integration and proper semantic structure
 *
 * @author Ash Shaw Portfolio Team
 * @version 3.4.0 - Terminal Boot Animations (Phase 1)
 */

import React, { useEffect } from "react";
import { HeroLayout } from "../../sections/HeroLayout";
import { WhySection } from "../../sections/WhySection";
import { FeaturedSection } from "../../sections/FeaturedSection";
import { BlogPreviewSection } from "../../sections/BlogPreviewSection";
import { UVMakeupSection } from "../../sections/UVMakeupSection";
import { TestimonialsSection } from "../../sections/TestimonialsSection";
import { FestivalCountdown } from "../../sections/FestivalCountdown";
import { useHomepageContent } from "../../../hooks/useContent";
import { FaqSection } from "../../sections/FaqSection";
import { useAppNavigate } from "../../../hooks/useAppNavigate";

import { homepageHero } from "../../../data/mock/pages/home";
import { homepageHeroImages } from "../../../data/mock/images/hero-images";
import { homeUI } from "../../../data/mock/ui/home";
import { setSEO } from '../../../utils/seo';
import { pageSEO } from '../../../data/mock/seo';
import {
  injectSchema,
  removeSchema,
  SCHEMA_IDS,
  buildWebSiteSchema,
  buildPersonSchema,
} from '../../../utils/schemaService';
import "../../../../styles/blocks/hero.css";
import "../../../../styles/blocks/home-page.css";
import "../../../../styles/blocks/rainbow-sections.css";
import "../../../../styles/animations.css";

export function HomePage() {
  var navigateTo = useAppNavigate();

  useEffect(function() {
    setSEO(pageSEO.home);
    injectSchema(SCHEMA_IDS.website, buildWebSiteSchema());
    injectSchema(SCHEMA_IDS.person, buildPersonSchema());
    return function() {
      removeSchema(SCHEMA_IDS.website);
      removeSchema(SCHEMA_IDS.person);
    };
  }, []);

  var contentData = useHomepageContent();
  var homepageContent = contentData.data;
  var contentLoading = contentData.loading;
  var contentError = contentData.error;
  var refreshContent = contentData.refresh;

  function LoadingState() {
    return (
      <main id="main-content" role="main" className="homepage-loading">
        <div className="container-wide">
          <div className="homepage-loading__content">
            <div className="loading-skeleton">
              <div className="skeleton-bar skeleton-bar--title"></div>
              <div className="skeleton-bar skeleton-bar--subtitle"></div>
              <div className="skeleton-bar skeleton-bar--hero"></div>
              <div className="skeleton-bar skeleton-bar--button"></div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  function ErrorState() {
    return (
      <main id="main-content" role="main" className="homepage-error">
        <div className="homepage-error__content">
          <div className="homepage-error__icon-wrapper">
            <div className="homepage-error__icon">
              <span role="img" aria-label="Warning">⚠️</span>
            </div>
            <h1 className="text-section-h2 mb-fluid-sm">{homeUI.error.title}</h1>
            <p className="text-body-p mb-fluid-lg">
              {contentError ? contentError : homeUI.error.message}
            </p>
          </div>
          <div className="homepage-error__actions">
            <button
              type="button"
              onClick={refreshContent}
              className="btn btn--neon-primary"
            >
              {homeUI.error.retry}
            </button>
            <button
              type="button"
              onClick={function() { window.location.reload(); }}
              className="btn btn--ghost"
            >
              {homeUI.error.refresh}
            </button>
          </div>
        </div>
      </main>
    );
  }

  if (contentLoading && !homepageContent) {
    return <LoadingState />;
  }

  if (contentError && !homepageContent) {
    return <ErrorState />;
  }

  var heroImages = homepageHeroImages;
  if (homepageContent) {
    var bgImages = homepageContent.hero.backgroundImages;
    if (bgImages && bgImages.length > 0) {
      heroImages = bgImages.map(function(img) {
        return {
          src: img.url,
          alt: img.alt,
          title: img.title
        };
      });
    }
  }

  var heroContent = {
    title: homepageContent ? homepageContent.hero.title : homepageHero.title,
    description: homepageContent ? homepageContent.hero.description : homepageHero.description,
    ctaText: homepageContent ? homepageContent.hero.ctaText : homepageHero.ctaText,
    images: heroImages
  };

  var heroSubtitle = homepageContent ? homepageContent.hero.subtitle : homepageHero.subtitle;
  var errorDisplay = contentError ? contentError : homeUI.error.message;

  function handlePortfolioClick() {
    navigateTo("portfolio");
  }

  return (
    <main id="main-content" role="main" className="home-page-layout bg-atomic-noise">
      {contentLoading && homepageContent && (
        <div className="loading-toast">
          <div className="loading-toast__inner">
            <div className="loading-toast__content">
              <div className="loading-spinner"></div>
              <span>{homeUI.loading.toast}</span>
            </div>
          </div>
        </div>
      )}

      <HeroLayout
        id="hero-section"
        title={heroContent.title}
        subtitle={heroSubtitle}
        description={heroContent.description}
        heroImages={heroContent.images}
        enableLightbox={true}
        size="xl"
        layout="split"
        align="wide"
        scrollArrowTarget="why-section"
        scrollArrowClassName="hero__scroll-arrow"
        animated={true}
        holographicTitle={false}
        floatMedia={true}
        actions={
          <div className="homepage-hero__actions">
            <button
              type="button"
              onClick={handlePortfolioClick}
              className="btn btn--neon-primary btn--lg btn--neon-pulse"
              aria-label="Navigate to Portfolio page to explore makeup artistry collection"
            >
              {heroContent.ctaText}
            </button>
          </div>
        }
      />
      
      <WhySection />
      
      <FeaturedSection limit={3} />
      
      <BlogPreviewSection limit={6} />
      
      <TestimonialsSection />
      
      <FestivalCountdown />
      
      <UVMakeupSection />
      
      <FaqSection pageId="home" variant="hero" />
    </main>
  );
}