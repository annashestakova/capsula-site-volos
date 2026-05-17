import type { BookingRequest } from "@/lib/booking";
import { getBeautyQuote } from "@/lib/booking";

type TelegramResponse<T> = {
  ok: boolean;
  result?: T;
  description?: string;
};

type TelegramSendResult = {
  configured: boolean;
  ok: boolean;
  description?: string;
};

function getTelegramConfig() {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const adminChatId = process.env.TELEGRAM_ADMIN_CHAT_ID;

  if (!token || !adminChatId) {
    return null;
  }

  return { token, adminChatId };
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

async function telegramRequest<T>(
  method: string,
  payload: Record<string, unknown>,
) {
  const config = getTelegramConfig();

  if (!config) {
    return { configured: false, ok: false } as TelegramSendResult;
  }

  const response = await fetch(`https://api.telegram.org/bot${config.token}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    cache: "no-store",
  });
  const data = (await response.json()) as TelegramResponse<T>;

  return {
    configured: true,
    ok: response.ok && data.ok,
    description: data.description,
    result: data.result,
  };
}

export function normalizeTelegramContact(value: string) {
  const cleaned = value.trim().replace(/^https:\/\/t\.me\//, "").replace(/^@/, "");
  return cleaned ? `@${cleaned}` : "";
}

export function getTelegramContactUrl(value: string) {
  const contact = normalizeTelegramContact(value);
  return contact ? `https://t.me/${contact.slice(1)}` : null;
}

export async function sendAdminBookingRequest(request: BookingRequest) {
  const contactUrl = getTelegramContactUrl(request.telegram);
  const text = [
    "<b>Новая запись с сайта Volos Capsula</b>",
    "",
    `<b>Заявка:</b> ${escapeHtml(request.id)}`,
    `<b>Услуга:</b> ${escapeHtml(request.serviceTitle)}`,
    `<b>Дата:</b> ${escapeHtml(request.date)}`,
    `<b>Время:</b> ${escapeHtml(request.time)}`,
    `<b>Город:</b> ${escapeHtml(request.city)}`,
    "",
    `<b>Имя:</b> ${escapeHtml(request.name)}`,
    `<b>Телефон:</b> ${escapeHtml(request.phone || "не указан")}`,
    `<b>Telegram:</b> ${escapeHtml(normalizeTelegramContact(request.telegram) || "не указан")}`,
    `<b>Удобнее связаться:</b> ${request.preferredContact === "phone" ? "по телефону" : "в Telegram"}`,
    `<b>Согласие на обработку данных:</b> ${request.privacyAccepted ? "получено" : "нет"}`,
    request.comment ? `<b>Комментарий:</b> ${escapeHtml(request.comment)}` : "",
  ].filter(Boolean).join("\n");

  return telegramRequest("sendMessage", {
    chat_id: process.env.TELEGRAM_ADMIN_CHAT_ID,
    text,
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [
        [
          { text: "Подтвердить", callback_data: `confirm:${request.id}` },
          { text: "Перенести", callback_data: `move:${request.id}` },
        ],
        ...(contactUrl ? [[{ text: "Написать клиентке", url: contactUrl }]] : []),
      ],
    },
  });
}

export async function sendClientBookingConfirmation(request: BookingRequest) {
  const contact = normalizeTelegramContact(request.telegram);

  if (!contact) {
    return { configured: Boolean(getTelegramConfig()), ok: false } as TelegramSendResult;
  }

  const quote = getBeautyQuote(request.id);
  const text = [
    `Анна подтвердила вашу запись на ${request.date} в ${request.time}.`,
    "",
    `Услуга: ${request.serviceTitle}`,
    `Город: ${request.city}`,
    "",
    quote,
  ].join("\n");

  return telegramRequest("sendMessage", {
    chat_id: contact,
    text,
  });
}

export async function answerTelegramCallback(callbackQueryId: string, text: string) {
  return telegramRequest("answerCallbackQuery", {
    callback_query_id: callbackQueryId,
    text,
    show_alert: false,
  });
}

export async function editAdminBookingMessage(
  chatId: number | string,
  messageId: number,
  text: string,
) {
  return telegramRequest("editMessageText", {
    chat_id: chatId,
    message_id: messageId,
    text,
    parse_mode: "HTML",
  });
}

export function formatAdminStatusMessage(request: BookingRequest, statusText: string) {
  return [
    `<b>${escapeHtml(statusText)}</b>`,
    "",
    `<b>Заявка:</b> ${escapeHtml(request.id)}`,
    `<b>Услуга:</b> ${escapeHtml(request.serviceTitle)}`,
    `<b>Дата:</b> ${escapeHtml(request.date)}`,
    `<b>Время:</b> ${escapeHtml(request.time)}`,
    `<b>Город:</b> ${escapeHtml(request.city)}`,
    "",
    `<b>Клиентка:</b> ${escapeHtml(request.name)}`,
    `<b>Телефон:</b> ${escapeHtml(request.phone || "не указан")}`,
    `<b>Telegram:</b> ${escapeHtml(normalizeTelegramContact(request.telegram) || "не указан")}`,
    `<b>Удобнее связаться:</b> ${request.preferredContact === "phone" ? "по телефону" : "в Telegram"}`,
  ].join("\n");
}
