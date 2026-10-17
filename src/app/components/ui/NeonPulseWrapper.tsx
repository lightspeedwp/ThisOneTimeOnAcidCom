import React from 'react';
import '../../../styles/components/neon-pulse-wrapper.css';

type NeonColor = 'pink' | 'yellow' | 'violet' | 'cyan';
type PulseSpeed = 'slow' | 'medium' | 'fast';
type PulseIntensity = 'subtle' | 'medium' | 'strong';

interface NeonPulseWrapperProps {
  children: React.ReactNode;
  color?: NeonColor;
  intensity?: PulseIntensity;
  speed?: PulseSpeed;
  continuous?: boolean;
  className?: string;
}

const COLOR_TOKENS: Record<NeonColor, string> = {
  pink:   '--color-neon-pink',
  yellow: '--color-neon-yellow',
  violet: '--wp--preset--color--neon-purple',
  cyan:   '--wp--preset--color--neon-cyan',
};

const SPEED_VALUES: Record<PulseSpeed, string> = {
  slow:   '3s',
  medium: '2s',
  fast:   '1s',
};

export function NeonPulseWrapper({
  children,
  color = 'pink',
  intensity = 'medium',
  speed = 'medium',
  continuous = true,
  className = '',
}: NeonPulseWrapperProps) {
  const classes = [
    'neon-pulse-wrapper',
    `neon-pulse-wrapper--${color}`,
    `neon-pulse-wrapper--${intensity}`,
    !continuous ? 'neon-pulse-wrapper--once' : '',
    className,
  ].filter(Boolean).join(' ');

  return React.createElement(
    'span',
    {
      className: classes,
      style: {
        '--np-color': `var(${COLOR_TOKENS[color]})`,
        '--np-duration': SPEED_VALUES[speed],
      } as React.CSSProperties,
    },
    children
  );
}
