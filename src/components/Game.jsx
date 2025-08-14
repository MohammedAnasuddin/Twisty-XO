import { useEffect, useContext } from "react"
import Grid from "./Grid/Grid.jsx"
import TossModal from "./Game/TossModal.jsx";
import { useParams } from "react-router";
import PlayerModal from "./Grid/PlayersModal.jsx";
import { GameContext } from "./context/GameContext";
import SymbolModal from './Game/SymbolModal.jsx'
import { getComputerMove } from "../Logics/useComputerLogic.js";
import WinnerModal from "./Game/WinnerModal.jsx";

const Game = ()=>{
    // const {playersConfigProp} = props;
    const {gameSetup, updateGameSetup} = useContext(GameContext); 
    const {mode} = useParams()

    useEffect(()=> {
        if(gameSetup.mode === null){
            updateGameSetup(["mode"], mode);
        }
    }, [mode, gameSetup.mode, updateGameSetup])

    // This effect runs whenever the turn changes.
    useEffect(() => {
        // Check if it's a computer game and if it's the computer's turn (player 0)
        if (gameSetup.mode === 'vsComputer' && gameSetup.turn === 0 && gameSetup.gameWinner === null) {
            
            // Add a delay to simulate the computer "thinking"
            const timer = setTimeout(() => {
                const computerMove = getComputerMove(gameSetup);
                if (computerMove !== null) {
                    updateGameSetup('MAKE_MOVE', { position: computerMove });
                }
            }, 750); // 0.75 second delay

            // Cleanup function to clear the timeout if the component unmounts
            return () => clearTimeout(timer);
        }
    }, [gameSetup.turn, gameSetup.mode, gameSetup.gameWinner, gameSetup, updateGameSetup]);

    //Rendering 
   
    // Step 1: Get Player Details for both modes.
    if(gameSetup.players[0].name === "" || gameSetup.players[1].name === ""){
        return (
            <div>
                <h1>Ask for Players details</h1>
                <h2>Mode: {mode}</h2>
                <PlayerModal mode={mode} />
            </div>
        )
    }

    // --- Game Setup Flow ---
    // If the turn has not been set, the game setup is not complete. We render modals based on the mode.
    if (gameSetup.turn === null) {
        // Path for 'vsFriend'
        if (gameSetup.mode === 'vsFriend') {
            if (gameSetup.tossWinner === null) {
                return (
                    <>
                        <h1 className="text-4xl animate-pulse">Deciding who goes first...</h1>
                        <TossModal />
                    </>
                );
            } else {
                // After toss, the winner selects a symbol.
                return <SymbolModal />;
            }
        }

        // Path for 'vsComputer' - skip toss and go directly to symbol selection.
        if (gameSetup.mode === 'vsComputer') {
            return <SymbolModal />;
        }
    }

    // If the game is over (winner or draw), show the results modal.
    if (gameSetup.gameWinner !== null) {
        return <WinnerModal />;
    }

    // Step 4: All setup is complete. Render the game grid.
    return (
        <div className="flex flex-col items-center justify-center w-screen h-screen">
            <h1 className="text-4xl animate-pulse">Turn of  {gameSetup.players[gameSetup.turn].name } : {gameSetup.players[gameSetup.turn].symbol }</h1>
            {/* The Grid component now gets all its data from the context. */}
            <Grid />
        </div>
    )
}


export default Game;