import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { INITIAL_SELECTED_JOKE_COUNT } from '../constants';
import { getData } from "../api/getData";
import { generateRandomJokes } from "../utils/generateRandomJokes";

const INITIAL_STATE = {
  data: [],
  isLoading: false,
  isError: false,
};

export function useJokes() {
  const [jokes, setJokes] = useState(INITIAL_STATE);
  const [randomJokes, setRandomJokes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedJokeCount, setSelectedJokeCount] = useState(INITIAL_SELECTED_JOKE_COUNT);
  const toast = useToast();

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    getData("search?query=chu")
      .then((data) => {
        setJokes(data);
        setRandomJokes(generateRandomJokes(data, selectedJokeCount));
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
  }, []);

  return {
    jokes,
    randomJokes,
    isLoading,
    error,
    selectedJokeCount,
    setIsLoading,
    setError,
    setRandomJokes,
    setSelectedJokeCount,
  };
}
