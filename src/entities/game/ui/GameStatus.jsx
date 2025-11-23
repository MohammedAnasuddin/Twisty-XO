import { useContext, useEffect, useState } from "react";
import clsx from "clsx";
import { GameContext } from "../model/GameContext";

const GameStatus = () => {
  const { gameSetup, updateGameSetup } = useContext(GameContext);

  /** --------------------------------------------------
   *  Determine WHICH SYMBOL should highlight: 'X' or 'O'
   *  -------------------------------------------------- */
  const currentSymbol = gameSetup.players?.[gameSetup.turn]?.symbol ?? null; // 'X' or 'O'

  /** --------------------------------------------------
   *  Get the actual players by symbol (SAFE for all modes)
   *  -------------------------------------------------- */
  const X = gameSetup.players?.find((p) => p.symbol === "X") ?? {};
  const O = gameSetup.players?.find((p) => p.symbol === "O") ?? {};

  /** --------------------------------------------------
   *  Turn change animation
   *  -------------------------------------------------- */
  const [animateTurn, setAnimateTurn] = useState(false);

  useEffect(() => {
    if (!currentSymbol) return;
    setAnimateTurn(true);
    const t = setTimeout(() => setAnimateTurn(false), 250);
    return () => clearTimeout(t);
  }, [currentSymbol]);

  /** --------------------------------------------------
   *  Restart handler
   *  -------------------------------------------------- */
  const handleRestart = () => {
    updateGameSetup("RESET_FOR_NEXT_ROUND");
  };

  return (
    <div className="grid w-full max-w-sm grid-cols-3 mx-auto mt-4 place-items-center">
      {/* PLAYER X */}
      <div
        className={clsx(
          "px-4 py-2 rounded-xl flex items-center gap-2 font-ox text-lg transition-all",
          currentSymbol === "X" ? "bg-base-300" : "bg-base-200/70",
          currentSymbol === "X" && "shadow-[0_0_12px_var(--color-xSymbol)]",
          currentSymbol === "X" && animateTurn && "scale-105"
        )}
      >
        <span
          className="text-2xl font-bold"
          style={{ color: "var(--color-xSymbol)" }}
        >
          X
        </span>
        <span className="text-sm opacity-80">{X.name || "Player X"}</span>
      </div>

      {/* RESTART BUTTON */}
      <button
        type="button"
        onClick={handleRestart}
        aria-label="Restart game"
        className="inline-flex items-center justify-center gap-2 px-3 py-2 transition-colors duration-150 rounded-full shadow-sm bg-base-200 hover:bg-base-300"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        >
          <path d="M4 4v5h5" />
          <path d="M5.07 8a8 8 0 1 1 -.82 6" />
        </svg>
      </button>

      {/* PLAYER O */}
      <div
        className={clsx(
          "px-4 py-2 rounded-xl flex items-center gap-2 font-ox text-lg transition-all",
          currentSymbol === "O" ? "bg-base-300" : "bg-base-200/70",
          currentSymbol === "O" && "shadow-[0_0_12px_var(--color-oSymbol)]",
          currentSymbol === "O" && animateTurn && "scale-105"
        )}
      >
        <span
          className="text-2xl font-bold"
          style={{ color: "var(--color-oSymbol)" }}
        >
          O
        </span>
        <span className="text-sm opacity-80">{O.name || "Player O"}</span>
      </div>
    </div>
  );
};

export default GameStatus;
