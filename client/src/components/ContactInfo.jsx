import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

const ContactInfo = ({ selected }) => {
  const [contactInfo, setContactInfo] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setContactInfo("");
  }, [selected]);

  const handleGenerate = async () => {
    if (!selected) return;
    setLoading(true);

    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/contact-info`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: selected.name,
        description: selected.description,
      }),
    });

    const data = await res.json();
    setContactInfo(data.output);
    setLoading(false);
  };

  return (
    <div className="mt-4  ">
      <button
        onClick={handleGenerate}
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
      >
        📇 Generate Contact Info
      </button>

      {loading && (
        <p className="text-sm text-gray-500 mt-2">Fetching contact info...</p>
      )}

      {contactInfo && (
        <div className="mt-4 bg-white p-4 rounded shadow-sm bg-transparent">
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
  );
};

export default ContactInfo;
