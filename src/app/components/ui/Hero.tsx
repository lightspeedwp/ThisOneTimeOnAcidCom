import React from 'react';
import { Breadcrumbs } from './Breadcrumbs';

export interface HeroButton {
  label: string;
  href: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'spotify' | 'soundcloud';
  icon?: React.ReactNode;
}

export interface HeroProps {
  title: string;
  subtitle?: string;
  badge?: {
    text: string;
    icon?: React.ReactNode;
  };
  buttons?: HeroButton[];
  layout?: 'centered' | 'left' | 'split' | 'fullscreen';
  backgroundVariant?: 'none' | 'gradient' | 'webgl' | 'image';
  backgroundImage?: string;
  breadcrumbs?: { label: string; href?: string }[];
  children?: React.ReactNode;
}

export function Hero(props: HeroProps) {
  var layoutClass = props.layout ? ' hero--' + props.layout : ' hero--centered';
  var bgClass = props.backgroundVariant ? ' hero--bg-' + props.backgroundVariant : '';
  
  return React.createElement('section', { className: 'hero' + layoutClass + bgClass },
    props.backgroundVariant === 'gradient' && React.createElement('div', { className: 'hero__gradient-bg' }),
    React.createElement('div', { className: 'hero__container container' },
      props.breadcrumbs && React.createElement('div', { className: 'hero__breadcrumbs mb-6' },
        React.createElement(Breadcrumbs, { items: props.breadcrumbs })
      ),
      props.badge && React.createElement('span', { className: 'hero__badge' },
        props.badge.icon,
        props.badge.text
      ),
      React.createElement('h1', { className: 'hero__title text-hero-h1' }, props.title),
      props.subtitle && React.createElement('p', { className: 'hero__subtitle text-body-p text-neutral-600 dark:text-neutral-400 max-w-2xl mt-4' }, props.subtitle),
      props.buttons && props.buttons.length > 0 && React.createElement('div', { className: 'hero__actions mt-8 flex flex-wrap gap-4' },
        props.buttons.map(function(btn, i) {
          var btnClass = 'btn hero__btn hero__btn--' + (btn.variant || 'primary');
          return React.createElement('a', { key: i, href: btn.href, className: btnClass },
            btn.icon,
            btn.label
          );
        })
      ),
      props.children
    )
  );
}