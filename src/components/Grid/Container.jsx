import Cell from "./Cell"
import {useState} from "react"
import changeTurn from "../../Logics/changeTurn"
const Container = (props)=>{
   const {
    changePlayer, player
   } = props

   
const cells_required = 9;
const [cell_values, setCellValues]  = useState(Array(cells_required).fill(null))
    
function addSymbol (index){
    console.log("Before Inserting: ", cell_values)
    const current_moves = [...cell_values];
    current_moves[index] = player;
    
    console.log("After Inserting: ", current_moves)
    setCellValues(current_moves)

    changeTurn(player,changePlayer)
}



return(
        <div className="grid grid-cols-3 grid-rows-3 border-2 size-100 divide-x-1 divide-y-1 border-zinc-900">
       
           
           {
            cell_values.map((e,i)=> <Cell  symbol= {e} index= {i} player={player} changePlayer={changePlayer} insertSymbol={(index)=>{addSymbol(index)}}/>)
           }
        </div>
    )
}
export default Container;