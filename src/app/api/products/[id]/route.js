import { NextResponse } from 'next/server';
import { novaState } from '@/lib/storeState';

export const dynamic = 'force-dynamic';

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const storeId = searchParams.get('storeId');

    const product = novaState.getProduct(id);
    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    // Get alternatives (excluding storeId if provided)
    const alternatives = await novaState.getAlternatives(id, storeId);

    // If storeId provided, also get specific store's inventory & risk
    let storeInfo = null;
    let inventoryItem = null;
    if (storeId) {
      storeInfo = novaState.getStore(storeId);
      inventoryItem = novaState.getInventoryItem(storeId, id);
    }

    return NextResponse.json({
      success: true,
      product,
      store: storeInfo,
      inventory: inventoryItem,
      alternatives
    });
  } catch (error) {
    console.error('Error in /api/products/[id]:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch product details', details: error.message },
      { status: 500 }
    );
  }
}
