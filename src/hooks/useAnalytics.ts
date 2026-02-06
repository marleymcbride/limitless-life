'use client';

import { useCallback } from 'react';
import { type EventType } from '@/types';

export function useAnalytics(sessionId: string) {
  const trackEvent = useCallback(async (eventType: EventType, eventData?: any) => {
    await fetch('/api/analytics/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, eventType, eventData }),
    });
  }, [sessionId]);

  return { trackEvent };
}
