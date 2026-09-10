/**
 * @fileoverview Events-specific UI strings
 *
 * Labels, badges, empty states, and filter text used by event components.
 *
 * @module data/mock/ui/events
 * @version 1.0.0
 */

export const eventsUI = {
  /** Labels for edition status badges */
  statusBadge: {
    attended: 'Attended',
    upcoming: 'Upcoming',
    cancelled: 'Cancelled',
    missed: 'Missed',
  } as Record<string, string>,

  /** Labels for travel method badges */
  travelBadge: {
    bicycle: 'Cycled',
    train: 'Train',
    bus: 'Bus',
    car: 'Drove',
    carpool: 'Carpooled',
    flight: 'Flew',
    hitchhike: 'Hitchhiked',
    walk: 'Walked',
    mixed: 'Mixed',
  } as Record<string, string>,

  /** Labels for event type badges */
  typeBadge: {
    festival: 'Festival',
    'club-night': 'Club Night',
    workshop: 'Workshop',
    'pop-up': 'Pop-Up',
    exhibition: 'Exhibition',
    collaboration: 'Collaboration',
    community: 'Community',
  } as Record<string, string>,

  /** Card labels */
  card: {
    editions: 'editions',
    edition: 'edition',
    viewDetails: 'View Event',
    recurring: 'Recurring',
    since: 'Since',
  },

  /** Detail page labels */
  detail: {
    aboutHeading: 'About This Event',
    editionsHeading: 'Attendance Timeline',
    significanceHeading: 'Personal Significance',
    travelHeading: 'The Journey',
    relatedHeading: 'Related Content',
    faqHeading: 'Frequently Asked Questions',
    websiteLabel: 'Official Website',
    locationLabel: 'Location',
    genreLabel: 'Genre',
    roleLabel: 'Role',
    activitiesLabel: 'Activities',
    highlightsLabel: 'Highlights',
    personalNoteLabel: 'Personal Note',
    gearLabel: 'Gear Carried',
    routeLabel: 'Route',
    distanceLabel: 'Distance',
    elevationLabel: 'Elevation Gain',
    bikeWeightLabel: 'Bike Pack',
    topSpeedLabel: 'Top Speed',
    companionsLabel: 'Companions',
  },

  /** Listing page */
  listing: {
    noResults: 'No events match your current filters.',
    clearFilters: 'Clear Filters',
    showAll: 'Show All',
  },

  /** Accessibility labels */
  a11y: {
    eventsNav: 'Events navigation',
    filterByType: 'Filter events by type',
    filterByTag: 'Filter events by tag',
    statsLabel: 'Event statistics',
    eventsListLabel: 'Events list',
    timelineLabel: 'Event attendance timeline',
    travelBadgeLabel: 'Travel method',
    statusBadgeLabel: 'Attendance status',
  },
};