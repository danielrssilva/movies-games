import { useDrag } from "react-dnd";
import { AnimatePresence, motion } from "framer-motion";

interface MovieDraggableProps {
    movie: Movie;
}

const MovieDraggable: React.FC<MovieDraggableProps> = ({ movie }) => {
    const [{ isDragging }, dragRef] = useDrag(
        () => ({
            type: 'movie',
            item: { movie },
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),

        }),
        []
    )
    return (
        <div ref={dragRef} className={`flex flex-col gap-2 relative flex items-center justify-center w-[230px] h-[105px] bg-darkest-grey rounded-lg group overflow-visible border-t-[10px] border-[#282828] ${isDragging ? 'opacity-10' : ''}`}>
            <span className="absolute -left-9 flex justify-between w-full px-4">
                <img src={`images/${movie.person}.png`} className="w-11 h-11 rounded-lg" />
            </span>
            <span className="absolute -top-2">
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <ellipse cx="1" cy="1" rx="1" ry="1" fill="#E7E6E7" />
                    <ellipse cx="5" cy="1" rx="1" ry="1" fill="#E7E6E7" />
                    <ellipse cx="9" cy="1" rx="1" ry="1" fill="#E7E6E7" />
                    <ellipse cx="1" cy="5.00012" rx="1" ry="1" fill="#E7E6E7" />
                    <ellipse cx="5" cy="5.00012" rx="1" ry="1" fill="#E7E6E7" />
                    <ellipse cx="9" cy="5.00012" rx="1" ry="1" fill="#E7E6E7" />
                </svg>
            </span>
            <h3 className="text-white text-[24px] font-bold w-full text-left line-clamp-2 px-8">{movie.movieName.split('').map((letter, index) => (
                <AnimatePresence key={`movie-letter-${letter}-${index}`}>
                    <motion.span variants={LetterAnimation} initial="hidden" animate="visible" transition={{ delay: index * 0.05 }}>{letter}</motion.span>
                </AnimatePresence>
            ))}</h3>
        </div>
    )
}

const LetterAnimation = {
    hidden: { opacity: 0, transform: 'translateY(20px)', scale: 0.8 },
    visible: { opacity: 1, transform: 'translateY(0)', scale: 1 }
}

export default MovieDraggable;