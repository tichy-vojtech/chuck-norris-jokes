import { VStack, Button, Box } from "@chakra-ui/react";
import { useState } from "react";
import { debounce } from "lodash";

import { Loader } from "../components/Loader";
import { Error } from "../components/Error";
import { SearchInput } from "../components/SearchInput";
import { NumberSlider } from "../components/NumberSlider";
import { ScrollToTopButton } from "../components/ScrollToTopButton";
import { JokesListing } from "../components/JokesListing";
import { useJokes } from "../utils/hooks/useJokes";
import { INITIAL_SELECTED_JOKE_COUNT } from "../utils/constants";
import { getData } from "../api/getData";
import { Joke } from "../utils/types";

export async function getServerSideProps() {
  const initFetchedJokes = await getData();
  const fetchedJokes = initFetchedJokes;

  return {
    props: {
      fetchedJokes,
    },
  };
}

export type JokesPageProps = {
  fetchedJokes: Joke[];
};

export default function JokesPage({ fetchedJokes }: JokesPageProps) {
  const DEBOUNCE_DELAY = 500;
  const [selectedJokeCount, setSelectedJokeCount] = useState(
    INITIAL_SELECTED_JOKE_COUNT
  );

  const { isLoading, error, jokes, randomize, searchQuery } = useJokes(
    selectedJokeCount,
    fetchedJokes
  );

  const handleSearchInputChangeDebounced = debounce((value: string) => {
    const term = value.length > 2 ? value : "chu";
    searchQuery(term);
  }, DEBOUNCE_DELAY);

  return (
    <Box px={5}>
      <VStack>
        <SearchInput
          placeholder="Search for jokes"
          onChange={handleSearchInputChangeDebounced}
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
