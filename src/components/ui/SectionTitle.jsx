function SectionTitle({ title, subtitle }) {
    return (
        <div className="mb-12">

            <span className="text-sm uppercase tracking-[0.3em] text-gray-500">
                {subtitle}
            </span>

            <h2 className="mt-3 text-5xl font-black">
                {title}
            </h2>

        </div>
    );
}

export default SectionTitle;