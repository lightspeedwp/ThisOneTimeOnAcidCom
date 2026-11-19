/**
 * Reader Access Gate
 *
 * Wrapper component that:
 * 1. Checks for valid reader session
 * 2. Shows ReaderAccessForm if no session
 * 3. Loads and displays chapter if session exists
 * 4. Shows content-unavailable, request-pending, or provider-failure states
 */

import { useEffect, useState } from 'react';
import { ReaderAccessForm } from '../../ui/ReaderAccessForm';
import { getReaderStateCopy } from '../../../data/mock/reader-access';

interface Chapter {
  id: string;
  title: string;
  content: string;
}

interface ReaderAccessGateProps {
  chapterId?: string;
  onChapterLoaded?: (chapter: Chapter) => void;
}

export function ReaderAccessGate({ chapterId = 'chapter-1', onChapterLoaded }: ReaderAccessGateProps) {
  const [state, setState] = useState<
    'loading' | 'request-pending' | 'verified' | 'content-unavailable' | 'provider-failure'
  >('loading');
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Check session and load chapter on mount or when chapterId changes
  useEffect(() => {
    const checkSessionAndLoadChapter = async () => {
      setState('loading');
      setError(null);

      try {
        // Check if session cookie exists and is valid
        const response = await fetch(`/api/reader/chapters/${chapterId}`, {
          method: 'GET',
          credentials: 'include', // Send cookies
        });

        if (response.ok) {
          const data = await response.json();
          if (data.chapter) {
            setChapter(data.chapter);
            setState('verified');
            onChapterLoaded?.(data.chapter);
          } else {
            setState('content-unavailable');
            setError('Chapter data missing');
          }
        } else {
          const data = await response.json();
          const responseState = data.state || 'unknown';

          if (response.status === 401) {
            // No valid session
            setState('request-pending');
          } else if (response.status === 404) {
            // Chapter not approved
            setState('content-unavailable');
          } else if (response.status === 502 || response.status === 503) {
            // Provider error
            setState('provider-failure');
          } else {
            setState('request-pending');
          }

          setError(data.message || 'Failed to load chapter');
        }
      } catch (err) {
        setState('provider-failure');
        setError('Network error. Please check your connection and try again.');
      }
    };

    checkSessionAndLoadChapter();
  }, [chapterId, onChapterLoaded]);

  // Render different states
  if (state === 'loading') {
    return (
      <div className="reader-access-gate reader-access-gate--loading">
        <p>Loading chapter…</p>
      </div>
    );
  }

  if (state === 'request-pending') {
    // No session: show form to request access
    return (
      <div className="reader-access-gate reader-access-gate--request">
        <ReaderAccessForm
          onCodeVerified={() => {
            // After verification, reload chapter
            setState('loading');
          }}
        />
      </div>
    );
  }

  if (state === 'verified' && chapter) {
    // Session valid: display chapter
    return (
      <div className="reader-access-gate reader-access-gate--content">
        <article className="reader-access-gate__article">
          <h1 className="reader-access-gate__title">{chapter.title}</h1>
          <div
            className="reader-access-gate__body"
            dangerouslySetInnerHTML={{ __html: chapter.content }}
          />
        </article>
      </div>
    );
  }

  // Error states: content-unavailable, provider-failure
  const stateCopy = getReaderStateCopy(state);

  return (
    <div className={`reader-access-gate reader-access-gate--${state}`}>
      <div className="reader-access-gate__state">
        <h2 className="reader-access-gate__state-title">{stateCopy.title}</h2>
        <p className="reader-access-gate__state-message">{stateCopy.message}</p>
        {stateCopy.action && (
          <button
            className="reader-access-gate__action"
            onClick={() => window.location.reload()}
          >
            {stateCopy.action}
          </button>
        )}
      </div>
      {error && (
        <p className="reader-access-gate__error" role="status">
          {error}
        </p>
      )}
    </div>
  );
}
