import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { isAdminAuthenticated } from '@/lib/admin-auth';

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
 *
 * Headers:
 * - Authentication: Required via JWT cookie
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Verify admin authentication
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const id = params.id;
    const body = await request.json();

    // Build update fields
    const updateFields: string[] = ['updated_at = NOW()'];
    const values: string[] = [];

    if (body.status !== undefined) {
      updateFields.push(`status = $${values.length + 1}`);
      values.push(body.status);
    }

    if (body.notes !== undefined) {
      updateFields.push(`notes = $${values.length + 1}`);
      values.push(body.notes);
    }

    if (body.leadScore !== undefined) {
      updateFields.push(`lead_score = $${values.length + 1}`);
      values.push(body.leadScore.toString());
    }

    if (body.leadTemperature !== undefined) {
      updateFields.push(`lead_temperature = $${values.length + 1}`);
      values.push(body.leadTemperature);
    }

    if (body.applicationFields !== undefined) {
      updateFields.push(`application_fields = $${values.length + 1}`);
      values.push(JSON.stringify(body.applicationFields));
    }

    // Use raw SQL for update to avoid Drizzle ORM issues
    const query = `UPDATE waitlist_signups SET ${updateFields.join(', ')} WHERE id = $${values.length + 1} RETURNING *`;
    values.push(id);

    const result = await db.execute(query, values);

    if (!result || result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Waitlist signup not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      signup: result.rows[0],
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
 *
 * Headers:
 * - Authentication: Required via JWT cookie
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Verify admin authentication
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const id = params.id;

    // Use raw SQL for delete to avoid Drizzle ORM issues with .returning()
    const result = await db.execute(
      `DELETE FROM waitlist_signups WHERE id = '${id}' RETURNING id, email`
    );

    if (!result || result.rows.length === 0) {
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
    console.error('[API] Error details:', {
      message: error instanceof Error ? error.message : 'Unknown',
      stack: error instanceof Error ? error.stack : undefined,
      cause: error instanceof Error ? error.cause : undefined,
    });
    return NextResponse.json(
      {
        error: 'Failed to delete waitlist signup',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
