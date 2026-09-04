import { useState, useEffect, useCallback, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { products as productsApi } from "../services/api";
import Container from "../components/layout/Container";
import SearchBar from "../components/shop/SearchBar";
import FilterSidebar from "../components/shop/FilterSidebar";
import SortSelect from "../components/shop/SortSelect";
import ProductGrid from "../components/shop/ProductGrid";
import { SearchX } from "lucide-react";

function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const isFirstRender = useRef(true);
  const debounceTimer = useRef(null);

  const brand = searchParams.get("brand") || "";
  const category = searchParams.get("category") || "";
  const size = searchParams.get("size") || "";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";
  const sort = searchParams.get("sort") || "newest";
  const page = Number(searchParams.get("page")) || 1;

  const urlSearch = searchParams.get("search") || "";
  const [searchInput, setSearchInput] = useState(urlSearch);

  useEffect(() => { setSearchInput(urlSearch); }, [urlSearch]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      const next = new URLSearchParams(searchParams);
      if (value) { next.set("search", value); } else { next.delete("search"); }
      next.set("page", "1");
      setSearchParams(next, { replace: true });
    }, 300);
  };

  const search = urlSearch;

  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (page !== 1) {
      const next = new URLSearchParams(searchParams);
      next.set("page", "1");
      setSearchParams(next, { replace: true });
    }
  }, [search, brand, category, size, minPrice, maxPrice, sort]);

  const setParam = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (value) { next.set(key, value); } else { next.delete(key); }
    if (key !== "page") next.set("page", "1");
    setSearchParams(next, { replace: true });
  };

  const clearFilters = () => {
    setSearchInput("");
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    setSearchParams({}, { replace: true });
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
            <SearchBar value={searchInput} onChange={handleSearchChange} />
          </div>
        </div>

        <div className="grid gap-12 lg:grid-cols-[260px_1fr]">
          <FilterSidebar brand={brand} setBrand={(v) => setParam("brand", v)}
            category={category} setCategory={(v) => setParam("category", v)}
            size={size} setSize={(v) => setParam("size", v)}
            minPrice={minPrice} setMinPrice={(v) => setParam("minPrice", v)}
            maxPrice={maxPrice} setMaxPrice={(v) => setParam("maxPrice", v)} />

          <div>
            <div className="mb-8 flex items-center justify-between gap-4">
              <SortSelect value={sort} onChange={(e) => setParam("sort", e.target.value)} />
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
                    <button onClick={() => setParam("page", String(Math.max(1, page - 1)))} disabled={page <= 1} className="h-10 w-10 rounded-xl border border-gray-200 text-sm font-medium hover:border-black disabled:opacity-40">&larr;</button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                      <button key={p} onClick={() => setParam("page", String(p))} className={`h-10 w-10 rounded-xl text-sm font-medium ${page === p ? "bg-black text-white" : "border border-gray-200 hover:border-black"}`}>{p}</button>
                    ))}
                    <button onClick={() => setParam("page", String(Math.min(totalPages, page + 1)))} disabled={page >= totalPages} className="h-10 w-10 rounded-xl border border-gray-200 text-sm font-medium hover:border-black disabled:opacity-40">&rarr;</button>
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
