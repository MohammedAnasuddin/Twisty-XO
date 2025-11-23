import { GameContext } from "../../../entities/game/model/GameContext.jsx";
import { useContext } from "react";

const ModeSelect = () => {
  const { gameSetup, updateGameSetup } = useContext(GameContext);

  const addMode = (selectedMode) => {
    // Instantly set up and start the game with the selected mode.
    updateGameSetup("START_GAME", { mode: selectedMode });
  };

  return (
    <div className="row-span-2 p-4 rounded-md sm:row-span-3 md:row-span-2 col-span-full bg-base-300 sm:p-8 l3 sm:mt-2">
      <p className="text-sm text-center sm:text-base md:text-2xl lg:text-3xl 2xl:text-4xl font-ox">
        Choose Game Mode
      </p>
      <div className="flex items-center justify-center w-full h-full gap-24 p-4 sm:p-6 choices 2xl:p-2 grow md:gap-28">
        <div
          onClick={() => addMode("vsComputer")}
          className="relative flex items-center justify-center btn btn-circle group size-12 sm:size-16 md:size-20 hover:drop-shadow-lg"
        >
          <svg
            className="transition-all duration-300 size-6 sm:size-8 md:size-10 group-hover:text-primary"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H18C18 18.6863 15.3137 16 12 16C8.68629 16 6 18.6863 6 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11Z" />
          </svg>
        </div>

        <div
          id="multiple"
          onClick={() => addMode("vsFriend")}
          className="relative flex items-center justify-center btn btn-circle group size-12 sm:size-16 md:size-20 hover:drop-shadow-lg"
        >
          <svg
            className="transition-all duration-300 size-6 sm:size-8 md:size-10 group-hover:text-primary"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M2 22C2 17.5817 5.58172 14 10 14C14.4183 14 18 17.5817 18 22H16C16 18.6863 13.3137 16 10 16C6.68629 16 4 18.6863 4 22H2ZM10 13C6.685 13 4 10.315 4 7C4 3.685 6.685 1 10 1C13.315 1 16 3.685 16 7C16 10.315 13.315 13 10 13ZM10 11C12.21 11 14 9.21 14 7C14 4.79 12.21 3 10 3C7.79 3 6 4.79 6 7C6 9.21 7.79 11 10 11ZM18.2837 14.7028C21.0644 15.9561 23 18.752 23 22H21C21 19.564 19.5483 17.4671 17.4628 16.5271L18.2837 14.7028ZM17.5962 3.41321C19.5944 4.23703 21 6.20361 21 8.5C21 11.3702 18.8042 13.7252 16 13.9776V11.9646C17.6967 11.7222 19 10.264 19 8.5C19 7.11935 18.2016 5.92603 17.041 5.35635L17.5962 3.41321Z"></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ModeSelect;
