'use client';

import { useState, useEffect } from 'react';
import LeadsTable from './leads-table';
import TrafficSourcesTable from './traffic-sources-table';
import FunnelAnalytics from './admin/funnel-analytics';
import VSLDropoffAnalytics from './admin/vsl-dropoff-analytics';
import ScrollDropoffAnalytics from './admin/scroll-dropoff-analytics';
import CustomerJourneyAnalytics from './admin/customer-journey-analytics';
import AbandonedFunnelAnalytics from './admin/abandoned-funnel-analytics';
import PaymentsAnalytics from './admin/payments-analytics';
import { RevenueIntelligence } from './admin/RevenueIntelligence';
import { CustomerLifetimeValue } from './admin/CustomerLifetimeValue';

type Tab =
  | 'dashboard'
  | 'revenue'
  | 'clv'
  | 'leads'
  | 'traffic'
  | 'funnel'
  | 'vsl'
  | 'scroll'
  | 'journey'
  | 'abandoned'
  | 'payments';

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
      const res = await fetch('/api/admin/stats', {
        headers: { 'x-admin-api-key': process.env.NEXT_PUBLIC_ADMIN_API_KEY || '' }
      });
      const data = await res.json();
      setStats(data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  }

  const tabs: { key: Tab; label: string }[] = [
    { key: 'dashboard', label: 'Dashboard' },
    { key: 'revenue', label: 'Revenue Intelligence' },
    { key: 'clv', label: 'Customer Lifetime Value' },
    { key: 'payments', label: 'Payments & Customers' },
    { key: 'funnel', label: 'Funnel Analytics' },
    { key: 'vsl', label: 'VSL Drop-off' },
    { key: 'scroll', label: 'Scroll Analytics' },
    { key: 'journey', label: 'Customer Journey' },
    { key: 'abandoned', label: 'Abandoned Funnel' },
    { key: 'leads', label: 'Leads' },
    { key: 'traffic', label: 'Traffic Sources' },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
              activeTab === tab.key
                ? 'bg-[#940909] text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === 'dashboard' && (
        <div>
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gray-900 p-6 rounded border border-gray-800">
              <h3 className="text-gray-400 mb-2">Today's Visitors</h3>
              <p className="text-3xl font-bold">{stats.visitors}</p>
            </div>
            <div className="bg-gray-900 p-6 rounded border border-gray-800">
              <h3 className="text-gray-400 mb-2">Hot Leads</h3>
              <p className="text-3xl font-bold text-[#940909]">{stats.hotLeads}</p>
            </div>
            <div className="bg-gray-900 p-6 rounded border border-gray-800">
              <h3 className="text-gray-400 mb-2">Payments (Month)</h3>
              <p className="text-3xl font-bold">${stats.payments}</p>
            </div>
            <div className="bg-gray-900 p-6 rounded border border-gray-800">
              <h3 className="text-gray-400 mb-2">Conversion Rate</h3>
              <p className="text-3xl font-bold">{stats.conversionRate}%</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'revenue' && <RevenueIntelligence />}
      {activeTab === 'clv' && <CustomerLifetimeValue />}
      {activeTab === 'funnel' && <FunnelAnalytics />}
      {activeTab === 'vsl' && <VSLDropoffAnalytics />}
      {activeTab === 'scroll' && <ScrollDropoffAnalytics />}
      {activeTab === 'journey' && <CustomerJourneyAnalytics />}
      {activeTab === 'abandoned' && <AbandonedFunnelAnalytics />}
      {activeTab === 'payments' && <PaymentsAnalytics />}
      {activeTab === 'leads' && <LeadsTable />}
      {activeTab === 'traffic' && <TrafficSourcesTable />}
    </div>
  );
}
