#!/usr/bin/env node

/**
 * Test script for waitlist webhook
 * Run with: node scripts/test-waitlist-webhook.js
 */

const testPayload = {
  email: 'test@example.com',
  name: 'Test User',
  choice: 'yes',
  interestType: 'coaching',
  tier: 'life',
  flowType: 'waitlist',
  timestamp: new Date().toISOString()
};

async function testWaitlistWebhook() {
  try {
    console.log('🧪 Testing Waitlist Webhook...\n');
    console.log('📤 Sending payload:');
    console.log(JSON.stringify(testPayload, null, 2));
    console.log('\n');

    const response = await fetch('https://n8n.marleymcbride.co/webhook-test/waitlist-sync', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testPayload),
    });

    console.log(`📥 Response status: ${response.status} ${response.statusText}`);

    const responseData = await response.json().catch(() => ({ text: await response.text() }));
    console.log('📥 Response data:');
    console.log(JSON.stringify(responseData, null, 2));

    if (response.ok) {
      console.log('\n✅ Webhook test successful!');
      console.log('✅ Check your Airtable to see if the record was created/updated.');
    } else {
      console.log('\n❌ Webhook test failed!');
      console.log('❌ Check n8n workflow logs for errors.');
    }

  } catch (error) {
    console.error('\n❌ Error testing webhook:');
    console.error(error);
  }
}

// Test all three choice types
async function testAllVariants() {
  console.log('🧪 Testing All Waitlist Variants...\n');

  const variants = [
    { choice: 'yes', label: 'Hot Lead' },
    { choice: 'maybe', label: 'Warm Lead' },
    { choice: 'no', label: 'Cold Lead' }
  ];

  for (const variant of variants) {
    const payload = {
      email: `test-${variant.choice}@example.com`,
      name: `Test ${variant.label}`,
      choice: variant.choice,
      interestType: 'coaching',
      tier: 'life',
      flowType: 'waitlist',
      timestamp: new Date().toISOString()
    };

    console.log(`\n📤 Testing ${variant.label} (${variant.choice})...`);

    try {
      const response = await fetch('https://n8n.marleymcbride.co/webhook-test/waitlist-sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      console.log(`   Status: ${response.status} ${response.statusText}`);

      if (response.ok) {
        console.log(`   ✅ Success`);
      } else {
        console.log(`   ❌ Failed`);
      }
    } catch (error) {
      console.log(`   ❌ Error: ${error.message}`);
    }
  }

  console.log('\n✅ All tests complete!');
  console.log('✅ Check Airtable for 3 new records with different interest levels.');
}

// Run tests
console.log('='.repeat(60));
console.log('Waitlist Webhook Tester');
console.log('='.repeat(60));
console.log('\n');

// Check command line args
const args = process.argv.slice(2);
if (args.includes('--all') || args.includes('-a')) {
  testAllVariants();
} else {
  testWaitlistWebhook();

  console.log('\n' + '='.repeat(60));
  console.log('💡 To test all variants, run: node scripts/test-waitlist-webhook.js --all');
  console.log('='.repeat(60));
  }
