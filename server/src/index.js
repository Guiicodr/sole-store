import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

import { initDatabase, saveDatabase } from "./database.js";
import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/products.js";
import orderRoutes from "./routes/orders.js";
import { errorHandler, notFound } from "./middleware/error.js";
import { rateLimit } from "./middleware/rateLimit.js";

// Load .env from server directory
const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: resolve(__dirname, "..", ".env") });

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use((_req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), interest-cohort=()"
  );
  next();
});

// CORS
const corsOrigin = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",")
  : ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175"];

app.use(
  cors({
    origin: corsOrigin,
    credentials: true,
  })
);

// Body parser with size limit
app.use(express.json({ limit: "16kb" }));

// Rate limiting (apply to auth routes)
app.use("/auth/login", rateLimit({ windowMs: 15 * 60 * 1000, maxAttempts: 5 }));
app.use("/auth/register", rateLimit({ windowMs: 60 * 60 * 1000, maxAttempts: 10 }));

// Routes
app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

// Health check
app.get("/", (_req, res) => {
  res.json({ status: "ok", service: "sole-store-api" });
});

// Error handling
app.use(notFound);
app.use(errorHandler);

// Initialize database and start server
initDatabase()
  .then(() => {
    const server = app.listen(PORT, () => {
      console.log(`🚀 Sole Store API running on http://localhost:${PORT}`);
    });

    // Graceful shutdown
    const shutdown = () => {
      console.log("\n🛑 Shutting down gracefully...");
      server.close(() => {
        saveDatabase();
        console.log("💾 Database saved. Goodbye!");
        process.exit(0);
      });
    };
    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
  })
  .catch((err) => {
    console.error("❌ Failed to initialize database:", err);
    process.exit(1);
  });