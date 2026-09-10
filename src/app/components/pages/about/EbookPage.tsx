/**
 * @fileoverview Unified responsive eBook reader.
 *
 * Breakpoints:
 *   - Mobile compact (320-419px): single-page, 18px body, tight padding
 *   - Mobile (420-767px): single-page, 20px body, moderate padding
 *   - Tablet portrait (768-1023px): single-page, 22px body, line-length constrained
 *   - Tablet landscape (1024-1279px): two-page spread, 18px body (narrow pages)
 *   - Desktop (1280-1439px): two-page spread, 19px body
 *   - Large desktop (1440px+): two-page spread, 22px body, max-width reached
 *
 * Max-width: 1440px. Typography custom properties overridden per breakpoint.
 * Touch swipe, keyboard arrows, and button navigation all supported.
 *
 * @component EbookPage
 * @version 5.0.0 - Extracted PageContent, Drawer, Nav, helpers (T14)
 */

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { X, SlidersHorizontal } from '@phosphor-icons/react';
import { bookPages } from '../../../data/mock/pages/ebook-pages';
import { ebookUI } from '../../../data/mock/ui/ebook';
import { ebookBreadcrumbs } from '../../../data/mock/ui/breadcrumbs';
import { setSEO, setSchema } from '../../../utils/seo';
import { pageSEO } from '../../../data/mock/seo';
import { Breadcrumbs } from '../../ui/Breadcrumbs';
import { EbookSettingsModal } from '../../ui/EbookSettingsModal';
import {
  readSavedPage,
  savePage,
  readFontSize,
  saveFontSize,
  readMinimalMode,
  saveMinimalMode,
  readPagingEffect,
  savePagingEffect,
  FONT_SIZE_SCALE,
} from '../../../utils/ebookPreferences';
import type { FontSizePreset, PagingEffect } from '../../../utils/ebookPreferences';

import {
  SWIPE_THRESHOLD,
  SWIPE_ANGLE_MAX,
  chapterIndex,
  drawerGroups,
  buildSpreads,
  pageToSpread,
  spreadToPage,
  useSpreadMode,
  pageTypeClass,
} from './ebook/ebookHelpers';
import { PageContent } from './ebook/EbookPageContent';
import { EbookDrawer } from './ebook/EbookDrawer';
import { EbookReaderNav } from './ebook/EbookReaderNav';

import '../../../../styles/blocks/ebook-base.css';
import '../../../../styles/blocks/ebook-navigation.css';
import '../../../../styles/blocks/ebook-page-types.css';
import '../../../../styles/blocks/ebook-drawer.css';
import '../../../../styles/blocks/ebook-responsive.css';
import '../../../../styles/blocks/ebook-enhanced-contrast.css';
import '../../../../styles/blocks/button.css';

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   EBOOK PAGE COMPONENT
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export function EbookPage() {
  var isSpreadMode = useSpreadMode();
  var mainRefInit: HTMLElement | null = null;
  var mainRef = useRef(mainRefInit);

  var spreads = React.useMemo(function () { return buildSpreads(bookPages); }, []);
  var totalPages = bookPages.length;
  var totalSpreads = spreads.length;

  /* ── Full Screen ── */
  var [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(function () {
    if (isFullScreen) {
      document.body.classList.add('ebook-fullscreen');
    } else {
      document.body.classList.remove('ebook-fullscreen');
    }
    return function () {
      document.body.classList.remove('ebook-fullscreen');
    };
  }, [isFullScreen]);

  useEffect(function () {
    var handleFullScreenChange = function () {
      if (document.fullscreenElement !== null) {
        setIsFullScreen(true);
      } else {
        setIsFullScreen(false);
      }
    };

    var handleEscKey = function (e: KeyboardEvent) {
      if (e.key === 'Escape' && isFullScreen) {
        if (!document.fullscreenElement) {
          setIsFullScreen(false);
        }
      }
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);
    window.addEventListener('keydown', handleEscKey);

    return function () {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
      window.removeEventListener('keydown', handleEscKey);
    };
  }, [isFullScreen]);

  var toggleFullScreen = useCallback(function () {
    if (!isFullScreen) {
      setIsFullScreen(true);
      if (mainRef.current && mainRef.current.requestFullscreen) {
        mainRef.current.requestFullscreen().catch(function () {
          // Silently stay in "visual" full screen mode if API denied
        });
      }
    } else {
      setIsFullScreen(false);
      if (document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen().catch(function () { /* ignore exit errors */ });
      }
    }
  }, [isFullScreen]);

  /* ── Primary state: single-page index (source of truth) ── */
  var [currentPage, setCurrentPage] = useState(function () { return readSavedPage(totalPages - 1); });
  var flipStateInit: 'idle' | 'forward' | 'backward' | 'fade' = 'idle';
  var [flipState, setFlipState] = useState(flipStateInit);
  var [swipeOffset, setSwipeOffset] = useState(0);
  var [isAnimating, setIsAnimating] = useState(false);

  /* ── Chapter drawer state ── */
  var [drawerOpen, setDrawerOpen] = useState(false);

  /* ── Collapsed drawer groups state ── */
  var [collapsedGroups, setCollapsedGroups] = useState(function () {
    var initial: Record<string, boolean> = {};
    for (var i = 0; i < drawerGroups.length; i++) {
      if (drawerGroups[i].collapsible) {
        initial[drawerGroups[i].id] = true;
      }
    }
    return initial;
  });

  function toggleDrawerGroup(groupId: string) {
    setCollapsedGroups(function (prev) {
      var next: Record<string, boolean> = {};
      var keys = Object.keys(prev);
      for (var k = 0; k < keys.length; k++) {
        if (keys[k] === groupId) {
          next[keys[k]] = !prev[keys[k]];
        } else {
          next[keys[k]] = prev[keys[k]];
        }
      }
      return next;
    });
  }

  /* ── Settings modal state ── */
  const [settingsOpen, setSettingsOpen] = useState(false);

  /* ── Font size state ── */
  const [fontSize, setFontSize] = useState(function () { return readFontSize(); });

  /* ── Minimal mode state ── */
  const [minimalMode, setMinimalMode] = useState(function () { return readMinimalMode(); });

  /* ── Paging effect state ── */
  const [pagingEffect, setPagingEffect] = useState(function () { return readPagingEffect(); });

  /* ── Apply font size to CSS custom properties ── */
  useEffect(function () {
    const scale = FONT_SIZE_SCALE[fontSize];
    if (mainRef.current) {
      mainRef.current.style.setProperty('--ebook-font-scale', String(scale));
    }
    saveFontSize(fontSize);
  }, [fontSize]);

  /* ── Persist minimal mode ── */
  useEffect(function () {
    saveMinimalMode(minimalMode);
  }, [minimalMode]);

  /* ── Persist paging effect ── */
  useEffect(function () {
    savePagingEffect(pagingEffect);
  }, [pagingEffect]);

  /* ── Touch refs ── */
  const touchStartXInit: number | null = null;
  const touchStartX = useRef(touchStartXInit);
  const touchStartYInit: number | null = null;
  const touchStartY = useRef(touchStartYInit);
  const isSwiping = useRef(false);
  const readerRefInit: HTMLDivElement | null = null;
  const readerRef = useRef(readerRefInit);

  /* ── Scroll passthrough ref for spread mode ── */
  const bookRefInit: HTMLDivElement | null = null;
  const bookRef = useRef(bookRefInit);

  /* ── Swipe zone visual feedback ── */
  const [leftSwipeActive, setLeftSwipeActive] = useState(false);
  const [rightSwipeActive, setRightSwipeActive] = useState(false);

  useEffect(function () {
    setSEO(pageSEO.ebook);
    setSchema({
      "@context": "https://schema.org",
      "@type": "Book",
      "name": "This one time on acid... (Draft)",
      "bookFormat": "EBook",
      "author": {
        "@type": "Person",
        "name": "Ash Shaw",
        "url": "https://ashshaw.com/about-ash"
      },
      "url": "https://ashshaw.com/ebook",
      "description": "Read the draft of Ash Shaw's hybrid memoir and creative-life guide about subculture, difference, freedom, reinvention, and becoming fully yourself.",
      "inLanguage": "en",
      "genre": ["Memoir", "Self-help", "Creative nonfiction"]
    });
    return function() { setSchema(null); };
  }, []);

  /* ── Persist reading position ── */
  useEffect(function () {
    savePage(currentPage);
  }, [currentPage]);

  /* ── Derived spread index ── */
  const currentSpread = pageToSpread(currentPage);

  /* ── Reset scroll position on page change (spread mode) ── */
  useEffect(function () {
    if (bookRef.current) {
      var pageInners = bookRef.current.querySelectorAll('.ebook-reader__page-inner');
      for (var i = 0; i < pageInners.length; i++) {
        pageInners[i].scrollTop = 0;
      }
    }
  }, [currentSpread]);

  /* ── Navigation ── */
  const canGoForwardSingle = currentPage < totalPages - 1;
  const canGoBackwardSingle = currentPage > 0;
  const canGoForwardSpread = currentSpread < totalSpreads - 1;
  const canGoBackwardSpread = currentSpread > 0;

  const goForward = useCallback(function () {
    if (isAnimating) return;
    if (isSpreadMode) {
      if (!canGoForwardSpread || flipState !== 'idle') return;
      
      if (pagingEffect === '3d-flip') {
        setFlipState('forward');
        setTimeout(function () {
          const nextSpreadIdx = Math.min(currentSpread + 1, totalSpreads - 1);
          setCurrentPage(spreadToPage(nextSpreadIdx));
          setFlipState('idle');
        }, 600);
      } else if (pagingEffect === 'fade') {
        setFlipState('fade');
        setIsAnimating(true);
        setTimeout(function () {
          const nextSpreadIdx = Math.min(currentSpread + 1, totalSpreads - 1);
          setCurrentPage(spreadToPage(nextSpreadIdx));
          setFlipState('idle');
          setTimeout(function() {
            setIsAnimating(false);
          }, 300);
        }, 300);
      } else {
        // none or slide (fallback to none for spread)
        const nextSpreadIdx = Math.min(currentSpread + 1, totalSpreads - 1);
        setCurrentPage(spreadToPage(nextSpreadIdx));
      }
    } else {
      if (!canGoForwardSingle) return;
      
      if (pagingEffect === 'slide' || pagingEffect === '3d-flip') {
        setIsAnimating(true);
        setSwipeOffset(-100);
        setTimeout(function () {
          setCurrentPage(function (p) { return Math.min(p + 1, totalPages - 1); });
          setSwipeOffset(0);
          setIsAnimating(false);
        }, 400);
      } else if (pagingEffect === 'fade') {
        setFlipState('fade');
        setIsAnimating(true);
        setTimeout(function () {
          setCurrentPage(function (p) { return Math.min(p + 1, totalPages - 1); });
          setFlipState('idle');
          setTimeout(function() {
            setIsAnimating(false);
          }, 300);
        }, 300);
      } else {
        // none
        setCurrentPage(function (p) { return Math.min(p + 1, totalPages - 1); });
      }
    }
  }, [isSpreadMode, canGoForwardSpread, canGoForwardSingle, flipState, isAnimating, totalPages, currentSpread, totalSpreads, pagingEffect]);

  const goBackward = useCallback(function () {
    if (isAnimating) return;
    if (isSpreadMode) {
      if (!canGoBackwardSpread || flipState !== 'idle') return;
      
      if (pagingEffect === '3d-flip') {
        setFlipState('backward');
        setTimeout(function () {
          const prevSpreadIdx = Math.max(currentSpread - 1, 0);
          setCurrentPage(spreadToPage(prevSpreadIdx));
          setFlipState('idle');
        }, 600);
      } else if (pagingEffect === 'fade') {
        setFlipState('fade');
        setIsAnimating(true);
        setTimeout(function () {
          const prevSpreadIdx = Math.max(currentSpread - 1, 0);
          setCurrentPage(spreadToPage(prevSpreadIdx));
          setFlipState('idle');
          setTimeout(function() {
            setIsAnimating(false);
          }, 300);
        }, 300);
      } else {
        const prevSpreadIdx = Math.max(currentSpread - 1, 0);
        setCurrentPage(spreadToPage(prevSpreadIdx));
      }
    } else {
      if (!canGoBackwardSingle) return;
      
      if (pagingEffect === 'slide' || pagingEffect === '3d-flip') {
        setIsAnimating(true);
        setSwipeOffset(100);
        setTimeout(function () {
          setCurrentPage(function (p) { return Math.max(p - 1, 0); });
          setSwipeOffset(0);
          setIsAnimating(false);
        }, 400);
      } else if (pagingEffect === 'fade') {
        setFlipState('fade');
        setIsAnimating(true);
        setTimeout(function () {
          setCurrentPage(function (p) { return Math.max(p - 1, 0); });
          setFlipState('idle');
          setTimeout(function() {
            setIsAnimating(false);
          }, 300);
        }, 300);
      } else {
        setCurrentPage(function (p) { return Math.max(p - 1, 0); });
      }
    }
  }, [isSpreadMode, canGoBackwardSpread, canGoBackwardSingle, flipState, isAnimating, currentSpread, pagingEffect]);

  const handleFlipEnd = useCallback(function () {
    if (flipState === 'forward') {
      const nextSpreadIdx = Math.min(currentSpread + 1, totalSpreads - 1);
      setCurrentPage(spreadToPage(nextSpreadIdx));
    } else if (flipState === 'backward') {
      const prevSpreadIdx = Math.max(currentSpread - 1, 0);
      setCurrentPage(spreadToPage(prevSpreadIdx));
    }
    setFlipState('idle');
  }, [flipState, currentSpread, totalSpreads]);

  /* ── Chapter jump ── */
  const jumpToPage = useCallback(function (pageIndex: number) {
    setCurrentPage(Math.max(0, Math.min(pageIndex, totalPages - 1)));
    setFlipState('idle');
    setSwipeOffset(0);
    setIsAnimating(false);
    setDrawerOpen(false);
  }, [totalPages]);

  /* ── Keyboard ── */
  useEffect(function () {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        if (drawerOpen) {
          e.preventDefault();
          setDrawerOpen(false);
          return;
        }
        if (settingsOpen) {
          e.preventDefault();
          setSettingsOpen(false);
          return;
        }
        if (isFullScreen) {
          e.preventDefault();
          toggleFullScreen();
          return;
        }
        return;
      }

      if (drawerOpen || settingsOpen) return;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        goForward();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        goBackward();
      } else if (e.key === 'Home') {
        e.preventDefault();
        jumpToPage(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        jumpToPage(totalPages - 1);
      } else if (e.key === 's' || e.key === 'S') {
        e.preventDefault();
        setSettingsOpen(true);
      } else if (e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        setMinimalMode(!minimalMode);
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFullScreen();
      } else if (e.key === 'c' || e.key === 'C') {
        e.preventDefault();
        setDrawerOpen(true);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return function () { window.removeEventListener('keydown', handleKeyDown); };
  }, [goForward, goBackward, drawerOpen, settingsOpen, isFullScreen, toggleFullScreen, minimalMode, jumpToPage, totalPages]);

  /* ── Touch swipe ── */
  const handleTouchStart = useCallback(function (e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    isSwiping.current = false;
  }, []);

  const handleTouchMove = useCallback(function (e: React.TouchEvent) {
    if (touchStartX.current === null || touchStartY.current === null) return;
    var dx = e.touches[0].clientX - touchStartX.current;
    var dy = e.touches[0].clientY - touchStartY.current;

    if (!isSwiping.current) {
      if (Math.abs(dx) > 10 && Math.abs(dx) > Math.abs(dy)) {
        isSwiping.current = true;
      } else if (Math.abs(dy) > 10) {
        touchStartX.current = null;
        return;
      }
    }

    if (isSwiping.current && !isSpreadMode && !isAnimating) {
      var percent = (dx / window.innerWidth) * 100;
      setSwipeOffset(Math.max(-50, Math.min(50, percent)));

      if (percent < -10) {
        setLeftSwipeActive(true);
        setRightSwipeActive(false);
      } else if (percent > 10) {
        setLeftSwipeActive(false);
        setRightSwipeActive(true);
      } else {
        setLeftSwipeActive(false);
        setRightSwipeActive(false);
      }
    }
  }, [isSpreadMode, isAnimating]);

  const handleTouchEnd = useCallback(function (e: React.TouchEvent) {
    if (touchStartX.current === null || touchStartY.current === null) return;
    var dx = e.changedTouches[0].clientX - touchStartX.current;
    var dy = e.changedTouches[0].clientY - touchStartY.current;

    if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dy) < Math.abs(dx) * Math.tan(SWIPE_ANGLE_MAX)) {
      if (dx < 0) {
        goForward();
      } else {
        goBackward();
      }
    } else {
      setSwipeOffset(0);
    }

    touchStartX.current = null;
    touchStartY.current = null;
    isSwiping.current = false;
    setLeftSwipeActive(false);
    setRightSwipeActive(false);
  }, [goForward, goBackward]);

  /* ── Spread data for desktop ── */
  const spread = spreads[currentSpread];
  const nextSpread = currentSpread < totalSpreads - 1 ? spreads[currentSpread + 1] : null;
  const prevSpread = currentSpread > 0 ? spreads[currentSpread - 1] : null;

  /* ── Scroll passthrough for spread click zones ── */
  const handleBookWheel = useCallback(function (e: React.WheelEvent) {
    if (!bookRef.current) return;
    var bookRect = bookRef.current.getBoundingClientRect();
    var midX = bookRect.left + bookRect.width / 2;
    var isLeftSide = e.clientX < midX;

    var targetSelector = isLeftSide
      ? '.ebook-reader__page--left .ebook-reader__page-inner'
      : '.ebook-reader__page--right .ebook-reader__page-inner';
    var scrollTarget = bookRef.current.querySelector(targetSelector);

    if (scrollTarget) {
      scrollTarget.scrollTop = scrollTarget.scrollTop + e.deltaY;
    }
  }, []);

  /* ── Progress ── */
  const progressSingle = currentPage / Math.max(totalPages - 1, 1);
  const progressSpread = currentSpread / Math.max(totalSpreads - 1, 1);
  const progress = isSpreadMode ? progressSpread : progressSingle;

  /* ── Display label ── */
  const pageLabel = (function () {
    if (isSpreadMode) {
      var leftNum = spread.left != null && spread.left.pageNumber != null ? spread.left.pageNumber : null;
      var rightNum = spread.right != null && spread.right.pageNumber != null ? spread.right.pageNumber : null;

      if (leftNum != null && rightNum != null) {
        return 'Pages ' + leftNum + '–' + rightNum;
      }
      if (leftNum != null) {
        return 'Page ' + leftNum;
      }
      if (rightNum != null) {
        return 'Page ' + rightNum;
      }
      return (currentSpread + 1) + ' / ' + totalSpreads;
    } else {
      var currentPageData = bookPages[currentPage];
      if (currentPageData != null && currentPageData.pageNumber != null) {
        return 'Page ' + currentPageData.pageNumber;
      }
      return (currentPage + 1) + ' / ' + totalPages;
    }
  })();

  /* ── Breadcrumbs ── */
  const breadcrumbs = ebookBreadcrumbs();

  /* ── Single-page neighbours for peek effect ── */
  const prevPage = currentPage > 0 ? bookPages[currentPage - 1] : null;
  const nextPage = currentPage < totalPages - 1 ? bookPages[currentPage + 1] : null;
  const activePage = bookPages[currentPage];

  /* ── Current chapter index (for drawer active state) ── */
  const currentChapterIdx = React.useMemo(function () {
    var idx = -1;
    for (var i = 0; i < chapterIndex.length; i++) {
      if (chapterIndex[i].pageIndex <= currentPage) {
        idx = i;
      } else {
        break;
      }
    }
    return idx;
  }, [currentPage]);

  /* ── Auto-expand group containing current chapter ── */
  useEffect(function () {
    for (var g = 0; g < drawerGroups.length; g++) {
      var group = drawerGroups[g];
      if (!group.collapsible) continue;
      for (var e = 0; e < group.entries.length; e++) {
        if (group.entries[e].globalIdx === currentChapterIdx) {
          var targetGroupId = group.id;
          setCollapsedGroups(function (prev) {
            if (prev[targetGroupId]) {
              var next: Record<string, boolean> = {};
              var keys = Object.keys(prev);
              for (var k = 0; k < keys.length; k++) {
                if (keys[k] === targetGroupId) {
                  next[keys[k]] = false;
                } else {
                  next[keys[k]] = prev[keys[k]];
                }
              }
              return next;
            }
            return prev;
          });
          return;
        }
      }
    }
  }, [currentChapterIdx]);

  // Derived disable flags
  const cannotGoBackward = !canGoBackwardSpread || flipState !== 'idle';
  const cannotGoForward = !canGoForwardSpread || flipState !== 'idle';
  const disableBackwardSingle = !canGoBackwardSingle || isAnimating;
  const disableForwardSingle = !canGoForwardSingle || isAnimating;

  // Transition for single-page track
  var singleTrackTransition = 'transform 200ms ease';
  if (isAnimating) {
    singleTrackTransition = 'transform 280ms cubic-bezier(0.4, 0, 0.2, 1)';
  } else if (swipeOffset !== 0) {
    singleTrackTransition = 'none';
  }

  return (
    <main
      ref={mainRef}
      id="main-content"
      tabIndex={-1}
      className={'ebook-reader bg-atomic-noise' + (minimalMode ? ' ebook-reader--minimal' : '')}
      aria-label={ebookUI.readerAriaLabel}
      role="main"
    >
      {/* ── Slim Hero ── */}
      {!isFullScreen && (
        <header className="ebook-reader__hero">
          <div className="ebook-reader__hero-inner">
            <Breadcrumbs items={breadcrumbs} centered />
          </div>
        </header>
      )}

      {/* ── Fullscreen Close Button ── */}
      {isFullScreen && (
        <button
          type="button"
          className="ebook-reader__fullscreen-close"
          onClick={toggleFullScreen}
          aria-label={ebookUI.fullscreen.exit}
        >
          <X size={24} />
        </button>
      )}

      {/* ══════════════════════════════════════
         SINGLE-PAGE MODE (mobile + portrait tablet)
         ══════════════════════════════════════ */}
      {!isSpreadMode && (
        <div
          className={'ebook-reader__single-wrapper' + (flipState === 'fade' ? ' ebook-reader--fading' : '')}
          ref={readerRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          role="region"
          aria-label={ebookUI.aria.singlePage(currentPage + 1, totalPages)}
          aria-live="polite"
        >
          <div
            className="ebook-reader__single-track"
            ref={function(el) {
              if (el) {
                el.style.transform = 'translateX(' + swipeOffset + '%)';
                el.style.transition = singleTrackTransition;
              }
            }}
          >
            {/* Previous page (off-screen left) */}
            <div
              className={'ebook-reader__single-page ebook-reader__single-page--prev ' + (prevPage ? pageTypeClass(prevPage) : '')}
              aria-hidden="true"
            >
              {prevPage ? <PageContent page={prevPage} /> : <div className="ebook-reader__page-inner" />}
            </div>

            {/* Current page */}
            <div
              className={'ebook-reader__single-page ebook-reader__single-page--current ' + pageTypeClass(activePage)}
            >
              <PageContent page={activePage} />
            </div>

            {/* Next page (off-screen right) */}
            <div
              className={'ebook-reader__single-page ebook-reader__single-page--next ' + (nextPage ? pageTypeClass(nextPage) : '')}
              aria-hidden="true"
            >
              {nextPage ? <PageContent page={nextPage} /> : <div className="ebook-reader__page-inner" />}
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════
         SPREAD MODE (landscape tablet + desktop)
         ══════════════════════════════════════ */}
      {isSpreadMode && (
        <div className={'ebook-reader__book-wrapper' + (flipState === 'fade' ? ' ebook-reader--fading' : '')}>
          <div
            className="ebook-reader__book"
            role="region"
            aria-label={ebookUI.aria.spreadPage(currentSpread + 1, totalSpreads)}
            aria-live="polite"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            ref={bookRef}
            onWheel={handleBookWheel}
          >
            <div className="ebook-reader__spine" aria-hidden="true" />

            {/* Left page */}
            <div
              className={'ebook-reader__page ebook-reader__page--left ' + (spread.left ? pageTypeClass(spread.left) : '')}
            >
              {spread.left ? (
                <PageContent page={spread.left} />
              ) : (
                <div className="ebook-reader__page-inner" />
              )}
            </div>

            {/* Right page */}
            <div
              className={'ebook-reader__page ebook-reader__page--right ' + (spread.right ? pageTypeClass(spread.right) : '')}
            >
              {spread.right ? (
                <PageContent page={spread.right} />
              ) : (
                <div className="ebook-reader__page-inner" />
              )}
            </div>

            {/* 3D Flip forward */}
            {flipState === 'forward' && nextSpread && (
              <div
                className="ebook-reader__flip-layer ebook-reader__flip-layer--forward"
                onAnimationEnd={handleFlipEnd}
              >
                <div
                  className={'ebook-reader__flip-face ebook-reader__flip-face--front ' + (spread.right ? pageTypeClass(spread.right) : '')}
                >
                  {spread.right ? <PageContent page={spread.right} /> : <div className="ebook-reader__page-inner" />}
                </div>
                <div
                  className={'ebook-reader__flip-face ebook-reader__flip-face--back ' + (nextSpread.left ? pageTypeClass(nextSpread.left) : '')}
                >
                  {nextSpread.left ? <PageContent page={nextSpread.left} /> : <div className="ebook-reader__page-inner" />}
                </div>
              </div>
            )}

            {/* 3D Flip backward */}
            {flipState === 'backward' && prevSpread && (
              <div
                className="ebook-reader__flip-layer ebook-reader__flip-layer--backward"
                onAnimationEnd={handleFlipEnd}
              >
                <div
                  className={'ebook-reader__flip-face ebook-reader__flip-face--front ' + (prevSpread.right ? pageTypeClass(prevSpread.right) : '')}
                >
                  {prevSpread.right ? <PageContent page={prevSpread.right} /> : <div className="ebook-reader__page-inner" />}
                </div>
                <div
                  className={'ebook-reader__flip-face ebook-reader__flip-face--back ' + (spread.left ? pageTypeClass(spread.left) : '')}
                >
                  {spread.left ? <PageContent page={spread.left} /> : <div className="ebook-reader__page-inner" />}
                </div>
              </div>
            )}

            {/* Click zones */}
            <button
              type="button"
              className={'ebook-reader__click-zone ebook-reader__click-zone--left' + (!canGoBackwardSpread ? ' ebook-reader__click-zone--disabled' : '')}
              onClick={goBackward}
              disabled={cannotGoBackward}
              aria-label={ebookUI.nav.prev}
              tabIndex={-1}
            />
            <button
              type="button"
              className={'ebook-reader__click-zone ebook-reader__click-zone--right' + (!canGoForwardSpread ? ' ebook-reader__click-zone--disabled' : '')}
              onClick={goForward}
              disabled={cannotGoForward}
              aria-label={ebookUI.nav.next}
              tabIndex={-1}
            />
          </div>
        </div>
      )}

      {/* ── Unified Progress Bar ── */}
      <div className="ebook-reader__progress" aria-hidden="true">
        <div
          className="ebook-reader__progress-fill"
          ref={function(el) {
            if (el) el.style.width = (progress * 100) + '%';
          }}
        />
      </div>

      {/* ── Unified Navigation ── */}
      <EbookReaderNav
        pageLabel={pageLabel}
        isSpreadMode={isSpreadMode}
        isFullScreen={isFullScreen}
        drawerOpen={drawerOpen}
        disableBackward={isSpreadMode ? cannotGoBackward : disableBackwardSingle}
        disableForward={isSpreadMode ? cannotGoForward : disableForwardSingle}
        onGoForward={goForward}
        onGoBackward={goBackward}
        onOpenDrawer={function () { setDrawerOpen(true); }}
        onToggleFullScreen={toggleFullScreen}
        onOpenSettings={function () { setSettingsOpen(true); }}
      />

      {/* ── Chapter Jump Drawer ── */}
      <EbookDrawer
        drawerOpen={drawerOpen}
        onClose={function () { setDrawerOpen(false); }}
        drawerGroups={drawerGroups}
        collapsedGroups={collapsedGroups}
        onToggleGroup={toggleDrawerGroup}
        onJumpToPage={jumpToPage}
        currentChapterIdx={currentChapterIdx}
      />

      {/* ── Settings Modal ── */}
      <EbookSettingsModal
        isOpen={settingsOpen}
        onClose={function () { setSettingsOpen(false); }}
        currentPage={currentPage}
        totalPages={totalPages}
        fontSize={fontSize}
        minimalMode={minimalMode}
        pagingEffect={pagingEffect}
        onPageJump={jumpToPage}
        onFontSizeChange={setFontSize}
        onMinimalModeToggle={function () { setMinimalMode(!minimalMode); }}
        onPagingEffectChange={setPagingEffect}
        progressPercent={progress * 100}
        currentChapterTitle={chapterIndex[currentChapterIdx] != null ? chapterIndex[currentChapterIdx].label : undefined}
      />

      {/* ── Minimal Mode — Floating Settings Button ── */}
      {minimalMode && (
        <button
          type="button"
          className="ebook-reader__floating-settings"
          onClick={function () { setSettingsOpen(true); }}
          aria-label="Open reader settings"
        >
          <SlidersHorizontal size={24} aria-hidden="true" />
        </button>
      )}
    </main>
  );
}