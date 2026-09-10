/**
 * @fileoverview Interactive History timeline hub
 *
 * Displays a comprehensive chronological timeline of all milestones in
 * Ash Shaw's life, with category filter chips, per-event neon colours,
 * significance-based visual weight, and clickable milestone links.
 *
 * @component HistoryPage
 * @version 3.0.0 — Timeline Expansion: centralised data, interactive filters
 */

import React, { useState, useEffect, useMemo } from 'react';
import { historyPageData } from '../../../data/mock/pages/history';
import {
  getAllTimeline,
  getTimelineByCategory,
  timelineCategories,
  toTimelineEvents,
} from '../../../data/mock/timeline';
import { setSEO } from '../../../utils/seo';
import { pageSEO } from '../../../data/mock/seo';
import { Breadcrumbs } from '../../ui/Breadcrumbs';
import { Timeline } from '../../ui/Timeline';
import { ContentSection } from '../../sections/ContentSection';
import { grab, arrayGet } from '../../../lib/router';
import '../../../../styles/blocks/history-page.css';

export function HistoryPage() {
  var filterState = useState('all');
  var activeFilter = filterState[0];
  var setActiveFilter = filterState[1];

  useEffect(function () {
    setSEO(pageSEO.history);
  }, []);

  var hero = historyPageData.hero;

  /* Get filtered timeline entries */
  var filteredEntries = useMemo(function () {
    if (activeFilter === 'all') {
      return getAllTimeline();
    }
    return getTimelineByCategory(activeFilter);
  }, [activeFilter]);

  /* Convert to Timeline component format */
  var timelineEvents = useMemo(function () {
    return toTimelineEvents(filteredEntries);
  }, [filteredEntries]);

  /* Determine the accent colour for the timeline line */
  var lineAccent = 'cyan';
  if (activeFilter !== 'all') {
    for (var ca = 0; ca < timelineCategories.length; ca++) {
      var cat = arrayGet(timelineCategories, ca);
      if (cat && grab(cat, 'id') === activeFilter) {
        lineAccent = grab(cat, 'colorAccent') || 'cyan';
        ca = timelineCategories.length; /* exit */
      }
    }
  }

  /* Build filter chips */
  function renderFilterChips() {
    var chips = [];

    /* "All" chip */
    var allClass = 'history-page__filter-chip';
    if (activeFilter === 'all') {
      allClass = allClass + ' history-page__filter-chip--active';
    }
    chips.push(
      <button
        key="all"
        className={allClass}
        onClick={function () { setActiveFilter('all'); }}
        aria-pressed={activeFilter === 'all'}
      >
        All ({getAllTimeline().length})
      </button>
    );

    /* Category chips */
    for (var i = 0; i < timelineCategories.length; i++) {
      var category = arrayGet(timelineCategories, i);
      if (category) {
        var catId = grab(category, 'id');
        var catLabel = grab(category, 'label');
        var catCount = getTimelineByCategory(catId).length;

        if (catCount === 0) {
          continue;
        }

        var chipClass = 'history-page__filter-chip';
        if (activeFilter === catId) {
          chipClass = chipClass + ' history-page__filter-chip--active';
        }

        chips.push(
          <button
            key={catId}
            className={chipClass}
            data-category={catId}
            onClick={(function (id) {
              return function () { setActiveFilter(id); };
            })(catId)}
            aria-pressed={activeFilter === catId}
          >
            {catLabel} ({catCount})
          </button>
        );
      }
    }

    return chips;
  }

  /* Build category legend */
  function renderLegend() {
    var items = [];
    for (var i = 0; i < timelineCategories.length; i++) {
      var category = arrayGet(timelineCategories, i);
      if (category) {
        var catId = grab(category, 'id');
        var catLabel = grab(category, 'label');
        var catHex = grab(category, 'hex');

        items.push(
          <div key={catId} className="history-page__legend-item">
            <span
              className="history-page__legend-dot"
              style={{ '--cat-hex': catHex } as React.CSSProperties}
            />
            {catLabel}
          </div>
        );
      }
    }
    return items;
  }

  return (
    <main
      id="main-content"
      role="main"
      tabIndex={-1}
      className="history-page bg-atomic-noise"
    >
      {/* Hero */}
      <header className="history-page__hero section-spacing px-horizontal-section">
        <div className="history-page__hero-content section-container">
          <Breadcrumbs items={historyPageData.breadcrumbs} centered />

          <span className="history-page__hero-badge">
            {hero.badge}
          </span>

          <h1 className="text-hero-h1 text-gradient-pink-purple-blue">
            {hero.title}
          </h1>

          <p className="history-page__hero-desc neon-text-gradient neon-text-gradient--blue">
            Every milestone in Ash's journey — from a Paarl childhood to international festival stages, filtered by the threads that weave them together.
          </p>
        </div>
      </header>

      {/* Interactive timeline */}
      <div className="history-page__body section-spacing px-horizontal-section">
        <div className="section-container">

          {/* Category filter chips */}
          <div className="history-page__filters" role="group" aria-label="Filter milestones by category">
            {renderFilterChips()}
          </div>

          {/* Milestone count */}
          <p className="history-page__count">
            Showing {filteredEntries.length} milestone{filteredEntries.length !== 1 ? 's' : ''}
            {activeFilter !== 'all' ? ' in ' + activeFilter : ''}
          </p>

          {/* Timeline */}
          <div className="entrance-fade-up">
            <ContentSection
              id="milestones"
              title="The journey so far"
              subtitle={activeFilter === 'all'
                ? 'All milestones in chronological order, colour-coded by category'
                : 'Milestones filtered by ' + activeFilter
              }
              variant="default"
              colorAccent={lineAccent as any}
            >
              <Timeline
                events={timelineEvents}
                variant="vertical"
                colorAccent={lineAccent as any}
                ariaLabel={activeFilter === 'all' ? 'Complete life timeline' : activeFilter + ' timeline'}
              />
            </ContentSection>
          </div>

          {/* Category legend */}
          <div className="history-page__legend" aria-label="Category colour legend">
            {renderLegend()}
          </div>
        </div>
      </div>
    </main>
  );
}
