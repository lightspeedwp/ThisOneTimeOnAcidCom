import React from 'react';

export interface HeaderProps {
  variant?: 'default' | 'minimal';
  logoText?: string;
  navItems?: { label: string; href: string }[];
  onMenuToggle?: () => void;
  isScrolled?: boolean;
}

export function Header(props: HeaderProps) {
  var variantClass = props.variant ? ' header--' + props.variant : ' header--default';
  var scrollClass = props.isScrolled ? ' header--scrolled' : '';

  return React.createElement('header', { className: 'header' + variantClass + scrollClass },
    React.createElement('div', { className: 'header__container container mx-auto px-4 py-4 flex items-center justify-between' },
      React.createElement('a', { href: '/', className: 'header__logo font-title text-xl tracking-wider uppercase' }, 
        props.logoText || 'Ash Shaw'
      ),
      props.variant !== 'minimal' && React.createElement('nav', { className: 'header__nav hidden md:flex items-center gap-6' },
        (props.navItems || []).map(function(item, i) {
          return React.createElement('a', { key: i, href: item.href, className: 'header__nav-link' }, item.label);
        })
      ),
      props.variant !== 'minimal' && React.createElement('button', { 
        className: 'header__menu-btn md:hidden',
        onClick: props.onMenuToggle,
        'aria-label': 'Toggle menu'
      }, 'Menu')
    )
  );
}