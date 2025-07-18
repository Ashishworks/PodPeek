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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
  {Object.entries(aiSections).map(([title, content]) => (
    <div key={title} className="flex">
      <div className="bg-black p-4 rounded-3xl shadow-sm w-full flex flex-col justify-between">
        <SpotlightCard
          className="custom-spotlight-card h-full flex flex-col justify-between"
          spotlightColor="rgba(0, 229, 255, 0.4)"
        >
          <h3 className="text-xl font-bold mb-2 text-center underline mb-4">{title}</h3>
          <p className="text-sm whitespace-pre-wrap ">{cleanMarkdown(content)}</p>
        </SpotlightCard>
      </div>
    </div>
  ))}
</div>

  );
};

export default InsightsGrid;
