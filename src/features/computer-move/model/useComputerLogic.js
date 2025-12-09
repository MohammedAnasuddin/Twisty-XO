/**
 * This hook contains the logic for the computer's moves.
 */
//. HEursitic the HOok folows
/* 
1. Win Now: Check if it can place a piece and win immediately. If so, take the win.
2. Block Opponent: Check if the human player can win on their next turn. If so, block that move.
3. Strategic Move: If neither of the above is true, follow a set of smart rules:
    Take the center square if it's available.
    If not, take one of the corner squares.
    If not, take one of the side squares.
4. Fallback: If all else fails (which is unlikely), make a random move.


*/

const getComputerMove = (gameSetup) => {
  // We are now only using one level of difficulty, which is the "hard" mode logic.
  return getMove(gameSetup);
};

// -- Follows a set of smart rules (heuristics) ---
const getMove = (gameSetup) => {
  const computer = gameSetup.players[0];
  const human = gameSetup.players[1];

  // Helper to check for a winning move
  const findWinningMove = (board, symbol) => {
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        const tempBoard = [...board];
        tempBoard[i] = symbol;
        if (checkWinner(tempBoard) === symbol) {
          return i; // Winning move found
        }
      }
    }
    return null;
  };

  // 1. Check if Computer can win in the next move
  const winningMove = findWinningMove(gameSetup.board, computer.symbol);
  if (winningMove !== null) return winningMove;

  // 2. Check if Human can win in the next move, and block them
  const blockingMove = findWinningMove(gameSetup.board, human.symbol);
  if (blockingMove !== null) return blockingMove;

  // 3. Take the center if it's available
  if (gameSetup.board[4] === null) return 4;

  // 4. Take one of the corners if available
  const corners = [0, 2, 6, 8];
  const availableCorners = corners.filter((i) => gameSetup.board[i] === null);
  if (availableCorners.length > 0) {
    return availableCorners[
      Math.floor(Math.random() * availableCorners.length)
    ];
  }

  // 5. Fallback to a random move (sides)
  const emptyCells = [];
  gameSetup.board.forEach((cell, index) => {
    if (cell === null) {
      emptyCells.push(index);
    }
  });

  if (emptyCells.length > 0) {
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    return emptyCells[randomIndex];
  }

  return null; // Should not happen in a normal game
};

// --- Helper function to check for a winner ---
// (This is a simplified version for the AI's internal use)
const checkWinner = (board) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // columns
    [0, 4, 8],
    [2, 4, 6], // diagonals
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]; // Return 'X' or 'O'
    }
  }
  return null;
};

export { getComputerMove };
