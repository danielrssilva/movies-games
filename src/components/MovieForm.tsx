import React from 'react';

interface MovieFormProps {
  movieName: string;
  person: string;
  onMovieNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPersonChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const MovieForm: React.FC<MovieFormProps> = ({ movieName, person, onMovieNameChange, onPersonChange, onSubmit }) => {
  return (
    <form className="mb-6" onSubmit={onSubmit}>
      <div className="mb-4">
        <label htmlFor="movieName" className="block text-gray-700 text-sm font-bold mb-2">Movie</label>
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          id="movieName"
          value={movieName}
          onChange={onMovieNameChange}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="person" className="block text-gray-700 text-sm font-bold mb-2">Person</label>
        <select
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          id="person"
          value={person}
          onChange={onPersonChange}
        >
          <option value="Danny">Danny</option>
          <option value="Hakush">Hakush</option>
          <option value="Thaai">Thaai</option>
        </select>
      </div>
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Add Entry
      </button>
    </form>
  );
}

export default MovieForm;
