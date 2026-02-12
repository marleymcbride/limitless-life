'use client';

import { useState, useEffect } from 'react';
import { MetricCard } from './shared/MetricCards';
import { DateRangeSelector } from './shared/DateRangeSelector';
import { SourceCard } from './shared/SourceCard';
import { CampaignCard } from './shared/CampaignCard';
import { TierCard } from './shared/TierCard';

function getDaysAgo(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString();
}

interface RevenueData {
  totalRevenue: number;
  revenueBreakdown: Array<{
    source: string;
    revenue: number;
    count: number;
    percentage: number;
  }>;
  revenueByCampaign: Array<{
    campaign: string;
    revenue: number;
    count: number;
    percentage: number;
  }>;
  revenueByTier: Array<{
    tier: string;
    revenue: number;
    count: number;
    percentage: number;
  }>;
  metrics: {
    totalRevenue: number;
    totalPayments: number;
    uniqueCustomers: number;
    averageOrderValue: number;
  };
  period: {
    start: string;
    end: string;
  };
}

export function RevenueIntelligence() {
  const [data, setData] = useState<RevenueData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [groupBy, setGroupBy] = useState<'source' | 'campaign' | 'tier'>('source');
  const [dateRange, setDateRange] = useState<'7d' | '30d' | '90d'>('30d');

  useEffect(() => {
    fetchRevenueData();
  }, [groupBy, dateRange]);

  async function fetchRevenueData() {
    setLoading(true);
    setError(null);

    const params = new URLSearchParams({
      startDate: dateRange === '7d' ? getDaysAgo(7) : dateRange === '30d' ? getDaysAgo(30) : getDaysAgo(90),
      endDate: dateRange === '7d' ? getDaysAgo(0) : dateRange === '30d' ? getDaysAgo(0) : getDaysAgo(0),
      groupBy,
    });

    try {
      const response = await fetch(`/api/admin/revenue?${params}`, {
        headers: { 'x-admin-api-key': process.env.NEXT_PUBLIC_ADMIN_API_KEY || '' },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch revenue data');
      }

      const result = await response.json();
      console.log('[REVENUE INTELLIGENCE] Data:', result);
      setData(result);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch revenue data');
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex gap-4 items-center">
        <DateRangeSelector value={dateRange} onChange={setDateRange} />
        <div className="flex gap-2">
          <button
            onClick={() => setGroupBy('source')}
            className={`px-4 py-2 rounded-lg ${
              groupBy === 'source' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            By Source
          </button>
          <button
            onClick={() => setGroupBy('campaign')}
            className={`px-4 py-2 rounded-lg ${
              groupBy === 'campaign' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            By Campaign
          </button>
          <button
            onClick={() => setGroupBy('tier')}
            className={`px-4 py-2 rounded-lg ${
              groupBy === 'tier' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            By Tier
          </button>
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading revenue data...</div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800 font-bold">Error</p>
          <p className="text-red-600">{error}</p>
        </div>
      ) : !data ? (
        <div className="text-gray-500">No revenue data available</div>
      ) : (
        <>
          {/* Summary Card */}
          <MetricCard
            title="Total Revenue"
            value={`$${data.metrics.totalRevenue.toLocaleString()}`}
            change="+12%"
            subtitle={data.period}
          />

          {/* Revenue Breakdown by Source */}
          {groupBy === 'source' && data.revenueBreakdown && (
            <div className="bg-white border rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Revenue by Traffic Source</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.revenueBreakdown.map((item, index) => (
                  <SourceCard
                    key={item.source + index}
                    source={item.source}
                    revenue={item.revenue}
                    count={item.count}
                    percentage={item.percentage}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Revenue Breakdown by Campaign */}
          {groupBy === 'campaign' && data.revenueByCampaign && (
            <div className="bg-white border rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Revenue by Campaign</h2>
              <div className="space-y-3">
                {data.revenueByCampaign.map((item, index) => (
                  <CampaignCard
                    key={item.campaign + index}
                    campaign={item.campaign}
                    revenue={item.revenue}
                    count={item.count}
                    percentage={item.percentage}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Revenue Breakdown by Tier */}
          {groupBy === 'tier' && data.revenueByTier && (
            <div className="bg-white border rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Revenue by Purchased Tier</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.revenueByTier.map((item, index) => (
                  <TierCard
                    key={item.tier + index}
                    tier={item.tier}
                    revenue={item.revenue}
                    count={item.count}
                    percentage={item.percentage}
                  />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
