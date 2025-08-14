import Cell from "./Cell"

import {useContext, useState, useEffect} from "react"
import {GameContext} from '../context/GameContext.jsx'

const Grid = ()=>{
    const {gameSetup, updateGameSetup} = useContext(GameContext)
 

     const currentPlayer = gameSetup.turn;
     const moves = gameSetup.players[currentPlayer].moves;
    const  oldestMove = gameSetup.players[currentPlayer].oldestMove;
    const nextTurn = currentPlayer == 1?  0: 1;
    const otherOldestMove = gameSetup.players[nextTurn].oldestMove;
    useEffect(()=>{
        
        if(gameSetup.players[currentPlayer].moves.length >= 3){
           
           updateGameSetup(['players', currentPlayer, 'oldestMove'], moves[moves.length-3])
        }
    }, [gameSetup])

    function addSymbol(position) {
        

        updateGameSetup('MAKE_MOVE',  { position } );

 
    }

return(
        <div className="grid grid-cols-3 grid-rows-3 border-2 size-100 divide-x-1 divide-y-1 border-zinc-900">
           {
            gameSetup.board.map((symbol, i) => {
                // Check if this cell is marked as the "oldest" for either player.
                // const isOldest = i === gameSetup.players[0].oldestMove || i === gameSetup.players[1].oldestMove;

                if (i == oldestMove && moves.length >=3 ) {
                    return (
                        <div key={i} className="animate-pulse">
                            <Cell symbol={symbol} index={i} insertSymbol={addSymbol} />
                        </div>
                    )
                }
                //  if (i == otherOldestMove &&  gameSetup.players[nextTurn].moves.length >= 3 &&  gameSetup.board[otherOldestMove]!=null) {
                //     return (
                //         <div key={i} className="bg-red-500">
                //             <Cell symbol={symbol} index={i} insertSymbol={addSymbol} />
                //         </div>
                //     )
                // }

                return <Cell key={i} symbol={symbol} index={i} insertSymbol={addSymbol} />
            }
        )
           }
        </div>
    )
}
export default Grid;