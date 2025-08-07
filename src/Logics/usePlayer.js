import { useState } from "react";

function usePlayer (Player) {
     const symbol = Player
    const [moves,setMoves] = useState([])
        const [oldestMove,setOldestMove] = useState(null);
    let placedAll = false
    console.log(Player,moves)

    if(moves.length >= 3){
        placedAll = true
    } 
        
    function getOldestMove(){
        
        setOldestMove(moves[(moves.length-1)-2])
        return moves[(moves.length-1)-2]
    }


    return { oldestMove, setOldestMove, symbol ,moves, setMoves , placedAll , getOldestMove}
}

export default  usePlayer