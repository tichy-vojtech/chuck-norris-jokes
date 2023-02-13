import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export function generateCategoryJokes(jokes, category) {
  return jokes.filter((joke) => joke.categories.includes(category));
}

export function useCategories(category, fetchedJokes) {
  const [jokes, setJokes] = useState(fetchedJokes);
  const [categoryJokes, setCategoryJokes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const toast = useToast();

  useEffect(() => {
    setCategoryJokes(generateCategoryJokes(jokes, category));
  }, [category]);

  return { categoryJokes, isLoading, error };
}
