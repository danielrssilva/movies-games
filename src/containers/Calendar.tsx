import { useEffect, useState, Fragment } from "react";
import { Month, Day, MovieDraggable, GameDraggable } from "../components/calendar";
import { useGames, useGetActivities, useMovies } from "../api/api";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from "react-dnd-html5-backend";
import { AnimatePresence, motion } from "framer-motion";


const Calendar: React.FC = () => {
    const [thisYearMondays, setThisYearMondays] = useState<Date[]>([]);
    const [nextYearMondays, setNextYearMondays] = useState<Date[]>([]);
    const { data: activities = [], isLoading: isLoadingActivities } = useGetActivities();
    const { data: games = [], isLoading: isLoadingGames } = useGames();
    const { data: movies = [], isLoading: isLoadingMovies } = useMovies();

    const filteredMovies = movies.filter((movie) => !movie.watched);
    const filteredGames = games.filter((game) => !game.played);

    useEffect(() => {
        const date = new Date(),
            year = date.getFullYear(),
            nextYear = year + 1,
            mondays: Date[] = [],
            nextYearMondays: Date[] = [];
        date.setDate(1);

        while (date.getDay() !== 1) {
            date.setDate(date.getDate() + 1);
        }
        while (date.getFullYear() === year) {
            var pushDate = new Date(date.getTime());
            mondays.push(new Date(`${pushDate.getFullYear()}-${pushDate.getMonth() + 1}-${pushDate.getDate()}`));
            date.setDate(date.getDate() + 7);
        }
        setThisYearMondays(mondays);

        while (date.getDay() !== 1) {
            date.setDate(date.getDate() + 1);
        }
        while (date.getFullYear() === nextYear) {
            var pushDate = new Date(date.getTime());
            nextYearMondays.push(new Date(`${pushDate.getFullYear()}-${pushDate.getMonth() + 1}-${pushDate.getDate()}`));
            date.setDate(date.getDate() + 7);
        }
        setNextYearMondays(nextYearMondays);
    }, []);

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="h-full w-full">
                <section className="flex flex-col gap-8">
                    <div className="flex flex-col">
                        <h3 className="text-white text-[24px] font-bold">2024</h3>
                        <div className="w-auto grid grid-flow-col gap-8 overflow-x-auto py-5">
                            <motion.div
                                variants={dayAnimation}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}>
                                <Month date={thisYearMondays[0]} activityCount={0} weeksCount={0} />
                            </motion.div>
                            {thisYearMondays?.map((monday, index) => {
                                if (index !== 0 && monday.getMonth() !== thisYearMondays[index - 1]?.getMonth()) {
                                    return (
                                        <AnimatePresence key={`month-${monday.getMonth()}-${monday.getFullYear()}`}>
                                            <motion.div
                                                key={`month-${monday.getMonth()}-${monday.getFullYear()}`}
                                                variants={dayAnimation}
                                                initial="hidden"
                                                whileInView="visible"
                                                viewport={{ once: true }}>
                                                <Month date={monday} activityCount={0} weeksCount={0} />
                                            </motion.div>
                                            <motion.div
                                                key={`day-${monday.getDate()}-${monday.getMonth()}-${monday.getFullYear()}`}
                                                variants={dayAnimation}
                                                initial="hidden"
                                                whileInView="visible"
                                                viewport={{ once: true }}
                                            >
                                                <Day activity={activities.find((activity) => (activity.date.getDate() === monday.getDate() && activity.date.getMonth() === monday.getMonth() && activity.date.getFullYear() === monday.getFullYear())) || null} key={index} day={monday.getDate()} month={monday.getMonth() + 1} year={monday.getFullYear()} />
                                            </motion.div>
                                        </AnimatePresence>
                                    )
                                } else {
                                    return (
                                        <motion.div
                                            key={`day-${monday.getDate()}-${monday.getMonth()}-${monday.getFullYear()}`}
                                            variants={dayAnimation}
                                            initial="hidden"
                                            whileInView="visible"
                                            viewport={{ once: true }}
                                        >
                                            <Day activity={activities.find((activity) =>
                                                (activity.date.getDate() === monday.getDate() && activity.date.getMonth() === monday.getMonth() && activity.date.getFullYear() === monday.getFullYear())
                                            ) || null} key={index} day={monday.getDate()} month={monday.getMonth() + 1} year={monday.getFullYear()} />
                                        </motion.div>
                                    )
                                }
                            })}
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <h3 className="text-white text-[24px] font-bold">2025</h3>
                        <div className="w-auto grid grid-flow-col gap-8 overflow-x-auto py-5">
                            <motion.div
                                variants={dayAnimation}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}>
                                <Month date={nextYearMondays[0]} activityCount={0} weeksCount={0} />
                            </motion.div>
                            {nextYearMondays?.map((monday, index) => {
                                if (index !== 0 && monday.getMonth() !== nextYearMondays[index - 1]?.getMonth()) {
                                    return (
                                        <AnimatePresence key={`next-month-${monday.getMonth()}-${monday.getFullYear()}`}>
                                            <motion.div
                                                key={`next-month-${monday.getMonth()}-${monday.getFullYear()}`}
                                                variants={dayAnimation}
                                                initial="hidden"
                                                whileInView="visible"
                                                viewport={{ once: true }}>
                                                <Month date={monday} activityCount={0} weeksCount={0} />
                                            </motion.div>
                                            <motion.div
                                                key={`next-day-${monday.getDate()}-${monday.getMonth()}-${monday.getFullYear()}`}
                                                variants={dayAnimation}
                                                initial="hidden"
                                                whileInView="visible"
                                                viewport={{ once: true }}
                                            >
                                                <Day activity={activities.find((activity) =>
                                                    (activity.date.getDate() === monday.getDate() && activity.date.getMonth() === monday.getMonth() && activity.date.getFullYear() === monday.getFullYear())
                                                ) || null} key={index} day={monday.getDate()} month={monday.getMonth() + 1} year={monday.getFullYear()} />
                                            </motion.div>
                                        </AnimatePresence>
                                    )
                                } else {
                                    return (
                                        <motion.div
                                            key={`next-day-${monday.getDate()}-${monday.getMonth()}-${monday.getFullYear()}`}
                                            variants={dayAnimation}
                                            initial="hidden"
                                            whileInView="visible"
                                            viewport={{ once: true }}
                                        >
                                            <Day activity={activities.find((activity) =>
                                                (activity.date.getDate() === monday.getDate() && activity.date.getMonth() === monday.getMonth() && activity.date.getFullYear() === monday.getFullYear())
                                            ) || null} key={index} day={monday.getDate()} month={monday.getMonth() + 1} year={monday.getFullYear()} />
                                        </motion.div>
                                    )
                                }
                            })}
                        </div>
                    </div>
                </section>
                <div className="flex justify-between gap-24">
                    <section className="flex flex-col gap-8 w-1/2">
                        <h1 className="uppercase font-montserrat font-bold text-[64px] text-white">Filmes</h1>
                        <div className="w-auto grid grid-cols-3 gap-8 py-5">
                            {filteredMovies.map((movie, index) => (
                                <AnimatePresence key={`draggable-movie-${movie._id}`}>
                                    <motion.div
                                        variants={dayAnimation}
                                        initial="hidden"
                                        animate="visible"
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <MovieDraggable movie={movie} />
                                    </motion.div>
                                </AnimatePresence>
                            ))}
                        </div>
                    </section>
                    <section className="flex flex-col gap-8 w-1/2">
                        <h1 className="uppercase font-montserrat font-bold text-[64px] text-white text-right">Jogos</h1>
                        <div className="w-auto grid grid-cols-3 gap-8 py-5">
                            {filteredGames.map((game, index) => (
                                <AnimatePresence key={`draggable-game-${game._id}`}>
                                    <motion.div
                                        variants={dayAnimation}
                                        initial="hidden"
                                        animate="visible"
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <GameDraggable game={game} />
                                    </motion.div>
                                </AnimatePresence>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </DndProvider>
    )
}

const dayAnimation = {
    hidden: { opacity: 0, translateX: -10, scale: 0.9 },
    visible: { opacity: 1, translateX: 0, scale: 1 },
}

export default Calendar;