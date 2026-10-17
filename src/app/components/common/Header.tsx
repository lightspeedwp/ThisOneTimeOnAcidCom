/**
 * @fileoverview Site Header with accessible mobile menu
 * 
 * Features:
 * - Full BEM CSS architecture with semantic classes
 * - WCAG 2.2 AA/AAA compliant
 * - Accessible keyboard navigation
 * - Screen reader support with ARIA labels
 * - Focus management
 * - Light/dark mode support
 * 
 * @version 2.0.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { bookSiteData } from "../../data/mock/book-site";
import { grab, useNavigate, useLocation } from "../../lib/router";
import { SocialLinks } from "./SocialLinks";
import { ThemeToggleES5 } from "./ThemeToggleES5";
import { getCursorEffectsEnabled, setCursorEffectsEnabled } from "./RootLayout";

export function Header() {
  var navData = grab(bookSiteData, "nav") || [];
  var navigate = useNavigate();
  var location = useLocation();
  var mobileMenuState = useState(false);
  var isMobileMenuOpen = mobileMenuState[0];
  var setIsMobileMenuOpen = mobileMenuState[1];
  var cursorState = useState(getCursorEffectsEnabled);
  var cursorEnabled = cursorState[0];
  var setCursorEnabled = cursorState[1];
  var firstFocusableRef = useRef<HTMLAnchorElement>(null);
  var closeButtonRef = useRef<HTMLButtonElement>(null);

  function toggleCursorEffects() {
    var next = !cursorEnabled;
    setCursorEnabled(next);
    setCursorEffectsEnabled(next);
  }

  // Lock body scroll when menu is open
  useEffect(function() {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      // Focus first menu item when opened
      if (firstFocusableRef.current) {
        firstFocusableRef.current.focus();
      }
    } else {
      document.body.style.overflow = '';
    }
    return function() {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Close menu on ESC key
  useEffect(function() {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
        // Return focus to toggle button
        if (closeButtonRef.current) {
          closeButtonRef.current.focus();
        }
      }
    }
    
    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      return function() {
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isMobileMenuOpen]);

  function toggleMobileMenu(e: any) {
    if (e && e.preventDefault) e.preventDefault();
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }

  function handleLogoClick(e: any) {
    if (e && e.preventDefault) e.preventDefault();
    setIsMobileMenuOpen(false);
    navigate('/');
  }

  function handleNavClick(href: string) {
    return function(e: any) {
      if (e && e.preventDefault) e.preventDefault();
      setIsMobileMenuOpen(false);
      navigate(href);
    };
  }

  function isCurrentPage(href: string) {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  }

  var titleText = "This one time on acid...";

  return React.createElement(
    "header",
    { className: "header", role: "banner" },
    
    // Left: Logo
    React.createElement(
      "div",
      { className: "header__left" },
      React.createElement(
        "a",
        { 
          href: "/", 
          className: "header__logo header__logo--stretchy text-neon-yellow", 
          onClick: handleLogoClick,
          "aria-label": "This one time on acid - Homepage"
        },
        titleText.split('').map(function(char: string, index: number) {
          return React.createElement(
            "span",
            { key: "char-" + index, "aria-hidden": "true" },
            char === " " ? "\u00A0" : char
          );
        })
      )
    ),

    // Center: Empty (for layout balance)
    React.createElement(
      "div",
      { className: "header__center" }
    ),
    
    // Right: Desktop Navigation + Theme Toggle + Mobile Menu Toggle
    React.createElement(
      "div",
      { className: "header__actions" },
      
      React.createElement(ThemeToggleES5, null),

      // Cursor effects toggle — desktop only
      React.createElement(
        "button",
        {
          className: "header__cursor-toggle",
          onClick: toggleCursorEffects,
          type: "button",
          title: cursorEnabled ? "Disable cursor effects" : "Enable cursor effects",
          "aria-label": cursorEnabled ? "Disable cursor effects" : "Enable cursor effects",
          "aria-pressed": cursorEnabled
        },
        cursorEnabled ? "[ ✦ ]" : "[ ○ ]"
      ),

      // Mobile menu toggle button
      React.createElement(
        "button",
        { 
          ref: closeButtonRef,
          className: "header__mobile-toggle",
          onClick: toggleMobileMenu,
          type: "button",
          "aria-label": isMobileMenuOpen ? "Close menu" : "Open menu",
          "aria-expanded": isMobileMenuOpen,
          "aria-controls": "mobile-menu"
        },
        isMobileMenuOpen ? "[ X ] Menu" : "[ ≡ ] Menu"
      )
    ),

    // Mobile Menu Overlay
    isMobileMenuOpen ? React.createElement(
      "nav",
      { 
        className: "mobile-menu mobile-menu--open",
        id: "mobile-menu",
        role: "navigation",
        "aria-label": "Main navigation"
      },
      React.createElement(
        "div",
        { className: "mobile-menu__content" },
        
        // Navigation Links
        React.createElement(
          "ul",
          { 
            className: "mobile-menu__nav",
            role: "list"
          },
          navData.map(function(item: any, index: number) {
            var href = grab(item, "href");
            var label = grab(item, "label");
            var isCurrent = isCurrentPage(href);
            
            return React.createElement(
              "li",
              { 
                key: "mobile-nav-" + index,
                className: "mobile-menu__nav-item"
              },
              React.createElement(
                "a",
                {
                  ref: index === 0 ? firstFocusableRef : null,
                  href: href,
                  className: "mobile-menu__nav-link",
                  onClick: handleNavClick(href),
                  "aria-current": isCurrent ? "page" : undefined
                },
                label
              )
            );
          })
        ),
        
        // Social Links
        React.createElement(
          "div",
          { className: "mobile-menu__social" },
          React.createElement(SocialLinks, { variant: "minimal" })
        )
      )
    ) : null
  );
}