import { NextResponse } from 'next/server';
import { novaState } from '@/lib/storeState';

export async function POST(request) {
  try {
    const body = await request.json();
    const { storeId, productId, updatedStock } = body;

    if (!storeId || !productId) {
      return NextResponse.json(
        { success: false, error: 'Both storeId and productId are required' },
        { status: 400 }
      );
    }

    const result = novaState.confirmStock(storeId, productId, updatedStock);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in /api/store/confirm-stock:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to confirm stock' },
      { status: 500 }
    );
  }
}
