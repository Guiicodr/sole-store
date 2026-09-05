import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { products as productsApi } from "../../services/api";
import Container from "../layout/Container";
import ProductCard from "../product/ProductCard";

function Featured() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    productsApi.list({ sort: "newest", limit: 3 }).then((data) => {
      setProducts(data.products);
    }).catch(() => {});
  }, []);

  return (
    <section className="py-24">
      <Container>
        <div className="mb-12">
          <span className="text-sm uppercase tracking-[0.3em] text-gray-500">Featured</span>
          <h2 className="mt-3 text-3xl font-black sm:text-4xl md:text-5xl">Trending Sneakers</h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link to="/shop" className="inline-flex items-center gap-2 rounded-full bg-black px-10 py-4 text-sm font-semibold text-white transition hover:-translate-y-1 hover:shadow-xl">
            View All Sneakers
          </Link>
        </div>
      </Container>
    </section>
  );
}

export default Featured;