function Badge({ children }) {
    return (
        <span className="rounded-full bg-gray-100 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-gray-500">
            {children}
        </span>
    );
}

export default Badge;