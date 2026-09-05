import shoe from "../../assets/images/hero-shoe.webp";

function HeroImage() {
    return (
        <div className="relative flex items-center justify-center h-[300px] sm:h-[400px] md:h-[500px] lg:h-[620px]">

            {/* círculo */}
            <div className="absolute w-[280px] h-[280px] rounded-full bg-gray-100 sm:w-[380px] sm:h-[380px] md:w-[450px] md:h-[450px] lg:w-[520px] lg:h-[520px]" />

            {/* sombra */}
            <div className="absolute bottom-16 h-8 w-40 rounded-full bg-black/10 blur-2xl sm:bottom-20 sm:w-52 md:bottom-24 md:w-72 lg:h-10" />

            {/* tênis */}
            <img
                src={shoe}
                alt="Nike Sneaker"
                className="relative z-10 w-[300px] object-contain sm:w-[400px] md:w-[500px] lg:w-[650px] hover:-translate-y-3 transition duration-500"
            />

        </div>
    );
}

export default HeroImage;