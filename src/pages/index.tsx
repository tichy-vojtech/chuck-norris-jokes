import { VStack, Button, Box } from "@chakra-ui/react";
import { useState } from "react";

import { Loader } from "../components/Loader";
import { Error } from "../components/Error";
import { SearchInput } from "../components/SearchInput";
import { NumberSlider } from "../components/NumberSlider";
import { ScrollToTopButton } from "../components/ScrollToTopButton";
import { JokesListing } from "../components/JokesListing";
import { useJokes } from "../utils/hooks/useJokes";
import { INITIAL_SELECTED_JOKE_COUNT } from "../utils/constants";

export type JokesPageProps = {
  value: string;
};
export default function JokesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJokeCount, setSelectedJokeCount] = useState(
    INITIAL_SELECTED_JOKE_COUNT
  );

  function handleSearchInputChange(value: string) {
    value.length > 2 ? setSearchTerm(value) : setSearchTerm("");
  }

  const { isLoading, error, jokes, randomize } = useJokes(
    searchTerm,
    selectedJokeCount
  );
  const allJokes =
    searchTerm === ""
      ? jokes.slice(0, selectedJokeCount)
      : jokes
          .filter(({ value }: JokesPageProps) =>
            value.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .slice(0, selectedJokeCount);

  return (
    <Box px={5}>
      <VStack>
        <SearchInput
          placeholder="Search for jokes"
          onChange={handleSearchInputChange}
        />
        <NumberSlider
          initialValue={selectedJokeCount}
          onChangeEnd={setSelectedJokeCount}
        />
        <Button variant="outline" size="lg" my={2} onClick={randomize}>
          Get new Joke
        </Button>
        {isLoading && <Loader />}
        {error && <Error message={error} />}
        {!isLoading && !error && <JokesListing filterJokes={allJokes} />}
      </VStack>
      <ScrollToTopButton />
    </Box>
  );
}
