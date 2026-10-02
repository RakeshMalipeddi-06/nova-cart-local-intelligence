import { NextResponse } from 'next/server';
import { novaState } from '@/lib/storeState';
import { getAvailabilityIntelligence } from '@/lib/aiReasoning';
import { calculateAvailabilityRisk } from '@/lib/scoringEngine';

export async function POST(request) {
  try {
    const body = await request.json();
    const { storeId, productId, rawSignals } = body;

    let store = null;
    let product = null;
    let inventoryItem = null;

    if (storeId && productId) {
      store = novaState.getStore(storeId);
      product = novaState.getProduct(productId);
      inventoryItem = novaState.getInventoryItem(storeId, productId);
    } else if (rawSignals) {
      inventoryItem = rawSignals;
    }

    if (!inventoryItem) {
      return NextResponse.json(
        { success: false, error: 'Missing inventory context or raw signals' },
        { status: 400 }
      );
    }

    const intelligence = await getAvailabilityIntelligence(product, store, inventoryItem);

    return NextResponse.json({
      success: true,
      product,
      store,
      intelligence
    });
  } catch (error) {
    console.error('Error in /api/availability/analyze:', error);
    return NextResponse.json(
      { success: false, error: 'Availability analysis failed', details: error.message },
      { status: 500 }
    );
  }
}
