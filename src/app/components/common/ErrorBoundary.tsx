import React, { ReactNode } from 'react';
import { Warning, ArrowsClockwise } from '@phosphor-icons/react';

// Bundler workaround: import.meta.env is forbidden, use direct false for production safety
const _ebIsDev = false;

/**
 * Props for ErrorBoundary component
 */
interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

/**
 * Props without children (for HOC)
 */
type ErrorBoundaryPropsWithoutChildren = Omit<ErrorBoundaryProps, 'children'>;

/**
 * State for ErrorBoundary component
 */
interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
  retryCount: number;
}

/**
 * Partial state for getDerivedStateFromError
 */
type PartialErrorBoundaryState = Partial<ErrorBoundaryState>;

/**
 * Type for component that can be wrapped with ErrorBoundary
 */
type AnyComponentType = (props: any) => JSX.Element | null;

/**
 * Error messages for different error types
 */
const errorMessages = {
  default: {
    title: 'Oops! Something went wrong',
    message: 'We encountered an unexpected error. Don\'t worry, your data is safe.',
    suggestions: [
      'Try refreshing the page',
      'Clear your browser cache',
      'Check your internet connection',
      'Try again in a few moments',
    ],
  },
  timeout: {
    title: 'Request Timed Out',
    message: 'The request took too long to complete. This might be a temporary network issue.',
    suggestions: [
      'Check your internet connection',
      'Try again in a few moments',
      'Reload the page',
    ],
  },
  network: {
    title: 'Network Error',
    message: 'We couldn\'t connect to our servers. Please check your internet connection.',
    suggestions: [
      'Check your internet connection',
      'Try disabling VPN or proxy',
      'Try again in a few moments',
    ],
  },
  content: {
    title: 'Content Loading Error',
    message: 'We had trouble loading some content. This might be a temporary issue.',
    suggestions: [
      'Try refreshing the page',
      'Check your internet connection',
      'Try again in a few moments',
    ],
  },
  browserExtension: {
    title: 'Browser Extension Conflict',
    message: 'A browser extension may be interfering with the application.',
    suggestions: [
      'Try disabling browser extensions',
      'Use an incognito/private window',
      'Try a different browser',
    ],
  },
};

/**
 * Error Boundary component for catching and handling React errors
 * 
 * Bundler workaround: extends Component without angle-bracket generics
 * (the bundler misreads `Component<Props, State>` as JSX).
 * State type is declared explicitly on the class body.
 * Props are typed via constructor parameter only.
 */
export class ErrorBoundary extends React.Component {
  state: ErrorBoundaryState;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: 0,
    };
    
    // Bind methods to this context for event handlers
    this.handleRetry = this.handleRetry.bind(this);
    this.handleReload = this.handleReload.bind(this);
  }

  static getDerivedStateFromError(error: Error): PartialErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    const errorMessage = error && error.message ? error.message : '';
    const errorToString = error ? error.toString() : '';
    const finalErrorMessage = errorMessage ? errorMessage : errorToString;
    
    const errorStack = error && error.stack ? error.stack : '';
    const errorName = error && error.name ? error.name : '';
    
    // Check for timeout errors in message
    const isTimeoutMsg = finalErrorMessage.includes('Message getPage (id: 3) response timed out after 30000ms');
    const isGenericTimeout = finalErrorMessage.includes('response timed out after 30000ms');
    const hasGetPage = finalErrorMessage.includes('getPage');
    const hasTimedOut = finalErrorMessage.includes('timed out');
    const isGetPageTimeout = hasGetPage && hasTimedOut;
    const isGetPageMsg = finalErrorMessage.includes('Message getPage');
    
    // Check for extension errors in message
    const hasExtensionUrl = finalErrorMessage.includes('extension://');
    const hasChromeExt = finalErrorMessage.includes('chrome-extension://');
    const hasMozExt = finalErrorMessage.includes('moz-extension://');
    
    // Check for async_hooks errors in message
    const hasAsyncHooks = finalErrorMessage.includes('async_hooks');
    const hasEsmNode = finalErrorMessage.includes('esm.sh/node/');
    
    // Check for errors in stack trace
    const stackHasAsyncHooks = errorStack.includes('async_hooks');
    const stackHasEsmNode = errorStack.includes('esm.sh/node/');
    const stackHasExtension = errorStack.includes('extension://');
    
    // Check for named errors
    const isTimeoutError = errorName === 'TimeoutError';
    const isExtensionError = errorName === 'ExtensionError';
    
    // Combine all checks
    const shouldIgnoreError = 
      isTimeoutMsg ||
      isGenericTimeout ||
      isGetPageTimeout ||
      isGetPageMsg ||
      hasExtensionUrl ||
      hasChromeExt ||
      hasMozExt ||
      hasAsyncHooks ||
      hasEsmNode ||
      stackHasAsyncHooks ||
      stackHasEsmNode ||
      stackHasExtension ||
      isTimeoutError ||
      isExtensionError;
    
    if (shouldIgnoreError) {
      this.setState({
        hasError: false,
        error: null,
        errorInfo: null,
      });
      return;
    }

    this.setState({
      error,
      errorInfo,
    });

    var propsTyped = this.props as ErrorBoundaryProps;
    if (propsTyped.onError) {
      propsTyped.onError(error, errorInfo);
    }

    if (_ebIsDev) {
      console.error('Error Boundary caught an error:');
      console.error(error);
      console.error('Error Info:');
      console.error(errorInfo);
    }
  }

  handleRetry() {
    var self = this;
    this.setState(function(prevState) {
      return {
        hasError: false,
        error: null,
        errorInfo: null,
        retryCount: prevState.retryCount + 1,
      };
    });
  }

  handleReload() {
    window.location.reload();
  }

  render() {
    var hasError = this.state.hasError;
    var error = this.state.error;
    var retryCount = this.state.retryCount;
    var propsTyped = this.props as ErrorBoundaryProps;
    var children = propsTyped.children;
    var fallback = propsTyped.fallback;

    if (hasError) {
      if (fallback) {
        return fallback;
      }

      var messageText = error && error.message ? error.message : '';
      var hasTimedOut = messageText.includes('timed out');
      var hasTimeout = messageText.includes('timeout');
      var isTimeoutError = hasTimedOut ? true : hasTimeout;
      
      var hasNetwork = messageText.includes('network');
      var hasFetch = messageText.includes('fetch');
      var isNetworkError = hasNetwork ? true : hasFetch;
      
      var hasContentful = messageText.includes('Contentful');
      var hasCMS = messageText.includes('CMS');
      var isContentError = hasContentful ? true : hasCMS;
      
      var isBrowserExtensionError = messageText.includes('extension');

      var errorTitle = errorMessages.default.title;
      var errorMessage = errorMessages.default.message;
      var suggestions = [];

      if (isBrowserExtensionError) {
        errorTitle = errorMessages.browserExtension.title;
        errorMessage = errorMessages.browserExtension.message;
        suggestions = errorMessages.browserExtension.suggestions;
      } else if (isTimeoutError) {
        errorTitle = errorMessages.timeout.title;
        errorMessage = errorMessages.timeout.message;
        suggestions = errorMessages.timeout.suggestions;
      } else if (isNetworkError) {
        errorTitle = errorMessages.network.title;
        errorMessage = errorMessages.network.message;
        suggestions = errorMessages.network.suggestions;
      } else if (isContentError) {
        errorTitle = errorMessages.content.title;
        errorMessage = errorMessages.content.message;
        suggestions = errorMessages.content.suggestions;
      }

      var hasSuggestions = suggestions.length > 0;
      var shouldShowReload = retryCount > 1;
      var shouldShowDebug = _ebIsDev && error;
      var hasErrorInfo = this.state.errorInfo !== null;
      var shouldShowRetryCount = retryCount > 0;
      
      var tryAgainLabel = 'Try again (attempt ' + (retryCount + 1) + ')';
      var errorString = error ? error.toString() : '';
      var errorStackString = error && error.stack ? error.stack : '';
      var componentStackString = this.state.errorInfo && this.state.errorInfo.componentStack ? this.state.errorInfo.componentStack : '';

      return (
        <div 
          className="error-boundary"
          role="alert"
          aria-live="assertive"
        >
          <div className="error-boundary__content">
            {/* Error Icon */}
            <div className="error-boundary__header">
              <div className="error-boundary__icon-wrapper">
                <Warning className="error-boundary__icon" />
              </div>
              <h1 className="error-boundary__title">
                {errorTitle}
              </h1>
              <p className="error-boundary__message">
                {errorMessage}
              </p>
            </div>

            {/* Suggestions */}
            {hasSuggestions ? (
              <div className="error-boundary__suggestions">
                <h2 className="error-boundary__suggestions-title">
                  What you can try:
                </h2>
                <ul className="error-boundary__suggestions-list">
                  {suggestions.map(function(suggestion, index) {
                    return (
                      <li key={index} className="error-boundary__suggestion-item">
                        <span className="error-boundary__bullet">•</span>
                        {suggestion}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : null}

            {/* Action Buttons */}
            <div className="error-boundary__actions">
              <button
                type="button"
                onClick={this.handleRetry}
                className="btn btn--neon-primary error-boundary__btn"
                aria-label={tryAgainLabel}
              >
                <ArrowsClockwise className="btn__icon" />
                Try Again
              </button>

              {shouldShowReload ? (
                <button
                  type="button"
                  onClick={this.handleReload}
                  className="btn btn--neon-secondary error-boundary__btn"
                  aria-label="Reload the entire page"
                >
                  Reload Page
                </button>
              ) : null}
            </div>

            {/* Debug Info (Development Only) */}
            {shouldShowDebug ? (
              <details className="error-boundary__debug">
                <summary className="error-boundary__debug-summary">
                  Debug Information (Development Only)
                </summary>
                <div className="error-boundary__debug-content">
                  <p><strong>Error:</strong> {errorString}</p>
                  <p><strong>Stack:</strong></p>
                  <pre className="error-boundary__pre">{errorStackString}</pre>
                  {hasErrorInfo ? (
                    <div className="error-boundary__component-stack">
                      <p><strong>Component Stack:</strong></p>
                      <pre className="error-boundary__pre">{componentStackString}</pre>
                    </div>
                  ) : null}
                </div>
              </details>
            ) : null}

            {/* Retry Count Display */}
            {shouldShowRetryCount ? (
              <p className="error-boundary__retry-count">
                Retry attempts: {retryCount}
              </p>
            ) : null}
          </div>
        </div>
      );
    }

    return children;
  }
}

export function withErrorBoundary(
  Component: AnyComponentType,
  errorBoundaryProps?: ErrorBoundaryPropsWithoutChildren
) {
  return function WrappedComponent(props: any) {
    return (
      <ErrorBoundary {...errorBoundaryProps}>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
}

export default ErrorBoundary;