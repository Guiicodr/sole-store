import { Link } from "react-router-dom";
import Container from "../components/layout/Container";
import Button from "../components/ui/Button";
import { ArrowRight, Sparkles, Footprints, Music } from "lucide-react";

import shoe from "../assets/images/hero-shoe.webp";
import lifestyle from "../assets/images/collections/lifestyle.jpg";

function About() {
  const values = [
    { icon: Sparkles, title: "Style", description: "Sneakers are more than footwear. They're an extension of who you are. Every pair in our collection is chosen for its ability to define and elevate your personal style." },
    { icon: Footprints, title: "Movement", description: "Designed for people who are always in motion. Whether you're on the court, the street, or the city — your sneakers should keep up with your rhythm." },
    { icon: Music, title: "Culture", description: "Sneakers live at the intersection of sport, music, streetwear, and art. We celebrate the culture that makes sneakers more than just shoes." },
  ];

  return (
    <main>
      <section className="relative min-h-[70vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100" />
        <Container>
          <div className="relative z-10 max-w-3xl">
            <span className="text-xs uppercase tracking-[0.3em] text-gray-400">About</span>
            <h1 className="mt-6 text-6xl md:text-8xl font-black leading-none tracking-tight">SOLE.</h1>
            <p className="mt-6 text-xl md:text-2xl text-gray-600 max-w-xl leading-relaxed">
              More than sneakers. A reflection of how you move, what you stand for, and where you're going.
            </p>
            <div className="mt-10 flex gap-4">
              <Link to="/collections"><Button>Explore Collections</Button></Link>
              <Link to="/shop"><Button variant="outline">Shop All</Button></Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="h-[50vh] md:h-[70vh] overflow-hidden">
        <img src={lifestyle} alt="Sneaker culture" className="h-full w-full object-cover" />
      </section>

      <section className="section-padding">
        <Container>
          <div className="grid gap-16 md:grid-cols-2">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-gray-400">Our Story</span>
              <h2 className="mt-4 text-4xl md:text-5xl font-black leading-tight">Built for the<br />way you move.</h2>
            </div>
            <div className="space-y-6 text-gray-600 leading-relaxed">
              <p className="text-lg">Sole Store was created for one reason: we believe the right pair of sneakers can change how you feel about your day. Not because of hype. Because of fit, feel, and the way they carry you through life.</p>
              <p>We don't just sell sneakers. We curate them. Every brand and silhouette in our collection is chosen for its quality, its story, and its place in sneaker culture. From the timeless lines of a classic low-top to the bold innovation of a performance runner, each pair has a reason to be here.</p>
              <p>Whether you're a collector, an athlete, or someone who just wants to walk through the world with confidence — we've got something for you.</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="h-[60vh] bg-black relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 opacity-30">
          <img src={shoe} alt="" className="h-full w-full object-contain opacity-20" />
        </div>
        <div className="relative z-10 text-center max-w-2xl px-6">
          <p className="text-2xl md:text-3xl font-light text-white/90 italic leading-relaxed">
            "What you wear on your feet says more about where you're going than where you've been."
          </p>
        </div>
      </section>
<section className="section-padding">
        <Container>
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.3em] text-gray-400">Philosophy</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-black">What we stand for</h2>
          </div>
          <div className="grid gap-12 md:grid-cols-3">
            {values.map((v) => (
              <div key={v.title} className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-black">
                  <v.icon size={28} className="text-white" />
                </div>
                <h3 className="mt-6 text-2xl font-bold">{v.title}</h3>
                <p className="mt-4 text-gray-500 leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-padding bg-black">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">Find your<br />next pair.</h2>
            <p className="mt-6 text-lg text-white/70">Every sneaker has a story. Find yours in our curated collection.</p>
            <Link to="/collections">
              <Button variant="secondary" className="mt-8 !border-white !text-white hover:!bg-white hover:!text-black">
                Explore Collections <ArrowRight size={18} className="ml-2" />
              </Button>
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}

export default About;