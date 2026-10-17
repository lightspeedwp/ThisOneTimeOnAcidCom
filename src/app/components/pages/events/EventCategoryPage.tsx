/**
 * @fileoverview Event category archive page
 *
 * Displays events filtered by event type (festival, club-night, etc.).
 *
 * @component EventCategoryPage
 * @version 1.0.0
 */

import React, { useEffect } from 'react';
import { useParams, useNavigate } from '../../../lib/router';
import { MapPin, MusicNotes, Calendar } from '@phosphor-icons/react';
import { getEventsByType } from '../../../data/mock/events';
import { eventCategories } from '../../../data/mock/events/categories';
import { eventCategoryBreadcrumbs } from '../../../data/mock/pages/events';
import { eventsUI } from '../../../data/mock/ui/events';
import { setSEO } from '../../../utils/seo';
import { eventCategorySEO } from '../../../data/mock/seo';
import { Breadcrumbs } from '../../ui/Breadcrumbs';
import { TravelBadge } from './TravelBadge';
import '../../../../styles/blocks/events-page.css';
import '../../../../styles/blocks/event-card.css';

export function EventCategoryPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const category = eventCategories.find((c) => c.slug === slug);
  const events = slug ? getEventsByType(slug) : [];

  useEffect(() => {
    if (category) {
      setSEO(eventCategorySEO(category.name));
    }
  }, [category]);

  const categoryName = category ? category.name : (slug ? slug : 'Category');

  return (
    <main
      id="main-content"
      role="main"
      tabIndex={-1}
      className="events-page bg-atomic-noise"
    >
      <header className="events-page__hero">
        <div className="events-page__hero-content">
          <Breadcrumbs items={eventCategoryBreadcrumbs(categoryName)} centered />

          <span className="events-page__hero-badge">{categoryName}</span>

          <h1 className="text-hero-h1 text-gradient-pink-purple-blue">
            {categoryName}
          </h1>

          {category && category.description && (
            <p className="events-page__hero-desc text-body-p">
              {category.description}
            </p>
          )}
        </div>
      </header>

      <section className="events-page__list" aria-label={`${categoryName} events`}>
        {events.length === 0 ? (
          <div className="events-page__empty">
            <h2 className="events-page__empty-title">
              {eventsUI.listing.noResults}
            </h2>
          </div>
        ) : (
          events.map((event) => {
            const attendedCount = event.editions.filter(
              (ed) => ed.status === 'attended',
            ).length;
            const cycled = event.editions.some(
              (ed) => {
                const travel = ed.travel;
                return travel ? travel.method === 'bicycle' : false;
              },
            );

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
              >
                <div className="event-card__image-wrap">
                  <div className="event-card__image-placeholder">
                    <MusicNotes
                      className="event-card__image-placeholder-icon"
                      aria-hidden="true"
                    />
                  </div>
                  <span className="event-card__type-badge">
                    {eventsUI.typeBadge[event.type] ? eventsUI.typeBadge[event.type] : event.type}
                  </span>
                </div>
                <div className="event-card__body">
                  <h2 className="event-card__name">{event.name}</h2>
                  <span className="event-card__location">
                    <MapPin className="event-card__location-icon" aria-hidden="true" />
                    {event.location.city}, {event.location.country}
                  </span>
                  <p className="event-card__description">
                    {event.tagline ? event.tagline : event.description}
                  </p>
                </div>
                <div className="event-card__meta">
                  <span className="event-card__edition-count">
                    <Calendar className="event-card__location-icon" aria-hidden="true" />
                    {attendedCount}{' '}
                    {attendedCount === 1 ? eventsUI.card.edition : eventsUI.card.editions}
                  </span>
                  {cycled && <TravelBadge method="bicycle" compact />}
                </div>
              </article>
            );
          })
        )}
      </section>
    </main>
  );
}