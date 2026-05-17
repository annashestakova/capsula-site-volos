import type { BookingRequest, BookingStatus } from "@/lib/booking";
import { createSlotKey } from "@/lib/booking";

const REQUESTS_KEY = "volos-capsula:booking-requests";
const CONFIRMED_SLOTS_KEY = "volos-capsula:confirmed-slots";

type MemoryBookingStore = {
  requests: Map<string, BookingRequest>;
  confirmedSlots: Set<string>;
};

declare global {
  // eslint-disable-next-line no-var
  var __volosBookingStore: MemoryBookingStore | undefined;
}

type RedisResult<T> = {
  result?: T;
  error?: string;
};

function getRedisConfig() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    return null;
  }

  return { url, token };
}

function getMemoryStore() {
  globalThis.__volosBookingStore ??= {
    requests: new Map<string, BookingRequest>(),
    confirmedSlots: new Set<string>(),
  };

  return globalThis.__volosBookingStore;
}

async function redisCommand<T>(command: Array<string | number>) {
  const config = getRedisConfig();

  if (!config) {
    return null;
  }

  const response = await fetch(config.url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Redis request failed: ${response.status}`);
  }

  const data = (await response.json()) as RedisResult<T>;
  if (data.error) {
    throw new Error(data.error);
  }

  return data.result ?? null;
}

export function getBookingStorageMode() {
  return getRedisConfig() ? "kv" : "memory";
}

export async function saveBookingRequest(request: BookingRequest) {
  const stored = JSON.stringify(request);

  if (getRedisConfig()) {
    await redisCommand<number>(["HSET", REQUESTS_KEY, request.id, stored]);
    return;
  }

  getMemoryStore().requests.set(request.id, request);
}

export async function getBookingRequest(id: string) {
  if (getRedisConfig()) {
    const stored = await redisCommand<string>(["HGET", REQUESTS_KEY, id]);
    return stored ? (JSON.parse(stored) as BookingRequest) : null;
  }

  return getMemoryStore().requests.get(id) ?? null;
}

export async function updateBookingStatus(
  id: string,
  status: BookingStatus,
  adminNote?: string,
) {
  const request = await getBookingRequest(id);

  if (!request) {
    return null;
  }

  const updated: BookingRequest = {
    ...request,
    status,
    adminNote,
    updatedAt: new Date().toISOString(),
  };

  await saveBookingRequest(updated);
  return updated;
}

export async function confirmBookingRequest(id: string) {
  const updated = await updateBookingStatus(id, "confirmed");

  if (!updated) {
    return null;
  }

  const slotKey = createSlotKey(updated.date, updated.time);

  if (getRedisConfig()) {
    await redisCommand<number>(["SADD", CONFIRMED_SLOTS_KEY, slotKey]);
  } else {
    getMemoryStore().confirmedSlots.add(slotKey);
  }

  return updated;
}

export async function getConfirmedSlotKeys() {
  if (getRedisConfig()) {
    const stored = await redisCommand<string[]>(["SMEMBERS", CONFIRMED_SLOTS_KEY]);
    return new Set(stored ?? []);
  }

  return new Set(getMemoryStore().confirmedSlots);
}
