import { VStack, Box, useToast } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { JokeCard } from "../components/JokeCard";
import { getData } from "../api/getData";
import { useParams } from "react-router-dom";
import { SearchInput } from "../components/SearchInput";
import { Loader } from "../components/Loader";
import { Error } from "../components/Error";
import { ScrollToTopButton } from "../components/ScrollToTopButton";

const INITIAL_STATE = {
  data: [],
  isLoading: false,
  isError: false,
};

export default function CategoryJokesPage() {
  const { category } = useParams();
  const [jokes, setJokes] = useState(INITIAL_STATE);
  const [categoryJokes, setCategoryJokes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const numberOfImages = 10;
  const toast = useToast();

  function generateCategoryJokes(jokes) {
    const categoryJokes = jokes.result.filter(
      (joke) => joke.categories[0] === category
    );
    setCategoryJokes(categoryJokes);
  }

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    getData("search?query=chuck")
      .then((data) => {
        setJokes({ data, isLoading: false, isError: false });
        generateCategoryJokes(data);
      })
      .catch((err) => {
        setError(err);
        toast({
          description: "Somethink went wrong",
          status: "error",
          duration: 4000,
          isClosable: false,
        });
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
            ? categoryJokes.map((joke) => (
                <JokeCard
                  key={joke.id}
                  joke={joke.value}
                  category={joke.categories}
                  randomImage={`/ChuckNorrisImage/chuck${
                    Math.floor(Math.random() * numberOfImages) + 1
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
                    joke={joke.value}
                    category={joke.categories}
                    randomImage={`/ChuckNorrisImage/chuck${
                      Math.floor(Math.random() * numberOfImages) + 1
                    }.jpeg`}
                  />
                ))}
        </Box>
      </VStack>
      <ScrollToTopButton />
    </Box>
  );
}
