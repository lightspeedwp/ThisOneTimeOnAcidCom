/**
 * @fileoverview Mobile menu component for Ash Shaw Makeup Portfolio
 * 
 * Core Features:
 * - Full-screen mobile overlay with blur backdrop
 * - React Router integration with useNavigate and useLocation
 * - Focus trapping with proper keyboard navigation
 * - Screen reader announcements for state changes
 * - Smooth animations and brand-consistent styling
 * 
 * @author Ash Shaw Portfolio Team
 * @version 2.0.0 - React Router Migration
 */

import React, { useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "../../lib/router";
import { headerNavigationItems } from "../../data/mock/ui/navigation";
import { SocialLinks } from "./SocialLinks";
import { getPageIdFromPath } from "../../hooks/useAppNavigate";
import { useKeyboardTrap } from "../../hooks/useKeyboardTrap";
import { Envelope } from '@phosphor-icons/react';
import "../../../styles/blocks/mobile-menu.css";

/**
 * Props interface for MobileMenu component
 */
interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * MobileMenu - Full-screen mobile navigation overlay with accessibility and performance
 */
export function MobileMenu({
  isOpen,
  onClose,
}: MobileMenuProps) {
  const trapRef = useKeyboardTrap({
    active: isOpen,
    onEscape: onClose,
    autoFocus: true,
    restoreFocus: true,
  });
  const location = useLocation();
  const navigate = useNavigate();

  const currentPage = getPageIdFromPath(location.pathname);

  // Focus management for mobile menu
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleNavigation = useCallback((path: string) => {
    onClose();
    navigate(path);
  }, [onClose, navigate]);

  // Don't render anything if menu is closed
  if (!isOpen) return null;

  return (
    <div
      className="mobile-menu"
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-labelledby="mobile-menu-title"
      ref={trapRef}
    >
      {/* Decorative Orbs */}
      <div className="mobile-menu__orb mobile-menu__orb--1" aria-hidden="true" />
      <div className="mobile-menu__orb mobile-menu__orb--2" aria-hidden="true" />
      <div className="mobile-menu__orb mobile-menu__orb--3" aria-hidden="true" />

      {/* Hidden title for screen readers */}
      <h2 id="mobile-menu-title" className="sr-only">
        Mobile Navigation Menu
      </h2>

      {/* Nav Items - Centered */}
      <nav 
        className="mobile-menu__nav"
        role="menu"
        aria-label="Mobile navigation"
      >
        {headerNavigationItems.map((item) => (
          <button
            type="button"
            key={item.id}
            onClick={() => handleNavigation(item.path)}
            className="mobile-menu__nav-link"
            role="menuitem"
            aria-current={currentPage === item.id ? "page" : undefined}
            data-nav-color={item.neonColor}
          >
            <item.icon className="mobile-menu__nav-icon" aria-hidden="true" />
            {item.label}
          </button>
        ))}

        {/* Email text link — placed below Contact */}
        <a
          href="mailto:hello@ashshaw.makeup"
          className="mobile-menu__email-link"
          aria-label="Email Ash Shaw"
        >
          <Envelope className="mobile-menu__email-icon" aria-hidden="true" />
          hello@ashshaw.makeup
        </a>
      </nav>

      {/* Social Icons (Email excluded — shown as text link above) */}
      <div className="mobile-menu__social">
        <SocialLinks variant="clean" exclude={["Email"]} />
      </div>
    </div>
  );
}