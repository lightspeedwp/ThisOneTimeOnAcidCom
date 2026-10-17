/**
 * @fileoverview Single Portfolio Detail Page component for comprehensive portfolio viewing
 * 
 * Provides an immersive, detailed view of individual portfolio entries with story, visual gallery,
 * event information, and related content recommendations. Features full accessibility compliance,
 * responsive design, and brand-consistent styling following guidelines.
 * 
 * @author Ash Shaw Portfolio Team
 * @version 2.0.0 - Rich-text markdown content with Toxic Lime theme
 */

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { ArrowLeft, Calendar, MapPin, Eye, Tag, ShareNetwork } from '@phosphor-icons/react';

import { EnhancedLightbox } from '../../ui/EnhancedLightbox';
import { ShareComponent } from '../../ui/ShareComponent';
import { Breadcrumbs } from '../../ui/Breadcrumbs';
import { SliderCard } from '../../ui/SliderCard';
import { ResponsiveGridSlider } from '../../ui/ResponsiveGridSlider';
import { usePortfolioImageUrl } from '../../ui/PortfolioImage';
import { OptimizedImage } from '../../ui/OptimizedImage';
import { BlogPreviewSection } from '../../sections/BlogPreviewSection';
import { FaqSection } from '../../sections/FaqSection';
import { PortfolioFeedbackSection } from '../../sections/PortfolioFeedbackSection';

import { 
  getPortfolioEntryById, 
  getPortfolioCategories,
  getPortfolioByCategory,
  type UnifiedPortfolioEntry,
  type PortfolioImage 
} from '../../../utils/portfolioService';
import { portfolioUI } from '../../../data/mock/ui/portfolio';
import { useAppNavigate } from '../../../hooks/useAppNavigate';
import { useNavigate } from '../../../lib/router';
import { formatDate } from '../../../utils/formatDate';
import { markdownToHtml } from '../../../utils/simpleMarkdown';
import { setSEO } from '../../../utils/seo';
import { portfolioEntrySEO } from '../../../data/mock/seo';
import {
  injectSchema,
  removeSchema,
  SCHEMA_IDS,
  buildPortfolioItemSchema,
} from '../../../utils/schemaService';
import "../../../../styles/blocks/portfolio-detail-page.css";
import "../../../../styles/blocks/rich-text-portfolio.css";
import "../../../../styles/blocks/portfolio-feedback.css";

import { portfolioDetailBreadcrumbs } from "../../../data/mock/ui/breadcrumbs";

interface PortfolioDetailPageProps {
  portfolioId: string;
}

export function PortfolioDetailPage({ 
  portfolioId,
}: PortfolioDetailPageProps) {
  const setCurrentPage = useAppNavigate();
  const navigate = useNavigate();

  const portfolioEntry = useMemo(function () {
    return getPortfolioEntryById(portfolioId);
  }, [portfolioId]);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const lightboxInit: {
    isOpen: boolean;
    currentIndex: number;
    images: PortfolioImage[];
    title: string;
  } = {
    isOpen: false,
    currentIndex: 0,
    images: [],
    title: '',
  };
  const [lightbox, setLightbox] = useState(lightboxInit);

  const categories = useMemo(function () { return getPortfolioCategories(); }, []);

  const relatedPortfolioItems = useMemo(function () {
    if (!portfolioEntry) return [];
    // Get items from same category
    let items = getPortfolioByCategory(portfolioEntry.category);
    // Filter out current
    items = items.filter(function (item) { return item.id !== portfolioEntry.id; });
    
    // If less than 2, fetch from all (excluding current)
    if (items.length < 2) {
         const allItems = getPortfolioByCategory('all');
         const moreItems = allItems.filter(function (item) {
           return item.id !== portfolioEntry.id && !items.find(function (existing) { return existing.id === item.id; });
         });
         items = items.concat(moreItems);
    }
    
    return items.slice(0, 2);
  }, [portfolioEntry]);

  const handleBackClick = useCallback(function () {
    setCurrentPage('portfolio');
  }, [setCurrentPage]);

  const handleImageClick = useCallback(function (imageIndex) {
    if (!portfolioEntry) return;
    
    setLightbox({
      isOpen: true,
      currentIndex: imageIndex,
      images: portfolioEntry.images,
      title: portfolioEntry.title,
    });
  }, [portfolioEntry]);

  const handleLightboxClose = useCallback(function () {
    setLightbox(function (prev) {
      return {
        isOpen: false,
        currentIndex: prev.currentIndex,
        images: prev.images,
        title: prev.title
      };
    });
  }, []);

  // Handle clickable chips for Categories and Tags
  const handleCategoryClick = useCallback(function (categoryName) {
    const category = categories.find(function (c) { return c.name === categoryName || c.id === categoryName; });
    if (category) {
      setCurrentPage('portfolio', undefined, category.id);
    } else {
      const categoryId = (function () {
        const found = categories.find(function (c) { return c.name.toLowerCase() === categoryName.toLowerCase(); });
        return found ? found.id : undefined;
      })();
      if (categoryId) {
         setCurrentPage('portfolio', undefined, categoryId);
      } else {
        setCurrentPage('portfolio');
      }
    }
  }, [categories, setCurrentPage]);
  
  const handleTagClick = useCallback(function (tag) {
    const tagSlug = tag.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    navigate('/portfolio/tag/' + tagSlug);
  }, [navigate]);

  const eventDetails = useMemo(function () {
    if (!portfolioEntry) return null;
    
    const tags = portfolioEntry.tags || [];
    
    return {
      date: portfolioEntry.date ? formatDate(portfolioEntry.date) : null,
      location: tags.find(function (tag) {
        return tag.indexOf('gondwana') !== -1 || tag.indexOf('koh-phangan') !== -1 || tag.indexOf('ireland') !== -1;
      }),
      category: portfolioEntry.category,
      tags: tags.slice(0, 4)
    };
  }, [portfolioEntry]);

  useEffect(function () {
    if (portfolioEntry) {
      setSEO(portfolioEntrySEO(portfolioEntry.title, portfolioEntry.description || ''));
      injectSchema(SCHEMA_IDS.portfolio, buildPortfolioItemSchema(portfolioEntry));
    }
    return function () {
      removeSchema(SCHEMA_IDS.portfolio);
    };
  }, [portfolioEntry]);

  if (!portfolioEntry) {
    return (
      <div className="not-found-container">
        <main 
          id="main-content"
          tabIndex={-1}
          className="container-wide text-center section-spacing px-horizontal-section"
        >
          <div className="section-container">
            <h1 className="text-hero-h1 mb-fluid-lg">
              {portfolioUI.detail.notFound.title}
            </h1>
            <p className="text-body-p portfolio-detail__not-found-message mb-fluid-xl">
              {portfolioUI.detail.notFound.message}
            </p>
            <button
              type="button"
              onClick={handleBackClick}
              className="btn btn--neon-primary inline-flex-center gap-fluid-sm"
            >
              <ArrowLeft className="icon-md" />
              {portfolioUI.detail.notFound.backButton}
            </button>
          </div>
        </main>
      </div>
    );
  }

  const [visibleFeedbackCount, setVisibleFeedbackCount] = useState(3);

  // Reset visible count when portfolio entry changes
  useEffect(function () {
    setVisibleFeedbackCount(3);
  }, [portfolioId]);

  return (
    <div className="portfolio-detail-page bg-atomic-noise">
      
      {/* Top Header Section with Back Button and Title */}
      <section className="portfolio-header-wide section-spacing px-horizontal-section">
        <div className="container-wide section-container">
          <Breadcrumbs items={portfolioDetailBreadcrumbs(portfolioEntry.title)} centered />

          {/* Back Navigation */}
          <nav className="portfolio-detail__breadcrumb mb-fluid-lg" aria-label="Back navigation">
            <button
              type="button"
              onClick={handleBackClick}
              className="breadcrumb-btn"
              aria-label="Back to portfolio gallery"
            >
              <ArrowLeft className="icon-md" />
              {portfolioUI.detail.navigation.backToGallery}
            </button>
          </nav>
          
          {/* Align Wide Title */}
          <h1 className="text-hero-h1 mb-fluid-md portfolio-title-wide">
            {portfolioEntry.title}
          </h1>

          {/* Event Details as Chips */}
          {eventDetails ? (
            <div className="event-details-chips">
              {eventDetails.date ? (
                <div className="chip chip--date">
                  <Calendar className="icon-sm" />
                  <span>{eventDetails.date}</span>
                </div>
              ) : null}
              
              {eventDetails.location ? (
                <div className="chip chip--location">
                  <MapPin className="icon-sm" />
                  <span>{eventDetails.location}</span>
                </div>
              ) : null}
              
              <a 
                href={(function () {
                  const cat = categories.find(function (c) { return c.id === eventDetails.category; });
                  return cat && cat.slug ? '/portfolio/category/' + cat.slug : '/portfolio';
                })()}
                className="chip chip--category clickable"
                onClick={function (e) {
                  e.preventDefault();
                  handleCategoryClick(eventDetails.category);
                }}
              >
                <Tag className="icon-sm" />
                <span>
                  {(function () {
                    const foundCat = categories.find(function (c) { return c.id === eventDetails.category; });
                    return foundCat ? foundCat.name : eventDetails.category;
                  })()}
                </span>
              </a>
            </div>
          ) : null}
        </div>
      </section>

      {/* Main Content */}
      <main id="main-content" tabIndex={-1} className="portfolio-detail-main section-spacing px-horizontal-section">
        <div className="container-wide section-container portfolio-detail__content">
        
        {/* Visual Gallery Section - Now prominent at top below title */}
        <section>
          <div className="container-wide portfolio-gallery-wrapper">
            
            {/* Main Selected Image */}
            <div className="gallery-main-wrapper">
              <button
                type="button"
                onClick={function () { handleImageClick(selectedImageIndex); }}
                className="gallery-main-image"
                aria-label={'View ' + (portfolioEntry.images[selectedImageIndex] ? portfolioEntry.images[selectedImageIndex].alt : '') + ' in full size'}
              >
                <OptimizedImage
                  src={usePortfolioImageUrl(portfolioEntry.images[selectedImageIndex] ? portfolioEntry.images[selectedImageIndex].src : '')}
                  alt={portfolioEntry.images[selectedImageIndex] ? portfolioEntry.images[selectedImageIndex].alt : ''}
                  className="gallery-main-image__img"
                  preset="gallery"
                />
                <div className="gallery-main-image__overlay" />
                <div className="gallery-main-image__icon">
                  <div className="gallery-main-image__icon-wrapper">
                    <Eye className="icon-lg" />
                  </div>
                </div>
              </button>
            </div>

            {/* Image Thumbnails - Moved below main image */}
            {portfolioEntry.images.length > 1 ? (
              <div className="gallery-thumbnails">
                {portfolioEntry.images.map(function (image, index) {
                  return (
                    <button
                      type="button"
                      key={index}
                      onClick={function () { setSelectedImageIndex(index); }}
                      className={'gallery-thumbnail ' + (selectedImageIndex === index ? 'gallery-thumbnail--active' : '')}
                      aria-label={'Select image ' + (index + 1) + ': ' + image.alt}
                    >
                      <OptimizedImage
                        src={usePortfolioImageUrl(image.src)}
                        alt={image.alt}
                        className="gallery-thumbnail__img"
                        preset="thumbnail"
                      />
                      {selectedImageIndex !== index ? (
                        <div className="gallery-thumbnail__overlay" />
                      ) : null}
                    </button>
                  );
                })}
              </div>
            ) : null}
          </div>
        </section>

        {/* Excerpt Quote - Moved below gallery */}
        <section className="container-3xl">
           <blockquote className="portfolio-detail__excerpt-quote-left">
              {portfolioEntry.description}
            </blockquote>
        </section>

        {/* Story Section */}
        <section>
          <div className="container-3xl">
            <h2 className="text-section-h2 text-center mb-fluid-lg">
              {portfolioUI.detail.sections.story.title}
            </h2>
            
            <div className="portfolio-story">
              <div className="story-expand story-expand--visible"> 
                {portfolioUI.detail.sections.story.extendedDescription.map(function (paragraph, index) {
                  return (
                    <p key={index} className="text-body-p portfolio-detail__story-paragraph mb-fluid-md">
                      {paragraph}
                    </p>
                  );
                })}
                
                <blockquote className="story-quote">
                  {'"' + portfolioUI.detail.sections.story.quote + '"'}
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        {/* Rich-Text Content — Toxic Lime theme (only shown when entry has markdown content) */}
        {portfolioEntry.content ? (
          <section className="container-3xl">
            <div
              className="portfolio-rich-text"
              dangerouslySetInnerHTML={{ __html: markdownToHtml(portfolioEntry.content) }}
            />
          </section>
        ) : null}

        {/* Tags and Share Row (Moved from separate sections) */}
        <section className="container-3xl portfolio-footer-row">
            <div className="tags-share-container">
              
              {/* Tags Section */}
              <div className="tags-section">
                <div className="section-label mb-fluid-sm">
                  <Tag className="icon-sm text-neon-purple" />
                  <span>Tags:</span>
                </div>
                
                {eventDetails && eventDetails.tags.length > 0 ? (
                  <div className="tags-list">
                    {eventDetails.tags.map(function (tag, index) {
                      return (
                        <button
                          type="button"
                          key={index}
                          className="tag-badge clickable"
                          onClick={function () { handleTagClick(tag); }}
                        >
                          {tag}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <p className="no-tags-text">
                    No tags available
                  </p>
                )}
              </div>

              {/* Share Section */}
              <div className="share-section">
                <div className="section-label mb-fluid-sm">
                  <ShareNetwork className="icon-sm text-neon-purple" />
                  <span>Share this:</span>
                </div>
                <div className="share-buttons">
                  <ShareComponent
                    label=""
                    title={portfolioEntry.title}
                    description={portfolioEntry.description}
                    url={typeof window !== 'undefined' ? window.location.href : 'https://ashshaw.makeup/portfolio-detail/' + portfolioId}
                    imageUrl={portfolioEntry.images[0] ? portfolioEntry.images[0].src : undefined}
                    variant="inline"
                    align="left"
                  />
                </div>
              </div>
            </div>
        </section>

        {/* Per-item FAQs — shown only if the portfolio entry has item-level FAQs */}
        {portfolioEntry.faqs && portfolioEntry.faqs.length > 0 ? (
          <FaqSection items={portfolioEntry.faqs} />
        ) : null}

        {/* Related Portfolio Section */}
        {relatedPortfolioItems.length > 0 ? (
          <section>
              <h2 className="text-section-h2 text-center mb-fluid-lg">
                Related Work
              </h2>
              
              <ResponsiveGridSlider
                items={relatedPortfolioItems}
                desktopColumns={2}
                keyExtractor={function (item) { return item.id; }}
                renderItem={function (item) {
                  return (
                    <div className="portfolio-detail__related-card-wrapper">
                      <SliderCard
                        data={item}
                        onImageClick={function (imageIndex) {
                           setLightbox({
                             isOpen: true,
                             currentIndex: imageIndex,
                             images: item.images,
                             title: item.title,
                           });
                        }}
                        onReadMore={function () { setCurrentPage('portfolio-detail', item.id); }}
                      />
                    </div>
                  );
                }}
                className="mb-fluid-xl"
              />
          </section>
        ) : null}

        </div>
      </main>

      {/* Dynamic Feedback from matching category/tags */}
      <PortfolioFeedbackSection 
        category={portfolioEntry.category}
        tags={portfolioEntry.tags || []}
      />

      <BlogPreviewSection 
        limit={3}
        title="Recent Insights"
      />

      <FaqSection pageId="portfolio" />

      <EnhancedLightbox
        isOpen={lightbox.isOpen}
        onClose={handleLightboxClose}
        currentIndex={lightbox.currentIndex}
        images={lightbox.images}
        title={lightbox.title}
        onNavigate={function (index) { setLightbox(function (prev) { return { isOpen: prev.isOpen, currentIndex: index, images: prev.images, title: prev.title }; }); }}
      />
    </div>
  );
}