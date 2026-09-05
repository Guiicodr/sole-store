import Container from "../layout/Container";
import CategoryCard from "./CategoryCard";

import categories from "../../data/categories";

function Categories() {
    return (
        <section className="py-24">

            <Container>

                <span className="text-sm uppercase tracking-[0.35em] text-gray-400">
                    Brands
                </span>

                <h2 className="mt-3 text-3xl font-black sm:text-4xl md:text-5xl">
                    Shop by Brand
                </h2>

                <div className="mt-12 grid gap-8 md:grid-cols-2">

                    {categories.map((category) => (
                        <CategoryCard
                            key={category.id}
                            category={category}
                        />
                    ))}

                </div>

            </Container>

        </section>
    );
}

export default Categories;