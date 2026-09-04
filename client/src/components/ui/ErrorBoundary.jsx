import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className="py-24">
          <div className="mx-auto max-w-lg text-center">
            <h1 className="text-4xl font-black">Something went wrong</h1>
            <p className="mt-4 text-gray-500">An unexpected error occurred. Please try refreshing the page.</p>
            <button
              onClick={() => { this.setState({ hasError: false }); window.location.href = "/"; }}
              className="mt-8 rounded-full bg-black px-10 py-4 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              Back to Home
            </button>
          </div>
        </section>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;