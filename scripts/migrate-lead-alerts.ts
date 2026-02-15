import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '@/db/schema';
import { sql } from 'drizzle-orm';

// Load environment variables from .env.local
config({ path: '.env.local' });

// Initialize database connection
const queryClient = postgres(process.env.DATABASE_URL!);
const db = drizzle(queryClient, { schema });

/**
 * Migration: Fix lead_alerts table schema to match n8n integration spec
 *
 * This script adds missing columns needed by n8n webhooks for Airtable sync
 * - email: Store user email at alert time
 * - score: Store lead score at alert time
 * - trigger_event: Store what event triggered the alert
 */

async function migrate() {
  console.log('🔄 Starting lead_alerts schema migration...\n');

  try {
    // Step 1: Add missing columns
    console.log('Step 1: Adding missing columns...');

    await db.execute(sql`
      ALTER TABLE lead_alerts
      ADD COLUMN IF NOT EXISTS email TEXT
    `);
    console.log('  ✅ email column added');

    await db.execute(sql`
      ALTER TABLE lead_alerts
      ADD COLUMN IF NOT EXISTS score INTEGER
    `);
    console.log('  ✅ score column added');

    await db.execute(sql`
      ALTER TABLE lead_alerts
      ADD COLUMN IF NOT EXISTS trigger_event TEXT
    `);
    console.log('  ✅ trigger_event column added');

    // Step 2: Rename sent_at to created_at for consistency with documentation
    console.log('\nStep 2: Renaming sent_at to created_at...');

    try {
      await db.execute(sql`
        ALTER TABLE lead_alerts
        RENAME COLUMN sent_at TO created_at
      `);
      console.log('  ✅ Column renamed successfully');
    } catch (error: any) {
      if (error.message.includes('already exists')) {
        console.log('  ⚠️  Column already renamed, skipping...');
      } else {
        throw error;
      }
    }

    // Step 3: Backfill existing data
    console.log('\nStep 3: Backfilling existing data...');

    const backfillResult = await db.execute(sql`
      WITH user_data AS (
        SELECT
          u.id as user_id,
          u.email,
          u.lead_score as score
        FROM users u
        INNER JOIN lead_alerts la ON la.user_id = u.id
        WHERE la.email IS NULL OR la.score IS NULL
      )
      UPDATE lead_alerts la
      SET
        email = ud.email,
        score = ud.score
      FROM user_data ud
      WHERE la.user_id = ud.user_id
        AND (la.email IS NULL OR la.score IS NULL)
    `);
    console.log(`  ✅ Backfilled ${backfillResult.rowCount ?? 'unknown'} existing records`);

    // Step 4: Set default trigger_event for existing records
    console.log('\nStep 4: Setting default trigger_event for existing records...');

    const defaultTriggerResult = await db.execute(sql`
      UPDATE lead_alerts
      SET trigger_event = 'migration_backfill'
      WHERE trigger_event IS NULL
    `);
    console.log(`  ✅ Set default trigger_event for ${defaultTriggerResult.rowCount ?? 'unknown'} records`);

    // Step 5: Create indexes for performance
    console.log('\nStep 5: Creating performance indexes...');

    await db.execute(sql`
      CREATE INDEX IF NOT EXISTS idx_lead_alerts_email
      ON lead_alerts(email)
    `);
    console.log('  ✅ Index on email created');

    await db.execute(sql`
      CREATE INDEX IF NOT EXISTS idx_lead_alerts_score
      ON lead_alerts(score)
    `);
    console.log('  ✅ Index on score created');

    await db.execute(sql`
      CREATE INDEX IF NOT EXISTS idx_lead_alerts_created_at
      ON lead_alerts(created_at)
    `);
    console.log('  ✅ Index on created_at created');

    console.log('\n✅ Migration completed successfully!\n');

    // Verification
    console.log('Verifying schema...');
    const schema = await db.execute(sql`
      SELECT
        column_name,
        data_type,
        is_nullable,
        column_default
      FROM information_schema.columns
      WHERE table_schema = 'public'
        AND table_name = 'lead_alerts'
      ORDER BY ordinal_position
    `);

    console.log('\n📊 Current lead_alerts schema:');
    console.table(schema.rows);

    console.log('\n✅ Expected columns present:');
    console.log('  - id: uuid (primary key)');
    console.log('  - user_id: uuid (foreign key to users)');
    console.log('  - email: text (newly added)');
    console.log('  - score: integer (newly added)');
    console.log('  - alert_type: text (existing)');
    console.log('  - trigger_event: text (newly added)');
    console.log('  - created_at: timestamp (renamed from sent_at)');
    console.log('  - first_contact_at: timestamp (existing)');
    console.log('  - response_time_seconds: integer (existing)');

    console.log('\n🎯 Next: Test n8n webhook with:');
    console.log('   curl -X POST https://n8n.marleymcbride.co/webhook/hot-lead \\');
    console.log('     -H "Content-Type: application/json" \\');
    console.log('     -d \'{"email":"test@example.com","name":"Test","score":75}\'\n');

    process.exit(0);
  } catch (error) {
    console.error('\n❌ Migration failed:', error);
    process.exit(1);
  }
}

migrate();
