import { VStack, Button, Box } from "@chakra-ui/react";
import { useState } from "react";
import { JokeCard } from "../components/JokeCard";
import { Loader } from "../components/Loader";
import { Error } from "../components/Error";
import { SearchInput } from "../components/SearchInput";
import "../App.css";
import { useToast } from "@chakra-ui/react";

import { NumberSlider } from "../components/NumberSlider";
import { ScrollToTopButton } from "../components/ScrollToTopButton";
import { generateRandomJokes } from "../utils/generateRandomJokes";
import { useJokes } from "../hooks/useJokes";

export function JokesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const numberOfImages = 10;
  const toast = useToast();

  const {
    jokes,
    randomJokes,
    isLoading,
    error,
    sliderValue,
    setIsLoading,
    setError,
    setRandomJokes,
    setSliderValue,
  } = useJokes();

  function handleClick() {
    setIsLoading(true);
    setError(null);
    setRandomJokes(generateRandomJokes(jokes, sliderValue));
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
            setRandomJokes(generateRandomJokes(jokes, val));
          }}
        />

        <Button colorScheme="blue" size="lg" my={2} onClick={handleClick}>
          Get new Joke
        </Button>
        {isLoading && <Loader />}
        {error && <Error message={error} />}
        <Box display="flex" gap={10} flexWrap="wrap" justifyContent="center">
          {(searchTerm === "" ? randomJokes : jokes.result)
            .filter(
              (joke) =>
                joke.value.toLowerCase().includes(searchTerm.toLowerCase()) ||
                searchTerm === ""
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
