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
import WaitlistDashboard from './admin/waitlist/WaitlistDashboard';

type Tab = 'dashboard' | 'revtrack' | 'revenue' | 'clv' | 'applications' | 'formSubmissions' | 'leads' | 'traffic' | 'funnel' | 'vsl' | 'scroll' | 'journey' | 'abandoned' | 'payments' | 'workWithMe' | 'emailLeads' | 'waitlist';

const WHATSAPP_BASE = 'https://web.whatsapp.com';
const formatMoney = (cents: number) => `£${(cents / 100).toLocaleString()}`;
const timeAgo = (dateStr: string | null) => {
  if (!dateStr) return '';
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h`;
  return `${Math.floor(hours / 24)}d`;
};

const stageLabel = (event: string | null) => {
  if (!event) return '';
  if (event === 'pricing_plan_selected') return 'Selected a plan';
  if (event === 'checkout_initiated' || event === 'stripe_checkout_initiated') return 'Reached checkout';
  if (event === 'pricing_view') return 'Viewed pricing';
  if (event === 'email_submit') return 'Submitted email';
  if (event === 'vsl_start') return 'Started VSL';
  if (event === 'concierge_deposit_paid') return 'Paid deposit';
  if (event === 'payment_complete') return 'Paid in full';
  return event;
};

const navItems: { key: Tab; label: string }[] = [
  { key: 'dashboard', label: 'Overview' },
  { key: 'revtrack', label: 'Revtrack' },
  { key: 'payments', label: 'Payments' },
  { key: 'leads', label: 'Leads' },
  { key: 'funnel', label: 'Funnel' },
  { key: 'traffic', label: 'Traffic' },
  { key: 'revenue', label: 'Revenue' },
  { key: 'clv', label: 'LTV' },
  { key: 'vsl', label: 'VSL' },
  { key: 'scroll', label: 'Scroll' },
  { key: 'journey', label: 'Journey' },
  { key: 'abandoned', label: 'Abandoned' },
  { key: 'waitlist', label: 'Waitlist' },
  { key: 'applications', label: 'Applications' },
  { key: 'workWithMe', label: '3weeks' },
  { key: 'emailLeads', label: 'Email' },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [stats, setStats] = useState({ monthRevenue: 0, todayRevenue: 0, newLeads: 0, newCustomers: 0, readyToJoin: 0, newClients: 0, hotLeadsCount: 0, visitorsToday: 0, visitorsWeek: 0 });
  const [groups, setGroups] = useState({ newLeads: [], readyToJoin: [], newClients: [], newCustomers: [], hotLeads: [] });

  useEffect(() => { fetchStats(); }, []);

  async function fetchStats() {
    try {
      const res = await fetch('/api/admin/stats');
      if (!res.ok) return;
      const d = await res.json();
      setStats({
        monthRevenue: d.revenue?.month || 0,
        todayRevenue: d.revenue?.today || 0,
        newLeads: d.counts?.newLeads || 0,
        newCustomers: d.counts?.newCustomers || 0,
        readyToJoin: d.counts?.readyToJoin || 0,
        newClients: d.counts?.newClients || 0,
        hotLeadsCount: d.counts?.hotLeads || 0,
        visitorsToday: d.visitors?.today || 0,
        visitorsWeek: d.visitors?.last7Days || 0,
      });
      setGroups(d.groups || { newLeads: [], readyToJoin: [], newClients: [], newCustomers: [], hotLeads: [] });
    } catch (_) {}
  }

  const renderLeadRow = (lead: any) => {
    const name = [lead.firstName, lead.lastName].filter(Boolean).join(' ') || lead.email;
    const initial = (lead.firstName || lead.email || '?').charAt(0).toUpperCase();
    return (
      <div key={lead.id} className="flex items-center justify-between px-4 py-3 border-b border-gray-800 last:border-0 hover:bg-gray-800/30" style={{ backgroundColor: '#0A0D14' }}>
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0 text-white" style={{ backgroundColor: '#940909' }}>
            {initial}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-white text-sm font-medium truncate">{name}</span>
              <span className="text-[11px] font-bold px-1.5 py-0.5 rounded text-white" style={{ backgroundColor: '#940909' }}>{lead.leadScore}</span>
            </div>
            <div className="text-xs text-gray-500 truncate">{lead.email}</div>
          </div>
        </div>
        {lead.latestEvent && (
          <div className="text-xs text-gray-400 shrink-0 mr-4">{stageLabel(lead.latestEvent)}</div>
        )}
        {lead.latestEventAt && (
          <div className="text-xs text-gray-600 shrink-0 w-12 text-right">{timeAgo(lead.latestEventAt)}</div>
        )}
        <a href={WHATSAPP_BASE} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-400 hover:text-blue-300 shrink-0 ml-3 font-medium">
          Message →
        </a>
      </div>
    );
  };

  const EmptyState = ({ text }: { text: string }) => (
    <div className="flex items-center justify-center h-40 text-gray-600 text-xs">{text}</div>
  );

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#050A0F' }}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-8 py-4 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <span className="text-white font-bold text-base" style={{ fontFamily: 'Neuemontreal, sans-serif' }}>Limitless</span>
          <span className="text-gray-600 text-xs font-medium ml-2">/ admin</span>
        </div>
        <div className="flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                activeTab === item.key
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main area */}
      <div className="flex-1 overflow-y-auto p-8">
        {activeTab === 'dashboard' ? (
          <div className="max-w-6xl mx-auto">

            {/* Revenue hero row */}
            <div className="flex items-center justify-between mb-10">
              <div>
                <p className="text-gray-500 text-xs font-medium uppercase tracking-widest mb-2">Revenue this month</p>
                <div className="flex items-end gap-4">
                  <span className="text-5xl font-bold text-white tracking-tight">{formatMoney(stats.monthRevenue)}</span>
                  {stats.todayRevenue > 0 && (
                    <span className="text-green-500 text-base font-medium mb-1">+{formatMoney(stats.todayRevenue)} today</span>
                  )}
                </div>
              </div>
              <div className="flex gap-8">
                <div className="text-right">
                  <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">New leads</p>
                  <span className="text-2xl font-bold text-white">{stats.newLeads}</span>
                </div>
                <div className="text-right">
                  <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Today</p>
                  <span className="text-2xl font-bold text-white">{stats.visitorsToday}</span>
                </div>
                <div className="text-right">
                  <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Week</p>
                  <span className="text-2xl font-bold text-white">{stats.visitorsWeek}</span>
                </div>
              </div>
            </div>

            {/* 2x2 grid of people sections */}
            <div className="grid grid-cols-2 gap-5">
              {[
                { title: 'Applicants (deposit paid)', desc: 'Deposit paid — ready to onboard', count: stats.readyToJoin, data: groups.readyToJoin, color: '#1a5c2a' },
                { title: 'New clients', desc: 'Paid for full coaching programme', count: stats.newClients, data: groups.newClients, color: '#1a5c2a' },
                { title: 'Hottest leads', desc: 'Almost there — just need a push', count: stats.hotLeadsCount, data: groups.hotLeads, color: '#940909' },
                { title: 'New customers', desc: 'Purchased a course or event ticket', count: stats.newCustomers, data: groups.newCustomers, color: '#6366f1' },
              ].map((section) => (
                <div key={section.title} className="rounded-xl border border-gray-800 overflow-hidden" style={{ backgroundColor: '#0A0D14' }}>
                  <div className="flex items-center justify-between px-5 py-4 border-b border-gray-800">
                    <div>
                      <h3 className="text-white text-sm font-semibold">{section.title}</h3>
                      <p className="text-gray-600 text-xs mt-0.5">{section.desc}</p>
                    </div>
                    <span className="text-xs font-bold px-2 py-1 rounded text-white" style={{ backgroundColor: section.color }}>{section.count}</span>
                  </div>
                  <div className="divide-y divide-gray-800">
                    {section.data.length === 0 ? (
                      <div className="flex items-center justify-center h-40 text-gray-600 text-xs">No data yet</div>
                    ) : (
                      section.data.map(renderLeadRow)
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : activeTab === 'revtrack' ? (
          <RevtrackDashboard />
        ) : (
          <div className="max-w-6xl mx-auto">
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
            {activeTab === 'waitlist' && <WaitlistDashboard />}
            {activeTab === 'emailLeads' && (
              <div className="p-10 rounded-xl border border-gray-800 text-center" style={{ backgroundColor: '#0A0D14' }}>
                <p className="text-white text-lg font-bold mb-2">Email Course Leads</p>
                <p className="text-gray-500 text-sm mb-5">View email engagement data from the 30-day course</p>
                <Link href="/admin/leads/email" className="inline-block bg-red-700 text-white px-5 py-2 rounded-lg text-sm font-medium">Open Email Course Leads</Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
