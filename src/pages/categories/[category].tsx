import { VStack, Box, Tag } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { SearchInput } from "../../components/SearchInput";
import { Loader } from "../../components/Loader";
import { Error } from "../../components/Error";
import { ScrollToTopButton } from "../../components/ScrollToTopButton";
import { NumberSlider } from "../../components/NumberSlider";
import { useCategories } from "../../utils/hooks/useCategories";
import { JokesListing } from "../../components/JokesListing";
import { INITIAL_SELECTED_JOKE_COUNT } from "../../utils/constants";
import { getData } from "../../utils/api/getData";
import { Joke } from "../../utils/types";

export async function getServerSideProps() {
  const initFetchedJokes = await getData(`search?query=chu`);
  const fetchedJokes = initFetchedJokes.result;

  return {
    props: {
      fetchedJokes,
    },
  };
}
export type CategoryJokesPageProps = {
  fetchedJokes: Joke[];
};

export default function CategoryJokesPage({
  fetchedJokes,
}: CategoryJokesPageProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJokeCount, setSelectedJokeCount] = useState(
    INITIAL_SELECTED_JOKE_COUNT
  );
  const router = useRouter();
  const { category } = router.query;
  const { categoryJokes, isLoading, error } = useCategories(
    category as string,
    fetchedJokes
  );
  const filteredJokes =
    searchTerm === ""
      ? categoryJokes.slice(0, selectedJokeCount)
      : categoryJokes
          .filter(({ value }) =>
            value.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .slice(0, selectedJokeCount);

  return (
    <Box px={5}>
      <VStack>
        <SearchInput placeholder="Search for jokes" onChange={setSearchTerm} />
        {categoryJokes.length > 25 && (
          <NumberSlider
            maxSliderValue={categoryJokes.length}
            initialValue={selectedJokeCount}
            onChangeEnd={setSelectedJokeCount}
          />
        )}
        <Tag py={2} px={4}>
          Now you are at {category} category
        </Tag>
        {isLoading && <Loader />}
        {error && <Error message={error} />}
        {!isLoading && !error && <JokesListing filterJokes={filteredJokes} />}
      </VStack>
      <ScrollToTopButton />
    </Box>
  );
}
