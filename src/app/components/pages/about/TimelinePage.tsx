/**
 * @fileoverview Timeline Page — Visual timeline of all life milestones
 * @component TimelinePage
 * @version 1.0.0
 */

import React, { useEffect, useState } from 'react';
import { 
  Bicycle, PaintBrush, Heartbeat, MusicNotes, Airplane, Code, 
  GraduationCap, Leaf, Buildings, Brain, User, BookOpen, Funnel 
} from '@phosphor-icons/react';
import { Breadcrumbs } from '../../ui/Breadcrumbs';
import { setSEO } from '../../../utils/seo';
import { pageSEO } from '../../../data/mock/seo';
import { 
  getAllTimeline, 
  getTimelineByCategory, 
  getMajorMilestones,
  timelineCategoryMeta,
  getTimelineCount,
  type TimelineEntry,
  type TimelineCategory 
} from '../../../data/mock/timeline';
import '../../../../styles/blocks/timeline-page.css';

var ICON_MAP: Record<string, any> = {
  'Bicycle': Bicycle,
  'PaintBrush': PaintBrush,
  'Heartbeat': Heartbeat,
  'MusicNotes': MusicNotes,
  'Airplane': Airplane,
  'Code': Code,
  'GraduationCap': GraduationCap,
  'Leaf': Leaf,
  'Buildings': Buildings,
  'Brain': Brain,
  'User': User,
  'BookOpen': BookOpen,
};

export function TimelinePage() {
  var breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Timeline' },
  ];

  var allEntries = getAllTimeline();
  var totalCount = getTimelineCount();

  var filterOptions: Array<{ value: string; label: string }> = [
    { value: 'all', label: 'All milestones' },
    { value: 'major', label: 'Major only' },
  ];

  for (var i = 0; i < timelineCategoryMeta.length; i++) {
    var cat = timelineCategoryMeta[i];
    filterOptions.push({ value: cat.id, label: cat.label });
  }

  var activeFilterState = useState('all');
  var activeFilter = activeFilterState[0];
  var setActiveFilter = activeFilterState[1];

  var filteredEntries: TimelineEntry[] = allEntries;
  if (activeFilter === 'major') {
    filteredEntries = getMajorMilestones();
  } else if (activeFilter !== 'all') {
    filteredEntries = getTimelineByCategory(activeFilter as TimelineCategory);
  }

  useEffect(function () {
    setSEO(pageSEO.timeline);
  }, []);

  function getCategoryColor(categories: TimelineCategory[]): string {
    if (categories.length === 0) return 'var(--wp--preset--color--neon-pink)';
    for (var i = 0; i < timelineCategoryMeta.length; i++) {
      var meta = timelineCategoryMeta[i];
      if (categories.indexOf(meta.id) !== -1) {
        return meta.neonColour;
      }
    }
    return 'var(--wp--preset--color--neon-pink)';
  }

  function handleFilterChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setActiveFilter(event.target.value);
  }

  return (
    <main id="main-content" role="main" tabIndex={-1} className="timeline-page">
      <header className="timeline-page__hero">
        <div className="timeline-page__hero-content">
          <Breadcrumbs items={breadcrumbs} centered />
          <span className="timeline-page__hero-badge">Life Story</span>
          <h1 className="text-section-h2 text-gradient-pink-purple-blue">Timeline</h1>
          <p className="timeline-page__hero-desc text-body-p">
            Every milestone from childhood Lego projects to the latest festival — {totalCount} moments that shaped the artist.
          </p>
        </div>
      </header>

      <section className="timeline-section">
        <div className="timeline-section__inner">
          <div className="timeline-filters">
            <label htmlFor="timeline-filter" className="timeline-filters__label">
              <Funnel size={20} weight="duotone" aria-hidden="true" />
              Filter by:
            </label>
            <select 
              id="timeline-filter"
              className="timeline-filters__select"
              value={activeFilter}
              onChange={handleFilterChange}
            >
              {filterOptions.map(function (option) {
                return (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                );
              })}
            </select>
            <span className="timeline-filters__count">
              Showing {filteredEntries.length} of {totalCount}
            </span>
          </div>

          <div className="timeline-grid">
            {filteredEntries.map(function (entry) {
              var IconComponent = entry.icon != null && ICON_MAP[entry.icon] != null ? ICON_MAP[entry.icon] : User;
              var accentColor = getCategoryColor(entry.categories);
              var isMajor = entry.significance === 'major';

              return (
                <article
                  key={entry.id}
                  className={isMajor ? 'timeline-card timeline-card--major' : 'timeline-card'}
                  style={{ '--timeline-accent': accentColor } as React.CSSProperties}
                >
                  <div className="timeline-card__header">
                    <div className="timeline-card__icon">
                      <IconComponent size={24} weight="duotone" aria-hidden="true" />
                    </div>
                    <time className="timeline-card__date">{entry.date}</time>
                  </div>
                  <h3 className="timeline-card__title">{entry.title}</h3>
                  <p className="timeline-card__desc">{entry.description}</p>
                  {entry.categories.length > 0 && (
                    <div className="timeline-card__categories">
                      {entry.categories.map(function (catId) {
                        var catMeta = null;
                        for (var i = 0; i < timelineCategoryMeta.length; i++) {
                          if (timelineCategoryMeta[i].id === catId) {
                            catMeta = timelineCategoryMeta[i];
                            break;
                          }
                        }
                        if (catMeta == null) return null;
                        return (
                          <span
                            key={catId}
                            className="timeline-card__category"
                            style={{ '--cat-neon': catMeta.neonColour } as React.CSSProperties}
                          >
                            {catMeta.label}
                          </span>
                        );
                      })}
                    </div>
                  )}
                  {entry.link != null && (
                    <a href={entry.link} className="timeline-card__link">
                      Read more →
                    </a>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="timeline-legend">
        <div className="timeline-legend__inner">
          <h2 className="timeline-legend__title text-card-h3">Categories</h2>
          <div className="timeline-legend__grid">
            {timelineCategoryMeta.map(function (cat) {
              var IconComponent = ICON_MAP[cat.icon] || User;
              return (
                <div key={cat.id} className="timeline-legend-item">
                  <div className="timeline-legend-item__icon" style={{ '--cat-neon': cat.neonColour } as React.CSSProperties}>
                    <IconComponent size={20} weight="duotone" aria-hidden="true" />
                  </div>
                  <span className="timeline-legend-item__label">{cat.label}</span>
                  <div
                    className="timeline-legend-item__color"
                    style={{ '--cat-neon': cat.neonColour } as React.CSSProperties}
                    aria-hidden="true"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
