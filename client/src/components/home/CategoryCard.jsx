import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function CategoryCard({ category }) {
    return (
        <Link
            to={`/shop?brand=${category.name.toLowerCase().replace(/\s+/g, "-")}`}
            className="group relative h-[340px] overflow-hidden rounded-3xl cursor-pointer block no-underline"
        >

            <img
                src={category.image}
                alt={category.name}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            <div className="absolute bottom-8 left-8 translate-y-4 text-white transition-all duration-500 group-hover:translate-y-0">

                <h3 className="text-4xl font-black">
                    {category.name}
                </h3>

                <div className="mt-3 flex items-center gap-2 opacity-0 transition-all duration-500 group-hover:gap-4 group-hover:opacity-100">

                    <span>Explore</span>

                    <ArrowRight size={18} />

                </div>

            </div>

        </Link>
    );
}

export default CategoryCard;