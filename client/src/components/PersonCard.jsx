const PersonCard = ({ person }) => {
  if (!person) return null;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Selected Person</h2>
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
