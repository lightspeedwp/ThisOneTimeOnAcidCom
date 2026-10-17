/**
 * @fileoverview Reusable breadcrumb navigation component
 *
 * Renders a horizontal breadcrumb trail with Schema.org BreadcrumbList
 * structured data (JSON-LD) for SEO. Each crumb is a link except the
 * last item (current page), which is rendered as plain text.
 *
 * When a page-level Breadcrumbs renders, it hides the layout-level
 * auto-breadcrumbs (#layout-breadcrumbs) to prevent duplication.
 *
 * @component Breadcrumbs
 * @version 2.0.0 — Added layoutLevel prop for auto-breadcrumbs dedup
 */

import React, { useEffect } from 'react';
import { Link } from '../../lib/router';
import { CaretRight, House } from '@phosphor-icons/react';
import '../../../styles/blocks/breadcrumbs.css';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  /** Centre the breadcrumb list horizontally — use inside hero sections */
  centered?: boolean;
  /** True when rendered by AutoBreadcrumbs at the layout level (internal use) */
  layoutLevel?: boolean;
}

var SCHEMA_SCRIPT_ID = 'breadcrumb-jsonld';

export function Breadcrumbs(props: BreadcrumbsProps) {
  var items = props.items;
  var centered = props.centered || false;
  var layoutLevel = props.layoutLevel || false;

  /**
   * Hide the layout-level auto-breadcrumbs when a page-level Breadcrumbs renders
   */
  useEffect(function() {
    if (layoutLevel) return;
    
    var layoutBreadcrumbs = document.getElementById('layout-breadcrumbs');
    if (layoutBreadcrumbs != null) {
      layoutBreadcrumbs.style.display = 'none';
    }

    return function() {
      if (layoutBreadcrumbs != null) {
        layoutBreadcrumbs.style.display = '';
      }
    };
  }, [layoutLevel]);

  /**
   * Generate Schema.org BreadcrumbList JSON-LD
   */
  useEffect(function() {
    var existingScript = document.getElementById(SCHEMA_SCRIPT_ID);
    if (existingScript != null) {
      existingScript.remove();
    }

    var breadcrumbItems = [];
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      var position = i + 1;
      var schemaItem: any = {
        '@type': 'ListItem',
        position: position,
        name: item.label
      };
      if (item.href != null) {
        var itemUrl = item.href.startsWith('http') 
          ? item.href 
          : window.location.origin + item.href;
        schemaItem.item = itemUrl;
      }
      breadcrumbItems.push(schemaItem);
    }

    var schema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbItems
    };

    var script = document.createElement('script');
    script.id = SCHEMA_SCRIPT_ID;
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return function() {
      var scriptToRemove = document.getElementById(SCHEMA_SCRIPT_ID);
      if (scriptToRemove != null) {
        scriptToRemove.remove();
      }
    };
  }, [items]);

  var containerClass = 'breadcrumbs';
  if (centered) {
    containerClass = containerClass + ' breadcrumbs--centered';
  }

  var listItems = [];
  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    var isLast = i === items.length - 1;
    var isCurrent = isLast && item.href == null;

    var crumbContent;
    if (item.href != null && !isLast) {
      crumbContent = React.createElement(
        Link,
        { to: item.href, className: 'breadcrumbs__link' },
        i === 0 
          ? React.createElement(House, { className: 'breadcrumbs__home-icon', weight: 'fill', 'aria-label': 'Home' })
          : null,
        item.label
      );
    } else {
      crumbContent = React.createElement(
        'span',
        { 
          className: isCurrent ? 'breadcrumbs__text breadcrumbs__item--current' : 'breadcrumbs__text',
          'aria-current': isCurrent ? 'page' : undefined
        },
        item.label
      );
    }

    var listItem = React.createElement(
      'li',
      { key: i, className: 'breadcrumbs__item' },
      crumbContent,
      !isLast ? React.createElement(CaretRight, { className: 'breadcrumbs__separator', weight: 'bold', 'aria-hidden': 'true' }) : null
    );

    listItems.push(listItem);
  }

  return React.createElement(
    'nav',
    { className: containerClass, 'aria-label': 'Breadcrumb' },
    React.createElement(
      'ol',
      { className: 'breadcrumbs__list' },
      listItems
    )
  );
}
