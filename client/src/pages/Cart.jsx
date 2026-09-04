import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Container from "../components/layout/Container";
import { ShoppingBag, Trash2, Minus, Plus } from "lucide-react";
import { formatPrice } from "../utils/currency";

function Cart() {
  const { items, updateQuantity, removeItem, getSubtotal, getShipping, getTotal } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <section className="py-24">
        <Container>
          <div className="max-w-lg mx-auto text-center py-20">
            <ShoppingBag size={56} className="mx-auto text-gray-300 mb-6" />
            <h1 className="text-3xl font-black">Your cart is empty</h1>
            <p className="mt-3 text-gray-500">Looks like you haven't added any sneakers yet. Let's fix that!</p>
            <button onClick={() => navigate("/shop")} className="mt-8 rounded-full bg-black px-10 py-4 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-xl">Start Shopping</button>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-16">
      <Container>
        <div className="mb-10">
          <span className="text-sm uppercase tracking-[0.3em] text-gray-500">Cart</span>
          <h1 className="mt-3 text-4xl font-black">Shopping Cart</h1>
        </div>
        <div className="grid gap-12 lg:grid-cols-[1fr_380px]">
          <div className="space-y-6">
            {items.map((item, idx) => {
              const price = item.product.discount_price || item.product.price;
              return (
                <div key={idx} className="flex gap-6 rounded-2xl border p-6">
                  <div className="h-28 w-28 flex-shrink-0 rounded-xl bg-gray-100 flex items-center justify-center">
                    {item.product.images?.[0] && (
                      <img src={item.product.images[0]} alt={item.product.name} className="h-20 object-contain" />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex justify-between gap-4">
                      <div>
                        <p className="text-sm uppercase tracking-widest text-gray-400">{item.product.brand}</p>
                        <h3 className="font-bold text-lg mt-1">{item.product.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">Size: {item.size}</p>
                      </div>
                      <button onClick={() => removeItem(item.product.id, item.size)} className="text-gray-300 hover:text-red-500 transition">
                        <Trash2 size={20} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-3">
                        <button onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)} disabled={item.quantity <= 1} className="h-8 w-8 rounded-lg border border-gray-200 flex items-center justify-center transition hover:border-black disabled:opacity-40 disabled:cursor-not-allowed">
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)} className="h-8 w-8 rounded-lg border border-gray-200 flex items-center justify-center transition hover:border-black">
                          <Plus size={14} />
                        </button>
                      </div>
                      <div className="text-right">
                        <span className="font-black text-lg">{formatPrice(price * item.quantity)}</span>
                        {item.product.discount_price && (
                          <p className="text-xs text-gray-400 line-through">{formatPrice(item.product.price * item.quantity)}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <Link to="/shop" className="text-sm font-medium text-gray-500 hover:text-black transition">← Continue Shopping</Link>
          </div>
          <div className="h-fit lg:sticky lg:top-32 rounded-2xl border p-6">
            <h3 className="font-bold mb-6">Order Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-medium">{formatPrice(getSubtotal())}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Shipping</span>
                <span className="font-medium">{getShipping() === 0 ? "Free" : formatPrice(getShipping())}</span>
              </div>
              {getSubtotal() < 500 && (
                <p className="text-xs text-gray-400">Add {formatPrice(500 - getSubtotal())} more for free shipping</p>
              )}
              <div className="border-t pt-3 mt-3 flex justify-between text-lg font-black">
                <span>Total</span>
                <span>{formatPrice(getTotal())}</span>
              </div>
            </div>
            <button onClick={() => navigate("/checkout")} className="mt-6 w-full rounded-full bg-black py-4 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-xl active:scale-95">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Cart;