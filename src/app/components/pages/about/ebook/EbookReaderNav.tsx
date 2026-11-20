/**
 * @fileoverview Ebook bottom navigation bar — prev/next, chapters, fullscreen, settings.
 * Extracted from EbookPage.tsx (T14).
 */

import React, { useState, useEffect } from 'react';
import { CaretLeft, CaretRight, List, ArrowsOut, ArrowsIn, SlidersHorizontal, SignOut } from '@phosphor-icons/react';
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
  sessionExpiresAt?: string;
  onSignOut?: () => void;
}

export function EbookReaderNav(props: EbookReaderNavProps) {
  const [sessionStatus, setSessionStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // RA-T042: Display session expiry if available
  useEffect(() => {
    if (props.sessionExpiresAt) {
      const expiresDate = new Date(props.sessionExpiresAt);
      const now = new Date();
      const hoursLeft = Math.round((expiresDate.getTime() - now.getTime()) / (1000 * 60 * 60));

      if (hoursLeft > 24) {
        setSessionStatus(`Access: ${Math.round(hoursLeft / 24)}d left`);
      } else if (hoursLeft > 0) {
        setSessionStatus(`Access: ${hoursLeft}h left`);
      } else {
        setSessionStatus('Access expired');
      }
    }
  }, [props.sessionExpiresAt]);

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/.netlify/functions/reader-session', {
        method: 'DELETE',
        credentials: 'include',
      });

      if (res.ok) {
        setSessionStatus(null);
        props.onSignOut?.();
      }
    } catch (err) {
      console.error('Sign out failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

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

      {/* RA-T042: Session status and sign-out */}
      {sessionStatus && (
        <>
          <span className="ebook-reader__session-status" title={sessionStatus}>
            {sessionStatus}
          </span>
          <button
            type="button"
            className="ebook-reader__nav-btn ebook-reader__nav-btn--signout"
            onClick={handleSignOut}
            disabled={isLoading}
            aria-label="Sign out"
            title="Sign out of this session"
          >
            <SignOut className="ebook-reader__nav-icon" aria-hidden="true" />
          </button>
        </>
      )}

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