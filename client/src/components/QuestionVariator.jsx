import { useState } from "react";

const QuestionVariator = ({ questions }) => {
    const [index, setIndex] = useState("");
    const [variations, setVariations] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleGenerateVariations = async () => {
        const qNum = parseInt(index, 10);
        console.log(qNum);
        console.log("qNum:", qNum);
        console.log("questions:", questions);
        console.log("questions.length:", questions.length);
        if (qNum < 1 || qNum > questions.length) {
            return alert("Invalid question number");
        }

        const question = questions[qNum - 1];

        setLoading(true);
        const res = await fetch("http://localhost:5000/api/variations", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ question }),
        });

        const data = await res.json();
        setVariations(data.variations);
        setLoading(false);
    };


    return (
        <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">🔁 Generate Question Variations</h3>
            <input
                type="number"
                value={index}
                onChange={(e) => setIndex(e.target.value)}
                placeholder="Enter question number"
                className="border px-2 py-1 rounded mr-2"
            />
            <button
                onClick={handleGenerateVariations}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            >
                Generate
            </button>

            {loading && <p className="text-sm mt-2 text-gray-500">Generating variations...</p>}

            {variations.length > 0 && (
                <ul className="mt-4 list-disc list-inside text-sm text-gray-800">
                    {variations.map((v, i) => (
                        <li key={i}>{v}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default QuestionVariator;
