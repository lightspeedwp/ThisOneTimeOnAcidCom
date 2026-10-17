/**
 * @fileoverview Portfolio category archive page
 * Displays portfolio entries filtered by category with ArchiveFilters
 *
 * @component PortfolioCategoryPage
 * @version 2.0.0 — Refactored to use shared TaxonomyArchiveLayout component
 */

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useParams, useNavigate } from '../../../lib/router';
import { Image } from '@phosphor-icons/react';
import {
  PORTFOLIO_CATEGORIES,
  UNIFIED_PORTFOLIO_DATA,
} from '../../../utils/portfolioService';
import { portfolioCategoryData } from '../../../data/mock/portfolio/categories';
import { OptimizedImage } from '../../ui/OptimizedImage';
import { getPortfolioCategoryCount } from '../../../utils/contentCounts';
import '../../../../styles/blocks/portfolio-main-page.css';
import '../../../../styles/blocks/portfolio-card.css';

import { setSEO } from '../../../utils/seo';
import { portfolioCategorySEO } from '../../../data/mock/seo';
import { portfolioCategoryBreadcrumbs } from '../../../data/mock/ui/breadcrumbs';
import { emptyStateMessages } from '../../../data/mock/ui/error';
import {
  injectSchema,
  removeSchema,
  SCHEMA_IDS,
  buildCollectionSchema,
} from '../../../utils/schemaService';
import { TaxonomyArchiveLayout } from '../shared/TaxonomyArchiveLayout';

var SORT_OPTIONS = [
  { value: 'recent', label: 'Most Recent' },
  { value: 'alphabetical', label: 'A-Z' },
  { value: 'featured', label: 'Featured' },
];

export function PortfolioCategoryPage() {
  var params = useParams();
  var slug = params.slug;
  var navigate = useNavigate();

  var category = PORTFOLIO_CATEGORIES.find(function (c) { return c.slug === slug; });
  var catData = portfolioCategoryData.find(function (c) { return c.slug === slug; });

  var activeCategoriesInit: string[] = slug ? [slug] : [];
  var stateCategories = useState(activeCategoriesInit);
  var activeCategories = stateCategories[0];
  var setActiveCategories = stateCategories[1];
  var stateSort = useState('recent');
  var sortBy = stateSort[0];
  var setSortBy = stateSort[1];

  var categories = useMemo(
    function () {
      return PORTFOLIO_CATEGORIES.filter(function (c) { return c.id !== 'all'; }).map(function (c) {
        return {
          id: c.id,
          name: c.name,
          slug: c.slug,
          count: getPortfolioCategoryCount(c.id),
        };
      }).filter(function (c) { return c.count > 0; });
    },
    [],
  );

  var filteredEntries = useMemo(function () {
    var entries = [];
    for (var i = 0; i < UNIFIED_PORTFOLIO_DATA.length; i++) {
      entries.push(UNIFIED_PORTFOLIO_DATA[i]);
    }

    if (activeCategories.length > 0) {
      var activeCat = PORTFOLIO_CATEGORIES.find(
        function (c) { return c.slug === activeCategories[0]; },
      );
      if (activeCat && activeCat.id !== 'all') {
        entries = entries.filter(function (e) { return e.category === activeCat.id; });
      }
    }

    switch (sortBy) {
      case 'recent':
        entries.sort(function (a, b) {
          var da = a.date ? new Date(a.date).getTime() : 0;
          var db = b.date ? new Date(b.date).getTime() : 0;
          return db - da;
        });
        break;
      case 'alphabetical':
        entries.sort(function (a, b) { return a.title.localeCompare(b.title); });
        break;
      case 'featured':
        entries.sort(function (a, b) { return (b.featured ? 1 : 0) - (a.featured ? 1 : 0); });
        break;
    }

    return entries;
  }, [activeCategories, sortBy]);

  useEffect(function () {
    if (category) {
      setSEO(portfolioCategorySEO(category.name));
      injectSchema(SCHEMA_IDS.collection, buildCollectionSchema(
        category.name + ' | Portfolio',
        portfolioCategorySEO(category.name).description,
        '/portfolio/category/' + slug,
        filteredEntries ? filteredEntries.length : 0,
      ));
    }
    return function () {
      removeSchema(SCHEMA_IDS.collection);
    };
  }, [category, slug, filteredEntries]);

  useEffect(function () {
    setActiveCategories(slug ? [slug] : []);
  }, [slug]);

  var handleCategoryToggle = useCallback(
    function (catSlug: string) {
      var isActive = activeCategories.indexOf(catSlug) !== -1;
      var newCategories = isActive
        ? activeCategories.filter(function (s) { return s !== catSlug; })
        : [catSlug];

      setActiveCategories(newCategories);

      if (newCategories.length === 0) {
        navigate('/portfolio');
      } else {
        navigate('/portfolio/category/' + catSlug);
      }
    },
    [navigate, activeCategories],
  );

  var renderPortfolioCard = useCallback(
    function (entry: any) {
      return (
        <article
          key={entry.id}
          className="portfolio-card"
          onClick={function () {
            navigate('/portfolio/' + entry.id);
          }}
          role="button"
          tabIndex={0}
          onKeyDown={function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              navigate('/portfolio/' + entry.id);
            }
          }}
          aria-label={entry.title}
        >
          <div className="portfolio-card__image-container">
            {entry.images[0] ? (
              <OptimizedImage
                src={entry.images[0].src}
                alt={entry.images[0].alt}
                className="portfolio-card__image"
                preset="thumbnail"
              />
            ) : (
              <div className="portfolio-card__placeholder">
                <Image className="icon-xl" />
              </div>
            )}
            <div className="portfolio-card__overlay">
              <a
                href={(function () {
                  var cat = PORTFOLIO_CATEGORIES.find(function (c) { return c.id === entry.category; });
                  return cat && cat.slug ? '/portfolio/category/' + cat.slug : '/portfolio';
                })()}
                className="portfolio-card__category clickable"
                onClick={function (e) {
                  e.stopPropagation();
                  e.preventDefault();
                  var cat = PORTFOLIO_CATEGORIES.find(function (c) { return c.id === entry.category; });
                  if (cat && cat.slug) {
                    navigate('/portfolio/category/' + cat.slug);
                  }
                }}
                aria-label={'View all ' + entry.category + ' portfolio entries'}
              >
                {entry.category}
              </a>
            </div>
          </div>
          <div className="portfolio-card__content">
            <h2 className="portfolio-card__title">{entry.title}</h2>
            <p className="portfolio-card__subtitle">{entry.subtitle}</p>
          </div>
        </article>
      );
    },
    [navigate],
  );

  return (
    <TaxonomyArchiveLayout
      contentType="portfolio"
      items={filteredEntries}
      renderCard={renderPortfolioCard}
      breadcrumbs={portfolioCategoryBreadcrumbs(category ? category.name : 'Category')}
      title={category ? category.name : 'Portfolio'}
      description={catData && catData.description ? catData.description : undefined}
      showFilters={true}
      filterConfig={{
        categories: categories,
        activeCategories: activeCategories,
        sortBy: sortBy,
        sortOptions: SORT_OPTIONS,
        resultCount: filteredEntries.length,
        onCategoryToggle: handleCategoryToggle,
        onSortChange: setSortBy,
        onClearAll: function () {
          setActiveCategories([]);
          navigate('/portfolio');
        },
      }}
      emptyState={{
        title: emptyStateMessages.portfolio.title,
        message: 'No portfolio entries match the current filters.',
      }}
      faqPageId="portfolio"
      mainClassName="portfolio-main bg-atomic-noise"
      headerClassName="portfolio-main__header section-spacing px-horizontal-section"
      contentClassName="portfolio-main-content section-spacing px-horizontal-section"
      gridClassName="portfolio-card-grid"
    />
  );
}
