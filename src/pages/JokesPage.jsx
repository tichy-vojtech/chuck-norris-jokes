import { VStack, Button, Box } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import JokeCard from "../components/JokeCard";
import { getJoke } from "../api/getJoke";
import Loader from "../components/Loader";
import Error from "../components/Error";

import chuck1 from "../assets/chuck1.jpeg";
import chuck2 from "../assets/chuck2.jpeg";
import chuck3 from "../assets/chuck3.jpeg";
import chuck4 from "../assets/chuck4.jpeg";
import chuck5 from "../assets/chuck5.jpeg";
import chuck6 from "../assets/chuck6.jpeg";
import chuck7 from "../assets/chuck7.jpeg";
import chuck8 from "../assets/chuck8.jpeg";
import chuck9 from "../assets/chuck9.jpeg";
import chuck10 from "../assets/chuck10.jpeg";
import SearchInput from "../components/SearchInput";

export function JokesPage() {
  const images = [
    chuck1,
    chuck2,
    chuck3,
    chuck4,
    chuck5,
    chuck5,
    chuck6,
    chuck7,
    chuck8,
    chuck9,
    chuck10,
  ];

  const INITIAL_STATE = {
    data: [],
    isLoading: false,
    isError: false,
  };

  const [jokes, setJokes] = useState(INITIAL_STATE);
  const [randomJokes, setRandomJokes] = useState([]);
  const [previousJokes, setPreviousJokes] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  // const [isLoading, setIsLoading] = useState(false);

  function fetchRandomJokes(jokes) {
    let randomJokesTemp = [];
    for (let i = 0; i < 20; i++) {
      let randomJoke = jokes.result[Math.floor(Math.random() * jokes.total)];
      if (!previousJokes.has(randomJoke.id)) {
        randomJokesTemp.push(randomJoke);
        previousJokes.add(randomJoke.id);
      }
    }
    setPreviousJokes(previousJokes);
    return randomJokesTemp;
  }

  useEffect(() => {
    getJoke().then((data) => {
      // setIsLoading(true);
      setJokes(data);
      setRandomJokes(fetchRandomJokes(data));
    });
    // .finally(() => setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleClick() {
    setRandomJokes(fetchRandomJokes(jokes));
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
        <Button colorScheme="blue" size="lg" my={2} onClick={handleClick}>
          Get new Joke
        </Button>
        {/* {isLoading && <Loader />}
        {jokes.isError && <Error>Upss chyba ...</Error>} */}
        <Box display="flex" gap={10} flexWrap="wrap" justifyContent="center">
          {randomJokes
            ?.filter(
              (joke) =>
                joke.value.toLowerCase().includes(searchTerm.toLowerCase()) ||
                searchTerm === ""
            )
            .map((joke) => (
              <JokeCard
                key={joke.id}
                theJoke={joke.value}
                category={joke.categories}
                randomImage={images[Math.floor(Math.random() * images.length)]}
              />
            ))}
        </Box>
        ;
      </VStack>
    </Box>
  );
}
