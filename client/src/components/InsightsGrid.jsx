import { FadeInSection } from "../animations/FadeInSection";
import Orb from "../animations/Orb";
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
    <div className="relative w-full h-full">
      <div className="absolute inset-0 z-0">
        <Orb
          hoverIntensity={0.5}
          rotateOnHover={true}
          hue={305}
          forceHoverState={true}
        />
      </div>

      <FadeInSection>
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
        {Object.entries(aiSections).map(([title, content]) => (
          <div key={title} className="flex">
            <div className="bg-black m-4 rounded-3xl shadow-sm w-full flex flex-col justify-between">
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
      </FadeInSection>
    </div>

  );
};

export default InsightsGrid;
