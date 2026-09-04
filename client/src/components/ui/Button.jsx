import clsx from "clsx";
import { Link } from "react-router-dom";

function Button({ children, variant = "primary", className = "", to, ...props }) {
  const base =
    "inline-flex items-center justify-center rounded-full px-7 py-3.5 text-sm font-semibold transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black";

  const variants = {
    primary:
      "bg-black text-white hover:bg-gray-900 active:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed",
    secondary:
      "border-2 border-black bg-white text-black hover:bg-black hover:text-white active:bg-gray-900",
    ghost:
      "bg-transparent text-black hover:bg-gray-100",
    outline:
      "border border-gray-300 bg-white text-black hover:border-black",
  };

  if (to) {
    return (
      <Link
        to={to}
        className={clsx(base, variants[variant], className)}
        {...props}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={clsx(base, variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;