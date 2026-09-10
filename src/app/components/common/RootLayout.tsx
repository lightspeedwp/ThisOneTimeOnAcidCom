/**
 * @fileoverview Root layout component for Ash Shaw Makeup Portfolio
 * 
 * Provides the shared application shell including:
 * - Header navigation (all pages)
 * - Footer (all pages)
 * - PWA install prompt and offline indicator
 * - Screen reader live regions
 * - Scroll restoration on route change
 * - Focus management for accessibility
 * 
 * @author Ash Shaw Portfolio Team
 * @version 1.1.0 - SEO centralised via setSEO utility
 */

import React, { useEffect, useRef } from 'react';
import { Outlet, useLocation } from '../../lib/router';
import { Header } from './Header';
import { Footer } from './Footer';
import { PWAInstallPrompt } from './PWAInstallPrompt';
import { OfflineIndicator } from './OfflineIndicator';
import { ModalProvider } from './ModalContext';
import { ErrorBoundary } from './ErrorBoundary';
import { ScrollToTop } from '../ui/ScrollToTop';
import { AutoBreadcrumbs } from './AutoBreadcrumbs';

// Import grab helper for safe property access
function grab(obj: any, key: string): any {
  if (obj == null) return undefined;
  var entries = Object.entries(obj);
  for (var i = 0; i < entries.length; i++) {
    var pair = entries[i];
    if (pair[0] === key) return pair[1];
  }
  return undefined;
}

var noiseInner = '<filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" /></filter><rect width="100%" height="100%" filter="url(#noiseFilter)" />';
var noiseMarkup = { __html: noiseInner };

/**
 * RootLayout - Shared application shell rendered around all routes
 */
var CURSOR_EFFECTS_KEY = 'ash-cursor-effects';

export function getCursorEffectsEnabled(): boolean {
  try {
    var stored = localStorage.getItem(CURSOR_EFFECTS_KEY);
    return stored === null ? true : stored === 'true';
  } catch (_) {
    return true;
  }
}

export function setCursorEffectsEnabled(enabled: boolean): void {
  try {
    localStorage.setItem(CURSOR_EFFECTS_KEY, String(enabled));
    if (enabled) {
      document.documentElement.classList.remove('no-cursor-effects');
    } else {
      document.documentElement.classList.add('no-cursor-effects');
    }
  } catch (_) { /* noop */ }
}

export function RootLayout() {
  var location = useLocation();
  var locationPathname = grab(location, 'pathname') as string;
  var scanLineState = React.useState(false);
  var showScanLine = scanLineState[0];
  var setShowScanLine = scanLineState[1];
  var konamiRef = useRef(0);
  var trailLastTime = useRef(0);

  var KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];

  /* Apply stored cursor effects preference on mount */
  useEffect(function() {
    if (!getCursorEffectsEnabled()) {
      document.documentElement.classList.add('no-cursor-effects');
    }
  }, []);

  /**
   * Scroll to top, focus management, and terminal boot scan on every route change
   */
  useEffect(function() {
    window.scrollTo(0, 0);

    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reducedMotion) {
      setShowScanLine(true);
      var scanTimer = setTimeout(function() { setShowScanLine(false); }, 1300);
    }

    setTimeout(function() {
      var mainContent = document.getElementById('main-content');
      if (mainContent) {
        mainContent.focus({ preventScroll: true });
      }
    }, 100);

    return function() {
      if (!reducedMotion) clearTimeout(scanTimer as unknown as number);
    };
  }, [locationPathname]);

  /** Cursor trail — desktop only, respects no-cursor-effects toggle */
  useEffect(function() {
    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion || window.innerWidth <= 1024) return;

    function onMouseMove(e: MouseEvent) {
      if (document.documentElement.classList.contains('no-cursor-effects')) return;
      var now = Date.now();
      if (now - trailLastTime.current < 40) return;
      trailLastTime.current = now;
      var dot = document.createElement('div');
      dot.className = 'cursor-trail-dot';
      dot.style.left = e.clientX + 'px';
      dot.style.top = e.clientY + 'px';
      document.body.appendChild(dot);
      setTimeout(function() { dot.remove(); }, 620);
    }

    document.addEventListener('mousemove', onMouseMove);
    return function() { document.removeEventListener('mousemove', onMouseMove); };
  }, []);

  /** Mobile tap ripple — respects no-cursor-effects toggle */
  useEffect(function() {
    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion || window.innerWidth > 1024) return;

    function onTouchStart(e: TouchEvent) {
      if (document.documentElement.classList.contains('no-cursor-effects')) return;
      var touch = e.touches[0];
      if (!touch) return;
      var ripple = document.createElement('div');
      ripple.className = 'tap-ripple';
      ripple.style.left = touch.clientX + 'px';
      ripple.style.top = touch.clientY + 'px';
      document.body.appendChild(ripple);
      setTimeout(function() { ripple.remove(); }, 520);
    }

    document.addEventListener('touchstart', onTouchStart, { passive: true });
    return function() { document.removeEventListener('touchstart', onTouchStart); };
  }, []);

  /** Konami code Easter egg */
  useEffect(function() {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === KONAMI[konamiRef.current]) {
        konamiRef.current += 1;
        if (konamiRef.current === KONAMI.length) {
          konamiRef.current = 0;
          var explosion = document.createElement('div');
          explosion.className = 'konami-explosion';
          document.body.appendChild(explosion);
          setTimeout(function() { explosion.remove(); }, 2100);
        }
      } else {
        konamiRef.current = 0;
      }
    }
    document.addEventListener('keydown', onKeyDown);
    return function() { document.removeEventListener('keydown', onKeyDown); };
  }, []);

  /**
   * Hide third-party skip links injected by browser extensions
   */
  useEffect(function() {
    var hideSpecificSkipLinks = function() {
      var specificSelectors = [
        '.bypass-link',
        '.bypass-link a',
        'a[role="link"][tabindex="0"]',
      ];

      specificSelectors.forEach(function(selector) {
        var elements = document.querySelectorAll(selector);
        elements.forEach(function(element) {
          var text = element.textContent ? element.textContent.trim() : '';
          var isSkipToMain = text === 'Skip to main content';
          var isSkipToContent = text === 'Skip to content';
          var shouldHide = isSkipToMain || isSkipToContent;
          if (shouldHide) {
            (element as HTMLElement).style.cssText = `
              display: none !important;
              visibility: hidden !important;
              opacity: 0 !important;
              position: absolute !important;
              left: -10000px !important;
              top: -10000px !important;
            `;
          }
        });
      });
    };

    setTimeout(hideSpecificSkipLinks, 100);
  }, []);

  return React.createElement(
    ModalProvider,
    null,
    React.createElement(
      "div",
      { className: "app-container bg-atomic-noise" },
      React.createElement("a", { href: "#main-content", className: "skip-link" }, "Skip to main content"),
      showScanLine
        ? React.createElement("div", { className: "terminal-boot-overlay", "aria-hidden": "true" },
            React.createElement("div", { className: "terminal-boot-overlay__scanline" })
          )
        : null,
      React.createElement(PWAInstallPrompt, null),
      React.createElement(OfflineIndicator, null),
      React.createElement(
        "div",
        {
          "aria-live": "polite",
          "aria-atomic": "true",
          className: "sr-only",
          id: "announcements",
          "aria-label": "Status announcements"
        }
      ),
      React.createElement(
        "div",
        {
          "aria-live": "assertive",
          "aria-atomic": "true",
          className: "sr-only",
          id: "form-announcements",
          "aria-label": "Form submission status"
        }
      ),
      React.createElement(Header, null),
      React.createElement(AutoBreadcrumbs, null),
      React.createElement(
        React.Suspense,
        {
          fallback: React.createElement(
            "main",
            { id: "main-content", className: "page-layout page-loading", tabIndex: -1 },
            React.createElement("div", { className: "page-loading__spinner", "aria-label": "Loading page", role: "status" })
          )
        },
        React.createElement(
          "main",
          { id: "main-content", tabIndex: -1 },
          React.createElement(
            ErrorBoundary,
            null,
            React.createElement(Outlet, null)
          )
        )
      ),
      React.createElement(Footer, null),
      React.createElement(ScrollToTop, null)
    )
  );
}