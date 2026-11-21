/**
 * Monitoring and alerting for reader access session management.
 * Tracks session operations and alerts on suspicious activity.
 *
 * Production setup should integrate with:
 * - Datadog, New Relic, or other APM solutions
 * - Slack or PagerDuty for alerts
 * - CloudWatch Logs or similar for structured logging
 */

/**
 * Session operation metrics
 */
export interface SessionMetrics {
  /** Session creation attempts (total) */
  creationAttempts: number;

  /** Successful session creations */
  creationSuccess: number;

  /** Failed session creations (device limit, storage errors) */
  creationFailures: number;

  /** Session renewals (successful) */
  renewals: number;

  /** Session terminations (logout, expiry) */
  terminations: number;

  /** Session validation requests */
  validationRequests: number;

  /** Failed validations (expired, terminated, invalid) */
  validationFailures: number;

  /** Storage errors during operations */
  storageErrors: number;

  /** Rate limit hits (429 responses) */
  rateLimitHits: number;
}

/**
 * Alert thresholds and configurations
 */
export interface AlertConfig {
  /** Alert on creation attempts > this per minute (potential enumeration attack) */
  highCreationAttemptsPerMinute: number;

  /** Alert on consecutive creation failures > this */
  consecutiveCreationFailures: number;

  /** Alert on storage error rate > this percentage */
  storageErrorRatePercent: number;

  /** Alert on rate limit hits > this per minute */
  rateLimitHitsPerMinute: number;
}

/**
 * Default alert thresholds (tunable for each environment)
 */
export const DEFAULT_ALERT_CONFIG: AlertConfig = {
  highCreationAttemptsPerMinute: 100, // Alert if > 100 creations/min per email
  consecutiveCreationFailures: 5,     // Alert after 5 consecutive failures
  storageErrorRatePercent: 5,         // Alert if > 5% storage errors
  rateLimitHitsPerMinute: 50,         // Alert if > 50 rate limits/min
};

/**
 * In-memory metrics store (for single-instance deployments).
 * Production systems should back this with Datadog, CloudWatch, etc.
 */
const metricsStore = {
  currentWindow: {} as SessionMetrics,
  previousWindow: {} as SessionMetrics,
  consecutiveCreationFailures: 0,
};

/**
 * Initialize metrics for a new monitoring window
 */
function initializeMetrics(): SessionMetrics {
  return {
    creationAttempts: 0,
    creationSuccess: 0,
    creationFailures: 0,
    renewals: 0,
    terminations: 0,
    validationRequests: 0,
    validationFailures: 0,
    storageErrors: 0,
    rateLimitHits: 0,
  };
}

/**
 * Record a session creation attempt
 * @param success Whether the creation succeeded
 * @param error Optional error type for failures
 */
export function recordSessionCreation(success: boolean, error?: string): void {
  if (!metricsStore.currentWindow) {
    metricsStore.currentWindow = initializeMetrics();
  }

  metricsStore.currentWindow.creationAttempts++;

  if (success) {
    metricsStore.currentWindow.creationSuccess++;
    metricsStore.consecutiveCreationFailures = 0;
  } else {
    metricsStore.currentWindow.creationFailures++;
    metricsStore.consecutiveCreationFailures++;

    // Track storage errors separately for SLA monitoring
    if (error === 'storage_error') {
      metricsStore.currentWindow.storageErrors++;
    }
  }
}

/**
 * Record a session renewal
 */
export function recordSessionRenewal(): void {
  if (!metricsStore.currentWindow) {
    metricsStore.currentWindow = initializeMetrics();
  }
  metricsStore.currentWindow.renewals++;
}

/**
 * Record a session termination (logout or expiry)
 */
export function recordSessionTermination(): void {
  if (!metricsStore.currentWindow) {
    metricsStore.currentWindow = initializeMetrics();
  }
  metricsStore.currentWindow.terminations++;
}

/**
 * Record a session validation request
 * @param success Whether the validation succeeded
 */
export function recordSessionValidation(success: boolean): void {
  if (!metricsStore.currentWindow) {
    metricsStore.currentWindow = initializeMetrics();
  }

  metricsStore.currentWindow.validationRequests++;
  if (!success) {
    metricsStore.currentWindow.validationFailures++;
  }
}

/**
 * Record a rate limit hit (429 response)
 */
export function recordRateLimitHit(): void {
  if (!metricsStore.currentWindow) {
    metricsStore.currentWindow = initializeMetrics();
  }
  metricsStore.currentWindow.rateLimitHits++;
}

/**
 * Check if any alert thresholds are exceeded
 * @param config Alert configuration thresholds
 * @returns Object with alerts array and severity
 */
export function checkAlerts(config: AlertConfig = DEFAULT_ALERT_CONFIG): {
  alerts: string[];
  hasAlerts: boolean;
  severity: 'info' | 'warning' | 'critical';
} {
  const alerts: string[] = [];
  const metrics = metricsStore.currentWindow || initializeMetrics();

  // Check for high creation rate
  if (metrics.creationAttempts > config.highCreationAttemptsPerMinute) {
    alerts.push(
      `HIGH CREATION RATE: ${metrics.creationAttempts} attempts (threshold: ${config.highCreationAttemptsPerMinute})`
    );
  }

  // Check for consecutive failures
  if (metricsStore.consecutiveCreationFailures > config.consecutiveCreationFailures) {
    alerts.push(
      `CREATION FAILURES: ${metricsStore.consecutiveCreationFailures} consecutive failures (threshold: ${config.consecutiveCreationFailures})`
    );
  }

  // Check for storage error rate
  if (metrics.creationAttempts > 0) {
    const errorRate = (metrics.storageErrors / metrics.creationAttempts) * 100;
    if (errorRate > config.storageErrorRatePercent) {
      alerts.push(
        `STORAGE ERROR RATE: ${errorRate.toFixed(1)}% (threshold: ${config.storageErrorRatePercent}%)`
      );
    }
  }

  // Check for high rate limit hits
  if (metrics.rateLimitHits > config.rateLimitHitsPerMinute) {
    alerts.push(
      `RATE LIMIT HITS: ${metrics.rateLimitHits} hits (threshold: ${config.rateLimitHitsPerMinute})`
    );
  }

  // Determine severity
  let severity: 'info' | 'warning' | 'critical' = 'info';
  if (alerts.length > 0) {
    severity = metricsStore.consecutiveCreationFailures > config.consecutiveCreationFailures
      ? 'critical'
      : 'warning';
  }

  return {
    alerts,
    hasAlerts: alerts.length > 0,
    severity,
  };
}

/**
 * Get current metrics snapshot
 */
export function getMetrics(): SessionMetrics {
  return metricsStore.currentWindow || initializeMetrics();
}

/**
 * Reset metrics for a new monitoring window (called hourly/daily)
 */
export function rotateMetricsWindow(): {
  previous: SessionMetrics;
  current: SessionMetrics;
} {
  const previous = metricsStore.currentWindow || initializeMetrics();
  metricsStore.previousWindow = previous;
  metricsStore.currentWindow = initializeMetrics();
  metricsStore.consecutiveCreationFailures = 0; // Reset on window rotation

  return { previous, current: metricsStore.currentWindow };
}

/**
 * Log structured metrics for external monitoring systems
 * Production systems should send this to Datadog, CloudWatch, etc.
 *
 * @param metrics Metrics to log
 * @param timestamp Optional timestamp (default: now)
 */
export function logMetrics(metrics: SessionMetrics, timestamp: Date = new Date()): void {
  // Format for structured logging (JSON)
  const log = {
    timestamp: timestamp.toISOString(),
    service: 'reader-access-session-mgmt',
    metrics,
  };

  // Log to console (production: send to Datadog, CloudWatch, etc.)
  console.log(JSON.stringify(log));
}

/**
 * Send alert notification (integration point for Slack, PagerDuty, etc.)
 * Production systems should implement integration with alerting platform
 *
 * @param alert Alert message
 * @param severity Alert severity
 * @param context Additional context
 */
export async function sendAlert(
  alert: string,
  severity: 'info' | 'warning' | 'critical',
  context?: Record<string, unknown>
): Promise<void> {
  // Format alert for external systems
  const alertMessage = {
    timestamp: new Date().toISOString(),
    service: 'reader-access-session-mgmt',
    alert,
    severity,
    context,
  };

  // Log locally
  console.warn(JSON.stringify(alertMessage));

  // TODO: Integration points for production:
  // - POST to Slack webhook for critical alerts
  // - Trigger PagerDuty incident for critical
  // - Send to Datadog, CloudWatch, etc.
  // - Update monitoring dashboard
}

/**
 * Health check endpoint data
 */
export function getHealthStatus(): {
  status: 'healthy' | 'degraded' | 'unhealthy';
  metrics: SessionMetrics;
  alerts: string[];
} {
  const metrics = getMetrics();
  const { alerts, severity } = checkAlerts();

  let status: 'healthy' | 'degraded' | 'unhealthy' = 'healthy';
  if (severity === 'critical') {
    status = 'unhealthy';
  } else if (severity === 'warning') {
    status = 'degraded';
  }

  return {
    status,
    metrics,
    alerts,
  };
}
