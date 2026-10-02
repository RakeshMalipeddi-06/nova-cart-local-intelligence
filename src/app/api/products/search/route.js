import { NextResponse } from 'next/server';
import { novaState } from '@/lib/storeState';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';

    const results = await novaState.search(query);

    return NextResponse.json({
      success: true,
      query,
      count: results.length,
      results
    });
  } catch (error) {
    console.error('Error in /api/products/search:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to search products', details: error.message },
      { status: 500 }
    );
  }
}
