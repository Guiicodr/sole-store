import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { products as productsApi } from "../services/api";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";
import Container from "../components/layout/Container";
import Button from "../components/ui/Button";
import ProductCard from "../components/product/ProductCard";
import { ChevronLeft, ShoppingBag } from "lucide-react";
import { formatPrice } from "../utils/currency";

function Product() {
  const { id } = useParams();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    setLoading(true);
    setSelectedSize("");
    setQuantity(1);
    productsApi
      .get(id)
      .then((data) => {
        setProduct(data.product);
        setRelated(data.related);
      })
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }
    setAdding(true);
    addItem(product, selectedSize, quantity);
    toast.success("Added to cart!");
    setTimeout(() => setAdding(false), 500);
  };

  if (loading) {
    return (
      <section className="py-24">
        <Container>
          <div className="flex items-center justify-center h-96">
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-black border-t-transparent" />
          </div>
        </Container>
      </section>
    );
  }

  if (!product) {
    return (
      <section className="py-24">
        <Container>
          <div className="text-center py-20">
            <h1 className="text-3xl font-black">Product not found</h1>
            <Link to="/shop" className="mt-6 inline-block rounded-full bg-black px-8 py-3 text-white font-semibold">
              Back to Shop
            </Link>
          </div>
        </Container>
      </section>
    );
  }

  const currentPrice = product.discount_price || product.price;
  const hasDiscount = !!product.discount_price;

  return (
    <section className="py-16">
      <Container>
        <Link to="/shop" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black transition mb-10">
          <ChevronLeft size={18} />
          Back to Shop
        </Link>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Image */}
          <div className="flex items-center justify-center rounded-3xl bg-gray-100 p-12 h-[500px]">
            {product.images?.[0] && (
              <img
                src={product.images[0]}
                alt={product.name}
                className="h-80 object-contain hover:scale-105 transition-transform duration-500"
              />
            )}
          </div>

          {/* Details */}
          <div>
            <p className="text-sm uppercase tracking-widest text-gray-400">
              {product.brand}
            </p>
            <h1 className="mt-3 text-4xl font-black lg:text-5xl">
              {product.name}
            </h1>

            <div className="mt-6 flex items-center gap-4">
              {hasDiscount ? (
                <>
                  <span className="text-3xl font-black">{formatPrice(currentPrice)}</span>
                  <span className="text-lg text-gray-400 line-through">{formatPrice(product.price)}</span>
                  <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-600">
                    -{Math.round((1 - product.discount_price / product.price) * 100)}%
                  </span>
                </>
              ) : (
                <span className="text-3xl font-black">{formatPrice(product.price)}</span>
              )}
            </div>

            <p className="mt-8 leading-relaxed text-gray-600">
              {product.description}
            </p>

            {/* Sizes */}
            <div className="mt-10">
              <h3 className="text-sm font-semibold mb-4">
                Select Size {selectedSize && <span className="text-gray-400 ml-2">— {selectedSize}</span>}
              </h3>
              <div className="flex flex-wrap gap-3">
                {product.sizes?.map((s) => (
                  <button
                    key={s.size}
                    onClick={() => setSelectedSize(s.size)}
                    disabled={s.stock === 0}
                    className={`h-12 w-14 rounded-xl border text-sm font-medium transition-all duration-200
                      ${
                        selectedSize === s.size
                          ? "border-black bg-black text-white"
                          : s.stock === 0
                            ? "border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed line-through"
                            : "border-gray-200 hover:border-black hover:-translate-y-0.5"
                      }`}
                  >
                    {s.size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mt-8">
              <h3 className="text-sm font-semibold mb-4">Quantity</h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="h-10 w-10 rounded-xl border border-gray-200 text-lg transition hover:border-black"
                >
                  -
                </button>
                <span className="w-10 text-center font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(10, quantity + 1))}
                  className="h-10 w-10 rounded-xl border border-gray-200 text-lg transition hover:border-black"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="mt-10">
              <Button
                onClick={handleAddToCart}
                disabled={adding}
                className="w-full py-4 text-base"
              >
                <ShoppingBag size={18} className="mr-2" />
                {adding ? "Adding..." : "Add to Cart"}
              </Button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <section className="mt-24">
            <h2 className="text-3xl font-black mb-10">You Might Also Like</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </Container>
    </section>
  );
}

export default Product;