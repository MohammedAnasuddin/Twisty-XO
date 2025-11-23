import { useContext, useEffect, useState } from "react";
import clsx from "clsx";
import { GameContext } from "./context/GameContext";

const GameStatus = () => {
  const { gameSetup, updateGameSetup } = useContext(GameContext);

  // Reliable current player logic
  let current;
  if (gameSetup.gameWinner !== null && gameSetup.gameWinner !== "draw") {
    // Winner should be highlighted if game ended
    current = gameSetup.gameWinner;
  } else {
    // Normal state → use turn
    current = gameSetup.turn;
  }

  const p0 = gameSetup.players?.[0] ?? {};
  const p1 = gameSetup.players?.[1] ?? {};

  const [animateTurn, setAnimateTurn] = useState(false);

  useEffect(() => {
    setAnimateTurn(true);
    const t = setTimeout(() => setAnimateTurn(false), 300);
    return () => clearTimeout(t);
  }, [current]);

  const handleRestart = () => {
    updateGameSetup("RESET_FOR_NEXT_ROUND");
  };

  return (
    <div className="flex items-center justify-center gap-6 mt-4">
      {/* PLAYER X */}
      <div
        className={clsx(
          "px-4 py-2 rounded-xl flex items-center gap-2 font-ox text-lg transition-all",
          current === 1 ? "bg-base-300" : "bg-base-200/70",
          current === 1 && "shadow-[0_0_12px_var(--color-xSymbol)]",
          current === 1 && animateTurn && "scale-105"
        )}
      >
        <span
          className="text-2xl font-bold"
          style={{ color: "var(--color-xSymbol)" }}
        >
          X
        </span>
      </div>

      {/* RESTART BUTTON */}
      <button
        type="button"
        onClick={handleRestart}
        aria-label="Restart game"
        className="inline-flex items-center gap-2 px-3 py-2 transition-colors duration-150 rounded-full shadow-sm bg-base-200 hover:bg-base-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-width="2"
            d="M4 4v5h5M5.07 8a8 8 0 1 1-.818 6"
          />
        </svg>
        <span className="text-sm font-medium">Restart</span>
      </button>

      {/* PLAYER O */}
      <div
        className={clsx(
          "px-4 py-2 rounded-xl flex items-center gap-2 font-ox text-lg transition-all",
          current === 0 ? "bg-base-300" : "bg-base-200/70",
          current === 0 && "shadow-[0_0_12px_var(--color-oSymbol)]",
          current === 0 && animateTurn && "scale-105"
        )}
      >
        <span
          className="text-2xl font-bold"
          style={{ color: "var(--color-oSymbol)" }}
        >
          O
        </span>
      </div>
    </div>
  );
};

export default GameStatus;
