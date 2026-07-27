function BrandLogo({ children }) {
    return (
        <div
            className="
        text-2xl
        font-black
        tracking-wider
        text-gray-400
        transition-all
        duration-300
        hover:text-black
        hover:scale-110
        cursor-pointer
        select-none
      "
        >
            {children}
        </div>
    );
}

export default BrandLogo;