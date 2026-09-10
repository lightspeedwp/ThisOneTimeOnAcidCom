/**
 * @fileoverview Shared taxonomy archive layout component
 * Reusable layout for category and tag archive pages across all content types
 *
 * @component TaxonomyArchiveLayout
 * @version 1.0.0 — Bundler-safe syntax (named functions, no destructuring, var declarations)
 *
 * @description
 * Provides consistent structure for taxonomy archive pages (blog, portfolio, videos, podcasts)
 * Supports both category archives (with filters) and tag archives (simplified)
 */

import React from 'react';
import { Breadcrumbs } from '../../ui/Breadcrumbs';
import { ArchiveFilters } from '../../ui/ArchiveFilters';
import { FaqSection } from '../../sections/FaqSection';

/**
 * Breadcrumb item
 */
export interface BreadcrumbItem {
  label: string;
  href?: string;
}

/**
 * Category item for filters
 */
export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  count: number;
}

/**
 * Sort option
 */
export interface SortOption {
  value: string;
  label: string;
}

/**
 * Filter configuration
 */
export interface FilterConfig {
  categories: CategoryItem[];
  activeCategories: string[];
  sortBy: string;
  sortOptions: SortOption[];
  resultCount: number;
  onCategoryToggle: (slug: string) => void;
  onSortChange: (value: string) => void;
  onClearAll: () => void;
}

/**
 * Empty state configuration
 */
export interface EmptyStateConfig {
  title: string;
  message: string;
  icon?: React.ReactNode;
}

/**
 * TaxonomyArchiveLayout props
 */
export interface TaxonomyArchiveLayoutProps {
  /** Content type identifier (blog, portfolio, videos, podcasts) */
  contentType: string;
  /** Filtered items to display */
  items: any[];
  /** Function to render each card */
  renderCard: (item: any, index: number) => React.ReactNode;
  /** Breadcrumb items */
  breadcrumbs: BreadcrumbItem[];
  /** Page title */
  title: string;
  /** Optional description below title */
  description?: string;
  /** Whether to show archive filters */
  showFilters: boolean;
  /** Filter configuration (required if showFilters is true) */
  filterConfig?: FilterConfig;
  /** Empty state configuration */
  emptyState: EmptyStateConfig;
  /** FAQ section page ID */
  faqPageId: string;
  /** Main container className */
  mainClassName: string;
  /** Header section className */
  headerClassName: string;
  /** Content section className */
  contentClassName: string;
  /** Card grid className */
  gridClassName: string;
  /** Optional result count display (for tag pages without filters) */
  showResultCount?: boolean;
}

/**
 * Shared taxonomy archive layout component
 *
 * Provides consistent structure for category and tag archive pages
 * Handles breadcrumbs, title, description, filters, card grid, empty states, and FAQ section
 */
export function TaxonomyArchiveLayout(props: TaxonomyArchiveLayoutProps) {
  var contentType = props.contentType;
  var items = props.items;
  var renderCard = props.renderCard;
  var breadcrumbs = props.breadcrumbs;
  var title = props.title;
  var description = props.description;
  var showFilters = props.showFilters;
  var filterConfig = props.filterConfig;
  var emptyState = props.emptyState;
  var faqPageId = props.faqPageId;
  var mainClassName = props.mainClassName;
  var headerClassName = props.headerClassName;
  var contentClassName = props.contentClassName;
  var gridClassName = props.gridClassName;
  var showResultCount = props.showResultCount;

  return (
    <main id="main-content" role="main" tabIndex={-1} className={mainClassName}>
      <div className={headerClassName}>
        <div className="container-wide section-container">
          <Breadcrumbs items={breadcrumbs} centered />
          <div className="blog-list-header__content">
            <h1 className="text-hero-h1 text-gradient-pink-purple-blue">
              {title}
            </h1>
            {description ? (
              <p className="text-body-guideline">{description}</p>
            ) : null}
            {showResultCount && !showFilters ? (
              <p className="archive-filters__result-count">
                Number of results: <strong>{items.length}</strong>
              </p>
            ) : null}
          </div>
        </div>
      </div>

      <div className={contentClassName}>
        <div className="container-wide section-container">
          {showFilters && filterConfig ? (
            <ArchiveFilters
              contentType={contentType}
              categories={filterConfig.categories}
              activeCategories={filterConfig.activeCategories}
              sortBy={filterConfig.sortBy}
              sortOptions={filterConfig.sortOptions}
              resultCount={filterConfig.resultCount}
              onCategoryToggle={filterConfig.onCategoryToggle}
              onSortChange={filterConfig.onSortChange}
              onClearAll={filterConfig.onClearAll}
            />
          ) : null}

          {items.length > 0 ? (
            <div className={gridClassName}>
              {items.map(function (item, index) {
                return renderCard(item, index);
              })}
            </div>
          ) : (
            <div className="error-card">
              {emptyState.icon ? emptyState.icon : null}
              <h3 className="error-title">{emptyState.title}</h3>
              <p className="error-message">{emptyState.message}</p>
            </div>
          )}
        </div>
      </div>

      <FaqSection pageId={faqPageId} />
    </main>
  );
}
