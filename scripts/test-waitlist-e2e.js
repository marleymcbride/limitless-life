#!/usr/bin/env node

/**
 * End-to-End Test for Waitlist Webhook Integration
 * Tests the actual production webhook from n8n
 */

const webhookUrl = 'https://n8n.marleymcbride.co/webhook/waitlist-sync';

async function testWebhook(description, payload) {
  console.log(`\n🧪 ${description}`);
  console.log('📤 Payload:', JSON.stringify(payload, null, 2));

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    console.log(`📥 Status: ${response.status}`);
    console.log('📥 Response:', JSON.stringify(result, null, 2));

    if (response.ok) {
      console.log('✅ SUCCESS');
      return true;
    } else {
      console.log('❌ FAILED');
      return false;
    }
  } catch (error) {
    console.log('❌ ERROR:', error.message);
    return false;
  }
}

async function runTests() {
  console.log('='.repeat(70));
  console.log('🚀 WAITLIST WEBHOOK END-TO-END TEST');
  console.log('='.repeat(70));

  const tests = [
    {
      description: 'Test 1: Hot Lead (choice=yes)',
      payload: {
        email: 'e2e-hot-lead@example.com',
        name: 'Hot Lead User',
        choice: 'yes',
        interestType: 'coaching',
        tier: 'life',
        flowType: 'waitlist',
        timestamp: new Date().toISOString()
      }
    },
    {
      description: 'Test 2: Warm Lead (choice=maybe)',
      payload: {
        email: 'e2e-warm-lead@example.com',
        name: 'Warm Lead User',
        choice: 'maybe',
        interestType: 'coaching',
        tier: 'life',
        flowType: 'waitlist',
        timestamp: new Date().toISOString()
      }
    },
    {
      description: 'Test 3: Cold Lead (choice=no)',
      payload: {
        email: 'e2e-cold-lead@example.com',
        name: 'Cold Lead User',
        choice: 'no',
        interestType: 'coaching',
        tier: 'life',
        flowType: 'waitlist',
        timestamp: new Date().toISOString()
      }
    },
    {
      description: 'Test 4: Different Tier (whatsapp)',
      payload: {
        email: 'e2e-whatsapp-tier@example.com',
        name: 'WhatsApp Tier User',
        choice: 'yes',
        interestType: 'coaching',
        tier: 'life_whatsapp',
        flowType: 'waitlist',
        timestamp: new Date().toISOString()
      }
    }
  ];

  let passed = 0;
  let failed = 0;

  for (const test of tests) {
    const success = await testWebhook(test.description, test.payload);
    if (success) {
      passed++;
    } else {
      failed++;
    }
  }

  console.log('\n' + '='.repeat(70));
  console.log('📊 TEST SUMMARY');
  console.log('='.repeat(70));
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`📈 Success Rate: ${((passed / tests.length) * 100).toFixed(1)}%`);
  console.log('='.repeat(70));

  if (failed === 0) {
    console.log('\n🎉 ALL TESTS PASSED!');
    console.log('✅ Check your Airtable to verify all records appeared');
    console.log('✅ You should see 4 new waitlist signups');
  } else {
    console.log('\n⚠️  SOME TESTS FAILED - Check n8n workflow logs');
  }
}

runTests();
