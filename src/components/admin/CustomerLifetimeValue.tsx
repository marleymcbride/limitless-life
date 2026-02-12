'use client';

import { useState, useEffect } from 'react';
import { MetricCard } from './shared/MetricCards';
import { DateRangeSelector } from './shared/DateRangeSelector';

function getDaysAgo(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString();
}

interface CLVData {
  averageCLV: number;
  clvByTier: Array<{
    tier: string;
    clv: number;
    customerCount: number;
  }>;
  clvBySource: Array<{
    source: string;
    clv: number;
    customerCount: number;
  }>;
  metrics: {
    averageCLV: number;
    totalCustomers: number;
    totalRevenue: number;
    repeatPurchaseRate: number;
    purchaseFrequency: number;
  };
  period: {
    start: string;
    end: string;
  };
}

export function CustomerLifetimeValue() {
  const [data, setData] = useState<CLVData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<'7d' | '30d' | '90d'>('30d');

  useEffect(() => {
    fetchCLVData();
  }, [dateRange]);

  async function fetchCLVData() {
    setLoading(true);
    setError(null);

    const params = new URLSearchParams({
      startDate: dateRange === '7d' ? getDaysAgo(7) : dateRange === '30d' ? getDaysAgo(30) : getDaysAgo(90),
      endDate: dateRange === '7d' ? getDaysAgo(0) : dateRange === '30d' ? getDaysAgo(0) : getDaysAgo(0),
    });

    try {
      const response = await fetch(`/api/admin/clv?${params}`, {
        headers: { 'x-admin-api-key': process.env.NEXT_PUBLIC_ADMIN_API_KEY || '' },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch CLV data');
      }

      const result = await response.json();
      console.log('[CLV DASHBOARD] Data:', result);
      setData(result);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch CLV data');
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex gap-4 items-center">
        <DateRangeSelector value={dateRange} onChange={setDateRange} />
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading customer lifetime value data...</div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800 font-bold">Error</p>
          <p className="text-red-600">{error}</p>
        </div>
      ) : !data ? (
        <div className="text-gray-500">No CLV data available</div>
      ) : (
        <>
          {/* Summary Card */}
          <MetricCard
            title="Average Customer Lifetime Value"
            value={`$${Math.round(data.averageCLV).toLocaleString()}`}
            change="+5%"
            subtitle={data.period}
          />

          {/* CLV by Tier Breakdown */}
          {data.clvByTier && (
            <div className="bg-white border rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Customer Lifetime Value by Tier</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.clvByTier.map((item, index) => (
                  <TierCard
                    key={item.tier + index}
                    tier={item.tier}
                    clv={item.clv}
                    customerCount={item.customerCount}
                  />
                ))}
              </div>
            </div>
          )}

          {/* CLV by Traffic Source Breakdown */}
          {data.clvBySource && (
            <div className="bg-white border rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Customer Lifetime Value by Source</h2>
              <div className="space-y-3">
                {data.clvBySource.map((item, index) => (
                  <SourceCard
                    key={item.source + index}
                    source={item.source}
                    clv={item.clv}
                    customerCount={item.customerCount}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Repeat Purchase Rate Card */}
          <MetricCard
            title="Repeat Purchase Rate"
            value={`${data.repeatPurchaseRate}%`}
            change="+2%"
            subtitle="% of customers who bought 2+ times"
          />

          {/* Purchase Frequency Card */}
          <MetricCard
            title="Purchase Frequency"
            value={`${data.purchaseFrequency} days`}
            change="+3%"
            subtitle="Average days between purchases"
          />
        </>
      )}
    </div>
  );
}
