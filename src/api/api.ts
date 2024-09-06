import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

interface Movie {
  _id: string;
  movieName: string;
  person: string;
  watched: boolean;
}

interface Game {
  _id: string;
  gameName: string;
  played: boolean;
}

// API call functions
const fetchMovies = (): Promise<Movie[]> => axios.get(`${API_URL}/movies`).then(res => res.data);
const addMovie = (movie: Omit<Movie, '_id'>): Promise<Movie> => axios.post(`${API_URL}/movies`, movie).then(res => res.data);
const updateMovie = (movie: Movie): Promise<Movie> => axios.put(`${API_URL}/movies?id=${movie._id}`, movie).then(res => res.data);
const deleteMovie = (id: string): Promise<void> => axios.delete(`${API_URL}/movies?id=${id}`).then(res => res.data);

const fetchGames = (): Promise<Game[]> => axios.get(`${API_URL}/games`).then(res => res.data);
const addGame = (game: Omit<Game, '_id'>): Promise<Game> => axios.post(`${API_URL}/games`, game).then(res => res.data);
const updateGame = (game: Partial<Game>): Promise<Game> => axios.put(`${API_URL}/games?id=${game._id}`, game).then(res => res.data);
const deleteGame = (id: string): Promise<void> => axios.delete(`${API_URL}/games?id=${id}`).then(res => res.data);

// Custom hooks
export const useMovies = () => useQuery<Movie[], Error>({ queryKey: ['movies'], queryFn: fetchMovies });

export const useAddMovie = () => {
  const queryClient = useQueryClient();
  return useMutation<Movie, Error, Omit<Movie, '_id'>>({
    mutationFn: addMovie,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['movies'] });
    },
  });
};

export const useUpdateMovie = () => {
  const queryClient = useQueryClient();
  return useMutation<Movie, Error, Movie>({
    mutationFn: (movie) => updateMovie(movie),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['movies'] });
    },
  });
};

export const useDeleteMovie = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: deleteMovie,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['movies'] });
    },
  });
};

export const useGames = () => useQuery<Game[], Error>({ queryKey: ['games'], queryFn: fetchGames });

export const useAddGame = () => {
  const queryClient = useQueryClient();
  return useMutation<Game, Error, Omit<Game, '_id'>>({
    mutationFn: addGame,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['games'] });
    },
  });
};

export const useUpdateGame = () => {
  const queryClient = useQueryClient();
  return useMutation<Game, Error, Game>({
    mutationFn: (game) => updateGame(game),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['games'] });
    },
  });
};

export const useDeleteGame = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: deleteGame,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['games'] });
    },
  });
};