import { useState,useEffect, useContext } from "react"
import Grid from "./Grid/Grid.jsx"

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
    const [arePlayersDefined, setPlayersDefined] = useState(false)
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
    if(arePlayersDefined == false){


        return (
        <div>
        <h1>Ask for Players details</h1>
        <h2>Mode: {mode}</h2>
        <PlayerModal mode  = {mode} />
        </div>
    
    )
    }

    if(isTossPerformed == false){
        return <h1>Decide the symbols</h1>
    }

    return (
        <div className="flex flex-col items-center justify-center w-screen h-screen">
                <h1>Turn of {currentPlayer}</h1>
                   
                     <Grid  player={currentPlayer} changePlayer={changePlayerTo} />
                
        </div>
    )

}

export default Game;