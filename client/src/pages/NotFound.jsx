import { Link } from "react-router-dom";
import Container from "../components/layout/Container";

function NotFound() {
  return (
    <section className="py-24">
      <Container>
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-8xl font-black text-gray-200">404</h1>
          <h2 className="mt-4 text-3xl font-black">Page not found</h2>
          <p className="mt-4 text-gray-500">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link
            to="/"
            className="mt-8 inline-flex rounded-full bg-black px-10 py-4 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-xl"
          >
            Back to Home
          </Link>
        </div>
      </Container>
    </section>
  );
}

export default NotFound;