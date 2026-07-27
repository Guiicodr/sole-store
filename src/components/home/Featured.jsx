import Container from "../layout/Container";
import ProductCard from "../product/ProductCard";
import featuredSneakers from "../../data/featuredSneakers";

function Featured() {
    return (
        <section className="py-24">
            <Container>

                <div className="mb-12">

                    <span className="text-sm uppercase tracking-[0.3em] text-gray-500">
                        Featured
                    </span>

                    <h2 className="mt-3 text-5xl font-black">
                        Trending Sneakers
                    </h2>

                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

                    {featuredSneakers.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                        />
                    ))}

                </div>

            </Container>
        </section>
    );
}

export default Featured;