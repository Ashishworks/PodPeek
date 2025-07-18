import Aurora from "../animations/Aurora";
import GlareHover from "../animations/GlareHover";


const PersonCard = ({ person }) => {
  if (!person) return null;

  return (
    <div className="relative p-2 rounded-xl overflow-hidden text-white flex justify-center" >
      <div className="absolute inset-0 -z-10">
        <Aurora
          colorStops={["#003795", "#003795", "#003795"]}
          blend={1}
          amplitude={2.0}
          speed={1}
        />
      </div>
      <GlareHover
        glareColor="#ffffff"
        glareOpacity={0.3}
        glareAngle={-30}
        glareSize={300}
        transitionDuration={1000}
        playOnce={false}>
        <h2 className="text-2xl font-semibold mb-2 bg-transparent">Selected Person</h2>

        <p><strong>Name:</strong> {person.name}</p>
        <p><strong>Description:</strong> {person.description}</p>
        <p>
          <strong>Source:</strong>{" "}
          <a
            href={person.url}
            target="_blank"
            rel="noreferrer"
          >
            {person.url}
          </a>
        </p>
      </GlareHover>
    </div>
  );
};

export default PersonCard;
