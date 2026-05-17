import { NextResponse } from "next/server";
import { z } from "zod";
import {
  createBookingId,
  createSlotKey,
  getBeautyQuote,
  getBookingService,
  isSlotAllowedForService,
  type BookingCity,
  type ContactPreference,
  type BookingRequest,
} from "@/lib/booking";
import { getConfirmedSlotKeys, saveBookingRequest } from "@/lib/booking-store";
import { sendAdminBookingRequest } from "@/lib/telegram";

export const dynamic = "force-dynamic";

const bookingSchema = z.object({
  serviceId: z.string().min(2).max(40),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string().regex(/^\d{2}:\d{2}$/),
  city: z.literal("Брест"),
  name: z.string().min(2).max(80),
  phone: z.string().trim().max(40).optional().default(""),
  telegram: z.string().trim().max(80).optional().default(""),
  preferredContact: z.enum(["phone", "telegram"]).optional(),
  privacyAccepted: z.literal(true),
  comment: z.string().max(500).optional(),
}).superRefine((data, ctx) => {
  if (!data.phone && !data.telegram) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Укажите телефон или Telegram для связи.",
      path: ["phone"],
    });
  }

  if (data.phone && data.telegram && !data.preferredContact) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Выберите удобный способ связи.",
      path: ["preferredContact"],
    });
  }

  if (data.preferredContact === "phone" && !data.phone) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Для звонка укажите телефон.",
      path: ["phone"],
    });
  }

  if (data.preferredContact === "telegram" && !data.telegram) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Для связи в Telegram укажите ник.",
      path: ["telegram"],
    });
  }
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = bookingSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: "Проверьте данные формы." },
      { status: 400 },
    );
  }

  const service = getBookingService(parsed.data.serviceId);

  if (!service) {
    return NextResponse.json(
      { ok: false, message: "Выберите услугу из списка." },
      { status: 400 },
    );
  }

  if (!isSlotAllowedForService(service.id, parsed.data.time)) {
    return NextResponse.json(
      {
        ok: false,
        message: "Для наращивания и коррекции последний старт — не позже 18:00.",
      },
      { status: 400 },
    );
  }

  const slotKey = createSlotKey(parsed.data.date, parsed.data.time);
  const confirmedSlotKeys = await getConfirmedSlotKeys();

  if (confirmedSlotKeys.has(slotKey)) {
    return NextResponse.json(
      { ok: false, message: "Этот слот уже занят. Выберите другое время." },
      { status: 409 },
    );
  }

  const booking: BookingRequest = {
    id: createBookingId(),
    serviceId: service.id,
    serviceTitle: service.title,
    date: parsed.data.date,
    time: parsed.data.time,
    city: parsed.data.city as BookingCity,
    name: parsed.data.name.trim(),
    phone: parsed.data.phone,
    telegram: parsed.data.telegram,
    preferredContact: getPreferredContact(parsed.data),
    privacyAccepted: parsed.data.privacyAccepted,
    comment: parsed.data.comment?.trim(),
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  await saveBookingRequest(booking);
  const telegram = await sendAdminBookingRequest(booking);

  return NextResponse.json({
    ok: true,
    requestId: booking.id,
    quote: getBeautyQuote(booking.id),
    telegram: {
      configured: telegram.configured,
      ok: telegram.ok,
      description: telegram.description,
    },
  });
}

function getPreferredContact(data: z.infer<typeof bookingSchema>): ContactPreference {
  if (data.preferredContact) {
    return data.preferredContact;
  }

  return data.telegram ? "telegram" : "phone";
}
