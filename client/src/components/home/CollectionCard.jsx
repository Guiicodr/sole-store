import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function CollectionCard({ collection, large = false }) {
    return (
        <Link
            to={`/shop?category=${collection.category}`}
            className={`
                group
                relative
                overflow-hidden
                rounded-[32px]
                cursor-pointer
                block no-underline
                ${large ? "h-[280px] sm:h-[340px] md:h-[420px] md:col-span-2" : "h-[220px] sm:h-[260px] md:h-[320px]"}
            `}
        >
            {/* Imagem */}
            <img
                src={collection.image}
                alt={collection.title}
                className="
                    absolute
                    inset-0
                    h-full
                    w-full
                    object-cover
                    transition-transform
                    duration-700
                    group-hover:scale-105
                "
            />

            {/* Overlay */}
            <div
                className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-black/80
                    via-black/35
                    to-transparent
                "
            />

            {/* Brilho */}
            <div
                className="
                    absolute
                    inset-0
                    -translate-x-full
                    bg-gradient-to-r
                    from-transparent
                    via-white/20
                    to-transparent
                    transition-transform
                    duration-1000
                    group-hover:translate-x-full
                "
            />

            {/* Conteúdo */}
            <div className="absolute bottom-8 left-8 z-10">

                <h3 className="text-3xl font-black text-white sm:text-4xl md:text-5xl [text-shadow:0_3px_12px_rgba(0,0,0,.55)]">
                    {collection.title}
                </h3>

                {collection.description && (
                    <p className="mt-3 max-w-md text-sm text-white/90 sm:text-base md:text-lg md:mt-4 [text-shadow:0_2px_8px_rgba(0,0,0,.45)]">
                        {collection.description}
                    </p>
                )}

                <div
                    className="
                        mt-8
                        flex
                        items-center
                        gap-2
                        text-lg
                        font-semibold
                        text-white
                        transition-all
                        duration-300
                        group-hover:translate-x-2
                    "
                >
                    Explore
                    <ArrowRight
                        size={22}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                </div>

            </div>
        </Link>
    );
}

export default CollectionCard;