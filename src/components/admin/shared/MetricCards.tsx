'use client';

/**
 * Shared card components for admin dashboard
 * Reusable metric display cards with consistent styling
 */

import { RevenueData } from './RevenueIntelligence';

interface CardProps {
  title: string;
  value: string;
  change?: string;
  subtitle?: string;
}

/**
 * MetricCard - Displays a single metric with large value and optional change indicator
 */
export function MetricCard({ title, value, change, subtitle }: CardProps) {
  const isPositive = change?.startsWith('+');
  const isNegative = change?.startsWith('-');

  return (
    <div className="bg-white border rounded-lg p-6 shadow-sm">
      {/* Title Row */}
      <div className="flex justify-between items-start">
        <div>
          <div className="text-2xl font-bold text-gray-900">{title}</div>
          {subtitle && (
            <div className="text-sm text-gray-500">{subtitle}</div>
          )}
        </div>
        <div className={`text-3xl font-bold ${
          isPositive ? 'text-green-600' : isNegative ? 'text-red-600' : 'text-gray-900'
        }`}>
          {value}
          {change && (
            <span className={`ml-2 text-sm font-semibold ${
              isPositive ? 'text-green-600' : 'text-red-600'
            }`}>
              {change}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * SourceCard - Displays revenue breakdown by traffic source (utm_source)
 */
interface SourceCardProps {
  source: string;
  revenue: number;
  count: number;
  percentage: number;
}

export function SourceCard({ source, revenue, count, percentage }: SourceCardProps) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="text-5xl font-bold text-gray-900">{source || '(none)'}</div>
          <div className="text-right">
            <div className="text-3xl font-bold text-blue-600">${revenue.toLocaleString()}</div>
            <div className="text-sm text-gray-500">revenue</div>
            <div className="text-sm text-gray-600">{count.toLocaleString()} visitors</div>
          </div>
        </div>
        <div className="flex-2">
          <div className="text-lg font-semibold text-green-600">{percentage}%</div>
          <div className="text-sm text-gray-500">of total revenue</div>
        </div>
      </div>
    </div>
  );
}

/**
 * CampaignCard - Displays revenue breakdown by UTM campaign
 */
interface CampaignCardProps {
  campaign: string;
  revenue: number;
  count: number;
  percentage: number;
}

export function CampaignCard({ campaign, revenue, count, percentage }: CampaignCardProps) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="text-5xl font-bold text-gray-900">{campaign || '(none)'}</div>
          <div className="text-right">
            <div className="text-3xl font-bold text-blue-600">${revenue.toLocaleString()}</div>
            <div className="text-sm text-gray-500">revenue</div>
            <div className="text-sm text-gray-600">{count.toLocaleString()} visitors</div>
          </div>
        </div>
        <div className="flex-2">
          <div className="text-lg font-semibold text-green-600">{percentage}%</div>
          <div className="text-sm text-gray-500">of total revenue</div>
        </div>
      </div>
    </div>
  );
}

/**
 * TierCard - Displays revenue breakdown by purchased tier (Access/Plus/Premium/Elite)
 */
interface TierCardProps {
  tier: string;
  revenue: number;
  count: number;
  percentage: number;
}

export function TierCard({ tier, revenue, count, percentage }: TierCardProps) {
  // Color coding by tier
  const tierColors: Record<string, string> = {
    'Access': 'bg-blue-100',
    'Plus': 'bg-blue-200',
    'Premium': 'bg-purple-600',
    'Elite': 'bg-purple-900',
  };

  const cardColor = tierColors[tier] || 'bg-gray-200';

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-baseline gap-2">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ backgroundColor: cardColor }}
            >
              <span className="text-2xl font-bold text-white">{tier.charAt(0)}</span>
            </div>
            <div className="flex-1">
              <div className="text-5xl font-bold text-gray-900">{tier}</div>
              <div className="text-sm text-gray-500">Tier</div>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-gray-900">{revenue.toLocaleString()}</div>
          <div className="text-sm text-gray-500">revenue</div>
          <div className="text-sm text-gray-600">{count.toLocaleString()} customers</div>
          <div className="flex-2">
            <div className="text-lg font-semibold text-green-600">{percentage}%</div>
            <div className="text-sm text-gray-500">of total revenue</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * DateRangeSelector - Shared date range selector component
 */
interface DateRangeSelectorProps {
  value: '7d' | '30d' | '90d';
  onChange: (value: '7d' | '30d' | '90d') => void;
}

export function DateRangeSelector({ value, onChange }: DateRangeSelectorProps) {
  const ranges = [
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' },
  ];

  return (
    <div className="flex gap-2">
      {ranges.map((range) => (
        <button
          key={range.value}
          onClick={() => onChange(range.value)}
          className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
            value === range.value
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          {range.label}
        </button>
      ))}
    </div>
  );
}
