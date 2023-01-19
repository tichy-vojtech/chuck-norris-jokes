import './App.css';
import axios from "axios";
import JokeCard from './components/JokeCard';
import { useEffect, useState } from 'react';
import { Button } from '@chakra-ui/react';

function App() {

  const [joke, setJoke] = useState([])

const endpoint = "https://api.chucknorris.io/jokes/random"

useEffect(() => {
  getJokes()
}, [])

async function getJokes() {
	try {
		const response = await axios.get(endpoint);
    setJoke(response.data)
	}
	catch (error) {
		console.log(error);
	}
}

console.log(joke)

  return (
    <div className="App">
      <Button
       colorScheme='blue' size='lg'
       onClick={getJokes}
      >
        Get new Joke
      </Button>
      <JokeCard imageSrc={joke.icon_url} theJoke={joke.value} />
    </div>
  );
}

export default App;
