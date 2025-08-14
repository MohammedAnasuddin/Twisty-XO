import { useContext } from 'react';
import { GameContext } from '../context/GameContext.jsx';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';

const WinnerModal = () => {
  const { gameSetup, updateGameSetup } = useContext(GameContext);

  const handlePlayAgain = () => {
    updateGameSetup('RESET_FOR_NEXT_ROUND');
  };

  const isDraw = gameSetup.gameWinner === 'draw';
  const winner = !isDraw ? gameSetup.players[gameSetup.gameWinner] : null;
  const loser = 1- gameSetup.gameWinner;
  const lostPlayer = gameSetup.players[loser];


  const getMessage = () => {
    if (isDraw) {
      return { title: "It's a Draw!", subtitle: null };
    }
    if (winner && winner.isComputer) {
      return { title: '🤖 You Lost 🤖', subtitle: `Better Luck Next Time ${lostPlayer.name}` };
    }
    if (winner) {
      return { title: ` Congratulations, ${winner.name}`, subtitle: `${winner.name} beats ${lostPlayer.name}` };
    }
    return { title: '', subtitle: null };
  };

  const { title, subtitle } = getMessage();

  return (
    <Dialog open={true} onClose={() => {}} className="relative z-50">
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-black/50">
        <DialogPanel className="max-w-lg space-y-4 border bg-white p-12 text-center rounded-lg shadow-xl">
          <DialogTitle className="text-2xl font-bold">
            {title}
          </DialogTitle>
          {subtitle && (
            <p className="text-lg">{subtitle}</p>
          )}
          <div className="mt-6">
            <button
              className="font-semibold bg-blue-600 text-white m-2 p-3 rounded-md hover:bg-blue-700 transition-colors"
              onClick={handlePlayAgain}
            >
              Play Again
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default WinnerModal;