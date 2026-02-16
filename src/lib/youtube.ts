/**
 * YouTube API Integration Helpers
 *
 * Provides utilities for interacting with YouTube Data API v3
 * to fetch video statistics and metadata for campaign tracking.
 */

export interface YouTubeVideoStats {
  videoId: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  favoriteCount: number;
  title: string;
  description: string;
  publishedAt: string;
  thumbnailUrl: string;
}

export interface YouTubeAPIError {
  error: {
    code: number;
    message: string;
    errors: Array<{
      domain: string;
      reason: string;
      message: string;
    }>;
  };
}

/**
 * Extracts YouTube video ID from various URL formats
 *
 * Supports:
 * - Standard URL: https://www.youtube.com/watch?v=VIDEO_ID
 * - Short URL: https://youtu.be/VIDEO_ID
 * - Embed URL: https://www.youtube.com/embed/VIDEO_ID
 * - Direct ID: VIDEO_ID
 *
 * @param url - YouTube URL or video ID
 * @returns YouTube video ID or null if not found
 */
export function extractYouTubeVideoId(url: string): string | null {
  if (!url || typeof url !== 'string') {
    return null;
  }

  // If it's already just an ID (11 characters)
  const directIdMatch = /^[a-zA-Z0-9_-]{11}$/.exec(url.trim());
  if (directIdMatch) {
    return directIdMatch[0];
  }

  try {
    let parsedUrl: URL;

    // Add protocol if missing for URL parsing
    const urlWithProtocol = url.startsWith('http') ? url : `https://${url}`;
    parsedUrl = new URL(urlWithProtocol);

    // Handle standard YouTube watch URLs
    if (parsedUrl.hostname === 'www.youtube.com' || parsedUrl.hostname === 'youtube.com') {
      if (parsedUrl.pathname === '/watch') {
        return parsedUrl.searchParams.get('v');
      }
      // Handle embed URLs
      if (parsedUrl.pathname.startsWith('/embed/')) {
        return parsedUrl.pathname.split('/')[2];
      }
      // Handle short URLs (redirected from youtu.be)
      if (parsedUrl.pathname.startsWith('/v/')) {
        return parsedUrl.pathname.split('/')[2];
      }
    }

    // Handle youtu.be short URLs
    if (parsedUrl.hostname === 'youtu.be') {
      return parsedUrl.pathname.slice(1); // Remove leading slash
    }

    return null;
  } catch (error) {
    // Invalid URL format
    return null;
  }
}

/**
 * Validates YouTube video ID format
 *
 * @param videoId - YouTube video ID to validate
 * @returns true if valid format, false otherwise
 */
export function isValidYouTubeVideoId(videoId: string): boolean {
  return /^[a-zA-Z0-9_-]{11}$/.test(videoId);
}

/**
 * Fetches statistics for a single YouTube video
 *
 * Requires YOUTUBE_API_KEY environment variable
 *
 * @param videoId - YouTube video ID
 * @param apiKey - YouTube Data API v3 key
 * @returns Video statistics or null if fetch fails
 */
export async function fetchYouTubeVideoStats(
  videoId: string,
  apiKey?: string
): Promise<YouTubeVideoStats | null> {
  const key = apiKey || process.env.YOUTUBE_API_KEY;

  if (!key) {
    console.error('YouTube API key not provided');
    return null;
  }

  if (!isValidYouTubeVideoId(videoId)) {
    console.error(`Invalid YouTube video ID: ${videoId}`);
    return null;
  }

  try {
    const url = new URL('https://www.googleapis.com/youtube/v3/videos');
    url.searchParams.append('part', 'statistics,snippet');
    url.searchParams.append('id', videoId);
    url.searchParams.append('key', key);

    const response = await fetch(url.toString());

    if (!response.ok) {
      const errorData: YouTubeAPIError = await response.json();
      console.error('YouTube API error:', errorData.error);
      return null;
    }

    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      console.error(`Video not found: ${videoId}`);
      return null;
    }

    const video = data.items[0];
    const statistics = video.statistics || {};
    const snippet = video.snippet || {};

    return {
      videoId,
      viewCount: parseInt(statistics.viewCount || '0', 10),
      likeCount: parseInt(statistics.likeCount || '0', 10),
      commentCount: parseInt(statistics.commentCount || '0', 10),
      favoriteCount: parseInt(statistics.favoriteCount || '0', 10),
      title: snippet.title || '',
      description: snippet.description || '',
      publishedAt: snippet.publishedAt || '',
      thumbnailUrl: snippet.thumbnails?.high?.url || snippet.thumbnails?.default?.url || '',
    };
  } catch (error) {
    console.error(`Failed to fetch YouTube video stats for ${videoId}:`, error);
    return null;
  }
}

/**
 * Fetches statistics for multiple YouTube videos in a single request
 *
 * YouTube API supports up to 50 video IDs per request
 *
 * @param videoIds - Array of YouTube video IDs (max 50)
 * @param apiKey - YouTube Data API v3 key
 * @returns Map of video IDs to their statistics
 */
export async function fetchMultipleYouTubeStats(
  videoIds: string[],
  apiKey?: string
): Promise<Map<string, YouTubeVideoStats>> {
  const results = new Map<string, YouTubeVideoStats>();
  const key = apiKey || process.env.YOUTUBE_API_KEY;

  if (!key) {
    console.error('YouTube API key not provided');
    return results;
  }

  if (!videoIds || videoIds.length === 0) {
    return results;
  }

  // YouTube API limits to 50 videos per request
  const batchSize = 50;
  const batches: string[][] = [];

  for (let i = 0; i < videoIds.length; i += batchSize) {
    batches.push(videoIds.slice(i, i + batchSize));
  }

  try {
    for (const batch of batches) {
      const validIds = batch.filter(id => isValidYouTubeVideoId(id));

      if (validIds.length === 0) {
        continue;
      }

      const url = new URL('https://www.googleapis.com/youtube/v3/videos');
      url.searchParams.append('part', 'statistics,snippet');
      url.searchParams.append('id', validIds.join(','));
      url.searchParams.append('key', key);

      const response = await fetch(url.toString());

      if (!response.ok) {
        const errorData: YouTubeAPIError = await response.json();
        console.error('YouTube API error:', errorData.error);
        continue;
      }

      const data = await response.json();

      if (data.items && Array.isArray(data.items)) {
        for (const video of data.items) {
          const statistics = video.statistics || {};
          const snippet = video.snippet || {};

          const stats: YouTubeVideoStats = {
            videoId: video.id,
            viewCount: parseInt(statistics.viewCount || '0', 10),
            likeCount: parseInt(statistics.likeCount || '0', 10),
            commentCount: parseInt(statistics.commentCount || '0', 10),
            favoriteCount: parseInt(statistics.favoriteCount || '0', 10),
            title: snippet.title || '',
            description: snippet.description || '',
            publishedAt: snippet.publishedAt || '',
            thumbnailUrl: snippet.thumbnails?.high?.url || snippet.thumbnails?.default?.url || '',
          };

          results.set(video.id, stats);
        }
      }
    }

    return results;
  } catch (error) {
    console.error('Failed to fetch multiple YouTube stats:', error);
    return results;
  }
}

/**
 * Formats view count for display
 *
 * @param views - Number of views
 * @returns Formatted string (e.g., "1.2M", "345K")
 */
export function formatViewCount(views: number): string {
  if (views >= 1000000) {
    return `${(views / 1000000).toFixed(1)}M`;
  }
  if (views >= 1000) {
    return `${(views / 1000).toFixed(1)}K`;
  }
  return views.toString();
}

/**
 * Extracts YouTube video IDs from campaign URLs
 *
 * @param campaigns - Array of campaigns with platform_content_id
 * @returns Array of unique, valid YouTube video IDs
 */
export function extractYouTubeIdsFromCampaigns(campaigns: Array<{
  platform: string;
  platform_content_id: string | null;
}>): string[] {
  const ids = new Set<string>();

  for (const campaign of campaigns) {
    if (campaign.platform === 'youtube' && campaign.platform_content_id) {
      const videoId = extractYouTubeVideoId(campaign.platform_content_id);
      if (videoId && isValidYouTubeVideoId(videoId)) {
        ids.add(videoId);
      }
    }
  }

  return Array.from(ids);
}

/**
 * Fetches YouTube thumbnails in preferred size
 *
 * Priority: maxres > high > medium > default
 *
 * @param videoId - YouTube video ID
 * @param apiKey - YouTube Data API v3 key
 * @returns Thumbnail URL or null
 */
export async function fetchYouTubeThumbnail(
  videoId: string,
  apiKey?: string
): Promise<string | null> {
  const stats = await fetchYouTubeVideoStats(videoId, apiKey);
  return stats?.thumbnailUrl || null;
}
