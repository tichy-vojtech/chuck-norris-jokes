import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import axios from "axios";
import JokeCard from './components/JokeCard';
import { useEffect, useState } from 'react';
import { Button } from '@chakra-ui/react';
import { AppLayout } from "./components/AppLayout";
import { JokesPage } from "./pages/JokesPage";
import FavoriteJokesPage from "./pages/FavoriteJokesPage";
// import Sidebar from './components/Sidebar';

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
      <BrowserRouter>
        <AppLayout>

        {/* <Sidebar /> */}
        <Routes>
            <Route path="/" element={<JokesPage />} />
            <Route path="/FavoriteJokes" element={<FavoriteJokesPage />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </div>
  );
}

export default App;
