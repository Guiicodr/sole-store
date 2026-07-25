import Container from "../components/layout/Container";

function Home() {
    return (
        <Container>

            <section className="min-h-[85vh] flex items-center">

                <div className="max-w-xl">

                    <span className="text-sm uppercase tracking-[0.3em] text-gray-500">
                        Premium Sneaker Store
                    </span>

                    <h1 className="mt-5 text-6xl font-black leading-tight">
                        Discover
                        <br />
                        Your Next
                        <br />
                        Sneaker.
                    </h1>

                    <p className="mt-6 text-lg text-gray-500">
                        Elevate your style with carefully selected premium sneakers
                        designed for comfort, performance and everyday movement.
                    </p>

                    <button className="mt-10 rounded-full bg-black px-8 py-4 text-white transition hover:scale-105">
                        Shop Collection
                    </button>

                </div>

            </section>

        </Container>
    );
}

export default Home;