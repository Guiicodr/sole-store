export function errorHandler(err, _req, res, _next) {
  console.error("Server error:", err);

  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ error: "Invalid JSON body" });
  }

  const status = err.status || 500;
  const message = err.message || "Internal server error";

  res.status(status).json({ error: message });
}

export function notFound(_req, res) {
  res.status(404).json({ error: "Route not found" });
}