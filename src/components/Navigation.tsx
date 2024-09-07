import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
    const location = useLocation();
    const isMovies = location.pathname === '/movies' || location.pathname === '/';

    return (
        <nav className="flex gap-6 mb-10 uppercase font-montserrat font-bold text-[64px]">
            <Link
                to="/movies"
                className={`hover:text-white transition-colors duration-300 ${isMovies ? 'text-white' : 'text-light-grey'}`}
            >
                Filmes
            </Link>
            <span className="text-white mx-2">/</span>
            <Link
                to="/games"
                className={`hover:text-white transition-colors duration-300 ${isMovies ? 'text-light-grey' : 'text-white'}`}
            >
                Jogos
            </Link>
            <span className="text-white mx-2">/</span>
            <Link
                to={location.pathname}
                className="text-darkest-grey cursor-default"
                aria-disabled
            >
                Calendário
            </Link>
        </nav>
    )
}

export default Navigation;