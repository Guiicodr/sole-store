import shoe from "../../assets/images/hero-shoe.webp";

function HeroImage() {
    return (
        <div className="relative flex items-center justify-center h-[620px]">

            {/* círculo */}
            <div className="absolute w-[520px] h-[520px] rounded-full bg-gray-100" />

            {/* sombra */}
            <div className="absolute bottom-24 h-10 w-72 rounded-full bg-black/10 blur-2xl" />

            {/* tênis */}
            <img
                src={shoe}
                alt="Nike Sneaker"
                className="relative z-10 w-[650px] object-contain hover:-translate-y-3 transition duration-500"
            />

        </div>
    );
}

export default HeroImage;