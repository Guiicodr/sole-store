const store = new Map();

export function rateLimit({ windowMs = 60000, maxAttempts = 10 } = {}) {
  return (req, res, next) => {
    const key = req.ip + ":" + (req.body?.email || "");
    const now = Date.now();

    if (!store.has(key)) {
      store.set(key, { count: 1, resetAt: now + windowMs });
      next();
      return;
    }

    const entry = store.get(key);

    if (now > entry.resetAt) {
      store.set(key, { count: 1, resetAt: now + windowMs });
      next();
      return;
    }

    entry.count += 1;

    if (entry.count > maxAttempts) {
      return res.status(429).json({
        error: "Too many attempts. Please try again later.",
      });
    }

    next();
  };
}

// Periodically clean up expired entries (every 5 minutes)
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of store) {
    if (now > entry.resetAt) {
      store.delete(key);
    }
  }
}, 5 * 60 * 1000);