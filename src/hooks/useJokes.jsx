import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getData } from "../api/getData";
import { generateRandomJokes } from "../utils/generateRandomJokes";

export function useJokes() {
  const INITIAL_STATE = {
    data: [],
    isLoading: false,
    isError: false,
  };
  const [jokes, setJokes] = useState(INITIAL_STATE);
  const [randomJokes, setRandomJokes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sliderValue, setSliderValue] = useState(25);
  const toast = useToast();
  useEffect(() => {
    setIsLoading(true);
    setError(null);
    getData("search?query=chu")
      .then((data) => {
        setJokes(data);
        setRandomJokes(generateRandomJokes(data, sliderValue));
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
    sliderValue,
    setIsLoading,
    setError,
    setRandomJokes,
    setSliderValue,
  };
}
