import { config } from 'dotenv';
import postgres from 'postgres';

config({ path: '.env.local' });
const client = postgres(process.env.DATABASE_URL!);

async function check() {
  const tables = ['users', 'events', 'payments', 'lead_alerts', 'sessions', 'webhook_queue', 'application_submissions'];
  console.log('📊 Current row counts:');
  for (const table of tables) {
    const result = await client`SELECT COUNT(*) as count FROM ${client(table)}`;
    console.log(`  ${table}: ${result[0].count}`);
  }
  await client.end();
}

check();
