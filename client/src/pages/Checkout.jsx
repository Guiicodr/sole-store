import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { orders as ordersApi } from "../services/api";
import toast from "react-hot-toast";
import Container from "../components/layout/Container";
import { CreditCard, Truck, ShoppingBag } from "lucide-react";

function Checkout() {
  const { items, getSubtotal, getShipping, getTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(null);
  const [cardName, setCardName] = useState("");

  const formatPrice = (v) => `R$ ${Number(v).toFixed(2).replace(".", ",")}`;

  if (items.length === 0 && !confirmed) {
    return (
      <section className="py-24">
        <Container>
          <div className="mx-auto max-w-lg text-center">
            <ShoppingBag size={48} className="mx-auto text-gray-300 mb-4" />
            <h1 className="text-3xl font-black">Your cart is empty</h1>
            <p className="mt-2 text-gray-500">Add some sneakers before checking out.</p>
            <button onClick={() => navigate("/shop")} className="mt-6 rounded-full bg-black px-8 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-xl">Browse Shop</button>
          </div>
        </Container>
      </section>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) { toast.error("Please sign in to checkout"); navigate("/login"); return; }
    if (!address || !city || !state) { toast.error("Please fill in your shipping address"); return; }
    setLoading(true);
    try {
      const result = await ordersApi.create({
        items: items.map((item) => ({ productId: item.product.id, size: item.size, quantity: item.quantity })),
        shippingAddress: `${address}, ${city}, ${state}${zip ? ` - ${zip}` : ""}`,
      });
      setConfirmed(result.order);
      clearCart();
      toast.success("Order placed successfully!");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (confirmed) {
    return (
      <section className="py-24">
        <Container>
          <div className="mx-auto max-w-lg text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <ShoppingBag size={36} className="text-green-600" />
            </div>
            <h1 className="text-4xl font-black">Order Confirmed!</h1>
            <p className="mt-4 text-gray-500">Thank you for your purchase. Your order has been placed and is being processed.</p>
            <p className="mt-4 font-mono text-sm text-gray-400">Order #{confirmed.id.slice(0, 8).toUpperCase()}</p>
            <div className="mt-10 rounded-2xl border p-6 text-left">
              <h3 className="font-bold mb-4">Order Summary</h3>
              <div className="space-y-3">
                {confirmed.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <span>{item.productName} (Size {item.size}) × {item.quantity}</span>
                    <span className="font-medium">{formatPrice(item.unitPrice)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t mt-4 pt-4 space-y-2">
                <div className="flex justify-between text-sm"><span className="text-gray-500">Subtotal</span><span>{formatPrice(confirmed.subtotal)}</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-500">Shipping</span><span>{confirmed.shipping === 0 ? "Free" : formatPrice(confirmed.shipping)}</span></div>
                <div className="flex justify-between text-lg font-black"><span>Total</span><span>{formatPrice(confirmed.total)}</span></div>
              </div>
            </div>
            <div className="mt-8 flex gap-4 justify-center">
              <button onClick={() => navigate("/account")} className="rounded-full border px-8 py-3 text-sm font-semibold transition hover:bg-gray-50">View Orders</button>
              <button onClick={() => navigate("/shop")} className="rounded-full bg-black px-8 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-xl">Continue Shopping</button>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-16">
      <Container>
        <h1 className="text-4xl font-black mb-10">Checkout</h1>
        <div className="grid gap-12 lg:grid-cols-[1fr_420px]">
          <form onSubmit={handleSubmit}>
            <div className="space-y-10">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Truck size={22} />
                  <h2 className="text-xl font-bold">Shipping Address</h2>
                </div>
                <div className="space-y-4">
                  <input type="text" required value={address} onChange={(e) => setAddress(e.target.value)} className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-black" placeholder="Street, number" />
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" required value={city} onChange={(e) => setCity(e.target.value)} className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-black" placeholder="City" />
                    <input type="text" required value={state} onChange={(e) => setState(e.target.value)} className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-black" placeholder="State" />
                  </div>
                  <input type="text" value={zip} onChange={(e) => setZip(e.target.value)} className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-black" placeholder="ZIP (optional)" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <CreditCard size={22} />
                  <h2 className="text-xl font-bold">Payment</h2>
                </div>
                <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-800 mb-6">⚠️ Demo — no real payment will be processed.</div>
                <div className="space-y-4">
                  <input type="text" value="4111 1111 1111 1111" readOnly className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-500 cursor-not-allowed" placeholder="Card number" />
                  <input type="text" value={cardName} onChange={(e) => setCardName(e.target.value)} className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-black" placeholder="Name on card" required />
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" value="12/28" readOnly className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-500 cursor-not-allowed" placeholder="MM/YY" />
                    <input type="text" value="123" readOnly className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-500 cursor-not-allowed" placeholder="CVV" />
                  </div>
                </div>
              </div>
            </div>
            <button type="submit" disabled={loading} className="mt-10 w-full rounded-full bg-black py-4 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-xl active:scale-95 disabled:opacity-50">
              {loading ? "Processing..." : `Place Order — ${formatPrice(getTotal())}`}
            </button>
          </form>
          <div className="lg:sticky lg:top-32 h-fit rounded-2xl border p-6">
            <h3 className="font-bold mb-6">Order Summary</h3>
            {items.map((item, idx) => {
              const price = item.product.discount_price || item.product.price;
              return (
                <div key={idx} className="flex gap-4 mb-4">
                  <div className="h-16 w-16 flex-shrink-0 rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden">
                    {item.product.images?.[0] && <img src={item.product.images[0]} alt={item.product.name} className="h-12 object-contain" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.product.name}</p>
                    <p className="text-xs text-gray-500">Size {item.size} × {item.quantity}</p>
                    <p className="text-sm font-semibold mt-1">{formatPrice(price * item.quantity)}</p>
                  </div>
                </div>
              );
            })}
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-sm"><span className="text-gray-500">Subtotal</span><span>{formatPrice(getSubtotal())}</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-500">Shipping</span><span>{getShipping() === 0 ? "Free" : formatPrice(getShipping())}</span></div>
              {getSubtotal() < 500 && <p className="text-xs text-gray-400">Free shipping over R$ 500</p>}
              <div className="flex justify-between text-lg font-black border-t pt-3"><span>Total</span><span>{formatPrice(getTotal())}</span></div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Checkout;