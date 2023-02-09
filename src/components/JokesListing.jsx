import { Box, Heading } from "@chakra-ui/react";
import { JokeCard } from "./JokeCard";

export function JokesListing({ filterJokes }) {
  return (
    <Box display="flex" gap={10} flexWrap="wrap" justifyContent="center">
      {filterJokes.length ? (
        filterJokes.map((joke) => (
          <JokeCard
            key={joke.id}
            joke={joke.value}
            category={joke.categories}
          />
        ))
      ) : (
        <Heading>Nothing was found.</Heading>
      )}
    </Box>
  );
}
