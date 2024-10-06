import { useEffect, useState } from "react";
import {
  MovieDraggable,
  GameDraggable,
  DraggableSkeleton,
} from "../components/calendar";
import { useGames, useGetActivities, useMovies } from "../api/api";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { AnimatePresence, motion } from "framer-motion";
import Year from "../components/calendar/Year";
import { dayAnimation } from "../helpers/animations";
import CollapseButton from "../components/CollapseButton";
import { groupAndOrderMovies } from "../helpers/movies";
import LoadingIndicator from "../components/LoadingIndicator";

const Calendar: React.FC = () => {
  const [thisYearMondays, setThisYearMondays] = useState<Date[]>([]);
  const { data: activities = [], isLoading: isLoadingActivities } =
    useGetActivities();
  const { data: games = [], isLoading: isLoadingGames } = useGames();
  const { data: movies = [], isLoading: isLoadingMovies } = useMovies();

  const filteredMovies = movies.filter((movie) => !movie.watched);
  const orderedMovies = groupAndOrderMovies(filteredMovies);
  const filteredGames = games.filter((game) => !game.played);

  useEffect(() => {
    const date = new Date(new Date().getFullYear(), 0, 1),
      year = date.getFullYear(),
      nextYear = year + 1,
      mondays: Date[] = [];
    date.setDate(1);

    while (date.getDay() !== 1) {
      date.setDate(date.getDate() + 1);
    }
    while (date.getFullYear() === year) {
      let pushDate = new Date(date.getTime());
      mondays.push(
        new Date(
          `${pushDate.getFullYear()}-${
            pushDate.getMonth() + 1
          }-${pushDate.getDate()}`
        )
      );
      date.setDate(date.getDate() + 7);
    }
    setThisYearMondays(mondays);

    while (date.getDay() !== 1) {
      date.setDate(date.getDate() + 1);
    }
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="max-h-full w-full">
        <section className="flex flex-col gap-8">
          <div className="flex flex-col">
            <div className="flex gap-2 items-center">
              <h3 className="text-white text-[24px] font-bold">
                {`${new Date().getFullYear()} `}
              </h3>
              {isLoadingActivities && <LoadingIndicator />}
            </div>
            <div className="w-auto grid grid-flow-col gap-8 overflow-x-auto py-5 pr-5 min-h-[453px]">
              <Year
                mondays={thisYearMondays}
                activities={activities}
                isLoading={isLoadingActivities}
              />
            </div>
          </div>
        </section>
        <div className="flex justify-between gap-24">
          <section className="flex flex-col gap-8 w-1/2">
            <h1 className="uppercase font-montserrat font-bold text-[64px] text-white">
              Filmes
              {orderedMovies.length > 0 && (
                <span className="text-lightest-grey text-xl font-thin ml-4">
                  {`${orderedMovies.length} ${
                    orderedMovies.length === 1 ? "filme" : "filmes"
                  }`}
                </span>
              )}
            </h1>
            <div className="w-auto grid grid-cols-3 gap-8 py-5">
              {isLoadingMovies && (
                <>
                  <DraggableSkeleton />
                  <DraggableSkeleton />
                  <DraggableSkeleton />
                </>
              )}
              <AnimatePresence>
                {orderedMovies.map((movie, index) => (
                  <motion.div
                    key={`draggable-movie-${movie._id}`}
                    variants={dayAnimation}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ delay: index * 0.1 }}
                  >
                    <MovieDraggable movie={movie} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </section>
          <section className="flex flex-col gap-8 w-1/2">
            <h1 className="uppercase font-montserrat font-bold text-[64px] text-white text-right">
              {filteredGames.length > 0 && (
                <span className="text-lightest-grey text-xl font-thin mr-4">
                  {`${filteredGames.length} ${
                    filteredGames.length === 1 ? "jogo" : "jogos"
                  }`}
                </span>
              )}
              Jogos
            </h1>
            <div className="w-auto grid grid-cols-3 gap-8 py-5">
              {isLoadingGames && (
                <>
                  <DraggableSkeleton />
                  <DraggableSkeleton />
                  <DraggableSkeleton />
                </>
              )}
              <AnimatePresence>
                {filteredGames.map((game, index) => (
                  <motion.div
                    key={`draggable-game-${game._id}`}
                    variants={dayAnimation}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ delay: index * 0.1 }}
                  >
                    <GameDraggable game={game} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </section>
        </div>
      </div>
    </DndProvider>
  );
};

export default Calendar;
