import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import { getAIInsights } from "../services/togetherService";
import { splitIntoSections } from "../utils/splitIntoSections";
import { useRef } from "react";
import ReactMarkdown from "react-markdown";

import html2pdf from "html2pdf.js"; // (for PDF)


const Home = () => {
    const [selected, setSelected] = useState(null);
    const [aiOutput, setAiOutput] = useState("");
    const [aiSections, setAiSections] = useState({});
    const [loading, setLoading] = useState(false);
    const [script, setScript] = useState("");
    const [generating, setGenerating] = useState(false);
    const [contactInfo, setContactInfo] = useState("");
    const [contactLoading, setContactLoading] = useState(false);
    const [numQuestions, setNumQuestions] = useState(20);
    const scriptRef = useRef();
    useEffect(() => {
        const fetchAI = async () => {
            if (!selected) return;
            setScript("");
            setContactInfo("");
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
    const handleScriptGenerate = async () => {
        if (!selected) return;
        setGenerating(true);


        const res = await fetch("http://localhost:5000/api/script", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: selected.name,
                description: selected.description,
                numQuestions: Number(numQuestions),
            }),
        });

        const data = await res.json();
        setScript(data.output);
        setGenerating(false);
    };

    const handleDownloadPDF = () => {
        const element = scriptRef.current;
        const opt = {
            margin: 0.5,
            filename: `${selected.name}_PodcastScript.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        html2pdf().set(opt).from(element).save();
    };
    const handleContactInfoGenerate = async () => {
        if (!selected) return;
        setContactLoading(true);

        const res = await fetch("http://localhost:5000/api/contact-info", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: selected.name,
                description: selected.description,
            }),
        });

        const data = await res.json();
        setContactInfo(data.output);
        setContactLoading(false);
    };
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
                    <div className="mt-4">
                        <button
                            onClick={handleContactInfoGenerate}
                            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                        >
                            📇 Generate Contact Info
                        </button>

                        {contactLoading && (
                            <p className="text-sm text-gray-500 mt-2">Fetching contact info...</p>
                        )}

                        {contactInfo && (
                            <div className="mt-4 bg-white p-4 rounded shadow-sm">
                                <h3 className="text-lg font-semibold mb-2">📬 Contact Info</h3>
                                <ReactMarkdown
                                    components={{
                                        a: ({ node, ...props }) => (
                                            <a
                                                {...props}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 underline"
                                            />
                                        ),
                                    }}
                                >
                                    {contactInfo}
                                </ReactMarkdown>
                            </div>
                        )}


                    </div>

                    <hr className="my-4" />

                    {loading ? (
                        <p className="text-sm text-gray-500">Loading AI insights...</p>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {Object.entries(aiSections).map(([title, content]) => (
                                    <div key={title} className="bg-white p-4 border rounded shadow-sm">
                                        <h3 className="text-md font-bold mb-2">{title}</h3>
                                        <p className="text-sm text-gray-800 whitespace-pre-wrap">
                                            {cleanMarkdown(content)}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {/* 🎤 Generate Script Section */}
                            <div className="mt-6">
                                <button
                                    onClick={handleScriptGenerate}
                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                >
                                    🎤 Generate Podcast Script
                                </button><div className="mb-4">
                                    <label htmlFor="questionSlider" className="block text-sm font-medium text-gray-700 mb-1">
                                        🎯 Number of Questions: <span className="font-bold">{numQuestions}</span>
                                    </label>
                                    <input
                                        id="questionSlider"
                                        type="range"
                                        min="1"
                                        max="30"
                                        value={numQuestions}
                                        onChange={(e) => setNumQuestions(Number(e.target.value))}
                                        className="w-full"
                                    />
                                </div>

                                {generating && (
                                    <p className="text-sm text-gray-500 mt-2">Generating script...</p>
                                )}

                                {script && (
                                    <>
                                        <div className="mt-6" ref={scriptRef}>
                                            <div className="bg-white border p-4 rounded shadow whitespace-pre-wrap" >
                                                <h3 className="text-lg font-semibold mb-2">📝 Podcast Script</h3>
                                                <p className="text-sm text-gray-800 whitespace-pre-wrap break-words">{cleanMarkdown(script)}</p>

                                            </div>
                                        </div>
                                        <div className="flex gap-4 mb-4">
                                            <button
                                                onClick={handleDownloadPDF}
                                                className="bg-green-600 text-white px-4 py-2 rounded shadow"
                                            >
                                                📥 Download as PDF
                                            </button>
                                        </div>
                                    </>
                                )}

                            </div>
                        </>
                    )}

                </div>

            )}

        </div>
    );
};

export default Home;
