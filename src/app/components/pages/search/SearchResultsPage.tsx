/**
 * @fileoverview Global search results page — polished with tabbed content types
 *
 * Features:
 * - Full-width search input with debounced query
 * - Tabbed content type bar (All, Pages, Posts, Portfolio, Videos, Podcasts, Events, FAQs)
 * - Each tab has a unique icon, neon accent colour and animation
 * - Sub-category chips when a single type tab is active
 * - ArchiveFilters for sort control
 * - Grouped result display (All tab) or flat grid (single type tab)
 * - Search suggestions when input is empty
 * - URL query param sync (?q=, &type=, &sort=, &category=)
 * - Full light/dark mode, WCAG AA keyboard / screen reader support
 * - Max width 1440px (align-wide) layout
 *
 * @component SearchResultsPage
 * @version 4.0.0 — per-tab colours/animations, events+faq tabs, light mode
 */

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useSearchParams, useNavigate } from '../../../lib/router';
import {
  MagnifyingGlass,
  FileText,
  Image,
  Play,
  Microphone,
  Stack,
  Calendar,
  Question,
  BookOpen,
} from '@phosphor-icons/react';
import { searchAllContent } from '../../../utils/searchService';
import { searchUI } from '../../../data/mock/ui/search';
import { ArchiveFilters } from '../../ui/ArchiveFilters';
import { OptimizedImage } from '../../ui/OptimizedImage';
import { formatDate } from '../../../utils/formatDate';
import { Breadcrumbs } from '../../ui/Breadcrumbs';
import { blogCategories } from '../../../data/mock/blog/categories';
import { PORTFOLIO_CATEGORIES } from '../../../utils/portfolioService';
import { videoCategories } from '../../../data/mock/videos';
import { podcastCategories } from '../../../data/mock/podcasts/categories';
import type { SearchResult, SearchFilters } from '../../../data/types/search';
import type { BreadcrumbItem } from '../../ui/Breadcrumbs';
import '../../../../styles/blocks/search.css';
import '../../../../styles/blocks/breadcrumbs.css';

import { setSEO } from '../../../utils/seo';
import { pageSEO } from '../../../data/mock/seo';

import { searchBreadcrumbs } from "../../../data/mock/ui/breadcrumbs";

const breadcrumbs: BreadcrumbItem[] = searchBreadcrumbs;

/** Icon + modifier key per content type (maps to BEM modifiers in CSS) */
const TAB_CONFIG: Record<string, { icon: React.ElementType; modifier: string }> = {
  all:       { icon: Stack,       modifier: 'all' },
  page:      { icon: FileText,     modifier: 'page' },
  blog:      { icon: BookOpen,     modifier: 'blog' },
  portfolio: { icon: Image,        modifier: 'portfolio' },
  video:     { icon: Play,         modifier: 'video' },
  podcast:   { icon: Microphone,   modifier: 'podcast' },
  event:     { icon: Calendar,     modifier: 'event' },
  faq:       { icon: Question,     modifier: 'faq' },
};

/** Also used for result card icons */
const TYPE_ICONS: Record<string, React.ElementType> = {
  blog:      BookOpen,
  portfolio: Image,
  video:     Play,
  podcast:   Microphone,
  page:      FileText,
  event:     Calendar,
  faq:       Question,
};

export function SearchResultsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const queryParam = searchParams.get('q') || '';
  const typeParam = searchParams.get('type') || 'all';
  const sortParam = (searchParams.get('sort') || 'relevance') as SearchFilters['sortBy'];
  const categoryParam = searchParams.get('category') || '';

  const [query, setQuery] = useState(queryParam);
  const [debouncedQuery, setDebouncedQuery] = useState(queryParam);
  const [activeTab, setActiveTab] = useState(typeParam || 'all');
  const [sortBy, setSortBy] = useState(sortParam);
  const [activeSubCategory, setActiveSubCategory] = useState(categoryParam);

  /* Debounce search input */
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(timer);
  }, [query]);

  /* Sync URL */
  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedQuery) params.set('q', debouncedQuery);
    if (activeTab !== 'all') params.set('type', activeTab);
    if (sortBy !== 'relevance') params.set('sort', sortBy);
    if (activeSubCategory) params.set('category', activeSubCategory);
    setSearchParams(params, { replace: true });
  }, [debouncedQuery, activeTab, sortBy, activeSubCategory, setSearchParams]);

  /* SEO */
  useEffect(() => {
    if (debouncedQuery) {
      setSEO({
        title: `Search: "${debouncedQuery}" | Ash Shaw`,
        description: `Search results for "${debouncedQuery}" across Ash Shaw's portfolio, blog, videos, and podcasts.`,
      });
    } else {
      setSEO(pageSEO.search);
    }
  }, [debouncedQuery]);

  /* Search */
  const allResults = useMemo(() => {
    if (!debouncedQuery.trim()) return [];
    return searchAllContent(debouncedQuery, { sortBy });
  }, [debouncedQuery, sortBy]);

  /* Counts per content type (for tab badges) */
  const typeCounts = useMemo(() => {
    const counts = new Map();
    allResults.forEach((r) => {
      counts.set(r.type, (counts.get(r.type) || 0) + 1);
    });
    return counts;
  }, [allResults]);

  /* Filter by active tab */
  const tabResults = useMemo(() => {
    if (activeTab === 'all') return allResults;
    return allResults.filter((r) => r.type === activeTab);
  }, [allResults, activeTab]);

  /* Sub-category chips based on active tab */
  const subCategories = useMemo(() => {
    if (activeTab === 'all') return [];
    switch (activeTab) {
      case 'blog':
        return blogCategories.map((c) => ({ slug: c.slug, name: c.name }));
      case 'portfolio':
        return PORTFOLIO_CATEGORIES.filter((c) => c.id !== 'all').map((c) => ({
          slug: c.slug,
          name: c.name,
        }));
      case 'video':
        return videoCategories.map((c) => ({ slug: c.slug, name: c.name }));
      case 'podcast':
        return podcastCategories.map((c) => ({ slug: c.slug, name: c.name }));
      default:
        return [];
    }
  }, [activeTab]);

  /* Apply sub-category filter */
  const filteredResults = useMemo(() => {
    if (!activeSubCategory) return tabResults;
    return tabResults.filter((r) => {
      if (!r.category) return false;
      const catSlug = r.category
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');
      return catSlug === activeSubCategory || r.category === activeSubCategory;
    });
  }, [tabResults, activeSubCategory]);

  /* Clear sub-category when it no longer applies */
  useEffect(() => {
    if (activeSubCategory && subCategories.length > 0) {
      const stillValid = subCategories.some((sc) => sc.slug === activeSubCategory);
      if (!stillValid) setActiveSubCategory('');
    } else if (subCategories.length === 0 && activeSubCategory) {
      setActiveSubCategory('');
    }
  }, [subCategories, activeSubCategory]);

  /* Group by type (for All tab) */
  const grouped = useMemo(() => {
    const map = new Map();
    filteredResults.forEach((r) => {
      const list = map.get(r.type) || [];
      list.push(r);
      map.set(r.type, list);
    });
    return map;
  }, [filteredResults]);

  /* ArchiveFilters categories for sort dropdown */
  const sortCategories = useMemo(() => {
    return searchUI.contentTypes
      .filter((ct) => typeCounts.has(ct.value))
      .map((ct) => ({
        id: ct.value,
        name: ct.label,
        slug: ct.value,
        count: typeCounts.get(ct.value) || 0,
      }));
  }, [typeCounts]);

  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab);
    setActiveSubCategory('');
  }, []);

  const handleSortChange = useCallback((s: string) => {
    setSortBy(s as SearchFilters['sortBy']);
  }, []);

  const handleSuggestion = useCallback((term: string) => {
    setQuery(term);
    setDebouncedQuery(term);
  }, []);

  const goToResult = useCallback(
    (url: string) => navigate(url),
    [navigate],
  );

  /* Result card renderer */
  const renderCard = useCallback(
    (result: SearchResult) => {
      const Icon = TYPE_ICONS[result.type] || FileText;
      const typeModifier = result.type;
      return (
        <button
          type="button"
          key={result.id}
          className={`search-result-card search-result-card--${typeModifier}`}
          onClick={() => goToResult(result.url)}
        >
          {result.image ? (
            <OptimizedImage
              src={result.image}
              alt=""
              className="search-result-card__image"
              preset="thumbnail"
            />
          ) : (
            <div className={`search-result-card__placeholder search-result-card__placeholder--${typeModifier}`}>
              <Icon className="search-result-card__placeholder-icon" aria-hidden="true" />
            </div>
          )}
          <div className="search-result-card__body">
            <span className={`search-result-card__type search-result-card__type--${typeModifier}`}>
              <Icon className="search-result-card__type-icon" aria-hidden="true" />
              {result.type === 'blog' ? 'post' : result.type}
            </span>
            <span className="search-result-card__title">{result.title}</span>
            {result.excerpt && (
              <span className="search-result-card__excerpt">
                {result.excerpt}
              </span>
            )}
            {result.date && (
              <span className="search-result-card__meta">
                {formatDate(result.date)}
                {result.category ? ` \u00B7 ${result.category}` : ''}
              </span>
            )}
          </div>
        </button>
      );
    },
    [goToResult],
  );

  const hasResults = debouncedQuery && filteredResults.length > 0;

  return (
    <main id="main-content" role="main" tabIndex={-1} className="search-results bg-atomic-noise">
      {/* Header */}
      <div className="search-results__header section-spacing px-horizontal-section">
        <div className="section-container">
          <Breadcrumbs items={breadcrumbs} centered />
          <h1 className="text-section-h2">
            {debouncedQuery ? (
              <span>
                Results for{' '}
                <span className="search-results__keyword">
                  &ldquo;{debouncedQuery}&rdquo;
                </span>
              </span>
            ) : (
              'Search'
            )}
          </h1>
          {debouncedQuery && (
            <p className="search-results__count neon-text-gradient neon-text-gradient--cyan">
              {filteredResults.length}{' '}
              {filteredResults.length === 1 ? 'result' : 'results'} found
            </p>
          )}
        </div>
      </div>

      <div className="search-results__body section-spacing px-horizontal-section">
        <div className="container-wide section-container">
          {/* Search input */}
          <div className="search-results__input-wrapper section-container">
            <div className="search-results__input-row">
              <MagnifyingGlass className="search-results__input-icon" aria-hidden="true" />
              <input
                type="text"
                className="search-results__input-wide"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={searchUI.placeholder}
                aria-label={searchUI.ariaLabel}
                autoFocus
              />
            </div>
          </div>

          {/* Suggestions (when no query) */}
          {!debouncedQuery && (
            <div className="search-suggestions section-container" role="group" aria-label={searchUI.suggestionsLabel}>
              <span className="search-suggestions__label">{searchUI.suggestionsLabel}</span>
              <div className="search-suggestions__chips-row">
                {searchUI.suggestions.map((term) => (
                  <button
                    key={term}
                    type="button"
                    className="search-suggestions__chip"
                    onClick={() => handleSuggestion(term)}
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Tabbed content types — each with unique icon, colour and animation */}
          {debouncedQuery && allResults.length > 0 && (
            <div className="search-tabs section-container" role="tablist" aria-label={searchUI.filterLabels.contentType}>
              <div className="search-tabs__row">
                {/* All tab */}
                {(() => {
                  const cfg = TAB_CONFIG['all'];
                  const Icon = cfg.icon;
                  return (
                    <button
                      type="button"
                      role="tab"
                      aria-selected={activeTab === 'all'}
                      className={`search-tabs__tab search-tabs__tab--${cfg.modifier}${activeTab === 'all' ? ' search-tabs__tab--active' : ''}`}
                      onClick={() => handleTabChange('all')}
                    >
                      <Icon className="search-tabs__tab-icon" aria-hidden="true" />
                      {searchUI.tabAll}
                      <span className="search-tabs__tab-count">({allResults.length})</span>
                    </button>
                  );
                })()}

                {/* Per-type tabs */}
                {searchUI.contentTypes.map((ct) => {
                  const count = typeCounts.get(ct.value) || 0;
                  if (count === 0) return null;
                  const cfgEntry = TAB_CONFIG[ct.value];
                  const cfg = cfgEntry ? cfgEntry : { icon: FileText, modifier: ct.value };
                  const Icon = cfg.icon;
                  return (
                    <button
                      type="button"
                      key={ct.value}
                      role="tab"
                      aria-selected={activeTab === ct.value}
                      className={`search-tabs__tab search-tabs__tab--${cfg.modifier}${activeTab === ct.value ? ' search-tabs__tab--active' : ''}`}
                      onClick={() => handleTabChange(ct.value)}
                    >
                      <Icon className="search-tabs__tab-icon" aria-hidden="true" />
                      {ct.label}
                      <span className="search-tabs__tab-count">({count})</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Sort controls */}
          {debouncedQuery && filteredResults.length > 0 && (
            <ArchiveFilters
              contentType="search"
              categories={sortCategories}
              activeCategories={activeTab === 'all' ? [] : [activeTab]}
              sortBy={sortBy}
              sortOptions={searchUI.sortOptions}
              resultCount={filteredResults.length}
              onCategoryToggle={() => {}}
              onSortChange={handleSortChange}
              onClearAll={() => {
                handleTabChange('all');
                setSortBy('relevance');
              }}
            />
          )}

          {/* Dynamic sub-filters (content-type-specific category chips) */}
          {debouncedQuery && subCategories.length > 0 && (
            <div
              className="search-sub-filters section-container"
              role="group"
              aria-label={searchUI.filterLabels.category}
            >
              <span className="search-sub-filters__label">
                <Stack className="search-sub-filters__label-icon" aria-hidden="true" /> {searchUI.filterLabels.category}
              </span>
              <div className="search-sub-filters__chips">
                {subCategories.map((sc) => (
                  <button
                    type="button"
                    key={sc.slug}
                    className={`search-sub-filters__chip${
                      activeSubCategory === sc.slug ? ' search-sub-filters__chip--active' : ''
                    }`}
                    onClick={() =>
                      setActiveSubCategory((prev) => (prev === sc.slug ? '' : sc.slug))
                    }
                    aria-pressed={activeSubCategory === sc.slug}
                  >
                    {sc.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── Results ── */}
          {hasResults ? (
            activeTab === 'all' ? (
              /* Grouped by type */
              <div className="section-container">
                {Array.from(grouped.entries()).map(([type, items]) => {
                  const cfgGroup = TAB_CONFIG[type];
                  const Icon = cfgGroup ? cfgGroup.icon : FileText;
                  return (
                    <section key={type} className={`search-results__group search-results__group--${type} section-container`}>
                      <h2 className={`search-results__group-title search-results__group-title--${type}`}>
                        <Icon className="search-results__group-icon" aria-hidden="true" />
                        {(() => {
                          const ct = searchUI.contentTypes.find((ct) => ct.value === type);
                          return ct ? ct.label : type;
                        })()}{' '}
                        ({items.length})
                      </h2>
                      <div className="search-results__group-grid">
                        {items.map(renderCard)}
                      </div>
                    </section>
                  );
                })}
              </div>
            ) : (
              /* Flat grid for single type */
              <div className="search-results__flat-grid section-container" role="tabpanel">
                {filteredResults.map(renderCard)}
              </div>
            )
          ) : debouncedQuery ? (
            <div className="search-results__empty section-container">
              <MagnifyingGlass className="search-results__empty-icon" aria-hidden="true" />
              <h2 className="search-results__empty-title">{searchUI.noResults.title}</h2>
              <p className="search-results__empty-message">
                {searchUI.noResults.message}
              </p>
            </div>
          ) : null}
        </div>
      </div>

    </main>
  );
}