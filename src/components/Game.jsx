import { useEffect, useContext } from "react"
import Grid from "./Grid/Grid.jsx"
import TossModal from "./Game/TossModal.jsx";
import { useParams } from "react-router";
import createPlayersConfig from "../Logics/createPlayersCofing.js";
import PlayerModal from "./Grid/PlayersModal.jsx";
import { GameContext } from "./context/GameContext";
import SymbolModal from './Game/SymbolModal.jsx'

const Game = ()=>{
    // const {playersConfigProp} = props;
    const {gameSetup, updateGameSetup} = useContext(GameContext); 
    const {mode , level} = useParams()

    useEffect(()=> {
        if(gameSetup.mode === null){
            updateGameSetup(["mode"], mode);
        }
        if(mode === "vsComputer" && gameSetup.level === null){
            updateGameSetup(["level"], level);
        }
    }, [mode, level, gameSetup.mode, gameSetup.level, updateGameSetup])

    

    
    

    // // states to proceed
    // // const [arePlayersDefined, setPlayersDefined] = useState(false)
    // const [isTossPerformed, setTossPerformed] = useState(false)
    
    // const [Toss, setToss] = useState(null)
    // const [currentPlayer, setCurrentPlayer] = useState(Toss)
   
    // // console.log("Received Mode: ",mode, " Level- ", level)
    // const playersConfig = createPlayersConfig(mode,level)
    // // console.log("Players of the game: ",playersConfig);
    
    // const Symbols = ["O","X"]  
    // useEffect(()=>{
    //     handleToss()
    // },[])
    
    // const changePlayerTo=(new_player)=>{
    //     setCurrentPlayer(new_player)
    // }

    // const handleToss = ()=>{
    //     let winner = Math.floor(Math.random()*2);
    //     // console.log("Toss: ", winner )
    //     setToss(playersConfig[winner])  
    //     setCurrentPlayer(playersConfig[winner])  
    // }



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