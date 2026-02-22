import { db } from './db';
import { users } from '../db/schema';
import { eq } from 'drizzle-orm';
import type { ParsedFilloutSubmission } from '@/types/fillout';

/**
 * Find existing user by email or create a new one
 * Returns the user ID and whether it was newly created
 */
export async function findOrCreateUser(
  submission: ParsedFilloutSubmission
): Promise<{ userId: string; isNewUser: boolean }> {
  const email = submission.email.toLowerCase().trim();

  // Try to find existing user
  const existingUsers = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existingUsers.length > 0) {
    const existingUser = existingUsers[0];

    // Update lastSeen timestamp
    await db
      .update(users)
      .set({
        lastSeen: new Date(),
        // Update name if provided and current values are empty
        ...(submission.firstName && !existingUser.firstName ? { firstName: submission.firstName } : {}),
        ...(submission.lastName && !existingUser.lastName ? { lastName: submission.lastName } : {}),
      })
      .where(eq(users.id, existingUser.id));

    return { userId: existingUser.id, isNewUser: false };
  }

  // Create new user
  const newUser = await db
    .insert(users)
    .values({
      email,
      firstName: submission.firstName || null,
      lastName: submission.lastName || null,
      leadScore: 0, // Will be updated by lead scoring system
      leadTemperature: 'cold',
      status: 'prospect',
      tierInterest: null,
      firstSeen: new Date(),
      lastSeen: new Date(),
    })
    .returning();

  return { userId: newUser[0].id, isNewUser: true };
}
