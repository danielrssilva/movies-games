import React, { useState } from "react";
import CollapseButton from "./CollapseButton";
import { useAddGame, useSearchGame } from "../api/api";
import SearchInput from "./SearchInput";
import { GameIcon } from "./icons";

interface GameFormProps {}

const GameForm: React.FC<GameFormProps> = () => {
  const [game, setGame] = useState<Game | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [showGameDropdown, setShowGameDropdown] = useState(false);
  const [isRecurring, setIsRecurring] = useState(false);
  const openGameDropdown = () => {
    setShowGameDropdown(true);
  };

  const {
    mutate: searchGame,
    data: searchResults,
    reset: clearGameSearch,
  } = useSearchGame(openGameDropdown);
  const { mutate: addGame } = useAddGame();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (game) {
      addGame({ ...game, isRecurring });
      clearGameSearch();
      setIsCollapsed(true);
      setGame(null);
      setIsRecurring(false);
    }
  };

  const selectGame = (game: Game) => {
    setGame(game);
    clearGameSearch();
  };

  return (
    <form
      className={`z-50 w-[400px] absolute right-0 -top-32 bg-darkest-grey p-6 ${
        isCollapsed ? "h-[73px] overflow-y-hidden" : "h-auto overflow-y-visible"
      } rounded-lg`}
      onSubmit={handleSubmit}
    >
      <header>
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-white uppercase font-montserrat">
            Adicionar Jogo
          </h1>
          <CollapseButton
            isCollapsed={isCollapsed}
            setIsCollapsed={setIsCollapsed}
          />
        </div>
      </header>
      <div className="mb-4 relative">
        <div className="relative flex flex-col gap-2">
          <div className="mb-4 relative">
            <SearchInput
              value={game?.name || ""}
              onChange={searchGame}
              label="Qual jogo?"
              id="gameName"
              icon={<GameIcon />}
            />
            {!!searchResults?.length && showGameDropdown && (
              <div className="z-10 absolute rounded max-h-[200px] overflow-y-auto p-4 top-20 left-0 w-full h-auto bg-light-bg-grey text-white uppercase text-lg">
                {searchResults?.map((game: Game) => (
                  <button
                    onClick={() => selectGame(game)}
                    key={`${game.id}-game`}
                    className="w-full font-bold border-b border-border-grey p-2 cursor-pointer gap-2 flex items-center"
                  >
                    {game.cover?.url && (
                      <div className="w-[45px] h-[60px]">
                        <img
                          src={game.cover?.url?.replace(
                            "t_thumb",
                            "t_cover_small"
                          )}
                          alt={game.name}
                          className="w-[45px] h-[60px] object-cover"
                        />
                      </div>
                    )}
                    <div className="flex flex-1 h-[60px] w-32 items-center justify-between gap-4">
                      <span
                        className="text-left truncate overflow-hidden"
                        title={game.name}
                      >
                        {game.name}
                      </span>
                      {game.involved_companies?.at(0)?.company.name && (
                        <span className="text-light-grey-span font-montserrat font-light text-[12px] leading-3">
                          {game.involved_companies?.at(0)?.company.name}
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="text-white">
            <label className="font-monomaniac-one text-lightest-grey tracking-widest">
              É um jogo recorrente?
            </label>
            <div className="text-xl flex gap-2 font-montserrat uppercase font-bold text-white uppercase pointer pt-2 pb-4 border-b border-border-grey">
              <button
                type="button"
                className={`font-montserrat uppercase font-bold transition-all ${
                  !isRecurring ? "text-white" : "text-light-grey"
                } uppercase hover:text-white`}
                onClick={() => setIsRecurring(false)}
              >
                Não
              </button>
              <span>/</span>
              <button
                type="button"
                className={`font-montserrat uppercase font-bold transition-all ${
                  isRecurring ? "text-white" : "text-light-grey"
                } uppercase hover:text-white`}
                onClick={() => setIsRecurring(true)}
              >
                Sim
              </button>
            </div>
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="uppercase font-montserrat text-white px-4 py-2 focus:outline-none focus:shadow-outline w-full text-right"
      >
        Salvar
      </button>
    </form>
  );
};

export default GameForm;
