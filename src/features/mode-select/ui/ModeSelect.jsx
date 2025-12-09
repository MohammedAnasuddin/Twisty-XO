import { GameContext } from "../../../entities/game/model/GameContext.jsx";
import { useContext } from "react";

const ModeSelect = () => {
  const { updateGameSetup } = useContext(GameContext);

  const addMode = (selectedMode) => {
    updateGameSetup("START_GAME", { mode: selectedMode });
  };

  return (
    <div className="flex flex-col row-span-2 p-4 rounded-md col-span-full sm:row-span-3 md:row-span-3 bg-base-300 l3 sm:p-6 md:p-4 sm:mt-2">
      {/* Heading */}
      <p className="mb-4 text-sm text-center sm:text-base md:text-2xl lg:text-3xl 2xl:text-4xl font-ox sm:mb-6">
        Choose Your Opponent
      </p>

      {/* Choices */}
      <div className="flex flex-row items-center justify-center flex-1 w-full gap-6 choices sm:gap-10 md:gap-16">
        {/* ✅ vs Computer */}
        <div
          className="tooltip tooltip-bottom"
          data-tip="Play against the computer"
        >
          <div
            onClick={() => addMode("vsComputer")}
            className="relative flex items-center justify-center btn btn-circle group size-16 sm:size-20 md:size-24 hover:drop-shadow-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="transition-all duration-300 size-8 sm:size-9 md:size-10 group-hover:text-primary"
              viewBox="0 0 24 24"
            >
              <g
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              >
                <path d="M12 8V4H8" />
                <rect width="16" height="12" x="4" y="8" rx="2" />
                <path d="M2 14h2m16 0h2m-7-1v2m-6-2v2" />
              </g>
            </svg>
          </div>
        </div>

        {/* ✅ vs Friend */}
        <div
          className="tooltip tooltip-bottom"
          data-tip="Play with a friend"
        >
          <div
            onClick={() => addMode("vsFriend")}
            className="relative flex items-center justify-center btn btn-circle group size-16 sm:size-20 md:size-24 hover:drop-shadow-lg"
          >
            <svg
              className="transition-all duration-300 size-8 sm:size-9 md:size-10 group-hover:text-primary"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H18C18 18.6863 15.3137 16 12 16C8.68629 16 6 18.6863 6 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11Z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModeSelect;
