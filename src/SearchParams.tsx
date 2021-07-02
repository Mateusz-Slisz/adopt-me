import { useState, useEffect } from "react";
import { Theme, useTheme } from "./ThemeContext";
import { PetType } from "./Pet";
import { useForm } from "react-hook-form";
import useBreedList from "./useBreedList";
import Results from "./Results";

type FormValues = {
  location: string;
  animal: string;
  breed: string;
};

const FormDefaultValues = {
  animal: "",
  breed: "",
  location: "Seattle, WA",
};

const ANIMALS = ["bird", "cat", "dog", "rabbit", "dino"];

const SearchParams = () => {
  const [pets, setPets] = useState<PetType[]>([]);
  const { register, watch, handleSubmit } = useForm<FormValues>({
    defaultValues: FormDefaultValues,
  });
  const [location, animal, breed] = watch(["location", "animal", "breed"]);
  const { theme, setTheme } = useTheme();
  const [breeds] = useBreedList(animal);

  const requestPets = async () => {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    );
    const json = await res.json();

    setPets(json.pets);
  };

  useEffect(() => {
    requestPets();
  }, []);

  return (
    <div className="search-params">
      <form
        onSubmit={handleSubmit(() => {
          requestPets();
        })}
      >
        <label htmlFor="location">
          Location
          <input
            {...register("location")}
            id="location"
            placeholder="Location"
          />
        </label>
        <label htmlFor="animal">
          Animal
          <select {...register("animal")} id="animal">
            <option />
            {ANIMALS.map((animal) => (
              <option value={animal} key={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select {...register("breed")} id="breed">
            <option />
            {breeds.map((breed) => (
              <option value={breed} key={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="theme">
          ThemeContext
          <select
            id="theme-context"
            value={theme}
            onChange={(e) => setTheme(e.target.value as Theme)}
            onBlur={(e) => setTheme(e.target.value as Theme)}
          >
            {Object.entries(Theme).map(([key, value]) => (
              <option value={value} key={value}>
                {key}
              </option>
            ))}
          </select>
        </label>
        <button style={{ backgroundColor: theme }}>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
