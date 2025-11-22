import { useEffect, useContext, useState } from "react";
import Grid from "./Grid/Grid.jsx";
import { GameContext } from "./context/GameContext";
import { getComputerMove } from "../Logics/useComputerLogic.js";

const Game = () => {
  const { gameSetup, updateGameSetup } = useContext(GameContext);
  const [showRestart, setShowRestart] = useState(false);

  // When someone wins, wait 500ms then show restart button
  useEffect(() => {
    if (gameSetup.gameWinner !== null) {
      setShowRestart(false);
      const timer = setTimeout(() => {
        setShowRestart(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [gameSetup.gameWinner]);

  // Computer move logic
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
  }, [
    gameSetup.turn,
    gameSetup.mode,
    gameSetup.gameWinner,
    gameSetup,
    updateGameSetup,
  ]);

  // Winner text logic
  let winnerText = "";

  if (gameSetup.gameWinner === "draw") {
    winnerText = "It’s a draw!";
  } else if (
    typeof gameSetup.gameWinner === "number" &&
    gameSetup.players[gameSetup.gameWinner]
  ) {
    winnerText = `${gameSetup.players[gameSetup.gameWinner].symbol} wins!`;
  }

  return (
    <div className="flex flex-col items-center justify-start w-full h-full gap-6 mt-6">
      <Grid /> {/* FIRST now */}
      {/* WINNER BANNER */}
      {gameSetup.gameWinner !== null && (
        <div className="text-4xl font-bold animate-symbol-pop text-primary-content">
          {winnerText}
        </div>
      )}
      {/* RESTART BUTTON */}
      {showRestart && (
        <button
          className="btn btn-primary animate-symbol-pop"
          onClick={() => updateGameSetup("RESET_FOR_NEXT_ROUND")}
        >
          Restart
        </button>
      )}
    </div>
  );
};

export default Game;
