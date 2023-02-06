import { Box, Heading } from "@chakra-ui/react";
import { JokeCard } from "./JokeCard";

const NUMBER_OF_IMAGES = 10;

function getRandomCardImage() {
  const randomImageIndex = Math.floor(Math.random() * NUMBER_OF_IMAGES) + 1;
  return `/images/chuck${randomImageIndex}.jpeg`;
}

export function JokesListing({ filterJokes }) {
  return (
    <Box display="flex" gap={10} flexWrap="wrap" justifyContent="center">
      {filterJokes.length ? (
        filterJokes.map((joke) => (
          <JokeCard
            key={joke.id}
            joke={joke.value}
            category={joke.categories}
            randomImage={getRandomCardImage()}
          />
        ))
      ) : (
        <Heading>Nothing was found.</Heading>
      )}
    </Box>
  );
}
