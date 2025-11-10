import ModeSelect from "../ModeSelect"
import GridArea from "../GridArea"
import GameStatus from "../GameStatus"
const PlayArea = ()=>{
    return (
        <div className="l2 h-full w-full lg:w-8/16  flex flex-col gap-y-4 p-4">
  
        <ModeSelect/> 
        <GridArea/>
        <GameStatus/>

        
        </div>
    )
}

export default PlayArea