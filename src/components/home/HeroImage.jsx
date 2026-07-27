function HeroImage() {
    return (
        <div className="flex items-center justify-center">

            <div className="relative">

                <div className="h-[520px] w-[520px] rounded-full bg-gray-100" />

                <div className="absolute inset-0 flex items-center justify-center">

                    <span className="text-2xl font-bold text-gray-400">
                        Sneaker Image
                    </span>

                </div>

            </div>

        </div>
    );
}

export default HeroImage;