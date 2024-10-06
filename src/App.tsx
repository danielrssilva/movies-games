import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Movie, Game, Calendar, Unknown } from "./containers";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navigation from "./components/Navigation";
import VersionDisplay from "./components/VersionDisplay";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="h-full bg-dark-grey p-10 font-montserrat overflow-auto box-border">
          <Navigation />
          <Routes>
            <Route path="/" element={<Movie />} />
            <Route path="/movies" element={<Movie />} />
            <Route path="/games" element={<Game />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="*" element={<Unknown />} />
          </Routes>
          <VersionDisplay />
        </div>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
