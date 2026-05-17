export type BookingCity = "Брест";
export type ContactPreference = "phone" | "telegram";

export type BookingService = {
  id: string;
  title: string;
  duration: string;
  price: string;
  note: string;
};

export type BookingSlot = {
  date: string;
  time: string;
  city: BookingCity;
};

export type BookingDay = {
  date: string;
  weekday: string;
  dayNumber: string;
  month: string;
  slots: BookingSlot[];
  availableCount: number;
};

export type BookingStatus =
  | "pending"
  | "confirmed"
  | "reschedule_requested"
  | "cancelled";

export type BookingRequest = {
  id: string;
  serviceId: string;
  serviceTitle: string;
  date: string;
  time: string;
  city: BookingCity;
  name: string;
  phone: string;
  telegram: string;
  preferredContact: ContactPreference;
  privacyAccepted: boolean;
  comment?: string;
  status: BookingStatus;
  createdAt: string;
  updatedAt?: string;
  adminNote?: string;
};

export const BOOKING_SERVICES: BookingService[] = [
  {
    id: "consultation",
    title: "Консультация и диагностика",
    duration: "30-40 минут",
    price: "19 BYN",
    note: "Разбор волос, подбор метода и предварительный расчёт.",
  },
  {
    id: "capsule",
    title: "Капсульное наращивание",
    duration: "3.5-5 часов",
    price: "от 350 BYN",
    note: "Натуральный славянский волос, подбор оттенка и объёма.",
  },
  {
    id: "bioprotein",
    title: "Биопротеиновое наращивание",
    duration: "2-4 часа",
    price: "350-400 BYN",
    note: "Мягкий гипоаллергенный состав, волосы включены.",
  },
  {
    id: "correction",
    title: "Коррекция",
    duration: "3.5-5 часов",
    price: "от 160 BYN",
    note: "Перекапсуляция и перенос капсул ближе к корням.",
  },
  {
    id: "removal",
    title: "Снятие",
    duration: "1-2 часа",
    price: "от 50 BYN",
    note: "Аккуратное снятие без повреждения своих волос.",
  },
];

export const BEAUTY_QUOTES = [
  "Красота начинается там, где вы выбираете себя.",
  "Пусть новая длина станет лёгким поводом чаще улыбаться.",
  "Красивые волосы не меняют вас, они подчёркивают вашу уверенность.",
  "Сегодня можно стать ближе к образу, который давно хотелось примерить.",
  "Нежность к себе всегда заметна с первого взгляда.",
  "Волосы — это корона, которую вы носите каждый день.",
  "Позаботиться о себе — самый смелый поступок.",
  "Когда волосы на высоте, всё остальное тоже встаёт на место.",
  "Каждая прядь — это маленький выбор в пользу себя.",
  "Настоящая роскошь — чувствовать себя красивой просто потому что.",
  "Ухоженные волосы — это не тщеславие, это уважение к себе.",
  "Лучший аксессуар — это уверенность. А хорошие волосы её только усиливают.",
  "Вы заслуживаете отражения, которое вас радует.",
  "Иногда новый образ — это самый короткий путь к новому настроению.",
  "Мягкость и сила — именно так выглядит настоящая красота.",
];

export function createSlotKey(date: string, time: string) {
  return `${date}T${time}`;
}

export function createBookingId() {
  const stamp = Date.now().toString(36);
  const random = Math.random().toString(36).slice(2, 8);
  return `vc_${stamp}_${random}`;
}

export function getBookingService(serviceId: string) {
  return BOOKING_SERVICES.find((service) => service.id === serviceId);
}

export function isLongBookingService(serviceId: string) {
  return serviceId === "capsule" || serviceId === "correction";
}

export function parseBookingTime(time: string) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

export function getLastStartMinutesForService(serviceId: string) {
  return isLongBookingService(serviceId) ? 18 * 60 : 23 * 60;
}

export function isSlotAllowedForService(serviceId: string, time: string) {
  return parseBookingTime(time) <= getLastStartMinutesForService(serviceId);
}

export function getBeautyQuote(seed: string) {
  const total = Array.from(seed).reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return BEAUTY_QUOTES[total % BEAUTY_QUOTES.length];
}

export function buildBookingDays(
  confirmedSlotKeys: Set<string>,
  totalDays = 45,
  fromDate = new Date(),
): BookingDay[] {
  return Array.from({ length: totalDays }, (_, index) => {
    const date = new Date(fromDate);
    date.setHours(12, 0, 0, 0);
    date.setDate(date.getDate() + index);

    const isoDate = formatDateIso(date);
    const slots = getBaseSlotsForDate(date)
      .filter((slot) => !confirmedSlotKeys.has(createSlotKey(slot.date, slot.time)));

    return {
      date: isoDate,
      weekday: new Intl.DateTimeFormat("ru-RU", { weekday: "short" }).format(date),
      dayNumber: new Intl.DateTimeFormat("ru-RU", { day: "2-digit" }).format(date),
      month: new Intl.DateTimeFormat("ru-RU", { month: "short" }).format(date).replace(".", ""),
      slots,
      availableCount: slots.length,
    };
  }).filter((day) => day.slots.length > 0);
}

function getBaseSlotsForDate(date: Date): BookingSlot[] {
  const weekday = date.getDay();
  const isoDate = formatDateIso(date);
  const isWeekend = weekday === 0 || weekday === 6;
  const startMinutes = isWeekend ? 13 * 60 + 30 : 17 * 60 + 50;
  const endMinutes = 23 * 60;
  const times: string[] = [];

  for (let minutes = startMinutes; minutes <= endMinutes; minutes += 30) {
    times.push(formatTime(minutes));
  }

  return times.map((time) => ({ date: isoDate, time, city: "Брест" }));
}

function formatTime(totalMinutes: number) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

function formatDateIso(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
