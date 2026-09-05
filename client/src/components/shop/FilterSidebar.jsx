import { X, SlidersHorizontal } from "lucide-react";
import { useState } from "react";

const brands = ["Nike", "Adidas", "Jordan", "New Balance", "Puma", "Asics"];
const categories = ["lifestyle", "running", "basketball"];
const sizes = ["38", "39", "40", "41", "42", "43", "44", "45"];

function FilterSidebar({ brand, setBrand, category, setCategory, size, setSize, minPrice, setMinPrice, maxPrice, setMaxPrice }) {
  const activeCount = [brand, category, size, minPrice, maxPrice].filter(Boolean).length;
  const [mobileOpen, setMobileOpen] = useState(false);

  const filterContent = (
    <>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold">Filters</h3>
        {activeCount > 0 && (
          <span className="text-xs text-gray-400">{activeCount} active</span>
        )}
      </div>

      {/* Brand */}
      <div className="mb-8">
        <h4 className="text-sm font-semibold mb-4">Brand</h4>
        <div className="space-y-3">
          {brands.map((b) => (
            <label key={b} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={brand === b.toLowerCase()}
                onChange={() => setBrand(brand === b.toLowerCase() ? "" : b.toLowerCase())}
                className="h-4 w-4 rounded border-gray-300 accent-black"
              />
              <span className="text-sm">{b}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Category */}
      <div className="mb-8">
        <h4 className="text-sm font-semibold mb-4">Category</h4>
        <div className="space-y-3">
          {categories.map((c) => (
            <label key={c} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={category === c}
                onChange={() => setCategory(category === c ? "" : c)}
                className="h-4 w-4 rounded border-gray-300 accent-black"
              />
              <span className="text-sm capitalize">{c}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Size */}
      <div className="mb-8">
        <h4 className="text-sm font-semibold mb-4">Size</h4>
        <div className="flex flex-wrap gap-2">
          {sizes.map((s) => (
            <button
              key={s}
              onClick={() => setSize(size === s ? "" : s)}
              className={`h-9 w-11 rounded-lg border text-xs font-medium transition ${
                size === s
                  ? "border-black bg-black text-white"
                  : "border-gray-200 hover:border-black"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <h4 className="text-sm font-semibold mb-4">Price Range</h4>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-black"
          />
          <span className="text-gray-400">—</span>
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-black"
          />
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile filter toggle button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed bottom-6 right-6 z-30 flex items-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl lg:hidden"
      >
        <SlidersHorizontal size={16} />
        Filters{activeCount > 0 ? ` (${activeCount})` : ""}
      </button>

      {/* Desktop sidebar */}
      <aside className="hidden lg:block rounded-3xl border p-6 h-fit lg:sticky lg:top-32">
        {filterContent}
      </aside>

      {/* Mobile filter drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-[300px] max-w-[85vw] bg-white overflow-y-auto p-6 shadow-2xl animate-slide-in-right">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Filters</h3>
              <button onClick={() => setMobileOpen(false)} className="p-1 hover:bg-gray-100 rounded-lg transition">
                <X size={20} />
              </button>
            </div>
            {filterContent}
          </div>
        </div>
      )}
    </>
  );
}

export default FilterSidebar;