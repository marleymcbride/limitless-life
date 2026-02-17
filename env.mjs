import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    SYSTEMEIO_API_KEY: z.string().min(1),
    STRIPE_SECRET_KEY: z.string().min(1),
    STRIPE_WEBHOOK_SECRET: z.string().min(1),
    N8N_WEBHOOK_URL: z.string().url().optional(),
    ADMIN_API_KEY: z.string().min(1),
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    AIRTABLE_BASE_ID: z.string().min(1).optional(),
    AIRTABLE_ACCESS_TOKEN: z.string().min(1).optional(),
    AIRTABLE_CAMPAIGNS_TABLE_ID: z.string().min(1).optional(),
    AIRTABLE_FILLOUT_PERSONAL_ACCESS_TOKEN: z.string().min(1).optional(),
    AIRTABLE_FILLOUT_BASE_ID: z.string().min(1).optional(),
    AIRTABLE_FILLOUT_SUBMISSIONS_TABLE_ID: z.string().min(1).optional(),
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.string().url(),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    SYSTEMEIO_API_KEY: process.env.SYSTEMEIO_API_KEY,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    N8N_WEBHOOK_URL: process.env.N8N_WEBHOOK_URL,
    ADMIN_API_KEY: process.env.ADMIN_API_KEY,
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    AIRTABLE_BASE_ID: process.env.AIRTABLE_BASE_ID,
    AIRTABLE_ACCESS_TOKEN: process.env.AIRTABLE_ACCESS_TOKEN,
    AIRTABLE_CAMPAIGNS_TABLE_ID: process.env.AIRTABLE_CAMPAIGNS_TABLE_ID,
    AIRTABLE_FILLOUT_PERSONAL_ACCESS_TOKEN: process.env.AIRTABLE_FILLOUT_PERSONAL_ACCESS_TOKEN,
    AIRTABLE_FILLOUT_BASE_ID: process.env.AIRTABLE_FILLOUT_BASE_ID,
    AIRTABLE_FILLOUT_SUBMISSIONS_TABLE_ID: process.env.AIRTABLE_FILLOUT_SUBMISSIONS_TABLE_ID,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
