import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Search, ShoppingBag, Menu, X, User } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import Container from "./Container";

function Navbar() {
  const { user } = useAuth();
  const { getItemCount } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors ${isActive ? "text-black" : "text-gray-500 hover:text-black"}`;

  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-md">
      <Container>
        <div className="flex h-20 items-center justify-between">
          <NavLink to="/" className="text-2xl font-black tracking-[0.15em]">
            SOLE.
          </NavLink>

          <nav className="hidden md:flex items-center gap-8">
            <NavLink to="/" className={linkClass} end>Home</NavLink>
            <NavLink to="/collections" className={linkClass}>Collections</NavLink>
            <NavLink to="/shop" className={linkClass}>Shop</NavLink>
            <NavLink to="/about" className={linkClass}>About</NavLink>
          </nav>

          <div className="flex items-center gap-4">
            <Link to="/shop" aria-label="Search products">
              <Search size={20} className="text-gray-500 hover:text-black transition-colors" />
            </Link>

            <Link to="/account" aria-label="Account">
              <User size={20} className="text-gray-500 hover:text-black transition-colors" />
            </Link>

            <Link to="/cart" className="relative" aria-label="Shopping cart">
              <ShoppingBag size={20} className="text-gray-500 hover:text-black transition-colors" />
              {getItemCount() > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white">
                  {getItemCount()}
                </span>
              )}
            </Link>

            {user ? (
              <Link to="/account" className="hidden md:block text-xs font-medium text-gray-500 hover:text-black">
                {user.name.split(" ")[0]}
              </Link>
            ) : (
              <Link to="/login" className="hidden md:block text-xs font-medium text-gray-500 hover:text-black">
                Sign In
              </Link>
            )}

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden ml-2"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </Container>

      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-6 py-8 space-y-5">
          <NavLink to="/" onClick={closeMobile} className="block text-base font-medium">Home</NavLink>
          <NavLink to="/collections" onClick={closeMobile} className="block text-base font-medium">Collections</NavLink>
          <NavLink to="/shop" onClick={closeMobile} className="block text-base font-medium">Shop</NavLink>
          <NavLink to="/about" onClick={closeMobile} className="block text-base font-medium">About</NavLink>
          <hr className="border-gray-100" />
          <NavLink to="/cart" onClick={closeMobile} className="block text-base font-medium">Cart</NavLink>
          {user ? (
            <NavLink to="/account" onClick={closeMobile} className="block text-base font-medium">Account</NavLink>
          ) : (
            <NavLink to="/login" onClick={closeMobile} className="block text-base font-medium">Sign In</NavLink>
          )}
        </div>
      )}
    </header>
  );
}

export default Navbar;