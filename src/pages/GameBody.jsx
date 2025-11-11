import GameInfo from "../components/Containers/GameInfo.jsx"
import PlayArea from "../components/Containers/PlayArea.jsx";
 const GameBody = ()=>{
    return (
        <div className="flex flex-col w-full gap-10 p-4 l1 base-100 h-15/16 md:flex-row">
              <GameInfo/>
            <PlayArea/>
        </div>

    )
}

export default GameBody;