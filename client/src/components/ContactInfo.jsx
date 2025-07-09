import React from "react";
import ReactMarkdown from "react-markdown";

const ContactInfo = ({ contactInfo, contactLoading, onGenerate }) => {
  return (
    <div className="mt-4">
      <button
        onClick={onGenerate}
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
  );
};

export default ContactInfo;
