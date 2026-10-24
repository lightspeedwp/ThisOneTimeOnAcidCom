/**
 * Sentry initialization. Must be the first import in the app entry point
 * (src/main.tsx) so error/tracing instrumentation is active before any other
 * module runs.
 *
 * DSN comes from VITE_SENTRY_DSN (see .env.example). The Sentry Vite plugin
 * (vite.config.ts) stamps the release automatically at build time, so no
 * `release` option is set here.
 */
import * as Sentry from "@sentry/react";
import { useEffect } from "react";
import { createRoutesFromChildren, matchRoutes, useLocation, useNavigationType } from "react-router";
import { sentryConfig } from "virtual:sentry-config";

var dsn = sentryConfig.dsn;

if (dsn) {
  Sentry.init({
    dsn: dsn,
    environment: sentryConfig.environment,

    integrations: [
      Sentry.reactRouterV7BrowserTracingIntegration({
        useEffect: useEffect,
        useLocation: useLocation,
        useNavigationType: useNavigationType,
        createRoutesFromChildren: createRoutesFromChildren,
        matchRoutes: matchRoutes,
      }),
      Sentry.replayIntegration({
        maskAllText: true,
        blockAllMedia: true,
      }),
    ],

    // Tracing: page load, navigation, and API call spans.
    tracesSampleRate: sentryConfig.tracesSampleRate,

    // Session Replay: lightweight sampling in general, full capture on errors.
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
  });
} else if (sentryConfig.development) {
  // eslint-disable-next-line no-console
  console.warn("[sentry] VITE_SENTRY_DSN is not set — Sentry is disabled.");
}
