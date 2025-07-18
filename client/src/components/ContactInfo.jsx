import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import ShinyText from "../animations/ShinyText";
import { LoaderOne } from "../animations/Loader";
import SpotlightCard from "../animations/SpotLightCard";


const ContactInfo = ({ selected }) => {
  const [contactInfo, setContactInfo] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setContactInfo("");
  }, [selected]);

  const fetchWithRetry = async (url, options = {}, retries = 2, delay = 2000) => {
    for (let i = 0; i <= retries; i++) {
      try {
        const res = await fetch(url, options);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res;
      } catch (err) {
        if (i === retries) throw err;
        console.warn(`Retrying in ${delay}ms... (${i + 1}/${retries})`);
        await new Promise((r) => setTimeout(r, delay));
      }
    }
  };

  const handleGenerate = async () => {
    if (!selected) return;
    setLoading(true);

    const res = await fetchWithRetry(
      `${import.meta.env.VITE_BACKEND_URL}/api/contact-info`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: selected.name,
          description: selected.description,
        }),
      },
      2, // retries
      2000 // 2 seconds delay
    );

    const data = await res.json();
    setContactInfo(data.output);
    setLoading(false);
  };

  return (
    <div className="my-4">
      {!loading && !contactInfo &&(
          <div className="flex justify-center">
      <button
        onClick={handleGenerate}
        className="px-2 py-2 mx-4 border-4 border-purple-800 text-purple-400 rounded-2xl hover:scale-105 hover:text-white transition"
      >
        Generate Contact Info
      </button>
      </div>
      )}
      
      {loading && (
        <div className="my-4 mx-4 flex flex-col ">
          <div className="flex justify-center mb-2">
          <ShinyText text="Fetching Contact Info..." disabled={false} speed={5} className='custom-class' />
          </div>
          <div className="flex justify-center">
          <LoaderOne />
          </div>
        </div>
      )}


      {contactInfo && (
        <div className="mt-4 p-4">
          <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(128, 0, 255, 0.4)">
          <h3 className="text-lg text-white font-semibold mb-2">📬 Contact Info</h3>
          <div className="text-white">
            <ReactMarkdown
              components={{
                a: ({ node, ...props }) => (
                  <a
                    {...props}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white"
                  />
                ),
              }}
            >
              {contactInfo}
            </ReactMarkdown>
          </div>
          </SpotlightCard>
        </div>
      )}
    </div>
  );
};

export default ContactInfo;
