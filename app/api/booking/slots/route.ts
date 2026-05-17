import { NextResponse } from "next/server";
import { BOOKING_SERVICES, buildBookingDays } from "@/lib/booking";
import { getBookingStorageMode, getConfirmedSlotKeys } from "@/lib/booking-store";

export const dynamic = "force-dynamic";

export async function GET() {
  const confirmedSlotKeys = await getConfirmedSlotKeys();
  const days = buildBookingDays(confirmedSlotKeys);

  return NextResponse.json({
    ok: true,
    services: BOOKING_SERVICES,
    days,
    storage: getBookingStorageMode(),
    generatedAt: new Date().toISOString(),
  });
}
