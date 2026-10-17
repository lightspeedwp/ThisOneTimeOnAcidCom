/**
 * @fileoverview Reusable SectionCard component for AboutPage sections
 * Provides consistent theming and styling based on section content type
 *
 * @author Ash Shaw Portfolio Team
 * @version 2.0.0 - Icon gradient background containers
 */

import React from "react";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
import "../../../styles/blocks/section-card.css";

/**
 * Props interface for SectionCard component
 */
interface SectionCardProps {
  title: string;
  children: React.ReactNode;
  theme: {
    name: string;
    backgroundGradient?: { from: string; via: string; to: string };
    titleColor?: string;
    cardBorder?: { from: string; to: string };
    decorativeColor?: string;
    quoteColor?: string;
    accentGradient?: { from: string; to: string };
  };
  quote?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
  backgroundClassName?: string;
  id?: string;
  icon?: PhosphorIcon;
}

/**
 * Reusable section card component with consistent theming
 */
export function SectionCard({
  title,
  children,
  theme,
  quote,
  actions,
  className = "",
  backgroundClassName,
  id,
  icon,
}: SectionCardProps) {
  let themeName = theme.name;
  if (themeName === "nails") themeName = "uv";

  // Use dynamic inline styles for complex gradient combinations to avoid thousands of CSS classes
  const borderGradientStyle = theme.cardBorder 
    ? { background: `linear-gradient(to bottom right, var(--wp--preset--color--${theme.cardBorder.from}), var(--wp--preset--color--${theme.cardBorder.to}))` }
    : {};

  const decorativeColorParts = theme.decorativeColor ? theme.decorativeColor.split(' ') : [];
  const decorativeFirstColor = decorativeColorParts[0];
  const decorativeSecondColor = decorativeColorParts[1] ? decorativeColorParts[1] : decorativeColorParts[0];
  
  const orbGradientStyle = theme.decorativeColor
    ? { background: `linear-gradient(to bottom right, var(--wp--preset--color--${decorativeFirstColor}), var(--wp--preset--color--${decorativeSecondColor}))` }
    : {};

  // Build icon wrapper gradient from the theme's accent gradient
  const iconGradientStyle = theme.accentGradient
    ? { background: `linear-gradient(135deg, var(--wp--preset--color--${theme.accentGradient.from}), var(--wp--preset--color--${theme.accentGradient.to}))` }
    : {};

  const Icon = icon;

  // Extract property access for className to avoid bundler issues
  const titleColorClass = theme.titleColor ? theme.titleColor : '';
  const quoteColorClass = theme.quoteColor ? theme.quoteColor : '';

  return (
    <section
      id={id}
      className={`section-card ${className}`}
    >
      {/* Gradient Border Wrapper */}
      <div 
        className="section-card__border"
        style={borderGradientStyle}
        aria-hidden="true" 
      />

      {/* Card Content Background */}
      <div className="section-card__content">
        
        {/* Animated Decorative Element (Orb) */}
        <div
          className="section-card__orb"
          style={orbGradientStyle}
          aria-hidden="true"
        />

        <div className="section-card__inner">
          {/* Section Title */}
          <h2 className={`section-card__title ${titleColorClass}`}>
            {Icon && (
              <span
                className="section-card__icon-wrap"
                style={iconGradientStyle}
                aria-hidden="true"
              >
                <Icon className="section-card__title-icon" />
              </span>
            )}
            {title}
          </h2>

          {/* Content */}
          <div className="section-card__body">
            {children}
          </div>

          {/* Pull Quote */}
          {quote && (
            <blockquote
              className={`section-card__quote ${quoteColorClass}`}
              style={{ '--section-accent': theme.accentGradient ? `var(--wp--preset--color--${theme.accentGradient.from})` : 'transparent' } as React.CSSProperties}
            >
              "{quote}"
            </blockquote>
          )}

          {/* Actions */}
          {actions && (
            <div className="section-card__actions">
              {actions}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}