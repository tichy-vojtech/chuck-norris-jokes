import { VStack, Box, Tag } from "@chakra-ui/react";
import { useState } from "react";

import { SearchInput } from "../components/SearchInput";
import { Loader } from "../components/Loader";
import { Error } from "../components/Error";
import { ScrollToTopButton } from "../components/ScrollToTopButton";
import { NumberSlider } from "../components/NumberSlider";
import { useCategories } from "../hooks/useCategories";
import { JokesListing } from "../components/JokesListing";
import { INITIAL_SELECTED_JOKE_COUNT } from '../constants';

export function CategoryJokesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJokeCount, setSelectedJokeCount] = useState(INITIAL_SELECTED_JOKE_COUNT);
  const { categoryJokes, isLoading, error, category } = useCategories();

  const filteredJokes = searchTerm === ""
    ? categoryJokes.slice(0, selectedJokeCount)
    : categoryJokes
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
        {categoryJokes.length > 25 && (
          <NumberSlider
            maxSliderValue={categoryJokes.length}
            inputValue={selectedJokeCount}
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
