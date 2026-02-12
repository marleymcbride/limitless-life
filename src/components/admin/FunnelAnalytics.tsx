'use client';

import { useState, useEffect } from 'react';
import { MetricCard } from './shared/MetricCards';
import { DateRangeSelector } from './shared/DateRangeSelector';

function getDaysAgo(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString().split('T')[0];
}

interface FunnelStep {
  step: string;
  count: number;
  percentage: number;
  conversionFromPrevious: number;
}

interface FunnelData {
  totalVisitors: number;
  totalConversions: number;
  overallConversionRate: number;
  steps: FunnelStep[];
}

/**
 * FunnelAnalytics - Shows complete sales funnel performance
 * Tracks users through each stage of the funnel
 * Calculates conversion rates between steps
 */
export function FunnelAnalytics() {
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
      setData(result);
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
          <h1 className="text-3xl font-bold text-gray-900">Funnel Analytics</h1>
          <p className="text-sm text-gray-600 mt-1">Track conversion through each stage</p>
        </div>
        <DateRangeSelector value={dateRange} onChange={setDateRange} />
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading funnel data...</div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800 font-bold">Error</p>
          <p className="text-red-600">{error}</p>
        </div>
      ) : !data ? (
        <div className="text-gray-500">No funnel data available</div>
      ) : (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <MetricCard
              title="Total Visitors"
              value={data.totalVisitors.toLocaleString()}
              subtitle="Starting point"
              change="neutral"
            />

            <MetricCard
              title="Total Conversions"
              value={data.totalConversions.toLocaleString()}
              subtitle="Completed purchases"
              change="neutral"
            />

            <MetricCard
              title="Conversion Rate"
              value={`${data.overallConversionRate.toFixed(2)}%`}
              subtitle="Visitor to customer"
              change={data.overallConversionRate >= 3 ? 'green' : 'neutral'}
            />
          </div>

          {/* Funnel Steps */}
          {data.steps && data.steps.length > 0 && (
            <div className="bg-white border rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Funnel Steps</h2>
              <div className="space-y-4">
                {data.steps.map((step, index) => (
                  <div key={index} className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-500">Step {index + 1}</div>
                        <h3 className="text-lg font-bold text-gray-900">{step.step}</h3>
                      </div>
                      <div className="ml-4 text-right">
                        <div className="text-2xl font-bold text-blue-600">
                          {step.count.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-500">
                          {step.percentage}% of total
                        </div>
                      </div>
                    </div>
                    {index < data.steps.length - 1 && (
                      <div className="mt-2 flex items-center text-sm">
                        <div className="font-medium text-gray-600">
                          Conversion to next step:
                        </div>
                        <div className={`ml-2 font-bold ${
                          step.conversionFromPrevious >= 50 ? 'text-green-600' :
                          step.conversionFromPrevious >= 20 ? 'text-yellow-600' :
                          'text-red-600'
                        }`}>
                          {step.conversionFromPrevious.toFixed(1)}%
                        </div>
                      </div>
                    )}
                    <div className="w-full bg-gray-200 rounded h-2 mt-2">
                      <div
                        className="bg-blue-600 h-full"
                        style={{ width: `${step.percentage}%` }}
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
