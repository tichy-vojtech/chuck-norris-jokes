import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { getData } from "../api/getData";

export function useJokes(searchTerm, selectedJokeCount) {
  const [jokes, setJokes] = useState([]);
  const [randomizedJokes, setRandomizedJokes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const toast = useToast();
  const [iteration, setIteration] = useState(0);
  const increment = () => setIteration(iteration + 1);

  useEffect(() => {
    const query = searchTerm.length < 3 ? "chu" : searchTerm;
    setIsLoading(true);
    setError(null);
    getData(`search?query=${query}`)
      .then((data) => {
        setJokes(data.result);
      })
      .catch((err) => {
        setError(err.message);
        toast({
          description: "Something went wrong",
          status: "error",
          duration: 4000,
          isClosable: false,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  useEffect(() => {
    setRandomizedJokes(
      jokes.sort(() => Math.random() - 0.5).slice(0, selectedJokeCount)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [iteration, jokes]);

  useEffect(() => {
    setRandomizedJokes(jokes.slice(0, selectedJokeCount));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedJokeCount]);
  return {
    jokes: randomizedJokes,
    isLoading,
    error,
    randomize: increment,
  };
}
