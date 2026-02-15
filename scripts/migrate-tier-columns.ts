import postgres from 'postgres';
import { resolve } from 'path';

// Load env vars from project root
const projectRoot = resolve(process.cwd(), '.env.local');
const result = require('dotenv').config({ path: projectRoot });
if (result.error) {
  console.error('❌ Failed to load .env.local:', result.error);
  process.exit(1);
}

async function migrateTierColumns() {
  console.log('🔄 Adding missing tier columns...\n');

  const client = postgres(process.env.DATABASE_URL!);

  try {
    // Add tier column to payments table
    console.log('➕ Adding tier column to payments table...\n');

    await client`ALTER TABLE payments ADD COLUMN IF NOT EXISTS tier TEXT`;
    console.log('  ✅ Added column: payments.tier');

    // Update existing records with old tier names to new names
    console.log('\n📝 Updating existing tier names...\n');

    const updateResult = await client`
      UPDATE payments
      SET tier = CASE
        WHEN tier = 'Access' THEN 'Course'
        WHEN tier = 'Plus' THEN 'LL'
        WHEN tier = 'Premium' THEN 'LL+WA'
        WHEN tier = 'Elite' THEN 'LHC'
        ELSE tier
      END
      WHERE tier IS NOT NULL
      RETURNING id, tier
    `;

    console.log(`  ✅ Updated ${updateResult.length} payment records`);

    // Verify migration
    console.log('\n🔍 Verifying migration...\n');

    const payments = await client`
      SELECT id, tier, amount, created_at
      FROM payments
      ORDER BY created_at DESC
      LIMIT 5
    `;

    console.log('📊 Recent Payments:');
    console.table(payments);

    console.log('\n' + '─'.repeat(60));
    console.log('\n✅ SUCCESS: Tier column added to payments table!');
    console.log('\n📊 Tier values: Course, LL, LL+WA, LHC');

    await client.end();
    process.exit(0);

  } catch (error) {
    console.error('\n❌ Migration failed:', error);
    await client.end();
    process.exit(1);
  }
}

migrateTierColumns();
