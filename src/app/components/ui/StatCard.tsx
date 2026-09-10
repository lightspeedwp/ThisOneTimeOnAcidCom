/**
 * @fileoverview StatCard — Reusable stat/fact grid component
 *
 * Replaces the repeated `about-subpage__facts` + `about-subpage__fact` pattern
 * used across 8+ about sub-pages. Accepts an array of { id, label, value }
 * items and renders them as an accessible list grid.
 *
 * Uses existing BEM classes from `/styles/blocks/about-subpage.css`.
 *
 * @component StatCard
 * @version 1.0.0
 */

import React from 'react';

export interface StatItem {
  id: string;
  label: string;
  value: string;
}

export interface StatCardProps {
  /** Array of stat items to display */
  items: StatItem[];
  /** Accessible label for the stat grid (e.g. "Quick facts about Ash Shaw") */
  ariaLabel: string;
}

/**
 * Renders a grid of label/value stat cards with list semantics.
 *
 * @example
 * <StatCard
 *   items={data.quickFacts}
 *   ariaLabel="ADHD quick facts"
 * />
 */
export function StatCard(props: StatCardProps) {
  return (
    <div
      className="about-subpage__facts"
      role="list"
      aria-label={props.ariaLabel}
    >
      {props.items.map(function (fact) {
        return (
          <div key={fact.id} className="about-subpage__fact" role="listitem">
            <span className="about-subpage__fact-label">{fact.label}</span>
            <span className="about-subpage__fact-value">{fact.value}</span>
          </div>
        );
      })}
    </div>
  );
}
