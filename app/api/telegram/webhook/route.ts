import { NextResponse } from "next/server";
import { confirmBookingRequest, getBookingRequest, updateBookingStatus } from "@/lib/booking-store";
import {
  answerTelegramCallback,
  editAdminBookingMessage,
  formatAdminStatusMessage,
  sendClientBookingConfirmation,
} from "@/lib/telegram";

export const dynamic = "force-dynamic";

type TelegramCallbackUpdate = {
  callback_query?: {
    id: string;
    data?: string;
    message?: {
      message_id: number;
      chat: {
        id: number | string;
      };
    };
  };
};

export async function POST(request: Request) {
  const update = (await request.json().catch(() => null)) as TelegramCallbackUpdate | null;
  const callback = update?.callback_query;

  if (!callback?.data || !callback.message) {
    return NextResponse.json({ ok: true });
  }

  const [action, bookingId] = callback.data.split(":");
  const booking = bookingId ? await getBookingRequest(bookingId) : null;

  if (!booking) {
    await answerTelegramCallback(callback.id, "Заявка не найдена.");
    return NextResponse.json({ ok: true, handled: false });
  }

  if (action === "confirm") {
    const confirmed = await confirmBookingRequest(booking.id);

    if (!confirmed) {
      await answerTelegramCallback(callback.id, "Не удалось подтвердить заявку.");
      return NextResponse.json({ ok: true, handled: false });
    }

    await answerTelegramCallback(callback.id, "Запись подтверждена.");
    await sendClientBookingConfirmation(confirmed);
    await editAdminBookingMessage(
      callback.message.chat.id,
      callback.message.message_id,
      formatAdminStatusMessage(confirmed, "Запись подтверждена"),
    );

    return NextResponse.json({ ok: true, handled: true, status: "confirmed" });
  }

  if (action === "move") {
    const updated = await updateBookingStatus(
      booking.id,
      "reschedule_requested",
      "Админ выбрал перенос даты. Нужно связаться с клиенткой.",
    );

    await answerTelegramCallback(callback.id, "Свяжитесь с клиенткой для переноса.");
    await editAdminBookingMessage(
      callback.message.chat.id,
      callback.message.message_id,
      formatAdminStatusMessage(updated ?? booking, "Нужно перенести запись"),
    );

    return NextResponse.json({ ok: true, handled: true, status: "reschedule_requested" });
  }

  await answerTelegramCallback(callback.id, "Команда не распознана.");
  return NextResponse.json({ ok: true, handled: false });
}
