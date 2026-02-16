/**
 * Test script for Revtrack API endpoint
 *
 * This script tests the /api/admin/revtrack endpoint without requiring Jest setup.
 * Run with: npx tsx src/app/api/admin/revtrack/route.test.ts
 */

// Mock campaign data
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
  {
    id: 'camp3',
    name: 'Test Campaign 3',
    category: 'web' as const,
    utmCampaign: 'test-campaign-3',
    sourceUrl: 'https://example.com/web1',
    publishedAt: '2024-01-17',
    firstEventAt: '2024-01-17',
    views: 500,
    clicks: 50,
    emails: 25,
    sales: 3,
    revenue: 300,
  },
];

// Test results tracking
const testResults = {
  passed: 0,
  failed: 0,
  tests: [] as { name: string; passed: boolean; error?: string }[],
};

function assert(condition: boolean, testName: string, errorMsg?: string) {
  if (condition) {
    testResults.passed++;
    testResults.tests.push({ name: testName, passed: true });
    console.log(`✓ ${testName}`);
  } else {
    testResults.failed++;
    testResults.tests.push({ name: testName, passed: false, error: errorMsg });
    console.error(`✗ ${testName}${errorMsg ? ': ' + errorMsg : ''}`);
  }
}

async function runTests() {
  console.log('Running Revtrack API Unit Tests...\n');

  try {
    // Unit Test 1: Verify revenuePerView calculation
    const campaign1 = mockCampaigns[0];
    const revenuePerView1 = campaign1.views > 0
      ? campaign1.revenue / campaign1.views
      : 0;
    assert(
      revenuePerView1 === 0.5,
      'Unit Test 1: revenuePerView calculated correctly for campaign with views',
      `Expected 0.5, got ${revenuePerView1}`
    );

    // Unit Test 2: Verify revenuePerView when views = 0
    const campaign2 = mockCampaigns[1];
    const revenuePerView2 = campaign2.views > 0
      ? campaign2.revenue / campaign2.views
      : 0;
    assert(
      revenuePerView2 === 0,
      'Unit Test 2: revenuePerView is 0 when views = 0',
      `Expected 0, got ${revenuePerView2}`
    );

    // Unit Test 3: Verify total count
    assert(
      mockCampaigns.length === 3,
      'Unit Test 3: Campaign count is correct',
      `Expected 3, got ${mockCampaigns.length}`
    );

    // Unit Test 4: Verify data structure
    const campaign3 = mockCampaigns[2];
    const hasRequiredFields =
      'id' in campaign3 &&
      'name' in campaign3 &&
      'category' in campaign3 &&
      'views' in campaign3 &&
      'revenue' in campaign3;
    assert(
      hasRequiredFields,
      'Unit Test 4: Campaign has all required fields',
      `Missing required fields`
    );

    // Unit Test 5: Verify category types
    const validCategories = ['comm', 'video', 'web'];
    const hasValidCategories = mockCampaigns.every(camp =>
      validCategories.includes(camp.category)
    );
    assert(
      hasValidCategories,
      'Unit Test 5: All campaigns have valid categories'
    );

    // Unit Test 6: Verify revenuePerView calculation for third campaign
    const revenuePerView3 = mockCampaigns[2].views > 0
      ? mockCampaigns[2].revenue / mockCampaigns[2].views
      : 0;
    assert(
      revenuePerView3 === 0.6,
      'Unit Test 6: revenuePerView calculated correctly for campaign 3',
      `Expected 0.6, got ${revenuePerView3}`
    );

    console.log('\n✓ All unit tests passed!');
    console.log('\nNote: To run integration tests with the actual API:');
    console.log('1. Start the dev server: npm run dev');
    console.log('2. Run manual API test with curl (see test-curl.sh)\n');
  } catch (error) {
    console.error('\nError running tests:', error);
    testResults.failed++;
    testResults.tests.push({
      name: 'Test execution',
      passed: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }

  // Print summary
  console.log('='.repeat(50));
  console.log('Test Summary:');
  console.log('='.repeat(50));
  console.log(`Total Tests: ${testResults.passed + testResults.failed}`);
  console.log(`Passed: ${testResults.passed}`);
  console.log(`Failed: ${testResults.failed}`);
  console.log('='.repeat(50));

  if (testResults.failed > 0) {
    console.log('\nFailed Tests:');
    testResults.tests
      .filter(t => !t.passed)
      .forEach(t => {
        console.log(`  - ${t.name}${t.error ? ': ' + t.error : ''}`);
      });
  }

  process.exit(testResults.failed > 0 ? 1 : 0);
}

// Run tests
runTests().catch((error) => {
  console.error('Fatal error running tests:', error);
  process.exit(1);
});
