import Pet, { PetType } from "./Pet";

type ResultsProps = {
  pets: PetType[];
};

const Results = ({ pets }: ResultsProps) => {
  return (
    <div className="search">
      {!pets.length ? (
        <h2>No Pets Found</h2>
      ) : (
        pets.map((pet) => <Pet pet={pet} key={pet.id} />)
      )}
    </div>
  );
};

export default Results;
