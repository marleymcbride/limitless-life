'use client';

import { useState, useEffect } from 'react';

interface CampaignData {
  id: string;
  name: string;
  category: 'comm' | 'video' | 'web';
  utmCampaign: string;
  sourceUrl?: string;
  publishedAt?: string;
  firstEventAt?: string;
  views: number;
  clicks: number;
  emails: number;
  sales: number;
  revenue: number;
  revenuePerView: number;
}

interface RevtrackResponse {
  campaigns: CampaignData[];
  total: number;
}

/**
 * Format number with thousands separator
 */
function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num);
}

/**
 * Format number as currency
 */
function formatCurrency(num: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
}

/**
 * Format date in en-GB locale (DD/MM/YYYY)
 */
function formatDate(dateString?: string): string {
  if (!dateString) return '-';
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(dateString));
}

/**
 * Get category badge color
 */
function getCategoryColor(category: string): string {
  switch (category) {
    case 'video':
      return 'bg-blue-100 text-blue-800';
    case 'comm':
      return 'bg-green-100 text-green-800';
    case 'web':
      return 'bg-purple-100 text-purple-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

/**
 * RevtrackDashboard - Campaign revenue and performance tracking
 * Displays campaign metrics with revenue per view calculations
 * Shows color-coded categories and summary statistics
 */
export function RevtrackDashboard() {
  const [data, setData] = useState<CampaignData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/admin/revtrack', {
        headers: {
          'x-admin-api-key': process.env.NEXT_PUBLIC_ADMIN_API_KEY || '',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch campaign data: ${response.statusText}`);
      }

      const result: RevtrackResponse = await response.json();
      setData(result.campaigns);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch campaign data');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Calculate summary stats
  const totalViews = data?.reduce((sum, camp) => sum + camp.views, 0) || 0;
  const totalRevenue = data?.reduce((sum, camp) => sum + camp.revenue, 0) || 0;
  const totalSales = data?.reduce((sum, camp) => sum + camp.sales, 0) || 0;
  const avgRevenuePerView = totalViews > 0 ? totalRevenue / totalViews : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Revtrack Dashboard</h1>
          <p className="text-sm text-gray-600 mt-1">Campaign revenue and performance tracking</p>
        </div>
        <button
          onClick={fetchData}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Refresh Data'}
        </button>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading campaign data...</div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800 font-bold">Error</p>
          <p className="text-red-600">{error}</p>
        </div>
      ) : !data || data.length === 0 ? (
        <div className="text-gray-500">No campaign data available</div>
      ) : (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white border rounded-lg p-6 shadow-sm">
              <div className="text-sm text-gray-500 mb-1">Total Views</div>
              <div className="text-3xl font-bold text-gray-900">{formatNumber(totalViews)}</div>
            </div>

            <div className="bg-white border rounded-lg p-6 shadow-sm">
              <div className="text-sm text-gray-500 mb-1">Total Revenue</div>
              <div className="text-3xl font-bold text-green-600">{formatCurrency(totalRevenue)}</div>
            </div>

            <div className="bg-white border rounded-lg p-6 shadow-sm">
              <div className="text-sm text-gray-500 mb-1">Total Sales</div>
              <div className="text-3xl font-bold text-gray-900">{formatNumber(totalSales)}</div>
            </div>

            <div className="bg-white border rounded-lg p-6 shadow-sm">
              <div className="text-sm text-gray-500 mb-1">Avg Rev/View</div>
              <div className="text-3xl font-bold text-gray-900">{formatCurrency(avgRevenuePerView)}</div>
            </div>
          </div>

          {/* Campaigns Table */}
          <div className="bg-white border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-900">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      CAT
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      PUBLISHED
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      FIRST EVENT
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      SOURCE
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                      VIEWS
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                      CLICKS
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                      EMAILS
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                      SALES
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                      ($)
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                      $/VIEW
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data.map((campaign) => (
                    <tr key={campaign.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(
                            campaign.category
                          )}`}
                        >
                          {campaign.category}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(campaign.publishedAt)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(campaign.firstEventAt)}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 max-w-xs truncate">
                        {campaign.sourceUrl ? (
                          <a
                            href={campaign.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            {campaign.name}
                          </a>
                        ) : (
                          <span>{campaign.name}</span>
                        )}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 text-right">
                        {formatNumber(campaign.views)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 text-right">
                        {formatNumber(campaign.clicks)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 text-right">
                        {formatNumber(campaign.emails)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 text-right">
                        {formatNumber(campaign.sales)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-green-600 font-medium text-right">
                        {formatCurrency(campaign.revenue)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 text-right">
                        {formatCurrency(campaign.revenuePerView)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
