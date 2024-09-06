import React from 'react';

interface GameFormProps {
  gameName: string;
  onGameNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const GameForm: React.FC<GameFormProps> = ({ gameName, onGameNameChange, onSubmit }) => {
  return (
    <form className="mb-6" onSubmit={onSubmit}>
      <div className="mb-4">
        <label htmlFor="gameName" className="block text-gray-700 text-sm font-bold mb-2">Game</label>
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          id="gameName"
          value={gameName}
          onChange={onGameNameChange}
        />
      </div>
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Add Game
      </button>
    </form>
  );
}

export default GameForm;
