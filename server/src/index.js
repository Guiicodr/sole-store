import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

import { initDatabase } from "./database.js";
import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/products.js";
import orderRoutes from "./routes/orders.js";
import { errorHandler, notFound } from "./middleware/error.js";

// Load .env from server directory
const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: resolve(__dirname, "..", ".env") });

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175"],
    credentials: true,
  })
);
app.use(express.json());

// Routes (order matters - /products/:id before /products)
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
    app.listen(PORT, () => {
      console.log(`🚀 Sole Store API running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to initialize database:", err);
    process.exit(1);
  });