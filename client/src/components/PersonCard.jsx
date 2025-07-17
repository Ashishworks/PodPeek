import Aurora from "../animations/Aurora";


const PersonCard = ({ person }) => {
  if (!person) return null;

  return (
    <div className="relative p-4 rounded-xl overflow-hidden border text-white">
      {/* <div className="absolute inset-0 -z-10">
        <Aurora
          colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </div> */}
      <h2 className="text-xl font-semibold mb-2 bg-transparent">Selected Person</h2>
      {person.image && (
        <img
          src={person.image}
          alt={person.name}
          className="w-10 h-10 mb-2 rounded"
        />
      )}
      <p><strong>Name:</strong> {person.name}</p>
      <p><strong>Description:</strong> {person.description}</p>
      <p>
        <strong>Source:</strong>{" "}
        <a
          className="text-blue-600"
          href={person.url}
          target="_blank"
          rel="noreferrer"
        >
          {person.url}
        </a>
      </p>

    </div>
  );
};

export default PersonCard;
