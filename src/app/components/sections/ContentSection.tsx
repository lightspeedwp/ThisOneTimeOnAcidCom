/**
 * @fileoverview ContentSection component — flexible content wrapper with design variants
 *
 * A versatile section wrapper that provides consistent spacing, optional titles,
 * color accents, and background patterns. Supports four variants:
 * default, hero, callout, and aside.
 *
 * @component ContentSection
 * @version 1.0.0
 *
 * @example
 * <ContentSection
 *   title="The Aquarian Blueprint"
 *   subtitle="Born under the water bearer sign"
 *   variant="callout"
 *   colorAccent="blue"
 * >
 *   <p>Ash has always questioned everything...</p>
 * </ContentSection>
 *
 * @accessibility
 * - Uses <section> semantic element with aria-labelledby
 * - Title hierarchy maintained (h2 for section titles)
 * - Color accents meet WCAG AA contrast requirements
 */

import React from 'react';

/**
 * Props for the ContentSection component
 */
interface ContentSectionProps {
  /** Optional section title */
  title?: string;
  /** Optional subtitle */
  subtitle?: string;
  /** Section content */
  children: React.ReactNode;
  /** Layout variant. Default: 'default' */
  variant?: 'default' | 'hero' | 'callout' | 'aside';
  /** Neon color accent for borders and accents */
  colorAccent?: 'pink' | 'green' | 'blue' | 'purple' | 'yellow' | 'orange' | 'red' | 'cyan';
  /** Background pattern. Default: 'none' */
  backgroundPattern?: 'noise' | 'gradient' | 'none';
  /** Optional id for anchor linking */
  id?: string;
}

/**
 * Map color accent to the content color system classes
 */
function getAccentClasses(accent: string): { border: string; bg: string; text: string } {
  if (accent === 'pink') return { border: 'color-story--border', bg: 'color-story--bg', text: 'color-story--text' };
  if (accent === 'green') return { border: 'color-tech--border', bg: 'color-tech--bg', text: 'color-tech--text' };
  if (accent === 'blue') return { border: 'color-philosophy--border', bg: 'color-philosophy--bg', text: 'color-philosophy--text' };
  if (accent === 'purple') return { border: 'color-community--border', bg: 'color-community--bg', text: 'color-community--text' };
  if (accent === 'yellow') return { border: 'color-highlight--border', bg: 'color-highlight--bg', text: 'color-highlight--text' };
  if (accent === 'orange') return { border: 'color-energy--border', bg: 'color-energy--bg', text: 'color-energy--text' };
  if (accent === 'red') return { border: 'color-fire--border', bg: 'color-fire--bg', text: 'color-fire--text' };
  if (accent === 'cyan') return { border: 'color-flow--border', bg: 'color-flow--bg', text: 'color-flow--text' };
  return { border: '', bg: '', text: '' };
}

/**
 * ContentSection component — flexible content wrapper with design variants
 */
export function ContentSection(props: ContentSectionProps) {
  var title = props.title;
  var subtitle = props.subtitle;
  var children = props.children;
  var variant = props.variant ? props.variant : 'default';
  var colorAccent = props.colorAccent;
  var backgroundPattern = props.backgroundPattern ? props.backgroundPattern : 'none';
  var sectionId = props.id;

  var accentClasses = colorAccent ? getAccentClasses(colorAccent) : null;

  // Build root class
  var classes = ['content-section', 'section-spacing', 'px-horizontal-section'];
  classes.push('content-section--' + variant);

  if (variant === 'callout' && accentClasses) {
    classes.push(accentClasses.border);
    classes.push(accentClasses.bg);
  }

  if (backgroundPattern === 'noise') {
    classes.push('bg-atomic-noise');
  } else if (backgroundPattern === 'gradient') {
    classes.push('bg-aurora-mesh');
  }

  var rootClass = classes.filter(Boolean).join(' ');

  // Title id for aria-labelledby
  var titleId = sectionId ? sectionId + '-title' : undefined;
  var hasTitle = title ? true : false;

  return (
    <section
      className={rootClass}
      id={sectionId}
      aria-labelledby={hasTitle ? titleId : undefined}
    >
      <div className="section-container">
        {hasTitle && (
          <div className="content-section__header">
            {subtitle && (
              <p className={
                'content-section__subtitle' +
                (accentClasses ? ' ' + accentClasses.text : '')
              }>
                {subtitle}
              </p>
            )}
            <h2 className="content-section__title" id={titleId}>
              {title}
            </h2>
          </div>
        )}
        <div className="content-section__body">
          {children}
        </div>
      </div>
    </section>
  );
}