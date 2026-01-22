import { NextResponse } from 'next/server'

/**
 * Webhook endpoint for Base Mini App / Farcaster clients.
 * POST events (e.g. notifications) — Candy Match does not use them yet;
 * we acknowledge requests to satisfy manifest validation.
 */
export async function POST() {
  return NextResponse.json({ received: true }, { status: 200 })
}
