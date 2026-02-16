/**
 * Jest tests for Revtrack API endpoint
 * Tests the actual Next.js route handler with mocked dependencies
 */

import { GET } from './route';
import { NextRequest } from 'next/server';
import { fetchCampaigns } from '@/lib/airtable';

// Mock the fetchCampaigns function
jest.mock('@/lib/airtable', () => ({
  fetchCampaigns: jest.fn(),
}));

// Mock the env module
jest.mock('@/env.mjs', () => ({
  env: {
    ADMIN_API_KEY: 'test-api-key',
    DATABASE_URL: 'postgresql://test',
    SYSTEMEIO_API_KEY: 'test-key',
    STRIPE_SECRET_KEY: 'test-key',
    STRIPE_WEBHOOK_SECRET: 'test-secret',
    NODE_ENV: 'test',
    NEXT_PUBLIC_APP_URL: 'http://localhost:3000',
  },
}));

describe('GET /api/admin/revtrack', () => {
  let mockRequest: NextRequest;

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();

    // Create a mock NextRequest
    mockRequest = {
      headers: {
        get: jest.fn(),
      },
    } as unknown as NextRequest;
  });

  describe('Authentication', () => {
    it('should return 401 when API key is missing', async () => {
      // Mock the headers.get to return null (no API key)
      (mockRequest.headers.get as jest.Mock).mockReturnValue(null);

      const response = await GET(mockRequest);
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data).toEqual({ error: 'Unauthorized' });
    });

    it('should return 401 when API key is invalid', async () => {
      // Mock the headers.get to return an invalid API key
      (mockRequest.headers.get as jest.Mock).mockReturnValue('invalid-key');

      const response = await GET(mockRequest);
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data).toEqual({ error: 'Unauthorized' });
    });

    it('should accept requests with valid API key', async () => {
      // Mock the headers.get to return a valid API key
      (mockRequest.headers.get as jest.Mock).mockReturnValue('test-api-key');

      // Mock fetchCampaigns to return sample data
      const mockCampaigns = [
        {
          id: 'camp1',
          name: 'Test Campaign',
          category: 'video' as const,
          utmCampaign: 'test-campaign',
          views: 1000,
          revenue: 500,
        },
      ];
      (fetchCampaigns as jest.Mock).mockResolvedValue(mockCampaigns);

      const response = await GET(mockRequest);

      expect(response.status).not.toBe(401);
    });
  });

  describe('Successful Response', () => {
    beforeEach(() => {
      // Set up valid authentication for all success tests
      (mockRequest.headers.get as jest.Mock).mockReturnValue('test-api-key');
    });

    it('should return campaigns with revenuePerView calculation', async () => {
      const mockCampaigns = [
        {
          id: 'camp1',
          name: 'Test Campaign 1',
          category: 'video' as const,
          utmCampaign: 'test-campaign-1',
          sourceUrl: 'https://example.com/video1',
          publishedAt: '2024-01-15',
          firstEventAt: '2024-01-15',
          views: 1000,
          clicks: 100,
          emails: 50,
          sales: 5,
          revenue: 500,
        },
        {
          id: 'camp2',
          name: 'Test Campaign 2',
          category: 'comm' as const,
          utmCampaign: 'test-campaign-2',
          sourceUrl: 'https://example.com/post1',
          publishedAt: '2024-01-16',
          firstEventAt: '2024-01-16',
          views: 0,
          clicks: 0,
          emails: 0,
          sales: 0,
          revenue: 0,
        },
      ];

      (fetchCampaigns as jest.Mock).mockResolvedValue(mockCampaigns);

      const response = await GET(mockRequest);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.campaigns).toHaveLength(2);
      expect(data.total).toBe(2);

      // Check first campaign revenuePerView calculation
      expect(data.campaigns[0].revenuePerView).toBe(0.5);

      // Check second campaign revenuePerView (should be 0 when views is 0)
      expect(data.campaigns[1].revenuePerView).toBe(0);
    });

    it('should include all required fields in campaign objects', async () => {
      const mockCampaigns = [
        {
          id: 'camp1',
          name: 'Test Campaign',
          category: 'web' as const,
          utmCampaign: 'test-campaign',
          sourceUrl: 'https://example.com',
          publishedAt: '2024-01-15',
          firstEventAt: '2024-01-15',
          views: 100,
          clicks: 10,
          emails: 5,
          sales: 1,
          revenue: 100,
        },
      ];

      (fetchCampaigns as jest.Mock).mockResolvedValue(mockCampaigns);

      const response = await GET(mockRequest);
      const data = await response.json();

      const campaign = data.campaigns[0];
      expect(campaign).toHaveProperty('id');
      expect(campaign).toHaveProperty('name');
      expect(campaign).toHaveProperty('category');
      expect(campaign).toHaveProperty('utmCampaign');
      expect(campaign).toHaveProperty('views');
      expect(campaign).toHaveProperty('clicks');
      expect(campaign).toHaveProperty('emails');
      expect(campaign).toHaveProperty('sales');
      expect(campaign).toHaveProperty('revenue');
      expect(campaign).toHaveProperty('revenuePerView');
    });

    it('should handle campaigns with optional fields missing', async () => {
      const mockCampaigns = [
        {
          id: 'camp1',
          name: 'Minimal Campaign',
          category: 'comm' as const,
          utmCampaign: 'minimal-campaign',
          views: 50,
          clicks: 5,
          emails: 2,
          sales: 0,
          revenue: 0,
        },
      ];

      (fetchCampaigns as jest.Mock).mockResolvedValue(mockCampaigns);

      const response = await GET(mockRequest);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.campaigns[0].sourceUrl).toBeUndefined();
      expect(data.campaigns[0].publishedAt).toBeUndefined();
      expect(data.campaigns[0].firstEventAt).toBeUndefined();
    });

    it('should calculate revenuePerView correctly for different values', async () => {
      const mockCampaigns = [
        {
          id: 'camp1',
          name: 'High Revenue Campaign',
          category: 'video' as const,
          utmCampaign: 'high-revenue',
          views: 1000,
          clicks: 100,
          emails: 50,
          sales: 10,
          revenue: 2000,
        },
        {
          id: 'camp2',
          name: 'Low Revenue Campaign',
          category: 'video' as const,
          utmCampaign: 'low-revenue',
          views: 500,
          clicks: 50,
          emails: 25,
          sales: 2,
          revenue: 100,
        },
      ];

      (fetchCampaigns as jest.Mock).mockResolvedValue(mockCampaigns);

      const response = await GET(mockRequest);
      const data = await response.json();

      expect(data.campaigns[0].revenuePerView).toBe(2.0);
      expect(data.campaigns[1].revenuePerView).toBe(0.2);
    });

    it('should return empty array when no campaigns exist', async () => {
      (fetchCampaigns as jest.Mock).mockResolvedValue([]);

      const response = await GET(mockRequest);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.campaigns).toHaveLength(0);
      expect(data.total).toBe(0);
    });
  });

  describe('Error Handling', () => {
    beforeEach(() => {
      // Set up valid authentication for all error tests
      (mockRequest.headers.get as jest.Mock).mockReturnValue('test-api-key');
    });

    it('should return 500 when fetchCampaigns throws an error', async () => {
      const mockError = new Error('Airtable connection failed');
      (fetchCampaigns as jest.Mock).mockRejectedValue(mockError);

      const response = await GET(mockRequest);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe('Failed to fetch campaigns');
      expect(data.message).toBe('Airtable connection failed');
    });

    it('should return 500 with unknown error message when error is not an Error instance', async () => {
      (fetchCampaigns as jest.Mock).mockRejectedValue('Unknown error');

      const response = await GET(mockRequest);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe('Failed to fetch campaigns');
      expect(data.message).toBe('Unknown error');
    });
  });

  describe('Data Structure', () => {
    beforeEach(() => {
      (mockRequest.headers.get as jest.Mock).mockReturnValue('test-api-key');
    });

    it('should maintain campaign category types', async () => {
      const mockCampaigns = [
        {
          id: 'camp1',
          name: 'Video Campaign',
          category: 'video' as const,
          utmCampaign: 'video',
          views: 100,
          clicks: 10,
          emails: 5,
          sales: 1,
          revenue: 100,
        },
        {
          id: 'camp2',
          name: 'Community Campaign',
          category: 'comm' as const,
          utmCampaign: 'comm',
          views: 200,
          clicks: 20,
          emails: 10,
          sales: 2,
          revenue: 200,
        },
        {
          id: 'camp3',
          name: 'Web Campaign',
          category: 'web' as const,
          utmCampaign: 'web',
          views: 300,
          clicks: 30,
          emails: 15,
          sales: 3,
          revenue: 300,
        },
      ];

      (fetchCampaigns as jest.Mock).mockResolvedValue(mockCampaigns);

      const response = await GET(mockRequest);
      const data = await response.json();

      expect(data.campaigns[0].category).toBe('video');
      expect(data.campaigns[1].category).toBe('comm');
      expect(data.campaigns[2].category).toBe('web');
    });
  });
});
