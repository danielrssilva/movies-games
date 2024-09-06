import React, { useState } from "react";
import DataTable, { Column } from "../components/DataTable";
import MovieForm from "../components/MovieForm";
import { useAddMovie, useDeleteMovie, useMovies, useUpdateMovie } from "../api/api";

const MovieTab: React.FC = () => {
  const { data: movies = [], isLoading, error } = useMovies();
  const { mutate: addMovie } = useAddMovie();
  const { mutate: updateMovie } = useUpdateMovie();
  const { mutate: deleteMovie } = useDeleteMovie();
  const [movieName, setMovieName] = useState("");
  const [person, setPerson] = useState("Danny");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (movieName && person) {
      addMovie({ movieName, person, watched: false });
      setMovieName("");
      setPerson("Danny");
    }
  };

  const handleEdit = (movie: any, key: string, value: string) => {
    updateMovie({ ...movie, [key]: value });
  };

  
  const groupAndOrderMovies = () => {
    const order = ["Danny", "Hakush", "Thaai"];
    const grouped = order.map(person => movies.filter(movie => movie.person === person));
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

  const orderedMovies = groupAndOrderMovies();

  const columns: Column[] = [
    {
      key: 'movie',
      dataKey: 'movieName',
      width: 'w-3/5',
      header: 'Movie',
      truncate: true,
      editable: true,
      renderCell: (movie, isEditing, onChange, onSubmit) => (
        <div className="flex items-center">
          <input
            type="checkbox"
            className="mr-2 form-checkbox h-5 w-5 text-blue-600"
            checked={movie.watched}
            onChange={() => updateMovie({...movie, watched: !movie.watched})}
          />
          {isEditing ? (
            <input
              type="text"
              defaultValue={movie.movieName}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  onSubmit();
                }
              }}
              className="w-full px-2 py-1 border rounded"
              autoFocus
            />
          ) : (
            <span className="truncate">{movie.movieName}</span>
          )}
        </div>
      )
    },
    { key: 'person', dataKey: 'person', width: 'w-1/5', header: 'Person' },
    { key: 'actions', dataKey: 'actions', width: 'w-1/5', header: '' }
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Movie Database</h1>
      <MovieForm
        movieName={movieName}
        person={person}
        onMovieNameChange={(e: React.ChangeEvent<HTMLInputElement>) => setMovieName(e.target.value)}
        onPersonChange={(e: React.ChangeEvent<HTMLSelectElement>) => setPerson(e.target.value)}
        onSubmit={handleSubmit}
      />
      <DataTable
        isLoading={isLoading}
        data={orderedMovies}
        columns={columns}
        onRemove={deleteMovie}
        onEdit={handleEdit}
      />
    </div>
  );
}

export default MovieTab;
