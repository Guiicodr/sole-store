const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3001";

async function request(endpoint, options = {}) {
  const token = localStorage.getItem("sole_store_token");

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Something went wrong");
  }

  return data;
}

export const auth = {
  register: (data) => request("/auth/register", { method: "POST", body: JSON.stringify(data) }),
  login: (data) => request("/auth/login", { method: "POST", body: JSON.stringify(data) }),
  me: () => request("/auth/me"),
};

export const products = {
  list: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/products?${query}`);
  },
  get: (id) => request(`/products/${id}`),
};

export const orders = {
  create: (data) => request("/orders", { method: "POST", body: JSON.stringify(data) }),
  list: () => request("/orders"),
  get: (id) => request(`/orders/${id}`),
};