import { VStack, Button, Box } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { JokeCard } from "../components/JokeCard";
import { getData } from "../api/getData";
import { Loader } from "../components/Loader";
import { Error } from "../components/Error";
import { SearchInput } from "../components/SearchInput";
import "../App.css";
import { useToast } from "@chakra-ui/react";

import { NumberSlider } from "../components/NumberSlider";
import { ScrollToTopButton } from "../components/ScrollToTopButton";
import { GenerateRandomJokes } from "../components/GenerateRandomJokes";

export function JokesPage() {
  const INITIAL_STATE = {
    data: [],
    isLoading: false,
    isError: false,
  };

  const [jokes, setJokes] = useState(INITIAL_STATE);
  const [randomJokes, setRandomJokes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sliderValue, setSliderValue] = useState(25);

  const numberOfImages = 10;
  const toast = useToast();

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    getData("search?query=chu")
      .then((data) => {
        setJokes(data);
        setRandomJokes(GenerateRandomJokes(data, sliderValue));
      })
      .catch((err) => {
        setError(err.message);
        toast({
          description: "Something went wrong",
          status: "error",
          duration: 4000,
          isClosable: false,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleClick() {
    setIsLoading(true);
    setError(null);
    setRandomJokes(GenerateRandomJokes(jokes, sliderValue));
    setIsLoading(false);
    toast({
      description: "Successfully generated jokes",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
  }

  return (
    <Box px={5}>
      <VStack>
        <SearchInput
          placeholderText="Search for jokes"
          onChange={(value) => {
            setSearchTerm(value);
          }}
        />

        <NumberSlider
          inputValue={sliderValue}
          onChangeEnd={(val) => {
            setSliderValue(val);
            setRandomJokes(GenerateRandomJokes(jokes, val));
          }}
        />

        <Button colorScheme="blue" size="lg" my={2} onClick={handleClick}>
          Get new Joke
        </Button>
        {isLoading && <Loader />}
        {error && <Error message={error} />}
        <Box display="flex" gap={10} flexWrap="wrap" justifyContent="center">
          {searchTerm === ""
            ? randomJokes.map((joke) => (
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
