declare module "virtual:sentry-config" {
  export var sentryConfig: {
    dsn: string | undefined;
    environment: string;
    tracesSampleRate: number;
    development: boolean;
  };
}
