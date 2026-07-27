import Container from "../layout/Container";
import BrandLogo from "./BrandLogo";

const brands = [
    "NIKE",
    "ADIDAS",
    "JORDAN",
    "NEW BALANCE",
    "PUMA",
    "ASICS",
];

function Brands() {
    return (
        <section className="py-20 border-y border-gray-100">
            <Container>

                <div className="flex flex-wrap items-center justify-center gap-14">

                    {brands.map((brand) => (
                        <BrandLogo key={brand}>
                            {brand}
                        </BrandLogo>
                    ))}

                </div>

            </Container>
        </section>
    );
}

export default Brands;