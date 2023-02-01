export function GenerateRandomJokes(jokes, sliderValue) {
  const randomJokesArray = [];

  for (let i = 0; i < sliderValue; i++) {
    const randomJokeIndex = Math.floor(Math.random() * jokes.total);
    const randomJoke = jokes.result[randomJokeIndex];
    randomJokesArray.push(randomJoke);
  }
  return randomJokesArray;
}
