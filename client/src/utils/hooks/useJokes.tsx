import { useEffect, useState } from "react";

import { Joke } from "../types";

export function useJokes(selectedJokeCount: number, fetchedJokes: Joke[]) {
  const [jokes, setJokes] = useState(fetchedJokes);
  const [randomizedJokes, setRandomizedJokes] = useState<Joke[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [iteration, setIteration] = useState(0);
  const increment = () => setIteration(iteration + 1);

  function searchQuery(term: string) {
    const query = term.length < 3 ? "chu" : term;
    const filteredJokes = jokes
      .filter(({ value }) => value.toLowerCase().includes(query.toLowerCase()))
      .slice(0, selectedJokeCount);

    setRandomizedJokes(filteredJokes);
  }

  useEffect(() => {
    const sortedJokes = [...jokes]
      .sort(() => Math.random() - 0.5)
      .slice(0, selectedJokeCount);
    setRandomizedJokes(sortedJokes);
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
