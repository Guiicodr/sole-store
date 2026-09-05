import Container from "../layout/Container";
import collections from "../../data/collections";
import CollectionCard from "./CollectionCard";

function Collections() {
    return (
        <section className="py-24">

            <Container>

                <span className="text-sm uppercase tracking-[0.3em] text-gray-500">
                    Collections
                </span>

                <h2 className="mt-3 text-3xl font-black sm:text-4xl md:text-5xl">
                    Find Your Style
                </h2>

                <div className="mt-12 grid gap-8 md:grid-cols-2">

                    <CollectionCard
                        collection={collections[0]}
                    />

                    <CollectionCard
                        collection={collections[1]}
                    />

                    <CollectionCard
                        collection={collections[2]}
                        large
                    />

                </div>

            </Container>

        </section>
    );
}

export default Collections;