/**
 * @fileoverview PullQuote component for visually emphasized quotes
 *
 * Renders a large, styled quotation with neon border accents,
 * decorative quotation marks, optional author attribution,
 * and alignment variants (left, center, right).
 *
 * @component PullQuote
 * @version 1.0.0
 *
 * @example
 * <PullQuote
 *   quote="The kid who was made to feel small now makes other people feel radiant."
 *   author="Ash Shaw"
 *   variant="center"
 *   neonColor="pink"
 * />
 *
 * @accessibility
 * - Uses <blockquote> semantic element
 * - Decorative quotation mark is aria-hidden
 * - Author attribution uses <cite> element
 * - WCAG AA color contrast in both light and dark modes
 */

import React from 'react';

/**
 * Props for the PullQuote component
 */
interface PullQuoteProps {
  /** The quote text */
  quote: string;
  /** Optional author attribution */
  author?: string;
  /** Alignment variant */
  variant?: 'left' | 'center' | 'right';
  /** Neon color accent for borders and decorative elements */
  neonColor?: 'pink' | 'green' | 'blue' | 'yellow' | 'purple' | 'orange' | 'red' | 'cyan';
}

/**
 * PullQuote component — large visual quote with neon accents
 */
export function PullQuote(props: PullQuoteProps) {
  var quote = props.quote;
  var author = props.author;
  var variant = props.variant ? props.variant : 'left';
  var neonColor = props.neonColor ? props.neonColor : 'pink';

  var colorClass = 'pull-quote--' + neonColor;
  var variantClass = 'pull-quote--' + variant;
  var rootClass = ['pull-quote', colorClass, variantClass].join(' ');

  return (
    <blockquote className={rootClass}>
      <span className="pull-quote__mark" aria-hidden="true">&ldquo;</span>
      <p className="pull-quote__text">{quote}</p>
      {author && (
        <cite className="pull-quote__author">&mdash; {author}</cite>
      )}
    </blockquote>
  );
}