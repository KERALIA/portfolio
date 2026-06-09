const store = new Map<string, { count: number; windowStart: number }>();

export function checkRateLimit(
  key: string,
  limit = 5,
  windowMs = 60_000
): { allowed: boolean; remaining: number; resetIn: number } {
  const now = Date.now();
  const entry = store.get(key) ?? { count: 0, windowStart: now };

  if (now - entry.windowStart > windowMs) {
    entry.count = 0;
    entry.windowStart = now;
  }

  entry.count++;
  store.set(key, entry);

  const remaining = Math.max(0, limit - entry.count);
  const resetIn = Math.ceil((entry.windowStart + windowMs - now) / 1000);

  return { allowed: entry.count <= limit, remaining, resetIn };
}
