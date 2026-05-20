import { useState } from "react";

const QuestionVariator = ({ questions }) => {
    const [index, setIndex] = useState("");
    const [variations, setVariations] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleGenerateVariations = async () => {
        const qNum = parseInt(index, 10);
        if (qNum < 1 || qNum > (questions?.length || 0)) {
            return alert("Invalid question number");
        }

        const question = questions[qNum - 1];

        setLoading(true);
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/variations`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ question }),
        });

        const data = await res.json();
        setVariations(data.variations);
        setLoading(false);
    };

    return (
        <div className="mt-8 bg-gray-900/30 backdrop-blur-xl border border-white/5 rounded-3xl p-8 shadow-2xl w-full max-w-4xl mx-auto">
            
            {/* Header */}
            <div className="mb-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <span className="text-blue-400">✨</span> Question Variations
                </h3>
                <p className="text-gray-400 text-sm mt-1">
                    Select a question number to explore different ways to ask it.
                </p>
            </div>

            {/* Modern Integrated Input & Button */}
            <div className="relative group max-w-xl">
                {/* Internal Icon */}
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                    <span className="text-gray-500 font-mono text-lg group-focus-within:text-blue-400 transition-colors duration-300">
                        #
                    </span>
                </div>
                
                {/* Input Field (Arrows Removed) */}
                <input
                    type="number"
                    min="1"
                    value={index}
                    onChange={(e) => setIndex(e.target.value)}
                    placeholder="Enter question number..."
                    onKeyDown={(e) => e.key === 'Enter' && index && !loading && handleGenerateVariations()}
                    className="w-full bg-[#0a0a0c] border border-gray-700/60 hover:border-gray-600 rounded-2xl py-4 pl-11 pr-[140px] text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 shadow-inner [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                
                {/* Integrated Button */}
                <div className="absolute inset-y-1.5 right-1.5 flex items-center">
                    <button
                        onClick={handleGenerateVariations}
                        disabled={loading || !index}
                        className={`px-6 h-full font-medium rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
                            loading || !index
                            ? "bg-gray-800/50 text-gray-500 cursor-not-allowed" 
                            : "bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:shadow-lg hover:shadow-blue-500/25 hover:scale-[1.02]"
                        }`}
                    >
                        {loading ? (
                            <svg className="w-5 h-5 animate-spin text-blue-400" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : (
                            "Generate"
                        )}
                    </button>
                </div>
            </div>

            {/* Results */}
            {!loading && variations.length > 0 && (
                <div className="mt-8 pt-6 border-t border-white/5 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
                        Generated Alternatives
                    </h4>
                    <ul className="flex flex-col gap-3">
                        {variations.map((v, i) => (
                            <li 
                                key={i}
                                className="bg-[#0a0a0c]/80 border border-white/5 rounded-xl p-4 text-gray-300 text-sm leading-relaxed shadow-sm hover:border-gray-700 transition-all flex items-start gap-4"
                            >
                                <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold border border-blue-500/20 mt-0.5">
                                    {i + 1}
                                </span>
                                <span>{v}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default QuestionVariator;