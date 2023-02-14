import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { getData } from "../api/getData";
import { Joke } from "../types";

export function useJokes(selectedJokeCount: number, fetchedJokes: Joke[]) {
  const [jokes, setJokes] = useState(fetchedJokes);
  const [randomizedJokes, setRandomizedJokes] = useState<Joke[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const toast = useToast();
  const [iteration, setIteration] = useState(0);
  const increment = () => setIteration(iteration + 1);

  function searchQuery(term: string) {
    const query = term.length < 3 ? "chu" : term;
    setIsLoading(true);
    setError(null);
    getData(`search?query=${query}`)
      .then((data) => {
        console.log(query);
        setJokes(data.result);
        console.log(data.result);
      })
      .catch((err) => {
        setError(err.message);
        console.log("kurwa");
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
  }

  useEffect(() => {
    console.log(jokes);
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
    searchQuery,
  };
}
