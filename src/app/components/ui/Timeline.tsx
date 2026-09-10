/**
 * @fileoverview Timeline component for chronological story layouts
 *
 * Displays events along a vertical timeline with neon-glowing dots,
 * optional Phosphor icons, color accent system, clickable events,
 * and significance-based visual weight.
 *
 * @component Timeline
 * @version 2.0.0 — Enhanced with per-event colours, clickable links, significance
 *
 * @example
 * <Timeline
 *   events={[
 *     { year: '2019', title: 'UV Paint', description: 'The final evolution' },
 *   ]}
 *   colorAccent="pink"
 * />
 *
 * @accessibility
 * - Semantic list structure for screen readers
 * - Descriptive aria-label on the wrapper
 * - Keyboard navigable (natural tab order)
 * - Clickable events use proper anchor or button semantics
 */

import React from 'react';

/**
 * Single timeline event
 */
interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
  /** Per-event neon colour override */
  colorAccent?: string;
  /** Clickable link */
  href?: string;
  /** Visual weight */
  significance?: 'major' | 'standard' | 'minor' | string;
}

/**
 * Props for the Timeline component
 */
interface TimelineProps {
  /** Array of events to display */
  events: TimelineEvent[];
  /** Layout variant */
  variant?: 'vertical' | 'horizontal';
  /** Default neon color accent for dots and line (can be overridden per-event) */
  colorAccent?: 'pink' | 'green' | 'blue' | 'purple' | 'yellow' | 'orange' | 'red' | 'cyan';
  /** Accessible label for the timeline */
  ariaLabel?: string;
}

/**
 * Timeline component — vertical or horizontal chronological layout
 */
export function Timeline(props: TimelineProps) {
  var events = props.events;
  var variant = props.variant ? props.variant : 'vertical';
  var colorAccent = props.colorAccent ? props.colorAccent : 'pink';
  var ariaLabel = props.ariaLabel ? props.ariaLabel : 'Timeline';

  var accentClass = 'timeline--' + colorAccent;
  var variantClass = variant === 'horizontal' ? 'timeline--horizontal' : '';
  var rootClass = ['timeline', accentClass, variantClass].filter(Boolean).join(' ');

  return (
    <div className={rootClass} role="list" aria-label={ariaLabel}>
      {variant === 'vertical' && (
        <div className="timeline__line" aria-hidden="true"></div>
      )}
      {events.map(function (event, index) {
        var eventAccent = event.colorAccent ? event.colorAccent : colorAccent;
        var significance = event.significance ? event.significance : 'standard';

        var eventClass = 'timeline__event';
        if (significance === 'major') {
          eventClass = eventClass + ' timeline__event--major';
        }
        if (significance === 'minor') {
          eventClass = eventClass + ' timeline__event--minor';
        }

        /* Per-event accent class for dot colour */
        var dotClass = 'timeline__dot';
        if (eventAccent !== colorAccent) {
          dotClass = dotClass + ' timeline__dot--' + eventAccent;
        }

        var titleContent: React.ReactNode = event.title;

        /* Wrap title in link if href provided */
        if (event.href) {
          titleContent = (
            <a href={event.href} className="timeline__title-link">
              {event.title}
            </a>
          );
        }

        return (
          <div className={eventClass} role="listitem" key={event.year + '-' + index}>
            <div className={dotClass} aria-hidden="true">
              {event.icon && (
                <span className="timeline__dot-icon">{event.icon}</span>
              )}
            </div>
            <div className="timeline__year">{event.year}</div>
            <div className="timeline__title">{titleContent}</div>
            <div className="timeline__description">{event.description}</div>
          </div>
        );
      })}
    </div>
  );
}
