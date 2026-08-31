function SortSelect({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={onChange}
      className="rounded-xl border border-gray-200 px-4 py-3 outline-none text-sm"
    >
      <option value="newest">Newest</option>
      <option value="price-asc">Lowest Price</option>
      <option value="price-desc">Highest Price</option>
      <option value="name-asc">Name A-Z</option>
      <option value="name-desc">Name Z-A</option>
    </select>
  );
}

export default SortSelect;