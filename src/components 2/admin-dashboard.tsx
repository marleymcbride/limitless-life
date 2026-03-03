'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import LeadsTable from './admin/LeadsTable';
import TrafficSourcesTable from './admin/TrafficSourcesTable';
import FunnelAnalytics from './admin/funnel-analytics';
import VSLDropoffAnalytics from './admin/vsl-dropoff-analytics';
import ScrollDropoffAnalytics from './admin/scroll-dropoff-analytics';
import CustomerJourneyAnalytics from './admin/customer-journey-analytics';
import AbandonedFunnelAnalytics from './admin/abandoned-funnel-analytics';
import PaymentsAnalytics from './admin/payments-analytics';
import { RevenueIntelligence } from './admin/RevenueIntelligence';
import { CustomerLifetimeValue } from './admin/CustomerLifetimeValue';
import { RevtrackDashboard } from './admin/RevtrackDashboard';
import ApplicationsTable from './admin/ApplicationsTable';
import FormSubmissionsTable from './admin/FormSubmissionsTable';
import { WorkWithMeLeads } from './admin/WorkWithMeLeads';

type Tab =
  | 'dashboard'
  | 'revtrack'
  | 'revenue'
  | 'clv'
  | 'applications'
  | 'formSubmissions'
  | 'leads'
  | 'traffic'
  | 'funnel'
  | 'vsl'
  | 'scroll'
  | 'journey'
  | 'abandoned'
  | 'payments'
  | 'workWithMe'
  | 'emailLeads';

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

  const tabGroups = [
    {
      label: '💰 Revenue & Sales',
      tabs: [
        { key: 'revtrack' as Tab, label: 'Revtrack' },
        { key: 'revenue' as Tab, label: 'Revenue Intelligence' },
        { key: 'clv' as Tab, label: 'Customer Lifetime Value' },
        { key: 'payments' as Tab, label: 'Payments & Customers' },
      ]
    },
    {
      label: '🎯 Leads & Prospects',
      tabs: [
        { key: 'applications' as Tab, label: 'Applications' },
        { key: 'formSubmissions' as Tab, label: 'Form Submissions' },
        { key: 'leads' as Tab, label: 'Leads' },
        { key: 'traffic' as Tab, label: 'Traffic Sources' },
        { key: 'abandoned' as Tab, label: 'Abandoned Funnel' },
        { key: 'workWithMe' as Tab, label: '3weeks' },
        { key: 'emailLeads' as Tab, label: 'Email Course' },
      ]
    },
    {
      label: '📊 Analytics & Funnel',
      tabs: [
        { key: 'funnel' as Tab, label: 'Funnel Analytics' },
        { key: 'vsl' as Tab, label: 'VSL Drop-off' },
        { key: 'scroll' as Tab, label: 'Scroll Analytics' },
        { key: 'journey' as Tab, label: 'Customer Journey' },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

      {/* Tab Groups */}
      <div className="flex flex-wrap gap-8 mb-8">
        {tabGroups.map((group) => (
          <div key={group.label} className="flex-1 min-w-[280px]">
            <div className="text-xs text-gray-400 mb-3 px-2 font-semibold uppercase tracking-wider">
              {group.label}
            </div>
            <div className="flex flex-wrap gap-2">
              {group.tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeTab === tab.key
                      ? 'bg-[#940909] text-white shadow-lg shadow-red-900/20'
                      : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700 border border-gray-700/50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
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

      {activeTab === 'revtrack' && <RevtrackDashboard />}
      {activeTab === 'revenue' && <RevenueIntelligence />}
      {activeTab === 'clv' && <CustomerLifetimeValue />}
      {activeTab === 'funnel' && <FunnelAnalytics />}
      {activeTab === 'vsl' && <VSLDropoffAnalytics />}
      {activeTab === 'scroll' && <ScrollDropoffAnalytics />}
      {activeTab === 'journey' && <CustomerJourneyAnalytics />}
      {activeTab === 'abandoned' && <AbandonedFunnelAnalytics />}
      {activeTab === 'payments' && <PaymentsAnalytics />}
      {activeTab === 'applications' && <ApplicationsTable />}
      {activeTab === 'formSubmissions' && <FormSubmissionsTable />}
      {activeTab === 'leads' && <LeadsTable />}
      {activeTab === 'traffic' && <TrafficSourcesTable />}
      {activeTab === 'workWithMe' && <WorkWithMeLeads />}
      {activeTab === 'emailLeads' && (
        <div className="space-y-6">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Email Course Leads</h2>
            <p className="text-gray-600 mb-6">
              View email engagement data from the 30-day course
            </p>
            <Link
              href="/admin/leads/email"
              className="inline-block bg-[#940909] text-white px-6 py-3 rounded-lg font-medium hover:bg-red-800 transition-colors"
            >
              Open Email Course Leads
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
