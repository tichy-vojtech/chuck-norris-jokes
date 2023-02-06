import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { getData } from "../api/getData";

export function useJokes(searchTerm, selectedJokeCount) {
  const [jokes, setJokes] = useState([]);
  const [randomizedJokes, setRandomizedJokes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const toast = useToast();
  const [iteration, setIteration] = useState(0)
  const increment = () => setIteration(iteration + 1);

  useEffect(() => {
    const query = searchTerm.length < 3 ? 'chu' : searchTerm;

    setIteration(0);
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
    if (jokes.length > 0) {
      const startIndex = (iteration * selectedJokeCount) % jokes.length;
      const endIndex = ((iteration + 1) * selectedJokeCount) % jokes.length;
      const finalEndIndex = endIndex < startIndex ? jokes.length : endIndex;

      setRandomizedJokes(jokes.slice(startIndex, finalEndIndex));
    }
  }, [iteration, selectedJokeCount, jokes]);

  return {
    jokes: randomizedJokes,
    isLoading,
    error,
    randomize: increment,
  };
}
