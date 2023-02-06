import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { getData } from "../api/getData";

export function generateCategoryJokes(jokes, category) {
  return jokes.result.filter(
    (joke) => joke.categories.includes(category)
  );
}

export function useCategories(category) {
  const [categoryJokes, setCategoryJokes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const toast = useToast();

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    getData("search?query=chu")
      .then((data) => {
        setCategoryJokes(generateCategoryJokes(data, category));
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
  }, [category]);

  return { categoryJokes, isLoading, error };
}
