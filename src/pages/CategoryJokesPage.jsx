import { VStack, Box } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import JokeCard from "../components/JokeCard";
import { getJoke } from "../api/getJoke";
import { useParams } from "react-router-dom";
import SearchInput from "../components/SearchInput";
import Loader from "../components/Loader";
import Error from "../components/Error";

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
  const numberOfImagies = 10;
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
                  randomImage={`/ChuckNorrisImage/chuck${
                    Math.floor(Math.random() * numberOfImagies) + 1
                  }.jpeg`}
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
                    randomImage={`/ChuckNorrisImage/chuck${
                      Math.floor(Math.random() * numberOfImagies) + 1
                    }.jpeg`}
                  />
                ))}
        </Box>
      </VStack>
    </Box>
  );
}
