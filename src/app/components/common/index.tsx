/**
 * @fileoverview Barrel export file for common components
 * 
 * Centralizes exports for all common/shared components used throughout
 * the application (Header, Footer, Navigation, etc.).
 * 
 * Usage:
 * ```tsx
 * // Before
 * import { Header } from './Header';
 * import { Footer } from './Footer';
 * 
 * // After
 * import { Header, Footer } from './';
 * ```
 * 
 * @version 1.0.0
 * @created 2026-03-11
 */

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   LAYOUT COMPONENTS
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export { Header } from './Header';
export { Footer } from './Footer';
export { RootLayout } from './RootLayout';
export { MobileMenu } from './MobileMenu';

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   NAVIGATION COMPONENTS
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export { Logo } from './Logo';
export { AboutDropdown } from './AboutDropdown';
export { BlogMegaMenu } from './BlogMegaMenu';
export { PortfolioMegaMenu } from './PortfolioMegaMenu';
export { ContactMiniMenu } from './ContactMiniMenu';
export { AutoBreadcrumbs } from './AutoBreadcrumbs';

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   THEME & APPEARANCE
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export { ThemeProvider } from './ThemeProvider';
export { ThemeSwitcher } from './ThemeSwitcher';
export { ThemeToggle } from './ThemeToggle';
export { ThemeToggleES5 } from './ThemeToggleES5';

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   UTILITY COMPONENTS
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export { ColorfulIcons } from './ColorfulIcons';
export { SocialLinks } from './SocialLinks';
export { TypeformEmbed } from './TypeformEmbed';

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ERROR HANDLING & SAFETY
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export { ErrorBoundary } from './ErrorBoundary';
export { SafetyWrapper } from './SafetyWrapper';

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   PWA & OFFLINE
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export { PWAInstallPrompt } from './PWAInstallPrompt';
export { OfflineIndicator } from './OfflineIndicator';

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   CONTEXT & STATE
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export { ModalContext, ModalProvider, useModalContext } from './ModalContext';

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   CONSTANTS
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export * from './Constants';
