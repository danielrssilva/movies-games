import React, { useEffect, useState } from "react";
import MovieForm from "../components/MovieForm";
import { useAddMovie, useDeleteMovie, useGetMovieInfo, useMovies, useUpdateMovie } from "../api/api";
import MovieCard, { MovieCardSkeleton } from "../components/MovieCard";
import { motion } from "framer-motion";

const Movie: React.FC = () => {
  const { data: movies = [], isLoading } = useMovies();
  const { mutate: addMovie } = useAddMovie();
  const { mutate: updateMovie } = useUpdateMovie();
  const { mutate: deleteMovie } = useDeleteMovie();
  const { mutate: getMovieInfo, data: movieInfo } = useGetMovieInfo();

  const [movie, setMovie] = useState<MovieSearch | null>(null);
  const [person, setPerson] = useState("Danny");
  const [movieData, setMovieData] = useState<MovieInfo | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (movieData) {
      const newMovie: Omit<Movie, "_id"> = {
        person,
        watched: false,
        rating: movieData.imdbRating,
        year: movieData.Year,
        movieName: movieData.Title,
        poster: movieData.Poster,
      }
      addMovie(newMovie);
      setMovieData(null);
      setMovie(null);
      setPerson("Danny");
    }
  };

  useEffect(() => {
    if (movie) {
      getMovieInfo(movie.Title);
    }
  }, [movie, getMovieInfo]);

  useEffect(() => {
    if (movieInfo) {
      setMovieData(movieInfo);
    }
  }, [movieInfo]);

  const groupAndOrderMovies = () => {
    const order = ["Danny", "Hakush", "Thaai"];
    const grouped = order.map(person => movies.filter(movie => movie.person === person && movie.watched === false));
    const maxLength = Math.max(...grouped.map(group => group.length));

    const result = [];
    for (let i = 0; i < maxLength; i++) {
      for (const group of grouped) {
        if (group[i]) {
          result.push(group[i]);
        }
      }
    }
    return result;
  };

  const watchedMovies = movies.filter(movie => movie.watched === true);
  const orderedMovies = groupAndOrderMovies();

  return (
    <div className="relative">
      <MovieForm
        movie={movie}
        person={person}
        onMovieChange={setMovie}
        onPersonChange={setPerson}
        onSubmit={handleSubmit}
      />
      <h1
        className="mb-10 text-white transition-colors duration-300 uppercase font-montserrat font-bold text-[44px]"
      >
        Próximos filmes <span className="text-light-grey font-normal lowercase text-[24px]">{orderedMovies.length} filmes na lista</span>
      </h1>
      <div className="flex flex-wrap gap-10 mb-10 min-h-[400px]">
        {!isLoading && orderedMovies.length === 0 && (
          <div className="flex items-center w-full h-full text-white font-montserrat text-[24px]">
            Não há filmes para assistir
          </div>
        )}
        {isLoading && (
          <>
            <MovieCardSkeleton />
            <MovieCardSkeleton />
            <MovieCardSkeleton />
          </>
        )}
        {orderedMovies.map((movie, index) => (
          <motion.div key={movie._id} initial={{ opacity: 0, translateY: -15 }} transition={{ delay: 0.1 * index, duration: 0.3 }} animate={{ opacity: 1, translateY: 0 }} exit={{ opacity: 0, translateY: 15 }}>
            <MovieCard onUpdate={updateMovie} onRemove={deleteMovie} key={movie._id} movie={movie} />
          </motion.div>
        ))}
      </div>
      <h1
        className="mb-10 text-white transition-colors duration-300 uppercase font-montserrat font-bold text-[44px]"
      >
        Assistidos <span className="text-light-grey font-normal lowercase text-[24px]">{watchedMovies.length} filmes assistidos</span>
      </h1>
      <div className="flex flex-wrap gap-10">
        {watchedMovies.map((movie, index) => (
          <motion.div key={movie._id} initial={{ opacity: 0, translateY: -15 }} transition={{ delay: 0.1 * (index + orderedMovies.length), duration: 0.3 }} animate={{ opacity: 1, translateY: 0 }}>
            <MovieCard onUpdate={updateMovie} onRemove={deleteMovie} key={movie._id} movie={movie} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Movie;
