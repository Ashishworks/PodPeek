import SearchBar from "../components/SearchBar";
import { useEffect, useState } from "react";

const Home = () => {
    const [selected, setSelected] = useState(null);
    useEffect(() => {
        console.log("Selected person:", selected);
    }, [selected]);
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-center mb-6">🎙️ PodPeek</h1>
            <SearchBar onSelect={(person) => setSelected(person)} selected={selected} />

            {selected && (
                <div className="mt-6 bg-gray-50 p-4 rounded shadow">
                    <h2 className="text-xl font-semibold mb-2">Selected Person</h2>
                    {selected.image && (
                        <img
                            src={selected.image}
                            alt={selected.name}
                            className="w-10 h-10 mb-2 rounded"
                        />
                    )}
                    <p><strong>Name:</strong> {selected.name}</p>
                    <p><strong>Description:</strong> {selected.description}</p>
                    <p><strong>Source:</strong> <a className="text-blue-600" href={selected.url} target="_blank">{selected.url}</a></p>
                </div>
            )}
        </div>
    );
};

export default Home;
