/**
 * Seed Data Script for Revtrack Campaign Tracking
 *
 * This script creates test campaigns with metrics for development and testing.
 *
 * Usage:
 *   npm run seed-revtrack
 *
 * Or run directly:
 *   npx tsx scripts/seed-revtrack-data.ts
 */

import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

interface Campaign {
  name: string;
  platform: string;
  platform_content_id: string | null;
  tracking_url: string | null;
  status: string;
}

// Test campaigns to create
const testCampaigns: Campaign[] = [
  {
    name: 'YouTube Ad - Product Launch',
    platform: 'youtube',
    platform_content_id: 'dQw4w9WgXcQ', // Example video ID
    tracking_url: 'https://example.com/?utm_source=youtube&utm_medium=video&utm_campaign=product_launch',
    status: 'active',
  },
  {
    name: 'Reddit Post - r/productivity',
    platform: 'reddit',
    platform_content_id: '1a2b3c4d', // Example post ID
    tracking_url: 'https://example.com/?utm_source=reddit&utm_medium=post&utm_campaign=productivity_thread',
    status: 'active',
  },
  {
    name: 'Blog Post - Medium Article',
    platform: 'blog',
    platform_content_id: null,
    tracking_url: 'https://example.com/?utm_source=medium&utm_medium=article&utm_campaign=blog_launch',
    status: 'active',
  },
];

// Generate random metrics for the last 30 days
function generateDailyMetrics(campaignId: string) {
  const metrics = [];
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 30);

  for (let i = 0; i < 30; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);

    // Generate realistic trending data (slight upward trend with some variance)
    const baseViews = 1000 + (i * 50); // Upward trend
    const views = baseViews + Math.floor(Math.random() * 500 - 250);
    const likes = Math.floor(views * 0.05 + Math.random() * 50);
    const comments = Math.floor(views * 0.01 + Math.random() * 10);
    const upvotes = Math.floor(views * 0.03 + Math.random() * 20);
    const shares = Math.floor(views * 0.02 + Math.random() * 15);

    metrics.push({
      campaign_id: campaignId,
      date: date.toISOString().split('T')[0],
      views: Math.max(0, views),
      likes: Math.max(0, likes),
      comments: Math.max(0, comments),
      upvotes: Math.max(0, upvotes),
      shares: Math.max(0, shares),
    });
  }

  return metrics;
}

// Generate first events
function generateFirstEvents(campaignId: string, count: number) {
  const events = [];
  const eventTypes = ['page_view', 'video_play', 'cta_click', 'form_submit', 'purchase'];

  for (let i = 0; i < count; i++) {
    const sessionId = `session_${campaignId}_${i}`;
    const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
    const daysAgo = Math.floor(Math.random() * 30);
    const hoursAgo = Math.floor(Math.random() * 24);

    const occurredAt = new Date();
    occurredAt.setDate(occurredAt.getDate() - daysAgo);
    occurredAt.setHours(occurredAt.getHours() - hoursAgo);

    events.push({
      session_id: sessionId,
      campaign_id: campaignId,
      event_type: eventType,
      page_url: `https://example.com/page${i}`,
      occurred_at: occurredAt.toISOString(),
      utm_source: ['youtube', 'reddit', 'medium', 'twitter'][Math.floor(Math.random() * 4)],
      utm_medium: ['video', 'post', 'article', 'social'][Math.floor(Math.random() * 4)],
      utm_campaign: `campaign_${i}`,
    });
  }

  return events.sort((a, b) =>
    new Date(a.occurred_at).getTime() - new Date(b.occurred_at).getTime()
  );
}

async function seedCampaigns(): Promise<void> {
  const client = await pool.connect();

  try {
    console.log('🌱 Starting Revtrack seed data generation...\n');

    // Insert campaigns
    console.log('📊 Creating test campaigns...');
    const insertedCampaigns: any[] = [];

    for (const campaign of testCampaigns) {
      const result = await client.query(
        `INSERT INTO revtrack_campaigns (
          name,
          platform,
          platform_content_id,
          tracking_url,
          status,
          total_views,
          total_likes,
          total_comments,
          first_events_count,
          created_at,
          updated_at
        ) VALUES ($1, $2, $3, $4, $5, 0, 0, 0, 0, NOW(), NOW())
        ON CONFLICT (name) DO UPDATE SET
          platform = EXCLUDED.platform,
          platform_content_id = EXCLUDED.platform_content_id,
          tracking_url = EXCLUDED.tracking_url,
          status = EXCLUDED.status,
          updated_at = NOW()
        RETURNING id, name`,
        [campaign.name, campaign.platform, campaign.platform_content_id, campaign.tracking_url, campaign.status]
      );

      insertedCampaigns.push(result.rows[0]);
      console.log(`  ✓ Created campaign: ${result.rows[0].name} (ID: ${result.rows[0].id})`);
    }

    // Insert daily metrics
    console.log('\n📈 Generating daily metrics (last 30 days)...');
    let totalMetrics = 0;

    for (const campaign of insertedCampaigns) {
      const metrics = generateDailyMetrics(campaign.id);

      for (const metric of metrics) {
        await client.query(
          `INSERT INTO revtrack_daily_metrics (
            campaign_id,
            date,
            views,
            likes,
            comments,
            upvotes,
            shares,
            created_at,
            updated_at
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW())
          ON CONFLICT (campaign_id, date) DO UPDATE SET
            views = EXCLUDED.views,
            likes = EXCLUDED.likes,
            comments = EXCLUDED.comments,
            upvotes = EXCLUDED.upvotes,
            shares = EXCLUDED.shares,
            updated_at = NOW()`,
          [
            metric.campaign_id,
            metric.date,
            metric.views,
            metric.likes,
            metric.comments,
            metric.upvotes,
            metric.shares,
          ]
        );
        totalMetrics++;
      }
    }

    console.log(`  ✓ Generated ${totalMetrics} daily metric records`);

    // Calculate and update campaign totals
    console.log('\n🔢 Calculating campaign totals...');
    for (const campaign of insertedCampaigns) {
      const totalsResult = await client.query(
        `SELECT
          SUM(views) as total_views,
          SUM(likes) as total_likes,
          SUM(comments) as total_comments
        FROM revtrack_daily_metrics
        WHERE campaign_id = $1`,
        [campaign.id]
      );

      const totals = totalsResult.rows[0];

      await client.query(
        `UPDATE revtrack_campaigns
        SET
          total_views = $1,
          total_likes = $2,
          total_comments = $3,
          updated_at = NOW()
        WHERE id = $4`,
        [totals.total_views || 0, totals.total_likes || 0, totals.total_comments || 0, campaign.id]
      );

      console.log(
        `  ✓ ${campaign.name}: ${totals.total_views} views, ${totals.total_likes} likes, ${totals.total_comments} comments`
      );
    }

    // Insert first events
    console.log('\n🎯 Generating first events...');
    let totalEvents = 0;
    const eventsPerCampaign = [150, 75, 50]; // Different amounts per campaign

    for (let i = 0; i < insertedCampaigns.length; i++) {
      const campaign = insertedCampaigns[i];
      const events = generateFirstEvents(campaign.id, eventsPerCampaign[i]);

      for (const event of events) {
        await client.query(
          `INSERT INTO revtrack_first_events (
            session_id,
            campaign_id,
            event_type,
            page_url,
            occurred_at,
            utm_source,
            utm_medium,
            utm_campaign,
            utm_content,
            utm_term,
            created_at
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW())
          ON CONFLICT (session_id, event_type) DO NOTHING`,
          [
            event.session_id,
            event.campaign_id,
            event.event_type,
            event.page_url,
            event.occurred_at,
            event.utm_source,
            event.utm_medium,
            event.utm_campaign,
            null, // utm_content
            null, // utm_term
          ]
        );
        totalEvents++;
      }
    }

    console.log(`  ✓ Generated ${totalEvents} first event records`);

    // Update campaign first_events_count
    console.log('\n📊 Updating campaign event counts...');
    for (const campaign of insertedCampaigns) {
      const countResult = await client.query(
        `SELECT COUNT(*) as count FROM revtrack_first_events WHERE campaign_id = $1`,
        [campaign.id]
      );

      await client.query(
        `UPDATE revtrack_campaigns
        SET first_events_count = $1, updated_at = NOW()
        WHERE id = $2`,
        [countResult.rows[0].count, campaign.id]
      );

      console.log(`  ✓ ${campaign.name}: ${countResult.rows[0].count} first events`);
    }

    console.log('\n✅ Seed data generation complete!\n');

    // Summary
    console.log('📋 Summary:');
    console.log(`  • Campaigns created: ${insertedCampaigns.length}`);
    console.log(`  • Daily metrics: ${totalMetrics} records`);
    console.log(`  • First events: ${totalEvents} records`);
    console.log('\n🎉 Revtrack is now ready for testing!\n');
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

// Verification queries
async function verifyData(): Promise<void> {
  const client = await pool.connect();

  try {
    console.log('🔍 Verifying seeded data...\n');

    // Count campaigns
    const campaignCount = await client.query('SELECT COUNT(*) FROM revtrack_campaigns');
    console.log(`  📊 Campaigns: ${campaignCount.rows[0].count}`);

    // Count daily metrics
    const metricsCount = await client.query('SELECT COUNT(*) FROM revtrack_daily_metrics');
    console.log(`  📈 Daily Metrics: ${metricsCount.rows[0].count}`);

    // Count first events
    const eventsCount = await client.query('SELECT COUNT(*) FROM revtrack_first_events');
    console.log(`  🎯 First Events: ${eventsCount.rows[0].count}`);

    // Show sample campaign
    const sampleCampaign = await client.query(
      `SELECT name, platform, total_views, total_likes, first_events_count
       FROM revtrack_campaigns
       LIMIT 1`
    );

    if (sampleCampaign.rows.length > 0) {
      const campaign = sampleCampaign.rows[0];
      console.log('\n  📋 Sample Campaign:');
      console.log(`    Name: ${campaign.name}`);
      console.log(`    Platform: ${campaign.platform}`);
      console.log(`    Views: ${campaign.total_views}`);
      console.log(`    Likes: ${campaign.total_likes}`);
      console.log(`    First Events: ${campaign.first_events_count}`);
    }

    console.log('\n✅ Verification complete!\n');
  } catch (error) {
    console.error('❌ Error verifying data:', error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

// Main execution
(async () => {
  const args = process.argv.slice(2);
  const command = args[0];

  try {
    if (command === '--verify') {
      await verifyData();
    } else {
      await seedCampaigns();
      await verifyData();
    }
  } catch (error) {
    console.error('\n❌ Script failed:', error);
    process.exit(1);
  }
})();
