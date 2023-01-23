import { VStack, Button, Box } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";
import JokeCard from "../components/JokeCard";

export function JokesPage() {
  const [joke, setJoke] = useState([])

const endpoint = "https://api.chucknorris.io/jokes/random"

useEffect(() => {
  getJokes()
}, [])

async function getJokes() {
	try {
		const response = await axios.get(endpoint);
    setJoke(response.data)
	}
	catch (error) {
		console.log(error);
	}
}

console.log(joke)

  return (
    <Box px={5}>
      <VStack>
      <Button
       colorScheme='blue' size='lg'
       my={2}
       onClick={getJokes}
      >
        Get new Joke
      </Button>
      <JokeCard imageSrc={joke.icon_url} theJoke={joke.value} />
      </VStack>
    </Box>
  );
}