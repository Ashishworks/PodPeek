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
import TrueFocus from "../animations/TrueFocus";
import { BackgroundBeams } from "../background/BackgroundBeams";
import { BackgroundGradient } from "../CardsBg/BackgroundGradient";



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

    useEffect(() => {
        const isDark = localStorage.getItem('theme') === 'dark';
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const toggleDarkMode = () => {
        const isDark = document.documentElement.classList.contains('dark');
        if (isDark) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
    };



    return (
        <div className="p-6 relative min-h-screen overflow-hidden bg-black text-white dark:text-white mix-blend-lighten">



            <div className="mb-6">
                <TrueFocus
                    sentence="Pod Peek"
                    manualMode={false}
                    blurAmount={5}
                    borderColor="red"
                    animationDuration={1}
                    pauseBetweenAnimations={1}
                />

            </div>
            <BackgroundGradient containerClassName="w-full rounded-2xl p-2">
                <SearchBar
                    onSelect={(person) => setSelected(person)}
                    selected={selected}
                />
            </BackgroundGradient>
            {selected && (
                <div className="mt-6 p-4 rounded shadow bg-transparent">
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
            <div className="absolute inset-0 -z-10">
                <BackgroundBeams />
            </div>

        </div>
    );
};

export default Home;
