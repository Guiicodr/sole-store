import { Router } from "express";
import { dbAll, dbGet } from "../database.js";

const router = Router();

// GET /products
router.get("/", (req, res) => {
  const {
    search,
    category,
    brand,
    minPrice,
    maxPrice,
    size,
    sort = "newest",
    page = 1,
    limit = 12,
  } = req.query;

  let sql = "SELECT * FROM products WHERE 1=1";
  const params = [];

  if (search) {
    // Escape SQL LIKE wildcards and sanitize
    const escapedTerm = search
      .replace(/[%_\\]/g, "\\$&")
      .toLowerCase();
    sql += " AND (LOWER(name) LIKE ? ESCAPE '\\' OR LOWER(brand) LIKE ? ESCAPE '\\' OR LOWER(description) LIKE ? ESCAPE '\\')";
    const term = `%${escapedTerm}%`;
    params.push(term, term, term);
  }

  if (category) {
    sql += " AND LOWER(category) = ?";
    params.push(category.toLowerCase());
  }

  if (brand) {
    sql += " AND LOWER(brand) = ?";
    params.push(brand.toLowerCase());
  }

  if (minPrice) {
    const num = Number(minPrice);
    if (!isNaN(num) && num >= 0) {
      sql += " AND price >= ?";
      params.push(num);
    }
  }

  if (maxPrice) {
    const num = Number(maxPrice);
    if (!isNaN(num) && num >= 0) {
      sql += " AND price <= ?";
      params.push(num);
    }
  }

  if (size) {
    // Only allow numeric sizes (38-45 range)
    const cleanSize = size.replace(/[^0-9]/g, "");
    if (cleanSize) {
      sql += " AND id IN (SELECT product_id FROM product_sizes WHERE size = ? AND stock > 0)";
      params.push(cleanSize);
    }
  }

  switch (sort) {
    case "price-asc":
      sql += " ORDER BY price ASC";
      break;
    case "price-desc":
      sql += " ORDER BY price DESC";
      break;
    case "name-asc":
      sql += " ORDER BY name ASC";
      break;
    case "name-desc":
      sql += " ORDER BY name DESC";
      break;
    default:
      sql += " ORDER BY created_at DESC";
  }

  // Pagination
  const pageNum = Math.max(1, Number(page));
  const limitNum = Math.min(50, Math.max(1, Number(limit)));
  const offset = (pageNum - 1) * limitNum;

  // Count total (reuse params)
  const countSql = sql.replace("SELECT *", "SELECT COUNT(*) as total");
  const totalResult = dbGet(countSql, params);
  const total = totalResult.total;

  sql += " LIMIT ? OFFSET ?";
  params.push(limitNum, offset);

  const products = dbAll(sql, params);

  // Attach sizes
  const productsWithSizes = products.map((product) => ({
    ...product,
    images: JSON.parse(product.images || "[]"),
    sizes: dbAll("SELECT size, stock FROM product_sizes WHERE product_id = ? ORDER BY size", [product.id]),
  }));

  res.json({
    products: productsWithSizes,
    pagination: {
      page: pageNum,
      limit: limitNum,
      total,
      totalPages: Math.ceil(total / limitNum),
    },
  });
});

// GET /products/:id
router.get("/:id", (req, res) => {
  const product = dbGet("SELECT * FROM products WHERE id = ?", [req.params.id]);

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  const sizes = dbAll("SELECT size, stock FROM product_sizes WHERE product_id = ? ORDER BY size", [
    product.id,
  ]);

  const related = dbAll(
    "SELECT * FROM products WHERE (brand = ? OR category = ?) AND id != ? ORDER BY RANDOM() LIMIT 4",
    [product.brand, product.category, product.id]
  );

  const relatedWithSizes = related.map((p) => ({
    ...p,
    images: JSON.parse(p.images || "[]"),
    sizes: dbAll("SELECT size, stock FROM product_sizes WHERE product_id = ? ORDER BY size", [p.id]),
  }));

  res.json({
    product: {
      ...product,
      images: JSON.parse(product.images || "[]"),
      sizes,
    },
    related: relatedWithSizes,
  });
});

export default router;