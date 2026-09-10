import React from 'react';

export interface FooterProps {
  variant?: 'default' | 'minimal';
  copyrightYear?: number;
}

export function Footer(props: FooterProps) {
  var variantClass = props.variant ? ' footer--' + props.variant : ' footer--default';
  var year = props.copyrightYear || new Date().getFullYear();

  return React.createElement('footer', { className: 'footer' + variantClass + ' py-8 border-t border-neutral-200 dark:border-neutral-800' },
    React.createElement('div', { className: 'container mx-auto px-4 text-center text-sm text-neutral-500' },
      React.createElement('p', null, '© ' + year + ' Ash Shaw. All rights reserved.')
    )
  );
}