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

    // Build update fields with escaped values
    const updateFields: string[] = ['updated_at = NOW()'];

    if (body.status !== undefined && body.status !== null) {
      const escaped = String(body.status).replace(/'/g, "''");
      updateFields.push(`status = '${escaped}'`);
    }

    if (body.notes !== undefined && body.notes !== null) {
      const escaped = String(body.notes).replace(/'/g, "''");
      updateFields.push(`notes = '${escaped}'`);
    }

    if (body.leadScore !== undefined && body.leadScore !== null) {
      updateFields.push(`lead_score = ${body.leadScore}`);
    }

    if (body.leadTemperature !== undefined && body.leadTemperature !== null) {
      const escaped = String(body.leadTemperature).replace(/'/g, "''");
      updateFields.push(`lead_temperature = '${escaped}'`);
    }

    if (body.applicationFields !== undefined && body.applicationFields !== null) {
      const escaped = JSON.stringify(body.applicationFields).replace(/'/g, "''");
      updateFields.push(`application_fields = '${escaped}'`);
    }

    // Escape the ID
    const escapedId = String(id || '').replace(/'/g, "''");

    // Use raw SQL for update
    const query = `UPDATE waitlist_signups SET ${updateFields.join(', ')} WHERE id = '${escapedId}' RETURNING *`;
    const result = await db.execute(query);

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

    // Escape the ID to prevent SQL injection
    const escapedId = String(id || '').replace(/'/g, "''");

    // Use raw SQL for delete
    const result = await db.execute(
      `DELETE FROM waitlist_signups WHERE id = '${escapedId}' RETURNING id, email`
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
    return NextResponse.json(
      { error: 'Failed to delete waitlist signup' },
      { status: 500 }
    );
  }
}
