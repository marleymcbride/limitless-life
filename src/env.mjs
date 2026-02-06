/**
 * Environment Variables
 *
 * Server-side environment variables for the application.
 * These are loaded from process.env at build time.
 */

export const env = {
  DATABASE_URL: process.env.DATABASE_URL,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
  SYSTEMEIO_API_KEY: process.env.SYSTEMEIO_API_KEY || '',
  ADMIN_API_KEY: process.env.ADMIN_API_KEY || '',
  N8N_WEBHOOK_URL: process.env.N8N_WEBHOOK_URL || 'https://n8n.marleymcbride.co/webhook',
  NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
};

