import { useEffect, useState } from "react";

type Joke = {
  value: any;
  categories: string[];
};

export function generateCategoryJokes(jokes: Joke[], category: string) {
  return jokes.filter((joke) => joke.categories.includes(category));
}

export function useCategories(category: string, fetchedJokes: Joke[]) {
  const [jokes] = useState(fetchedJokes);
  const [categoryJokes, setCategoryJokes] = useState<Joke[]>([]);
  const [isLoading] = useState(false);
  const [error] = useState(null);

  useEffect(() => {
    setCategoryJokes(generateCategoryJokes(jokes, category));
  }, [category]);

  return { categoryJokes, isLoading, error };
}
