import ModeSelect from "../ModeSelect"
import GridArea from "../GridArea"
import GameStatus from "../GameStatus"
const PlayArea = ()=>{
    //flex flex-col w-full h-full p-4 l2 bg-base-200 h- lg:w-8/16 gap-y-4
    return (
       <div className="l2 row-start-3 md:row-start-2  lg:row-start-1 row-span-15 lg:row-span-full 
                col-start-1 lg:col-start-9 col-span-full 
                p-2 grid grid-cols-subgrid grid-rows-subgrid">
  <ModeSelect /> 
  <GridArea />
  {/* <GameStatus /> */}
</div>

    )
}

export default PlayArea