/**
 * Tests for YouTube API Integration Helpers
 */

import {
  extractYouTubeVideoId,
  isValidYouTubeVideoId,
  fetchYouTubeVideoStats,
  fetchMultipleYouTubeStats,
  formatViewCount,
  extractYouTubeIdsFromCampaigns,
  fetchYouTubeThumbnail,
} from './youtube';

// Mock fetch for API calls
global.fetch = jest.fn();

describe('YouTube API Helpers', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('extractYouTubeVideoId', () => {
    it('should extract video ID from standard watch URL', () => {
      const url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
      expect(extractYouTubeVideoId(url)).toBe('dQw4w9WgXcQ');
    });

    it('should extract video ID from youtu.be short URL', () => {
      const url = 'https://youtu.be/dQw4w9WgXcQ';
      expect(extractYouTubeVideoId(url)).toBe('dQw4w9WgXcQ');
    });

    it('should extract video ID from embed URL', () => {
      const url = 'https://www.youtube.com/embed/dQw4w9WgXcQ';
      expect(extractYouTubeVideoId(url)).toBe('dQw4w9WgXcQ');
    });

    it('should extract video ID from short URL format', () => {
      const url = 'https://www.youtube.com/v/dQw4w9WgXcQ';
      expect(extractYouTubeVideoId(url)).toBe('dQw4w9WgXcQ');
    });

    it('should return video ID if it is already just an ID', () => {
      const videoId = 'dQw4w9WgXcQ';
      expect(extractYouTubeVideoId(videoId)).toBe('dQw4w9WgXcQ');
    });

    it('should handle URLs without protocol', () => {
      const url = 'youtube.com/watch?v=dQw4w9WgXcQ';
      expect(extractYouTubeVideoId(url)).toBe('dQw4w9WgXcQ');
    });

    it('should handle URLs with www', () => {
      const url = 'www.youtube.com/watch?v=dQw4w9WgXcQ';
      expect(extractYouTubeVideoId(url)).toBe('dQw4w9WgXcQ');
    });

    it('should return null for invalid URLs', () => {
      expect(extractYouTubeVideoId('not-a-valid-url-format')).toBeNull();
    });

    it('should return null for empty string', () => {
      expect(extractYouTubeVideoId('')).toBeNull();
    });

    it('should return null for null input', () => {
      expect(extractYouTubeVideoId(null as any)).toBeNull();
    });

    it('should handle URLs with additional parameters', () => {
      const url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=30s';
      expect(extractYouTubeVideoId(url)).toBe('dQw4w9WgXcQ');
    });
  });

  describe('isValidYouTubeVideoId', () => {
    it('should validate correct 11-character IDs', () => {
      expect(isValidYouTubeVideoId('dQw4w9WgXcQ')).toBe(true);
      expect(isValidYouTubeVideoId('abc123DEF45')).toBe(true);
      expect(isValidYouTubeVideoId('12345678901')).toBe(true);
    });

    it('should reject IDs that are too short', () => {
      expect(isValidYouTubeVideoId('abc123')).toBe(false);
      expect(isValidYouTubeVideoId('')).toBe(false);
    });

    it('should reject IDs that are too long', () => {
      expect(isValidYouTubeVideoId('dQw4w9WgXcQ123')).toBe(false);
    });

    it('should reject IDs with invalid characters', () => {
      expect(isValidYouTubeVideoId('dQw4w9WgXc!')).toBe(false);
      expect(isValidYouTubeVideoId('dQw4w9 WgXc')).toBe(false);
    });

    it('should reject null or undefined', () => {
      expect(isValidYouTubeVideoId(null as any)).toBe(false);
      expect(isValidYouTubeVideoId(undefined as any)).toBe(false);
    });
  });

  describe('fetchYouTubeVideoStats', () => {
    const mockVideoId = 'dQw4w9WgXcQ';
    const mockApiKey = 'test-api-key';

    const mockResponse = {
      items: [
        {
          id: mockVideoId,
          statistics: {
            viewCount: '1000000',
            likeCount: '50000',
            commentCount: '1000',
            favoriteCount: '500',
          },
          snippet: {
            title: 'Test Video',
            description: 'Test description',
            publishedAt: '2024-01-01T00:00:00Z',
            thumbnails: {
              high: {
                url: 'https://example.com/thumb.jpg',
              },
            },
          },
        },
      ],
    };

    beforeEach(() => {
      process.env.YOUTUBE_API_KEY = mockApiKey;
    });

    afterEach(() => {
      delete process.env.YOUTUBE_API_KEY;
    });

    it('should fetch video stats successfully', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await fetchYouTubeVideoStats(mockVideoId);

      expect(result).toEqual({
        videoId: mockVideoId,
        viewCount: 1000000,
        likeCount: 50000,
        commentCount: 1000,
        favoriteCount: 500,
        title: 'Test Video',
        description: 'Test description',
        publishedAt: '2024-01-01T00:00:00Z',
        thumbnailUrl: 'https://example.com/thumb.jpg',
      });
    });

    it('should handle missing API key', async () => {
      delete process.env.YOUTUBE_API_KEY;

      const result = await fetchYouTubeVideoStats(mockVideoId);

      expect(result).toBeNull();
      expect(global.fetch).not.toHaveBeenCalled();
    });

    it('should handle invalid video ID', async () => {
      const result = await fetchYouTubeVideoStats('invalid-id');

      expect(result).toBeNull();
      expect(global.fetch).not.toHaveBeenCalled();
    });

    it('should handle API error response', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        json: async () => ({
          error: {
            code: 404,
            message: 'Video not found',
            errors: [],
          },
        }),
      });

      const result = await fetchYouTubeVideoStats(mockVideoId);

      expect(result).toBeNull();
    });

    it('should handle video not found', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ items: [] }),
      });

      const result = await fetchYouTubeVideoStats(mockVideoId);

      expect(result).toBeNull();
    });

    it('should handle network errors', async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

      const result = await fetchYouTubeVideoStats(mockVideoId);

      expect(result).toBeNull();
    });
  });

  describe('fetchMultipleYouTubeStats', () => {
    const mockApiKey = 'test-api-key';

    beforeEach(() => {
      process.env.YOUTUBE_API_KEY = mockApiKey;
    });

    afterEach(() => {
      delete process.env.YOUTUBE_API_KEY;
    });

    it('should fetch multiple videos in single request', async () => {
      const videoIds = ['dQw4w9WgXcQ', 'abc123DEF45'];

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          items: [
            {
              id: 'dQw4w9WgXcQ',
              statistics: { viewCount: '1000000', likeCount: '50000', commentCount: '1000', favoriteCount: '500' },
              snippet: {
                title: 'Video 1',
                description: 'Description 1',
                publishedAt: '2024-01-01T00:00:00Z',
                thumbnails: { high: { url: 'https://example.com/thumb1.jpg' } },
              },
            },
            {
              id: 'abc123DEF45',
              statistics: { viewCount: '500000', likeCount: '25000', commentCount: '500', favoriteCount: '250' },
              snippet: {
                title: 'Video 2',
                description: 'Description 2',
                publishedAt: '2024-01-02T00:00:00Z',
                thumbnails: { high: { url: 'https://example.com/thumb2.jpg' } },
              },
            },
          ],
        }),
      });

      const result = await fetchMultipleYouTubeStats(videoIds);

      expect(result.size).toBe(2);
      expect(result.get('dQw4w9WgXcQ')?.viewCount).toBe(1000000);
      expect(result.get('abc123DEF45')?.viewCount).toBe(500000);
    });

    it('should handle empty array', async () => {
      const result = await fetchMultipleYouTubeStats([]);

      expect(result.size).toBe(0);
      expect(global.fetch).not.toHaveBeenCalled();
    });

    it('should filter out invalid video IDs', async () => {
      const videoIds = ['dQw4w9WgXcQ', 'invalid', 'abc123DEF45'];

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          items: [
            {
              id: 'dQw4w9WgXcQ',
              statistics: { viewCount: '1000000', likeCount: '50000', commentCount: '1000', favoriteCount: '500' },
              snippet: {
                title: 'Video 1',
                description: 'Description 1',
                publishedAt: '2024-01-01T00:00:00Z',
                thumbnails: { high: { url: 'https://example.com/thumb1.jpg' } },
              },
            },
          ],
        }),
      });

      const result = await fetchMultipleYouTubeStats(videoIds);

      expect(result.size).toBe(1);
      expect(result.has('dQw4w9WgXcQ')).toBe(true);
    });

    it('should split requests into batches of 50', async () => {
      const videoIds = Array.from({ length: 100 }, (_, i) => `video${i}`.padEnd(11, '0'));

      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => ({ items: [] }),
      });

      await fetchMultipleYouTubeStats(videoIds);

      expect(global.fetch).toHaveBeenCalledTimes(2);
    });
  });

  describe('formatViewCount', () => {
    it('should format millions', () => {
      expect(formatViewCount(1500000)).toBe('1.5M');
      expect(formatViewCount(1000000)).toBe('1.0M');
    });

    it('should format thousands', () => {
      expect(formatViewCount(1500)).toBe('1.5K');
      expect(formatViewCount(1000)).toBe('1.0K');
      expect(formatViewCount(12345)).toBe('12.3K');
    });

    it('should return string for small numbers', () => {
      expect(formatViewCount(999)).toBe('999');
      expect(formatViewCount(0)).toBe('0');
      expect(formatViewCount(5)).toBe('5');
    });
  });

  describe('extractYouTubeIdsFromCampaigns', () => {
    it('should extract YouTube IDs from campaigns', () => {
      const campaigns = [
        { platform: 'youtube', platform_content_id: 'dQw4w9WgXcQ' },
        { platform: 'youtube', platform_content_id: 'https://youtube.com/watch?v=abc123DEF45' },
        { platform: 'reddit', platform_content_id: 'reddit123' },
        { platform: 'youtube', platform_content_id: null },
      ];

      const result = extractYouTubeIdsFromCampaigns(campaigns);

      expect(result).toEqual(['dQw4w9WgXcQ', 'abc123DEF45']);
    });

    it('should deduplicate IDs', () => {
      const campaigns = [
        { platform: 'youtube', platform_content_id: 'dQw4w9WgXcQ' },
        { platform: 'youtube', platform_content_id: 'dQw4w9WgXcQ' },
      ];

      const result = extractYouTubeIdsFromCampaigns(campaigns);

      expect(result).toEqual(['dQw4w9WgXcQ']);
    });

    it('should return empty array for no campaigns', () => {
      const result = extractYouTubeIdsFromCampaigns([]);
      expect(result).toEqual([]);
    });

    it('should filter out invalid IDs', () => {
      const campaigns = [
        { platform: 'youtube', platform_content_id: 'dQw4w9WgXcQ' },
        { platform: 'youtube', platform_content_id: 'invalid' },
      ];

      const result = extractYouTubeIdsFromCampaigns(campaigns);

      expect(result).toEqual(['dQw4w9WgXcQ']);
    });
  });

  describe('fetchYouTubeThumbnail', () => {
    const mockApiKey = 'test-api-key';
    const mockVideoId = 'dQw4w9WgXcQ';

    beforeEach(() => {
      process.env.YOUTUBE_API_KEY = mockApiKey;
    });

    afterEach(() => {
      delete process.env.YOUTUBE_API_KEY;
    });

    it('should return thumbnail URL', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          items: [
            {
              id: mockVideoId,
              statistics: { viewCount: '1000000', likeCount: '50000', commentCount: '1000', favoriteCount: '500' },
              snippet: {
                title: 'Test Video',
                description: 'Test',
                publishedAt: '2024-01-01T00:00:00Z',
                thumbnails: {
                  high: { url: 'https://example.com/thumb.jpg' },
                },
              },
            },
          ],
        }),
      });

      const result = await fetchYouTubeThumbnail(mockVideoId);

      expect(result).toBe('https://example.com/thumb.jpg');
    });

    it('should return null if video not found', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ items: [] }),
      });

      const result = await fetchYouTubeThumbnail(mockVideoId);

      expect(result).toBeNull();
    });
  });
});
