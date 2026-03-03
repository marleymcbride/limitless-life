'use client';

import { useState, useEffect } from 'react';
import { MetricCard } from './shared/MetricCards';

interface ScrollData {
  maxDepth: number;
  avgDepth: number;
  distribution: Array<{
    range: string;
    count: number;
    percentage: number;
  }>;
}

/**
 * ScrollDropoffAnalytics - Shows how far users scroll through your sales page
 * Identifies engagement patterns and drop-off points
 */
export function ScrollDropoffAnalytics() {
  const [data, setData] = useState<ScrollData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchScrollData();
  }, []);

  async function fetchScrollData() {
    setLoading(true);
    try {
      const response = await fetch('/api/analytics/scroll', {
        headers: { 'x-admin-api-key': process.env.NEXT_PUBLIC_ADMIN_API_KEY || '' },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch scroll data');
      }

      const result = await response.json();
      setData(result);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Scroll Depth Analytics</h1>
          <p className="text-sm text-gray-600 mt-1">Shows how far users scroll through your page</p>
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading scroll data...</div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800 font-bold">Error</p>
          <p className="text-red-600">{error}</p>
        </div>
      ) : !data ? (
        <div className="text-gray-500">No scroll data available</div>
      ) : (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <MetricCard
              title="Max Scroll Depth"
              value={`${data.maxDepth || 0}%`}
              subtitle="Of all sessions"
              change="neutral"
            />

            <MetricCard
              title="Average Scroll Depth"
              value={`${data.avgDepth || 0}%`}
              subtitle="Mean engagement"
              change="neutral"
            />
          </div>

          {/* Distribution */}
          {data.distribution && data.distribution.length > 0 && (
            <div className="bg-white border rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Depth Distribution</h2>
              <div className="space-y-3">
                {data.distribution.map((item, index) => (
                  <div key={index} className="py-3 border-b border-gray-200 last:border-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-medium text-white">{item.range}</div>
                      <div className="text-lg font-bold text-white">{item.percentage}%</div>
                    </div>
                    <div className="w-full bg-gray-200 rounded h-2">
                      <div
                        className="bg-blue-600 h-full"
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
