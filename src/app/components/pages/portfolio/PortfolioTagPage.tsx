/**
 * @fileoverview Portfolio tag archive page
 * Displays portfolio entries filtered by tag
 *
 * @component PortfolioTagPage
 * @version 3.0.0 — Refactored to use shared TaxonomyArchiveLayout component (with custom toolbar slot)
 */

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from '../../../lib/router';
import { Image, Tag } from '@phosphor-icons/react';
import { UNIFIED_PORTFOLIO_DATA, PORTFOLIO_CATEGORIES } from '../../../utils/portfolioService';
import {
  findPortfolioTagBySlug,
} from '../../../data/mock/portfolio/tags';
import { OptimizedImage } from '../../ui/OptimizedImage';
import '../../../../styles/blocks/portfolio-main-page.css';
import '../../../../styles/blocks/portfolio-card.css';
import '../../../../styles/blocks/archive-filters.css';

import { setSEO } from '../../../utils/seo';
import { portfolioTagSEO } from '../../../data/mock/seo';
import {
  injectSchema,
  removeSchema,
  SCHEMA_IDS,
  buildCollectionSchema,
} from '../../../utils/schemaService';

import { portfolioTagBreadcrumbs } from "../../../data/mock/ui/breadcrumbs";
import { emptyStateMessages } from "../../../data/mock/ui/error";
import { TaxonomyArchiveLayout } from '../shared/TaxonomyArchiveLayout';

var SORT_OPTIONS = [
  { value: 'recent', label: 'Most Recent' },
  { value: 'alphabetical', label: 'A-Z' },
  { value: 'featured', label: 'Featured' },
];

export function PortfolioTagPage() {
  var params = useParams();
  var slug = params.slug;
  var navigate = useNavigate();

  var tag = findPortfolioTagBySlug(slug ? slug : '');
  var sortByState = useState('recent');
  var sortBy = sortByState[0];
  var setSortBy = sortByState[1];

  var filteredEntries = useMemo(function () {
    var tagName = tag ? tag.name : (slug ? slug : '');
    var entries = UNIFIED_PORTFOLIO_DATA.filter(function (entry) {
      var entryTags = entry.tags ? entry.tags : [];
      return entryTags.some(
        function (t) { return t.toLowerCase() === tagName.toLowerCase(); },
      );
    });

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
  }, [tag, slug, sortBy]);

  useEffect(function () {
    if (tag) {
      setSEO(portfolioTagSEO(tag.name));
      var entryCount = filteredEntries ? filteredEntries.length : 0;
      injectSchema(SCHEMA_IDS.collection, buildCollectionSchema(
        tag.name + ' | Portfolio',
        portfolioTagSEO(tag.name).description,
        '/portfolio/tag/' + slug,
        entryCount,
      ));
    }
    return function () {
      removeSchema(SCHEMA_IDS.collection);
    };
  }, [tag, slug, filteredEntries]);

  /** Related tags from the matching entries */
  var relatedTags = useMemo(function () {
    var tagSet = new Set();
    var currentTagName = tag ? tag.name : '';
    filteredEntries.forEach(function (e) {
      var eTags = e.tags ? e.tags : [];
      eTags.forEach(function (t) {
        if (t.toLowerCase() !== currentTagName.toLowerCase()) {
          tagSet.add(t);
        }
      });
    });
    return Array.from(tagSet).slice(0, 8);
  }, [filteredEntries, tag]);

  var renderPortfolioCard = useCallback(
    function (entry: any) {
      return (
        <article
          key={entry.id}
          className="portfolio-card"
          onClick={function () { navigate('/portfolio/' + entry.id); }}
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
    <main
      id="main-content"
      role="main"
      tabIndex={-1}
      className="portfolio-main bg-atomic-noise"
    >
      {/* ── Hero header ── */}
      <div className="portfolio-main__header section-spacing px-horizontal-section">
        <div className="container-wide section-container">
          <Breadcrumbs items={portfolioTagBreadcrumbs(tag ? tag.name : (slug ? slug : ''))} centered />
          <Tag className="portfolio-main__header-icon" aria-hidden="true" />
          <h1 className="text-hero-h1 text-gradient-pink-purple-blue">
            {tag ? tag.name : slug}
          </h1>
          {tag && tag.description ? (
            <p className="text-body-guideline">{tag.description}</p>
          ) : null}
          <p className="portfolio-main__count">
            <strong>{filteredEntries.length}</strong>{' '}
            {filteredEntries.length === 1 ? 'entry' : 'entries'}
          </p>
        </div>
      </div>

      {/* ── Content area ── */}
      <div className="portfolio-main-content section-spacing px-horizontal-section">
        <div className="container-wide section-container">

          {/* Sort & related tags toolbar */}
        <div className="portfolio-main__toolbar">
          {/* Sort pills */}
          <div className="portfolio-main__sort-chips" role="group" aria-label="Sort portfolio entries">
            <span className="portfolio-main__sort-label">Sort by</span>
            {SORT_OPTIONS.map(function (opt) {
              return (
                <button
                  type="button"
                  key={opt.value}
                  className={'archive-filters__chip ' + (sortBy === opt.value ? 'archive-filters__chip--active' : '')}
                  onClick={function () { setSortBy(opt.value); }}
                  aria-pressed={sortBy === opt.value}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>

          {/* Related tags */}
          {relatedTags.length > 0 ? (
            <div className="portfolio-main__related-tags">
              <span className="portfolio-main__related-label">Related tags</span>
              <div className="portfolio-main__related-chips">
                {relatedTags.map(function (rt) {
                  return (
                    <button
                      type="button"
                      key={rt}
                      className="archive-filters__chip"
                      onClick={function () {
                        navigate(
                          '/portfolio/tag/' + rt.toLowerCase().replace(/\s+/g, '-'),
                        );
                      }}
                    >
                      {rt}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>

        <hr className="portfolio-main__divider" aria-hidden="true" />

        {/* Card grid */}
        {filteredEntries.length > 0 ? (
          <div className="portfolio-card-grid">
            {filteredEntries.map(renderPortfolioCard)}
          </div>
        ) : (
          <div className="error-card">
            <Tag className="icon-xl" aria-hidden="true" />
            <h3 className="error-title">{emptyStateMessages.portfolio.title}</h3>
            <p className="error-message">
              No portfolio entries match the tag &ldquo;{tag ? tag.name : slug}&rdquo;.
            </p>
          </div>
        )}
      </div>
      </div>

      <FaqSection pageId="portfolio" />
    </main>
  );
}
