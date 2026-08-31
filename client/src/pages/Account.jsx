import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { orders as ordersApi } from "../services/api";
import toast from "react-hot-toast";
import Container from "../components/layout/Container";
import { Package, User, LogOut } from "lucide-react";

function Account() {
  const { user, loading: authLoading, logout } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("orders");

  useEffect(() => {
    if (!authLoading && !user) navigate("/login");
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      ordersApi.list()
        .then((data) => setOrders(data.orders))
        .catch(() => toast.error("Failed to load orders"))
        .finally(() => setLoading(false));
    }
  }, [user]);

  const handleLogout = () => { logout(); toast.success("Logged out"); navigate("/"); };
  const formatPrice = (v) => `R$ ${Number(v).toFixed(2).replace(".", ",")}`;

  if (authLoading) {
    return (
      <section className="py-24">
        <Container>
          <div className="flex items-center justify-center h-64">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-black border-t-transparent" />
          </div>
        </Container>
      </section>
    );
  }

  if (!user) return null;

  return (
    <section className="py-16">
      <Container>
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-black">My Account</h1>
            <p className="mt-2 text-gray-500">Welcome back, {user.name}.</p>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition hover:bg-gray-50">
            <LogOut size={16} /> Sign Out
          </button>
        </div>

        <div className="flex gap-4 mb-10 border-b">
          <button onClick={() => setTab("orders")} className={`pb-4 text-sm font-medium transition ${tab === "orders" ? "border-b-2 border-black text-black" : "text-gray-400 hover:text-black"}`}>
            <Package size={16} className="inline mr-2" /> Orders
          </button>
          <button onClick={() => setTab("info")} className={`pb-4 text-sm font-medium transition ${tab === "info" ? "border-b-2 border-black text-black" : "text-gray-400 hover:text-black"}`}>
            <User size={16} className="inline mr-2" /> Personal Info
          </button>
        </div>

        {tab === "orders" && (
          <>{loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-black border-t-transparent" />
              </div>
            ) : orders.length === 0 ? (
              <div className="py-20 text-center">
                <Package size={48} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-bold text-gray-400">No orders yet</h3>
                <p className="mt-2 text-gray-400">Hit the shop and make your first purchase!</p>
                <button onClick={() => navigate("/shop")} className="mt-6 rounded-full bg-black px-8 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-xl">Browse Sneakers</button>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map((order) => (
                  <div key={order.id} className="rounded-2xl border p-6">
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                      <div>
                        <span className="text-sm text-gray-500">Order</span>
                        <p className="font-mono text-sm text-gray-400">#{order.id.slice(0, 8)}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="rounded-full bg-green-100 px-4 py-1 text-xs font-semibold text-green-700 uppercase">{order.status}</span>
                        <span className="text-lg font-black">{formatPrice(order.total)}</span>
                      </div>
                    </div>
<div className="border-t pt-4 space-y-3">
                      {(order.items || []).map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4 text-sm">
                          <div className="h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
                            {item.product_image && <img src={item.product_image} alt={item.product_name} className="h-10 object-contain" />}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{item.product_name}</p>
                            <p className="text-gray-500">Size {item.size} x {item.quantity}</p>
                          </div>
                          <span className="font-medium">{formatPrice(item.unit_price)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t pt-4 mt-4 text-sm text-gray-500">
                      <p>Shipping to: {order.shipping_address}</p>
                      <p className="mt-1">Placed on: {new Date(order.created_at).toLocaleDateString("pt-BR")}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {tab === "info" && (
          <div className="rounded-2xl border p-8 max-w-lg">
            <h3 className="text-lg font-bold mb-6">Personal Information</h3>
            <div className="space-y-4">
              <div><span className="text-sm text-gray-500">Name</span><p className="font-medium">{user.name}</p></div>
              <div><span className="text-sm text-gray-500">Email</span><p className="font-medium">{user.email}</p></div>
              <div><span className="text-sm text-gray-500">Member since</span><p className="font-medium">{new Date(user.created_at).toLocaleDateString("pt-BR")}</p></div>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}

export default Account;