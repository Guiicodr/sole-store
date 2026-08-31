import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import Button from "../ui/Button";

function ProductCard({ product }) {
  const formatPrice = (value) =>
    `R$ ${Number(value).toFixed(2).replace(".", ",")}`;

  const currentPrice = product.discount_price || product.price;
  const hasDiscount = !!product.discount_price;

  return (
    <Link to={`/product/${product.id}`} className="block group rounded-3xl border border-gray-100 p-5 transition-all duration-500 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative mb-5 flex h-64 items-center justify-center rounded-2xl bg-gray-50 overflow-hidden">
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
          className="absolute right-3 top-3 z-10 rounded-full bg-white/90 p-2 shadow-sm transition hover:scale-110 hover:bg-white"
          aria-label="Add to wishlist"
        >
          <Heart size={18} className="text-gray-400" />
        </button>

        <div className="transition-transform duration-500 group-hover:scale-105">
          {product.images?.[0] && (
            <img
              src={product.images[0]}
              alt={product.name}
              className="h-44 object-contain"
              loading="lazy"
            />
          )}
        </div>

        {hasDiscount && (
          <span className="absolute left-3 top-3 rounded-full bg-red-500 px-3 py-1 text-[11px] font-bold text-white">
            -{Math.round((1 - product.discount_price / product.price) * 100)}%
          </span>
        )}
      </div>

      <p className="text-xs uppercase tracking-[0.2em] text-gray-400">{product.brand}</p>
      <h3 className="mt-1.5 text-xl font-bold leading-tight">{product.name}</h3>

      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-baseline gap-2">
          <span className="text-xl font-black">{formatPrice(currentPrice)}</span>
          {hasDiscount && (
            <span className="text-sm text-gray-400 line-through">{formatPrice(product.price)}</span>
          )}
        </div>
        <Button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.location.href = `/product/${product.id}`; }}
          className="rounded-full px-6 py-2.5 text-xs"
        >
          Buy
        </Button>
      </div>
    </Link>
  );
}

export default ProductCard;