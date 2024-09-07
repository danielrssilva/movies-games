import React, { useState } from "react";
import GameForm from "../components/GameForm";
import { useAddGame, useDeleteGame, useGames, useUpdateGame } from "../api/api";
import GameCard, { GameCardSkeleton } from "../components/GameCard";
import { motion } from "framer-motion";

const GameTab: React.FC = () => {
  const { data: games = [], isLoading, error } = useGames();
  const { mutate: addGame } = useAddGame();
  const { mutate: updateGame } = useUpdateGame();
  const { mutate: deleteGame } = useDeleteGame();

  const [gameName, setGameName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (gameName) {
      addGame({ gameName, played: false });
      setGameName("");
    }
  };

  const playedGames = games.filter((game) => game.played);
  const nextGames = games.filter((game) => !game.played);

  return (
    <div className="relative">
      <GameForm
        gameName={gameName}
        onGameNameChange={(e: React.ChangeEvent<HTMLInputElement>) => setGameName(e.target.value)}
        onSubmit={handleSubmit}
      />
      <h1
        className="mb-10 text-white transition-colors duration-300 uppercase font-montserrat font-bold text-[44px]"
      >
        Próximos jogos
      </h1>
      <div className="flex flex-wrap gap-10 mb-10 min-h-[124px]">
        {isLoading && (
          <>
            <GameCardSkeleton />
            <GameCardSkeleton />
            <GameCardSkeleton />
          </>
        ) }
        {nextGames.map((game, index) => (
          <motion.div key={game._id} initial={{ opacity: 0, translateY: -15 }} transition={{ delay: 0.1 * index, duration: 0.3 }} animate={{ opacity: 1, translateY: 0 }} exit={{ opacity: 0, translateY: 15 }}>
            <GameCard key={game._id} game={game} onRemove={deleteGame} onUpdate={updateGame} />
          </motion.div>
        ))}
      </div>
      <h1
        className="mb-10 text-white transition-colors duration-300 uppercase font-montserrat font-bold text-[44px]"
      >
        Jogos já finalizados
      </h1>
      <div className="flex flex-wrap gap-10">
        {playedGames.map((game, index) =>
          <motion.div key={game._id} initial={{ opacity: 0, translateY: -15 }} transition={{ delay: 0.1 * index, duration: 0.3 }} animate={{ opacity: 1, translateY: 0 }} exit={{ opacity: 0, translateY: 15 }}>
            <GameCard key={game._id} game={game} onRemove={deleteGame} onUpdate={updateGame} />
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default GameTab;
