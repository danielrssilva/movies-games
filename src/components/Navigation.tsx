import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();
  const isMovies = location.pathname === "/movies" || location.pathname === "/";
  const isGames = location.pathname === "/games";
  const isCalendar = location.pathname === "/calendar";

  return (
    <nav className="flex gap-6 mb-10 uppercase font-montserrat font-bold text-[64px]">
      <Link
        to="/movies"
        className={`hover:text-white transition-colors duration-300 ${
          isMovies ? "text-white" : "text-light-grey"
        }`}
      >
        Filmes
      </Link>
      <span className="text-white mx-2">/</span>
      <Link
        to="/games"
        className={`hover:text-white transition-colors duration-300 ${
          isGames ? "text-white" : "text-light-grey"
        }`}
      >
        Jogos
      </Link>
      <span className="text-white mx-2">/</span>
      <Link
        to="/calendar"
        className={`hover:text-white transition-colors duration-300 ${
          isCalendar ? "text-white" : "text-light-grey"
        }`}
      >
        Calendário
      </Link>
    </nav>
  );
};

export default Navigation;
