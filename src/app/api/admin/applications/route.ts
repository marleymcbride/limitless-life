import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users, events, payments } from '@/db/schema';
import { eq, desc, sql, and, or } from 'drizzle-orm';
import { isAdminAuthenticated } from '@/lib/admin-auth';
import { calculateLeadScore } from '@/lib/scoring';

/**
 * GET /api/admin/applications
 *
 * Get leads who submitted Fillout forms with full journey data.
 *
 * Headers:
 * - Authentication: Required via JWT cookie
 */
export async function GET(req: NextRequest) {
  try {
    // Verify admin authentication
    if (!(await isAdminAuthenticated())) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const url = new URL(req.url);
    const temperature = url.searchParams.get('temperature');

    // Get users with emails
    const allUsers = await db
      .select()
      .from(users)
      .where(sql`${users.email} IS NOT NULL`)
      .orderBy(sql`${users.leadScore} DESC`)
      .limit(1000);

    // Fetch journey data for each user
    const applicationsWithData = await Promise.all(
      allUsers.map(async (user) => {
        // Get all events for this user
        const userEvents = await db
          .select()
          .from(events)
          .where(eq(events.userId, user.id))
          .orderBy(desc(events.createdAt));

        // Check if user has form submissions
        const hasFormSubmission = userEvents.some(
          e => e.eventType === 'email_submit' || e.eventType === 'application_complete'
        );

        if (!hasFormSubmission) {
          return null;
        }

        // Calculate score on-the-fly if not already calculated
        let calculatedScore = user.leadScore;
        let calculatedTemp = user.leadTemperature;
        let calculatedTier = user.tierInterest;

        // If score is default/low, recalculate from events
        if (!calculatedScore || calculatedScore <= 10) {
          try {
            const scoreData = await calculateLeadScore(user.id);
            calculatedScore = scoreData.score;
            calculatedTemp = scoreData.temperature;
            calculatedTier = scoreData.tierInterest;
          } catch (error) {
            console.error('[Applications] Score calculation error:', error);
          }
        }

        // Extract journey data
        const vslStartEvent = userEvents.find(e => e.eventType === 'vsl_start');
        const vslMilestoneEvents = userEvents.filter(e => e.eventType === 'vsl_milestone');
        const maxVslPercent = vslMilestoneEvents.length > 0
          ? Math.max(...vslMilestoneEvents.map(e => e.eventData?.percent || 0))
          : 0;

        const interestEvent = userEvents.find(e =>
          e.eventType === 'coaching_interest' ||
          e.eventType === 'course_interest' ||
          e.eventType === 'tire_kicker_interest'
        );

        const pricingEvent = userEvents.find(e => e.eventType === 'pricing_plan_selected');
        const checkoutEvent = userEvents.find(e => e.eventType === 'checkout_initiated');

        // Get latest form submission data
        const formEvent = userEvents.find(e =>
          e.eventType === 'email_submit' || e.eventType === 'application_complete'
        );

        // Get name from form event data (not from users table)
        const formFullName = formEvent?.eventData?.fullName || '';
        const formFirstName = formEvent?.eventData?.firstName || user.firstName || '';
        const formLastName = formEvent?.eventData?.lastName || user.lastName || '';

        // Check if purchased
        const userPayments = await db
          .select()
          .from(payments)
          .where(eq(payments.userId, user.id));
        const hasPurchased = userPayments.some(p => p.status === 'succeeded');

        // Map interest type
        let interestDisplay = null;
        if (interestEvent?.eventData?.interestType) {
          switch (interestEvent.eventData.interestType) {
            case 'coaching':
              interestDisplay = 'Coaching';
              break;
            case 'course':
              interestDisplay = 'Course';
              break;
            case 'tire_kicker':
              interestDisplay = 'Self-paced';
              break;
            default:
              interestDisplay = interestEvent.eventData.interestType;
          }
        }

        return {
          id: user.id,
          email: user.email,
          firstName: formFirstName,
          lastName: formLastName,
          fullName: formFullName, // Store full name too
          leadScore: calculatedScore,
          leadTemperature: calculatedTemp,
          tierInterest: calculatedTier,
          lastSeen: user.lastSeen,
          createdAt: user.createdAt,
          vslWatched: !!vslStartEvent,
          vslCompletionPercent: maxVslPercent,
          interestType: interestDisplay,
          pricingPlanSelected: pricingEvent?.eventData?.plan || null,
          checkoutInitiated: !!checkoutEvent,
          purchased: hasPurchased,
          problemsToSolve: formEvent?.eventData?.problemsToSolve || null,
          desiredResult: formEvent?.eventData?.desiredResult || null,
        };
      })
    );

    // Filter and sort
    let applications = applicationsWithData
      .filter((app): app is NonNullable<typeof app> => app !== null)
      .sort((a, b) => b.leadScore - a.leadScore)
      .slice(0, 100);

    // Apply temperature filter if provided
    if (temperature && temperature !== 'all') {
      applications = applications.filter(app => app.leadTemperature === temperature);
    }

    return NextResponse.json({
      success: true,
      applications,
    });
  } catch (error) {
    console.error('[Applications] Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch applications' },
      { status: 500 }
    );
  }
}
