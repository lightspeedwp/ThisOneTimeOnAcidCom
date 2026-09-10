/**
 * @fileoverview Reusable scroll-to-top button component for Ash Shaw Portfolio
 * 
 * A professional scroll-to-top button that appears when the user scrolls down
 * and smoothly scrolls to the top when clicked. Follows brand guidelines with
 * gradient styling and accessibility compliance.
 * 
 * @author Ash Shaw Portfolio Team
 * @version 1.2.1 - Semantic BEM Refactor
 */

import React, { useEffect, useCallback, useRef } from 'react';
import { ArrowUp } from '@phosphor-icons/react';
import { useModal } from '../common/ModalContext';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import "../../../styles/blocks/scroll-controls.css";

var mountedInstances = 0;

export function ScrollToTop(props: any) {
  var showAfter = props.showAfter !== undefined ? props.showAfter : 20;
  var className = props.className || "";
  var ariaLabel = props.ariaLabel || "Scroll to top of page";

  var scrollData = useScrollPosition({ throttleMs: 100 });
  var isVisible = scrollData.isScrolledPast(showAfter);
  var modalData = useModal();
  var hasOpenModals = modalData ? modalData.hasOpenModals : false;
  var prefersReduced = useReducedMotion();
  var isMounted = useRef(false);
  var isPrimary = useRef(false);

  useEffect(function() {
    if (!isMounted.current) {
      isMounted.current = true;
      mountedInstances += 1;
      if (mountedInstances === 1) {
        isPrimary.current = true;
      }
    }
    return function() {
      if (isMounted.current) {
        mountedInstances -= 1;
        isMounted.current = false;
        isPrimary.current = false;
      }
    };
  }, []);

  var scrollToTop = useCallback(function() {
    try {
      window.scrollTo({
        top: 0,
        behavior: prefersReduced ? 'auto' : 'smooth'
      });
    } catch (error) {
      window.scrollTo(0, 0);
    }
  }, [prefersReduced]);

  var handleKeyDown = useCallback(function(event: any) {
    var isActivationKey = event.key === 'Enter' || event.key === ' ';
    if (isActivationKey) {
      event.preventDefault();
      scrollToTop();
    }
  }, [scrollToTop]);

  var shouldHide = !isVisible || hasOpenModals || !isPrimary.current;
  if (shouldHide) {
    return null;
  }

  return React.createElement(
    "button",
    {
      onClick: scrollToTop,
      onKeyDown: handleKeyDown,
      className: "scroll-to-top " + className,
      "aria-label": ariaLabel,
      title: "Scroll to top",
      type: "button"
    },
    React.createElement(ArrowUp, {
      className: "scroll-to-top__icon",
      "aria-hidden": "true"
    })
  );
}