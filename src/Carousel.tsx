import { useState } from "react";

type CarouselProps = {
  images: string[];
};

const Carousel = ({
  images = ["http://pets-images.dev-apis.com/pets/none.jpg"],
}: CarouselProps) => {
  const [active, setActive] = useState(0);

  const handleIndexClick = (event) => {
    setActive(+event.target.dataset.index);
  };

  return (
    <div className="carousel">
      <img src={images[active]} alt="animal" />
      <div className="carousel-smaller">
        {images.map((photo, index) => (
          // eslint-disable-next-line
          <img
            key={photo}
            src={photo}
            data-index={index}
            onClick={handleIndexClick}
            className={index == active ? "active" : ""}
            alt="animal thumbnail"
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
