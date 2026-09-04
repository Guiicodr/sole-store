# Sole Store - Premium Sneaker E-commerce

Full-stack sneaker e-commerce platform built with **React**, **Node.js**, **Express**, and **SQLite**. Features a modern, premium UI with complete shopping flow including product catalog, shopping cart, user authentication, checkout, and order management.

## Features

- **Home Page** - Hero section, brand showcase, featured products, categories, collections
- **Product Catalog** - Grid layout with search, filtering (brand, category, size, price), sorting, pagination
- **Product Details** - Images, pricing (discount support), size selection, quantity selector, related products
- **Shopping Cart** - Add/remove, quantity, subtotal/shipping/total, localStorage persistence
- **User Authentication** - Register, login, logout, JWT sessions, protected routes
- **User Account** - Order history with details, personal info, sign out
- **Checkout Flow** - Shipping form, demo payment, order summary, confirmation
- **Responsive Design** - Mobile menu, adaptive layouts, loading/empty/error states

## Tech Stack

### Frontend
React 19, Vite 8, React Router v7, Tailwind CSS v4, Lucide React, react-hot-toast

### Backend
Node.js, Express, sql.js (SQLite), JWT, bcryptjs, express-validator

## Structure

sole-store/
- client/         - Frontend (React + Vite)
- server/         - Backend (Express + SQLite)
- .gitignore
- README.md

## How to Run

### Backend
cd server
npm install
node src/seed.js        # Seed the database with 12 products
npm run dev             # API at http://localhost:3001

### Frontend
cd client
npm install
npm run dev             # Vite at http://localhost:5173

## API Endpoints

| Method | Endpoint | Description | Auth |
| POST | /auth/register | Create account | No |
| POST | /auth/login | Sign in | No |
| GET | /auth/me | Current user | Yes |
| GET | /products | List products | No |
| GET | /products/:id | Product details | No |
| POST | /orders | Create order | Yes |
| GET | /orders | User orders | Yes |
| GET | /orders/:id | Order details | Yes |

**Filters:** search, category, brand, minPrice, maxPrice, size, sort (newest, price-asc, price-desc), page, limit

## Environment Variables

### Backend (server/.env)
- PORT (default: 3001)
- JWT_SECRET (required - server fails to start without it)
- DATABASE_PATH (default: ./data/store.db)

### Frontend (client/.env)
- VITE_API_URL (default: http://localhost:3001)

## Seeded Products

12 realistic sneakers from Nike, Adidas, Jordan, New Balance, Puma, and Asics with sizes (38-45), stock levels, and discount pricing.

## Security (implemented)

- Passwords hashed with bcrypt (10 rounds, async - non-blocking)
- JWT with 7-day expiration; no fallback secret
- Protected endpoints require Bearer token
- Input validation via express-validator on all mutations
- Rate limiting: /auth/login (5 attempts/15min), /auth/register (10 attempts/60min)
- Atomic transactions: order creation wrapped in BEGIN/COMMIT/ROLLBACK
- Request body limit: 16kb
- Security headers: nosniff, DENY, Referrer-Policy, Permissions-Policy
- Error 500: generic message (details logged server-side only)
- SQL injection: parameterized queries; LIKE wildcards escaped
- Query sanitization: page/limit/minPrice/maxPrice validated against NaN; size filtered to digits
- Order validation: quantity integer 1-10, max 50 items, address <= 300 chars
- CORS configured for frontend origins
- .env and database files gitignored

### Tradeoffs accepted

- JWT in localStorage: common in SPAs; vulnerable to XSS. For production, use httpOnly cookies.
- Email enumeration on register: 409 reveals if email exists. Acceptable for demo.
- In-memory rate limiter: resets on server restart. For production, use Redis.

## Scalability Roadmap

| Priority | Bottleneck | Fix |
| High | Single-process, single-thread | PM2 cluster or Nginx reverse-proxy |
| High | SQLite not designed for concurrency | Migrate to PostgreSQL via Prisma |
| High | No connection pooling | PostgreSQL + pg-pool |
| Medium | No caching | Add Redis for product catalog |
| Medium | Static images via Express | Use CDN (Cloudflare R2, S3 + CloudFront) |
| Medium | No logging framework | Add Winston/Pino with rotation |
| Low | No CI/CD | GitHub Actions (lint, test, build, deploy) |

### Current performance notes

- Product catalog: all filtering done in SQL (indexed on brand, category, product_id)
- Frontend bundle: ~208 KB gzipped (code-split by page via React.lazy + Suspense)
- Search debounced at 300ms
- Cart and Wishlist persisted in localStorage

---

*Built as a full-stack portfolio project.*
