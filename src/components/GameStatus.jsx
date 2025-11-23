import { useContext, useEffect, useState } from "react";
import clsx from "clsx";
import { GameContext } from "./context/GameContext";

const GameStatus = () => {
  const { gameSetup, updateGameSetup } = useContext(GameContext);

  /** --------------------------------------------------
   *  TRUE CURRENT PLAYER TO HIGHLIGHT
   *  -------------------------------------------------- */
  let highlightPlayer = null;

  if (typeof gameSetup.gameWinner === "number") {
    // Highlight winner after game ends
    highlightPlayer = gameSetup.gameWinner;
  } else if (gameSetup.gameWinner === "draw") {
    // Draw → highlight no one
    highlightPlayer = null;
  } else if (Number.isInteger(gameSetup.turn)) {
    // Normal gameplay → highlight current turn
    highlightPlayer = gameSetup.turn;
  } else {
    // Safety fallback
    highlightPlayer = 0;
  }

  const p0 = gameSetup.players?.[0] ?? {};
  const p1 = gameSetup.players?.[1] ?? {};

  /** --------------------------------------------------
   *  SMALL TURN-CHANGE ANIMATION
   *  -------------------------------------------------- */
  const [animateTurn, setAnimateTurn] = useState(false);

  useEffect(() => {
    if (highlightPlayer === null) return; // No animation on draw
    setAnimateTurn(true);
    const t = setTimeout(() => setAnimateTurn(false), 250);
    return () => clearTimeout(t);
  }, [highlightPlayer]);

  /** --------------------------------------------------
   *  HANDLE RESTART
   *  -------------------------------------------------- */
  const handleRestart = () => {
    updateGameSetup("RESET_FOR_NEXT_ROUND");
  };

  return (
    <div className="flex items-center justify-center gap-6 mt-4">
      {/* ===========================
          PLAYER X
      ============================ */}
      <div
        className={clsx(
          "px-4 py-2 rounded-xl flex items-center gap-2 font-ox text-lg transition-all",
          highlightPlayer === 1 ? "bg-base-300" : "bg-base-200/70",
          highlightPlayer === 1 && "shadow-[0_0_12px_var(--color-xSymbol)]",
          highlightPlayer === 1 && animateTurn && "scale-105"
        )}
      >
        <span
          className="text-2xl font-bold"
          style={{ color: "var(--color-xSymbol)" }}
        >
          X
        </span>
        <span className="text-sm opacity-80">{p1.name || "Player X"}</span>
      </div>

      {/* ===========================
          RESTART BUTTON
      ============================ */}
      <button
        type="button"
        onClick={handleRestart}
        aria-label="Restart game"
        className="inline-flex items-center gap-2 px-3 py-2 transition-colors duration-150 rounded-full shadow-sm bg-base-200 hover:bg-base-300"
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
        <span className="text-sm font-medium">Restart</span>
      </button>

      {/* ===========================
          PLAYER O
      ============================ */}
      <div
        className={clsx(
          "px-4 py-2 rounded-xl flex items-center gap-2 font-ox text-lg transition-all",
          highlightPlayer === 0 ? "bg-base-300" : "bg-base-200/70",
          highlightPlayer === 0 && "shadow-[0_0_12px_var(--color-oSymbol)]",
          highlightPlayer === 0 && animateTurn && "scale-105"
        )}
      >
        <span
          className="text-2xl font-bold"
          style={{ color: "var(--color-oSymbol)" }}
        >
          O
        </span>
        <span className="text-sm opacity-80">{p0.name || "Player O"}</span>
      </div>
    </div>
  );
};

export default GameStatus;
