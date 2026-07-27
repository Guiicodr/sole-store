import clsx from "clsx";

function Button({
    children,
    variant = "primary",
    className = "",
    ...props
}) {
    const base =
        "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300";

    const variants = {
        primary:
            "bg-black text-white hover:-translate-y-1 hover:scale-105 hover:shadow-xl active:scale-95",

        secondary:
            "border border-gray-300 bg-white text-black hover:bg-gray-100",
    };

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