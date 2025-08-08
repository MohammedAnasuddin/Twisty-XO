import { useState,useEffect, useContext } from "react"
import Grid from "./Grid/Grid.jsx"
import playerContext from "./context/Players_context.js"
import { useParams } from "react-router";
import createPlayersConfig from "../Logics/createPlayersCofing.js";
const Game = ()=>{
    // const {playersConfigProp} = props;
    
    const [Toss, setToss] = useState(null)
    const [currentPlayer, setCurrentPlayer] = useState(Toss)
   
    const {mode , level} = useParams()
    console.log("Received Mode: ",mode, " Level- ", level)

    const playersConfig = createPlayersConfig(mode,level)
    console.log("Players of the game: ",playersConfig);
    
    const Symbols = ["O","X"]  
    useEffect(()=>{
        handleToss()
    },[])
    
    const changePlayerTo=(new_player)=>{
        setCurrentPlayer(new_player)
    }

    const handleToss = ()=>{
        let winner = Math.floor(Math.random()*2);
        console.log("Toss: ", winner )
        setToss(playersConfig[winner])  
        setCurrentPlayer(playersConfig[winner])  
    }
    return (
        <div className="flex flex-col items-center justify-center w-screen h-screen">
                <h1>Turn of {currentPlayer}</h1>
                   
                     <Grid  player={currentPlayer} changePlayer={changePlayerTo} />
                
        </div>
    )

}

export default Game;