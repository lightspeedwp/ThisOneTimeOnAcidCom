/**
 * @fileoverview Utility to suppress annoying 3rd party script and extension errors
 * that clutter the console but don't affect application functionality.
 */

export function initializeExtensionErrorSuppression() {
  if (typeof window === 'undefined') return;

  // import.meta.env access completely removed — proven unreliable in this bundler
  // Always suppress extension errors (previously disabled in dev mode)

  // 1. Suppress Console Errors
  const originalConsoleError = console.error;
  const originalConsoleWarn = console.warn;
  const originalConsoleLog = console.log;

  const shouldSuppress = (args: any[]) => {
    const message = args.map(arg => {
      if (typeof arg === 'string') return arg;
      if (arg instanceof Error) {
        const errMsg = arg.message ? arg.message : '';
        const errStack = arg.stack ? arg.stack : '';
        return errMsg + errStack;
      }
      return JSON.stringify(arg);
    }).join(' ');

    return (
      message.includes('Message getPage (id: 3) response timed out') ||
      message.includes('response timed out after 30000ms') ||
      (message.includes('getPage') && message.includes('timed out')) ||
      message.includes('chrome-extension://') ||
      message.includes('extension://') ||
      message.includes('async_hooks') ||
      message.includes('node/async_hooks') ||
      message.includes('esm.sh/node/')
    );
  };

  console.error = (...args: any[]) => {
    if (shouldSuppress(args)) return;
    originalConsoleError.apply(console, args);
  };

  console.warn = (...args: any[]) => {
    if (shouldSuppress(args)) return;
    originalConsoleWarn.apply(console, args);
  };

  console.log = (...args: any[]) => {
    if (shouldSuppress(args)) return;
    originalConsoleLog.apply(console, args);
  };

  // 2. Suppress Window Errors (Uncaught Exceptions) - Event Listener
  const handleWindowError = (event: ErrorEvent) => {
    const message = event.message || '';
    const errorObj = event.error;
    const errorStack = errorObj ? errorObj.stack : '';
    const stack = errorStack ? errorStack : '';
    const filename = event.filename || '';
    
    if (
      message.includes('Message getPage') || 
      message.includes('timed out') ||
      message.includes('async_hooks') ||
      filename.includes('async_hooks') ||
      filename.includes('esm.sh/node/')
    ) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  };

  // 3. Suppress Unhandled Rejections (Promises)
  const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
    const reason = event.reason;
    const reasonMsg = reason ? reason.message : '';
    const reasonStr = reason ? reason.toString() : '';
    const message = reasonMsg ? reasonMsg : (reasonStr ? reasonStr : '');
    const reasonStack = reason ? reason.stack : '';
    const stack = reasonStack ? reasonStack : '';
    
    if (
      message.includes('Message getPage') ||
      message.includes('timed out') ||
      message.includes('async_hooks') ||
      stack.includes('async_hooks') ||
      stack.includes('esm.sh/node/')
    ) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  };

  window.addEventListener('error', handleWindowError, true);
  window.addEventListener('unhandledrejection', handleUnhandledRejection, true);

  // 4. Suppress Window Errors - Old School Handler (for broader compatibility)
  const originalOnerror = window.onerror;
  window.onerror = function(msg, url, line, col, error) {
    const message = String(msg);
    const source = String(url || '');
    if (
      message.includes('Message getPage') ||
      message.includes('async_hooks') ||
      source.includes('async_hooks') ||
      source.includes('esm.sh/node/')
    ) {
      return true; // Return true to suppress the error
    }
    if (originalOnerror) {
      // @ts-ignore
      return originalOnerror.apply(this, arguments);
    }
    return false;
  };
}