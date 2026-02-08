import { NextRequest, NextResponse } from 'next/server';
import { airtable } from '@/lib/airtable';
import { isAuthenticated } from '@/lib/admin-auth';

export async function GET(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const searchParams = request.nextUrl.searchParams;
    const filter = searchParams.get('filter') as 'all' | 'hot' | 'warm' | null;

    let temperature: 'Hot' | 'Warm' | 'Cold' | undefined = undefined;

    if (filter === 'hot') {
      temperature = 'Hot';
    } else if (filter === 'warm') {
      temperature = 'Warm';
    }
    // If filter is 'all' or null, we don't filter by temperature

    const records = await airtable.leads.getAll(temperature);

    const leads = records.map((record) => ({
      Email: record.get('Email') as string,
      Name: `${record.get('FirstName') || ''} ${record.get('LastName') || ''}`.trim() || record.get('Email') as string,
      Score: record.get('Score') as number,
      Temperature: record.get('Temperature') as 'Hot' | 'Warm' | 'Cold',
      Phone: record.get('Phone') as string | undefined,
      UTMSource: record.get('UTMSource') as string | undefined,
      CreatedAt: record.get('CreatedAt') as string,
    }));

    return NextResponse.json(leads);
  } catch (error) {
    console.error('Error fetching leads:', error);
    return NextResponse.json(
      { error: 'Failed to fetch leads', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
