/**
 * @fileoverview Events listing page
 *
 * Displays all events Ash has attended in a card grid with a hero section,
 * stats bar, and category filter pills. Uses centralized mock data.
 *
 * @component EventsPage
 * @version 1.0.0
 */

import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from '../../../lib/router';
import { MapPin, MusicNotes, Calendar } from '@phosphor-icons/react';
import {
  allEvents,
  getTotalEditionsAttended,
  getTotalKmCycled,
} from '../../../data/mock/events';
import { eventCategories } from '../../../data/mock/events/categories';
import { eventsPageData } from '../../../data/mock/pages/events';
import { eventsUI } from '../../../data/mock/ui/events';
import { setSEO } from '../../../utils/seo';
import { pageSEO } from '../../../data/mock/seo';
import { Breadcrumbs } from '../../ui/Breadcrumbs';
import { TravelBadge } from './TravelBadge';
import '../../../../styles/blocks/events-page.css';
import '../../../../styles/blocks/event-card.css';

export function EventsPage() {
  const navigate = useNavigate();
  const activeFilterInit: string = 'all';
  const [activeFilter, setActiveFilter] = useState(activeFilterInit);

  useEffect(() => {
    setSEO(pageSEO.events);
  }, []);

  /** Compute stats */
  const stats = useMemo(() => {
    const attendedEditions = getTotalEditionsAttended();
    const kmCycled = getTotalKmCycled();
    const countries = new Set(allEvents.map((e) => e.location.country)).size;
    return {
      events: allEvents.length,
      editions: attendedEditions,
      kmCycled,
      countries,
    };
  }, []);

  /** Filtered events */
  const filteredEvents = useMemo(() => {
    if (activeFilter === 'all') return allEvents;
    return allEvents.filter((e) => e.type === activeFilter);
  }, [activeFilter]);

  /** Format date range for an event's most recent attended edition */
  const getLatestEditionYear = (editions: typeof allEvents[0]['editions']) => {
    const attended = editions
      .filter((ed) => ed.status === 'attended')
      .sort((a, b) => b.year - a.year);
    return attended.length > 0 ? attended[0].year : null;
  };

  /** Count attended editions */
  const getAttendedCount = (editions: typeof allEvents[0]['editions']) =>
    editions.filter((ed) => ed.status === 'attended').length;

  /** Check if any edition was cycled */
  const hasCycledEdition = (editions: typeof allEvents[0]['editions']) =>
    editions.some((ed) => {
      const travel = ed.travel;
      return travel ? travel.method === 'bicycle' : false;
    });

  return (
    <main
      id="main-content"
      role="main"
      tabIndex={-1}
      className="events-page bg-atomic-noise"
    >
      {/* ── Hero ── */}
      <header className="events-page__hero section-spacing px-horizontal-section">
        <div className="events-page__hero-content section-container">
          <Breadcrumbs items={eventsPageData.breadcrumbs} centered />

          <span className="events-page__hero-badge">
            {eventsPageData.hero.badge}
          </span>

          <h1 className="text-hero-h1 text-gradient-pink-purple-blue">
            {eventsPageData.hero.title}
          </h1>

          <p className="neon-text-gradient neon-text-gradient--red">
            {eventsPageData.hero.description}
          </p>
        </div>
      </header>

      {/* ── Stats ── */}
      <section className="events-page__stats section-spacing px-horizontal-section" aria-label={eventsUI.a11y.statsLabel}>
        <div className="container-7xl section-container events-page__stats-grid">
          <div className="events-page__stat">
            <span className="events-page__stat-value">{stats.events}</span>
            <span className="events-page__stat-label">
              {stats.events === 1
                ? eventsPageData.stats.items[0].labelSingular
                : eventsPageData.stats.items[0].label}
            </span>
          </div>
          <div className="events-page__stat">
            <span className="events-page__stat-value">{stats.editions}</span>
            <span className="events-page__stat-label">
              {eventsPageData.stats.items[1].label}
            </span>
          </div>
          <div className="events-page__stat">
            <span className="events-page__stat-value">
              {stats.kmCycled.toLocaleString()}
            </span>
            <span className="events-page__stat-label">
              {eventsPageData.stats.items[2].label}
            </span>
          </div>
          <div className="events-page__stat">
            <span className="events-page__stat-value">{stats.countries}</span>
            <span className="events-page__stat-label">
              {stats.countries === 1
                ? eventsPageData.stats.items[3].labelSingular
                : eventsPageData.stats.items[3].label}
            </span>
          </div>
        </div>
      </section>

      {/* ── Filters ── */}
      <nav
        className="events-page__filters section-spacing px-horizontal-section"
        aria-label={eventsUI.a11y.filterByType}
      >
        <div className="container-7xl section-container events-page__filters-row">
          <button
            type="button"
            className={`events-page__filter-btn${
              activeFilter === 'all' ? ' events-page__filter-btn--active' : ''
            }`}
            onClick={() => setActiveFilter('all')}
            aria-pressed={activeFilter === 'all'}
          >
            {eventsPageData.filterLabels.all}
          </button>
          {eventCategories
            .filter((cat) => cat.count > 0 || allEvents.some((e) => e.type === cat.slug))
            .map((cat) => (
              <button
                type="button"
                key={cat.id}
                className={`events-page__filter-btn${
                  activeFilter === cat.slug
                    ? ' events-page__filter-btn--active'
                    : ''
                }`}
                onClick={() => setActiveFilter(cat.slug)}
                aria-pressed={activeFilter === cat.slug}
              >
                {cat.name}
              </button>
            ))}
        </div>
      </nav>

      {/* ── Event grid ── */}
      <section className="events-page__list section-spacing px-horizontal-section" aria-label={eventsUI.a11y.eventsListLabel}>
        <div className="container-7xl section-container">
          {filteredEvents.length === 0 ? (
            <div className="events-page__empty section-container">
              <h2 className="events-page__empty-title">
                {eventsPageData.emptyState.title}
              </h2>
              <p className="events-page__empty-desc">
                {eventsPageData.emptyState.description}
              </p>
            </div>
          ) : (
            <div className="archive-grid">
              {filteredEvents.map((event) => {
                const attendedCount = getAttendedCount(event.editions);
                const latestYear = getLatestEditionYear(event.editions);
                const cycled = hasCycledEdition(event.editions);

                return (
                  <article
                    key={event.id}
                    className="event-card"
                    role="link"
                    tabIndex={0}
                    onClick={() => navigate(`/events/${event.slug}`)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        navigate(`/events/${event.slug}`);
                      }
                    }}
                    aria-label={`${event.name} \u2014 ${event.location.city}, ${event.location.country}`}
                  >
                    {/* Image */}
                    <div className="event-card__image-wrap">
                      {event.featuredImage.src ? (
                        <img
                          className={`event-card__image${
                            event.featuredImage.isLogo
                              ? ' event-card__image--logo'
                              : ''
                          }`}
                          src={event.featuredImage.src}
                          alt={event.featuredImage.alt}
                          loading="lazy"
                        />
                      ) : (
                        <div className="event-card__image-placeholder">
                          <MusicNotes
                            className="event-card__image-placeholder-icon"
                            aria-hidden="true"
                          />
                        </div>
                      )}
                      <span className="event-card__type-badge">
                        {eventsUI.typeBadge[event.type] ? eventsUI.typeBadge[event.type] : event.type}
                      </span>
                    </div>

                    {/* Body */}
                    <div className="event-card__body">
                      <h2 className="event-card__name">{event.name}</h2>
                      <span className="event-card__location">
                        <MapPin
                          className="event-card__location-icon"
                          aria-hidden="true"
                        />
                        {event.location.city}, {event.location.country}
                      </span>
                      <p className="event-card__description">
                        {event.tagline ? event.tagline : event.description}
                      </p>
                    </div>

                    {/* Meta */}
                    <div className="event-card__meta">
                      <span className="event-card__edition-count">
                        <Calendar
                          className="event-card__location-icon"
                          aria-hidden="true"
                        />
                        {attendedCount}{' '}
                        {attendedCount === 1
                          ? eventsUI.card.edition
                          : eventsUI.card.editions}
                        {latestYear ? ' \u2022 ' + eventsUI.card.since + ' ' + (function() { var lastEd = event.editions[event.editions.length - 1]; if (lastEd) { return lastEd.year; } return ''; })() : ''}
                      </span>
                      {cycled && (
                        <TravelBadge method="bicycle" compact />
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}