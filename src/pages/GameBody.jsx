import GameInfo from "../components/Containers/GameInfo.jsx"
import PlayArea from "../components/Containers/PlayArea.jsx";
 const GameBody = ()=>{
    return (
        <div className="l1 h-15/16    w-full flex flex-col md:flex-row gap-8 p-4">
              <GameInfo/>
            <PlayArea/>
        </div>

    )
}

export default GameBody;