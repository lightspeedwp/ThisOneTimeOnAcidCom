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

var dsn = import.meta.env.VITE_SENTRY_DSN as string | undefined;

if (dsn) {
  Sentry.init({
    dsn: dsn,
    environment: import.meta.env.MODE,

    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration({
        maskAllText: true,
        blockAllMedia: true,
      }),
    ],

    // Tracing: page load, navigation, and API call spans.
    tracesSampleRate: import.meta.env.PROD ? 0.2 : 1.0,

    // Session Replay: lightweight sampling in general, full capture on errors.
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
  });
} else if (import.meta.env.DEV) {
  // eslint-disable-next-line no-console
  console.warn("[sentry] VITE_SENTRY_DSN is not set — Sentry is disabled.");
}
