/**
 * Application Types
 *
 * Central type definitions for the Limitless Life application.
 * Export all types from here for easy importing.
 */

// Analytics types
export * from './analytics';

// User types
export * from './user';

// VSL types
export * from './vsl.types';

/**
 * Application-wide types
 */

/** API response wrapper */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/** Paginated response */
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

/** Date range filter */
export interface DateRange {
  start: Date | string;
  end: Date | string;
}

/** Device type */
export type DeviceType = 'mobile' | 'tablet' | 'desktop';

/** Traffic source */
export interface TrafficSource {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  referrer?: string;
}

/** Sort order */
export type SortOrder = 'asc' | 'desc';

/** Sort field */
export interface SortField {
  field: string;
  order: SortOrder;
}

/** Environment */
export type Environment = 'development' | 'production' | 'test';

/** Log level */
export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

/** Environment configuration */
export interface EnvConfig {
  DATABASE_URL: string;
  SYSTEMEIO_API_KEY: string;
  STRIPE_SECRET_KEY: string;
  STRIPE_WEBHOOK_SECRET: string;
  N8N_WEBHOOK_URL?: string;
  ADMIN_API_KEY: string;
  NODE_ENV: Environment;
  NEXT_PUBLIC_APP_URL: string;
}

/**
 * Feature flags
 */
export interface FeatureFlags {
  enableAnalytics: boolean;
  enableVSLTracking: boolean;
  enableLeadScoring: boolean;
  enableWebhookQueue: boolean;
  enableLazyLoading: boolean;
  enableVideoOptimization: boolean;
}

/**
 * App configuration
 */
export interface AppConfig {
  env: Environment;
  features: FeatureFlags;
  version: string;
  buildTime: string;
}
