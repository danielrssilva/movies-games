import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { GameCrossedIcon, GameIcon, RemoveIcon } from "./icons";
import { LetterAnimation } from "../helpers/animations";

interface GameCardProps {
  game: Game;
  onRemove: (id: string) => void;
  onUpdate: (game: Game) => void;
}

const GameCard: React.FC<GameCardProps> = (props) => {
  const { game, onRemove, onUpdate } = props;
  return (
    <div className="flex flex-col gap-2 relative flex items-center justify-center font-montserrat w-[264px] h-[374px] bg-darkest-grey rounded-lg group">
      {game.cover?.url && (
        <>
          <img
            src={game.cover?.url.replace("t_thumb", "t_cover_big")}
            alt={game.name}
            className="w-full h-full object-cover rounded-lg"
          />
          <span className="absolute h-full w-full bg-gradient-to-t from-black to-transparent rounded-lg" />
        </>
      )}
      <button
        onClick={() => onRemove(game._id)}
        className="group/delete z-10 absolute -top-4 -right-4 bg-darkest-grey rounded-full p-2 hover:bg-red-900 transition-all duration-300 opacity-0 group-hover:opacity-100"
      >
        <RemoveIcon />
      </button>
      <span className="absolute -top-4 bg-white text-grey font-black px-4 py-1 rounded-full w-20 flex justify-center items-center">
        {game.rating ? (game.rating / 10).toFixed(1) : "•"}
      </span>
      {!game.isRecurring && (
        <button
          onClick={() => onUpdate({ ...game, played: !game.played })}
          className="absolute left-0 group-hover:-left-8 scale-75 group-hover:scale-100 bottom-8 bg-darkest-grey rounded-full p-4 hover:bg-light-grey transition-all duration-300 opacity-0 group-hover:opacity-100"
        >
          {game.played ? (
            <GameCrossedIcon className="fill-light-grey-span" size={32} />
          ) : (
            <GameIcon className="fill-light-grey-span" size={32} />
          )}
        </button>
      )}
      <div className="flex flex-col absolute bottom-8 items-center max-w-48">
        <h3 className="text-white text-lg font-black text-center">
          {game.name}
        </h3>
        <p className="text-lightest-grey text-sm">{`(${
          game.release_dates[0]?.y || "upcoming"
        })`}</p>
      </div>
    </div>
  );
};

export const GameCardSkeleton = () => {
  return (
    <div className="flex flex-col gap-2 relative flex items-center justify-center font-montserrat w-[264px] h-[374px] bg-darkest-grey rounded-lg animate-pulse">
      <span className="absolute -top-4 bg-light-grey h-8 rounded-full w-20" />
    </div>
  );
};

export default GameCard;
