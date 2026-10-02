import { NextResponse } from 'next/server';
import { novaState } from '@/lib/storeState';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const metrics = novaState.getBusinessMetrics();

    return NextResponse.json({
      success: true,
      metrics
    });
  } catch (error) {
    console.error('Error in /api/business/metrics:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch business metrics', details: error.message },
      { status: 500 }
    );
  }
}
