// src/components/admin/submissions-filters.tsx

'use client';

import { useState } from 'react';

interface SubmissionsFiltersProps {
  onFiltersChange: (filters: {
    type?: string;
    startDate?: string;
    endDate?: string;
    campaign?: string;
    email?: string;
  }) => void;
}

export default function SubmissionsFilters({ onFiltersChange }: SubmissionsFiltersProps) {
  const [type, setType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [campaign, setCampaign] = useState('');
  const [email, setEmail] = useState('');

  function handleFilterChange() {
    onFiltersChange({
      type: type || undefined,
      startDate: startDate || undefined,
      endDate: endDate || undefined,
      campaign: campaign || undefined,
      email: email || undefined,
    });
  }

  function clearFilters() {
    setType('');
    setStartDate('');
    setEndDate('');
    setCampaign('');
    setEmail('');
    onFiltersChange({});
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Type
          </label>
          <select
            value={type}
            onChange={(e) => { setType(e.target.value); handleFilterChange(); }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">All Types</option>
            <option value="course">Course</option>
            <option value="coaching">Coaching</option>
            <option value="whale">Whale/LHC</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Start Date
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => { setStartDate(e.target.value); handleFilterChange(); }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            End Date
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => { setEndDate(e.target.value); handleFilterChange(); }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Campaign
          </label>
          <input
            type="text"
            value={campaign}
            onChange={(e) => { setCampaign(e.target.value); handleFilterChange(); }}
            placeholder="Filter by campaign..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); handleFilterChange(); }}
            placeholder="Search by email..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      {(type || startDate || endDate || campaign || email) && (
        <div className="mt-4">
          <button
            onClick={clearFilters}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
