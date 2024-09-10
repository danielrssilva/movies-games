import { useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import { MovieIcon, GameIcon } from "../icons";
import { AnimatePresence, motion } from "framer-motion";
import {
  useAddActivity,
  useDeleteActivity,
  useUpdateActivity,
  useUpdateGame,
  useUpdateMovie,
} from "../../api/api";
import { IconAnimation, LetterAnimation } from "../../helpers/animations";

const Day: React.FC<Day> = ({ day, month, year, activity }) => {
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
    if ((activity?.activity as Game)?.gameName) {
      setGame(activity?.activity as Game);
    } else if ((activity?.activity as Movie)?.movieName) {
      setMovie(activity?.activity as Movie);
    }
    if (activity === null) {
      setGame(undefined);
      setMovie(undefined);
    }
  }, [activity]);

  const isLoading =
    isLoadingAdd ||
    isLoadingUpdate ||
    isLoadingDelete ||
    isLoadingUpdateGame ||
    isLoadingUpdateMovie;

  return (
    <div
      ref={drop}
      className={`flex group flex-col gap-2 relative flex items-center justify-center w-[264px] h-[124px] bg-darkest-grey rounded-lg group overflow-visible transition-all duration-300 ${
        isLoading
          ? "animate-pulse shadow-[0_0_15px_0_rgba(255,255,255,0.5)]"
          : ""
      } ${isOver ? "shadow-[0_0_15px_0_rgba(255,255,255,0.5)] animate-pulse" : ""}`}
    >
      <div className="absolute -top-4 flex justify-between w-full px-4">
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
            animate={game?.gameName ? "visible" : "hidden"}
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
      </div>
      <h3 className="text-white text-[24px] font-bold w-full text-center line-clamp-2 px-8">
        {game?.gameName && (
          <span>
            {game.gameName.split("").map((letter, index) => (
              <AnimatePresence
                key={`letter-day-game-${day}-${month}-${letter}-${index}`}
              >
                <motion.span
                  variants={LetterAnimation}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.05 }}
                >
                  {letter}
                </motion.span>
              </AnimatePresence>
            ))}
          </span>
        )}
        {movie?.movieName && (
          <span>
            {movie.movieName.split("").map((letter, index) => (
              <AnimatePresence
                key={`letter-day-movie-${day}-${month}-${letter}-${index}`}
              >
                <motion.span
                  variants={LetterAnimation}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.05 }}
                >
                  {letter}
                </motion.span>
              </AnimatePresence>
            ))}
          </span>
        )}
      </h3>
      {activity && (
        <div className="absolute bottom-0 w-full flex gap-4 items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button
            className="h-8 w-8 flex items-center justify-center -translate-x-5 group/complete group-hover:translate-x-0 transition-all duration-300"
            onClick={handleCompleteActivity}
            disabled={isLoading}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.33331 17.2L9.52379 22L20 10"
                className={`group-hover/complete:stroke-green-400 ${
                  movie?.watched || game?.played
                    ? "stroke-green-500"
                    : "stroke-light-grey-span"
                }`}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M26.6667 10.0834L15.2378 22.0834L14.6667 21.3334"
                className={`group-hover/complete:stroke-green-500 ${
                  movie?.watched || game?.played
                    ? "stroke-green-600"
                    : "stroke-light-grey-span"
                }`}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            className="h-8 w-8 flex items-center justify-center group/delete translate-x-5 group-hover:translate-x-0 transition-all duration-300"
            onClick={handleDeleteActivity}
            disabled={isLoading}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 13.0011L8 13M7 3V5M17 3V5M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z"
                className="transition-all duration-300 group-hover/delete:stroke-red-500"
                stroke="#ACACAC"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default Day;
