import { NextResponse } from 'next/server';
import { novaState } from '@/lib/storeState';

export async function POST() {
  try {
    novaState.reset();
    return NextResponse.json({
      success: true,
      message: 'Demo state reset successfully to baseline scenario.'
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to reset state' },
      { status: 500 }
    );
  }
}
