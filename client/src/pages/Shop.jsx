import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { products as productsApi } from "../services/api";
import Container from "../components/layout/Container";
import SearchBar from "../components/shop/SearchBar";
import FilterSidebar from "../components/shop/FilterSidebar";
import SortSelect from "../components/shop/SortSelect";
import ProductGrid from "../components/shop/ProductGrid";
import { SearchX } from "lucide-react";

function Shop() {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [brand, setBrand] = useState(searchParams.get("brand") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [size, setSize] = useState(searchParams.get("size") || "");
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
  const [sort, setSort] = useState(searchParams.get("sort") || "newest");
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page, limit: 12, sort };
      if (search) params.search = search;
      if (brand) params.brand = brand;
      if (category) params.category = category;
      if (size) params.size = size;
      if (minPrice) params.minPrice = minPrice;
      if (maxPrice) params.maxPrice = maxPrice;
      const data = await productsApi.list(params);
      setProducts(data.products);
      setTotal(data.pagination.total);
      setTotalPages(data.pagination.totalPages);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    } finally {
      setLoading(false);
    }
  }, [page, sort, search, brand, category, size, minPrice, maxPrice]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);
  useEffect(() => { setPage(1); }, [search, brand, category, size, minPrice, maxPrice, sort]);

  const clearFilters = () => {
    setSearch(""); setBrand(""); setCategory(""); setSize(""); setMinPrice(""); setMaxPrice(""); setSort("newest");
  };
  const hasFilters = search || brand || category || size || minPrice || maxPrice || sort !== "newest";

  return (
    <section className="py-16">
      <Container>
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <span className="text-sm uppercase tracking-[0.3em] text-gray-500">Shop</span>
            <h1 className="mt-3 text-5xl font-black">All Sneakers</h1>
            <p className="mt-2 text-gray-500">{total} products found</p>
          </div>
          <div className="w-full max-w-md">
            <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>

        <div className="grid gap-12 lg:grid-cols-[260px_1fr]">
          <FilterSidebar brand={brand} setBrand={setBrand} category={category} setCategory={setCategory} size={size} setSize={setSize} minPrice={minPrice} setMinPrice={setMinPrice} maxPrice={maxPrice} setMaxPrice={setMaxPrice} />

          <div>
            <div className="mb-8 flex items-center justify-between gap-4">
              <SortSelect value={sort} onChange={(e) => setSort(e.target.value)} />
              {hasFilters && (
                <button onClick={clearFilters} className="text-sm text-gray-500 hover:text-black underline">Clear</button>
              )}
            </div>

            {loading ? (
              <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="rounded-3xl border p-5 animate-pulse">
                    <div className="h-64 rounded-2xl bg-gray-100 mb-6" />
                    <div className="h-4 w-20 bg-gray-100 rounded mb-3" />
                    <div className="h-6 w-40 bg-gray-100 rounded mb-3" />
                    <div className="flex justify-between mt-8">
                      <div className="h-7 w-16 bg-gray-100 rounded" />
                      <div className="h-10 w-24 bg-gray-100 rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="py-20 text-center">
                <SearchX size={48} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-bold text-gray-400">No sneakers found</h3>
                <p className="mt-2 text-gray-400">Try adjusting your search or filters.</p>
                <button onClick={clearFilters} className="mt-6 rounded-full bg-black px-8 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-xl">Clear filters</button>
              </div>
            ) : (
              <>
                <ProductGrid products={products} />
                {totalPages > 1 && (
                  <div className="mt-12 flex items-center justify-center gap-2">
                    <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page <= 1} className="h-10 w-10 rounded-xl border border-gray-200 text-sm font-medium hover:border-black disabled:opacity-40">←</button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                      <button key={p} onClick={() => setPage(p)} className={`h-10 w-10 rounded-xl text-sm font-medium ${page === p ? "bg-black text-white" : "border border-gray-200 hover:border-black"}`}>{p}</button>
                    ))}
                    <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page >= totalPages} className="h-10 w-10 rounded-xl border border-gray-200 text-sm font-medium hover:border-black disabled:opacity-40">→</button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Shop;