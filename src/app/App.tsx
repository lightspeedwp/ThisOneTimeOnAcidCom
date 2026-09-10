import React from 'react';
import { RouterProvider } from 'react-router';
import { router } from './routes.ts';
import { ThemeProvider } from './components/common/ThemeProvider';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import '../styles/globals.css';

export default function App() {
  return React.createElement(
    ThemeProvider,
    null,
    React.createElement(
      ErrorBoundary,
      null,
      React.createElement(RouterProvider, { router: router })
    )
  );
}