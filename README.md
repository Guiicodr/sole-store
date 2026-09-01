# ðŸ‘Ÿ Sole Store â€” Premium Sneaker E-commerce

Full-stack sneaker e-commerce platform built with **React**, **Node.js**, **Express**, and **SQLite**. Features a modern, premium UI with complete shopping flow including product catalog, shopping cart, user authentication, checkout, and order management.

## âœ¨ Features

- **Home Page** â€” Hero section, brand showcase, featured products, categories, collections
- **Product Catalog** â€” Grid layout with search, filtering (brand, category, size, price), sorting, pagination
- **Product Details** â€” Images, pricing (discount support), size selection, quantity selector, related products
- **Shopping Cart** â€” Add/remove, quantity, subtotal/shipping/total, localStorage persistence
- **User Authentication** â€” Register, login, logout, JWT sessions, protected routes
- **User Account** â€” Order history with details, personal info, sign out
- **Checkout Flow** â€” Shipping form, demo payment, order summary, confirmation
- **Responsive Design** â€” Mobile menu, adaptive layouts, loading/empty/error states

## ðŸ› ï¸ Tech Stack

### Frontend
React 19, Vite 8, React Router v7, Tailwind CSS v4, Lucide React, react-hot-toast

### Backend
Node.js, Express, sql.js (SQLite), JWT, bcryptjs, express-validator

## ðŸ“ Estrutura

```
sole-store/
â”œâ”€â”€ client/                     # Frontend (React + Vite)
â”‚   â”œâ”€â”€ src/
â”‚   â”‚   â”œâ”€â”€ components/         # Reusable UI
â”‚   â”‚   â”œâ”€â”€ context/            # AuthContext, CartContext
â”‚   â”‚   â”œâ”€â”€ pages/              # Home, Shop, Product, Cart, Login, Register, Account, Checkout
â”‚   â”‚   â””â”€â”€ services/           # API client
â”‚   â””â”€â”€ package.json
â”‚
â”œâ”€â”€ server/                     # Backend (Express + SQLite)
â”‚   â”œâ”€â”€ src/
â”‚   â”‚   â”œâ”€â”€ routes/             # auth, products, orders
â”‚   â”‚   â”œâ”€â”€ middleware/          # JWT, error handling
â”‚   â”‚   â”œâ”€â”€ database.js
â”‚   â”‚   â”œâ”€â”€ seed.js
â”‚   â”‚   â””â”€â”€ index.js
â”‚   â””â”€â”€ package.json
â”‚
â”œâ”€â”€ .gitignore
â””â”€â”€ README.md
```

## ðŸš€ How to Run

### Backend
```bash
cd server
npm install
node src/seed.js        # Seed the database with 12 products
npm run dev             # API at http://localhost:3001
```

### Frontend
```bash
cd client
npm install
npm run dev             # Vite at http://localhost:5173
```

## ðŸ”Œ API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/auth/register` | Create account | No |
| POST | `/auth/login` | Sign in | No |
| GET | `/auth/me` | Current user | Yes |
| GET | `/products` | List products | No |
| GET | `/products/:id` | Product details | No |
| POST | `/orders` | Create order | Yes |
| GET | `/orders` | User orders | Yes |
| GET | `/orders/:id` | Order details | Yes |

**Filters:** `search`, `category`, `brand`, `minPrice`, `maxPrice`, `size`, `sort` (newest, price-asc, price-desc), `page`, `limit`

## ðŸ” Environment Variables

### Backend (`server/.env`)
- `PORT` (default: 3001)
- `JWT_SECRET` (required)
- `DATABASE_PATH` (default: ./data/store.db)

### Frontend (`client/.env`)
- `VITE_API_URL` (default: `http://localhost:3001`)

## ðŸ“¦ Seeded Products

12 realistic sneakers from Nike, Adidas, Jordan, New Balance, Puma, and Asics with sizes (38-45), stock levels, and discount pricing.

## ðŸ”’ Security

- Passwords hashed with bcrypt (10 rounds)
- JWT with 7-day expiration
- Protected endpoints require Bearer token
- Input validation via express-validator
- CORS configured for frontend origins
- `.env` files gitignored

---

*Built as a full-stack portfolio project.*
