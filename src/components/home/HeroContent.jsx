import Badge from "../ui/Badge";
import Button from "../ui/Button";

function HeroContent() {
    return (
        <div>

            <Badge>
                Premium Sneaker Store
            </Badge>

            <h1 className="mt-8 text-6xl font-black leading-none lg:text-7xl">
                Discover
                <br />
                Your Next
                <br />
                Sneaker.
            </h1>

            <p className="mt-8 max-w-md text-lg text-gray-500">
                Designed for everyday movement with premium comfort,
                timeless style and exceptional performance.
            </p>

            <div className="mt-10 flex gap-4">

                <Button>
                    Shop Collection
                </Button>

                <Button variant="secondary">
                    Explore
                </Button>

            </div>

        </div>
    );
}

export default HeroContent;