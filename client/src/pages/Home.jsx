import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import { getAIInsights } from "../services/togetherService";
import { splitIntoSections } from "../utils/splitIntoSections";
import { useRef } from "react";
import PersonCard from "../components/PersonCard";
import ContactInfo from "../components/ContactInfo";
import InsightsGrid from "../components/InsightsGrid";
import ScriptBox from "../components/ScriptBox";


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
                    <PersonCard person={selected} />
                    <ContactInfo
                        contactInfo={contactInfo}
                        contactLoading={contactLoading}
                        onGenerate={handleContactInfoGenerate}
                    />
                    <hr className="my-4" />

                    {loading ? (
                        <p className="text-sm text-gray-500">Loading AI insights...</p>
                    ) : (
                        <>
                            <InsightsGrid aiSections={aiSections} />
                            <ScriptBox
                                selected={selected}
                                script={script}
                                setScript={setScript}
                                generating={generating}
                                setGenerating={setGenerating}
                                numQuestions={numQuestions}
                                setNumQuestions={setNumQuestions}
                            />
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default Home;
