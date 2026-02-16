import { config } from 'dotenv';
import postgres from 'postgres';

// Load environment variables from .env.local
config({ path: '.env.local' });

/**
 * Migration: Create Revtrack Campaign Tables
 *
 * This script creates the tables needed for the Revtrack Dashboard:
 * - campaigns: Stores campaign metadata (communities, videos, webinars)
 * - campaign_metrics: Stores daily metrics for each campaign
 *
 * Architecture: Airtable-First with PostgreSQL Foundation
 * - PostgreSQL stores raw tracking data
 * - n8n aggregates to Airtable for analytics
 * - Admin Dashboard reads from Airtable
 */

async function migrate() {
  console.log('🔄 Starting Revtrack campaign tables migration...\n');

  const client = postgres(process.env.DATABASE_URL!);

  try {
    // Step 1: Create campaigns table
    console.log('Step 1: Creating campaigns table...');

    await client`
      CREATE TABLE IF NOT EXISTS campaigns (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        category TEXT NOT NULL CHECK (category IN ('comm', 'video', 'web')),
        utm_campaign TEXT NOT NULL UNIQUE,
        source_url TEXT,
        published_at TIMESTAMPTZ,
        first_event_at TIMESTAMPTZ,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      )
    `;
    console.log('  ✅ campaigns table created');

    // Step 2: Create campaign_metrics table
    console.log('\nStep 2: Creating campaign_metrics table...');

    await client`
      CREATE TABLE IF NOT EXISTS campaign_metrics (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
        metric_date TIMESTAMPTZ NOT NULL,
        views INTEGER DEFAULT 0,
        clicks INTEGER DEFAULT 0,
        emails INTEGER DEFAULT 0,
        sales INTEGER DEFAULT 0,
        revenue INTEGER DEFAULT 0,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW(),
        UNIQUE(campaign_id, metric_date)
      )
    `;
    console.log('  ✅ campaign_metrics table created');

    // Step 3: Create indexes for campaigns table
    console.log('\nStep 3: Creating indexes for campaigns table...');

    await client`
      CREATE INDEX IF NOT EXISTS idx_campaigns_utm_campaign
      ON campaigns(utm_campaign)
    `;
    console.log('  ✅ Index on utm_campaign created');

    await client`
      CREATE INDEX IF NOT EXISTS idx_campaigns_category
      ON campaigns(category)
    `;
    console.log('  ✅ Index on category created');

    await client`
      CREATE INDEX IF NOT EXISTS idx_campaigns_published_at
      ON campaigns(published_at)
    `;
    console.log('  ✅ Index on published_at created');

    // Step 4: Create indexes for campaign_metrics table
    console.log('\nStep 4: Creating indexes for campaign_metrics table...');

    await client`
      CREATE INDEX IF NOT EXISTS idx_campaign_metrics_campaign_id
      ON campaign_metrics(campaign_id)
    `;
    console.log('  ✅ Index on campaign_id created');

    await client`
      CREATE INDEX IF NOT EXISTS idx_campaign_metrics_metric_date
      ON campaign_metrics(metric_date)
    `;
    console.log('  ✅ Index on metric_date created');

    await client`
      CREATE INDEX IF NOT EXISTS idx_campaign_metrics_campaign_date
      ON campaign_metrics(campaign_id, metric_date)
    `;
    console.log('  ✅ Composite index on (campaign_id, metric_date) created');

    // Step 5: Verify tables were created
    console.log('\nStep 5: Verifying table creation...');

    const tables = await client`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
        AND table_name IN ('campaigns', 'campaign_metrics')
      ORDER BY table_name
    `;

    console.log('\n📊 Tables created:');
    tables.forEach((table: any) => {
      console.log(`  ✅ ${table.table_name}`);
    });

    // Step 6: Display campaigns schema
    console.log('\n📋 Campaigns table schema:');
    const campaignsSchema = await client`
      SELECT
        column_name,
        data_type,
        is_nullable,
        column_default
      FROM information_schema.columns
      WHERE table_schema = 'public'
        AND table_name = 'campaigns'
      ORDER BY ordinal_position
    `;
    console.table(campaignsSchema);

    // Step 7: Display campaign_metrics schema
    console.log('\n📋 Campaign_metrics table schema:');
    const metricsSchema = await client`
      SELECT
        column_name,
        data_type,
        is_nullable,
        column_default
      FROM information_schema.columns
      WHERE table_schema = 'public'
        AND table_name = 'campaign_metrics'
      ORDER BY ordinal_position
    `;
    console.table(metricsSchema);

    // Step 8: Display indexes
    console.log('\n📋 Indexes created:');
    const indexes = await client`
      SELECT
        tablename,
        indexname,
        indexdef
      FROM pg_indexes
      WHERE schemaname = 'public'
        AND tablename IN ('campaigns', 'campaign_metrics')
      ORDER BY tablename, indexname
    `;
    indexes.forEach((idx: any) => {
      console.log(`  ✅ ${idx.tablename}.${idx.indexname}`);
    });

    console.log('\n' + '─'.repeat(60));
    console.log('\n✅ SUCCESS: Revtrack campaign tables created!');
    console.log('\n📊 Tables:');
    console.log('  - campaigns: Stores campaign metadata');
    console.log('  - campaign_metrics: Stores daily metrics per campaign');
    console.log('\n🎯 Next steps:');
    console.log('  1. Generate Drizzle migration: npm run db:generate');
    console.log('  2. Push schema changes: npm run db:push');
    console.log('  3. Set up n8n workflows to aggregate data to Airtable');

    await client.end();
    process.exit(0);

  } catch (error) {
    console.error('\n❌ Migration failed:', error);
    await client.end();
    process.exit(1);
  }
}

migrate();
