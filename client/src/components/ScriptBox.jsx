import { useRef } from "react";
import html2pdf from "html2pdf.js";

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
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        🎤 Generate Podcast Script
      </button>

      <div className="mb-4">
        <label
          htmlFor="questionSlider"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
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
            <div className="bg-white border p-4 rounded shadow whitespace-pre-wrap">
              <h3 className="text-lg font-semibold mb-2">📝 Podcast Script</h3>
              <p className="text-sm text-gray-800 whitespace-pre-wrap break-words">
                {cleanMarkdown(script)}
              </p>
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
  );
};

export default ScriptBox;
