import Container from "../layout/Container";
import HeroContent from "./HeroContent";
import HeroImage from "./HeroImage";

function Hero() {
    return (
        <section className="overflow-hidden bg-[#FAFAFA]">
            <Container>
                <div className="grid min-h-[85vh] items-center gap-12 lg:grid-cols-2">

                    <HeroContent />

                    <HeroImage />

                </div>
            </Container>
        </section>
    );
}

export default Hero;