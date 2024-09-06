import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import * as api from '../api/api';

interface Game {
  _id: string;
  gameName: string;
  played: boolean;
}

interface GameContextType {
  games: Game[];
  addGame: (game: Omit<Game, '_id'>) => Promise<void>;
  removeGame: (game: Game) => Promise<void>;
  togglePlayed: (game: Game) => Promise<void>;
  editGame: (game: Game, updates: Partial<Game>) => Promise<void>;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    const response = await api.fetchGames();
    setGames(response.data);
  };

  const addGame = async (game: Omit<Game, '_id'>) => {
    const response = await api.addGame(game);
    setGames([...games, response.data]);
  };

  const removeGame = async (gameToRemove: Game) => {
    await api.deleteGame(gameToRemove._id);
    setGames(games.filter(game => game._id !== gameToRemove._id));
  };

  const togglePlayed = async (gameToToggle: Game) => {
    const updatedGame = { ...gameToToggle, played: !gameToToggle.played };
    const response = await api.updateGame(gameToToggle._id, updatedGame);
    setGames(games.map(game => game._id === gameToToggle._id ? response.data : game));
  };

  const editGame = async (gameToEdit: Game, updates: Partial<Game>) => {
    const response = await api.updateGame(gameToEdit._id, { ...gameToEdit, ...updates });
    setGames(games.map(game => game._id === gameToEdit._id ? response.data : game));
  };

  return (
    <GameContext.Provider value={{ games, addGame, removeGame, togglePlayed, editGame }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
};