import { useEffect, useContext, useState } from "react";
import Grid from "./Grid/Grid.jsx";
import GameStatus from "./GameStatus.jsx";
import { GameContext } from "./context/GameContext";
import { getComputerMove } from "../Logics/useComputerLogic.js";
import clsx from "clsx";

const Game = () => {
  const { gameSetup, updateGameSetup } = useContext(GameContext);
  const [showRestart, setShowRestart] = useState(false);

  // Delay restart button
  useEffect(() => {
    if (gameSetup.gameWinner !== null) {
      setShowRestart(false);
      const timer = setTimeout(() => setShowRestart(true), 500);
      return () => clearTimeout(timer);
    }
  }, [gameSetup.gameWinner]);

  // Computer AI
  useEffect(() => {
    if (
      gameSetup.mode === "vsComputer" &&
      gameSetup.turn === 0 &&
      gameSetup.gameWinner === null
    ) {
      const timer = setTimeout(() => {
        const computerMove = getComputerMove(gameSetup);
        if (computerMove !== null) {
          updateGameSetup("MAKE_MOVE", { position: computerMove });
        }
      }, 750);

      return () => clearTimeout(timer);
    }
  }, [gameSetup.turn, gameSetup.gameWinner]);

  const winnerText =
    gameSetup.gameWinner === "draw"
      ? "It's a Draw!"
      : typeof gameSetup.gameWinner === "number"
      ? `${gameSetup.players[gameSetup.gameWinner]?.symbol ?? ""} Wins`
      : "";

  return (
    <div className="flex flex-col items-center w-full gap-4 mt-6">
      {/* 🟦 GRID ALWAYS SHOWS */}
      <Grid />

      {/* 🟩 IF GAME OVER → SHOW WINNER DIALOG */}
      {gameSetup.gameWinner !== null ? (
        <div className="flex flex-col items-center gap-4 mt-4">
          {/* WINNER BANNER (with glow + gradient) */}
          <div
            className={clsx(
              "text-5xl sm:text-6xl font-extrabold font-bungee3d animate-winner-pop text-center tracking-wide",
              gameSetup.gameWinner === "draw"
                ? "text-gradient-neutral"
                : gameSetup.players[gameSetup.gameWinner].symbol === "X"
                ? "text-gradient-x"
                : "text-gradient-o"
            )}
          >
            {winnerText}
          </div>

          {/* Restart Button (delay) */}
          {showRestart && (
            <button
              className="btn btn-primary animate-symbol-pop"
              onClick={() => updateGameSetup("RESET_FOR_NEXT_ROUND")}
            >
              Restart
            </button>
          )}
        </div>
      ) : (
        /* 🟦 IF NO WINNER → SHOW GAME STATUS */
        <GameStatus />
      )}
    </div>
  );
};

export default Game;
