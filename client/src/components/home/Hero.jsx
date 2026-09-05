import Container from "../layout/Container";
import HeroContent from "./HeroContent";
import HeroImage from "./HeroImage";

function Hero() {
    return (
        <section className="min-h-[90vh] flex items-center py-20">
            <Container>
                <div className="grid min-h-[50vh] items-center gap-8 sm:gap-10 md:min-h-[70vh] lg:min-h-[85vh] lg:grid-cols-2">

                    <HeroContent />

                    <HeroImage />

                </div>
            </Container>
        </section>
    );
}

export default Hero;