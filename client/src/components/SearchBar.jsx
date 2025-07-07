import { useState, useEffect } from "react";
import { getSuggestions } from "../utils/api";


const SearchBar = ({ onSelect, selected }) => {
    const [hasSelected, setHasSelected] = useState(false);
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (query.length >= 2 && !hasSelected) {
                fetchSuggestions();
            } else {
                setSuggestions([]);
            }
        }, 4000);

        return () => clearTimeout(delayDebounce);
    }, [query, hasSelected]);


    const fetchSuggestions = async () => {
        setLoading(true);
        try {
            const res = await getSuggestions(query);
            setSuggestions(res);
        } catch (err) {
            console.error("Error fetching suggestions:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleSelect = (item) => {
        onSelect(item);
        setQuery(item.name); // fill input
        setSuggestions([]);
        setHasSelected(true);
    };

    return (
        <div className="relative max-w-xl mx-auto">
            <input
                type="text"
                className="w-full p-3 border rounded-lg"
                placeholder="Search guest..."
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value);
                    setHasSelected(false);
                }}

            />
            {loading && <p className="text-sm text-gray-500 mt-1">Searching...</p>}

            {!selected && suggestions.length > 0 && (
                <ul className="absolute z-10 w-full bg-white border rounded mt-2 shadow-md max-h-72 overflow-y-auto">
                    {suggestions.map((item, i) => (
                        <li
                            key={i}
                            className="p-3 hover:bg-gray-100 cursor-pointer flex gap-2"
                            onClick={() => handleSelect(item)}
                        >
                            {item.image && (
                                <img src={item.image} alt="icon" className="w-5 h-5 mt-1" />
                            )}
                            <div>
                                <p className="font-semibold text-sm">{item.name}</p>
                                <p className="text-xs text-gray-500">{item.description}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;
