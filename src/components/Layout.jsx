import { useState,useEffect } from "react"
import Container from "./Grid/Container.jsx"
const Layout = ()=>{
    
    const [Toss, setToss] = useState(null)
    const [currentPlayer, setCurrentPlayer] = useState(Toss)
    const Players = ["O","X"]  
    useEffect(()=>{
        handleToss()
    },[])
    
    const changePlayerTo=(new_player)=>{
        setCurrentPlayer(new_player)
    }

    const handleToss = ()=>{
        let winner = Math.floor(Math.random()*2);
        console.log("Toss: ", winner )
        setToss(Players[winner])  
        setCurrentPlayer(Players[winner])  
    }
    return (
        <div className="flex flex-col items-center justify-center w-screen h-screen">
                <h1>Turn of {currentPlayer}</h1>
                     <Container  player={currentPlayer} changePlayer={changePlayerTo} />
                {
                    
                }
        </div>
    )

}

export default Layout;