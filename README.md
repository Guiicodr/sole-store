<<<<<<< HEAD
# 👟 Sole Store

> A modern sneaker e-commerce website built with React, Vite, and Tailwind CSS.

**Sole Store** is a modern and responsive e-commerce application focused on sneaker retail. The project was developed to practice and demonstrate front-end development concepts while creating a realistic online shopping experience.

---

## ✨ Features

- 🏠 Modern landing page
- 👟 Sneaker product catalog
- 🔎 Product details
- 🛒 Shopping cart
- 📱 Responsive design
- 🧩 Reusable React components
- 🧭 Client-side routing
- 🎨 Tailwind CSS styling
- ⚡ Fast development with Vite

---

## 🖥️ Preview

![Sole Store Preview](./assets/preview.png)

---

## 🛠️ Technologies

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)

---

## 📂 Project Structure

```text
sole-store/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   │   ├── Home/
│   │   ├── Shop/
│   │   ├── Product/
│   │   └── Cart/
│   ├── data/
│   ├── App.jsx
│   └── main.jsx
├── package.json
├── vite.config.js
└── README.md
=======
# SOLE. — Premium Sneaker Store

A full-stack sneaker e-commerce platform built with React, Node.js, Express, and SQLite. Features a modern, premium UI with complete shopping flow including product catalog, shopping cart, user authentication, checkout, and order management.

## Features

- **Home Page** — Hero section, brand showcase, featured products, categories, collections
- **Product Catalog** — Grid layout with search, filtering (brand, category, size, price), sorting, pagination
- **Product Details** — Images, pricing (discount support), size selection, quantity selector, related products
- **Shopping Cart** — Add/remove, quantity, subtotal/shipping/total, localStorage persistence
- **User Authentication** — Register, login, logout, JWT sessions, protected routes
- **User Account** — Order history with details, personal info, sign out
- **Checkout Flow** — Shipping form, demo payment, order summary, confirmation
- **Responsive Design** — Mobile menu, adaptive layouts, loading/empty/error states

## Tech Stack

### Frontend
React 19, Vite 8, React Router v7, Tailwind CSS v4, Lucide React, react-hot-toast

### Backend
Node.js, Express, sql.js (SQLite — zero native deps), JWT, bcryptjs, express-validator

## Architecture

```
sole-store/
├── client/                     # Frontend (React + Vite)
│   ├── public/
│   ├── src/
│   │   ├── components/         # Reusable UI (home, layout, product, shop, ui)
│   │   ├── context/            # AuthContext (JWT), CartContext (localStorage)
│   │   ├── pages/              # Home, Shop, Product, Cart, Login, Register, Account, Checkout
│   │   ├── services/           # api.js — fetch wrapper with auth + env-based URL
│   │   ├── layouts/
│   │   ├── data/               # Static data (categories, collections)
│   │   └── assets/             # Images and icons
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── server/                     # Backend API (Express + SQLite)
│   ├── src/
│   │   ├── routes/             # auth, products, orders
│   │   ├── middleware/          # auth (JWT), error handling
│   │   ├── database.js         # SQLite setup + query helpers
│   │   ├── seed.js             # Database seeder (12 products)
│   │   └── index.js            # Express entry point
│   ├── data/                   # SQLite database files (gitignored)
│   ├── package.json
│   └── .env
│
├── .gitignore
└── README.md
```
## API Overview

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

**Product filters:** `search`, `category`, `brand`, `minPrice`, `maxPrice`, `size`, `sort` (newest, price-asc, price-desc, name-asc, name-desc), `page`, `limit`

## How to Run

### Backend
```bash
cd server
npm install
node src/seed.js        # Seed the database with 12 products
npm run dev             # Starts API on http://localhost:3001
```

### Frontend
```bash
cd client
npm install
npm run dev             # Starts Vite on http://localhost:5173
```

## Environment Variables

### Backend (`server/.env`)
- `PORT` (default: 3001)
- `JWT_SECRET` (required — change in production)
- `DATABASE_PATH` (default: ./data/store.db)

### Frontend (`client/.env`)
- `VITE_API_URL` (default: `http://localhost:3001`)

## Database

SQLite with tables: `users`, `products`, `product_sizes`, `orders`, `order_items`. Prices are always calculated server-side — frontend totals are not trusted.

## Security

- Passwords hashed with bcrypt (10 rounds)
- JWT with 7-day expiration
- Protected endpoints require Bearer token
- Input validation via express-validator
- CORS configured for frontend origins
- `.env` files gitignored

## Seeded Products

12 realistic sneakers from Nike, Adidas, Jordan, New Balance, Puma, and Asics with proper sizes (38-45), stock levels, and discount pricing.

## Future Improvements

- Admin panel, real payment, wishlist, reviews, ratings, email notifications, social login, image upload

---

*Built as a full-stack portfolio project.*
>>>>>>> 47d193f (chore: restructure into monorepo with client and server)
