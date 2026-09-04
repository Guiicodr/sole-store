import { Router } from "express";
import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { dbGet, dbRun } from "../database.js";
import { authMiddleware, generateToken } from "../middleware/auth.js";

const router = Router();

// POST /auth/register
router.post(
  "/register",
  [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("email").isEmail().normalizeEmail().withMessage("Valid email is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array().map((e) => e.msg).join(", ") });
    }

    const { name, email, password } = req.body;

    const existing = dbGet("SELECT id FROM users WHERE email = ?", [email]);
    if (existing) {
      return res.status(409).json({ error: "Email already registered" });
    }

    const id = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10);

    dbRun("INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)", [
      id,
      name,
      email,
      hashedPassword,
    ]);

    const token = generateToken(id);

    res.status(201).json({
      user: { id, name, email },
      token,
    });
  }
);

// POST /auth/login
router.post(
  "/login",
  [
    body("email").isEmail().normalizeEmail().withMessage("Valid email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array().map((e) => e.msg).join(", ") });
    }

    const { email, password } = req.body;

    const user = dbGet("SELECT * FROM users WHERE email = ?", [email]);
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = generateToken(user.id);

    res.json({
      user: { id: user.id, name: user.name, email: user.email },
      token,
    });
  }
);

// GET /auth/me
router.get("/me", authMiddleware, (req, res) => {
  const user = dbGet("SELECT id, name, email, created_at FROM users WHERE id = ?", [req.userId]);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json({ user });
});

export default router;