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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {Object.entries(aiSections).map(([title, content]) => (
        <div key={title} className="bg-white p-4 border rounded shadow-sm">
          <h3 className="text-md font-bold mb-2">{title}</h3>
          <p className="text-sm text-gray-800 whitespace-pre-wrap">
            {cleanMarkdown(content)}
          </p>
        </div>
      ))}
    </div>
  );
};

export default InsightsGrid;
