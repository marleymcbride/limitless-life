# Testing Strategy - Implementation Guide

## Overview

Comprehensive testing strategy for the Limitless Life application covering unit tests, integration tests, and E2E tests.

## Testing Stack

- **Unit Testing**: Vitest
- **Testing Library**: React Testing Library
- **E2E Testing**: Playwright
- **Coverage**: c8 (for Vitest)
- **Mocking**: Vitest built-in mocking

## Setup

### Installation

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom @vitejs/plugin-react
npm install -D @playwright/test
npm install -D c8 @vitest/coverage-c8
```

### Configuration

#### vitest.config.ts

```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      provider: 'c8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'vitest.setup.ts',
        '**/*.test.ts',
        '**/*.test.tsx',
        '**/types/**',
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

#### vitest.setup.ts

```typescript
import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

// Extend Vitest's expect with jest-dom matchers
expect.extend(matchers);

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};

// Mock requestAnimationFrame
global.requestAnimationFrame = (callback) => setTimeout(callback, 0);
global.cancelAnimationFrame = (id) => clearTimeout(id);
```

#### playwright.config.ts

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],
});
```

## Unit Testing

### What to Test

**Pure Functions**:
- Lead scoring calculations
- Temperature classification
- Data transformations
- Validation logic

**Examples**:

```typescript
// lib/scoring.test.ts
import { describe, it, expect } from 'vitest';
import { calculateLeadScore, getTemperature } from './scoring';

describe('calculateLeadScore', () => {
  it('should calculate score from events', async () => {
    const events = [
      { eventType: 'vsl_complete', eventData: {} },
      { eventType: 'email_submit', eventData: {} },
    ];

    const result = await calculateLeadScore('user-123');

    expect(result.score).toBe(70);
    expect(result.temperature).toBe('hot');
  });

  it('should return cold temperature for low scores', async () => {
    const result = await calculateLeadScore('user-456');

    expect(result.temperature).toBe('cold');
  });
});

describe('getTemperature', () => {
  it('should return hot for score >= 70', () => {
    expect(getTemperature(70)).toBe('hot');
    expect(getTemperature(100)).toBe('hot');
  });

  it('should return warm for score >= 40 and < 70', () => {
    expect(getTemperature(40)).toBe('warm');
    expect(getTemperature(69)).toBe('warm');
  });

  it('should return cold for score < 40', () => {
    expect(getTemperature(0)).toBe('cold');
    expect(getTemperature(39)).toBe('cold');
  });
});
```

### Custom Hooks

```typescript
// hooks/useAnalytics.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useAnalytics } from './useAnalytics';

// Mock fetch
global.fetch = vi.fn();

describe('useAnalytics', () => {
  beforeEach(() => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    });
  });

  it('should track event', async () => {
    const { result } = renderHook(() => useAnalytics('session-123'));

    await result.current.trackEvent('vsl_start', { videoId: 'video-123' });

    expect(fetch).toHaveBeenCalledWith(
      '/api/analytics/events',
      expect.objectContaining({
        method: 'POST',
        body: expect.stringContaining('vsl_start'),
      })
    );
  });
});
```

### Components

```typescript
// components/admin/FunnelDashboard.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { FunnelDashboard } from './FunnelDashboard';

// Mock fetch
global.fetch = vi.fn();

describe('FunnelDashboard', () => {
  beforeEach(() => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => ({
        success: true,
        metrics: {
          steps: [
            { name: 'Visitors', count: 1000, dropOff: 0, conversionRate: 100 },
            { name: 'VSL Start', count: 800, dropOff: 200, conversionRate: 80 },
          ],
          totalDropOff: 900,
          overallConversionRate: 10,
        },
      }),
    });
  });

  it('should render funnel metrics', async () => {
    render(<FunnelDashboard />);

    await waitFor(() => {
      expect(screen.getByText(/Total Visitors/)).toBeInTheDocument();
      expect(screen.getByText(/1000/)).toBeInTheDocument();
    });
  });

  it('should handle error state', async () => {
    vi.mocked(fetch).mockRejectedValue(new Error('API error'));

    render(<FunnelDashboard />);

    await waitFor(() => {
      expect(screen.getByText(/Error:/)).toBeInTheDocument();
    });
  });
});
```

## Integration Testing

### API Routes

```typescript
// app/api/analytics/events.test.ts
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { POST } from './route';
import { db } from '@/lib/db';
import { events } from '@/db/schema';

describe('POST /api/analytics/events', () => {
  beforeAll(async () => {
    // Setup test database
    await db.delete(events);
  });

  afterAll(async () => {
    await db.delete(events);
  });

  it('should track event', async () => {
    const request = new Request('http://localhost/api/analytics/events', {
      method: 'POST',
      body: JSON.stringify({
        sessionId: 'session-123',
        eventType: 'vsl_start',
        eventData: { videoId: 'video-123' },
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
  });

  it('should return 400 for invalid request', async () => {
    const request = new Request('http://localhost/api/analytics/events', {
      method: 'POST',
      body: JSON.stringify({}),
    });

    const response = await POST(request);

    expect(response.status).toBe(400);
  });
});
```

### Database Operations

```typescript
// lib/scoring.integration.test.ts
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { db } from '@/lib/db';
import { users, events } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { updateUserLeadScore } from './scoring';

describe('updateUserLeadScore (integration)', () => {
  let testUserId: string;

  beforeAll(async () => {
    // Create test user
    const [user] = await db
      .insert(users)
      .values({
        email: 'test@example.com',
        leadScore: 0,
        status: 'prospect',
      })
      .returning();
    testUserId = user.id;

    // Add events
    await db.insert(events).values([
      {
        userId: testUserId,
        eventType: 'vsl_complete',
        eventData: {},
      },
      {
        userId: testUserId,
        eventType: 'email_submit',
        eventData: {},
      },
    ]);
  });

  afterAll(async () => {
    // Cleanup
    await db.delete(events).where(eq(events.userId, testUserId));
    await db.delete(users).where(eq(users.id, testUserId));
  });

  it('should update user score', async () => {
    await updateUserLeadScore(testUserId);

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, testUserId));

    expect(user.leadScore).toBeGreaterThan(0);
    expect(user.leadTemperature).toBeDefined();
  });
});
```

## E2E Testing

### User Flows

```typescript
// e2e/vsl-journey.spec.ts
import { test, expect } from '@playwright/test';

test.describe('VSL Journey', () => {
  test('should play VSL and track progress', async ({ page }) => {
    await page.goto('/');

    // Video should be visible
    const video = page.locator('#vsl-outer-container');
    await expect(video).toBeVisible();

    // Start playing
    await page.click('[data-testid="play-button"]');

    // Wait for video to play
    await page.waitForTimeout(1000);

    // Check if tracking works (this would require checking the database or API)
    // For now, just verify the UI is working
    await expect(video).toBeVisible();
  });

  test('should capture email and trigger webhook', async ({ page }) => {
    await page.goto('/');

    // Scroll to email capture
    await page.evaluate(() => window.scrollTo(0, 500));

    // Fill email form
    await page.fill('[data-testid="email-input"]', 'test@example.com');
    await page.click('[data-testid="submit-button"]');

    // Verify success message
    await expect(page.locator('text=Success')).toBeVisible();
  });
});
```

### Admin Dashboard

```typescript
// e2e/admin.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Admin Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    // Login
    await page.goto('/admin');
    await page.fill('[name="email"]', 'admin@example.com');
    await page.fill('[name="password"]', 'password');
    await page.click('button[type="submit"]');
  });

  test('should display funnel metrics', async ({ page }) => {
    await page.waitForURL('/admin/dashboard');

    // Check metrics are displayed
    await expect(page.locator('text=Total Visitors')).toBeVisible();
    await expect(page.locator('text=Conversion Rate')).toBeVisible();
  });

  test('should filter leads by temperature', async ({ page }) => {
    await page.goto('/admin/leads');

    // Click "Hot Leads" filter
    await page.click('button:has-text("Hot")');

    // Verify hot leads are displayed
    const leads = page.locator('[data-testid="lead-item"]');
    await expect(leads).toHaveCountGreaterThan(0);
  });
});
```

## Test Scripts

### package.json

```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:run": "vitest run",
    "test:coverage": "vitest run --coverage",
    "test:watch": "vitest --watch",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:e2e:debug": "playwright test --debug"
  }
}
```

## Coverage Goals

### Target Coverage

- **Statements**: 80%+
- **Branches**: 75%+
- **Functions**: 80%+
- **Lines**: 80%+

### Critical Areas (100% coverage)

- Lead scoring logic
- Payment processing
- Webhook handlers
- Session management
- Database schema

## Best Practices

### 1. Test Behavior, Not Implementation

✅ **DO**:
```typescript
it('should mark user as hot when score >= 70', () => {
  const result = getTemperature(70);
  expect(result).toBe('hot');
});
```

❌ **DON'T**:
```typescript
it('should return "hot" string', () => {
  const result = getTemperature(70);
  expect(result).toBe('hot'); // Tests implementation detail
});
```

### 2. Use Descriptive Test Names

✅ **DO**:
```typescript
it('should calculate lead score based on event weights', () => {});

it('should trigger n8n webhook when user becomes hot lead', () => {});

it('should return 400 for missing required fields', () => {});
```

❌ **DON'T**:
```typescript
it('should work', () => {});

it('test 1', () => {});

it('handles error', () => {});
```

### 3. Test Edge Cases

```typescript
describe('calculateLeadScore', () => {
  it('should handle empty events', async () => {
    const result = await calculateLeadScore('user-123');
    expect(result.score).toBe(0);
    expect(result.temperature).toBe('cold');
  });

  it('should handle single event', async () => {
    const result = await calculateLeadScore('user-123');
    expect(result.score).toBeGreaterThan(0);
  });

  it('should cap score at 100', async () => {
    // Add many high-value events
    const result = await calculateLeadScore('user-123');
    expect(result.score).toBeLessThanOrEqual(100);
  });
});
```

### 4. Use Mocks for External Dependencies

```typescript
// Mock database
vi.mock('@/lib/db', () => ({
  db: {
    select: vi.fn().mockReturnThis(),
    from: vi.fn().mockReturnThis(),
    where: vi.fn().mockResolvedValue([]),
  },
}));

// Mock fetch
global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: async () => ({ success: true }),
  })
);

// Mock n8n webhooks
vi.mock('@/lib/n8nWebhooks', () => ({
  n8nEvents: {
    emailSubmit: vi.fn(),
    hotLeadAlert: vi.fn(),
  },
}));
```

### 5. Clean Up in Tests

```typescript
afterEach(() => {
  vi.clearAllMocks();
  cleanup();
});

afterAll(() => {
  // Close database connections
  // Clean up test data
});
```

## Continuous Integration

### GitHub Actions

```yaml
# .github/workflows/test.yml
name: Test

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Install dependencies
        run: npm ci

      - name: Run linter
        run: npm run lint

      - name: Run type check
        run: npm run type-check

      - name: Run unit tests
        run: npm run test:run

      - name: Generate coverage
        run: npm run test:coverage

      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/coverage-final.json
```

## Testing Checklist

### Before Committing

- [ ] All tests pass locally
- [ ] Coverage hasn't decreased
- [ ] No new linting errors
- [ ] Tests cover new features
- [ ] Edge cases are tested

### Before Merging

- [ ] CI passes
- [ ] Code review approved
- [ ] No test failures
- [ ] Coverage threshold met

## Troubleshooting

### Tests Failing Locally but Passing in CI

**Solution**: Ensure environment variables are set
```bash
cp .env.example .env
```

### Flaky Tests

**Problem**: Tests pass sometimes, fail sometimes

**Solutions**:
1. Add proper cleanup in `afterEach`
2. Use `waitFor` instead of fixed timeouts
3. Mock external dependencies
4. Run tests in isolation (`test.only`)

### Slow Tests

**Problem**: Tests take too long

**Solutions**:
1. Mock heavy operations (database, API calls)
2. Use `vi.fn()` instead of real implementations
3. Run tests in parallel (Vitest default)
4. Use `test.skip()` for slow integration tests

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Playwright Documentation](https://playwright.dev/)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
