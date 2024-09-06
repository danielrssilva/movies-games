import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || '/api';

export const fetchMovies = () => axios.get(`${API_URL}/movies`);
export const addMovie = (movie: any) => axios.post(`${API_URL}/movies`, movie);
export const updateMovie = (id: string, movie: any) => axios.put(`${API_URL}/movies/${id}`, movie);
export const deleteMovie = (id: string) => axios.delete(`${API_URL}/movies/${id}`);

export const fetchGames = () => axios.get(`${API_URL}/games`);
export const addGame = (game: any) => axios.post(`${API_URL}/games`, game);
export const updateGame = (id: string, game: any) => axios.put(`${API_URL}/games/${id}`, game);
export const deleteGame = (id: string) => axios.delete(`${API_URL}/games/${id}`);