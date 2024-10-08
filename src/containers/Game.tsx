import React, { useState } from "react";
import GameForm from "../components/GameForm";
import { useAddGame, useDeleteGame, useGames, useUpdateGame } from "../api/api";
import GameCard, { GameCardSkeleton } from "../components/GameCard";
import { AnimatePresence, motion } from "framer-motion";
import pluralize from "../helpers/pluralize";

const Game: React.FC = () => {
  const { data: games = [], isLoading } = useGames();
  const { mutate: updateGame } = useUpdateGame();
  const { mutate: deleteGame } = useDeleteGame();

  const playedGames = games.filter((game) => game.played);
  const nextGames = games.filter((game) => !game.played && !game.isRecurring);
  const recurringGames = games.filter((game) => game.isRecurring);

  return (
    <div className="relative">
      <GameForm />
      <h1 className="mb-10 text-white transition-colors duration-300 uppercase font-montserrat font-bold text-[44px]">
        Próximos jogos{" "}
        {nextGames.length > 0 && (
          <span className="text-light-grey font-normal lowercase text-[24px]">
            {nextGames.length} {pluralize("jogo", nextGames.length)} na lista
          </span>
        )}
      </h1>
      <div className="flex flex-wrap gap-10 mb-10 min-h-[374px]">
        {isLoading && (
          <>
            <GameCardSkeleton />
            <GameCardSkeleton />
            <GameCardSkeleton />
          </>
        )}
        <AnimatePresence mode="sync">
          {nextGames.map((game, index) => (
            <motion.div
              key={game._id}
              initial={{ opacity: 0, translateY: -15 }}
              transition={{ delay: 0.1 * index, duration: 0.3 }}
              animate={{ opacity: 1, translateY: 0 }}
              exit={{ opacity: 0, translateY: 15 }}
            >
              <GameCard
                key={`${game._id}-card`}
                game={game}
                onRemove={deleteGame}
                onUpdate={updateGame}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <h1 className="mb-10 text-white transition-colors duration-300 uppercase font-montserrat font-bold text-[44px]">
        Jogos já finalizados{" "}
        {playedGames.length > 0 && (
          <span className="text-light-grey font-normal lowercase text-[24px]">
            {`${playedGames.length} ${pluralize(
              "jogo",
              playedGames.length
            )} ${pluralize("finalizado", playedGames.length)}`}
          </span>
        )}
      </h1>
      <div className="flex flex-wrap gap-10 min-h-[374px]">
        <AnimatePresence mode="sync">
          {playedGames.map((game, index) => (
            <motion.div
              key={game._id}
              initial={{ opacity: 0, translateY: -15 }}
              transition={{ delay: 0.1 * index, duration: 0.3 }}
              animate={{ opacity: 1, translateY: 0 }}
              exit={{ opacity: 0, translateY: -15 }}
            >
              <GameCard
                key={`${game._id}-played-card`}
                game={game}
                onRemove={deleteGame}
                onUpdate={updateGame}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <h1 className="mb-10 text-white transition-colors duration-300 uppercase font-montserrat font-bold text-[44px]">
        Jogos recorrentes{" "}
        {recurringGames.length > 0 && (
          <span className="text-light-grey font-normal lowercase text-[24px]">
            {recurringGames.length} {pluralize("jogo", recurringGames.length)} na lista
          </span>
        )}
      </h1>
      <div className="flex flex-wrap gap-10 mb-10 min-h-[374px]">
        {isLoading && (
          <>
            <GameCardSkeleton />
            <GameCardSkeleton />
            <GameCardSkeleton />
          </>
        )}
        <AnimatePresence mode="sync">
          {recurringGames.map((game, index) => (
            <motion.div
              key={game._id}
              initial={{ opacity: 0, translateY: -15 }}
              transition={{ delay: 0.1 * index, duration: 0.3 }}
              animate={{ opacity: 1, translateY: 0 }}
              exit={{ opacity: 0, translateY: 15 }}
            >
              <GameCard
                key={`${game._id}-recurring-card`}
                game={game}
                onRemove={deleteGame}
                onUpdate={updateGame}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Game;
