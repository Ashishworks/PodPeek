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
    <div className="mb-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-full"
          placeholder="Enter name..."
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      {suggestions.length > 0 && (
        <ul className="mt-2 border rounded shadow bg-white">
          {suggestions.map((item, idx) => (
            <li
              key={idx}
              onClick={() => handleSelect(item)}
              className="p-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
            >
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-6 h-6 rounded"
                />
              )}
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-xs text-gray-600">{item.description}</p>
              </div>
            </li>
          ))}
        </ul>
      )}

      {loading && <p className="text-sm text-gray-500 mt-2">Searching...</p>}
    </div>
  );
};

export default SearchBar;
