import { VStack, Box } from "@chakra-ui/react";
import { useState } from "react";
import { JokeCard } from "../components/JokeCard";
import { SearchInput } from "../components/SearchInput";
import { Loader } from "../components/Loader";
import { Error } from "../components/Error";
import { ScrollToTopButton } from "../components/ScrollToTopButton";
import { useCategories } from "../customHooks/useCategories";

export default function CategoryJokesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const numberOfImages = 10;
  const { jokes, categoryJokes, isLoading, error } = useCategories();

  return (
    <Box px={5}>
      <VStack>
        <SearchInput
          placeholderText="Search for jokes"
          onChange={(value) => {
            setSearchTerm(value);
          }}
        />
        {isLoading && <Loader />}
        {error && <Error message={error} />}
        <Box display="flex" gap={10} flexWrap="wrap" justifyContent="center">
          {searchTerm === ""
            ? categoryJokes.map((joke) => (
                <JokeCard
                  key={joke.id}
                  joke={joke.value}
                  category={joke.categories}
                  randomImage={`/ChuckNorrisImage/chuck${
                    Math.floor(Math.random() * numberOfImages) + 1
                  }.jpeg`}
                />
              ))
            : jokes.result
                ?.filter(
                  (joke) =>
                    joke.value
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) || searchTerm === ""
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
