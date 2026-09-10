/**
 * Style Guide Page
 * Comprehensive design system documentation showing all brand colors,
 * typography, components, icons, and UI patterns used across the site.
 */

import React, { useEffect, useState } from 'react';
import { useNavigate } from '../../lib/router';
import {
  House,
  BookOpen,
  ArrowRight,
  Play,
  Tag,
  MagnifyingGlass,
  Shuffle,
  X,
  Moon,
  Sun,
  Envelope,
  Check,
  Link as LinkIcon,
  WifiHigh,
  WifiSlash,
  DownloadSimple,
  Warning,
  ArrowsClockwise,
  Clock,
  ArrowLeft,
  Microphone,
  Newspaper,
  Heart,
  FileText,
  Confetti,
  MapPin,
  SpotifyLogo,
  SoundcloudLogo,
  Playlist,
  Record,
  MusicNotes,
  PlayCircle,
  Headphones,
  ArrowSquareOut,
  SlidersHorizontal,
  CaretDown,
  ShareNetwork,
  Wrench,
  Code,
  Stack,
  PaintBrush,
  Palette,
  TextAa,
  Cube,
  SquaresFour,
  Lightning,
  CircleHalf,
  Copy,
  ChatCircle,
} from "@phosphor-icons/react";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";

import '../../../styles/blocks/style-guide-page.css';

interface ColorSwatch {
  name: string;
  variable: string;
  hex: string;
  description: string;
}

interface IconItem {
  name: string;
  component: PhosphorIcon;
  category: string;
}

export function StyleGuidePage() {
  var navigate = useNavigate();
  var [copiedColor, setCopiedColor] = useState<string | null>(null);
  var [iconSearchQuery, setIconSearchQuery] = useState('');
  var [activeSection, setActiveSection] = useState('brand');

  useEffect(function() {
    document.title = 'Style Guide — Nova News';
    window.scrollTo(0, 0);
  }, []);

  // Color palette data
  var colorPalette: ColorSwatch[] = [
    {
      name: 'Atomic Black',
      variable: '--wp--preset--color--atomic-black',
      hex: '#0F0F0F',
      description: 'Primary background color for dark mode'
    },
    {
      name: 'Dark Charcoal',
      variable: '--wp--preset--color--dark-charcoal',
      hex: '#12121A',
      description: 'Secondary background for panels'
    },
    {
      name: 'Dark Panel',
      variable: '--wp--preset--color--dark-panel',
      hex: '#171722',
      description: 'Elevated surface background'
    },
    {
      name: 'Neon Pink',
      variable: '--wp--preset--color--neon-pink',
      hex: '#FF10F0',
      description: 'Primary brand color - main CTAs and accents'
    },
    {
      name: 'Neon Yellow',
      variable: '--wp--preset--color--neon-yellow',
      hex: '#F4FF3C',
      description: 'Secondary accent - highlights and warnings'
    },
    {
      name: 'Neon Magenta',
      variable: '--wp--preset--color--neon-magenta',
      hex: '#D4008C',
      description: 'Gradient accent color'
    },
    {
      name: 'UV Violet',
      variable: '--wp--preset--color--uv-violet',
      hex: '#8A63FF',
      description: 'Tertiary accent - special highlights'
    },
    {
      name: 'Text Light',
      variable: '--wp--preset--color--text-light',
      hex: '#F6F2EB',
      description: 'Primary text color in dark mode'
    },
    {
      name: 'Text Muted',
      variable: '--wp--preset--color--text-muted',
      hex: '#CFC7BB',
      description: 'Secondary text - less emphasis'
    },
    {
      name: 'Text Fine',
      variable: '--wp--preset--color--text-fine',
      hex: '#9C9488',
      description: 'Tertiary text - minimal emphasis'
    },
    {
      name: 'Light Gray',
      variable: '--wp--preset--color--light-gray',
      hex: '#F0F0F0',
      description: 'Light mode background'
    },
    {
      name: 'Lighter Gray',
      variable: '--wp--preset--color--lighter-gray',
      hex: '#FAFAFA',
      description: 'Light mode elevated background'
    },
  ];

  // All icons currently in use on the site
  var allIcons: IconItem[] = [
    // Navigation
    { name: 'House', component: House, category: 'Navigation' },
    { name: 'ArrowRight', component: ArrowRight, category: 'Navigation' },
    { name: 'ArrowLeft', component: ArrowLeft, category: 'Navigation' },
    { name: 'ArrowSquareOut', component: ArrowSquareOut, category: 'Navigation' },
    { name: 'CaretDown', component: CaretDown, category: 'Navigation' },
    
    // Content
    { name: 'BookOpen', component: BookOpen, category: 'Content' },
    { name: 'FileText', component: FileText, category: 'Content' },
    { name: 'Newspaper', component: Newspaper, category: 'Content' },
    { name: 'Code', component: Code, category: 'Content' },
    { name: 'ChatCircle', component: ChatCircle, category: 'Content' },
    
    // Media
    { name: 'Play', component: Play, category: 'Media' },
    { name: 'PlayCircle', component: PlayCircle, category: 'Media' },
    { name: 'Microphone', component: Microphone, category: 'Media' },
    { name: 'Headphones', component: Headphones, category: 'Media' },
    { name: 'Record', component: Record, category: 'Media' },
    { name: 'MusicNotes', component: MusicNotes, category: 'Media' },
    { name: 'Playlist', component: Playlist, category: 'Media' },
    { name: 'SpotifyLogo', component: SpotifyLogo, category: 'Media' },
    { name: 'SoundcloudLogo', component: SoundcloudLogo, category: 'Media' },
    
    // UI Controls
    { name: 'X', component: X, category: 'UI Controls' },
    { name: 'Check', component: Check, category: 'UI Controls' },
    { name: 'MagnifyingGlass', component: MagnifyingGlass, category: 'UI Controls' },
    { name: 'Shuffle', component: Shuffle, category: 'UI Controls' },
    { name: 'SlidersHorizontal', component: SlidersHorizontal, category: 'UI Controls' },
    { name: 'Copy', component: Copy, category: 'UI Controls' },
    
    // Theme & Settings
    { name: 'Moon', component: Moon, category: 'Theme' },
    { name: 'Sun', component: Sun, category: 'Theme' },
    { name: 'CircleHalf', component: CircleHalf, category: 'Theme' },
    { name: 'Wrench', component: Wrench, category: 'Theme' },
    
    // Communication
    { name: 'Envelope', component: Envelope, category: 'Communication' },
    { name: 'ShareNetwork', component: ShareNetwork, category: 'Communication' },
    { name: 'LinkIcon', component: LinkIcon, category: 'Communication' },
    
    // Status & Feedback
    { name: 'Warning', component: Warning, category: 'Status' },
    { name: 'ArrowsClockwise', component: ArrowsClockwise, category: 'Status' },
    { name: 'WifiHigh', component: WifiHigh, category: 'Status' },
    { name: 'WifiSlash', component: WifiSlash, category: 'Status' },
    { name: 'DownloadSimple', component: DownloadSimple, category: 'Status' },
    
    // Organization
    { name: 'Tag', component: Tag, category: 'Organization' },
    { name: 'Clock', component: Clock, category: 'Organization' },
    { name: 'MapPin', component: MapPin, category: 'Organization' },
    { name: 'Heart', component: Heart, category: 'Organization' },
    { name: 'Confetti', component: Confetti, category: 'Organization' },
    
    // Design System
    { name: 'Stack', component: Stack, category: 'Design System' },
    { name: 'PaintBrush', component: PaintBrush, category: 'Design System' },
    { name: 'Palette', component: Palette, category: 'Design System' },
    { name: 'TextAa', component: TextAa, category: 'Design System' },
    { name: 'Cube', component: Cube, category: 'Design System' },
    { name: 'SquaresFour', component: SquaresFour, category: 'Design System' },
    { name: 'Lightning', component: Lightning, category: 'Design System' },
  ];

  // Filter icons based on search
  var filteredIcons = allIcons;
  if (iconSearchQuery.trim() !== '') {
    var lowerQuery = iconSearchQuery.toLowerCase();
    filteredIcons = allIcons.filter(function(icon) {
      var nameMatch = icon.name.toLowerCase().indexOf(lowerQuery) !== -1;
      var categoryMatch = icon.category.toLowerCase().indexOf(lowerQuery) !== -1;
      return nameMatch || categoryMatch;
    });
  }

  // Group icons by category
  var iconsByCategory: { [key: string]: IconItem[] } = {};
  for (var i = 0; i < filteredIcons.length; i++) {
    var icon = filteredIcons[i];
    if (!iconsByCategory[icon.category]) {
      iconsByCategory[icon.category] = [];
    }
    iconsByCategory[icon.category].push(icon);
  }

  function copyToClipboard(text: string, colorName: string) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function() {
        setCopiedColor(colorName);
        setTimeout(function() {
          setCopiedColor(null);
        }, 2000);
      });
    }
  }

  function scrollToSection(sectionId: string) {
    var element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  }

  return React.createElement(
    'main',
    { id: 'main-content', role: 'main', className: 'style-guide-page' },
    
    // Header Section
    React.createElement(
      'section',
      { className: 'style-guide-page__header section section--dark' },
      React.createElement(
        'div',
        { className: 'style-guide-page__header-content' },
        React.createElement('p', { className: 'eyebrow' }, '⚡ Design System'),
        React.createElement('h1', { className: 'style-guide-page__title' }, 'Style Guide'),
        React.createElement('p', { className: 'style-guide-page__subtitle' }, 
          'Complete documentation of the Nova News design system: 80s neon CLI aesthetic with retro terminal vibes'
        )
      )
    ),

    // Sidebar Navigation
    React.createElement(
      'nav',
      { className: 'style-guide-page__sidebar', 'aria-label': 'Style guide navigation' },
      React.createElement(
        'ul',
        { className: 'style-guide-page__nav-list' },
        React.createElement('li', null, 
          React.createElement('button', { 
            className: activeSection === 'brand' ? 'active' : '',
            onClick: function() { scrollToSection('brand'); }
          }, '1. Brand Identity')
        ),
        React.createElement('li', null, 
          React.createElement('button', { 
            className: activeSection === 'colors' ? 'active' : '',
            onClick: function() { scrollToSection('colors'); }
          }, '2. Color Palette')
        ),
        React.createElement('li', null, 
          React.createElement('button', { 
            className: activeSection === 'typography' ? 'active' : '',
            onClick: function() { scrollToSection('typography'); }
          }, '3. Typography')
        ),
        React.createElement('li', null, 
          React.createElement('button', { 
            className: activeSection === 'buttons' ? 'active' : '',
            onClick: function() { scrollToSection('buttons'); }
          }, '4. Buttons')
        ),
        React.createElement('li', null, 
          React.createElement('button', { 
            className: activeSection === 'forms' ? 'active' : '',
            onClick: function() { scrollToSection('forms'); }
          }, '5. Forms')
        ),
        React.createElement('li', null, 
          React.createElement('button', { 
            className: activeSection === 'cards' ? 'active' : '',
            onClick: function() { scrollToSection('cards'); }
          }, '6. Cards')
        ),
        React.createElement('li', null, 
          React.createElement('button', { 
            className: activeSection === 'tags' ? 'active' : '',
            onClick: function() { scrollToSection('tags'); }
          }, '7. Tags & Badges')
        ),
        React.createElement('li', null, 
          React.createElement('button', { 
            className: activeSection === 'icons' ? 'active' : '',
            onClick: function() { scrollToSection('icons'); }
          }, '8. Icon Library')
        ),
        React.createElement('li', null, 
          React.createElement('button', { 
            className: activeSection === 'content' ? 'active' : '',
            onClick: function() { scrollToSection('content'); }
          }, '9. Content Patterns')
        )
      )
    ),

    // Main Content
    React.createElement(
      'div',
      { className: 'style-guide-page__content' },

      // 1. Brand Identity
      React.createElement(
        'section',
        { id: 'brand', className: 'style-guide-page__section' },
        React.createElement('h2', { className: 'style-guide-page__section-title' }, '1. Brand Identity'),
        React.createElement(
          'div',
          { className: 'style-guide-page__brand' },
          React.createElement('div', { className: 'style-guide-page__logo-showcase' },
            React.createElement('h1', { className: 'header__logo' }, 'Nova News')
          ),
          React.createElement('p', { className: 'text-body' }, 
            'Nova News combines 80s neon aesthetics with modern CLI terminal design. The brand identity is built on high-contrast neon colors against deep atomic black backgrounds, creating a retro-futuristic visual language that is both nostalgic and contemporary.'
          )
        )
      ),

      // 2. Color Palette
      React.createElement(
        'section',
        { id: 'colors', className: 'style-guide-page__section' },
        React.createElement('h2', { className: 'style-guide-page__section-title' }, '2. Color Palette'),
        React.createElement('p', { className: 'text-body style-guide-page__intro' }, 
          'Click any color swatch to copy the hex code to your clipboard.'
        ),
        React.createElement(
          'div',
          { className: 'style-guide-page__color-grid' },
          colorPalette.map(function(color, index) {
            var isCopied = copiedColor === color.name;
            return React.createElement(
              'div',
              { 
                key: index,
                className: 'style-guide-page__color-swatch',
                onClick: function() { copyToClipboard(color.hex, color.name); },
                role: 'button',
                tabIndex: 0,
                'aria-label': 'Copy ' + color.hex + ' to clipboard'
              },
              React.createElement('div', { 
                className: 'style-guide-page__color-swatch-color',
                style: { backgroundColor: color.hex }
              }),
              React.createElement(
                'div',
                { className: 'style-guide-page__color-swatch-info' },
                React.createElement('h3', { className: 'style-guide-page__color-name' }, color.name),
                React.createElement('code', { className: 'style-guide-page__color-hex' }, color.hex),
                React.createElement('code', { className: 'style-guide-page__color-var' }, color.variable),
                React.createElement('p', { className: 'style-guide-page__color-desc' }, color.description),
                isCopied && React.createElement(
                  'span',
                  { className: 'style-guide-page__copied-indicator' },
                  React.createElement(Check, { size: 16 }),
                  ' Copied!'
                )
              )
            );
          })
        )
      ),

      // 3. Typography
      React.createElement(
        'section',
        { id: 'typography', className: 'style-guide-page__section' },
        React.createElement('h2', { className: 'style-guide-page__section-title' }, '3. Typography'),
        React.createElement(
          'div',
          { className: 'style-guide-page__typography' },
          
          React.createElement('div', { className: 'style-guide-page__type-specimen' },
            React.createElement('h1', null, 'Heading 1'),
            React.createElement('p', { className: 'text-fine' }, 'Vampiro One / Space Grotesk / 48–120px')
          ),
          
          React.createElement('div', { className: 'style-guide-page__type-specimen' },
            React.createElement('h2', null, 'Heading 2'),
            React.createElement('p', { className: 'text-fine' }, 'Space Grotesk / 32–64px')
          ),
          
          React.createElement('div', { className: 'style-guide-page__type-specimen' },
            React.createElement('h3', null, 'Heading 3'),
            React.createElement('p', { className: 'text-fine' }, 'Space Grotesk / 24–48px')
          ),
          
          React.createElement('div', { className: 'style-guide-page__type-specimen' },
            React.createElement('h4', null, 'Heading 4'),
            React.createElement('p', { className: 'text-fine' }, 'Space Grotesk / 20–32px')
          ),
          
          React.createElement('div', { className: 'style-guide-page__type-specimen' },
            React.createElement('p', { className: 'text-body' }, 'Body text uses Space Grotesk at 16–20px with 1.6 line height for optimal readability. This is the standard paragraph text used throughout the site for main content.'),
            React.createElement('p', { className: 'text-fine' }, 'Space Grotesk / 16–20px / Line height 1.6')
          ),
          
          React.createElement('div', { className: 'style-guide-page__type-specimen' },
            React.createElement('code', null, 'Code and terminal text'),
            React.createElement('p', { className: 'text-fine' }, 'Space Mono / Monospace / 14–16px')
          ),
          
          React.createElement('div', { className: 'style-guide-page__type-specimen' },
            React.createElement('p', { className: 'eyebrow' }, '⚡ Eyebrow text'),
            React.createElement('p', { className: 'text-fine' }, 'Space Grotesk / 12–14px / Uppercase / Letter spacing 1px')
          )
        )
      ),

      // 4. Buttons
      React.createElement(
        'section',
        { id: 'buttons', className: 'style-guide-page__section' },
        React.createElement('h2', { className: 'style-guide-page__section-title' }, '4. Buttons'),
        React.createElement(
          'div',
          { className: 'style-guide-page__component-showcase' },
          
          React.createElement('div', { className: 'style-guide-page__component-group' },
            React.createElement('h3', null, 'Primary Button'),
            React.createElement('button', { className: 'button button--primary' }, 'Primary Action'),
            React.createElement('p', { className: 'text-fine' }, 'Pink to purple gradient with glow effect')
          ),
          
          React.createElement('div', { className: 'style-guide-page__component-group' },
            React.createElement('h3', null, 'Secondary Button'),
            React.createElement('button', { className: 'button button--secondary' }, 'Secondary Action'),
            React.createElement('p', { className: 'text-fine' }, 'Yellow border with hover glow')
          ),
          
          React.createElement('div', { className: 'style-guide-page__component-group' },
            React.createElement('h3', null, 'Button with Icon'),
            React.createElement('button', { className: 'button button--primary' }, 
              'Read More ',
              React.createElement(ArrowRight, { size: 20, weight: 'bold' })
            ),
            React.createElement('p', { className: 'text-fine' }, 'Buttons can include Phosphor icons')
          )
        )
      ),

      // 5. Forms
      React.createElement(
        'section',
        { id: 'forms', className: 'style-guide-page__section' },
        React.createElement('h2', { className: 'style-guide-page__section-title' }, '5. Forms'),
        React.createElement(
          'div',
          { className: 'style-guide-page__component-showcase' },
          
          React.createElement('div', { className: 'form' },
            React.createElement('div', { className: 'form__group' },
              React.createElement('label', { className: 'form__label', htmlFor: 'demo-input' }, 'Input Label'),
              React.createElement('input', { 
                type: 'text', 
                id: 'demo-input',
                className: 'form__input', 
                placeholder: 'Enter text here...' 
              })
            ),
            
            React.createElement('div', { className: 'form__group' },
              React.createElement('label', { className: 'form__label', htmlFor: 'demo-textarea' }, 'Textarea Label'),
              React.createElement('textarea', { 
                id: 'demo-textarea',
                className: 'form__textarea', 
                placeholder: 'Enter longer text here...',
                rows: 4
              })
            )
          ),
          
          React.createElement('p', { className: 'text-fine' }, 
            'Forms feature dark backgrounds with pink borders that glow on focus'
          )
        )
      ),

      // 6. Cards
      React.createElement(
        'section',
        { id: 'cards', className: 'style-guide-page__section' },
        React.createElement('h2', { className: 'style-guide-page__section-title' }, '6. Cards'),
        React.createElement(
          'div',
          { className: 'style-guide-page__cards-grid' },
          
          React.createElement('div', { className: 'card' },
            React.createElement('span', { className: 'card__category' }, 'Default'),
            React.createElement('h3', { className: 'card__title' }, 'Default Card'),
            React.createElement('p', { className: 'card__description' }, 'Standard card with subtle pink border and glow on hover')
          ),
          
          React.createElement('div', { className: 'card card--outline-yellow' },
            React.createElement('span', { className: 'card__category' }, 'Featured'),
            React.createElement('h3', { className: 'card__title' }, 'Yellow Outline Card'),
            React.createElement('p', { className: 'card__description' }, 'Card with neon yellow border and glow effect')
          ),
          
          React.createElement('div', { className: 'card card--outline-violet' },
            React.createElement('span', { className: 'card__category' }, 'Special'),
            React.createElement('h3', { className: 'card__title' }, 'Violet Outline Card'),
            React.createElement('p', { className: 'card__description' }, 'Card with UV violet border and glow effect')
          )
        )
      ),

      // 7. Tags & Badges
      React.createElement(
        'section',
        { id: 'tags', className: 'style-guide-page__section' },
        React.createElement('h2', { className: 'style-guide-page__section-title' }, '7. Tags & Badges'),
        React.createElement(
          'div',
          { className: 'style-guide-page__component-showcase' },
          
          React.createElement('div', { className: 'style-guide-page__tag-group' },
            React.createElement('span', { className: 'tag' }, 'Default Tag'),
            React.createElement('span', { className: 'tag tag--yellow' }, 'Yellow Tag'),
            React.createElement('span', { className: 'tag tag--green' }, 'Green Tag')
          ),
          
          React.createElement('p', { className: 'text-fine' }, 
            'Tags feature neon borders with glow effects on hover'
          )
        )
      ),

      // 8. Icon Library
      React.createElement(
        'section',
        { id: 'icons', className: 'style-guide-page__section' },
        React.createElement('h2', { className: 'style-guide-page__section-title' }, 
          '8. Icon Library ',
          React.createElement('span', { className: 'style-guide-page__icon-count' }, 
            '(' + allIcons.length + ' icons)'
          )
        ),
        
        React.createElement('div', { className: 'style-guide-page__icon-search' },
          React.createElement('div', { className: 'form__group' },
            React.createElement('input', {
              type: 'text',
              className: 'form__input',
              placeholder: 'Search icons by name or category...',
              value: iconSearchQuery,
              onChange: function(e) { setIconSearchQuery(e.target.value); },
              'aria-label': 'Search icons'
            })
          )
        ),
        
        React.createElement('p', { className: 'text-body style-guide-page__intro' }, 
          'All Phosphor Icons currently used across the Nova News site. Icons are organized by category and can be used at any size with multiple weight options.'
        ),
        
        Object.keys(iconsByCategory).length === 0 
          ? React.createElement('p', { className: 'text-muted' }, 'No icons found matching "' + iconSearchQuery + '"')
          : Object.keys(iconsByCategory).sort().map(function(category) {
              var icons = iconsByCategory[category];
              return React.createElement(
                'div',
                { key: category, className: 'style-guide-page__icon-category' },
                React.createElement('h3', { className: 'style-guide-page__icon-category-title' }, 
                  category + ' (' + icons.length + ')'
                ),
                React.createElement(
                  'div',
                  { className: 'style-guide-page__icon-grid' },
                  icons.map(function(icon, index) {
                    var IconComponent = icon.component;
                    return React.createElement(
                      'div',
                      { 
                        key: index,
                        className: 'style-guide-page__icon-item',
                        title: icon.name
                      },
                      React.createElement(IconComponent, { size: 32, weight: 'regular' }),
                      React.createElement('span', { className: 'style-guide-page__icon-name' }, icon.name)
                    );
                  })
                )
              );
            })
      ),

      // 9. Content Patterns
      React.createElement(
        'section',
        { id: 'content', className: 'style-guide-page__section' },
        React.createElement('h2', { className: 'style-guide-page__section-title' }, '9. Content Patterns'),
        
        React.createElement('div', { className: 'style-guide-page__content-patterns' },
          
          React.createElement('div', { className: 'style-guide-page__pattern-group' },
            React.createElement('h3', null, 'Code Blocks'),
            React.createElement('pre', null,
              React.createElement('code', null, 
                'const neonPink = "#FF10F0";\nconst neonYellow = "#F4FF3C";\nconsole.log("80s vibes");'
              )
            ),
            React.createElement('p', { className: 'text-fine' }, 'Terminal aesthetic with neon green text')
          ),
          
          React.createElement('div', { className: 'style-guide-page__pattern-group' },
            React.createElement('h3', null, 'Blockquote'),
            React.createElement('blockquote', null,
              React.createElement('p', null, 
                'The dancefloor gave me everything. It taught me how to move, how to feel, and how to create without fear.'
              )
            ),
            React.createElement('p', { className: 'text-fine' }, 'Pink left border with subtle background')
          ),
          
          React.createElement('div', { className: 'style-guide-page__pattern-group' },
            React.createElement('h3', null, 'Lists'),
            React.createElement('ul', null,
              React.createElement('li', null, 'Unordered list with pink bullets'),
              React.createElement('li', null, 'Perfect for feature lists'),
              React.createElement('li', null, 'Clean and minimal styling')
            ),
            React.createElement('ol', null,
              React.createElement('li', null, 'Ordered list with yellow numbers'),
              React.createElement('li', null, 'Great for step-by-step guides'),
              React.createElement('li', null, 'Numbered styling stands out')
            )
          ),
          
          React.createElement('div', { className: 'style-guide-page__pattern-group' },
            React.createElement('h3', null, 'Horizontal Rule'),
            React.createElement('hr'),
            React.createElement('p', { className: 'text-fine' }, 'Gradient line with pink center fade')
          )
        )
      )
    )
  );
}