import { VStack, Button, Box } from "@chakra-ui/react";
import { useState } from "react";
import { Loader } from "../components/Loader";
import { Error } from "../components/Error";
import { SearchInput } from "../components/SearchInput";
import "../App.css";
import { useToast } from "@chakra-ui/react";

import { NumberSlider } from "../components/NumberSlider";
import { ScrollToTopButton } from "../components/ScrollToTopButton";
import { generateRandomJokes } from "../utils/generateRandomJokes";
import { useJokes } from "../hooks/useJokes";
import { JokesListing } from "../components/JokesListing";

export function JokesPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const toast = useToast();

  const {
    jokes, //rename
    randomJokes,
    isLoading,
    error,
    sliderValue, //rename
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

  function filterJokes() {
    return searchTerm === ""
      ? randomJokes
      : jokes.result
          .filter(({ value }) =>
            value.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .slice(0, sliderValue);
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

        <Button variant="outline" size="lg" my={2} onClick={handleClick}>
          Get new Joke
        </Button>
        {isLoading && <Loader />}
        {error && <Error message={error} />}

        <JokesListing filterJokes={filterJokes()} />
      </VStack>
      <ScrollToTopButton />
    </Box>
  );
}
