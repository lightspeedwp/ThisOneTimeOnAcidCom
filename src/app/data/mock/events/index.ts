/**
 * @fileoverview Barrel export for events mock data
 * @module data/mock/events
 * @version 1.0.0
 */

import type { Event } from '../../types/events';
import { originFestival } from './origin-festival';

export { originFestival } from './origin-festival';
export { eventCategories, eventTags } from './categories';

/** All events — single source of truth */
export const allEvents: Event[] = [
  originFestival,
];

/** Get an event by slug */
export function getEventBySlug(slug: string): Event | undefined {
  return allEvents.find((e) => e.slug === slug);
}

/** Get all events filtered by type */
export function getEventsByType(type: string): Event[] {
  return allEvents.filter((e) => e.type === type);
}

/** Get all events that have a given tag */
export function getEventsByTag(tag: string): Event[] {
  return allEvents.filter((e) => e.tags.includes(tag));
}

/** Get featured events */
export function getFeaturedEvents(): Event[] {
  return allEvents.filter((e) => e.featured).sort((a, b) => a.order - b.order);
}

/** Count total editions attended (excluding cancelled/missed) */
export function getTotalEditionsAttended(): number {
  return allEvents.reduce(
    (sum, event) =>
      sum + event.editions.filter((ed) => ed.status === 'attended').length,
    0,
  );
}

/** Count total km cycled to/from events */
export function getTotalKmCycled(): number {
  return allEvents.reduce((sum, event) => {
    return (
      sum +
      event.editions.reduce((edSum, ed) => {
        const travel = ed.travel;
        if (travel && travel.method === 'bicycle') {
          const totalDist = travel.totalDistanceKm;
          const singleDist = travel.distanceKm;
          const dist = totalDist || (singleDist ? singleDist * 2 : 0);
          return edSum + dist;
        }
        return edSum;
      }, 0)
    );
  }, 0);
}