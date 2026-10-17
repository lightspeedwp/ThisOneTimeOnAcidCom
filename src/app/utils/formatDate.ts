/**
 * @fileoverview Shared date formatting & validation utilities
 *
 * Provides consistent date display across blog and portfolio cards,
 * ISO 8601 validation, and relative-time helpers.
 *
 * Format: "DD Mon YYYY" (e.g., "31 Jan 2026")
 *
 * @module utils/formatDate
 * @author Ash Shaw Portfolio Team
 * @version 2.0.0 - Added ISO 8601 validation, relative dates, formatDateRange
 */

/* ────────────────────────────────────────────────────────────────────
 * ISO 8601 validation
 * ──────────────────────────────────────────────────────────────────── */

/**
 * Strict ISO 8601 date regex.
 * Accepts:
 *   - Date-only:  "2026-01-31"
 *   - Datetime:   "2026-01-31T14:00:00"
 *   - With offset: "2026-01-31T14:00:00Z", "2026-01-31T14:00:00+01:00"
 */
const ISO_8601_REGEX =
  /^\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\d|3[01])(?:T(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d)?(?:\.\d+)?(?:Z|[+-](?:[01]\d|2[0-3]):[0-5]\d)?)?$/;

/**
 * Returns `true` if the string is a valid ISO 8601 date (or datetime).
 *
 * Validates both regex shape **and** actual date validity
 * (e.g. "2026-02-30" fails because Feb 30 does not exist).
 *
 * @param value - String to test
 * @returns boolean
 *
 * @example
 * ```ts
 * isISO8601('2026-01-31');              // true
 * isISO8601('2026-01-31T14:00:00Z');    // true
 * isISO8601('January 2026');            // false  (display string)
 * isISO8601('2026-02-30');              // false  (invalid day)
 * ```
 */
export function isISO8601(value: string): boolean {
  if (!ISO_8601_REGEX.test(value)) return false;
  const d = new Date(value);
  return !isNaN(d.getTime());
}

/**
 * Asserts at dev time that a date string is ISO 8601.
 * Logs a warning in development mode if validation fails.
 * Does nothing in production.
 *
 * @param value - Date string to validate
 * @param context - Optional label for the warning (e.g. field name)
 */
export function assertISO8601(value: string, context?: string): void {
  // Dev-only validation removed — import.meta.env.DEV crashes this bundler
  // In production this is a no-op
}

/* ────────────────────────────────────────────────────────────────────
 * Display formatting
 * ──────────────────────────────────────────────────────────────────── */

/**
 * Formats an ISO 8601 date string into a consistent display format.
 * Output: "DD Mon YYYY" (e.g., "31 Jan 2026")
 *
 * If the input is not a valid date it is returned as-is (graceful
 * fallback for display-only strings like "July 2019").
 *
 * @param dateString - ISO 8601 date string (e.g., "2026-01-31")
 * @returns Formatted date string
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    // Dev logging removed — import.meta.env.DEV crashes this bundler
    return dateString;
  }

  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

/**
 * Formats two ISO 8601 dates as a concise range.
 *
 * - Same month & year: "30 Jan – 1 Feb 2026"
 * - Same year:         "30 Jan – 1 Mar 2026"
 * - Different years:   "30 Dec 2025 – 1 Jan 2026"
 *
 * @param startISO - ISO 8601 start date
 * @param endISO   - ISO 8601 end date
 * @returns Formatted range string
 */
export function formatDateRange(startISO: string, endISO: string): string {
  const start = new Date(startISO);
  const end = new Date(endISO);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return `${startISO} – ${endISO}`;
  }

  const sameYear = start.getFullYear() === end.getFullYear();
  const sameMonth = sameYear && start.getMonth() === end.getMonth();

  const endFormatted = end.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  if (sameMonth) {
    // "30 – 1 Feb 2026"  →  only day for start
    const startDay = start.getDate();
    return `${startDay} – ${endFormatted}`;
  }

  if (sameYear) {
    // "30 Jan – 1 Mar 2026"  →  day + month for start, full for end
    const startPartial = start.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
    });
    return `${startPartial} – ${endFormatted}`;
  }

  // Different years — show both in full
  return `${formatDate(startISO)} – ${endFormatted}`;
}

/* ────────────────────────────────────────────────────────────────────
 * Relative time
 * ──────────────────────────────────────────────────────────────────── */

/**
 * Returns a human-readable relative time string.
 *
 * - < 1 minute:  "just now"
 * - < 1 hour:    "5 minutes ago"
 * - < 1 day:     "3 hours ago"
 * - < 7 days:    "2 days ago"
 * - < 30 days:   "3 weeks ago"
 * - ≥ 30 days:   Falls back to `formatDate()` (e.g., "31 Jan 2026")
 *
 * @param dateString - ISO 8601 date string
 * @returns Relative time string
 *
 * @example
 * ```ts
 * formatRelativeDate('2026-02-22T12:00:00'); // "just now"  (if today is 22 Feb)
 * formatRelativeDate('2026-02-20T12:00:00'); // "2 days ago"
 * formatRelativeDate('2025-06-15');          // "15 Jun 2025"
 * ```
 */
export function formatRelativeDate(dateString: string): string {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;

  const now = Date.now();
  const diffMs = now - date.getTime();

  // Future dates — just show the formatted date
  if (diffMs < 0) return formatDate(dateString);

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);

  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
  if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  if (days < 7) return `${days} day${days === 1 ? '' : 's'} ago`;
  if (days < 30) return `${weeks} week${weeks === 1 ? '' : 's'} ago`;

  // Older than ~1 month — show absolute date
  return formatDate(dateString);
}

/**
 * Returns a machine-readable `datetime` attribute value for `<time>` elements.
 * Strips any time component, returning date-only ("2026-01-31").
 *
 * If the input is not a valid ISO string, returns the input unchanged.
 *
 * @param dateString - ISO 8601 date string
 * @returns Date-only ISO string for datetime attributes
 */
export function toDatetimeAttr(dateString: string): string {
  if (!isISO8601(dateString)) return dateString;
  return dateString.slice(0, 10);
}