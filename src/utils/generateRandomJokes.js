export function generateRandomJokes(jokes, selectedJokeCount) {
  //rename
  const randomJokesArray = [];

  for (let i = 0; i < selectedJokeCount; i++) {
    const randomJokeIndex = Math.floor(Math.random() * jokes.total);
    const randomJoke = jokes.result[randomJokeIndex];
    randomJokesArray.push(randomJoke);
  }
  return randomJokesArray;
}
