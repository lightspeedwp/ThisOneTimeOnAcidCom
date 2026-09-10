import React from 'react';

export interface BreadcrumbsProps {
  items: { label: string; href?: string }[];
}

export function Breadcrumbs(props: BreadcrumbsProps) {
  return React.createElement('nav', { className: 'breadcrumbs', 'aria-label': 'Breadcrumb' },
    React.createElement('ol', { className: 'breadcrumbs__list flex flex-wrap items-center gap-2 text-sm' },
      props.items.map(function(item, index) {
        var isLast = index === props.items.length - 1;
        return React.createElement('li', { key: index, className: 'breadcrumbs__item flex items-center gap-2' },
          !isLast && item.href 
            ? React.createElement('a', { href: item.href, className: 'breadcrumbs__link text-neutral-500 hover:text-accent-full transition-colors' }, item.label)
            : React.createElement('span', { className: 'breadcrumbs__current text-neutral-900 dark:text-neutral-100 font-medium', 'aria-current': 'page' }, item.label),
          !isLast && React.createElement('span', { className: 'breadcrumbs__separator text-neutral-400' }, '/')
        );
      })
    )
  );
}