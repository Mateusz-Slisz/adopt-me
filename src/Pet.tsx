import { Link } from "react-router-dom";

export type PetType = {
  id: string;
  animal: string;
  name: string;
  breed: string;
  images: string[];
  city: string;
  state: string;
  description: string;
};

type PetProps = {
  pet: PetType;
};

const Pet = ({ pet }: PetProps) => {
  let heroImage = "http://pets-images.dev-apis.com/pets/none.jpg";

  if (pet.images.length) {
    heroImage = pet.images[0];
  }

  return (
    <Link to={`/details/${pet.id}`} className="pet">
      <div className="image-container">
        <img src={heroImage} alt={pet.name} />
      </div>
      <div className="info">
        <h1>{pet.name}</h1>
        <h2>{`${pet.animal} - ${pet.breed} - ${pet.city}, ${pet.state}`}</h2>
      </div>
    </Link>
  );
};

export default Pet;
