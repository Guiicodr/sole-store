import { Link } from "react-router-dom";
import Badge from "../ui/Badge";
import Button from "../ui/Button";

function HeroContent() {
  return (
    <div>
      <Badge>Premium Sneaker Store</Badge>

      <h1 className="mt-8 text-4xl font-black leading-none sm:text-5xl md:text-6xl lg:text-7xl">
        Discover
        <br />
        Your Next
        <br />
        Sneaker.
      </h1>

      <p className="mt-6 max-w-md text-base text-gray-500 sm:text-lg md:mt-8">
        Designed for everyday movement with premium comfort,
        timeless style and exceptional performance.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4 md:mt-10">
        <Link to="/shop" className="w-full sm:w-auto">
          <Button className="w-full sm:w-auto">Shop Collection</Button>
        </Link>
        <Link to="/collections" className="w-full sm:w-auto">
          <Button variant="secondary" className="w-full sm:w-auto">View Collections</Button>
        </Link>
      </div>
    </div>
  );
}

export default HeroContent;