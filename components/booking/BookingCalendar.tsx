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
  { value: "telegram", label: "Написать в Telegram", hint: "Удобно для быстрых уточнений и переноса записи." },
  { value: "phone",    label: "Позвонить по телефону", hint: "Подойдёт, если проще обсудить детали голосом." },
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
    const t = setInterval(() => setQuoteIndex((i) => (i + 1) % BEAUTY_QUOTES.length), 6000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function loadSlots() {
      setSlotsLoading(true);
      const res = await fetch("/api/booking/slots", { cache: "no-store" });
      const data = (await res.json()) as SlotsResponse;
      if (cancelled) return;
      setDays(data.days);
      setSlotsLoading(false);
      const first = data.days.find((d) => d.slots.length > 0);
      if (first) { setSelectedDate(first.date); setSelectedTime(first.slots[0]?.time ?? ""); }
    }
    loadSlots().catch(() => { if (!cancelled) { setSlotsLoading(false); setSubmitState({ status: "error", message: "Не удалось загрузить слоты. Обновите страницу." }); } });
    return () => { cancelled = true; };
  }, []);

  const selectedService = useMemo(() => BOOKING_SERVICES.find((s) => s.id === serviceId) ?? BOOKING_SERVICES[0], [serviceId]);

  const availableDays = useMemo(() =>
    days.map((day) => {
      const slots = day.slots.filter((slot) => isSlotAllowedForService(serviceId, slot.time));
      return { ...day, slots, availableCount: slots.length };
    }).filter((day) => day.slots.length > 0),
    [days, serviceId]
  );

  const selectedDay  = useMemo(() => availableDays.find((d) => d.date === selectedDate), [availableDays, selectedDate]);
  const selectedSlot = useMemo<BookingSlot | undefined>(() => selectedDay?.slots.find((s) => s.time === selectedTime), [selectedDay, selectedTime]);

  const hasPhone = form.phone.trim().length > 0;
  const hasTelegram = form.telegram.trim().length > 0;
  const needsPreferredContact = hasPhone && hasTelegram;
  const longServiceSelected = isLongBookingService(serviceId);

  useEffect(() => {
    if (slotsLoading || availableDays.length === 0) return;
    const cur = availableDays.find((d) => d.date === selectedDate);
    if (!cur) { const f = availableDays[0]; setSelectedDate(f.date); setSelectedTime(f.slots[0]?.time ?? ""); return; }
    if (!cur.slots.some((s) => s.time === selectedTime)) setSelectedTime(cur.slots[0]?.time ?? "");
  }, [availableDays, selectedDate, selectedTime, slotsLoading]);

  function selectDate(day: BookingDay) { setSelectedDate(day.date); setSelectedTime(day.slots[0]?.time ?? ""); setSubmitState({ status: "idle" }); }
  function getPreferredContact(): ContactPreference {
    if (needsPreferredContact && form.preferredContact) return form.preferredContact;
    return hasTelegram ? "telegram" : "phone";
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!selectedSlot) { setSubmitState({ status: "error", message: "Выберите свободное время." }); return; }
    if (!hasPhone && !hasTelegram) { setSubmitState({ status: "error", message: "Укажите телефон или Telegram." }); return; }
    if (needsPreferredContact && !form.preferredContact) { setSubmitState({ status: "error", message: "Выберите удобный способ связи." }); return; }
    if (!isSlotAllowedForService(serviceId, selectedSlot.time)) { setSubmitState({ status: "error", message: "Для наращивания и коррекции последний старт — не позже 18:00." }); return; }
    if (!form.privacyAccepted) { setSubmitState({ status: "error", message: "Подтвердите согласие на обработку данных." }); return; }
    setSubmitState({ status: "loading" });
    const res = await fetch("/api/booking", { method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ serviceId, date: selectedSlot.date, time: selectedSlot.time, city: selectedSlot.city, ...form, preferredContact: getPreferredContact() }) });
    const data = (await res.json()) as { ok: boolean; message?: string; requestId?: string; quote?: string; telegram?: { configured: boolean; ok: boolean } };
    if (!res.ok || !data.ok || !data.requestId || !data.quote) { setSubmitState({ status: "error", message: data.message ?? "Не удалось отправить заявку." }); return; }
    setSubmitState({ status: "success", requestId: data.requestId, quote: data.quote, telegramConfigured: Boolean(data.telegram?.configured), preferredContact: getPreferredContact() });
    setForm(emptyForm);
    if (typeof window !== "undefined" && (window as any).gtag) (window as any).gtag("event", "conversion", { send_to: "AW-CONVERSION_ID/CONVERSION_LABEL" });
  }

  return (
    <section className="py-14 sm:py-20" style={{ background: "linear-gradient(180deg,#fdf8fb 0%,#fef5f9 100%)" }}>
      <div className="container-site">
        <div className="grid grid-cols-1 xl:grid-cols-[0.75fr_1.25fr] gap-8 items-start">

          {/* ── Left: soft pink info panel ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-[2rem] border border-pink-100 p-6 md:p-8"
            style={{ background: "linear-gradient(145deg,#fdf2f8 0%,#fce7f3 60%,#fdf4fb 100%)" }}
          >
            {/* Girl lottie decorative */}
            <div className="relative h-52 sm:h-60 mb-6 flex items-end justify-center">
              <LottiePlayer
                src="/lottie/fashionable-girl-red-dress.json"
                className="h-full w-auto"
                ariaLabel="девушка"
                speed={0.8}
              />
              {/* Ground line */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-px bg-gradient-to-r from-transparent via-pink-300/60 to-transparent" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-2 rounded-full bg-pink-200/30 blur-md" />
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-pink-200/60 bg-white/70 px-3 py-1.5 text-xs text-rose mb-4">
              <Sparkles size={12} />
              Живая запись
            </div>

            <h2 className="font-display text-3xl sm:text-4xl font-light text-espresso leading-tight mb-3">
              Выберите<br />
              <em className="italic text-rose">свой слот</em>
            </h2>
            <p className="font-body text-sm leading-relaxed text-mink/70 mb-6">
              Выберите услугу, удобное время и оставьте контакт. Анна подтвердит запись лично.
            </p>

            <div className="grid gap-2 mb-6">
              {[
                "Свободные часы показаны сразу в календаре",
                "Анна предложит ближайший вариант, если нужно",
                "Слот закрепляется после подтверждения",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2.5 rounded-2xl bg-white/60 p-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-rose" />
                  <span className="font-body text-xs text-mink/80">{item}</span>
                </div>
              ))}
            </div>

            {quoteMounted && (
              <div className="border-t border-pink-200/50 pt-4">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={quoteIndex}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.4 }}
                    className="font-display text-sm italic leading-relaxed text-rose/70"
                  >
                    &ldquo;{BEAUTY_QUOTES[quoteIndex]}&rdquo;
                  </motion.p>
                </AnimatePresence>
              </div>
            )}
          </motion.div>

          {/* ── Right: compact form ── */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-[2rem] border border-pink-100/80 bg-white/80 p-5 shadow-sm backdrop-blur md:p-7"
          >
            {/* STEP 1 — Service */}
            <StepLabel n="1" title="Услуга" extra={
              <span className="rounded-full bg-pink-50 border border-pink-100 px-3 py-1 font-body text-xs text-mink">
                {selectedService.duration}
              </span>
            } />

            <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {BOOKING_SERVICES.map((service) => (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => { setServiceId(service.id); setSubmitState({ status: "idle" }); }}
                  className={`rounded-2xl border p-3 sm:p-4 text-left transition-all ${
                    serviceId === service.id
                      ? "border-rose bg-rose/5 shadow-sm"
                      : "border-pink-100 bg-pink-50/50 hover:border-rose/50"
                  }`}
                >
                  <span className="font-body text-xs font-semibold text-rose">{service.price}</span>
                  <span className="mt-1 block font-body text-sm font-semibold text-espresso">{service.title}</span>
                  <span className="mt-0.5 block font-body text-[11px] text-mink/60 uppercase tracking-wide">{service.duration}</span>
                  <span className="mt-1 block font-body text-xs leading-snug text-mink/70">{service.note}</span>
                </button>
              ))}
            </div>

            {/* STEP 2 — Date */}
            <div className="mt-7 flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-rose" />
              <StepLabel n="2" title="Дата" />
            </div>

            {slotsLoading ? (
              <div className="mt-4 flex min-h-32 items-center justify-center rounded-2xl bg-pink-50">
                <Loader2 className="h-5 w-5 animate-spin text-rose" />
              </div>
            ) : (
              <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-7">
                {availableDays.slice(0, 14).map((day) => (
                  <button
                    key={day.date}
                    type="button"
                    onClick={() => selectDate(day)}
                    className={`rounded-2xl border p-2 text-center transition-all ${
                      selectedDate === day.date
                        ? "border-rose bg-rose text-white shadow-sm"
                        : "border-pink-100 bg-pink-50/60 hover:border-rose/60 hover:bg-rose/5"
                    }`}
                  >
                    <span className="block font-body text-[10px] uppercase opacity-70">{day.weekday}</span>
                    <span className="mt-0.5 block font-display text-xl font-semibold">{day.dayNumber}</span>
                    <span className="block font-body text-[10px] opacity-60">{day.month}</span>
                    <span className="mt-1 block font-body text-[10px] opacity-60">{day.availableCount} сл.</span>
                  </button>
                ))}
              </div>
            )}

            {/* STEP 3 — Time */}
            <div className="mt-7 flex items-center gap-2">
              <Clock className="h-4 w-4 text-rose" />
              <StepLabel n="3" title="Время" />
            </div>

            {longServiceSelected && (
              <p className="mt-2 rounded-2xl bg-pink-50 border border-pink-100 px-3 py-2 font-body text-xs text-mink/70">
                Для наращивания и коррекции — последний старт в 18:00.
              </p>
            )}

            <div className="mt-4 grid grid-cols-3 gap-2 md:grid-cols-4">
              {(selectedDay?.slots ?? []).map((slot) => {
                const fakeBooked = isFakeBooked(slot.date, slot.time);
                if (fakeBooked) return (
                  <div key={`${slot.date}-${slot.time}`}
                    className="rounded-2xl border border-pink-100/40 bg-pink-50/30 p-3 opacity-40 cursor-not-allowed"
                  >
                    <span className="block font-display text-lg font-semibold text-mink line-through">{slot.time}</span>
                    <span className="font-body text-[10px] text-mink/50">Занято</span>
                  </div>
                );
                return (
                  <button
                    key={`${slot.date}-${slot.time}`}
                    type="button"
                    onClick={() => { setSelectedTime(slot.time); setSubmitState({ status: "idle" }); }}
                    className={`rounded-2xl border p-3 text-left transition-all ${
                      selectedTime === slot.time
                        ? "border-rose bg-rose text-white shadow-sm"
                        : "border-pink-100 bg-pink-50/60 hover:border-rose/60"
                    }`}
                  >
                    <span className="block font-display text-lg font-semibold">{slot.time}</span>
                    <span className="mt-0.5 flex items-center gap-1 font-body text-[10px] opacity-70">
                      <MapPin size={10} />{slot.city}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Contact fields */}
            <div className="mt-7 grid grid-cols-1 gap-3 md:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block font-body text-[11px] font-medium uppercase tracking-widest text-mink/70">Имя</span>
                <input required value={form.name}
                  onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                  className="w-full rounded-xl border border-pink-100 bg-pink-50/40 px-4 py-2.5 font-body text-sm text-espresso outline-none transition focus:border-rose focus:bg-white"
                  placeholder="Анна" />
              </label>
              <label className="block">
                <span className="mb-1.5 block font-body text-[11px] font-medium uppercase tracking-widest text-mink/70">Телефон</span>
                <input value={form.phone}
                  onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                  className="w-full rounded-xl border border-pink-100 bg-pink-50/40 px-4 py-2.5 font-body text-sm text-espresso outline-none transition focus:border-rose focus:bg-white"
                  placeholder="+375 ..." />
              </label>
              <label className="block md:col-span-2">
                <span className="mb-1.5 block font-body text-[11px] font-medium uppercase tracking-widest text-mink/70">Telegram</span>
                <input value={form.telegram}
                  onChange={(e) => setForm((p) => ({ ...p, telegram: e.target.value }))}
                  className="w-full rounded-xl border border-pink-100 bg-pink-50/40 px-4 py-2.5 font-body text-sm text-espresso outline-none transition focus:border-rose focus:bg-white"
                  placeholder="@username" />
              </label>
              <p className="-mt-1 font-body text-xs text-mink/50 md:col-span-2">
                Достаточно одного контакта.
              </p>

              {needsPreferredContact && (
                <fieldset className="md:col-span-2">
                  <legend className="mb-2 block font-body text-[11px] font-medium uppercase tracking-widest text-mink/70">Как лучше связаться</legend>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {contactOptions.map((opt) => {
                      const checked = form.preferredContact === opt.value;
                      return (
                        <label key={opt.value}
                          className={`flex cursor-pointer gap-3 rounded-2xl border p-3 transition-all ${checked ? "border-rose bg-rose/5" : "border-pink-100 bg-pink-50/50 hover:border-rose/50"}`}>
                          <input type="checkbox" checked={checked}
                            onChange={() => setForm((p) => ({ ...p, preferredContact: opt.value }))}
                            className="mt-0.5 h-4 w-4 accent-rose" />
                          <span>
                            <span className="block font-body text-sm font-semibold text-espresso">{opt.label}</span>
                            <span className="mt-0.5 block font-body text-xs text-mink/60">{opt.hint}</span>
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </fieldset>
              )}

              <label className="block md:col-span-2">
                <span className="mb-1.5 block font-body text-[11px] font-medium uppercase tracking-widest text-mink/70">Комментарий</span>
                <textarea value={form.comment}
                  onChange={(e) => setForm((p) => ({ ...p, comment: e.target.value }))}
                  className="min-h-20 w-full rounded-xl border border-pink-100 bg-pink-50/40 px-4 py-2.5 font-body text-sm text-espresso outline-none transition focus:border-rose focus:bg-white"
                  placeholder="Например: хочу загущение без удлинения" />
              </label>

              <label className="flex gap-3 rounded-2xl border border-pink-100 bg-pink-50/40 p-3 md:col-span-2">
                <input type="checkbox" checked={form.privacyAccepted}
                  onChange={(e) => setForm((p) => ({ ...p, privacyAccepted: e.target.checked }))}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-rose" />
                <span className="font-body text-xs leading-relaxed text-mink/70">
                  <span className="block font-semibold text-espresso mb-0.5">Согласие на обработку данных</span>
                  Согласна на обработку персональных данных по Закону РБ от 07.05.2021 N 99-З для записи и связи по заявке.
                </span>
              </label>
            </div>

            {/* Summary */}
            <div className="mt-5 rounded-2xl bg-pink-50/60 border border-pink-100 p-4">
              <p className="font-body text-[11px] font-medium uppercase tracking-widest text-mink/60">Вы выбрали</p>
              <p className="mt-1 font-body text-sm text-espresso">
                {selectedService.title}
                {selectedSlot ? ` · ${selectedSlot.date} · ${selectedSlot.time} · ${selectedSlot.city}` : ""}
              </p>
            </div>

            <AnimatePresence mode="wait">
              {submitState.status === "success" && (
                <motion.div key="ok" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="mt-4 rounded-2xl border border-rose/20 bg-rose/5 p-4">
                  <p className="font-body font-semibold text-espresso">✓ Заявка отправлена!</p>
                  <p className="mt-1 font-body text-sm text-mink">
                    Анна скоро свяжется {submitState.preferredContact === "telegram" ? "в Telegram" : "по телефону"} и подтвердит запись.
                  </p>
                  <p className="mt-1 font-body text-xs text-mink/50">№ {submitState.requestId}</p>
                  <p className="mt-2 font-display text-base italic text-rose">&ldquo;{submitState.quote}&rdquo;</p>
                </motion.div>
              )}
              {submitState.status === "error" && (
                <motion.p key="err" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="mt-4 rounded-2xl bg-rose/8 p-3 font-body text-sm text-espresso border border-rose/20">
                  {submitState.message}
                </motion.p>
              )}
            </AnimatePresence>

            <button type="submit"
              disabled={submitState.status === "loading" || slotsLoading}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-rose px-8 py-3.5 font-body font-medium text-white transition-all hover:bg-pink-500 disabled:cursor-not-allowed disabled:opacity-60 shadow-[0_8px_24px_rgba(236,72,153,0.25)]"
            >
              {submitState.status === "loading"
                ? <><Loader2 className="h-4 w-4 animate-spin" />Отправляю…</>
                : <><Send size={14} />Отправить заявку</>}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function StepLabel({ n, title, extra }: { n: string; title: string; extra?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between w-full">
      <div>
        <p className="font-body text-[10px] font-medium uppercase tracking-widest text-rose">Шаг {n}</p>
        <h3 className="font-display text-xl sm:text-2xl font-light text-espresso">{title}</h3>
      </div>
      {extra}
    </div>
  );
}
