/**
 * @fileoverview Accordion component for collapsible content sections
 *
 * Renders a list of expandable/collapsible sections with full keyboard
 * navigation, ARIA attributes, and animated expand/collapse transitions.
 * Supports single-item and multi-item open modes.
 *
 * @component Accordion
 * @version 1.0.0
 *
 * @example
 * <Accordion
 *   items={[
 *     { id: 'art', title: 'Art in ADHD', content: <p>Hyperfocus...</p> },
 *     { id: 'biz', title: 'Business in ADHD', content: <p>Process obsession...</p> },
 *   ]}
 *   allowMultiple={false}
 *   defaultOpen={['art']}
 * />
 *
 * @accessibility
 * - Full keyboard navigation: Arrow Up/Down, Enter/Space, Home, End
 * - aria-expanded on triggers
 * - aria-controls linking triggers to content panels
 * - aria-labelledby linking panels to triggers
 * - role="region" on content panels
 * - prefers-reduced-motion: animations disabled
 */

import React, { useState, useRef, useCallback } from 'react';
import { CaretDown } from '@phosphor-icons/react';

/**
 * Single accordion item
 */
interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

/**
 * Props for the Accordion component
 */
interface AccordionProps {
  /** Array of accordion items */
  items: AccordionItem[];
  /** Allow multiple items open simultaneously. Default: false */
  allowMultiple?: boolean;
  /** IDs of items open by default */
  defaultOpen?: string[];
}

/**
 * Accordion component — collapsible content sections with keyboard navigation
 */
export function Accordion(props: AccordionProps) {
  var items = props.items;
  var allowMultiple = props.allowMultiple === true;
  var defaultOpenIds = props.defaultOpen ? props.defaultOpen : [];

  var openInit: string[] = defaultOpenIds;
  var stateHook = useState(openInit);
  var openItems = stateHook[0];
  var setOpenItems = stateHook[1];

  var triggerRefs = useRef<Array<HTMLButtonElement | null>>([]);

  var isOpen = useCallback(function (id: string): boolean {
    for (var i = 0; i < openItems.length; i++) {
      if (openItems[i] === id) return true;
    }
    return false;
  }, [openItems]);

  var toggleItem = useCallback(function (id: string) {
    setOpenItems(function (prev) {
      var wasOpen = false;
      for (var i = 0; i < prev.length; i++) {
        if (prev[i] === id) {
          wasOpen = true;
          break;
        }
      }

      if (wasOpen) {
        // Close it
        var filtered: string[] = [];
        for (var j = 0; j < prev.length; j++) {
          if (prev[j] !== id) {
            filtered.push(prev[j]);
          }
        }
        return filtered;
      } else {
        // Open it
        if (allowMultiple) {
          return prev.concat([id]);
        } else {
          return [id];
        }
      }
    });
  }, [allowMultiple]);

  var handleKeyDown = useCallback(function (e: React.KeyboardEvent, index: number) {
    var refs = triggerRefs.current as HTMLButtonElement[];
    var lastIndex = items.length - 1;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      var nextIndex = index < lastIndex ? index + 1 : 0;
      var nextEl = refs[nextIndex];
      if (nextEl) nextEl.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      var prevIndex = index > 0 ? index - 1 : lastIndex;
      var prevEl = refs[prevIndex];
      if (prevEl) prevEl.focus();
    } else if (e.key === 'Home') {
      e.preventDefault();
      var firstEl = refs[0];
      if (firstEl) firstEl.focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      var lastEl = refs[lastIndex];
      if (lastEl) lastEl.focus();
    }
  }, [items.length]);

  return (
    <div className="accordion">
      {items.map(function (item, index) {
        var itemOpen = isOpen(item.id);
        var triggerId = 'accordion-trigger-' + item.id;
        var contentId = 'accordion-content-' + item.id;
        var contentClass = 'accordion__content' + (itemOpen ? ' accordion__content--open' : '');

        return (
          <div className="accordion__item" key={item.id}>
            <button
              type="button"
              id={triggerId}
              className="accordion__trigger"
              aria-expanded={itemOpen}
              aria-controls={contentId}
              onClick={function () { toggleItem(item.id); }}
              onKeyDown={function (e) { handleKeyDown(e, index); }}
              ref={function (el) {
                var refs = triggerRefs.current as HTMLButtonElement[];
                refs[index] = el as HTMLButtonElement;
              }}
            >
              <span>{item.title}</span>
              <CaretDown className="accordion__icon" aria-hidden="true" />
            </button>
            <div
              id={contentId}
              className={contentClass}
              role="region"
              aria-labelledby={triggerId}
              hidden={!itemOpen}
            >
              <div className="accordion__body">
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}