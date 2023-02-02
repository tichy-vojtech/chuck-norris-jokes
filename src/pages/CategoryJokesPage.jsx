import { VStack, Box, Tag } from "@chakra-ui/react";
import { useState } from "react";
import { SearchInput } from "../components/SearchInput";
import { Loader } from "../components/Loader";
import { Error } from "../components/Error";
import { ScrollToTopButton } from "../components/ScrollToTopButton";
import { NumberSlider } from "../components/NumberSlider";
import { useCategories } from "../hooks/useCategories";
import { JokesListing } from "../components/JokesListing";

export default function CategoryJokesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sliderValue, setSliderValue] = useState(25); //rename
  const { categoryJokes, isLoading, error, category } = useCategories();

  function filterJokes() {
    //rename
    return searchTerm === ""
      ? categoryJokes.slice(0, sliderValue)
      : categoryJokes
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
        {categoryJokes.length > 25 && (
          <NumberSlider
            maxSliderValue={categoryJokes.length}
            inputValue={sliderValue}
            onChangeEnd={(val) => {
              setSliderValue(val);
            }}
          />
        )}
        <Tag p="2" px="4">
          Now you are at {category} category
        </Tag>

        {isLoading && <Loader />}
        {error && <Error message={error} />}
        <JokesListing filterJokes={filterJokes()} />
      </VStack>
      <ScrollToTopButton />
    </Box>
  );
}
