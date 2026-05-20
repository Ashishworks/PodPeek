import { useRef } from "react";
import html2pdf from "html2pdf.js";
import { LoaderOne } from "../animations/Loader";
import ShinyText from "../animations/ShinyText";
import { FadeInSection } from "../animations/FadeInSection";

const ScriptBox = ({
  selected,
  script,
  setScript,
  generating,
  setGenerating,
  numQuestions,
  setNumQuestions,
  setScriptQuestions,
}) => {
  const scriptRef = useRef();

  const handleScriptGenerate = async () => {
    if (!selected) return;
    setGenerating(true);
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/script`, {
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
    const extractedQuestions = data.output
      .split("\n")
      .filter((line) => /^\d+\.\s/.test(line)) // lines like "1. What is your name?"
      .map((line) => line.replace(/^\d+\.\s*/, "").trim());
    setScriptQuestions(extractedQuestions);
  };

  const handleDownloadPDF = () => {
    const element = scriptRef.current;
    const opt = {
      margin: 0.5,
      filename: `${selected.name}_PodcastScript.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    html2pdf().set(opt).from(element).save();
  };

  const cleanMarkdown = (text) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .replace(/\*(.*?)\*/g, "$1")
      .replace(/`(.*?)`/g, "$1")
      .replace(/^-+$/gm, "")
      .trim();
  };

  return (
    <div className="mt-8 flex flex-col gap-6 w-full max-w-4xl mx-auto">
      
      {/* Controls Section */}
      <div className="bg-gray-900/40 backdrop-blur-md border border-gray-800 rounded-2xl p-6 shadow-lg">
        {generating ? (
          <div className="flex flex-col items-center justify-center py-8 gap-4">
            <ShinyText 
              text="Designing script..." 
              disabled={false} 
              speed={5} 
              className="text-lg font-medium tracking-wide" 
            />
            <LoaderOne />
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            
            {/* Slider Control */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <label
                  htmlFor="questionSlider"
                  className="text-sm font-medium text-gray-300"
                >
                  Number of Questions
                </label>
                <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm font-bold border border-purple-500/30">
                  {numQuestions}
                </span>
              </div>
              <input
                id="questionSlider"
                type="range"
                min="1"
                max="40"
                value={numQuestions}
                onChange={(e) => setNumQuestions(Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500 hover:accent-purple-400 transition-all"
              />
            </div>

            {/* Generate Button */}
            <div className="flex justify-center pt-4">
  <button
    onClick={handleScriptGenerate}
    className="group relative flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-3.5 bg-gray-950 hover:bg-gray-900 text-purple-400 hover:text-purple-300 font-medium tracking-wide rounded-xl transition-all duration-300 border border-purple-500/20 hover:border-purple-500/40 shadow-[0_4px_20px_rgba(147,51,234,0.05)] hover:shadow-[0_4px_30px_rgba(147,51,234,0.15)] active:scale-[0.98]"
  >
    <span className="text-base transform group-hover:scale-110 transition-transform duration-300">
      🎤
    </span>
    <span>Generate Podcast Script</span>
  </button>
</div>
          </div>
        )}
      </div>

      {/* Script Output Section */}
      {script && (
        <FadeInSection>
          <div className="flex flex-col gap-4">
            
            {/* Script Display */}
            <div 
              ref={scriptRef} 
              className="bg-[#0f1115] border border-gray-800 rounded-2xl p-8 shadow-2xl relative overflow-hidden"
            >
              {/* Subtle top gradient accent */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-indigo-500"></div>
              
              <h3 className="text-xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 flex items-center gap-2">
                📝 Podcast Script
              </h3>
              
              <p className="text-gray-300 text-base leading-relaxed whitespace-pre-wrap break-words font-sans">
                {cleanMarkdown(script)}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end">
              <button
                onClick={handleDownloadPDF}
                className="px-6 py-2.5 bg-gray-800/80 hover:bg-gray-700 border border-gray-600 text-white text-sm font-medium rounded-xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center shadow-md backdrop-blur-sm"
              >
                📥 Download as PDF
              </button>
            </div>
            
          </div>
        </FadeInSection>
      )}
    </div>
  );
};

export default ScriptBox;