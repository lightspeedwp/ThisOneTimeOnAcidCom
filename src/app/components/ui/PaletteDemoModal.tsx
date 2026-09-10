/**
 * @fileoverview Palette Demo Modal Component
 * 
 * Displays visual demonstrations of interface design concepts using palette colors.
 * Shows interactive mockups of UI patterns, components, and layouts.
 * 
 * @component PaletteDemoModal
 * @version 1.0.0
 */

import React, { useEffect } from 'react';
import { X } from '@phosphor-icons/react';
import { ColorPaletteColor } from '../../data/mock/color-palettes';
import '../../../styles/blocks/palette-demo-modal.css';

export interface PaletteDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  demoType: string;
  paletteName: string;
  colors: ColorPaletteColor[];
  ideaText: string;
}

export function PaletteDemoModal(props: PaletteDemoModalProps) {
  var isOpen = props.isOpen;
  var onClose = props.onClose;
  var demoType = props.demoType;
  var paletteName = props.paletteName;
  var colors = props.colors;
  var ideaText = props.ideaText;

  useEffect(function () {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return function () {
        document.body.style.overflow = '';
      };
    }
  }, [isOpen]);

  function handleBackdropClick(e: React.MouseEvent) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Escape') {
      onClose();
    }
  }

  if (isOpen === false) {
    return null;
  }

  var demoContent = renderDemoContent(demoType, colors, ideaText);

  return (
    <div 
      className="palette-demo-modal" 
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby="demo-modal-title"
    >
      <div className="palette-demo-modal__content">
        <div className="palette-demo-modal__header">
          <h2 id="demo-modal-title" className="palette-demo-modal__title">
            {paletteName}
          </h2>
          <p className="palette-demo-modal__subtitle">{ideaText}</p>
          <button
            onClick={onClose}
            className="palette-demo-modal__close"
            aria-label="Close demo modal"
          >
            <X size={24} weight="bold" />
          </button>
        </div>
        <div className="palette-demo-modal__body">
          {demoContent}
        </div>
      </div>
    </div>
  );
}

function renderDemoContent(demoType: string, colors: ColorPaletteColor[], ideaText: string): React.ReactNode {
  var lowerIdea = ideaText.toLowerCase();

  if (lowerIdea.indexOf('dashboard') >= 0 || lowerIdea.indexOf('card') >= 0 && lowerIdea.indexOf('glowing') >= 0) {
    return <DashboardDemo colors={colors} />;
  }

  if (lowerIdea.indexOf('gradient text') >= 0 || lowerIdea.indexOf('hero') >= 0 && lowerIdea.indexOf('gradient') >= 0) {
    return <GradientTextDemo colors={colors} />;
  }

  if (lowerIdea.indexOf('button') >= 0 || lowerIdea.indexOf('cta') >= 0) {
    return <ButtonDemo colors={colors} />;
  }

  if (lowerIdea.indexOf('navigation') >= 0 || lowerIdea.indexOf('menu') >= 0) {
    return <NavigationDemo colors={colors} />;
  }

  if (lowerIdea.indexOf('gradient background') >= 0 || lowerIdea.indexOf('backdrop') >= 0) {
    return <GradientBackgroundDemo colors={colors} />;
  }

  if (lowerIdea.indexOf('success') >= 0 || lowerIdea.indexOf('notification') >= 0 || lowerIdea.indexOf('alert') >= 0) {
    return <NotificationDemo colors={colors} ideaText={ideaText} />;
  }

  if (lowerIdea.indexOf('loading') >= 0 || lowerIdea.indexOf('progress') >= 0 || lowerIdea.indexOf('spinner') >= 0) {
    return <LoadingDemo colors={colors} />;
  }

  if (lowerIdea.indexOf('badge') >= 0 || lowerIdea.indexOf('label') >= 0) {
    return <BadgeDemo colors={colors} />;
  }

  if (lowerIdea.indexOf('pricing') >= 0 || lowerIdea.indexOf('tier') >= 0) {
    return <PricingDemo colors={colors} />;
  }

  if (lowerIdea.indexOf('timeline') >= 0 || lowerIdea.indexOf('progression') >= 0) {
    return <TimelineDemo colors={colors} />;
  }

  if (lowerIdea.indexOf('data') >= 0 || lowerIdea.indexOf('chart') >= 0 || lowerIdea.indexOf('visualization') >= 0) {
    return <DataVisualizationDemo colors={colors} />;
  }

  if (lowerIdea.indexOf('aurora') >= 0 || lowerIdea.indexOf('mesh') >= 0) {
    return <AuroraDemo colors={colors} />;
  }

  if (lowerIdea.indexOf('split') >= 0 || lowerIdea.indexOf('comparison') >= 0 || lowerIdea.indexOf('toggle') >= 0) {
    return <SplitScreenDemo colors={colors} />;
  }

  if (lowerIdea.indexOf('status') >= 0 || lowerIdea.indexOf('indicator') >= 0) {
    return <StatusIndicatorDemo colors={colors} />;
  }

  if (lowerIdea.indexOf('section header') >= 0 || lowerIdea.indexOf('underline') >= 0) {
    return <SectionHeaderDemo colors={colors} />;
  }

  if (lowerIdea.indexOf('image gallery') >= 0 || lowerIdea.indexOf('overlay') >= 0) {
    return <GalleryDemo colors={colors} />;
  }

  if (lowerIdea.indexOf('countdown') >= 0 || lowerIdea.indexOf('timer') >= 0) {
    return <CountdownDemo colors={colors} />;
  }

  if (lowerIdea.indexOf('high-contrast') >= 0 || lowerIdea.indexOf('accessibility') >= 0) {
    return <AccessibilityDemo colors={colors} />;
  }

  if (lowerIdea.indexOf('toggle') >= 0 && lowerIdea.indexOf('switch') >= 0) {
    return <ToggleSwitchDemo colors={colors} />;
  }

  if (lowerIdea.indexOf('tab') >= 0) {
    return <TabsDemo colors={colors} />;
  }

  if (lowerIdea.indexOf('tooltip') >= 0 || lowerIdea.indexOf('popover') >= 0) {
    return <TooltipDemo colors={colors} />;
  }

  if (lowerIdea.indexOf('slider') >= 0 || lowerIdea.indexOf('range') >= 0) {
    return <SliderDemo colors={colors} />;
  }

  if (lowerIdea.indexOf('radio') >= 0 || lowerIdea.indexOf('checkbox') >= 0) {
    return <FormControlsDemo colors={colors} />;
  }

  if (lowerIdea.indexOf('skeleton') >= 0 || lowerIdea.indexOf('shimmer') >= 0) {
    return <SkeletonDemo colors={colors} />;
  }

  if (lowerIdea.indexOf('tag') >= 0 || lowerIdea.indexOf('chip') >= 0) {
    return <TagCloudDemo colors={colors} />;
  }

  if (lowerIdea.indexOf('pulse') >= 0 || lowerIdea.indexOf('ripple') >= 0) {
    return <PulseRippleDemo colors={colors} />;
  }

  if (lowerIdea.indexOf('stacked') >= 0 || lowerIdea.indexOf('layer') >= 0) {
    return <StackedLayersDemo colors={colors} />;
  }

  if (lowerIdea.indexOf('search') >= 0 || lowerIdea.indexOf('input') >= 0) {
    return <SearchBarDemo colors={colors} />;
  }

  if (lowerIdea.indexOf('card hover') >= 0 || lowerIdea.indexOf('3d') >= 0) {
    return <Card3DDemo colors={colors} />;
  }

  if (lowerIdea.indexOf('accordion') >= 0 || lowerIdea.indexOf('collapse') >= 0) {
    return <AccordionDemo colors={colors} />;
  }

  if (lowerIdea.indexOf('breadcrumb') >= 0) {
    return <BreadcrumbDemo colors={colors} />;
  }

  if (lowerIdea.indexOf('stat') >= 0 || lowerIdea.indexOf('metric') >= 0) {
    return <StatsCardDemo colors={colors} />;
  }

  if (lowerIdea.indexOf('confetti') >= 0 || lowerIdea.indexOf('celebration') >= 0) {
    return <ConfettiDemo colors={colors} />;
  }

  if (lowerIdea.indexOf('glow') >= 0 || lowerIdea.indexOf('neon') >= 0) {
    return <NeonGlowDemo colors={colors} />;
  }

  if (lowerIdea.indexOf('keyboard') >= 0 || lowerIdea.indexOf('shortcut') >= 0) {
    return <KeyboardShortcutDemo colors={colors} />;
  }

  if (lowerIdea.indexOf('wave') >= 0 || lowerIdea.indexOf('undulate') >= 0) {
    return <WaveAnimationDemo colors={colors} />;
  }

  if (lowerIdea.indexOf('marquee') >= 0 || lowerIdea.indexOf('scroll') >= 0 && lowerIdea.indexOf('text') >= 0) {
    return <MarqueeDemo colors={colors} />;
  }

  if (lowerIdea.indexOf('music') >= 0 || lowerIdea.indexOf('player') >= 0 || lowerIdea.indexOf('media') >= 0) {
    return <MusicPlayerDemo colors={colors} />;
  }

  if (lowerIdea.indexOf('social') >= 0 || lowerIdea.indexOf('profile') >= 0) {
    return <SocialCardDemo colors={colors} />;
  }

  if (lowerIdea.indexOf('chat') >= 0 || lowerIdea.indexOf('message') >= 0) {
    return <ChatBubbleDemo colors={colors} />;
  }

  if (lowerIdea.indexOf('rating') >= 0 || lowerIdea.indexOf('review') >= 0 || lowerIdea.indexOf('star') >= 0) {
    return <RatingDemo colors={colors} />;
  }

  if (lowerIdea.indexOf('calendar') >= 0 || lowerIdea.indexOf('date') >= 0) {
    return <CalendarDemo colors={colors} />;
  }

  if (lowerIdea.indexOf('kanban') >= 0 || lowerIdea.indexOf('board') >= 0) {
    return <KanbanDemo colors={colors} />;
  }

  if (lowerIdea.indexOf('testimonial') >= 0 || lowerIdea.indexOf('quote') >= 0) {
    return <TestimonialDemo colors={colors} />;
  }

  if (lowerIdea.indexOf('feature') >= 0 && lowerIdea.indexOf('grid') >= 0) {
    return <FeatureGridDemo colors={colors} />;
  }

  if (lowerIdea.indexOf('upload') >= 0 || lowerIdea.indexOf('file') >= 0 && lowerIdea.indexOf('drop') >= 0) {
    return <FileUploadDemo colors={colors} />;
  }

  if (lowerIdea.indexOf('circular') >= 0 || lowerIdea.indexOf('radial') >= 0 || lowerIdea.indexOf('donut') >= 0) {
    return <CircularProgressDemo colors={colors} />;
  }

  if (lowerIdea.indexOf('step') >= 0 || lowerIdea.indexOf('wizard') >= 0) {
    return <StepperDemo colors={colors} />;
  }

  if (lowerIdea.indexOf('avatar') >= 0 || lowerIdea.indexOf('user') >= 0 && lowerIdea.indexOf('group') >= 0) {
    return <AvatarGroupDemo colors={colors} />;
  }

  if (lowerIdea.indexOf('dropdown') >= 0 || lowerIdea.indexOf('select') >= 0) {
    return <DropdownDemo colors={colors} />;
  }

  if (lowerIdea.indexOf('sparkle') >= 0 || lowerIdea.indexOf('particle') >= 0) {
    return <SparkleDemo colors={colors} />;
  }

  if (lowerIdea.indexOf('blur') >= 0 || lowerIdea.indexOf('glass') >= 0) {
    return <GlassmorphismDemo colors={colors} />;
  }

  return <GenericPaletteDemo colors={colors} ideaText={ideaText} />;
}

function DashboardDemo(props: { colors: ColorPaletteColor[] }) {
  var colors = props.colors;
  var atomicBlack = '#0F0F0F';
  
  return (
    <div className="demo-section">
      <div className="demo-section__grid">
        {colors.map(function (color, index) {
          if (index >= 4) return null;
          var cardStyle = {
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            border: '2px solid ' + color.hex,
            borderRadius: '12px',
            padding: '1.5rem',
            boxShadow: '0 0 30px ' + color.hex + '40',
          };
          return (
            <div key={color.hex} style={cardStyle} className="demo-card-pulse">
              <h3 className="demo-card__title" style={{ color: color.hex }}>{color.name}</h3>
              <p className="demo-card__body">
                Dashboard card with neon {color.name.toLowerCase()} glow effect
              </p>
              <button className="demo-card__btn" style={{ backgroundColor: color.hex }}>
                View Details
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function GradientTextDemo(props: { colors: ColorPaletteColor[] }) {
  var colors = props.colors;
  var gradientColors = colors.slice(0, 3).map(function (c) { return c.hex; }).join(', ');
  
  return (
    <div className="demo-section demo-section--padded demo-section--centered">
      <h1 style={{
        background: 'linear-gradient(135deg, ' + gradientColors + ')',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontSize: '3rem',
        fontWeight: 700,
        marginBottom: '1rem',
      }}>
        Neon Gradient Hero
      </h1>
      <p className="demo-section__body-text">
        Large gradient text titles using background-clip: text
      </p>
    </div>
  );
}

function ButtonDemo(props: { colors: ColorPaletteColor[] }) {
  var colors = props.colors;
  
  return (
    <div className="demo-section">
      <div className="demo-section__flex-row">
        {colors.map(function (color, index) {
          if (index >= 5) return null;
          return (
            <button key={color.hex} className="demo-button-glow" style={{
              backgroundColor: color.hex,
              color: '#FFFFFF',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 0 20px ' + color.hex + '60',
            }}>
              {color.name} Button
            </button>
          );
        })}
      </div>
    </div>
  );
}

function NavigationDemo(props: { colors: ColorPaletteColor[] }) {
  var colors = props.colors;
  var gradient = colors.slice(0, 3).map(function (c) { return c.hex; }).join(', ');
  
  return (
    <div className="demo-section">
      <nav className="demo-section__nav">
        <a href="#" style={{
          background: 'linear-gradient(135deg, ' + gradient + ')',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 600,
          textDecoration: 'none',
          padding: '0.5rem 1rem',
          border: '2px solid transparent',
          borderImage: 'linear-gradient(135deg, ' + gradient + ') 1',
          borderRadius: '6px',
          boxShadow: '0 0 20px ' + colors[0].hex + '40',
        }}>
          Active Link
        </a>
        <a href="#" className="demo-section__nav-link">Link</a>
        <a href="#" className="demo-section__nav-link">Link</a>
      </nav>
    </div>
  );
}

function GradientBackgroundDemo(props: { colors: ColorPaletteColor[] }) {
  var colors = props.colors;
  var gradientColors = colors.map(function (c) { return c.hex; }).join(', ');
  
  return (
    <div className="demo-gradient-shift demo-section--centered" style={{
      padding: '4rem 2rem',
      background: 'linear-gradient(135deg, ' + gradientColors + ')',
      borderRadius: '8px',
      backgroundSize: '400% 400%',
    }}>
      <h2 className="demo-section__heading">
        Animated Gradient Background
      </h2>
      <p className="demo-section__body-text">
        Smooth shifting multi-color gradient backdrop
      </p>
    </div>
  );
}

function NotificationDemo(props: { colors: ColorPaletteColor[]; ideaText: string }) {
  var colors = props.colors;
  var ideaText = props.ideaText;
  var lowerIdea = ideaText.toLowerCase();
  var notifType = lowerIdea.indexOf('success') >= 0 ? 'success' : lowerIdea.indexOf('warning') >= 0 ? 'warning' : 'info';
  var gradient = colors.slice(0, 2).map(function (c) { return c.hex; }).join(', ');
  
  return (
    <div style={{ padding: '2rem', backgroundColor: '#0F0F0F', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{
        background: 'linear-gradient(135deg, ' + gradient + ')',
        padding: '1rem 1.5rem',
        borderRadius: '8px',
        color: '#FFFFFF',
        fontWeight: 600,
        boxShadow: '0 0 30px ' + colors[0].hex + '60',
      }} className="demo-notification-pulse">
        <div style={{ fontSize: '1.125rem', marginBottom: '0.25rem' }}>Success!</div>
        <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>Your notification with gradient background and pulsing animation</div>
      </div>
    </div>
  );
}

function LoadingDemo(props: { colors: ColorPaletteColor[] }) {
  var colors = props.colors;
  var gradient = colors.slice(0, 3).map(function (c) { return c.hex; }).join(', ');
  
  return (
    <div style={{ padding: '3rem 2rem', backgroundColor: '#0F0F0F', borderRadius: '8px', textAlign: 'center' }}>
      <div style={{
        height: '8px',
        background: 'linear-gradient(90deg, ' + gradient + ')',
        backgroundSize: '200% 100%',
        borderRadius: '4px',
        marginBottom: '2rem',
      }} className="demo-progress-bar" />
      <div className="demo-spinner" style={{
        width: '60px',
        height: '60px',
        border: '4px solid rgba(255, 255, 255, 0.1)',
        borderTopColor: colors[0].hex,
        borderRadius: '50%',
        margin: '0 auto',
      }} />
    </div>
  );
}

function BadgeDemo(props: { colors: ColorPaletteColor[] }) {
  var colors = props.colors;
  var gradient = colors.slice(0, 2).map(function (c) { return c.hex; }).join(', ');
  
  return (
    <div style={{ padding: '2rem', backgroundColor: '#0F0F0F', borderRadius: '8px' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
        {colors.map(function (color, index) {
          if (index >= 4) return null;
          return (
            <div key={color.hex} style={{
              background: 'linear-gradient(135deg, ' + color.hex + ', ' + color.hex + ')',
              color: '#FFFFFF',
              padding: '0.5rem 1rem',
              borderRadius: '20px',
              fontSize: '0.875rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              boxShadow: '0 0 15px ' + color.hex + '50',
            }}>
              {(function() {
                if (index === 0) return 'NEW';
                if (index === 1) return 'FEATURED';
                if (index === 2) return 'SALE';
                return 'HOT';
              })()}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PricingDemo(props: { colors: ColorPaletteColor[] }) {
  var colors = props.colors;
  
  return (
    <div style={{ padding: '2rem', backgroundColor: '#0F0F0F', borderRadius: '8px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        {colors.map(function (color, index) {
          if (index >= 3) return null;
          var opacity = 0.3 - (index * 0.1);
          return (
            <div key={color.hex} style={{
              backgroundColor: color.hex + Math.floor(opacity * 255).toString(16).padStart(2, '0'),
              border: '2px solid ' + color.hex,
              borderRadius: '12px',
              padding: '1.5rem',
              textAlign: 'center',
            }}>
              <h3 style={{ color: color.hex, fontSize: '1.25rem', marginBottom: '0.5rem' }}>
                {index === 0 ? 'Basic' : index === 1 ? 'Pro' : 'Elite'}
              </h3>
              <div style={{ color: '#FFFFFF', fontSize: '2rem', fontWeight: 700 }}>$29</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TimelineDemo(props: { colors: ColorPaletteColor[] }) {
  var colors = props.colors;
  
  return (
    <div style={{ padding: '2rem', backgroundColor: '#0F0F0F', borderRadius: '8px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingLeft: '2rem', borderLeft: '3px solid ' + colors[0].hex }}>
        {colors.map(function (color, index) {
          if (index >= 4) return null;
          return (
            <div key={color.hex} style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute',
                left: '-2.5rem',
                top: '0',
                width: '1rem',
                height: '1rem',
                borderRadius: '50%',
                backgroundColor: color.hex,
                boxShadow: '0 0 15px ' + color.hex,
              }} />
              <div style={{ color: color.hex, fontWeight: 600, marginBottom: '0.25rem' }}>
                {index === 0 ? 'Future' : index === 1 ? 'Present' : 'Past'}
              </div>
              <div style={{ color: '#FFFFFF', opacity: 0.7, fontSize: '0.875rem' }}>
                Timeline event with {color.name.toLowerCase()} marker
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function DataVisualizationDemo(props: { colors: ColorPaletteColor[] }) {
  var colors = props.colors;
  
  return (
    <div style={{ padding: '2rem', backgroundColor: '#0F0F0F', borderRadius: '8px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1rem', height: '200px', padding: '1rem' }}>
        {colors.map(function (color, index) {
          if (index >= 5) return null;
          var height = Math.random() * 60 + 40;
          return (
            <div key={color.hex} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{
                width: '100%',
                height: height + '%',
                background: 'linear-gradient(to top, ' + color.hex + ', ' + color.hex + '80)',
                borderRadius: '4px 4px 0 0',
                boxShadow: '0 0 20px ' + color.hex + '40',
              }} />
              <div style={{ color: color.hex, fontSize: '0.75rem', fontWeight: 600 }}>
                {Math.floor(height)}%
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AuroraDemo(props: { colors: ColorPaletteColor[] }) {
  var colors = props.colors;
  var color1 = colors[0] != null ? colors[0].hex : '#BE00FE';
  var color2 = colors[1] != null ? colors[1].hex : '#1F51FF';
  
  return (
    <div style={{
      padding: '4rem 2rem',
      background: '#0F0F0F',
      position: 'relative',
      borderRadius: '8px',
      overflow: 'hidden',
      minHeight: '300px',
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle at 0% 0%, ' + color1 + '40 0%, transparent 50%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle at 100% 100%, ' + color2 + '40 0%, transparent 50%)',
        pointerEvents: 'none',
      }} />
      <div style={{ position: 'relative', zIndex: 1, color: '#FFFFFF', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Aurora Mesh Effect</h2>
        <p style={{ opacity: 0.8 }}>Subtle radial gradients creating soft aurora glow in corners</p>
      </div>
    </div>
  );
}

function SplitScreenDemo(props: { colors: ColorPaletteColor[] }) {
  var colors = props.colors;
  var leftColor = colors[0] != null ? colors[0].hex : '#FF5F1F';
  var rightColor = colors[1] != null ? colors[1].hex : '#1F51FF';
  
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderRadius: '8px', overflow: 'hidden', minHeight: '300px' }}>
      <div style={{ backgroundColor: leftColor, padding: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF' }}>
        <div style={{ textAlign: 'center' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>Option A</h3>
          <p style={{ opacity: 0.9 }}>Warm section</p>
        </div>
      </div>
      <div style={{ backgroundColor: rightColor, padding: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF' }}>
        <div style={{ textAlign: 'center' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>Option B</h3>
          <p style={{ opacity: 0.9 }}>Cool section</p>
        </div>
      </div>
    </div>
  );
}

function StatusIndicatorDemo(props: { colors: ColorPaletteColor[] }) {
  var colors = props.colors;
  
  return (
    <div style={{ padding: '2rem', backgroundColor: '#0F0F0F', borderRadius: '8px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {colors.map(function (color, index) {
          if (index >= 3) return null;
          var status = index === 0 ? 'Active' : index === 1 ? 'Pending' : 'Inactive';
          return (
            <div key={color.hex} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '1rem',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '8px',
            }}>
              <div className="demo-status-pulse" style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: color.hex,
                boxShadow: '0 0 15px ' + color.hex,
              }} />
              <div style={{ color: '#FFFFFF' }}>
                <div style={{ fontWeight: 600 }}>{status}</div>
                <div style={{ fontSize: '0.875rem', opacity: 0.7 }}>Status indicator with {color.name.toLowerCase()}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SectionHeaderDemo(props: { colors: ColorPaletteColor[] }) {
  var colors = props.colors;
  var gradient = colors.slice(0, 2).map(function (c) { return c.hex; }).join(', ');
  
  return (
    <div style={{ padding: '2rem', backgroundColor: '#0F0F0F', borderRadius: '8px' }}>
      <div>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: 700,
          color: '#FFFFFF',
          marginBottom: '0.5rem',
          paddingBottom: '0.5rem',
          borderBottom: '3px solid transparent',
          borderImage: 'linear-gradient(90deg, ' + gradient + ') 1',
          display: 'inline-block',
        }}>
          Section Header
        </h2>
        <p style={{ color: '#FFFFFF', opacity: 0.7, marginTop: '1rem' }}>
          Blog post or portfolio category with gradient underline effect
        </p>
      </div>
    </div>
  );
}

function GalleryDemo(props: { colors: ColorPaletteColor[] }) {
  var colors = props.colors;
  
  return (
    <div style={{ padding: '2rem', backgroundColor: '#0F0F0F', borderRadius: '8px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
        {colors.map(function (color, index) {
          if (index >= 4) return null;
          return (
            <div key={color.hex} className="demo-gallery-item" style={{
              height: '150px',
              backgroundColor: color.hex + '30',
              borderRadius: '8px',
              position: 'relative',
              overflow: 'hidden',
              cursor: 'pointer',
              border: '2px solid transparent',
            }}>
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to bottom, transparent 0%, ' + color.hex + 'CC 100%)',
                opacity: 0,
                transition: 'opacity 0.3s ease',
                display: 'flex',
                alignItems: 'flex-end',
                padding: '1rem',
              }} className="demo-gallery-overlay">
                <div style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '0.875rem' }}>
                  {color.name}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CountdownDemo(props: { colors: ColorPaletteColor[] }) {
  var colors = props.colors;
  var gradient = colors.slice(0, 2).map(function (c) { return c.hex; }).join(', ');
  
  return (
    <div style={{ padding: '3rem 2rem', backgroundColor: '#0F0F0F', borderRadius: '8px', textAlign: 'center' }}>
      <h3 style={{ color: '#FFFFFF', marginBottom: '1.5rem', fontSize: '1.25rem' }}>Event Countdown</h3>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        {[{ value: '23', label: 'DAYS' }, { value: '14', label: 'HRS' }, { value: '59', label: 'MIN' }, { value: '32', label: 'SEC' }].map(function (item, index) {
          return (
            <div key={index} className="demo-countdown-pulse" style={{
              background: 'linear-gradient(135deg, ' + gradient + ')',
              padding: '1rem 1.5rem',
              borderRadius: '8px',
              minWidth: '70px',
            }}>
              <div style={{ color: '#FFFFFF', fontSize: '2rem', fontWeight: 700, lineHeight: 1 }}>{item.value}</div>
              <div style={{ color: '#FFFFFF', fontSize: '0.625rem', marginTop: '0.25rem', opacity: 0.8, letterSpacing: '0.05em' }}>{item.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AccessibilityDemo(props: { colors: ColorPaletteColor[] }) {
  var colors = props.colors;
  
  return (
    <div style={{ padding: '2rem', borderRadius: '8px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
      <div style={{ backgroundColor: '#000000', padding: '2rem', borderRadius: '8px' }}>
        <h3 style={{ color: '#FFFFFF', marginBottom: '1rem' }}>Dark Mode</h3>
        {colors.map(function (color, index) {
          if (index >= 3) return null;
          return (
            <button key={color.hex} style={{
              backgroundColor: color.hex,
              color: '#000000',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '6px',
              fontWeight: 600,
              marginBottom: '0.75rem',
              width: '100%',
            }}>
              {color.name} (AAA Contrast)
            </button>
          );
        })}
      </div>
      <div style={{ backgroundColor: '#FFFFFF', padding: '2rem', borderRadius: '8px' }}>
        <h3 style={{ color: '#000000', marginBottom: '1rem' }}>Light Mode</h3>
        {colors.map(function (color, index) {
          if (index >= 3) return null;
          return (
            <button key={color.hex} style={{
              backgroundColor: color.hex,
              color: '#FFFFFF',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '6px',
              fontWeight: 600,
              marginBottom: '0.75rem',
              width: '100%',
            }}>
              {color.name} (AAA Contrast)
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ToggleSwitchDemo(props: { colors: ColorPaletteColor[] }) {
  var colors = props.colors;
  var stateVar = React.useState(false);
  var isOn = stateVar[0];
  var setIsOn = stateVar[1];
  
  var activeColor = colors[0] != null ? colors[0].hex : '#39FF14';
  var inactiveColor = '#333333';
  
  return (
    <div className="demo-container demo-container--light-dark">
      <div className="demo-light">
        <div style={{ padding: '3rem 2rem', textAlign: 'center', background: '#FFFFFF' }}>
          <h3 style={{ marginBottom: '2rem', color: '#1A1A1A' }}>Light mode toggle</h3>
          <button
            onClick={function () { setIsOn(!isOn); }}
            style={{
              width: '80px',
              height: '40px',
              borderRadius: '20px',
              border: '2px solid ' + (isOn ? activeColor : '#CCCCCC'),
              background: isOn ? activeColor : '#E5E5E5',
              position: 'relative',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: isOn ? '0 0 20px ' + activeColor + '60' : 'none',
            }}
            aria-label={isOn ? 'Turn off' : 'Turn on'}
          >
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: '#FFFFFF',
              position: 'absolute',
              top: '4px',
              left: isOn ? '46px' : '4px',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            }} />
          </button>
        </div>
      </div>
      <div className="demo-dark">
        <div style={{ padding: '3rem 2rem', textAlign: 'center', background: '#0F0F0F' }}>
          <h3 style={{ marginBottom: '2rem', color: '#FFFFFF' }}>Dark mode toggle</h3>
          <button
            onClick={function () { setIsOn(!isOn); }}
            style={{
              width: '80px',
              height: '40px',
              borderRadius: '20px',
              border: '2px solid ' + (isOn ? activeColor : 'rgba(255,255,255,0.2)'),
              background: isOn ? activeColor : 'rgba(255,255,255,0.1)',
              position: 'relative',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: isOn ? '0 0 30px ' + activeColor + '80' : 'none',
            }}
            aria-label={isOn ? 'Turn off' : 'Turn on'}
          >
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: '#FFFFFF',
              position: 'absolute',
              top: '4px',
              left: isOn ? '46px' : '4px',
              transition: 'all 0.3s ease',
              boxShadow: isOn ? '0 0 15px ' + activeColor : '0 2px 4px rgba(0,0,0,0.2)',
            }} />
          </button>
        </div>
      </div>
    </div>
  );
}

function TabsDemo(props: { colors: ColorPaletteColor[] }) {
  var colors = props.colors;
  var stateVar = React.useState(0);
  var activeTab = stateVar[0];
  var setActiveTab = stateVar[1];
  
  var tabs = ['Overview', 'Features', 'Pricing', 'Support'];
  
  return (
    <div className="demo-container demo-container--light-dark">
      <div className="demo-light">
        <div style={{ padding: '2rem', background: '#FFFFFF' }}>
          <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '2px solid #E5E5E5', marginBottom: '1.5rem' }}>
            {tabs.map(function (tab, index) {
              var isActive = index === activeTab;
              var color = colors[index] != null ? colors[index].hex : colors[0].hex;
              return (
                <button
                  key={tab}
                  onClick={function () { setActiveTab(index); }}
                  style={{
                    padding: '0.75rem 1.5rem',
                    border: 'none',
                    background: 'transparent',
                    color: isActive ? color : '#666666',
                    fontWeight: isActive ? 600 : 400,
                    cursor: 'pointer',
                    borderBottom: isActive ? '3px solid ' + color : '3px solid transparent',
                    marginBottom: '-2px',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {tab}
                </button>
              );
            })}
          </div>
          <div style={{ padding: '1rem', color: '#1A1A1A' }}>
            <p>Content for {tabs[activeTab]} tab</p>
          </div>
        </div>
      </div>
      <div className="demo-dark">
        <div style={{ padding: '2rem', background: '#0F0F0F' }}>
          <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '2px solid rgba(255,255,255,0.15)', marginBottom: '1.5rem' }}>
            {tabs.map(function (tab, index) {
              var isActive = index === activeTab;
              var color = colors[index] != null ? colors[index].hex : colors[0].hex;
              return (
                <button
                  key={tab}
                  onClick={function () { setActiveTab(index); }}
                  style={{
                    padding: '0.75rem 1.5rem',
                    border: 'none',
                    background: 'transparent',
                    color: isActive ? color : '#999999',
                    fontWeight: isActive ? 600 : 400,
                    cursor: 'pointer',
                    borderBottom: isActive ? '3px solid ' + color : '3px solid transparent',
                    marginBottom: '-2px',
                    transition: 'all 0.2s ease',
                    boxShadow: isActive ? '0 0 20px ' + color + '40' : 'none',
                  }}
                >
                  {tab}
                </button>
              );
            })}
          </div>
          <div style={{ padding: '1rem', color: '#FFFFFF' }}>
            <p>Content for {tabs[activeTab]} tab</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TooltipDemo(props: { colors: ColorPaletteColor[] }) {
  var colors = props.colors;
  var color = colors[0] != null ? colors[0].hex : '#BE00FE';
  
  return (
    <div className="demo-container demo-container--light-dark">
      <div className="demo-light">
        <div style={{ padding: '4rem 2rem', textAlign: 'center', background: '#FFFFFF', position: 'relative' }}>
          <button style={{
            padding: '0.75rem 1.5rem',
            background: color,
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 600,
            cursor: 'pointer',
          }}>
            Hover me
          </button>
          <div className="demo-tooltip-pulse" style={{
            position: 'absolute',
            top: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#1A1A1A',
            color: '#FFFFFF',
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            fontSize: '0.875rem',
            whiteSpace: 'nowrap',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          }}>
            Helpful tooltip text
            <div style={{
              position: 'absolute',
              bottom: '-6px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '6px solid transparent',
              borderRight: '6px solid transparent',
              borderTop: '6px solid #1A1A1A',
            }} />
          </div>
        </div>
      </div>
      <div className="demo-dark">
        <div style={{ padding: '4rem 2rem', textAlign: 'center', background: '#0F0F0F', position: 'relative' }}>
          <button style={{
            padding: '0.75rem 1.5rem',
            background: color,
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 0 20px ' + color + '60',
          }}>
            Hover me
          </button>
          <div className="demo-tooltip-pulse" style={{
            position: 'absolute',
            top: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'linear-gradient(135deg, ' + color + ', ' + color + 'CC)',
            color: '#FFFFFF',
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            fontSize: '0.875rem',
            whiteSpace: 'nowrap',
            boxShadow: '0 0 30px ' + color + '80, 0 4px 12px rgba(0,0,0,0.4)',
          }}>
            Helpful tooltip text
            <div style={{
              position: 'absolute',
              bottom: '-6px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '6px solid transparent',
              borderRight: '6px solid transparent',
              borderTop: '6px solid ' + color,
            }} />
          </div>
        </div>
      </div>
    </div>
  );
}

function SliderDemo(props: { colors: ColorPaletteColor[] }) {
  var colors = props.colors;
  var stateVar = React.useState(50);
  var value = stateVar[0];
  var setValue = stateVar[1];
  var gradient = colors.slice(0, 3).map(function (c) { return c.hex; }).join(', ');
  
  return (
    <div className="demo-container demo-container--light-dark">
      <div className="demo-light">
        <div style={{ padding: '3rem 2rem', background: '#FFFFFF' }}>
          <h3 style={{ marginBottom: '2rem', textAlign: 'center', color: '#1A1A1A' }}>Volume: {value}%</h3>
          <input
            type="range"
            min="0"
            max="100"
            value={value}
            onChange={function (e) { setValue(Number(e.target.value)); }}
            style={{
              width: '100%',
              height: '8px',
              borderRadius: '4px',
              background: 'linear-gradient(to right, ' + gradient + ' ' + value + '%, #E5E5E5 ' + value + '%)',
              appearance: 'none',
              outline: 'none',
            }}
          />
        </div>
      </div>
      <div className="demo-dark">
        <div style={{ padding: '3rem 2rem', background: '#0F0F0F' }}>
          <h3 style={{ marginBottom: '2rem', textAlign: 'center', color: '#FFFFFF' }}>Volume: {value}%</h3>
          <input
            type="range"
            min="0"
            max="100"
            value={value}
            onChange={function (e) { setValue(Number(e.target.value)); }}
            style={{
              width: '100%',
              height: '8px',
              borderRadius: '4px',
              background: 'linear-gradient(to right, ' + gradient + ' ' + value + '%, rgba(255,255,255,0.1) ' + value + '%)',
              appearance: 'none',
              outline: 'none',
              boxShadow: '0 0 20px ' + colors[0].hex + '40',
            }}
          />
        </div>
      </div>
    </div>
  );
}

function FormControlsDemo(props: { colors: ColorPaletteColor[] }) {
  var colors = props.colors;
  var stateVar1 = React.useState(false);
  var checked1 = stateVar1[0];
  var setChecked1 = stateVar1[1];
  var stateVar2 = React.useState(1);
  var selected = stateVar2[0];
  var setSelected = stateVar2[1];
  
  return (
    <div className="demo-container demo-container--light-dark">
      <div className="demo-light">
        <div style={{ padding: '2rem', background: '#FFFFFF' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', color: '#1A1A1A' }}>
              <div style={{
                width: '24px',
                height: '24px',
                border: '2px solid ' + (checked1 ? colors[0].hex : '#CCCCCC'),
                borderRadius: '4px',
                background: checked1 ? colors[0].hex : '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
              }}>
                {checked1 && <span style={{ color: '#FFFFFF', fontSize: '1.25rem' }}>✓</span>}
              </div>
              <input type="checkbox" checked={checked1} onChange={function () { setChecked1(!checked1); }} style={{ display: 'none' }} />
              I agree to the terms
            </label>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {colors.slice(0, 3).map(function (color, index) {
              var isSelected = selected === index;
              return (
                <label key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', color: '#1A1A1A' }}>
                  <div style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    border: '2px solid ' + (isSelected ? color.hex : '#CCCCCC'),
                    background: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    {isSelected && <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: color.hex }} />}
                  </div>
                  <input type="radio" checked={isSelected} onChange={function () { setSelected(index); }} style={{ display: 'none' }} />
                  Option {index + 1}
                </label>
              );
            })}
          </div>
        </div>
      </div>
      <div className="demo-dark">
        <div style={{ padding: '2rem', background: '#0F0F0F' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', color: '#FFFFFF' }}>
              <div style={{
                width: '24px',
                height: '24px',
                border: '2px solid ' + (checked1 ? colors[0].hex : 'rgba(255,255,255,0.3)'),
                borderRadius: '4px',
                background: checked1 ? colors[0].hex : 'rgba(255,255,255,0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
                boxShadow: checked1 ? '0 0 20px ' + colors[0].hex + '60' : 'none',
              }}>
                {checked1 && <span style={{ color: '#FFFFFF', fontSize: '1.25rem' }}>✓</span>}
              </div>
              <input type="checkbox" checked={checked1} onChange={function () { setChecked1(!checked1); }} style={{ display: 'none' }} />
              I agree to the terms
            </label>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {colors.slice(0, 3).map(function (color, index) {
              var isSelected = selected === index;
              return (
                <label key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', color: '#FFFFFF' }}>
                  <div style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    border: '2px solid ' + (isSelected ? color.hex : 'rgba(255,255,255,0.3)'),
                    background: 'rgba(255,255,255,0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: isSelected ? '0 0 15px ' + color.hex + '60' : 'none',
                  }}>
                    {isSelected && <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: color.hex, boxShadow: '0 0 8px ' + color.hex }} />}
                  </div>
                  <input type="radio" checked={isSelected} onChange={function () { setSelected(index); }} style={{ display: 'none' }} />
                  Option {index + 1}
                </label>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function SkeletonDemo(props: { colors: ColorPaletteColor[] }) {
  var colors = props.colors;
  var gradient = colors.slice(0, 2).map(function (c) { return c.hex; }).join(', ');
  
  return (
    <div className="demo-container demo-container--light-dark">
      <div className="demo-light">
        <div style={{ padding: '2rem', background: '#FFFFFF' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="demo-shimmer" style={{ width: '100%', height: '200px', background: '#E5E5E5', borderRadius: '8px' }} />
            <div className="demo-shimmer" style={{ width: '80%', height: '24px', background: '#E5E5E5', borderRadius: '4px' }} />
            <div className="demo-shimmer" style={{ width: '60%', height: '24px', background: '#E5E5E5', borderRadius: '4px' }} />
          </div>
        </div>
      </div>
      <div className="demo-dark">
        <div style={{ padding: '2rem', background: '#0F0F0F' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="demo-shimmer-neon" style={{
              width: '100%',
              height: '200px',
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.1)',
            }} />
            <div className="demo-shimmer-neon" style={{
              width: '80%',
              height: '24px',
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '4px',
              border: '1px solid rgba(255,255,255,0.1)',
            }} />
            <div className="demo-shimmer-neon" style={{
              width: '60%',
              height: '24px',
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '4px',
              border: '1px solid rgba(255,255,255,0.1)',
            }} />
          </div>
        </div>
      </div>
    </div>
  );
}

function TagCloudDemo(props: { colors: ColorPaletteColor[] }) {
  var colors = props.colors;
  var tags = ['React', 'TypeScript', 'Design', 'UI/UX', 'Animation', 'Accessibility', 'Performance', 'SEO'];
  
  return (
    <div className="demo-container demo-container--light-dark">
      <div className="demo-light">
        <div style={{ padding: '2rem', background: '#FFFFFF' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
            {tags.map(function (tag, index) {
              var color = colors[index % colors.length];
              return (
                <span key={tag} style={{
                  padding: '0.5rem 1rem',
                  background: color.hex + '20',
                  color: color.hex,
                  border: '1px solid ' + color.hex,
                  borderRadius: '20px',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}>
                  {tag}
                </span>
              );
            })}
          </div>
        </div>
      </div>
      <div className="demo-dark">
        <div style={{ padding: '2rem', background: '#0F0F0F' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
            {tags.map(function (tag, index) {
              var color = colors[index % colors.length];
              return (
                <span key={tag} className="demo-tag-glow" style={{
                  padding: '0.5rem 1rem',
                  background: color.hex + '30',
                  color: color.hex,
                  border: '1px solid ' + color.hex,
                  borderRadius: '20px',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 0 15px ' + color.hex + '40',
                }}>
                  {tag}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function PulseRippleDemo(props: { colors: ColorPaletteColor[] }) {
  var colors = props.colors;
  var color = colors[0] != null ? colors[0].hex : '#BE00FE';
  
  return (
    <div className="demo-container demo-container--light-dark">
      <div className="demo-light">
        <div style={{ padding: '4rem 2rem', background: '#FFFFFF', textAlign: 'center' }}>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <div className="demo-pulse-ring" style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '1.5rem',
            }}>
              LIVE
            </div>
          </div>
        </div>
      </div>
      <div className="demo-dark">
        <div style={{ padding: '4rem 2rem', background: '#0F0F0F', textAlign: 'center' }}>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <div className="demo-pulse-ring" style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '1.5rem',
              boxShadow: '0 0 40px ' + color + '80',
            }}>
              LIVE
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StackedLayersDemo(props: { colors: ColorPaletteColor[] }) {
  var colors = props.colors;
  
  return (
    <div className="demo-container demo-container--light-dark">
      <div className="demo-light">
        <div style={{ padding: '4rem 2rem', background: '#F5F5F5', textAlign: 'center' }}>
          <div style={{ position: 'relative', display: 'inline-block', width: '300px', height: '200px' }}>
            {colors.slice(0, 4).map(function (color, index) {
              return (
                <div key={index} style={{
                  position: 'absolute',
                  top: index * 15 + 'px',
                  left: index * 15 + 'px',
                  width: '250px',
                  height: '150px',
                  background: color.hex,
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  transition: 'transform 0.3s ease',
                  zIndex: 4 - index,
                }} />
              );
            })}
          </div>
        </div>
      </div>
      <div className="demo-dark">
        <div style={{ padding: '4rem 2rem', background: '#0F0F0F', textAlign: 'center' }}>
          <div style={{ position: 'relative', display: 'inline-block', width: '300px', height: '200px' }}>
            {colors.slice(0, 4).map(function (color, index) {
              return (
                <div key={index} style={{
                  position: 'absolute',
                  top: index * 15 + 'px',
                  left: index * 15 + 'px',
                  width: '250px',
                  height: '150px',
                  background: color.hex,
                  borderRadius: '12px',
                  boxShadow: '0 0 30px ' + color.hex + '60, 0 4px 12px rgba(0,0,0,0.4)',
                  transition: 'transform 0.3s ease',
                  zIndex: 4 - index,
                }} />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function SearchBarDemo(props: { colors: ColorPaletteColor[] }) {
  var colors = props.colors;
  var color = colors[0] != null ? colors[0].hex : '#BE00FE';
  
  return (
    <div className="demo-container demo-container--light-dark">
      <div className="demo-light">
        <div style={{ padding: '3rem 2rem', background: '#FFFFFF' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            padding: '0.75rem 1.5rem',
            border: '2px solid ' + color,
            borderRadius: '50px',
            background: '#FFFFFF',
          }}>
            <span style={{ color: color, fontSize: '1.25rem' }}>🔍</span>
            <input
              type="text"
              placeholder="Search..."
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                fontSize: '1rem',
                background: 'transparent',
                color: '#1A1A1A',
              }}
            />
          </div>
        </div>
      </div>
      <div className="demo-dark">
        <div style={{ padding: '3rem 2rem', background: '#0F0F0F' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            padding: '0.75rem 1.5rem',
            border: '2px solid ' + color,
            borderRadius: '50px',
            background: 'rgba(255,255,255,0.05)',
            boxShadow: '0 0 30px ' + color + '40',
          }}>
            <span style={{ color: color, fontSize: '1.25rem' }}>🔍</span>
            <input
              type="text"
              placeholder="Search..."
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                fontSize: '1rem',
                background: 'transparent',
                color: '#FFFFFF',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Card3DDemo(props: { colors: ColorPaletteColor[] }) {
  var colors = props.colors;
  var gradient = colors.slice(0, 2).map(function (c) { return c.hex; }).join(', ');
  
  return (
    <div className="demo-container demo-container--light-dark">
      <div className="demo-light">
        <div style={{ padding: '3rem 2rem', background: '#F5F5F5', display: 'flex', justifyContent: 'center' }}>
          <div className="demo-card-3d" style={{
            width: '280px',
            height: '180px',
            background: 'linear-gradient(135deg, ' + gradient + ')',
            borderRadius: '16px',
            padding: '1.5rem',
            color: '#FFFFFF',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
            transition: 'transform 0.3s ease',
          }}>
            <h3 style={{ marginBottom: '0.5rem' }}>Interactive Card</h3>
            <p style={{ opacity: 0.9, fontSize: '0.875rem' }}>Hover for 3D tilt effect</p>
          </div>
        </div>
      </div>
      <div className="demo-dark">
        <div style={{ padding: '3rem 2rem', background: '#0F0F0F', display: 'flex', justifyContent: 'center' }}>
          <div className="demo-card-3d" style={{
            width: '280px',
            height: '180px',
            background: 'linear-gradient(135deg, ' + gradient + ')',
            borderRadius: '16px',
            padding: '1.5rem',
            color: '#FFFFFF',
            boxShadow: '0 0 40px ' + colors[0].hex + '60, 0 10px 30px rgba(0,0,0,0.4)',
            transition: 'transform 0.3s ease',
          }}>
            <h3 style={{ marginBottom: '0.5rem' }}>Interactive Card</h3>
            <p style={{ opacity: 0.9, fontSize: '0.875rem' }}>Hover for 3D tilt effect</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function AccordionDemo(props: { colors: ColorPaletteColor[] }) {
  var colors = props.colors;
  var stateVar = React.useState(0);
  var openIndex = stateVar[0];
  var setOpenIndex = stateVar[1];
  
  var items = ['Section 1', 'Section 2', 'Section 3'];
  
  return (
    <div className="demo-container demo-container--light-dark">
      <div className="demo-light">
        <div style={{ padding: '2rem', background: '#FFFFFF' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {items.map(function (item, index) {
              var isOpen = openIndex === index;
              var color = colors[index] != null ? colors[index].hex : colors[0].hex;
              return (
                <div key={index} style={{
                  border: '1px solid ' + (isOpen ? color : '#E5E5E5'),
                  borderRadius: '8px',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                }}>
                  <button
                    onClick={function () { setOpenIndex(isOpen ? -1 : index); }}
                    style={{
                      width: '100%',
                      padding: '1rem',
                      background: isOpen ? color + '10' : '#FFFFFF',
                      border: 'none',
                      textAlign: 'left',
                      cursor: 'pointer',
                      color: isOpen ? color : '#1A1A1A',
                      fontWeight: 600,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    {item}
                    <span>{isOpen ? '−' : '+'}</span>
                  </button>
                  {isOpen && (
                    <div style={{ padding: '1rem', background: '#F9F9F9', color: '#666666' }}>
                      Content for {item}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="demo-dark">
        <div style={{ padding: '2rem', background: '#0F0F0F' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {items.map(function (item, index) {
              var isOpen = openIndex === index;
              var color = colors[index] != null ? colors[index].hex : colors[0].hex;
              return (
                <div key={index} style={{
                  border: '1px solid ' + (isOpen ? color : 'rgba(255,255,255,0.15)'),
                  borderRadius: '8px',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  boxShadow: isOpen ? '0 0 20px ' + color + '40' : 'none',
                }}>
                  <button
                    onClick={function () { setOpenIndex(isOpen ? -1 : index); }}
                    style={{
                      width: '100%',
                      padding: '1rem',
                      background: isOpen ? color + '20' : 'rgba(255,255,255,0.05)',
                      border: 'none',
                      textAlign: 'left',
                      cursor: 'pointer',
                      color: isOpen ? color : '#FFFFFF',
                      fontWeight: 600,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    {item}
                    <span>{isOpen ? '−' : '+'}</span>
                  </button>
                  {isOpen && (
                    <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', color: '#CCCCCC' }}>
                      Content for {item}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function BreadcrumbDemo(props: { colors: ColorPaletteColor[] }) {
  var colors = props.colors;
  var color = colors[0] != null ? colors[0].hex : '#BE00FE';
  var items = ['Home', 'Products', 'Category', 'Item'];
  
  return (
    <div className="demo-container demo-container--light-dark">
      <div className="demo-light">
        <div style={{ padding: '2rem', background: '#FFFFFF' }}>
          <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            {items.map(function (item, index) {
              var isLast = index === items.length - 1;
              return (
                <span key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <a href="#" style={{
                    color: isLast ? color : '#666666',
                    textDecoration: 'none',
                    fontWeight: isLast ? 600 : 400,
                  }}>
                    {item}
                  </a>
                  {isLast === false && <span style={{ color: '#CCCCCC' }}>/</span>}
                </span>
              );
            })}
          </nav>
        </div>
      </div>
      <div className="demo-dark">
        <div style={{ padding: '2rem', background: '#0F0F0F' }}>
          <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            {items.map(function (item, index) {
              var isLast = index === items.length - 1;
              return (
                <span key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <a href="#" style={{
                    color: isLast ? color : '#999999',
                    textDecoration: 'none',
                    fontWeight: isLast ? 600 : 400,
                    textShadow: isLast ? '0 0 10px ' + color + '60' : 'none',
                  }}>
                    {item}
                  </a>
                  {isLast === false && <span style={{ color: 'rgba(255,255,255,0.3)' }}>/</span>}
                </span>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}

function StatsCardDemo(props: { colors: ColorPaletteColor[] }) {
  var colors = props.colors;
  var stats = [
    { label: 'Users', value: '12.5K', change: '+12%' },
    { label: 'Revenue', value: '$48K', change: '+23%' },
    { label: 'Orders', value: '856', change: '+8%' },
  ];
  
  return (
    <div className="demo-container demo-container--light-dark">
      <div className="demo-light">
        <div style={{ padding: '2rem', background: '#F5F5F5' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
            {stats.map(function (stat, index) {
              var color = colors[index] != null ? colors[index].hex : colors[0].hex;
              return (
                <div key={index} style={{
                  background: '#FFFFFF',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  border: '2px solid ' + color,
                  textAlign: 'center',
                }}>
                  <div style={{ fontSize: '0.75rem', color: '#666666', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                    {stat.label}
                  </div>
                  <div style={{ fontSize: '2rem', fontWeight: 700, color: color, marginBottom: '0.25rem' }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: color, fontWeight: 600 }}>
                    {stat.change}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="demo-dark">
        <div style={{ padding: '2rem', background: '#0F0F0F' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
            {stats.map(function (stat, index) {
              var color = colors[index] != null ? colors[index].hex : colors[0].hex;
              return (
                <div key={index} style={{
                  background: 'rgba(255,255,255,0.05)',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  border: '2px solid ' + color,
                  textAlign: 'center',
                  boxShadow: '0 0 30px ' + color + '40',
                }}>
                  <div style={{ fontSize: '0.75rem', color: '#999999', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                    {stat.label}
                  </div>
                  <div style={{ fontSize: '2rem', fontWeight: 700, color: color, marginBottom: '0.25rem' }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: color, fontWeight: 600 }}>
                    {stat.change}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function ConfettiDemo(props: { colors: ColorPaletteColor[] }) {
  var colors = props.colors;
  
  return (
    <div className="demo-container demo-container--light-dark">
      <div className="demo-light">
        <div style={{ padding: '4rem 2rem', background: '#FFFFFF', position: 'relative', overflow: 'hidden', minHeight: '300px' }}>
          {colors.slice(0, 20).map(function (color, index) {
            var left = Math.random() * 100;
            var delay = Math.random() * 2;
            return (
              <div
                key={index}
                className="demo-confetti-fall"
                style={{
                  position: 'absolute',
                  top: '-10px',
                  left: left + '%',
                  width: '10px',
                  height: '10px',
                  background: color.hex,
                  borderRadius: Math.random() > 0.5 ? '50%' : '0',
                  animationDelay: delay + 's',
                }}
              />
            );
          })}
          <h2 style={{ textAlign: 'center', color: '#1A1A1A', position: 'relative', zIndex: 1 }}>🎉 Celebration Mode!</h2>
        </div>
      </div>
      <div className="demo-dark">
        <div style={{ padding: '4rem 2rem', background: '#0F0F0F', position: 'relative', overflow: 'hidden', minHeight: '300px' }}>
          {colors.slice(0, 20).map(function (color, index) {
            var left = Math.random() * 100;
            var delay = Math.random() * 2;
            return (
              <div
                key={index}
                className="demo-confetti-fall"
                style={{
                  position: 'absolute',
                  top: '-10px',
                  left: left + '%',
                  width: '10px',
                  height: '10px',
                  background: color.hex,
                  borderRadius: Math.random() > 0.5 ? '50%' : '0',
                  animationDelay: delay + 's',
                  boxShadow: '0 0 10px ' + color.hex,
                }}
              />
            );
          })}
          <h2 style={{ textAlign: 'center', color: '#FFFFFF', position: 'relative', zIndex: 1 }}>🎉 Celebration Mode!</h2>
        </div>
      </div>
    </div>
  );
}

function NeonGlowDemo(props: { colors: ColorPaletteColor[] }) {
  var colors = props.colors;
  var gradient = colors.slice(0, 3).map(function (c) { return c.hex; }).join(', ');
  
  return (
    <div className="demo-container demo-container--light-dark">
      <div className="demo-light">
        <div style={{ padding: '4rem 2rem', background: '#FFFFFF', textAlign: 'center' }}>
          <h1 style={{
            fontSize: '3rem',
            fontWeight: 700,
            background: 'linear-gradient(135deg, ' + gradient + ')',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '1rem',
          }}>
            NEON
          </h1>
          <p style={{ color: '#666666' }}>Gradient text effect</p>
        </div>
      </div>
      <div className="demo-dark">
        <div style={{ padding: '4rem 2rem', background: '#0F0F0F', textAlign: 'center' }}>
          <h1 className="demo-neon-flicker" style={{
            fontSize: '3rem',
            fontWeight: 700,
            color: colors[0].hex,
            textShadow: '0 0 10px ' + colors[0].hex + ', 0 0 20px ' + colors[0].hex + ', 0 0 30px ' + colors[0].hex + ', 0 0 40px ' + colors[0].hex,
            marginBottom: '1rem',
          }}>
            NEON
          </h1>
          <p style={{ color: '#999999' }}>Full neon glow with flicker animation</p>
        </div>
      </div>
    </div>
  );
}

function KeyboardShortcutDemo(props: { colors: ColorPaletteColor[] }) {
  var colors = props.colors;
  var color = colors[0] != null ? colors[0].hex : '#BE00FE';
  var shortcuts = [
    { keys: ['Ctrl', 'K'], action: 'Command palette' },
    { keys: ['Ctrl', 'S'], action: 'Save' },
    { keys: ['Ctrl', 'Shift', 'P'], action: 'Settings' },
  ];
  
  return (
    <div className="demo-container demo-container--light-dark">
      <div className="demo-light">
        <div style={{ padding: '2rem', background: '#FFFFFF' }}>
          {shortcuts.map(function (shortcut, index) {
            return (
              <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', color: '#1A1A1A' }}>
                <span>{shortcut.action}</span>
                <div style={{ display: 'flex', gap: '0.25rem' }}>
                  {shortcut.keys.map(function (key, ki) {
                    return (
                      <span key={ki} style={{
                        padding: '0.25rem 0.5rem',
                        background: '#F5F5F5',
                        border: '1px solid #CCCCCC',
                        borderRadius: '4px',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        fontFamily: 'monospace',
                      }}>
                        {key}
                      </span>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="demo-dark">
        <div style={{ padding: '2rem', background: '#0F0F0F' }}>
          {shortcuts.map(function (shortcut, index) {
            return (
              <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', color: '#FFFFFF' }}>
                <span>{shortcut.action}</span>
                <div style={{ display: 'flex', gap: '0.25rem' }}>
                  {shortcut.keys.map(function (key, ki) {
                    return (
                      <span key={ki} style={{
                        padding: '0.25rem 0.5rem',
                        background: 'rgba(255,255,255,0.1)',
                        border: '1px solid ' + color,
                        borderRadius: '4px',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        fontFamily: 'monospace',
                        color: color,
                        boxShadow: '0 0 10px ' + color + '40',
                      }}>
                        {key}
                      </span>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function WaveAnimationDemo(props: { colors: ColorPaletteColor[] }) {
  var colors = props.colors;
  var gradient = colors.slice(0, 3).map(function (c) { return c.hex; }).join(', ');
  
  return (
    <div className="demo-container demo-container--light-dark">
      <div className="demo-light">
        <div style={{ padding: '3rem 2rem', background: '#FFFFFF', position: 'relative', overflow: 'hidden' }}>
          <div className="demo-wave" style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '200%',
            height: '100px',
            background: 'linear-gradient(90deg, ' + gradient + ', ' + gradient + ')',
            borderRadius: '50% 50% 0 0',
            opacity: 0.6,
          }} />
          <h3 style={{ textAlign: 'center', color: '#1A1A1A', position: 'relative', zIndex: 1 }}>Wave Animation</h3>
        </div>
      </div>
      <div className="demo-dark">
        <div style={{ padding: '3rem 2rem', background: '#0F0F0F', position: 'relative', overflow: 'hidden' }}>
          <div className="demo-wave" style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '200%',
            height: '100px',
            background: 'linear-gradient(90deg, ' + gradient + ', ' + gradient + ')',
            borderRadius: '50% 50% 0 0',
            opacity: 0.8,
            boxShadow: '0 -10px 40px ' + colors[0].hex + '60',
          }} />
          <h3 style={{ textAlign: 'center', color: '#FFFFFF', position: 'relative', zIndex: 1 }}>Wave Animation</h3>
        </div>
      </div>
    </div>
  );
}

function MarqueeDemo(props: { colors: ColorPaletteColor[] }) {
  var colors = props.colors;
  var text = 'BREAKING NEWS • LATEST UPDATES • TRENDING NOW • ';
  var repeatedText = text + text + text;
  
  return (
    <div className="demo-container demo-container--light-dark">
      <div className="demo-light">
        <div style={{ padding: '2rem', background: '#FFFFFF', overflow: 'hidden' }}>
          <div className="demo-marquee" style={{
            display: 'flex',
            background: colors[0].hex,
            color: '#FFFFFF',
            padding: '1rem 0',
            whiteSpace: 'nowrap',
            fontSize: '1.25rem',
            fontWeight: 700,
          }}>
            <span>{repeatedText}</span>
          </div>
        </div>
      </div>
      <div className="demo-dark">
        <div style={{ padding: '2rem', background: '#0F0F0F', overflow: 'hidden' }}>
          <div className="demo-marquee" style={{
            display: 'flex',
            background: 'linear-gradient(90deg, ' + colors.slice(0, 3).map(function (c) { return c.hex; }).join(', ') + ')',
            color: '#FFFFFF',
            padding: '1rem 0',
            whiteSpace: 'nowrap',
            fontSize: '1.25rem',
            fontWeight: 700,
            boxShadow: '0 0 30px ' + colors[0].hex + '60',
          }}>
            <span>{repeatedText}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function MusicPlayerDemo(props: { colors: ColorPaletteColor[] }) {
  var colors = props.colors;
  var stateVar = React.useState(false);
  var isPlaying = stateVar[0];
  var setIsPlaying = stateVar[1];
  var gradient = colors.slice(0, 3).map(function (c) { return c.hex; }).join(', ');
  
  return (
    <div className="demo-container demo-container--light-dark">
      <div className="demo-light">
        <div style={{ padding: '2rem', background: '#FFFFFF' }}>
          <div style={{
            background: '#F5F5F5',
            borderRadius: '16px',
            padding: '1.5rem',
            border: '1px solid #E5E5E5',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, ' + gradient + ')',
                borderRadius: '12px',
              }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, color: '#1A1A1A', marginBottom: '0.25rem' }}>Track Name</div>
                <div style={{ fontSize: '0.875rem', color: '#666666' }}>Artist Name</div>
              </div>
            </div>
            <div style={{ height: '4px', background: '#E5E5E5', borderRadius: '2px', marginBottom: '1rem', position: 'relative' }}>
              <div style={{ width: '60%', height: '100%', background: 'linear-gradient(90deg, ' + gradient + ')', borderRadius: '2px' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
              <button style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                border: 'none',
                background: 'linear-gradient(135deg, ' + gradient + ')',
                color: '#FFFFFF',
                fontSize: '1.5rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onClick={function () { setIsPlaying(!isPlaying); }}
              >
                {isPlaying ? '⏸' : '▶'}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="demo-dark">
        <div style={{ padding: '2rem', background: '#0F0F0F' }}>
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '16px',
            padding: '1.5rem',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 0 30px ' + colors[0].hex + '40',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, ' + gradient + ')',
                borderRadius: '12px',
                boxShadow: '0 0 20px ' + colors[0].hex + '60',
              }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, color: '#FFFFFF', marginBottom: '0.25rem' }}>Track Name</div>
                <div style={{ fontSize: '0.875rem', color: '#999999' }}>Artist Name</div>
              </div>
            </div>
            <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', marginBottom: '1rem', position: 'relative' }}>
              <div style={{
                width: '60%',
                height: '100%',
                background: 'linear-gradient(90deg, ' + gradient + ')',
                borderRadius: '2px',
                boxShadow: '0 0 10px ' + colors[0].hex,
              }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
              <button style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                border: 'none',
                background: 'linear-gradient(135deg, ' + gradient + ')',
                color: '#FFFFFF',
                fontSize: '1.5rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 25px ' + colors[0].hex + '80',
              }}
              onClick={function () { setIsPlaying(!isPlaying); }}
              >
                {isPlaying ? '⏸' : '▶'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SocialCardDemo(props: { colors: ColorPaletteColor[] }) {
  var colors = props.colors;
  var stateVar = React.useState(false);
  var isFollowing = stateVar[0];
  var setIsFollowing = stateVar[1];
  var color = colors[0] != null ? colors[0].hex : '#BE00FE';
  
  return (
    <div className="demo-container demo-container--light-dark">
      <div className="demo-light">
        <div style={{ padding: '2rem', background: '#FFFFFF' }}>
          <div style={{
            background: '#FFFFFF',
            border: '1px solid #E5E5E5',
            borderRadius: '12px',
            padding: '1.5rem',
            textAlign: 'center',
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, ' + colors.slice(0, 2).map(function (c) { return c.hex; }).join(', ') + ')',
              margin: '0 auto 1rem',
            }} />
            <h3 style={{ marginBottom: '0.25rem', color: '#1A1A1A' }}>Jane Doe</h3>
            <p style={{ color: '#666666', fontSize: '0.875rem', marginBottom: '1rem' }}>@janedoe</p>
            <button
              onClick={function () { setIsFollowing(!isFollowing); }}
              style={{
                padding: '0.5rem 1.5rem',
                border: isFollowing ? '2px solid ' + color : 'none',
                background: isFollowing ? '#FFFFFF' : color,
                color: isFollowing ? color : '#FFFFFF',
                borderRadius: '20px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {isFollowing ? 'Following' : 'Follow'}
            </button>
          </div>
        </div>
      </div>
      <div className="demo-dark">
        <div style={{ padding: '2rem', background: '#0F0F0F' }}>
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '12px',
            padding: '1.5rem',
            textAlign: 'center',
            boxShadow: '0 0 30px ' + color + '30',
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, ' + colors.slice(0, 2).map(function (c) { return c.hex; }).join(', ') + ')',
              margin: '0 auto 1rem',
              boxShadow: '0 0 20px ' + color + '60',
            }} />
            <h3 style={{ marginBottom: '0.25rem', color: '#FFFFFF' }}>Jane Doe</h3>
            <p style={{ color: '#999999', fontSize: '0.875rem', marginBottom: '1rem' }}>@janedoe</p>
            <button
              onClick={function () { setIsFollowing(!isFollowing); }}
              style={{
                padding: '0.5rem 1.5rem',
                border: isFollowing ? '2px solid ' + color : 'none',
                background: isFollowing ? 'transparent' : color,
                color: isFollowing ? color : '#FFFFFF',
                borderRadius: '20px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: isFollowing ? 'none' : '0 0 20px ' + color + '60',
              }}
            >
              {isFollowing ? 'Following' : 'Follow'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChatBubbleDemo(props: { colors: ColorPaletteColor[] }) {
  var colors = props.colors;
  var gradient = colors.slice(0, 2).map(function (c) { return c.hex; }).join(', ');
  
  return (
    <div className="demo-container demo-container--light-dark">
      <div className="demo-light">
        <div style={{ padding: '2rem', background: '#FFFFFF' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ alignSelf: 'flex-start', maxWidth: '80%' }}>
              <div style={{
                background: '#E5E5E5',
                padding: '0.75rem 1rem',
                borderRadius: '12px 12px 12px 0',
                color: '#1A1A1A',
              }}>
                Hey! How are you doing?
              </div>
            </div>
            <div style={{ alignSelf: 'flex-end', maxWidth: '80%' }}>
              <div style={{
                background: 'linear-gradient(135deg, ' + gradient + ')',
                padding: '0.75rem 1rem',
                borderRadius: '12px 12px 0 12px',
                color: '#FFFFFF',
              }}>
                Great! Working on some designs
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="demo-dark">
        <div style={{ padding: '2rem', background: '#0F0F0F' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ alignSelf: 'flex-start', maxWidth: '80%' }}>
              <div style={{
                background: 'rgba(255,255,255,0.1)',
                padding: '0.75rem 1rem',
                borderRadius: '12px 12px 12px 0',
                color: '#FFFFFF',
                border: '1px solid rgba(255,255,255,0.2)',
              }}>
                Hey! How are you doing?
              </div>
            </div>
            <div style={{ alignSelf: 'flex-end', maxWidth: '80%' }}>
              <div style={{
                background: 'linear-gradient(135deg, ' + gradient + ')',
                padding: '0.75rem 1rem',
                borderRadius: '12px 12px 0 12px',
                color: '#FFFFFF',
                boxShadow: '0 0 20px ' + colors[0].hex + '60',
              }}>
                Great! Working on some designs
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RatingDemo(props: { colors: ColorPaletteColor[] }) {
  var colors = props.colors;
  var stateVar = React.useState(4);
  var rating = stateVar[0];
  var setRating = stateVar[1];
  var color = colors[0] != null ? colors[0].hex : '#FFED4E';
  
  return (
    <div className="demo-container demo-container--light-dark">
      <div className="demo-light">
        <div style={{ padding: '3rem 2rem', background: '#FFFFFF', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            {[1, 2, 3, 4, 5].map(function (star) {
              return (
                <button
                  key={star}
                  onClick={function () { setRating(star); }}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '2rem',
                    color: star <= rating ? color : '#E5E5E5',
                    transition: 'all 0.2s ease',
                  }}
                >
                  ★
                </button>
              );
            })}
          </div>
          <p style={{ color: '#666666' }}>{rating} out of 5 stars</p>
        </div>
      </div>
      <div className="demo-dark">
        <div style={{ padding: '3rem 2rem', background: '#0F0F0F', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            {[1, 2, 3, 4, 5].map(function (star) {
              return (
                <button
                  key={star}
                  onClick={function () { setRating(star); }}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '2rem',
                    color: star <= rating ? color : 'rgba(255,255,255,0.2)',
                    transition: 'all 0.2s ease',
                    textShadow: star <= rating ? '0 0 15px ' + color : 'none',
                  }}
                >
                  ★
                </button>
              );
            })}
          </div>
          <p style={{ color: '#999999' }}>{rating} out of 5 stars</p>
        </div>
      </div>
    </div>
  );
}

function CalendarDemo(props: { colors: ColorPaletteColor[] }) {
  var colors = props.colors;
  var color = colors[0] != null ? colors[0].hex : '#BE00FE';
  var days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  var dates = [28, 29, 30, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  
  return (
    <div className="demo-container demo-container--light-dark">
      <div className="demo-light">
        <div style={{ padding: '2rem', background: '#FFFFFF' }}>
          <div style={{ background: '#F5F5F5', borderRadius: '12px', padding: '1.5rem', border: '1px solid #E5E5E5' }}>
            <h3 style={{ textAlign: 'center', marginBottom: '1rem', color: '#1A1A1A' }}>March 2026</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.5rem', marginBottom: '0.5rem' }}>
              {days.map(function (day, i) {
                return (
                  <div key={i} style={{ textAlign: 'center', fontWeight: 600, color: '#666666', fontSize: '0.875rem' }}>
                    {day}
                  </div>
                );
              })}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.5rem' }}>
              {dates.map(function (date, i) {
                var isToday = date === 5;
                return (
                  <div
                    key={i}
                    style={{
                      aspectRatio: '1',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '8px',
                      background: isToday ? color : 'transparent',
                      color: isToday ? '#FFFFFF' : date < 28 ? '#1A1A1A' : '#CCCCCC',
                      fontWeight: isToday ? 600 : 400,
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                    }}
                  >
                    {date}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="demo-dark">
        <div style={{ padding: '2rem', background: '#0F0F0F' }}>
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '12px',
            padding: '1.5rem',
            border: '1px solid rgba(255,255,255,0.1)',
          }}>
            <h3 style={{ textAlign: 'center', marginBottom: '1rem', color: '#FFFFFF' }}>March 2026</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.5rem', marginBottom: '0.5rem' }}>
              {days.map(function (day, i) {
                return (
                  <div key={i} style={{ textAlign: 'center', fontWeight: 600, color: '#999999', fontSize: '0.875rem' }}>
                    {day}
                  </div>
                );
              })}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.5rem' }}>
              {dates.map(function (date, i) {
                var isToday = date === 5;
                return (
                  <div
                    key={i}
                    style={{
                      aspectRatio: '1',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '8px',
                      background: isToday ? color : 'transparent',
                      color: isToday ? '#FFFFFF' : date < 28 ? '#FFFFFF' : 'rgba(255,255,255,0.3)',
                      fontWeight: isToday ? 600 : 400,
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      boxShadow: isToday ? '0 0 20px ' + color + '60' : 'none',
                    }}
                  >
                    {date}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function KanbanDemo(props: { colors: ColorPaletteColor[] }) {
  var colors = props.colors;
  var columns = ['To Do', 'In Progress', 'Done'];
  
  return (
    <div className="demo-container demo-container--light-dark">
      <div className="demo-light">
        <div style={{ padding: '2rem', background: '#F5F5F5', overflowX: 'auto' }}>
          <div style={{ display: 'flex', gap: '1rem', minWidth: '600px' }}>
            {columns.map(function (column, index) {
              var color = colors[index] != null ? colors[index].hex : colors[0].hex;
              return (
                <div key={column} style={{ flex: 1, minWidth: '180px' }}>
                  <div style={{
                    background: '#FFFFFF',
                    borderRadius: '8px',
                    padding: '1rem',
                    border: '2px solid ' + color,
                  }}>
                    <h4 style={{ marginBottom: '1rem', color: color, fontWeight: 600 }}>{column}</h4>
                    <div style={{
                      background: '#F5F5F5',
                      borderRadius: '6px',
                      padding: '0.75rem',
                      marginBottom: '0.5rem',
                      fontSize: '0.875rem',
                      color: '#1A1A1A',
                    }}>
                      Task {index + 1}
                    </div>
                    <div style={{
                      background: '#F5F5F5',
                      borderRadius: '6px',
                      padding: '0.75rem',
                      fontSize: '0.875rem',
                      color: '#1A1A1A',
                    }}>
                      Task {index + 2}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="demo-dark">
        <div style={{ padding: '2rem', background: '#0F0F0F', overflowX: 'auto' }}>
          <div style={{ display: 'flex', gap: '1rem', minWidth: '600px' }}>
            {columns.map(function (column, index) {
              var color = colors[index] != null ? colors[index].hex : colors[0].hex;
              return (
                <div key={column} style={{ flex: 1, minWidth: '180px' }}>
                  <div style={{
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: '8px',
                    padding: '1rem',
                    border: '2px solid ' + color,
                    boxShadow: '0 0 20px ' + color + '40',
                  }}>
                    <h4 style={{ marginBottom: '1rem', color: color, fontWeight: 600 }}>{column}</h4>
                    <div style={{
                      background: 'rgba(255,255,255,0.08)',
                      borderRadius: '6px',
                      padding: '0.75rem',
                      marginBottom: '0.5rem',
                      fontSize: '0.875rem',
                      color: '#FFFFFF',
                      border: '1px solid rgba(255,255,255,0.1)',
                    }}>
                      Task {index + 1}
                    </div>
                    <div style={{
                      background: 'rgba(255,255,255,0.08)',
                      borderRadius: '6px',
                      padding: '0.75rem',
                      fontSize: '0.875rem',
                      color: '#FFFFFF',
                      border: '1px solid rgba(255,255,255,0.1)',
                    }}>
                      Task {index + 2}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function TestimonialDemo(props: { colors: ColorPaletteColor[] }) {
  var colors = props.colors;
  var gradient = colors.slice(0, 2).map(function (c) { return c.hex; }).join(', ');
  
  return (
    <div className="demo-container demo-container--light-dark">
      <div className="demo-light">
        <div style={{ padding: '2rem', background: '#FFFFFF' }}>
          <div style={{
            background: '#F5F5F5',
            borderRadius: '12px',
            padding: '2rem',
            position: 'relative',
            border: '1px solid #E5E5E5',
          }}>
            <div style={{
              fontSize: '3rem',
              color: colors[0].hex,
              lineHeight: 1,
              marginBottom: '1rem',
            }}>
              "
            </div>
            <p style={{ color: '#1A1A1A', fontSize: '1.125rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              This product completely changed how we work. Highly recommended!
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, ' + gradient + ')',
              }} />
              <div>
                <div style={{ fontWeight: 600, color: '#1A1A1A' }}>Sarah Johnson</div>
                <div style={{ fontSize: '0.875rem', color: '#666666' }}>CEO, TechCorp</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="demo-dark">
        <div style={{ padding: '2rem', background: '#0F0F0F' }}>
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '12px',
            padding: '2rem',
            position: 'relative',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 0 30px ' + colors[0].hex + '30',
          }}>
            <div style={{
              fontSize: '3rem',
              color: colors[0].hex,
              lineHeight: 1,
              marginBottom: '1rem',
              textShadow: '0 0 15px ' + colors[0].hex,
            }}>
              "
            </div>
            <p style={{ color: '#FFFFFF', fontSize: '1.125rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              This product completely changed how we work. Highly recommended!
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, ' + gradient + ')',
                boxShadow: '0 0 20px ' + colors[0].hex + '60',
              }} />
              <div>
                <div style={{ fontWeight: 600, color: '#FFFFFF' }}>Sarah Johnson</div>
                <div style={{ fontSize: '0.875rem', color: '#999999' }}>CEO, TechCorp</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureGridDemo(props: { colors: ColorPaletteColor[] }) {
  var colors = props.colors;
  var features = ['Fast', 'Secure', 'Scalable', 'Reliable'];
  
  return (
    <div className="demo-container demo-container--light-dark">
      <div className="demo-light">
        <div style={{ padding: '2rem', background: '#FFFFFF' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
            {features.map(function (feature, index) {
              var color = colors[index] != null ? colors[index].hex : colors[0].hex;
              return (
                <div key={feature} style={{
                  background: '#F5F5F5',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  textAlign: 'center',
                  border: '2px solid ' + color,
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: color,
                    margin: '0 auto 1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF',
                    fontSize: '1.5rem',
                  }}>
                    ✓
                  </div>
                  <h4 style={{ color: color, fontWeight: 600 }}>{feature}</h4>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="demo-dark">
        <div style={{ padding: '2rem', background: '#0F0F0F' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
            {features.map(function (feature, index) {
              var color = colors[index] != null ? colors[index].hex : colors[0].hex;
              return (
                <div key={feature} style={{
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  textAlign: 'center',
                  border: '2px solid ' + color,
                  boxShadow: '0 0 25px ' + color + '40',
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: color,
                    margin: '0 auto 1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF',
                    fontSize: '1.5rem',
                    boxShadow: '0 0 20px ' + color + '80',
                  }}>
                    ✓
                  </div>
                  <h4 style={{ color: color, fontWeight: 600 }}>{feature}</h4>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function FileUploadDemo(props: { colors: ColorPaletteColor[] }) {
  var colors = props.colors;
  var gradient = colors.slice(0, 2).map(function (c) { return c.hex; }).join(', ');
  
  return (
    <div className="demo-container demo-container--light-dark">
      <div className="demo-light">
        <div style={{ padding: '2rem', background: '#FFFFFF' }}>
          <div style={{
            border: '2px dashed ' + colors[0].hex,
            borderRadius: '12px',
            padding: '3rem 2rem',
            textAlign: 'center',
            background: colors[0].hex + '10',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📁</div>
            <h4 style={{ color: colors[0].hex, marginBottom: '0.5rem' }}>Drop files here</h4>
            <p style={{ color: '#666666', fontSize: '0.875rem' }}>or click to browse</p>
          </div>
        </div>
      </div>
      <div className="demo-dark">
        <div style={{ padding: '2rem', background: '#0F0F0F' }}>
          <div style={{
            border: '2px dashed ' + colors[0].hex,
            borderRadius: '12px',
            padding: '3rem 2rem',
            textAlign: 'center',
            background: colors[0].hex + '20',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: '0 0 30px ' + colors[0].hex + '40',
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📁</div>
            <h4 style={{ color: colors[0].hex, marginBottom: '0.5rem', textShadow: '0 0 10px ' + colors[0].hex }}>Drop files here</h4>
            <p style={{ color: '#999999', fontSize: '0.875rem' }}>or click to browse</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CircularProgressDemo(props: { colors: ColorPaletteColor[] }) {
  var colors = props.colors;
  var gradient = colors.slice(0, 2).map(function (c) { return c.hex; }).join(', ');
  var percentage = 75;
  
  return (
    <div className="demo-container demo-container--light-dark">
      <div className="demo-light">
        <div style={{ padding: '3rem 2rem', background: '#FFFFFF', textAlign: 'center' }}>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <svg width="120" height="120" style={{ transform: 'rotate(-90deg)' }}>
              <circle cx="60" cy="60" r="50" fill="none" stroke="#E5E5E5" strokeWidth="10" />
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke={colors[0].hex}
                strokeWidth="10"
                strokeDasharray={'calc(2 * 3.14159 * 50)'}
                strokeDashoffset={'calc(2 * 3.14159 * 50 * (1 - ' + percentage / 100 + '))'}
                strokeLinecap="round"
              />
            </svg>
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: '1.5rem',
              fontWeight: 700,
              color: colors[0].hex,
            }}>
              {percentage}%
            </div>
          </div>
        </div>
      </div>
      <div className="demo-dark">
        <div style={{ padding: '3rem 2rem', background: '#0F0F0F', textAlign: 'center' }}>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <svg width="120" height="120" style={{ transform: 'rotate(-90deg)', filter: 'drop-shadow(0 0 15px ' + colors[0].hex + ')' }}>
              <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="10" />
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke={colors[0].hex}
                strokeWidth="10"
                strokeDasharray={'calc(2 * 3.14159 * 50)'}
                strokeDashoffset={'calc(2 * 3.14159 * 50 * (1 - ' + percentage / 100 + '))'}
                strokeLinecap="round"
              />
            </svg>
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: '1.5rem',
              fontWeight: 700,
              color: colors[0].hex,
              textShadow: '0 0 15px ' + colors[0].hex,
            }}>
              {percentage}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StepperDemo(props: { colors: ColorPaletteColor[] }) {
  var colors = props.colors;
  var stateVar = React.useState(1);
  var currentStep = stateVar[0];
  var setCurrentStep = stateVar[1];
  var steps = ['Account', 'Profile', 'Confirm'];
  
  return (
    <div className="demo-container demo-container--light-dark">
      <div className="demo-light">
        <div style={{ padding: '2rem', background: '#FFFFFF' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '10%',
              right: '10%',
              height: '2px',
              background: '#E5E5E5',
              zIndex: 0,
            }}>
              <div style={{
                width: ((currentStep) / (steps.length - 1)) * 100 + '%',
                height: '100%',
                background: 'linear-gradient(90deg, ' + colors.slice(0, 2).map(function (c) { return c.hex; }).join(', ') + ')',
                transition: 'width 0.3s ease',
              }} />
            </div>
            {steps.map(function (step, index) {
              var isCompleted = index < currentStep;
              var isActive = index === currentStep;
              var color = colors[index] != null ? colors[index].hex : colors[0].hex;
              return (
                <div key={step} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 1 }}>
                  <button
                    onClick={function () { setCurrentStep(index); }}
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      border: '2px solid ' + (isActive || isCompleted ? color : '#E5E5E5'),
                      background: isActive || isCompleted ? color : '#FFFFFF',
                      color: isActive || isCompleted ? '#FFFFFF' : '#CCCCCC',
                      fontWeight: 600,
                      cursor: 'pointer',
                      marginBottom: '0.5rem',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {isCompleted ? '✓' : index + 1}
                  </button>
                  <span style={{ fontSize: '0.875rem', color: isActive ? color : '#666666', fontWeight: isActive ? 600 : 400 }}>
                    {step}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="demo-dark">
        <div style={{ padding: '2rem', background: '#0F0F0F' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '10%',
              right: '10%',
              height: '2px',
              background: 'rgba(255,255,255,0.1)',
              zIndex: 0,
            }}>
              <div style={{
                width: ((currentStep) / (steps.length - 1)) * 100 + '%',
                height: '100%',
                background: 'linear-gradient(90deg, ' + colors.slice(0, 2).map(function (c) { return c.hex; }).join(', ') + ')',
                transition: 'width 0.3s ease',
                boxShadow: '0 0 10px ' + colors[0].hex,
              }} />
            </div>
            {steps.map(function (step, index) {
              var isCompleted = index < currentStep;
              var isActive = index === currentStep;
              var color = colors[index] != null ? colors[index].hex : colors[0].hex;
              return (
                <div key={step} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 1 }}>
                  <button
                    onClick={function () { setCurrentStep(index); }}
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      border: '2px solid ' + (isActive || isCompleted ? color : 'rgba(255,255,255,0.2)'),
                      background: isActive || isCompleted ? color : 'rgba(255,255,255,0.05)',
                      color: isActive || isCompleted ? '#FFFFFF' : 'rgba(255,255,255,0.4)',
                      fontWeight: 600,
                      cursor: 'pointer',
                      marginBottom: '0.5rem',
                      transition: 'all 0.2s ease',
                      boxShadow: isActive || isCompleted ? '0 0 20px ' + color + '80' : 'none',
                    }}
                  >
                    {isCompleted ? '✓' : index + 1}
                  </button>
                  <span style={{ fontSize: '0.875rem', color: isActive ? color : '#999999', fontWeight: isActive ? 600 : 400 }}>
                    {step}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function AvatarGroupDemo(props: { colors: ColorPaletteColor[] }) {
  var colors = props.colors;
  
  return (
    <div className="demo-container demo-container--light-dark">
      <div className="demo-light">
        <div style={{ padding: '3rem 2rem', background: '#FFFFFF' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {colors.slice(0, 4).map(function (color, index) {
              return (
                <div
                  key={index}
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: color.hex,
                    border: '3px solid #FFFFFF',
                    marginLeft: index > 0 ? '-12px' : '0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF',
                    fontWeight: 600,
                    fontSize: '1.125rem',
                    zIndex: 4 - index,
                    position: 'relative',
                  }}
                >
                  {String.fromCharCode(65 + index)}
                </div>
              );
            })}
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: '#E5E5E5',
              border: '3px solid #FFFFFF',
              marginLeft: '-12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#666666',
              fontWeight: 600,
              fontSize: '0.875rem',
            }}>
              +5
            </div>
          </div>
        </div>
      </div>
      <div className="demo-dark">
        <div style={{ padding: '3rem 2rem', background: '#0F0F0F' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {colors.slice(0, 4).map(function (color, index) {
              return (
                <div
                  key={index}
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: color.hex,
                    border: '3px solid #0F0F0F',
                    marginLeft: index > 0 ? '-12px' : '0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF',
                    fontWeight: 600,
                    fontSize: '1.125rem',
                    zIndex: 4 - index,
                    position: 'relative',
                    boxShadow: '0 0 15px ' + color.hex + '60',
                  }}
                >
                  {String.fromCharCode(65 + index)}
                </div>
              );
            })}
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.1)',
              border: '3px solid #0F0F0F',
              marginLeft: '-12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              fontWeight: 600,
              fontSize: '0.875rem',
            }}>
              +5
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DropdownDemo(props: { colors: ColorPaletteColor[] }) {
  var colors = props.colors;
  var stateVar = React.useState(false);
  var isOpen = stateVar[0];
  var setIsOpen = stateVar[1];
  var color = colors[0] != null ? colors[0].hex : '#BE00FE';
  var options = ['Option 1', 'Option 2', 'Option 3'];
  
  return (
    <div className="demo-container demo-container--light-dark">
      <div className="demo-light">
        <div style={{ padding: '3rem 2rem', background: '#FFFFFF', position: 'relative' }}>
          <button
            onClick={function () { setIsOpen(!isOpen); }}
            style={{
              padding: '0.75rem 1.5rem',
              background: '#FFFFFF',
              border: '2px solid ' + color,
              borderRadius: '8px',
              color: color,
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              width: '100%',
              justifyContent: 'space-between',
            }}
          >
            Select an option
            <span>{isOpen ? '▲' : '▼'}</span>
          </button>
          {isOpen && (
            <div style={{
              position: 'absolute',
              top: 'calc(100% - 2rem)',
              left: '2rem',
              right: '2rem',
              background: '#FFFFFF',
              border: '2px solid ' + color,
              borderRadius: '8px',
              boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
              zIndex: 10,
            }}>
              {options.map(function (option, index) {
                return (
                  <div
                    key={index}
                    style={{
                      padding: '0.75rem 1.5rem',
                      cursor: 'pointer',
                      color: '#1A1A1A',
                      borderBottom: index < options.length - 1 ? '1px solid #E5E5E5' : 'none',
                    }}
                  >
                    {option}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <div className="demo-dark">
        <div style={{ padding: '3rem 2rem', background: '#0F0F0F', position: 'relative' }}>
          <button
            onClick={function () { setIsOpen(!isOpen); }}
            style={{
              padding: '0.75rem 1.5rem',
              background: 'rgba(255,255,255,0.05)',
              border: '2px solid ' + color,
              borderRadius: '8px',
              color: color,
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              width: '100%',
              justifyContent: 'space-between',
              boxShadow: '0 0 20px ' + color + '40',
            }}
          >
            Select an option
            <span>{isOpen ? '▲' : '▼'}</span>
          </button>
          {isOpen && (
            <div style={{
              position: 'absolute',
              top: 'calc(100% - 2rem)',
              left: '2rem',
              right: '2rem',
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              border: '2px solid ' + color,
              borderRadius: '8px',
              boxShadow: '0 0 40px ' + color + '60, 0 8px 20px rgba(0,0,0,0.4)',
              zIndex: 10,
            }}>
              {options.map(function (option, index) {
                return (
                  <div
                    key={index}
                    style={{
                      padding: '0.75rem 1.5rem',
                      cursor: 'pointer',
                      color: '#FFFFFF',
                      borderBottom: index < options.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none',
                    }}
                  >
                    {option}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SparkleDemo(props: { colors: ColorPaletteColor[] }) {
  var colors = props.colors;
  
  return (
    <div className="demo-container demo-container--light-dark">
      <div className="demo-light">
        <div style={{ padding: '4rem 2rem', background: '#FFFFFF', position: 'relative', overflow: 'hidden' }}>
          {colors.slice(0, 12).map(function (color, index) {
            var left = Math.random() * 100;
            var top = Math.random() * 100;
            var delay = Math.random() * 2;
            return (
              <div
                key={index}
                className="demo-sparkle-twinkle"
                style={{
                  position: 'absolute',
                  left: left + '%',
                  top: top + '%',
                  width: '8px',
                  height: '8px',
                  background: color.hex,
                  borderRadius: '50%',
                  animationDelay: delay + 's',
                }}
              />
            );
          })}
          <h2 style={{ textAlign: 'center', color: '#1A1A1A', position: 'relative', zIndex: 1 }}>✨ Sparkle Effect</h2>
        </div>
      </div>
      <div className="demo-dark">
        <div style={{ padding: '4rem 2rem', background: '#0F0F0F', position: 'relative', overflow: 'hidden' }}>
          {colors.slice(0, 12).map(function (color, index) {
            var left = Math.random() * 100;
            var top = Math.random() * 100;
            var delay = Math.random() * 2;
            return (
              <div
                key={index}
                className="demo-sparkle-twinkle"
                style={{
                  position: 'absolute',
                  left: left + '%',
                  top: top + '%',
                  width: '8px',
                  height: '8px',
                  background: color.hex,
                  borderRadius: '50%',
                  animationDelay: delay + 's',
                  boxShadow: '0 0 10px ' + color.hex + ', 0 0 20px ' + color.hex,
                }}
              />
            );
          })}
          <h2 style={{ textAlign: 'center', color: '#FFFFFF', position: 'relative', zIndex: 1 }}>✨ Sparkle Effect</h2>
        </div>
      </div>
    </div>
  );
}

function GlassmorphismDemo(props: { colors: ColorPaletteColor[] }) {
  var colors = props.colors;
  var gradient = colors.slice(0, 3).map(function (c) { return c.hex; }).join(', ');
  
  return (
    <div className="demo-container demo-container--light-dark">
      <div className="demo-light">
        <div style={{
          padding: '4rem 2rem',
          background: 'linear-gradient(135deg, ' + gradient + ')',
          position: 'relative',
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.25)',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            padding: '2rem',
            border: '1px solid rgba(255, 255, 255, 0.5)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          }}>
            <h3 style={{ color: '#1A1A1A', marginBottom: '0.5rem' }}>Glassmorphism Card</h3>
            <p style={{ color: '#333333', opacity: 0.9 }}>Frosted glass effect with backdrop blur</p>
          </div>
        </div>
      </div>
      <div className="demo-dark">
        <div style={{
          padding: '4rem 2rem',
          background: 'linear-gradient(135deg, ' + gradient + ')',
          position: 'relative',
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            padding: '2rem',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 0 40px ' + colors[0].hex + '60, 0 8px 32px rgba(0, 0, 0, 0.4)',
          }}>
            <h3 style={{ color: '#FFFFFF', marginBottom: '0.5rem' }}>Glassmorphism Card</h3>
            <p style={{ color: '#FFFFFF', opacity: 0.9 }}>Frosted glass effect with backdrop blur</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function GenericPaletteDemo(props: { colors: ColorPaletteColor[]; ideaText: string }) {
  var colors = props.colors;
  var ideaText = props.ideaText;
  
  return (
    <div style={{ padding: '2rem', backgroundColor: '#0F0F0F', borderRadius: '8px' }}>
      <p style={{ color: '#FFFFFF', marginBottom: '2rem', textAlign: 'center', opacity: 0.8 }}>
        {ideaText}
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
        {colors.map(function (color, index) {
          return (
            <div key={color.hex} style={{
              backgroundColor: color.hex + '20',
              border: '2px solid ' + color.hex,
              borderRadius: '12px',
              padding: '2rem 1rem',
              textAlign: 'center',
              boxShadow: '0 0 25px ' + color.hex + '40',
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                backgroundColor: color.hex,
                borderRadius: '50%',
                margin: '0 auto 1rem',
                boxShadow: '0 0 20px ' + color.hex + '80',
              }} />
              <h4 style={{ color: color.hex, fontSize: '1.125rem', fontWeight: 600 }}>
                {color.name}
              </h4>
            </div>
          );
        })}
      </div>
    </div>
  );
}
