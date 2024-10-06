import React, { useState } from "react";
import SearchInput from "./SearchInput";
import { useSearchMovies } from "../api/api";
import CollapseButton from "./CollapseButton";
import { CheckIcon, MovieIcon } from "./icons";

interface MovieFormProps {
  movie: MovieSearch | null;
  person: string;
  onMovieChange: (movie: MovieSearch) => void;
  onPersonChange: (name: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const MovieForm: React.FC<MovieFormProps> = ({
  movie,
  person,
  onMovieChange,
  onPersonChange,
  onSubmit,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [showPersonDropdown, setShowPersonDropdown] = useState(false);
  const [showMovieDropdown, setShowMovieDropdown] = useState(false);

  const openMovieDropdown = () => {
    setShowMovieDropdown(true);
  };
  const {
    mutate: searchMovies,
    data: searchResults,
    reset: clearMovieSearch,
  } = useSearchMovies(openMovieDropdown);

  const togglePersonDropdown = () => {
    setShowPersonDropdown((prev) => !prev);
  };

  const handlePersonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onPersonChange(e.target.value);
    setShowPersonDropdown(false);
  };

  const handleMovieChange = (movie: MovieSearch) => {
    onMovieChange(movie);
    setShowMovieDropdown(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(e);
    movie = null;
    clearMovieSearch();
    setIsCollapsed(true);
  };

  return (
    <form
      className={`z-50 w-[400px] absolute right-0 -top-32 bg-darkest-grey p-6 ${
        isCollapsed ? "h-[73px] overflow-y-hidden" : "h-auto overflow-y-visible"
      } rounded-lg`}
      onSubmit={handleSubmit}
    >
      <header>
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-white uppercase font-montserrat">
            Adicionar filme
          </h1>
          <CollapseButton
            isCollapsed={isCollapsed}
            setIsCollapsed={setIsCollapsed}
          />
        </div>
      </header>
      <div className="mb-4 relative">
        <SearchInput
          value={movie?.Title || ""}
          onChange={searchMovies}
          label="Qual filme?"
          id="movieName"
          icon={<MovieIcon />}
        />
        {searchResults && searchResults.Search && showMovieDropdown && (
          <div className="z-10 absolute rounded max-h-[200px] overflow-y-auto p-4 top-20 left-0 w-full h-auto bg-light-bg-grey text-white uppercase text-lg">
            {searchResults.Search?.map((movie: MovieSearch) => (
              <button
                onClick={() => handleMovieChange(movie)}
                key={`${movie.Title}-${movie.Year}`}
                className="w-full font-bold border-b border-border-grey p-2 cursor-pointer gap-2 flex items-center"
              >
                {movie.Poster && (
                  <div className="w-[45px] h-[60px]">
                    <img
                      src={movie.Poster}
                      alt={movie.Title}
                      className="w-[45px] h-[60px] object-cover"
                    />
                  </div>
                )}
                <div className="flex flex-1 h-[60px] w-32 items-center justify-between gap-4">
                  <span
                    className="text-left truncate overflow-hidden"
                    title={movie.Title}
                  >
                    {movie.Title}
                  </span>
                  <span className="text-light-grey-span font-montserrat font-light text-[12px] leading-3">
                    {movie.Year}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="mb-4 flex flex-col gap-2 relative">
        <label className="font-monomaniac-one text-lightest-grey tracking-widest">
          Na lista de quem?
        </label>
        <button
          type="button"
          onClick={togglePersonDropdown}
          className="text-left flex items-center gap-2 w-full px-4 pr-10 pl-0 text-xl border-b border-border-grey placeholder:text-border-grey pt-1 pb-3 text-lg font-montserrat uppercase font-bold text-white bg-darkest-grey focus:outline-none"
        >
          <span className="rounded-full w-6">
            <img src={`/images/${person}.png`} alt={person} />
          </span>
          {person}
        </button>
        {showPersonDropdown && (
          <div className="absolute flex flex-col gap-2 rounded max-h-[200px] overflow-y-auto p-4 top-20 left-0 w-full h-auto bg-light-bg-grey text-white uppercase text-lg">
            <input
              type="radio"
              name="person"
              id="Danny"
              className="w-full h-full hidden"
              value="Danny"
              onChange={handlePersonChange}
            />
            <input
              type="radio"
              name="person"
              id="Hakush"
              className="w-full h-full hidden"
              value="Hakush"
              onChange={handlePersonChange}
            />
            <input
              type="radio"
              name="person"
              id="Thaai"
              className="w-full h-full hidden"
              value="Thaai"
              onChange={handlePersonChange}
            />
            <label
              htmlFor="Danny"
              className="font-bold border-b border-border-grey py-2 cursor-pointer flex justify-between items-center gap-2 w-full"
            >
              <div className="flex gap-2">
                <span className="rounded-full w-7">
                  <img src={`/images/Danny.png`} alt="Danny" />
                </span>
                <span>Danny</span>
              </div>
              {person === "Danny" && (
                <span className="justify-self-end">
                  <CheckIcon />
                </span>
              )}
            </label>
            <label
              htmlFor="Hakush"
              className="font-bold border-b border-border-grey py-2 cursor-pointer flex justify-between items-center gap-2 w-full"
            >
              <div className="flex gap-2">
                <span className="rounded-full w-7">
                  <img src={`/images/Hakush.png`} alt="Hakush" />
                </span>
                <span>Hakush</span>
              </div>
              {person === "Hakush" && (
                <span className="justify-self-end">
                  <CheckIcon />
                </span>
              )}
            </label>
            <label
              htmlFor="Thaai"
              className="font-bold border-b border-border-grey py-2 cursor-pointer flex justify-between items-center gap-2 flex-1"
            >
              <div className="flex flex-1 gap-2">
                <span className="rounded-full w-7">
                  <img src={`/images/Thaai.png`} alt="Thaai" />
                </span>
                <span>Thaai</span>
              </div>
              {person === "Thaai" && (
                <span className="justify-self-end">
                  <CheckIcon />
                </span>
              )}
            </label>
          </div>
        )}
      </div>
      <button
        type="submit"
        className="uppercase font-montserrat text-white px-4 py-2 focus:outline-none focus:shadow-outline w-full text-right"
      >
        Salvar
      </button>
    </form>
  );
};

export default MovieForm;
