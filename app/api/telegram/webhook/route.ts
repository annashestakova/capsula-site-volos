import { NextResponse } from "next/server";
import { confirmBookingRequest, getBookingRequest, updateBookingStatus } from "@/lib/booking-store";
import {
  answerTelegramCallback,
  editAdminBookingMessage,
  formatAdminStatusMessage,
  sendClientBookingConfirmation,
} from "@/lib/telegram";

export const dynamic = "force-dynamic";

type TelegramUpdate = {
  message?: {
    text?: string;
    chat: {
      id: number | string;
      first_name?: string;
    };
  };
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

async function sendTelegramMessage(chatId: number | string, text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) return;

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "HTML",
    }),
    cache: "no-store",
  });
}

export async function POST(request: Request) {
  const update = (await request.json().catch(() => null)) as TelegramUpdate | null;

  if (!update) {
    return NextResponse.json({ ok: true });
  }

  /* ── /start и другие сообщения ── */
  if (update.message?.text) {
    const { chat, text } = update.message;

    if (text === "/start") {
      await sendTelegramMessage(
        chat.id,
        [
          `Привет${chat.first_name ? `, ${chat.first_name}` : ""}! 👋`,
          "",
          "Я бот студии <b>Volos Capsula</b> — наращивание волос в Бресте и Минске.",
          "",
          "Через меня вы получите:",
          "• Подтверждение записи с сайта",
          "• Напоминания о визите",
          "• Связь с мастером",
          "",
          "📌 Записаться: <b>capssula.by</b>",
          "📞 Вопросы: @volos_capsula",
        ].join("\n"),
      );
      return NextResponse.json({ ok: true, handled: true });
    }

    /* Любое другое сообщение */
    await sendTelegramMessage(
      chat.id,
      "Для записи перейдите на сайт: capssula.by\nИли напишите нам: @volos_capsula",
    );
    return NextResponse.json({ ok: true, handled: true });
  }

  /* ── Callback кнопки (подтвердить / перенести) ── */
  const callback = update.callback_query;

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
