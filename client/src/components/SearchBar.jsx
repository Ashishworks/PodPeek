import { useState } from "react";
import { getSuggestions } from "../utils/api";

const SearchBar = ({ onSelect, selected }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const results = await getSuggestions(query);
      setSuggestions(results);
    } catch (err) {
      console.error("Error fetching suggestions:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (person) => {
    onSelect(person);
    setSuggestions([]);
  };

  return (
    <div >
      <div className="flex gap-2 ">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch(); // call your search function
            }
          }}
          className="w-full px-4 py-2 rounded-2xl bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
          placeholder="Enter name..."
        />
        <button
          onClick={handleSearch}
          className="bg-black text-white px-4 py-2 rounded-2xl"
        >
          Search
        </button>
      </div>

      {suggestions.length > 0 && (
        <ul className="mt-2 border rounded-2xl shadow bg-black/85">
          {suggestions.map((item, idx) => (
            <li
              key={idx}
              onClick={() => handleSelect(item)}
              className="p-2 hover:bg-gray-700 cursor-pointer flex items-center gap-2 transition-colors duration-300 rounded-2xl mx-2 my-2"

            >
              <div>
                <p className="font-medium text-white">{item.name}</p>
                <p className="text-xs text-gray-200">{item.description}</p>
              </div>
            </li>
          ))}
        </ul>
      )}

      {loading && <p className="text-sm text-white mt-2">Searching...</p>}
    </div>
  );
};

export default SearchBar;
