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
        <div key={title} className="bg-black p-4 border-4 rounded-3xl shadow-sm bg-transparent">
          <h3 className="text-md font-bold mb-2 text-white">{title}</h3>
          <p className="text-sm text-white whitespace-pre-wrap">
            {cleanMarkdown(content)}
          </p>
        </div>
      ))}
    </div>
  );
};

export default InsightsGrid;
