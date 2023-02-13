import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { getData } from "../api/getData";

export type GenerateCategoryJokesArgs = {
  jokes: { result: [] };
  category: string;
};

export function generateCategoryJokes({
  jokes,
  category,
}: GenerateCategoryJokesArgs) {
  return jokes.result.filter((joke: { categories: string[] }) =>
    joke.categories.includes(category)
  );
}

export function useCategories(category: string) {
  const [categoryJokes, setCategoryJokes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const toast = useToast();

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    getData("search?query=chu")
      .then((data) => {
        setCategoryJokes(
          generateCategoryJokes({ jokes: data, category: category })
        );
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
