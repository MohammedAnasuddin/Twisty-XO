import { useEffect, useContext, useState } from "react";
import Grid from "../../../entities/grid/ui/Grid.jsx";
import GameStatus from "../../../entities/game/ui/GameStatus.jsx";
import { GameContext } from "../../../entities/game/model/GameContext.jsx";
import { getComputerMove } from "../../../features/computer-move/model/useComputerLogic.js";
import clsx from "clsx";

const Game = () => {
  const { gameSetup, updateGameSetup } = useContext(GameContext);
  const [showRestart, setShowRestart] = useState(false);

  // New: lock while computer is "thinking"
  const [isComputerThinking, setIsComputerThinking] = useState(false);

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
    // Only run AI when:
    // - mode is vsComputer
    // - it's the computer's turn (turn === 0 in your setup)
    // - and the game is not finished
    if (
      gameSetup.mode === "vsComputer" &&
      gameSetup.turn === 0 &&
      gameSetup.gameWinner === null
    ) {
      setIsComputerThinking(true); // lock interactions

      const timer = setTimeout(() => {
        try {
          const computerMove = getComputerMove(gameSetup);
          if (computerMove !== null) {
            updateGameSetup("MAKE_MOVE", { position: computerMove });
          }
        } finally {
          // always unlock after attempting the move
          setIsComputerThinking(false);
        }
      }, 750);

      // cleanup: cancel timeout and unlock
      return () => {
        clearTimeout(timer);
        setIsComputerThinking(false);
      };
    }

    // If any condition isn't met (e.g., mode changed, game ended, or turn changed),
    // make sure we aren't left locked.
    setIsComputerThinking(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameSetup.turn, gameSetup.gameWinner, gameSetup.mode, updateGameSetup]);

  const winnerText =
    gameSetup.gameWinner === "draw"
      ? "It's a Draw!"
      : typeof gameSetup.gameWinner === "number"
      ? `${gameSetup.players[gameSetup.gameWinner]?.symbol ?? ""} Wins`
      : "";

  return (
    <div className="flex flex-col items-center w-full gap-3 mt-3 sm:gap-4 sm:mt-4 lg:mt-2">
      {/* 🟦 GRID ALWAYS SHOWS (pass lock flag) */}
      
      <Grid isLocked={isComputerThinking} />

      {/* 🟩 IF GAME OVER → SHOW WINNER DIALOG */}
      {gameSetup.gameWinner !== null ? (
        <div className="flex flex-col items-center gap-3 pb-4 mt-2 sm:gap-4 sm:mt-3">
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
              onClick={() => updateGameSetup("RESET_FOR_NEXT_ROUND")}
              className="flex items-center gap-2 px-5 py-2 text-base transition-all duration-200 border shadow-lg rounded-xl font-ox bg-white/10 dark:bg-white/5 backdrop-blur-md border-white/20 dark:border-white/10 hover:bg-white/20 dark:hover:bg-white/10 hover:shadow-xl active:scale-95"
            >
              Play Again
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
