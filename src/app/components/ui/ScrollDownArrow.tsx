/**
 * @fileoverview Scroll Down Arrow component for hero sections
 * Animated arrow with circle background that scrolls to next section on click
 * 
 * @author Ash Shaw Portfolio Team
 * @version 1.1.2 - Semantic BEM Refactor
 */

import React from 'react';
import { CaretDown } from '@phosphor-icons/react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import "../../../styles/blocks/scroll-controls.css";

/**
 * Props interface for ScrollDownArrow component
 */
interface ScrollDownArrowProps {
  targetSectionId?: string;
  ariaLabel?: string;
  className?: string;
  onClick?: () => void;
}

/**
 * Animated scroll-down arrow component for hero sections
 */
export function ScrollDownArrow({ 
  targetSectionId, 
  ariaLabel = "Scroll to next section",
  className = "",
  onClick
}: ScrollDownArrowProps) {
  const prefersReduced = useReducedMotion();

  const handleClick = () => {
    if (onClick) {
      onClick();
      return;
    }

    let targetElement: Element | null = null;
    
    if (targetSectionId) {
      targetElement = document.getElementById(targetSectionId);
    } else {
      const heroSections = document.querySelectorAll('section');
      if (heroSections.length > 1) {
        targetElement = heroSections[1];
      }
    }
    
    if (targetElement) {
      targetElement.scrollIntoView({ 
        behavior: prefersReduced ? 'auto' : 'smooth',
        block: 'start'
      });
      
      const sectionLabel = targetSectionId ? targetSectionId : 'next section';
      const announcement = `Scrolled to ${sectionLabel}`;
      const ariaLive = document.createElement('div');
      ariaLive.setAttribute('aria-live', 'polite');
      ariaLive.setAttribute('class', 'sr-only');
      ariaLive.textContent = announcement;
      document.body.appendChild(ariaLive);
      setTimeout(() => document.body.removeChild(ariaLive), 1000);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`scroll-down-arrow ${className}`}
      aria-label={ariaLabel}
      type="button"
    >
      <div className="scroll-down-arrow__border" />
      <div className="scroll-down-arrow__inner">
        <CaretDown 
          className="scroll-down-arrow__icon" 
        />
      </div>
      <div className="scroll-down-arrow__pulse" />
    </button>
  );
}