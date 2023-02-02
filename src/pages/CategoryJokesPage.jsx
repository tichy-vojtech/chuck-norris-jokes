import { VStack, Box } from "@chakra-ui/react";
import { useState } from "react";
import { JokeCard } from "../components/JokeCard";
import { SearchInput } from "../components/SearchInput";
import { Loader } from "../components/Loader";
import { Error } from "../components/Error";
import { ScrollToTopButton } from "../components/ScrollToTopButton";
import { NumberSlider } from "../components/NumberSlider";
import { useCategories } from "../hooks/useCategories";

export default function CategoryJokesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sliderValue, setSliderValue] = useState(25);
  const numberOfImages = 10;
  const { jokes, categoryJokes, isLoading, error } = useCategories();
  const [sliderValue, setSliderValue] = useState(25);

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
        {isLoading && <Loader />}
        {error && <Error message={error} />}
        <Box display="flex" gap={10} flexWrap="wrap" justifyContent="center">
          {searchTerm === "" && categoryJokes.length > 25
            ? categoryJokes
                .map((joke) => (
                  <JokeCard
                    key={joke.id}
                    joke={joke.value}
                    category={joke.categories}
                    randomImage={`/ChuckNorrisImage/chuck${
                      Math.floor(Math.random() * numberOfImages) + 1
                    }.jpeg`}
                  />
                ))
                .slice(0, sliderValue)
            : categoryJokes
                ?.filter(
                  (joke) =>
                    joke.value
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) || searchTerm === ""
                )
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
