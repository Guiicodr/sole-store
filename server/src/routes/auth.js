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
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters")
      .matches(/[A-Z]/)
      .withMessage("Password must contain an uppercase letter")
      .matches(/[a-z]/)
      .withMessage("Password must contain a lowercase letter")
      .matches(/[0-9]/)
      .withMessage("Password must contain a number")
      .matches(/[^A-Za-z0-9]/)
      .withMessage("Password must contain a special character"),
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
// PUT /auth/reset-password (requires auth + old password)
router.put(
  "/reset-password",
  authMiddleware,
  [
    body("oldPassword").notEmpty().withMessage("Current password is required"),
    body("newPassword")
      .isLength({ min: 8 })
      .withMessage("New password must be at least 8 characters")
      .matches(/[A-Z]/)
      .withMessage("Password must contain an uppercase letter")
      .matches(/[a-z]/)
      .withMessage("Password must contain a lowercase letter")
      .matches(/[0-9]/)
      .withMessage("Password must contain a number")
      .matches(/[^A-Za-z0-9]/)
      .withMessage("Password must contain a special character"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array().map((e) => e.msg).join(", ") });
    }

    const { oldPassword, newPassword } = req.body;

    const user = dbGet("SELECT * FROM users WHERE id = ?", [req.userId]);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const valid = await bcrypt.compare(oldPassword, user.password);
    if (!valid) {
      return res.status(401).json({ error: "Current password is incorrect" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    dbRun("UPDATE users SET password = ? WHERE id = ?", [hashedPassword, req.userId]);

    res.json({ message: "Password updated successfully" });
  }
);

// POST /auth/forgot-password (generate reset code)
router.post(
  "/forgot-password",
  [
    body("email").isEmail().normalizeEmail().withMessage("Valid email is required"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array().map((e) => e.msg).join(", ") });
    }

    const { email } = req.body;
    const user = dbGet("SELECT id FROM users WHERE email = ?", [email]);

    if (!user) {
      return res.json({ message: "If that email exists, a reset code has been sent." });
    }

    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString();

    dbRun("UPDATE users SET reset_code = ?, reset_code_expires = ? WHERE id = ?", [
      resetCode,
      expiresAt,
      user.id,
    ]);

    console.log("[DEMO] Reset code for " + email + ": " + resetCode);

    res.json({
      message: "If that email exists, a reset code has been sent.",
      demoCode: resetCode,
    });
  }
);

// POST /auth/reset-password-with-code
router.post(
  "/reset-password-with-code",
  [
    body("email").isEmail().normalizeEmail().withMessage("Valid email is required"),
    body("code").notEmpty().withMessage("Reset code is required"),
    body("newPassword")
      .isLength({ min: 8 })
      .withMessage("New password must be at least 8 characters")
      .matches(/[A-Z]/)
      .withMessage("Password must contain an uppercase letter")
      .matches(/[a-z]/)
      .withMessage("Password must contain a lowercase letter")
      .matches(/[0-9]/)
      .withMessage("Password must contain a number")
      .matches(/[^A-Za-z0-9]/)
      .withMessage("Password must contain a special character"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array().map((e) => e.msg).join(", ") });
    }

    const { email, code, newPassword } = req.body;

    const user = dbGet(
      "SELECT id, reset_code, reset_code_expires FROM users WHERE email = ?",
      [email]
    );

    if (!user || !user.reset_code || user.reset_code !== code) {
      return res.status(400).json({ error: "Invalid or expired reset code" });
    }

    if (new Date(user.reset_code_expires) < new Date()) {
      return res.status(400).json({ error: "Reset code has expired" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    dbRun("UPDATE users SET password = ?, reset_code = NULL, reset_code_expires = NULL WHERE id = ?", [
      hashedPassword,
      user.id,
    ]);

    const userData = dbGet("SELECT id, name, email FROM users WHERE id = ?", [user.id]);
    const token = generateToken(user.id);

    res.json({
      message: "Password reset successfully",
      user: userData,
      token,
    });
  }
);
  const user = dbGet("SELECT id, name, email, created_at FROM users WHERE id = ?", [req.userId]);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json({ user });
});

export default router;