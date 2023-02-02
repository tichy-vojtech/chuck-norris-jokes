import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getData } from "../api/getData";
import { generateCategoryJokes } from "../utils/generateCategoryJokes";

export function useCategories() {
  const INITIAL_STATE = {
    data: [],
    isLoading: false,
    isError: false,
  };
  const { category } = useParams();
  const [jokes, setJokes] = useState(INITIAL_STATE);
  const [categoryJokes, setCategoryJokes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const toast = useToast();

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    getData("search?query=chu")
      .then((data) => {
        setJokes({ data, isLoading: false, isError: false });
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

  return { jokes, categoryJokes, isLoading, error, category };
}
