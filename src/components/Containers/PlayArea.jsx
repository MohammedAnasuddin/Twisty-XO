import ModeSelect from "../ModeSelect"
import GridArea from "../GridArea"
import GameStatus from "../GameStatus"
const PlayArea = ()=>{
    return (
        <div className="flex flex-col w-full h-full p-4 l2 bg-base-200 h- lg:w-8/16 gap-y-4">
  
        <ModeSelect/> 
        <GridArea/>
        <GameStatus/>

        
        </div>
    )
}

export default PlayArea