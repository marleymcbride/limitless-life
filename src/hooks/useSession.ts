'use client';

import { useEffect, useState } from 'react';

export interface SessionData {
  sessionId: string;
  userId?: string;
}

/**
 * Hook to fetch and manage user session data
 * Handles session initialization and provides session ID for analytics tracking
 */
export function useSession() {
  const [session, setSession] = useState<SessionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await fetch('/api/session');

        if (!response.ok) {
          throw new Error(`Failed to fetch session: ${response.statusText}`);
        }

        const data = await response.json();
        setSession(data);
      } catch (err) {
        console.error('Failed to get session:', err);
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, []);

  return { session, loading, error };
}
