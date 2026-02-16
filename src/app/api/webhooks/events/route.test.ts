/**
 * Tests for n8n Webhook Endpoint for Event Tracking
 * @jest-environment node
 */

import { POST } from './route';
import { NextRequest } from 'next/server';

// Mock the database pool
jest.mock('pg', () => {
  return {
    Pool: jest.fn().mockImplementation(() => ({
      connect: jest.fn(),
    })),
  };
});

const { Pool } = require('pg');
const mockConnect = jest.fn();

// Mock environment variables
const mockEnv = {
  WEBHOOK_API_KEY: 'test-webhook-api-key',
  DATABASE_URL: 'postgresql://test',
};

describe('Webhook Event Endpoint', () => {
  let mockClient: any;

  beforeEach(() => {
    process.env.WEBHOOK_API_KEY = mockEnv.WEBHOOK_API_KEY;
    process.env.DATABASE_URL = mockEnv.DATABASE_URL;
    jest.clearAllMocks();

    // Create a fresh mock client for each test
    mockClient = {
      query: jest.fn(),
      release: jest.fn(),
    };

    // Setup Pool mock to return our mock client
    (Pool as any).mockImplementation(() => ({
      connect: jest.fn().mockResolvedValue(mockClient),
    }));
  });

  afterEach(() => {
    delete process.env.WEBHOOK_API_KEY;
    delete process.env.DATABASE_URL;
  });

  describe('Authentication', () => {
    it('should reject requests without API key', async () => {
      const request = new NextRequest('http://localhost:3000/api/webhooks/events', {
        method: 'POST',
        body: JSON.stringify({
          session_id: 'test-session',
          event_type: 'page_view',
          page_url: 'https://example.com',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.success).toBe(false);
      expect(data.error).toBe('Unauthorized');
    });

    it('should reject requests with invalid API key', async () => {
      const request = new NextRequest('http://localhost:3000/api/webhooks/events', {
        method: 'POST',
        headers: {
          'x-api-key': 'invalid-key',
        },
        body: JSON.stringify({
          session_id: 'test-session',
          event_type: 'page_view',
          page_url: 'https://example.com',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.success).toBe(false);
      expect(data.error).toBe('Unauthorized');
    });

    it('should accept requests with valid API key', async () => {
      mockClient.query
        .mockResolvedValueOnce({ rows: [] }) // No existing event
        .mockResolvedValueOnce({ rows: [] }) // No campaign match
        .mockResolvedValueOnce({ rows: [] }) // No campaign match (UTM)
        .mockResolvedValueOnce({ rows: [] }) // No campaign match (source+content)
        .mockResolvedValueOnce({ rows: [{ id: 123 }] }); // Insert result

      const request = new NextRequest('http://localhost:3000/api/webhooks/events', {
        method: 'POST',
        headers: {
          'x-api-key': mockEnv.WEBHOOK_API_KEY,
        },
        body: JSON.stringify({
          session_id: 'test-session',
          event_type: 'page_view',
          page_url: 'https://example.com',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
    });
  });

  describe('Payload Validation', () => {
    it('should reject missing session_id', async () => {
      const request = new NextRequest('http://localhost:3000/api/webhooks/events', {
        method: 'POST',
        headers: {
          'x-api-key': mockEnv.WEBHOOK_API_KEY,
        },
        body: JSON.stringify({
          event_type: 'page_view',
          page_url: 'https://example.com',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toContain('Missing required fields');
    });

    it('should reject missing event_type', async () => {
      const request = new NextRequest('http://localhost:3000/api/webhooks/events', {
        method: 'POST',
        headers: {
          'x-api-key': mockEnv.WEBHOOK_API_KEY,
        },
        body: JSON.stringify({
          session_id: 'test-session',
          page_url: 'https://example.com',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
    });

    it('should reject missing page_url', async () => {
      const request = new NextRequest('http://localhost:3000/api/webhooks/events', {
        method: 'POST',
        headers: {
          'x-api-key': mockEnv.WEBHOOK_API_KEY,
        },
        body: JSON.stringify({
          session_id: 'test-session',
          event_type: 'page_view',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
    });

    it('should reject empty session_id', async () => {
      const request = new NextRequest('http://localhost:3000/api/webhooks/events', {
        method: 'POST',
        headers: {
          'x-api-key': mockEnv.WEBHOOK_API_KEY,
        },
        body: JSON.stringify({
          session_id: '   ',
          event_type: 'page_view',
          page_url: 'https://example.com',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
    });

    it('should accept valid payload', async () => {
      mockClient.query
        .mockResolvedValueOnce({ rows: [] }) // No existing event
        .mockResolvedValueOnce({ rows: [] }) // No campaign match
        .mockResolvedValueOnce({ rows: [] }) // No campaign match (UTM)
        .mockResolvedValueOnce({ rows: [] }) // No campaign match (source+content)
        .mockResolvedValueOnce({ rows: [{ id: 123 }] }); // Insert result

      const request = new NextRequest('http://localhost:3000/api/webhooks/events', {
        method: 'POST',
        headers: {
          'x-api-key': mockEnv.WEBHOOK_API_KEY,
        },
        body: JSON.stringify({
          session_id: 'test-session',
          event_type: 'page_view',
          page_url: 'https://example.com',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
    });
  });

  describe('Event Tracking', () => {
    it('should detect existing events and return early', async () => {
      mockClient.query
        .mockResolvedValueOnce({ rows: [{ id: 456 }] }); // Existing event

      const request = new NextRequest('http://localhost:3000/api/webhooks/events', {
        method: 'POST',
        headers: {
          'x-api-key': mockEnv.WEBHOOK_API_KEY,
        },
        body: JSON.stringify({
          session_id: 'test-session',
          event_type: 'page_view',
          page_url: 'https://example.com',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.message).toBe('Event already tracked');
      expect(data.event_id).toBe(456);
    });

    it('should insert new first event', async () => {
      mockClient.query
        .mockResolvedValueOnce({ rows: [] }) // No existing event
        .mockResolvedValueOnce({ rows: [{ id: 'campaign-123' }] }) // Campaign found
        .mockResolvedValueOnce({ rows: [{ id: 789 }] }); // Insert result

      const request = new NextRequest('http://localhost:3000/api/webhooks/events', {
        method: 'POST',
        headers: {
          'x-api-key': mockEnv.WEBHOOK_API_KEY,
        },
        body: JSON.stringify({
          session_id: 'test-session',
          event_type: 'video_play',
          page_url: 'https://example.com/video',
          utm_source: 'youtube',
          utm_medium: 'video',
          utm_campaign: 'test-campaign',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.event_id).toBe(789);
      expect(mockClient.query).toHaveBeenCalledTimes(4); // Check existing, find campaign, insert, update counter
    });

    it('should handle events without campaign match', async () => {
      mockClient.query
        .mockResolvedValueOnce({ rows: [] }) // No existing event
        .mockResolvedValueOnce({ rows: [] }) // No campaign match (URL)
        .mockResolvedValueOnce({ rows: [] }) // No campaign match (UTM)
        .mockResolvedValueOnce({ rows: [] }) // No campaign match (source+content)
        .mockResolvedValueOnce({ rows: [{ id: 999 }] }); // Insert result

      const request = new NextRequest('http://localhost:3000/api/webhooks/events', {
        method: 'POST',
        headers: {
          'x-api-key': mockEnv.WEBHOOK_API_KEY,
        },
        body: JSON.stringify({
          session_id: 'test-session',
          event_type: 'page_view',
          page_url: 'https://example.com/unknown',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.event_id).toBe(999);
    });
  });

  describe('Error Handling', () => {
    it('should handle database errors', async () => {
      mockClient.query.mockRejectedValue(new Error('Database connection failed'));

      const request = new NextRequest('http://localhost:3000/api/webhooks/events', {
        method: 'POST',
        headers: {
          'x-api-key': mockEnv.WEBHOOK_API_KEY,
        },
        body: JSON.stringify({
          session_id: 'test-session',
          event_type: 'page_view',
          page_url: 'https://example.com',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.success).toBe(false);
      expect(data.error).toContain('Database connection failed');
    });

    it('should handle invalid JSON payload', async () => {
      const request = new NextRequest('http://localhost:3000/api/webhooks/events', {
        method: 'POST',
        headers: {
          'x-api-key': mockEnv.WEBHOOK_API_KEY,
          'Content-Type': 'application/json',
        },
        body: 'invalid json',
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.success).toBe(false);
    });
  });

  describe('UTM Parameter Handling', () => {
    it('should store UTM parameters when provided', async () => {
      mockClient.query
        .mockResolvedValueOnce({ rows: [] }) // No existing event
        .mockResolvedValueOnce({ rows: [] }) // No campaign match
        .mockResolvedValueOnce({ rows: [] }) // No campaign match (UTM)
        .mockResolvedValueOnce({ rows: [] }) // No campaign match (source+content)
        .mockResolvedValueOnce({ rows: [{ id: 111 }] }); // Insert result

      const request = new NextRequest('http://localhost:3000/api/webhooks/events', {
        method: 'POST',
        headers: {
          'x-api-key': mockEnv.WEBHOOK_API_KEY,
        },
        body: JSON.stringify({
          session_id: 'test-session',
          event_type: 'page_view',
          page_url: 'https://example.com',
          utm_source: 'youtube',
          utm_medium: 'video',
          utm_campaign: 'test-campaign',
          utm_content: 'video-123',
          utm_term: 'productivity tips',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);

      // Verify insert query includes UTM parameters
      const insertCall = mockClient.query.mock.calls[4];
      expect(insertCall[1]).toContain('youtube');
      expect(insertCall[1]).toContain('video');
      expect(insertCall[1]).toContain('test-campaign');
    });
  });
});
