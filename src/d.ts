interface Movie {
  _id: string;
  person: string;
  watched: boolean;
  poster: string;
  rating: string;
  year: string;
  movieName: string;
  ratings: {
    hakush: number;
    thaai: number;
    danny: number;
  };
}

interface MovieInfo {
  Title: string;
  Year: string;
  Poster: string;
  imdbRating: string;
}

interface MovieSearch {
  Title: string;
  Year: string;
  Poster: string;
}

interface MovieSearchResult {
  Search: MovieSearch[];
  totalResults: string;
  Response: string;
}

interface Game {
  id?: string;
  _id: string;
  name: string;
  played: boolean;
  involved_companies: [
    {
      company: {
        name: string;
      };
    }
  ];
  rating: number,
  cover: {
    url: string;
  };
  isRecurring: boolean;
  release_dates: [
    {
      y: number;
    }
  ];
}

// Calendar
interface Day {
  day: number;
  month: number;
  year: number;
  activity: Activity | null;
}

interface YearActivities {
  activities: Activity[];
}

interface Activity {
  _id: string;
  date: Date;
  activity: Game | Movie;
}

interface ActivityUpdate extends Activity {
  activityType: "Game" | "Movie";
}

interface ActivityBody {
  _id: string;
  date: Date;
  activityModel: Game | Movie;
}
