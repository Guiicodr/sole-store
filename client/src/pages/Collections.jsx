import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Container from "../components/layout/Container";
import Button from "../components/ui/Button";

import running from "../assets/images/collections/running.jpg";
import basketball from "../assets/images/collections/basketball.jpg";
import lifestyle from "../assets/images/collections/lifestyle.jpg";

const collections = [
  { id: "running", title: "Running", subtitle: "Engineered for the road ahead.", description: "From daily trainers to race-day performance. Built to keep you moving forward.", image: running, category: "running" },
  { id: "basketball", title: "Basketball", subtitle: "Born on the court.", description: "The game demands footwear that can keep up. Heritage meets innovation.", image: basketball, category: "basketball" },
  { id: "lifestyle", title: "Lifestyle", subtitle: "Where comfort meets culture.", description: "Sneakers aren't just for sport. The intersection of streetwear and fashion.", image: lifestyle, category: "lifestyle" },
  { id: "essentials", title: "Essentials", subtitle: "The foundation of every rotation.", description: "Clean lines. Timeless silhouettes. The sneakers that go with everything.", image: running, category: "lifestyle" },
];

function Collections() {
  return (
    <main>
      <section className="relative min-h-[60vh] flex items-center bg-black">
        <div className="absolute inset-0 opacity-40 bg-gradient-to-br from-gray-900 via-black to-gray-800" />
        <Container>
          <div className="relative z-10 max-w-2xl">
            <span className="text-xs uppercase tracking-[0.3em] text-white/60">Curated by SOLE.</span>
            <h1 className="mt-6 text-6xl font-black text-white leading-none md:text-7xl">Collections</h1>
            <p className="mt-6 text-lg text-white/70 max-w-lg">Curated sneakers for every side of your style. From the court to the street.</p>
            <Link to="/shop">
              <Button variant="secondary" className="mt-8 !border-white !text-white hover:!bg-white hover:!text-black">Browse All</Button>
            </Link>
          </div>
        </Container>
      </section>

      <section className="section-padding">
        <Container>
          <div className="relative overflow-hidden rounded-3xl h-[500px] md:h-[600px] group">
            <img src={collections[0].image} alt={collections[0].title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-10 md:p-16">
              <span className="text-xs uppercase tracking-[0.3em] text-white/60">Featured Collection</span>
              <h2 className="mt-4 text-5xl md:text-6xl font-black text-white">{collections[0].title}</h2>
              <p className="mt-4 max-w-lg text-lg text-white/80">{collections[0].subtitle}</p>
              <Link to={`/shop?category=${collections[0].category}`} className="mt-8 inline-flex items-center gap-2 text-white font-semibold group/link">
                Explore Collection <ArrowRight size={20} className="transition-transform group-hover/link:translate-x-1" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-padding pt-0">
        <Container>
          <div className="grid gap-8 md:grid-cols-2">
            {collections.slice(1, 3).map((c) => (
              <Link key={c.id} to={`/shop?category=${c.category}`} className="group relative overflow-hidden rounded-3xl h-[420px]">
                <img src={c.image} alt={c.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-10">
                  <h3 className="text-4xl font-black text-white">{c.title}</h3>
                  <p className="mt-2 text-white/70">{c.subtitle}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-2">
                    Explore <ArrowRight size={16} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative h-[400px] md:h-[500px] overflow-hidden">
        <img src={collections[3].image} alt={collections[3].title} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
          <div className="max-w-xl">
            <span className="text-xs uppercase tracking-[0.3em] text-white/60">Curated Selection</span>
            <h2 className="mt-4 text-4xl md:text-5xl font-black text-white">{collections[3].title}</h2>
            <p className="mt-4 text-white/80">{collections[3].description}</p>
            <Link to="/shop" className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-black transition hover:bg-gray-100">
              Shop the Collection
            </Link>
          </div>
        </div>
      </section>
<section className="section-padding">
        <Container>
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.3em] text-gray-400">Browse</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-black">All Collections</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {collections.map((c) => (
              <Link key={c.id} to={`/shop?category=${c.category}`} className="group relative overflow-hidden rounded-2xl h-[320px]">
                <img src={c.image} alt={c.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className="text-2xl font-black text-white">{c.title}</h3>
                  <p className="mt-1 text-sm text-white/60">{c.subtitle}</p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="section-padding bg-black">
        <Container>
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black text-white">Can't decide?</h2>
            <p className="mt-4 text-white/70">Browse our full catalog and find the pair that speaks to you.</p>
            <Link to="/shop">
              <Button variant="secondary" className="mt-8 !border-white !text-white hover:!bg-white hover:!text-black">
                View All Sneakers
              </Button>
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}

export default Collections;