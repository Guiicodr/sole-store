import { NavLink } from "react-router-dom";
import { Search, Heart, ShoppingBag } from "lucide-react";
import Container from "./Container";

function Navbar() {
    const navLink =
        "text-sm font-medium text-gray-600 hover:text-black transition-colors";

    return (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">

            <Container>

                <div className="flex h-24 items-center justify-between">

                    <NavLink
                        to="/"
                        className="text-2xl font-black tracking-[0.15em]"
                    >
                        SOLE.
                    </NavLink>

                    <nav className="hidden md:flex items-center gap-10">

                        <NavLink className={navLink} to="/">
                            Home
                        </NavLink>

                        <NavLink className={navLink} to="/shop">
                            Shop
                        </NavLink>

                        <NavLink className={navLink} to="/">
                            Collections
                        </NavLink>

                        <NavLink className={navLink} to="/">
                            About
                        </NavLink>

                    </nav>

                    <div className="flex items-center gap-5">

                        <Search
                            size={20}
                            className="cursor-pointer hover:scale-110 transition-transform"
                        />

                        <Heart
                            size={20}
                            className="cursor-pointer hover:scale-110 transition-transform"
                        />

                        <ShoppingBag
                            size={20}
                            className="cursor-pointer hover:scale-110 transition-transform"
                        />

                    </div>

                </div>

            </Container>

        </header>
    );
}

export default Navbar;