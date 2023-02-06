import { VStack, Button, Box } from "@chakra-ui/react";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";

import { Loader } from "../components/Loader";
import { Error } from "../components/Error";
import { SearchInput } from "../components/SearchInput";
import { NumberSlider } from "../components/NumberSlider";
import { ScrollToTopButton } from "../components/ScrollToTopButton";
import { JokesListing } from "../components/JokesListing";
import { generateRandomJokes } from "../utils/generateRandomJokes";
import { useJokes } from "../hooks/useJokes";

export function JokesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const toast = useToast();

  const {
    jokes, // TODO rename
    randomJokes,
    isLoading,
    error,
    selectedJokeCount,
    setIsLoading,
    setError,
    setRandomJokes,
    setSelectedJokeCount,
  } = useJokes();

  function handleGetNewJokeClick() {
    setIsLoading(true);
    setError(null);
    setRandomJokes(generateRandomJokes(jokes, selectedJokeCount));
    setIsLoading(false);
    toast({
      description: "Successfully generated jokes",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
  }

  const filteredJokes = searchTerm === ""
    ? randomJokes
    : jokes.result
      .filter(({ value }) =>
        value.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .slice(0, selectedJokeCount);

  return (
    <Box px={5}>
      <VStack>
        <SearchInput
          placeholderText="Search for jokes"
          onChange={setSearchTerm}
        />
        <NumberSlider
          inputValue={selectedJokeCount}
          onChangeEnd={(value) => {
            setSelectedJokeCount(value);
            setRandomJokes(generateRandomJokes(jokes, value));
          }}
        />
        <Button variant="outline" size="lg" my={2} onClick={handleGetNewJokeClick}>
          Get new Joke
        </Button>
        {isLoading && <Loader />}
        {error && <Error message={error} />}
        {!isLoading && !error && <JokesListing filterJokes={filteredJokes} />}
      </VStack>
      <ScrollToTopButton />
    </Box>
  );
}
