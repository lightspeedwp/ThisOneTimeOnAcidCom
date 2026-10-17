/**
 * @fileoverview Travel Badge — signature cycling/travel indicator
 *
 * A neon-accented pill showing how Ash got to an event. The bicycle
 * variant is the star — neon green glow with a subtle pulse in dark mode.
 * Uses Lucide icons for each transport method.
 *
 * @component TravelBadge
 * @version 1.0.0
 */

import React from 'react';
import {
  MapPin,
  Train,
  Bus,
  Car,
  Airplane,
  ThumbsUp,
  Shuffle,
} from '@phosphor-icons/react';
import type { TravelMethod, EventTravel } from '../../../data/types/events';
import { eventsUI } from '../../../data/mock/ui/events';
import '../../../../styles/blocks/event-travel-badge.css';

/** Map travel methods to Lucide icons */
const TRAVEL_ICONS: Record<TravelMethod, React.ElementType> = {
  bicycle: MapPin,
  train: Train,
  bus: Bus,
  car: Car,
  carpool: Car,
  flight: Airplane,
  hitchhike: ThumbsUp,
  walk: MapPin,
  mixed: Shuffle,
};

interface TravelBadgeProps {
  /** Travel method */
  method: TravelMethod;
  /** Total distance in km (optional) */
  distanceKm?: number;
  /** Compact mode — icon + label only, no distance */
  compact?: boolean;
}

/**
 * TravelBadge — pill showing how Ash travelled to an event.
 * The bicycle variant gets special neon green treatment.
 */
export function TravelBadge({ method, distanceKm, compact }: TravelBadgeProps) {
  const Icon = TRAVEL_ICONS[method] || Shuffle;
  const label = eventsUI.travelBadge[method] || method;

  return (
    <span
      className={`travel-badge travel-badge--${method}`}
      aria-label={`${eventsUI.a11y.travelBadgeLabel}: ${label}${
        distanceKm ? ` \u2014 ${distanceKm}km` : ''
      }`}
    >
      <Icon className="travel-badge__icon" aria-hidden="true" />
      <span>{label}</span>
      {!compact && distanceKm && (
        <span className="travel-badge__distance">{distanceKm}km</span>
      )}
    </span>
  );
}

interface TravelStatsProps {
  /** Full travel data */
  travel: EventTravel;
}

/**
 * TravelStats — expanded travel details for the event detail page.
 * Shows distance, elevation, bike weight, top speed, and route highlights.
 */
export function TravelStats({ travel }: TravelStatsProps) {
  return (
    <div className="edition-entry__travel">
      <TravelBadge
        method={travel.method}
        distanceKm={travel.totalDistanceKm ? travel.totalDistanceKm : travel.distanceKm}
      />

      {travel.description && (
        <p className="edition-entry__travel-desc">{travel.description}</p>
      )}

      <div className="travel-stats">
        {travel.totalDistanceKm && (
          <span className="travel-stats__item">
            <MapPin className="travel-stats__icon" aria-hidden="true" />
            {travel.totalDistanceKm}km total
          </span>
        )}
        {travel.elevationGainM && (
          <span className="travel-stats__item">
            <svg
              className="travel-stats__icon"
              viewBox="0 0 12 12"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M1 11L6 2l5 9H1z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
            {travel.elevationGainM.toLocaleString()}m climbing
          </span>
        )}
        {travel.bikePackWeightKg && (
          <span className="travel-stats__item">
            <svg
              className="travel-stats__icon"
              viewBox="0 0 12 12"
              fill="none"
              aria-hidden="true"
            >
              <rect
                x="2"
                y="4"
                width="8"
                height="6"
                rx="1"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path d="M4 4V3a2 2 0 014 0v1" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            {travel.bikePackWeightKg}kg bike pack
          </span>
        )}
        {travel.topSpeedKmh && (
          <span className="travel-stats__item">
            <svg
              className="travel-stats__icon"
              viewBox="0 0 12 12"
              fill="none"
              aria-hidden="true"
            >
              <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M6 3v3l2 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            {travel.topSpeedKmh}km/h top speed
          </span>
        )}
        {travel.companions && (
          <span className="travel-stats__item">
            <MapPin className="travel-stats__icon" aria-hidden="true" />
            {travel.companions}
          </span>
        )}
      </div>

      {/* Route highlights */}
      {travel.routeHighlights && travel.routeHighlights.length > 0 && (
        <div className="edition-entry__route">
          {travel.routeHighlights.map((stop, i) => (
            <span key={i} className="edition-entry__route-stop">
              {stop}
            </span>
          ))}
        </div>
      )}

      {travel.returnDescription && (
        <p className="edition-entry__travel-desc">
          {travel.returnDescription}
        </p>
      )}
    </div>
  );
}