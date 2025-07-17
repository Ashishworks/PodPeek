import { useRef } from "react";
import html2pdf from "html2pdf.js";
import { LoaderOne } from "../animations/Loader";

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
      .filter(line => /^\d+\.\s/.test(line)) // lines like "1. What is your name?"
      .map(line => line.replace(/^\d+\.\s*/, "").trim());
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
    <div className="mt-6">
      <button
        onClick={handleScriptGenerate}
        className="px-2 py-2 border-4 border-blue-500 text-blue-500 rounded-2xl hover:bg-blue-500 hover:text-white transition"
      >
        🎤 Generate Podcast Script
      </button>

      <div className="mb-4">
        <label
          htmlFor="questionSlider"
          className="block text-sm font-medium text-white mb-1 pt-2"
        >
          🎯 Number of Questions: <span className="font-bold text-white">{numQuestions}</span>
        </label>
        <input
          id="questionSlider"
          type="range"
          min="1"
          max="40"
          value={numQuestions}
          onChange={(e) => setNumQuestions(Number(e.target.value))}
          className="w-full"
        />
      </div>

      {generating && (
        <>
        <p className="text-sm text-gray-500 mt-2">Generating script... </p>
        <LoaderOne/>
        </>
      )}

      {script && (
        <>
          <div className="mt-6" ref={scriptRef}>
            <div className="bg-black border-4 p-4 rounded-2xl shadow whitespace-pre-wrap mb-2">
              <h3 className="text-lg font-semibold mb-2 text-white">📝 Podcast Script</h3>
              <p className="text-sm text-white whitespace-pre-wrap break-words">
                {cleanMarkdown(script)}
              </p>
            </div>
          </div>
          <div className="flex gap-4 mb-4 ">
            <button
              onClick={handleDownloadPDF}
              className="px-2 py-2 border-4 border-purple-500 text-purple-500 rounded-2xl hover:bg-purple-500 hover:text-white transition"
            >
              📥 Download as PDF
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ScriptBox;
