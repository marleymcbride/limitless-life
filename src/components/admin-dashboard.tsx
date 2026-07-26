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

const WHATSAPP_BASE = 'https://wa.me/13024800805?text=';

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

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [stats, setStats] = useState({ visitors: 0, hotLeads: 0, payments: 0, conversionRate: 0, todayRevenue: 0, monthRevenue: 0, warmLeads: 0, visitorsToday: 0, visitorsWeek: 0 });
  const [hotLeads, setHotLeads] = useState<any[]>([]);

  useEffect(() => { fetchStats(); }, []);

  async function fetchStats() {
    try {
      const res = await fetch('/api/admin/stats');
      if (!res.ok) return;
      const data = await res.json();
      setStats({
        visitors: data.visitors?.total || 0,
        hotLeads: data.leads?.hot || 0,
        payments: Math.round((data.revenue?.month || 0) / 100),
        conversionRate: data.visitors?.total > 0 ? Math.round(((data.leads?.hot || 0) / (data.visitors?.total || 1)) * 100) : 0,
        todayRevenue: data.revenue?.today || 0,
        monthRevenue: data.revenue?.month || 0,
        warmLeads: data.leads?.warm || 0,
        visitorsToday: data.visitors?.today || 0,
        visitorsWeek: data.visitors?.last7Days || 0,
      });
      setHotLeads(data.hotLeads || []);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  }

  const sidebarTabs = [
    { key: 'dashboard' as Tab, label: 'Overview', icon: '◇' },
    { key: 'revtrack' as Tab, label: 'Revtrack', icon: '▤' },
    { key: 'payments' as Tab, label: 'Payments', icon: '◆' },
    { key: 'leads' as Tab, label: 'Leads', icon: '⊕' },
    { key: 'funnel' as Tab, label: 'Funnel', icon: '⇣' },
    { key: 'traffic' as Tab, label: 'Traffic', icon: '◎' },
    { key: 'applications' as Tab, label: 'Applications', icon: '○' },
    { key: 'vsl' as Tab, label: 'VSL', icon: '▶' },
    { key: 'waitlist' as Tab, label: 'Waitlist', icon: '○' },
    { key: 'scroll' as Tab, label: 'Scroll', icon: '⇕' },
    { key: 'journey' as Tab, label: 'Journey', icon: '↗' },
    { key: 'abandoned' as Tab, label: 'Abandoned', icon: '◌' },
    { key: 'clv' as Tab, label: 'LTV', icon: '◆' },
    { key: 'revenue' as Tab, label: 'Revenue', icon: '◆' },
    { key: 'formSubmissions' as Tab, label: 'Forms', icon: '○' },
    { key: 'workWithMe' as Tab, label: '3weeks', icon: '◇' },
    { key: 'emailLeads' as Tab, label: 'Email Course', icon: '◎' },
  ];

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#050A0F' }}>
      {/* Sidebar */}
      <div className="w-48 shrink-0 border-r border-gray-800 p-4 flex flex-col" style={{ backgroundColor: '#080C12' }}>
        <div className="text-white font-bold text-sm mb-6 px-2 tracking-tight" style={{ fontFamily: 'Neuemontreal, sans-serif' }}>Limitless</div>
        <nav className="flex-1 space-y-0.5">
          {sidebarTabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`w-full text-left px-2 py-1.5 rounded text-sm transition-all ${
                activeTab === t.key ? 'bg-gray-800 text-white font-medium' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <span className="mr-2 text-xs opacity-50">{t.icon}</span>
              {t.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-8 py-10">
          {activeTab === 'dashboard' && (
            <div className="space-y-10">

              {/* Section: Revenue & reach */}
              <div>
                <h2 className="text-xs font-semibold text-gray-600 uppercase tracking-widest mb-5">Revenue & reach</h2>
                <div className="grid grid-cols-4 gap-5">
                  <div className="p-5 rounded-lg border border-gray-800" style={{ backgroundColor: '#0A0D14' }}>
                    <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-1">Revenue this month</p>
                    <p className="text-3xl font-bold text-white tracking-tight">{formatMoney(stats.monthRevenue)}</p>
                    {stats.todayRevenue > 0 && (
                      <p className="text-green-500 text-xs font-medium mt-2">+{formatMoney(stats.todayRevenue)} today</p>
                    )}
                  </div>
                  <div className="p-5 rounded-lg border border-gray-800" style={{ backgroundColor: '#0A0D14' }}>
                    <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-1">Visitors this week</p>
                    <p className="text-3xl font-bold text-white tracking-tight">{stats.visitorsWeek}</p>
                    <p className="text-gray-600 text-xs mt-2">{stats.visitorsToday} today</p>
                  </div>
                  <div className="p-5 rounded-lg border border-gray-800" style={{ backgroundColor: '#0A0D14' }}>
                    <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-1">Total visitors</p>
                    <p className="text-3xl font-bold text-white tracking-tight">{stats.visitors}</p>
                  </div>
                  <div className="p-5 rounded-lg border border-gray-800" style={{ backgroundColor: '#0A0D14' }}>
                    <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-1">Conversion rate</p>
                    <p className="text-3xl font-bold text-white tracking-tight">{stats.conversionRate}%</p>
                    <p className="text-gray-600 text-xs mt-2">Visitors → hot lead</p>
                  </div>
                </div>
              </div>

              {/* Section: Hot leads */}
              <div>
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-xs font-semibold text-gray-600 uppercase tracking-widest">Hot leads</h2>
                  {stats.hotLeads > 0 && (
                    <span className="text-xs font-medium px-2 py-0.5 rounded" style={{ backgroundColor: '#940909', color: 'white' }}>
                      {stats.hotLeads} lead{stats.hotLeads !== 1 ? 's' : ''}
                    </span>
                  )}
                </div>

                {hotLeads.length === 0 ? (
                  <div className="p-8 rounded-lg border border-gray-800 text-center" style={{ backgroundColor: '#0A0D14' }}>
                    <p className="text-gray-600 text-sm">No hot leads yet</p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    {hotLeads.map((lead: any) => {
                      const fullName = [lead.firstName, lead.lastName].filter(Boolean).join(' ');
                      const waMsg = encodeURIComponent(`Hey ${lead.firstName || 'there'}, saw you on Limitless. Ready for a quick call?`);
                      return (
                        <div key={lead.id} className="flex items-center justify-between px-5 py-3 rounded-lg border border-gray-800" style={{ backgroundColor: '#0A0D14' }}>
                          <div className="flex items-center gap-4 min-w-0">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0" style={{ backgroundColor: '#940909' }}>
                              {fullName ? fullName.charAt(0).toUpperCase() : '?'}
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="text-white text-sm font-medium truncate">{fullName || 'Unknown'}</span>
                                <span className="text-[11px] font-semibold px-1.5 py-0.5 rounded" style={{ backgroundColor: '#940909', color: 'white' }}>{lead.leadScore}</span>
                                <span className="text-gray-600 text-xs">{lead.email}</span>
                              </div>
                              {lead.latestEvent && (
                                <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                                  <span>Latest action: paid deposit</span>
                                  <span>·</span>
                                  <span>{timeAgo(lead.latestEventAt)} ago</span>
                                </div>
                              )}
                            </div>
                          </div>
                          <a href={`${WHATSAPP_BASE}${waMsg}`} target="_blank" rel="noopener noreferrer" className="shrink-0 text-sm text-blue-400 hover:text-blue-300 font-medium ml-4">
                            Message →          
                          </a>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Section: Funnel at a glance */}
              <div>
                <h2 className="text-xs font-semibold text-gray-600 uppercase tracking-widest mb-5">Funnel at a glance</h2>
                <div className="grid grid-cols-4 gap-5">
                  {[
                    { label: 'Warm leads', value: stats.warmLeads },
                    { label: 'Hot leads', value: stats.hotLeads },
                    { label: 'Warm → hot rate', value: stats.warmLeads > 0 ? `${Math.round((stats.hotLeads / (stats.warmLeads + stats.hotLeads)) * 100)}%` : '—' },
                    { label: 'Revenue / visitor', value: stats.visitors > 0 ? formatMoney(Math.round(stats.monthRevenue / stats.visitors)) : '—' },
                  ].map((item) => (
                    <div key={item.label} className="p-5 rounded-lg border border-gray-800" style={{ backgroundColor: '#0A0D14' }}>
                      <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-1">{item.label}</p>
                      <p className="text-2xl font-bold text-white tracking-tight">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab content */}
          <div className={activeTab === 'dashboard' ? 'hidden' : ''}>
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
            {activeTab === 'waitlist' && <WaitlistDashboard />}
            {activeTab === 'emailLeads' && (
              <div className="space-y-6">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
                  <h2 className="text-2xl font-bold mb-4">Email Course Leads</h2>
                  <p className="text-gray-600 mb-6">View email engagement data from the 30-day course</p>
                  <Link href="/admin/leads/email" className="inline-block bg-[#940909] text-white px-6 py-3 rounded-lg font-medium hover:bg-red-800 transition-colors">Open Email Course Leads</Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
