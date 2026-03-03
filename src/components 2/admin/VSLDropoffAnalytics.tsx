'use client';

import { useState, useEffect } from 'react';
import { MetricCard } from './shared/MetricCards';
import { DateRangeSelector } from './shared/DateRangeSelector';

function getDaysAgo(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString();
}

interface MilestoneData {
  milestone: string;
  count: number;
  percentage: number;
  dropOffFromPrevious: number;
}

interface VSLData {
  totalStarted: number;
  totalCompleted: number;
  avgCompletionRate: number;
  milestones: MilestoneData[];
}

/**
 * VSLDropoffAnalytics - Shows where users drop off during the video sales letter
 * Identifies which parts of the video lose the most viewers
 * Helps optimize video content for better engagement
 */
export function VSLDropoffAnalytics() {
  const [data, setData] = useState<VSLData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<'7d' | '30d' | '90d'>('30d');

  useEffect(() => {
    fetchVSLData();
  }, [dateRange]);

  async function fetchVSLData() {
    setLoading(true);
    setError(null);

    const params = new URLSearchParams({
      startDate: dateRange === '7d' ? getDaysAgo(7) : dateRange === '30d' ? getDaysAgo(30) : getDaysAgo(90),
      endDate: dateRange === '7d' ? getDaysAgo(0) : dateRange === '30d' ? getDaysAgo(0) : getDaysAgo(0),
    });

    try {
      const response = await fetch(`/api/analytics/vsl-dropoff?${params}`, {
        headers: { 'x-admin-api-key': process.env.NEXT_PUBLIC_ADMIN_API_KEY || '' },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch VSL data');
      }

      const result = await response.json();
      setData(result);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch VSL data');
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">VSL Drop-Off Analytics</h1>
          <p className="text-sm text-gray-600 mt-1">Shows where users stop watching your video</p>
        </div>
        <DateRangeSelector value={dateRange} onChange={setDateRange} />
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading VSL data...</div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800 font-bold">Error</p>
          <p className="text-red-600">{error}</p>
        </div>
      ) : !data ? (
        <div className="text-gray-500">No VSL data available</div>
      ) : (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <MetricCard
              title="Total Started"
              value={data.totalStarted.toLocaleString()}
              subtitle="Video plays initiated"
              change="neutral"
            />

            <MetricCard
              title="Completion Rate"
              value={`${data.avgCompletionRate.toFixed(1)}%`}
              subtitle="Average watch-through"
              change="neutral"
            />

            <MetricCard
              title="Completed Views"
              value={data.totalCompleted.toLocaleString()}
              subtitle="Watched to end"
              change="neutral"
            />
          </div>

          {/* Milestone Drop-offs */}
          {data.milestones && data.milestones.length > 0 && (
            <div className="bg-white border rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Drop-Off by Milestone</h2>
              <div className="space-y-3">
                {data.milestones.map((milestone, index) => {
                  const dropOffColor = milestone.dropOffFromPrevious > 30 ? 'text-red-600' :
                                     milestone.dropOffFromPrevious > 15 ? 'text-yellow-600' :
                                     'text-green-600';

                  return (
                    <div key={index} className="py-3 border-b border-gray-200 last:border-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex-1">
                          <div className="text-sm font-medium text-white">{milestone.milestone}</div>
                          <div className="text-xs text-gray-500 mt-1">
                            {milestone.count.toLocaleString()} viewers ({milestone.percentage}%)
                          </div>
                        </div>
                        <div className="ml-4 text-right">
                          <div className={`text-lg font-bold ${dropOffColor}`}>
                            {milestone.dropOffFromPrevious > 0 ? '-' : ''}{milestone.dropOffFromPrevious}%
                          </div>
                          <div className="text-xs text-gray-500">drop-off</div>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded h-2">
                        <div
                          className={`h-full ${milestone.dropOffFromPrevious > 30 ? 'bg-red-600' :
                                            milestone.dropOffFromPrevious > 15 ? 'bg-yellow-600' :
                                            'bg-green-600'}`}
                          style={{ width: `${milestone.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
