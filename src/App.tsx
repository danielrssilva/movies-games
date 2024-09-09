import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Movie, Game, Calendar } from "./containers";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navigation from "./components/Navigation";

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
          </Routes>
          <div className="absolute bottom-4 right-4 text-white text-xs opacity-50">
            v{process.env.REACT_APP_VERSION}
          </div>
        </div>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
