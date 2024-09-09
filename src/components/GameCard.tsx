import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { GameCrossedIcon, GameIcon, RemoveIcon } from "./icons";

interface GameCardProps {
  game: Game;
  onRemove: (id: string) => void;
  onUpdate: (game: Game) => void;
}

const GameCard: React.FC<GameCardProps> = (props) => {
  const { game, onRemove, onUpdate } = props;
  return (
    <div className="flex flex-col gap-2 relative flex items-center justify-center font-montserrat w-[264px] h-[124px] bg-darkest-grey rounded-lg group">
      <button
        onClick={() => onRemove(game._id)}
        className="group/delete z-10 absolute -right-4 -top-4 bg-darkest-grey rounded-full p-2 hover:bg-red-900 transition-all duration-300 opacity-0 group-hover:opacity-100"
      >
        <RemoveIcon />
      </button>
      <span className="absolute -top-4 bg-white text-grey font-black px-2 py-1 rounded-full w-20 flex justify-center items-center">
        1.2 h
      </span>
      <button
        onClick={() => onUpdate({ ...game, played: !game.played })}
        className="absolute -left-2 scale-75 group-hover:scale-100 group-hover:-left-7 bottom-8 bg-white rounded-full p-4 hover:bg-light-grey transition-all duration-300 opacity-0 group-hover:opacity-100"
      >
        {game.played ? (
          <GameCrossedIcon className="fill-darkest-grey" />
        ) : (
          <GameIcon className="fill-darkest-grey" />
        )}
      </button>

      <h3 className="text-white text-lg font-black w-full text-center line-clamp-2 px-8">
        {game.gameName.split("").map((letter, index) => (
          <AnimatePresence key={`game-letter-${letter}-${index}`}>
            <motion.span
              variants={LetterAnimation}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.02 }}
            >
              {letter}
            </motion.span>
          </AnimatePresence>
        ))}
      </h3>
    </div>
  );
};

export const GameCardSkeleton = () => {
  return (
    <div className="flex flex-col gap-2 relative flex items-center justify-center font-montserrat w-[264px] h-[124px] bg-darkest-grey rounded-lg animate-pulse">
      <span className="absolute -top-4 bg-light-grey h-8 rounded-full w-20" />
    </div>
  );
};

const LetterAnimation = {
  hidden: { opacity: 0, transform: "translateY(30px)", scale: 0.8 },
  visible: { opacity: 1, transform: "translateY(0)", scale: 1 },
};

export default GameCard;
