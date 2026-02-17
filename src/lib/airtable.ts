import Airtable from 'airtable';
import { env } from '@/env.mjs';

function getBase() {
  const baseId = env.AIRTABLE_BASE_ID;
  const accessToken = env.AIRTABLE_ACCESS_TOKEN;

  if (!baseId || !accessToken) {
    throw new Error('AIRTABLE_BASE_ID and AIRTABLE_ACCESS_TOKEN environment variables must be set');
  }

  return new Airtable({ apiKey: accessToken }).base(baseId);
}

/**
 * Escapes user input for safe use in Airtable formulas
 * Prevents formula injection by doubling quotes
 */
function escapeForFormula(value: string): string {
  return value.replace(/"/g, '""');
}

interface LeadRecord {
  Email: string;
  FirstName?: string;
  LastName?: string;
  Score: number;
  Temperature: 'Hot' | 'Warm' | 'Cold';
  CreatedAt: string;
  LastActivity?: string;
  Phone?: string;
  UTMSource?: string;
  UTMCampaign?: string;
  UTMMedium?: string;
  CustomerStatus: 'prospect' | 'customer';
}

interface CampaignRecord {
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
}

export const airtable = {
  leads: {
    async createOrUpdate(data: LeadRecord) {
      try {
        // Check if lead exists
        const records = await getBase()('Leads')
          .select({
            filterByFormula: `{Email} = "${escapeForFormula(data.Email)}"`,
            maxRecords: 1,
          })
          .firstPage();

        if (records.length > 0) {
          // Update existing
          await getBase()('Leads').update(records[0].id, {
            ...data,
          });
          console.log('Airtable: Lead updated', data.Email);
        } else {
          // Create new
          await getBase()('Leads').create([
            {
              fields: data,
            },
          ]);
          console.log('Airtable: Lead created', data.Email);
        }
      } catch (error) {
        console.error('Airtable lead error:', error);
        throw error;
      }
    },

    async findHotLeads() {
      try {
        const records = await getBase()('Leads')
          .select({
            filterByFormula: `{Temperature} = "Hot"`,
            sort: [{ field: 'Score', direction: 'desc' }],
          })
          .firstPage();

        return records;
      } catch (error) {
        console.error('Airtable hot leads error:', error);
        throw error;
      }
    },

    async getAll(temperature?: 'Hot' | 'Warm' | 'Cold') {
      try {
        let formula = '';
        if (temperature) {
          formula = `{Temperature} = "${temperature}"`;
        }

        const records = await getBase()('Leads')
          .select({
            filterByFormula: formula || undefined,
            sort: [{ field: 'CreatedAt', direction: 'desc' }],
          })
          .all();

        return records;
      } catch (error) {
        console.error('Airtable get all leads error:', error);
        throw error;
      }
    },

    async getCount(temperature?: 'Hot' | 'Warm' | 'Cold') {
      try {
        let formula = '';
        if (temperature) {
          formula = `{Temperature} = "${temperature}"`;
        }

        // NOTE: This fetches all records to count them, which is inefficient for large datasets.
        // Airtable doesn't provide a native count API. Future improvement: implement pagination
        // or use a cached count field that's updated on create/delete operations.
        const records = await getBase()('Leads')
          .select({
            filterByFormula: formula || undefined,
          })
          .all();

        return records.length;
      } catch (error) {
        console.error('Airtable get leads count error:', error);
        throw error;
      }
    },
  },

  hotLeads: {
    async create(data: {
      Email: string;
      Name?: string;
      Score: number;
      WhatTheyDid?: string;
      Phone?: string;
      BecameHotAt: string;
    }) {
      try {
        await getBase()('HotLeads').create([
          {
            fields: data,
          },
        ]);
        console.log('Airtable: Hot lead created', data.Email);
      } catch (error) {
        console.error('Airtable hot lead error:', error);
        throw error;
      }
    },
  },

  payments: {
    async create(data: {
      Email: string;
      Amount: number;
      Tier: string;
      StripePaymentId: string;
      PaymentDate: string;
    }) {
      try {
        await getBase()('Payments').create([
          {
            fields: data,
          },
        ]);
        console.log('Airtable: Payment created', data.Email);
      } catch (error) {
        console.error('Airtable payment error:', error);
        throw error;
      }
    },

    async getTotalForMonth(year: number, month: number) {
      try {
        // Get first day of month and last day of month
        const firstDay = new Date(year, month, 1).toISOString();
        const lastDay = new Date(year, month + 1, 0, 23, 59, 59).toISOString();

        const records = await getBase()('Payments')
          .select({
            filterByFormula: `AND(
              IS_AFTER({PaymentDate}, "${firstDay}"),
              IS_BEFORE({PaymentDate}, "${lastDay}")
            )`,
          })
          .all();

        return records.reduce((sum, record) => {
          return sum + (record.get('Amount') as number || 0);
        }, 0);
      } catch (error) {
        console.error('Airtable get payments total error:', error);
        throw error;
      }
    },

    async getCountForMonth(year: number, month: number) {
      try {
        // Get first day of month and last day of month
        const firstDay = new Date(year, month, 1).toISOString();
        const lastDay = new Date(year, month + 1, 0, 23, 59, 59).toISOString();

        const records = await getBase()('Payments')
          .select({
            filterByFormula: `AND(
              IS_AFTER({PaymentDate}, "${firstDay}"),
              IS_BEFORE({PaymentDate}, "${lastDay}")
            )`,
          })
          .all();

        return records.length;
      } catch (error) {
        console.error('Airtable get payments count error:', error);
        throw error;
      }
    },

    async getAll() {
      try {
        const records = await getBase()('Payments')
          .select({
            sort: [{ field: 'PaymentDate', direction: 'desc' }],
          })
          .all();

        return records;
      } catch (error) {
        console.error('Airtable get all payments error:', error);
        throw error;
      }
    },
  },

  campaigns: {
    async fetchAll(): Promise<CampaignRecord[]> {
      const campaignsTableId = env.AIRTABLE_CAMPAIGNS_TABLE_ID;
      console.log('[DEBUG] env.AIRTABLE_CAMPAIGNS_TABLE_ID:', campaignsTableId);
      console.log('[DEBUG] All Airtable env values:', {
        AIRTABLE_BASE_ID: env.AIRTABLE_BASE_ID,
        AIRTABLE_ACCESS_TOKEN: env.AIRTABLE_ACCESS_TOKEN ? '***SET***' : undefined,
        AIRTABLE_CAMPAIGNS_TABLE_ID: env.AIRTABLE_CAMPAIGNS_TABLE_ID,
      });
      if (!campaignsTableId) {
        throw new Error('AIRTABLE_CAMPAIGNS_TABLE_ID environment variable is not set');
      }

      try {
        const records = await getBase()(campaignsTableId)
          .select({
            sort: [{ field: 'Published', direction: 'desc' }],
          })
          .all();

        return records.map((record) => ({
          id: record.id,
          name: record.fields.Name || record.fields.name || '',
          category: record.fields.Category || record.fields.category || 'comm',
          utmCampaign: record.fields.UTM_Campaign || record.fields.utm_campaign || '',
          sourceUrl: record.fields['Source URL'] || record.fields.source_url,
          publishedAt: record.fields.Published || record.fields.published,
          firstEventAt: record.fields['First Event'] || record.fields.first_event,
          views: record.fields.Views || record.fields.views || 0,
          clicks: record.fields.Clicks || record.fields.clicks || 0,
          emails: record.fields.Emails || record.fields.emails || 0,
          sales: record.fields.Sales || record.fields.sales || 0,
          revenue: record.fields.Revenue || record.fields.revenue || 0,
        }));
      } catch (error) {
        console.error('Airtable fetch all campaigns error:', error);
        throw error;
      }
    },

    async create(
      campaign: Omit<CampaignRecord, 'id'>
    ): Promise<CampaignRecord> {
      const campaignsTableId = env.AIRTABLE_CAMPAIGNS_TABLE_ID;
      if (!campaignsTableId) {
        throw new Error('AIRTABLE_CAMPAIGNS_TABLE_ID environment variable is not set');
      }

      try {
        const createdRecord = await getBase()(campaignsTableId).create([
          {
            fields: {
              Name: campaign.name,
              Category: campaign.category,
              UTM_Campaign: campaign.utmCampaign,
              'Source URL': campaign.sourceUrl,
              Published: campaign.publishedAt,
              'First Event': campaign.firstEventAt,
              Views: campaign.views,
              Clicks: campaign.clicks,
              Emails: campaign.emails,
              Sales: campaign.sales,
              Revenue: campaign.revenue,
            },
          },
        ]);

        return {
          ...campaign,
          id: createdRecord[0].id,
        };
      } catch (error) {
        console.error('Airtable create campaign error:', error);
        throw error;
      }
    },

    async updateMetrics(
      id: string,
      metrics: Partial<Pick<CampaignRecord, 'views' | 'clicks' | 'emails' | 'sales' | 'revenue'>>
    ): Promise<void> {
      const campaignsTableId = env.AIRTABLE_CAMPAIGNS_TABLE_ID;
      if (!campaignsTableId) {
        throw new Error('AIRTABLE_CAMPAIGNS_TABLE_ID environment variable is not set');
      }

      try {
        const fields: Record<string, number> = {};
        if (metrics.views !== undefined) fields.Views = metrics.views;
        if (metrics.clicks !== undefined) fields.Clicks = metrics.clicks;
        if (metrics.emails !== undefined) fields.Emails = metrics.emails;
        if (metrics.sales !== undefined) fields.Sales = metrics.sales;
        if (metrics.revenue !== undefined) fields.Revenue = metrics.revenue;

        await getBase()(campaignsTableId).update(id, { fields });
      } catch (error) {
        console.error('Airtable update campaign metrics error:', error);
        throw error;
      }
    },
  },
};

/**
 * Standalone function to fetch all campaigns
 * Provides a cleaner import pattern for API routes
 */
export async function fetchCampaigns(): Promise<CampaignRecord[]> {
  return airtable.campaigns.fetchAll();
}
