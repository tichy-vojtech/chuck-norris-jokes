import { Box, Heading } from "@chakra-ui/react";
import { JokeCard } from "./JokeCard";

type Joke = {
  id: string;
  value: string;
  categories: string[];
};
export type JokesListingProps = {
  filterJokes: Joke[];
};

export function JokesListing({ filterJokes }: JokesListingProps) {
  // TODO RENAME
  return (
    <Box display="flex" gap={10} flexWrap="wrap" justifyContent="center">
      {filterJokes.length ? (
        filterJokes.map(({ id, value, categories }) => (
          <JokeCard key={id} joke={value} categories={categories} />
        ))
      ) : (
        <Heading>Nothing was found.</Heading>
      )}
    </Box>
  );
}
