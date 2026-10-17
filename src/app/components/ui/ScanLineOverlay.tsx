import React from 'react';
import '../../../styles/components/scan-line-overlay.css';

interface ScanLineOverlayProps {
  speed?: number;
  opacity?: number;
  color?: string;
  active?: boolean;
  className?: string;
}

export function ScanLineOverlay({
  speed = 2,
  opacity = 0.15,
  color = 'var(--color-neon-pink)',
  active = true,
  className = '',
}: ScanLineOverlayProps) {
  const reducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!active || reducedMotion) return null;

  return React.createElement(
    'div',
    {
      className: ['scan-line-overlay', className].filter(Boolean).join(' '),
      style: {
        '--scan-speed': `${speed}s`,
        '--scan-opacity': opacity,
        '--scan-color': color,
      } as React.CSSProperties,
    },
    React.createElement('div', { className: 'scan-line-overlay__beam' })
  );
}
