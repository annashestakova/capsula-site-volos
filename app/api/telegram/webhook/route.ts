import { NextResponse } from "next/server";
import { confirmBookingRequest, getBookingRequest, updateBookingStatus } from "@/lib/booking-store";
import {
  answerTelegramCallback,
  editAdminBookingMessage,
  formatAdminStatusMessage,
  normalizeTelegramContact,
  saveClientChatId,
  getClientChatId,
} from "@/lib/telegram";

export const dynamic = "force-dynamic";

type TelegramUpdate = {
  message?: {
    text?: string;
    chat: { id: number; first_name?: string };
    from?: { username?: string };
  };
  callback_query?: {
    id: string;
    data?: string;
    message?: {
      message_id: number;
      chat: { id: number | string };
    };
  };
};

async function sendMessage(
  chatId: number | string,
  text: string,
  extra?: Record<string, unknown>,
) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) return { ok: false };
  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML", ...extra }),
    cache: "no-store",
  });
  return res.json() as Promise<{ ok: boolean }>;
}

export async function POST(request: Request) {
  const update = (await request.json().catch(() => null)) as TelegramUpdate | null;
  if (!update) return NextResponse.json({ ok: true });

  /* ── Входящие сообщения ── */
  if (update.message?.text) {
    const { chat, text, from } = update.message;

    // Сохраняем chat_id по username чтобы потом писать клиентке
    if (from?.username) {
      await saveClientChatId(from.username.toLowerCase(), chat.id);
    }

    if (text?.startsWith("/start")) {
      // Если /start содержит booking_id — привязываем chat_id к заявке
      const payload = text.slice(7).trim(); // всё после "/start "
      if (payload) {
        // payload = booking id, сохраняем chat_id по booking_id тоже
        await saveClientChatId(`booking:${payload}`, chat.id);
      }
      // Сохраняем по username тоже (если есть)
      if (from?.username) {
        await saveClientChatId(from.username.toLowerCase(), chat.id);
      }

      await sendMessage(
        chat.id,
        [
          `Привет${chat.first_name ? `, ${chat.first_name}` : ""}! 👋`,
          "",
          "Я бот студии <b>Volos Capsula</b> — наращивание волос в Бресте и Минске.",
          "",
          "Вы подключены! Теперь вы будете получать:",
          "• Подтверждение вашей записи",
          "• Уведомление если нужен перенос",
          "",
          "📌 Записаться на сайте: <b>capssula.by</b>",
        ].join("\n"),
      );
      return NextResponse.json({ ok: true, handled: true });
    }

    await sendMessage(
      chat.id,
      "Для записи на наращивание перейдите на сайт: <b>capssula.by</b>",
    );
    return NextResponse.json({ ok: true, handled: true });
  }

  /* ── Callback кнопки ── */
  const cb = update.callback_query;
  if (!cb?.data || !cb.message) return NextResponse.json({ ok: true });

  const [action, bookingId] = cb.data.split(":");
  const booking = bookingId ? await getBookingRequest(bookingId) : null;

  if (!booking) {
    await answerTelegramCallback(cb.id, "Заявка не найдена.");
    return NextResponse.json({ ok: true, handled: false });
  }

  /* ── ПОДТВЕРДИТЬ ── */
  if (action === "confirm") {
    const confirmed = await confirmBookingRequest(booking.id);
    if (!confirmed) {
      await answerTelegramCallback(cb.id, "Не удалось подтвердить.");
      return NextResponse.json({ ok: true, handled: false });
    }

    // Пробуем написать клиентке в бот по сохранённому chat_id
    const username = normalizeTelegramContact(confirmed.telegram).replace("@", "").toLowerCase();
    const clientChatId = username ? await getClientChatId(username) : null;

    let clientNotified = false;
    if (clientChatId) {
      const result = await sendMessage(
        clientChatId,
        [
          "✅ <b>Ваша запись подтверждена!</b>",
          "",
          `📅 ${confirmed.date} в ${confirmed.time}`,
          `💆 Услуга: ${confirmed.serviceTitle}`,
          `📍 Город: ${confirmed.city}`,
          "",
          "Ждём вас! Если возникнут вопросы — пишите сюда.",
        ].join("\n"),
      );
      clientNotified = result.ok;
    }

    await answerTelegramCallback(cb.id, "Запись подтверждена ✅");

    // Обновляем сообщение у админа
    const contactUrl = username ? `https://t.me/${username}` : null;
    await editAdminBookingMessage(
      cb.message.chat.id,
      cb.message.message_id,
      formatAdminStatusMessage(
        confirmed,
        clientNotified
          ? "✅ Запись подтверждена — клиентке отправлено уведомление в бот"
          : "✅ Запись подтверждена — клиентка не запускала бот, напишите вручную",
      ),
      clientNotified ? [] : contactUrl ? [[{ text: "Написать клиентке →", url: contactUrl }]] : [],
    );

    return NextResponse.json({ ok: true, handled: true, clientNotified });
  }

  /* ── ПЕРЕНЕСТИ ── */
  if (action === "move") {
    const updated = await updateBookingStatus(
      booking.id,
      "reschedule_requested",
      "Нужно перенести дату. Свяжитесь с клиенткой.",
    );

    const username = normalizeTelegramContact(booking.telegram).replace("@", "").toLowerCase();
    const byPhone = booking.preferredContact === "phone";

    // Ищем chat_id: сначала по booking deep link, потом по username
    const clientChatId =
      (await getClientChatId(`booking:${booking.id}`)) ??
      (username ? await getClientChatId(username) : null);

    const contactMethod = byPhone
      ? `по телефону <b>${booking.phone || "—"}</b>`
      : `в Telegram <b>${normalizeTelegramContact(booking.telegram) || "—"}</b>`;

    let clientNotified = false;
    if (clientChatId) {
      const res = await sendMessage(
        clientChatId,
        [
          "⏳ <b>Требуется перенос записи</b>",
          "",
          `Ваша запись на ${booking.date} в ${booking.time} нуждается в переносе.`,
          "",
          `Мастер свяжется с вами в течение <b>10 минут</b> ${contactMethod}.`,
          "",
          "Приносим извинения за неудобство 🙏",
        ].join("\n"),
      );
      clientNotified = res.ok;
    }

    // Кнопки для связи у админа (всегда показываем — как запасной вариант)
    const contactUrl = byPhone
      ? `tel:${booking.phone}`
      : username
        ? `https://t.me/${username}`
        : null;
    const contactLabel = byPhone
      ? `📞 Позвонить ${booking.phone}`
      : "✉️ Написать клиентке →";

    const statusText = clientNotified
      ? "⏳ Нужно перенести — клиентка уведомлена в боте"
      : "⏳ Нужно перенести — клиентка не в боте, свяжитесь вручную";

    await answerTelegramCallback(cb.id, clientNotified ? "Клиентка уведомлена ✅" : "Свяжитесь с клиенткой вручную");
    await editAdminBookingMessage(
      cb.message.chat.id,
      cb.message.message_id,
      formatAdminStatusMessage(updated ?? booking, statusText),
      contactUrl ? [[{ text: contactLabel, url: contactUrl }]] : [],
    );

    return NextResponse.json({ ok: true, handled: true, clientNotified });
  }

  await answerTelegramCallback(cb.id, "Команда не распознана.");
  return NextResponse.json({ ok: true, handled: false });
}
