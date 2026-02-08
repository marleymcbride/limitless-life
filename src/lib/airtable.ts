import Airtable from 'airtable';

const baseId = process.env.AIRTABLE_BASE_ID!;
const accessToken = process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN!;

const base = new Airtable({ apiKey: accessToken }).base(baseId);

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

export const airtable = {
  leads: {
    async createOrUpdate(data: LeadRecord) {
      try {
        // Check if lead exists
        const records = await base('Leads')
          .select({
            filterByFormula: `{Email} = "${escapeForFormula(data.Email)}"`,
            maxRecords: 1,
          })
          .firstPage();

        if (records.length > 0) {
          // Update existing
          await base('Leads').update(records[0].id, {
            ...data,
          });
          console.log('Airtable: Lead updated', data.Email);
        } else {
          // Create new
          await base('Leads').create([
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
        const records = await base('Leads')
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

        const records = await base('Leads')
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
        const records = await base('Leads')
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
        await base('HotLeads').create([
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
        await base('Payments').create([
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

        const records = await base('Payments')
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

        const records = await base('Payments')
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
        const records = await base('Payments')
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
};
