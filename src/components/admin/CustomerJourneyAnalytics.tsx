'use client';

import { useState, useEffect } from 'react';
import { MetricCard } from './shared/MetricCards';
import { DateRangeSelector } from './shared/DateRangeSelector';

function getDaysAgo(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString().split('T')[0];
}

interface JourneyEvent {
  timestamp: string;
  eventType: string;
  description: string;
  metadata?: Record<string, any>;
}

interface JourneyData {
  userId: string;
  email: string;
  events: JourneyEvent[];
  totalEvents: number;
  period: {
    start: string;
    end: string;
  };
}

/**
 * CustomerJourneyAnalytics - Shows complete customer journey timeline
 * Tracks every touchpoint from first visit to purchase
 * Helps sales team understand full customer story before outreach
 */
export function CustomerJourneyAnalytics() {
  const [data, setData] = useState<JourneyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string>('');
  const [dateRange, setDateRange] = useState<'7d' | '30d' | '90d'>('30d');

  useEffect(() => {
    if (userId) {
      fetchJourneyData(userId);
    }
  }, [userId, dateRange]);

  async function fetchJourneyData(userId: string) {
    setLoading(true);
    setError(null);

    const params = new URLSearchParams({
      startDate: dateRange === '7d' ? getDaysAgo(7) : dateRange === '30d' ? getDaysAgo(30) : getDaysAgo(90),
      endDate: dateRange === '7d' ? getDaysAgo(0) : dateRange === '30d' ? getDaysAgo(0) : getDaysAgo(0),
    });

    try {
      const response = await fetch(`/api/analytics/journey?userId=${userId}&${params}`, {
        headers: { 'x-admin-api-key': process.env.NEXT_PUBLIC_ADMIN_API_KEY || '' },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch journey data');
      }

      const result = await response.json();
      console.log('[JOURNEY] Data:', result);
      setData(result);
      setLoading(false);
    } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch journey data');
        setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Customer Journey Analytics</h1>
          <p className="text-sm text-gray-600 mt-1">Track complete customer journey from first visit</p>
        </div>
        <DateRangeSelector value={dateRange} onChange={setDateRange} />
      </div>

      {/* User Selection */}
      <div className="bg-white border rounded-lg p-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Enter User ID or Email</label>
        <input
          type="text"
          placeholder="user@example.com"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Loading State */}
      {loading && userId && (
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading journey data...</div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800 font-bold">Error</p>
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {/* Journey Data */}
      {data && !loading && !error && (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              title="Total Events"
              value={data.totalEvents?.toLocaleString() || '0'}
              subtitle="All touchpoints"
              change="neutral"
            />

            <MetricCard
              title="Journey Length"
              value={data.events?.length?.toString() || '0'}
              subtitle="Total events tracked"
              change="neutral"
            />
          </div>

          {/* Timeline */}
          <div className="bg-white border rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Customer Journey Timeline</h2>
            {data.events && data.events.length > 0 ? (
              <div className="space-y-4">
                {data.events.slice(0, 10).map((event, index) => (
                  <div key={index} className="flex items-start py-3 border-b border-gray-200 last:border-0">
                    <div className="flex-shrink-0 mr-4">
                      <div className={`w-3 h-3 rounded-full mt-1 ${getEventColor(event.eventType)}`}></div>
                    </div>
                    <div className="flex-1">
                      <div className="text-xs text-gray-500 mb-1">
                        {new Date(event.timestamp).toLocaleString()}
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        {event.description}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {event.eventType}
                      </div>
                    </div>
                  </div>
                ))}
                {data.events.length > 10 && (
                  <div className="text-center mt-4">
                    <button
                      onClick={() => {
                        const currentLength = data.events?.length || 0;
                        const limit = Math.min(currentLength + 10, Math.floor(currentLength * 1.5));
                        console.log('Loading more events, current:', limit);
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Load More Events
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-gray-500">No events available</div>
            )}
          </div>
        </>
      )}

      {/* Empty State */}
      {!userId && !loading && !error && (
        <div className="bg-gray-50 border rounded-lg p-12 text-center">
          <p className="text-gray-500">Enter a user ID or email address to view their journey</p>
        </div>
      )}
    </div>
  );
}

function getEventColor(eventType: string): string {
  const colors: Record<string, string> = {
    'page_view': 'bg-gray-200',
    'vsl_start': 'bg-blue-200',
    'vsl_milestone': 'bg-blue-300',
    'email_submit': 'bg-green-200',
    'application_start': 'bg-purple-200',
    'application_complete': 'bg-purple-900',
    'pricing_view': 'bg-yellow-200',
    'payment_complete': 'bg-green-600',
  };

  return colors[eventType] || 'bg-gray-300';
}
