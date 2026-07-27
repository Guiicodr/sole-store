function ProductCard({ product }) {
    return (
        <div className="group rounded-3xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">

            <div className="mb-6 flex h-56 items-center justify-center rounded-2xl bg-gray-100">
                <span className="text-gray-400">
                    Sneaker Image
                </span>
            </div>

            <p className="text-sm text-gray-500">
                {product.brand}
            </p>

            <h3 className="mt-1 text-xl font-bold">
                {product.name}
            </h3>

            <div className="mt-5 flex items-center justify-between">

                <span className="text-lg font-black">
                    {product.price}
                </span>

                <button className="rounded-full bg-black px-5 py-2 text-white transition hover:scale-105">
                    Buy
                </button>

            </div>

        </div>
    );
}

export default ProductCard;