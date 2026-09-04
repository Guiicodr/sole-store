export function errorHandler(err, _req, res, _next) {
  console.error("Server error:", err);

  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ error: "Invalid JSON body" });
  }

  if (err.type === "entity.too.large") {
    return res.status(413).json({ error: "Request body too large" });
  }

  const status = err.status || 500;
  const message =
    status === 500 ? "Internal server error" : err.message || "Internal server error";

  res.status(status).json({ error: message });
}

export function notFound(_req, res) {
  res.status(404).json({ error: "Route not found" });
}