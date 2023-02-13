import { VStack, Button, Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { Loader } from "../components/Loader";
import { Error } from "../components/Error";
import { SearchInput } from "../components/SearchInput";
import { NumberSlider } from "../components/NumberSlider";
import { ScrollToTopButton } from "../components/ScrollToTopButton";
import { JokesListing } from "../components/JokesListing";
import { useJokes } from "../utils/hooks/useJokes";
import { INITIAL_SELECTED_JOKE_COUNT } from "../utils/constants";
import { getData } from "../utils/api/getData";

export async function getServerSideProps() {
  const initFetchedJokes = await getData(`search?query=chu`);
  const fetchedJokes = initFetchedJokes.result;

  return {
    props: {
      fetchedJokes,
    },
  };
}

export default function JokesPage({ fetchedJokes }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJokeCount, setSelectedJokeCount] = useState(
    INITIAL_SELECTED_JOKE_COUNT
  );

  const { isLoading, error, jokes, randomize, setJokes, searchQuery } =
    useJokes(searchTerm, selectedJokeCount, fetchedJokes);

  function handleSearchInputChange(value) {
    value.length > 2 ? setSearchTerm(value) : setSearchTerm("");
    searchQuery();
  }

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
        {!isLoading && !error && <JokesListing filterJokes={jokes} />}
      </VStack>
      <ScrollToTopButton />
    </Box>
  );
}