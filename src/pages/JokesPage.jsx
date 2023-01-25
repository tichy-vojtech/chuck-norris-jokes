import { VStack, Button, Box } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import JokeCard from "../components/JokeCard";
import { getJoke } from "../API/getJoke";

export function JokesPage() {
  const [joke, setJoke] = useState([]);

  useEffect(() => {
    getJoke().then((data) => setJoke(data));
  }, []);
  return (
    <Box px={5}>
      <VStack>
        <Button
          colorScheme="blue"
          size="lg"
          my={2}
          onClick={() => {
            getJoke().then((data) => setJoke(data));
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
