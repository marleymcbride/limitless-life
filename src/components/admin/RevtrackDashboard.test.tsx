import { render, screen, waitFor } from '@testing-library/react';
import { RevtrackDashboard } from './RevtrackDashboard';

// Mock fetch globally
const mockFetch = jest.fn();
global.fetch = mockFetch;

describe('RevtrackDashboard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Mock process.env.NEXT_PUBLIC_ADMIN_API_KEY
    process.env.NEXT_PUBLIC_ADMIN_API_KEY = 'test-api-key';
  });

  it('displays loading state initially', () => {
    mockFetch.mockImplementation(() => new Promise(() => {})); // Never resolves

    render(<RevtrackDashboard />);
    expect(screen.getByText('Loading campaign data...')).toBeInTheDocument();
  });

  it('displays campaign data in table after successful fetch', async () => {
    const mockCampaigns = [
      {
        id: '1',
        name: 'Test Campaign 1',
        category: 'video' as const,
        utmCampaign: 'test-campaign-1',
        sourceUrl: 'https://youtube.com/watch?v=test1',
        publishedAt: '2024-01-15T10:00:00Z',
        firstEventAt: '2024-01-15T10:05:00Z',
        views: 1000,
        clicks: 100,
        emails: 50,
        sales: 10,
        revenue: 500,
        revenuePerView: 0.5,
      },
      {
        id: '2',
        name: 'Test Campaign 2',
        category: 'comm' as const,
        utmCampaign: 'test-campaign-2',
        sourceUrl: 'https://example.com/post2',
        publishedAt: '2024-01-16T12:00:00Z',
        firstEventAt: '2024-01-16T12:10:00Z',
        views: 2000,
        clicks: 200,
        emails: 100,
        sales: 20,
        revenue: 1000,
        revenuePerView: 0.5,
      },
    ];

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ campaigns: mockCampaigns, total: 2 }),
    });

    render(<RevtrackDashboard />);

    // Wait for data to load
    await waitFor(() => {
      expect(screen.queryByText('Loading campaign data...')).not.toBeInTheDocument();
    });

    // Check table headers
    expect(screen.getByText('CAT')).toBeInTheDocument();
    expect(screen.getByText('PUBLISHED')).toBeInTheDocument();
    expect(screen.getByText('FIRST EVENT')).toBeInTheDocument();
    expect(screen.getByText('SOURCE')).toBeInTheDocument();
    expect(screen.getByText('VIEWS')).toBeInTheDocument();
    expect(screen.getByText('CLICKS')).toBeInTheDocument();
    expect(screen.getByText('EMAILS')).toBeInTheDocument();
    expect(screen.getByText('SALES')).toBeInTheDocument();
    expect(screen.getByText(/\(\$\)/)).toBeInTheDocument();
    expect(screen.getByText('$/VIEW')).toBeInTheDocument();

    // Check campaign data
    expect(screen.getByText('Test Campaign 1')).toBeInTheDocument();
    expect(screen.getByText('Test Campaign 2')).toBeInTheDocument();

    // Check summary stats
    expect(screen.getByText('Total Views')).toBeInTheDocument();
    expect(screen.getByText('3,000')).toBeInTheDocument(); // 1000 + 2000
    expect(screen.getByText('Total Revenue')).toBeInTheDocument();
    expect(screen.getByText(/\$1,500/)).toBeInTheDocument(); // 500 + 1000
    expect(screen.getByText('Total Sales')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument(); // 10 + 20
  });

  it('displays error message on fetch failure', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 401,
    });

    render(<RevtrackDashboard />);

    await waitFor(() => {
      expect(screen.getByText(/Error/)).toBeInTheDocument();
    });
  });

  it('displays empty state when no campaigns', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ campaigns: [], total: 0 }),
    });

    render(<RevtrackDashboard />);

    await waitFor(() => {
      expect(screen.getByText('No campaign data available')).toBeInTheDocument();
    });
  });

  it('displays color-coded category badges', async () => {
    const mockCampaigns = [
      {
        id: '1',
        name: 'Video Campaign',
        category: 'video' as const,
        utmCampaign: 'video-camp',
        views: 100,
        clicks: 10,
        emails: 5,
        sales: 1,
        revenue: 50,
        revenuePerView: 0.5,
      },
      {
        id: '2',
        name: 'Community Campaign',
        category: 'comm' as const,
        utmCampaign: 'comm-camp',
        views: 200,
        clicks: 20,
        emails: 10,
        sales: 2,
        revenue: 100,
        revenuePerView: 0.5,
      },
      {
        id: '3',
        name: 'Web Campaign',
        category: 'web' as const,
        utmCampaign: 'web-camp',
        views: 300,
        clicks: 30,
        emails: 15,
        sales: 3,
        revenue: 150,
        revenuePerView: 0.5,
      },
    ];

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ campaigns: mockCampaigns, total: 3 }),
    });

    render(<RevtrackDashboard />);

    await waitFor(() => {
      expect(screen.queryByText('Loading campaign data...')).not.toBeInTheDocument();
    });

    // Check that category badges are rendered
    expect(screen.getByText('video')).toBeInTheDocument();
    expect(screen.getByText('comm')).toBeInTheDocument();
    expect(screen.getByText('web')).toBeInTheDocument();
  });

  it('formats numbers, currency, and dates correctly', async () => {
    const mockCampaigns = [
      {
        id: '1',
        name: 'Test Campaign',
        category: 'video' as const,
        utmCampaign: 'test',
        sourceUrl: 'https://youtube.com/watch?v=test',
        publishedAt: '2024-01-15T10:00:00Z',
        firstEventAt: '2024-01-15T10:05:00Z',
        views: 1234567,
        clicks: 12345,
        emails: 1234,
        sales: 123,
        revenue: 12345.67,
        revenuePerView: 0.01,
      },
    ];

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ campaigns: mockCampaigns, total: 1 }),
    });

    render(<RevtrackDashboard />);

    await waitFor(() => {
      expect(screen.queryByText('Loading campaign data...')).not.toBeInTheDocument();
    });

    // Check number formatting (with thousands separators)
    expect(screen.getAllByText('1,234,567').length).toBeGreaterThan(0); // views
    expect(screen.getAllByText('12,345').length).toBeGreaterThan(0); // clicks
    expect(screen.getAllByText('1,234').length).toBeGreaterThan(0); // emails

    // Check currency formatting
    expect(screen.getAllByText(/\$12,345\.67/).length).toBeGreaterThan(0); // revenue
  });

  it('refreshes data when refresh button is clicked', async () => {
    const mockCampaigns = [
      {
        id: '1',
        name: 'Test Campaign',
        category: 'video' as const,
        utmCampaign: 'test',
        views: 100,
        clicks: 10,
        emails: 5,
        sales: 1,
        revenue: 50,
        revenuePerView: 0.5,
      },
    ];

    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ campaigns: mockCampaigns, total: 1 }),
    });

    render(<RevtrackDashboard />);

    // Wait for initial fetch to complete and loading to finish
    await waitFor(() => {
      expect(screen.queryByText('Loading campaign data...')).not.toBeInTheDocument();
    });

    expect(mockFetch).toHaveBeenCalledTimes(1);

    // Click refresh button
    const refreshButton = screen.getByText('Refresh Data');
    refreshButton.click();

    // Wait for second fetch
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledTimes(2);
    });
  });
});
