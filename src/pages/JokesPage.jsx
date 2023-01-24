import { VStack, Button, Box } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import JokeCard from "../components/JokeCard";
import { getJokes } from "../hooks/useFetchRandomJoke";

export function JokesPage() {
  const [joke, setJoke] = useState([]);

  useEffect(() => {
    getJokes().then((data) => setJoke(data));
  }, []);
  return (
    <Box px={5}>
      <VStack>
        <Button
          colorScheme="blue"
          size="lg"
          my={2}
          onClick={() => {
            getJokes().then((data) => setJoke(data));
          }}
        >
          Get new Joke
        </Button>
        <JokeCard
          imageSrc={joke.icon_url}
          theJoke={joke.value}
          category={joke.categories}
        />
      </VStack>
    </Box>
  );
}
