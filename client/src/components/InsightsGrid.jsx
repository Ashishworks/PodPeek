import SpotlightCard from "../animations/SpotLightCard";

const InsightsGrid = ({ aiSections }) => {
  const cleanMarkdown = (text) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '$1')   // bold
      .replace(/\*(.*?)\*/g, '$1')       // italic
      .replace(/`(.*?)`/g, '$1')         // inline code
      .replace(/^-+$/gm, '')             // dashes
      .trim();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-transparent">
      {Object.entries(aiSections).map(([title, content]) => (
        <div key={title} className="bg-black p-4  rounded-3xl shadow-sm bg-transparent">
          <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(0, 229, 255, 0.4)">
          <h3 className="text-lg font-bold mb-2 flex justify-center mb-8">{title}</h3>
          <p className="text-sm  whitespace-pre-wrap flex justify-center mb-4">
            {cleanMarkdown(content)}
          </p>
          </SpotlightCard>
        </div>
      ))}
    </div>
  );
};

export default InsightsGrid;
