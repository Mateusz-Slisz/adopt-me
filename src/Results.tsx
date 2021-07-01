import Pet from "./Pet";

type ResultsProps = {
  pets: {
    id: string;
    animal: string;
    name: string;
    breed: string;
    images: string[];
    city: string;
    state: string;
  }[];
};

const Results = ({ pets }: ResultsProps) => {
  return (
    <div className="search">
      {!pets.length ? (
        <h2>No Pets Found</h2>
      ) : (
        pets.map((pet) => (
          <Pet
            animal={pet.animal}
            key={pet.id}
            name={pet.name}
            breed={pet.breed}
            images={pet.images}
            location={`${pet.city}, ${pet.state}`}
            id={pet.id}
          />
        ))
      )}
    </div>
  );
};

export default Results;
