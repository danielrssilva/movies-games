import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import * as api from '../api/api';

interface Movie {
  _id: string;
  movieName: string;
  person: string;
  watched: boolean;
}

interface MovieContextType {
  movies: Movie[];
  addMovie: (movie: Omit<Movie, '_id'>) => Promise<void>;
  removeMovie: (movie: Movie) => Promise<void>;
  toggleWatched: (movie: Movie) => Promise<void>;
  editMovie: (movie: Movie, updates: Partial<Movie>) => Promise<void>;
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export const MovieProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    const response = await api.fetchMovies();
    setMovies(response.data);
  };

  const addMovie = async (movie: Omit<Movie, '_id'>) => {
    const response = await api.addMovie(movie);
    setMovies([...movies, response.data]);
  };

  const removeMovie = async (movieToRemove: Movie) => {
    await api.deleteMovie(movieToRemove._id);
    setMovies(movies.filter(movie => movie._id !== movieToRemove._id));
  };

  const toggleWatched = async (movieToToggle: Movie) => {
    const updatedMovie = { ...movieToToggle, watched: !movieToToggle.watched };
    const response = await api.updateMovie(movieToToggle._id, updatedMovie);
    setMovies(movies.map(movie => movie._id === movieToToggle._id ? response.data : movie));
  };

  const editMovie = async (movieToEdit: Movie, updates: Partial<Movie>) => {
    const response = await api.updateMovie(movieToEdit._id, { ...movieToEdit, ...updates });
    setMovies(movies.map(movie => movie._id === movieToEdit._id ? response.data : movie));
  };

  return (
    <MovieContext.Provider value={{ movies, addMovie, removeMovie, toggleWatched, editMovie }}>
      {children}
    </MovieContext.Provider>
  );
};

export const useMovieContext = () => {
  const context = useContext(MovieContext);
  if (context === undefined) {
    throw new Error('useMovieContext must be used within a MovieProvider');
  }
  return context;
};