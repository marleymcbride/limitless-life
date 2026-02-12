'use client';

/**
 * DateRangeSelector - Date range picker for analytics dashboards
 * Allows filtering by 7, 30, or 90 days
 */

interface DateRangeSelectorProps {
  value: '7d' | '30d' | '90d';
  onChange: (value: '7d' | '30d' | '90d') => void;
}

export function DateRangeSelector({ value, onChange }: DateRangeSelectorProps) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onChange('7d')}
        className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
          value === '7d'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
        }`}
      >
        7 Days
      </button>
      <button
        onClick={() => onChange('30d')}
        className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
          value === '30d'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
        }`}
      >
        30 Days
      </button>
      <button
        onClick={() => onChange('90d')}
        className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
          value === '90d'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
        }`}
      >
        90 Days
      </button>
    </div>
  );
}
