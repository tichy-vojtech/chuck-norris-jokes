import { VStack, Box } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import JokeCard from "../components/JokeCard";
import { getJoke } from "../api/getJoke";
import { useParams } from "react-router-dom";
import chuck1 from "../assets/chuck1.jpeg";
import chuck2 from "../assets/chuck2.jpeg";
import chuck3 from "../assets/chuck3.jpeg";
import chuck4 from "../assets/chuck4.jpeg";
import chuck5 from "../assets/chuck5.jpeg";
import chuck6 from "../assets/chuck6.jpeg";
import chuck7 from "../assets/chuck7.jpeg";
import chuck8 from "../assets/chuck8.jpeg";
import chuck9 from "../assets/chuck9.jpeg";
import chuck10 from "../assets/chuck10.jpeg";
import SearchInput from "../components/SearchInput";
import Loader from "../components/Loader";
import Error from "../components/Error";

const images = [
  chuck1,
  chuck2,
  chuck3,
  chuck4,
  chuck5,
  chuck5,
  chuck6,
  chuck7,
  chuck8,
  chuck9,
  chuck10,
];

const INITIAL_STATE = {
  data: [],
  isLoading: false,
  isError: false,
};

export default function CategoryJokesPage() {
  const { category } = useParams();
  const [jokes, setJokes] = useState(INITIAL_STATE);
  const [randomJokes, setRandomJokes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  function generateRandomJokes(jokes) {
    console.log(jokes);
    const categoryJokes = jokes.result.filter(
      (joke) => joke.categories[0] === category
    );

    setRandomJokes(categoryJokes);
  }

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    getJoke()
      .then((data) => {
        setJokes({ data, isLoading: false, isError: false });
        generateRandomJokes(data);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  return (
    <Box px={5}>
      <VStack>
        <SearchInput
          placeholderText="Search for jokes"
          onChange={(value) => {
            setSearchTerm(value);
          }}
        />
        {isLoading && <Loader />}
        {error && <Error message={error} />}
        <Box display="flex" gap={10} flexWrap="wrap" justifyContent="center">
          {searchTerm === ""
            ? randomJokes.map((joke) => (
                <JokeCard
                  key={joke.id}
                  theJoke={joke.value}
                  category={joke.categories}
                  randomImage={
                    images[Math.floor(Math.random() * images.length)]
                  }
                />
              ))
            : jokes.result
                ?.filter(
                  (joke) =>
                    joke.value
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) || searchTerm === ""
                )
                .slice(0, 25)
                .map((joke) => (
                  <JokeCard
                    key={joke.id}
                    theJoke={joke.value}
                    category={joke.categories}
                    randomImage={
                      images[Math.floor(Math.random() * images.length)]
                    }
                  />
                ))}
        </Box>
      </VStack>
    </Box>
  );
}
