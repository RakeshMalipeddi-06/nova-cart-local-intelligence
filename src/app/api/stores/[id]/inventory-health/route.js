import { NextResponse } from 'next/server';
import { novaState } from '@/lib/storeState';

export const dynamic = 'force-dynamic';

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const healthData = novaState.getStoreInventoryHealth(id);

    if (!healthData) {
      return NextResponse.json(
        { success: false, error: 'Store not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      ...healthData
    });
  } catch (error) {
    console.error('Error in /api/stores/[id]/inventory-health:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch store inventory health', details: error.message },
      { status: 500 }
    );
  }
}
