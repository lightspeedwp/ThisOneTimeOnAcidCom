/**
 * Reader Access Form
 *
 * Two-state form component:
 * - request-code: Email input, submit to request code
 * - enter-code: 6-digit code input, 10-minute countdown, resend option
 *
 * Uses copy from src/app/data/mock/reader-access.ts
 * BEM styling in src/styles/blocks/reader-access-form.css
 */

import { useState, useEffect } from 'react';
import { readerAccessCopy, getReaderStateCopy } from '../../data/mock/reader-access';

interface ReaderAccessFormProps {
  onCodeRequested?: (email: string) => void;
  onCodeVerified?: (email: string, code: string) => void;
  initialState?: 'request-code' | 'enter-code';
  initialEmail?: string;
}

export function ReaderAccessForm({
  onCodeRequested,
  onCodeVerified,
  initialState = 'request-code',
  initialEmail = '',
}: ReaderAccessFormProps) {
  const [state, setState] = useState<'request-code' | 'enter-code'>(initialState);
  const [email, setEmail] = useState(initialEmail);
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [isCodeExpired, setIsCodeExpired] = useState(false);

  // Countdown timer for code expiry
  useEffect(() => {
    if (state !== 'enter-code' || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsCodeExpired(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [state, timeLeft]);

  const handleRequestCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch('/api/reader/code-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setState('enter-code');
        setTimeLeft(600);
        setIsCodeExpired(false);
        setCode('');
        onCodeRequested?.(email);
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to send code');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch('/api/reader/verifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code }),
      });

      if (response.ok) {
        onCodeVerified?.(email, code);
        // Success: caller will handle redirect to chapter
      } else {
        const data = await response.json();
        setError(data.message || 'Verification failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch('/api/reader/code-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setTimeLeft(600);
        setIsCodeExpired(false);
        setCode('');
        onCodeRequested?.(email);
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to resend code');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatCode = (input: string) => {
    // Format input as user types: allow only digits, max 6
    return input.replace(/\D/g, '').slice(0, 6);
  };

  if (state === 'request-code') {
    const copy = readerAccessCopy.states.requestPending;
    return (
      <form className="reader-access-form" onSubmit={handleRequestCode}>
        <fieldset className="reader-access-form__fieldset">
          <legend className="reader-access-form__legend">{copy.title}</legend>

          <div className="reader-access-form__group">
            <label htmlFor="email" className="reader-access-form__label">
              Email address
            </label>
            <input
              id="email"
              type="email"
              className="reader-access-form__input"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          {error && (
            <div className="reader-access-form__error" role="alert">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="reader-access-form__submit"
            disabled={isLoading}
          >
            {isLoading ? 'Sending…' : 'Request code'}
          </button>
        </fieldset>
      </form>
    );
  }

  // enter-code state
  const copy = isCodeExpired
    ? getReaderStateCopy('code-expired')
    : getReaderStateCopy('request-received');

  return (
    <form className="reader-access-form reader-access-form--verify" onSubmit={handleVerifyCode}>
      <fieldset className="reader-access-form__fieldset">
        <legend className="reader-access-form__legend">{copy.title}</legend>

        <div className="reader-access-form__group">
          <label htmlFor="code" className="reader-access-form__label">
            Verification code (6 digits)
          </label>
          <input
            id="code"
            type="text"
            className="reader-access-form__input reader-access-form__input--code"
            placeholder="000000"
            value={code}
            onChange={(e) => setCode(formatCode(e.target.value))}
            maxLength={6}
            disabled={isLoading || isCodeExpired}
            autoComplete="off"
            inputMode="numeric"
          />
          <div className="reader-access-form__timer">
            Time remaining: {formatTime(timeLeft)}
          </div>
        </div>

        {error && (
          <div className="reader-access-form__error" role="alert">
            {error}
          </div>
        )}

        <div className="reader-access-form__actions">
          <button
            type="submit"
            className="reader-access-form__submit"
            disabled={isLoading || code.length !== 6 || isCodeExpired}
          >
            {isLoading ? 'Verifying…' : 'Verify'}
          </button>

          <button
            type="button"
            className="reader-access-form__link"
            onClick={handleResend}
            disabled={isLoading}
          >
            Request a new code
          </button>
        </div>
      </fieldset>
    </form>
  );
}
