import { config } from 'dotenv';
import postgres from 'postgres';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';

// Load environment variables from .env.local
config({ path: '.env.local' });

async function wipeDatabase() {
  console.log('🔄 Starting PostgreSQL data wipe...\n');

  const client = postgres(process.env.DATABASE_URL!);

  try {
    // Create backup directory with timestamp
    const timestamp = new Date().toISOString().split('T')[0];
    const backupDir = join(process.cwd(), 'backups', timestamp);

    if (!existsSync(backupDir)) {
      mkdirSync(backupDir, { recursive: true });
      console.log(`📁 Created backup directory: ${backupDir}\n`);
    }

    // Tables in FK dependency order (children first, then parents)
    const tables = [
      'application_submissions',
      'webhook_queue',
      'events',
      'payments',
      'lead_alerts',
      'sessions',
      'users'
    ];

    // Step 1: Backup each table to CSV
    console.log('📦 Step 1: Backing up tables to CSV...\n');

    for (const table of tables) {
      const result = await client`
        SELECT COUNT(*) as count
        FROM ${client(table)}
      `;

      const rowCount = result[0].count;

      if (rowCount > 0) {
        // Query all data from table
        const data = await client`SELECT * FROM ${client(table)}`;

        // Convert to CSV
        if (data.length > 0) {
          const headers = Object.keys(data[0]);
          const csvContent = [
            headers.join(','),
            ...data.map(row => headers.map(h => {
              const val = row[h];
              // Handle null, strings with commas, quotes
              if (val === null) return '';
              if (typeof val === 'string' && (val.includes(',') || val.includes('"') || val.includes('\n'))) {
                return `"${val.replace(/"/g, '""')}"`;
              }
              return String(val);
            }).join(','))
          ].join('\n');

          const csvPath = join(backupDir, `${table}.csv`);
          writeFileSync(csvPath, csvContent);

          console.log(`  ✅ Backed up ${table} (${rowCount} rows → ${table}.csv)`);
        }
      } else {
        console.log(`  ⏭️  Skipped ${table} (already empty)`);
      }
    }

    console.log('\n⏸️  Step 2: Wiping data (TRUNCATE in FK order)...\n');

    // Step 2: TRUNCATE in FK dependency order
    const truncateResults = [];

    for (const table of tables) {
      const result = await client`
        SELECT COUNT(*) as count
        FROM ${client(table)}
      `;

      const rowCount = result[0].count;

      if (rowCount > 0) {
        await client`TRUNCATE TABLE ${client(table)} CASCADE`;
        console.log(`  ✅ TRUNCATE ${table} (${rowCount} rows deleted)`);
        truncateResults.push({ table, rowsDeleted: rowCount });
      } else {
        console.log(`  ⏭️  Skipped ${table} (already empty)`);
        truncateResults.push({ table, rowsDeleted: 0 });
      }
    }

    console.log('\n🔍 Step 3: Verifying empty state...\n');

    // Step 3: Verify all tables are empty
    let allEmpty = true;

    for (const table of tables) {
      const result = await client`
        SELECT COUNT(*) as count
        FROM ${client(table)}
      `;

      const count = Number(result[0].count);

      if (count === 0) {
        console.log(`  ✅ ${table}: 0 rows (empty)`);
      } else {
        console.log(`  ❌ ${table}: ${count} rows (NOT EMPTY!)`);
        allEmpty = false;
      }
    }

    console.log('\n' + '─'.repeat(60));

    if (allEmpty) {
      console.log('\n✅ SUCCESS: All tables wiped successfully!');
      console.log(`📁 Backup location: ${backupDir}/`);
      console.log('\n🎯 Next steps:');
      console.log('   1. Test API: curl http://localhost:3000/api/test/db-connection');
      console.log('   2. Verify app works: http://localhost:3000');
      console.log('   3. New users/events will be tracked normally\n');
    } else {
      console.log('\n❌ WARNING: Some tables are not empty!');
      console.log('   Please check the verification output above.\n');
    }

    await client.end();
    process.exit(allEmpty ? 0 : 1);

  } catch (error) {
    console.error('\n❌ Database wipe failed:', error);
    await client.end();
    process.exit(1);
  }
}

wipeDatabase();
