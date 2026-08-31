import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Hero from "../components/home/Hero";
import Brands from "../components/home/Brands";
import Featured from "../components/home/Featured";
import Categories from "../components/home/Categories";
import Collections from "../components/home/Collections";
import Container from "../components/layout/Container";
import Button from "../components/ui/Button";

function Home() {
  return (
    <main>
      <Hero />
      <Brands />
      <Featured />

      {/* Collections Preview */}
      <section className="section-padding bg-gray-50">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-gray-400">Collections</span>
              <h2 className="mt-3 text-4xl md:text-5xl font-black">Curated by SOLE.</h2>
            </div>
            <Link to="/collections" className="inline-flex items-center gap-2 text-sm font-semibold text-black group">
              View All Collections <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <Collections />
        </Container>
      </section>

      <Categories />

      {/* About Preview */}
      <section className="section-padding bg-black">
        <Container>
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-white/50">About</span>
              <h2 className="mt-4 text-4xl md:text-5xl font-black text-white leading-tight">
                More than<br />sneakers.
              </h2>
              <p className="mt-6 text-white/70 max-w-md leading-relaxed">
                We believe the right pair of sneakers can change how you feel about your day. Every brand and silhouette is chosen for its quality, its story, and its place in culture.
              </p>
              <Link to="/about">
                <Button variant="secondary" className="mt-8 !border-white !text-white hover:!bg-white hover:!text-black">
                  Our Story <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="aspect-square rounded-3xl overflow-hidden bg-gray-800">
                <div className="h-full w-full flex items-center justify-center">
                  <span className="text-8xl font-black text-white/10 tracking-[0.2em]">SOLE.</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}

export default Home;