import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useContext } from 'react';
import { GameContext } from '../context/GameContext.jsx';

function SymbolModal() {
  const { gameSetup, updateGameSetup } = useContext(GameContext);

  const handleClick = (selectedSymbol) => {
    if(gameSetup.mode=="vsComputer"){
      // Pass payload as an object for consistency
      updateGameSetup("VS_COMPUTER", { symbol: selectedSymbol });
    } 
    else{
      // Use the correct action to set symbols and start the game turn.
      updateGameSetup("CHOOSE_SYMBOL_VS_FRIEND", { symbol: selectedSymbol });
    }
    
  };

  // Determine the correct player name to display.
  // This fixes a bug where the app would crash in 'vsComputer' mode
  // because `gameSetup.tossWinner` would be null.
  const getPlayerNameToDisplay = () => {
    if (gameSetup.mode === 'vsComputer') {
      // In computer mode, the human player (who chooses the symbol) is always at index 1.
      return gameSetup.players[1].name;
    }
    // In vsFriend mode, the tossWinner chooses the symbol.
    return gameSetup.players[gameSetup.tossWinner].name;
  };

  return (
    <Dialog open={true} onClose={() => {}} className="relative z-50">
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="max-w-lg space-y-4 border bg-white p-12 text-center">
          <DialogTitle className="font-semibold text-lg">
            {/* Use the helper function to prevent crash in 'vsComputer' mode */}
            {getPlayerNameToDisplay()}, Choose your Symbol
          </DialogTitle>
          <div className="flex flex-row justify-center m-6">
            <button
              className="font-semibold bg-blue-600 text-white m-2 p-2 rounded-sm"
              onClick={() => handleClick('X')}
            >
              X
            </button>
            <button
              className="font-semibold bg-yellow-500 text-white m-2 p-2 rounded-sm"
              onClick={() => handleClick('O')}
            >
              O
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>);
}

export default SymbolModal;
