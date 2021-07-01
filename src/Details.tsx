import { useContext } from "react";
import { withRouter } from "react-router";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import { useTheme } from "./ThemeContext";
import Modal from "./Modal";
import { useEffect, useState } from "react";

type Pet = {
  id: string;
  animal: string;
  name: string;
  breed: string;
  images: string[];
  city: string;
  state: string;
  description: string;
};

const Details = (props) => {
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [pet, setPet] = useState<Pet | undefined>(undefined);
  const { theme } = useTheme();

  const requestPetData = async () => {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?id=${props.match.params.id}`
    );
    const json = await res.json();

    setLoading(false);
    setPet(json.pets[0]);
  };

  useEffect(() => {
    requestPetData();
  });

  const toogleModal = () => setShowModal(!showModal);

  const adopt = () => (window.location.href = "http://bit.ly/pet-adopt");

  if (loading) {
    return <h2>loading ...</h2>;
  }

  return (
    <div className="details">
      <Carousel images={pet.images} />
      <div>
        <h1>{pet.name}</h1>
        <h2>{`${pet.animal} - ${pet.breed} - ${pet.city}, ${pet.state}`}</h2>
        <button onClick={toogleModal} style={{ backgroundColor: theme }}>
          Adopt {pet.name}
        </button>
        <p>{pet.description}</p>
        {showModal ? (
          <Modal>
            <div>
              <h1>Would you like to adopt {pet.name}?</h1>
              <div className="buttons">
                <button onClick={adopt} style={{ backgroundColor: theme }}>
                  Yes
                </button>
                <button
                  onClick={toogleModal}
                  style={{ backgroundColor: theme }}
                >
                  No
                </button>
              </div>
            </div>
          </Modal>
        ) : null}
      </div>
    </div>
  );
};

const DetailsWithRouter = withRouter(Details);

export default function DetailsWithErrorBoundary() {
  return (
    <ErrorBoundary>
      <DetailsWithRouter />
    </ErrorBoundary>
  );
}
