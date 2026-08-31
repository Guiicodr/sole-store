import { Link } from "react-router-dom";
import Container from "./Container";

function Footer() {
  return (
    <footer className="border-t border-gray-100 mt-20 py-16">
      <Container>
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link to="/" className="text-2xl font-black tracking-[0.15em]">SOLE.</Link>
            <p className="mt-4 max-w-sm text-gray-500 leading-relaxed text-sm">
              Premium sneaker store offering the best selection of authentic footwear from the world's top brands.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-5">Shop</h3>
            <div className="space-y-3">
              <Link to="/shop" className="block text-sm text-gray-500 hover:text-black transition">All Sneakers</Link>
              <Link to="/collections" className="block text-sm text-gray-500 hover:text-black transition">Collections</Link>
              <Link to="/shop?brand=nike" className="block text-sm text-gray-500 hover:text-black transition">Nike</Link>
              <Link to="/shop?brand=adidas" className="block text-sm text-gray-500 hover:text-black transition">Adidas</Link>
              <Link to="/shop?brand=jordan" className="block text-sm text-gray-500 hover:text-black transition">Jordan</Link>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-5">Company</h3>
            <div className="space-y-3">
              <Link to="/about" className="block text-sm text-gray-500 hover:text-black transition">About</Link>
              <Link to="/account" className="block text-sm text-gray-500 hover:text-black transition">My Account</Link>
              <Link to="/cart" className="block text-sm text-gray-500 hover:text-black transition">Cart</Link>
              <Link to="/login" className="block text-sm text-gray-500 hover:text-black transition">Sign In</Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 mt-12 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2026 SOLE. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;