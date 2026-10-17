/**
 * @fileoverview Portfolio main page component for Ash Shaw Makeup Portfolio
 * 
 * Comprehensive portfolio listing and filtering with 2-column grid layout similar to the blog page.
 * Features category filtering, pagination, and responsive design following the complete brand 
 * guidelines and accessibility standards.
 * 
 * @author Ash Shaw Portfolio Team
 * @version 1.7.0 - Terminal Boot Animations (Phase 1)
 */

import React, { useState, useCallback, useMemo, useEffect } from 'react';

import { PortfolioCard } from '../../ui/PortfolioCard';
import { EnhancedLightbox } from '../../ui/EnhancedLightbox';
import { useIsMobile } from '../../ui/use-mobile';
import { FaqSection } from '../../sections/FaqSection';
import { ArchiveFilters } from '../../ui/ArchiveFilters';

import { 
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../../ui/pagination';
import { 
  getPortfolioCategories, 
  type UnifiedPortfolioEntry 
} from '../../../utils/portfolioService';
import { getPortfolioCategoryCount } from '../../../utils/contentCounts';
import { portfolioCategoryData } from '../../../data/mock/portfolio/categories';
import { useAppNavigate } from '../../../hooks/useAppNavigate';
import { setSEO } from '../../../utils/seo';
import { pageSEO } from '../../../data/mock/seo';
import {
  injectSchema,
  removeSchema,
  SCHEMA_IDS,
  buildImageGallerySchema,
} from '../../../utils/schemaService';
import { usePortfolioEntries } from '../../../hooks/useContent';
import { OptimizedImage } from '../../ui/OptimizedImage';
import { portfolioHero } from '../../../data/mock/pages/portfolio';
import "../../../../styles/blocks/portfolio-main-page.css";
import "../../../../styles/blocks/page-header-animations.css";
import "../../../../styles/animations.css";

interface PortfolioCardEntry {
  id: string;
  title: string;
  subtitle?: string;
  date?: string;
  featuredImage: {
    src: string;
    alt: string;
    caption?: string;
    description?: string;
  };
  images: Array<{
    src: string;
    alt: string;
    caption?: string;
    description?: string;
  }>;
  category: string;
  featured?: boolean;
  displayOrder?: number;
  tags?: string[];
}

interface PortfolioMainPageProps {
  initialCategory?: string;
}

interface PortfolioPageState {
  page: number;
  category: string | undefined;
  limit: number;
}

const PORTFOLIO_CATEGORIES_DATA = getPortfolioCategories();

/** Bundler-safe type alias — avoids Array<T> nested generic in hook calls */
type PortfolioLightboxImage = { src: string; alt: string; caption?: string; description?: string };
type PortfolioLightboxState = {
  isOpen: boolean;
  currentIndex: number;
  images: PortfolioLightboxImage[];
  title: string;
};
const INITIAL_PORTFOLIO_LIGHTBOX: PortfolioLightboxState = {
  isOpen: false, currentIndex: 0, images: [], title: '',
};

export function PortfolioMainPage(props: PortfolioMainPageProps) {
  var initialCategory = props.initialCategory;
  const setCurrentPage = useAppNavigate();
  const isMobile = useIsMobile();

  useEffect(function() {
    setSEO(pageSEO.portfolio);
  }, []);

  const portfolioStateInit: PortfolioPageState = {
    page: 1,
    category: initialCategory,
    limit: 10,
  };
  const [portfolioState, setPortfolioState] = useState(portfolioStateInit);

  const activeCategoriesInit: string[] = initialCategory ? [initialCategory] : [];
  const [activeCategories, setActiveCategories] = useState(activeCategoriesInit);
  const [sortBy, setSortBy] = useState('recent');

  /** Lookup: slug → category id (e.g. 'uv-blacklight' → 'UV Makeup') */
  const slugToCategoryId = useMemo(function () {
    const map = new Map();
    portfolioCategoryData.forEach(function (c) { map.set(c.slug, c.id); });
    return map;
  }, []);

  const archiveCategories = useMemo(function () {
    return portfolioCategoryData.map(function (c) {
      return {
        id: c.id,
        name: c.name,
        slug: c.slug,
        count: getPortfolioCategoryCount(c.id),
      };
    });
  }, []);

  const PORTFOLIO_SORT_OPTIONS = useMemo(function () {
    return [
      { value: 'recent', label: 'Most Recent' },
      { value: 'alphabetical', label: 'A-Z' },
      { value: 'featured', label: 'Featured' },
    ];
  }, []);

  /**
   * MEMOIZED HOOK OPTIONS - Fixes flickering issue by stabilizing the dependency
   * passed to usePortfolioEntries.
   */
  const portfolioOptions = useMemo(function() {
    return {
      category: 'all', 
      page: 1, 
      limit: 100 
    };
  }, []);

  const entriesHook = usePortfolioEntries(portfolioOptions);
  const entriesData = entriesHook.data;
  const entriesLoading = entriesHook.loading;
  const entriesError = entriesHook.error;
  const refreshEntries = entriesHook.refresh;

  // Inject ImageGallery schema once all entries are available
  useEffect(function () {
    const hasEntries = entriesData && entriesData.entries;
    if (hasEntries) {
      injectSchema(SCHEMA_IDS.gallery, buildImageGallerySchema(entriesData.entries));
    }
    return function () {
      removeSchema(SCHEMA_IDS.gallery);
    };
  }, [entriesData]);

  const handleArchiveCategoryToggle = useCallback(function (slug) {
    setActiveCategories(function (prev) {
      return prev.indexOf(slug) !== -1 ? prev.filter(function (s) { return s !== slug; }) : [slug];
    });
    // Reset to page 1 when filters change
    setPortfolioState(function (prev) {
      return {
        page: 1,
        category: prev.category,
        limit: prev.limit
      };
    });
  }, []);

  // Update state when initialCategory changes
  useEffect(function () {
    setPortfolioState(function (prev) {
      return {
        page: 1,
        category: initialCategory,
        limit: prev.limit
      };
    });
  }, [initialCategory]);
  
  const [lightbox, setLightbox] = useState(INITIAL_PORTFOLIO_LIGHTBOX);
  
  const scrollToTop = function () {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
  };

  const transformUnifiedToPortfolioCard = useCallback(function (entries) {
    return entries.map(function (entry) {
      return {
        id: entry.id,
        title: entry.title,
        subtitle: entry.subtitle || entry.category,
        date: entry.date,
        featuredImage: entry.images && entry.images[0] ? entry.images[0] : {
          src: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800',
          alt: 'Default portfolio image',
          caption: 'Portfolio Image',
          description: 'Portfolio artwork'
        },
        images: entry.images || [],
        category: entry.category,
        featured: entry.featured,
        displayOrder: entry.displayOrder,
        tags: entry.tags
      };
    });
  }, []);

  // Calculate filtered entries
  const portfolioEntries = useMemo(function () {
    if (!entriesData || !entriesData.entries) return [];

    var entries = transformUnifiedToPortfolioCard(entriesData.entries);

    // Filter by active categories from ArchiveFilters
    if (activeCategories.length > 0) {
      const activeCategoryIds = new Set();
      for (var i = 0; i < activeCategories.length; i++) {
        const catId = slugToCategoryId.get(activeCategories[i]);
        if (catId) activeCategoryIds.add(catId);
      }
      entries = entries.filter(function (entry) { return activeCategoryIds.has(entry.category); });
    }

    // Sort by sortBy option
    switch (sortBy) {
      case 'alphabetical':
        entries = entries.sort(function (a, b) { return a.title.localeCompare(b.title); });
        break;
      case 'featured':
        entries = entries.sort(function (a, b) {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return new Date(a.date || '').getTime() - new Date(b.date || '').getTime();
        });
        break;
      case 'recent':
      default:
        entries = entries.sort(function (a, b) {
          return new Date(b.date || '').getTime() - new Date(a.date || '').getTime();
        });
        break;
    }

    return entries;
  }, [entriesData, transformUnifiedToPortfolioCard, activeCategories, sortBy, slugToCategoryId]);

  // Client-side pagination based on filtered results
  const pagination = useMemo(function () {
    const total = portfolioEntries.length;
    const totalPages = Math.ceil(total / portfolioState.limit);
    
    return {
      page: portfolioState.page,
      total: total,
      limit: portfolioState.limit,
      hasNext: portfolioState.page < totalPages,
      hasPrevious: portfolioState.page > 1,
      totalPages: totalPages,
    };
  }, [portfolioEntries.length, portfolioState.page, portfolioState.limit]);

  const currentPageEntries = useMemo(function () {
    const startIndex = (portfolioState.page - 1) * portfolioState.limit;
    const endIndex = startIndex + portfolioState.limit;
    return portfolioEntries.slice(startIndex, endIndex);
  }, [portfolioEntries, portfolioState.page, portfolioState.limit]);

  const handleCategoryChange = useCallback(function (categoryId) {
    setCurrentPage('portfolio', undefined, categoryId === 'all' ? undefined : categoryId);
  }, [setCurrentPage]);

  const handlePageChange = useCallback(function (newPage) {
    setPortfolioState(function (prev) {
      return {
        page: newPage,
        category: prev.category,
        limit: prev.limit
      };
    });

    scrollToTop();

    const announcement = document.getElementById('announcements');
    if (announcement) {
      announcement.textContent = 'Navigated to page ' + newPage + ' of portfolio';
    }
  }, []);

  const handleNavigateToDetail = useCallback(function (portfolioId) {
    setCurrentPage('portfolio-detail', portfolioId);
  }, [setCurrentPage]);

  const handlePortfolioClick = useCallback(function (entry, imageIndex) {
    if (imageIndex === undefined) imageIndex = 0;
    const entryImages = entry.images;
    const images = entryImages.map(function (img) {
      return {
        src: img.src,
        alt: img.alt,
        caption: img.caption,
        description: img.description,
      };
    });

    setLightbox({
      isOpen: true,
      currentIndex: imageIndex,
      images: images,
      title: entry.title,
    });

    const announcement = document.getElementById('announcements');
    if (announcement) {
      announcement.textContent = 'Opened ' + entry.title + ' portfolio gallery';
    }
  }, []);

  const closeLightbox = useCallback(function () {
    setLightbox(function (prev) {
      return {
        isOpen: false,
        currentIndex: prev.currentIndex,
        images: prev.images,
        title: prev.title
      };
    });

    const announcement = document.getElementById('announcements');
    if (announcement) {
      announcement.textContent = 'Closed portfolio gallery';
    }
  }, []);

  const handleLightboxNavigate = useCallback(function(index) {
    setLightbox(function(prev) {
      return {
        isOpen: prev.isOpen,
        currentIndex: index,
        images: prev.images,
        title: prev.title
      };
    });
  }, []);

  const clearAllFilters = function() {
    setActiveCategories([]);
    setSortBy('recent');
    handleCategoryChange('all');
  };

  /**
   * Helper to render pagination items - avoids IIFE arrow functions in JSX.
   */
  const renderPaginationItems = function() {
    const totalPages = pagination.totalPages;
    const currentPage = portfolioState.page;
    const maxVisible = isMobile ? 3 : 5;
    const items = [];
    
    if (totalPages <= maxVisible) {
      for (var i = 1; i <= totalPages; i++) {
        (function(pageNumber) {
          const isCurrentPage = pageNumber === currentPage;
          items.push(
            <PaginationItem key={pageNumber}>
              <PaginationLink
                onClick={function () { handlePageChange(pageNumber); }}
                isActive={isCurrentPage}
                className="pagination-btn"
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          );
        })(i);
      }
    } else {
      // First page
      items.push(
        <PaginationItem key={1}>
          <PaginationLink
            onClick={function () { handlePageChange(1); }}
            isActive={currentPage === 1}
            className="pagination-btn"
          >
            1
          </PaginationLink>
        </PaginationItem>
      );
      
      // Ellipsis 1
      if (currentPage > 3) {
        items.push(
          <PaginationItem key="ellipsis-1">
            <PaginationEllipsis className="pagination-ellipsis" />
          </PaginationItem>
        );
      }
      
      // Middle pages
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (var j = start; j <= end; j++) {
        (function(pageNumber) {
          items.push(
            <PaginationItem key={pageNumber}>
              <PaginationLink
                onClick={function () { handlePageChange(pageNumber); }}
                isActive={currentPage === pageNumber}
                className="pagination-btn"
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          );
        })(j);
      }
      
      // Ellipsis 2
      if (currentPage < totalPages - 2) {
        items.push(
          <PaginationItem key="ellipsis-2">
            <PaginationEllipsis className="pagination-ellipsis" />
          </PaginationItem>
        );
      }
      
      // Last page
      if (totalPages > 1) {
        items.push(
          <PaginationItem key={totalPages}>
            <PaginationLink
              onClick={function () { handlePageChange(totalPages); }}
              isActive={currentPage === totalPages}
              className="pagination-btn"
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        );
      }
    }
    
    return items;
  };

  return (
    <main id="main-content" role="main" tabIndex={-1} className="portfolio-main-page bg-atomic-noise">
      {/* Portfolio page header */}
      <section className="portfolio-page-header section-spacing px-horizontal-section page-header--animated">
        <div className="container-wide section-container">
          <h1 className="text-hero-h1 text-gradient-pink-purple-blue page-header__title--fade-in">
            Portfolio
          </h1>
          <p className="portfolio-page-header__subtitle page-header__subtitle--fade-in">
            {portfolioHero.subtitle}
          </p>
        </div>
      </section>

      {/* Category Filters */}
      <section className="category-filters-section section-spacing px-horizontal-section page-filters--fade-in">
        <div className="container-wide section-container">
          <ArchiveFilters
            contentType="portfolio"
            categories={archiveCategories}
            activeCategories={activeCategories}
            sortBy={sortBy}
            sortOptions={PORTFOLIO_SORT_OPTIONS}
            resultCount={portfolioEntries.length}
            onCategoryToggle={handleArchiveCategoryToggle}
            onSortChange={setSortBy}
            onClearAll={clearAllFilters}
          />
        </div>
      </section>

      {/* Portfolio Content */}
      <section className="portfolio-content-section section-spacing px-horizontal-section page-content--fade-in">
        <div className="container-wide section-container">

          {entriesLoading ? (
            <div className="responsive-grid">
              {[0, 1, 2, 3, 4, 5].map(function (i) {
                return (
                  <div key={i} className="portfolio-card-skeleton">
                    <div className="portfolio-card-skeleton__image"></div>
                    <div className="portfolio-card-skeleton__content">
                      <div className="skeleton-bar skeleton-bar--subtitle mb-fluid-sm skeleton-bar--w-25"></div>
                      <div className="skeleton-bar skeleton-bar--title mb-fluid-sm"></div>
                      <div className="skeleton-bar skeleton-bar--text mb-fluid-sm skeleton-bar--w-85"></div>
                      <div className="skeleton-bar skeleton-bar--text skeleton-bar--w-75"></div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : null}

          {entriesError && !entriesLoading ? (
            <div className="portfolio-error">
              <button
                type="button"
                onClick={refreshEntries}
                className="btn btn--neon-primary"
              >
                Try Again
              </button>
            </div>
          ) : null}

          {!entriesLoading && !entriesError && currentPageEntries && currentPageEntries.length > 0 ? (
            <div>
              <div className="responsive-grid">
                {currentPageEntries.map(function (entry, index) {
                  return (
                    <PortfolioCard
                      key={entry.id}
                      entry={entry}
                      onImageClick={function (imageIndex) { handlePortfolioClick(entry, imageIndex); }}
                      onNavigateToDetail={handleNavigateToDetail}
                    />
                  );
                })}
              </div>

              {pagination.totalPages > 1 ? (
                <div className="pagination-wrapper">
                  <Pagination className="mb-fluid-2xl">
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          onClick={function () { handlePageChange(Math.max(1, portfolioState.page - 1)); }}
                          disabled={portfolioState.page <= 1}
                          className="pagination-nav-button"
                        />
                      </PaginationItem>
                      
                      {renderPaginationItems()}
                      
                      <PaginationItem>
                        <PaginationNext 
                          onClick={function () { handlePageChange(Math.min(pagination.totalPages, portfolioState.page + 1)); }}
                          disabled={portfolioState.page >= pagination.totalPages}
                          className="pagination-nav-button"
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              ) : null}
            </div>
          ) : null}

          {!entriesLoading && !entriesError && (!currentPageEntries || currentPageEntries.length === 0) ? (
            <div className="portfolio-empty">
              <p className="portfolio-empty__title">
                No portfolio entries found
              </p>
              <p className="portfolio-empty__message">
                {portfolioState.category 
                  ? 'No entries in the selected category.'
                  : 'No portfolio entries available at the moment.'
                }
              </p>
              {portfolioState.category ? (
                <button
                  type="button"
                  onClick={function () { handleCategoryChange('all'); }}
                  className="btn btn--neon-secondary"
                >
                  View All Work
                </button>
              ) : null}
            </div>
          ) : null}
        </div>
      </section>

      <EnhancedLightbox
        isOpen={lightbox.isOpen}
        onClose={closeLightbox}
        currentIndex={lightbox.currentIndex}
        images={lightbox.images}
        title={lightbox.title}
        onNavigate={handleLightboxNavigate}
      />

      <FaqSection pageId="portfolio" />
    </main>
  );
}