import React from "react";
import { BrowserRouter as Router, Route, Link, Routes, useLocation } from "react-router-dom";
import MovieTab from "./containers/MovieTab";
import GameTab from "./containers/GameTab";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navigation from "./components/Navigation";

const queryClient = new QueryClient();

const App: React.FC = () => {

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="h-full bg-dark-grey p-10 font-montserrat overflow-auto box-border">
          <Navigation />
          <Routes>
            <Route path="/movies" element={<MovieTab />} />
            <Route path="/games" element={<GameTab />} />
            <Route path="/" element={<MovieTab />} />
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
