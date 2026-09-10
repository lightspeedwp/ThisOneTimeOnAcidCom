/**
 * @fileoverview Event detail page
 *
 * Shows a single event with hero, info bar, personal significance callout,
 * description, and a vertical timeline of each edition/attendance.
 *
 * @component EventDetailPage
 * @version 1.0.0
 */

import React, { useEffect } from 'react';
import { useParams, useNavigate } from '../../../lib/router';
import {
  MapPin,
  MusicNotes,
  ArrowSquareOut,
} from '@phosphor-icons/react';
import { getEventBySlug } from '../../../data/mock/events';
import { eventDetailBreadcrumbs } from '../../../data/mock/pages/events';
import { eventsUI } from '../../../data/mock/ui/events';
import { setSEO } from '../../../utils/seo';
import { eventDetailSEO } from '../../../data/mock/seo';
import { Breadcrumbs } from '../../ui/Breadcrumbs';
import { TravelBadge, TravelStats } from './TravelBadge';
import { formatDateRange } from '../../../utils/formatDate';
import type { EventEdition } from '../../../data/types/events';
import '../../../../styles/blocks/event-detail-page.css';
import '../../../../styles/blocks/event-travel-badge.css';

export function EventDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const event = slug ? getEventBySlug(slug) : undefined;

  useEffect(() => {
    if (event) {
      setSEO(eventDetailSEO(event.name, event.description));
    }
  }, [event]);

  if (!event) {
    return (
      <main id="main-content" role="main" tabIndex={-1} className="event-detail">
        <div className="events-page__empty">
          <h1 className="events-page__empty-title">Event not found</h1>
          <p className="events-page__empty-desc">
            The event you\u2019re looking for doesn\u2019t exist.
          </p>
        </div>
      </main>
    );
  }

  const attendedEditions = event.editions.filter(
    (ed) => ed.status === 'attended',
  );

  return (
    <main
      id="main-content"
      role="main"
      tabIndex={-1}
      className="event-detail bg-atomic-noise"
    >
      {/* ── Hero ── */}
      <header className="event-detail__hero">
        <div className="event-detail__hero-content">
          <Breadcrumbs
            items={eventDetailBreadcrumbs(event.name, event.slug)}
            centered
          />

          <span className="event-detail__hero-badge">
            {eventsUI.typeBadge[event.type] ? eventsUI.typeBadge[event.type] : event.type}
          </span>

          <h1 className="text-hero-h1 text-gradient-pink-purple-blue">
            {event.name}
          </h1>

          {event.tagline && (
            <p className="event-detail__tagline">{event.tagline}</p>
          )}

          {/* Info bar */}
          <div className="event-detail__info-bar">
            <span className="event-detail__info-item">
              <MapPin
                className="event-detail__info-icon"
                aria-hidden="true"
              />
              {event.location.venue
                ? `${event.location.venue}, `
                : ''}
              {event.location.city}, {event.location.country}
            </span>

            {event.genre && event.genre.length > 0 && (
              <span className="event-detail__info-item">
                <MusicNotes
                  className="event-detail__info-icon"
                  aria-hidden="true"
                />
                {event.genre.join(', ')}
              </span>
            )}

            {event.website && (
              <span className="event-detail__info-item">
                <a
                  className="event-detail__info-link"
                  href={event.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {eventsUI.detail.websiteLabel}
                  <ArrowSquareOut
                    className="event-detail__info-icon"
                    aria-hidden="true"
                  />
                </a>
              </span>
            )}

            {event.recurring && (
              <span className="event-detail__info-item">
                {eventsUI.card.recurring} \u2022{' '}
                {attendedEditions.length}{' '}
                {attendedEditions.length === 1
                  ? eventsUI.card.edition
                  : eventsUI.card.editions}{' '}
                attended
              </span>
            )}
          </div>
        </div>
      </header>

      {/* ── Personal Significance ── */}
      {event.personalSignificance && (
        <section className="event-detail__significance">
          <div className="event-detail__significance-box">
            <p className="event-detail__significance-label">
              {eventsUI.detail.significanceHeading}
            </p>
            <p className="event-detail__significance-text">
              {event.personalSignificance}
            </p>
          </div>
        </section>
      )}

      {/* ── Description ── */}
      <section className="event-detail__description">
        <h2 className="event-detail__description-heading">
          {eventsUI.detail.aboutHeading}
        </h2>
        <p className="event-detail__description-text">{event.description}</p>
      </section>

      {/* ── Editions Timeline ── */}
      <section
        className="event-detail__editions"
        aria-label={eventsUI.a11y.timelineLabel}
      >
        <h2 className="event-detail__editions-heading">
          {eventsUI.detail.editionsHeading}
        </h2>

        <div className="event-detail__timeline">
          {/* Connector line */}
          <div className="event-detail__timeline-line" aria-hidden="true" />

          {event.editions.map((edition: EventEdition) => {
            const isCancelled =
              edition.status === 'cancelled' || edition.status === 'missed';

            return (
              <article key={edition.id} className="edition-entry">
                {/* Dot */}
                <div
                  className={`edition-entry__dot${
                    isCancelled ? ' edition-entry__dot--muted' : ''
                  }`}
                  aria-hidden="true"
                >
                  <span className="edition-entry__dot-year">
                    {String(edition.year).slice(-2)}
                  </span>
                </div>

                {/* Header */}
                <div className="edition-entry__header">
                  <h3 className="edition-entry__year">{edition.year}</h3>
                  <span className="edition-entry__dates">
                    {formatDateRange(edition.startDate, edition.endDate)}
                  </span>
                  <span
                    className={`edition-entry__status-badge edition-entry__status-badge--${edition.status}`}
                  >
                    {eventsUI.statusBadge[edition.status] ? eventsUI.statusBadge[edition.status] : edition.status}
                  </span>
                </div>

                {/* Role */}
                {edition.role && (
                  <p className="edition-entry__role">{edition.role}</p>
                )}

                {/* Highlights */}
                {edition.highlights && (
                  <p className="edition-entry__highlights">
                    {edition.highlights}
                  </p>
                )}

                {/* Travel */}
                {edition.travel && <TravelStats travel={edition.travel} />}

                {/* Personal note */}
                {edition.personalNote && (
                  <blockquote className="edition-entry__note">
                    {edition.personalNote}
                  </blockquote>
                )}
              </article>
            );
          })}
        </div>
      </section>

      {/* ── FAQs ── */}
      {event.faqs && event.faqs.length > 0 && (
        <section className="event-detail__faq">
          <h2 className="event-detail__faq-heading">
            {eventsUI.detail.faqHeading}
          </h2>
          <div className="event-detail__faq-list">
            {event.faqs.map((faq) => (
              <div key={faq.id} className="event-detail__faq-item">
                <h3 className="event-detail__faq-question">{faq.question}</h3>
                <p className="event-detail__faq-answer">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}