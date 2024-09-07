interface Movie {
    _id: string;
    person: string;
    watched: boolean;
    poster: string;
    rating: string;
    year: string;
    movieName: string;
}

interface MovieInfo {
    Title: string;
    Year: string;
    Poster: string;
    imdbRating: string;
}

interface MovieSearch {
    Title: string,
    Year: string,
    Poster: string
}

interface MovieSearchResult {
    Search: MovieSearch[];
    totalResults: string;
    Response: string;
}

interface Game {
    _id: string;
    gameName: string;
    played: boolean;
}