/**
 * @fileoverview Reader email verification form for protected chapter access.
 * Two-step flow: (1) request code via email, (2) submit code to verify.
 */

import React, { useState } from 'react';
import { Check, X } from '@phosphor-icons/react';
import '../../../../../styles/blocks/reader-access-form.css';

export interface ReaderAccessFormProps {
  /** Called after verification with the session expiry (the token stays in an HttpOnly cookie) */
  onVerified?: (sessionExpiresAt: string) => void;
  onError?: (error: string) => void;
}

type FormStep = 'email' | 'code' | 'verified' | 'error';

export function ReaderAccessForm({ onVerified, onError }: ReaderAccessFormProps) {
  const [step, setStep] = useState<FormStep>('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [expiresAt, setExpiresAt] = useState<string | null>(null);

  const handleRequestCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/.netlify/functions/reader-code-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = (await res.json()) as { state: string; expiresAt?: string; message?: string };

      if (data.state === 'request-received' && data.expiresAt) {
        setExpiresAt(data.expiresAt);
        setStep('code');
      } else if (data.state === 'delivery-uncertain') {
        setError('Email delivery uncertain. Please try again.');
      } else if (data.state === 'request-limited') {
        setError('Too many attempts. Please wait a few minutes.');
      } else {
        setError('Invalid email or request failed.');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      onError?.(message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/.netlify/functions/reader-verify', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code }),
      });

      const data = (await res.json()) as { state?: string; expiresAt?: string };

      // The session token is set as an HttpOnly cookie and never returned in
      // the body, so success is the 201 status plus the verified state.
      if (res.ok && data.state === 'verified') {
        setStep('verified');
        onVerified?.(data.expiresAt ?? 'verified');
      } else if (data.state === 'code-expired') {
        setError('Code expired. Please request a new one.');
        setStep('email');
        setCode('');
      } else if (data.state === 'code-used') {
        setError('Code already used. Please request a new one.');
        setStep('email');
        setCode('');
      } else if (data.state === 'code-limited') {
        setError('Too many attempts. Please request a new code.');
        setStep('email');
        setCode('');
      } else {
        setError('Invalid code. Please try again.');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Verification failed';
      setError(message);
      onError?.(message);
    } finally {
      setLoading(false);
    }
  };

  if (step === 'verified') {
    return (
      <div className="reader-access-form reader-access-form--verified">
        <div className="reader-access-form__success">
          <Check size={24} weight="bold" />
          <h3>Access Granted</h3>
          <p>You can now read the protected chapters.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="reader-access-form">
      <div className="reader-access-form__container">
        {step === 'email' && (
          <form onSubmit={handleRequestCode} className="reader-access-form__form">
            <h3 className="reader-access-form__title">Request Access</h3>
            <p className="reader-access-form__description">
              Enter your email to receive a verification code.
            </p>

            <div className="reader-access-form__field">
              <label htmlFor="email" className="reader-access-form__label">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@example.com"
                required
                disabled={loading}
                className="reader-access-form__input"
              />
            </div>

            {error && (
              <div className="reader-access-form__error">
                <X size={16} weight="bold" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !email}
              className="reader-access-form__button"
            >
              {loading ? 'Sending...' : 'Send Code'}
            </button>
          </form>
        )}

        {step === 'code' && (
          <form onSubmit={handleVerifyCode} className="reader-access-form__form">
            <h3 className="reader-access-form__title">Enter Verification Code</h3>
            <p className="reader-access-form__description">
              Check your email for a 6-digit code. Code expires in 10 minutes.
            </p>

            <div className="reader-access-form__field">
              <label htmlFor="code" className="reader-access-form__label">
                Verification Code
              </label>
              <input
                id="code"
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="000000"
                maxLength={6}
                required
                disabled={loading}
                className="reader-access-form__input reader-access-form__input--code"
              />
            </div>

            {error && (
              <div className="reader-access-form__error">
                <X size={16} weight="bold" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || code.length !== 6}
              className="reader-access-form__button"
            >
              {loading ? 'Verifying...' : 'Verify'}
            </button>

            <button
              type="button"
              onClick={() => {
                setStep('email');
                setCode('');
                setError('');
              }}
              disabled={loading}
              className="reader-access-form__button-secondary"
            >
              Back
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
