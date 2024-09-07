import { useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import { MovieIcon, GameIcon } from "../icons";
import { AnimatePresence, motion } from "framer-motion";
import { useAddActivity, useDeleteActivity, useUpdateActivity, useUpdateGame, useUpdateMovie } from "../../api/api";

const Day: React.FC<Day> = ({ day, month, year, activity }) => {
    const [game, setGame] = useState<Game>();
    const [movie, setMovie] = useState<Movie>();
    const { mutate: addActivity, isPending: isLoadingAdd } = useAddActivity();
    const { mutate: deleteActivity, isPending: isLoadingDelete } = useDeleteActivity();
    const { mutate: updateActivity, isPending: isLoadingUpdate } = useUpdateActivity();
    const { mutate: updateGame, isPending: isLoadingUpdateGame } = useUpdateGame();
    const { mutate: updateMovie, isPending: isLoadingUpdateMovie } = useUpdateMovie();

    const [{ isOver }, drop] = useDrop(
        () => ({
            accept: ['game', 'movie'],
            drop: (item: { game: Game, movie: Movie }) => {
                const activityModel = item.game || item.movie;
                const existingActivity = activity?.activity as (Game | Movie | undefined);
                if (existingActivity && existingActivity._id) {
                    updateActivity({
                        _id: activity?._id || '',
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
                isOver: !!monitor.isOver()
            })
        }),
        [activity, year, month, day]
    )

    const handleDeleteActivity = () => {
        deleteActivity(activity?._id || '');
    }

    const handleCompleteActivity = () => {
        if (game) {
            setGame({ ...game, played: !game.played });
            updateGame({ ...game, played: !game.played });
        } else if (movie) {
            setMovie({ ...movie, watched: !movie.watched });
            updateMovie({ ...movie, watched: !movie.watched });
        }
    }

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
    }, [activity])


    const isLoading = isLoadingAdd || isLoadingUpdate || isLoadingDelete || isLoadingUpdateGame || isLoadingUpdateMovie;

    return (
        <div ref={drop} onClick={() => { console.log("game", game, "movie", movie, "activity", activity) }} className={`flex group flex-col gap-2 relative flex items-center justify-center w-[264px] h-[124px] bg-darkest-grey rounded-lg group overflow-visible transition-all duration-300 ${isLoading ? 'animate-pulse shadow-[0_0_15px_0_rgba(255,255,255,0.5)]' : ''} ${isOver ? 'shadow-[0_0_15px_0_rgba(255,255,255,0.5)]' : ''}`}>
            <div className="absolute -top-4 flex justify-between w-full px-4">
                <motion.span variants={IconAnimation} initial="hidden" animate="visible" className="bg-white text-grey font-bold px-2 py-1 rounded-full w-32 flex justify-center items-center">
                    {day}/{month}
                </motion.span>
                <motion.span variants={IconAnimation} initial="hidden" animate="visible" className="bg-white text-grey font-black px-2 py-1 rounded-full w-16 flex justify-center items-center relative">
                    <motion.div variants={IconAnimation} initial="hidden" animate={game?.gameName ? "visible" : "hidden"} className="absolute"><GameIcon className="fill-darkest-grey" /></motion.div>
                    <motion.div variants={IconAnimation} initial="hidden" animate={movie?.movieName ? "visible" : "hidden"} className="absolute"><MovieIcon className="fill-darkest-grey" /></motion.div>
                </motion.span>
            </div>
            <h3 className="text-white text-[24px] font-bold w-full text-center line-clamp-2 px-8">
                {game?.gameName &&
                    <span>
                        {game.gameName.split('').map((letter, index) => (
                            <AnimatePresence key={`letter-day-game-${day}-${month}-${letter}-${index}`}>
                                <motion.span variants={LetterAnimation} initial="hidden" animate="visible" transition={{ delay: index * 0.05 }}>{letter}</motion.span>
                            </AnimatePresence>
                        ))}
                    </span>
                }
                {movie?.movieName &&
                    <span>
                        {movie.movieName.split('').map((letter, index) => (
                            <AnimatePresence key={`letter-day-movie-${day}-${month}-${letter}-${index}`}>
                                <motion.span variants={LetterAnimation} initial="hidden" animate="visible" transition={{ delay: index * 0.05 }}>{letter}</motion.span>
                            </AnimatePresence>
                        ))}
                    </span>
                }
            </h3>
            {activity && <div className="absolute bottom-0 w-full flex gap-4 items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                <button className="h-8 w-8 flex items-center justify-center -translate-x-5 group-hover:translate-x-0 transition-all duration-300" onClick={handleCompleteActivity} disabled={isLoading}>
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.33331 17.2L9.52379 22L20 10" className={`${movie?.watched || game?.played ? 'stroke-green-500' : 'stroke-light-grey-span'}`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M26.6667 10.0834L15.2378 22.0834L14.6667 21.3334" className={`${movie?.watched || game?.played ? 'stroke-green-500' : 'stroke-light-grey-span'}`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
                <button className="h-8 w-8 flex items-center justify-center group/delete translate-x-5 group-hover:translate-x-0 transition-all duration-300" onClick={handleDeleteActivity} disabled={isLoading}>
                    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover/delete:stroke-red-600">
                        <path d="M13.7164 2.75139L10.9989 5.46966L8.2814 2.75139C8.04342 2.51318 7.76084 2.32422 7.44983 2.19528C7.13881 2.06636 6.80544 2 6.46876 2C6.1321 2 5.79872 2.06636 5.4877 2.19528C5.17669 2.32422 4.89411 2.51318 4.65613 2.75139L3.75266 3.65724C3.5141 3.89505 3.3248 4.17763 3.19564 4.48876C3.06649 4.7999 3 5.13348 3 5.47037C3 5.80727 3.06649 6.14085 3.19564 6.45199C3.3248 6.76312 3.5141 7.0457 3.75266 7.28351L6.47019 10.0004L3.75266 12.718C3.5141 12.9557 3.3248 13.2383 3.19564 13.5494C3.06649 13.8606 3 14.1941 3 14.5311C3 14.868 3.06649 15.2015 3.19564 15.5127C3.3248 15.8238 3.5141 16.1064 3.75266 16.3442L4.65827 17.2487C4.89625 17.4868 5.17882 17.6758 5.48984 17.8048C5.80086 17.9337 6.13423 18 6.4709 18C6.80757 18 7.14094 17.9337 7.45196 17.8048C7.76298 17.6758 8.04555 17.4868 8.28353 17.2487L10.9989 14.5304L13.7164 17.2487C13.9544 17.4868 14.237 17.6758 14.548 17.8048C14.859 17.9337 15.1924 18 15.5291 18C15.8658 18 16.1991 17.9337 16.5102 17.8048C16.8211 17.6758 17.1037 17.4868 17.3417 17.2487L18.2473 16.3428C18.4859 16.105 18.6751 15.8224 18.8043 15.5112C18.9335 15.2001 19 14.8666 19 14.5297C19 14.1927 18.9335 13.8592 18.8043 13.548C18.6751 13.2369 18.4859 12.9543 18.2473 12.7165L15.5283 10.0004L18.2452 7.28137C18.4837 7.04357 18.673 6.76099 18.8022 6.44986C18.9313 6.13872 18.9979 5.80514 18.9979 5.46824C18.9979 5.13135 18.9313 4.79777 18.8022 4.48663C18.673 4.17549 18.4837 3.89292 18.2452 3.65511L17.3396 2.75139C16.859 2.27095 16.2074 2.00107 15.528 2.00107C14.8486 2.00107 14.197 2.27095 13.7164 2.75139Z" stroke="#A4A4A4" strokeWidth="1.5" strokeLinecap="round" className='group-hover/delete:stroke-red-500' strokeLinejoin="round" />
                    </svg>
                </button>
            </div>}
        </div>
    )
}

const IconAnimation = {
    hidden: { opacity: 0, scale: 0, display: 'none' },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.2 }, display: 'flex' }
}

const LetterAnimation = {
    hidden: { opacity: 0, transform: 'translateY(20px)', scale: 0.8 },
    visible: { opacity: 1, transform: 'translateY(0)', scale: 1 }
}


export default Day;