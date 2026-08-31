import ProductCard from "../product/ProductCard";

function ProductGrid({ products }) {
    return (
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

            {products.map((product) => (

                <ProductCard
                    key={product.id}
                    product={product}
                />

            ))}

        </div>
    );
}

export default ProductGrid;