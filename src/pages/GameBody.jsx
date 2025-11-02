import GameInfo from "../components/Containers/GameInfo.jsx"
import PlayArea from "../components/Containers/PlayArea.jsx";
 const GameBody = ()=>{
    return (
          <div className="level-1 h-5/6 w-full bg-red-700/50  flex flex-col md:flex-row gap-4">
            <GameInfo/>
            <PlayArea/>
        </div>

    )
}

export default GameBody;