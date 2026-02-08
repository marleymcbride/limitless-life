'use client';

import { useState, useEffect } from 'react';
import LeadsTable from './leads-table';
import TrafficSourcesTable from './traffic-sources-table';

type Tab = 'dashboard' | 'leads' | 'traffic';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [stats, setStats] = useState({
    visitors: 0,
    hotLeads: 0,
    payments: 0,
    conversionRate: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    try {
      const res = await fetch('/api/admin/stats');
      const data = await res.json();
      setStats(data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`px-4 py-2 rounded ${
            activeTab === 'dashboard'
              ? 'bg-[#940909]'
              : 'bg-gray-800 hover:bg-gray-700'
          }`}
        >
          Dashboard
        </button>
        <button
          onClick={() => setActiveTab('leads')}
          className={`px-4 py-2 rounded ${
            activeTab === 'leads'
              ? 'bg-[#940909]'
              : 'bg-gray-800 hover:bg-gray-700'
          }`}
        >
          Leads
        </button>
        <button
          onClick={() => setActiveTab('traffic')}
          className={`px-4 py-2 rounded ${
            activeTab === 'traffic'
              ? 'bg-[#940909]'
              : 'bg-gray-800 hover:bg-gray-700'
          }`}
        >
          Traffic Sources
        </button>
      </div>

      {/* Content */}
      {activeTab === 'dashboard' && (
        <div>
          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            <div className="bg-gray-900 p-6 rounded">
              <h3 className="text-gray-400 mb-2">Today's Visitors</h3>
              <p className="text-3xl font-bold">{stats.visitors}</p>
            </div>
            <div className="bg-gray-900 p-6 rounded">
              <h3 className="text-gray-400 mb-2">Hot Leads</h3>
              <p className="text-3xl font-bold text-[#940909]">{stats.hotLeads}</p>
            </div>
            <div className="bg-gray-900 p-6 rounded">
              <h3 className="text-gray-400 mb-2">Payments (Month)</h3>
              <p className="text-3xl font-bold">${stats.payments}</p>
            </div>
            <div className="bg-gray-900 p-6 rounded">
              <h3 className="text-gray-400 mb-2">Conversion Rate</h3>
              <p className="text-3xl font-bold">{stats.conversionRate}%</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'leads' && <LeadsTable />}
      {activeTab === 'traffic' && <TrafficSourcesTable />}
    </div>
  );
}
