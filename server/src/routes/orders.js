import { Router } from "express";
import { body, validationResult } from "express-validator";
import { v4 as uuidv4 } from "uuid";
import { dbAll, dbGet, dbRun, saveDatabase } from "../database.js";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();

// All order routes require authentication
router.use(authMiddleware);

// POST /orders
router.post(
  "/",
  [
    body("items")
      .isArray({ min: 1, max: 50 })
      .withMessage("Between 1 and 50 items are required"),
    body("shippingAddress")
      .trim()
      .notEmpty()
      .isLength({ max: 300 })
      .withMessage("Shipping address is required (max 300 characters)"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array().map((e) => e.msg).join(", ") });
    }

    const { items, shippingAddress } = req.body;

    // Validate each item
    for (const item of items) {
      if (!item.productId || !item.size || !item.quantity) {
        return res.status(400).json({ error: "Each item must have productId, size, and quantity" });
      }
      const qty = Number(item.quantity);
      if (!Number.isInteger(qty) || qty < 1 || qty > 10) {
        return res.status(400).json({ error: "Quantity must be an integer between 1 and 10" });
      }
    }

    // Begin transaction
    dbRun("BEGIN IMMEDIATE");

    try {
      const orderItems = [];
      let subtotal = 0;

      for (const item of items) {
        const product = dbGet("SELECT * FROM products WHERE id = ?", [item.productId]);
        if (!product) {
          dbRun("ROLLBACK");
          return res.status(404).json({ error: `Product ${item.productId} not found` });
        }

        const sizeRow = dbGet("SELECT * FROM product_sizes WHERE product_id = ? AND size = ?", [
          item.productId,
          item.size,
        ]);

        if (!sizeRow) {
          dbRun("ROLLBACK");
          return res.status(400).json({ error: `Size ${item.size} not available for ${product.name}` });
        }

        const qty = Number(item.quantity);
        if (sizeRow.stock < qty) {
          dbRun("ROLLBACK");
          return res.status(400).json({
            error: `Insufficient stock for ${product.name} size ${item.size}. Available: ${sizeRow.stock}`,
          });
        }

        const unitPrice = product.discount_price || product.price;
        subtotal += unitPrice * qty;

        orderItems.push({
          productId: product.id,
          productName: product.name,
          productImage: JSON.parse(product.images || "[]")[0] || null,
          size: item.size,
          quantity: qty,
          unitPrice,
        });

        // Decrement stock
        dbRun("UPDATE product_sizes SET stock = stock - ? WHERE id = ?", [qty, sizeRow.id]);
      }

      const shipping = subtotal > 500 ? 0 : 29.90;
      const total = subtotal + shipping;
      const orderId = uuidv4();

      // Create order
      dbRun(
        "INSERT INTO orders (id, user_id, status, subtotal, shipping, total, shipping_address) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [orderId, req.userId, "confirmed", subtotal, shipping, total, shippingAddress]
      );

      // Create order items
      for (const item of orderItems) {
        dbRun(
          "INSERT INTO order_items (id, order_id, product_id, product_name, product_image, size, quantity, unit_price) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
          [uuidv4(), orderId, item.productId, item.productName, item.productImage, item.size, item.quantity, item.unitPrice]
        );
      }

      // Commit transaction
      saveDatabase();
      dbRun("COMMIT");

      res.status(201).json({
        order: {
          id: orderId,
          status: "confirmed",
          subtotal,
          shipping,
          total,
          shippingAddress,
          items: orderItems,
          createdAt: new Date().toISOString(),
        },
      });
    } catch (err) {
      dbRun("ROLLBACK");
      console.error("Order creation failed:", err);
      res.status(500).json({ error: "Failed to create order" });
    }
  }
);

// GET /orders
router.get("/", (req, res) => {
  const orders = dbAll("SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC", [req.userId]);

  const ordersWithItems = orders.map((order) => ({
    ...order,
    items: dbAll("SELECT * FROM order_items WHERE order_id = ?", [order.id]),
  }));

  res.json({ orders: ordersWithItems });
});

// GET /orders/:id
router.get("/:id", (req, res) => {
  const order = dbGet("SELECT * FROM orders WHERE id = ? AND user_id = ?", [req.params.id, req.userId]);

  if (!order) {
    return res.status(404).json({ error: "Order not found" });
  }

  const items = dbAll("SELECT * FROM order_items WHERE order_id = ?", [order.id]);

  res.json({ order: { ...order, items } });
});

export default router;