import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

// API call functions
const fetchMovies = (): Promise<Movie[]> =>
  axios.get(`${API_URL}/movies`).then((res) => res.data);
const addMovie = (movie: Omit<Movie, "_id">): Promise<Movie> =>
  axios.post(`${API_URL}/movies`, movie).then((res) => res.data);
const updateMovie = (movie: Movie): Promise<Movie> =>
  axios.put(`${API_URL}/movies?id=${movie._id}`, movie).then((res) => res.data);
const deleteMovie = (id: string): Promise<void> =>
  axios.delete(`${API_URL}/movies?id=${id}`).then((res) => res.data);

const fetchGames = (): Promise<Game[]> =>
  axios.get(`${API_URL}/games`).then((res) => res.data);
const addGame = (game: Omit<Game, "_id">): Promise<Game> =>
  axios.post(`${API_URL}/games`, game).then((res) => res.data);
const updateGame = (game: Partial<Game>): Promise<Game> =>
  axios.put(`${API_URL}/games?id=${game._id}`, game).then((res) => res.data);
const deleteGame = (id: string): Promise<void> =>
  axios.delete(`${API_URL}/games?id=${id}`).then((res) => res.data);

const fetchActivities = (): Promise<Activity[]> =>
  axios.get(`${API_URL}/activity`).then((res) => {
    return res.data.map((activity: Activity) => ({
      ...activity,
      date: new Date(activity.date),
    }));
  });
const addActivity = (activity: Omit<ActivityBody, "_id">): Promise<Activity> =>
  axios.post(`${API_URL}/activity`, activity).then((res) => res.data);
const updateActivity = (activity: ActivityUpdate): Promise<Activity> =>
  axios
    .put(`${API_URL}/activity?id=${activity._id}`, activity)
    .then((res) => res.data);
const deleteActivity = (id: string): Promise<void> =>
  axios.delete(`${API_URL}/activity?id=${id}`).then((res) => res.data);
const fetchYearActivities = (): Promise<YearActivities> =>
  axios.get(`${API_URL}/yearActivities`).then((res) => res.data);

// Custom hooks
export const useMovies = () =>
  useQuery<Movie[], Error>({ queryKey: ["movies"], queryFn: fetchMovies });

export const useAddMovie = () => {
  const queryClient = useQueryClient();
  return useMutation<Movie, Error, Omit<Movie, "_id">>({
    mutationFn: addMovie,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["movies"] });
    },
  });
};

export const useUpdateMovie = () => {
  const queryClient = useQueryClient();
  return useMutation<Movie, Error, Movie>({
    mutationFn: (movie) => updateMovie(movie),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["movies"] });
    },
  });
};

export const useDeleteMovie = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: deleteMovie,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["movies"] });
    },
  });
};

export const useGames = () =>
  useQuery<Game[], Error>({ queryKey: ["games"], queryFn: fetchGames });

export const useAddGame = () => {
  const queryClient = useQueryClient();
  return useMutation<Game, Error, Omit<Game, "_id">>({
    mutationFn: addGame,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["games"] });
    },
  });
};

export const useUpdateGame = () => {
  const queryClient = useQueryClient();
  return useMutation<Game, Error, Game>({
    mutationFn: (game) => updateGame(game),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["games"] });
    },
  });
};

export const useDeleteGame = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: deleteGame,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["games"] });
      queryClient.invalidateQueries({ queryKey: ["activities"] });
    },
  });
};

export const useSearchMovies = (onSuccess: () => void) => {
  const apiKey = process.env.REACT_APP_OMDB_API_KEY;
  return useMutation<MovieSearchResult, Error, string>({
    mutationFn: async (searchTerm: string) => {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(
          searchTerm
        )}&type=movie`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    onSuccess,
  });
};

export const useGetMovieInfo = () => {
  const apiKey = process.env.REACT_APP_OMDB_API_KEY;
  return useMutation<MovieInfo, Error, MovieSearch>({
    mutationFn: async ({ Title, Year }: MovieSearch) => {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${apiKey}&t=${Title}&y=${Year}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });
};

export const useGetActivities = () => {
  return useQuery<Activity[], Error>({
    queryKey: ["activities"],
    queryFn: fetchActivities,
  });
};

export const useAddActivity = () => {
  const queryClient = useQueryClient();
  return useMutation<Activity, Error, Omit<ActivityBody, "_id">>({
    mutationFn: addActivity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activities"] });
    },
  });
};

export const useUpdateActivity = () => {
  const queryClient = useQueryClient();
  return useMutation<Activity, Error, ActivityUpdate>({
    mutationFn: updateActivity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activities"] });
    },
  });
};

export const useDeleteActivity = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: deleteActivity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activities"] });
    },
  });
};

export const useGetYearActivities = () => {
  return useQuery<YearActivities, Error>({
    queryKey: ["yearActivities"],
    queryFn: fetchYearActivities,
  });
};
