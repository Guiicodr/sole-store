import { Search } from "lucide-react";

function SearchBar({ value, onChange }) {
    return (
        <div className="relative">

            <Search
                size={18}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
                type="text"
                placeholder="Search sneakers..."
                value={value}
                onChange={onChange}
                className="
                    w-full
                    rounded-full
                    border
                    border-gray-200
                    py-4
                    pl-14
                    pr-5
                    outline-none
                    transition
                    focus:border-black
                "
            />

        </div>
    );
}

export default SearchBar;