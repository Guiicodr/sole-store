import { Link } from "react-router-dom";

function BrandLogo({ brand }) {
  return (
    <Link
      to={`/shop?brand=${brand.toLowerCase()}`}
      className="
        text-2xl
        font-black
        tracking-wider
        text-gray-400
        transition-all
        duration-300
        hover:text-black
        hover:scale-110
        cursor-pointer
        select-none
        no-underline
      "
    >
      {brand}
    </Link>
  );
}

export default BrandLogo;