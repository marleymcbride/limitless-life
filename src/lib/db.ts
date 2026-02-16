import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '../db/schema';
import { env } from '@/env.mjs';

let queryClient: ReturnType<typeof postgres> | null = null;
let dbInstance: ReturnType<typeof drizzle> | null = null;

function getDb() {
  if (!dbInstance) {
    if (!env.DATABASE_URL) {
      throw new Error('DATABASE_URL environment variable is not set');
    }
    queryClient = postgres(env.DATABASE_URL);
    dbInstance = drizzle(queryClient, { schema });
  }
  return dbInstance;
}

export const db = new Proxy(getDb(), {
  get(target, prop) {
    return Reflect.get(target, prop);
  },
});
