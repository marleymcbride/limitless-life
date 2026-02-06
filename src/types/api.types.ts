/**
 * API Types
 *
 * Type-safe API request and response definitions.
 */

import { ApiResponse, PaginatedResponse, DateRange, SortField } from './app.types';

/**
 * Event tracking
 */
export interface TrackEventRequest {
  sessionId: string;
  userId?: string;
  eventType: string;
  eventData?: Record<string, unknown>;
}

export interface TrackEventResponse extends ApiResponse {
  data?: { eventId: string };
}

/**
 * Lead scoring
 */
export interface RecalculateScoreRequest {
  userId: string;
}

export interface LeadScoreResponse extends ApiResponse {
  data?: {
    score: number;
    temperature: 'cold' | 'warm' | 'hot';
    breakdown: Array<{
      eventType: string;
      count: number;
      points: number;
    }>;
  };
}

/**
 * Funnel analytics
 */
export interface FunnelMetricsRequest {
  startDate?: string;
  endDate?: string;
  breakdown?: 'none' | 'source' | 'device';
}

export interface FunnelStep {
  name: string;
  eventType: string;
  count: number;
  dropOff: number;
  dropOffPercentage: number;
  conversionRate: number;
}

export interface FunnelMetricsResponse extends ApiResponse {
  data?: {
    period: DateRange;
    steps: FunnelStep[];
    totalDropOff: number;
    overallConversionRate: number;
    dropOffs: Array<{
      step: string;
      dropOffCount: number;
      dropOffPercentage: number;
      commonReasons?: string[];
    }>;
    bySource?: Array<{
      source: string;
      count: number;
      conversionRate: number;
    }>;
    byDevice?: Array<{
      device: string;
      pageViews: number;
      conversions: number;
      conversionRate: number;
    }>;
  };
}

/**
 * Leads
 */
export interface LeadsResponse extends ApiResponse {
  data?: {
    hot: Array<{
      id: string;
      email: string;
      firstName?: string;
      lastName?: string;
      leadScore: number;
      leadTemperature?: 'cold' | 'warm' | 'hot';
      status: string;
      createdAt: string;
      updatedAt: string;
    }>;
    warm: Array<{
      id: string;
      email: string;
      firstName?: string;
      lastName?: string;
      leadScore: number;
      leadTemperature?: 'cold' | 'warm' | 'hot';
      status: string;
      createdAt: string;
      updatedAt: string;
    }>;
    cold: Array<{
      id: string;
      email: string;
      firstName?: string;
      lastName?: string;
      leadScore: number;
      leadTemperature?: 'cold' | 'warm' | 'hot';
      status: string;
      createdAt: string;
      updatedAt: string;
    }>;
  };
}

/**
 * Webhooks
 */
export interface EmailWebhookRequest {
  email: string;
  firstName?: string;
  lastName?: string;
}

export interface ApplicationWebhookRequest {
  action: 'start' | 'step' | 'complete';
  email: string;
  firstName?: string;
  lastName?: string;
  step?: string;
  stepNumber?: number;
  stepData?: Record<string, unknown>;
  applicationData?: Record<string, unknown>;
}

/**
 * Session
 */
export interface SessionResponse extends ApiResponse {
  data?: {
    sessionId: string;
  };
}

/**
 * Admin
 */
export interface AdminStatsRequest {
  startDate?: string;
  endDate?: string;
}

export interface AdminStatsResponse extends ApiResponse {
  data?: {
    totalVisitors: number;
    totalConversions: number;
    conversionRate: number;
    hotLeads: number;
    warmLeads: number;
    coldLeads: number;
    totalRevenue: number;
  };
}

/**
 * Pagination
 */
export interface PaginationParams {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

/**
 * Filter params
 */
export interface FilterParams {
  startDate?: string;
  endDate?: string;
  status?: string;
  temperature?: 'cold' | 'warm' | 'hot';
  search?: string;
}
