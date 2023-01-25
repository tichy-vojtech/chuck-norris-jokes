import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { AppLayout } from "./components/AppLayout";
import { JokesPage } from "./pages/JokesPage";
import FavoriteJokesPage from "./pages/FavoriteJokesPage";
// import Sidebar from './components/Sidebar';

function App() {
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
