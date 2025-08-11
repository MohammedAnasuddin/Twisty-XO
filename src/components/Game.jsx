import { useState,useEffect, useContext } from "react"
import Grid from "./Grid/Grid.jsx"
import TossModal from "./Game/TossModal.jsx";
import { useParams } from "react-router";
import createPlayersConfig from "../Logics/createPlayersCofing.js";
import PlayerModal from "./Grid/PlayersModal.jsx";
import { GameContext } from "./context/GameContext";
const Game = ()=>{
    // const {playersConfigProp} = props;
    const {gameSetup, updateGameSetup} = useContext(GameContext); 
    const {mode , level} = useParams()
    // console.log(gameSetup);
    useEffect(()=> {
        if(gameSetup.mode== null){
        updateGameSetup(["mode"], mode);

    }

    if(gameSetup.mode == "vsComputer" && gameSetup.level == null){
        updateGameSetup(["level"], level);
    }
    }, [mode, level, gameSetup.mode, gameSetup.level])
    

    // states to proceed
    // const [arePlayersDefined, setPlayersDefined] = useState(false)
    const [isTossPerformed, setTossPerformed] = useState(false)
    
    const [Toss, setToss] = useState(null)
    const [currentPlayer, setCurrentPlayer] = useState(Toss)
   
    // console.log("Received Mode: ",mode, " Level- ", level)
    const playersConfig = createPlayersConfig(mode,level)
    // console.log("Players of the game: ",playersConfig);
    
    const Symbols = ["O","X"]  
    useEffect(()=>{
        handleToss()
    },[])
    
    const changePlayerTo=(new_player)=>{
        setCurrentPlayer(new_player)
    }

    const handleToss = ()=>{
        let winner = Math.floor(Math.random()*2);
        // console.log("Toss: ", winner )
        setToss(playersConfig[winner])  
        setCurrentPlayer(playersConfig[winner])  
    }



    //Rendering 
   
    if(gameSetup.players[0].name == "" || gameSetup.players[1].name == ""){
    //Commented to focus on Toss
    // if(false){


        return (
        <div>
        <h1>Ask for Players details</h1>
        <h2>Mode: {mode}</h2>
        <PlayerModal mode  = {mode} />
        </div>
    
    )
    }

    if(gameSetup.tossWinner == null){
        return(
            <>
            <h1 className="text-4xl animate-pulse">Decide the symbols</h1>
            <TossModal/>
            </>
        )

    }

    return (
        <div className="flex flex-col items-center justify-center w-screen h-screen">
            <h1 className="text-4xl animate-pulse">Time to Play the Game</h1>
                {/* <h1>Turn of {currentPlayer}</h1> */}
                   
                     {/* <Grid  player={currentPlayer} changePlayer={changePlayerTo} /> */}
                
        </div>
    )

}

export default Game;