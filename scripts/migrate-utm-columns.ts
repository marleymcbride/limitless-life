import postgres from 'postgres';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load .env.local
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '..', '.env.local') });

interface ColumnInfo {
  column_name: string;
  data_type: string;
}

async function migrateUTMColumns() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    console.error('❌ ERROR: DATABASE_URL not found in .env.local');
    process.exit(1);
  }

  console.log('🔄 Starting UTM columns migration...\n');

  const sql = postgres(databaseUrl, { max: 1 });

  try {
    // Check current table structure
    console.log('📋 Checking current sessions table structure...');

    const columns: ColumnInfo[] = await sql`
      SELECT column_name, data_type
      FROM information_schema.columns
      WHERE table_name = 'sessions'
      ORDER BY ordinal_position;
    `;

    console.log('Current columns:');
    columns.forEach(col => {
      console.log(`  - ${col.column_name}: ${col.data_type}`);
    });
    console.log('');

    // Define columns to add
    const columnsToAdd = [
      { name: 'utm_content', type: 'TEXT' },
      { name: 'utm_term', type: 'TEXT' },
      { name: 'browser', type: 'TEXT' },
      { name: 'ip_address', type: 'TEXT' },
      { name: 'country_code', type: 'TEXT' },
    ];

    // Add missing columns
    console.log('➕ Adding missing columns...');

    const existingColumnNames = new Set(columns.map(c => c.column_name));

    for (const column of columnsToAdd) {
      if (!existingColumnNames.has(column.name)) {
        await sql.unsafe(`ALTER TABLE sessions ADD COLUMN IF NOT EXISTS ${column.name} ${column.type};`);
        console.log(`  ✅ Added column: ${column.name}`);
      } else {
        console.log(`  ℹ️  Column already exists: ${column.name}`);
      }
    }

    console.log('');

    // Verify migration
    console.log('🔍 Verifying migration...');

    const updatedColumns: ColumnInfo[] = await sql`
      SELECT column_name, data_type
      FROM information_schema.columns
      WHERE table_name = 'sessions'
      ORDER BY ordinal_position;
    `;

    const updatedColumnNames = new Set(updatedColumns.map(c => c.column_name));

    console.log('Updated columns:');
    updatedColumns.forEach(col => {
      console.log(`  - ${col.column_name}: ${col.data_type}`);
    });
    console.log('');

    // Check all expected columns exist
    const missingColumns = columnsToAdd.filter(col => !updatedColumnNames.has(col.name));

    if (missingColumns.length > 0) {
      console.error('❌ ERROR: Some columns are still missing:');
      missingColumns.forEach(col => {
        console.error(`  - ${col.name}`);
      });
      process.exit(1);
    }

    console.log('✅ SUCCESS: All UTM columns migrated successfully!');
    console.log('\nExpected columns:');
    columnsToAdd.forEach(col => {
      console.log(`  ✅ ${col.name}: ${col.type}`);
    });

    await sql.end();
    process.exit(0);

  } catch (error) {
    console.error('\n❌ ERROR: Migration failed');
    console.error(error);
    await sql.end();
    process.exit(1);
  }
}

// Run migration
migrateUTMColumns();
