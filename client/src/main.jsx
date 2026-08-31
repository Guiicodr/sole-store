import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import "./index.css";

import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Collections from "./pages/Collections";
import About from "./pages/About";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Account from "./pages/Account";
import Checkout from "./pages/Checkout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "collections", element: <Collections /> },
      { path: "shop", element: <Shop /> },
      { path: "about", element: <About /> },
      { path: "product/:id", element: <Product /> },
      { path: "cart", element: <Cart /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "account", element: <Account /> },
      { path: "checkout", element: <Checkout /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              borderRadius: "12px",
              padding: "12px 20px",
              fontSize: "14px",
            },
          }}
        />
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);