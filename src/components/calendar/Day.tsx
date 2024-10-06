import { useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import { MovieIcon, GameIcon, RecurringIcon, CalendarIcon } from "../icons";
import { AnimatePresence, motion } from "framer-motion";
import {
  useAddActivity,
  useDeleteActivity,
  useUpdateActivity,
  useUpdateGame,
  useUpdateMovie,
} from "../../api/api";
import { IconAnimation, LetterAnimation } from "../../helpers/animations";

interface DayProps extends Day {
  isLoading: boolean,
}

const Day: React.FC<DayProps> = ({ day, month, year, activity, isLoading }) => {
  const [game, setGame] = useState<Game>();
  const [movie, setMovie] = useState<Movie>();
  const { mutate: addActivity, isPending: isLoadingAdd } = useAddActivity();
  const { mutate: deleteActivity, isPending: isLoadingDelete } =
    useDeleteActivity();
  const { mutate: updateActivity, isPending: isLoadingUpdate } =
    useUpdateActivity();
  const { mutate: updateGame, isPending: isLoadingUpdateGame } =
    useUpdateGame();
  const { mutate: updateMovie, isPending: isLoadingUpdateMovie } =
    useUpdateMovie();

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: ["game", "movie"],
      drop: (item: { game: Game; movie: Movie }) => {
        const activityModel = item.game || item.movie;
        const existingActivity = activity?.activity as Game | Movie | undefined;
        if (existingActivity && existingActivity._id) {
          updateActivity({
            _id: activity?._id || "",
            date: new Date(year, month - 1, day),
            activityType: item.game ? "Game" : "Movie",
            activity: activityModel,
          });
        } else {
          addActivity({
            date: new Date(year, month - 1, day),
            activityModel,
          });
        }
        if (item.game) {
          setGame(item.game);
          setMovie(undefined);
        } else if (item.movie) {
          setMovie(item.movie);
          setGame(undefined);
        }
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [activity, year, month, day]
  );

  const handleDeleteActivity = () => {
    deleteActivity(activity?._id || "");
  };

  const handleCompleteActivity = () => {
    if (game) {
      setGame({ ...game, played: !game.played });
      updateGame({ ...game, played: !game.played });
    } else if (movie) {
      setMovie({ ...movie, watched: !movie.watched });
      updateMovie({ ...movie, watched: !movie.watched });
    }
  };

  useEffect(() => {
    if ((activity?.activity as Game)?.name) {
      setGame(activity?.activity as Game);
    } else if ((activity?.activity as Movie)?.movieName) {
      setMovie(activity?.activity as Movie);
    }
    if (activity === null) {
      setGame(undefined);
      setMovie(undefined);
    }
  }, [activity]);

  const isChanging =
    isLoadingAdd ||
    isLoadingUpdate ||
    isLoadingDelete ||
    isLoadingUpdateGame ||
    isLoadingUpdateMovie;

  return (
    <div
      ref={drop}
      className={`flex group flex-col gap-2 relative flex items-center justify-center w-[305px] h-[407px] bg-darkest-grey rounded-lg group overflow-visible transition-all duration-300 ${
        isChanging || isLoading
          ? "animate-pulse shadow-[0_0_15px_0_rgba(255,255,255,0.5)]"
          : ""
      } ${
        isOver ? "shadow-[0_0_15px_0_rgba(255,255,255,0.5)] animate-pulse" : ""
      }`}
    >
      {game?.cover?.url && (
        <>
          <img
            src={game.cover?.url.replace("t_thumb", "t_cover_big")}
            alt={game.name}
            className="w-full h-full object-cover rounded-lg"
          />
          <span className="absolute h-full w-full bg-gradient-to-t from-black to-transparent rounded-lg" />
        </>
      )}

      {movie?.poster && (
        <>
          <img
            src={movie.poster}
            alt={movie.movieName}
            className="w-full h-full object-cover rounded-lg"
          />
          <span className="absolute h-full w-full bg-gradient-to-t from-black to-transparent rounded-lg" />
        </>
      )}
      <div className="absolute -top-4 flex justify-between gap-4 w-full px-4 z-10">
        <motion.span
          variants={IconAnimation}
          initial="hidden"
          animate="visible"
          className="bg-white text-grey font-bold px-2 py-1 rounded-full w-32 flex justify-center items-center"
        >
          {`${day < 10 ? `0${day}` : day}/${month < 10 ? `0${month}` : month}`}
        </motion.span>
        <motion.span
          variants={IconAnimation}
          initial="hidden"
          animate="visible"
          className="bg-white text-grey font-black px-2 py-1 rounded-full w-16 flex justify-center items-center relative"
        >
          <motion.div
            variants={IconAnimation}
            initial="hidden"
            animate={game?.name ? "visible" : "hidden"}
            className="absolute"
          >
            <GameIcon className="fill-darkest-grey" />
          </motion.div>
          <motion.div
            variants={IconAnimation}
            initial="hidden"
            animate={movie?.movieName ? "visible" : "hidden"}
            className="absolute"
          >
            <MovieIcon className="fill-darkest-grey" />
          </motion.div>
        </motion.span>
        <motion.span
          variants={IconAnimation}
          initial="hidden"
          animate="visible"
          className="bg-white text-grey font-bold py-1 rounded-full w-16 flex justify-center items-center"
        >
          {activity &&
            (!game?.isRecurring ? (
              <button
                className="flex w-full items-center justify-center group/complete transition-all duration-300"
                onClick={handleCompleteActivity}
                disabled={isLoading}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.33331 17.2L9.52379 22L20 10"
                    className={`${
                      movie?.watched || game?.played
                        ? "stroke-darkest-grey group-hover/complete:stroke-light-grey-span"
                        : "stroke-light-grey-span group-hover/complete:stroke-darkest-grey"
                    }`}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M26.6667 10.0834L15.2378 22.0834L14.6667 21.3334"
                    className={`${
                      movie?.watched || game?.played
                        ? "stroke-darkest-grey group-hover/complete:stroke-light-grey-span"
                        : "stroke-light-grey-span group-hover/complete:stroke-darkest-grey"
                    }`}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            ) : (
              <RecurringIcon />
            ))}
        </motion.span>
      </div>
      <div className="flex flex-col absolute bottom-8 items-center max-w-48">
        {game && (
          <>
            <h3 className="text-white text-lg font-black text-center">
              {game?.name}
            </h3>
            <p className="text-lightest-grey text-sm">{`(${
              game?.release_dates[0]?.y || "upcoming"
            })`}</p>
          </>
        )}
        {movie && (
          <>
            <h3 className="text-white text-lg font-black text-center">
              {movie.movieName}
            </h3>
            <p className="text-lightest-grey text-sm">{`(${movie.year})`}</p>
          </>
        )}
      </div>
      {activity && (
        <div className="absolute bottom-0 h-full w-full rounded-lg flex gap-4 items-center justify-center opacity-0 group-hover:bg-black/80 group-hover:opacity-100 transition-all duration-300">
          <button
            className="h-12 w-12 flex items-center justify-center group/delete translate-y-5 group-hover:translate-y-0 transition-all duration-300"
            onClick={handleDeleteActivity}
            disabled={isLoading}
          >
           <CalendarIcon />
          </button>
        </div>
      )}
    </div>
  );
};

export default Day;
