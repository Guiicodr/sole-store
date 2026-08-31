import initSqlJs from "sql.js";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DB_PATH = process.env.DATABASE_PATH || "./data/store.db";
const dbPath = resolve(__dirname, "..", DB_PATH);

const dataDir = dirname(dbPath);
if (!existsSync(dataDir)) {
  mkdirSync(dataDir, { recursive: true });
}

export function dbAll(sql, params = []) {
  const stmt = db.prepare(sql);
  if (params.length > 0) stmt.bind(params);
  const results = [];
  while (stmt.step()) {
    results.push(stmt.getAsObject());
  }
  stmt.free();
  return results;
}

export function dbGet(sql, params = []) {
  const stmt = db.prepare(sql);
  if (params.length > 0) stmt.bind(params);
  const result = stmt.step() ? stmt.getAsObject() : undefined;
  stmt.free();
  return result;
}

export function dbRun(sql, params = []) {
  db.run(sql, params);
}

let db;

export async function initDatabase() {
  const SQL = await initSqlJs();

  if (existsSync(dbPath)) {
    const buffer = readFileSync(dbPath);
    db = new SQL.Database(buffer);
  } else {
    db = new SQL.Database();
  }

  db.run("PRAGMA foreign_keys = ON");

  db.run(
    "CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL UNIQUE, password TEXT NOT NULL, created_at TEXT DEFAULT (datetime('now')))"
  );

  db.run(
    "CREATE TABLE IF NOT EXISTS products (id TEXT PRIMARY KEY, name TEXT NOT NULL, description TEXT NOT NULL, brand TEXT NOT NULL, category TEXT NOT NULL, price REAL NOT NULL, discount_price REAL, images TEXT NOT NULL DEFAULT '[]', featured INTEGER DEFAULT 0, created_at TEXT DEFAULT (datetime('now')))"
  );

  db.run(
    "CREATE TABLE IF NOT EXISTS product_sizes (id TEXT PRIMARY KEY, product_id TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE, size TEXT NOT NULL, stock INTEGER NOT NULL DEFAULT 0, UNIQUE(product_id, size))"
  );

  db.run(
    "CREATE TABLE IF NOT EXISTS orders (id TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id), status TEXT NOT NULL DEFAULT 'pending', subtotal REAL NOT NULL, shipping REAL NOT NULL, total REAL NOT NULL, shipping_address TEXT NOT NULL, created_at TEXT DEFAULT (datetime('now')))"
  );

  db.run(
    "CREATE TABLE IF NOT EXISTS order_items (id TEXT PRIMARY KEY, order_id TEXT NOT NULL REFERENCES orders(id) ON DELETE CASCADE, product_id TEXT NOT NULL, product_name TEXT NOT NULL, product_image TEXT, size TEXT NOT NULL, quantity INTEGER NOT NULL, unit_price REAL NOT NULL)"
  );

  try {
    db.run("CREATE INDEX IF NOT EXISTS idx_products_brand ON products(brand)");
    db.run("CREATE INDEX IF NOT EXISTS idx_products_category ON products(category)");
    db.run("CREATE INDEX IF NOT EXISTS idx_product_sizes_product ON product_sizes(product_id)");
    db.run("CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id)");
  } catch (e) {
    // indexes may already exist
  }

  saveDatabase();
  return db;
}

export function saveDatabase() {
  const data = db.export();
  const buffer = Buffer.from(data);
  writeFileSync(dbPath, buffer);
}

export function getDb() {
  return db;
}

export default db;