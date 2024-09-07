import React, { useState } from "react";
import GameForm from "../components/GameForm";
import { useAddGame, useDeleteGame, useGames, useUpdateGame } from "../api/api";
import GameCard from "../components/GameCard";

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
        {nextGames.map((game) => {
          return <GameCard key={game._id} game={game} onRemove={deleteGame} onUpdate={updateGame} />
        })}
      </div>
      <h1
        className="mb-10 text-white transition-colors duration-300 uppercase font-montserrat font-bold text-[44px]"
      >
        Jogos já finalizados
      </h1>
      <div className="flex flex-wrap gap-10">
        {playedGames.map((game) => {
          return <GameCard key={game._id} game={game} onRemove={deleteGame} onUpdate={updateGame} />
        })}
      </div>
    </div>
  );
}

export default GameTab;
