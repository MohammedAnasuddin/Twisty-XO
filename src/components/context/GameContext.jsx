import { createContext, useState } from "react";

export const GameContext = createContext({});
import { useImmer } from "use-immer";
import checkWinner from "../../Logics/checkWinner";

export function GameProvider({ children }) {
  const [gameSetup, setGameSetup] = useImmer({
    board: Array(9).fill(null),
    gameWinner: null,
    mode: null,
    winningCells: [],
    winningSymbol: null,
    winningColor: null,

    players: [
      {
        index: 0,
        name: "",
        isComputer: null,
        isTossWinner: null,
        symbol: null,
        moves: [],
        oldestMove: null,
      },
      {
        index: 1,
        name: "",
        isComputer: false,
        isTossWinner: null,
        symbol: null,
        moves: [],
        oldestMove: null,
      },
    ],
    tossWinner: null,
    turn: null,
  });

  // A set of all valid string-based commands for our reducer.
  // This helps us catch typos and invalid actions during development.
  const VALID_COMMANDS = new Set([
    "START_GAME",
    "MAKE_MOVE",
    "RESET_FOR_NEXT_ROUND",
  ]);

  // A whitelist of state paths that are allowed to be updated by the generic
  // array-based key mechanism. This prevents prototype pollution and unintended state changes.
  const ALLOWED_DYNAMIC_PATHS = new Set([
    "mode",
    "players.0.oldestMove",
    "players.1.oldestMove",
  ]);

  /**
   * Checks if a given key path is on the whitelist for dynamic updates.
   * @param {string[]} keys - The array of keys representing the path.
   * @returns {boolean} - True if the path is allowed, false otherwise.
   */
  function isAllowed(keys) {
    if (!Array.isArray(keys)) return false;
    // Convert the path array (e.g., ['players', 0, 'oldestMove']) to a string ('players.0.oldestMove')
    const pathString = keys.join(".");
    return ALLOWED_DYNAMIC_PATHS.has(pathString);
  }

  function updateGameSetup(keys, value) {
    setGameSetup((draft) => {
      // --- Validation Layer (Runs in ALL environments) ---
      if (typeof keys === "string" && !VALID_COMMANDS.has(keys)) {
        // In development, log a clear error. In production, this fails silently but safely.
        if (process.env.NODE_ENV === "development") {
          console.error(`[GameContext] Invalid command: "${keys}"`);
        }
        // Crucially, stop execution regardless of the environment.
        return;
      }

      if (keys === "START_GAME") {
        const { mode } = value;
        draft.mode = mode;

        if (mode === "vsComputer") {
          // Player 1 (human) is always 'You', 'X', and goes first.
          draft.players[1].name = "You";
          draft.players[1].symbol = "X";
          draft.players[0].name = "Computer";
          draft.players[0].symbol = "O";
          draft.players[0].isComputer = true;
          draft.turn = 1; // Human starts
        } else {
          // vsFriend: Randomly decide who goes first.
          const startingPlayer = Math.round(Math.random()); // 0 or 1
          const otherPlayer = 1 - startingPlayer;

          draft.players[startingPlayer].name = "Player 1";
          draft.players[startingPlayer].symbol = "X";
          draft.players[otherPlayer].name = "Player 2";
          draft.players[otherPlayer].symbol = "O";
          draft.turn = startingPlayer;
        }
        // No more toss winner
        draft.tossWinner = null;
      } else if (keys === "MAKE_MOVE") {
        const { position } = value;
        const currentPlayerIndex = draft.turn;
        const currentPlayer = draft.players[currentPlayerIndex];
        const opponentIndex = currentPlayerIndex === 0 ? 1 : 0;
        const opponent = draft.players[opponentIndex];

        // Prevent move if cell is filled or game is over
        if (draft.board[position] !== null || draft.gameWinner !== null) {
          return;
        }

        // Remove oldest move from board if player already has 3 moves
        if (currentPlayer.moves.length >= 3) {
          draft.board[currentPlayer.oldestMove] = null;
        }

        // Add the move
        currentPlayer.moves.push(position);
        draft.board[position] = currentPlayer.symbol;

        // Update oldestMove for BOTH players
        if (currentPlayer.moves.length >= 3) {
          currentPlayer.oldestMove =
            currentPlayer.moves[currentPlayer.moves.length - 3];
        } else {
          currentPlayer.oldestMove = currentPlayer.moves[0] ?? null;
        }

        if (opponent.moves.length >= 3) {
          opponent.oldestMove = opponent.moves[opponent.moves.length - 3];
        } else {
          opponent.oldestMove = opponent.moves[0] ?? null;
        }

        // Check winner
        const win = checkWinner(draft.board);
        if (win) {
          draft.gameWinner = currentPlayerIndex;
          draft.winningCells = win.cells;
          draft.winningSymbol = win.symbol; // 'X' or 'O' (helpful)
          draft.winningColor =
            win.symbol === "X"
              ? "var(--color-xSymbol)"
              : "var(--color-oSymbol)";

          return;
        }

        // Switch turn
        draft.turn = opponentIndex;
      } else if (keys === "RESET_FOR_NEXT_ROUND") {
        const lastWinnerIndex = draft.gameWinner;

        // Reset the board
        draft.board = Array(9).fill(null);

        // Reset player moves
        draft.players.forEach((player) => {
          player.moves = [];
          player.oldestMove = null;
        });

        // Cleanup winning details
        draft.winningCells = [];
        draft.winningColor = null;
        draft.winningSymbol = null;

        // ★ SAFELY determine next turn
        let nextTurn;

        if (typeof lastWinnerIndex === "number") {
          // Winner starts next round
          nextTurn = lastWinnerIndex;
        } else if (lastWinnerIndex === "draw") {
          // Alternate after draw
          nextTurn = draft.turn === 0 ? 1 : 0;
        } else {
          // Mid-game restart or weird case → default
          nextTurn = 0;
        }

        draft.turn = nextTurn; // ALWAYS safe
        draft.gameWinner = null;
      } else {
        // --- Generic Update Logic with Security Check ---
        if (isAllowed(keys)) {
          // The path is safe, proceed with the update.
          let current = draft;
          for (let i = 0; i < keys.length - 1; i++) {
            current = current[keys[i]];
          }
          current[keys[keys.length - 1]] = value;
        } else if (process.env.NODE_ENV === "development") {
          // If the path is not allowed, log an error in development and do nothing.
          console.error(
            `[GameContext] Blocked an unsafe or disallowed dynamic update for path: [${keys.join(
              ", "
            )}]`
          );
        }
      }
    });
  }

  return (
    <GameContext.Provider value={{ gameSetup, updateGameSetup }}>
      {children}
    </GameContext.Provider>
  );
}
