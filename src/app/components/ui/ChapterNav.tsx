/**
 * @fileoverview ChapterNav component — sticky chapter navigation
 *
 * Renders a navigation list of chapters that becomes sticky on scroll.
 * Highlights the active chapter and provides smooth scroll to sections.
 * Horizontal scroll on mobile, vertical sidebar on desktop.
 *
 * @component ChapterNav
 * @version 1.0.0
 *
 * @example
 * <ChapterNav
 *   chapters={[
 *     { id: 'aquarian', label: 'Aquarius & ADHD' },
 *     { id: 'wired', label: 'Wired Different' },
 *   ]}
 *   activeChapter="aquarian"
 *   onChapterClick={(id) => scrollTo(id)}
 * />
 *
 * @accessibility
 * - Uses <nav> element with aria-label
 * - aria-current="true" on active chapter
 * - Keyboard navigable (Tab through links, Enter/Space to activate)
 * - prefers-reduced-motion: smooth scroll disabled
 */

import React, { useCallback } from 'react';

/**
 * Single chapter entry
 */
interface ChapterEntry {
  id: string;
  label: string;
}

/**
 * Props for the ChapterNav component
 */
interface ChapterNavProps {
  /** Array of chapters to display */
  chapters: ChapterEntry[];
  /** Currently active chapter id */
  activeChapter?: string;
  /** Callback fired when a chapter is clicked */
  onChapterClick?: (id: string) => void;
  /** Optional extra class added to the nav root (e.g. "chapter-nav--sticky") */
  stickyClass?: string;
}

/**
 * ChapterNav component — sticky chapter navigation for long pages
 */
export function ChapterNav(props: ChapterNavProps) {
  var chapters = props.chapters;
  var activeChapter = props.activeChapter;
  var onChapterClick = props.onChapterClick;
  var stickyClass = props.stickyClass;

  var handleClick = useCallback(function (id: string) {
    if (onChapterClick) {
      onChapterClick(id);
      return;
    }

    // Default behavior: scroll to element with matching id
    var element = document.getElementById(id);
    if (element) {
      var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      element.scrollIntoView({
        behavior: prefersReduced ? 'auto' : 'smooth',
        block: 'start'
      });
    }
  }, [onChapterClick]);

  var handleKeyDown = useCallback(function (e: React.KeyboardEvent, id: string) {
    var isActivation = e.key === 'Enter' || e.key === ' ';
    if (isActivation) {
      e.preventDefault();
      handleClick(id);
    }
  }, [handleClick]);

  var navClass = stickyClass ? 'chapter-nav ' + stickyClass : 'chapter-nav';

  return (
    <nav className={navClass} aria-label="Chapter navigation">
      <ul className="chapter-nav__list">
        {chapters.map(function (chapter) {
          var isActive = activeChapter === chapter.id;
          var itemClass = 'chapter-nav__item' + (isActive ? ' chapter-nav__item--active' : '');

          return (
            <li className={itemClass} key={chapter.id}>
              <button
                type="button"
                className="chapter-nav__link"
                onClick={function () { handleClick(chapter.id); }}
                onKeyDown={function (e) { handleKeyDown(e, chapter.id); }}
                aria-current={isActive ? 'true' : undefined}
              >
                {chapter.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
