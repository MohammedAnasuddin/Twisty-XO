import Cell from "./Cell"
import {useEffect, useState} from "react"
import usePlayer from "../../Logics/usePlayer";
import checkWinner from '../../Logics/checkWinner'


const Grid = (props)=>{
    const cells_required = 9;
    const [cell_values, setCellValues]  = useState(Array(cells_required).fill(null))
    const [oldestMove,setOldestMove] = useState(null);
    const [gameOver, setGameOver] = useState(false)
    const xPlayer = usePlayer("X")
    const oPlayer = usePlayer("O")
    const {
        changePlayer, 
        player
    } = props



const players = {
    "X": xPlayer,
    "O": oPlayer,
}
const currentPlayerInstance = players[player]

// console.log("Current Player: ", player)

useEffect(() => {
    try {
        if (currentPlayerInstance.placedAll) {
            // console.log("Oldest mOve by Player- ", player, currentPlayerInstance.getOldestMove())
            setOldestMove(currentPlayerInstance.getOldestMove())
        }
    } catch (error) {
        console.log(error)
    }
    // Always update oldestMove when player or their moves change
})

// console.log("Player on the field: ", currentPlayerInstance) 
if(gameOver){
    return (
        <h3>Game Over</h3>
    )
}


function addSymbol(position) {
    const board = [...cell_values];

    // Remove the oldest move from the board if needed
    if (oldestMove != null) {
        board[oldestMove] = null;
    }


    // Add move to player's moves array, keep all moves
    let moves = currentPlayerInstance.moves;
    let new_move = [...moves, position];
    
    currentPlayerInstance.setMoves(new_move);

    board[position] = player;
    setCellValues(board);
    
    if(checkWinner(board)){
      setTimeout(() => {
        alert(`${player} has won the game`);
        setGameOver(true)
    }, 100);

    }
    else{
    if (player === "X") {
        changePlayer("O");
    } else {
        changePlayer("X");
    }
    }

}




return(
        <div className="grid grid-cols-3 grid-rows-3 border-2 size-100 divide-x-1 divide-y-1 border-zinc-900">
       
           
           {
            cell_values.map((e,i)=> {
                if(i == oldestMove){
                    return (
                        <div className="animate-pulse">
                            <Cell  symbol= {e} index= {i} player={player} changePlayer={changePlayer} insertSymbol={(index)=>{addSymbol(index)}}/>
                        </div>
                    )
                }

                return <Cell  symbol= {e} index= {i} player={player} changePlayer={changePlayer} insertSymbol={(index)=>{addSymbol(index)}}/>
            }
        )
           }
        </div>
    )
}
export default Grid;