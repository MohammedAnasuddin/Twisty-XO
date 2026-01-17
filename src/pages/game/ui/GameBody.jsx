import GameInfo from "../../../entities/game/ui/GameInfo.jsx";
import PlayArea from "../../../widgets/play-area/ui/PlayArea.jsx";

const GameBody = () => {
  return (
    <div
      id="GameBody"
      className="overflow-y-hidden grid row-start-2 p-2 o bg-base-200 row-span-17 md:row-span-8 col-span-16 grid-cols-subgrid grid-rows-subgrid l1"
    >
      <GameInfo />
      <PlayArea />
    </div>
  );
};

export default GameBody;
