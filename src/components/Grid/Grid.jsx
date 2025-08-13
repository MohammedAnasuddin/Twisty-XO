import Cell from "./Cell"

import {useContext} from "react"
import {GameContext} from '../context/GameContext.jsx'

const Grid = ()=>{
    const {gameSetup, updateGameSetup} = useContext(GameContext)

   

    function addSymbol(position) {
        

        updateGameSetup('MAKE_MOVE',  { position } );

 
    }

return(
        <div className="grid grid-cols-3 grid-rows-3 border-2 size-100 divide-x-1 divide-y-1 border-zinc-900">
           {
            gameSetup.board.map((symbol, i) => {
                // Check if this cell is marked as the "oldest" for either player.
                // const isOldest = i === gameSetup.players[0].oldestMove || i === gameSetup.players[1].oldestMove;

                if (i == gameSetup.players[gameSetup.turn].oldestMove) {
                    return (
                        <div key={i} className="animate-pulse">
                            <Cell symbol={symbol} index={i} insertSymbol={addSymbol} />
                        </div>
                    )
                }

                return <Cell key={i} symbol={symbol} index={i} insertSymbol={addSymbol} />
            }
        )
           }
        </div>
    )
}
export default Grid;