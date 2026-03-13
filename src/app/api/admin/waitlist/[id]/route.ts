import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { waitlistSignups } from '@/db/schema';
import { env } from '@/env.mjs';
import { eq } from 'drizzle-orm';

/**
 * PATCH /api/admin/waitlist/[id]
 * Update individual waitlist signup
 * Body: {
 *   status?: 'waitlist' | 'applied' | 'accepted' | 'rejected' | 'withdrawn'
 *   notes?: string
 *   applicationFields?: object
 *   leadScore?: number
 *   leadTemperature?: 'cold' | 'warm' | 'hot'
 * }
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Verify admin authentication using API key
  const apiKey = request.headers.get('x-admin-api-key');
  if (apiKey !== env.ADMIN_API_KEY) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const id = params.id;
    const body = await request.json();

    // Build update object with only provided fields
    const updateData: Record<string, any> = {
      updatedAt: new Date(),
    };

    if (body.status !== undefined) {
      updateData.status = body.status;
    }

    if (body.notes !== undefined) {
      updateData.notes = body.notes;
    }

    if (body.applicationFields !== undefined) {
      updateData.applicationFields = body.applicationFields;
    }

    if (body.leadScore !== undefined) {
      updateData.leadScore = body.leadScore;
    }

    if (body.leadTemperature !== undefined) {
      updateData.leadTemperature = body.leadTemperature;
    }

    // Update the signup
    const result = await db
      .update(waitlistSignups)
      .set(updateData)
      .where(eq(waitlistSignups.id, id))
      .returning();

    if (result.length === 0) {
      return NextResponse.json(
        { error: 'Waitlist signup not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      signup: result[0],
    });
  } catch (error) {
    console.error('[API] Error updating waitlist signup:', error);
    return NextResponse.json(
      { error: 'Failed to update waitlist signup' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/waitlist/[id]
 * Delete individual waitlist signup
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Verify admin authentication using API key
  const apiKey = request.headers.get('x-admin-api-key');
  if (apiKey !== env.ADMIN_API_KEY) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const id = params.id;

    // Delete the signup
    const result = await db
      .delete(waitlistSignups)
      .where(eq(waitlistSignups.id, id))
      .returning();

    if (result.length === 0) {
      return NextResponse.json(
        { error: 'Waitlist signup not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Waitlist signup deleted',
    });
  } catch (error) {
    console.error('[API] Error deleting waitlist signup:', error);
    return NextResponse.json(
      { error: 'Failed to delete waitlist signup' },
      { status: 500 }
    );
  }
}
