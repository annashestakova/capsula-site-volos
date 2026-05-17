"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays, CheckCircle2, Clock, Loader2, MapPin, Send, Sparkles } from "lucide-react";
import {
  BEAUTY_QUOTES,
  BOOKING_SERVICES,
  isLongBookingService,
  isSlotAllowedForService,
  type BookingDay,
  type BookingService,
  type BookingSlot,
  type ContactPreference,
} from "@/lib/booking";
import LottiePlayer from "@/components/LottiePlayer";

type SlotsResponse = {
  ok: boolean;
  days: BookingDay[];
  services: BookingService[];
  storage: "kv" | "memory";
};

type SubmitState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; requestId: string; quote: string; telegramConfigured: boolean; preferredContact: ContactPreference }
  | { status: "error"; message: string };

// Deterministic fake-booked slots for social proof (~25% of slots look taken)
function isFakeBooked(date: string, time: string): boolean {
  const key = date + time;
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = (hash * 31 + key.charCodeAt(i)) & 0xffffff;
  }
  return hash % 4 === 0;
}

const emptyForm = {
  name: "",
  phone: "",
  telegram: "",
  preferredContact: "" as "" | ContactPreference,
  privacyAccepted: false,
  comment: "",
};

const contactOptions: Array<{ value: ContactPreference; label: string; hint: string }> = [
  {
    value: "telegram",
    label: "Написать в Telegram",
    hint: "Удобно для быстрых уточнений и переноса записи.",
  },
  {
    value: "phone",
    label: "Позвонить по телефону",
    hint: "Подойдёт, если проще обсудить детали голосом.",
  },
];

export default function BookingCalendar() {
  const [days, setDays] = useState<BookingDay[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(true);
  const [serviceId, setServiceId] = useState(BOOKING_SERVICES[0].id);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [form, setForm] = useState(emptyForm);
  const [submitState, setSubmitState] = useState<SubmitState>({ status: "idle" });
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [quoteMounted, setQuoteMounted] = useState(false);

  useEffect(() => {
    setQuoteIndex(Math.floor(Math.random() * BEAUTY_QUOTES.length));
    setQuoteMounted(true);
    const quoteTimer = setInterval(() => {
      setQuoteIndex((i) => (i + 1) % BEAUTY_QUOTES.length);
    }, 6000);
    return () => clearInterval(quoteTimer);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadSlots() {
      setSlotsLoading(true);
      const response = await fetch("/api/booking/slots", { cache: "no-store" });
      const data = (await response.json()) as SlotsResponse;

      if (cancelled) {
        return;
      }

      setDays(data.days);
      setSlotsLoading(false);

      const firstDay = data.days.find((day) => day.slots.length > 0);
      if (firstDay) {
        setSelectedDate(firstDay.date);
        setSelectedTime(firstDay.slots[0]?.time ?? "");
      }
    }

    loadSlots().catch(() => {
      if (!cancelled) {
        setSlotsLoading(false);
        setSubmitState({
          status: "error",
          message: "Не удалось загрузить свободные слоты. Обновите страницу.",
        });
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const selectedService = useMemo(
    () => BOOKING_SERVICES.find((service) => service.id === serviceId) ?? BOOKING_SERVICES[0],
    [serviceId],
  );

  const availableDays = useMemo(
    () => days
      .map((day) => {
        const slots = day.slots.filter((slot) => isSlotAllowedForService(serviceId, slot.time));

        return {
          ...day,
          slots,
          availableCount: slots.length,
        };
      })
      .filter((day) => day.slots.length > 0),
    [days, serviceId],
  );

  const selectedDay = useMemo(
    () => availableDays.find((day) => day.date === selectedDate),
    [availableDays, selectedDate],
  );

  const selectedSlot = useMemo<BookingSlot | undefined>(
    () => selectedDay?.slots.find((slot) => slot.time === selectedTime),
    [selectedDay, selectedTime],
  );

  const hasPhone = form.phone.trim().length > 0;
  const hasTelegram = form.telegram.trim().length > 0;
  const needsPreferredContact = hasPhone && hasTelegram;
  const longServiceSelected = isLongBookingService(serviceId);

  useEffect(() => {
    if (slotsLoading || availableDays.length === 0) {
      return;
    }

    const currentDay = availableDays.find((day) => day.date === selectedDate);

    if (!currentDay) {
      const firstDay = availableDays[0];
      setSelectedDate(firstDay.date);
      setSelectedTime(firstDay.slots[0]?.time ?? "");
      return;
    }

    if (!currentDay.slots.some((slot) => slot.time === selectedTime)) {
      setSelectedTime(currentDay.slots[0]?.time ?? "");
    }
  }, [availableDays, selectedDate, selectedTime, slotsLoading]);

  function selectDate(day: BookingDay) {
    setSelectedDate(day.date);
    setSelectedTime(day.slots[0]?.time ?? "");
    setSubmitState({ status: "idle" });
  }

  function getPreferredContact(): ContactPreference {
    if (needsPreferredContact && form.preferredContact) {
      return form.preferredContact;
    }

    return hasTelegram ? "telegram" : "phone";
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selectedSlot) {
      setSubmitState({ status: "error", message: "Выберите свободное время." });
      return;
    }

    if (!hasPhone && !hasTelegram) {
      setSubmitState({
        status: "error",
        message: "Укажите телефон или Telegram, чтобы Анна могла связаться с вами.",
      });
      return;
    }

    if (needsPreferredContact && !form.preferredContact) {
      setSubmitState({
        status: "error",
        message: "Вы указали два контакта. Выберите, как с вами лучше связаться.",
      });
      return;
    }

    if (!isSlotAllowedForService(serviceId, selectedSlot.time)) {
      setSubmitState({
        status: "error",
        message: "Для наращивания и коррекции последний старт — не позже 18:00.",
      });
      return;
    }

    if (!form.privacyAccepted) {
      setSubmitState({
        status: "error",
        message: "Подтвердите согласие на обработку персональных данных.",
      });
      return;
    }

    setSubmitState({ status: "loading" });

    const response = await fetch("/api/booking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        serviceId,
        date: selectedSlot.date,
        time: selectedSlot.time,
        city: selectedSlot.city,
        ...form,
        preferredContact: getPreferredContact(),
      }),
    });

    const data = (await response.json()) as {
      ok: boolean;
      message?: string;
      requestId?: string;
      quote?: string;
      telegram?: { configured: boolean; ok: boolean };
    };

    if (!response.ok || !data.ok || !data.requestId || !data.quote) {
      setSubmitState({
        status: "error",
        message: data.message ?? "Не удалось отправить запись. Попробуйте ещё раз.",
      });
      return;
    }

    setSubmitState({
      status: "success",
      requestId: data.requestId,
      quote: data.quote,
      telegramConfigured: Boolean(data.telegram?.configured),
      preferredContact: getPreferredContact(),
    });
    setForm(emptyForm);
    // Google Ads conversion tracking
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "conversion", {
        send_to: "AW-CONVERSION_ID/CONVERSION_LABEL",
      });
    }
  }

  return (
    <section className="section-padding bg-milk">
      <div className="container-site">
        <div className="grid grid-cols-1 xl:grid-cols-[0.82fr_1.18fr] gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-5xl bg-espresso p-8 md:p-10 text-cream"
          >
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-rose/20 to-transparent pointer-events-none" />
            {/* Location animation */}
            <LottiePlayer
              src="/lottie/location-search.json"
              className="absolute -right-16 bottom-0 h-64 w-64 opacity-25 sm:opacity-35 sm:h-80 sm:w-80 pointer-events-none"
              ariaLabel="поиск локации"
              speed={0.85}
            />
            {/* Girl walking animation */}
            <LottiePlayer
              src="/lottie/fashionable-girl-red-dress.json"
              className="absolute left-0 bottom-0 h-48 w-48 opacity-20 sm:opacity-30 sm:h-60 sm:w-60 pointer-events-none"
              ariaLabel="девушка"
              speed={0.7}
            />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 rounded-full bg-cream/10 px-4 py-2 text-sm text-cream/80">
                <Sparkles size={14} className="text-blush" />
                Живая запись
              </div>
              <h2 className="mt-8 font-display text-4xl sm:text-5xl font-light leading-tight">
                Выберите
                <br />
                <em className="italic text-blush">свой слот</em>
              </h2>
              <p className="mt-6 max-w-md font-body text-sm leading-relaxed text-cream/65">
                Запись занимает пару минут: выберите услугу, удобное время и оставьте контакт.
                Анна проверит заявку и подтвердит её лично.
              </p>

              <div className="mt-10 grid gap-3">
                {[
                  "Свободные часы показаны сразу в календаре",
                  "Если время не подойдёт, Анна предложит ближайший вариант",
                  "После подтверждения слот закрепляется за вами",
                  "Контакты нужны только для связи по записи",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-3xl bg-cream/[0.08] p-4">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blush" />
                    <span className="font-body text-sm text-cream/75">{item}</span>
                  </div>
                ))}
              </div>

              <p className="mt-8 rounded-3xl border border-blush/20 bg-blush/10 p-4 font-body text-xs leading-relaxed text-cream/65">
                После отправки дождитесь подтверждения: так мы точно проверим длительность услуги,
                подготовим нужный объём волос и не будем спешить с вашим образом.
              </p>

              {quoteMounted && (
                <div className="mt-8 border-t border-cream/10 pt-6">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={quoteIndex}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.5 }}
                      className="font-display text-base italic leading-relaxed text-blush/80"
                    >
                      &ldquo;{BEAUTY_QUOTES[quoteIndex]}&rdquo;
                    </motion.p>
                  </AnimatePresence>
                </div>
              )}
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-5xl border border-sand/60 bg-white/75 p-5 shadow-sm backdrop-blur md:p-8"
          >
            <div className="flex flex-col gap-3 border-b border-sand/70 pb-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-body text-xs font-medium uppercase tracking-widest text-rose">
                  Шаг 1
                </p>
                <h3 className="font-display text-2xl sm:text-3xl font-light text-espresso">
                  Услуга
                </h3>
              </div>
              <span className="rounded-full bg-blush/20 px-4 py-2 font-body text-xs text-mink">
                {selectedService.duration}
              </span>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {BOOKING_SERVICES.map((service) => (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => {
                    setServiceId(service.id);
                    setSubmitState({ status: "idle" });
                  }}
                  className={`min-h-[100px] sm:min-h-[116px] rounded-3xl border p-4 sm:p-5 text-left transition-all ${
                    serviceId === service.id
                      ? "border-rose bg-blush/20 shadow-sm"
                      : "border-sand bg-cream/70 hover:border-rose/70"
                  }`}
                >
                  <span className="font-body text-xs font-medium uppercase tracking-widest text-rose">
                    {service.price}
                  </span>
                  <span className="mt-2 block font-body text-sm font-semibold text-espresso">
                    {service.title}
                  </span>
                  <span className="mt-1 block font-body text-[11px] font-medium uppercase tracking-widest text-mink/70">
                    {service.duration}
                  </span>
                  <span className="mt-2 block font-body text-xs leading-relaxed text-mink">
                    {service.note}
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-9 flex items-center gap-3">
              <CalendarDays className="h-5 w-5 text-rose" />
              <div>
                <p className="font-body text-xs font-medium uppercase tracking-widest text-rose">
                  Шаг 2
                </p>
                <h3 className="font-display text-2xl sm:text-3xl font-light text-espresso">
                  Дата
                </h3>
              </div>
            </div>

            {slotsLoading ? (
              <div className="mt-6 flex min-h-48 items-center justify-center rounded-4xl bg-cream">
                <Loader2 className="h-6 w-6 animate-spin text-rose" />
              </div>
            ) : (
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-7">
                {availableDays.slice(0, 28).map((day) => (
                  <button
                    key={day.date}
                    type="button"
                    onClick={() => selectDate(day)}
                    className={`min-h-[88px] sm:min-h-[104px] rounded-3xl border p-2 sm:p-3 text-center transition-all ${
                      selectedDate === day.date
                        ? "border-espresso bg-espresso text-cream"
                        : "border-sand bg-cream hover:border-rose hover:bg-blush/20"
                    }`}
                  >
                    <span className="block font-body text-xs uppercase text-current/60">
                      {day.weekday}
                    </span>
                    <span className="mt-1 block font-display text-2xl sm:text-3xl font-semibold">
                      {day.dayNumber}
                    </span>
                    <span className="block font-body text-xs text-current/60">{day.month}</span>
                    <span className="mt-2 block font-body text-[11px] text-current/60">
                      {day.availableCount} слота
                    </span>
                  </button>
                ))}
              </div>
            )}

            <div className="mt-9 flex items-center gap-3">
              <Clock className="h-5 w-5 text-rose" />
              <div>
                <p className="font-body text-xs font-medium uppercase tracking-widest text-rose">
                  Шаг 3
                </p>
                <h3 className="font-display text-2xl sm:text-3xl font-light text-espresso">
                  Время
                </h3>
              </div>
            </div>
            {longServiceSelected && (
              <p className="mt-3 rounded-3xl bg-blush/15 px-4 py-3 font-body text-xs leading-relaxed text-mink">
                Для наращивания и коррекции последний старт — 18:00, чтобы спокойно успеть
                выполнить процедуру.
              </p>
            )}

            <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3">
              {(selectedDay?.slots ?? []).map((slot) => {
                const fakeBooked = isFakeBooked(slot.date, slot.time);
                if (fakeBooked) {
                  return (
                    <div
                      key={`${slot.date}-${slot.time}`}
                      className="rounded-3xl border border-sand/40 bg-cream/40 p-4 opacity-50 cursor-not-allowed select-none"
                      title="Это время уже занято"
                    >
                      <span className="block font-display text-xl sm:text-2xl font-semibold text-mink line-through">{slot.time}</span>
                      <span className="mt-1 flex items-center gap-1 font-body text-xs text-mink/50">
                        <MapPin size={12} />
                        Занято
                      </span>
                    </div>
                  );
                }
                return (
                  <button
                    key={`${slot.date}-${slot.time}`}
                    type="button"
                    onClick={() => {
                      setSelectedTime(slot.time);
                      setSubmitState({ status: "idle" });
                    }}
                    className={`rounded-3xl border p-4 text-left transition-all ${
                      selectedTime === slot.time
                        ? "border-rose bg-rose text-cream"
                        : "border-sand bg-cream hover:border-rose"
                    }`}
                  >
                    <span className="block font-display text-xl sm:text-2xl font-semibold">{slot.time}</span>
                    <span className="mt-1 flex items-center gap-1 font-body text-xs text-current/70">
                      <MapPin size={12} />
                      {slot.city}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-9 grid grid-cols-1 gap-4 md:grid-cols-2">
              <label className="block">
                <span className="mb-2 block font-body text-xs font-medium uppercase tracking-widest text-mink">
                  Имя
                </span>
                <input
                  required
                  value={form.name}
                  onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                  className="w-full rounded-2xl border border-sand bg-cream px-4 py-3 font-body text-sm text-espresso outline-none transition focus:border-rose"
                  placeholder="Анна"
                />
              </label>
              <label className="block">
                <span className="mb-2 block font-body text-xs font-medium uppercase tracking-widest text-mink">
                  Телефон
                </span>
                <input
                  value={form.phone}
                  onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
                  className="w-full rounded-2xl border border-sand bg-cream px-4 py-3 font-body text-sm text-espresso outline-none transition focus:border-rose"
                  placeholder="+375 ..."
                />
              </label>
              <label className="block md:col-span-2">
                <span className="mb-2 block font-body text-xs font-medium uppercase tracking-widest text-mink">
                  Telegram
                </span>
                <input
                  value={form.telegram}
                  onChange={(event) => setForm((prev) => ({ ...prev, telegram: event.target.value }))}
                  className="w-full rounded-2xl border border-sand bg-cream px-4 py-3 font-body text-sm text-espresso outline-none transition focus:border-rose"
                  placeholder="@username"
                />
              </label>
              <p className="-mt-2 font-body text-xs leading-relaxed text-mink md:col-span-2">
                Укажите телефон или Telegram — достаточно одного контакта для подтверждения записи.
              </p>
              {needsPreferredContact && (
                <fieldset className="md:col-span-2">
                  <legend className="mb-3 block font-body text-xs font-medium uppercase tracking-widest text-mink">
                    Как лучше связаться
                  </legend>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {contactOptions.map((option) => {
                      const checked = form.preferredContact === option.value;

                      return (
                        <label
                          key={option.value}
                          className={`flex cursor-pointer gap-3 rounded-3xl border p-4 transition-all ${
                            checked
                              ? "border-rose bg-blush/20"
                              : "border-sand bg-cream hover:border-rose/70"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() =>
                              setForm((prev) => ({ ...prev, preferredContact: option.value }))
                            }
                            className="mt-1 h-4 w-4 accent-rose"
                          />
                          <span>
                            <span className="block font-body text-sm font-semibold text-espresso">
                              {option.label}
                            </span>
                            <span className="mt-1 block font-body text-xs leading-relaxed text-mink">
                              {option.hint}
                            </span>
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </fieldset>
              )}
              <label className="block md:col-span-2">
                <span className="mb-2 block font-body text-xs font-medium uppercase tracking-widest text-mink">
                  Комментарий
                </span>
                <textarea
                  value={form.comment}
                  onChange={(event) => setForm((prev) => ({ ...prev, comment: event.target.value }))}
                  className="min-h-28 w-full rounded-2xl border border-sand bg-cream px-4 py-3 font-body text-sm text-espresso outline-none transition focus:border-rose"
                  placeholder="Например: хочу загущение без сильного удлинения"
                />
              </label>
              <label className="flex gap-3 rounded-3xl border border-sand bg-cream/80 p-4 md:col-span-2">
                <input
                  type="checkbox"
                  checked={form.privacyAccepted}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, privacyAccepted: event.target.checked }))
                  }
                  className="mt-1 h-4 w-4 shrink-0 accent-rose"
                />
                <span className="font-body text-xs leading-relaxed text-mink">
                  <span className="block font-semibold text-espresso">
                    Согласие на обработку персональных данных
                  </span>
                  Согласна на обработку и хранение моих персональных данных по Закону Республики
                  Беларусь от 07.05.2021 N 99-З "О защите персональных данных" для записи, связи
                  по заявке и переноса времени при необходимости.
                </span>
              </label>
            </div>

            <div className="mt-6 rounded-4xl bg-cream p-5">
              <p className="font-body text-xs font-medium uppercase tracking-widest text-mink">
                Вы выбрали
              </p>
              <p className="mt-2 font-body text-sm text-espresso">
                {selectedService.title}
                {selectedSlot ? ` · ${selectedSlot.date} · ${selectedSlot.time} · ${selectedSlot.city}` : ""}
              </p>
            </div>

            <AnimatePresence mode="wait">
              {submitState.status === "success" && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-5 rounded-4xl border border-sage/30 bg-sage/15 p-5"
                >
                  <p className="font-body font-semibold text-espresso">
                    ✓ Заявка отправлена!
                  </p>
                  <p className="mt-2 font-body text-sm leading-relaxed text-mink">
                    Анна скоро свяжется с вами{" "}
                    {submitState.preferredContact === "telegram"
                      ? "в Telegram"
                      : "по телефону"}{" "}
                    и подтвердит запись. Обычно это занимает не более нескольких часов.
                  </p>
                  <p className="mt-1 font-body text-xs text-mink/60">
                    Номер заявки: {submitState.requestId}
                  </p>
                  <p className="mt-3 font-display text-lg italic text-rose">
                    &ldquo;{submitState.quote}&rdquo;
                  </p>
                </motion.div>
              )}

              {submitState.status === "error" && (
                <motion.p
                  key="error"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mt-5 rounded-3xl bg-rose/10 p-4 font-body text-sm text-espresso"
                >
                  {submitState.message}
                </motion.p>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={submitState.status === "loading" || slotsLoading}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-espresso px-8 py-4 font-body font-medium text-cream transition-all hover:bg-rose disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitState.status === "loading" ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Отправляю
                </>
              ) : (
                <>
                  Отправить заявку
                  <Send size={16} />
                </>
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
