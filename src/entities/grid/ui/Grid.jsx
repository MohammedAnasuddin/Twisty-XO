import Cell from "./Cell";
import { useContext, useEffect, useCallback } from "react";
import { GameContext } from "../../game/model/GameContext.jsx";

const Grid = ({ isLocked = false }) => {
  const { gameSetup, updateGameSetup } = useContext(GameContext);
  const { winningCells, winningColor } = gameSetup;

  const currentPlayer = Number.isInteger(gameSetup.turn)
    ? gameSetup.turn
    : 0;

  const playerObj = gameSetup.players?.[currentPlayer];
  const moves = playerObj?.moves ?? [];
  const oldestMove = playerObj?.oldestMove ?? null;

  const nextTurn = currentPlayer === 1 ? 0 : 1;

  // 🔥 FIXED EFFECT (avoid full gameSetup dependency)
  useEffect(() => {
    const p = gameSetup.players?.[currentPlayer];
    if (!p) return;

    if (p.moves.length >= 3) {
      updateGameSetup(
        ["players", currentPlayer, "oldestMove"],
        p.moves[p.moves.length - 3]
      );
    }
  }, [currentPlayer, gameSetup.players, updateGameSetup]);

  /** --------------------------------------------------
   *  Memoized addSymbol
   *  -------------------------------------------------- */
  const addSymbol = useCallback(
    (position) => {
      if (isLocked) return;
      if (gameSetup.gameWinner !== null) return;

      updateGameSetup("MAKE_MOVE", { position });
    },
    [isLocked, gameSetup.gameWinner, updateGameSetup]
  );

  /** --------------------------------------------------
   *  RENDER GRID
   *  -------------------------------------------------- */
  return (
    <div
      className={
        "grid grid-cols-3 grid-rows-3 size-72 sm:size-80 md:size-96" +
        (isLocked ? " pointer-events-none opacity-50" : "")
      }
    >
      {gameSetup.board.map((symbol, i) => {
        const isOldest = i === oldestMove && moves.length >= 3;

        return (
          <Cell
            key={i}
            symbol={symbol}
            index={i}
            insertSymbol={addSymbol}
            isOldest={isOldest}
            isWinning={winningCells?.includes(i)}
            winningColor={winningColor}
          />
        );
      })}
    </div>
  );
};

export default Grid;