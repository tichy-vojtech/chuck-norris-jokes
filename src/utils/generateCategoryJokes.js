export function generateCategoryJokes(jokes, category) {
  const categoryJokes = jokes.result.filter(
    (joke) => joke.categories[0] === category
  );
  return categoryJokes;
}
