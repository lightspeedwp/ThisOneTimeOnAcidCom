/**
 * @fileoverview About dropdown — animated process-flow diagram
 *
 * Renders a vertical timeline/flow of About page sections inside the
 * desktop header. Each node links to a scroll target on the About page
 * or a standalone sub-page (e.g. History). Animated with pure CSS —
 * staggered fade-in, line draw, and neon dot pulse.
 *
 * Keyboard accessible: Arrow keys navigate nodes, Escape closes,
 * Enter/Space activates the focused link.
 *
 * @component AboutDropdown
 * @version 1.0.0
 */

import React, { useCallback, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from '../../lib/router';
import {
  MapPin,
  MusicNotes,
  PaintBrush,
  Brain,
  Rocket,
  Clock,
  Lightning,
  Headphones,
  Code,
} from '@phosphor-icons/react';
import { aboutDropdownItems } from '../../data/mock/ui/about-dropdown';
import type { AboutDropdownItem } from '../../data/mock/ui/about-dropdown';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import '../../../styles/blocks/about-dropdown.css';

/** Map icon-name strings to Phosphor components */
const DROPDOWN_ICONS: Record<string, React.ElementType> = {
  Compass: MapPin,
  Music: MusicNotes,
  Building2: Rocket,
  Flashlight: Lightning,
  Paintbrush: PaintBrush,
  PenTool: PaintBrush,
  Brain,
  Rocket,
  Clock,
  Zap: Lightning,
  Bike: MapPin,
  Headphones,
  Code,
};

interface AboutDropdownProps {
  /** Whether the dropdown is open */
  isOpen: boolean;
  /** Close the dropdown */
  onClose: () => void;
}

export function AboutDropdown({ isOpen, onClose }: AboutDropdownProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const listRefInit: HTMLUListElement | null = null;
  const listRef = useRef(listRefInit);
  const prefersReduced = useReducedMotion();

  /** Focus first item when dropdown opens */
  useEffect(() => {
    if (isOpen && listRef.current) {
      const firstButton = listRef.current.querySelector('.about-dropdown__node-btn') as HTMLButtonElement | null;
      if (firstButton) {
        firstButton.focus();
      }
    }
  }, [isOpen]);

  /** Navigate to a section on the About page (scroll) or a sub-page (route) */
  const handleItemClick = useCallback(
    (item: AboutDropdownItem) => {
      onClose();

      if (item.href) {
        navigate(item.href);
        return;
      }

      if (item.sectionId) {
        if (location.pathname !== '/about/journey') {
          navigate('/about/journey');
          // Wait for page render then scroll
          setTimeout(() => {
            const el = document.getElementById(item.sectionId!);
            if (el)
              el.scrollIntoView({
                behavior: prefersReduced ? 'auto' : 'smooth',
                block: 'start',
              });
          }, 400);
        } else {
          const el = document.getElementById(item.sectionId);
          if (el)
            el.scrollIntoView({
              behavior: prefersReduced ? 'auto' : 'smooth',
              block: 'start',
            });
        }
      }
    },
    [navigate, location.pathname, onClose, prefersReduced],
  );

  /** Keyboard navigation within the dropdown */
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const listEl = listRef.current;
      const items = listEl ? listEl.querySelectorAll('.about-dropdown__node-btn') : null;
      const hasNoItems = !items || items.length === 0;
      if (hasNoItems) return;

      const currentIndex = Array.from(items!).findIndex(
        (btn) => btn === document.activeElement,
      );

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const next = (currentIndex + 1) % items!.length;
        items![next].focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prev = (currentIndex - 1 + items!.length) % items!.length;
        items![prev].focus();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'Home') {
        e.preventDefault();
        items![0].focus();
      } else if (e.key === 'End') {
        e.preventDefault();
        items![items!.length - 1].focus();
      }
    },
    [onClose],
  );

  if (!isOpen) return null;

  return (
    <div
      className="about-dropdown"
      role="menu"
      aria-label="About page sections"
      onKeyDown={handleKeyDown}
    >
      {/* Decorative connector line */}
      <div className="about-dropdown__connector" aria-hidden="true" />

      <ul className="about-dropdown__list" ref={listRef}>
        {aboutDropdownItems.map((item, index) => {
          const Icon = DROPDOWN_ICONS[item.icon] || MapPin;
          /** First sub-page item (first item with href) gets separator */
          const isFirstSubPage = item.href !== undefined &&
            (index === 0 || aboutDropdownItems[index - 1].sectionId !== undefined);

          return (
            <li
              key={item.id}
              className={`about-dropdown__node about-dropdown__node--${item.accent}${
                isFirstSubPage ? ' about-dropdown__node--separator' : ''
              }`}
              /* CSS custom property drives stagger animation */
              style={{ '--node-index': index } as React.CSSProperties}
            >
              {/* Neon dot */}
              <div className="about-dropdown__dot" aria-hidden="true">
                <Icon className="about-dropdown__dot-icon" aria-hidden="true" />
              </div>

              {/* Clickable content */}
              <button
                type="button"
                className="about-dropdown__node-btn"
                role="menuitem"
                onClick={() => handleItemClick(item)}
                tabIndex={0}
              >
                <span className="about-dropdown__node-label">{item.label}</span>
                <span className="about-dropdown__node-sub">{item.subtitle}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}