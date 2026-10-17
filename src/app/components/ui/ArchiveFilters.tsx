/**
 * @fileoverview Reusable archive filter bar
 *
 * Supports multi-select category chips, sort options, active filter summary,
 * result count, and a full-screen mobile filter overlay.
 *
 * Layout (desktop):
 * ┌──────────────────────────────────┬──────────────────┐
 * │ Categories: [chip] [chip] [chip] │ Active Filters    │
 * │                                  │ [pill ×] [pill ×] │
 * │ Results: 12    Sort by: [pills]  │ [Clear All]       │
 * └──────────────────────────────────┴──────────────────┘
 *
 * @component ArchiveFilters
 * @version 3.0.0 - Animated result count + active filter context labels
 */

import React, { useState, useEffect } from 'react';
import { SlidersHorizontal, X } from '@phosphor-icons/react';
import { filtersUI } from '../../data/mock/ui/filters';
import { useModal } from '../common/ModalContext';
import { useAnimatedCount } from '../../hooks/useAnimatedCount';
import '../../../styles/blocks/archive-filters.css';

export interface FilterCategory {
  id: string;
  name: string;
  slug: string;
  count?: number;
}

export interface SortOption {
  value: string;
  label: string;
}

export interface ArchiveFiltersProps {
  contentType: string;
  categories: FilterCategory[];
  activeCategories: string[];
  sortBy: string;
  sortOptions: SortOption[];
  resultCount: number;
  onCategoryToggle: (slug: string) => void;
  onSortChange: (sortBy: string) => void;
  onClearAll: () => void;
}

export function ArchiveFilters({
  contentType,
  categories,
  activeCategories,
  sortBy,
  sortOptions,
  resultCount,
  onCategoryToggle,
  onSortChange,
  onClearAll,
}: ArchiveFiltersProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { registerModal, updateModal, unregisterModal } = useModal();

  const modalId = `archive-filters-${contentType}`;

  useEffect(() => {
    registerModal(modalId, 'drawer', { component: 'ArchiveFilters' });
    return () => unregisterModal(modalId);
  }, [registerModal, unregisterModal, modalId]);

  useEffect(() => {
    updateModal(modalId, mobileOpen, { component: 'ArchiveFilters' });
  }, [updateModal, mobileOpen, modalId]);

  /** Only show categories that have content (count > 0 when count is provided) */
  const visibleCategories = categories.filter(
    cat => {
      const isCountUndefined = cat.count === undefined;
      const hasCount = cat.count > 0;
      return isCountUndefined || hasCount;
    },
  );

  const hasActiveFilters = activeCategories.length > 0;

  const activeCategoryNames = activeCategories
    .map(slug => {
      const found = visibleCategories.find(c => c.slug === slug);
      return found ? found.name : slug;
    })
    .filter(Boolean);

  const animatedResultCount = useAnimatedCount(resultCount);

  /* Build the filter context string (e.g. "in Tutorials, Festival Tips") */
  const filterContext = activeCategoryNames.length > 0
    ? ` ${filtersUI.resultsInLabel} ${activeCategoryNames.join(', ')}`
    : '';

  return (
    <div className="archive-filters">
      {/* Mobile trigger */}
      <button
        type="button"
        className="archive-filters__mobile-trigger"
        onClick={() => setMobileOpen(true)}
        aria-label={filtersUI.mobileFilterButton}
      >
        <SlidersHorizontal className="icon-sm" aria-hidden="true" />
        {filtersUI.mobileFilterButton}
        {hasActiveFilters && (
          <span className="archive-filters__chip-count">
            ({activeCategories.length})
          </span>
        )}
      </button>

      {/* Desktop filters */}
      <div className="archive-filters__desktop-filters">
        {/* Top row: Categories (left) + Active Summary (right) */}
        <div className="archive-filters__top-row">
          <div className="archive-filters__categories">
            {/* Categories label + chips */}
            <span className="archive-filters__label">
              {filtersUI.categoriesLabel}
            </span>
            <div className="archive-filters__chip-row">
              {visibleCategories.map(cat => (
                <button
                  type="button"
                  key={cat.slug}
                  className={`archive-filters__chip ${
                    activeCategories.includes(cat.slug)
                      ? 'archive-filters__chip--active'
                      : ''
                  }`}
                  onClick={() => onCategoryToggle(cat.slug)}
                  aria-pressed={activeCategories.includes(cat.slug)}
                >
                  {cat.name}
                  {cat.count !== undefined && (
                    <span className="archive-filters__chip-count">
                      {cat.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Active summary column */}
          {hasActiveFilters && (
            <div className="archive-filters__active-summary">
              <span className="archive-filters__active-title">
                {filtersUI.activeFiltersLabel}
              </span>
              <div className="archive-filters__active-pills">
                {activeCategoryNames.map(name => (
                  <button
                    type="button"
                    key={name}
                    className="archive-filters__active-pill"
                    onClick={() => {
                      const cat = categories.find(c => c.name === name);
                      if (cat) onCategoryToggle(cat.slug);
                    }}
                    aria-label={`Remove filter: ${name}`}
                  >
                    {name}
                    <span className="archive-filters__active-pill-x" aria-hidden="true">
                      &times;
                    </span>
                  </button>
                ))}
              </div>
              <button
                type="button"
                className="archive-filters__clear-btn"
                onClick={onClearAll}
              >
                {filtersUI.clearAllLabel}
              </button>
            </div>
          )}
        </div>

        {/* Bottom row: Result count (left) + Sort (right) */}
        <div className="archive-filters__meta-row px-[0px] pt-[0px] pb-[8px]">
          <p className="archive-filters__result-count m-[0px]" aria-live="polite" aria-atomic="true">
            {filtersUI.resultsLabel}{' '}
            <strong key={resultCount} className="archive-filters__result-number">
              {animatedResultCount}
            </strong>
            {filterContext && (
              <span className="archive-filters__result-context">{filterContext}</span>
            )}
          </p>

          <div className="archive-filters__sort-row">
            <span className="archive-filters__sort-label">
              {filtersUI.sortLabel}:
            </span>
            {sortOptions.map(opt => (
              <button
                type="button"
                key={opt.value}
                className={`archive-filters__sort-chip ${
                  sortBy === opt.value
                    ? 'archive-filters__sort-chip--active'
                    : ''
                }`}
                onClick={() => onSortChange(opt.value)}
                aria-pressed={sortBy === opt.value}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="archive-filters__overlay"
          role="dialog"
          aria-modal="true"
          aria-label={filtersUI.filterLabel}
        >
          <div className="archive-filters__overlay-header">
            <h2 className="archive-filters__overlay-title">
              {filtersUI.filterLabel}
            </h2>
            <button
              type="button"
              className="archive-filters__overlay-close"
              onClick={() => setMobileOpen(false)}
              aria-label="Close filters"
            >
              <X className="icon-md" />
            </button>
          </div>

          <div className="archive-filters__overlay-body">
            {/* Categories */}
            <div>
              <p className="archive-filters__overlay-section-title">
                {filtersUI.categoriesLabel}
              </p>
              <div className="archive-filters__overlay-chips">
                {visibleCategories.map(cat => (
                  <button
                    type="button"
                    key={cat.slug}
                    className={`archive-filters__overlay-chip ${
                      activeCategories.includes(cat.slug)
                        ? 'archive-filters__overlay-chip--active'
                        : ''
                    }`}
                    onClick={() => onCategoryToggle(cat.slug)}
                    aria-pressed={activeCategories.includes(cat.slug)}
                  >
                    {cat.name}
                    {cat.count !== undefined && (
                      <span className="archive-filters__chip-count">
                        ({cat.count})
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort */}
            <div>
              <p className="archive-filters__overlay-section-title">
                {filtersUI.sortLabel}
              </p>
              <div className="archive-filters__overlay-chips">
                {sortOptions.map(opt => (
                  <button
                    type="button"
                    key={opt.value}
                    className={`archive-filters__overlay-chip ${
                      sortBy === opt.value
                        ? 'archive-filters__overlay-chip--active'
                        : ''
                    }`}
                    onClick={() => onSortChange(opt.value)}
                    aria-pressed={sortBy === opt.value}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="archive-filters__overlay-footer">
            <button
              type="button"
              className="archive-filters__overlay-apply"
              onClick={() => setMobileOpen(false)}
            >
              {filtersUI.showResultsLabel} ({resultCount})
            </button>
          </div>
        </div>
      )}
    </div>
  );
}