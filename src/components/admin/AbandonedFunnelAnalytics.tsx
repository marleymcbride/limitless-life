'use client';

import { useState, useEffect } from 'react';
import { MetricCard } from './shared/MetricCards';
import { DateRangeSelector } from './shared/DateRangeSelector';

function getDaysAgo(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString().split('T')[0];
}

interface DropOffPoint {
  step: string;
  dropOffCount: number;
  dropOffPercentage: number;
  lostRevenue: number;
}

interface FunnelData {
  totalVisitors: number;
  dropOffs: DropOffPoint[];
  overallDropOffRate: number;
}

/**
 * AbandonedFunnelAnalytics - Shows where users drop off in the sales funnel
 * Calculates revenue lost at each drop-off point
 * Helps identify problematic steps in user journey
 */
export function AbandonedFunnelAnalytics() {
  const [data, setData] = useState<FunnelData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<'7d' | '30d' | '90d'>('30d');

  useEffect(() => {
    fetchFunnelData();
  }, [dateRange]);

  async function fetchFunnelData() {
    setLoading(true);
    setError(null);

    const params = new URLSearchParams({
      startDate: dateRange === '7d' ? getDaysAgo(7) : dateRange === '30d' ? getDaysAgo(30) : getDaysAgo(90),
      endDate: dateRange === '7d' ? getDaysAgo(0) : dateRange === '30d' ? getDaysAgo(0) : getDaysAgo(0),
    });

    try {
      const response = await fetch(`/api/analytics/funnel?${params}`, {
        headers: { 'x-admin-api-key': process.env.NEXT_PUBLIC_ADMIN_API_KEY || '' },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch funnel data');
      }

      const result = await response.json();

      // Process funnel steps and identify drop-offs
      const dropOffs: DropOffPoint[] = [];
      let totalVisitors = result.metrics?.steps[0]?.count || 0;

      for (let i = 1; i < result.metrics?.steps.length && i < (result.metrics?.steps.length - 1); i++) {
        const step = result.metrics.steps[i];
        const dropOff = totalVisitors - step.count;

        if (dropOff > 0) {
          const dropOffPercentage = Math.round((dropOff / totalVisitors) * 100);

          dropOffs.push({
            step: step.name,
            dropOffCount: dropOff,
            dropOffPercentage,
            lostRevenue: dropOff * step.count * 100, // Rough estimate assuming $100 per visitor
          });
        }

        totalVisitors = step.count;
      }

      const overallDropOffRate = dropOffs.length > 0
        ? (dropOffs.reduce((sum, point) => sum + point.lostRevenue, 0) / totalVisitors)
        : 0;

      setData({
        totalVisitors,
        dropOffs,
        overallDropOffRate,
      });
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch funnel data');
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Funnel Drop-Off Analysis</h1>
          <p className="text-sm text-gray-600 mt-1">Identifies where users drop off in your funnel</p>
        </div>
        <DateRangeSelector value={dateRange} onChange={setDateRange} />
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading drop-off data...</div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800 font-bold">Error</p>
          <p className="text-red-600">{error}</p>
        </div>
      ) : !data ? (
        <div className="text-gray-500">No data available</div>
      ) : (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <MetricCard
              title="Total Visitors"
              value={data.totalVisitors.toLocaleString()}
              subtitle="Starting funnel count"
              change="neutral"
            />

            <MetricCard
              title="Overall Drop-Off Rate"
              value={`${data.overallDropOffRate.toFixed(1)}%`}
              subtitle="Avg. revenue lost per visitor"
              change="neutral"
            />
          </div>

          {/* Biggest Drop-Off Points */}
          {data.dropOffs.length > 0 && (
            <div className="bg-white border rounded-lg p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Biggest Drop-Off Points</h2>
              <div className="space-y-3">
                {data.dropOffs.slice(0, 5).map((dropOff, index) => (
                  <div
                    key={index}
                    className="border-l-4 border-red-500 bg-red-50 p-4 rounded"
                  >
                    <h3 className="text-lg font-bold text-gray-900">{dropOff.step}</h3>
                    <div className="text-2xl font-bold text-red-600 mt-2">
                      {dropOff.dropOffCount.toLocaleString()} ({dropOff.dropOffPercentage}%)
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      ~${dropOff.lostRevenue.toLocaleString()} revenue lost
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Drop-Off List */}
          <div className="bg-white border rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">All Drop-Off Points</h2>
            <div className="space-y-2">
              {data.dropOffs.map((dropOff, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-3 border-b border-gray-200 last:border-0"
                >
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">{dropOff.step}</div>
                    <div className="text-lg font-bold text-gray-900">
                      {dropOff.dropOffCount.toLocaleString()} ({dropOff.dropOffPercentage}%)
                    </div>
                  </div>
                  <div className="ml-4 text-right text-red-600">
                    ~${dropOff.lostRevenue.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
