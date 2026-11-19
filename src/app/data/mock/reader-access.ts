// Reader-access mock data and UI copy
// Centralized copy for all reader-visible states
// Used by ReaderAccessForm, EbookPage, ThankyouPage, etc.

export const readerAccessCopy = {
  states: {
    requestPending: {
      title: 'Sending code…',
      message: "We're preparing your verification code. This may take a moment.",
      action: null,
    },
    requestReceived: {
      title: 'Check your email',
      message: 'A code has been sent to your email address. Check within 10 minutes of requesting it.',
      action: 'Enter your code',
    },
    deliveryUncertain: {
      title: 'Email may be delayed',
      message: "We've prepared your code, but delivery is uncertain. If it doesn't arrive, request a new one.",
      action: 'Request a new code',
    },
    verified: {
      title: 'Access granted',
      message: 'You can now read this chapter. Your access is active on this device for up to 30 days.',
      action: 'Read now',
    },
    codeInvalid: {
      title: 'Code not recognised',
      message: 'That code is invalid. Check it matches exactly, or request a new one.',
      action: 'Request a new code',
    },
    codeExpired: {
      title: 'Code expired',
      message: 'Your code is no longer valid. Codes expire 10 minutes after request. Request a new one.',
      action: 'Request a new code',
    },
    codeUsed: {
      title: 'Code already used',
      message: 'That code has already been used. Request a new one to try again.',
      action: 'Request a new code',
    },
    limited: {
      title: 'Too many attempts',
      message: "You've tried too many times. Wait a moment and request a new code.",
      action: 'Request a new code',
    },
    providerFailure: {
      title: 'Email service error',
      message: "We couldn't send your code right now. Try again in a moment.",
      action: 'Try again',
    },
    contentUnavailable: {
      title: 'Chapter not available',
      message: 'This chapter is not yet available. Check back later.',
      action: null,
    },
  },

  codeValidity: {
    duration: '10 minutes',
    prompt: 'Check your email within 10 minutes of requesting it',
    maxAttempts: 5,
  },

  sessionValidity: {
    maxDuration: '30 days',
    renewalDuration: 'up to 30 days',
  },

  newsletter: {
    destination: 'Brevo (via double opt-in)',
    separator:
      'Newsletter subscription is separate from reader access and requires explicit consent',
  },
};

// Export individual state copy for components
export const getReaderStateCopy = (state: string) => {
  const stateKey = state
    .replace(/-/g, '')
    .replace(/^(.)/, (c) => c.toLowerCase());
  return (
    readerAccessCopy.states[stateKey as keyof typeof readerAccessCopy.states] || {
      title: 'Error',
      message: 'An unexpected error occurred.',
    }
  );
};
