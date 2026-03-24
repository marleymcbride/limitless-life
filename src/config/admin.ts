/**
 * Admin configuration for client-side access
 */
export const adminConfig = {
  apiKey: process.env.NEXT_PUBLIC_ADMIN_API_KEY || '',
} as const;
