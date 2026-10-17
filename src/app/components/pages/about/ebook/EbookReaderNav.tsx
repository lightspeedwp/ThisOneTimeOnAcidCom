/**
 * @fileoverview Ebook bottom navigation bar — prev/next, chapters, fullscreen, settings.
 * Extracted from EbookPage.tsx (T14).
 */

import React from 'react';
import { CaretLeft, CaretRight, List, ArrowsOut, ArrowsIn, SlidersHorizontal } from '@phosphor-icons/react';
import { ebookUI } from '../../../../data/mock/ui/ebook';

interface EbookReaderNavProps {
  pageLabel: string;
  isSpreadMode: boolean;
  isFullScreen: boolean;
  drawerOpen: boolean;
  disableBackward: boolean;
  disableForward: boolean;
  onGoForward: () => void;
  onGoBackward: () => void;
  onOpenDrawer: () => void;
  onToggleFullScreen: () => void;
  onOpenSettings: () => void;
}

export function EbookReaderNav(props: EbookReaderNavProps) {
  return (
    <nav className="ebook-reader__nav" aria-label={ebookUI.nav.ariaLabel}>
      <button
        type="button"
        className="ebook-reader__nav-btn"
        onClick={props.onOpenDrawer}
        aria-label={ebookUI.nav.openChapters}
        aria-expanded={props.drawerOpen}
      >
        <List className="ebook-reader__nav-icon" aria-hidden="true" />
      </button>

      <button
        type="button"
        className="ebook-reader__nav-btn"
        onClick={props.onGoBackward}
        disabled={props.disableBackward}
        aria-label={ebookUI.nav.prev}
      >
        <CaretLeft className="ebook-reader__nav-icon" aria-hidden="true" />
      </button>

      <span className="ebook-reader__page-counter" aria-live="polite">
        {props.pageLabel}
      </span>

      <button
        type="button"
        className="ebook-reader__nav-btn"
        onClick={props.onGoForward}
        disabled={props.disableForward}
        aria-label={ebookUI.nav.next}
      >
        <CaretRight className="ebook-reader__nav-icon" aria-hidden="true" />
      </button>

      <button
        type="button"
        className="ebook-reader__nav-btn"
        onClick={props.onToggleFullScreen}
        aria-label={props.isFullScreen ? ebookUI.fullscreen.exit : ebookUI.fullscreen.enter}
      >
        {props.isFullScreen ?
          <ArrowsIn className="ebook-reader__nav-icon" aria-hidden="true" /> :
          <ArrowsOut className="ebook-reader__nav-icon" aria-hidden="true" />
        }
      </button>

      <button
        type="button"
        className="ebook-reader__nav-btn"
        onClick={props.onOpenSettings}
        aria-label={ebookUI.nav.settings}
      >
        <SlidersHorizontal className="ebook-reader__nav-icon" aria-hidden="true" />
      </button>
    </nav>
  );
}