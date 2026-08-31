import { ArrowRight } from "lucide-react";

function CollectionCard({ collection, large = false }) {
    return (
        <div
            className={`
                group
                relative
                overflow-hidden
                rounded-[32px]
                cursor-pointer
                ${large ? "h-[420px] md:col-span-2" : "h-[320px]"}
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

                <h3 className="text-5xl font-black text-white [text-shadow:0_3px_12px_rgba(0,0,0,.55)]">
                    {collection.title}
                </h3>

                {collection.description && (
                    <p className="mt-4 max-w-md text-lg text-white/90 [text-shadow:0_2px_8px_rgba(0,0,0,.45)]">
                        {collection.description}
                    </p>
                )}

                <button
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
                </button>

            </div>
        </div>
    );
}

export default CollectionCard;