import React, { useState } from "react";
import DataTable, { Column } from "../components/DataTable";
import GameForm from "../components/GameForm";
import { useGameContext } from "../contexts/GameContext";

const GameTab: React.FC = () => {
  const { games, addGame, removeGame, togglePlayed, editGame } = useGameContext();
  const [gameName, setGameName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (gameName) {
      addGame({ gameName, played: false });
      setGameName("");
    }
  };

  const handleEdit = (game: any, key: string, value: string) => {
    editGame(game, { [key]: value });
  };

  const columns: Column[] = [
    { 
      key: 'game', 
      dataKey: 'gameName', 
      width: 'w-4/5', // Increased width for game name
      header: 'Game', 
      truncate: true,
      editable: true,
      renderCell: (game, isEditing, onChange, onSubmit) => (
        <div className="flex items-center">
          <input 
            type="checkbox" 
            className="mr-2 form-checkbox h-5 w-5 text-blue-600"
            checked={game.played}
            onChange={() => togglePlayed(game)}
          />
          {isEditing ? (
            <input
              type="text"
              defaultValue={game.gameName}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  onSubmit();
                }
              }}
              className="w-full px-2 py-1 border rounded"
              autoFocus
            />
          ) : (
            <span className="truncate">{game.gameName}</span>
          )}
        </div>
      )
    },
    { key: 'actions', dataKey: 'actions', width: 'w-1/5' } // Removed 'Actions' text
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Game Database</h1>
      <GameForm 
        gameName={gameName}
        onGameNameChange={(e: React.ChangeEvent<HTMLInputElement>) => setGameName(e.target.value)}
        onSubmit={handleSubmit}
      />
      <DataTable 
        data={games}
        columns={columns}
        onToggle={togglePlayed}
        onRemove={removeGame}
        onEdit={handleEdit}
      />
    </div>
  );
}

export default GameTab;
