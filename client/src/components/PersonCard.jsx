import Aurora from "../animations/Aurora";
import GlareHover from "../animations/GlareHover";

const PersonCard = ({ person }) => {
  if (!person) return null;

  return (
    /* CHANGED: Boosted width constraint to max-w-5xl (1024px) to fill large desktop screens */
    <div className="relative w-full max-w-6xl mx-auto p-1 group">
      
      {/* Dynamic Animated Background Layer */}
      <div className="absolute inset-0 -z-10 scale-105 group-hover:scale-110 transition-transform duration-700 overflow-hidden rounded-2xl">
        <Aurora
          colorStops={["#0052D4", "#4364F7", "#6FB1FC"]}
          blend={0.8}
          amplitude={1.5}
          speed={0.8}
        />
      </div>

      <GlareHover
        width="100%"
        height="auto"
        background="rgba(3, 7, 18, 0.4)"
        borderRadius="1rem"
        borderColor="rgba(255, 255, 255, 0.1)"
        glareColor="#ffffff"
        glareOpacity={0.15}
        glareAngle={45}
        glareSize={400}
        transitionDuration={400}
        playOnce={false}
      >
        {/* Glassmorphic Content Wrapper */}
        <div className="w-full p-6 sm:p-10 backdrop-blur-xl text-white flex flex-col text-left gap-5 transition-all duration-300 group-hover:border-white/20">
          
          <div className="space-y-1">
            <span className="text-xs font-semibold tracking-wider text-blue-400 uppercase block">
              Selected Profile
            </span>
            {/* Expanded title typography to match a larger canvas */}
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white leading-tight break-words">
              {person.name}
            </h2>
          </div>

          {person.description && (
            /* Using 'text-base sm:text-lg' to maximize readability on high-resolution monitors */
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light break-words whitespace-normal">
              {person.description}
            </p>
          )}

          {person.url && (
            <div className="pt-4 mt-2 border-t border-white/5 w-full">
              <a
                href={person.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors duration-200 group/link gap-1.5"
              >
                <span>View Source Material</span>
                <svg 
                  className="w-4 h-4 transform transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          )}

        </div>
      </GlareHover>
    </div>
  );
};

export default PersonCard;