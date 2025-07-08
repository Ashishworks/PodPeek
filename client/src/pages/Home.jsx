import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import { getAIInsights } from "../services/togetherService";
import { splitIntoSections } from "../utils/splitIntoSections";

const Home = () => {
    const [selected, setSelected] = useState(null);
    const [aiOutput, setAiOutput] = useState("");
    const [aiSections, setAiSections] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchAI = async () => {
            if (!selected) return;
            setLoading(true);
            const output = await getAIInsights(selected);
            setAiOutput(output);
            const sections = splitIntoSections(output);
            setAiSections(sections);
            setLoading(false);
        };

        fetchAI();
    }, [selected]);
    function cleanMarkdown(text) {
        return text
            .replace(/\*\*(.*?)\*\*/g, '$1')   // bold
            .replace(/\*(.*?)\*/g, '$1')       // italic
            .replace(/`(.*?)`/g, '$1')         // inline code
            .replace(/^-+$/gm, '')             // any line that is just dashes
            .trim();
    }


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
                    <p><strong>Source:</strong> <a className="text-blue-600" href={selected.url} target="_blank" rel="noreferrer">{selected.url}</a></p>

                    <hr className="my-4" />

                    {loading ? (
                        <p className="text-sm text-gray-500">Loading AI insights...</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {Object.entries(aiSections).map(([title, content]) => (
                                <div key={title} className="bg-white p-4 border rounded shadow-sm">
                                    <h3 className="text-md font-bold mb-2">{title}</h3>
                                    <p className="text-sm text-gray-800 whitespace-pre-wrap">{cleanMarkdown(content)}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Home;
