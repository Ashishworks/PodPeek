import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import { getAIInsights } from "../services/togetherService";
import { splitIntoSections } from "../utils/splitIntoSections";
import { useRef } from "react";
import PersonCard from "../components/PersonCard";
import ContactInfo from "../components/ContactInfo";
import InsightsGrid from "../components/InsightsGrid";
import ScriptBox from "../components/ScriptBox";
import QuestionVariator from "../components/QuestionVariator";



const Home = () => {
    const [selected, setSelected] = useState(null);
    const [aiOutput, setAiOutput] = useState("");
    const [aiSections, setAiSections] = useState({});
    const [loading, setLoading] = useState(false);
    const [script, setScript] = useState("");
    const [generating, setGenerating] = useState(false);
    const [numQuestions, setNumQuestions] = useState(10);
    const [scriptQuestions, setScriptQuestions] = useState([]);

    useEffect(() => {
        const fetchAI = async () => {
            if (!selected) return;
            setScript("");
            setLoading(true);
            const output = await getAIInsights(selected);
            setAiOutput(output);
            const sections = splitIntoSections(output);
            setAiSections(sections);
            setLoading(false);
        };

        fetchAI();
    }, [selected]);
    
    
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-center mb-6">🎙️ PodPeek</h1>
            <SearchBar onSelect={(person) => setSelected(person)} selected={selected} />

            {selected && (
                <div className="mt-6 bg-gray-50 p-4 rounded shadow">
                    <PersonCard person={selected} />
                    <ContactInfo selected={selected} />
                    <hr className="my-4" />

                    {loading ? (
                        <p className="text-sm text-gray-500">Loading AI insights... usually takes less than a minute</p>
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
                                setScriptQuestions={setScriptQuestions}
                            />
                            {script && <QuestionVariator questions={scriptQuestions} />}
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default Home;
