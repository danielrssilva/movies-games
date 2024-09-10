import React, { useState } from "react";
import CollapseButton from "./CollapseButton";

interface GameFormProps {
  gameName: string;
  onGameNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const GameForm: React.FC<GameFormProps> = ({
  gameName,
  onGameNameChange,
  onSubmit,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(e);
    setIsCollapsed(true);
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
          <label className="font-monomaniac-one text-lightest-grey tracking-widest">
            Qual jogo?
          </label>
          <input
            type="text"
            className="w-full px-4 pr-10 pl-0 text-sm border-b border-border-grey placeholder:text-border-grey pt-1 pb-3 text-lg font-montserrat uppercase font-bold text-white bg-darkest-grey focus:outline-none"
            placeholder=""
            value={gameName}
            onChange={onGameNameChange}
          />
          <div className="absolute inset-y-0 top-5 right-0 flex items-center pr-3 pointer-events-none">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.66667 7.08333C6.66667 6.6231 6.29357 6.25 5.83333 6.25C5.37309 6.25 5 6.6231 5 7.08333V7.5H4.58333C4.12309 7.5 3.75 7.87309 3.75 8.33333C3.75 8.79358 4.12309 9.16667 4.58333 9.16667H5V9.58333C5 10.0436 5.37309 10.4167 5.83333 10.4167C6.29357 10.4167 6.66667 10.0436 6.66667 9.58333V9.16667H7.08333C7.54357 9.16667 7.91667 8.79358 7.91667 8.33333C7.91667 7.87309 7.54357 7.5 7.08333 7.5H6.66667V7.08333Z"
                fill="#A4A4A4"
              />
              <path
                d="M14.9999 6.66666C14.9999 7.1269 14.6268 7.49999 14.1666 7.49999C13.7063 7.49999 13.3333 7.1269 13.3333 6.66666C13.3333 6.20643 13.7063 5.83333 14.1666 5.83333C14.6268 5.83333 14.9999 6.20643 14.9999 6.66666Z"
                fill="#A4A4A4"
              />
              <path
                d="M14.1666 10.8333C14.6268 10.8333 14.9999 10.4603 14.9999 10C14.9999 9.53976 14.6268 9.16667 14.1666 9.16667C13.7063 9.16667 13.3333 9.53976 13.3333 10C13.3333 10.4603 13.7063 10.8333 14.1666 10.8333Z"
                fill="#A4A4A4"
              />
              <path
                d="M13.3334 8.33333C13.3334 8.79358 12.9603 9.16667 12.5001 9.16667C12.0398 9.16667 11.6667 8.79358 11.6667 8.33333C11.6667 7.87309 12.0398 7.5 12.5001 7.5C12.9603 7.5 13.3334 7.87309 13.3334 8.33333Z"
                fill="#A4A4A4"
              />
              <path
                d="M15.8333 9.16667C16.2936 9.16667 16.6667 8.79358 16.6667 8.33333C16.6667 7.87309 16.2936 7.5 15.8333 7.5C15.3731 7.5 15 7.87309 15 8.33333C15 8.79358 15.3731 9.16667 15.8333 9.16667Z"
                fill="#A4A4A4"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.99992 2.5C8.48984 2.5 6.63523 2.71514 5.18144 2.92442C3.28579 3.1973 1.74239 4.59747 1.34153 6.49025C1.1172 7.54946 0.897369 8.80183 0.846994 9.85033C0.810874 10.6021 0.73157 11.6526 0.647548 12.6602C0.560132 13.7087 0.909486 14.7887 1.55058 15.5567C2.20478 16.3406 3.24088 16.8689 4.43629 16.5344C5.2017 16.3202 5.81332 15.7823 6.267 15.2522C6.73076 14.7104 7.09985 14.0937 7.36271 13.5919C7.56509 13.2056 7.92436 12.9879 8.26274 12.9879H11.7371C12.0754 12.9879 12.4348 13.2056 12.6371 13.5919C12.9 14.0937 13.2691 14.7104 13.7328 15.2522C14.1865 15.7823 14.7981 16.3202 15.5635 16.5344C16.7589 16.8689 17.795 16.3406 18.4493 15.5567C19.0903 14.7887 19.4397 13.7087 19.3523 12.6602C19.2683 11.6526 19.1889 10.6021 19.1528 9.85033C19.1024 8.80183 18.8826 7.54946 18.6583 6.49025C18.2574 4.59747 16.714 3.1973 14.8183 2.92442C13.3646 2.71514 11.51 2.5 9.99992 2.5ZM5.41891 4.57408C6.85612 4.36719 8.61392 4.16667 9.99992 4.16667C11.3859 4.16667 13.1437 4.36719 14.5809 4.57408C15.8041 4.75016 16.7758 5.64574 17.0278 6.83556C17.2472 7.87137 17.4443 9.01858 17.4881 9.93033C17.5257 10.7133 17.6072 11.7886 17.6913 12.7987C17.7426 13.413 17.5284 14.059 17.1697 14.4888C16.824 14.903 16.424 15.0445 16.0127 14.9294C15.708 14.8441 15.3605 14.5908 14.999 14.1684C14.6475 13.7578 14.3453 13.2609 14.1134 12.8185C13.6702 11.9723 12.7901 11.3212 11.7371 11.3212H8.26274C7.20974 11.3212 6.32968 11.9723 5.88637 12.8185C5.65457 13.2609 5.35229 13.7578 5.00083 14.1684C4.63928 14.5908 4.29181 14.8441 3.98711 14.9294C3.57583 15.0445 3.17577 14.903 2.83013 14.4888C2.47139 14.059 2.25724 13.413 2.30845 12.7987C2.39268 11.7886 2.47412 10.7133 2.51174 9.93033C2.55554 9.01858 2.75266 7.87137 2.97203 6.83556C3.22401 5.64574 4.19573 4.75016 5.41891 4.57408Z"
                fill="#A4A4A4"
              />
            </svg>
          </div>
        </div>
      </div>
      {/* <div className="mb-4 relative">
        <div className="relative flex flex-col gap-2">
          <label className="font-monomaniac-one text-lightest-grey tracking-widest">Qual a duração em horas?</label>
          <input
            type="text"
            className="w-full px-4 pr-10 pl-0 text-sm border-b border-border-grey placeholder:text-border-grey pt-1 pb-3 text-lg font-montserrat uppercase font-bold text-white bg-darkest-grey focus:outline-none"
            placeholder=""
            value={gameName}
            onChange={onGameNameChange}
          />
          <div className="absolute inset-y-0 top-5 right-0 flex items-center pr-3 pointer-events-none">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.49992 10.8333H12.4999M17.4999 5L15.8333 3.33333M8.33325 1.66666H11.6666M9.99992 17.5C6.31802 17.5 3.33325 14.5152 3.33325 10.8333C3.33325 7.15143 6.31802 4.16666 9.99992 4.16666C13.6818 4.16666 16.6666 7.15143 16.6666 10.8333C16.6666 14.5152 13.6818 17.5 9.99992 17.5Z" stroke="#A4A4A4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div> */}
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
