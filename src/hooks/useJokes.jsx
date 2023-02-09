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
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const query = searchTerm.length < 3 ? "chu" : searchTerm;
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
      setStartIndex(startIndex + selectedJokeCount + 1);
      setRandomizedJokes(
        jokes.slice(startIndex, startIndex + selectedJokeCount)
      );
      console.log("startIndexx", startIndex);
      console.log("endIndex", startIndex + selectedJokeCount);

    }
  }, [iteration, jokes]);

  return {
    jokes: randomizedJokes,
    isLoading,
    error,
    randomize: increment,
  };
}
