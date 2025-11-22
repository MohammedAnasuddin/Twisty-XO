import { useEffect, useContext } from "react";
import Grid from "./Grid/Grid.jsx";
import { GameContext } from "./context/GameContext";
import { getComputerMove } from "../Logics/useComputerLogic.js";
import WinnerModal from "./Game/WinnerModal.jsx";

const Game = () => {
  const { gameSetup, updateGameSetup } = useContext(GameContext);

  // This effect runs whenever the turn changes.
  useEffect(() => {
    // Check if it's a computer game and if it's the computer's turn (player 0)
    if (
      gameSetup.mode === "vsComputer" &&
      gameSetup.turn === 0 &&
      gameSetup.gameWinner === null
    ) {
      // Add a delay to simulate the computer "thinking"
      const timer = setTimeout(() => {
        const computerMove = getComputerMove(gameSetup);
        if (computerMove !== null) {
          updateGameSetup("MAKE_MOVE", { position: computerMove });
        }
      }, 750); // 0.75 second delay

      // Cleanup function to clear the timeout if the component unmounts
      return () => clearTimeout(timer);
    }
  }, [
    gameSetup.turn,
    gameSetup.mode,
    gameSetup.gameWinner,
    gameSetup,
    updateGameSetup,
  ]);

  // If the game is over (winner or draw), show the results modal.
  if (gameSetup.gameWinner !== null) {
    return <WinnerModal />;
  }

  // Step 4: All setup is complete. Render the game grid.
  return (
    <div className="flex flex-col items-center justify-start  w-full h-full gap-4 m-8">
      {/* <h1 className="text-4xl animate-pulse">
        Turn of {gameSetup.players[gameSetup.turn].name} :{" "}
        {gameSetup.players[gameSetup.turn].symbol}
      </h1> */}
      <Grid />
    </div>
  );
};

export default Game;
