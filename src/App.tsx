import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import MovieTab from "./containers/MovieTab";
import GameTab from "./containers/GameTab";
import { MovieProvider } from "./contexts/MovieContext";
import { GameProvider } from "./contexts/GameContext";

const App: React.FC = () => {
  return (
    <MovieProvider>
      <GameProvider>
        <Router>
          <div className="container mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <nav className="flex mb-4">
              <Link
                to="/movies"
                className="mr-2 px-4 py-2 rounded-t-lg bg-blue-500 text-white hover:bg-blue-600"
              >
                Movies
              </Link>
              <Link
                to="/games"
                className="px-4 py-2 rounded-t-lg bg-blue-500 text-white hover:bg-blue-600"
              >
                Games
              </Link>
            </nav>
            <Routes>
              <Route path="/movies" element={<MovieTab />} />
              <Route path="/games" element={<GameTab />} />
              <Route path="/" element={<MovieTab />} />
            </Routes>
          </div>
        </Router>
      </GameProvider>
    </MovieProvider>
  );
}

export default App;
